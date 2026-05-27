"use client";

import { useEffect, useMemo, useState } from "react";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { DiscoveryConversation } from "@/components/ai/DiscoveryConversation";
import { DiscoveryIntelligencePanel } from "@/components/ai/DiscoveryIntelligencePanel";
import { DiscoveryLeadCTA } from "@/components/ai/DiscoveryLeadCTA";
import { DiscoveryUploadGuidance } from "@/components/ai/DiscoveryUploadGuidance";
import { Button } from "@/components/ui/Button";
import {
  orchestrateAdaptiveDiscovery,
  type OrchestratedDiscoveryResult,
} from "@/lib/ai-intelligence/discovery-orchestrator";
import type { DiscoveryQuestion, IntelligenceInput } from "@/lib/ai-intelligence/types";
import { trackEvent } from "@/lib/analytics";

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
  const [context, setContext] = useState<IntelligenceInput>(initialContext);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [assumptionMode, setAssumptionMode] = useState(false);

  const result = useMemo(() => orchestrateAdaptiveDiscovery(context), [context]);

  useEffect(() => {
    trackEvent("ai_discovery_start", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
    });
  }, []);

  function patchContext(patch: Partial<IntelligenceInput>) {
    setContext((current) => ({ ...current, ...patch }));
    trackEvent("ai_discovery_step", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
      status: Object.keys(patch).join(","),
    });
  }

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
    setShowLeadForm(true);
    trackEvent("ai_discovery_step", {
      sourcePage: "/ai-discovery",
      sourceTool: "ai-discovery",
      status: "lead-form-open",
      complexity: result.riskAssessment.complexityLevel,
      riskLevel: result.riskAssessment.riskLevel,
    });
  }

  const handoffQuery = buildHandoffQuery(result);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-start">
      <main className="grid min-w-0 gap-6">
        <WorkspaceIntro result={result} assumptionMode={assumptionMode} />
        <DiscoveryConversation
          context={context}
          nextQuestions={result.nextBestQuestions}
          onAnswerQuestion={answerQuestion}
          onContinueWithAssumptions={continueWithAssumptions}
          onPatch={patchContext}
        />
        <DiscoveryUploadGuidance prompts={result.uploadPrompts} />
        <section className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-[0_24px_80px_rgba(0,87,184,0.08)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Continuare
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Transforma discovery-ul in urmatorul pas.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Poti trimite contextul pentru analiza preliminara, continua spre Proposal Builder sau completa Project Intake. Handoff-ul complet prin context salvat va fi disponibil intr-o etapa viitoare.
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
              onClick={() =>
                trackEvent("ai_discovery_to_proposal", {
                  sourcePage: "/ai-discovery",
                  sourceTool: "ai-discovery",
                  complexity: result.riskAssessment.complexityLevel,
                  riskLevel: result.riskAssessment.riskLevel,
                })
              }
            >
              Continue to Proposal Builder
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
              onClick={() =>
                trackEvent("ai_discovery_to_intake", {
                  sourcePage: "/ai-discovery",
                  sourceTool: "ai-discovery",
                  complexity: result.riskAssessment.complexityLevel,
                  riskLevel: result.riskAssessment.riskLevel,
                })
              }
            >
              Continue to Project Intake
            </TrackedButtonLink>
          </div>
        </section>

        {showLeadForm && <DiscoveryLeadCTA result={result} />}
      </main>

      <DiscoveryIntelligencePanel result={result} />
    </div>
  );
}

function WorkspaceIntro({
  result,
  assumptionMode,
}: {
  result: OrchestratedDiscoveryResult;
  assumptionMode: boolean;
}) {
  return (
    <section className="rounded-[1.5rem] border border-blue-100 bg-[#f7fbff] p-5 sm:p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Workspace determinist
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Discovery asistat, fara promisiuni automate.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Sistemul foloseste reguli deterministe pentru domenii, intrebari, riscuri si recomandari. Nu genereaza aprobari, nu inlocuieste proiectarea si nu cere documente ca sa continui.
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
    </section>
  );
}

function buildHandoffQuery(result: OrchestratedDiscoveryResult) {
  const params = new URLSearchParams();
  params.set("source", "ai-discovery");
  if (result.detectedDomains.length) params.set("domains", result.detectedDomains.slice(0, 3).join(","));
  params.set("risk", result.riskAssessment.riskLevel);
  params.set("confidence", String(result.confidenceScore));

  return `?${params.toString()}`;
}
