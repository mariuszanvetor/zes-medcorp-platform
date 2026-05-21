export const analyticsEventNames = [
  "cta_click",
  "consultation_click",
  "ai_tool_click",
  "ai_project_advisor_start",
  "ai_project_advisor_complete",
  "calculator_project_complete",
  "radiology_planner_complete",
  "service_diagnostic_complete",
  "proposal_builder_complete",
  "programmatic_calculator_complete",
  "intake_start",
  "intake_complete",
  "intake_lead_submit",
  "intake_next_step_click",
  "proposal_pdf_export",
  "proposal_print",
  "lead_form_view",
  "lead_form_submit_attempt",
  "lead_form_submit_success",
  "lead_form_submit_error",
  "article_cta_click",
  "guide_cta_click",
  "calculator_cta_click",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export type AnalyticsPayload = {
  sourcePage?: string;
  sourceTool?: string;
  inquiryType?: string;
  projectType?: string;
  estimatedBudgetRange?: string;
  complexity?: string;
  riskLevel?: string;
  urgency?: string;
  ctaLabel?: string;
  destination?: string;
  articleSlug?: string;
  guideSlug?: string;
  calculatorSlug?: string;
  journeySlug?: string;
  proposalId?: string;
  versionLabel?: string;
  status?: string;
};

export type ToolTrackingId =
  | "ai-project-advisor"
  | "calculator-proiect-medical"
  | "radiology-room-planner"
  | "service-diagnostic"
  | "proposal-builder"
  | "project-intake"
  | "programmatic-calculator";

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

const toolCompletionEvents: Record<ToolTrackingId, AnalyticsEventName> = {
  "ai-project-advisor": "ai_project_advisor_complete",
  "calculator-proiect-medical": "calculator_project_complete",
  "radiology-room-planner": "radiology_planner_complete",
  "service-diagnostic": "service_diagnostic_complete",
  "proposal-builder": "proposal_builder_complete",
  "project-intake": "intake_complete",
  "programmatic-calculator": "programmatic_calculator_complete",
};

const piiKeys = new Set([
  "name",
  "email",
  "phone",
  "company",
  "contactName",
  "message",
  "generatedSummary",
]);

export function trackEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const analyticsWindow = window as AnalyticsWindow;
    const eventPayload = {
      event: eventName,
      sourcePage: payload.sourcePage ?? getCurrentPath(),
      ...sanitizePayload(payload),
    };

    if (analyticsWindow.dataLayer) {
      analyticsWindow.dataLayer.push(eventPayload);
    }

    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics]", eventName, eventPayload);
    }
  } catch {
    // Analytics must never block lead capture, navigation, or tool UX.
  }
}

export function trackLeadEvent(
  eventName: Extract<
    AnalyticsEventName,
    | "lead_form_view"
    | "lead_form_submit_attempt"
    | "lead_form_submit_success"
    | "lead_form_submit_error"
  >,
  payload: AnalyticsPayload = {},
) {
  trackEvent(eventName, payload);
}

export function trackToolStart(
  sourceTool: ToolTrackingId,
  payload: AnalyticsPayload = {},
) {
  trackEvent(
    sourceTool === "project-intake"
      ? "intake_start"
      : sourceTool === "ai-project-advisor"
      ? "ai_project_advisor_start"
      : "ai_tool_click",
    {
      ...payload,
      sourceTool,
    },
  );
}

export function trackToolComplete(
  sourceTool: ToolTrackingId,
  payload: AnalyticsPayload = {},
) {
  trackEvent(toolCompletionEvents[sourceTool], {
    ...payload,
    sourceTool,
  });
}

export function trackCTA(payload: AnalyticsPayload = {}) {
  const normalizedPayload = {
    ...payload,
    sourcePage: payload.sourcePage ?? getCurrentPath(),
  };

  trackEvent("cta_click", normalizedPayload);

  for (const contextualEvent of getContextualCTAEvents(normalizedPayload)) {
    trackEvent(contextualEvent, normalizedPayload);
  }
}

function getContextualCTAEvents(
  payload: AnalyticsPayload,
): AnalyticsEventName[] {
  const sourcePage = payload.sourcePage ?? "";
  const destination = payload.destination ?? "";
  const events = new Set<AnalyticsEventName>();

  if (sourcePage.includes("/knowledge-hub/")) {
    events.add("article_cta_click");
  }

  if (sourcePage.includes("/ghiduri/")) {
    events.add("guide_cta_click");
  }

  if (sourcePage.includes("/calculatoare/") || destination.includes("/calculatoare/")) {
    events.add("calculator_cta_click");
  }

  if (destination === "/contact" || destination.includes("/contact")) {
    events.add("consultation_click");
  }

  if (
    destination.includes("/ai-project-advisor") ||
    destination.includes("/calculator-proiect-medical") ||
    destination.includes("/calculatoare/") ||
    destination.includes("/radiology-room-planner") ||
    destination.includes("/service-diagnostic") ||
    destination.includes("/proposal-builder") ||
    destination.includes("/project-intake")
  ) {
    events.add("ai_tool_click");
  }

  return [...events];
}

function getCurrentPath() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.pathname;
}

function sanitizePayload(payload: AnalyticsPayload) {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([key, value]) => !piiKeys.has(key) && value !== undefined && value !== "",
    ),
  );
}
