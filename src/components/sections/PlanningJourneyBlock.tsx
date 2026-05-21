"use client";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { PlanningJourney } from "@/data/planning-journeys";
import { cn } from "@/lib/utils";

export type PlanningJourneyBlockProps = {
  journeys: PlanningJourney[];
  eyebrow?: string;
  title?: string;
  description?: string;
  sourcePage: string;
  compact?: boolean;
  className?: string;
};

export function PlanningJourneyBlock({
  journeys,
  eyebrow = "Planificare ghidata",
  title = "Alege scenariul potrivit inainte de urmatorul pas.",
  description = "Fiecare traseu leaga serviciile, articolele si instrumentele ZES intr-o ordine mai usor de folosit.",
  sourcePage,
  compact = false,
  className,
}: PlanningJourneyBlockProps) {
  if (!journeys.length) {
    return null;
  }

  return (
    <div className={cn("grid gap-8", className)}>
      <div className={cn("max-w-3xl", compact && "max-w-2xl")}>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          {eyebrow}
        </p>
        <h2
          className={cn(
            "mt-4 font-semibold leading-tight text-slate-950",
            compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "grid gap-5",
          compact ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4",
        )}
      >
        {journeys.map((journey) => {
          const primaryTool = journey.recommendedTools[0];
          const href = `/planificare/${journey.slug}`;

          return (
            <Card
              as="article"
              className="flex min-h-full flex-col border-blue-100 bg-white"
              interactive
              key={journey.slug}
              padding={compact ? "md" : "lg"}
            >
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">{journey.projectStage}</Badge>
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-tight text-slate-950">
                {journey.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {journey.userIntent}
              </p>
              <div className="mt-5 rounded-2xl border border-blue-100 bg-[#f8fbff] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                  Primul pas
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                  {journey.recommendedFirstStep}
                </p>
              </div>
              {primaryTool && (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Instrument recomandat:{" "}
                  <span className="font-semibold text-slate-800">
                    {primaryTool.label}
                  </span>
                </p>
              )}
              <div className="mt-auto pt-6">
                <TrackedLink
                  className="inline-flex text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={href}
                  tracking={{
                    ctaLabel: `Journey: ${journey.title}`,
                    destination: href,
                    journeySlug: journey.slug,
                    sourcePage,
                  }}
                >
                  Vezi traseul
                </TrackedLink>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
