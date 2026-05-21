"use client";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ProjectIntakeResult } from "@/components/ai/ProjectIntakeWizard";
import { trackEvent } from "@/lib/analytics";

export type ProjectIntakeSummaryProps = {
  result: ProjectIntakeResult;
};

const riskVariant = {
  Redus: "cyan",
  Mediu: "blue",
  Ridicat: "dark",
  Critic: "critical",
} as const;

export function ProjectIntakeSummary({ result }: ProjectIntakeSummaryProps) {
  return (
    <div className="grid gap-6">
      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Rezumat intake
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">
              {result.projectProfile}
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
              {result.generatedSummary}
            </p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
              Readiness score
            </p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {result.readinessScore}/100
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              {result.readinessLevel}
            </p>
            <div className="mt-4 h-2 rounded-full bg-blue-100">
              <div
                className="h-2 rounded-full bg-[#0057b8]"
                style={{ width: `${result.readinessScore}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="Complexitate tehnica" value={result.technicalComplexity} />
        <MetricCard
          badgeVariant={riskVariant[result.riskLevel]}
          label="Risc estimat"
          value={result.riskLevel}
        />
        <MetricCard label="Urmatorul pas" value={result.nextStep} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
        <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Informatii lipsa
          </p>
          <ul className="mt-5 grid gap-3">
            {result.missingInformation.map((item) => (
              <li className="flex gap-3 text-sm leading-7 text-slate-700" key={item}>
                <span
                  aria-hidden="true"
                  className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-blue-100 bg-white" padding="lg">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Servicii recomandate
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {result.recommendedServices.map((service) => (
              <TrackedLink
                className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-4 text-sm font-semibold leading-6 text-slate-800 transition hover:border-blue-200 hover:bg-white hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href={service.href}
                key={service.href}
                tracking={{
                  ctaLabel: service.label,
                  destination: service.href,
                  sourcePage: "/project-intake",
                  sourceTool: "project-intake",
                }}
              >
                {service.label}
              </TrackedLink>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecommendationPanel
          items={result.recommendedTools}
          title="Instrumente recomandate"
        />
        <RecommendationPanel
          items={result.recommendedResources}
          title="Resurse utile"
        />
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  badgeVariant = "blue",
}: {
  label: string;
  value: string;
  badgeVariant?: "cyan" | "blue" | "dark" | "critical";
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
        {label}
      </p>
      <div className="mt-4">
        <Badge variant={badgeVariant}>{value}</Badge>
      </div>
    </Card>
  );
}

function RecommendationPanel({
  title,
  items,
}: {
  title: string;
  items: ProjectIntakeResult["recommendedTools"];
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <TrackedLink
            className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-[#f7fbff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href={item.href}
            key={item.href}
            onClick={() => {
              trackEvent("intake_next_step_click", {
                ctaLabel: item.label,
                destination: item.href,
                sourcePage: "/project-intake",
                sourceTool: "project-intake",
              });
            }}
            tracking={{
              ctaLabel: item.label,
              destination: item.href,
              sourcePage: "/project-intake",
              sourceTool: "project-intake",
            }}
          >
            <span className="block text-base font-semibold text-slate-950">
              {item.label}
            </span>
            <span className="mt-2 block text-sm leading-6 text-slate-600">
              {item.reason}
            </span>
          </TrackedLink>
        ))}
      </div>
    </Card>
  );
}
