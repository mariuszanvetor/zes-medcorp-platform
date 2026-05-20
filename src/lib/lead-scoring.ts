import type { LeadPayload } from "@/lib/lead-types";

export type LeadPriority =
  | "Low priority"
  | "Medium priority"
  | "High priority"
  | "Critical / immediate opportunity";

export type LeadScoringInput = Partial<LeadPayload> & {
  estimatedBudgetRange?: string;
  recommendedServices?: string[];
};

export type LeadScoreResult = {
  score: number;
  priority: LeadPriority;
  reasons: string[];
  nextAction: string;
  signals: {
    sourceWeight: number;
    urgencyWeight: number;
    budgetWeight: number;
    complexityWeight: number;
    riskWeight: number;
    technicalIntentWeight: number;
  };
};

const criticalKeywords = [
  "critic",
  "critical",
  "imediat",
  "urgent",
  "downtime",
  "eroare",
  "oprit",
];

const radiologyKeywords = [
  "rmn",
  "mri",
  "ct",
  "rx",
  "radiologie",
  "cncan",
  "radioprotectie",
  "radioprotec",
  "plumb",
  "rf",
  "faraday",
];

const equipmentKeywords = [
  "aparatura",
  "echipament",
  "imagistica",
  "ivd",
  "laborator",
  "service",
  "mentenanta",
];

export function scoreLead(input: LeadScoringInput): LeadScoreResult {
  const text = normalize(
    [
      input.sourceTool,
      input.inquiryType,
      input.projectType,
      input.urgency,
      input.generatedBudgetRange,
      input.estimatedBudgetRange,
      input.generatedComplexity,
      input.generatedRiskLevel,
      input.generatedSummary,
      input.recommendedServices?.join(" "),
      input.metadata ? Object.values(input.metadata).join(" ") : "",
    ].join(" "),
  );
  const reasons: string[] = [];
  let score = 18;

  const sourceWeight = getSourceWeight(input.sourceTool);
  score += sourceWeight.value;
  if (sourceWeight.reason) reasons.push(sourceWeight.reason);

  const urgencyWeight = getUrgencyWeight(input.urgency ?? text);
  score += urgencyWeight.value;
  if (urgencyWeight.reason) reasons.push(urgencyWeight.reason);

  const budgetWeight = getBudgetWeight(
    input.generatedBudgetRange ?? input.estimatedBudgetRange,
  );
  score += budgetWeight.value;
  if (budgetWeight.reason) reasons.push(budgetWeight.reason);

  const complexityWeight = getComplexityWeight(input.generatedComplexity ?? text);
  score += complexityWeight.value;
  if (complexityWeight.reason) reasons.push(complexityWeight.reason);

  const riskWeight = getRiskWeight(input.generatedRiskLevel ?? text);
  score += riskWeight.value;
  if (riskWeight.reason) reasons.push(riskWeight.reason);

  const technicalIntentWeight = getTechnicalIntentWeight(text);
  score += technicalIntentWeight.value;
  reasons.push(...technicalIntentWeight.reasons);

  if (!input.generatedSummary && normalize(input.sourceTool).includes("contact")) {
    score -= 6;
    reasons.push("Contact form lead without generated technical summary.");
  }

  const normalizedScore = clampScore(score);
  const priority = getLeadPriority(normalizedScore);

  return {
    score: normalizedScore,
    priority,
    reasons: reasons.length ? reasons : ["Basic lead context available."],
    nextAction: getNextAction(priority, text),
    signals: {
      sourceWeight: sourceWeight.value,
      urgencyWeight: urgencyWeight.value,
      budgetWeight: budgetWeight.value,
      complexityWeight: complexityWeight.value,
      riskWeight: riskWeight.value,
      technicalIntentWeight: technicalIntentWeight.value,
    },
  };
}

export function getLeadPriority(score: number): LeadPriority {
  if (score >= 80) return "Critical / immediate opportunity";
  if (score >= 60) return "High priority";
  if (score >= 35) return "Medium priority";
  return "Low priority";
}

function getSourceWeight(sourceTool: string | undefined) {
  const source = normalize(sourceTool);

  if (source.includes("proposal")) {
    return { value: 18, reason: "Proposal Builder indicates strong buying intent." };
  }

  if (source.includes("service-diagnostic") || source.includes("service diagnostic")) {
    return { value: 16, reason: "Service diagnostic lead can require fast routing." };
  }

  if (source.includes("radiology") || source.includes("planner")) {
    return { value: 14, reason: "Radiology planning lead has high technical intent." };
  }

  if (source.includes("calculator")) {
    return { value: 9, reason: "Calculator lead shows active project evaluation." };
  }

  if (source.includes("ai-project-advisor") || source.includes("advisor")) {
    return { value: 11, reason: "AI advisor lead includes structured technical context." };
  }

  if (source.includes("contact")) {
    return { value: 4, reason: "Contact form lead requires qualification." };
  }

  return { value: 6, reason: "Lead source has moderate intent." };
}

function getUrgencyWeight(value: string) {
  const urgency = normalize(value);

  if (
    urgency.includes("imediat") ||
    urgency.includes("immediate") ||
    urgency.includes("urgent") ||
    urgency.includes("24-48") ||
    urgency.includes("24") && urgency.includes("48")
  ) {
    return { value: 18, reason: "Urgency requires quick commercial or technical follow-up." };
  }

  if (urgency.includes("1-3") || urgency.includes("1–3")) {
    return { value: 12, reason: "Near-term timeline increases lead priority." };
  }

  if (urgency.includes("3-6") || urgency.includes("3–6")) {
    return { value: 6, reason: "Medium-term project horizon is commercially relevant." };
  }

  if (urgency.includes("exploratoriu")) {
    return { value: 0, reason: "Exploratory timeline needs nurturing." };
  }

  return { value: 3, reason: "Timeline requires qualification." };
}

function getBudgetWeight(value: string | undefined) {
  const parsed = parseBudget(value);

  if (parsed >= 550) {
    return { value: 18, reason: "High indicative budget range." };
  }

  if (parsed >= 180) {
    return { value: 12, reason: "Substantial indicative project budget." };
  }

  if (parsed >= 60) {
    return { value: 7, reason: "Defined commercial budget range." };
  }

  if (value && normalize(value).includes("service")) {
    return { value: 5, reason: "Service evaluation may convert into recurring support." };
  }

  return { value: 0, reason: "" };
}

function getComplexityWeight(value: string) {
  const complexity = normalize(value);

  if (complexity.includes("high-complexity")) {
    return { value: 18, reason: "High-complexity medical infrastructure." };
  }

  if (complexity.includes("enterprise")) {
    return { value: 15, reason: "Enterprise-level technical scope." };
  }

  if (complexity.includes("advanced")) {
    return { value: 10, reason: "Advanced project complexity." };
  }

  if (complexity.includes("moderate")) {
    return { value: 5, reason: "Moderate project complexity." };
  }

  return { value: 0, reason: "" };
}

function getRiskWeight(value: string) {
  const risk = normalize(value);

  if (risk.includes("critic") || risk.includes("critical")) {
    return { value: 20, reason: "Critical risk level." };
  }

  if (risk.includes("ridicat") || risk.includes("high")) {
    return { value: 12, reason: "High technical or operational risk." };
  }

  if (risk.includes("mediu") || risk.includes("medium")) {
    return { value: 6, reason: "Medium risk requires qualification." };
  }

  return { value: 0, reason: "" };
}

function getTechnicalIntentWeight(text: string) {
  let value = 0;
  const reasons: string[] = [];

  if (radiologyKeywords.some((keyword) => text.includes(keyword))) {
    value += 12;
    reasons.push("Radiology, shielding, RF, CT/RX/RMN or CNCAN intent detected.");
  }

  if (equipmentKeywords.some((keyword) => text.includes(keyword))) {
    value += 7;
    reasons.push("Equipment, imaging, IVD, laboratory or service intent detected.");
  }

  if (criticalKeywords.some((keyword) => text.includes(keyword))) {
    value += 8;
    reasons.push("Urgent or operational-risk language detected.");
  }

  if (text.includes("turnkey") || text.includes("clinica") || text.includes("spital")) {
    value += 6;
    reasons.push("Project-scale medical infrastructure context detected.");
  }

  return { value, reasons };
}

function getNextAction(priority: LeadPriority, text: string) {
  if (priority === "Critical / immediate opportunity") {
    if (text.includes("service") || text.includes("eroare") || text.includes("downtime")) {
      return "Route to service lead owner for same-day triage.";
    }

    return "Route to senior technical consultant for immediate qualification.";
  }

  if (priority === "High priority") {
    return "Schedule technical discovery and request plans, equipment specs or authorization status.";
  }

  if (priority === "Medium priority") {
    return "Qualify requirements, budget horizon and decision timeline.";
  }

  return "Add to nurturing flow and request missing project context.";
}

function parseBudget(value: string | undefined) {
  if (!value) return 0;

  const normalized = normalize(value);
  if (!normalized.includes("eur") && !normalized.includes("€")) return 0;

  const numbers = normalized.match(/\d+/g)?.map(Number) ?? [];
  if (!numbers.length) return 0;

  return Math.max(...numbers);
}

function normalize(value: string | undefined) {
  return (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}
