"use client";

import { useMemo, useState } from "react";

import {
  BudgetEstimatePanel,
  ConfidencePanel,
  InsightListPanel,
  RiskRegisterPanel,
  TimelineEstimatePanel,
} from "@/components/ai/IntelligencePanels";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProposalBuilderLeadCTA } from "@/components/ai/ProposalBuilderLeadCTA";
import { ProposalDocumentPreview } from "@/components/proposal/ProposalDocumentPreview";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type {
  AdvancedComplexityLevel,
  BudgetEstimate,
  ConfidenceEstimate,
  RiskItem,
  TimelineEstimate,
} from "@/lib/ai-estimation";
import { BUDGET_DISCLAIMER } from "@/lib/ai-estimation";
import { trackEvent } from "@/lib/analytics";
import type { AssembledProposal } from "@/lib/proposal-assembly";
import { createProposalDocument } from "@/lib/proposal-document";
import {
  downloadProposalPdf,
  getProposalPdfFilename,
  openProposalPdfForPrint,
} from "@/lib/proposal-pdf";

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
  assembly: AssembledProposal;
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
  const proposalDocument = useMemo(() => createProposalDocument(result), [result]);
  const [exportStatus, setExportStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const trackingPayload = {
    sourcePage: "/proposal-builder",
    sourceTool: "proposal-builder",
    projectType: result.proposalType,
    estimatedBudgetRange: result.budget.totalRange,
    complexity: result.complexity,
    proposalId: proposalDocument.proposalId,
    versionLabel: proposalDocument.versionLabel,
    riskLevel: result.risks[0]?.level,
  };

  function handlePdfExport() {
    setExportStatus("loading");

    try {
      downloadProposalPdf(proposalDocument);
      trackEvent("proposal_pdf_export", trackingPayload);
      setExportStatus("success");
    } catch {
      setExportStatus("error");
    }
  }

  function handlePrintPreview() {
    try {
      const opened = openProposalPdfForPrint(proposalDocument);
      trackEvent("proposal_print", {
        ...trackingPayload,
        status: opened ? "opened" : "blocked",
      });
      setExportStatus(opened ? "success" : "error");
    } catch {
      setExportStatus("error");
    }
  }

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

      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Asamblare tehnica
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">
              {result.assembly.title}
            </h3>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
              {result.assembly.summary}
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
              Prioritate
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {result.assembly.criticalRecommendations[0] ??
                "Validare tehnica inainte de oferta finala."}
            </p>
          </div>
        </div>
      </Card>

      <ProposalAssemblyView result={result} />

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
          Recomandare de continuare
        </p>
        <p className="mt-4 text-2xl font-semibold leading-9 text-slate-950">
          {result.nextStep}
        </p>
        <p className="mt-5 text-sm font-semibold text-slate-500">
          Propunere preliminară. Validarea finală se face după verificarea
          documentației, echipamentelor, amplasamentului și constrângerilor
          operaționale.
        </p>
      </Card>

      <Card className="border-cyan-300/20" padding="lg" variant="glass">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">
              Previzualizare propunere
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Structură pregătită pentru export PDF
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Acesta este un document de lucru, construit din rezultatul
              Proposal Builder. Exportul este determinist și rămâne preliminar
              până la validarea tehnică ZES.
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-400">
              Fișier: {getProposalPdfFilename(proposalDocument)}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Document generat local, orientativ, fără salvare permanentă.
              Versiunile salvate vor fi disponibile într-o etapă viitoare.
            </p>
          </div>
          <div className="no-print flex flex-col gap-3 sm:flex-row">
            <Button
              isLoading={exportStatus === "loading"}
              onClick={handlePdfExport}
              type="button"
              variant="secondary"
            >
              Descarcă propunerea PDF
            </Button>
            <Button onClick={handlePrintPreview} type="button" variant="outline">
              Deschide pentru print
            </Button>
          </div>
        </div>
        {exportStatus === "success" && (
          <p className="no-print mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            Exportul PDF a fost pregătit local în browser.
          </p>
        )}
        {exportStatus === "error" && (
          <p className="no-print mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
            Exportul nu a putut fi pornit. Pe mobil, deschideți pagina într-un
            browser complet sau folosiți opțiunea de print a browserului.
          </p>
        )}
        <ProposalDocumentPreview document={proposalDocument} />
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

function ProposalAssemblyView({ result }: { result: ProposalAnalysis }) {
  const assembly = result.assembly;

  return (
    <div className="grid gap-6">
      <div className="grid gap-5 xl:grid-cols-[0.42fr_0.58fr]">
        <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Etape propuse
          </p>
          <div className="mt-6 grid gap-4">
            {assembly.stages.map((stage, index) => (
              <div
                className="rounded-2xl border border-blue-100 bg-white p-4"
                key={stage.id}
              >
                <div className="flex gap-3">
                  <span className="mt-1 text-sm font-bold text-[#0057b8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold leading-6 text-slate-950">
                      {stage.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {stage.objective}
                    </p>
                    {stage.validationNeed && (
                      <p className="mt-3 text-sm font-semibold leading-6 text-blue-900">
                        {stage.validationNeed}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-blue-100 bg-white" padding="lg">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Module tehnice
          </p>
          <div className="mt-6 grid gap-4">
            {assembly.blocks.map((block) => (
              <div
                className="rounded-2xl border border-slate-200 bg-white p-5"
                key={block.id}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-xl font-semibold leading-tight text-slate-950">
                      {block.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {block.summary}
                    </p>
                  </div>
                  <Badge variant={block.priority === "critical" ? "critical" : "blue"}>
                    {priorityLabel(block.priority)}
                  </Badge>
                </div>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600 sm:grid-cols-2">
                  {block.bullets.slice(0, 4).map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <ProposalListCard
          items={assembly.criticalRecommendations}
          title="Recomandari critice"
        />
        <ProposalListCard
          items={assembly.sequencingRecommendations}
          title="Secventiere recomandata"
        />
        <ProposalListCard
          items={assembly.validationNeeds}
          title="Date de validat"
        />
      </div>

      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Actiuni contextuale
            </p>
            <div className="mt-5 grid gap-3">
              {assembly.nextActions.map((action) => (
                <TrackedLink
                  className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,87,184,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={action.href}
                  key={action.href}
                  tracking={{
                    ctaLabel: action.label,
                    destination: action.href,
                    sourcePage: "/proposal-builder",
                    sourceTool: "proposal-builder",
                  }}
                >
                  <span className="block text-base font-semibold text-slate-950">
                    {action.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {action.reason}
                  </span>
                </TrackedLink>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Resurse conectate
            </p>
            <div className="mt-5 grid gap-3">
              {assembly.relatedLinks.slice(0, 6).map((link) => (
                <TrackedLink
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={link.href}
                  key={link.href}
                  tracking={{
                    ctaLabel: link.label,
                    destination: link.href,
                    sourcePage: "/proposal-builder",
                    sourceTool: "proposal-builder",
                  }}
                >
                  <span className="block text-sm font-semibold text-slate-950">
                    {link.label}
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-slate-500">
                    {link.reason}
                  </span>
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ProposalListCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </p>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li className="text-sm leading-7 text-slate-600" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function priorityLabel(priority: AssembledProposal["blocks"][number]["priority"]) {
  const labels = {
    critical: "critic",
    core: "principal",
    optional: "optional",
    validation: "validare",
  };

  return labels[priority];
}
