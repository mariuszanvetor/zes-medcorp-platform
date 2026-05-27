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
  nextStep: string;
};

export type ZESConversationState = {
  pathId: ZESGuidePathId;
  intent: ZESGuideIntentId;
  capabilityChips: string[];
  collectedAnswers: Record<string, string>;
  currentQuestionIndex: number;
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
};

const intentMatchers: Array<{ intent: ZESGuideIntentId; patterns: RegExp[] }> = [
  {
    intent: "service-maintenance",
    patterns: [/\bservice\b/i, /\bmentenant/i, /\bdefect/i, /\beroare\b/i, /\bdowntime\b/i, /\boprit/i],
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
      { id: "equipment_type", prompt: "Ce tip de aparat este afectat (ex. CT, RMN, RX, analizator IVD)?" },
      { id: "manufacturer_model", prompt: "Care este producatorul/modelul?" },
      { id: "symptom", prompt: "Care este simptomul principal sau codul de eroare?" },
      { id: "location", prompt: "Unde este localizat echipamentul (oras / clinica)?" },
      { id: "downtime", prompt: "De cat timp este oprit sau afectat fluxul?" },
      { id: "urgency", prompt: "Care este urgenta operationala?" },
      { id: "maintenance_contract", prompt: "Exista contract de mentenanta activ?" },
      { id: "evidence", prompt: "Aveti poze sau coduri de eroare disponibile?" },
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
  },
  "ct-radiology": {
    id: "ct-radiology",
    label: "CT / radiologie",
    concerns: "camera, radioprotectie, CNCAN, utilitati",
    questions: [
      { id: "ct_new_or_relocation", prompt: "Este CT nou sau relocare?" },
      { id: "space_type", prompt: "Spatiu existent sau constructie noua?" },
      { id: "city", prompt: "In ce oras se desfasoara proiectul?" },
      { id: "budget", prompt: "Care este bugetul orientativ?" },
      { id: "timeline", prompt: "Care este termenul tinta?" },
      { id: "cncan_status", prompt: "Care este statusul CNCAN in acest moment?" },
      { id: "plan_available", prompt: "Aveti schita/plan disponibil?" },
      { id: "utilities", prompt: "Exista nevoi clare de radioprotectie, HVAC si electric?" },
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
  },
  mri: {
    id: "mri",
    label: "RMN / MRI",
    concerns: "RF shielding, acces instalare, quench, utilitati",
    questions: [
      { id: "mri_new_or_relocation", prompt: "Este RMN nou sau relocare?" },
      { id: "magnet_power", prompt: "Ce putere magnet aveti in vedere (ex. 1.5T / 3T)?" },
      { id: "space_available", prompt: "Ce spatiu este disponibil pentru camera RMN?" },
      { id: "installation_access", prompt: "Cum este accesul pentru instalare?" },
      { id: "rf_shielding", prompt: "Este definita cerinta de RF shielding?" },
      { id: "quench_safety", prompt: "Aveti clarificate aspectele de quench/siguranta?" },
      { id: "hvac_cooling", prompt: "Care este statusul pentru HVAC/racire?" },
      { id: "plan_available", prompt: "Aveti planul camerei disponibil?" },
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
  },
  funding: {
    id: "funding",
    label: "Fonduri europene",
    concerns: "maturitate documentatie, termene, specificatii tehnice",
    questions: [
      { id: "project_type", prompt: "Ce tip de proiect medical este vizat?" },
      { id: "estimated_value", prompt: "Care este valoarea estimata a proiectului?" },
      { id: "application_status", prompt: "Care este statusul aplicatiei?" },
      { id: "technical_docs", prompt: "Ce documentatie tehnica este disponibila acum?" },
      { id: "included_equipment", prompt: "Ce echipamente sunt incluse?" },
      { id: "submission_deadline", prompt: "Care este termenul de depunere?" },
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
  },
  equipment: {
    id: "equipment",
    label: "Oferta echipamente",
    concerns: "selectie tehnica-comerciala, instalare si service",
    questions: [
      { id: "equipment_type", prompt: "Ce tip de echipament cautati?" },
      { id: "clinical_use", prompt: "Care este aplicatia clinica?" },
      { id: "budget", prompt: "Care este bugetul orientativ?" },
      { id: "new_or_used", prompt: "Preferati echipament nou sau second hand?" },
      { id: "acquisition_timeline", prompt: "Care este termenul de achizitie?" },
      { id: "service_warranty", prompt: "Ce asteptari aveti pentru service/garantie?" },
      { id: "installation_training", prompt: "Aveti nevoie de instalare/training?" },
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
  },
  planning: {
    id: "planning",
    label: "Planificare proiect medical",
    concerns: "orientare, prioritizare, pregatire tehnica initiala",
    questions: [
      { id: "project_goal", prompt: "Ce vrei sa construiesti, modernizezi sau repari?" },
      { id: "project_stage", prompt: "In ce stadiu esti acum: idee, bugetare, proiectare sau executie?" },
      { id: "known_info", prompt: "Ce informatii ai deja (plan, echipamente, buget, termen)?" },
      { id: "primary_risk", prompt: "Care este riscul principal perceput?" },
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
    capabilityChips: path.capabilityChips,
    collectedAnswers: {},
    currentQuestionIndex: 0,
    initialMessage: input,
  };

  const snapshot = createLeadSnapshot(state);
  const followUp = path.questions[0]?.prompt ?? null;
  return {
    state,
    turn: {
      message: `ZES a inteles o cerere din zona ${path.label}. ZES analizeaza contextul proiectului si te va ghida in pasi scurti pentru ${path.concerns}.`,
      followUpQuestion: followUp,
      leadSnapshot: snapshot,
      suggestedServices: path.services,
      ctas: path.ctas,
      capabilityChips: path.capabilityChips,
      internalCapabilityNote: path.nextActionWhenReady,
      documentHint: defaultDocumentHint(),
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
  const nextState: ZESConversationState = {
    ...currentState,
    collectedAnswers: { ...currentState.collectedAnswers },
  };

  const currentQuestion = path.questions[currentState.currentQuestionIndex];
  if (currentQuestion) {
    nextState.collectedAnswers[currentQuestion.id] = userInput.trim();
    nextState.currentQuestionIndex = currentState.currentQuestionIndex + 1;
  }

  const snapshot = createLeadSnapshot(nextState);
  const remainingQuestion = path.questions[nextState.currentQuestionIndex];
  const readinessScore = computeReadinessScore(nextState, path);
  const highIntent = readinessScore >= 65 || snapshot.urgency === "ridicata" || snapshot.urgency === "critica";

  const message = remainingQuestion
    ? `Am notat. Pe baza raspunsurilor, ZES identifica ${snapshot.domain} cu maturitate ${snapshot.maturity}.`
    : buildClosingMessage(snapshot);

  return {
    state: nextState,
    turn: {
      message,
      followUpQuestion: remainingQuestion?.prompt ?? null,
      leadSnapshot: snapshot,
      suggestedServices: path.services,
      ctas: path.ctas,
      capabilityChips: path.capabilityChips,
      internalCapabilityNote: path.nextActionWhenReady,
      documentHint: defaultDocumentHint(),
      highIntentClose: highIntent && !remainingQuestion,
    },
  };
}

function createLeadSnapshot(state: ZESConversationState): ZESLeadSnapshot {
  const path = pathConfigs[state.pathId];
  const answeredIds = new Set(Object.keys(state.collectedAnswers));
  const missingInfo = path.questions
    .filter((question) => !answeredIds.has(question.id))
    .map((question) => question.prompt);

  const allText = `${state.initialMessage} ${Object.values(state.collectedAnswers).join(" ")}`.toLowerCase();
  const urgency = detectUrgency(allText);
  const readiness = computeReadinessScore(state, path);

  return {
    detectedNeed: path.detectedNeedLabel,
    domain: path.label,
    urgency,
    maturity: readinessToMaturity(readiness),
    suggestedServices: path.services.map((service) => service.label),
    missingInfo,
    nextStep: readiness >= 65 ? path.nextActionWhenReady : "Continuam colectarea datelor pentru clarificare tehnica.",
  };
}

function computeReadinessScore(state: ZESConversationState, path: ZESPathConfig) {
  const total = path.questions.length || 1;
  const answered = Object.keys(state.collectedAnswers).length;
  return Math.round((answered / total) * 100);
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

function buildClosingMessage(snapshot: ZESLeadSnapshot) {
  if (snapshot.urgency === "critica" || snapshot.maturity === "pregatit-pentru-oferta") {
    return "Din ce ai descris, pare o cerere cu potential ridicat. Urmatorul pas logic este sa trimiti datele catre echipa ZESCORP.";
  }

  if (snapshot.maturity === "pregatit-pentru-analiza") {
    return "Ai deja suficiente informatii pentru o discutie cu un specialist. ZES recomanda trimiterea contextului pentru analiza tehnica.";
  }

  return "Pentru a reveni cu o directie tehnica sau oferta, ZES recomanda completarea datelor de contact dupa acest rezumat.";
}

function defaultDocumentHint() {
  return "Daca ai o schita, plan sau lista de echipamente, ZES poate folosi aceste informatii in pasul urmator. Momentan analiza documentelor este in mod demo; pentru proiect real, echipa ZESCORP poate verifica planurile manual.";
}

function route(
  label: string,
  href: string,
  kind: ZESGuideRoutingTarget["kind"],
  availability: ZESGuideRoutingTarget["availability"] = "available",
): ZESGuideRoutingTarget {
  return { label, href, kind, availability };
}
