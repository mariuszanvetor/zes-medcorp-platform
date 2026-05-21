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
import { getLeadIntegrationConfig } from "@/lib/integration-config";
import {
  renderHighPriorityAlertTemplate,
  renderInternalLeadNotificationTemplate,
  renderLeadConfirmationTemplate,
  templateFromLeadNotificationEmail,
} from "@/lib/email-templates";

const resendEmailEndpoint = "https://api.resend.com/emails";

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

export type EmailConfigStatus = {
  ok: boolean;
  provider: EmailProviderName;
  mode: EmailSendResult["mode"];
  missingEnv: string[];
  message: string;
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
      requiresInternalRecipient: true,
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
    subject: "ZES MEDCORP - solicitarea tehnica a fost primita",
    summary:
      "Solicitarea a fost primita si poate fi analizata tehnic de echipa ZES. Aceasta nu reprezinta o oferta tehnica sau comerciala finala.",
    nextStep: scoring.nextAction,
    createdAt: new Date().toISOString(),
    sourcePage: lead.sourcePage,
  };
}

export function validateEmailConfig({
  requiresInternalRecipient = false,
}: {
  requiresInternalRecipient?: boolean;
} = {}): EmailConfigStatus {
  const provider = getEmailProvider();
  const integrationConfig = getLeadIntegrationConfig();

  if (provider === "mock" || !integrationConfig.emailRequested) {
    return {
      ok: true,
      provider: "mock",
      mode: "mock",
      missingEnv: [],
      message:
        provider === "mock"
          ? "EMAIL_PROVIDER is mock or missing. No real email will be sent."
          : "Email provider is configured, but LEAD_INTEGRATION_MODE does not request email. No real email will be sent.",
    };
  }

  if (provider === "resend") {
    const missingEnv = [
      !process.env.RESEND_API_KEY ? "RESEND_API_KEY" : "",
      !process.env.EMAIL_FROM ? "EMAIL_FROM" : "",
      requiresInternalRecipient && !process.env.LEAD_NOTIFICATION_EMAIL
        ? "LEAD_NOTIFICATION_EMAIL"
        : "",
    ].filter(Boolean);

    return {
      ok: missingEnv.length === 0,
      provider,
      mode: missingEnv.length ? "config-error" : "live",
      missingEnv,
      message: missingEnv.length
        ? "Resend email provider is selected, but required env vars are missing. No email was sent."
        : "Resend email provider is configured.",
    };
  }

  if (provider === "smtp") {
    const missingEnv = [
      !process.env.SMTP_HOST ? "SMTP_HOST" : "",
      !process.env.SMTP_PORT ? "SMTP_PORT" : "",
      !process.env.SMTP_USER ? "SMTP_USER" : "",
      !process.env.SMTP_PASS ? "SMTP_PASS" : "",
      !process.env.EMAIL_FROM ? "EMAIL_FROM" : "",
      requiresInternalRecipient && !process.env.LEAD_NOTIFICATION_EMAIL
        ? "LEAD_NOTIFICATION_EMAIL"
        : "",
    ].filter(Boolean);

    return {
      ok: false,
      provider,
      mode: "unsupported",
      missingEnv,
      message:
        "SMTP provider is reserved for a later implementation. No SMTP email was sent.",
    };
  }

  return {
    ok: false,
    provider,
    mode: "unsupported",
    missingEnv: [],
    message:
      "Selected email provider is not implemented yet. No email was sent.",
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
      return sendPreparedEmail(message);
    },
    async sendInternalLeadNotification(context: EmailBuildContext) {
      const template = renderInternalLeadNotificationTemplate(context);

      return this.sendEmail(
        messageFromTemplate({
          template,
          to: [process.env.LEAD_NOTIFICATION_EMAIL || "mock-internal@zescorp.ro"],
          requiresInternalRecipient: true,
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
          requiresInternalRecipient: true,
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

async function sendPreparedEmail(
  message: EmailMessage,
): Promise<EmailSendResult> {
  if (
    message.metadata?.kind === "lead_confirmation" &&
    process.env.LEAD_CONFIRMATION_EMAIL_ENABLED !== "true"
  ) {
    return {
      ok: true,
      mode: "mock",
      provider: getEmailProvider(),
      message:
        "Lead confirmation email is disabled. No user-facing email was sent.",
    };
  }

  const config = validateEmailConfig({
    requiresInternalRecipient:
      message.metadata?.requiresInternalRecipient === "true" ||
      message.metadata?.kind === "internal_lead_notification" ||
      message.metadata?.kind === "high_priority_alert",
  });

  if (config.provider === "mock") {
    return {
      ok: true,
      mode: "mock",
      provider: config.provider,
      message:
        "Email template prepared in mock mode. No provider call was made and no email was sent.",
    };
  }

  if (!config.ok) {
    return {
      ok: false,
      mode: config.mode,
      provider: config.provider,
      message: config.message,
    };
  }

  if (config.provider === "resend") {
    return sendViaResend(message);
  }

  return {
    ok: false,
    mode: "unsupported",
    provider: config.provider,
    message: config.message,
  };
}

async function sendViaResend(
  message: EmailMessage,
): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      mode: "config-error",
      provider: "resend",
      message: "RESEND_API_KEY is missing. No email was sent.",
    };
  }

  try {
    const response = await fetch(resendEmailEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: message.from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        headers: {
          "X-Entity-Ref-ID": `zes-${Date.now()}`,
        },
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        mode: "provider-error",
        provider: "resend",
        message: `Resend API returned ${response.status}. Email was not confirmed as sent.`,
      };
    }

    return {
      ok: true,
      mode: "live",
      provider: "resend",
      message: "Email sent through Resend.",
    };
  } catch (error) {
    return {
      ok: false,
      mode: "provider-error",
      provider: "resend",
      message:
        error instanceof Error
          ? `Resend email failed safely: ${error.message}`
          : "Resend email failed safely.",
    };
  }
}

function messageFromTemplate({
  template,
  to,
  requiresInternalRecipient = false,
  metadata,
}: {
  template: RenderedEmailTemplate;
  to: string[];
  requiresInternalRecipient?: boolean;
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
    metadata: {
      ...metadata,
      requiresInternalRecipient: requiresInternalRecipient ? "true" : undefined,
    },
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
