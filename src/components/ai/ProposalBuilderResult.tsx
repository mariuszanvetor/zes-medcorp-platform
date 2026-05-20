"use client";

import {
  BudgetEstimatePanel,
  ConfidencePanel,
  InsightListPanel,
  RiskRegisterPanel,
  TimelineEstimatePanel,
} from "@/components/ai/IntelligencePanels";
import { ProposalBuilderLeadCTA } from "@/components/ai/ProposalBuilderLeadCTA";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type {
  AdvancedComplexityLevel,
  BudgetEstimate,
  ConfidenceEstimate,
  RiskItem,
  TimelineEstimate,
} from "@/lib/ai-estimation";
import { BUDGET_DISCLAIMER } from "@/lib/ai-estimation";

export type ProposalAnalysis = {
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
};

export type ProposalBuilderResultProps = {
  result: ProposalAnalysis;
};

const complexityVariant: Record<AdvancedComplexityLevel, "cyan" | "blue" | "dark" | "critical"> = {
  Basic: "cyan",
  Moderate: "blue",
  Advanced: "dark",
  Enterprise: "dark",
  "High-complexity medical infrastructure": "critical",
};

export function ProposalBuilderResult({ result }: ProposalBuilderResultProps) {
  return (
    <div className="grid gap-6">
      <Card className="border-cyan-300/20" variant="glass">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">
              Propunere preliminară
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">
              {result.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              {result.executiveSummary}
            </p>
            <p className="mt-4 text-sm font-semibold text-cyan-100">
              {BUDGET_DISCLAIMER}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Badge variant={complexityVariant[result.complexity]}>
              {result.complexity}
            </Badge>
            <Badge variant="blue">Scor {result.score}/100</Badge>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <InsightListPanel
          dark
          eyebrow="Servicii"
          items={result.recommendedServices}
          title="Servicii ZES incluse în propunerea preliminară"
        />
        <InsightListPanel
          dark
          eyebrow="Etapizare"
          items={result.phases}
          title="Faze propuse"
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
        title="Pași recomandați pentru transformarea propunerii în analiză ZES"
      />

      <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Recomandare comercială
        </p>
        <p className="mt-4 text-2xl font-semibold leading-9 text-slate-950">
          {result.nextStep}
        </p>
        <p className="mt-5 text-sm font-semibold text-slate-500">
          Propunere orientativă. Validarea finală se face după verificarea
          documentației, echipamentelor și amplasamentului.
        </p>
      </Card>

      <ProposalBuilderLeadCTA
        generatedBudgetRange={result.budget.totalRange}
        generatedComplexity={result.complexity}
        generatedRiskLevel={result.risks[0]?.level}
        generatedSummary={result.executiveSummary}
        summary={{
          budgetRange: result.budget.totalRange,
          complexity: result.complexity,
          nextStep: result.nextStep,
          projectType: result.proposalType,
          riskLevel: result.risks[0]?.level,
        }}
      />
    </div>
  );
}
