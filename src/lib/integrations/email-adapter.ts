import type {
  EmailProvider,
  EmailSendResult,
  LeadConfirmationEmail,
  LeadNotificationEmail,
  EmailBuildContext,
} from "@/lib/email-types";
import type { LeadPayload } from "@/lib/lead-types";
import { scoreLead, type LeadScoreResult } from "@/lib/lead-scoring";

export function buildLeadNotificationEmail({
  lead,
  scoring,
  leadId,
  recommendedServices = [],
}: EmailBuildContext): LeadNotificationEmail {
  return {
    provider: getEmailProvider(),
    to: [process.env.LEAD_NOTIFICATION_EMAIL || "mock-internal@zescorp.ro"],
    subject: `[${scoring.priority}] ${lead.inquiryType} - ${lead.company || lead.name}`,
    summary:
      lead.generatedSummary ||
      `${lead.sourceTool} lead pentru ${lead.projectType || lead.inquiryType}.`,
    priority: scoring.priority,
    contactDetails: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
    },
    projectDetails: {
      sourceTool: lead.sourceTool,
      sourcePage: lead.sourcePage,
      inquiryType: lead.inquiryType,
      projectType: lead.projectType,
      urgency: lead.urgency,
      message: lead.message,
    },
    estimatedBudget: lead.generatedBudgetRange,
    recommendedServices,
    nextStep: scoring.nextAction,
    adminReviewLink: `/admin/leads?leadId=${encodeURIComponent(leadId)}`,
    scoring,
    createdAt: new Date().toISOString(),
  };
}

export async function sendLeadNotification(
  email: LeadNotificationEmail,
): Promise<EmailSendResult> {
  // TODO: connect Resend, SendGrid, SMTP, Gmail Workspace or internal workflow.
  // No real email is sent in this planning phase.
  void email;

  return {
    ok: true,
    mode: "mock",
    provider: getEmailProvider(),
    message: "Internal notification email built only. No email was sent.",
  };
}

export function buildLeadConfirmationEmail(
  lead: LeadPayload,
  scoring: LeadScoreResult = scoreLead(lead),
): LeadConfirmationEmail {
  return {
    provider: getEmailProvider(),
    to: lead.email,
    subject: "ZES MEDCORP - solicitarea tehnica a fost pregatita",
    summary:
      "Solicitarea a fost validata in modul mock si poate fi conectata ulterior la email real.",
    nextStep: scoring.nextAction,
    createdAt: new Date().toISOString(),
    sourcePage: lead.sourcePage,
  };
}

function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();

  if (
    provider === "resend" ||
    provider === "sendgrid" ||
    provider === "smtp" ||
    provider === "gmail-workspace"
  ) {
    return provider;
  }

  return "mock";
}
