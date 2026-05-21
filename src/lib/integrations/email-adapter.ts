import type {
  EmailBuildContext,
  EmailProvider as EmailProviderName,
  EmailSendResult,
  LeadConfirmationEmail,
  LeadNotificationEmail,
} from "@/lib/email-types";
import type { LeadPayload } from "@/lib/lead-types";
import { scoreLead, type LeadScoreResult } from "@/lib/lead-scoring";
import type { RenderedEmailTemplate } from "@/lib/email-templates";
import {
  renderHighPriorityAlertTemplate,
  renderInternalLeadNotificationTemplate,
  renderLeadConfirmationTemplate,
  templateFromLeadNotificationEmail,
} from "@/lib/email-templates";

export type EmailMessage = {
  to: string[];
  from: string;
  subject: string;
  previewText: string;
  text: string;
  html: string;
  priorityLabel?: string;
  metadata?: Record<string, string | number | undefined>;
};

export type EmailProvider = {
  readonly provider: EmailProviderName;
  sendEmail(message: EmailMessage): Promise<EmailSendResult>;
  sendInternalLeadNotification(
    context: EmailBuildContext,
  ): Promise<EmailSendResult>;
  sendLeadConfirmation(context: EmailBuildContext): Promise<EmailSendResult>;
  sendHighPriorityAlert(context: EmailBuildContext): Promise<EmailSendResult>;
};

export type EmailProviderAdapter = EmailProvider;

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
  return getEmailAdapter().sendEmail(
    messageFromTemplate({
      template: templateFromLeadNotificationEmail(email),
      to: email.to,
      metadata: {
        kind: "internal_lead_notification",
        priority: email.priority,
        sourceTool: email.projectDetails.sourceTool,
      },
    }),
  );
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

export async function sendEmail(message: EmailMessage) {
  return getEmailAdapter().sendEmail(message);
}

export async function sendInternalLeadNotification(context: EmailBuildContext) {
  return getEmailAdapter().sendInternalLeadNotification(context);
}

export async function sendLeadConfirmation(context: EmailBuildContext) {
  return getEmailAdapter().sendLeadConfirmation(context);
}

export async function sendHighPriorityAlert(context: EmailBuildContext) {
  return getEmailAdapter().sendHighPriorityAlert(context);
}

export function shouldPrepareHighPriorityAlert({
  lead,
  scoring,
}: {
  lead: LeadPayload;
  scoring: LeadScoreResult;
}) {
  return (
    scoring.priority === "Critical / immediate opportunity" ||
    scoring.score >= 80 ||
    normalize(lead.urgency).includes("imediat") ||
    normalize(lead.generatedRiskLevel).includes("critic")
  );
}

export function getEmailAdapter(): EmailProviderAdapter {
  const provider = getEmailProvider();

  return {
    provider,
    async sendEmail(message: EmailMessage) {
      void message;

      return {
        ok: true,
        mode: "mock",
        provider,
        message:
          "Email template prepared in mock mode. No provider call was made and no email was sent.",
      };
    },
    async sendInternalLeadNotification(context: EmailBuildContext) {
      const template = renderInternalLeadNotificationTemplate(context);

      return this.sendEmail(
        messageFromTemplate({
          template,
          to: [process.env.LEAD_NOTIFICATION_EMAIL || "mock-internal@zescorp.ro"],
          metadata: {
            kind: "internal_lead_notification",
            priority: context.scoring.priority,
            score: context.scoring.score,
            sourceTool: context.lead.sourceTool,
          },
        }),
      );
    },
    async sendLeadConfirmation(context: EmailBuildContext) {
      const template = renderLeadConfirmationTemplate(context);

      return this.sendEmail(
        messageFromTemplate({
          template,
          to: [context.lead.email],
          metadata: {
            kind: "lead_confirmation",
            sourceTool: context.lead.sourceTool,
          },
        }),
      );
    },
    async sendHighPriorityAlert(context: EmailBuildContext) {
      const template = renderHighPriorityAlertTemplate(context);

      return this.sendEmail(
        messageFromTemplate({
          template,
          to: [process.env.LEAD_NOTIFICATION_EMAIL || "mock-internal@zescorp.ro"],
          metadata: {
            kind: "high_priority_alert",
            priority: context.scoring.priority,
            score: context.scoring.score,
            sourceTool: context.lead.sourceTool,
          },
        }),
      );
    },
  };
}

function messageFromTemplate({
  template,
  to,
  metadata,
}: {
  template: RenderedEmailTemplate;
  to: string[];
  metadata?: EmailMessage["metadata"];
}): EmailMessage {
  return {
    to,
    from: process.env.EMAIL_FROM || "ZES MEDCORP <no-reply@zescorp.ro>",
    subject: template.subject,
    previewText: template.previewText,
    text: template.text,
    html: template.html,
    priorityLabel: template.priorityLabel,
    metadata,
  };
}

function getEmailProvider(): EmailProviderName {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();

  if (
    provider === "resend" ||
    provider === "sendgrid" ||
    provider === "smtp" ||
    provider === "gmail-workspace"
  ) {
    // Future providers are intentionally not connected yet. The adapter remains mock-safe.
    return provider;
  }

  return "mock";
}

function normalize(value: string | undefined) {
  return (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
