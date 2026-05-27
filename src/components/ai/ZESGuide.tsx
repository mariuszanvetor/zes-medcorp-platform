"use client";

import { useMemo, useState } from "react";

import { trackCTA, trackEvent } from "@/lib/analytics";
import {
  continueZESConversation,
  startZESConversation,
  zesGuideStarters,
  type ZESAssistantTurn,
  type ZESConversationState,
} from "@/lib/zes-guide-engine";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ConversationItem =
  | { role: "assistant"; text: string; turn?: ZESAssistantTurn }
  | { role: "user"; text: string };

type ZESGuideProps = {
  compactHeader?: boolean;
};

const introMessage =
  "Salut, sunt ZES. Spune ce vrei sa construiesti, modernizezi sau repari, iar ZES te ghideaza tehnic si comercial pana la urmatorul pas.";

export function ZESGuide({ compactHeader = false }: ZESGuideProps) {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState<ConversationItem[]>([
    { role: "assistant", text: introMessage },
  ]);
  const [conversationState, setConversationState] = useState<ZESConversationState | null>(
    null,
  );

  const lastTurn = useMemo(() => {
    for (let index = conversation.length - 1; index >= 0; index -= 1) {
      const item = conversation[index];
      if (item.role === "assistant" && item.turn) {
        return item.turn;
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

    if (!conversationState) {
      const started = startZESConversation(text);
      setConversationState(started.state);
      setConversation((current) => [
        ...current,
        { role: "user", text },
        { role: "assistant", text: composeAssistantText(started.turn), turn: started.turn },
      ]);
      trackEvent("ai_discovery_step", {
        sourcePage: "/",
        sourceTool: "zes-guide",
        status: `start:${started.state.pathId}`,
      });
      setQuery("");
      return;
    }

    const progressed = continueZESConversation(conversationState, text);
    setConversationState(progressed.state);
    setConversation((current) => [
      ...current,
      { role: "user", text },
      {
        role: "assistant",
        text: composeAssistantText(progressed.turn),
        turn: progressed.turn,
      },
    ]);

    trackEvent("ai_discovery_step", {
      sourcePage: "/",
      sourceTool: "zes-guide",
      status: `progress:${progressed.state.pathId}`,
      urgency: progressed.turn.leadSnapshot.urgency,
    });
    setQuery("");
  }

  return (
    <section
      className="rounded-xl border border-blue-200 bg-white p-4 shadow-[0_18px_42px_rgba(0,87,184,0.09)] sm:p-6"
      id="zes-guide"
    >
      {!compactHeader && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#0057b8]">
              ZES AI Copilot
            </span>
            <span className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-700">
              ZES guided planning mode
            </span>
            <span className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-700">
              deterministic mock intelligence
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Discuta cu ZES
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Ghid AI pentru proiecte medicale. ZES colecteaza contextul tehnic, identifica
            informatiile lipsa si pregateste urmatorul pas comercial.
          </p>
        </>
      )}

      <div className={cn("grid gap-4", compactHeader ? "mt-0" : "mt-5", "lg:grid-cols-[1fr_0.4fr]")}>
        <div className="min-w-0 rounded-xl border border-slate-200 bg-[#f7fbff] p-3 sm:p-4">
          <div className="grid max-h-[30rem] gap-3 overflow-y-auto pr-1">
            {conversation.map((item, index) => (
              <div
                className={cn(
                  "max-w-[96%] rounded-lg border p-3 text-sm leading-7 shadow-sm",
                  item.role === "assistant"
                    ? "justify-self-start border-blue-100 bg-white text-slate-800"
                    : "justify-self-end border-[#0057b8] bg-[#0057b8] text-white",
                )}
                key={`${item.role}-${index}-${item.text.slice(0, 18)}`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-75">
                  {item.role === "assistant" ? "ZES" : "Tu"}
                </p>
                <p className="mt-1 whitespace-pre-line">{item.text}</p>
                {item.role === "assistant" && item.turn && (
                  <TurnDetails turn={item.turn} />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Start rapid
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
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
                className="h-12 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Vreau sa deschid o clinica CT | Am un aparat defect si am nevoie de service | Am nevoie de camera RMN"
                value={query}
              />
              <Button size="lg" type="submit">
                Trimite
              </Button>
            </form>
          </div>
        </div>

        <aside className="grid gap-3">
          <div className="rounded-lg border border-blue-100 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
              Capabilitati ZES
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(lastTurn?.capabilityChips ?? defaultCapabilityChips).map((chip) => (
                <span
                  className="rounded-lg border border-blue-100 bg-[#f7fbff] px-2 py-1 text-xs font-semibold text-slate-700"
                  key={chip}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Lead summary
            </p>
            {lastTurn ? (
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
                <li>
                  <span className="font-semibold text-slate-900">Nevoie detectata:</span>{" "}
                  {lastTurn.leadSnapshot.detectedNeed}
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Domeniu:</span>{" "}
                  {lastTurn.leadSnapshot.domain}
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Urgenta:</span>{" "}
                  {lastTurn.leadSnapshot.urgency}
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Maturitate:</span>{" "}
                  {lastTurn.leadSnapshot.maturity}
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Urmator pas:</span>{" "}
                  {lastTurn.leadSnapshot.nextStep}
                </li>
              </ul>
            ) : (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                ZES va construi rezumatul lead-ului in timp real pe masura ce raspunzi.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Actiuni recomandate
            </p>
            <div className="mt-2 grid gap-2">
              {(lastTurn?.ctas ?? defaultCtas).slice(0, 4).map((cta) => (
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

function composeAssistantText(turn: ZESAssistantTurn) {
  const parts = [turn.message];
  if (turn.followUpQuestion) {
    parts.push(`Intrebare urmatoare: ${turn.followUpQuestion}`);
  }
  return parts.join("\n");
}

function TurnDetails({ turn }: { turn: ZESAssistantTurn }) {
  return (
    <div className="mt-3 grid gap-2 rounded-lg border border-blue-100 bg-[#f7fbff] p-3 text-xs text-slate-700">
      <p className="font-semibold text-slate-900">{turn.internalCapabilityNote}</p>
      <p>
        Servicii sugerate:{" "}
        {turn.suggestedServices.slice(0, 3).map((service) => service.label).join(", ")}
      </p>
      <p>
        Informatii lipsa:{" "}
        {turn.leadSnapshot.missingInfo.length
          ? turn.leadSnapshot.missingInfo.slice(0, 2).join(" | ")
          : "set minim completat pentru pasul urmator"}
      </p>
      <p className="text-[11px] leading-6 text-slate-600">{turn.documentHint}</p>
      {turn.highIntentClose && (
        <p className="rounded-lg border border-blue-200 bg-blue-50 p-2 font-semibold text-[#0057b8]">
          Cerere cu intent ridicat detectata. ZES recomanda trimiterea datelor catre echipa ZESCORP.
        </p>
      )}
    </div>
  );
}

const defaultCapabilityChips = [
  "Planificare proiect",
  "Ofertare",
  "Service triage",
  "Radioprotectie",
  "RF shielding",
  "CNCAN",
  "HVAC/electric",
  "Fonduri europene",
  "Mentenanta",
  "Echipamente",
] as const;

const defaultCtas = [
  { label: "Continua conversatia cu ZES", href: "/ai-discovery", kind: "workflow", availability: "available" },
  { label: "Pregateste cerere oferta", href: "/proposal-builder?source=zes-guide", kind: "tool", availability: "available" },
  { label: "Trimite datele catre ZESCORP", href: "/project-intake?source=zes-guide", kind: "tool", availability: "available" },
] as const;
