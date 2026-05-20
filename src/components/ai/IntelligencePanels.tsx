import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type {
  BudgetEstimate,
  ConfidenceEstimate,
  RiskItem,
  RiskSeverity,
  TimelineEstimate,
} from "@/lib/ai-estimation";

const riskVariant: Record<RiskSeverity, "cyan" | "blue" | "dark" | "critical"> = {
  Low: "cyan",
  Medium: "blue",
  High: "dark",
  Critical: "critical",
};

const budgetBandLabel: Record<BudgetEstimate["band"], string> = {
  Low: "Redus",
  Medium: "Mediu",
  Premium: "Ridicat",
  Enterprise: "Complex",
};

export function BudgetEstimatePanel({ budget }: { budget: BudgetEstimate }) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Buget orientativ
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-950">
            {budget.totalRange}
          </h3>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {budget.disclaimer}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Intervalul ajută la trierea proiectului și la pregătirea discuției
            tehnice. Bugetul final depinde de planuri, echipamente, amplasament
            și documentația disponibilă.
          </p>
        </div>
        <Badge variant={budget.band === "Enterprise" ? "dark" : "blue"}>
          {budgetBandLabel[budget.band]}
        </Badge>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <BudgetLines title="Pe faze" lines={budget.phaseBreakdown} />
        <BudgetLines title="Pe servicii" lines={budget.serviceBreakdown} />
      </div>
    </Card>
  );
}

export function TimelineEstimatePanel({
  timeline,
}: {
  timeline: TimelineEstimate;
}) {
  return (
    <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        Timeline estimat
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-950">
        Durată estimată: {timeline.estimatedDuration}
      </h3>
      <div className="mt-8 grid gap-4">
        {timeline.phases.map((phase) => (
          <div
            className="grid gap-3 rounded-2xl border border-blue-100 bg-white p-5 md:grid-cols-[0.8fr_0.35fr_1fr]"
            key={phase.phase}
          >
            <p className="font-semibold text-slate-950">{phase.phase}</p>
            <p className="text-sm font-bold text-[#0057b8]">{phase.duration}</p>
            <p className="text-sm leading-7 text-slate-600">
              {phase.dependency}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <SmallList title="Dependențe critice" items={timeline.criticalDependencies} />
        <SmallList title="Factori care pot modifica durata" items={timeline.riskFactors} />
      </div>
    </Card>
  );
}

export function RiskRegisterPanel({ risks }: { risks: RiskItem[] }) {
  return (
    <Card className="border-slate-200 bg-white" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        Riscuri tehnice
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-950">
        Registru de riscuri tehnice
      </h3>
      <div className="mt-8 grid gap-4">
        {risks.map((item) => (
          <div
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            key={`${item.category}-${item.explanation}`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-slate-950">{item.category}</p>
              <Badge variant={riskVariant[item.level]}>{item.level}</Badge>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {item.explanation}
            </p>
            <p className="mt-3 text-sm font-semibold leading-7 text-blue-800">
              Mitigare: {item.mitigation}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ConfidencePanel({
  confidence,
  assumptions,
  missingData,
}: {
  confidence: ConfidenceEstimate;
  assumptions: string[];
  missingData: string[];
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Ipoteze și încredere
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-950">
            Încredere estimare: {confidence.level} ({confidence.score}%)
          </h3>
          <p className="mt-3 text-base leading-8 text-slate-600">
            {confidence.explanation}
          </p>
        </div>
        <Badge variant={confidence.level === "High" ? "cyan" : confidence.level === "Medium" ? "blue" : "dark"}>
          {confidence.level}
        </Badge>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <SmallList title="Ipoteze folosite" items={assumptions} />
        <SmallList title="Date lipsă / de validat" items={missingData} />
      </div>
    </Card>
  );
}

export function InsightListPanel({
  title,
  eyebrow,
  items,
  dark = false,
}: {
  title: string;
  eyebrow?: string;
  items: string[];
  dark?: boolean;
}) {
  return (
    <Card
      className={dark ? "border-white/10 bg-slate-950 text-white" : "border-blue-100 bg-white"}
      padding="lg"
      variant={dark ? "dark" : "surface"}
    >
      {eyebrow && (
        <p className={dark ? "text-sm font-semibold text-cyan-100" : "text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]"}>
          {eyebrow}
        </p>
      )}
      <h3 className={dark ? "mt-3 text-2xl font-semibold text-white" : "mt-3 text-2xl font-semibold text-slate-950"}>
        {title}
      </h3>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            className={dark ? "flex gap-3 text-sm leading-7 text-slate-300" : "flex gap-3 text-base leading-8 text-slate-600"}
            key={item}
          >
            <span
              aria-hidden="true"
              className={dark ? "mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" : "mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function BudgetLines({ title, lines }: { title: string; lines: BudgetEstimate["phaseBreakdown"] }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5">
      <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
        {title}
      </h4>
      <div className="mt-5 grid gap-4">
        {lines.map((line) => (
          <div key={line.label}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-slate-950">{line.label}</p>
              <p className="text-sm font-bold text-[#0057b8]">{line.range}</p>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">{line.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmallList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5">
      <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-7 text-slate-600" key={item}>
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
