"use client";

import { cn } from "@/lib/utils";

export type AdvisorProgressProps = {
  hasResult: boolean;
  leadCaptured: boolean;
};

const steps = ["Date proiect", "Analiză simulată", "Contact ZES"];

export function AdvisorProgress({
  hasResult,
  leadCaptured,
}: AdvisorProgressProps) {
  const activeIndex = leadCaptured ? 2 : hasResult ? 1 : 0;

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 text-white shadow-[0_20px_60px_rgba(2,6,23,0.28)] backdrop-blur-xl">
      <div className="grid gap-3 sm:grid-cols-3">
        {steps.map((step, index) => {
          const isActive = index <= activeIndex;

          return (
            <div
              className={cn(
                "rounded-md border px-4 py-3 transition",
                isActive
                  ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-50"
                  : "border-white/10 bg-slate-950/40 text-slate-400",
              )}
              key={step}
            >
              <span className="text-xs font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-sm font-semibold">{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
