export type ZESGuideIntentId =
  | "ct-project"
  | "mri-project"
  | "radiology-modernization"
  | "service-maintenance"
  | "lab-ivd"
  | "shielding-radioprotection"
  | "cncan"
  | "funding"
  | "equipment-offer"
  | "project-planning"
  | "general";

export type ZESGuidePathId =
  | "service"
  | "ct-radiology"
  | "mri"
  | "funding"
  | "equipment"
  | "planning";

export type ZESConversationPhase =
  | "early-discovery"
  | "qualification"
  | "offer-prep"
  | "service-prep"
  | "lead-capture-ready"
  | "lead-captured"
  | "waiting-for-file"
  | "completed-closed";

export type ZESLeadCompletionStatus =
  | "not-ready"
  | "ready"
  | "captured"
  | "closed";

export type ZESGuideRoutingTarget = {
  label: string;
  href: string;
  kind: "tool" | "service" | "workflow" | "contact";
  availability: "available" | "future";
};

export type ZESLeadSnapshot = {
  detectedNeed: string;
  domain: string;
  urgency: "scazuta" | "moderata" | "ridicata" | "critica";
  maturity: "inceput" | "partial-definit" | "pregatit-pentru-analiza" | "pregatit-pentru-oferta";
  suggestedServices: string[];
  missingInfo: string[];
  collectedFields: string[];
  missingFields: string[];
  leadCompletionStatus: ZESLeadCompletionStatus;
  nextStep: string;
};

export type ZESConversationState = {
  pathId: ZESGuidePathId;
  intent: ZESGuideIntentId;
  phase: ZESConversationPhase;
  capabilityChips: string[];
  collectedAnswers: Record<string, string>;
  askedQuestionIds: string[];
  lastAskedQuestionId: string | null;
  leadCompletionStatus: ZESLeadCompletionStatus;
  fileUploadStatus: "unknown" | "available" | "analyzed";
  safetyFlags: {
    serviceSafetyShown: boolean;
    complianceSafetyShown: boolean;
    uploadSafetyShown: boolean;
  };
  initialMessage: string;
};

export type ZESAssistantTurn = {
  message: string;
  followUpQuestion: string | null;
  leadSnapshot: ZESLeadSnapshot;
  suggestedServices: Array<{ label: string; href: string }>;
  ctas: ZESGuideRoutingTarget[];
  capabilityChips: string[];
  internalCapabilityNote: string;
  documentHint: string;
  highIntentClose: boolean;
};

export const zesGuideStarters = [
  "Vreau sa deschid o clinica CT",
  "Am un aparat defect si am nevoie de service",
  "Am nevoie de camera RMN",
  "Vreau oferta pentru echipamente",
  "Pregatesc proiect pe fonduri europene",
  "Nu stiu de unde sa incep",
] as const;

type ZESGuideQuestion = {
  id: string;
  prompt: string;
  aliases?: string[];
  required?: boolean;
};

type ZESPathConfig = {
  id: ZESGuidePathId;
  label: string;
  concerns: string;
  questions: ZESGuideQuestion[];
  capabilityChips: string[];
  services: Array<{ label: string; href: string }>;
  ctas: ZESGuideRoutingTarget[];
  nextActionWhenReady: string;
  detectedNeedLabel: string;
  closingSummaryLabel: string;
};

const intentMatchers: Array<{ intent: ZESGuideIntentId; patterns: RegExp[] }> = [
  {
    intent: "service-maintenance",
    patterns: [
      /\bservice\b/i,
      /\bmentenant/i,
      /\bdefect/i,
      /\beroare\b/i,
      /\bdowntime\b/i,
      /\boprit/i,
      /\bnu (mai )?porneste\b/i,
      /\becran negru\b/i,
      /\bbip(uri)?\b/i,
      /\bmonitor\b/i,
    ],
  },
  {
    intent: "mri-project",
    patterns: [/\brmn\b/i, /\bmri\b/i, /\bfaraday\b/i, /\bmagnet\b/i],
  },
  {
    intent: "ct-project",
    patterns: [/\bct\b/i, /\btomograf/i, /\brx\b/i, /\bradiologie\b/i],
  },
  {
    intent: "funding",
    patterns: [/\bfonduri\b/i, /\beuropene\b/i, /\bfinant/i, /\bpnrr\b/i, /\bgrant\b/i],
  },
  {
    intent: "equipment-offer",
    patterns: [/\bofert/i, /\bechipament/i, /\baparatur/i, /\brefurbished\b/i],
  },
  {
    intent: "lab-ivd",
    patterns: [/\blaborator\b/i, /\bivd\b/i, /\banaliz/i],
  },
  {
    intent: "shielding-radioprotection",
    patterns: [/\bradioprotect/i, /\brf shielding\b/i, /\bplumb\b/i, /\bcusca faraday\b/i],
  },
  {
    intent: "cncan",
    patterns: [/\bcncan\b/i, /\bautoriz/i, /\baviz\b/i],
  },
  {
    intent: "radiology-modernization",
    patterns: [/\bmoderniz/i, /\bupgrade\b/i, /\bradiologi/i],
  },
  {
    intent: "project-planning",
    patterns: [/\bproiect\b/i, /\bplanific/i, /\bclinica\b/i, /\bincep\b/i],
  },
];

const pathConfigs: Record<ZESGuidePathId, ZESPathConfig> = {
  service: {
    id: "service",
    label: "Service / mentenanta",
    concerns: "triere urgenta, risc operational si continuitate",
    questions: [
      {
        id: "service_equipment_type",
        aliases: ["equipment_type", "equipment"],
        required: true,
        prompt: "Ce tip de aparat este afectat (ex. CT, RMN, RX, analizator IVD)?",
      },
      {
        id: "manufacturer_model",
        aliases: ["equipment_model"],
        prompt: "Care este producatorul/modelul?",
      },
      { id: "symptom", required: true, prompt: "Care este simptomul principal sau codul de eroare?" },
      { id: "city", aliases: ["location"], required: true, prompt: "In ce oras este echipamentul?" },
      { id: "downtime", required: true, prompt: "De cat timp este oprit sau afectat fluxul?" },
      { id: "urgency", required: true, prompt: "Care este urgenta operationala?" },
      { id: "maintenance_contract", prompt: "Exista contract de mentenanta activ?" },
      { id: "file_availability", aliases: ["evidence", "plan_availability"], prompt: "Ai poze, cod de eroare sau fisa tehnica?" },
      { id: "phone", required: true, prompt: "Lasa un telefon de contact pentru preluare rapida." },
      { id: "email", prompt: "Daca ai, lasa si un email pentru trimiterea rezumatului." },
      { id: "contact_permission", required: true, prompt: "Pot pregati cererea si sa o trimit catre echipa ZESCORP?" },
    ],
    capabilityChips: ["Service triage", "Mentenanta", "HVAC/electric", "Planificare proiect"],
    services: [
      { label: "Service aparatura medicala", href: "/services/service-aparatura-medicala" },
      { label: "Service diagnostic", href: "/service-diagnostic" },
    ],
    ctas: [
      route("Solicita evaluare service", "/service-diagnostic", "tool"),
      route("Trimite datele catre ZESCORP", "/project-intake?source=zes-guide", "tool"),
      route("Solicita contact prioritar", "/contact", "contact"),
    ],
    nextActionWhenReady: "ZES poate evalua prioritatea de service si pregati cererea pentru specialist.",
    detectedNeedLabel: "Service / mentenanta aparatura",
    closingSummaryLabel: "Cerere service",
  },
  "ct-radiology": {
    id: "ct-radiology",
    label: "CT / radiologie",
    concerns: "camera, radioprotectie, CNCAN, utilitati",
    questions: [
      { id: "project_type", aliases: ["ct_new_or_relocation"], required: true, prompt: "Proiect CT nou, relocare sau upgrade radiologie?" },
      { id: "space_type", required: true, prompt: "Spatiu existent sau constructie noua?" },
      { id: "city", required: true, prompt: "In ce oras se desfasoara proiectul?" },
      { id: "budget", required: true, prompt: "Care este bugetul orientativ?" },
      { id: "timeline", required: true, prompt: "Care este termenul tinta?" },
      { id: "cncan_status", required: true, prompt: "Care este statusul CNCAN in acest moment?" },
      { id: "plan_availability", aliases: ["plan_available"], required: true, prompt: "Ai schita/plan disponibil?" },
      { id: "utilities", prompt: "Exista nevoi clare de radioprotectie, HVAC si electric?" },
      { id: "phone", required: true, prompt: "Lasa un telefon de contact pentru preluare." },
      { id: "email", prompt: "Daca ai, lasa si email pentru trimiterea rezumatului." },
      { id: "contact_permission", required: true, prompt: "Pot pregati cererea pentru ofertare preliminara?" },
    ],
    capabilityChips: ["Planificare proiect", "Radioprotectie", "CNCAN", "HVAC/electric", "Ofertare"],
    services: [
      { label: "Proiectare camera CT", href: "/servicii/proiectare-camera-ct" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
    ],
    ctas: [
      route("Pregateste cererea pentru oferta/proiect", "/proposal-builder?source=zes-guide", "tool"),
      route("Trimite datele catre ZESCORP", "/project-intake?source=zes-guide", "tool"),
      route("Solicita contact prioritar", "/contact", "contact"),
    ],
    nextActionWhenReady: "ZES va pregati contextul pentru ofertare si analiza tehnica de camera + utilitati.",
    detectedNeedLabel: "Proiect CT / radiologie",
    closingSummaryLabel: "Cerere proiect CT/radiologie",
  },
  mri: {
    id: "mri",
    label: "RMN / MRI",
    concerns: "RF shielding, acces instalare, quench, utilitati",
    questions: [
      { id: "project_type", aliases: ["mri_new_or_relocation"], required: true, prompt: "RMN nou, relocare sau modernizare?" },
      { id: "magnet_power", required: true, prompt: "Ce putere magnet aveti in vedere (1.5T / 3T)?" },
      { id: "space_type", aliases: ["space_available"], required: true, prompt: "Spatiu existent sau constructie noua?" },
      { id: "installation_access", prompt: "Cum este accesul pentru instalare?" },
      { id: "rf_shielding", required: true, prompt: "Este definita cerinta de RF shielding?" },
      { id: "quench_safety", prompt: "Sunt clarificate aspectele de quench/siguranta?" },
      { id: "hvac_cooling", required: true, prompt: "Care este statusul pentru HVAC/racire?" },
      { id: "plan_availability", required: true, prompt: "Ai planul camerei disponibil?" },
      { id: "city", required: true, prompt: "In ce oras se desfasoara proiectul?" },
      { id: "phone", required: true, prompt: "Lasa un telefon de contact pentru preluare." },
      { id: "contact_permission", required: true, prompt: "Pot pregati cererea pentru analiza specialistului RMN?" },
    ],
    capabilityChips: ["RF shielding", "Planificare proiect", "HVAC/electric", "Ofertare"],
    services: [
      { label: "Proiectare camera RMN", href: "/servicii/proiectare-camera-rmn" },
      { label: "RF shielding pentru RMN", href: "/servicii/rf-shielding-rmn" },
    ],
    ctas: [
      route("Pregateste analiza pentru specialist", "/project-intake?source=zes-guide", "tool"),
      route("Pregateste cerere oferta", "/proposal-builder?source=zes-guide", "tool"),
      route("Solicita contact prioritar", "/contact", "contact"),
    ],
    nextActionWhenReady: "ZES poate structura analiza de infrastructura pentru specialistul RMN.",
    detectedNeedLabel: "Proiect RMN",
    closingSummaryLabel: "Cerere proiect RMN",
  },
  funding: {
    id: "funding",
    label: "Fonduri europene",
    concerns: "maturitate documentatie, termene, specificatii tehnice",
    questions: [
      { id: "project_type", required: true, prompt: "Ce tip de proiect medical este vizat?" },
      { id: "budget", aliases: ["estimated_value"], required: true, prompt: "Care este valoarea estimata a proiectului?" },
      { id: "application_status", required: true, prompt: "Care este statusul aplicatiei?" },
      { id: "plan_availability", aliases: ["technical_docs"], required: true, prompt: "Ce documentatie tehnica este disponibila acum?" },
      { id: "service_equipment_type", aliases: ["included_equipment"], prompt: "Ce echipamente sunt incluse?" },
      { id: "timeline", aliases: ["submission_deadline"], required: true, prompt: "Care este termenul de depunere?" },
      { id: "city", prompt: "In ce oras/judet este proiectul?" },
      { id: "phone", required: true, prompt: "Lasa un telefon de contact pentru preluare." },
      { id: "contact_permission", required: true, prompt: "Pot pregati cererea pentru context de ofertare?" },
    ],
    capabilityChips: ["Fonduri europene", "Ofertare", "Planificare proiect", "Echipamente"],
    services: [
      { label: "Consultanta proiecte medicale", href: "/servicii/consultanta-proiecte-medicale" },
      { label: "Planificare infrastructura imagistica", href: "/servicii/planificare-infrastructura-imagistica" },
    ],
    ctas: [
      route("Pregateste context pentru ofertare", "/proposal-builder?source=zes-guide", "tool"),
      route("Trimite datele catre ZESCORP", "/project-intake?source=zes-guide", "tool"),
      route("Solicita discutie cu specialist ZESCORP", "/contact", "contact"),
    ],
    nextActionWhenReady: "ZES poate pregati lista de informatii necesare pentru specialist si ofertare.",
    detectedNeedLabel: "Proiect pe fonduri europene",
    closingSummaryLabel: "Cerere proiect finantare",
  },
  equipment: {
    id: "equipment",
    label: "Oferta echipamente",
    concerns: "selectie tehnica-comerciala, instalare si service",
    questions: [
      { id: "service_equipment_type", aliases: ["equipment_type"], required: true, prompt: "Ce tip de echipament cautati?" },
      { id: "clinical_use", required: true, prompt: "Care este aplicatia clinica?" },
      { id: "budget", required: true, prompt: "Care este bugetul orientativ?" },
      { id: "new_or_used", prompt: "Preferati echipament nou sau second hand?" },
      { id: "timeline", aliases: ["acquisition_timeline"], required: true, prompt: "Care este termenul de achizitie?" },
      { id: "service_warranty", prompt: "Ce asteptari aveti pentru service/garantie?" },
      { id: "installation_training", prompt: "Aveti nevoie de instalare/training?" },
      { id: "city", prompt: "In ce oras va fi implementat?" },
      { id: "phone", required: true, prompt: "Lasa un telefon de contact pentru oferta preliminara." },
      { id: "contact_permission", required: true, prompt: "Pot pregati cererea pentru echipa comerciala ZESCORP?" },
    ],
    capabilityChips: ["Echipamente", "Ofertare", "Mentenanta", "Planificare proiect"],
    services: [
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Consultanta proiecte medicale", href: "/servicii/consultanta-proiecte-medicale" },
    ],
    ctas: [
      route("Genereaza cerere de oferta", "/proposal-builder?source=zes-guide", "tool"),
      route("Trimite datele catre ZESCORP", "/project-intake?source=zes-guide", "tool"),
      route("Solicita contact prioritar", "/contact", "contact"),
    ],
    nextActionWhenReady: "ZES va pregati contextul comercial si tehnic pentru echipa de ofertare.",
    detectedNeedLabel: "Oferta echipamente medicale",
    closingSummaryLabel: "Cerere oferta echipamente",
  },
  planning: {
    id: "planning",
    label: "Planificare proiect medical",
    concerns: "orientare, prioritizare, pregatire tehnica initiala",
    questions: [
      { id: "project_type", aliases: ["project_goal"], required: true, prompt: "Ce vrei sa construiesti, modernizezi sau repari?" },
      { id: "project_stage", required: true, prompt: "In ce stadiu esti acum: idee, bugetare, proiectare sau executie?" },
      { id: "plan_availability", aliases: ["known_info"], prompt: "Ai deja planuri, echipamente, buget sau termen?" },
      { id: "primary_risk", prompt: "Care este riscul principal perceput?" },
      { id: "city", prompt: "In ce oras/judet este proiectul?" },
      { id: "phone", required: true, prompt: "Lasa un telefon de contact pentru preluare." },
      { id: "contact_permission", required: true, prompt: "Pot pregati cererea structurata pentru echipa ZESCORP?" },
    ],
    capabilityChips: ["Planificare proiect", "Ofertare", "Service triage", "CNCAN", "HVAC/electric"],
    services: [
      { label: "Consultanta proiecte medicale", href: "/servicii/consultanta-proiecte-medicale" },
      { label: "Evaluare infrastructura clinica", href: "/servicii/evaluare-infrastructura-clinica" },
    ],
    ctas: [
      route("Continua conversatia cu ZES", "/ai-discovery", "workflow"),
      route("Trimite datele catre ZESCORP", "/project-intake?source=zes-guide", "tool"),
      route("Pregateste cerere oferta", "/proposal-builder?source=zes-guide", "tool"),
    ],
    nextActionWhenReady: "ZES poate structura cererea de proiect si urmatorii pasi tehnico-comerciali.",
    detectedNeedLabel: "Orientare proiect medical",
    closingSummaryLabel: "Cerere proiect medical",
  },
};

const intentToPath: Record<ZESGuideIntentId, ZESGuidePathId> = {
  "service-maintenance": "service",
  "ct-project": "ct-radiology",
  "mri-project": "mri",
  funding: "funding",
  "equipment-offer": "equipment",
  "radiology-modernization": "ct-radiology",
  "lab-ivd": "planning",
  "shielding-radioprotection": "mri",
  cncan: "ct-radiology",
  "project-planning": "planning",
  general: "planning",
};

export function detectZESGuideIntent(input: string): ZESGuideIntentId {
  const text = input.trim();
  if (!text) return "general";

  for (const matcher of intentMatchers) {
    if (matcher.patterns.some((pattern) => pattern.test(text))) {
      return matcher.intent;
    }
  }

  return "general";
}

export function startZESConversation(input: string): {
  state: ZESConversationState;
  turn: ZESAssistantTurn;
} {
  const intent = detectZESGuideIntent(input);
  const pathId = intentToPath[intent];
  const path = pathConfigs[pathId];

  const state: ZESConversationState = {
    pathId,
    intent,
    phase: "early-discovery",
    capabilityChips: path.capabilityChips,
    collectedAnswers: {},
    askedQuestionIds: [],
    lastAskedQuestionId: null,
    leadCompletionStatus: "not-ready",
    fileUploadStatus: "unknown",
    safetyFlags: {
      serviceSafetyShown: false,
      complianceSafetyShown: false,
      uploadSafetyShown: false,
    },
    initialMessage: input,
  };

  const seeded = mergeExtractedFields(state, detectStructuredFields(state, input));
  seeded.phase = inferPhase(seeded, path);
  const nextQuestion = pickNextQuestion(seeded, path);
  const snapshot = createLeadSnapshot(seeded);
  const preparedState = {
    ...seeded,
    askedQuestionIds: nextQuestion ? [nextQuestion.id] : [],
    lastAskedQuestionId: nextQuestion?.id ?? null,
  };
  const note = createSafetyNote(preparedState, path);

  return {
    state: preparedState,
    turn: {
      message: `ZES a inteles o cerere din zona ${path.label}. ZES analizeaza contextul proiectului si te va ghida in pasi scurti pentru ${path.concerns}.`,
      followUpQuestion: nextQuestion?.prompt ?? null,
      leadSnapshot: snapshot,
      suggestedServices: path.services,
      ctas: path.ctas,
      capabilityChips: path.capabilityChips,
      internalCapabilityNote: path.nextActionWhenReady,
      documentHint: note,
      highIntentClose: false,
    },
  };
}

export function continueZESConversation(
  currentState: ZESConversationState,
  userInput: string,
): {
  state: ZESConversationState;
  turn: ZESAssistantTurn;
} {
  const path = pathConfigs[currentState.pathId];
  const nextState: ZESConversationState = normalizeState(currentState);
  const extracted = detectStructuredFields(nextState, userInput);
  mergeExtractedFields(nextState, extracted);

  const closeIntent = detectCloseIntent(userInput);
  const snapshot = createLeadSnapshot(nextState);
  const readinessScore = computeReadinessScore(nextState, path);
  const qualified = isLeadQualified(nextState, path);
  const needsFileLater =
    wantsFileFlow(userInput) &&
    nextState.fileUploadStatus !== "analyzed" &&
    snapshot.leadCompletionStatus !== "closed";

  const nextQuestion = qualified ? null : pickNextQuestion(nextState, path);

  if (qualified && closeIntent) {
    nextState.leadCompletionStatus = "closed";
    nextState.phase = "completed-closed";
  } else if (qualified) {
    nextState.leadCompletionStatus = "ready";
    nextState.phase = "lead-capture-ready";
  } else if (needsFileLater) {
    nextState.phase = "waiting-for-file";
  } else {
    nextState.phase = inferPhase(nextState, path);
  }

  if (nextQuestion) {
    if (!nextState.askedQuestionIds.includes(nextQuestion.id)) {
      nextState.askedQuestionIds.push(nextQuestion.id);
    }
    nextState.lastAskedQuestionId = nextQuestion.id;
  } else {
    nextState.lastAskedQuestionId = null;
  }

  const refreshedSnapshot = createLeadSnapshot(nextState);
  const highIntent =
    closeIntent ||
    refreshedSnapshot.leadCompletionStatus === "ready" ||
    refreshedSnapshot.leadCompletionStatus === "closed" ||
    readinessScore >= 65 ||
    refreshedSnapshot.urgency === "ridicata" ||
    refreshedSnapshot.urgency === "critica";

  const message = nextQuestion
    ? buildGuidedMessage(refreshedSnapshot, nextState, path)
    : buildClosingMessage(refreshedSnapshot, nextState, path);

  return {
    state: nextState,
    turn: {
      message,
      followUpQuestion: nextQuestion?.prompt ?? null,
      leadSnapshot: refreshedSnapshot,
      suggestedServices: path.services,
      ctas: nextQuestion ? path.ctas : minimalClosingCtas(path),
      capabilityChips: path.capabilityChips,
      internalCapabilityNote: path.nextActionWhenReady,
      documentHint: createSafetyNote(nextState, path),
      highIntentClose: highIntent && !nextQuestion,
    },
  };
}

function createLeadSnapshot(state: ZESConversationState): ZESLeadSnapshot {
  const path = pathConfigs[state.pathId];
  const missingInfo = missingQuestionPrompts(state, path);
  const missingFields = missingFieldIds(state, path);
  const collectedFields = Object.entries(state.collectedAnswers)
    .filter(([, value]) => Boolean(value.trim()))
    .map(([key]) => key);

  const allText = `${state.initialMessage} ${Object.values(state.collectedAnswers).join(" ")}`.toLowerCase();
  const urgency = detectUrgency(allText);
  const readiness = computeReadinessScore(state, path);
  const qualified = isLeadQualified(state, path);
  const completionStatus = qualified
    ? state.leadCompletionStatus === "closed"
      ? "closed"
      : state.leadCompletionStatus === "captured"
        ? "captured"
        : "ready"
    : "not-ready";

  return {
    detectedNeed: path.detectedNeedLabel,
    domain: path.label,
    urgency,
    maturity: readinessToMaturity(readiness),
    suggestedServices: path.services.map((service) => service.label),
    missingInfo,
    collectedFields,
    missingFields,
    leadCompletionStatus: completionStatus,
    nextStep: completionStatus === "ready" || completionStatus === "closed"
      ? path.nextActionWhenReady
      : "Continuam colectarea datelor pentru clarificare tehnica.",
  };
}

function computeReadinessScore(state: ZESConversationState, path: ZESPathConfig) {
  const required = path.questions.filter((question) => question.required);
  const answeredRequired = required.filter((question) => hasFieldValue(state, question.id, question.aliases)).length;
  const answeredAll = path.questions.filter((question) => hasFieldValue(state, question.id, question.aliases)).length;
  const requiredScore = required.length
    ? Math.round((answeredRequired / required.length) * 75)
    : 0;
  const optionalScore = path.questions.length
    ? Math.round((answeredAll / path.questions.length) * 25)
    : 0;

  return Math.min(100, requiredScore + optionalScore);
}

function readinessToMaturity(score: number): ZESLeadSnapshot["maturity"] {
  if (score >= 85) return "pregatit-pentru-oferta";
  if (score >= 60) return "pregatit-pentru-analiza";
  if (score >= 35) return "partial-definit";
  return "inceput";
}

function detectUrgency(text: string): ZESLeadSnapshot["urgency"] {
  if (/\bcritic|urgent|imediat|oprit|blocaj|downtime\b/i.test(text)) return "critica";
  if (/\brapid|curand|prioritar|activ\b/i.test(text)) return "ridicata";
  if (/\bplanific|buget|etapizat\b/i.test(text)) return "moderata";
  return "scazuta";
}

function buildClosingMessage(
  snapshot: ZESLeadSnapshot,
  state: ZESConversationState,
  path: ZESPathConfig,
) {
  const lines = [
    "Perfect. Am suficiente informatii pentru preluare preliminara.",
    "",
    "Ce am inteles:",
    ...closingSummaryLines(path, state),
    "",
    "Urmatorul pas recomandat:",
    snapshot.leadCompletionStatus === "closed"
      ? "Cererea este pregatita pentru trimitere catre echipa ZESCORP."
      : path.nextActionWhenReady,
  ];

  if (state.fileUploadStatus !== "analyzed") {
    lines.push("Cererea poate fi pregatita acum, iar planul/fisierul poate fi atasat ulterior.");
  }

  return lines.join("\n");
}

function buildGuidedMessage(
  snapshot: ZESLeadSnapshot,
  state: ZESConversationState,
  path: ZESPathConfig,
) {
  const known = summarizeKnown(state);
  const knownText = known.length ? `Ce am inteles: ${known.join(", ")}.` : "";
  const maturityText = `Nivel curent: ${snapshot.maturity}.`;
  const base = snapshot.urgency === "critica"
    ? "Am notat. Contextul indica prioritate ridicata."
    : "Am notat.";

  return [base, maturityText, knownText].filter(Boolean).join(" ");
}

function closingSummaryLines(path: ZESPathConfig, state: ZESConversationState) {
  const fields = [
    ["Tip cerere", path.closingSummaryLabel],
    ["Tip proiect/serviciu", getField(state, "project_type", ["service_equipment_type"])],
    ["Spatiu", getField(state, "space_type")],
    ["Oras", getField(state, "city")],
    ["Buget", getField(state, "budget")],
    ["Termen", getField(state, "timeline")],
    ["CNCAN", getField(state, "cncan_status")],
    ["Plan disponibil", getField(state, "plan_availability", ["file_availability"])],
    ["Contact", getField(state, "phone", ["email"])],
  ] as const;

  return fields
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `- ${label}: ${value}`);
}

function summarizeKnown(state: ZESConversationState) {
  const labels: Array<[string, string | undefined]> = [
    ["tip", getField(state, "project_type", ["service_equipment_type"])],
    ["oras", getField(state, "city")],
    ["buget", getField(state, "budget")],
    ["termen", getField(state, "timeline")],
    ["CNCAN", getField(state, "cncan_status")],
  ];

  return labels
    .filter(([, value]) => Boolean(value))
    .slice(0, 4)
    .map(([label, value]) => `${label}: ${value}`);
}

function createSafetyNote(state: ZESConversationState, path: ZESPathConfig) {
  const hints: string[] = [];

  if (
    (path.id === "service" || /service|defect|eroare|monitor|oprit/i.test(state.initialMessage)) &&
    !state.safetyFlags.serviceSafetyShown
  ) {
    hints.push("Nu folosi echipamentul pe pacient pana la verificare tehnica.");
    state.safetyFlags.serviceSafetyShown = true;
  }

  if (
    (path.id === "ct-radiology" || path.id === "mri" || path.id === "funding") &&
    !state.safetyFlags.complianceSafetyShown
  ) {
    hints.push("CNCAN/compliance sunt orientative aici si necesita validare de specialist.");
    state.safetyFlags.complianceSafetyShown = true;
  }

  if (
    state.fileUploadStatus !== "analyzed" &&
    !state.safetyFlags.uploadSafetyShown &&
    (getField(state, "plan_availability") || wantsFileFlow(state.initialMessage))
  ) {
    hints.push("Daca ai plan sau fisa tehnica, foloseste butonul de atasare. Poti continua si fara fisier.");
    state.safetyFlags.uploadSafetyShown = true;
  }

  return hints.join(" ");
}

function normalizeState(state: ZESConversationState): ZESConversationState {
  return {
    ...state,
    phase: state.phase ?? "early-discovery",
    askedQuestionIds: [...(state.askedQuestionIds ?? [])],
    lastAskedQuestionId: state.lastAskedQuestionId ?? null,
    collectedAnswers: { ...state.collectedAnswers },
    leadCompletionStatus: state.leadCompletionStatus ?? "not-ready",
    fileUploadStatus: state.fileUploadStatus ?? "unknown",
    safetyFlags: state.safetyFlags ?? {
      serviceSafetyShown: false,
      complianceSafetyShown: false,
      uploadSafetyShown: false,
    },
  };
}

function pickNextQuestion(state: ZESConversationState, path: ZESPathConfig) {
  const required = path.questions.filter((question) => question.required);
  const requiredMissing = required.find(
    (question) =>
      !hasFieldValue(state, question.id, question.aliases) &&
      !state.askedQuestionIds.includes(question.id),
  );

  if (requiredMissing) return requiredMissing;

  return path.questions.find(
    (question) =>
      !hasFieldValue(state, question.id, question.aliases) &&
      !state.askedQuestionIds.includes(question.id),
  );
}

function missingQuestionPrompts(state: ZESConversationState, path: ZESPathConfig) {
  return path.questions
    .filter((question) => !hasFieldValue(state, question.id, question.aliases))
    .map((question) => question.prompt);
}

function missingFieldIds(state: ZESConversationState, path: ZESPathConfig) {
  return path.questions
    .filter((question) => !hasFieldValue(state, question.id, question.aliases))
    .map((question) => question.id);
}

function hasFieldValue(state: ZESConversationState, id: string, aliases: string[] = []) {
  const keys = [id, ...aliases];
  return keys.some((key) => Boolean(state.collectedAnswers[key]?.trim()));
}

function getField(state: ZESConversationState, id: string, aliases: string[] = []) {
  const keys = [id, ...aliases];
  for (const key of keys) {
    const value = state.collectedAnswers[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

function mergeExtractedFields(
  state: ZESConversationState,
  extracted: Record<string, string>,
) {
  for (const [key, value] of Object.entries(extracted)) {
    if (key === "direct_answer") continue;
    if (value.trim()) {
      state.collectedAnswers[key] = value.trim();
    }
  }

  if (state.lastAskedQuestionId && isYesNo(extracted.direct_answer)) {
    const lastQuestion = state.lastAskedQuestionId;
    const yesNoFields = new Set([
      "plan_availability",
      "file_availability",
      "contact_permission",
      "maintenance_contract",
      "utilities",
      "rf_shielding",
      "quench_safety",
      "service_warranty",
      "installation_training",
      "new_or_used",
    ]);
    if (yesNoFields.has(lastQuestion) && !state.collectedAnswers[lastQuestion]) {
      state.collectedAnswers[lastQuestion] = extracted.direct_answer;
    }
  }

  if (hasFieldValue(state, "plan_availability", ["file_availability"])) {
    const value = (getField(state, "plan_availability", ["file_availability"]) ?? "").toLowerCase();
    if (/\bda\b|yes|am|disponibil/.test(value)) {
      state.fileUploadStatus = state.fileUploadStatus === "analyzed" ? "analyzed" : "available";
    }
  }

  if ((extracted.file_upload_status ?? "").toLowerCase() === "analyzed") {
    state.fileUploadStatus = "analyzed";
  }

  return state;
}

function detectStructuredFields(
  state: ZESConversationState,
  input: string,
): Record<string, string> {
  const text = input.trim();
  const normalized = text.toLowerCase();
  const extracted: Record<string, string> = {};

  const phoneMatch = text.match(/(\+?\d[\d\s().-]{7,})/);
  if (phoneMatch?.[1]) extracted.phone = phoneMatch[1].trim();

  const emailMatch = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  if (emailMatch?.[0]) extracted.email = emailMatch[0].trim();

  const budgetMatch = text.match(/(\d+[.,]?\d*)\s*(k|mii|eur|euro)\b/i);
  if (budgetMatch) extracted.budget = budgetMatch[0].trim();

  const timelineMatch = text.match(/(\d+\s*(luni|saptamani|zile))|imediat|urgent/i);
  if (timelineMatch?.[0]) extracted.timeline = timelineMatch[0].trim();

  if (/\b(bucuresti|cluj|timisoara|iasi|constanta|brasov|oradea|sibiu|craiova|ploiesti)\b/i.test(text)) {
    extracted.city = text.match(/\b(bucuresti|cluj|timisoara|iasi|constanta|brasov|oradea|sibiu|craiova|ploiesti)\b/i)?.[0] ?? "";
  }

  if (/\bcncan\b/i.test(normalized)) {
    if (/\bnu\b|\bneiniti|fara|inca nu/i.test(normalized)) extracted.cncan_status = "neinitiat";
    else extracted.cncan_status = "in lucru";
  }

  if (/\bplan|schit|fisa|atas|document\b/i.test(normalized)) {
    extracted.plan_availability = /\bnu\b|\bfara\b/i.test(normalized) ? "nu" : "da";
  }

  if (/\bda\b|\byes\b|\bperfect\b/.test(normalized)) {
    extracted.direct_answer = "da";
  } else if (/\bnu\b|\bno\b/.test(normalized)) {
    extracted.direct_answer = "nu";
  }

  if (/\btrimit\w*|ofert\w*|contactat\w*|contacteaz\w*|sa facem|vreau sa facem\b/i.test(normalized)) {
    extracted.contact_permission = "da";
    if (!extracted.urgency) {
      extracted.urgency = "ridicata";
    }
    if (!extracted.downtime && state.pathId === "service") {
      extracted.downtime = "nespecificat";
    }
  }

  if (state.pathId === "service") {
    if (/\bmonitor|ct|rmn|rx|ecograf|analizator|comen|siemens|ge|philips\b/i.test(normalized)) {
      extracted.service_equipment_type = text;
    }
    if (/\bbip|ecran|negru|eroare|nu porneste|nu mai porneste|defect|led\b/i.test(normalized)) {
      extracted.symptom = text;
    }
    if (/\boprit|downtime|urgent|imediat\b/i.test(normalized)) {
      extracted.urgency = /\boprit|imediat|urgent\b/i.test(normalized) ? "critica" : "ridicata";
      extracted.downtime = text;
    }
  } else {
    if (/\bct\b|\bradiologie\b|\brx\b/i.test(normalized)) extracted.project_type = "radiologie / CT-RX";
    if (/\brmn\b|\bmri\b/i.test(normalized)) extracted.project_type = "RMN";
    if (/\bmoderniz/i.test(normalized)) extracted.project_type = "modernizare clinica";
    if (/\bexistent\b/.test(normalized)) extracted.space_type = "spatiu existent";
    if (/\bnou\b|constructie noua|greenfield\b/.test(normalized)) extracted.space_type = "constructie noua";
  }

  return extracted;
}

function isLeadQualified(state: ZESConversationState, path: ZESPathConfig) {
  const hasContact = Boolean(getField(state, "phone") || getField(state, "email"));

  if (path.id === "service") {
    const serviceType = hasFieldValue(state, "service_equipment_type", ["equipment_type"]);
    const symptom = hasFieldValue(state, "symptom");
    const urgencyOrDowntime = hasFieldValue(state, "urgency") || hasFieldValue(state, "downtime");
    const locationOrContact = hasFieldValue(state, "city") || hasContact;
    return serviceType && symptom && urgencyOrDowntime && locationOrContact;
  }

  const projectType = hasFieldValue(state, "project_type", ["ct_new_or_relocation", "mri_new_or_relocation"]);
  const city = hasFieldValue(state, "city");
  const timelineOrBudget = hasFieldValue(state, "timeline") || hasFieldValue(state, "budget");
  const planOrDescription =
    hasFieldValue(state, "plan_availability", ["file_availability"]) ||
    hasFieldValue(state, "primary_risk") ||
    hasFieldValue(state, "project_stage");

  return projectType && city && timelineOrBudget && planOrDescription && hasContact;
}

function inferPhase(state: ZESConversationState, path: ZESPathConfig): ZESConversationPhase {
  if (state.leadCompletionStatus === "captured") return "lead-captured";
  if (state.leadCompletionStatus === "closed") return "completed-closed";
  if (isLeadQualified(state, path)) return "lead-capture-ready";

  const answered = Object.keys(state.collectedAnswers).filter((key) => state.collectedAnswers[key]?.trim()).length;

  if (answered <= 1) return "early-discovery";
  if (path.id === "service" && answered >= 2) return "service-prep";
  if (answered >= 4) return "offer-prep";
  return "qualification";
}

function detectCloseIntent(text: string) {
  return /\b(da|trimit\w*|ofert\w*|contactat\w*|contacteaz\w*|vreau sa facem|solicita)\b/i.test(
    text.trim(),
  );
}

function wantsFileFlow(text: string) {
  return /\b(plan|schita|fisa|document|atas)\b/i.test(text);
}

function isYesNo(value: string | undefined) {
  if (!value) return false;
  return value === "da" || value === "nu";
}

function minimalClosingCtas(path: ZESPathConfig): ZESGuideRoutingTarget[] {
  const core = path.ctas.slice(0, 2);
  return core.length ? core : path.ctas;
}

function route(
  label: string,
  href: string,
  kind: ZESGuideRoutingTarget["kind"],
  availability: ZESGuideRoutingTarget["availability"] = "available",
): ZESGuideRoutingTarget {
  return { label, href, kind, availability };
}
