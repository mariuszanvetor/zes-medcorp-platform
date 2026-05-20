"use client";

import { CalculatorLeadCTA } from "@/components/ai/CalculatorLeadCTA";
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

export type CalculatorComplexityLevel = AdvancedComplexityLevel;

export type CalculatorAnalysis = {
  score: number;
  complexity: CalculatorComplexityLevel;
  band: string;
  recommendedServices: string[];
  phases: string[];
  risks: RiskItem[];
  observations: string[];
  budget: BudgetEstimate;
  timeline: TimelineEstimate;
  assumptions: string[];
  missingData: string[];
  confidence: ConfidenceEstimate;
  nextSteps: string[];
};

export type CalculatorResultProps = {
  result: CalculatorAnalysis;
};

const complexityVariant: Record<
  CalculatorComplexityLevel,
  "cyan" | "blue" | "dark" | "critical"
> = {
  Basic: "cyan",
  Moderate: "blue",
  Advanced: "dark",
  Enterprise: "dark",
  "High-complexity medical infrastructure": "critical",
};

export function CalculatorResult({ result }: CalculatorResultProps) {
  return (
    <div className="grid gap-6">
      <Card className="border-cyan-300/20" variant="glass">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">
              Rezultat calculator
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Scor complexitate: {result.score}/100
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Nivel estimat: {result.complexity}. Bandă de proiect: {result.band}.
              Motorul combină infrastructură, ecranare, aparatură, autorizări,
              timeline și risc operațional.
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
          eyebrow="Servicii"
          items={result.recommendedServices}
          title="Servicii ZES recomandate"
        />
        <InsightListPanel
          dark
          eyebrow="Etape"
          items={result.phases}
          title="Faze recomandate"
        />
      </div>

      <BudgetEstimatePanel budget={result.budget} />
      <TimelineEstimatePanel timeline={result.timeline} />
      <RiskRegisterPanel risks={result.risks} />
      <div className="grid gap-5 lg:grid-cols-2">
        <InsightListPanel
          eyebrow="DSP / CNCAN"
          items={result.observations}
          title="Observații tehnice și de autorizare"
        />
        <InsightListPanel
          eyebrow="Pași următori"
          items={result.nextSteps}
          title="Pași următori"
        />
      </div>
      <ConfidencePanel
        assumptions={result.assumptions}
        confidence={result.confidence}
        missingData={result.missingData}
      />

      <Card variant="surface">
        <p className="text-sm font-semibold text-blue-700">
          Recomandare de continuare
        </p>
        <p className="mt-3 text-xl font-semibold leading-8 text-slate-950">
          Solicită analiză tehnică ZES pentru validarea cerințelor, a riscurilor
          de autorizare și a etapelor reale de proiect.
        </p>
        <p className="mt-4 text-sm font-semibold text-slate-500">
          Estimare orientativă, nu ofertă tehnică sau comercială finală.
        </p>
      </Card>

      <CalculatorLeadCTA
        generatedBudgetRange={result.budget.totalRange}
        generatedComplexity={result.complexity}
        generatedRiskLevel={result.risks[0]?.level}
        generatedSummary={`Scor complexitate ${result.score}/100, nivel ${result.complexity}, bandă ${result.band}.`}
        summary={{
          budgetRange: result.budget.totalRange,
          complexity: result.complexity,
          nextStep: "Solicită analiză tehnică ZES pentru validarea cerințelor.",
          riskLevel: result.risks[0]?.level,
        }}
      />
    </div>
  );
}
