import type {
  AdvancedComplexityLevel,
  BudgetBand,
  RiskSeverity,
} from "@/lib/ai-estimation";

export type ProposalBlockType =
  | "infrastructure"
  | "rf-shielding"
  | "radiation-protection"
  | "hvac-electrical"
  | "planning-documentation"
  | "compliance"
  | "installation-integration"
  | "service-maintenance"
  | "modernization"
  | "risk"
  | "assumptions"
  | "missing-information";

export type ProposalPriority = "critical" | "core" | "optional" | "validation";

export type ProposalStageId =
  | "evaluare-preliminara"
  | "validare-tehnica"
  | "proiectare-conformitate"
  | "executie-integrare"
  | "punere-in-functiune"
  | "service-suport";

export type ProposalAssemblyInput = {
  projectType: string;
  projectScale: string;
  imaging: string;
  lab: string;
  shielding: string;
  equipment: string;
  projectStage: string;
  urgency: string;
  description: string;
  complexity: AdvancedComplexityLevel;
  score: number;
  proposalType: string;
  recommendedServices: string[];
  budgetRange: string;
  budgetBand: BudgetBand;
  timelineDuration: string;
  highestRisk?: RiskSeverity;
};

export type ProposalBlock = {
  id: string;
  type: ProposalBlockType;
  title: string;
  summary: string;
  body: string[];
  bullets: string[];
  priority: ProposalPriority;
};

export type ProposalStage = {
  id: ProposalStageId;
  title: string;
  objective: string;
  blockIds: string[];
  actions: string[];
  validationNeed?: string;
};

export type ProposalRelatedLink = {
  label: string;
  href: string;
  reason: string;
  type: "calculator" | "planning-journey" | "service" | "article" | "guide" | "contact";
};

export type ProposalNextAction = ProposalRelatedLink & {
  priority: ProposalPriority;
};

export type AssembledProposal = {
  title: string;
  summary: string;
  blocks: ProposalBlock[];
  stages: ProposalStage[];
  criticalRecommendations: string[];
  optionalRecommendations: string[];
  sequencingRecommendations: string[];
  validationNeeds: string[];
  nextActions: ProposalNextAction[];
  relatedLinks: ProposalRelatedLink[];
  printSections: Array<{
    title: string;
    body: string;
    items: string[];
  }>;
};

type ProposalContext = ProposalAssemblyInput & {
  hasRmn: boolean;
  hasCt: boolean;
  hasRx: boolean;
  hasCtRx: boolean;
  hasRadiology: boolean;
  hasLab: boolean;
  hasRfShielding: boolean;
  hasRadiationProtection: boolean;
  hasEquipment: boolean;
  hasService: boolean;
  hasModernization: boolean;
  hasExistingBuildingRisk: boolean;
  isLarge: boolean;
  isUrgent: boolean;
  equipmentAlreadySelected: boolean;
  unknownCount: number;
};

const baseStages: ProposalStage[] = [
  {
    id: "evaluare-preliminara",
    title: "Evaluare preliminara",
    objective:
      "Clarificarea obiectivului, a spatiului, a echipamentelor si a ipotezelor folosite in estimare.",
    blockIds: ["planning-documentation", "assumptions", "missing-information"],
    actions: [
      "centralizarea planurilor, releveului si contextului operational",
      "separarea cerintelor ferme de ipotezele orientative",
      "stabilirea deciziilor care pot modifica bugetul si timeline-ul",
    ],
    validationNeed:
      "Datele introduse in formular trebuie validate inainte de oferta tehnica sau comerciala finala.",
  },
  {
    id: "validare-tehnica",
    title: "Validare tehnica",
    objective:
      "Verificarea compatibilitatii dintre spatiu, aparatura, ecranare, instalatii si operare.",
    blockIds: [
      "infrastructure",
      "rf-shielding",
      "radiation-protection",
      "hvac-electrical",
      "modernization",
    ],
    actions: [
      "verificarea amplasamentului si a constrangerilor de acces",
      "corelarea cerintelor furnizorilor de aparatura cu infrastructura",
      "prioritizarea riscurilor care pot bloca executia sau autorizarea",
    ],
  },
  {
    id: "proiectare-conformitate",
    title: "Proiectare si conformitate",
    objective:
      "Transformarea cerintelor validate in documentatie, layout, responsabilitati tehnice si pasi de conformitate.",
    blockIds: ["compliance", "planning-documentation", "risk"],
    actions: [
      "coordonarea DSP, CNCAN unde este cazul si documentatia de proiect",
      "definirea zonelor tehnice, fluxurilor si elementelor de protectie",
      "inghetarea cerintelor critice inainte de executie",
    ],
  },
  {
    id: "executie-integrare",
    title: "Executie si integrare",
    objective:
      "Pregatirea spatiului, montajului, integrarii aparaturii si testelor fara decizii tardive.",
    blockIds: ["installation-integration", "infrastructure", "hvac-electrical"],
    actions: [
      "pregatirea alimentarii, HVAC, datelor, traseelor si accesului",
      "coordonarea furnizorilor de aparatura cu executia",
      "planificarea testarii si acceptantei tehnice",
    ],
  },
  {
    id: "punere-in-functiune",
    title: "Punere in functiune",
    objective:
      "Verificarea finala a camerei, aparaturii, documentatiei, riscurilor ramase si conditiilor de operare.",
    blockIds: ["installation-integration", "risk"],
    actions: [
      "testare, commissioning si verificari de performanta",
      "inchiderea observatiilor tehnice inainte de operare",
      "pregatirea responsabilitatilor de suport",
    ],
  },
  {
    id: "service-suport",
    title: "Service si suport",
    objective:
      "Stabilirea mentenantei preventive, accesului service si continuitatii operationale dupa instalare.",
    blockIds: ["service-maintenance"],
    actions: [
      "definirea contractului de service si a interventiilor preventive",
      "stabilirea datelor necesare pentru triere si escaladare",
      "planificarea downtime-ului si a pieselor critice unde este cazul",
    ],
  },
];

export function assembleProposal(input: ProposalAssemblyInput): AssembledProposal {
  const context = createProposalContext(input);
  const blocks = orderBlocks([
    planningDocumentationBlock(context),
    infrastructureBlock(context),
    context.hasRfShielding ? rfShieldingBlock(context) : undefined,
    context.hasRadiationProtection ? radiationProtectionBlock(context) : undefined,
    hvacElectricalBlock(context),
    complianceGuidanceBlock(context),
    installationIntegrationBlock(context),
    context.hasModernization ? modernizationBlock(context) : undefined,
    context.hasService ? serviceMaintenanceBlock(context) : undefined,
    riskBlock(context),
    assumptionsBlock(context),
    missingInformationBlock(context),
  ]);
  const blockIds = new Set(blocks.map((block) => block.id));
  const stages = baseStages
    .map((stage) => ({
      ...stage,
      blockIds: stage.blockIds.filter((blockId) => blockIds.has(blockId)),
    }))
    .filter((stage) => stage.blockIds.length > 0);

  return {
    title: createAssemblyTitle(context),
    summary: createAssemblySummary(context),
    blocks,
    stages,
    criticalRecommendations: createCriticalRecommendations(context),
    optionalRecommendations: createOptionalRecommendations(context),
    sequencingRecommendations: createSequencingRecommendations(context),
    validationNeeds: createValidationNeeds(context),
    nextActions: createNextActions(context),
    relatedLinks: createRelatedLinks(context),
    printSections: createPrintSections(context, blocks, stages),
  };
}

function createProposalContext(input: ProposalAssemblyInput): ProposalContext {
  const hasRmn = includesAny(input.imaging, ["RMN", "Mai multe"]) ||
    includesAny(input.shielding, ["RF shielding", "Ambele"]);
  const hasCt = includesAny(input.imaging, ["CT", "Mai multe"]);
  const hasRx = includesAny(input.imaging, ["RX", "Mai multe"]) ||
    includesAny(input.shielding, ["plumb", "Ambele"]);
  const hasCtRx = hasCt || hasRx;
  const hasLab = includesAny(input.projectType, ["Laborator", "IVD"]) ||
    input.lab === "Da";
  const hasService = includesAny(input.projectType, ["Service", "mentenan"]) ||
    includesAny(input.equipment, ["Service", "mentenan"]) ||
    includesAny(input.projectStage, ["Problem"]);
  const hasModernization = includesAny(input.projectType, ["Modernizare"]) ||
    includesAny(input.projectStage, ["execu", "Aparatur"]);
  const unknownCount = [
    input.imaging.includes("știu") || input.imaging.includes("È™tiu"),
    input.lab.includes("știu") || input.lab.includes("È™tiu"),
    input.shielding.includes("știu") || input.shielding.includes("È™tiu"),
    input.equipment.includes("știu") || input.equipment.includes("È™tiu"),
  ].filter(Boolean).length;

  return {
    ...input,
    hasRmn,
    hasCt,
    hasRx,
    hasCtRx,
    hasRadiology:
      includesAny(input.projectType, ["Radiologie"]) || hasRmn || hasCtRx,
    hasLab,
    hasRfShielding: hasRmn,
    hasRadiationProtection: hasCtRx,
    hasEquipment:
      input.equipment.trim() !== "Nu" ||
      includesAny(input.projectType, ["Achizi"]),
    hasService,
    hasModernization,
    hasExistingBuildingRisk: hasModernization ||
      includesAny(input.projectStage, ["execu", "Aparatur"]),
    isLarge: includesAny(input.projectScale, ["300", "700", "peste"]),
    isUrgent: includesAny(input.urgency, ["1", "Imediat"]),
    equipmentAlreadySelected: includesAny(input.projectStage, ["Aparatur"]),
    unknownCount,
  };
}

function planningDocumentationBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "planning-documentation",
    type: "planning-documentation",
    title: "Planificare si documentatie de pornire",
    summary:
      "Propunerea trebuie sa inceapa cu clarificarea datelor de baza, nu cu o lista fixa de lucrari.",
    body: [
      "ZES ar trata proiectul ca o pre-oferta tehnica bazata pe ipoteze. Inainte de ofertarea finala sunt necesare planuri, releveu, lista de echipamente, stadiu de autorizare si constrangeri operationale.",
      "Daca exista zone de radiologie, RMN, laborator sau service activ, documentatia trebuie separata pe discipline pentru a evita confuzia intre cerinte diferite.",
    ],
    bullets: [
      "brief tehnic si obiectiv operational",
      "planuri, suprafete si constrangeri de acces",
      "lista echipamente si cerinte furnizor",
      "stadiu DSP / CNCAN unde este relevant",
    ],
    priority: "core",
  };
}

function infrastructureBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "infrastructure",
    type: "infrastructure",
    title: "Infrastructura medicala",
    summary:
      "Spatiul trebuie verificat ca suport pentru fluxuri, echipamente, instalatii si mentenanta.",
    body: [
      context.isLarge
        ? "Scara proiectului sugereaza coordonare multi-disciplinara intre arhitectura, instalatii, aparatura, radiologie, IVD si service."
        : "Infrastructura trebuie evaluata in functie de spatiu, fluxuri, aparatura si cerintele de operare.",
      "Recomandarea este ca deciziile de compartimentare, alimentare, date, HVAC si acces service sa fie validate inainte de executia lucrarilor.",
    ],
    bullets: [
      "fluxuri pacient / personal / probe unde este cazul",
      "alimentare electrica, date, HVAC si utilitati",
      "spatii tehnice si acces pentru instalare",
      "compatibilitate cu service-ul aparaturii",
    ],
    priority: "core",
  };
}

function rfShieldingBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "rf-shielding",
    type: "rf-shielding",
    title: "RF shielding pentru RMN",
    summary:
      "RMN-ul activeaza cerinte de RF shielding, cusca Faraday si integritate electromagnetica.",
    body: [
      "RF shielding-ul trebuie tratat separat de protectia radiologica cu plumb. Scopul este controlul interferentelor electromagnetice pentru camera RMN, nu protectia la radiatii ionizante.",
      "Validarea ar trebui facuta inainte de achizitia finala sau executia camerei, pentru ca usa RF, filtrele, waveguides, penetrarile, HVAC-ul si accesul magnetului pot schimba bugetul si timeline-ul.",
    ],
    bullets: [
      "cusca Faraday si continuitate RF",
      "usa RF, filtre, waveguides si penetrari",
      "HVAC, vibratii si acces magnet",
      "testare RF inainte de acceptanta",
    ],
    priority: "critical",
  };
}

function radiationProtectionBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "radiation-protection",
    type: "radiation-protection",
    title: "Protectie radiologica pentru CT / RX",
    summary:
      "CT/RX implica protectie radiologica, zone controlate si coordonare CNCAN, nu RF shielding.",
    body: [
      "Radiation protection depends on final room layout, equipment configuration, workload assumptions and neighbouring spaces. It may include lead-lined walls, lead doors, lead glass and controlled-area planning.",
      "CNCAN should be treated as a planning dependency for ionizing radiation projects. It is not the same as RF shielding and should not be used to justify MRI Faraday cage decisions.",
    ],
    bullets: [
      "layout final si pozitie operator",
      "vecinatati si zone controlate",
      "pereti, usi si sticla cu protectie unde este cazul",
      "documentatie si coordonare CNCAN",
    ],
    priority: "critical",
  };
}

function hvacElectricalBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "hvac-electrical",
    type: "hvac-electrical",
    title: "HVAC, electric si date",
    summary:
      "Instalatiile pot schimba costul si durata daca sunt validate dupa alegerea aparaturii.",
    body: [
      "Electrical infrastructure may require reassessment after final modality selection. RMN, CT, RX, IVD and ecografie can have cerinte diferite de alimentare, racire, date si acces tehnic.",
      context.hasRmn
        ? "Pentru RMN, HVAC-ul, umiditatea, temperatura, vibratiile si traseele tehnice trebuie corelate cu RF shielding-ul."
        : "Pentru proiectele fara RMN, validarea instalatiilor ramane importanta pentru functionare, service si continuitate.",
    ],
    bullets: [
      "putere disponibila si tablouri electrice",
      "racire, ventilatie si conditii de mediu",
      "date, conectivitate si integrare sisteme",
      "acces mentenanta si trasee tehnice",
    ],
    priority: context.hasRmn || context.hasCtRx || context.hasLab ? "core" : "validation",
  };
}

function complianceGuidanceBlock(context: ProposalContext): ProposalBlock {
  const hasSpecificCompliance = context.hasCtRx || context.hasRadiology || context.projectType.includes("Clinic");

  return {
    id: "compliance",
    type: "compliance",
    title: "DSP / CNCAN si conformitate",
    summary:
      "Conformitatea trebuie tratata ca parte din planificare, nu ca verificare de final.",
    body: [
      "DSP si CNCAN au roluri diferite. DSP tine de functionarea spatiului medical, fluxuri, compartimentare si cerinte sanitare. CNCAN este relevant pentru radiologie cu radiatii ionizante, precum CT/RX/fluoroscopie.",
      context.hasRmn
        ? "Pentru RMN, cerintele RF shielding nu sunt in sine o autorizare CNCAN; ele tin de performanta camerei RMN si de cerintele tehnice ale echipamentului."
        : "Pentru proiectele fara RMN, ramane important ca autorizarea si documentatia sa fie corelate cu echipamentele finale.",
    ],
    bullets: hasSpecificCompliance
      ? [
          "DSP pentru fluxuri si functionare medicala",
          "CNCAN pentru CT/RX unde exista radiatii ionizante",
          "documentatie tehnica aliniata cu layout-ul final",
          "responsabilitati clarificate inainte de executie",
        ]
      : [
          "verificarea cerintelor aplicabile proiectului",
          "documentatie tehnica si operationala",
          "ipoteze de autorizare confirmate inainte de buget final",
        ],
    priority: hasSpecificCompliance ? "core" : "validation",
  };
}

function installationIntegrationBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "installation-integration",
    type: "installation-integration",
    title: "Instalare, integrare si commissioning",
    summary:
      "Aparatura trebuie integrata in spatiu, nu doar livrata.",
    body: [
      "Integrarea include accesul pentru livrare, pregatirea camerei, alimentarea, datele, testarea, trainingul si coordonarea cu furnizorii.",
      context.equipmentAlreadySelected
        ? "Pentru ca aparatura pare deja selectata sau achizitionata, verificarea compatibilitatii cu spatiul devine prioritara."
        : "Daca echipamentul nu este final, propunerea ar trebui sa ramana modulara pana la primirea specificatiilor furnizorului.",
    ],
    bullets: [
      "cerinte furnizor si fise tehnice",
      "logistica de livrare si montaj",
      "testare, acceptanta si punere in functiune",
      "integrare cu service si operare",
    ],
    priority: context.hasEquipment || context.hasRadiology || context.hasLab ? "core" : "optional",
  };
}

function serviceMaintenanceBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "service-maintenance",
    type: "service-maintenance",
    title: "Service si mentenanta",
    summary:
      "Service-ul trebuie inclus in propunere pentru uptime, interventii si continuitate operationala.",
    body: [
      "Pentru aparatura medicala, service-ul nu este doar o activitate post-vanzare. El influenteaza accesul, piesele, mentenanta preventiva, timpul de reactie si calitatea exploatarii.",
      context.hasService
        ? "Solicitarea indica nevoia de service sau mentenanta, deci trierea si responsabilitatile de interventie ar trebui prioritizate."
        : "Chiar daca nu exista o problema activa, propunerea poate include optiuni de mentenanta preventiva si verificari periodice.",
    ],
    bullets: [
      "istoric service si identificare echipamente",
      "mentenanta preventiva si interventii corective",
      "acces tehnic, piese si escaladare",
      "continuitate operationala si downtime planificat",
    ],
    priority: context.hasService ? "critical" : "optional",
  };
}

function modernizationBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "modernization",
    type: "modernization",
    title: "Modernizare si spatiu existent",
    summary:
      "Modernizarea cere audit de compatibilitate inainte de a bloca bugetul sau calendarul.",
    body: [
      "In spatiile existente, limitarile ascunse pot veni din structura, trasee, alimentare, HVAC, acces, ecranari vechi sau documentatie neactualizata.",
      "Recomandarea este auditul tehnic inainte de comanda echipamentelor sau de executia modificarilor majore.",
    ],
    bullets: [
      "audit al camerei si instalatiilor existente",
      "compatibilitate cu echipamentul nou",
      "fazare pentru reducerea intreruperilor",
      "documentatie actualizata pentru schimbari",
    ],
    priority: "core",
  };
}

function riskBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "risk",
    type: "risk",
    title: "Riscuri si decizii critice",
    summary:
      "Riscurile trebuie tratate ca puncte de validare, nu ca obstacole generale.",
    body: [
      "Propunerea indica zone in care o decizie gresita poate produce rework, costuri suplimentare sau intarzieri.",
      "Prioritatea este verificarea riscurilor care schimba structura camerei, autorizarea, aparatura sau continuitatea operationala.",
    ],
    bullets: createCriticalRecommendations(context).slice(0, 5),
    priority: context.highestRisk === "Critical" || context.isUrgent ? "critical" : "core",
  };
}

function assumptionsBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "assumptions",
    type: "assumptions",
    title: "Ipoteze folosite",
    summary:
      "Estimarea este construita pe datele introduse si trebuie recalibrata dupa validarea documentatiei.",
    body: [
      `Bugetul orientativ este ${context.budgetRange}, cu banda ${context.budgetBand}. Timeline-ul estimativ este ${context.timelineDuration}.`,
      "Aceste valori nu reprezinta oferta finala si pot fi schimbate de planuri, furnizori, autorizari, amplasament si selectie de aparatura.",
    ],
    bullets: [
      `tip proiect: ${context.projectType}`,
      `stadiu: ${context.projectStage}`,
      `complexitate: ${context.complexity}`,
      `urgenta: ${context.urgency}`,
    ],
    priority: "validation",
  };
}

function missingInformationBlock(context: ProposalContext): ProposalBlock {
  return {
    id: "missing-information",
    type: "missing-information",
    title: "Informatii lipsa pentru propunerea finala",
    summary:
      "Informatiile lipsa definesc ce trebuie colectat inainte de validarea tehnica si comerciala.",
    body: [
      "O propunere finala necesita mai multe date decat formularul poate colecta. Lista de mai jos ajuta la pregatirea discutiei cu ZES.",
    ],
    bullets: createValidationNeeds(context),
    priority: "validation",
  };
}

function createCriticalRecommendations(context: ProposalContext) {
  const recommendations = [
    "Validati planurile, suprafetele si constrangerile de amplasament inainte de oferta finala.",
  ];

  if (context.hasRmn) {
    recommendations.push(
      "RF shielding should be validated before final equipment acquisition.",
      "Cusca Faraday, usa RF, filtrele, waveguides si penetrarile trebuie tratate ca sistem.",
    );
  }

  if (context.hasCtRx) {
    recommendations.push(
      "Radiation protection requirements depend on final room layout and equipment configuration.",
      "CNCAN trebuie abordat separat de DSP si nu trebuie confundat cu RF shielding.",
    );
  }

  if (context.hasLab) {
    recommendations.push(
      "Fluxul probelor, calibrarea, QC-ul si service-ul IVD trebuie validate inainte de layout final.",
    );
  }

  if (context.equipmentAlreadySelected) {
    recommendations.push(
      "Compara echipamentul deja selectat cu spatiul, utilitatile si accesul de service inainte de executie.",
    );
  }

  if (context.isUrgent) {
    recommendations.push(
      "Calendarul comprimat cere trierea riscurilor care pot bloca autorizarea, ecranarea sau integrarea.",
    );
  }

  return unique(recommendations);
}

function createOptionalRecommendations(context: ProposalContext) {
  const recommendations = [
    "Adauga o revizie de buget dupa alegerea furnizorilor principali.",
    "Pastreaza o rezerva de timp pentru intrebari tehnice si date lipsa.",
  ];

  if (!context.hasService) {
    recommendations.push("Include o optiune de mentenanta preventiva chiar daca nu exista problema activa.");
  }

  if (!context.hasLab && !context.hasRadiology) {
    recommendations.push("Evalueaza daca proiectul va include ulterior imagistica, IVD sau extinderi tehnice.");
  }

  if (context.unknownCount > 0) {
    recommendations.push("Inlocuieste optiunile necunoscute cu date tehnice inainte de propunerea finala.");
  }

  return unique(recommendations);
}

function createSequencingRecommendations(context: ProposalContext) {
  const sequence = [
    "1. Evaluare preliminara si colectare documente.",
    "2. Validare tehnica a spatiului, aparaturii si instalatiilor.",
  ];

  if (context.hasRmn) {
    sequence.push("3. Validare RF shielding / RMN inainte de executie.");
  } else if (context.hasCtRx) {
    sequence.push("3. Validare protectie radiologica si CNCAN inainte de executie.");
  } else {
    sequence.push("3. Proiectare si clarificare autorizari aplicabile.");
  }

  sequence.push("4. Executie, integrare, testare si punere in functiune.");

  if (context.hasService || context.hasEquipment || context.hasRadiology || context.hasLab) {
    sequence.push("5. Plan service, mentenanta si continuitate operationala.");
  }

  return sequence;
}

function createValidationNeeds(context: ProposalContext) {
  const needs = [
    "planuri, releveu, fotografii si suprafete confirmate",
    "lista echipamentelor si cerintele furnizorilor",
    "stadiu DSP / CNCAN unde este cazul",
    "cerinte electrice, HVAC, date si acces service",
  ];

  if (context.hasRmn) {
    needs.push("cerinte RMN pentru RF attenuation, usa RF, filtre, waveguides, penetrari si HVAC");
  }

  if (context.hasCtRx) {
    needs.push("layout CT/RX, vecinatati, zone controlate si date pentru protectie radiologica");
  }

  if (context.hasLab) {
    needs.push("flux probe, volum estimat, echipamente IVD, calibrare, QC si consumabile");
  }

  if (context.hasService) {
    needs.push("model, serie, istoric service, contract existent si impact operational");
  }

  return unique(needs);
}

function createNextActions(context: ProposalContext): ProposalNextAction[] {
  const actions: ProposalNextAction[] = [
    {
      label: "Revizuire propunere cu ZES",
      href: "/contact",
      reason: "Transforma structura preliminara intr-o discutie aplicata pe proiect.",
      type: "contact",
      priority: "core",
    },
    {
      label: "Traseu de planificare",
      href: journeyHref(context),
      reason: "Parcurge pasii recomandati pentru scenariul apropiat proiectului.",
      type: "planning-journey",
      priority: "validation",
    },
  ];

  if (context.hasRmn || context.hasCtRx) {
    actions.push({
      label: "Radiology Room Planner",
      href: "/radiology-room-planner",
      reason: "Valideaza separat cerintele RMN/RF sau CT/RX/protectie radiologica.",
      type: "calculator",
      priority: "critical",
    });
  }

  if (context.hasService) {
    actions.push({
      label: "Service Diagnostic",
      href: "/service-diagnostic",
      reason: "Trieaza urgenta, downtime-ul si datele necesare pentru interventie.",
      type: "calculator",
      priority: "critical",
    });
  }

  if (context.hasLab) {
    actions.push({
      label: "Calculator laborator IVD",
      href: "/calculatoare/cost-laborator-ivd",
      reason: "Estimeaza infrastructura, echipamentele IVD, integrarea si service-ul.",
      type: "calculator",
      priority: "core",
    });
  }

  return actions;
}

function createRelatedLinks(context: ProposalContext): ProposalRelatedLink[] {
  const links: ProposalRelatedLink[] = [
    {
      label: "Planificare proiect medical",
      href: "/planificare",
      reason: "Alege scenariul complet de planificare.",
      type: "planning-journey",
    },
    {
      label: "Servicii ZES",
      href: "/services",
      reason: "Vezi pilonii tehnici disponibili pentru proiect.",
      type: "service",
    },
  ];

  if (context.hasRmn) {
    links.push(
      {
        label: "Calculator cost camera RMN",
        href: "/calculatoare/cost-camera-rmn",
        reason: "Estimeaza orientativ camera RMN si RF shielding.",
        type: "calculator",
      },
      {
        label: "RF shielding pentru RMN",
        href: "/services/rf-shielding",
        reason: "Serviciul relevant pentru Faraday cage si integritate RF.",
        type: "service",
      },
      {
        label: "Checklist camera RMN",
        href: "/knowledge-hub/checklist-camera-rmn-inainte-instalare",
        reason: "Pregateste datele inainte de instalarea RMN.",
        type: "article",
      },
    );
  }

  if (context.hasCtRx) {
    links.push(
      {
        label: "Calculator cost camera CT",
        href: "/calculatoare/cost-camera-ct",
        reason: "Estimeaza orientativ protectia radiologica si integrarea CT.",
        type: "calculator",
      },
      {
        label: "Protectie radiologica",
        href: "/services/protectie-radiologica",
        reason: "Serviciul relevant pentru plumb, zone controlate si CNCAN.",
        type: "service",
      },
      {
        label: "Autorizare CNCAN pas cu pas",
        href: "/knowledge-hub/autorizare-cncan-pas-cu-pas",
        reason: "Clarifica pasii de planificare CNCAN fara promisiuni legale finale.",
        type: "article",
      },
    );
  }

  if (context.hasLab) {
    links.push({
      label: "Ghid echipamente IVD",
      href: "/ghiduri/echipamente-ivd-laborator",
      reason: "Coreleaza echipamentele IVD cu fluxul de laborator.",
      type: "guide",
    });
  }

  if (context.hasService) {
    links.push({
      label: "Service aparatura medicala",
      href: "/ghiduri/service-aparatura-medicala",
      reason: "Planifica service, mentenanta si uptime.",
      type: "guide",
    });
  }

  return uniqueByHref(links);
}

function createPrintSections(
  context: ProposalContext,
  blocks: ProposalBlock[],
  stages: ProposalStage[],
) {
  return [
    {
      title: "Interpretarea proiectului",
      body: createAssemblySummary(context),
      items: [
        `Complexitate: ${context.complexity}`,
        `Buget orientativ: ${context.budgetRange}`,
        `Timeline estimativ: ${context.timelineDuration}`,
      ],
    },
    {
      title: "Etapizare recomandata",
      body: "Etapele sunt selectate in functie de serviciile si riscurile activate de raspunsurile introduse.",
      items: stages.map((stage) => stage.title),
    },
    {
      title: "Module tehnice incluse",
      body: "Modulele de mai jos pot deveni capitole intr-o propunere tehnica sau intr-un export PDF viitor.",
      items: blocks.map((block) => block.title),
    },
  ];
}

function orderBlocks(blocks: Array<ProposalBlock | undefined>) {
  const priorityOrder: Record<ProposalPriority, number> = {
    critical: 0,
    core: 1,
    validation: 2,
    optional: 3,
  };

  return blocks
    .filter((block): block is ProposalBlock => Boolean(block))
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

function createAssemblyTitle(context: ProposalContext) {
  if (context.hasRmn) {
    return "Structura tehnica pentru proiect RMN";
  }

  if (context.hasCtRx) {
    return "Structura tehnica pentru proiect CT / RX";
  }

  if (context.hasLab) {
    return "Structura tehnica pentru laborator IVD";
  }

  if (context.hasService) {
    return "Structura tehnica pentru service si continuitate";
  }

  return "Structura tehnica pentru proiect medical";
}

function createAssemblySummary(context: ProposalContext) {
  const focus = [
    context.hasRmn ? "RF shielding pentru RMN" : undefined,
    context.hasCtRx ? "protectie radiologica pentru CT/RX" : undefined,
    context.hasLab ? "laborator / IVD" : undefined,
    context.hasService ? "service si mentenanta" : undefined,
    context.hasEquipment ? "integrare aparatura" : undefined,
  ].filter(Boolean);

  return `Propunerea preliminara este asamblata pentru ${context.projectType.toLowerCase()}, cu nivel ${context.complexity}, buget ${context.budgetRange} si timeline ${context.timelineDuration}. Focusul tehnic este ${focus.length ? focus.join(", ") : "infrastructura medicala, aparatura si validare tehnica"}.`;
}

function journeyHref(context: ProposalContext) {
  if (context.hasService) return "/planificare/am-nevoie-service-aparatura";
  if (context.hasLab) return "/planificare/pregatesc-laborator-ivd";
  if (context.hasRmn) return "/planificare/amenajez-camera-rmn";
  if (context.hasCtRx) return "/planificare/amenajez-camera-ct-rx";
  if (context.hasModernization) return "/planificare/modernizez-radiologie";
  if (context.hasEquipment) return "/planificare/aleg-aparatura-medicala";
  if (context.projectType.includes("Clinic")) return "/planificare/deschid-clinica-medicala";
  return "/planificare/nu-stiu-de-unde-sa-incep";
}

function includesAny(value: string, needles: string[]) {
  return needles.some((needle) =>
    value.toLocaleLowerCase("ro-RO").includes(needle.toLocaleLowerCase("ro-RO")),
  );
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function uniqueByHref<T extends { href: string }>(items: T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.href)) {
      return false;
    }

    seen.add(item.href);
    return true;
  });
}
