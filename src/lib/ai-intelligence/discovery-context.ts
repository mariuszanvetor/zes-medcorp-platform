import type { OrchestratedDiscoveryResult } from "@/lib/ai-intelligence/discovery-orchestrator";
import type { MockDocumentParsingResult } from "@/lib/ai-intelligence/document-intelligence";
import type { IntelligenceInput, MedicalDomainId } from "@/lib/ai-intelligence/types";

export const DISCOVERY_CONTEXT_STORAGE_KEY = "zes.aiDiscovery.context.v1";
export const DISCOVERY_CONTEXT_QUERY_SOURCE = "ai-discovery";

export type DiscoveryContextNextStep =
  | "proposal-builder"
  | "project-intake"
  | "technical-review"
  | "unknown";

export type SerializableMockDocumentContext = {
  mode: "mock";
  fileType: string;
  acceptedForFutureParsing: boolean;
  mockSignals: string[];
  missingInformation: string[];
  warnings: string[];
  privacyNotes: string[];
  contextTargets: string[];
  suggestedNextAction: string;
};

export type SerializableDiscoveryContext = {
  id: string;
  source: "ai-discovery";
  createdAt: string;
  updatedAt: string;
  selectedNextStep: DiscoveryContextNextStep;
  project: {
    domains: MedicalDomainId[];
    stage: string;
    notes?: string;
    knownAnswers: {
      existingBuilding?: boolean;
      modernization?: boolean;
      plansAvailable?: boolean;
      equipmentSpecsAvailable?: boolean;
      locationKnown?: boolean;
      surfaceKnown?: boolean;
      budgetKnown?: boolean;
      timelineKnown?: boolean;
    };
  };
  intelligence: {
    confidenceScore: number;
    confidenceLevel: string;
    missingInformation: string[];
    riskLevel: string;
    complexityLevel: string;
    readinessScore: number;
    validationNeeds: string[];
  };
  recommendations: {
    suggestedServices: string[];
    suggestedCalculators: Array<{ label: string; href: string }>;
    suggestedResources: Array<{ label: string; href: string; type: string }>;
    uploadNeededFlags: string[];
    nextActions: string[];
  };
  mockDocumentContext?: SerializableMockDocumentContext;
  generatedSummary: string;
};

export function createSerializableDiscoveryContext({
  input,
  mockDocumentContext,
  result,
  selectedNextStep = "unknown",
}: {
  input: IntelligenceInput;
  mockDocumentContext?: MockDocumentParsingResult | null;
  result: OrchestratedDiscoveryResult;
  selectedNextStep?: DiscoveryContextNextStep;
}): SerializableDiscoveryContext {
  const now = new Date().toISOString();
  const context: SerializableDiscoveryContext = {
    id: createContextId(),
    source: "ai-discovery",
    createdAt: now,
    updatedAt: now,
    selectedNextStep,
    project: {
      domains: result.detectedDomains.slice(0, 8),
      stage: result.projectStage,
      notes: truncate(input.freeText, 900),
      knownAnswers: {
        existingBuilding: input.existingBuilding,
        modernization: input.modernization,
        plansAvailable: input.plansAvailable,
        equipmentSpecsAvailable: input.equipmentSpecsAvailable,
        locationKnown: input.locationKnown,
        surfaceKnown: input.surfaceKnown,
        budgetKnown: input.budgetKnown,
        timelineKnown: input.timelineKnown,
      },
    },
    intelligence: {
      confidenceScore: result.confidenceScore,
      confidenceLevel: result.confidenceLevel,
      missingInformation: result.missingInformation.map((item) => item.label).slice(0, 8),
      riskLevel: result.riskAssessment.riskLevel,
      complexityLevel: result.riskAssessment.complexityLevel,
      readinessScore: result.leadIntelligence.readinessScore,
      validationNeeds: result.riskAssessment.validationNeeds.slice(0, 8),
    },
    recommendations: {
      suggestedServices: result.likelyServices.slice(0, 8),
      suggestedCalculators: result.relevantResources
        .filter((resource) => resource.type === "calculator")
        .slice(0, 5)
        .map(({ label, href }) => ({ label, href })),
      suggestedResources: result.relevantResources.slice(0, 8).map(({ label, href, type }) => ({
        label,
        href,
        type,
      })),
      uploadNeededFlags: result.uploadPrompts.map((prompt) => prompt.title).slice(0, 6),
      nextActions: result.recommendations.map((item) => item.title).slice(0, 6),
    },
    mockDocumentContext: mockDocumentContext
      ? serializeMockDocumentContext(mockDocumentContext)
      : undefined,
    generatedSummary: "",
  };

  return {
    ...context,
    generatedSummary: createDiscoveryContextSummary(context),
  };
}

export function saveDiscoveryContext(context: SerializableDiscoveryContext) {
  if (typeof window === "undefined") return false;

  try {
    const serialized = JSON.stringify({
      ...context,
      updatedAt: new Date().toISOString(),
    });
    window.sessionStorage.setItem(DISCOVERY_CONTEXT_STORAGE_KEY, serialized);
    window.localStorage.setItem(DISCOVERY_CONTEXT_STORAGE_KEY, serialized);
    return true;
  } catch {
    return false;
  }
}

export function loadDiscoveryContext() {
  if (typeof window === "undefined") return null;

  try {
    const serialized =
      window.sessionStorage.getItem(DISCOVERY_CONTEXT_STORAGE_KEY) ??
      window.localStorage.getItem(DISCOVERY_CONTEXT_STORAGE_KEY);

    if (!serialized) return null;

    return sanitizeDiscoveryContext(JSON.parse(serialized));
  } catch {
    return null;
  }
}

export function clearDiscoveryContext() {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(DISCOVERY_CONTEXT_STORAGE_KEY);
    window.localStorage.removeItem(DISCOVERY_CONTEXT_STORAGE_KEY);
  } catch {
    // Local handoff must never block the user.
  }
}

export function createDiscoveryContextSummary(context: SerializableDiscoveryContext) {
  return [
    "Context initial din AI Discovery.",
    `Domenii detectate: ${context.project.domains.join(", ") || "neclar"}.`,
    `Stadiu: ${context.project.stage}. Incredere: ${context.intelligence.confidenceScore}/100 (${context.intelligence.confidenceLevel}).`,
    `Risc: ${context.intelligence.riskLevel}. Complexitate: ${context.intelligence.complexityLevel}. Readiness: ${context.intelligence.readinessScore}/100.`,
    `Informatii lipsa: ${context.intelligence.missingInformation.join("; ") || "nu sunt marcate"}.`,
    `Validari necesare: ${context.intelligence.validationNeeds.join("; ") || "de clarificat"}.`,
    `Servicii sugerate: ${context.recommendations.suggestedServices.join("; ") || "de clarificat"}.`,
    `Documente utile: ${context.recommendations.uploadNeededFlags.join("; ") || "nu sunt marcate"}.`,
    context.mockDocumentContext
      ? `Context documentar mock: ${context.mockDocumentContext.fileType}; semnale: ${context.mockDocumentContext.mockSignals.join("; ") || "nu sunt marcate"}; informatii lipsa: ${context.mockDocumentContext.missingInformation.join("; ") || "nu sunt marcate"}.`
      : "",
    "Acest context este local, preliminar si nu inlocuieste analiza tehnica finala.",
  ].filter(Boolean).join("\n");
}

export function hasDiscoveryContextQuery(searchParams: URLSearchParams) {
  return searchParams.get("source") === DISCOVERY_CONTEXT_QUERY_SOURCE;
}

function sanitizeDiscoveryContext(value: unknown): SerializableDiscoveryContext | null {
  if (!value || typeof value !== "object") return null;
  const context = value as SerializableDiscoveryContext;
  if (context.source !== "ai-discovery" || !context.id || !context.project || !context.intelligence) {
    return null;
  }

  return {
    ...context,
    project: {
      ...context.project,
      domains: (context.project.domains ?? []).slice(0, 8),
      notes: truncate(context.project.notes, 900),
    },
    intelligence: {
      ...context.intelligence,
      missingInformation: (context.intelligence.missingInformation ?? []).slice(0, 8),
      validationNeeds: (context.intelligence.validationNeeds ?? []).slice(0, 8),
    },
    recommendations: {
      suggestedServices: (context.recommendations?.suggestedServices ?? []).slice(0, 8),
      suggestedCalculators: (context.recommendations?.suggestedCalculators ?? []).slice(0, 5),
      suggestedResources: (context.recommendations?.suggestedResources ?? []).slice(0, 8),
      uploadNeededFlags: (context.recommendations?.uploadNeededFlags ?? []).slice(0, 6),
      nextActions: (context.recommendations?.nextActions ?? []).slice(0, 6),
    },
    mockDocumentContext: sanitizeMockDocumentContext(context.mockDocumentContext),
    generatedSummary: truncate(context.generatedSummary, 1600) ?? "",
  };
}

function serializeMockDocumentContext(
  result: MockDocumentParsingResult,
): SerializableMockDocumentContext {
  return {
    mode: "mock",
    fileType: result.fileType,
    acceptedForFutureParsing: result.acceptedForFutureParsing,
    mockSignals: result.mockSignals.slice(0, 8),
    missingInformation: result.missingInformation.slice(0, 8),
    warnings: result.warnings.slice(0, 8),
    privacyNotes: result.privacyNotes.slice(0, 6),
    contextTargets: result.contextTargets.slice(0, 4),
    suggestedNextAction: truncate(result.suggestedNextAction, 280) ?? "",
  };
}

function sanitizeMockDocumentContext(
  value: SerializableMockDocumentContext | undefined,
): SerializableMockDocumentContext | undefined {
  if (!value || value.mode !== "mock" || !value.fileType) return undefined;

  return {
    mode: "mock",
    fileType: truncate(value.fileType, 40) ?? "unknown",
    acceptedForFutureParsing: Boolean(value.acceptedForFutureParsing),
    mockSignals: (value.mockSignals ?? []).slice(0, 8).map((item) => truncate(item, 160) ?? ""),
    missingInformation: (value.missingInformation ?? []).slice(0, 8).map((item) => truncate(item, 160) ?? ""),
    warnings: (value.warnings ?? []).slice(0, 8).map((item) => truncate(item, 160) ?? ""),
    privacyNotes: (value.privacyNotes ?? []).slice(0, 6).map((item) => truncate(item, 160) ?? ""),
    contextTargets: (value.contextTargets ?? []).slice(0, 4).map((item) => truncate(item, 80) ?? ""),
    suggestedNextAction: truncate(value.suggestedNextAction, 280) ?? "",
  };
}

function truncate(value: string | undefined, limit = 900) {
  if (!value) return undefined;
  const normalized = value.trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, limit - 3)}...`;
}

function createContextId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `discovery-${Date.now().toString(36)}`;
}
