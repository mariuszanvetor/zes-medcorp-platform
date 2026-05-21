"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import { CalculatorLeadCTA } from "@/components/ai/CalculatorLeadCTA";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import {
  BudgetEstimatePanel,
  ConfidencePanel,
  InsightListPanel,
  RiskRegisterPanel,
  TimelineEstimatePanel,
} from "@/components/ai/IntelligencePanels";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  calculateProgrammaticCalculator,
  type CalculatorField,
  type ProgrammaticCalculatorDefinition,
  type ProgrammaticCalculatorResult,
} from "@/data/calculators";
import { BUDGET_DISCLAIMER } from "@/lib/ai-estimation";
import { trackToolComplete, trackToolStart } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type ProgrammaticCalculatorProps = {
  calculator: ProgrammaticCalculatorDefinition;
};

export function ProgrammaticCalculator({
  calculator,
}: ProgrammaticCalculatorProps) {
  const initialValues = useMemo(
    () =>
      Object.fromEntries(
        calculator.fields.map((field) => [
          field.id,
          field.options[0]?.value ?? "",
        ]),
      ),
    [calculator.fields],
  );
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [result, setResult] = useState<ProgrammaticCalculatorResult | null>(
    null,
  );

  const completion = useMemo(() => {
    const selected = calculator.fields.filter((field) => values[field.id]).length;
    return Math.round((selected / calculator.fields.length) * 100);
  }, [calculator.fields, values]);

  function updateField(fieldId: string, value: string) {
    setValues((current) => ({ ...current, [fieldId]: value }));
  }

  function runCalculation() {
    trackToolStart("programmatic-calculator", {
      sourcePage: `/calculatoare/${calculator.slug}`,
      sourceTool: calculator.slug,
      calculatorSlug: calculator.slug,
    });

    const calculation = calculateProgrammaticCalculator(calculator.slug, values);
    setResult(calculation);
    trackToolComplete("programmatic-calculator", {
      sourcePage: `/calculatoare/${calculator.slug}`,
      sourceTool: calculator.slug,
      calculatorSlug: calculator.slug,
      estimatedBudgetRange: calculation.budget?.totalRange,
      complexity: calculation.complexity ?? calculation.metricValue,
      riskLevel: calculation.risks[0]?.level,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCalculation();
  }

  return (
    <div className="grid gap-10">
      <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
        <Card className="border-blue-100 bg-white lg:sticky lg:top-28" padding="lg">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Estimator ZES
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
            Date de intrare pentru estimare
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Alege scenariul apropiat de proiectul tău. Rezultatul oferă o
            orientare despre buget, calendar, riscuri, ipoteze și pași de
            verificat.
          </p>
          <div className="mt-7">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              <span>Completare</span>
              <span>{completion}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-blue-50">
              <div
                className="h-2 rounded-full bg-[#0057b8] transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
          <p className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-7 text-blue-900">
            {BUDGET_DISCLAIMER}
          </p>
        </Card>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          {calculator.fields.map((field) => (
            <OptionGroup
              field={field}
              key={field.id}
              onChange={(value) => updateField(field.id, value)}
              value={values[field.id]}
            />
          ))}
          <Button fullWidth onClick={runCalculation} size="lg" type="button">
            Calculează estimarea ZES
          </Button>
        </form>
      </div>

      {result && (
        <ProgrammaticCalculatorResultView
          calculator={calculator}
          result={result}
        />
      )}
    </div>
  );
}

function OptionGroup({
  field,
  value,
  onChange,
}: {
  field: CalculatorField;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <fieldset>
        <legend className="text-base font-semibold text-slate-950">
          {field.label}
        </legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {field.options.map((option) => {
            const selected = option.value === value;

            return (
              <label
                className={cn(
                  "cursor-pointer rounded-2xl border p-4 transition",
                  selected
                    ? "border-blue-300 bg-blue-50 text-blue-950 shadow-[0_18px_50px_rgba(0,87,184,0.08)]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-[#f7fbff]",
                )}
                key={option.value}
              >
                <input
                  checked={selected}
                  className="sr-only"
                  name={field.id}
                  onChange={() => onChange(option.value)}
                  type="radio"
                  value={option.value}
                />
                <span className="block text-sm font-bold leading-6">
                  {option.label}
                </span>
                {option.note && (
                  <span className="mt-2 block text-xs leading-6 text-slate-500">
                    {option.note}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>
    </Card>
  );
}

function ProgrammaticCalculatorResultView({
  calculator,
  result,
}: {
  calculator: ProgrammaticCalculatorDefinition;
  result: ProgrammaticCalculatorResult;
}) {
  return (
    <section aria-live="polite" className="grid gap-8" id="rezultat">
      <Card
        className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
        padding="lg"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_0.34fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Estimare pregătită
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
              {result.title}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
              {result.summary}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedButtonLink
                href={calculator.primaryCta.href}
                tracking={{
                  calculatorSlug: calculator.slug,
                  ctaLabel: calculator.primaryCta.label,
                  destination: calculator.primaryCta.href,
                  sourcePage: `/calculatoare/${calculator.slug}`,
                }}
              >
                {calculator.primaryCta.label}
              </TrackedButtonLink>
              <TrackedButtonLink
                href={calculator.secondaryCta.href}
                tracking={{
                  calculatorSlug: calculator.slug,
                  ctaLabel: calculator.secondaryCta.label,
                  destination: calculator.secondaryCta.href,
                  sourcePage: `/calculatoare/${calculator.slug}`,
                }}
                variant="secondary"
              >
                {calculator.secondaryCta.label}
              </TrackedButtonLink>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              {result.metricLabel}
            </p>
            <p className="mt-4 text-3xl font-semibold leading-tight text-[#0057b8]">
              {result.metricValue}
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-500">
              Scor {result.score}/100
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {result.emphasis.map((item) => (
            <Badge key={item} variant="blue">
              {item}
            </Badge>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <InsightListPanel
          eyebrow="Servicii recomandate"
          items={result.recommendedServices}
          title="Ce ar trebui inclus în discuția ZES"
        />
        <InsightListPanel
          eyebrow="Pași următori"
          items={result.nextSteps}
          title="Cum transformi estimarea în proiect"
        />
        <RelatedCalculatorLinks calculator={calculator} />
      </div>

      {result.budget && <BudgetEstimatePanel budget={result.budget} />}
      <TimelineEstimatePanel timeline={result.timeline} />
      <RiskRegisterPanel risks={result.risks} />
      <ConfidencePanel
        assumptions={result.assumptions}
        confidence={result.confidence}
        missingData={result.missingData}
      />
      <CalculatorLeadCTA
        generatedBudgetRange={result.budget?.totalRange}
        generatedComplexity={result.complexity ?? result.metricValue}
        generatedRiskLevel={result.risks[0]?.level}
        generatedSummary={`${result.title}: ${result.summary} Scor ${result.score}/100.`}
        inquiryType={calculator.title}
        sourcePage={`/calculatoare/${calculator.slug}`}
        summary={{
          budgetRange: result.budget?.totalRange,
          complexity: result.complexity ?? result.metricValue,
          nextStep: result.nextSteps[0],
          riskLevel: result.risks[0]?.level,
        }}
      />
    </section>
  );
}

function RelatedCalculatorLinks({
  calculator,
}: {
  calculator: ProgrammaticCalculatorDefinition;
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        Resurse conectate
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-950">
        Continuă analiza
      </h3>
      <div className="mt-6 grid gap-3">
        <TrackedLink
          className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-4 text-sm font-bold leading-6 text-slate-950 transition hover:border-blue-200 hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/planificare"
          tracking={{
            calculatorSlug: calculator.slug,
            ctaLabel: "Alege un traseu de planificare",
            destination: "/planificare",
            sourcePage: `/calculatoare/${calculator.slug}`,
          }}
        >
          Alege un traseu de planificare
        </TrackedLink>
        {calculator.relatedLinks.map((link) => (
          <Link
            className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-4 text-sm font-bold leading-6 text-slate-950 transition hover:border-blue-200 hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </Card>
  );
}
