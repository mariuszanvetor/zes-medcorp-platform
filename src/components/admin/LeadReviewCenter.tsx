"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  demoLeads,
  leadPriorities,
  leadRiskLevels,
  leadStatuses,
  type DemoLead,
  type LeadRiskLevel,
  type LeadStatus,
} from "@/data/demo-leads";
import {
  scoreLead,
  type LeadPriority,
  type LeadScoreResult,
} from "@/lib/lead-scoring";
import { cn } from "@/lib/utils";

type SortOption =
  | "newest"
  | "highest-score"
  | "highest-urgency"
  | "highest-budget"
  | "readiness-score";

type FilterState = {
  status: "Toate" | LeadStatus;
  source: "Toate" | string;
  projectType: "Toate" | string;
  urgency: "Toate" | string;
  riskLevel: "Toate" | LeadRiskLevel;
  priority: "Toate" | LeadPriority;
  sort: SortOption;
};

const initialFilters: FilterState = {
  status: "Toate",
  source: "Toate",
  projectType: "Toate",
  urgency: "Toate",
  riskLevel: "Toate",
  priority: "Toate",
  sort: "newest",
};

const riskVariant: Record<LeadRiskLevel, "cyan" | "blue" | "dark" | "critical"> = {
  Redus: "cyan",
  Mediu: "blue",
  Ridicat: "dark",
  Critic: "critical",
};

const statusVariant: Record<LeadStatus, "neutral" | "blue" | "cyan" | "dark" | "critical"> = {
  Nou: "blue",
  "De calificat": "neutral",
  Prioritar: "critical",
  Contactat: "cyan",
  "În analiză": "dark",
  Propunere: "blue",
  "Închis": "neutral",
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

const urgencyRank: Record<string, number> = {
  Imediat: 5,
  "24-48 ore": 5,
  "1-3 luni": 4,
  "3-6 luni": 2,
  Exploratoriu: 1,
};

const sortLabels: Record<SortOption, string> = {
  newest: "Cele mai noi",
  "highest-score": "Scor maxim",
  "highest-urgency": "Urgență maximă",
  "highest-budget": "Buget maxim",
  "readiness-score": "Readiness maxim",
};

export function LeadReviewCenter() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedLeadId, setSelectedLeadId] = useState(demoLeads[0]?.id);
  const scoringByLeadId = useMemo(
    () => new Map(demoLeads.map((lead) => [lead.id, scoreDemoLead(lead)])),
    [],
  );

  const filterOptions = useMemo(() => createFilterOptions(demoLeads), []);
  const filteredLeads = useMemo(
    () => sortLeads(filterLeads(demoLeads, filters), filters.sort),
    [filters],
  );
  const selectedLead =
    filteredLeads.find((lead) => lead.id === selectedLeadId) ??
    filteredLeads[0] ??
    demoLeads[0];
  const selectedScoring =
    scoringByLeadId.get(selectedLead.id) ?? scoreDemoLead(selectedLead);
  const metrics = useMemo(() => createMetrics(demoLeads), []);
  const funnel = useMemo(() => createFunnel(demoLeads), []);
  const priorityQueue = useMemo(
    () =>
      [...demoLeads]
        .filter((lead) => lead.status !== "Închis")
        .sort((a, b) => b.leadScore - a.leadScore)
        .slice(0, 5),
    [],
  );
  const nextActionGroups = useMemo(() => createNextActionGroups(demoLeads), []);
  const sourceAnalysis = useMemo(() => createSourceAnalysis(demoLeads), []);
  const projectBreakdown = useMemo(
    () => createBreakdown(demoLeads.map((lead) => classifyProject(lead))),
    [],
  );
  const urgencyBreakdown = useMemo(
    () => createBreakdown(demoLeads.map((lead) => lead.urgency)),
    [],
  );
  const riskBreakdown = useMemo(
    () => createBreakdown(demoLeads.map((lead) => lead.riskLevel)),
    [],
  );

  function updateFilter<K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-8">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Total leads" value={String(metrics.total)} />
        <MetricCard label="Prioritare" value={String(metrics.highPriority)} />
        <MetricCard label="Risc critic" value={String(metrics.criticalRisk)} />
        <MetricCard label="Scor mediu" value={`${metrics.averageScore}/100`} />
        <MetricCard label="Readiness mediu" value={`${metrics.averageReadiness}/100`} />
        <MetricCard label="Sursa principală" value={metrics.mostCommonSource} />
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.66fr_0.34fr]">
        <Card className="border-blue-100 bg-white" padding="lg">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Qualification funnel
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">
                De la lead nou la propunere.
              </h2>
            </div>
            <Badge variant="blue">demo-only</Badge>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4 xl:grid-cols-7">
            {funnel.map((stage) => (
              <div
                className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-4"
                key={stage.status}
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                  {stage.status}
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">
                  {stage.count}
                </p>
                <div className="mt-4 h-2 rounded-full bg-blue-100">
                  <div
                    className="h-2 rounded-full bg-[#0057b8]"
                    style={{ width: `${stage.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-blue-100 bg-white" padding="lg">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Priority queue
          </p>
          <div className="mt-6 grid gap-3">
            {priorityQueue.map((lead) => (
              <button
                className={cn(
                  "rounded-2xl border p-4 text-left transition hover:border-blue-200 hover:bg-[#f7fbff]",
                  selectedLead.id === lead.id ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white",
                )}
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">
                    {lead.company}
                  </p>
                  <Badge variant={priorityVariant[lead.priority]}>
                    {lead.leadScore}
                  </Badge>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {lead.projectType}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.42fr_0.58fr]">
        <Card className="border-blue-100 bg-white" padding="lg">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Next action board
          </p>
          <div className="mt-6 grid gap-4">
            {nextActionGroups.map((group) => (
              <div
                className="rounded-2xl border border-slate-200 bg-white p-4"
                key={group.title}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-slate-950">
                    {group.title}
                  </p>
                  <Badge variant={group.variant}>{group.leads.length}</Badge>
                </div>
                <ul className="mt-3 space-y-2">
                  {group.leads.slice(0, 3).map((lead) => (
                    <li className="text-xs leading-5 text-slate-600" key={lead.id}>
                      <span className="font-semibold text-slate-950">
                        {lead.company}:
                      </span>{" "}
                      {lead.recommendedNextStep}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5 md:grid-cols-2">
          <SourceAnalysisCard sources={sourceAnalysis} />
          <BreakdownCard title="Tip proiect" items={projectBreakdown} />
          <BreakdownCard title="Urgență" items={urgencyBreakdown} />
          <BreakdownCard title="Risc" items={riskBreakdown} />
        </div>
      </section>

      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Filtre și sortare
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              {filteredLeads.length} leaduri afișate
            </h2>
          </div>
          <Button onClick={() => setFilters(initialFilters)} variant="secondary">
            Resetează filtrele
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          <FilterSelect
            label="Status"
            onChange={(value) =>
              updateFilter("status", value as FilterState["status"])
            }
            options={["Toate", ...leadStatuses]}
            value={filters.status}
          />
          <FilterSelect
            label="Sursă"
            onChange={(value) => updateFilter("source", value)}
            options={["Toate", ...filterOptions.sources]}
            value={filters.source}
          />
          <FilterSelect
            label="Tip proiect"
            onChange={(value) => updateFilter("projectType", value)}
            options={["Toate", ...filterOptions.projectTypes]}
            value={filters.projectType}
          />
          <FilterSelect
            label="Urgență"
            onChange={(value) => updateFilter("urgency", value)}
            options={["Toate", ...filterOptions.urgencies]}
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
          <FilterSelect
            label="Prioritate"
            onChange={(value) =>
              updateFilter("priority", value as FilterState["priority"])
            }
            options={["Toate", ...leadPriorities]}
            value={filters.priority}
          />
          <FilterSelect
            label="Sortare"
            onChange={(value) => updateFilter("sort", value as SortOption)}
            options={Object.entries(sortLabels).map(([value, label]) => ({
              label,
              value,
            }))}
            value={filters.sort}
          />
        </div>
      </Card>

      <div className="grid gap-8 xl:grid-cols-[0.62fr_0.38fr] xl:items-start">
        <LeadList
          leads={filteredLeads}
          onSelectLead={setSelectedLeadId}
          selectedLeadId={selectedLead.id}
        />
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
      <p className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
        {value}
      </p>
    </Card>
  );
}

function LeadList({
  leads,
  selectedLeadId,
  onSelectLead,
}: {
  leads: DemoLead[];
  selectedLeadId: string;
  onSelectLead: (leadId: string) => void;
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="none">
      <div className="border-b border-blue-100 p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Lead overview
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          Opportunity list
        </h2>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[1420px] text-left text-sm">
          <thead className="bg-[#f7fbff] text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Companie</th>
              <th className="px-6 py-4">Proiect</th>
              <th className="px-6 py-4">Sursă</th>
              <th className="px-6 py-4">Scor</th>
              <th className="px-6 py-4">Readiness</th>
              <th className="px-6 py-4">Buget</th>
              <th className="px-6 py-4">Urgență</th>
              <th className="px-6 py-4">Risc</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Next step</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr
                className={cn(
                  "cursor-pointer transition hover:bg-blue-50/45",
                  selectedLeadId === lead.id && "bg-blue-50",
                )}
                key={lead.id}
                onClick={() => onSelectLead(lead.id)}
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
                <td className="px-6 py-5">
                  <ScorePill score={lead.leadScore} priority={lead.priority} />
                </td>
                <td className="px-6 py-5 font-semibold text-slate-950">
                  {lead.readinessScore}/100
                </td>
                <td className="px-6 py-5 font-semibold text-slate-950">
                  {lead.estimatedBudgetRange}
                </td>
                <td className="px-6 py-5 font-semibold text-slate-700">
                  {lead.urgency}
                </td>
                <td className="px-6 py-5">
                  <Badge variant={riskVariant[lead.riskLevel]}>
                    {lead.riskLevel}
                  </Badge>
                </td>
                <td className="px-6 py-5">
                  <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
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
        {leads.map((lead) => (
          <button
            className={cn(
              "rounded-2xl border p-5 text-left transition",
              selectedLeadId === lead.id
                ? "border-blue-300 bg-blue-50"
                : "border-slate-200 bg-white hover:border-blue-200",
            )}
            key={lead.id}
            onClick={() => onSelectLead(lead.id)}
            type="button"
          >
            <div className="flex flex-wrap gap-2">
              <Badge variant={riskVariant[lead.riskLevel]}>{lead.riskLevel}</Badge>
              <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
              <Badge variant={priorityVariant[lead.priority]}>
                {lead.leadScore}/100
              </Badge>
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-950">
              {lead.company}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {lead.projectType}
            </p>
            <p className="mt-3 text-sm font-semibold text-[#0057b8]">
              {lead.estimatedBudgetRange} / {lead.urgency}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Readiness: {lead.readinessScore}/100
            </p>
          </button>
        ))}
      </div>
    </Card>
  );
}

function LeadDetail({
  lead,
  scoring,
}: {
  lead: DemoLead;
  scoring: LeadScoreResult;
}) {
  const followUp = createFollowUpOutline(lead);
  const intelligence = createLeadIntelligenceView(lead, scoring);

  return (
    <Card className="border-blue-100 bg-white xl:sticky xl:top-28" padding="lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Lead detail
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
            {lead.company}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {lead.contactName} / {lead.email} / {lead.phone}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={priorityVariant[lead.priority]}>{lead.priority}</Badge>
          <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <DetailStat label="Lead score" value={`${lead.leadScore}/100`} />
        <DetailStat label="Readiness" value={`${lead.readinessScore}/100`} />
        <DetailStat label="Sursă" value={lead.sourceTool} />
        <DetailStat label="Pagină sursă" value={lead.sourcePage} />
        <DetailStat label="Buget" value={lead.estimatedBudgetRange} />
        <DetailStat label="Urgență" value={lead.urgency} />
        <DetailStat label="Complexitate" value={lead.complexity} />
        <DetailStat label="Risc" value={lead.riskLevel} />
        <DetailStat label="Follow-up" value={intelligence.followUpType} />
        <DetailStat label="Intent comercial" value={intelligence.commercialIntent} />
        <DetailStat label="Incredere" value={intelligence.confidenceLevel} />
        <DetailStat label="Context sursa" value={intelligence.sourceContext} />
      </div>

      <div className="mt-8 rounded-2xl border border-blue-100 bg-[#f7fbff] p-5">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
          Project summary
        </p>
        <p className="mt-4 text-base leading-8 text-slate-700">
          {lead.generatedSummary}
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <DetailList
          title="Lead intelligence"
          items={[
            `Prioritate follow-up: ${intelligence.followUpPriority}`,
            `Tip follow-up: ${intelligence.followUpType}`,
            `Intent comercial: ${intelligence.commercialIntent}`,
            `Incredere: ${intelligence.confidenceLevel}`,
            `Context sursa: ${intelligence.sourceContext}`,
          ]}
        />
        <DetailList
          title="Score rationale"
          items={unique([...lead.scoreRationale, ...scoring.reasons]).slice(0, 6)}
        />
        <DetailList title="Servicii recomandate" items={lead.recommendedServices} />
        <DetailList title="Validari necesare" items={intelligence.validationNeeds} />
        <DetailList title="Calculatoare recomandate" items={intelligence.recommendedCalculators} />
        <DetailList title="Informații lipsă" items={lead.missingInformation} />
        <DetailList title="Ipoteze" items={lead.assumptions} />
      </div>

      <div className="mt-7 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_14px_50px_rgba(0,87,184,0.06)]">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
          Recommended next action
        </p>
        <p className="mt-4 text-lg font-semibold leading-8 text-slate-950">
          {lead.recommendedNextStep}
        </p>
        <p className="mt-4 text-sm font-semibold leading-7 text-[#0057b8]">
          Scoring action: {scoring.nextAction}
        </p>
      </div>

      <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
          Follow-up message outline
        </p>
        <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-600">
          {followUp.map((line) => (
            <li key={line}>- {line}</li>
          ))}
        </ul>
      </div>

      <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-900">
          Internal notes
        </p>
        <p className="mt-4 text-sm leading-7 text-amber-950">{lead.notes}</p>
      </div>
    </Card>
  );
}

function SourceAnalysisCard({
  sources,
}: {
  sources: Array<{ source: string; count: number; averageScore: number }>;
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        Source analysis
      </p>
      <div className="mt-5 grid gap-3">
        {sources.map((source) => (
          <div
            className="rounded-2xl border border-slate-200 bg-white p-4"
            key={source.source}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">
                {source.source}
              </p>
              <Badge variant="blue">{source.count}</Badge>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Scor mediu: {source.averageScore}/100
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BreakdownCard({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; count: number; percent: number }>;
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-800">{item.label}</span>
              <span className="text-slate-500">{item.count}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-blue-100">
              <div
                className="h-2 rounded-full bg-[#0057b8]"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
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
  options: readonly (string | { label: string; value: string })[];
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
        {options.map((option) => {
          const value =
            typeof option === "string" ? option : option.value;
          const label =
            typeof option === "string" ? option : option.label;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </label>
  );
}

function ScorePill({
  score,
  priority,
}: {
  score: number;
  priority: LeadPriority;
}) {
  return (
    <div className="min-w-36">
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-slate-950">{score}/100</span>
        <Badge variant={priorityVariant[priority]}>{priority}</Badge>
      </div>
      <div className="mt-2 h-2 rounded-full bg-blue-100">
        <div
          className="h-2 rounded-full bg-[#0057b8]"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
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

function filterLeads(leads: DemoLead[], filters: FilterState) {
  return leads.filter((lead) => {
    const statusMatch = filters.status === "Toate" || lead.status === filters.status;
    const sourceMatch = filters.source === "Toate" || lead.sourceTool === filters.source;
    const projectTypeMatch =
      filters.projectType === "Toate" || classifyProject(lead) === filters.projectType;
    const urgencyMatch =
      filters.urgency === "Toate" || lead.urgency === filters.urgency;
    const riskMatch =
      filters.riskLevel === "Toate" || lead.riskLevel === filters.riskLevel;
    const priorityMatch =
      filters.priority === "Toate" || lead.priority === filters.priority;

    return (
      statusMatch &&
      sourceMatch &&
      projectTypeMatch &&
      urgencyMatch &&
      riskMatch &&
      priorityMatch
    );
  });
}

function sortLeads(leads: DemoLead[], sort: SortOption) {
  return [...leads].sort((a, b) => {
    if (sort === "highest-score") return b.leadScore - a.leadScore;
    if (sort === "highest-urgency") return urgencyValue(b) - urgencyValue(a);
    if (sort === "highest-budget") return budgetValue(b) - budgetValue(a);
    if (sort === "readiness-score") return b.readinessScore - a.readinessScore;

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function createMetrics(leads: DemoLead[]) {
  const highPriority = leads.filter(
    (lead) =>
      lead.priority === "High priority" ||
      lead.priority === "Critical / immediate opportunity",
  ).length;
  const criticalRisk = leads.filter((lead) => lead.riskLevel === "Critic").length;
  const mostCommonSource = mostCommon(leads.map((lead) => lead.sourceTool));
  const averageScore = average(leads.map((lead) => lead.leadScore));
  const averageReadiness = average(leads.map((lead) => lead.readinessScore));

  return {
    total: leads.length,
    highPriority,
    criticalRisk,
    mostCommonSource,
    averageScore,
    averageReadiness,
  };
}

function createFunnel(leads: DemoLead[]) {
  return leadStatuses.map((status) => {
    const count = leads.filter((lead) => lead.status === status).length;
    return {
      status,
      count,
      percent: Math.round((count / leads.length) * 100),
    };
  });
}

function createNextActionGroups(leads: DemoLead[]) {
  const groups = [
    {
      title: "Sună / califică rapid",
      variant: "critical" as const,
      matcher: (lead: DemoLead) =>
        lead.priority === "Critical / immediate opportunity" ||
        lead.urgency === "Imediat" ||
        lead.urgency === "24-48 ore",
    },
    {
      title: "Solicită planuri și documente",
      variant: "blue" as const,
      matcher: (lead: DemoLead) =>
        lead.missingInformation.some((item) =>
          normalize(item).includes("plan") ||
          normalize(item).includes("document") ||
          normalize(item).includes("status"),
        ),
    },
    {
      title: "Confirmă echipamentul",
      variant: "cyan" as const,
      matcher: (lead: DemoLead) =>
        normalize(lead.generatedSummary).includes("echip") ||
        lead.missingInformation.some((item) => normalize(item).includes("model")),
    },
    {
      title: "Pregătește evaluare tehnică",
      variant: "dark" as const,
      matcher: (lead: DemoLead) => lead.readinessScore >= 65,
    },
  ];

  return groups.map((group) => ({
    title: group.title,
    variant: group.variant,
    leads: leads.filter(group.matcher).slice(0, 5),
  }));
}

function createSourceAnalysis(leads: DemoLead[]) {
  const sources = Array.from(new Set(leads.map((lead) => lead.sourceTool)));

  return sources
    .map((source) => {
      const sourceLeads = leads.filter((lead) => lead.sourceTool === source);
      return {
        source,
        count: sourceLeads.length,
        averageScore: average(sourceLeads.map((lead) => lead.leadScore)),
      };
    })
    .sort((a, b) => b.count - a.count || b.averageScore - a.averageScore);
}

function createBreakdown(values: string[]) {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));

  return Array.from(counts.entries())
    .map(([label, count]) => ({
      label,
      count,
      percent: Math.round((count / values.length) * 100),
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function createFilterOptions(leads: DemoLead[]) {
  return {
    sources: Array.from(new Set(leads.map((lead) => lead.sourceTool))).sort(),
    projectTypes: Array.from(new Set(leads.map((lead) => classifyProject(lead)))).sort(),
    urgencies: Array.from(new Set(leads.map((lead) => lead.urgency))).sort(
      (a, b) => (urgencyRank[b] ?? 0) - (urgencyRank[a] ?? 0),
    ),
  };
}

function classifyProject(lead: DemoLead) {
  const text = normalize(`${lead.projectType} ${lead.inquiryType}`);

  if (text.includes("rmn") || text.includes("rf")) return "RMN / RF shielding";
  if (text.includes("ct") || text.includes("rx") || text.includes("cncan")) {
    return "CT / RX / protecție radiologică";
  }
  if (text.includes("ivd") || text.includes("laborator")) return "IVD / laborator";
  if (text.includes("service") || text.includes("mentenan")) return "Service";
  if (text.includes("modernizare")) return "Modernizare";
  if (text.includes("achizi") || text.includes("aparatur")) return "Aparatură";
  if (text.includes("clinic")) return "Clinic / infrastructură";

  return "Alt proiect";
}

function scoreDemoLead(lead: DemoLead) {
  return scoreLead({
    sourceTool: lead.sourceTool,
    sourcePage: lead.sourcePage,
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

function createLeadIntelligenceView(lead: DemoLead, scoring: LeadScoreResult) {
  const followUpType =
    lead.followUpType ??
    (lead.priority === "Critical / immediate opportunity" || lead.riskLevel === "Critic"
      ? "urgent-technical-review"
      : lead.readinessScore >= 70
        ? "proposal-preparation"
        : "technical-clarification");
  const commercialIntent =
    lead.commercialIntent ??
    (lead.leadScore >= 70 || lead.readinessScore >= 70
      ? "high"
      : lead.leadScore >= 40
        ? "medium"
        : "low");
  const confidenceLevel =
    lead.confidenceLevel ??
    (lead.readinessScore >= 72
      ? "high"
      : lead.readinessScore >= 45
        ? "medium"
        : "low");

  return {
    commercialIntent,
    confidenceLevel,
    followUpPriority: lead.followUpPriority ?? scoring.priority,
    followUpType,
    recommendedCalculators:
      lead.recommendedCalculators?.map((item) => `${item.label} (${item.href})`) ??
      ["Calculator proiect medical (/calculator-proiect-medical)"],
    sourceContext: lead.sourceContext ?? `${lead.sourceTool} / ${lead.sourcePage}`,
    validationNeeds:
      lead.validationNeeds ??
      [
        "Validare planuri si amplasament",
        "Confirmare echipamente si documentatie",
        "Clarificare calendar, buget si responsabilitati",
      ],
  };
}

function createFollowUpOutline(lead: DemoLead) {
  const lines = [
    `Bună ziua, revenim pe solicitarea ${lead.id} pentru ${lead.projectType}.`,
    `Pentru următorul pas avem nevoie de: ${lead.missingInformation.slice(0, 3).join(", ")}.`,
  ];

  if (normalize(lead.projectType).includes("rmn")) {
    lines.push("Vom separa discuția RF shielding / cușcă Faraday de orice cerințe de radioprotecție.");
  }

  if (normalize(lead.projectType).includes("ct") || normalize(lead.projectType).includes("rx")) {
    lines.push("Vom verifica separat protecția radiologică, zonele controlate și statusul CNCAN.");
  }

  if (normalize(lead.projectType).includes("ivd")) {
    lines.push("Vom corela echipamentele IVD cu fluxul probelor, calibrarea, QC-ul și service-ul.");
  }

  lines.push(`Propunere de următor pas: ${lead.recommendedNextStep}`);

  return lines;
}

function mostCommon(values: string[]) {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));

  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
}

function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

function urgencyValue(lead: DemoLead) {
  return urgencyRank[lead.urgency] ?? 0;
}

function budgetValue(lead: DemoLead) {
  const range = parseBudgetRange(lead.estimatedBudgetRange);
  return range ? range[1] : 0;
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

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
