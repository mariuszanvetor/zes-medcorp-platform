"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { DiscoveryConversation } from "@/components/ai/DiscoveryConversation";
import { DiscoveryIntelligencePanel } from "@/components/ai/DiscoveryIntelligencePanel";
import { DiscoveryLeadCTA } from "@/components/ai/DiscoveryLeadCTA";
import { DiscoveryMockDocumentPanel } from "@/components/ai/DiscoveryMockDocumentPanel";
import { DiscoveryUploadGuidance } from "@/components/ai/DiscoveryUploadGuidance";
import { Button } from "@/components/ui/Button";
import {
  createSerializableDiscoveryContext,
  saveDiscoveryContext,
  type DiscoveryContextNextStep,
} from "@/lib/ai-intelligence/discovery-context";
import type { MockDocumentParsingResult } from "@/lib/ai-intelligence/document-intelligence";
import {
  orchestrateAdaptiveDiscovery,
  type OrchestratedDiscoveryResult,
} from "@/lib/ai-intelligence/discovery-orchestrator";
import type { DiscoveryQuestion, IntelligenceInput } from "@/lib/ai-intelligence/types";
import { trackEvent } from "@/lib/analytics";
import {
  createAiMagicAnalysis,
  createAiMagicDiscoverySeed,
  parseAiMagicScenarioId,
  type AiMagicAnalysis,
  type AiMagicScenarioId,
} from "@/lib/ai-magic-layer";

const initialContext: IntelligenceInput = {
  freeText: "",
  intent: "unknown",
  projectStage: "idea",
  domains: [],
  budgetKnown: false,
  timelineKnown: false,
  plansAvailable: false,
  equipmentSpecsAvailable: false,
  locationKnown: false,
  surfaceKnown: false,
};

export function DiscoveryWorkspace() {
  const searchParams = useSearchParams();
  const scenarioFromQuery = parseAiMagicScenarioId(searchParams.get("scenario"));
  const [context, setContext] = useState<IntelligenceInput>(initialContext);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [assumptionMode, setAssumptionMode] = useState(false);
  const [mockDocumentContext, setMockDocumentContext] =
    useState<MockDocumentParsingResult | null>(null);
  const [seededScenarioId, setSeededScenarioId] = useState<AiMagicScenarioId | null>(
    null,
  );

  const result = useMemo(() => orchestrateAdaptiveDiscovery(context), [context]);
  const aiMagicAnalysis = useMemo(
    () => (scenarioFromQuery ? createAiMagicAnalysis(scenarioFromQuery) : null),
    [scenarioFromQuery],
  );
  const guidedQuestions = useMemo(
    () => mergeScenarioQuestions(result.nextBestQuestions, aiMagicAnalysis),
    [result.nextBestQuestions, aiMagicAnalysis],
  );

  useEffect(() => {
    trackEvent("ai_discovery_start", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
      status: scenarioFromQuery ? `scenario:${scenarioFromQuery}` : "standard",
    });
  }, [scenarioFromQuery]);

  function patchContext(patch: Partial<IntelligenceInput>) {
    setContext((current) => ({ ...current, ...patch }));
    trackEvent("ai_discovery_step", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
      status: Object.keys(patch).join(","),
    });
  }

  useEffect(() => {
    if (!scenarioFromQuery || seededScenarioId === scenarioFromQuery) return;

    const seed = createAiMagicDiscoverySeed(scenarioFromQuery);
    setContext((current) => ({
      ...current,
      ...seed.contextPatch,
      freeText: [seed.scenarioSummary, current.freeText].filter(Boolean).join("\n"),
    }));
    setSeededScenarioId(scenarioFromQuery);

    trackEvent("ai_discovery_step", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
      status: `ai-magic-seed:${scenarioFromQuery}`,
    });
  }, [scenarioFromQuery, seededScenarioId]);

  function answerQuestion(question: DiscoveryQuestion, answer: string) {
    const line = `${question.prompt} Raspuns: ${answer}.`;
    setContext((current) => ({
      ...current,
      freeText: [current.freeText, line].filter(Boolean).join("\n"),
    }));
    trackEvent("ai_discovery_step", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
      status: question.id,
    });
  }

  function continueWithAssumptions() {
    setAssumptionMode(true);
    trackEvent("ai_discovery_continue_with_assumptions", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
      complexity: result.riskAssessment.complexityLevel,
      riskLevel: result.riskAssessment.riskLevel,
      status: result.canContinue ? "continue" : "limited-context",
    });
  }

  function showLeadCapture() {
    persistDiscoveryContext("technical-review");
    setShowLeadForm(true);
    trackEvent("ai_discovery_step", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
      status: "lead-form-open",
      complexity: result.riskAssessment.complexityLevel,
      riskLevel: result.riskAssessment.riskLevel,
    });
  }

  function persistDiscoveryContext(selectedNextStep: DiscoveryContextNextStep) {
    saveDiscoveryContext(
      createSerializableDiscoveryContext({
        input: context,
        mockDocumentContext,
        result,
        selectedNextStep,
        aiMagicAnalysis,
      }),
    );
  }

  const handoffQuery = buildHandoffQuery(result);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <main className="grid min-w-0 gap-6">
        <WorkspaceIntro
          aiMagicAnalysis={aiMagicAnalysis}
          result={result}
          assumptionMode={assumptionMode}
        />
        <DiscoveryConversation
          aiMagicAnalysis={aiMagicAnalysis}
          context={context}
          nextQuestions={guidedQuestions}
          onAnswerQuestion={answerQuestion}
          onContinueWithAssumptions={continueWithAssumptions}
          onPatch={patchContext}
        />
        <DiscoveryUploadGuidance prompts={result.uploadPrompts} />
        <DiscoveryMockDocumentPanel
          context={context}
          onChange={setMockDocumentContext}
        />
        <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Continuare
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Transforma contextul ZES Guided Planning in urmatorul pas.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Poti trimite contextul pentru analiza preliminara sau il poti continua in Proposal Builder ori Project Intake. Contextul este salvat local in browser, poate fi editat sau ignorat la pasul urmator si ramane preliminar pana la validarea tehnica.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" onClick={showLeadCapture}>
              Trimite pentru analiza preliminara
            </Button>
            <TrackedButtonLink
              href={`/proposal-builder${handoffQuery}`}
              size="lg"
              tracking={{
                ctaLabel: "Continua spre Proposal Builder",
                destination: "/proposal-builder",
                sourcePage: "/ai-discovery",
                sourceTool: "ai-discovery",
              }}
              variant="secondary"
              onClick={() => {
                persistDiscoveryContext("proposal-builder");
                trackEvent("ai_discovery_to_proposal", {
                  sourcePage: "/ai-discovery",
                  sourceTool: "ai-discovery",
                  complexity: result.riskAssessment.complexityLevel,
                  riskLevel: result.riskAssessment.riskLevel,
                });
              }}
            >
              Continua spre Proposal Builder
            </TrackedButtonLink>
            <TrackedButtonLink
              href={`/project-intake${handoffQuery}`}
              size="lg"
              tracking={{
                ctaLabel: "Continua spre Project Intake",
                destination: "/project-intake",
                sourcePage: "/ai-discovery",
                sourceTool: "ai-discovery",
              }}
              variant="secondary"
              onClick={() => {
                persistDiscoveryContext("project-intake");
                trackEvent("ai_discovery_to_intake", {
                  sourcePage: "/ai-discovery",
                  sourceTool: "ai-discovery",
                  complexity: result.riskAssessment.complexityLevel,
                  riskLevel: result.riskAssessment.riskLevel,
                });
              }}
            >
              Continua spre Project Intake
            </TrackedButtonLink>
          </div>
        </section>

        {showLeadForm && (
          <DiscoveryLeadCTA
            mockDocumentContext={mockDocumentContext}
            result={result}
          />
        )}
      </main>

      <DiscoveryIntelligencePanel aiMagicAnalysis={aiMagicAnalysis} result={result} />
    </div>
  );
}

function WorkspaceIntro({
  aiMagicAnalysis,
  result,
  assumptionMode,
}: {
  aiMagicAnalysis: AiMagicAnalysis | null;
  result: OrchestratedDiscoveryResult;
  assumptionMode: boolean;
}) {
  return (
    <section className="rounded-lg border border-blue-100 bg-[#f7fbff] p-5 sm:p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            ZES Guided Planning
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Copilot tehnic-comercial, fara promisiuni automate.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            ZES foloseste reguli deterministe pentru domenii, intrebari, riscuri si recomandari. Nu genereaza aprobari, nu inlocuieste proiectarea si nu cere documente ca sa continui.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700">
          <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            Status
          </span>
          {assumptionMode
            ? "Continua cu ipoteze preliminare"
            : result.canContinue
              ? "Poate continua cu date partiale"
              : "Necesita clarificari minime"}
        </div>
      </div>
      {aiMagicAnalysis && (
        <div className="mt-5 rounded-lg border border-blue-100 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
            ZES AI-assisted demo
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            Scenario activ: {aiMagicAnalysis.scenario.label}
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {aiMagicAnalysis.assistantResponse}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-1 text-xs font-bold text-slate-700">
              ZES guided planning mode
            </span>
            <span className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-1 text-xs font-bold text-slate-700">
              deterministic mock intelligence
            </span>
            <span className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-1 text-xs font-bold text-slate-700">
              commercial readiness {aiMagicAnalysis.commercialReadiness}/100
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

function mergeScenarioQuestions(
  discoveryQuestions: DiscoveryQuestion[],
  aiMagicAnalysis: AiMagicAnalysis | null,
) {
  if (!aiMagicAnalysis) return discoveryQuestions;

  const scenarioQuestions = aiMagicAnalysis.guidedQuestions.map((prompt, index) => ({
    id: `ai-magic-${aiMagicAnalysis.scenario.id}-${index + 1}`,
    stage: "intent" as const,
    prompt,
    requiredForConfidence: index < 2,
  }));

  const seen = new Set<string>();
  const merged = [...scenarioQuestions, ...discoveryQuestions].filter((question) => {
    const key = question.prompt.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return merged.slice(0, 7);
}

function buildHandoffQuery(result: OrchestratedDiscoveryResult) {
  const params = new URLSearchParams();
  params.set("source", "ai-discovery");
  if (result.detectedDomains.length) params.set("domains", result.detectedDomains.slice(0, 3).join(","));
  params.set("risk", result.riskAssessment.riskLevel);
  params.set("confidence", String(result.confidenceScore));

  return `?${params.toString()}`;
}
