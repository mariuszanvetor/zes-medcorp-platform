"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  demoLeads,
  leadRiskLevels,
  leadStatuses,
  type DemoLead,
  type LeadRiskLevel,
  type LeadStatus,
} from "@/data/demo-leads";
import { scoreLead, type LeadPriority, type LeadScoreResult } from "@/lib/lead-scoring";
import { cn } from "@/lib/utils";

type FilterState = {
  status: "Toate" | LeadStatus;
  source: "Toate" | string;
  urgency: "Toate" | string;
  riskLevel: "Toate" | LeadRiskLevel;
};

const initialFilters: FilterState = {
  status: "Toate",
  source: "Toate",
  urgency: "Toate",
  riskLevel: "Toate",
};

const riskVariant: Record<LeadRiskLevel, "cyan" | "blue" | "dark" | "critical"> = {
  Redus: "cyan",
  Mediu: "blue",
  Ridicat: "dark",
  Critic: "critical",
};

const statusVariant: Record<LeadStatus, "neutral" | "blue" | "cyan" | "dark" | "critical"> = {
  Nou: "blue",
  "De analizat": "neutral",
  Prioritar: "critical",
  Contactat: "cyan",
  "\u00cen lucru": "dark",
  "\u00cenchis": "neutral",
};

const priorityVariant: Record<
  LeadPriority,
  "neutral" | "blue" | "cyan" | "dark" | "critical"
> = {
  "Low priority": "neutral",
  "Medium priority": "cyan",
  "High priority": "blue",
  "Critical / immediate opportunity": "critical",
};

export function LeadReviewCenter() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedLeadId, setSelectedLeadId] = useState(demoLeads[0]?.id);
  const scoringByLeadId = useMemo(
    () => new Map(demoLeads.map((lead) => [lead.id, scoreDemoLead(lead)])),
    [],
  );

  const sources = useMemo(
    () => Array.from(new Set(demoLeads.map((lead) => lead.sourceTool))).sort(),
    [],
  );
  const urgencies = useMemo(
    () => Array.from(new Set(demoLeads.map((lead) => lead.urgency))).sort(),
    [],
  );

  const filteredLeads = useMemo(
    () =>
      demoLeads.filter((lead) => {
        const statusMatch =
          filters.status === "Toate" || lead.status === filters.status;
        const sourceMatch =
          filters.source === "Toate" || lead.sourceTool === filters.source;
        const urgencyMatch =
          filters.urgency === "Toate" || lead.urgency === filters.urgency;
        const riskMatch =
          filters.riskLevel === "Toate" || lead.riskLevel === filters.riskLevel;

        return statusMatch && sourceMatch && urgencyMatch && riskMatch;
      }),
    [filters],
  );

  const selectedLead =
    filteredLeads.find((lead) => lead.id === selectedLeadId) ??
    filteredLeads[0] ??
    demoLeads[0];
  const selectedScoring =
    scoringByLeadId.get(selectedLead.id) ?? scoreDemoLead(selectedLead);

  const metrics = useMemo(
    () => createMetrics(demoLeads, scoringByLeadId),
    [scoringByLeadId],
  );

  function updateFilter<K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total leads" value={String(metrics.total)} />
        <MetricCard label="Prioritare" value={String(metrics.highPriority)} />
        <MetricCard label="Buget mediu" value={metrics.averageBudgetRange} />
        <MetricCard label="Sursa principala" value={metrics.mostCommonSource} />
        <MetricCard label="Scor mediu" value={`${metrics.averageScore}/100`} />
      </div>

      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Filtre review
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Pipeline demo pentru evaluare leaduri
            </h2>
          </div>
          <Button onClick={() => setFilters(initialFilters)} variant="secondary">
            Reseteaza filtrele
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Status"
            onChange={(value) =>
              updateFilter("status", value as FilterState["status"])
            }
            options={["Toate", ...leadStatuses]}
            value={filters.status}
          />
          <FilterSelect
            label="Sursa"
            onChange={(value) => updateFilter("source", value)}
            options={["Toate", ...sources]}
            value={filters.source}
          />
          <FilterSelect
            label="Urgenta"
            onChange={(value) => updateFilter("urgency", value)}
            options={["Toate", ...urgencies]}
            value={filters.urgency}
          />
          <FilterSelect
            label="Risc"
            onChange={(value) =>
              updateFilter("riskLevel", value as FilterState["riskLevel"])
            }
            options={["Toate", ...leadRiskLevels]}
            value={filters.riskLevel}
          />
        </div>
      </Card>

      <div className="grid gap-8 xl:grid-cols-[0.62fr_0.38fr] xl:items-start">
        <Card className="border-blue-100 bg-white" padding="none">
          <div className="border-b border-blue-100 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Leaduri demo
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              {filteredLeads.length} oportunitati afisate
            </h2>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1380px] text-left text-sm">
              <thead className="bg-[#f7fbff] text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-6 py-4">Companie</th>
                  <th className="px-6 py-4">Proiect</th>
                  <th className="px-6 py-4">Sursa</th>
                  <th className="px-6 py-4">Urgenta</th>
                  <th className="px-6 py-4">Buget</th>
                  <th className="px-6 py-4">Scor</th>
                  <th className="px-6 py-4">Prioritate</th>
                  <th className="px-6 py-4">Complexitate</th>
                  <th className="px-6 py-4">Risc</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Next step</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr
                    className={cn(
                      "cursor-pointer transition hover:bg-blue-50/45",
                      selectedLead?.id === lead.id && "bg-blue-50",
                    )}
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                  >
                    <td className="px-6 py-5">
                      <button
                        className="text-left font-semibold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        type="button"
                      >
                        {lead.company}
                      </button>
                      <p className="mt-1 text-xs text-slate-500">{lead.contactName}</p>
                    </td>
                    <td className="px-6 py-5 text-slate-600">{lead.projectType}</td>
                    <td className="px-6 py-5 text-slate-600">{lead.sourceTool}</td>
                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {lead.urgency}
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-950">
                      {lead.estimatedBudgetRange}
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-950">
                      {scoringByLeadId.get(lead.id)?.score ?? 0}/100
                    </td>
                    <td className="px-6 py-5">
                      <Badge
                        variant={
                          priorityVariant[
                            scoringByLeadId.get(lead.id)?.priority ??
                              "Low priority"
                          ]
                        }
                      >
                        {scoringByLeadId.get(lead.id)?.priority ?? "Low priority"}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-slate-600">
                      {lead.complexity}
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant={riskVariant[lead.riskLevel]}>
                        {lead.riskLevel}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant={statusVariant[lead.status]}>
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-slate-600">
                      {lead.recommendedNextStep}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-5 lg:hidden">
            {filteredLeads.map((lead) => (
              <button
                className={cn(
                  "rounded-2xl border p-5 text-left transition",
                  selectedLead?.id === lead.id
                    ? "border-blue-300 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-200",
                )}
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                type="button"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge variant={riskVariant[lead.riskLevel]}>
                    {lead.riskLevel}
                  </Badge>
                  <Badge variant={statusVariant[lead.status]}>
                    {lead.status}
                  </Badge>
                  <Badge
                    variant={
                      priorityVariant[
                        scoringByLeadId.get(lead.id)?.priority ?? "Low priority"
                      ]
                    }
                  >
                    {scoringByLeadId.get(lead.id)?.score ?? 0}/100
                  </Badge>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-950">
                  {lead.company}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {lead.projectType}
                </p>
                <p className="hidden">
                  {lead.estimatedBudgetRange} · {lead.urgency}
                </p>
                <p className="mt-3 text-sm font-semibold text-[#0057b8]">
                  {lead.estimatedBudgetRange} / {lead.urgency}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-slate-950">
                    Prioritate:
                  </span>{" "}
                  {scoringByLeadId.get(lead.id)?.priority ?? "Low priority"}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-slate-950">
                    Complexitate:
                  </span>{" "}
                  {lead.complexity}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-slate-950">
                    Next step:
                  </span>{" "}
                  {lead.recommendedNextStep}
                </p>
              </button>
            ))}
          </div>
        </Card>

        <LeadDetail lead={selectedLead} scoring={selectedScoring} />
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
        {value}
      </p>
    </Card>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-300 focus:bg-white"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LeadDetail({
  lead,
  scoring,
}: {
  lead: DemoLead;
  scoring: LeadScoreResult;
}) {
  return (
    <Card className="border-blue-100 bg-white xl:sticky xl:top-28" padding="lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Lead detail preview
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
            {lead.company}
          </h2>
          <p className="hidden">
            {lead.contactName} · {lead.email} · {lead.phone}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {lead.contactName} / {lead.email} / {lead.phone}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={priorityVariant[scoring.priority]}>
            {scoring.score}/100
          </Badge>
          <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <DetailStat label="Sursa" value={lead.sourceTool} />
        <DetailStat label="Tip proiect" value={lead.projectType} />
        <DetailStat label="Buget" value={lead.estimatedBudgetRange} />
        <DetailStat label="Complexitate" value={lead.complexity} />
        <DetailStat label="Risc" value={lead.riskLevel} />
        <DetailStat label="Confidence" value={lead.confidence} />
        <DetailStat label="Prioritate" value={scoring.priority} />
        <DetailStat label="Atribuire sursa" value={lead.sourceTool} />
      </div>

      <div className="mt-8 rounded-2xl border border-blue-100 bg-[#f7fbff] p-5">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
          Generated summary
        </p>
        <p className="mt-4 text-base leading-8 text-slate-700">
          {lead.generatedSummary}
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <DetailList title="Ipoteze" items={lead.assumptions} />
        <DetailList title="Servicii recomandate" items={lead.recommendedServices} />
        <DetailList title="Informatii lipsa" items={lead.missingInformation} />
      </div>

      <div className="mt-7 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_50px_rgba(0,87,184,0.06)]">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
          Recommended next step
        </p>
        <p className="mt-4 text-lg font-semibold leading-8 text-slate-950">
          {lead.recommendedNextStep}
        </p>
        <p className="mt-4 text-sm font-semibold leading-7 text-[#0057b8]">
          Scoring action: {scoring.nextAction}
        </p>
      </div>
    </Card>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-7 text-slate-600" key={item}>
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function createMetrics(
  leads: DemoLead[],
  scoringByLeadId: Map<string, LeadScoreResult>,
) {
  const highPriority = leads.filter(
    (lead) =>
      lead.status === "Prioritar" ||
      scoringByLeadId.get(lead.id)?.priority === "High priority" ||
      scoringByLeadId.get(lead.id)?.priority ===
        "Critical / immediate opportunity",
  ).length;
  const mostCommonSource = mostCommon(leads.map((lead) => lead.sourceTool));
  const averageBudgetRange = averageRangeLabel(leads);
  const averageScore = Math.round(
    leads.reduce(
      (total, lead) => total + (scoringByLeadId.get(lead.id)?.score ?? 0),
      0,
    ) / leads.length,
  );

  return {
    total: leads.length,
    highPriority,
    mostCommonSource,
    averageBudgetRange,
    averageScore,
  };
}

function scoreDemoLead(lead: DemoLead) {
  return scoreLead({
    sourceTool: lead.sourceTool,
    sourcePage: `/admin/leads#${lead.id}`,
    inquiryType: lead.inquiryType,
    projectType: lead.projectType,
    urgency: lead.urgency,
    estimatedBudgetRange: lead.estimatedBudgetRange,
    generatedBudgetRange: lead.estimatedBudgetRange,
    generatedComplexity: lead.complexity,
    generatedRiskLevel: lead.riskLevel,
    generatedSummary: lead.generatedSummary,
    recommendedServices: lead.recommendedServices,
  });
}

function mostCommon(values: string[]) {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));

  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
}

function averageRangeLabel(leads: DemoLead[]) {
  const ranges = leads
    .map((lead) => parseBudgetRange(lead.estimatedBudgetRange))
    .filter((range): range is [number, number] => Boolean(range));

  if (!ranges.length) {
    return "N/A";
  }

  const avgMin =
    ranges.reduce((total, [min]) => total + min, 0) / ranges.length;
  const avgMax =
    ranges.reduce((total, [, max]) => total + max, 0) / ranges.length;

  return `${formatK(avgMin)}-${formatK(avgMax)}`;
}

function parseBudgetRange(value: string): [number, number] | null {
  if (!value.includes("EUR")) {
    return null;
  }

  if (value.includes("+")) {
    const min = Number(value.replace(/[^0-9]/g, ""));
    return [min, min * 1.45];
  }

  const parts = value
    .replace(/EUR/g, "")
    .split("-")
    .map((part) => Number(part.replace(/[^0-9]/g, "")));

  if (parts.length !== 2 || parts.some(Number.isNaN)) {
    return null;
  }

  return [parts[0], parts[1]];
}

function formatK(value: number) {
  return `EUR ${Math.round(value)}k`;
}
