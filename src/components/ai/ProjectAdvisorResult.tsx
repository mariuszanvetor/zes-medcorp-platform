"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  BudgetEstimatePanel,
  ConfidencePanel,
  InsightListPanel,
  RiskRegisterPanel,
  TimelineEstimatePanel,
} from "@/components/ai/IntelligencePanels";
import { LeadCaptureCTA } from "@/components/ai/LeadCaptureCTA";
import type {
  AdvancedComplexityLevel,
  BudgetEstimate,
  ConfidenceEstimate,
  RiskItem,
  TimelineEstimate,
} from "@/lib/ai-estimation";

export type ComplexityLevel = AdvancedComplexityLevel;

export type ProjectAdvisorAnalysis = {
  complexity: ComplexityLevel;
  score: number;
  complexityExplanation: string;
  recommendedServices: string[];
  phases: string[];
  checklist: string[];
  budget: BudgetEstimate;
  timeline: TimelineEstimate;
  risks: RiskItem[];
  assumptions: string[];
  missingData: string[];
  confidence: ConfidenceEstimate;
  nextSteps: string[];
  nextStep: string;
};

export type ProjectAdvisorResultProps = {
  result: ProjectAdvisorAnalysis;
  onLeadCaptured?: () => void;
};

const complexityVariant: Record<ComplexityLevel, "cyan" | "blue" | "dark" | "critical"> = {
  Basic: "cyan",
  Moderate: "blue",
  Advanced: "dark",
  Enterprise: "dark",
  "High-complexity medical infrastructure": "critical",
};

export function ProjectAdvisorResult({
  result,
  onLeadCaptured,
}: ProjectAdvisorResultProps) {
  return (
    <div className="grid gap-6">
      <Card className="border-cyan-300/20" variant="glass">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">
              Analiză preliminară
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {result.complexity}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Scor tehnic orientativ: {result.score}/100.{" "}
              {result.complexityExplanation} Rezultatul trebuie validat pe
              planuri, echipamente și condiții reale de amplasament.
            </p>
          </div>
          <Badge variant={complexityVariant[result.complexity]}>
            {result.complexity}
          </Badge>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <InsightListPanel
          dark
          eyebrow="Recomandări"
          items={result.recommendedServices}
          title="Servicii ZES prioritizate"
        />
        <InsightListPanel
          dark
          eyebrow="Etapizare"
          items={result.phases}
          title="Faze probabile ale proiectului"
        />
      </div>

      <BudgetEstimatePanel budget={result.budget} />
      <TimelineEstimatePanel timeline={result.timeline} />
      <RiskRegisterPanel risks={result.risks} />
      <ConfidencePanel
        assumptions={result.assumptions}
        confidence={result.confidence}
        missingData={result.missingData}
      />
      <InsightListPanel
        eyebrow="Pași următori"
        items={result.nextSteps}
        title="Pași recomandați"
      />
      <InsightListPanel
        eyebrow="Technical checklist"
        items={result.checklist}
        title="Date de pregătit pentru analiza ZES"
      />

      <Card variant="surface">
        <p className="text-sm font-semibold text-blue-700">Pas următor sugerat</p>
        <p className="mt-3 text-xl font-semibold leading-8 text-slate-950">
          {result.nextStep}
        </p>
        <p className="mt-4 text-sm font-semibold text-slate-500">
          Estimare orientativă, nu ofertă tehnică sau comercială finală.
        </p>
      </Card>

      <LeadCaptureCTA
        generatedBudgetRange={result.budget.totalRange}
        generatedComplexity={result.complexity}
        generatedRiskLevel={result.risks[0]?.level}
        generatedSummary={`Complexitate ${result.complexity}, scor ${result.score}/100. Servicii prioritare: ${result.recommendedServices.slice(0, 4).join(", ")}.`}
        onCaptured={onLeadCaptured}
        summary={{
          budgetRange: result.budget.totalRange,
          complexity: result.complexity,
          nextStep: result.nextStep,
          riskLevel: result.risks[0]?.level,
        }}
      />
    </div>
  );
}
