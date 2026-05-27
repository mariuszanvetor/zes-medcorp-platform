import type {
  LeadConfirmationEmail,
  LeadNotificationEmail,
} from "@/lib/email-types";
import type { LeadIntelligence } from "@/lib/ai-intelligence/lead-intelligence";
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
  leadIntelligence?: LeadIntelligence;
  adminReviewLink?: string;
};

export function renderInternalLeadNotificationTemplate({
  lead,
  scoring,
  leadId,
  recommendedServices = [],
  leadIntelligence,
  adminReviewLink = `/admin/leads?leadId=${encodeURIComponent(leadId)}`,
}: LeadEmailTemplateContext): RenderedEmailTemplate {
  const summary = createLeadSummary(lead);
  const subject = `[${scoring.priority}] Lead ZES - ${safeText(lead.projectType || lead.inquiryType)}`;
  const services = recommendedServices.length
    ? recommendedServices.join(", ")
    : "De stabilit dupa calificare";
  const generatedAt = new Date().toISOString();
  const quickActions = buildQuickActions({ lead, scoring });
  const scoringReasons = scoring.reasons.length
    ? scoring.reasons.join("; ")
    : "Scor calculat pe baza datelor transmise.";
  const intelligenceRows: Array<[string, string | undefined]> = leadIntelligence
    ? [
        ["Lead source", leadIntelligence.sourceContext],
        ["Domeniu proiect", leadIntelligence.projectDomain],
        ["Stadiu", leadIntelligence.projectStage],
        ["Readiness", `${leadIntelligence.readinessScore}/100`],
        ["Urgenta", `${leadIntelligence.urgencyScore}/100`],
        ["Complexitate", leadIntelligence.complexityLevel],
        ["Risc", leadIntelligence.riskLevel],
        ["Intent comercial", leadIntelligence.commercialIntent],
        ["Incredere", leadIntelligence.confidenceLevel],
        ["Follow-up", `${leadIntelligence.followUpPriority} / ${leadIntelligence.followUpType}`],
        ["Informatii lipsa", leadIntelligence.missingInformationSummary],
        ["Validari", leadIntelligence.validationNeeds.join("; ")],
        ["Servicii sugerate", leadIntelligence.recommendedServices.join(", ")],
        ["Calculatoare sugerate", leadIntelligence.recommendedCalculators.map((item) => item.label).join(", ")],
        ["Actiune recomandata", leadIntelligence.recommendedNextAction],
      ]
    : [];
  const text = [
    subject,
    "",
    `Lead ID: ${leadId}`,
    `Generat la: ${generatedAt}`,
    `Prioritate: ${scoring.priority} (${scoring.score}/100)`,
    `Sursa: ${lead.sourceTool} / ${lead.sourcePage}`,
    "",
    "Contact",
    `Nume: ${lead.name}`,
    `Companie: ${lead.company ?? "Nespecificata"}`,
    `Email: ${lead.email}`,
    `Telefon: ${lead.phone}`,
    "",
    "Context proiect",
    `Tip solicitare: ${lead.inquiryType}`,
    `Tip proiect: ${lead.projectType ?? "Nespecificat"}`,
    `Urgenta: ${lead.urgency ?? "Nespecificata"}`,
    `Buget orientativ: ${lead.generatedBudgetRange ?? "Nespecificat"}`,
    `Complexitate: ${lead.generatedComplexity ?? "Nespecificata"}`,
    `Risc: ${lead.generatedRiskLevel ?? "Nespecificat"}`,
    `Mesaj: ${lead.message ?? "Nespecificat"}`,
    "",
    `Rezumat: ${summary}`,
    leadIntelligence ? `Lead intelligence: ${leadIntelligence.internalSummary}` : "",
    leadIntelligence ? `Readiness: ${leadIntelligence.readinessScore}/100` : "",
    leadIntelligence ? `Complexitate: ${leadIntelligence.complexityLevel}` : "",
    leadIntelligence ? `Risc: ${leadIntelligence.riskLevel}` : "",
    leadIntelligence ? `Informatii lipsa: ${leadIntelligence.missingInformationSummary}` : "",
    leadIntelligence ? `Actiune inteligenta recomandata: ${leadIntelligence.recommendedNextAction}` : "",
    `Servicii recomandate: ${services}`,
    `Urmatorul pas: ${scoring.nextAction}`,
    `Rationale scor: ${scoringReasons}`,
    "",
    "Actiuni rapide",
    ...quickActions.map((action, index) => `${index + 1}. ${action}`),
    `Review intern: ${adminReviewLink}`,
    "",
    "Nota: analiza este preliminara si necesita validare tehnica ZES inainte de orice oferta finala.",
  ].join("\n");

  return {
    subject,
    previewText: `Lead ${scoring.priority}, scor ${scoring.score}/100: ${summary}`,
    text,
    html: renderHtmlShell({
      title: "Lead nou pentru triere tehnica",
      rows: [
        ["Lead ID", leadId],
        ["Generat la", generatedAt],
        ["Prioritate", `${scoring.priority} (${scoring.score}/100)`],
        ["Sursa", `${lead.sourceTool} / ${lead.sourcePage}`],
      ],
      sections: [
        {
          title: "Contact",
          rows: [
            ["Nume", lead.name],
            ["Companie", lead.company ?? "Nespecificata"],
            ["Email", lead.email],
            ["Telefon", lead.phone],
          ],
        },
        {
          title: "Context proiect",
          rows: [
        ["Solicitare", lead.inquiryType],
        ["Proiect", lead.projectType ?? "Nespecificat"],
        ["Urgenta", lead.urgency ?? "Nespecificata"],
        ["Buget", lead.generatedBudgetRange ?? "Nespecificat"],
        ["Complexitate", lead.generatedComplexity ?? "Nespecificata"],
        ["Risc", lead.generatedRiskLevel ?? "Nespecificat"],
            ["Mesaj", lead.message ?? "Nespecificat"],
          ],
        },
        {
          title: "Lead intelligence",
          rows: intelligenceRows,
        },
        {
          title: "Recomandare preliminara",
          rows: [
        ["Servicii", services],
        ["Urmatorul pas", scoring.nextAction],
            ["Rationale scor", scoringReasons],
            ["Review intern", adminReviewLink],
          ],
        },
        {
          title: "Actiuni rapide",
          rows: quickActions.map((action, index) => [
            `Pas ${index + 1}`,
            action,
          ]),
        },
      ],
      summary,
      footer:
        "Notificare interna pentru triere lead. Datele sunt transmise pentru analiza comerciala si tehnica preliminara; nu reprezinta oferta finala sau aprobare tehnica.",
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
  leadIntelligence,
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
    leadIntelligence ? `Lead intelligence: ${leadIntelligence.internalSummary}` : "",
    leadIntelligence ? `Actiune recomandata: ${leadIntelligence.recommendedNextAction}` : "",
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
        ["Readiness", leadIntelligence ? `${leadIntelligence.readinessScore}/100` : undefined],
        ["Complexitate", leadIntelligence?.complexityLevel],
        ["Follow-up", leadIntelligence?.followUpType],
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
  sections = [],
}: {
  title: string;
  rows: Array<[string, string | undefined]>;
  summary: string;
  footer: string;
  sections?: Array<{
    title: string;
    rows: Array<[string, string | undefined]>;
  }>;
}) {
  const allSections = [{ title: "Rezumat", rows }, ...sections]
    .map(({ title: sectionTitle, rows: sectionRows }) => {
      const rowsHtml = sectionRows
        .filter(([, value]) => value !== undefined && value !== "")
        .map(
          ([label, value]) =>
            `<tr><td style="padding:9px 0;color:#64748b;font-weight:700;width:34%;vertical-align:top;">${escapeHtml(
              label,
            )}</td><td style="padding:9px 0;color:#0f172a;vertical-align:top;">${formatHtmlValue(
              value ?? "",
            )}</td></tr>`,
        )
        .join("");

      if (!rowsHtml) return "";

      return `<section style="border-top:1px solid #e2e8f0;padding-top:18px;margin-top:18px;"><h2 style="margin:0 0 8px;color:#0f172a;font-size:15px;letter-spacing:.02em;">${escapeHtml(
        sectionTitle,
      )}</h2><table style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table></section>`;
    })
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f7fbff;font-family:Arial,sans-serif;color:#0f172a;"><div style="max-width:720px;margin:0 auto;padding:32px;"><div style="background:#ffffff;border:1px solid #dbeafe;border-radius:18px;padding:30px;box-shadow:0 18px 42px rgba(15,23,42,.08);"><p style="margin:0 0 12px;color:#0057b8;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">ZES MEDCORP</p><h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;">${escapeHtml(
    title,
  )}</h1><p style="margin:0 0 22px;line-height:1.7;color:#475569;">${escapeHtml(
    summary,
  )}</p>${allSections}<p style="margin:24px 0 0;color:#64748b;font-size:13px;line-height:1.6;">${escapeHtml(
    footer,
  )}</p><p style="margin:12px 0 0;color:#94a3b8;font-size:12px;line-height:1.5;">SC ZES MEDCORP S.R.L. | office@zescorp.ro | 0725 514 782</p></div></div></body></html>`;
}

function buildQuickActions({
  lead,
  scoring,
}: {
  lead: LeadPayload;
  scoring: LeadScoreResult;
}) {
  const context = normalizeText(
    [
      lead.sourceTool,
      lead.inquiryType,
      lead.projectType,
      lead.generatedRiskLevel,
      lead.generatedComplexity,
      lead.message,
    ]
      .filter(Boolean)
      .join(" "),
  );
  const actions = [
    scoring.nextAction,
    "Confirmati datele de contact si disponibilitatea pentru o discutie tehnica.",
  ];

  if (context.includes("rmn") || context.includes("rf")) {
    actions.push(
      "Solicitati informatii despre spatiu, trasee tehnice, RF shielding si echipamentul RMN avut in vedere.",
    );
  }

  if (
    context.includes("ct") ||
    context.includes("rx") ||
    context.includes("cncan") ||
    context.includes("radiologic")
  ) {
    actions.push(
      "Clarificati statusul documentatiei, cerintele de radioprotectie si configuratia camerei.",
    );
  }

  if (context.includes("ivd") || context.includes("laborator")) {
    actions.push(
      "Cereti detalii despre fluxul probelor, echipamentele IVD si cerintele de validare.",
    );
  }

  if (context.includes("service") || context.includes("mentenanta")) {
    actions.push(
      "Stabiliti impactul operational, istoricul interventiilor si disponibilitatea pentru diagnostic.",
    );
  }

  return Array.from(new Set(actions)).slice(0, 5);
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

function formatHtmlValue(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
