"use client";

import type { UploadPrompt } from "@/lib/ai-intelligence/discovery-orchestrator";

export function DiscoveryUploadGuidance({
  prompts,
}: {
  prompts: UploadPrompt[];
}) {
  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        Documente utile, optionale
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        Puteti adauga documente mai tarziu.
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Daca aveti schite, planuri, fise tehnice sau fotografii, acestea pot ajuta analiza. Puteti continua si fara documente; workspace-ul va marca ipotezele si nivelul de incredere.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {prompts.slice(0, 4).map((prompt) => (
          <div className="rounded-lg border border-blue-100 bg-[#f7fbff] p-4" key={prompt.id}>
            <p className="text-sm font-semibold text-slate-950">{prompt.title}</p>
            <p className="mt-2 text-xs leading-6 text-slate-600">{prompt.reason}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {prompt.artifactTypes.map((type) => (
                <span
                  className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0057b8]"
                  key={type}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs font-semibold leading-6 text-slate-600">
        Uploadul real nu este activ in aceasta etapa. Nu trimiteti date medicale despre pacienti. Documentele vor deveni utile intr-o faza viitoare de analiza documentara, dupa reguli clare de securitate si confidentialitate.
      </p>
    </section>
  );
}
