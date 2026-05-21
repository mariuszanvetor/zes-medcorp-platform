import type {
  LeadConfirmationEmail,
  LeadNotificationEmail,
} from "@/lib/email-types";
import type { LeadPayload } from "@/lib/lead-types";
import type { LeadScoreResult } from "@/lib/lead-scoring";

export type RenderedEmailTemplate = {
  subject: string;
  previewText: string;
  text: string;
  html: string;
  priorityLabel: string;
  leadSummary: string;
  recommendedNextAction: string;
};

export type LeadEmailTemplateContext = {
  lead: LeadPayload;
  scoring: LeadScoreResult;
  leadId: string;
  recommendedServices?: string[];
  adminReviewLink?: string;
};

export function renderInternalLeadNotificationTemplate({
  lead,
  scoring,
  leadId,
  recommendedServices = [],
  adminReviewLink = `/admin/leads?leadId=${encodeURIComponent(leadId)}`,
}: LeadEmailTemplateContext): RenderedEmailTemplate {
  const summary = createLeadSummary(lead);
  const subject = `[${scoring.priority}] Lead ZES - ${safeText(lead.projectType || lead.inquiryType)}`;
  const services = recommendedServices.length
    ? recommendedServices.join(", ")
    : "De stabilit dupa calificare";
  const text = [
    subject,
    "",
    `Lead ID: ${leadId}`,
    `Prioritate: ${scoring.priority} (${scoring.score}/100)`,
    `Sursa: ${lead.sourceTool} / ${lead.sourcePage}`,
    `Tip solicitare: ${lead.inquiryType}`,
    `Tip proiect: ${lead.projectType ?? "Nespecificat"}`,
    `Urgenta: ${lead.urgency ?? "Nespecificata"}`,
    `Buget orientativ: ${lead.generatedBudgetRange ?? "Nespecificat"}`,
    `Complexitate: ${lead.generatedComplexity ?? "Nespecificata"}`,
    `Risc: ${lead.generatedRiskLevel ?? "Nespecificat"}`,
    "",
    `Rezumat: ${summary}`,
    `Servicii recomandate: ${services}`,
    `Urmatorul pas: ${scoring.nextAction}`,
    `Review intern: ${adminReviewLink}`,
    "",
    "Nota: analiza este preliminara si necesita validare tehnica ZES inainte de orice oferta finala.",
  ].join("\n");

  return {
    subject,
    previewText: `Lead ${scoring.priority}, scor ${scoring.score}/100: ${summary}`,
    text,
    html: renderHtmlShell({
      title: "Lead nou ZES",
      rows: [
        ["Lead ID", leadId],
        ["Prioritate", `${scoring.priority} (${scoring.score}/100)`],
        ["Sursa", `${lead.sourceTool} / ${lead.sourcePage}`],
        ["Solicitare", lead.inquiryType],
        ["Proiect", lead.projectType ?? "Nespecificat"],
        ["Urgenta", lead.urgency ?? "Nespecificata"],
        ["Buget", lead.generatedBudgetRange ?? "Nespecificat"],
        ["Complexitate", lead.generatedComplexity ?? "Nespecificata"],
        ["Risc", lead.generatedRiskLevel ?? "Nespecificat"],
        ["Servicii", services],
        ["Urmatorul pas", scoring.nextAction],
      ],
      summary,
      footer:
        "Notificare interna pentru triere lead. Estimarile sunt preliminare si necesita validare tehnica.",
    }),
    priorityLabel: scoring.priority,
    leadSummary: summary,
    recommendedNextAction: scoring.nextAction,
  };
}

export function renderLeadConfirmationTemplate({
  lead,
  scoring,
}: LeadEmailTemplateContext): RenderedEmailTemplate {
  const summary = createLeadSummary(lead);
  const subject = "ZES MEDCORP - solicitarea tehnica a fost primita";
  const text = [
    subject,
    "",
    "Am primit solicitarea si am pregatit contextul pentru triere tehnica.",
    `Rezumat: ${summary}`,
    `Urmatorul pas estimat: ${scoring.nextAction}`,
    "",
    "Aceasta confirmare nu reprezinta o oferta tehnica sau comerciala finala.",
    "Nu include date medicale despre pacienti in comunicarile de proiect.",
  ].join("\n");

  return {
    subject,
    previewText:
      "Solicitarea a fost pregatita pentru triere tehnica ZES.",
    text,
    html: renderHtmlShell({
      title: "Solicitare pregatita",
      rows: [
        ["Sursa", lead.sourceTool],
        ["Tip solicitare", lead.inquiryType],
        ["Tip proiect", lead.projectType ?? "Nespecificat"],
        ["Urmatorul pas", scoring.nextAction],
      ],
      summary,
      footer:
        "Confirmare preliminara. Echipa ZES poate valida ulterior informatiile tehnice.",
    }),
    priorityLabel: scoring.priority,
    leadSummary: summary,
    recommendedNextAction: scoring.nextAction,
  };
}

export function renderHighPriorityAlertTemplate({
  lead,
  scoring,
  leadId,
  adminReviewLink = `/admin/leads?leadId=${encodeURIComponent(leadId)}`,
}: LeadEmailTemplateContext): RenderedEmailTemplate {
  const summary = createLeadSummary(lead);
  const subject = `[ALERT] Lead prioritar ZES - scor ${scoring.score}/100`;
  const text = [
    subject,
    "",
    `Lead ID: ${leadId}`,
    `Prioritate: ${scoring.priority}`,
    `Scor: ${scoring.score}/100`,
    `Urgenta: ${lead.urgency ?? "Nespecificata"}`,
    `Risc: ${lead.generatedRiskLevel ?? "Nespecificat"}`,
    `Rezumat: ${summary}`,
    `Actiune recomandata: ${scoring.nextAction}`,
    `Review intern: ${adminReviewLink}`,
    "",
    "Alerta interna pentru triere rapida. Nu reprezinta o confirmare comerciala finala.",
  ].join("\n");

  return {
    subject,
    previewText: `Lead prioritar: ${lead.projectType ?? lead.inquiryType}`,
    text,
    html: renderHtmlShell({
      title: "Lead prioritar",
      rows: [
        ["Lead ID", leadId],
        ["Prioritate", scoring.priority],
        ["Scor", `${scoring.score}/100`],
        ["Urgenta", lead.urgency ?? "Nespecificata"],
        ["Risc", lead.generatedRiskLevel ?? "Nespecificat"],
        ["Actiune", scoring.nextAction],
      ],
      summary,
      footer:
        "Alerta interna pentru lead prioritar. Validarea tehnica ramane necesara.",
    }),
    priorityLabel: scoring.priority,
    leadSummary: summary,
    recommendedNextAction: scoring.nextAction,
  };
}

export function templateFromLeadNotificationEmail(
  email: LeadNotificationEmail,
): RenderedEmailTemplate {
  return {
    subject: email.subject,
    previewText: email.summary,
    text: [
      email.subject,
      "",
      email.summary,
      `Priority: ${email.priority}`,
      `Next step: ${email.nextStep}`,
      `Admin review: ${email.adminReviewLink}`,
    ].join("\n"),
    html: renderHtmlShell({
      title: email.subject,
      rows: [
        ["Priority", email.priority],
        ["Source", email.projectDetails.sourceTool],
        ["Project", email.projectDetails.projectType ?? "Nespecificat"],
        ["Urgency", email.projectDetails.urgency ?? "Nespecificata"],
        ["Budget", email.estimatedBudget ?? "Nespecificat"],
        ["Next step", email.nextStep],
      ],
      summary: email.summary,
      footer:
        "Notificare interna pentru triere lead. Validarea tehnica ramane necesara.",
    }),
    priorityLabel: email.priority,
    leadSummary: email.summary,
    recommendedNextAction: email.nextStep,
  };
}

export function templateFromLeadConfirmationEmail(
  email: LeadConfirmationEmail,
): RenderedEmailTemplate {
  return {
    subject: email.subject,
    previewText: email.summary,
    text: [email.subject, "", email.summary, `Next step: ${email.nextStep}`].join(
      "\n",
    ),
    html: renderHtmlShell({
      title: email.subject,
      rows: [
        ["Source page", email.sourcePage],
        ["Next step", email.nextStep],
      ],
      summary: email.summary,
      footer:
        "Confirmare preliminara. Aceasta nu reprezinta o oferta finala.",
    }),
    priorityLabel: "Confirmation",
    leadSummary: email.summary,
    recommendedNextAction: email.nextStep,
  };
}

function createLeadSummary(lead: LeadPayload) {
  return safeText(
    lead.generatedSummary ||
      `${lead.sourceTool} lead pentru ${lead.projectType || lead.inquiryType}.`,
  );
}

function renderHtmlShell({
  title,
  rows,
  summary,
  footer,
}: {
  title: string;
  rows: Array<[string, string]>;
  summary: string;
  footer: string;
}) {
  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;color:#64748b;font-weight:700;">${escapeHtml(
          label,
        )}</td><td style="padding:8px 0;color:#0f172a;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f7fbff;font-family:Arial,sans-serif;color:#0f172a;"><div style="max-width:680px;margin:0 auto;padding:32px;"><div style="background:#ffffff;border:1px solid #dbeafe;border-radius:18px;padding:28px;"><p style="margin:0 0 12px;color:#0057b8;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">ZES MEDCORP</p><h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;">${escapeHtml(
    title,
  )}</h1><p style="margin:0 0 22px;line-height:1.7;color:#475569;">${escapeHtml(
    summary,
  )}</p><table style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table><p style="margin:24px 0 0;color:#64748b;font-size:13px;line-height:1.6;">${escapeHtml(
    footer,
  )}</p></div></div></body></html>`;
}

function safeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
