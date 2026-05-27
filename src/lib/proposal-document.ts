import type {
  AdvancedComplexityLevel,
  BudgetBand,
  BudgetEstimate,
  ConfidenceEstimate,
  RiskItem,
  RiskSeverity,
  TimelineEstimate,
  TimelinePhase,
} from "@/lib/ai-estimation";
import { BUDGET_DISCLAIMER } from "@/lib/ai-estimation";
import type { ProposalIntelligenceOutput } from "@/lib/ai-intelligence/proposal-intelligence";
import { brand, companyContact } from "@/lib/brand";
import type { AssembledProposal } from "@/lib/proposal-assembly";
import {
  createProposalSnapshot,
  type ProposalSnapshot,
} from "@/lib/proposal-versioning";

export type ProposalDocumentStatus = "preview" | "ready-for-review";

export type ProposalDocumentLine = {
  label: string;
  value: string;
  note?: string;
};

export type ProposalDocumentPhase = {
  title: string;
  duration?: string;
  dependency?: string;
};

export type ProposalDocumentRisk = {
  category: string;
  severity: RiskSeverity;
  explanation: string;
  mitigation: string;
};

export type ProposalDocumentBudget = {
  band: BudgetBand;
  totalRange: string;
  phaseBreakdown: ProposalDocumentLine[];
  serviceBreakdown: ProposalDocumentLine[];
  disclaimer: string;
};

export type ProposalDocumentTimeline = {
  estimatedDuration: string;
  phases: ProposalDocumentPhase[];
  criticalDependencies: string[];
  riskFactors: string[];
};

export type ProposalDocumentSummary = {
  projectType: string;
  executiveSummary: string;
  complexity: AdvancedComplexityLevel;
  score: number;
  confidence: ConfidenceEstimate;
};

export type ProposalDocument = {
  status: ProposalDocumentStatus;
  brandName: string;
  company: typeof companyContact;
  proposalId: string;
  versionLabel: string;
  documentType: ProposalSnapshot["documentType"];
  title: string;
  subtitle: string;
  preparedBy: string;
  generatedAt: string;
  generatedTimestamp: string;
  generatedLabel: string;
  summary: ProposalDocumentSummary;
  recommendedServices: string[];
  phases: ProposalDocumentPhase[];
  budgetEstimate: ProposalDocumentBudget;
  timeline: ProposalDocumentTimeline;
  risks: ProposalDocumentRisk[];
  assumptions: string[];
  missingInformation: string[];
  nextSteps: string[];
  nextStep: string;
  assembly: AssembledProposal;
  proposalIntelligence?: ProposalIntelligenceOutput;
  snapshot: ProposalSnapshot;
  disclaimer: string;
};

export type ProposalDocumentSource = {
  title: string;
  executiveSummary: string;
  score: number;
  complexity: AdvancedComplexityLevel;
  proposalType: string;
  recommendedServices: string[];
  phases: string[];
  budget: BudgetEstimate;
  timeline: TimelineEstimate;
  risks: RiskItem[];
  assumptions: string[];
  missingData: string[];
  confidence: ConfidenceEstimate;
  nextSteps: string[];
  nextStep: string;
  assembly: AssembledProposal;
  proposalIntelligence?: ProposalIntelligenceOutput;
};

export function createProposalDocument(
  source: ProposalDocumentSource,
): ProposalDocument {
  const generatedDate = new Date();
  const generatedTimestamp = generatedDate.toISOString();
  const generatedAt = new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "long",
    year: "numeric",
  }).format(generatedDate);

  const baseDocument = {
    status: "preview",
    brandName: brand.brandName,
    company: companyContact,
    proposalId: "",
    versionLabel: "",
    documentType: "Propunere tehnică preliminară" as const,
    title: source.title,
    subtitle: "Propunere tehnică preliminară",
    preparedBy: brand.brandName,
    generatedAt,
    generatedTimestamp,
    generatedLabel: "Previzualizare generată în Proposal Builder",
    summary: {
      projectType: source.proposalType,
      executiveSummary: source.executiveSummary,
      complexity: source.complexity,
      score: source.score,
      confidence: source.confidence,
    },
    recommendedServices: source.recommendedServices,
    phases: source.phases.map((phase) => ({ title: phase })),
    budgetEstimate: {
      band: source.budget.band,
      totalRange: source.budget.totalRange,
      phaseBreakdown: source.budget.phaseBreakdown.map(toDocumentLine),
      serviceBreakdown: source.budget.serviceBreakdown.map(toDocumentLine),
      disclaimer: source.budget.disclaimer || BUDGET_DISCLAIMER,
    },
    timeline: {
      estimatedDuration: source.timeline.estimatedDuration,
      phases: source.timeline.phases.map(toDocumentPhase),
      criticalDependencies: source.timeline.criticalDependencies,
      riskFactors: source.timeline.riskFactors,
    },
    risks: source.risks.map((risk) => ({
      category: risk.category,
      severity: risk.level,
      explanation: risk.explanation,
      mitigation: risk.mitigation,
    })),
    assumptions: source.assumptions,
    missingInformation: source.missingData,
    nextSteps: source.nextSteps,
    nextStep: source.nextStep,
    assembly: source.assembly,
    proposalIntelligence: source.proposalIntelligence,
    snapshot: undefined as unknown as ProposalSnapshot,
    disclaimer: source.budget.disclaimer || BUDGET_DISCLAIMER,
  } satisfies ProposalDocument;
  const snapshot = createProposalSnapshot(baseDocument);

  return {
    ...baseDocument,
    proposalId: snapshot.proposalId,
    versionLabel: snapshot.versionLabel,
    documentType: snapshot.documentType,
    snapshot,
  };
}

function toDocumentLine(line: BudgetEstimate["phaseBreakdown"][number]) {
  return {
    label: line.label,
    value: line.range,
    note: line.note,
  };
}

function toDocumentPhase(phase: TimelinePhase): ProposalDocumentPhase {
  return {
    title: phase.phase,
    duration: phase.duration,
    dependency: phase.dependency,
  };
}
