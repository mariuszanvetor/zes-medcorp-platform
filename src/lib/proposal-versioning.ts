export type ProposalRevisionReason =
  | "initial-generation"
  | "client-input-update"
  | "technical-validation"
  | "budget-revision"
  | "scope-revision"
  | "future-saved-version";

export type ProposalSnapshotSource = {
  title: string;
  generatedAt: string;
  generatedTimestamp: string;
  summary: {
    projectType: string;
    complexity: string;
    score: number;
  };
  recommendedServices: string[];
  budgetEstimate: {
    totalRange: string;
  };
  timeline: {
    estimatedDuration: string;
  };
  risks: Array<{
    category: string;
    severity: string;
  }>;
  assumptions: string[];
  missingInformation: string[];
};

export type ProposalSnapshot = {
  proposalId: string;
  version: number;
  versionLabel: string;
  documentType: "Propunere tehnică preliminară";
  revisionReason: ProposalRevisionReason;
  generatedAt: string;
  generatedTimestamp: string;
  projectType: string;
  complexity: string;
  score: number;
  budgetRange: string;
  timelineRange: string;
  riskLevel?: string;
  recommendedServices: string[];
  assumptionsCount: number;
  missingInformationCount: number;
  contentHash: string;
  persisted: false;
};

export type ProposalVersion = {
  proposalId: string;
  version: number;
  versionLabel: string;
  snapshot: ProposalSnapshot;
  createdAt: string;
  revisionReason: ProposalRevisionReason;
  persisted: false;
};

export type ProposalExportEvent = {
  proposalId: string;
  versionLabel: string;
  exportType: "pdf" | "print";
  filename?: string;
  exportedAt: string;
  sourcePage: "/proposal-builder";
  persisted: false;
};

export function createProposalSnapshot(
  source: ProposalSnapshotSource,
  revisionReason: ProposalRevisionReason = "initial-generation",
): ProposalSnapshot {
  const contentHash = stableHash(
    JSON.stringify({
      title: source.title,
      projectType: source.summary.projectType,
      complexity: source.summary.complexity,
      score: source.summary.score,
      recommendedServices: source.recommendedServices,
      budgetRange: source.budgetEstimate.totalRange,
      timelineRange: source.timeline.estimatedDuration,
      risks: source.risks,
      assumptions: source.assumptions,
      missingInformation: source.missingInformation,
    }),
  );
  const proposalId = `ZES-PROP-${dateStamp(source.generatedTimestamp)}-${contentHash
    .slice(0, 6)
    .toUpperCase()}`;
  const version = 1;

  return {
    proposalId,
    version,
    versionLabel: getProposalVersionLabel(version),
    documentType: "Propunere tehnică preliminară",
    revisionReason,
    generatedAt: source.generatedAt,
    generatedTimestamp: source.generatedTimestamp,
    projectType: source.summary.projectType,
    complexity: source.summary.complexity,
    score: source.summary.score,
    budgetRange: source.budgetEstimate.totalRange,
    timelineRange: source.timeline.estimatedDuration,
    riskLevel: source.risks[0]?.severity,
    recommendedServices: source.recommendedServices,
    assumptionsCount: source.assumptions.length,
    missingInformationCount: source.missingInformation.length,
    contentHash,
    persisted: false,
  };
}

export function getProposalVersionLabel(version = 1) {
  return `v${version}.0 - previzualizare locală`;
}

export function compareProposalSnapshots() {
  return {
    changed: false,
    summary:
      "Compararea versiunilor va fi disponibilă după activarea salvării propunerilor.",
  };
}

function dateStamp(timestamp: string) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "LOCAL";
  }

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
}

function stableHash(value: string) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}
