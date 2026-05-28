"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
import { type ZESFileAnalysis } from "@/lib/zes-file-analysis";
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

type UploadItem = {
  id: string;
  fileName: string;
  status: "uploading" | "ready" | "failed";
  aiMode?: ZESAIRuntimeMode;
  analysis?: ZESFileAnalysis;
  error?: string;
};

type PreliminaryRequest = {
  title: string;
  summary: string;
  recommendedServices: string[];
  missingInfo: string[];
  nextAction: string;
  ctaLabel: string;
};

type ZESGuideProps = {
  compactHeader?: boolean;
  mode?: "full" | "popup";
  externalPromptToken?: string | null;
};

const introMessage =
  "Salut, sunt ZES. Spune ce vrei sa construiesti, modernizezi sau repari. Poti atasa poze, planuri sau fise tehnice, iar ZES pregateste urmatorul pas pentru service, proiect sau ofertare.";

export function ZESGuide({
  compactHeader = false,
  mode = "full",
  externalPromptToken,
}: ZESGuideProps) {
  const isPopup = mode === "popup";
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
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [preliminaryRequest, setPreliminaryRequest] = useState<PreliminaryRequest | null>(
    null,
  );
  const [leadModes, setLeadModes] = useState<{
    emailMode?: string;
    sheetsMode?: string;
    storageMode?: string;
    success?: boolean;
  } | null>(null);
  const [showPopupLeadForm, setShowPopupLeadForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryInputRef = useRef<HTMLInputElement | null>(null);
  const conversationViewportRef = useRef<HTMLDivElement | null>(null);
  const previousPromptTokenRef = useRef<string | null>(null);

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
    return (
      lastTurn.highIntentClose ||
      conversationState.phase === "lead-capture-ready" ||
      conversationState.phase === "completed-closed" ||
      conversationState.leadCompletionStatus === "ready" ||
      conversationState.leadCompletionStatus === "closed"
    );
  }, [lastTurn, conversationState]);

  const isReadyForHandoff =
    conversationState?.leadCompletionStatus === "ready" ||
    conversationState?.leadCompletionStatus === "closed";

  useEffect(() => {
    const viewport = conversationViewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [conversation, uploadItems, captureVisible, leadStatus, preliminaryRequest]);

  useEffect(() => {
    if (!isPopup || captureVisible) {
      return;
    }

    const focusTimer = window.setTimeout(() => {
      queryInputRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(focusTimer);
  }, [isPopup, captureVisible, conversation.length]);

  useEffect(() => {
    if (!externalPromptToken || externalPromptToken === previousPromptTokenRef.current) {
      return;
    }

    previousPromptTokenRef.current = externalPromptToken;
    const separatorIndex = externalPromptToken.indexOf(":");
    const prompt =
      separatorIndex >= 0
        ? externalPromptToken.slice(separatorIndex + 1).trim()
        : externalPromptToken.trim();

    if (!prompt) {
      return;
    }

    void handlePrompt(prompt);
  }, [externalPromptToken]);

  function handlePrompt(prompt: string) {
    setQuery(prompt);
    void handleSend(prompt);
  }

  async function handleSend(overrideValue?: string) {
    const text = (overrideValue ?? query).trim();
    if (!text || isResponding) return;
    const readyAnalyses = uploadItems
      .map((item) => item.analysis)
      .filter((item): item is ZESFileAnalysis => Boolean(item));
    const enrichedText =
      readyAnalyses.length > 0
        ? `${text}\n\nContext atasamente:\n${readyAnalyses
            .slice(-2)
            .map((analysis) => `- ${analysis.fileName}: ${analysis.fileSummary}`)
            .join("\n")}`
        : text;
    const explicitCloseIntent = /\b(da|trimite|oferta|oferte|contacteaza|sunati|prioritar|contactati-ma|vreau sa facem)\b/i.test(
      text,
    );

    setIsResponding(true);
    setCaptureVisible(false);
    if (isPopup) {
      setShowPopupLeadForm(false);
    }
    setLeadStatus("idle");
    setLeadModes(null);
    setQuery("");

    try {
      const response = await requestZESReply({
        history: toHistoryItems(conversation),
        message: enrichedText,
        state: conversationState,
        fileAnalyses: readyAnalyses,
      });

      setConversationState(response.state);
      setRuntimeMode(response.aiMode);
      setRuntimeModel(response.aiModel);
      setLeadValues((current) => ({
        ...current,
        city:
          current.city || response.state.collectedAnswers.city || "",
        phone:
          current.phone || response.state.collectedAnswers.phone || "",
        email:
          current.email || response.state.collectedAnswers.email || "",
        projectType:
          current.projectType ||
          response.state.collectedAnswers.project_type ||
          response.state.collectedAnswers.service_equipment_type ||
          "",
      }));
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

      if (
        response.turn.highIntentClose ||
        response.state.phase === "lead-capture-ready" ||
        response.state.phase === "completed-closed"
      ) {
        setCaptureVisible(true);
        if (isPopup) {
          setShowPopupLeadForm(true);
        }
      }
      if (
        response.turn.highIntentClose ||
        explicitCloseIntent ||
        response.state.phase === "lead-capture-ready" ||
        response.state.phase === "completed-closed"
      ) {
        setPreliminaryRequest(
          buildPreliminaryRequest({
            analyses: readyAnalyses,
            state: response.state,
            turn: response.turn,
          }),
        );
        if (explicitCloseIntent) {
          setCaptureVisible(true);
          if (isPopup) {
            setShowPopupLeadForm(true);
          }
        }
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

  async function handleFileSelection(files: FileList | null) {
    if (!files || files.length === 0) return;

    setUploadNotice(null);
    const selected = Array.from(files).slice(0, 3);

    for (const file of selected) {
      const uploadId = `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
      setUploadItems((current) => [
        ...current,
        {
          id: uploadId,
          fileName: file.name,
          status: "uploading",
        },
      ]);

      try {
        const result = await requestZESFileAnalysis(file, query);
        setConversationState((current) =>
          current
            ? {
                ...current,
                fileUploadStatus: "analyzed",
                collectedAnswers: {
                  ...current.collectedAnswers,
                  file_upload_status: "analyzed",
                  plan_availability:
                    current.collectedAnswers.plan_availability || "da",
                },
              }
            : current,
        );
        setUploadItems((current) =>
          current.map((item) =>
            item.id === uploadId
              ? {
                  ...item,
                  status: "ready",
                  aiMode: result.aiMode,
                  analysis: result.analysis,
                }
              : item,
          ),
        );
        setConversation((current) => [
          ...current,
          {
            role: "assistant",
            text: [
              `ZES a analizat fisierul ${result.analysis.fileName}.`,
              `Concluzie preliminara: ${result.analysis.fileSummary}`,
              `Urmator pas: ${result.analysis.nextBestAction}`,
            ].join("\n"),
          },
        ]);
        setUploadNotice("Analiza preliminara este disponibila in conversatie.");
      } catch (error) {
        setUploadItems((current) =>
          current.map((item) =>
            item.id === uploadId
              ? {
                  ...item,
                  status: "failed",
                  error:
                    error instanceof Error
                      ? error.message
                      : "Nu s-a putut analiza fisierul.",
                }
              : item,
          ),
        );
        setUploadNotice("Nu s-a putut analiza unul dintre fisiere.");
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function submitLeadCapture() {
    if (!lastTurn || !conversationState) return;
    const readyAnalyses = uploadItems
      .map((item) => item.analysis)
      .filter((item): item is ZESFileAnalysis => Boolean(item));
    const fileSummary = readyAnalyses
      .slice(0, 3)
      .map((analysis) => `${analysis.fileName}: ${analysis.fileSummary}`)
      .join(" | ");

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
      fileAnalysisIncluded: readyAnalyses.length > 0 ? "yes" : "no",
      fileAnalysisSummary: fileSummary || "none",
      preliminaryRequest: preliminaryRequest?.summary ?? "",
      conversationPhase: conversationState.phase,
      leadCompletionStatus: lastTurn.leadSnapshot.leadCompletionStatus,
      collectedFields: lastTurn.leadSnapshot.collectedFields.join(" | "),
      missingFields: lastTurn.leadSnapshot.missingFields.join(" | "),
      closingSummary: buildClosingSummary(lastTurn, conversationState),
      nextBestAction: lastTurn.leadSnapshot.nextStep,
    };

    const payload = createLeadPayload({
      sourceTool: "ZES Guide",
      sourcePage: "/",
      inquiryType: "ZES Guide conversation",
      values: rawValues,
      generatedSummary: buildGeneratedSummary(
        lastTurn,
        conversationState,
        runtimeMode,
        runtimeModel,
        readyAnalyses,
        preliminaryRequest,
      ),
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
      setConversationState((current) =>
        current
          ? {
              ...current,
              phase: "lead-captured",
              leadCompletionStatus: "captured",
            }
          : current,
      );
      setConversation((current) => [
        ...current,
        {
          role: "assistant",
          text: "Cererea a fost trimisa. Echipa ZESCORP revine cu urmatorii pasi. Daca vrei, pot genera un rezumat scurt pentru discutia tehnica.",
        },
      ]);
      if (isPopup) {
        setShowPopupLeadForm(false);
      }
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
      className={cn(
        "rounded-xl border border-blue-200 bg-white p-4 shadow-[0_18px_42px_rgba(0,87,184,0.09)] sm:p-6",
        isPopup && "rounded-none border-0 bg-transparent p-0 shadow-none sm:p-0",
      )}
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

      <div
        className={cn(
          "grid gap-4",
          compactHeader ? "mt-0" : "mt-5",
          isPopup ? "grid-cols-1" : "lg:grid-cols-[1fr_0.4fr]",
        )}
      >
        <div
          className={cn(
            "min-w-0 rounded-xl border border-slate-200 bg-[#f7fbff] p-3 sm:p-4",
            isPopup &&
              "rounded-xl border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7ff_100%)] p-2.5 sm:p-3",
          )}
        >
          <div
            ref={conversationViewportRef}
            className={cn(
              "grid gap-3 overflow-y-auto pr-1",
              isPopup ? "max-h-[38vh] scroll-smooth" : "max-h-[30rem]",
            )}
          >
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
                    compact={isPopup}
                    turn={item.turn}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mt-4 rounded-lg border border-slate-200 bg-white p-3",
              isPopup && "sticky bottom-0 z-10 border-blue-200 shadow-[0_-12px_28px_rgba(15,23,42,0.08)]",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                {isPopup ? "Mesaj catre ZES" : "Start rapid"}
              </p>
              <p className="text-xs leading-6 text-slate-500">
                Evita date medicale sensibile ale pacientilor.
              </p>
            </div>
            {!isPopup && (
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
            )}
            {isPopup && (
              <div className="mt-2 flex flex-wrap gap-2">
                {zesGuideStarters.slice(0, 3).map((starter) => (
                  <button
                    className="rounded-lg border border-blue-100 bg-[#f7fbff] px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
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
            )}
            <form
              className={cn(
                "mt-3 flex flex-col gap-2 sm:flex-row",
                isPopup && "gap-2.5 sm:flex-nowrap",
              )}
              onSubmit={(event) => {
                event.preventDefault();
                void handleSend();
              }}
            >
              <input
                ref={queryInputRef}
                className="h-12 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Vreau sa deschid o clinica CT | Am un aparat defect si am nevoie de service | Am nevoie de camera RMN"
                value={query}
              />
              <input
                ref={fileInputRef}
                className="hidden"
                multiple
                accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,.md,.doc,.docx,.xls,.xlsx"
                type="file"
                onChange={(event) => {
                  void handleFileSelection(event.target.files);
                }}
              />
              <Button
                className={cn(isPopup && "sm:px-4")}
                size="lg"
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                {isPopup ? "Ataseaza" : "Ataseaza fisier"}
              </Button>
              <Button className={cn(isPopup && "sm:px-4")} isLoading={isResponding} size="lg" type="submit">
                Trimite
              </Button>
            </form>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Formate: JPG, PNG, WEBP, PDF, TXT, DOC/DOCX, XLS/XLSX. Limita 8 MB / fisier.
            </p>
            {!isPopup && (
              <p className="mt-1 text-xs leading-6 text-slate-500">
                Nu incarca date medicale ale pacientilor. Pentru proiecte reale, echipa ZESCORP valideaza manual documentele.
              </p>
            )}
            {uploadNotice && (
              <p className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-[#0057b8]">
                {uploadNotice}
              </p>
            )}
            {uploadItems.length > 0 && (
              <div className="mt-3 grid gap-2">
                {uploadItems.slice(isPopup ? -2 : -4).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-6 text-slate-700"
                  >
                    <p className="font-semibold text-slate-900">{item.fileName}</p>
                    <p>
                      {item.status === "uploading"
                        ? "ZES analizeaza documentul"
                        : item.status === "ready"
                          ? `Analiza preliminara (${formatRuntimeLabel(item.aiMode ?? "mock", null)})`
                          : "Nu s-a putut analiza; verificare manuala recomandata"}
                    </p>
                    {item.analysis &&
                      (isPopup ? (
                        <details className="mt-1">
                          <summary className="cursor-pointer font-semibold text-[#0057b8]">
                            Vezi recomandare
                          </summary>
                          <p className="mt-1 text-slate-600">{item.analysis.nextBestAction}</p>
                        </details>
                      ) : (
                        <p className="text-slate-600">{item.analysis.nextBestAction}</p>
                      ))}
                    {item.error && <p className="text-rose-700">{item.error}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {preliminaryRequest && (
            <section
              className={cn(
                "mt-4 rounded-lg border border-blue-200 bg-white p-4",
                isPopup && "p-3",
              )}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Cerere preliminara ZES
              </p>
              <h4 className="mt-2 text-base font-semibold text-slate-950">
                {preliminaryRequest.title}
              </h4>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {preliminaryRequest.summary}
              </p>
              {!isPopup && (
                <>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    <span className="font-semibold text-slate-900">Servicii sugerate:</span>{" "}
                    {preliminaryRequest.recommendedServices.join(", ")}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-700">
                    <span className="font-semibold text-slate-900">Informatii lipsa:</span>{" "}
                    {preliminaryRequest.missingInfo.slice(0, 3).join(" | ")}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-700">
                    <span className="font-semibold text-slate-900">Urmator pas:</span>{" "}
                    {preliminaryRequest.nextAction}
                  </p>
                </>
              )}
              {isPopup && (
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">Urmator pas:</span>{" "}
                  {preliminaryRequest.nextAction}
                </p>
              )}
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Button
                  size="sm"
                  onClick={() => {
                    setCaptureVisible(true);
                    if (isPopup) {
                      setShowPopupLeadForm(true);
                    }
                  }}
                >
                  {preliminaryRequest.ctaLabel}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setPreliminaryRequest(null)}
                >
                  Continua cu ZES
                </Button>
              </div>
            </section>
          )}

          {isReadyForHandoff && lastTurn && conversationState && (
            <section
              className={cn(
                "mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4",
                isPopup && "p-3",
              )}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                Gata pentru preluare
              </p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-900">
                Cererea este suficient calificata pentru trimitere preliminara catre echipa ZESCORP.
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-700">
                Ce am inteles: {buildClosingSummary(lastTurn, conversationState)}
              </p>
            </section>
          )}

          {isPopup && (captureVisible || shouldOfferCapture) && !showPopupLeadForm && (
            <section className="mt-4 rounded-lg border border-blue-200 bg-white p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                Cerere pregatita
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Avem suficiente date pentru trimitere preliminara catre echipa ZESCORP.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Button size="sm" onClick={() => setShowPopupLeadForm(true)}>
                  Trimite datele catre ZESCORP
                </Button>
                <Button size="sm" variant="secondary" onClick={() => queryInputRef.current?.focus()}>
                  Mai adauga detalii
                </Button>
              </div>
            </section>
          )}

          {(captureVisible || shouldOfferCapture) &&
            (!isPopup || showPopupLeadForm) &&
            lastTurn &&
            conversationState && (
            <section className="mt-4 rounded-lg border border-blue-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Cerere catre ZESCORP
              </p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-900">
                Cererea este pregatita pentru preluare preliminara. ZES poate trimite acum contextul catre echipa ZESCORP.
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                Completeaza datele minime de contact. Pentru service urgent, telefonul si orasul sunt esentiale.
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
                  size="md"
                  variant="secondary"
                  onClick={() => {
                    setCaptureVisible(false);
                    if (isPopup) {
                      setShowPopupLeadForm(false);
                    }
                  }}
                >
                  Mai adauga detalii
                </Button>
              </div>
            </section>
          )}
        </div>

        {!isPopup && (
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
                  <span className="font-semibold text-slate-900">Status lead:</span>{" "}
                  {lastTurn.leadSnapshot.leadCompletionStatus}
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
              Analiza fisiere
            </p>
            {uploadItems.some((item) => item.analysis) ? (
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
                {uploadItems
                  .filter((item) => item.analysis)
                  .slice(-3)
                  .map((item) => (
                    <li key={item.id}>
                      <span className="font-semibold text-slate-900">{item.fileName}:</span>{" "}
                      {item.analysis?.confidence} / {item.analysis?.targetFlow}
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ataseaza imagini, PDF-uri sau date tehnice pentru analiza preliminara in acelasi flux.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Actiuni recomandate
            </p>
            <div className="mt-2 grid gap-2">
              {(lastTurn?.ctas ?? defaultCtas)
                .slice(
                  0,
                  lastTurn?.leadSnapshot.leadCompletionStatus === "closed" ? 2 : 4,
                )
                .map((cta) => (
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
        )}
      </div>
    </section>
  );
}

function composeAssistantText(turn: ZESAssistantTurn) {
  const parts = [turn.message];
  if (turn.followUpQuestion) {
    parts.push(turn.followUpQuestion);
  }
  return parts.join("\n");
}

function TurnDetails({
  turn,
  aiMode,
  aiModel,
  compact = false,
}: {
  turn: ZESAssistantTurn;
  aiMode?: ZESAIRuntimeMode;
  aiModel?: string | null;
  compact?: boolean;
}) {
  const showDocumentHint = Boolean(turn.documentHint?.trim());
  const missingInfo = uniqueText(turn.leadSnapshot.missingInfo).slice(0, 2);

  if (compact) {
    return (
      <details className="mt-2 rounded-lg border border-blue-100 bg-[#f7fbff] p-2 text-xs text-slate-700">
        <summary className="cursor-pointer font-semibold text-[#0057b8]">
          Detalii recomandare ZES
        </summary>
        <div className="mt-2 grid gap-2">
          <p className="font-semibold text-slate-900">{turn.internalCapabilityNote}</p>
          <p>
            Servicii:{" "}
            {turn.suggestedServices.slice(0, 3).map((service) => service.label).join(", ")}
          </p>
          <p>
            Informatii lipsa:{" "}
            {missingInfo.length
              ? missingInfo.join(" | ")
              : "set minim completat pentru pasul urmator"}
          </p>
          {aiMode && (
            <p className="text-[11px] text-slate-600">
              Runtime: {formatRuntimeLabel(aiMode, aiModel ?? null)}
            </p>
          )}
          {showDocumentHint && <p className="text-[11px] leading-6 text-slate-600">{turn.documentHint}</p>}
        </div>
      </details>
    );
  }

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
        {missingInfo.length
          ? missingInfo.join(" | ")
          : "set minim completat pentru pasul urmator"}
      </p>
      {showDocumentHint && (
        <p className="text-[11px] leading-6 text-slate-600">{turn.documentHint}</p>
      )}
      {turn.highIntentClose && (
        <p className="rounded-lg border border-blue-200 bg-blue-50 p-2 font-semibold text-[#0057b8]">
          Cerere pregatita pentru preluare. Trimite datele catre echipa ZESCORP.
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
  fileAnalyses: ZESFileAnalysis[],
  preliminaryRequest: PreliminaryRequest | null,
) {
  return [
    `ZES Guide summary.`,
    `AI mode: ${runtimeMode}${runtimeModel ? ` (${runtimeModel})` : ""}.`,
    `Need: ${turn.leadSnapshot.detectedNeed}.`,
    `Domain: ${turn.leadSnapshot.domain}.`,
    `Urgency: ${turn.leadSnapshot.urgency}.`,
    `Maturity: ${turn.leadSnapshot.maturity}.`,
    `Conversation phase: ${state.phase}.`,
    `Lead completion: ${turn.leadSnapshot.leadCompletionStatus}.`,
    `Collected fields: ${turn.leadSnapshot.collectedFields.join(" | ") || "none"}.`,
    `Missing fields: ${turn.leadSnapshot.missingFields.join(" | ") || "none"}.`,
    `Missing info: ${turn.leadSnapshot.missingInfo.join(" | ") || "none"}.`,
    `Recommended services: ${turn.suggestedServices.map((service) => service.label).join(", ")}.`,
    `Follow-up: ${turn.leadSnapshot.nextStep}.`,
    `File analysis: ${
      fileAnalyses.length
        ? fileAnalyses
            .slice(0, 2)
            .map((analysis) => `${analysis.fileName} (${analysis.confidence})`)
            .join(", ")
        : "none"
    }.`,
    `Preliminary request: ${preliminaryRequest?.summary ?? "not generated"}.`,
    `Path: ${state.pathId}.`,
  ].join(" ");
}

function buildClosingSummary(turn: ZESAssistantTurn, state: ZESConversationState) {
  const values: string[] = [];
  const collected = state.collectedAnswers;
  const projectType =
    collected.project_type || collected.service_equipment_type || turn.leadSnapshot.detectedNeed;
  if (projectType) values.push(projectType);
  if (collected.space_type) values.push(collected.space_type);
  if (collected.city) values.push(collected.city);
  if (collected.budget) values.push(`buget ${collected.budget}`);
  if (collected.timeline) values.push(`termen ${collected.timeline}`);
  if (collected.cncan_status) values.push(`CNCAN ${collected.cncan_status}`);
  if (collected.plan_availability || collected.file_availability) {
    values.push(`plan disponibil: ${collected.plan_availability || collected.file_availability}`);
  }
  if (collected.phone) values.push(`contact ${collected.phone}`);
  if (!values.length) return turn.leadSnapshot.detectedNeed;
  return values.join(" | ");
}

function uniqueText(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
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
  fileAnalyses,
}: {
  message: string;
  state: ZESConversationState | null;
  history: ZESGuideHistoryItem[];
  fileAnalyses: ZESFileAnalysis[];
}): Promise<ZESGuideApiResponse> {
  try {
    const response = await fetch("/api/zes-guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        state,
        history,
        fileAnalyses: fileAnalyses.slice(0, 3),
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

async function requestZESFileAnalysis(file: File, message: string) {
  const formData = new FormData();
  formData.set("file", file);
  formData.set("message", message);

  const response = await fetch("/api/zes-guide/file-analysis", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Nu s-a putut analiza fisierul.");
  }

  return (await response.json()) as {
    ok: true;
    aiMode: ZESAIRuntimeMode;
    aiModel: string | null;
    analysis: ZESFileAnalysis;
  };
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

function buildPreliminaryRequest({
  turn,
  state,
  analyses,
}: {
  turn: ZESAssistantTurn;
  state: ZESConversationState;
  analyses: ZESFileAnalysis[];
}): PreliminaryRequest {
  const serviceLike = state.pathId === "service";
  const hasFiles = analyses.length > 0;
  const summary = buildClosingSummary(turn, state);
  const fileLine = hasFiles
    ? `Fisiere analizate: ${analyses.map((analysis) => analysis.fileName).slice(0, 2).join(", ")}.`
    : "Fisiere: inca neatasate, pot fi trimise ulterior.";

  if (serviceLike) {
    return {
      title: "Cerere structurata pentru service",
      summary: `ZES a pregatit un rezumat preliminar pentru triere service: ${summary}. ${fileLine}`,
      recommendedServices: turn.suggestedServices.map((item) => item.label).slice(0, 4),
      missingInfo: turn.leadSnapshot.missingInfo,
      nextAction: hasFiles
        ? "Trimite cererea catre service ZESCORP impreuna cu datele de contact si fisierele analizate."
        : "Trimite cererea catre service ZESCORP cu oras, telefon, model si descriere eroare. Documentele pot fi adaugate ulterior.",
      ctaLabel: "Trimite cazul catre service",
    };
  }

  return {
    title: "Cerere structurata pentru ofertare/proiect",
    summary: `ZES a pregatit un brief tehnic-comercial preliminar: ${summary}. ${fileLine}`,
    recommendedServices: turn.suggestedServices.map((item) => item.label).slice(0, 4),
    missingInfo: turn.leadSnapshot.missingInfo,
    nextAction: hasFiles
      ? "Trimite cererea pentru oferta preliminara cu date de contact si documentele analizate."
      : "Trimite cererea pentru oferta preliminara. Planul/fisierele se pot atasa ulterior.",
    ctaLabel: "Solicita oferta preliminara",
  };
}
