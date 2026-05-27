"use client";

import { useMemo, useState } from "react";

import { trackCTA, trackEvent, trackLeadEvent } from "@/lib/analytics";
import {
  createLeadPayload,
  validateLeadPayload,
  hasFormErrors,
  validateEmail,
  validatePhone,
  type FormErrorMap,
} from "@/lib/forms";
import {
  continueZESConversation,
  startZESConversation,
  zesGuideStarters,
  type ZESAssistantTurn,
  type ZESConversationState,
} from "@/lib/zes-guide-engine";
import {
  type ZESGuideApiResponse,
  type ZESGuideHistoryItem,
  type ZESAIRuntimeMode,
} from "@/lib/zes-ai";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ConversationItem =
  | {
      role: "assistant";
      text: string;
      turn?: ZESAssistantTurn;
      aiMode?: ZESAIRuntimeMode;
      aiModel?: string | null;
    }
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
  const [captureVisible, setCaptureVisible] = useState(false);
  const [leadValues, setLeadValues] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    shortDescription: "",
    urgency: "Normala",
    equipmentModel: "",
    projectType: "",
  });
  const [leadErrors, setLeadErrors] = useState<FormErrorMap>({});
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [isResponding, setIsResponding] = useState(false);
  const [runtimeMode, setRuntimeMode] = useState<ZESAIRuntimeMode>("mock");
  const [runtimeModel, setRuntimeModel] = useState<string | null>(null);
  const [leadModes, setLeadModes] = useState<{
    emailMode?: string;
    sheetsMode?: string;
    storageMode?: string;
    success?: boolean;
  } | null>(null);

  const lastTurn = useMemo(() => {
    for (let index = conversation.length - 1; index >= 0; index -= 1) {
      const item = conversation[index];
      if (item.role === "assistant" && item.turn) {
        return item.turn;
      }
    }
    return null;
  }, [conversation]);

  const shouldOfferCapture = useMemo(() => {
    if (!lastTurn || !conversationState) return false;
    const answeredCount = Object.keys(conversationState.collectedAnswers).length;
    const highIntentPath =
      conversationState.pathId === "service" ||
      conversationState.pathId === "ct-radiology" ||
      conversationState.pathId === "mri" ||
      conversationState.pathId === "funding" ||
      conversationState.pathId === "equipment";

    return lastTurn.highIntentClose || (highIntentPath && answeredCount >= 2);
  }, [lastTurn, conversationState]);

  function handlePrompt(prompt: string) {
    setQuery(prompt);
    void handleSend(prompt);
  }

  async function handleSend(overrideValue?: string) {
    const text = (overrideValue ?? query).trim();
    if (!text || isResponding) return;

    setIsResponding(true);
    setCaptureVisible(false);
    setLeadStatus("idle");
    setLeadModes(null);
    setQuery("");

    try {
      const response = await requestZESReply({
        history: toHistoryItems(conversation),
        message: text,
        state: conversationState,
      });

      setConversationState(response.state);
      setRuntimeMode(response.aiMode);
      setRuntimeModel(response.aiModel);
      setConversation((current) => [
        ...current,
        { role: "user", text },
        {
          role: "assistant",
          text: composeAssistantText(response.turn),
          turn: response.turn,
          aiMode: response.aiMode,
          aiModel: response.aiModel,
        },
      ]);

      if (response.turn.highIntentClose) {
        setCaptureVisible(true);
      }

      trackEvent("ai_discovery_step", {
        sourcePage: "/",
        sourceTool: "zes-guide",
        status: `${conversationState ? "progress" : "start"}:${response.state.pathId}:${response.aiMode}`,
        urgency: response.turn.leadSnapshot.urgency,
      });
    } finally {
      setIsResponding(false);
    }
  }

  async function submitLeadCapture() {
    if (!lastTurn || !conversationState) return;

    const rawValues = {
      name: leadValues.name.trim(),
      company: leadValues.company.trim(),
      phone: leadValues.phone.trim(),
      email: leadValues.email.trim(),
      message: leadValues.shortDescription.trim(),
      urgency: leadValues.urgency,
      projectType:
        leadValues.projectType.trim() || lastTurn.leadSnapshot.detectedNeed,
      city: leadValues.city.trim(),
      equipmentModel: leadValues.equipmentModel.trim(),
      inquiryType: `ZES Guide - ${lastTurn.leadSnapshot.domain}`,
      intent: conversationState.pathId,
      readiness: lastTurn.leadSnapshot.maturity,
      recommendedFollowUp: lastTurn.leadSnapshot.nextStep,
      selectedServices: lastTurn.suggestedServices.map((item) => item.label).join(", "),
      missingInfo: lastTurn.leadSnapshot.missingInfo.join(" | "),
      aiMode: runtimeMode,
      aiModel: runtimeModel ?? "",
    };

    const payload = createLeadPayload({
      sourceTool: "ZES Guide",
      sourcePage: "/",
      inquiryType: "ZES Guide conversation",
      values: rawValues,
      generatedSummary: buildGeneratedSummary(lastTurn, conversationState, runtimeMode, runtimeModel),
      generatedRiskLevel: mapUrgencyToRisk(lastTurn.leadSnapshot.urgency),
      generatedComplexity: `${lastTurn.leadSnapshot.domain} / ${lastTurn.leadSnapshot.maturity}`,
    });

    const validationErrors = validateLeadPayload(payload);
    if (!leadValues.city.trim()) {
      validationErrors.city = "Completeaza orasul.";
    }
    if (!validateEmail(leadValues.email)) {
      validationErrors.email = "Introdu un email valid.";
    }
    if (!validatePhone(leadValues.phone)) {
      validationErrors.phone = "Introdu un telefon valid.";
    }

    if (hasFormErrors(validationErrors)) {
      setLeadErrors(validationErrors);
      setLeadStatus("error");
      trackLeadEvent("lead_form_submit_error", {
        sourcePage: "/",
        sourceTool: "zes-guide",
        inquiryType: "ZES Guide conversation",
        status: "validation_error",
      });
      return;
    }

    setLeadErrors({});
    setLeadStatus("loading");
    trackLeadEvent("lead_form_submit_attempt", {
      sourcePage: "/",
      sourceTool: "zes-guide",
      inquiryType: payload.inquiryType,
      projectType: payload.projectType,
      urgency: payload.urgency,
      complexity: payload.generatedComplexity,
      riskLevel: payload.generatedRiskLevel,
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const apiResult = (await response.json()) as {
        success?: boolean;
        emailMode?: string;
        sheetsMode?: string;
        storageMode?: string;
        message?: string;
      };

      if (!response.ok || apiResult.success === false) {
        throw new Error(
          apiResult.message || "Solicitarea ZES nu a putut fi pregatita.",
        );
      }

      setLeadStatus("success");
      setLeadModes({
        success: apiResult.success,
        emailMode: apiResult.emailMode,
        sheetsMode: apiResult.sheetsMode,
        storageMode: apiResult.storageMode,
      });
      trackLeadEvent("lead_form_submit_success", {
        sourcePage: "/",
        sourceTool: "zes-guide",
        inquiryType: payload.inquiryType,
        emailMode: apiResult.emailMode,
        sheetsMode: apiResult.sheetsMode,
        storageMode: apiResult.storageMode,
      });
    } catch (error) {
      setLeadStatus("error");
      setLeadErrors({
        form:
          error instanceof Error
            ? error.message
            : "Solicitarea nu a putut fi trimisa.",
      });
      trackLeadEvent("lead_form_submit_error", {
        sourcePage: "/",
        sourceTool: "zes-guide",
        inquiryType: payload.inquiryType,
        status: "request_error",
      });
    }
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
              {formatRuntimeLabel(runtimeMode, runtimeModel)}
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
                  <TurnDetails
                    aiMode={item.aiMode}
                    aiModel={item.aiModel}
                    turn={item.turn}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Start rapid
              </p>
              <p className="text-xs leading-6 text-slate-500">
                Nu introduce date medicale sensibile sau date de pacient. ZES foloseste
                contextul doar pentru raspunsul curent si pentru pregatirea solicitarii.
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {zesGuideStarters.map((starter) => (
                <button
                  className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
                  key={starter}
                  type="button"
                  onClick={() => {
                    void handlePrompt(starter);
                  }}
                >
                  {starter}
                </button>
              ))}
            </div>
            <form
              className="mt-3 flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                void handleSend();
              }}
            >
              <input
                className="h-12 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Vreau sa deschid o clinica CT | Am un aparat defect si am nevoie de service | Am nevoie de camera RMN"
                value={query}
              />
              <Button isLoading={isResponding} size="lg" type="submit">
                Trimite
              </Button>
            </form>
          </div>

          {(captureVisible || shouldOfferCapture) && lastTurn && conversationState && (
            <section className="mt-4 rounded-lg border border-blue-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Cerere catre ZESCORP
              </p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-900">
                Din ce ai descris, pare o cerere cu potential ridicat. ZES poate pregati acum cererea pentru echipa ZESCORP.
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                Completeaza datele de contact ca sa poata reveni un specialist. Pentru service urgent, telefonul si orasul sunt esentiale.
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <InlineInput
                  error={leadErrors.name}
                  label="Nume"
                  value={leadValues.name}
                  onChange={(value) => setLeadValues((current) => ({ ...current, name: value }))}
                />
                <InlineInput
                  error={leadErrors.company}
                  label="Companie / clinica"
                  value={leadValues.company}
                  onChange={(value) => setLeadValues((current) => ({ ...current, company: value }))}
                />
                <InlineInput
                  error={leadErrors.phone}
                  label="Telefon"
                  value={leadValues.phone}
                  onChange={(value) => setLeadValues((current) => ({ ...current, phone: value }))}
                />
                <InlineInput
                  error={leadErrors.email}
                  label="Email"
                  value={leadValues.email}
                  onChange={(value) => setLeadValues((current) => ({ ...current, email: value }))}
                />
                <InlineInput
                  error={leadErrors.city}
                  label="Oras"
                  value={leadValues.city}
                  onChange={(value) => setLeadValues((current) => ({ ...current, city: value }))}
                />
                <InlineSelect
                  label="Urgenta"
                  value={leadValues.urgency}
                  options={["Normala", "Ridicata", "Critica"]}
                  onChange={(value) => setLeadValues((current) => ({ ...current, urgency: value }))}
                />
                {conversationState.pathId === "service" ? (
                  <InlineInput
                    label="Echipament / model (optional)"
                    value={leadValues.equipmentModel}
                    onChange={(value) =>
                      setLeadValues((current) => ({ ...current, equipmentModel: value }))
                    }
                  />
                ) : (
                  <InlineInput
                    label="Tip proiect (optional)"
                    value={leadValues.projectType}
                    onChange={(value) =>
                      setLeadValues((current) => ({ ...current, projectType: value }))
                    }
                  />
                )}
              </div>

              <label className="mt-3 block text-sm font-semibold text-slate-700">
                Descriere scurta
                <textarea
                  className="mt-1 min-h-24 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
                  value={leadValues.shortDescription}
                  onChange={(event) =>
                    setLeadValues((current) => ({
                      ...current,
                      shortDescription: event.target.value,
                    }))
                  }
                  placeholder="Descrie pe scurt contextul, blocajele sau ce astepti de la echipa ZESCORP."
                />
              </label>

              {leadErrors.form && (
                <p className="mt-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-800">
                  {leadErrors.form}
                </p>
              )}

              {leadStatus === "success" && (
                <p className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-[#0057b8]">
                  Solicitarea a fost trimisa. Moduri: email {leadModes?.emailMode ?? "mock"}, sheets{" "}
                  {leadModes?.sheetsMode ?? "mock"}, storage {leadModes?.storageMode ?? "mock"}.
                </p>
              )}

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Button
                  size="md"
                  onClick={() => {
                    void submitLeadCapture();
                  }}
                  isLoading={leadStatus === "loading"}
                >
                  {conversationState.pathId === "service"
                    ? "Trimite cerere service"
                    : "Trimite cerere proiect"}
                </Button>
                <Button
                  href="/contact"
                  size="md"
                  variant="secondary"
                  onClick={() =>
                    trackCTA({
                      sourcePage: "/",
                      sourceTool: "zes-guide",
                      ctaLabel: "Solicita contact prioritar",
                      destination: "/contact",
                    })
                  }
                >
                  Solicita contact prioritar
                </Button>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => setCaptureVisible(false)}
                >
                  Continua conversatia cu ZES
                </Button>
              </div>
            </section>
          )}
        </div>

        <aside className="grid gap-3">
          <div className="rounded-lg border border-blue-100 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
              ZES runtime
            </p>
            <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
              <p>
                <span className="font-semibold text-slate-950">Mod activ:</span>{" "}
                {formatRuntimeLabel(runtimeMode, runtimeModel)}
              </p>
              <p>
                <span className="font-semibold text-slate-950">Rol ZES:</span>{" "}
                consultanta tehnica preliminara, triere service, pregatire context
                pentru ofertare si calificare comerciala.
              </p>
            </div>
          </div>

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

function TurnDetails({
  turn,
  aiMode,
  aiModel,
}: {
  turn: ZESAssistantTurn;
  aiMode?: ZESAIRuntimeMode;
  aiModel?: string | null;
}) {
  return (
    <div className="mt-3 grid gap-2 rounded-lg border border-blue-100 bg-[#f7fbff] p-3 text-xs text-slate-700">
      {aiMode && (
        <p className="font-semibold text-[#0057b8]">
          Runtime: {formatRuntimeLabel(aiMode, aiModel ?? null)}
        </p>
      )}
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

function InlineInput({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-700">
      {label}
      <input
        className={cn(
          "h-11 rounded-lg border bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white",
          error ? "border-rose-300" : "border-slate-200",
        )}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span className="text-xs font-semibold text-rose-700">{error}</span>}
    </label>
  );
}

function InlineSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-slate-700">
      {label}
      <select
        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white"
        value={value}
        onChange={(event) => onChange(event.target.value)}
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

function mapUrgencyToRisk(urgency: string) {
  if (urgency === "critica") return "Critic";
  if (urgency === "ridicata") return "Ridicat";
  if (urgency === "moderata") return "Mediu";
  return "Redus";
}

function buildGeneratedSummary(
  turn: ZESAssistantTurn,
  state: ZESConversationState,
  runtimeMode: ZESAIRuntimeMode,
  runtimeModel: string | null,
) {
  return [
    `ZES Guide summary.`,
    `AI mode: ${runtimeMode}${runtimeModel ? ` (${runtimeModel})` : ""}.`,
    `Need: ${turn.leadSnapshot.detectedNeed}.`,
    `Domain: ${turn.leadSnapshot.domain}.`,
    `Urgency: ${turn.leadSnapshot.urgency}.`,
    `Maturity: ${turn.leadSnapshot.maturity}.`,
    `Missing info: ${turn.leadSnapshot.missingInfo.join(" | ") || "none"}.`,
    `Recommended services: ${turn.suggestedServices.map((service) => service.label).join(", ")}.`,
    `Follow-up: ${turn.leadSnapshot.nextStep}.`,
    `Path: ${state.pathId}.`,
  ].join(" ");
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

async function requestZESReply({
  message,
  state,
  history,
}: {
  message: string;
  state: ZESConversationState | null;
  history: ZESGuideHistoryItem[];
}): Promise<ZESGuideApiResponse> {
  try {
    const response = await fetch("/api/zes-guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        state,
        history,
      }),
    });

    if (!response.ok) {
      throw new Error(`ZES route returned ${response.status}.`);
    }

    return (await response.json()) as ZESGuideApiResponse;
  } catch {
    const fallback = state
      ? continueZESConversation(state, message)
      : startZESConversation(message);

    return {
      ok: true,
      aiMode: "fallback",
      aiModel: null,
      reason: "Client-side deterministic fallback.",
      state: fallback.state,
      turn: fallback.turn,
    };
  }
}

function toHistoryItems(conversation: ConversationItem[]): ZESGuideHistoryItem[] {
  return conversation
    .slice(-8)
    .map((item) => ({
      role: item.role,
      text: item.text,
    }));
}

function formatRuntimeLabel(mode: ZESAIRuntimeMode, model: string | null) {
  if (mode === "real") {
    return model ? `server-side AI active (${model})` : "server-side AI active";
  }

  if (mode === "fallback") {
    return model
      ? `AI fallback to deterministic guidance (${model})`
      : "AI fallback to deterministic guidance";
  }

  return "deterministic fallback mode";
}
