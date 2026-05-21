import { NextResponse, type NextRequest } from "next/server";

import { hasFormErrors, validateLeadPayload } from "@/lib/forms";
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
import { scoreLead } from "@/lib/lead-scoring";
import { saveLead } from "@/lib/lead-storage";

export async function POST(request: NextRequest) {
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

  const scoring = scoreLead(payload);
  const recommendedServices = parseRecommendedServices(payload);
  const integrationConfig = getLeadIntegrationConfig();
  const crmPayload = buildCrmPayload(payload, scoring);
  const emailContext = {
    lead: payload,
    leadId: "",
    recommendedServices,
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
    leadId,
    recommendedServices,
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
  const highPriorityResult = highPriorityPrepared
    ? await sendHighPriorityAlert(emailContext)
    : null;
  const highPriorityTemplate = highPriorityPrepared
    ? renderHighPriorityAlertTemplate(emailContext)
    : null;
  const sheetsRow = buildGoogleSheetsLeadRow({
    lead: payload,
    leadId,
    recommendedServices,
    scoring,
  });
  const sheetsConfig = validateSheetsConfig(integrationConfig.sheetsRequested);
  const sheetsResult = await appendLeadToGoogleSheets(
    sheetsRow,
    integrationConfig.mode,
  );

  return NextResponse.json({
    success: true,
    ok: true,
    leadId,
    mode: integrationConfig.mode,
    storageMode: storageResult.storageMode,
    emailMode: "mock",
    sheetsMode: sheetsResult.sheetsMode,
    integrationMode: integrationConfig.mode,
    score: scoring.score,
    priority: scoring.priority,
    nextAction: scoring.nextAction,
    scoringReasons: scoring.reasons,
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
  });
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
