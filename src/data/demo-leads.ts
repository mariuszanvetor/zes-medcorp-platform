import type { LeadPriority } from "@/lib/lead-scoring";

export const leadStatuses = [
  "Nou",
  "De calificat",
  "Prioritar",
  "Contactat",
  "În analiză",
  "Propunere",
  "Închis",
] as const;

export const leadRiskLevels = ["Redus", "Mediu", "Ridicat", "Critic"] as const;

export const leadPriorities = [
  "Low priority",
  "Medium priority",
  "High priority",
  "Critical / immediate opportunity",
] as const satisfies readonly LeadPriority[];

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadRiskLevel = (typeof leadRiskLevels)[number];

export type DemoLead = {
  id: string;
  sourceTool: string;
  sourcePage: string;
  projectType: string;
  inquiryType: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  urgency: string;
  estimatedBudgetRange: string;
  complexity: string;
  riskLevel: LeadRiskLevel;
  readinessScore: number;
  leadScore: number;
  priority: LeadPriority;
  status: LeadStatus;
  recommendedNextStep: string;
  recommendedServices: string[];
  projectDomain?: string;
  intelligenceSummary?: string;
  mockDocumentContext?: {
    mode: "mock";
    fileType: string;
    label: string;
    targetFlows: string[];
    mockSignals: string[];
    missingInformation: string[];
    privacyWarnings: string[];
    suggestedNextAction: string;
  };
  sourceContext?: string;
  followUpPriority?: LeadPriority;
  followUpType?:
    | "educational-nurture"
    | "technical-clarification"
    | "proposal-preparation"
    | "urgent-technical-review";
  commercialIntent?: "low" | "medium" | "high";
  confidenceLevel?: "low" | "medium" | "high";
  validationNeeds?: string[];
  recommendedCalculators?: Array<{ label: string; href: string }>;
  missingInformation: string[];
  createdAt: string;
  lastActionAt: string;
  notes: string;
  generatedSummary: string;
  assumptions: string[];
  scoreRationale: string[];
};

export const demoLeads: DemoLead[] = [
  {
    id: "ZES-LEAD-1300",
    sourceTool: "ZES Guide",
    sourcePage: "/",
    projectType: "Service urgent imagistica",
    inquiryType: "ZES Guide conversation / service",
    company: "Service Demo Clinic",
    contactName: "Monica Petrescu",
    email: "monica.petrescu@demo.invalid",
    phone: "+40 731 222 119",
    urgency: "Urgent",
    estimatedBudgetRange: "Evaluare service",
    complexity: "Service triage",
    riskLevel: "Critic",
    readinessScore: 71,
    leadScore: 85,
    priority: "Critical / immediate opportunity",
    status: "Prioritar",
    recommendedNextStep:
      "Contact prioritar pentru triere service si colectare coduri eroare/model.",
    recommendedServices: [
      "Service aparatura medicala",
      "Service diagnostic",
      "Mentenanta preventiva",
    ],
    projectDomain: "Service / mentenanta",
    intelligenceSummary:
      "Lead generat din ZES Guide pe flux service, cu intent ridicat si risc operational critic.",
    sourceContext: "ZES Guide / homepage conversation",
    followUpPriority: "Critical / immediate opportunity",
    followUpType: "urgent-technical-review",
    commercialIntent: "high",
    confidenceLevel: "medium",
    validationNeeds: [
      "Confirmare model/serie echipament",
      "Confirmare cod eroare si impact operational",
      "Stabilire fereastra de interventie",
    ],
    recommendedCalculators: [
      { label: "Service aparatura", href: "/calculatoare/service-aparatura" },
    ],
    missingInformation: [
      "Model exact echipament",
      "Durata exacta downtime",
      "Contract mentenanta existent",
    ],
    createdAt: "2026-05-27T08:10:00.000Z",
    lastActionAt: "2026-05-27T08:22:00.000Z",
    notes:
      "Demo lead ZES Guide. Conversatie orientata spre trimitere cerere service prioritara.",
    generatedSummary:
      "ZES Guide a detectat service urgent cu risc operational critic. Recomandat: contact prioritar si triere tehnica.",
    assumptions: [
      "Echipamentul este indisponibil sau degradat functional.",
      "Datele tehnice complete nu sunt inca colectate.",
    ],
    scoreRationale: [
      "Sursa ZES Guide cu intent ridicat.",
      "Urgenta critica si impact operational.",
      "Follow-up recomandat: urgent-technical-review.",
    ],
  },
  {
    id: "ZES-LEAD-1301",
    sourceTool: "ZES Guide",
    sourcePage: "/",
    projectType: "Proiect CT clinic nou",
    inquiryType: "ZES Guide conversation / proiect",
    company: "CT Demo Project",
    contactName: "Florin Negoita",
    email: "florin.negoita@demo.invalid",
    phone: "+40 733 555 121",
    urgency: "1-3 luni",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "CT / radiologie",
    riskLevel: "Ridicat",
    readinessScore: 66,
    leadScore: 79,
    priority: "High priority",
    status: "De calificat",
    recommendedNextStep:
      "Pregatire cerere proiect cu date de camera, utilitati si status CNCAN.",
    recommendedServices: [
      "Proiectare camera CT",
      "Protectie radiologica",
      "Planificare infrastructura imagistica",
    ],
    projectDomain: "CT / radiologie",
    intelligenceSummary:
      "Lead ZES Guide pentru proiect CT cu readiness moderat si nevoie de clarificari tehnice.",
    sourceContext: "ZES Guide / homepage conversation",
    followUpPriority: "High priority",
    followUpType: "proposal-preparation",
    commercialIntent: "high",
    confidenceLevel: "medium",
    validationNeeds: [
      "Plan camera si vecinatati",
      "Status CNCAN",
      "Necesitati HVAC/electric",
    ],
    recommendedCalculators: [
      { label: "Estimare cost camera CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Estimare radioprotectie CT", href: "/calculatoare/radioprotectie-ct-estimare" },
    ],
    missingInformation: [
      "Schita/plan spatiu",
      "Buget final",
      "Termen implementare confirmat",
    ],
    createdAt: "2026-05-27T08:25:00.000Z",
    lastActionAt: "2026-05-27T08:29:00.000Z",
    notes:
      "Demo lead ZES Guide cu focus pe ofertare proiect CT si validare tehnica.",
    generatedSummary:
      "ZES Guide a detectat proiect CT cu intent comercial bun, dar datele de infrastructura trebuie completate pentru ofertare.",
    assumptions: [
      "Proiectul este in etapa de planificare activa.",
      "Echipamentul este in selectie sau preselectie.",
    ],
    scoreRationale: [
      "Sursa ZES Guide",
      "Intent comercial ridicat pentru proiect CT",
      "Readiness mediu cu nevoi clare de clarificare.",
    ],
  },
  {
    id: "ZES-LEAD-1200",
    sourceTool: "AI Discovery",
    sourcePage: "/ai-discovery",
    projectType: "Modernizare clinica cu imagistica",
    inquiryType: "AI discovery workspace",
    company: "Demo Medical Intelligence",
    contactName: "Simona Radu",
    email: "simona.radu@demo.invalid",
    phone: "+40 766 000 111",
    urgency: "1-3 luni",
    estimatedBudgetRange: "De validat dupa planuri",
    complexity: "Advanced",
    riskLevel: "Ridicat",
    readinessScore: 67,
    leadScore: 82,
    priority: "Critical / immediate opportunity",
    status: "Prioritar",
    recommendedNextStep:
      "Contact rapid pentru clarificarea spatiului, echipamentelor si documentatiei inainte de propunere.",
    recommendedServices: [
      "Analiza tehnica preliminara",
      "Planificare infrastructura imagistica",
      "Modernizare clinica medicala",
      "Coordonare HVAC/electric/UPS",
    ],
    projectDomain: "Modernizare + imagistica",
    intelligenceSummary:
      "Demo AI Discovery cu context documentar mock. Necesita validare pe planuri, echipamente, HVAC/electric si autorizari.",
    mockDocumentContext: {
      mode: "mock",
      fileType: "PDF",
      label: "Plan camera / brief proiect demo",
      targetFlows: ["AI Discovery", "Proposal Builder", "Project Intake", "Lead Intelligence"],
      mockSignals: [
        "plan camera",
        "cerinte echipamente imagistica",
        "posibile constrangeri HVAC/electric",
      ],
      missingInformation: [
        "dimensiuni confirmate",
        "versiune plan",
        "fisa echipament finala",
      ],
      privacyWarnings: [
        "mock only: nu exista fisier incarcat",
        "nu include date pacienti sau continut documentar brut",
      ],
      suggestedNextAction:
        "Cereti planul real si fisele tehnice inainte de propunerea tehnica.",
    },
    sourceContext: "AI Discovery / context local importat",
    followUpPriority: "Critical / immediate opportunity",
    followUpType: "urgent-technical-review",
    commercialIntent: "high",
    confidenceLevel: "medium",
    validationNeeds: [
      "Planuri si releveu pentru spatiul existent",
      "Lista echipamentelor propuse",
      "Verificare HVAC, electric si UPS",
      "Clarificare DSP/CNCAN unde este aplicabil",
    ],
    recommendedCalculators: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Estimare infrastructura radiologie", href: "/calculatoare/infrastructura-radiologie-estimare" },
    ],
    missingInformation: [
      "Planuri si dimensiuni confirmate",
      "Lista echipamentelor imagistica",
      "Status documentatie si autorizari",
      "Buget tinta si calendar decizie",
    ],
    createdAt: "2026-05-27T07:30:00.000Z",
    lastActionAt: "2026-05-27T07:45:00.000Z",
    notes:
      "Lead demo generat din AI Discovery. Bun pentru review tehnic rapid si preluare in Proposal Builder.",
    generatedSummary:
      "AI Discovery indica modernizare clinica cu imagistica, risc ridicat, readiness mediu si nevoie de validare pe planuri, HVAC, electric, UPS si documentatie.",
    assumptions: [
      "Spatiul exista si necesita fazare.",
      "Echipamentele nu sunt complet blocate.",
      "Contextul este preliminar si trebuie validat tehnic.",
    ],
    scoreRationale: [
      "AI Discovery furnizeaza context structurat.",
      "Modernizarea si imagistica cresc riscul tehnic.",
      "Urgenta 1-3 luni justifica follow-up rapid.",
    ],
  },
  {
    id: "ZES-LEAD-1101",
    sourceTool: "Project Intake",
    sourcePage: "/project-intake",
    projectType: "Clinică nouă cu imagistică și IVD",
    inquiryType: "Project intake tehnic",
    company: "Demo Healthcare Group",
    contactName: "Andrei Popescu",
    email: "andrei.popescu@demo.invalid",
    phone: "+40 722 111 222",
    urgency: "1-3 luni",
    estimatedBudgetRange: "EUR 550k+",
    complexity: "High-complexity medical infrastructure",
    riskLevel: "Critic",
    readinessScore: 74,
    leadScore: 91,
    priority: "Critical / immediate opportunity",
    status: "Prioritar",
    recommendedNextStep:
      "Programează analiză tehnică și solicită planuri, listă echipamente și status DSP/CNCAN.",
    recommendedServices: [
      "Construcții și amenajări medicale",
      "Radiologie și camere imagistică",
      "IVD / laborator",
      "Aparatură medicală",
      "Service și mentenanță",
    ],
    projectDomain: "Clinica noua / imagistica / IVD",
    intelligenceSummary:
      "Demo Project Intake cu readiness ridicat si risc critic; potrivit pentru analiza tehnica si triere rapida.",
    missingInformation: [
      "Planuri și releveu",
      "Lista echipamentelor imagistică / IVD",
      "Status DSP și CNCAN",
      "Calendar de decizie și buget țintă",
    ],
    createdAt: "2026-05-21T08:20:00.000Z",
    lastActionAt: "2026-05-21T09:05:00.000Z",
    notes:
      "Lead demo cu intenție ridicată. Necesită consultant tehnic senior și clarificare rapidă a etapelor.",
    generatedSummary:
      "Proiect de clinică nouă cu zone de imagistică, laborator IVD și integrare aparatură. Intake-ul indică buget mare, calendar apropiat și risc tehnic critic.",
    assumptions: [
      "Spațiul este disponibil, dar documentația nu este completă.",
      "Radiologia poate include atât RMN, cât și CT/RX.",
      "Laboratorul IVD trebuie corelat cu fluxul clinicii.",
    ],
    scoreRationale: [
      "Project Intake indică lead cu context structurat.",
      "Buget orientativ ridicat și termen apropiat.",
      "Radiologie, IVD și aparatură activează mai multe servicii ZES.",
    ],
  },
  {
    id: "ZES-LEAD-1102",
    sourceTool: "Proposal Builder",
    sourcePage: "/proposal-builder",
    projectType: "Cameră RMN cu RF shielding",
    inquiryType: "Propunere preliminară RMN",
    company: "Imaging Demo Center",
    contactName: "Ioana Marin",
    email: "ioana.marin@demo.invalid",
    phone: "+40 733 222 333",
    urgency: "3-6 luni",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "Enterprise",
    riskLevel: "Ridicat",
    readinessScore: 82,
    leadScore: 86,
    priority: "Critical / immediate opportunity",
    status: "Propunere",
    recommendedNextStep:
      "Solicită fișa echipamentului RMN și validează RF shielding, acces magnet, HVAC și vibrații.",
    recommendedServices: [
      "RF shielding pentru RMN",
      "Imagistică medicală",
      "Integrare aparatură",
      "Consultanță tehnică",
    ],
    projectDomain: "RMN / RF shielding",
    intelligenceSummary:
      "Demo Proposal Builder pentru camera RMN; context suficient pentru propunere preliminara, dar lipsesc fisa RMN si date RF.",
    missingInformation: [
      "Fișă tehnică RMN",
      "Dimensiuni cameră și acces magnet",
      "Nivel RF attenuation cerut",
      "Trasee HVAC, filtre și waveguides",
    ],
    createdAt: "2026-05-20T11:10:00.000Z",
    lastActionAt: "2026-05-20T15:35:00.000Z",
    notes:
      "Clarificați explicit că RMN cere RF shielding / cușcă Faraday, nu ecranare cu plumb.",
    generatedSummary:
      "Camera RMN necesită RF shielding, cușcă Faraday, ușă RF, filtre, waveguides, HVAC, vibrații și verificarea accesului magnetului.",
    assumptions: [
      "Echipamentul RMN este în selecție finală.",
      "Camera este într-o clădire medicală existentă.",
      "HVAC-ul trebuie confirmat cu furnizorul echipamentului.",
    ],
    scoreRationale: [
      "Proposal Builder indică intenție de pre-ofertare.",
      "RMN și RF shielding au complexitate tehnică ridicată.",
      "Readiness bun, dar riscul rămâne ridicat până la validarea camerei.",
    ],
  },
  {
    id: "ZES-LEAD-1103",
    sourceTool: "Radiology Room Planner",
    sourcePage: "/radiology-room-planner",
    projectType: "Cameră CT / radiologie",
    inquiryType: "Planificare cameră CT",
    company: "Clinica Demo Nord",
    contactName: "Mihai Ionescu",
    email: "mihai.ionescu@demo.invalid",
    phone: "+40 744 333 444",
    urgency: "Imediat",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "Advanced",
    riskLevel: "Critic",
    readinessScore: 52,
    leadScore: 94,
    priority: "Critical / immediate opportunity",
    status: "Prioritar",
    recommendedNextStep:
      "Verifică status CNCAN, vecinătăți, zone controlate și protecția radiologică înainte de execuție.",
    recommendedServices: [
      "Protecție radiologică / plumb",
      "Radiologie",
      "Consultanță CNCAN",
      "Integrare aparatură CT",
    ],
    missingInformation: [
      "Calcul radioprotecție",
      "Vecinătăți și zone controlate",
      "Status documentație CNCAN",
      "Plan final cameră",
    ],
    createdAt: "2026-05-21T07:45:00.000Z",
    lastActionAt: "2026-05-21T08:10:00.000Z",
    notes:
      "Lead demo urgent. Nu se discută RF shielding aici; focusul este protecție radiologică și CNCAN.",
    generatedSummary:
      "Camera CT activează protecție radiologică, ecranare cu plumb, zone controlate și coordonare CNCAN. RF shielding nu este cerința principală.",
    assumptions: [
      "Spațiul este deja în execuție.",
      "Echipamentul CT a fost selectat.",
      "Documentația CNCAN nu este finalizată.",
    ],
    scoreRationale: [
      "Urgență imediată.",
      "Risc critic și potențial blocaj CNCAN.",
      "Buget și complexitate semnificative.",
    ],
  },
  {
    id: "ZES-LEAD-1104",
    sourceTool: "Calculator laborator IVD",
    sourcePage: "/calculatoare/cost-laborator-ivd",
    projectType: "Laborator IVD cu integrare LIS",
    inquiryType: "Laborator / IVD",
    company: "Lab Demo Solutions",
    contactName: "Elena Dobre",
    email: "elena.dobre@demo.invalid",
    phone: "+40 755 444 555",
    urgency: "3-6 luni",
    estimatedBudgetRange: "EUR 60k-180k",
    complexity: "Advanced",
    riskLevel: "Mediu",
    readinessScore: 69,
    leadScore: 71,
    priority: "High priority",
    status: "De calificat",
    recommendedNextStep:
      "Clarifică fluxul probelor, lista echipamentelor IVD, integrarea LIS și planul de service.",
    recommendedServices: [
      "IVD / laborator",
      "Aparatură medicală",
      "Integrare echipamente",
      "Service și mentenanță",
    ],
    missingInformation: [
      "Lista analizelor",
      "Volum probe estimat",
      "Cerințe LIS",
      "Consumabile, calibrare și QC",
    ],
    createdAt: "2026-05-20T12:30:00.000Z",
    lastActionAt: "2026-05-20T12:30:00.000Z",
    notes:
      "Lead potrivit pentru calificare tehnică și discuție despre service recurent.",
    generatedSummary:
      "Laboratorul necesită structurare pe flux probe, utilități, echipamente IVD, calibrare, validare, QC și mentenanță.",
    assumptions: [
      "Volumul de probe este mediu.",
      "Integrarea LIS este necesară.",
      "Contractul service nu este definit.",
    ],
    scoreRationale: [
      "Calculator IVD arată evaluare activă.",
      "Buget definit și readiness peste medie.",
      "Mentenanța poate genera relație recurentă.",
    ],
  },
  {
    id: "ZES-LEAD-1105",
    sourceTool: "Service Diagnostic",
    sourcePage: "/service-diagnostic",
    projectType: "RMN cu eroare sistem",
    inquiryType: "Service aparatură",
    company: "Diagnostic Demo Clinic",
    contactName: "Radu Enache",
    email: "radu.enache@demo.invalid",
    phone: "+40 766 555 666",
    urgency: "24-48 ore",
    estimatedBudgetRange: "Evaluare service",
    complexity: "Scor urgență 86/100",
    riskLevel: "Critic",
    readinessScore: 48,
    leadScore: 88,
    priority: "Critical / immediate opportunity",
    status: "Contactat",
    recommendedNextStep:
      "Colectează coduri eroare, istoric service, model/serie și programează evaluare tehnică.",
    recommendedServices: [
      "Service aparatură medicală",
      "Service imagistică",
      "Mentenanță preventivă",
      "Evaluare tehnică ZES",
    ],
    projectDomain: "Service / mentenanta imagistica",
    intelligenceSummary:
      "Demo high-urgency service lead cu potential downtime; cere triere rapida si colectarea codurilor de eroare.",
    missingInformation: [
      "Model și serie",
      "Coduri de eroare",
      "Data ultimei mentenanțe",
      "Contract service existent",
    ],
    createdAt: "2026-05-21T06:15:00.000Z",
    lastActionAt: "2026-05-21T06:40:00.000Z",
    notes:
      "Lead demo de service cu downtime potențial. Prioritate pentru triere rapidă.",
    generatedSummary:
      "Echipament RMN cu eroare sistem și impact operațional ridicat. Posibil downtime, necesitând triere tehnică și verificare service.",
    assumptions: [
      "Echipamentul afectează programările.",
      "Nu există istoric complet de service în formular.",
      "Codurile de eroare trebuie validate.",
    ],
    scoreRationale: [
      "Service Diagnostic și risc critic.",
      "Urgență 24-48 ore.",
      "Downtime operațional posibil.",
    ],
  },
  {
    id: "ZES-LEAD-1106",
    sourceTool: "Project Intake",
    sourcePage: "/project-intake",
    projectType: "Modernizare clinică existentă",
    inquiryType: "Modernizare spațiu medical",
    company: "Demo Medical Vest",
    contactName: "Sorin Matei",
    email: "sorin.matei@demo.invalid",
    phone: "+40 788 777 888",
    urgency: "1-3 luni",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "Enterprise",
    riskLevel: "Ridicat",
    readinessScore: 61,
    leadScore: 79,
    priority: "High priority",
    status: "În analiză",
    recommendedNextStep:
      "Auditează spațiul existent, fluxurile, DSP și orice zone de radiologie înainte de calendar final.",
    recommendedServices: [
      "Amenajări medicale",
      "Construcții medicale",
      "Aparatură medicală",
      "Consultanță tehnică",
    ],
    missingInformation: [
      "Plan existent",
      "Fluxuri medicale actuale",
      "Status DSP",
      "Lista echipamentelor păstrate și înlocuite",
    ],
    createdAt: "2026-05-19T14:50:00.000Z",
    lastActionAt: "2026-05-20T10:10:00.000Z",
    notes:
      "Lead demo potrivit pentru audit de amplasament și etapizare de modernizare.",
    generatedSummary:
      "Modernizarea unei clinici existente necesită audit spațiu, fluxuri, instalații, documentație DSP și compatibilitate cu aparatura.",
    assumptions: [
      "Clinica funcționează parțial.",
      "Calendarul este comprimat.",
      "O parte din aparatură poate fi păstrată.",
    ],
    scoreRationale: [
      "Project Intake oferă date structurate.",
      "Modernizarea spațiilor existente are risc de rework.",
      "Termen apropiat.",
    ],
  },
  {
    id: "ZES-LEAD-1107",
    sourceTool: "Calculator echipamente imagistică",
    sourcePage: "/calculatoare/cost-echipamente-imagistica",
    projectType: "Achiziție CT și integrare",
    inquiryType: "Aparatură imagistică",
    company: "Radiology Demo Practice",
    contactName: "Laura Tudor",
    email: "laura.tudor@demo.invalid",
    phone: "+40 799 888 999",
    urgency: "3-6 luni",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "Advanced",
    riskLevel: "Mediu",
    readinessScore: 66,
    leadScore: 73,
    priority: "High priority",
    status: "De calificat",
    recommendedNextStep:
      "Confirmă echipamentul propus, infrastructura camerei și statusul radioprotecției.",
    recommendedServices: [
      "Imagistică medicală",
      "Aparatură medicală",
      "Protecție radiologică",
      "Service aparatură",
    ],
    projectDomain: "Oferta echipamente / CT",
    intelligenceSummary:
      "Demo lead comercial pentru oferta si integrare CT; trebuie separate costul echipamentului, pregatirea camerei si service-ul.",
    missingInformation: [
      "Model CT analizat",
      "Status cameră existentă",
      "Documentație radioprotecție",
      "Cerințe service și garanție",
    ],
    createdAt: "2026-05-18T09:40:00.000Z",
    lastActionAt: "2026-05-18T09:40:00.000Z",
    notes:
      "Lead demo comercial-tehnic. Necesită separarea achiziției de pregătirea camerei.",
    generatedSummary:
      "Achiziția CT necesită verificare infrastructură, protecție radiologică, integrare și service. Bugetul de echipament nu acoperă automat camera.",
    assumptions: [
      "Echipamentul este în analiză.",
      "Camera poate fi reutilizată parțial.",
      "Service-ul trebuie discutat înainte de achiziție.",
    ],
    scoreRationale: [
      "Buget ridicat.",
      "Aparatură imagistică și protecție radiologică.",
      "Readiness mediu-bun.",
    ],
  },
  {
    id: "ZES-LEAD-1108",
    sourceTool: "Contact page",
    sourcePage: "/contact",
    projectType: "Achiziție ecograf și service",
    inquiryType: "Aparatură medicală",
    company: "Cabinet Demo Medical",
    contactName: "Cristina Pavel",
    email: "cristina.pavel@demo.invalid",
    phone: "+40 777 666 777",
    urgency: "Exploratoriu",
    estimatedBudgetRange: "EUR 15k-60k",
    complexity: "Moderate",
    riskLevel: "Redus",
    readinessScore: 39,
    leadScore: 42,
    priority: "Medium priority",
    status: "Nou",
    recommendedNextStep:
      "Clarifică modelul de echipament, bugetul țintă, termenul și nevoia de service.",
    recommendedServices: [
      "Aparatură medicală",
      "Imagistică medicală",
      "Service aparatură",
    ],
    missingInformation: [
      "Tip exact echipament",
      "Buget țintă",
      "Garanție și service dorit",
      "Termen de achiziție",
    ],
    createdAt: "2026-05-17T11:20:00.000Z",
    lastActionAt: "2026-05-17T11:20:00.000Z",
    notes:
      "Lead demo de contact general. Bun pentru calificare, dar nu prioritar tehnic.",
    generatedSummary:
      "Solicitare inițială pentru aparatură medicală și service. Necesită discuție comercială și tehnică pentru selecție echipament.",
    assumptions: [
      "Proiectul este exploratoriu.",
      "Nu există cerințe speciale de shielding.",
      "Service-ul este relevant după achiziție.",
    ],
    scoreRationale: [
      "Contact form cu context limitat.",
      "Buget mic-mediu.",
      "Risc redus și termen exploratoriu.",
    ],
  },
  {
    id: "ZES-LEAD-1109",
    sourceTool: "Project Intake",
    sourcePage: "/project-intake",
    projectType: "Laborator IVD nou",
    inquiryType: "Intake laborator IVD",
    company: "Demo Lab Network",
    contactName: "Mara Ilie",
    email: "mara.ilie@demo.invalid",
    phone: "+40 721 900 111",
    urgency: "1-3 luni",
    estimatedBudgetRange: "EUR 60k-180k",
    complexity: "Advanced",
    riskLevel: "Mediu",
    readinessScore: 77,
    leadScore: 76,
    priority: "High priority",
    status: "În analiză",
    recommendedNextStep:
      "Pregătește plan de laborator, flux probe, lista analizelor și cerințe de calibrare / QC.",
    recommendedServices: [
      "IVD / laborator",
      "Aparatură medicală",
      "Integrare echipamente",
      "Service și mentenanță",
    ],
    missingInformation: [
      "Lista finală de analize",
      "Volum probe pe zi",
      "Cerințe de apă, electric, date",
      "Plan service preventiv",
    ],
    createdAt: "2026-05-20T16:05:00.000Z",
    lastActionAt: "2026-05-21T08:55:00.000Z",
    notes:
      "Lead demo aproape pregătit pentru analiză tehnică. Poate trece rapid în propunere dacă apar planurile.",
    generatedSummary:
      "Laborator IVD nou cu readiness bun, termen apropiat și cerințe de integrare. Necesită validare flux probe, calibrare, QC și service.",
    assumptions: [
      "Spațiul este identificat.",
      "Bugetul este orientativ, nu final.",
      "Integrarea cu fluxul laboratorului este importantă.",
    ],
    scoreRationale: [
      "Project Intake cu readiness ridicat.",
      "IVD și service au valoare recurentă.",
      "Termen apropiat.",
    ],
  },
  {
    id: "ZES-LEAD-1110",
    sourceTool: "AI Project Advisor",
    sourcePage: "/ai-project-advisor",
    projectType: "Modernizare radiologie cu RX",
    inquiryType: "Modernizare radiologie",
    company: "Demo Medical Est",
    contactName: "Diana Stan",
    email: "diana.stan@demo.invalid",
    phone: "+40 724 600 222",
    urgency: "3-6 luni",
    estimatedBudgetRange: "EUR 60k-180k",
    complexity: "Advanced",
    riskLevel: "Ridicat",
    readinessScore: 57,
    leadScore: 68,
    priority: "High priority",
    status: "Contactat",
    recommendedNextStep:
      "Solicită plan cameră, echipament RX propus și documentația de protecție radiologică existentă.",
    recommendedServices: [
      "Radiologie",
      "Protecție radiologică",
      "Amenajări medicale",
      "Service aparatură",
    ],
    missingInformation: [
      "Plan cameră RX",
      "Model echipament propus",
      "Status CNCAN",
      "Documentație radioprotecție existentă",
    ],
    createdAt: "2026-05-16T13:45:00.000Z",
    lastActionAt: "2026-05-18T10:20:00.000Z",
    notes:
      "Lead demo în zona de modernizare. Verificați dacă RX-ul schimbă zonele controlate.",
    generatedSummary:
      "Modernizarea radiologiei cu RX necesită verificarea protecției radiologice, documentației CNCAN, camerei existente și integrării aparaturii.",
    assumptions: [
      "Există cameră RX veche.",
      "Echipamentul nou nu este final confirmat.",
      "CNCAN trebuie verificat.",
    ],
    scoreRationale: [
      "AI Project Advisor oferă context tehnic.",
      "Radiologie cu risc ridicat.",
      "Lead contactat, dar nu încă în analiză.",
    ],
  },
  {
    id: "ZES-LEAD-1111",
    sourceTool: "Calculator proiect medical",
    sourcePage: "/calculator-proiect-medical",
    projectType: "Cabinet medical fără radiologie",
    inquiryType: "Amenajare cabinet",
    company: "Demo Care Cabinet",
    contactName: "Alexandru Rusu",
    email: "alexandru.rusu@demo.invalid",
    phone: "+40 735 600 333",
    urgency: "Exploratoriu",
    estimatedBudgetRange: "EUR 15k-60k",
    complexity: "Moderate",
    riskLevel: "Redus",
    readinessScore: 46,
    leadScore: 38,
    priority: "Medium priority",
    status: "Închis",
    recommendedNextStep:
      "Menține leadul în nurturing și cere detalii despre specialități, spațiu și buget.",
    recommendedServices: [
      "Amenajări medicale",
      "Aparatură medicală",
      "Consultanță tehnică",
    ],
    missingInformation: [
      "Specialități medicale",
      "Plan spațiu",
      "Buget clar",
      "Calendar de decizie",
    ],
    createdAt: "2026-05-14T10:10:00.000Z",
    lastActionAt: "2026-05-15T09:00:00.000Z",
    notes:
      "Lead demo închis pentru moment. Nu există urgență și proiectul este exploratoriu.",
    generatedSummary:
      "Amenajare cabinet medical fără radiologie. Interes inițial, dar fără buget sau calendar clar.",
    assumptions: [
      "Nu există radiologie.",
      "Spațiul nu este confirmat.",
      "Leadul are nevoie de educare.",
    ],
    scoreRationale: [
      "Buget redus.",
      "Risc scăzut.",
      "Lipsă calendar decizional.",
    ],
  },
  {
    id: "ZES-LEAD-1112",
    sourceTool: "Proposal Builder",
    sourcePage: "/proposal-builder",
    projectType: "Proiect mixt radiologie + service",
    inquiryType: "Propunere preliminară mixtă",
    company: "Demo Diagnostic Plus",
    contactName: "Victor Neagu",
    email: "victor.neagu@demo.invalid",
    phone: "+40 726 700 444",
    urgency: "1-3 luni",
    estimatedBudgetRange: "EUR 180k-550k",
    complexity: "Enterprise",
    riskLevel: "Ridicat",
    readinessScore: 72,
    leadScore: 83,
    priority: "Critical / immediate opportunity",
    status: "De calificat",
    recommendedNextStep:
      "Propune întâlnire tehnică și cere separarea cerințelor RMN/RF de CT/RX/CNCAN.",
    recommendedServices: [
      "Radiologie",
      "RF shielding pentru RMN",
      "Protecție radiologică",
      "Imagistică medicală",
      "Service aparatură",
    ],
    missingInformation: [
      "Lista finală echipamente",
      "Ce camere sunt RMN versus CT/RX",
      "Status DSP/CNCAN",
      "Plan service și downtime acceptabil",
    ],
    createdAt: "2026-05-21T10:35:00.000Z",
    lastActionAt: "2026-05-21T10:35:00.000Z",
    notes:
      "Lead demo cu potențial mare, dar necesită separare tehnică strictă între RF și protecție radiologică.",
    generatedSummary:
      "Proiect mixt de radiologie și service, cu potențial RMN/RF, CT/RX/protecție radiologică și mentenanță aparatură.",
    assumptions: [
      "Proiectul include mai multe echipamente.",
      "Unele cerințe de shielding sunt neclare.",
      "Service-ul trebuie definit încă din buget.",
    ],
    scoreRationale: [
      "Proposal Builder indică intenție ridicată.",
      "Multiple servicii ZES activate.",
      "Scor ridicat și termen apropiat.",
    ],
  },
];
