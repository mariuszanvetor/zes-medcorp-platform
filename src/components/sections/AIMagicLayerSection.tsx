"use client";

import { useMemo, useState } from "react";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  aiMagicScenarios,
  createAiMagicAnalysis,
  type AiMagicScenarioId,
} from "@/lib/ai-magic-layer";
import { cn } from "@/lib/utils";

export function AIMagicLayerSection() {
  const [selectedScenario, setSelectedScenario] =
    useState<AiMagicScenarioId>("ct-clinic");

  const analysis = useMemo(
    () => createAiMagicAnalysis(selectedScenario),
    [selectedScenario],
  );

  return (
    <Section
      className="border-y border-blue-200 bg-[linear-gradient(180deg,#ffffff_0%,#f3f9ff_52%,#eef6ff_100%)]"
      spacing="xl"
      tone="transparent"
    >
      <Container>
        <div className="grid gap-10 xl:grid-cols-[0.38fr_0.62fr] xl:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="blue">ZES AI Copilot</Badge>
              <Badge variant="neutral">ZES Guided Planning</Badge>
              <Badge variant="neutral">deterministic mock intelligence</Badge>
            </div>
            <h2 className="mt-6 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Planificare ghidata cu ZES pentru decizii medicale critice.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              ZES Copilot simuleaza modul in care un sales engineer tehnic
              structureaza un proiect medical: intrebari adaptive, recomandari
              de infrastructura, readiness comercial si urmatorul pas potrivit.
              In aceasta etapa nu exista apeluri AI reale, memorie server-side
              sau validare finala.
            </p>
            <div className="mt-7 grid gap-3 text-sm font-semibold text-slate-700">
              {[
                "Planificare ghidata pentru CT, RMN, modernizare si service",
                "Semnale comerciale: urgenta, maturitate, oportunitate",
                "Recomandari tehnice preliminare, cu validare umana necesara",
                "Diferentiere clara fata de formulare statice: context, ritm, prioritizare",
              ].map((item) => (
                <div className="flex gap-3" key={item}>
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row xl:flex-col 2xl:flex-row">
              <TrackedButtonLink
                href={`/ai-discovery?source=ai-magic-layer&scenario=${selectedScenario}`}
                tracking={{
                  ctaLabel: "Porneste ZES Copilot",
                  destination: `/ai-discovery?source=ai-magic-layer&scenario=${selectedScenario}`,
                  sourcePage: "/",
                  sourceTool: "ai-magic-layer",
                  status: selectedScenario,
                }}
              >
                Porneste ZES Copilot
              </TrackedButtonLink>
              <TrackedButtonLink
                href="/project-intake"
                tracking={{
                  ctaLabel: "Trimite context proiect",
                  destination: "/project-intake",
                  sourcePage: "/",
                  sourceTool: "ai-magic-layer",
                }}
                variant="secondary"
              >
                Trimite context pentru analiza
              </TrackedButtonLink>
            </div>
          </div>

          <Card className="border-blue-200 bg-white shadow-[0_22px_52px_rgba(0,87,184,0.09)]" padding="lg">
            <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Selecteaza scenariul ZES
                </p>
                <div className="mt-4 grid gap-2">
                  {aiMagicScenarios.map((scenario) => (
                    <button
                      className={cn(
                        "rounded-lg border p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                        selectedScenario === scenario.id
                          ? "border-blue-300 bg-blue-50"
                          : "border-slate-200 bg-white",
                      )}
                      key={scenario.id}
                      type="button"
                      onClick={() => setSelectedScenario(scenario.id)}
                    >
                      <span className="block text-sm font-semibold text-slate-950">
                        {scenario.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        {scenario.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-lg border border-blue-100 bg-[#f7fbff] p-5">
                  <div className="flex flex-wrap gap-2">
                    {analysis.statusLabels.map((label) => (
                      <Badge key={label} variant="neutral">
                        {label}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Utilizator
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-950">
                    {analysis.scenario.userPrompt}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                    ZES Copilot
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {analysis.assistantResponse}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <Metric
                    label="Planning readiness"
                    value={`${analysis.planningReadiness}/100`}
                  />
                  <Metric
                    label="Commercial readiness"
                    value={`${analysis.commercialReadiness}/100`}
                  />
                  <Metric
                    label="Complexitate"
                    value={analysis.infrastructureComplexity}
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <ListBlock
                    items={analysis.guidedQuestions}
                    title="Intrebari ghidate"
                  />
                  <ListBlock
                    items={analysis.projectConcerns}
                    title="Zone de atentie"
                  />
                  <ListBlock
                    items={analysis.likelyMissingItems}
                    title="Informatii lipsa probabile"
                  />
                  <ListBlock
                    items={analysis.recommendedNextSteps}
                    title="Urmatori pasi"
                  />
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <InfoPill
                      label="Oportunitate"
                      value={analysis.commercialOpportunityType}
                    />
                    <InfoPill label="Urgenta" value={analysis.likelyUrgency} />
                    <InfoPill
                      label="Maturitate"
                      value={analysis.projectMaturity}
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {analysis.salesSignals.map((signal) => (
                      <Badge key={signal} variant="blue">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-6 text-slate-600">
                    ZES estimeaza nivelul de pregatire comerciala in functie de contextul tehnic disponibil.
                  </p>
                </div>

                <div className="rounded-lg border border-blue-100 bg-[#f7fbff] p-5">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                    Servicii sugerate
                  </h3>
                  <div className="mt-4 grid gap-3">
                    {analysis.suggestedServices.map((service) => (
                      <TrackedLink
                        className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
                        href={service.href}
                        key={service.href}
                        tracking={{
                          ctaLabel: service.label,
                          destination: service.href,
                          sourcePage: "/",
                          sourceTool: "ai-magic-layer",
                        }}
                      >
                        <span className="block text-sm font-semibold text-slate-950">
                          {service.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {service.reason}
                        </span>
                      </TrackedLink>
                    ))}
                  </div>
                </div>

                <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs font-semibold leading-6 text-amber-950">
                  {analysis.safetyNote}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold capitalize text-slate-950">
        {value}
      </p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
        {title}
      </h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-6 text-slate-600" key={item}>
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}
