"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import type {
  ProposalDocument,
  ProposalDocumentLine,
  ProposalDocumentRisk,
} from "@/lib/proposal-document";
import { cn } from "@/lib/utils";

export type ProposalDocumentPreviewProps = {
  document: ProposalDocument;
};

const riskTone: Record<ProposalDocumentRisk["severity"], string> = {
  Low: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Medium: "border-blue-200 bg-blue-50 text-blue-900",
  High: "border-amber-200 bg-amber-50 text-amber-900",
  Critical: "border-rose-200 bg-rose-50 text-rose-900",
};

export function ProposalDocumentPreview({
  document,
}: ProposalDocumentPreviewProps) {
  return (
    <article className="proposal-print overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white text-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
      <header className="border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f4f9ff)] p-6 sm:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              {document.subtitle}
            </p>
            <h3 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              {document.title}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              {document.summary.executiveSummary}
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-5 text-sm shadow-[0_12px_40px_rgba(0,87,184,0.08)] md:min-w-64">
            <p className="text-2xl font-semibold tracking-tight text-[#0057b8]">
              ZES
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              MEDCORP
            </p>
            <dl className="mt-5 grid gap-3 text-xs leading-5">
              <PreviewMeta label="Pregătit de" value={document.preparedBy} />
              <PreviewMeta label="ID propunere" value={document.proposalId} />
              <PreviewMeta label="Versiune" value={document.versionLabel} />
              <PreviewMeta label="Generat" value={document.generatedAt} />
              <PreviewMeta label="Status" value={document.generatedLabel} />
              <PreviewMeta
                label="Încredere"
                value={`${document.summary.confidence.level} (${document.summary.confidence.score}/100)`}
              />
            </dl>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <SummaryTile label="Tip" value={document.summary.projectType} />
          <SummaryTile label="Complexitate" value={document.summary.complexity} />
          <SummaryTile label="Buget orientativ" value={document.budgetEstimate.totalRange} />
        </div>
      </header>

      <div className="grid gap-8 p-6 sm:p-8">
        <PreviewSection title="Servicii recomandate">
          <div className="grid gap-3 md:grid-cols-2">
            {document.recommendedServices.map((service) => (
              <div
                className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-4 text-sm font-semibold leading-6 text-slate-700"
                key={service}
              >
                {service}
              </div>
            ))}
          </div>
        </PreviewSection>

        <PreviewSection title="Faze propuse">
          <ol className="grid gap-3">
            {document.phases.map((phase, index) => (
              <li
                className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[2.5rem_1fr]"
                key={`${phase.title}-${index}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0057b8] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-slate-950">{phase.title}</p>
                  {(phase.duration || phase.dependency) && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {[phase.duration, phase.dependency].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </PreviewSection>

        <PreviewSection title="Structura modulara">
          <div className="grid gap-3">
            {document.assembly.blocks.map((block) => (
              <div
                className="rounded-2xl border border-slate-200 bg-white p-4"
                key={block.id}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">
                      {block.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {block.summary}
                    </p>
                  </div>
                  <span className="rounded-full border border-blue-100 bg-[#f7fbff] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                    {block.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </PreviewSection>

        <div className="grid gap-8 xl:grid-cols-2">
          <PreviewSection title="Buget pe faze">
            <PreviewTable lines={document.budgetEstimate.phaseBreakdown} />
          </PreviewSection>
          <PreviewSection title="Buget pe servicii">
            <PreviewTable lines={document.budgetEstimate.serviceBreakdown} />
          </PreviewSection>
        </div>

        <PreviewSection title="Timeline estimativ">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
              Durată estimată
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {document.timeline.estimatedDuration}
            </p>
          </div>
          <div className="mt-4 grid gap-3">
            {document.timeline.phases.map((phase) => (
              <div
                className="rounded-2xl border border-slate-200 bg-white p-4"
                key={`${phase.title}-${phase.duration}`}
              >
                <p className="font-semibold text-slate-950">{phase.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {[phase.duration, phase.dependency].filter(Boolean).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </PreviewSection>

        <PreviewSection title="Recomandari de secventiere">
          <div className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5">
            <ul className="grid gap-2 text-sm leading-6 text-slate-600">
              {document.assembly.sequencingRecommendations.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </PreviewSection>

        <PreviewSection title="Registru de risc">
          <div className="grid gap-3">
            {document.risks.map((risk) => (
              <div
                className="rounded-2xl border border-slate-200 bg-white p-4"
                key={`${risk.category}-${risk.severity}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold text-slate-950">{risk.category}</p>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]",
                      riskTone[risk.severity],
                    )}
                  >
                    {risk.severity}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {risk.explanation}
                </p>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">
                  Mitigare: {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </PreviewSection>

        <div className="grid gap-8 xl:grid-cols-2">
          <PreviewList title="Ipoteze folosite" items={document.assumptions} />
          <PreviewList
            title="Informații lipsă pentru validare"
            items={document.missingInformation}
          />
        </div>

        <PreviewSection title="Următorul pas">
          <div className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5">
            <p className="text-xl font-semibold leading-8 text-slate-950">
              {document.nextStep}
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
              {document.nextSteps.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
          </div>
        </PreviewSection>

        <footer className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-bold text-slate-950">
            {document.disclaimer}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Previzualizarea este o structură de lucru pentru discuția tehnică.
            Exportul PDF și trimiterea automată către CRM pot fi conectate
            ulterior, după validarea fluxului comercial.
          </p>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            {document.company.legalName} · {document.company.email} ·{" "}
            {document.company.phone} · CUI {document.company.cui} · Reg. Com.{" "}
            {document.company.tradeRegister} · {document.company.address.full}
          </p>
          <div className="no-print mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              Discutați propunerea
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );
}

function PreviewMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-slate-800">{value}</dd>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </h4>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function PreviewTable({ lines }: { lines: ProposalDocumentLine[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {lines.map((line, index) => (
        <div
          className={cn(
            "grid gap-2 p-4 text-sm sm:grid-cols-[1.2fr_0.8fr]",
            index !== lines.length - 1 && "border-b border-slate-200",
          )}
          key={`${line.label}-${line.value}`}
        >
          <div>
            <p className="font-semibold text-slate-950">{line.label}</p>
            {line.note && (
              <p className="mt-2 leading-6 text-slate-600">{line.note}</p>
            )}
          </div>
          <p className="font-bold text-[#0057b8]">{line.value}</p>
        </div>
      ))}
    </div>
  );
}

function PreviewList({ title, items }: { title: string; items: string[] }) {
  return (
    <PreviewSection title={title}>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li
            className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </PreviewSection>
  );
}
