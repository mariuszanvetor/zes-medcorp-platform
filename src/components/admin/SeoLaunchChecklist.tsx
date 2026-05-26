"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type {
  SeoIndexingGroup,
  SeoIndexingItem,
  SeoIndexingPriority,
} from "@/data/seo-indexing-priorities";
import { cn } from "@/lib/utils";

export type SeoLaunchChecklistProps = {
  groups: SeoIndexingGroup[];
};

type ReviewStatus = "Not checked" | "Submitted" | "Indexed" | "Needs review";

const reviewStatusStyles: Record<ReviewStatus, string> = {
  "Not checked": "bg-slate-100 text-slate-700",
  Submitted: "bg-blue-100 text-blue-900",
  Indexed: "bg-emerald-100 text-emerald-900",
  "Needs review": "bg-amber-100 text-amber-950",
};

const priorityStyles: Record<SeoIndexingPriority, string> = {
  critical: "bg-rose-100 text-rose-900",
  high: "bg-amber-100 text-amber-950",
  medium: "bg-blue-100 text-blue-900",
  low: "bg-slate-100 text-slate-700",
};

const typeStyles: Record<string, string> = {
  homepage: "bg-blue-100 text-blue-900",
  conversion: "bg-emerald-100 text-emerald-900",
  hub: "bg-cyan-100 text-cyan-900",
  calculator: "bg-indigo-100 text-indigo-900",
  comparison: "bg-violet-100 text-violet-900",
  glossary: "bg-slate-100 text-slate-700",
  planning: "bg-teal-100 text-teal-900",
  service: "bg-amber-100 text-amber-950",
  article: "bg-fuchsia-100 text-fuchsia-900",
  legal: "bg-stone-100 text-stone-700",
  company: "bg-sky-100 text-sky-900",
};

export function SeoLaunchChecklist({ groups }: SeoLaunchChecklistProps) {
  const [statuses, setStatuses] = useState<Record<string, ReviewStatus>>(() =>
    Object.fromEntries(
      groups.flatMap((group) => group.items.map((item) => [item.url, "Not checked"])),
    ),
  );

  const totals = useMemo(() => {
    const items = groups.flatMap((group) => group.items);
    return {
      total: items.length,
      critical: items.filter((item) => item.priority === "critical").length,
      high: items.filter((item) => item.priority === "high").length,
    };
  }, [groups]);

  function updateStatus(url: string, status: ReviewStatus) {
    setStatuses((current) => ({ ...current, [url]: status }));
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
  }

  return (
    <div className="grid gap-8">
      <Card className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]" padding="lg">
        <div className="flex flex-wrap gap-2">
          <Badge variant="blue">Search Console workflow</Badge>
          <Badge variant="neutral">manual</Badge>
          <Badge variant="neutral">no API</Badge>
        </div>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
          SEO launch checklist
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Foloseste aceasta lista dupa fiecare deploy ca sa prioritizezi URL-urile
          care merita inspectie si request de indexare in Google Search Console.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard label="URL-uri prioritare" value={String(totals.total)} />
          <StatCard label="Critical" value={String(totals.critical)} />
          <StatCard label="High priority" value={String(totals.high)} />
        </div>
      </Card>

      <Card className="border-blue-100 bg-white" padding="lg">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          Post-deploy checklist
        </h3>
        <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600">
          {[
            "Verifica deploy-ul Vercel ca Ready.",
            "Deschide homepage, sitemap.xml si robots.txt.",
            "Trimite sitemap-ul in Search Console daca este un deploy nou.",
            "Cere indexing pentru homepage, contact, Proposal Builder si Project Intake.",
            "Cere indexing pentru hub-urile de calculatoare, comparatii si glosar.",
            "Testeaza lead flow, PDF export, mobile homepage si pagina de contact.",
            "Verifica Google Sheets si Resend dupa un test controlat.",
          ].map((item) => (
            <li className="flex gap-3" key={item}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="border-blue-100 bg-white" padding="lg">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          Search Console instructions
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InstructionCard
            title="Inspect URL"
            body="Deschide URL-ul in Search Console si verifica daca este 'Discovered - currently not indexed' sau indexat."
          />
          <InstructionCard
            title="Request indexing"
            body="Folosește request-ul manual pentru homepage, conversie si top landing pages, dar nu spama aceleasi URL-uri zilnic."
          />
          <InstructionCard
            title="Sitemap"
            body="Trimite sitemap-ul dupa deploy si verifica daca toate hub-urile, comparatiile si calculatoarele apar acolo."
          />
          <InstructionCard
            title="Weekly routine"
            body="Revizuieste statusurile saptamanal si urmareste paginile care apar ca descoperite dar neindexate."
          />
        </div>
      </Card>

      {groups.map((group) => (
        <section className="grid gap-4" key={group.slug}>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              {group.title}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              {group.description}
            </h3>
          </div>

          <div className="grid gap-4">
            {group.items.map((item) => (
              <Card className="border-blue-100 bg-white" key={item.url} padding="lg">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={cn("border-transparent", priorityStyles[item.priority])} variant="neutral">
                        {item.priority}
                      </Badge>
                      <Badge className={cn("border-transparent", typeStyles[item.type] ?? typeStyles.article)} variant="neutral">
                        {item.type}
                      </Badge>
                      <Badge className={cn("border-transparent", reviewStatusStyles[statuses[item.url] ?? "Not checked"])} variant="neutral">
                        {statuses[item.url] ?? "Not checked"}
                      </Badge>
                    </div>
                    <h4 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.reason}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      <span className="font-semibold text-slate-900">Recommended:</span>{" "}
                      {item.recommendedAction}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      <span className="font-semibold text-slate-900">Search Console:</span>{" "}
                      {item.searchConsoleAction}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-500">{item.notes}</p>
                    <p className="mt-3 break-all text-xs font-semibold uppercase tracking-[0.12em] text-[#0057b8]">
                      {item.url}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 xl:w-64">
                    <label className="grid gap-2 text-sm font-semibold text-slate-900">
                      Manual status
                      <select
                        className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        value={statuses[item.url] ?? "Not checked"}
                        onChange={(event) =>
                          updateStatus(item.url, event.target.value as ReviewStatus)
                        }
                      >
                        {["Not checked", "Submitted", "Indexed", "Needs review"].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="grid gap-2">
                      <Button
                        fullWidth
                        onClick={() => copyUrl(item.url)}
                        variant="secondary"
                      >
                        Copiaza URL
                      </Button>
                      <Button
                        fullWidth
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        variant="outline"
                      >
                        Deschide URL
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function InstructionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-5">
      <h4 className="text-base font-semibold text-slate-950">{title}</h4>
      <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
    </div>
  );
}
