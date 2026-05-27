"use client";

import { useMemo, useState } from "react";

import { trackCTA, trackEvent } from "@/lib/analytics";
import {
  createZESGuideResponse,
  zesGuideStarters,
  type ZESGuideResponse,
} from "@/lib/zes-guide-engine";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ConversationItem =
  | { role: "assistant"; text: string; response?: ZESGuideResponse }
  | { role: "user"; text: string };

const introMessage =
  "Salut, sunt ZES Copilot. Te pot ghida pentru proiecte CT, RMN, radiologie, laborator, service si modernizare, apoi te directionez spre pasul potrivit.";

export function ZESGuide() {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState<ConversationItem[]>([
    { role: "assistant", text: introMessage },
  ]);

  const lastResponse = useMemo(() => {
    for (let index = conversation.length - 1; index >= 0; index -= 1) {
      const item = conversation[index];
      if (item.role === "assistant" && item.response) {
        return item.response;
      }
    }
    return null;
  }, [conversation]);

  function handlePrompt(prompt: string) {
    setQuery(prompt);
    handleSend(prompt);
  }

  function handleSend(overrideValue?: string) {
    const text = (overrideValue ?? query).trim();
    if (!text) return;

    const response = createZESGuideResponse(text);

    setConversation((current) => [
      ...current,
      { role: "user", text },
      { role: "assistant", text: response.answer, response },
    ]);
    setQuery("");

    trackEvent("ai_discovery_step", {
      sourcePage: "/",
      sourceTool: "zes-guide",
      status: `intent:${response.intent}|readiness:${response.leadReadiness}`,
      urgency: response.urgencySignal,
    });
  }

  return (
    <section
      className="rounded-xl border border-blue-200 bg-white p-4 shadow-[0_18px_42px_rgba(0,87,184,0.09)] sm:p-6"
      id="zes-guide"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#0057b8]">
          ZES AI Copilot
        </span>
        <span className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-700">
          guided planning mode
        </span>
        <span className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-700">
          deterministic mock intelligence
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        Discuta cu ZES
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Ghid AI pentru proiecte medicale. Primeste pasi, recomandari si directie comerciala
        preliminara, apoi continua spre fluxul potrivit.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.42fr]">
        <div className="min-w-0 rounded-xl border border-slate-200 bg-[#f7fbff] p-3 sm:p-4">
          <div className="grid max-h-[28rem] gap-3 overflow-y-auto pr-1">
            {conversation.map((item, index) => (
              <div
                className={cn(
                  "max-w-[96%] rounded-lg border p-3 text-sm leading-7 shadow-sm",
                  item.role === "assistant"
                    ? "justify-self-start border-blue-100 bg-white text-slate-800"
                    : "justify-self-end border-[#0057b8] bg-[#0057b8] text-white",
                )}
                key={`${item.role}-${index}-${item.text.slice(0, 20)}`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-75">
                  {item.role === "assistant" ? "ZES Copilot" : "Tu"}
                </p>
                <p className="mt-1">{item.text}</p>
                {item.role === "assistant" && item.response && (
                  <ResponseFooter response={item.response} />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <div className="flex flex-wrap gap-2">
              {zesGuideStarters.map((starter) => (
                <button
                  className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
                  key={starter}
                  type="button"
                  onClick={() => handlePrompt(starter)}
                >
                  {starter}
                </button>
              ))}
            </div>
            <form
              className="mt-3 flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
            >
              <input
                className="h-11 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex.: Vreau sa deschid o clinica CT in 4 luni."
                value={query}
              />
              <Button size="md" type="submit">
                Trimite
              </Button>
            </form>
          </div>
        </div>

        <aside className="grid gap-3">
          <div className="rounded-lg border border-blue-100 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
              Rezumat intent
            </p>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-900">
              {lastResponse
                ? lastResponse.leadIntentSummary
                : "ZES va detecta intentul (CT, RMN, service, laborator, modernizare, ofertare) dupa primul mesaj."}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Readiness comercial
            </p>
            <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
              {lastResponse ? lastResponse.leadReadiness : "in evaluare"}
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-600">
              {lastResponse
                ? `Urgenta: ${lastResponse.urgencySignal}. Maturitate: ${lastResponse.projectMaturity}.`
                : "Discutia cu ZES ajuta la clarificarea urgenei, maturitatii si urmatorului pas."}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Urmator pas recomandat
            </p>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-900">
              {lastResponse
                ? lastResponse.nextBestAction
                : "Poti incepe direct cu AI Discovery sau Project Intake daca ai deja context de proiect."}
            </p>
            <div className="mt-3 grid gap-2">
              {(lastResponse?.ctas ?? defaultCtas).slice(0, 3).map((cta) => (
                <Button
                  className="justify-start"
                  href={cta.href}
                  key={`${cta.href}-${cta.label}`}
                  size="sm"
                  variant={cta.kind === "contact" ? "primary" : "secondary"}
                  onClick={() =>
                    trackCTA({
                      sourcePage: "/",
                      sourceTool: "zes-guide",
                      ctaLabel: cta.label,
                      destination: cta.href,
                      status: lastResponse?.intent ?? "default",
                    })
                  }
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ResponseFooter({ response }: { response: ZESGuideResponse }) {
  return (
    <div className="mt-3 grid gap-2 rounded-lg border border-blue-100 bg-[#f7fbff] p-3 text-xs text-slate-700">
      <p className="font-semibold text-slate-900">
        Oportunitate: {response.commercialOpportunityType}
      </p>
      <p>Informatii de clarificat: {response.missingQuestions.slice(0, 2).join(" | ")}</p>
      <p>
        Servicii sugerate: {response.recommendedServices.slice(0, 2).map((item) => item.label).join(", ")}
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        {response.ctas.slice(0, 2).map((cta) => (
          <Button
            className="h-8 px-3 text-[11px]"
            href={cta.href}
            key={`${cta.href}-${cta.label}`}
            size="sm"
            variant="secondary"
          >
            {cta.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

const defaultCtas = [
  { label: "Continua cu AI Discovery", href: "/ai-discovery", kind: "workflow", availability: "available" },
  { label: "Genereaza context pentru ofertare", href: "/proposal-builder", kind: "tool", availability: "available" },
  { label: "Trimite cerere pentru analiza", href: "/project-intake", kind: "tool", availability: "available" },
] as const;
