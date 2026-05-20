"use client";

import { RadiologyPlannerLeadCTA } from "@/components/ai/RadiologyPlannerLeadCTA";
import {
  BudgetEstimatePanel,
  ConfidencePanel,
  InsightListPanel,
  RiskRegisterPanel,
  TimelineEstimatePanel,
} from "@/components/ai/IntelligencePanels";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type {
  AdvancedComplexityLevel,
  BudgetEstimate,
  ConfidenceEstimate,
  RiskItem,
  TimelineEstimate,
} from "@/lib/ai-estimation";

export type RadiologyPlannerAnalysis = {
  complexity: AdvancedComplexityLevel;
  score: number;
  infrastructureType: string;
  shieldingRecommendation: string;
  checklist: string[];
  risks: RiskItem[];
  authorizationNotes: string[];
  relevantServices: string[];
  budget: BudgetEstimate;
  timeline: TimelineEstimate;
  assumptions: string[];
  missingData: string[];
  confidence: ConfidenceEstimate;
  nextSteps: string[];
  nextStep: string;
  riskLevel: "Controlat" | "Atenție" | "Ridicat" | "Critic";
};

export type RadiologyPlannerResultProps = {
  result: RadiologyPlannerAnalysis;
};

const riskVariant: Record<
  RadiologyPlannerAnalysis["riskLevel"],
  "cyan" | "blue" | "dark" | "critical"
> = {
  Controlat: "cyan",
  Atenție: "blue",
  Ridicat: "dark",
  Critic: "critical",
};

export function RadiologyPlannerResult({ result }: RadiologyPlannerResultProps) {
  return (
    <div className="grid gap-6">
      <Card className="border-cyan-300/20" variant="glass">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">
              Rezultat planner
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {result.infrastructureType}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              {result.shieldingRecommendation} Scor planner: {result.score}/100,
              complexitate {result.complexity}. Rezultatul este orientativ și
              trebuie validat tehnic înainte de execuție.
            </p>
          </div>
          <Badge variant={riskVariant[result.riskLevel]}>
            Risc {result.riskLevel.toLowerCase()}
          </Badge>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <InsightListPanel
          dark
          eyebrow="Radiologie"
          items={result.relevantServices}
          title="Servicii ZES relevante"
        />
        <InsightListPanel
          dark
          eyebrow="Autorizări"
          items={result.authorizationNotes}
          title="Observații CNCAN / DSP"
        />
      </div>

      <BudgetEstimatePanel budget={result.budget} />
      <TimelineEstimatePanel timeline={result.timeline} />
      <RiskRegisterPanel risks={result.risks} />
      <div className="grid gap-5 lg:grid-cols-2">
        <InsightListPanel
          eyebrow="Checklist tehnic"
          items={result.checklist}
          title="Checklist tehnic"
        />
        <InsightListPanel
          eyebrow="Pași următori"
          items={result.nextSteps}
          title="Pași recomandați"
        />
      </div>
      <ConfidencePanel
        assumptions={result.assumptions}
        confidence={result.confidence}
        missingData={result.missingData}
      />

      <Card variant="surface">
        <p className="text-sm font-semibold text-blue-700">Pas recomandat</p>
        <p className="mt-3 text-xl font-semibold leading-8 text-slate-950">
          {result.nextStep}
        </p>
        <p className="mt-4 text-sm font-semibold text-slate-500">
          Estimare orientativă, nu ofertă tehnică sau comercială finală.
        </p>
      </Card>

      <RadiologyPlannerLeadCTA
        generatedBudgetRange={result.budget.totalRange}
        generatedComplexity={result.complexity}
        generatedRiskLevel={result.riskLevel}
        generatedSummary={`${result.infrastructureType}. ${result.shieldingRecommendation} Scor planner ${result.score}/100.`}
        summary={{
          budgetRange: result.budget.totalRange,
          complexity: result.complexity,
          nextStep: result.nextStep,
          riskLevel: result.riskLevel,
        }}
      />
    </div>
  );
}
