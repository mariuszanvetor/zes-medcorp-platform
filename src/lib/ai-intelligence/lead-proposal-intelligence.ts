import { createAdaptiveDiscoveryPlan } from "@/lib/ai-intelligence/discovery";
import { planDocumentUnderstandingWorkflow } from "@/lib/ai-intelligence/document-intelligence";
import { generateIntelligenceRecommendations } from "@/lib/ai-intelligence/recommendation-engine";
import { evaluateRegulatoryAwareness } from "@/lib/ai-intelligence/regulatory-awareness";
import type {
  ComplexityLevel,
  IntelligenceInput,
  MissingInformationItem,
  ProposalIntelligenceContext,
} from "@/lib/ai-intelligence/types";

export type LeadIntelligenceScore = {
  score: number;
  readiness: "exploratory" | "qualified" | "technical-review-ready" | "proposal-ready";
  priority: "low" | "medium" | "high" | "critical";
  complexity: ComplexityLevel;
  reasons: string[];
};

export function createProposalIntelligenceContext(input: IntelligenceInput): ProposalIntelligenceContext {
  const discovery = createAdaptiveDiscoveryPlan(input);
  const recommendationSet = generateIntelligenceRecommendations(input);
  const regulatoryFlags = evaluateRegulatoryAwareness(input);
  const documentWorkflow = planDocumentUnderstandingWorkflow(input);

  return {
    summary: buildSummary(input, discovery.detectedDomains),
    likelyDomains: discovery.detectedDomains,
    likelyServices: recommendationSet.recommendedServices,
    assumptions: [
      "Analiza este preliminara si se bazeaza pe informatiile introduse.",
      "Cerintele finale depind de echipamente, planuri, amplasament si validare de specialitate.",
      ...documentWorkflow.suggestedArtifacts.slice(0, 2).map((artifact) => `${artifact.label} poate reduce incertitudinea.`),
    ],
    missingInformation: discovery.missingInformation,
    validationNeeds: [
      ...regulatoryFlags.map((flag) => flag.title),
      ...recommendationSet.recommendations
        .filter((recommendation) => recommendation.validationRequired)
        .slice(0, 4)
        .map((recommendation) => recommendation.title),
    ],
    recommendedNextActions: recommendationSet.recommendations
      .filter((recommendation) => recommendation.kind === "next-step" || recommendation.validationRequired)
      .slice(0, 5)
      .map((recommendation) => recommendation.title),
  };
}

export function scoreLeadIntelligence(input: IntelligenceInput): LeadIntelligenceScore {
  const discovery = createAdaptiveDiscoveryPlan(input);
  const missing = discovery.missingInformation;
  const regulatoryFlags = evaluateRegulatoryAwareness(input);
  const complexity = estimateProjectComplexity(input, missing.length, regulatoryFlags.length);
  let score = discovery.confidence.score;
  const reasons = [...discovery.confidence.reasons];

  if (input.urgency && /urgent|imediat|1-3|activ|oprit/i.test(input.urgency)) {
    score += 12;
    reasons.push("Urgency signal detected.");
  }

  if (input.equipmentSpecsAvailable) score += 8;
  if (input.plansAvailable) score += 8;
  if (regulatoryFlags.length) {
    score += 6;
    reasons.push("Regulatory or validation awareness needed.");
  }
  if (complexity === "critical") score += 10;
  if (complexity === "high") score += 6;

  const normalized = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score: normalized,
    readiness: readinessFromScore(normalized, missing),
    priority: priorityFromScore(normalized, complexity),
    complexity,
    reasons,
  };
}

function estimateProjectComplexity(
  input: IntelligenceInput,
  missingInformationCount: number,
  regulatoryFlagCount: number,
): ComplexityLevel {
  let score = 0;
  const domains = input.domains ?? [];

  if (domains.some((domain) => ["mri", "ct", "surgery-or", "ati-critical-care"].includes(domain))) score += 3;
  if (domains.includes("clinic-modernization") || input.modernization) score += 2;
  if (domains.length > 2) score += 2;
  if (regulatoryFlagCount) score += regulatoryFlagCount;
  if (missingInformationCount > 5) score += 1;
  if (input.existingBuilding) score += 1;

  if (score >= 7) return "critical";
  if (score >= 5) return "high";
  if (score >= 3) return "moderate";
  return "low";
}

function readinessFromScore(score: number, missing: MissingInformationItem[]): LeadIntelligenceScore["readiness"] {
  const hasCriticalMissing = missing.some((item) => item.priority === "critical");
  if (score >= 78 && !hasCriticalMissing) return "proposal-ready";
  if (score >= 60) return "technical-review-ready";
  if (score >= 38) return "qualified";
  return "exploratory";
}

function priorityFromScore(score: number, complexity: ComplexityLevel): LeadIntelligenceScore["priority"] {
  if (score >= 82 || complexity === "critical") return "critical";
  if (score >= 65 || complexity === "high") return "high";
  if (score >= 40) return "medium";
  return "low";
}

function buildSummary(input: IntelligenceInput, domains: string[]) {
  const domainText = domains.length ? domains.join(", ") : "medical infrastructure";
  const stageText = input.projectStage ?? "early discovery";
  return `Project context points to ${domainText} at ${stageText} stage. Further validation should focus on missing plans, equipment data, infrastructure dependencies and operational constraints.`;
}
