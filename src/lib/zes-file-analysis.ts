import { getZESAIConfig, type ZESAIRuntimeMode } from "@/lib/zes-ai";

export type ZESFileAnalysis = {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  status: "analyzed" | "manual-review";
  fileSummary: string;
  detectedItems: string[];
  extractedSpecs: string[];
  risks: string[];
  missingInfo: string[];
  recommendedServices: string[];
  nextBestAction: string;
  confidence: "scazuta" | "medie" | "ridicata";
  limitations: string[];
  targetFlow: "service" | "project" | "mixed";
};

export type ZESFileAnalysisResult = {
  ok: true;
  aiMode: ZESAIRuntimeMode;
  aiModel: string | null;
  analysis: ZESFileAnalysis;
};

export type ZESFileValidation = {
  ok: boolean;
  code?: "missing" | "unsupported" | "too-large";
  message?: string;
};

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const MAX_TEXT_CHARS = 10000;
const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);
const TEXT_MIME_TYPES = new Set([
  "text/plain",
  "text/markdown",
  "application/json",
]);
const PDF_MIME_TYPES = new Set(["application/pdf"]);
const MANUAL_REVIEW_MIME_TYPES = new Set([
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);
const SUPPORTED_MIME_TYPES = new Set([
  ...IMAGE_MIME_TYPES,
  ...TEXT_MIME_TYPES,
  ...PDF_MIME_TYPES,
  ...MANUAL_REVIEW_MIME_TYPES,
]);

type StructuredFileAnalysis = {
  fileSummary: string;
  detectedItems: string[];
  extractedSpecs: string[];
  risks: string[];
  missingInfo: string[];
  recommendedServices: string[];
  nextBestAction: string;
  confidence: "scazuta" | "medie" | "ridicata";
  limitations: string[];
  targetFlow: "service" | "project" | "mixed";
};

export function validateZESFile(file: File): ZESFileValidation {
  if (!file) {
    return {
      ok: false,
      code: "missing",
      message: "Nu a fost selectat niciun fisier.",
    };
  }

  if (!SUPPORTED_MIME_TYPES.has(file.type)) {
    return {
      ok: false,
      code: "unsupported",
      message:
        "Tip de fisier neacceptat. Incarca JPG, PNG, WEBP, PDF, TXT, DOC/DOCX sau XLS/XLSX.",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      ok: false,
      code: "too-large",
      message: "Fisierul este prea mare. Limita curenta este 8 MB.",
    };
  }

  return { ok: true };
}

export async function analyzeZESFile({
  file,
  userMessage,
}: {
  file: File;
  userMessage?: string;
}): Promise<ZESFileAnalysisResult> {
  const validation = validateZESFile(file);

  if (!validation.ok) {
    if (validation.code === "unsupported" || validation.code === "too-large") {
      throw new Error(validation.message ?? "Fisier invalid.");
    }

    return {
      ok: true,
      aiMode: "mock",
      aiModel: null,
      analysis: manualReviewAnalysis(file, validation.message ?? "Fisier invalid."),
    };
  }

  const config = getZESAIConfig();

  if (!config.requested || !config.apiKeyConfigured) {
    return {
      ok: true,
      aiMode: "mock",
      aiModel: config.apiKeyConfigured ? config.model : null,
      analysis: fallbackFileAnalysis(file, userMessage),
    };
  }

  if (MANUAL_REVIEW_MIME_TYPES.has(file.type)) {
    return {
      ok: true,
      aiMode: "fallback",
      aiModel: config.model,
      analysis: manualReviewAnalysis(
        file,
        "Formatul necesita verificare manuala de catre echipa ZESCORP.",
      ),
    };
  }

  try {
    const aiAnalysis = await analyzeWithOpenAI(file, userMessage, config.model);
    return {
      ok: true,
      aiMode: "real",
      aiModel: config.model,
      analysis: {
        fileName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        status: "analyzed",
        ...aiAnalysis,
      },
    };
  } catch {
    return {
      ok: true,
      aiMode: "fallback",
      aiModel: config.model,
      analysis: fallbackFileAnalysis(file, userMessage),
    };
  }
}

async function analyzeWithOpenAI(
  file: File,
  userMessage: string | undefined,
  model: string,
): Promise<StructuredFileAnalysis> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const content: Array<Record<string, unknown>> = [
    {
      type: "input_text",
      text: buildFileAnalysisPrompt(file, userMessage),
    },
  ];

  if (IMAGE_MIME_TYPES.has(file.type)) {
    content.push({
      type: "input_image",
      image_url: `data:${file.type};base64,${base64}`,
      detail: "high",
    });
  } else if (TEXT_MIME_TYPES.has(file.type)) {
    const textContent = Buffer.from(arrayBuffer)
      .toString("utf8")
      .slice(0, MAX_TEXT_CHARS);
    content.push({
      type: "input_text",
      text: `Continut fisier (trunchiat):\n${textContent}`,
    });
  } else if (PDF_MIME_TYPES.has(file.type)) {
    content.push({
      type: "input_file",
      filename: file.name,
      file_data: base64,
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions: [
        "You are ZES Copilot file analyst for medical infrastructure and service triage.",
        "Respond in Romanian only.",
        "Do not provide medical diagnosis.",
        "Do not claim legal/CNCAN approval certainty.",
        "If visibility is limited, clearly list limitations.",
        "Return only JSON matching the schema.",
      ].join(" "),
      input: [
        {
          role: "user",
          content,
        },
      ],
      max_output_tokens: 700,
      text: {
        format: {
          type: "json_schema",
          name: "zes_file_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: [
              "fileSummary",
              "detectedItems",
              "extractedSpecs",
              "risks",
              "missingInfo",
              "recommendedServices",
              "nextBestAction",
              "confidence",
              "limitations",
              "targetFlow",
            ],
            properties: {
              fileSummary: { type: "string" },
              detectedItems: { type: "array", items: { type: "string" }, maxItems: 8 },
              extractedSpecs: { type: "array", items: { type: "string" }, maxItems: 8 },
              risks: { type: "array", items: { type: "string" }, maxItems: 6 },
              missingInfo: { type: "array", items: { type: "string" }, maxItems: 8 },
              recommendedServices: {
                type: "array",
                items: { type: "string" },
                maxItems: 6,
              },
              nextBestAction: { type: "string" },
              confidence: { type: "string", enum: ["scazuta", "medie", "ridicata"] },
              limitations: { type: "array", items: { type: "string" }, maxItems: 5 },
              targetFlow: {
                type: "string",
                enum: ["service", "project", "mixed"],
              },
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI file analysis failed (${response.status}).`);
  }

  const payload = (await response.json()) as Record<string, unknown>;
  const parsed = extractStructuredPayload(payload);
  return sanitizeStructuredAnalysis(parsed, file);
}

function extractStructuredPayload(payload: Record<string, unknown>) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return JSON.parse(payload.output_text) as Partial<StructuredFileAnalysis>;
  }

  const output = Array.isArray(payload.output) ? payload.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = Array.isArray((item as { content?: unknown[] }).content)
      ? (item as { content: Array<Record<string, unknown>> }).content
      : [];
    for (const contentItem of content) {
      if (typeof contentItem.text === "string" && contentItem.text.trim()) {
        return JSON.parse(contentItem.text) as Partial<StructuredFileAnalysis>;
      }
    }
  }

  throw new Error("Missing structured output.");
}

function sanitizeStructuredAnalysis(
  parsed: Partial<StructuredFileAnalysis>,
  file: File,
): StructuredFileAnalysis {
  const fallback = fallbackFileAnalysis(file);
  return {
    fileSummary: stringOrFallback(parsed.fileSummary, fallback.fileSummary, 280),
    detectedItems: stringArrayOrFallback(parsed.detectedItems, fallback.detectedItems, 8),
    extractedSpecs: stringArrayOrFallback(parsed.extractedSpecs, fallback.extractedSpecs, 8),
    risks: stringArrayOrFallback(parsed.risks, fallback.risks, 6),
    missingInfo: stringArrayOrFallback(parsed.missingInfo, fallback.missingInfo, 8),
    recommendedServices: stringArrayOrFallback(
      parsed.recommendedServices,
      fallback.recommendedServices,
      6,
    ),
    nextBestAction: stringOrFallback(parsed.nextBestAction, fallback.nextBestAction, 220),
    confidence: isConfidence(parsed.confidence) ? parsed.confidence : fallback.confidence,
    limitations: stringArrayOrFallback(parsed.limitations, fallback.limitations, 5),
    targetFlow: isTargetFlow(parsed.targetFlow) ? parsed.targetFlow : fallback.targetFlow,
  };
}

function fallbackFileAnalysis(file: File, userMessage = ""): ZESFileAnalysis {
  const hints = detectFilenameHints(file.name, userMessage);
  const serviceLike = hints.some((hint) =>
    ["eroare", "defect", "service", "alarm", "fault"].includes(hint),
  );

  return {
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    status: PDF_MIME_TYPES.has(file.type) || TEXT_MIME_TYPES.has(file.type) || IMAGE_MIME_TYPES.has(file.type)
      ? "analyzed"
      : "manual-review",
    fileSummary: `Analiza preliminara pentru ${file.name}. Contextul trebuie validat de specialist.`,
    detectedItems: hints.length ? hints : ["context tehnic preliminar"],
    extractedSpecs: buildFallbackSpecs(file, userMessage),
    risks: serviceLike
      ? [
          "Posibil impact operational daca echipamentul este indisponibil.",
          "Necesita verificare tehnica inainte de reluarea utilizarii.",
        ]
      : [
          "Lipsesc detalii tehnice complete pentru validare finala.",
          "Datele din fisier trebuie corelate cu amplasamentul real.",
        ],
    missingInfo: [
      "Oras / locatie proiect",
      serviceLike ? "Model exact + serie echipament" : "Plan complet al spatiului",
      serviceLike ? "Coduri eroare si durata downtime" : "Termen si buget orientativ",
    ],
    recommendedServices: serviceLike
      ? ["Service aparatura medicala", "Service diagnostic"]
      : ["Consultanta proiecte medicale", "Planificare infrastructura imagistica"],
    nextBestAction: serviceLike
      ? "Trimite cererea de service cu date de contact, locatie si simptomele observate."
      : "Trimite contextul proiectului pentru analiza preliminara si structurarea ofertarii.",
    confidence: hints.length >= 3 ? "medie" : "scazuta",
    limitations: [
      "Analiza este preliminara si nu inlocuieste validarea specialistului.",
      "Nu sunt oferite aprobari CNCAN sau concluzii legale finale.",
    ],
    targetFlow: serviceLike ? "service" : "project",
  };
}

function manualReviewAnalysis(file: File, limitationMessage: string): ZESFileAnalysis {
  return {
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    status: "manual-review",
    fileSummary: `Fisierul ${file.name} a fost receptionat. Echipa ZESCORP il poate revizui manual.`,
    detectedItems: ["fisier receptionat"],
    extractedSpecs: [`Tip fisier: ${file.type || "necunoscut"}`],
    risks: ["Datele nu pot fi interpretate automat in aceasta etapa."],
    missingInfo: ["Mesaj scurt despre contextul proiectului sau al cazului service."],
    recommendedServices: ["Consultanta proiecte medicale", "Service aparatura medicala"],
    nextBestAction:
      "Continua conversatia cu ZES si trimite cererea pentru revizuire manuala de specialist.",
    confidence: "scazuta",
    limitations: [limitationMessage, "Fara OCR/parsing complet in aceasta etapa."],
    targetFlow: "mixed",
  };
}

function buildFileAnalysisPrompt(file: File, userMessage?: string) {
  return [
    `Fisier: ${file.name}`,
    `Mime: ${file.type}`,
    `Dimensiune bytes: ${file.size}`,
    userMessage ? `Mesaj utilizator: ${userMessage}` : "Mesaj utilizator: (necompletat)",
    "Obiectiv: analiza preliminara pentru service/proiect medical.",
  ].join("\n");
}

function detectFilenameHints(fileName: string, userMessage: string) {
  const source = `${fileName} ${userMessage}`.toLowerCase();
  const signals = [
    "ct",
    "rmn",
    "mri",
    "radiologie",
    "cncan",
    "rf",
    "shielding",
    "service",
    "defect",
    "eroare",
    "ivd",
    "laborator",
    "hvac",
    "electric",
    "ups",
    "plan",
    "schita",
    "datasheet",
    "model",
    "serial",
  ];

  return signals.filter((signal) => source.includes(signal));
}

function buildFallbackSpecs(file: File, userMessage: string) {
  const specs: string[] = [];
  if (IMAGE_MIME_TYPES.has(file.type)) specs.push("Imagine tehnica / foto teren");
  if (PDF_MIME_TYPES.has(file.type)) specs.push("Document PDF tehnic");
  if (TEXT_MIME_TYPES.has(file.type)) specs.push("Document text");
  if (userMessage.trim()) specs.push(`Context mentionat: ${userMessage.trim().slice(0, 120)}`);
  specs.push(`Dimensiune fisier: ${Math.max(1, Math.round(file.size / 1024))} KB`);
  return specs.slice(0, 8);
}

function stringOrFallback(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== "string" || !value.trim()) return fallback;
  return value.trim().slice(0, maxLength);
}

function stringArrayOrFallback(
  value: unknown,
  fallback: string[],
  maxItems: number,
) {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
  return cleaned.length ? cleaned : fallback;
}

function isConfidence(value: unknown): value is StructuredFileAnalysis["confidence"] {
  return value === "scazuta" || value === "medie" || value === "ridicata";
}

function isTargetFlow(value: unknown): value is StructuredFileAnalysis["targetFlow"] {
  return value === "service" || value === "project" || value === "mixed";
}
