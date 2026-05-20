"use client";

import { ServiceDiagnosticLeadCTA } from "@/components/ai/ServiceDiagnosticLeadCTA";
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
  BudgetEstimate,
  ConfidenceEstimate,
  RiskItem,
  TimelineEstimate,
} from "@/lib/ai-estimation";

export type ServiceUrgencyLevel = "Redus" | "Mediu" | "Ridicat" | "Critic";

export type ServiceDiagnosticAnalysis = {
  urgencyLevel: ServiceUrgencyLevel;
  urgencyScore: number;
  operationalRisk: string;
  initialRecommendation: string;
  recommendedSteps: string[];
  relevantServices: string[];
  risks: RiskItem[];
  budget: BudgetEstimate;
  timeline: TimelineEstimate;
  interventionTiming: string;
  operationalImpact: string;
  downtimeRisk: string;
  preventiveRecommendation: string;
  continuityNote: string;
  possibleRootCauses: string[];
  assumptions: string[];
  missingData: string[];
  confidence: ConfidenceEstimate;
  nextSteps: string[];
};

export type ServiceDiagnosticResultProps = {
  result: ServiceDiagnosticAnalysis;
};

const urgencyVariant: Record<ServiceUrgencyLevel, "cyan" | "blue" | "dark" | "critical"> = {
  Redus: "cyan",
  Mediu: "blue",
  Ridicat: "dark",
  Critic: "critical",
};

export function ServiceDiagnosticResult({ result }: ServiceDiagnosticResultProps) {
  return (
    <div className="grid gap-6">
      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Rezultat triere service
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              Nivel urgență: {result.urgencyLevel}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              {result.initialRecommendation} Scor triere: {result.urgencyScore}/100.
            </p>
          </div>
          <Badge variant={urgencyVariant[result.urgencyLevel]}>
            {result.urgencyLevel}
          </Badge>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <ResultPanel title="Risc operațional" items={[result.operationalRisk, result.operationalImpact, result.downtimeRisk]} />
        <ResultPanel title="Servicii ZES relevante" items={result.relevantServices} />
        <ResultPanel title="Categorii posibile de cauză" items={result.possibleRootCauses} />
        <ResultPanel title="Pași imediat recomandați" items={result.recommendedSteps} />
      </div>

      <BudgetEstimatePanel budget={result.budget} />
      <TimelineEstimatePanel timeline={result.timeline} />
      <RiskRegisterPanel risks={result.risks} />
      <div className="grid gap-5 lg:grid-cols-2">
        <InsightListPanel
          eyebrow="Preventive logic"
          items={[result.preventiveRecommendation, result.continuityNote]}
          title="Continuitate și prevenție"
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

      <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Moment recomandat pentru intervenție
        </p>
        <p className="mt-4 text-2xl font-semibold leading-9 text-slate-950">
          {result.interventionTiming}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 text-base leading-8 text-slate-600 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
            {result.preventiveRecommendation}
          </div>
          <div className="rounded-2xl bg-white p-5 text-base leading-8 text-slate-600 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
            {result.continuityNote}
          </div>
        </div>
      </Card>

      <ServiceDiagnosticLeadCTA
        generatedComplexity={`Scor urgență ${result.urgencyScore}/100`}
        generatedRiskLevel={result.urgencyLevel}
        generatedSummary={`${result.initialRecommendation} Impact: ${result.operationalImpact}. Intervenție: ${result.interventionTiming}.`}
        summary={{
          complexity: `Scor urgență ${result.urgencyScore}/100`,
          nextStep: result.interventionTiming,
          riskLevel: result.urgencyLevel,
        }}
      />
    </div>
  );
}

function ResultPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="border-slate-200 bg-white" padding="lg">
      <h3 className="text-2xl font-semibold text-slate-950">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li className="flex gap-4 text-base leading-8 text-slate-600" key={item}>
            <span
              aria-hidden="true"
              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
