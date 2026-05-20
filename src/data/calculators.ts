import {
  BUDGET_DISCLAIMER,
  createBudgetEstimate,
  createConfidenceEstimate,
  getAdvancedComplexity,
  risk,
  type AdvancedComplexityLevel,
  type BudgetEstimate,
  type BudgetLine,
  type ConfidenceEstimate,
  type RiskItem,
  type TimelineEstimate,
} from "@/lib/ai-estimation";

export type CalculatorSlug =
  | "cost-camera-rmn"
  | "cost-camera-ct"
  | "cost-laborator-ivd"
  | "cost-echipamente-imagistica"
  | "service-aparatura";

export type CalculatorOption = {
  label: string;
  value: string;
  note?: string;
};

export type CalculatorField = {
  id: string;
  label: string;
  options: CalculatorOption[];
};

export type CalculatorFAQ = {
  question: string;
  answer: string;
};

export type CalculatorLink = {
  label: string;
  href: string;
};

export type ProgrammaticCalculatorDefinition = {
  slug: CalculatorSlug;
  title: string;
  description: string;
  eyebrow: string;
  purpose: string;
  targetKeyword: string;
  keywords: string[];
  fields: CalculatorField[];
  faq: CalculatorFAQ[];
  primaryCta: CalculatorLink;
  secondaryCta: CalculatorLink;
  relatedLinks: CalculatorLink[];
};

export type ProgrammaticCalculatorResult = {
  title: string;
  summary: string;
  score: number;
  metricLabel: string;
  metricValue: string;
  complexity?: AdvancedComplexityLevel;
  budget?: BudgetEstimate;
  timeline: TimelineEstimate;
  risks: RiskItem[];
  assumptions: string[];
  missingData: string[];
  confidence: ConfidenceEstimate;
  recommendedServices: string[];
  nextSteps: string[];
  emphasis: string[];
};

export const programmaticCalculators: ProgrammaticCalculatorDefinition[] = [
  {
    slug: "cost-camera-rmn",
    title: "Calculator cost cameră RMN",
    description:
      "Estimator pentru camera RMN: RF shielding, cușcă Faraday, HVAC, vibrații, integrare echipament și timeline.",
    eyebrow: "RMN planning estimator",
    purpose:
      "Estimează complexitatea și bugetul orientativ pentru o cameră RMN fără a confunda RF shielding-ul cu ecranarea cu plumb.",
    targetKeyword: "calculator cost cameră RMN",
    keywords: [
      "cost cameră RMN",
      "RF shielding RMN",
      "cușcă Faraday RMN",
      "integrare RMN",
    ],
    fields: [
      optionField("roomSize", "Dimensiune cameră", [
        ["sub 20 mp", "small"],
        ["20-35 mp", "medium"],
        ["35-60 mp", "large"],
        ["peste 60 mp", "xl"],
      ]),
      optionField("building", "Tip clădire / spațiu", [
        ["Clădire nouă", "new"],
        ["Clădire medicală existentă", "existing-medical"],
        ["Clădire existentă nemedicală", "existing-nonmedical"],
        ["Spațiu comercial convertit", "converted"],
      ]),
      optionField("rfShielding", "RF shielding", [
        ["Necesar confirmat", "confirmed"],
        ["Probabil necesar", "probable"],
        ["Nu știu încă", "unknown"],
        ["Deja proiectat", "designed"],
      ]),
      optionField("equipment", "Echipament RMN selectat?", [
        ["Model selectat", "selected"],
        ["Oferte în analiză", "shortlist"],
        ["Nu încă", "not-selected"],
        ["Nu știu încă", "unknown"],
      ]),
      optionField("hvac", "Complexitate HVAC", [
        ["Standard", "standard"],
        ["Cerințe speciale", "special"],
        ["Răcire / umiditate stricte", "strict"],
        ["Nu știu încă", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Camera RMN are nevoie de plumb?",
        answer:
          "În mod uzual, nu. Pentru RMN tema critică este RF shielding-ul, cușca Faraday și integritatea camerei față de interferențe electromagnetice.",
      },
      {
        question: "Ce influențează cel mai mult costul camerei RMN?",
        answer:
          "RF shielding-ul, ușa RF, filtrele, waveguides, penetrările, HVAC-ul, accesul magnetului, vibrațiile și coordonarea cu echipamentul.",
      },
      {
        question: "Rezultatul este ofertă finală?",
        answer:
          "Nu. Este o estimare orientativă care trebuie validată prin analiză tehnică, planuri, specificații de echipament și verificare de amplasament.",
      },
    ],
    primaryCta: { label: "Planificați camera RMN", href: "/radiology-room-planner" },
    secondaryCta: { label: "Structurați propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" },
      { label: "Diferența RF vs plumb", href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb" },
    ],
  },
  {
    slug: "cost-camera-ct",
    title: "Calculator cost cameră CT",
    description:
      "Estimator pentru cameră CT: protecție radiologică, ecranare cu plumb, zone controlate, CNCAN și integrare aparatură.",
    eyebrow: "CT radiation protection estimator",
    purpose:
      "Estimează complexitatea unei camere CT cu focus pe protecție radiologică și CNCAN, nu pe RF shielding.",
    targetKeyword: "calculator cost cameră CT",
    keywords: [
      "cost cameră CT",
      "protecție radiologică CT",
      "ecranare cu plumb CT",
      "CNCAN CT",
    ],
    fields: [
      optionField("roomSize", "Dimensiune cameră", [
        ["sub 20 mp", "small"],
        ["20-35 mp", "medium"],
        ["35-60 mp", "large"],
        ["peste 60 mp", "xl"],
      ]),
      optionField("building", "Tip clădire / spațiu", [
        ["Clădire nouă", "new"],
        ["Clădire medicală existentă", "existing-medical"],
        ["Clădire existentă nemedicală", "existing-nonmedical"],
        ["Spațiu comercial convertit", "converted"],
      ]),
      optionField("radiationProtection", "Protecție radiologică", [
        ["Calcul / soluție în lucru", "in-progress"],
        ["Necesară, neproiectată", "needed"],
        ["Nu știu încă", "unknown"],
        ["Deja proiectată", "designed"],
      ]),
      optionField("cncan", "Status CNCAN", [
        ["Nu am început", "not-started"],
        ["Documentație în lucru", "in-progress"],
        ["Clarificat preliminar", "prechecked"],
        ["Nu știu încă", "unknown"],
      ]),
      optionField("equipment", "Echipament CT selectat?", [
        ["Model selectat", "selected"],
        ["Oferte în analiză", "shortlist"],
        ["Nu încă", "not-selected"],
        ["Nu știu încă", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Camera CT are nevoie de RF shielding?",
        answer:
          "În mod uzual, nu. CT-ul folosește radiații ionizante, deci focusul este protecția radiologică, plumbul și coordonarea CNCAN.",
      },
      {
        question: "CNCAN afectează bugetul și timeline-ul?",
        answer:
          "Da. Documentația, zonele controlate și protecția radiologică trebuie tratate înainte de execuție pentru a reduce riscul de refaceri.",
      },
      {
        question: "Estimatorul include prețul echipamentului CT?",
        answer:
          "Nu ca ofertă comercială finală. Include o orientare de complexitate și componente de buget care trebuie validate cu specificațiile echipamentului.",
      },
    ],
    primaryCta: { label: "Planificați camera CT", href: "/radiology-room-planner" },
    secondaryCta: { label: "Structurați propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Protecție radiologică", href: "/services/protectie-radiologica" },
      { label: "Ghid cost cameră CT", href: "/ghiduri/cost-camera-ct" },
      { label: "Autorizare CNCAN", href: "/ghiduri/autorizare-cncan" },
    ],
  },
  {
    slug: "cost-laborator-ivd",
    title: "Calculator cost laborator IVD",
    description:
      "Estimator pentru laborator / IVD: infrastructură, echipamente, flux probe, integrare, calibrare, validare și service.",
    eyebrow: "IVD laboratory estimator",
    purpose:
      "Estimează complexitatea unui laborator medical în funcție de fluxuri, aparatură IVD, integrare și continuitate de service.",
    targetKeyword: "calculator cost laborator IVD",
    keywords: [
      "cost laborator IVD",
      "echipamente IVD laborator",
      "aparatură laborator medical",
      "integrare laborator",
    ],
    fields: [
      optionField("labSize", "Dimensiune laborator", [
        ["sub 50 mp", "small"],
        ["50-150 mp", "medium"],
        ["150-300 mp", "large"],
        ["peste 300 mp", "xl"],
      ]),
      optionField("equipmentCategory", "Categorie echipamente", [
        ["Biochimie / hematologie", "core"],
        ["Imunologie / molecular", "advanced"],
        ["Microbiologie", "microbiology"],
        ["Mai multe categorii", "multiple"],
        ["Nu știu încă", "unknown"],
      ]),
      optionField("workflow", "Complexitate flux probe", [
        ["Flux simplu", "simple"],
        ["Flux mediu", "medium"],
        ["Flux complex / volum mare", "complex"],
        ["Nu știu încă", "unknown"],
      ]),
      optionField("integration", "Integrare necesară", [
        ["Standalone", "standalone"],
        ["Integrare LIS / date", "lis"],
        ["Mai multe sisteme", "multiple"],
        ["Nu știu încă", "unknown"],
      ]),
      optionField("service", "Service / mentenanță", [
        ["Preventiv inclus", "preventive"],
        ["Contract necesar", "contract-needed"],
        ["Nu știu încă", "unknown"],
        ["Nu este decis", "undecided"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Ce include estimarea pentru laborator IVD?",
        answer:
          "Include orientativ infrastructură, echipamente IVD, flux probe, utilități, integrare, calibrare, validare și service.",
      },
      {
        question: "Service-ul IVD trebuie planificat de la început?",
        answer:
          "Da. Mentenanța, consumabilele, calibrarea, QC-ul și accesul tehnic pot influența proiectul și costurile recurente.",
      },
      {
        question: "Rezultatul este buget final?",
        answer:
          "Nu. Este o estimare orientativă pentru structurarea discuției tehnice și comerciale cu ZES.",
      },
    ],
    primaryCta: { label: "Structurați propunerea", href: "/proposal-builder" },
    secondaryCta: { label: "Discutați cu ZES", href: "/contact" },
    relatedLinks: [
      { label: "IVD / laborator", href: "/services/ivd-laborator" },
      { label: "Ghid echipamente IVD", href: "/ghiduri/echipamente-ivd-laborator" },
      { label: "Aparatură medicală", href: "/services/aparatura-medicala" },
    ],
  },
  {
    slug: "cost-echipamente-imagistica",
    title: "Calculator cost echipamente imagistică",
    description:
      "Estimator pentru achiziția și integrarea echipamentelor de imagistică: CT, RMN, RX, ecografie sau configurații multiple.",
    eyebrow: "Imaging equipment estimator",
    purpose:
      "Estimează complexitatea achiziției, infrastructurii, integrării și service-ului pentru aparatură de imagistică medicală.",
    targetKeyword: "calculator cost echipamente imagistică",
    keywords: [
      "cost echipamente imagistică",
      "aparatură imagistică medicală",
      "CT RMN RX ecografie",
      "integrare aparatură imagistică",
    ],
    fields: [
      optionField("equipmentType", "Tip echipament", [
        ["CT", "ct"],
        ["RMN", "rmn"],
        ["RX", "rx"],
        ["Ecografie", "ultrasound"],
        ["Mai multe echipamente", "multiple"],
      ]),
      optionField("acquisition", "Tip proiect aparatură", [
        ["Echipament nou", "new"],
        ["Înlocuire echipament", "replacement"],
        ["Upgrade / extindere", "upgrade"],
        ["Nu știu încă", "unknown"],
      ]),
      optionField("infrastructure", "Infrastructură pregătită?", [
        ["Da, verificată", "ready"],
        ["Parțial pregătită", "partial"],
        ["Nu este pregătită", "not-ready"],
        ["Nu știu încă", "unknown"],
      ]),
      optionField("integration", "Integrare necesară", [
        ["Livrare simplă", "basic"],
        ["Integrare tehnică", "technical"],
        ["Integrare + commissioning", "commissioning"],
        ["Nu știu încă", "unknown"],
      ]),
      optionField("service", "Contract service necesar?", [
        ["Da", "yes"],
        ["Nu", "no"],
        ["De stabilit", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Estimatorul include echipamentul și infrastructura?",
        answer:
          "Include orientativ ambele componente, dar valorile finale depind de model, furnizor, condiții de instalare și service.",
      },
      {
        question: "Cum separă calculatorul RMN de CT/RX?",
        answer:
          "RMN declanșează RF shielding și cerințe de mediu. CT/RX declanșează protecție radiologică, plumb și CNCAN.",
      },
      {
        question: "Ecografia are aceleași cerințe ca RMN sau CT?",
        answer:
          "Nu. Ecografia are de regulă cerințe mai simple de cameră, dar tot are nevoie de integrare clinică, service și mentenanță.",
      },
    ],
    primaryCta: { label: "Structurați propunerea", href: "/proposal-builder" },
    secondaryCta: { label: "Discutați cu ZES", href: "/contact" },
    relatedLinks: [
      { label: "Imagistică medicală", href: "/services/imagistica-medicala" },
      { label: "Ghid aparatură imagistică", href: "/ghiduri/aparatura-imagistica-medicala" },
      { label: "Service aparatură", href: "/services/service-aparatura-medicala" },
    ],
  },
  {
    slug: "service-aparatura",
    title: "Estimator service aparatură medicală",
    description:
      "Estimator pentru urgența service-ului: impact operațional, risc de downtime, prioritate intervenție și pași recomandați.",
    eyebrow: "Service triage estimator",
    purpose:
      "Estimează rapid urgența și riscul operațional pentru probleme de aparatură medicală, fără a pretinde diagnostic tehnic final.",
    targetKeyword: "calculator service aparatură medicală",
    keywords: [
      "service aparatură medicală",
      "mentenanță aparatură medicală",
      "diagnostic service echipamente medicale",
      "downtime aparatură medicală",
    ],
    fields: [
      optionField("equipmentType", "Tip echipament", [
        ["CT", "ct"],
        ["RMN", "rmn"],
        ["RX", "rx"],
        ["Ecograf", "ultrasound"],
        ["Echipament laborator / IVD", "ivd"],
        ["Alt echipament", "other"],
      ]),
      optionField("issue", "Problemă observată", [
        ["Nu pornește", "no-power"],
        ["Eroare sistem", "system-error"],
        ["Imagine slabă / artefacte", "image-quality"],
        ["Zgomot / supraîncălzire", "noise-heat"],
        ["Funcționare intermitentă", "intermittent"],
        ["Mentenanță preventivă", "preventive"],
      ]),
      optionField("impact", "Impact operațional", [
        ["Echipament oprit complet", "stopped"],
        ["Funcționează parțial", "partial"],
        ["Funcționează cu probleme", "degraded"],
        ["Preventiv / verificare", "preventive"],
      ]),
      optionField("maintenanceType", "Tip solicitare", [
        ["Corectivă", "corrective"],
        ["Preventivă", "preventive"],
        ["Verificare / evaluare", "evaluation"],
      ]),
      optionField("contract", "Contract service existent?", [
        ["Da", "yes"],
        ["Nu", "no"],
        ["Nu știu", "unknown"],
      ]),
      optionField("urgency", "Urgență", [
        ["Imediat", "immediate"],
        ["24-48 ore", "24-48"],
        ["Săptămâna aceasta", "week"],
        ["Fără urgență", "exploratory"],
      ]),
    ],
    faq: [
      {
        question: "Estimatorul oferă diagnostic tehnic final?",
        answer:
          "Nu. Oferă o triere preliminară de urgență, risc și pași recomandați, care trebuie validate de o evaluare service.",
      },
      {
        question: "Ce situații sunt critice?",
        answer:
          "Echipament oprit complet, impact operațional major, CT/RMN/RX cu erori sau artefacte, supraîncălzire ori urgență imediată.",
      },
      {
        question: "Mentenanța preventivă poate reduce downtime-ul?",
        answer:
          "Da. Nu elimină riscurile, dar ajută la planificarea verificărilor și la reducerea intervențiilor reactive.",
      },
    ],
    primaryCta: { label: "Evaluați problema service", href: "/service-diagnostic" },
    secondaryCta: { label: "Discutați cu ZES", href: "/contact" },
    relatedLinks: [
      { label: "Service aparatură medicală", href: "/services/service-aparatura-medicala" },
      { label: "Ghid service aparatură", href: "/ghiduri/service-aparatura-medicala" },
      { label: "Evaluare service aparatură", href: "/service-diagnostic" },
    ],
  },
];

export function getProgrammaticCalculatorBySlug(slug: string) {
  return programmaticCalculators.find((calculator) => calculator.slug === slug);
}

export function calculateProgrammaticCalculator(
  slug: CalculatorSlug,
  values: Record<string, string>,
): ProgrammaticCalculatorResult {
  switch (slug) {
    case "cost-camera-rmn":
      return calculateMriRoom(values);
    case "cost-camera-ct":
      return calculateCtRoom(values);
    case "cost-laborator-ivd":
      return calculateIvdLab(values);
    case "cost-echipamente-imagistica":
      return calculateImagingEquipment(values);
    case "service-aparatura":
      return calculateService(values);
  }
}

function optionField(
  id: string,
  label: string,
  options: Array<[label: string, value: string, note?: string]>,
): CalculatorField {
  return {
    id,
    label,
    options: options.map(([optionLabel, value, note]) => ({
      label: optionLabel,
      value,
      note,
    })),
  };
}

function urgencyField(): CalculatorField {
  return optionField("urgency", "Urgență", [
    ["Exploratoriu", "exploratory"],
    ["3-6 luni", "3-6"],
    ["1-3 luni", "1-3"],
    ["Imediat", "immediate"],
  ]);
}

function calculateMriRoom(values: Record<string, string>): ProgrammaticCalculatorResult {
  let score = 42;
  if (values.roomSize === "large") score += 10;
  if (values.roomSize === "xl") score += 16;
  if (values.building === "existing-nonmedical") score += 14;
  if (values.building === "converted") score += 18;
  if (values.rfShielding === "confirmed" || values.rfShielding === "probable") score += 16;
  if (values.rfShielding === "unknown") score += 10;
  if (values.equipment === "selected") score += 8;
  if (values.equipment === "unknown" || values.equipment === "not-selected") score += 6;
  if (values.hvac === "special") score += 10;
  if (values.hvac === "strict") score += 16;
  if (values.hvac === "unknown") score += 8;
  if (values.urgency === "1-3") score += 12;
  if (values.urgency === "immediate") score += 20;

  const normalizedScore = clampScore(score);
  const budget = specificBudget(
    normalizedScore,
    "cost-camera-rmn",
    [
      line("Analiză, proiectare și coordonare RMN", "EUR 5k-25k", "Planuri, cerințe furnizor, RF brief, HVAC, acces magnet și coordonare tehnică."),
      line("RF shielding / cușcă Faraday", "EUR 45k-180k+", "Ușă RF, filtre, waveguides, penetrări, continuitate și testare de atenuare."),
      line("HVAC, vibrații și pregătire cameră", "EUR 25k-160k+", "Crește cu cerințe stricte de temperatură, umiditate, răcire, quench și constrângeri de clădire."),
      line("Integrare echipament și commissioning", "EUR 12k-70k+", "Depinde de furnizor, acces, alimentare, date, teste și calendar."),
    ],
    [
      line("RF shielding pentru RMN", "Ridicat-Complex", "Faraday cage, RF doors, filters, waveguides și integritate electromagnetică."),
      line("Imagistică medicală - RMN", "Ridicat-Complex", "Coordonare aparatură, infrastructură, acces service și cerințe furnizor."),
      line("HVAC și infrastructură tehnică", "Mediu-Complex", "Mediu controlat, vibrații, trasee, electric și date."),
    ],
  );

  return {
    title: "Estimare orientativă cameră RMN",
    summary:
      "Proiectul este tratat ca infrastructură RMN cu RF shielding, cușcă Faraday, HVAC, vibrații și integrare echipament. Nu este o estimare pentru ecranare cu plumb.",
    score: normalizedScore,
    metricLabel: "Complexitate cameră RMN",
    metricValue: getAdvancedComplexity(normalizedScore),
    complexity: getAdvancedComplexity(normalizedScore),
    budget,
    timeline: timeline(
      normalizedScore >= 78 ? "6-10 luni" : "4-8 luni",
      [
        ["Analiză amplasament și fișă echipament", "1-3 săptămâni", "Planuri, acces magnet, cerințe furnizor și constrângeri clădire."],
        ["Proiectare RF / HVAC / infrastructură", "3-8 săptămâni", "Cerințe RF, penetrări, ușă RF, filtre, răcire și trasee."],
        ["Execuție cameră și RF shielding", "4-10 săptămâni", "Spațiu disponibil, materiale, coordonare RF și lucrări conexe."],
        ["Testare, integrare și commissioning", "2-5 săptămâni", "Test RF, echipament, HVAC, service și acceptanță tehnică."],
      ],
      ["Model RMN și cerințe furnizor", "Planuri și dimensiuni reale", "Cerințe RF attenuation și HVAC", "Acces pentru magnet și service"],
      ["RF shielding nevalidat", "HVAC subdimensionat", "calendar comprimat", "spațiu existent cu limitări"],
    ),
    risks: [
      risk("RF shielding", "Critical", "Integritatea cuștii Faraday poate fi compromisă de uși, filtre, penetrări sau execuție necoordonată.", "Validați soluția RF înainte de execuție și includeți testare de atenuare."),
      risk("HVAC / vibrații", values.hvac === "strict" ? "High" : "Medium", "RMN-ul poate avea cerințe stricte de temperatură, umiditate, răcire și vibrații.", "Coordonați HVAC-ul cu furnizorul echipamentului și spațiul tehnic."),
      risk("Integrare echipament", "High", "Accesul magnetului, traseele și cerințele furnizorului pot modifica layout-ul.", "Blocați fișa echipamentului și traseele înainte de execuție."),
    ],
    assumptions: [
      "RMN declanșează logică RF shielding, nu ecranare cu plumb.",
      "Estimarea presupune o cameră dedicată imagisticii prin rezonanță magnetică.",
      "Bugetul depinde de dimensiuni reale, echipament, cerințe furnizor și testare.",
    ],
    missingData: missingFromValues(values, [
      "Planuri, releveu și dimensiuni finale ale camerei",
      "Fișa echipamentului RMN și cerințele furnizorului",
      "Nivel RF attenuation, poziții penetrări, HVAC și acces magnet",
    ]),
    confidence: confidence(values, normalizedScore),
    recommendedServices: [
      "RF shielding pentru RMN",
      "Radiologie și camere imagistică",
      "Imagistică medicală",
      "Integrare aparatură medicală",
      "Consultanță tehnică ZES",
    ],
    nextSteps: [
      "Folosește Radiology Room Planner pentru o verificare dedicată camerei.",
      "Pregătește planurile, dimensiunile și fișa echipamentului RMN.",
      "Solicită o propunere preliminară în Proposal Builder.",
    ],
    emphasis: [
      "RF shielding, Faraday cage, RF doors, filters și waveguides.",
      "HVAC, vibrații, acces magnet și integrare furnizor.",
      "Fără confuzie cu ecranarea cu plumb pentru CT/RX.",
    ],
  };
}

function calculateCtRoom(values: Record<string, string>): ProgrammaticCalculatorResult {
  let score = 38;
  if (values.roomSize === "large") score += 8;
  if (values.roomSize === "xl") score += 12;
  if (values.building === "existing-nonmedical") score += 14;
  if (values.building === "converted") score += 18;
  if (values.radiationProtection === "needed") score += 16;
  if (values.radiationProtection === "unknown") score += 12;
  if (values.cncan === "not-started") score += 16;
  if (values.cncan === "unknown") score += 12;
  if (values.equipment === "selected") score += 8;
  if (values.equipment === "not-selected" || values.equipment === "unknown") score += 6;
  if (values.urgency === "1-3") score += 12;
  if (values.urgency === "immediate") score += 20;

  const normalizedScore = clampScore(score);
  const budget = specificBudget(
    normalizedScore,
    "cost-camera-ct",
    [
      line("Analiză radioprotecție și layout CT", "EUR 4k-18k", "Vecinătăți, poziție echipament, zone controlate și cerințe de operare."),
      line("Protecție radiologică / plumb", "EUR 25k-120k+", "Pereți, uși, sticlă plumbată și soluții conforme cu analiza tehnică."),
      line("CNCAN și documentație tehnică", "EUR 4k-25k", "Depinde de stadiu, documentație, echipament și coordonare."),
      line("Integrare CT și commissioning", "EUR 10k-60k+", "Alimentare, date, HVAC, acces, service și testare."),
    ],
    [
      line("Protecție radiologică / plumb", "Mediu-Ridicat", "Ecranare cu plumb, zone controlate și protecție pentru CT/RX."),
      line("Radiologie și CNCAN", "Mediu-Ridicat", "Coordonare documentație, layout și cerințe de autorizare."),
      line("Integrare aparatură CT", "Ridicat", "Fișa echipamentului, instalații, date, HVAC și service."),
    ],
  );

  return {
    title: "Estimare orientativă cameră CT",
    summary:
      "Proiectul este tratat ca infrastructură CT cu protecție radiologică, ecranare cu plumb, zone controlate, CNCAN și integrare aparatură. RF shielding-ul nu este componenta principală.",
    score: normalizedScore,
    metricLabel: "Complexitate cameră CT",
    metricValue: getAdvancedComplexity(normalizedScore),
    complexity: getAdvancedComplexity(normalizedScore),
    budget,
    timeline: timeline(
      normalizedScore >= 78 ? "5-9 luni" : "3-7 luni",
      [
        ["Analiză cameră și vecinătăți", "1-3 săptămâni", "Planuri, poziție echipament, operator, flux și zone adiacente."],
        ["Radioprotecție și CNCAN", "4-10 săptămâni", "Calcul, documentație, zone controlate și validări."],
        ["Execuție protecții și instalații", "4-9 săptămâni", "Plumb, uși, sticlă, electric, HVAC, date și finisaje."],
        ["Instalare, testare și predare", "2-5 săptămâni", "Integrare echipament, verificări și pregătire operațională."],
      ],
      ["Fișa echipamentului CT", "Calcul radioprotecție", "Status CNCAN", "Planuri și vecinătăți"],
      ["CNCAN neînceput", "protecție radiologică neproiectată", "spațiu existent", "urgență mare"],
    ),
    risks: [
      risk("CNCAN", values.cncan === "not-started" ? "High" : "Medium", "Documentația și zonele controlate pot întârzia proiectul dacă sunt tratate după execuție.", "Integrați CNCAN în proiectare, nu în recepția finală."),
      risk("Protecție radiologică", "High", "Pereții, ușile și sticla trebuie corelate cu echipamentul, vecinătățile și utilizarea camerei.", "Validați soluția de ecranare cu plumb înainte de lucrări."),
      risk("Integrare CT", "Medium", "Aparatura poate schimba alimentarea, HVAC-ul, datele, accesul și service-ul.", "Coordonați fișa echipamentului cu proiectarea tehnică."),
    ],
    assumptions: [
      "CT declanșează logică de protecție radiologică, plumb și CNCAN.",
      "Estimatorul nu tratează CT-ul ca proiect de RF shielding.",
      "Bugetul depinde de echipament, vecinătăți, calcul radioprotecție și status CNCAN.",
    ],
    missingData: missingFromValues(values, [
      "Fișa echipamentului CT și layout-ul propus",
      "Calcul radioprotecție, vecinătăți și zone controlate",
      "Status documentație CNCAN și planuri finale",
    ]),
    confidence: confidence(values, normalizedScore),
    recommendedServices: [
      "Protecție radiologică / ecranare cu plumb",
      "Radiologie",
      "Imagistică medicală - CT",
      "Consultanță CNCAN",
      "Integrare aparatură medicală",
    ],
    nextSteps: [
      "Folosește Radiology Room Planner pentru separarea riscurilor CT/RX.",
      "Pregătește planuri, vecinătăți și fișa echipamentului.",
      "Generează o propunere preliminară în Proposal Builder.",
    ],
    emphasis: [
      "Ecranare cu plumb, zone controlate, CNCAN și protecție radiologică.",
      "Integrare echipament CT cu instalații, HVAC, date și service.",
      "Fără confuzie cu RF shielding-ul specific RMN.",
    ],
  };
}

function calculateIvdLab(values: Record<string, string>): ProgrammaticCalculatorResult {
  let score = 28;
  if (values.labSize === "large") score += 12;
  if (values.labSize === "xl") score += 20;
  if (values.equipmentCategory === "advanced" || values.equipmentCategory === "microbiology") score += 14;
  if (values.equipmentCategory === "multiple") score += 22;
  if (values.equipmentCategory === "unknown") score += 8;
  if (values.workflow === "medium") score += 8;
  if (values.workflow === "complex") score += 18;
  if (values.workflow === "unknown") score += 8;
  if (values.integration === "lis") score += 10;
  if (values.integration === "multiple") score += 18;
  if (values.integration === "unknown") score += 8;
  if (values.service === "contract-needed" || values.service === "unknown") score += 8;
  if (values.urgency === "1-3") score += 10;
  if (values.urgency === "immediate") score += 16;

  const normalizedScore = clampScore(score);
  const budget = specificBudget(
    normalizedScore,
    "cost-laborator-ivd",
    [
      line("Concept laborator și flux probe", "EUR 3k-18k", "Fluxuri, zone suport, utilități, volum estimat și cerințe IVD."),
      line("Infrastructură laborator", "EUR 20k-160k+", "Utilități, mediu, mobilier tehnic, electric, date și condiții de lucru."),
      line("Echipamente IVD / laborator", "EUR 25k-300k+", "Depinde de categorie, volum, automatizare și furnizor."),
      line("Integrare, calibrare, validare și service", "EUR 8k-70k+", "LIS/date, QC, calibrare, training, mentenanță și continuitate."),
    ],
    [
      line("IVD / laborator", "Mediu-Ridicat", "Echipamente, fluxuri, utilități, calibrare și controlul calității."),
      line("Integrare echipamente", "Mediu-Ridicat", "Date, LIS, consumabile, instalare și validare."),
      line("Service / mentenanță", "Redus-Mediu recurent", "Plan preventiv, intervenții și continuitate operațională."),
    ],
  );

  return {
    title: "Estimare orientativă laborator IVD",
    summary:
      "Proiectul este tratat ca infrastructură de laborator plus echipamente IVD, flux probe, integrare, calibrare, validare și service.",
    score: normalizedScore,
    metricLabel: "Complexitate laborator IVD",
    metricValue: getAdvancedComplexity(normalizedScore),
    complexity: getAdvancedComplexity(normalizedScore),
    budget,
    timeline: timeline(
      normalizedScore >= 72 ? "4-8 luni" : "2-6 luni",
      [
        ["Definire flux probe și echipamente", "1-3 săptămâni", "Tip analize, volum, echipamente, consumabile și zone suport."],
        ["Proiectare infrastructură laborator", "2-6 săptămâni", "Utilități, electric, date, mobilier, temperatură și trasee."],
        ["Achiziție / integrare IVD", "3-10 săptămâni", "Disponibilitate echipamente, instalare, LIS și furnizori."],
        ["Calibrare, QC, validare și service", "1-4 săptămâni", "Calibrare, control calitate, training și mentenanță."],
      ],
      ["Listă echipamente IVD", "Flux probe și volum estimat", "Cerințe LIS/date", "Plan service și consumabile"],
      ["flux probe neclar", "integrare LIS", "service neplanificat", "urgență mare"],
    ),
    risks: [
      risk("Flux probe", values.workflow === "complex" ? "High" : "Medium", "Fluxurile neclare pot duce la trasee ineficiente și reconfigurări.", "Definește volumul și traseul probelor înainte de compartimentare."),
      risk("Calibrare / validare", "Medium", "Echipamentele IVD pot necesita calibrare, QC, consumabile și condiții de mediu.", "Include calibrarea și validarea în timeline și buget."),
      risk("Service continuity", values.service === "contract-needed" ? "High" : "Medium", "Fără plan de mentenanță, laboratorul poate avea downtime sau rezultate întârziate.", "Definește service-ul preventiv și accesul tehnic."),
    ],
    assumptions: [
      "Estimatorul tratează laboratorul ca sistem de infrastructură, echipamente IVD, flux și service.",
      "Bugetul depinde de categoria echipamentelor și de nivelul de integrare.",
      "Rezultatul nu include oferte comerciale finale pentru echipamente.",
    ],
    missingData: missingFromValues(values, [
      "Lista echipamentelor IVD și volumul de probe",
      "Cerințe de utilități, consumabile, temperatură și mobilier",
      "Integrare LIS/date, calibrare, QC și plan service",
    ]),
    confidence: confidence(values, normalizedScore),
    recommendedServices: [
      "IVD / echipamente laborator",
      "Aparatură medicală",
      "Integrare echipamente",
      "Service și mentenanță",
      "Consultanță tehnică ZES",
    ],
    nextSteps: [
      "Pregătește lista analizelor și volumul estimat de probe.",
      "Clarifică echipamentele IVD și cerințele de integrare.",
      "Solicită o propunere preliminară în Proposal Builder.",
    ],
    emphasis: [
      "IVD equipment, workflow, calibration, validation și QC.",
      "Laboratory infrastructure, utilities, LIS/data și service continuity.",
      "Costul real depinde de echipamente și de nivelul de automatizare.",
    ],
  };
}

function calculateImagingEquipment(values: Record<string, string>): ProgrammaticCalculatorResult {
  let score = 32;
  const hasRmn = values.equipmentType === "rmn" || values.equipmentType === "multiple";
  const hasCtRx =
    values.equipmentType === "ct" || values.equipmentType === "rx" || values.equipmentType === "multiple";

  if (values.equipmentType === "rmn") score += 24;
  if (values.equipmentType === "ct") score += 20;
  if (values.equipmentType === "rx") score += 14;
  if (values.equipmentType === "multiple") score += 30;
  if (values.acquisition === "replacement") score += 8;
  if (values.acquisition === "upgrade") score += 10;
  if (values.acquisition === "unknown") score += 8;
  if (values.infrastructure === "partial") score += 12;
  if (values.infrastructure === "not-ready") score += 22;
  if (values.infrastructure === "unknown") score += 14;
  if (values.integration === "technical") score += 10;
  if (values.integration === "commissioning") score += 16;
  if (values.integration === "unknown") score += 8;
  if (values.service === "yes" || values.service === "unknown") score += 8;
  if (values.urgency === "1-3") score += 10;
  if (values.urgency === "immediate") score += 16;

  const normalizedScore = clampScore(score);
  const budget = createBudgetEstimate({
    score: normalizedScore,
    hasRadiology: true,
    hasRmn,
    hasCtRx,
    hasEquipment: true,
    hasService: values.service !== "no",
    hasRfShielding: hasRmn,
    hasLeadShielding: hasCtRx,
    isExistingBuilding: values.acquisition === "replacement" || values.infrastructure !== "ready",
    isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
    equipmentAlreadySelected: values.acquisition === "replacement",
  });

  budget.phaseBreakdown = [
    line("Selecție / achiziție aparatură", "conform ofertelor furnizor", "Tipul echipamentului poate domina bugetul total."),
    line("Pregătire infrastructură", hasRmn ? "Mediu-Complex" : hasCtRx ? "Mediu-Ridicat" : "Redus-Mediu", "Camera, alimentare, HVAC, date, acces, shielding unde este cazul."),
    line("Integrare și commissioning", "EUR 8k-70k+", "Instalare, testare, date, protocoale și acceptanță tehnică."),
    line("Service / mentenanță", "Redus-Mediu recurent", "Contract, preventiv, piese, SLA și continuitate operațională."),
  ];
  budget.serviceBreakdown = [
    line("Aparatură imagistică medicală", budget.band, "CT, RMN, RX, ecografie sau configurații multiple."),
    line("Integrare echipamente", "Mediu-Ridicat", "Coordonare furnizor, infrastructură, date, HVAC și service."),
    line("Shielding relevant", hasRmn ? "RF shielding pentru RMN" : hasCtRx ? "Protecție radiologică / plumb" : "nu este de regulă dominant", "Se activează diferit pentru RMN față de CT/RX."),
  ];

  return {
    title: "Estimare orientativă aparatură imagistică",
    summary:
      "Estimatorul separă costul și riscul echipamentului de pregătirea infrastructurii, integrare, commissioning și service.",
    score: normalizedScore,
    metricLabel: "Complexitate planificare echipament",
    metricValue: getAdvancedComplexity(normalizedScore),
    complexity: getAdvancedComplexity(normalizedScore),
    budget,
    timeline: timeline(
      normalizedScore >= 76 ? "4-9 luni" : "2-6 luni",
      [
        ["Selecție și validare echipament", "1-6 săptămâni", "Necesită comparare tehnică, furnizori, garanție, service și infrastructură."],
        ["Pregătire cameră / infrastructură", "3-12 săptămâni", "Electric, HVAC, date, acces, shielding și lucrări conexe."],
        ["Livrare, instalare și integrare", "2-8 săptămâni", "Depinde de furnizor, acces, service și disponibilitate echipament."],
        ["Commissioning și plan service", "1-4 săptămâni", "Testare, training, mentenanță și continuitate operațională."],
      ],
      ["Fișa echipamentului", "Disponibilitate furnizor", "Starea infrastructurii", "Contract service"],
      ["infrastructură nepregătită", "echipament multiplu", "service neclar", "timeline comprimat"],
    ),
    risks: [
      risk("Infrastructură readiness", values.infrastructure === "not-ready" ? "High" : "Medium", "Aparatura poate cere modificări de cameră, alimentare, HVAC, date și acces.", "Validați infrastructura înainte de comandă sau livrare."),
      risk("Shielding relevant", hasRmn || hasCtRx ? "High" : "Low", hasRmn ? "RMN activează RF shielding, cușcă Faraday și HVAC specializat." : hasCtRx ? "CT/RX activează protecție radiologică, plumb și CNCAN." : "Ecografia are de regulă cerințe mai simple de cameră.", "Separați RF shielding-ul de ecranarea cu plumb în funcție de echipament."),
      risk("Service / uptime", values.service === "yes" ? "Medium" : "High", "Fără plan service, echipamentul poate produce downtime neplanificat.", "Includeți mentenanță și acces service în planificare."),
    ],
    assumptions: [
      "Echipamentul de imagistică este tratat ca business pillar separat, nu doar ca instalare.",
      "RMN declanșează RF shielding; CT/RX declanșează protecție radiologică și CNCAN.",
      "Bugetul final depinde de oferte de echipament, infrastructură și contract service.",
    ],
    missingData: missingFromValues(values, [
      "Model / configurație echipament și ofertă furnizor",
      "Starea camerei, alimentare, HVAC, date și acces",
      "Cerințe de shielding, autorizare, integrare și service",
    ]),
    confidence: confidence(values, normalizedScore),
    recommendedServices: [
      "Imagistică medicală",
      "Vânzare / selecție aparatură medicală",
      "Integrare aparatură medicală",
      hasRmn ? "RF shielding pentru RMN" : hasCtRx ? "Protecție radiologică / plumb" : "Service aparatură medicală",
      "Service și mentenanță",
    ],
    nextSteps: [
      "Compară echipamentul cu infrastructura disponibilă.",
      "Verifică dacă proiectul activează RF shielding sau protecție radiologică.",
      "Solicită propunere preliminară în Proposal Builder.",
    ],
    emphasis: [
      "Medical imaging equipment sales, integration și service.",
      "Infrastructure readiness înainte de comandă / livrare.",
      "RF pentru RMN, plumb + CNCAN pentru CT/RX.",
    ],
  };
}

function calculateService(values: Record<string, string>): ProgrammaticCalculatorResult {
  let score = 16;
  const criticalEquipment = values.equipmentType === "ct" || values.equipmentType === "rmn" || values.equipmentType === "rx";
  const isIvd = values.equipmentType === "ivd";

  if (criticalEquipment) score += 18;
  if (isIvd) score += 12;
  if (values.issue === "no-power" || values.issue === "system-error") score += 22;
  if (values.issue === "image-quality") score += criticalEquipment ? 20 : 10;
  if (values.issue === "noise-heat") score += 18;
  if (values.issue === "intermittent") score += 14;
  if (values.issue === "preventive") score += 2;
  if (values.impact === "stopped") score += 26;
  if (values.impact === "partial") score += 16;
  if (values.impact === "degraded") score += 10;
  if (values.maintenanceType === "preventive") score -= 8;
  if (values.contract === "no") score += 10;
  if (values.contract === "unknown") score += 6;
  if (values.urgency === "immediate") score += 22;
  if (values.urgency === "24-48") score += 14;
  if (values.urgency === "week") score += 6;

  const normalizedScore = clampScore(score);
  const urgency =
    normalizedScore >= 82 ? "Critic" : normalizedScore >= 62 ? "Ridicat" : normalizedScore >= 38 ? "Mediu" : "Redus";

  return {
    title: "Estimare orientativă service aparatură",
    summary:
      "Estimatorul oferă triere de urgență, risc operațional, prioritate de intervenție și pași recomandați. Nu este diagnostic tehnic final.",
    score: normalizedScore,
    metricLabel: "Nivel urgență",
    metricValue: urgency,
    timeline: timeline(
      urgency === "Critic" ? "Imediat / 24 ore" : urgency === "Ridicat" ? "24-48 ore" : urgency === "Mediu" ? "săptămâna aceasta" : "planificare preventivă",
      [
        ["Triage și colectare date", "în aceeași zi", "Model, serie, erori, simptome, fotografii și impact operațional."],
        ["Evaluare tehnică", urgency === "Critic" ? "imediat" : "1-5 zile", "În funcție de acces, contract, piese, echipament și disponibilitate."],
        ["Intervenție / mentenanță", "conform diagnostic", "Poate include verificări, calibrare, piese, software, curățare sau escaladare."],
        ["Prevenție și continuitate", "recurent", "Plan preventiv, istoric service, SLA și acces tehnic."],
      ],
      ["Model și serie echipament", "Coduri eroare / simptome", "Impact operațional", "Contract service și istoric"],
      ["downtime", "contract service lipsă", "problemă intermitentă", "echipament critic"],
    ),
    risks: [
      risk("Downtime operațional", urgency === "Critic" ? "Critical" : urgency === "Ridicat" ? "High" : "Medium", "Problema poate afecta programările, rezultatele sau continuitatea activității.", "Prioritizați trierea și colectarea datelor tehnice."),
      risk("Cauză tehnică probabilă", values.issue === "noise-heat" ? "High" : values.issue === "intermittent" ? "Medium" : "Medium", rootCauseText(values.issue, isIvd), "Nu înlocuiește diagnosticarea; cere verificare service."),
      risk("Contract service", values.contract === "no" ? "High" : "Medium", "Fără contract sau istoric clar, timpul de intervenție poate crește.", "Clarificați responsabilitatea, accesul, piesele și mentenanța preventivă."),
    ],
    assumptions: [
      "Triage-ul folosește doar răspunsurile introduse și nu înlocuiește verificarea tehnică.",
      "Nu se stabilește cauza finală fără verificare tehnică.",
      isIvd ? "Pentru IVD/laborator pot fi relevante calibrarea, QC-ul și validarea." : "Pentru imagistică pot fi relevante calitatea imaginii, sistemele, răcirea și uptime-ul.",
    ],
    missingData: missingFromValues(values, [
      "Model, serie, coduri de eroare și istoric service",
      "Fotografii / capturi ale mesajelor de eroare",
      "Data ultimei mentenanțe, contract și impact asupra programărilor",
    ]),
    confidence: confidence(values, normalizedScore),
    recommendedServices: [
      "Service aparatură medicală",
      "Mentenanță preventivă",
      isIvd ? "Service IVD / laborator" : "Service imagistică medicală",
      "Evaluare tehnică ZES",
    ],
    nextSteps: [
      "Deschide evaluarea service pentru o triere mai detaliată.",
      "Pregătește modelul, seria, codurile de eroare și istoricul service.",
      urgency === "Critic" ? "Solicită evaluare rapidă ZES." : "Planifică o verificare preventivă sau corectivă.",
    ],
    emphasis: [
      `Prioritate estimată: ${urgency}.`,
      "Downtime risk, operational impact și service continuity.",
      isIvd ? "Pentru IVD: calibrare, QC și validare pot fi relevante." : "Pentru CT/RMN/RX: uptime și calitatea imaginii sunt critice.",
    ],
  };
}

function specificBudget(
  score: number,
  slug: CalculatorSlug,
  phaseBreakdown: BudgetLine[],
  serviceBreakdown: BudgetLine[],
): BudgetEstimate {
  const base = createBudgetEstimate({
    score,
    hasRadiology:
      slug === "cost-camera-rmn" ||
      slug === "cost-camera-ct" ||
      slug === "cost-echipamente-imagistica",
    hasRmn: slug === "cost-camera-rmn",
    hasCtRx: slug === "cost-camera-ct",
    hasLab: slug === "cost-laborator-ivd",
    hasEquipment: true,
    hasService: slug === "cost-laborator-ivd" || slug === "cost-echipamente-imagistica",
    hasRfShielding: slug === "cost-camera-rmn",
    hasLeadShielding: slug === "cost-camera-ct",
    isLarge: score >= 72,
    isExistingBuilding: score >= 58,
    isUrgent: score >= 76,
    equipmentAlreadySelected: false,
  });

  return {
    ...base,
    phaseBreakdown,
    serviceBreakdown,
    disclaimer: BUDGET_DISCLAIMER,
  };
}

function timeline(
  estimatedDuration: string,
  phases: Array<[phase: string, duration: string, dependency: string]>,
  criticalDependencies: string[],
  riskFactors: string[],
): TimelineEstimate {
  return {
    estimatedDuration,
    phases: phases.map(([phase, duration, dependency]) => ({
      phase,
      duration,
      dependency,
    })),
    criticalDependencies,
    riskFactors,
  };
}

function line(label: string, range: string, note: string): BudgetLine {
  return { label, range, note };
}

function confidence(values: Record<string, string>, score: number) {
  const valueList = Object.values(values);
  return createConfidenceEstimate({
    answered: valueList.filter(Boolean).length,
    total: valueList.length,
    unknowns: valueList.filter((value) => value === "unknown").length,
    score,
  });
}

function missingFromValues(values: Record<string, string>, base: string[]) {
  const missing = [...base];

  if (Object.values(values).some((value) => value === "unknown")) {
    missing.push("Clarificarea opțiunilor marcate ca necunoscute.");
  }

  return missing;
}

function rootCauseText(issue: string, isIvd: boolean) {
  if (issue === "no-power") {
    return "Posibile categorii: alimentare, siguranțe, module de putere, cablare sau componentă internă.";
  }

  if (issue === "system-error") {
    return "Posibile categorii: software, senzori, module electronice, comunicare internă sau condiții de mediu.";
  }

  if (issue === "image-quality") {
    return "Posibile categorii: calibrare, detector / coil, protocoale, artefacte, software sau condiții de mediu.";
  }

  if (issue === "noise-heat") {
    return "Posibile categorii: răcire, ventilatoare, componente mecanice, filtre, alimentare sau încărcare operațională.";
  }

  if (issue === "intermittent") {
    return "Posibile categorii: alimentare instabilă, contacte, senzori, software, temperatură sau componentă în degradare.";
  }

  return isIvd
    ? "Posibile categorii: calibrare, QC, reactivi, consumabile, senzori sau mentenanță preventivă."
    : "Posibile categorii: uzură, calibrare, condiții de mediu sau mentenanță preventivă.";
}

function clampScore(score: number) {
  return Math.max(8, Math.min(100, score));
}
