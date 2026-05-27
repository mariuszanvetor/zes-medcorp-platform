"use client";

import type { ReactNode } from "react";

import type { OrchestratedDiscoveryResult } from "@/lib/ai-intelligence/discovery-orchestrator";
import type { AiMagicAnalysis } from "@/lib/ai-magic-layer";
import { cn } from "@/lib/utils";

export function DiscoveryIntelligencePanel({
  aiMagicAnalysis,
  result,
}: {
  aiMagicAnalysis: AiMagicAnalysis | null;
  result: OrchestratedDiscoveryResult;
}) {
  return (
    <aside className="grid gap-4 lg:sticky lg:top-24">
      <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.07)]">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Live intelligence
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Rezumat preliminar
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Metric label="Incredere" value={`${result.confidenceScore}/100`} tone={result.confidenceLevel} />
          <Metric label="Readiness" value={`${result.leadIntelligence.readinessScore}/100`} tone="high" />
          <Metric label="Risc" value={result.riskAssessment.riskLevel} tone={riskTone(result.riskAssessment.riskLevel)} />
          <Metric label="Complexitate" value={result.riskAssessment.complexityLevel} tone={riskTone(result.riskAssessment.riskLevel)} />
        </div>
        <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs font-semibold leading-6 text-amber-900">
          {result.safeDisclaimer}
        </p>
      </section>

      <Panel title="Domenii detectate">
        <TagList items={[...result.detectedDomains, ...result.relatedDomains.slice(0, 3)]} />
      </Panel>

      {aiMagicAnalysis && (
        <Panel title="Commercial guidance hints">
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Planning readiness" value={`${aiMagicAnalysis.planningReadiness}/100`} tone="high" />
            <Metric label="Commercial readiness" value={`${aiMagicAnalysis.commercialReadiness}/100`} tone="high" />
            <Metric label="Urgenta probabila" value={aiMagicAnalysis.likelyUrgency} tone="medium" />
            <Metric label="Maturitate proiect" value={aiMagicAnalysis.projectMaturity} tone="medium" />
          </div>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-900">
            Oportunitate: {aiMagicAnalysis.commercialOpportunityType}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {aiMagicAnalysis.salesSignals.map((signal) => (
              <span
                className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-1 text-xs font-bold text-slate-700"
                key={signal}
              >
                {signal}
              </span>
            ))}
          </div>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-semibold leading-6 text-amber-900">
            {aiMagicAnalysis.safetyNote}
          </p>
        </Panel>
      )}

      <Panel title="Informatii lipsa">
        {result.missingInformation.length ? (
          <ul className="grid gap-2">
            {result.missingInformation.slice(0, 5).map((item) => (
              <li className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700" key={item.id}>
                <span className="font-semibold text-slate-950">{item.label}</span>
                <span className="block text-xs text-slate-500">{item.reason}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-7 text-slate-600">
            Contextul este suficient pentru o analiza preliminara structurata.
          </p>
        )}
      </Panel>

      <Panel title="Riscuri si validari">
        <ul className="grid gap-2">
          {result.riskAssessment.riskReasons.slice(0, 4).map((reason) => (
            <li className="rounded-lg bg-[#f7fbff] p-3 text-sm leading-6 text-slate-700" key={reason}>
              {reason}
            </li>
          ))}
        </ul>
        {result.riskAssessment.validationNeeds.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {result.riskAssessment.validationNeeds.slice(0, 5).map((need) => (
              <span
              className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-[#0057b8]"
                key={need}
              >
                {need}
              </span>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="Resurse recomandate">
        <div className="grid gap-2">
          {result.relevantResources.slice(0, 6).map((resource) => (
            <a
              className="rounded-lg border border-blue-100 bg-white p-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
              href={resource.href}
              key={`${resource.type}-${resource.href}`}
            >
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                {resource.type}
              </span>
              {resource.label}
            </a>
          ))}
        </div>
      </Panel>

      <Panel title="Urmator pas">
        <p className="text-sm leading-7 text-slate-600">
          {result.continueWithAssumptionsNote}
        </p>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-900">
          Follow-up recomandat: {followUpLabel(result.leadIntelligence.recommendedFollowUpType)}
        </p>
      </Panel>
    </aside>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "low" | "medium" | "high";
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        tone === "high"
          ? "border-blue-100 bg-blue-50 text-blue-900"
          : tone === "medium"
            ? "border-amber-100 bg-amber-50 text-amber-900"
            : "border-slate-200 bg-slate-50 text-slate-800",
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-70">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold capitalize">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_10px_32px_rgba(0,87,184,0.055)]">
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TagList({ items }: { items: string[] }) {
  const unique = [...new Set(items)].slice(0, 8);
  return (
    <div className="flex flex-wrap gap-2">
      {unique.map((item) => (
        <span
          className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-1 text-xs font-bold text-slate-700"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function riskTone(risk: string): "low" | "medium" | "high" {
  if (risk === "critical" || risk === "high") return "medium";
  if (risk === "medium") return "medium";
  return "low";
}

function followUpLabel(value: string) {
  const labels: Record<string, string> = {
    "educational-nurture": "clarificare educationala",
    "technical-clarification": "clarificare tehnica",
    "proposal-preparation": "pregatire propunere preliminara",
    "urgent-technical-review": "review tehnic urgent",
  };

  return labels[value] ?? value;
}
