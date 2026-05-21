import { NextResponse, type NextRequest } from "next/server";

import { hasFormErrors, validateLeadPayload } from "@/lib/forms";
import { buildCrmPayload, sendToCrm } from "@/lib/integrations/crm-adapter";
import {
  buildLeadConfirmationEmail,
  buildLeadNotificationEmail,
  sendLeadNotification,
} from "@/lib/integrations/email-adapter";
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
  const crmPayload = buildCrmPayload(payload, scoring);
  const storageResult = await saveLead({
    lead: payload,
    scoring,
  });
  const leadId = storageResult.leadId ?? `mock_${Date.now()}`;
  const crmResult = await sendToCrm(crmPayload);
  const notificationEmail = buildLeadNotificationEmail({
    lead: payload,
    leadId,
    recommendedServices,
    scoring,
  });
  const notificationResult = await sendLeadNotification(notificationEmail);
  const confirmationEmail = buildLeadConfirmationEmail(payload, scoring);

  return NextResponse.json({
    success: true,
    ok: true,
    leadId,
    mode: "mock",
    storageMode: storageResult.storageMode,
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
        result: notificationResult,
      },
      confirmationEmail: {
        subject: confirmationEmail.subject,
        provider: confirmationEmail.provider,
      },
      storage: {
        mode: storageResult.storageMode,
        result: {
          ok: storageResult.ok,
          message: storageResult.message,
        },
      },
    },
    message:
      "Lead payload validated, scored, mapped to mock CRM/email payloads and accepted by mock lead storage. No database, CRM or email integration is active yet.",
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
