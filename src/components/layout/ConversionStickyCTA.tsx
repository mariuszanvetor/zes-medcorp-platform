"use client";

import Link from "next/link";

import { trackCTA } from "@/lib/analytics";

const actions = [
  { label: "Analiză preliminară", href: "/ai-project-advisor" },
  { label: "Estimare orientativă", href: "/calculator-proiect-medical" },
  { label: "Discutați proiectul", href: "/contact" },
];

export function ConversionStickyCTA() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 sm:bottom-4 sm:px-4">
      <div className="pointer-events-auto flex w-full max-w-3xl items-center gap-2 rounded-[1.35rem] border border-blue-100 bg-white/94 p-2 shadow-[0_18px_60px_rgba(0,87,184,0.16)] backdrop-blur-xl sm:rounded-full">
        <div className="hidden min-w-0 flex-1 pl-4 md:block">
          <p className="truncate text-sm font-semibold text-slate-950">
            Ai un proiect medical, o cameră de radiologie sau o problemă de service?
          </p>
          <p className="truncate text-xs text-slate-500">
            Alegeți un pas clar: evaluare, estimare sau discuție tehnică.
          </p>
        </div>
        <div className="grid w-full grid-cols-3 gap-1 md:w-auto">
          {actions.map((action, index) => (
            <Link
              className={
                index === actions.length - 1
                  ? "inline-flex min-h-10 items-center justify-center rounded-full bg-[#0057b8] px-2.5 text-center text-xs font-bold leading-tight text-white transition hover:bg-[#00498f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-5 sm:text-sm"
                  : "inline-flex min-h-10 items-center justify-center rounded-full px-2.5 text-center text-xs font-bold leading-tight text-slate-700 transition hover:bg-blue-50 hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-5 sm:text-sm"
              }
              href={action.href}
              key={action.href}
              onClick={() =>
                trackCTA({
                  ctaLabel: action.label,
                  destination: action.href,
                  sourceTool: "sticky-consultation-bar",
                })
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
