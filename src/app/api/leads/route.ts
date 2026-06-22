import { NextResponse, type NextRequest } from "next/server";

import { hasFormErrors, validateLeadPayload } from "@/lib/forms";
import { createLeadIntelligence } from "@/lib/ai-intelligence/lead-intelligence";
import {
  renderHighPriorityAlertTemplate,
  renderInternalLeadNotificationTemplate,
  renderLeadConfirmationTemplate,
} from "@/lib/email-templates";
import { getLeadIntegrationConfig } from "@/lib/integration-config";
import { buildCrmPayload, sendToCrm } from "@/lib/integrations/crm-adapter";
import {
  buildLeadConfirmationEmail,
  buildLeadNotificationEmail,
  sendHighPriorityAlert,
  sendInternalLeadNotification,
  sendLeadConfirmation,
  shouldPrepareHighPriorityAlert,
} from "@/lib/integrations/email-adapter";
import {
  appendLeadToGoogleSheets,
  buildGoogleSheetsLeadRow,
  validateSheetsConfig,
} from "@/lib/integrations/google-sheets-adapter";
import type { LeadPayload } from "@/lib/lead-types";
import { checkLeadSubmissionCooldown } from "@/lib/lead-rate-limit";
import { scoreLead } from "@/lib/lead-scoring";
import { saveLead } from "@/lib/lead-storage";
import { checkServerRateLimit, rateLimitHeaders, shouldBlockExpensivePost } from "@/lib/server-rate-limit";

export async function POST(request: NextRequest) {
  if (shouldBlockExpensivePost(request)) {
    return NextResponse.json({ ok: false, error: "Solicitare respinsa." }, { status: 403 });
  }

  const rateLimit = checkServerRateLimit(request, {
    keyPrefix: "lead-submit",
    limit: 6,
    windowSeconds: 300,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        error: "Prea multe solicitari trimise intr-un interval scurt.",
        retryAfterSeconds: rateLimit.resetSeconds,
      },
      {
        status: 429,
        headers: rateLimitHeaders(rateLimit),
      },
    );
  }

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const errors = validateLeadPayload(payload);

  if (hasFormErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const cooldown = checkLeadSubmissionCooldown(payload);

  if (!cooldown.allowed) {
    const retryAfterSeconds = cooldown.retryAfterSeconds ?? 45;

    return NextResponse.json(
      {
        success: false,
        ok: false,
        error: "Duplicate submission cooldown.",
        retryAfterSeconds,
        message:
          "O solicitare similara a fost primita recent. Va rugam sa asteptati cateva secunde inainte de retrimitere.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  const scoring = scoreLead(payload);
  const recommendedServices = parseRecommendedServices(payload);
  const leadIntelligence = createLeadIntelligence({
    lead: payload,
    recommendedServices,
    scoring,
  });
  const integrationConfig = getLeadIntegrationConfig();
  const crmPayload = buildCrmPayload(payload, scoring);
  const emailContext = {
    lead: payload,
    leadIntelligence,
    leadId: "",
    recommendedServices: leadIntelligence.recommendedServices.length
      ? leadIntelligence.recommendedServices
      : recommendedServices,
    scoring,
  };
  const storageResult = await saveLead({
    lead: payload,
    scoring,
  });
  const leadId = storageResult.leadId ?? `mock_${Date.now()}`;
  emailContext.leadId = leadId;
  const crmResult = await sendToCrm(crmPayload);
  const notificationEmail = buildLeadNotificationEmail({
    lead: payload,
    leadIntelligence,
    leadId,
    recommendedServices: emailContext.recommendedServices,
    scoring,
  });
  const confirmationEmail = buildLeadConfirmationEmail(payload, scoring);
  const internalTemplate = renderInternalLeadNotificationTemplate(emailContext);
  const confirmationTemplate = renderLeadConfirmationTemplate(emailContext);
  const notificationResult =
    await sendInternalLeadNotification(emailContext);
  const confirmationResult = await sendLeadConfirmation(emailContext);
  const highPriorityPrepared = shouldPrepareHighPriorityAlert({
    lead: payload,
    scoring,
  });
  const highPriorityEmailEnabled =
    process.env.HIGH_PRIORITY_ALERT_EMAIL_ENABLED === "true";
  const highPriorityResult = highPriorityPrepared && highPriorityEmailEnabled
    ? await sendHighPriorityAlert(emailContext)
    : null;
  const highPriorityTemplate = highPriorityPrepared
    ? renderHighPriorityAlertTemplate(emailContext)
    : null;
  const sheetsRow = buildGoogleSheetsLeadRow({
    lead: payload,
    leadIntelligence,
    leadId,
    recommendedServices: emailContext.recommendedServices,
    scoring,
  });
  const sheetsConfig = validateSheetsConfig(integrationConfig.sheetsRequested);
  const sheetsResult = await appendLeadToGoogleSheets(
    sheetsRow,
    integrationConfig.mode,
  );

  return NextResponse.json(
    {
      success: true,
      ok: true,
      leadId,
      mode: integrationConfig.mode,
      storageMode: storageResult.storageMode,
      emailMode: getEmailMode([
        notificationResult,
        confirmationResult,
        highPriorityResult,
      ]),
      sheetsMode: sheetsResult.sheetsMode,
      integrationMode: integrationConfig.mode,
      score: scoring.score,
      priority: scoring.priority,
      readinessScore: leadIntelligence.readinessScore,
      riskLevel: leadIntelligence.riskLevel,
      complexityLevel: leadIntelligence.complexityLevel,
      recommendedNextAction: leadIntelligence.recommendedNextAction,
      nextAction: scoring.nextAction,
      scoringReasons: scoring.reasons,
      leadIntelligence: {
        leadSource: leadIntelligence.leadSource,
        projectDomain: leadIntelligence.projectDomain,
        projectStage: leadIntelligence.projectStage,
        readinessScore: leadIntelligence.readinessScore,
        urgencyScore: leadIntelligence.urgencyScore,
        complexityLevel: leadIntelligence.complexityLevel,
        riskLevel: leadIntelligence.riskLevel,
        recommendedNextAction: leadIntelligence.recommendedNextAction,
        followUpPriority: leadIntelligence.followUpPriority,
        followUpType: leadIntelligence.followUpType,
        commercialIntent: leadIntelligence.commercialIntent,
        confidenceLevel: leadIntelligence.confidenceLevel,
      },
      preparedPayloads: {
        crm: {
          provider: crmPayload.source.provider,
          dealType: crmPayload.project.projectType ?? crmPayload.source.inquiryType,
          result: crmResult,
        },
        internalNotification: {
          priority: notificationEmail.priority,
          adminReviewLink: notificationEmail.adminReviewLink,
          template: {
            subject: internalTemplate.subject,
            priorityLabel: internalTemplate.priorityLabel,
          },
          result: {
            ok: notificationResult.ok,
            mode: notificationResult.mode,
            provider: notificationResult.provider,
            message: notificationResult.message,
          },
        },
        confirmationEmail: {
          subject: confirmationEmail.subject,
          provider: confirmationEmail.provider,
          template: {
            subject: confirmationTemplate.subject,
          },
          result: {
            ok: confirmationResult.ok,
            mode: confirmationResult.mode,
            provider: confirmationResult.provider,
            message: confirmationResult.message,
          },
        },
        highPriorityAlert: {
          prepared: highPriorityPrepared,
          emailEnabled: highPriorityEmailEnabled,
          template: highPriorityTemplate
            ? {
                subject: highPriorityTemplate.subject,
                priorityLabel: highPriorityTemplate.priorityLabel,
              }
            : null,
          result: highPriorityResult
            ? {
                ok: highPriorityResult.ok,
                mode: highPriorityResult.mode,
                provider: highPriorityResult.provider,
                message: highPriorityResult.message,
              }
            : null,
        },
        storage: {
          mode: storageResult.storageMode,
          result: {
            ok: storageResult.ok,
            message: storageResult.message,
          },
        },
        sheets: {
          mode: sheetsResult.sheetsMode,
          requested: sheetsResult.requested,
          tabName: sheetsConfig.tabName,
          rowPrepared: sheetsResult.rowPrepared,
          appended: sheetsResult.appended,
          status: sheetsResult.status,
          rowColumns: Object.keys(sheetsRow),
          missingEnv: sheetsConfig.missingEnv,
          result: {
            ok: sheetsResult.ok,
            message: sheetsResult.message,
          },
        },
      },
      message:
        "Lead payload validated, scored and mapped to configured lead integration payloads. Default behavior remains mock-safe unless real provider environment variables are configured.",
    },
    {
      headers: {
        ...rateLimitHeaders(rateLimit),
        "Cache-Control": "no-store",
      },
    },
  );
}

function parseRecommendedServices(payload: LeadPayload) {
  const services = payload.metadata?.recommendedServices;

  if (!services) {
    return [];
  }

  return services
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getEmailMode(
  results: Array<{
    mode: string;
  } | null>,
) {
  const modes = results
    .filter((result): result is { mode: string } => Boolean(result))
    .map((result) => result.mode);

  if (modes.includes("live")) return "live";
  if (modes.includes("provider-error")) return "provider-error";
  if (modes.includes("config-error")) return "config-error";
  if (modes.includes("unsupported")) return "unsupported";

  return "mock";
}
