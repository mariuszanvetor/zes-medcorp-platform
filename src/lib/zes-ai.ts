import {
  continueZESConversation,
  startZESConversation,
  type ZESAssistantTurn,
  type ZESConversationState,
  type ZESGuideIntentId,
} from "@/lib/zes-guide-engine";

export type ZESAIRuntimeMode = "real" | "fallback" | "mock";

export type ZESGuideHistoryItem = {
  role: "assistant" | "user";
  text: string;
};

export type ZESGuideApiRequest = {
  message: string;
  state?: ZESConversationState | null;
  history?: ZESGuideHistoryItem[];
  fileAnalyses?: Array<{
    fileName: string;
    fileSummary: string;
    targetFlow: string;
    confidence: string;
    nextBestAction: string;
  }>;
};

export type ZESGuideApiResponse = {
  ok: true;
  aiMode: ZESAIRuntimeMode;
  aiModel: string | null;
  reason?: string;
  state: ZESConversationState;
  turn: ZESAssistantTurn;
};

export type ZESAIConfig = {
  requested: boolean;
  enabled: boolean;
  apiKeyConfigured: boolean;
  model: string;
};

type ZESStructuredReply = {
  reply: string;
  intent: ZESGuideIntentId;
  urgency: "scazuta" | "moderata" | "ridicata" | "critica";
  projectType: string;
  domain: string;
  missingInfo: string[];
  recommendedServices: string[];
  nextBestAction: string;
  leadReadiness: number;
  ctaLabel: string;
  ctaTarget: string;
  safetyNotes: string[];
  followUpQuestion: string;
  capabilityChips: string[];
};

const DEFAULT_ZES_AI_MODEL = "gpt-5.4";
const DEFAULT_REQUEST_TIMEOUT_MS = 12000;

const allowedIntents: ZESGuideIntentId[] = [
  "ct-project",
  "mri-project",
  "radiology-modernization",
  "service-maintenance",
  "lab-ivd",
  "shielding-radioprotection",
  "cncan",
  "funding",
  "equipment-offer",
  "project-planning",
  "general",
];

const systemPrompt = [
  "You are ZES Copilot, the main conversational sales and technical guide for ZES MEDCORP.",
  "You support Romanian-speaking users with medical infrastructure planning, imaging, service triage, equipment planning, laboratory/IVD projects, modernization, funding readiness and project qualification.",
  "Behave like a calm, consultative medical infrastructure sales engineer.",
  "Stay technical, enterprise-grade and commercially aware.",
  "Keep replies concise: 2-4 short sentences plus at most one next question.",
  "Avoid repeating the same disclaimer in every turn.",
  "Ask one clear next question at a time when possible.",
  "If user intent is high, move quickly toward contact capture and next action.",
  "Never provide medical diagnosis, clinical advice, legal approval or final CNCAN authorization decisions.",
  "Frame compliance, CNCAN, HVAC, electrical and shielding guidance as preliminary and subject to specialist validation.",
  "Do not mention hidden tools or internal implementation details.",
  "Use concise Romanian.",
  "Return only JSON that matches the provided schema.",
].join(" ");

export function getZESAIConfig(): ZESAIConfig {
  const requested = process.env.ZES_AI_ENABLED === "true";
  const apiKeyConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  const model = process.env.ZES_AI_MODEL?.trim() || DEFAULT_ZES_AI_MODEL;

  return {
    requested,
    enabled: requested && apiKeyConfigured,
    apiKeyConfigured,
    model,
  };
}

export async function generateZESGuideResponse(
  input: ZESGuideApiRequest,
): Promise<ZESGuideApiResponse> {
  const fallback = createFallbackTurn(input);
  const config = getZESAIConfig();

  if (!config.requested) {
    return {
      ok: true,
      aiMode: "mock",
      aiModel: null,
      reason: "ZES_AI_ENABLED is not true.",
      ...fallback,
    };
  }

  if (!config.apiKeyConfigured) {
    return {
      ok: true,
      aiMode: "mock",
      aiModel: config.model,
      reason: "OPENAI_API_KEY is missing.",
      ...fallback,
    };
  }

  try {
    const structured = await requestStructuredReply(input, fallback, config);

    return {
      ok: true,
      aiMode: "real",
      aiModel: config.model,
      state: fallback.state,
      turn: mergeStructuredReply(fallback.turn, structured),
    };
  } catch (error) {
    return {
      ok: true,
      aiMode: "fallback",
      aiModel: config.model,
      reason:
        error instanceof Error
          ? error.message
          : "OpenAI structured response failed.",
      ...fallback,
    };
  }
}

function createFallbackTurn(input: ZESGuideApiRequest) {
  if (input.state) {
    return continueZESConversation(input.state, input.message);
  }

  return startZESConversation(input.message);
}

async function requestStructuredReply(
  input: ZESGuideApiRequest,
  fallback: {
    state: ZESConversationState;
    turn: ZESAssistantTurn;
  },
  config: ZESAIConfig,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs());
  const promptPayload = {
    userMessage: input.message,
    conversationHistory: (input.history ?? []).slice(-8),
    fileAnalyses: (input.fileAnalyses ?? []).slice(-3),
    detectedIntent: fallback.state.intent,
    pathId: fallback.state.pathId,
    collectedAnswers: fallback.state.collectedAnswers,
    initialMessage: fallback.state.initialMessage,
    nextDeterministicQuestion: fallback.turn.followUpQuestion ?? "",
    leadSnapshot: fallback.turn.leadSnapshot,
    suggestedServices: fallback.turn.suggestedServices.map((item) => item.label),
    capabilityChips: fallback.turn.capabilityChips,
    ctas: fallback.turn.ctas.map((item) => ({
      label: item.label,
      href: item.href,
      kind: item.kind,
      availability: item.availability,
    })),
    documentHint: fallback.turn.documentHint,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        instructions: systemPrompt,
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify(promptPayload),
              },
            ],
          },
        ],
        max_output_tokens: 900,
        text: {
          format: {
            type: "json_schema",
            name: "zes_guide_response",
            strict: true,
            schema: structuredResponseSchema(),
          },
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errorText.slice(0, 240)}`);
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const rawText = extractResponseText(payload);

    if (!rawText) {
      throw new Error("OpenAI response did not include structured text.");
    }

    const parsed = JSON.parse(rawText) as Partial<ZESStructuredReply>;
    return sanitizeStructuredReply(parsed, fallback.turn);
  } finally {
    clearTimeout(timeout);
  }
}

function extractResponseText(payload: Record<string, unknown>) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  const output = Array.isArray(payload.output) ? payload.output : [];
  const fragments: string[] = [];

  for (const item of output) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const content = Array.isArray((item as { content?: unknown[] }).content)
      ? (item as { content: Array<Record<string, unknown>> }).content
      : [];

    for (const contentItem of content) {
      if (typeof contentItem?.text === "string" && contentItem.text.trim()) {
        fragments.push(contentItem.text);
      }
    }
  }

  return fragments.join("\n").trim();
}

function sanitizeStructuredReply(
  parsed: Partial<ZESStructuredReply>,
  fallbackTurn: ZESAssistantTurn,
): ZESStructuredReply {
  return {
    reply: shortenReply(limitString(parsed.reply, 900) || fallbackTurn.message),
    intent: allowedIntents.includes(parsed.intent as ZESGuideIntentId)
      ? (parsed.intent as ZESGuideIntentId)
      : "general",
    urgency: isUrgency(parsed.urgency) ? parsed.urgency : fallbackTurn.leadSnapshot.urgency,
    projectType:
      limitString(parsed.projectType, 140) || fallbackTurn.leadSnapshot.detectedNeed,
    domain: limitString(parsed.domain, 140) || fallbackTurn.leadSnapshot.domain,
    missingInfo: sanitizeStringArray(parsed.missingInfo, 8, fallbackTurn.leadSnapshot.missingInfo),
    recommendedServices: sanitizeStringArray(
      parsed.recommendedServices,
      6,
      fallbackTurn.suggestedServices.map((item) => item.label),
    ),
    nextBestAction:
      shortenReply(limitString(parsed.nextBestAction, 220) || fallbackTurn.leadSnapshot.nextStep),
    leadReadiness: clampNumber(parsed.leadReadiness, 0, 100, maturityToReadiness(fallbackTurn)),
    ctaLabel: limitString(parsed.ctaLabel, 80),
    ctaTarget: limitString(parsed.ctaTarget, 160),
    safetyNotes: sanitizeStringArray(parsed.safetyNotes, 4, []),
    followUpQuestion: limitString(parsed.followUpQuestion, 220),
    capabilityChips: sanitizeStringArray(
      parsed.capabilityChips,
      10,
      fallbackTurn.capabilityChips,
    ),
  };
}

function mergeStructuredReply(
  fallbackTurn: ZESAssistantTurn,
  structured: ZESStructuredReply,
): ZESAssistantTurn {
  const matchedServices = mapServices(fallbackTurn, structured.recommendedServices);
  const ctas = reorderCtas(fallbackTurn, structured);
  const readiness = structured.leadReadiness;
  const followUpQuestion =
    structured.followUpQuestion.trim() || fallbackTurn.followUpQuestion || null;
  const highIntent =
    readiness >= 68 ||
    structured.urgency === "ridicata" ||
    structured.urgency === "critica";
  const safetyTail = structured.safetyNotes.length
    ? ` ${structured.safetyNotes.join(" ")}`
    : "";

  return {
    ...fallbackTurn,
    message: structured.reply,
    followUpQuestion,
    leadSnapshot: {
      detectedNeed: structured.projectType,
      domain: structured.domain,
      urgency: structured.urgency,
      maturity: readinessToMaturity(readiness),
      suggestedServices: matchedServices.map((item) => item.label),
      missingInfo: structured.missingInfo,
      nextStep: structured.nextBestAction,
    },
    suggestedServices: matchedServices,
    ctas,
    capabilityChips:
      structured.capabilityChips.length > 0
        ? structured.capabilityChips
        : fallbackTurn.capabilityChips,
    internalCapabilityNote: structured.nextBestAction,
    documentHint: `${fallbackTurn.documentHint}${safetyTail}`.trim(),
    highIntentClose:
      highIntent && (!followUpQuestion || followUpQuestion === fallbackTurn.followUpQuestion),
  };
}

function reorderCtas(
  fallbackTurn: ZESAssistantTurn,
  structured: ZESStructuredReply,
) {
  const ctas = [...fallbackTurn.ctas];
  const target = structured.ctaTarget.trim().toLowerCase();
  const label = structured.ctaLabel.trim().toLowerCase();
  const matchIndex = ctas.findIndex(
    (item) =>
      item.href.toLowerCase() === target ||
      item.href.toLowerCase().startsWith(target) ||
      item.label.toLowerCase() === label,
  );

  if (matchIndex <= 0) {
    return ctas;
  }

  const [matched] = ctas.splice(matchIndex, 1);
  return [matched, ...ctas];
}

function mapServices(
  fallbackTurn: ZESAssistantTurn,
  serviceLabels: string[],
) {
  if (!serviceLabels.length) {
    return fallbackTurn.suggestedServices;
  }

  const serviceMap = new Map(
    fallbackTurn.suggestedServices.map((service) => [normalize(service.label), service]),
  );
  const fallbackHref = fallbackTurn.suggestedServices[0]?.href ?? "/contact";

  return serviceLabels.slice(0, 6).map((label) => {
    const matched = serviceMap.get(normalize(label));
    return matched ?? { label, href: fallbackHref };
  });
}

function structuredResponseSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: [
      "reply",
      "intent",
      "urgency",
      "projectType",
      "domain",
      "missingInfo",
      "recommendedServices",
      "nextBestAction",
      "leadReadiness",
      "ctaLabel",
      "ctaTarget",
      "safetyNotes",
      "followUpQuestion",
      "capabilityChips",
    ],
    properties: {
      reply: { type: "string" },
      intent: { type: "string", enum: allowedIntents },
      urgency: {
        type: "string",
        enum: ["scazuta", "moderata", "ridicata", "critica"],
      },
      projectType: { type: "string" },
      domain: { type: "string" },
      missingInfo: {
        type: "array",
        items: { type: "string" },
        maxItems: 8,
      },
      recommendedServices: {
        type: "array",
        items: { type: "string" },
        maxItems: 6,
      },
      nextBestAction: { type: "string" },
      leadReadiness: {
        type: "integer",
        minimum: 0,
        maximum: 100,
      },
      ctaLabel: { type: "string" },
      ctaTarget: { type: "string" },
      safetyNotes: {
        type: "array",
        items: { type: "string" },
        maxItems: 4,
      },
      followUpQuestion: { type: "string" },
      capabilityChips: {
        type: "array",
        items: { type: "string" },
        maxItems: 10,
      },
    },
  };
}

function requestTimeoutMs() {
  const raw = Number(process.env.ZES_AI_REQUEST_TIMEOUT_MS);
  return Number.isFinite(raw) && raw >= 3000 ? raw : DEFAULT_REQUEST_TIMEOUT_MS;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function sanitizeStringArray(
  value: unknown,
  limit: number,
  fallback: string[],
) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const clean = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, limit);

  return clean.length ? clean : fallback;
}

function limitString(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function shortenReply(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return text;
  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return sentences.slice(0, 4).join(" ");
}

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.round(value)));
}

function isUrgency(value: unknown): value is ZESStructuredReply["urgency"] {
  return (
    value === "scazuta" ||
    value === "moderata" ||
    value === "ridicata" ||
    value === "critica"
  );
}

function readinessToMaturity(readiness: number): ZESAssistantTurn["leadSnapshot"]["maturity"] {
  if (readiness >= 85) return "pregatit-pentru-oferta";
  if (readiness >= 60) return "pregatit-pentru-analiza";
  if (readiness >= 35) return "partial-definit";
  return "inceput";
}

function maturityToReadiness(turn: ZESAssistantTurn) {
  const maturity = turn.leadSnapshot.maturity;

  if (maturity === "pregatit-pentru-oferta") return 90;
  if (maturity === "pregatit-pentru-analiza") return 70;
  if (maturity === "partial-definit") return 45;
  return 20;
}
