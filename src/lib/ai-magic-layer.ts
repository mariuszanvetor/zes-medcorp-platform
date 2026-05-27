import type {
  IntelligenceInput,
  IntelligenceIntent,
  MedicalDomainId,
  ProjectStage,
} from "@/lib/ai-intelligence/types";

export type AiMagicScenarioId =
  | "ct-clinic"
  | "mri-room"
  | "imaging-expansion"
  | "radiology-modernization"
  | "service-maintenance";

export type AiMagicScenario = {
  id: AiMagicScenarioId;
  label: string;
  userPrompt: string;
  description: string;
  projectType: string;
};

export type AiMagicRecommendation = {
  label: string;
  href: string;
  reason: string;
};

export type AiMagicAnalysis = {
  scenario: AiMagicScenario;
  assistantResponse: string;
  guidedQuestions: string[];
  projectConcerns: string[];
  likelyMissingItems: string[];
  recommendedNextSteps: string[];
  suggestedServices: AiMagicRecommendation[];
  commercialOpportunityType: string;
  likelyUrgency: "exploratory" | "planning" | "active" | "urgent";
  projectMaturity: "early" | "defined" | "technical-review" | "commercial-ready";
  planningReadiness: number;
  commercialReadiness: number;
  infrastructureComplexity: "moderate" | "high" | "critical";
  salesSignals: string[];
  statusLabels: string[];
  safetyNote: string;
};

export const aiMagicScenarios: AiMagicScenario[] = [
  {
    id: "ct-clinic",
    label: "CT clinic",
    userPrompt: "Vreau sa deschid o zona CT intr-o clinica privata.",
    description: "Planificare pentru CT, radioprotectie, flux pacienti si validari preliminare.",
    projectType: "CT / radiologie",
  },
  {
    id: "mri-room",
    label: "Camera RMN",
    userPrompt: "Trebuie sa pregatesc o camera RMN si nu stiu ce verificari sunt critice.",
    description: "Clarificare RF shielding, acces magnet, HVAC, electric si documentatie furnizor.",
    projectType: "RMN / RF shielding",
  },
  {
    id: "imaging-expansion",
    label: "Extindere imagistica",
    userPrompt: "Clinica exista deja si vrem sa adaugam imagistica medicala.",
    description: "Evaluare pentru extindere, echipamente, infrastructura si implementare etapizata.",
    projectType: "Extindere imagistica",
  },
  {
    id: "radiology-modernization",
    label: "Modernizare radiologie",
    userPrompt: "Avem radiologie existenta si vrem modernizare fara blocaj operational major.",
    description: "Prioritizare pentru upgrade, downtime, fluxuri, riscuri si continuitate operationala.",
    projectType: "Modernizare radiologie",
  },
  {
    id: "service-maintenance",
    label: "Service / mentenanta",
    userPrompt: "Avem echipamente medicale cu risc de downtime si vrem un plan de service.",
    description: "Triage pentru service, mentenanta preventiva, piese si continuitate.",
    projectType: "Service aparatura",
  },
];

const baseSafetyNote =
  "Recomandarile sunt preliminare si deterministe. Nu reprezinta proiectare finala, aprobare reglementara sau oferta comerciala ferma.";

export type AiMagicDiscoverySeed = {
  scenarioId: AiMagicScenarioId;
  contextPatch: Partial<IntelligenceInput>;
  scenarioSummary: string;
};

export function parseAiMagicScenarioId(
  value: string | null | undefined,
): AiMagicScenarioId | null {
  if (!value) return null;
  const validIds = new Set(aiMagicScenarios.map((scenario) => scenario.id));
  return validIds.has(value as AiMagicScenarioId)
    ? (value as AiMagicScenarioId)
    : null;
}

export function createAiMagicDiscoverySeed(
  scenarioId: AiMagicScenarioId,
): AiMagicDiscoverySeed {
  const analysis = createAiMagicAnalysis(scenarioId);
  const stageMap: Record<AiMagicScenarioId, ProjectStage> = {
    "ct-clinic": "budgeting",
    "mri-room": "feasibility",
    "imaging-expansion": "feasibility",
    "radiology-modernization": "design",
    "service-maintenance": "active-issue",
  };
  const intentMap: Record<AiMagicScenarioId, IntelligenceIntent> = {
    "ct-clinic": "new-project",
    "mri-room": "equipment-acquisition",
    "imaging-expansion": "modernization",
    "radiology-modernization": "modernization",
    "service-maintenance": "service-issue",
  };
  const domainMap: Record<AiMagicScenarioId, MedicalDomainId[]> = {
    "ct-clinic": [
      "ct",
      "radiology",
      "medical-electrical",
      "hvac",
      "healthcare-infrastructure",
    ],
    "mri-room": [
      "mri",
      "radiology",
      "medical-electrical",
      "hvac",
      "ups-power",
    ],
    "imaging-expansion": [
      "clinic-modernization",
      "radiology",
      "ct",
      "mri",
      "operational-workflow",
      "medical-electrical",
      "hvac",
    ],
    "radiology-modernization": [
      "clinic-modernization",
      "radiology",
      "medical-electrical",
      "hvac",
      "operational-workflow",
    ],
    "service-maintenance": [
      "operational-workflow",
      "medical-electrical",
      "ups-power",
      "radiology",
    ],
  };
  const urgencyTextMap: Record<AiMagicAnalysis["likelyUrgency"], string> = {
    exploratory: "Exploratory",
    planning: "3-6 months",
    active: "1-3 months",
    urgent: "Immediate",
  };
  const currentDomains = domainMap[scenarioId];
  const contextPatch: Partial<IntelligenceInput> = {
    intent: intentMap[scenarioId],
    projectStage: stageMap[scenarioId],
    domains: currentDomains,
    urgency: urgencyTextMap[analysis.likelyUrgency],
    existingBuilding:
      scenarioId === "imaging-expansion" ||
      scenarioId === "radiology-modernization" ||
      scenarioId === "service-maintenance",
    modernization:
      scenarioId === "imaging-expansion" ||
      scenarioId === "radiology-modernization",
    budgetKnown: analysis.commercialReadiness >= 65,
    timelineKnown: analysis.likelyUrgency === "active" || analysis.likelyUrgency === "urgent",
    plansAvailable: false,
    equipmentSpecsAvailable: false,
    locationKnown: false,
    surfaceKnown: false,
  };

  return {
    scenarioId,
    contextPatch,
    scenarioSummary: [
      `Scenario AI Magic: ${analysis.scenario.label}.`,
      `Opportunity: ${analysis.commercialOpportunityType}.`,
      `Planning readiness: ${analysis.planningReadiness}/100.`,
      `Commercial readiness: ${analysis.commercialReadiness}/100.`,
      `Complexity: ${analysis.infrastructureComplexity}.`,
      `Top concerns: ${analysis.projectConcerns.slice(0, 2).join("; ")}.`,
    ].join(" "),
  };
}

export function createAiMagicAnalysis(
  scenarioId: AiMagicScenarioId = "ct-clinic",
): AiMagicAnalysis {
  const scenario =
    aiMagicScenarios.find((item) => item.id === scenarioId) ?? aiMagicScenarios[0];

  if (scenario.id === "mri-room") {
    return {
      scenario,
      assistantResponse:
        "Pentru RMN, primul pas este separarea cerintelor RF shielding de restul infrastructurii: acces magnet, HVAC, electric, structura si conditiile echipamentului ales.",
      guidedQuestions: [
        "Este stabilit modelul RMN sau doar clasa generala, de exemplu 1.5T / 3T?",
        "Exista planuri ale camerei, traseu de acces si date despre structura cladirii?",
        "Sunt cunoscute cerintele furnizorului pentru HVAC, electric, quench si instalare?",
      ],
      projectConcerns: [
        "RF shielding si camera Faraday trebuie tratate separat de radioprotectie.",
        "Accesul magnetului si limitarile structurale pot schimba calendarul.",
        "HVAC, electric si eventualul quench pipe depind de echipamentul final.",
      ],
      likelyMissingItems: [
        "Fisa tehnica echipament RMN",
        "Plan camera si traseu acces",
        "Date HVAC/electric existente",
        "Ipoteze de instalare si testare RF",
      ],
      recommendedNextSteps: [
        "Validare preliminara camera RMN si traseu de acces",
        "Estimare orientativa RF shielding si infrastructura",
        "Pregatire context pentru Proposal Builder",
      ],
      suggestedServices: [
        service("RF shielding pentru RMN", "/services/rf-shielding", "Necesara pentru camera Faraday, usi RF, filtre si validare RF."),
        service("Imagistica medicala", "/services/imagistica-medicala", "Ajuta la corelarea echipamentului cu cerintele de instalare."),
        service("Planificare infrastructura imagistica", "/servicii/planificare-infrastructura-imagistica", "Leaga camera, utilitatile si implementarea intr-un traseu coerent."),
      ],
      commercialOpportunityType: "proiect imagistica cu infrastructura specializata",
      likelyUrgency: "planning",
      projectMaturity: "technical-review",
      planningReadiness: 68,
      commercialReadiness: 58,
      infrastructureComplexity: "critical",
      salesSignals: ["RF shielding", "HVAC/electric", "acces magnet", "validare tehnica"],
      statusLabels: ["AI-assisted demo", "guided planning mode", "deterministic mock intelligence"],
      safetyNote: baseSafetyNote,
    };
  }

  if (scenario.id === "imaging-expansion") {
    return {
      scenario,
      assistantResponse:
        "Pentru o extindere de imagistica, decizia importanta este daca spatiul existent poate sustine echipamentele, fluxul pacientilor, autorizarea si continuitatea operationala.",
      guidedQuestions: [
        "Ce modalitati sunt vizate: CT, RMN, RX, ecografie sau o combinatie?",
        "Spatiul este deja medical sau necesita conversie / reamenajare?",
        "Exista un calendar tinta si o limita acceptabila de downtime?",
      ],
      projectConcerns: [
        "Multi-vendor si integrarea etapizata pot creste complexitatea.",
        "Fluxul pacientilor si zonele de asteptare trebuie corelate cu aparatura.",
        "Radioprotectia sau RF shielding apar doar daca modalitatea le necesita.",
      ],
      likelyMissingItems: [
        "Lista echipamentelor vizate",
        "Planuri si suprafete disponibile",
        "Calendar implementare",
        "Restrictii operationale in clinica existenta",
      ],
      recommendedNextSteps: [
        "Workshop scurt de selectie modalitati si spatii",
        "Estimare orientativa infrastructura radiologie",
        "Project Intake pentru context complet",
      ],
      suggestedServices: [
        service("Imagistica medicala", "/services/imagistica-medicala", "Coordoneaza echipamente, cerinte furnizor si integrare."),
        service("Amenajari medicale", "/services/amenajari-medicale", "Relevanta pentru conversii, fluxuri si spatii existente."),
        service("Management implementare proiect medical", "/servicii/management-implementare-proiect-medical", "Ajuta la etapizare si coordonare operationala."),
      ],
      commercialOpportunityType: "extindere comerciala cu potential multi-serviciu",
      likelyUrgency: "planning",
      projectMaturity: "defined",
      planningReadiness: 61,
      commercialReadiness: 64,
      infrastructureComplexity: "high",
      salesSignals: ["multi-modalitate", "spatiu existent", "etapizare", "flux pacienti"],
      statusLabels: ["AI-assisted demo", "sales-aware guidance", "deterministic mock intelligence"],
      safetyNote: baseSafetyNote,
    };
  }

  if (scenario.id === "radiology-modernization") {
    return {
      scenario,
      assistantResponse:
        "Pentru modernizarea radiologiei, copilotul trateaza proiectul ca o combinatie intre risc operational, continuitate, infrastructura existenta si cerinte noi ale echipamentelor.",
      guidedQuestions: [
        "Ce echipamente raman active si ce echipamente se inlocuiesc?",
        "Care este downtime-ul maxim acceptabil?",
        "Exista documentatie existenta pentru radioprotectie, instalatii si fluxuri?",
      ],
      projectConcerns: [
        "Downtime-ul poate fi mai important decat costul izolat al unei lucrari.",
        "Echipamentele noi pot cere reevaluare electrica, HVAC sau radioprotectie.",
        "Executia etapizata necesita secventiere clara si plan de continuitate.",
      ],
      likelyMissingItems: [
        "Inventar echipamente existente",
        "Istoric service si incidente",
        "Documentatie radioprotectie / camera",
        "Plan de continuitate operationala",
      ],
      recommendedNextSteps: [
        "Audit tehnic al radiologiei existente",
        "Plan de modernizare etapizata",
        "Evaluare service si mentenanta pentru echipamente critice",
      ],
      suggestedServices: [
        service("Modernizare clinica medicala", "/servicii/modernizare-clinica-medicala", "Potrivit pentru prioritizare, etapizare si reducerea downtime-ului."),
        service("Radiologie", "/services/radiologie", "Relevanta pentru camere RX/CT si coordonarea cerintelor tehnice."),
        service("Service aparatura medicala", "/services/service-aparatura-medicala", "Ajuta la continuitate si planificarea mentenantei."),
      ],
      commercialOpportunityType: "modernizare cu risc operational si potential service",
      likelyUrgency: "active",
      projectMaturity: "technical-review",
      planningReadiness: 72,
      commercialReadiness: 69,
      infrastructureComplexity: "high",
      salesSignals: ["downtime", "modernizare", "service", "etapizare"],
      statusLabels: ["AI-assisted demo", "guided planning mode", "commercial readiness"],
      safetyNote: baseSafetyNote,
    };
  }

  if (scenario.id === "service-maintenance") {
    return {
      scenario,
      assistantResponse:
        "Pentru service, copilotul prioritizeaza impactul operational: simptome, echipament, istoric, piese, urgenta si riscul de oprire.",
      guidedQuestions: [
        "Ce echipament este afectat si care este modelul / seria?",
        "Problema opreste activitatea sau doar reduce capacitatea?",
        "Exista istoric de service, coduri de eroare sau piese suspecte?",
      ],
      projectConcerns: [
        "Urgenta depinde de downtime si de rolul echipamentului in flux.",
        "Piesele si disponibilitatea specialistilor trebuie planificate realist.",
        "Mentenanta preventiva poate reduce repetarea incidentelor.",
      ],
      likelyMissingItems: [
        "Model, serie si vechime echipament",
        "Descriere simptom / cod eroare",
        "Istoric interventii",
        "Impact asupra programarilor",
      ],
      recommendedNextSteps: [
        "Triage service si colectare date echipament",
        "Plan preventiv pentru echipamente critice",
        "Stabilire piese si fereastra de interventie",
      ],
      suggestedServices: [
        service("Service aparatura medicala", "/services/service-aparatura-medicala", "Punctul principal pentru diagnostic, mentenanta si continuitate."),
        service("Service Diagnostic", "/service-diagnostic", "Instrument rapid pentru trierea problemei."),
        service("Project Intake", "/project-intake", "Util pentru centralizarea datelor inainte de discutia tehnica."),
      ],
      commercialOpportunityType: "service cu potential contract mentenanta",
      likelyUrgency: "urgent",
      projectMaturity: "technical-review",
      planningReadiness: 74,
      commercialReadiness: 72,
      infrastructureComplexity: "moderate",
      salesSignals: ["downtime", "mentenanta", "piese", "continuitate"],
      statusLabels: ["AI-assisted demo", "service triage", "deterministic mock intelligence"],
      safetyNote: baseSafetyNote,
    };
  }

  return {
    scenario,
    assistantResponse:
      "Pentru un proiect CT, copilotul separa rapid deciziile comerciale de cerintele tehnice: echipament, camera, radioprotectie, CNCAN, electric, HVAC si flux pacienti.",
    guidedQuestions: [
      "Este ales echipamentul CT sau sunt comparate mai multe variante?",
      "Exista plan camera, vecinatati si informatii despre spatiile adiacente?",
      "Care este stadiul autorizarii si cine coordoneaza radioprotectia?",
    ],
    projectConcerns: [
      "Radioprotectia si cerintele CNCAN trebuie tratate separat de estimarea generala de amenajare.",
      "HVAC, electric si sarcina pe cladire depind de echipamentul final.",
      "Fluxul pacientilor si accesul echipamentului pot modifica planul initial.",
    ],
    likelyMissingItems: [
      "Fisa tehnica echipament CT",
      "Plan camera si vecinatati",
      "Status CNCAN / documentatie radioprotectie",
      "Cerintele HVAC si electrice ale furnizorului",
    ],
    recommendedNextSteps: [
      "Validare preliminara camera CT",
      "Estimare orientativa radioprotectie",
      "Project Intake pentru colectarea datelor de proiect",
    ],
    suggestedServices: [
      service("Protectie radiologica", "/services/protectie-radiologica", "Pentru CT/RX, plumb, zone controlate si coordonare CNCAN."),
      service("Proiectare camera CT", "/servicii/proiectare-camera-ct", "Pentru camera, fluxuri, utilitati si cerinte furnizor."),
      service("Radiology Room Planner", "/radiology-room-planner", "Pentru separarea cerintelor CT/RX de RMN/RF."),
    ],
    commercialOpportunityType: "proiect CT cu intent comercial ridicat",
    likelyUrgency: "planning",
    projectMaturity: "defined",
    planningReadiness: 66,
    commercialReadiness: 70,
    infrastructureComplexity: "high",
    salesSignals: ["CNCAN", "radioprotectie", "HVAC/electric", "flux pacienti"],
    statusLabels: ["AI-assisted demo", "guided planning mode", "deterministic mock intelligence"],
    safetyNote: baseSafetyNote,
  };
}

function service(label: string, href: string, reason: string): AiMagicRecommendation {
  return { label, href, reason };
}
