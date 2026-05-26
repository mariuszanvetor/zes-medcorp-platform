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
  | "service-aparatura"
  | "rf-shielding-estimare"
  | "radioprotectie-ct-estimare"
  | "putere-electrica-imagistica"
  | "hvac-imagistica-estimare"
  | "spatiu-minim-rmn"
  | "spatiu-minim-ct"
  | "timp-implementare-proiect-medical"
  | "modernizare-clinica-estimare"
  | "infrastructura-radiologie-estimare"
  | "ups-imagistica"
  | "flux-pacienti-imagistica"
  | "evaluare-preliminara-clinica";

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

export type CalculatorResultBuilder = (
  values: Record<string, string>,
) => ProgrammaticCalculatorResult;

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
  buildResult?: CalculatorResultBuilder;
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
  {
    slug: "rf-shielding-estimare",
    title: "Estimator RF shielding",
    description:
      "Estimator pentru proiecte RMN care au nevoie de cuști Faraday, uși RF, filtre, waveguides, HVAC și coordonare tehnică.",
    eyebrow: "RF shielding planner",
    purpose:
      "Estimeaza complexitatea RF shielding-ului in proiecte RMN fara a-l confunda cu protectia radiologica sau cu ecranarea cu plumb.",
    targetKeyword: "estimare RF shielding",
    keywords: ["RF shielding RMN", "cusca Faraday", "usa RF", "waveguides RMN"],
    fields: [
      optionField("roomSize", "Dimensiune camera", [
        ["sub 20 mp", "small"],
        ["20-35 mp", "medium"],
        ["35-60 mp", "large"],
        ["peste 60 mp", "xl"],
      ]),
      optionField("building", "Tip cladire", [
        ["Cladire noua", "new"],
        ["Cladire medicala existenta", "existing-medical"],
        ["Cladire existenta nemedicala", "existing-nonmedical"],
        ["Spatiu convertit", "converted"],
      ]),
      optionField("shielding", "Stadiu RF shielding", [
        ["Necesita proiectare", "needed"],
        ["Probabil necesar", "probable"],
        ["Deja proiectat", "designed"],
        ["Nu stiu inca", "unknown"],
      ]),
      optionField("hvac", "Complexitate HVAC", [
        ["Standard", "standard"],
        ["Cerinte speciale", "special"],
        ["Strict", "strict"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "RF shielding este acelasi lucru cu plumbul?",
        answer:
          "Nu. RF shielding este pentru RMN si atenuarea interferentelor electromagnetice; plumbul este asociat cu protectia radiologica la CT/RX.",
      },
      {
        question: "Ce influenteaza cel mai mult estimarea?",
        answer:
          "Cușca Faraday, usile RF, penetrarile, filtrele, waveguides, HVAC-ul si modul in care este coordonat echipamentul.",
      },
      {
        question: "Rezultatul este oferta finala?",
        answer:
          "Nu. Este o estimare orientativa care trebuie validata tehnic pe planuri si specificatii reale.",
      },
    ],
    primaryCta: { label: "Verificati camera RMN", href: "/radiology-room-planner" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Camera Faraday pentru RMN", href: "/knowledge-hub/camera-faraday-rmn" },
      { label: "RF shielding vs protectie radiologica", href: "/comparatii/rf-shielding-vs-radioprotectie" },
      { label: "Glosar Faraday cage", href: "/glosar/faraday-cage-explicatie" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("rf-shielding", values),
  },
  {
    slug: "radioprotectie-ct-estimare",
    title: "Estimator protectie radiologica CT",
    description:
      "Estimator pentru CT care masoara complexitatea protectiei radiologice, a ecranarii cu plumb, a vecinatatilor si a cerintelor CNCAN.",
    eyebrow: "CT radioprotection planner",
    purpose:
      "Separă clar proiectele CT/RX de RMN: aici contează plumbul, zonele controlate si documentatia CNCAN.",
    targetKeyword: "estimare protectie radiologica CT",
    keywords: ["protectie radiologica CT", "ecranare cu plumb", "zone controlate", "CNCAN CT"],
    fields: [
      optionField("roomSize", "Dimensiune camera", [
        ["sub 20 mp", "small"],
        ["20-35 mp", "medium"],
        ["35-60 mp", "large"],
        ["peste 60 mp", "xl"],
      ]),
      optionField("building", "Tip cladire", [
        ["Cladire noua", "new"],
        ["Cladire medicala existenta", "existing-medical"],
        ["Cladire existenta nemedicala", "existing-nonmedical"],
        ["Spatiu convertit", "converted"],
      ]),
      optionField("shielding", "Stadiu protectie", [
        ["Necesita proiectare", "needed"],
        ["In lucru", "progress"],
        ["Deja proiectata", "designed"],
        ["Nu stiu inca", "unknown"],
      ]),
      optionField("cncan", "Status CNCAN", [
        ["Nu am inceput", "not-started"],
        ["Documentatie in lucru", "in-progress"],
        ["Clarificat preliminar", "prechecked"],
        ["Nu stiu inca", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "CT are nevoie de RF shielding?",
        answer:
          "Nu in mod uzual. Pentru CT conteaza protectia radiologica, plumbul si CNCAN, nu cușca Faraday.",
      },
      {
        question: "De ce conteaza vecinatatile?",
        answer:
          "Pentru ca ele determina grosimile, solutiile constructive si nivelul de protectie necesar.",
      },
      {
        question: "Este un calcul final de radioprotectie?",
        answer:
          "Nu. Este un calculator preliminar care indica complexitatea si pasii de validat.",
      },
    ],
    primaryCta: { label: "Verificati camera CT", href: "/radiology-room-planner" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
      { label: "Autorizare CNCAN", href: "/ghiduri/autorizare-cncan" },
      { label: "CT vs CBCT", href: "/comparatii/ct-vs-cbct" },
      { label: "Glosar plumb vs RF", href: "/glosar/plumb-vs-rf-shielding" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("radioprotectie-ct", values),
  },
  {
    slug: "putere-electrica-imagistica",
    title: "Calculator putere electrica imagistica",
    description:
      "Estimare pentru capacitate electrica, tablouri, redundanta, UPS si pregatirea infrastructurii pentru echipamente de imagistica.",
    eyebrow: "Electric readiness",
    purpose:
      "Arata cat de pregatita este partea electrica pentru CT, RMN sau configuratii multiple de imagistica.",
    targetKeyword: "estimare putere electrica imagistica",
    keywords: [
      "capacitate electrica imagistica",
      "UPS imagistica",
      "tablou electric medical",
      "alimentare RMN CT",
    ],
    fields: [
      optionField("modality", "Tip echipament", [
        ["RMN", "rmn"],
        ["CT", "ct"],
        ["RX", "rx"],
        ["Mai multe echipamente", "multiple"],
      ]),
      optionField("infra", "Infrastructura electrica", [
        ["Pregatita", "ready"],
        ["Partial pregatita", "partial"],
        ["Nu este pregatita", "not-ready"],
        ["Nu stiu inca", "unknown"],
      ]),
      optionField("backup", "Redundanta / backup", [
        ["Da", "yes"],
        ["Nu", "no"],
        ["De stabilit", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Calculatorul da valori electrice finale?",
        answer:
          "Nu. Ofera o orientare de complexitate si de buget, nu dimensionare finala pentru tablouri sau circuite.",
      },
      {
        question: "Ce creste complexitatea?",
        answer:
          "Echipamente multiple, infrastructura partial pregatita si nevoie de backup/UPS.",
      },
      {
        question: "Pot folosi estimarea pentru plan intern?",
        answer:
          "Da, dar trebuie validata cu fisele reale ale echipamentelor si cu audit electric.",
      },
    ],
    primaryCta: { label: "Continuati cu Project Intake", href: "/project-intake" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "UPS imagistica", href: "/calculatoare/ups-imagistica" },
      { label: "Analiza preliminara", href: "/ai-project-advisor" },
      { label: "Glosar HVAC imagistica", href: "/glosar/medical-imaging-room-hvac-guide" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("power-electric", values),
  },
  {
    slug: "hvac-imagistica-estimare",
    title: "Calculator HVAC pentru imagistica",
    description:
      "Estimare pentru control climatic, racire, umiditate, trasee si integrare HVAC pentru imagistica medicala.",
    eyebrow: "HVAC planning",
    purpose:
      "Arata cat de strict trebuie tratat mediul tehnic pentru RMN, CT sau configuratii complexe de imagistica.",
    targetKeyword: "estimare HVAC imagistica",
    keywords: ["HVAC imagistica medicala", "temperatura si umiditate RMN", "racire CT", "instalatii climatizare medicala"],
    fields: [
      optionField("modality", "Tip echipament", [
        ["RMN", "rmn"],
        ["CT", "ct"],
        ["RX", "rx"],
        ["Mai multe echipamente", "multiple"],
      ]),
      optionField("roomSize", "Dimensiune camera", [
        ["sub 20 mp", "small"],
        ["20-35 mp", "medium"],
        ["35-60 mp", "large"],
        ["peste 60 mp", "xl"],
      ]),
      optionField("hvac", "Complexitate HVAC", [
        ["Standard", "standard"],
        ["Special", "special"],
        ["Strict", "strict"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "HVAC-ul e la fel pentru RMN si CT?",
        answer:
          "Nu. RMN-ul are de obicei cerinte mai stricte de mediu si integrare fata de CT sau RX.",
      },
      {
        question: "Calculatorul inlocuieste proiectarea HVAC?",
        answer:
          "Nu. Ajuta la orientare si la alegerea pasilor corecti inainte de proiectarea finala.",
      },
      {
        question: "De ce conteaza umiditatea?",
        answer:
          "Pentru stabilitatea echipamentului, confortul operational si reducerea riscului de rework.",
      },
    ],
    primaryCta: { label: "Continuati cu Project Intake", href: "/project-intake" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Proiectare radiologie", href: "/services/radiologie" },
      { label: "Camera Faraday pentru RMN", href: "/knowledge-hub/camera-faraday-rmn" },
      { label: "Glosar HVAC imagistica", href: "/glosar/medical-imaging-room-hvac-guide" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("hvac-imagistica", values),
  },
  {
    slug: "spatiu-minim-rmn",
    title: "Calculator spatiu minim RMN",
    description:
      "Estimare pentru cat de mult trebuie ajustat spatiul inainte de un proiect RMN: dimensiuni utile, acces, RF si HVAC.",
    eyebrow: "RMN space readiness",
    purpose:
      "Arata daca spatiul actual poate fi adus la nivel RMN sau daca proiectul cere o schimbare mai mare.",
    targetKeyword: "spatiu minim RMN",
    keywords: ["dimensiuni RMN", "spatiu minim camera RMN", "RF shielding RMN", "layout RMN"],
    fields: [
      optionField("roomSize", "Dimensiune disponibila", [
        ["sub 20 mp", "small"],
        ["20-35 mp", "medium"],
        ["35-60 mp", "large"],
        ["peste 60 mp", "xl"],
      ]),
      optionField("building", "Tip cladire", [
        ["Cladire noua", "new"],
        ["Cladire medicala existenta", "existing-medical"],
        ["Cladire existenta nemedicala", "existing-nonmedical"],
        ["Spatiu convertit", "converted"],
      ]),
      optionField("shielding", "RF shielding", [
        ["Necesita proiectare", "needed"],
        ["Deja proiectat", "designed"],
        ["Nu stiu inca", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Pot verifica daca am spatiu suficient?",
        answer:
          "Da, dar rezultatul este orientativ si trebuie validat pe planuri si cu fisa echipamentului.",
      },
      {
        question: "Spatiul minim include si accesul?",
        answer:
          "Da. Include si acces, spatii tehnice, RF, HVAC si trasee pentru instalare si service.",
      },
      {
        question: "Daca spatiul pare mic, proiectul e imposibil?",
        answer:
          "Nu neaparat, dar riscul de reconfigurare si costurile de corectie cresc.",
      },
    ],
    primaryCta: { label: "Verificati camera RMN", href: "/radiology-room-planner" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Diferenta RMN vs CT", href: "/comparatii/rmn-vs-ct" },
      { label: "Glosar RMN vs CT", href: "/glosar/rmn-vs-ct-infrastructura" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("space-rmn", values),
  },
  {
    slug: "spatiu-minim-ct",
    title: "Calculator spatiu minim CT",
    description:
      "Estimare pentru spatiul necesar unui proiect CT: vecinatati, ecranare cu plumb, acces si cerinte de autorizare.",
    eyebrow: "CT space readiness",
    purpose:
      "Arata daca spatiul existent poate sustine un proiect CT fara corectii majore sau daca sunt necesare lucrari mai ample.",
    targetKeyword: "spatiu minim CT",
    keywords: ["dimensiuni CT", "spatiu minim camera CT", "protectie radiologica CT", "layout CT"],
    fields: [
      optionField("roomSize", "Dimensiune disponibila", [
        ["sub 20 mp", "small"],
        ["20-35 mp", "medium"],
        ["35-60 mp", "large"],
        ["peste 60 mp", "xl"],
      ]),
      optionField("building", "Tip cladire", [
        ["Cladire noua", "new"],
        ["Cladire medicala existenta", "existing-medical"],
        ["Cladire existenta nemedicala", "existing-nonmedical"],
        ["Spatiu convertit", "converted"],
      ]),
      optionField("shielding", "Protectie radiologica", [
        ["Necesita proiectare", "needed"],
        ["In lucru", "progress"],
        ["Deja proiectata", "designed"],
        ["Nu stiu inca", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "CT are nevoie de RF shielding?",
        answer:
          "Nu in mod uzual. Pentru CT conteaza protectia radiologica, plumbul si CNCAN.",
      },
      {
        question: "Spatiul minim include si accesul?",
        answer:
          "Da. Accesul pentru echipament, service si fluxul operational sunt parte din estimare.",
      },
      {
        question: "Daca spatiul e mic, CT-ul nu se poate instala?",
        answer:
          "Nu neaparat, dar cerintele de protectie si layout pot creste semnificativ.",
      },
    ],
    primaryCta: { label: "Verificati camera CT", href: "/radiology-room-planner" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Cost camera CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
      { label: "Autorizare CNCAN", href: "/ghiduri/autorizare-cncan" },
      { label: "CT vs CBCT", href: "/comparatii/ct-vs-cbct" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("space-ct", values),
  },
  {
    slug: "timp-implementare-proiect-medical",
    title: "Estimator timp implementare proiect medical",
    description:
      "Estimator pentru calendarul unui proiect medical, de la brief la predare, in functie de spatiu, autorizare, echipament si urgenta.",
    eyebrow: "Implementation planner",
    purpose:
      "Ajuta la intelegerea duratei relative a proiectului si a pasilor care pot muta calendarul.",
    targetKeyword: "timp implementare proiect medical",
    keywords: ["calendar proiect medical", "implementare clinica", "timp autorizare medicala", "planning medical"],
    fields: [
      optionField("projectType", "Tip proiect", [
        ["Clinica noua", "clinic"],
        ["Radiologie", "radiology"],
        ["RMN", "rmn"],
        ["CT", "ct"],
        ["IVD / laborator", "ivd"],
        ["Modernizare", "modernization"],
      ]),
      optionField("building", "Tip cladire", [
        ["Cladire noua", "new"],
        ["Cladire existenta", "existing"],
        ["Spatiu convertit", "converted"],
      ]),
      optionField("equipment", "Echipament selectat?", [
        ["Da", "selected"],
        ["In analiza", "review"],
        ["Nu inca", "not-selected"],
      ]),
      optionField("auth", "Stadiu documentatie", [
        ["Nu am inceput", "not-started"],
        ["In lucru", "in-progress"],
        ["Clarificat", "ready"],
        ["Nu stiu inca", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Poate calculatorul sa prezica termenul final exact?",
        answer:
          "Nu. Arata doar o estimare orientativa de calendar si factorii care il influenteaza.",
      },
      {
        question: "Ce muta cel mai mult termenul?",
        answer:
          "Autorizarea, echipamentul ales, starea spatiului si gradul de modernizare necesar.",
      },
      {
        question: "Cum il folosesc corect?",
        answer:
          "Ca orientare pentru planificare interna, apoi treci in Project Intake sau Proposal Builder.",
      },
    ],
    primaryCta: { label: "Incepeti Project Intake", href: "/project-intake" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Project Intake", href: "/project-intake" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Planificare proiect medical", href: "/planificare" },
      { label: "Planificare fluxuri clinica medicala", href: "/knowledge-hub/planificare-fluxuri-clinica-medicala" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("implementation", values),
  },
  {
    slug: "modernizare-clinica-estimare",
    title: "Estimator modernizare clinica",
    description:
      "Estimare pentru modernizarea unei clinici existente: corectii de infrastructura, downtime, integrare si complexitate de implementare.",
    eyebrow: "Modernization planner",
    purpose:
      "Arata cat de mult trebuie ajustat un spatiu existent si cat de mult poate schimba proiectul o modernizare reala.",
    targetKeyword: "modernizare clinica estimare",
    keywords: ["modernizare clinica", "renovare tehnica medicala", "downtime clinica", "corectii infrastructura"],
    fields: [
      optionField("scope", "Scop modernizare", [
        ["General", "general"],
        ["Radiologie", "radiology"],
        ["Complet", "full"],
      ]),
      optionField("facility", "Starea facilitatii", [
        ["Noua", "new"],
        ["Mixta", "mixed"],
        ["Veche", "old"],
      ]),
      optionField("downtime", "Downtime acceptat", [
        ["Niciunul", "none"],
        ["Mic", "low"],
        ["Mediu", "medium"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Modernizarea este mereu mai ieftina decat o clinica noua?",
        answer:
          "Nu neaparat. Spatiile vechi pot ascunde corectii costisitoare si downtime mai mare.",
      },
      {
        question: "Estimation-ul include si radiologia?",
        answer:
          "Da, daca scope-ul include radiologie, complexitatea creste substantial.",
      },
      {
        question: "Pot folosi rezultatul ca buget final?",
        answer:
          "Nu. Este orientativ si trebuie validat tehnic pe infrastructura existenta.",
      },
    ],
    primaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    secondaryCta: { label: "Incepeti Project Intake", href: "/project-intake" },
    relatedLinks: [
      { label: "Modernizare radiologie clinica", href: "/knowledge-hub/modernizare-radiologie-clinica" },
      { label: "Modernizare clinica existenta", href: "/knowledge-hub/modernizare-clinica-existenta-pasi-riscuri" },
      { label: "Comparatie modernizare vs clinica noua", href: "/comparatii/modernizare-clinica-vs-clinica-noua" },
      { label: "Costuri ascunse amenajare clinica", href: "/knowledge-hub/costuri-ascunse-amenajare-clinica-medicala" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("modernization", values),
  },
  {
    slug: "infrastructura-radiologie-estimare",
    title: "Estimator infrastructura radiologie",
    description:
      "Estimare pentru o infrastructura de radiologie multi-mod: RMN, CT, RX, shielding, integrare si service.",
    eyebrow: "Radiology infrastructure planner",
    purpose:
      "Arata cum se combina cerintele de radiologie intr-un proiect coerent, fara sa amestece RF cu plumbul.",
    targetKeyword: "estimare infrastructura radiologie",
    keywords: ["infrastructura radiologie", "RMN CT RX", "shielding radiologie", "proiect radiologie"],
    fields: [
      optionField("modalities", "Moduri incluse", [
        ["RMN", "rmn"],
        ["CT", "ct"],
        ["RX", "rx"],
        ["Mai multe", "multiple"],
      ]),
      optionField("infrastructure", "Infrastructura existenta", [
        ["Pregatita", "ready"],
        ["Partial", "partial"],
        ["Nu este pregatita", "not-ready"],
      ]),
      optionField("shielding", "Tip shielding", [
        ["RF", "rf"],
        ["Plumb", "lead"],
        ["Ambele", "both"],
        ["Nu stiu", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Pot trata RMN si CT in acelasi mod?",
        answer:
          "Nu. RMN-ul necesita RF shielding, iar CT/RX necesita protectie radiologica si CNCAN.",
      },
      {
        question: "Estimarile sunt finale?",
        answer:
          "Nu. Sunt orientative si cer validare pe fiecare modul si pe infrastructura reala.",
      },
      {
        question: "La ce ajuta?",
        answer:
          "La structurarea proiectului si la identificarea riscurilor tehnice inainte de bugetare finala.",
      },
    ],
    primaryCta: { label: "Verificati camera radiologie", href: "/radiology-room-planner" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "RMN vs CT", href: "/comparatii/rmn-vs-ct" },
      { label: "RF shielding vs protectie radiologica", href: "/comparatii/rf-shielding-vs-radioprotectie" },
      { label: "Glosar radiologie", href: "/glosar/radiology-clinic-startup-requirements" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("radiology-infra", values),
  },
  {
    slug: "ups-imagistica",
    title: "Calculator necesar UPS imagistica",
    description:
      "Estimare pentru redundanta si UPS in proiecte de imagistica, cu accent pe autonomie, consum si continuitate.",
    eyebrow: "UPS planning",
    purpose:
      "Arata cat de importanta este redundanta pentru echipamentele de imagistica si ce nivel de backup merita evaluat.",
    targetKeyword: "UPS imagistica",
    keywords: ["UPS imagistica", "redudanta imagistica", "continuitate operare", "backup medical"],
    fields: [
      optionField("modality", "Tip echipament", [
        ["RMN", "rmn"],
        ["CT", "ct"],
        ["RX", "rx"],
        ["Mai multe echipamente", "multiple"],
      ]),
      optionField("outage", "Toleranta la intrerupere", [
        ["Critica", "critical"],
        ["Ridicata", "high"],
        ["Moderata", "medium"],
      ]),
      optionField("current", "UPS existent", [
        ["Da", "yes"],
        ["Nu", "no"],
        ["Nu stiu", "unknown"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "UPS-ul rezolva toate intreruperile?",
        answer:
          "Nu. Este doar o parte din strategia de continuitate si trebuie dimensionat pe consumul real.",
      },
      {
        question: "De ce este important la imagistica?",
        answer:
          "Pentru ca downtime-ul poate afecta programarile, datele si siguranta operationala.",
      },
      {
        question: "Pot folosi calculatorul pentru achizitie?",
        answer:
          "Da, dar ca ipoteza de lucru. Solutia finala trebuie validata electric si operational.",
      },
    ],
    primaryCta: { label: "Continuati cu Project Intake", href: "/project-intake" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Calculator putere electrica imagistica", href: "/calculatoare/putere-electrica-imagistica" },
      { label: "Service aparatura medicala", href: "/services/service-aparatura-medicala" },
      { label: "Calculator cost echipamente imagistica", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Glosar continuitate service", href: "/glosar/service-contract-vs-maintenance" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("ups", values),
  },
  {
    slug: "flux-pacienti-imagistica",
    title: "Calculator flux pacienti imagistica",
    description:
      "Estimare pentru volum, trasee, receptie, timp de asteptare si organizarea fluxului in imagistica medicala.",
    eyebrow: "Patient flow planner",
    purpose:
      "Arata daca fluxul curent poate suporta volumul dorit sau daca layout-ul trebuie redesenat pentru a reduce blocajele.",
    targetKeyword: "flux pacienti imagistica",
    keywords: ["flux pacienti", "organizare imagistica", "sala de asteptare", "workflow radiologie"],
    fields: [
      optionField("modality", "Tip echipament", [
        ["RMN", "rmn"],
        ["CT", "ct"],
        ["RX", "rx"],
        ["Mai multe echipamente", "multiple"],
      ]),
      optionField("volume", "Volum zilnic", [
        ["Mic", "low"],
        ["Mediu", "medium"],
        ["Mare", "high"],
      ]),
      optionField("rooms", "Camere / fluxuri", [
        ["Una", "single"],
        ["Mai multe", "multiple"],
      ]),
      optionField("staff", "Capacitate staff", [
        ["Suficienta", "yes"],
        ["Partiala", "partial"],
        ["Redusa", "low"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Fluxul pacientilor e doar un detaliu de operare?",
        answer:
          "Nu. Poate schimba layout-ul, timpul de asteptare si utilizarea echipamentelor.",
      },
      {
        question: "Calculatorul inlocuieste analiza operationala?",
        answer:
          "Nu. Il folosesti pentru orientare si apoi validezi scenariul cu echipa tehnica.",
      },
      {
        question: "Ce se imbunatateste prin optimizare?",
        answer:
          "Traseele, aglomerarea, timpul de asteptare si claritatea punctelor de acces.",
      },
    ],
    primaryCta: { label: "Incepeti Project Intake", href: "/project-intake" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Planificare fluxuri clinica medicala", href: "/knowledge-hub/planificare-fluxuri-clinica-medicala" },
      { label: "Modernizare clinica", href: "/calculatoare/modernizare-clinica-estimare" },
      { label: "Proiectare radiologie", href: "/services/radiologie" },
      { label: "Deschid clinica medicala", href: "/planificare/deschid-clinica-medicala" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("patient-flow", values),
  },
  {
    slug: "evaluare-preliminara-clinica",
    title: "Calculator evaluare preliminara clinica",
    description:
      "Calculator de pregatire pentru un proiect clinic: stadiu, documente, spatiu, echipamente si nivel de claritate.",
    eyebrow: "Clinic evaluation",
    purpose:
      "Ajuta la inceperea structurata a proiectului inainte de o discutie tehnica sau comerciala.",
    targetKeyword: "evaluare preliminara clinica",
    keywords: ["evaluare clinica", "pregatire proiect medical", "brief clinic", "Project Intake"],
    fields: [
      optionField("projectType", "Tip proiect", [
        ["Clinica noua", "clinic"],
        ["Radiologie", "radiology"],
        ["RMN", "rmn"],
        ["CT", "ct"],
        ["IVD / laborator", "ivd"],
        ["Modernizare", "modernization"],
      ]),
      optionField("building", "Tip cladire", [
        ["Cladire noua", "new"],
        ["Cladire existenta", "existing"],
        ["Spatiu convertit", "converted"],
      ]),
      optionField("docs", "Documente disponibile", [
        ["Complete", "ready"],
        ["Partial", "partial"],
        ["Lipsa", "none"],
        ["Nu stiu inca", "unknown"],
      ]),
      optionField("equipment", "Echipament selectat?", [
        ["Da", "selected"],
        ["In analiza", "review"],
        ["Nu inca", "not-selected"],
      ]),
      urgencyField(),
    ],
    faq: [
      {
        question: "Acesta este un formular de intake sau un calculator?",
        answer:
          "Este un calculator de orientare care pregateste inputul pentru Project Intake si Proposal Builder.",
      },
      {
        question: "Pot folosi rezultatul fara documente?",
        answer:
          "Poate oferi orientare, dar lipsa documentelor scade claritatea si creste riscul de rework.",
      },
      {
        question: "Ce urmeaza dupa evaluare?",
        answer:
          "De obicei Project Intake, apoi Proposal Builder pentru structurare tehnica.",
      },
    ],
    primaryCta: { label: "Incepeti Project Intake", href: "/project-intake" },
    secondaryCta: { label: "Structurati propunerea", href: "/proposal-builder" },
    relatedLinks: [
      { label: "Project Intake", href: "/project-intake" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Analiza preliminara", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    buildResult: (values) => buildExpandedCalculatorResult("clinic-eval", values),
  },
];

export function getProgrammaticCalculatorBySlug(slug: string) {
  return programmaticCalculators.find((calculator) => calculator.slug === slug);
}

export function calculateProgrammaticCalculator(
  slug: CalculatorSlug,
  values: Record<string, string>,
): ProgrammaticCalculatorResult {
  const calculator = getProgrammaticCalculatorBySlug(slug);

  if (calculator?.buildResult) {
    return calculator.buildResult(values);
  }

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

  throw new Error(`Unsupported calculator slug: ${slug}`);
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

function buildScenarioResult({
  title,
  summary,
  score,
  metricLabel,
  metricValue,
  budget,
  timelineEstimate,
  risks,
  assumptions,
  missingData,
  confidenceEstimate,
  recommendedServices,
  nextSteps,
  emphasis,
}: {
  title: string;
  summary: string;
  score: number;
  metricLabel: string;
  metricValue: string;
  budget: BudgetEstimate;
  timelineEstimate: TimelineEstimate;
  risks: RiskItem[];
  assumptions: string[];
  missingData: string[];
  confidenceEstimate: ConfidenceEstimate;
  recommendedServices: string[];
  nextSteps: string[];
  emphasis: string[];
}): ProgrammaticCalculatorResult {
  return {
    title,
    summary,
    score,
    metricLabel,
    metricValue,
    budget,
    timeline: timelineEstimate,
    risks,
    assumptions,
    missingData,
    confidence: confidenceEstimate,
    recommendedServices,
    nextSteps,
    emphasis,
  };
}

type ExpandedCalculatorMode =
  | "rf-shielding"
  | "radioprotectie-ct"
  | "power-electric"
  | "hvac-imagistica"
  | "space-rmn"
  | "space-ct"
  | "implementation"
  | "modernization"
  | "radiology-infra"
  | "ups"
  | "patient-flow"
  | "clinic-eval";

function buildExpandedCalculatorResult(
  mode: ExpandedCalculatorMode,
  values: Record<string, string>,
): ProgrammaticCalculatorResult {
  switch (mode) {
    case "rf-shielding": {
      let score = 48;
      if (values.roomSize === "large") score += 8;
      if (values.roomSize === "xl") score += 14;
      if (values.building === "existing-nonmedical") score += 12;
      if (values.building === "converted") score += 16;
      if (values.shielding === "confirmed" || values.shielding === "designed") score += 14;
      if (values.hvac === "strict") score += 10;
      if (values.urgency === "1-3") score += 10;
      if (values.urgency === "immediate") score += 16;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasRmn: true,
        hasEquipment: true,
        hasService: true,
        hasRfShielding: true,
        isExistingBuilding: values.building !== "new",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit RF și pregătire cameră", "EUR 4k-18k", "Analiză de amplasament, vecinătăți, penetrări și cerințe de atenuare."),
        line("Cușcă Faraday și uși RF", "EUR 35k-160k+", "Pereți, uși RF, filtre și detalii de etanșeitate electromagnetică."),
        line("HVAC și stabilizare mediu", "EUR 18k-85k+", "Temperatură, umiditate, vibrații și integrare cu camera."),
        line("Testare și commissioning", "EUR 8k-35k+", "Verificare finală și coordonare cu echipamentul."),
      ];
      budget.serviceBreakdown = [
        line("RF shielding RMN", "Ridicat-Complex", "Cușcă Faraday, uși RF, waveguides și testare."),
        line("HVAC și condiții de mediu", "Mediu-Ridicat", "Mediu stabil și cerințe stricte de climatizare."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă RF shielding",
        summary:
          "Estimatorul tratează proiectul ca infrastructură RMN: cușcă Faraday, uși RF, filtre, waveguides, HVAC și integrare. Nu este o estimare pentru ecranare cu plumb.",
        score: normalizedScore,
        metricLabel: "Complexitate RF shielding",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 78 ? "4-8 luni" : "3-6 luni",
          [
            ["Audit amplasament", "1-2 săptămâni", "Planuri, vecinătăți și cerințe RF."],
            ["Proiectare RF și HVAC", "2-4 săptămâni", "Uși RF, filtre, penetrări și condiții de mediu."],
            ["Execuție și montaj", "3-8 săptămâni", "Materiale, coordonare și acces pe șantier."],
            ["Testare și predare", "1-3 săptămâni", "Atenuare, commissioning și validare."],
          ],
          ["Fișa echipamentului RMN", "Releveu și dimensiuni finale", "Cerințe de atenuare și HVAC", "Acces tehnic și service"],
          ["RF shielding nevalidat", "HVAC subdimensionat", "penetrări necoordonate", "program comprimat"],
        ),
        risks: [
          risk("RF leakage", "Critical", "Etanșeitatea electromagnetică poate fi compromisă de uși, penetrări sau execuție slab coordonată.", "Validați designul RF înainte de execuție și testare."),
          risk("HVAC / mediu", "High", "RMN-ul cere control stabil al temperaturii și umidității.", "Coordonați climatizarea cu furnizorul echipamentului."),
          risk("Integrare", "Medium", "Accesul echipamentului și traseele pot schimba layout-ul.", "Blocați cerințele de integrare din faza de proiect."),
        ],
        assumptions: [
          "RF shielding este tratat separat de protecția radiologică.",
          "Estimarea presupune cameră RMN dedicată.",
          "Bugetul final depinde de specificațiile producătorului și de testare.",
        ],
        missingData: missingFromValues(values, [
          "Releveu final și vecinătăți",
          "Fișa RMN și cerințe de atenuare",
          "Nivelul de acces pentru instalare și service",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "RF shielding pentru RMN",
          "Imagistică medicală",
          "Radiologie",
          "Integrare aparatură medicală",
        ],
        nextSteps: [
          "Validați spațiul cu Radiology Room Planner.",
          "Pregătiți fișa echipamentului și planurile.",
          "Continuați în Proposal Builder pentru o structurare preliminară.",
        ],
        emphasis: [
          "Cușcă Faraday, uși RF, waveguides și filtre.",
          "HVAC și condiții de mediu pentru RMN.",
          "Fără confuzie cu plumbul sau protecția radiologică.",
        ],
      });
    }
    case "radioprotectie-ct": {
      let score = 44;
      if (values.roomSize === "large") score += 8;
      if (values.roomSize === "xl") score += 12;
      if (values.building === "existing-nonmedical") score += 12;
      if (values.building === "converted") score += 16;
      if (values.shielding === "needed") score += 14;
      if (values.cncan === "not-started") score += 14;
      if (values.cncan === "unknown") score += 10;
      if (values.urgency === "1-3") score += 10;
      if (values.urgency === "immediate") score += 16;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasCtRx: true,
        hasEquipment: true,
        hasService: true,
        hasLeadShielding: true,
        isExistingBuilding: values.building !== "new",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit și calcul radioprotecție", "EUR 4k-16k", "Analiză de vecinătăți, flux și zone controlate."),
        line("Ecranare cu plumb și detalii constructive", "EUR 25k-120k+", "Pereți, uși, sticlă plumbată și soluții validate tehnic."),
        line("CNCAN și documentație", "EUR 4k-22k", "Coordonare documente, layout și cerințe de autorizare."),
        line("Instalare și commissioning", "EUR 8k-35k+", "Integrare CT și verificări finale."),
      ];
      budget.serviceBreakdown = [
        line("Protecție radiologică CT", "Mediu-Ridicat", "Plumb, zone controlate și vecinătăți sensibile."),
        line("CNCAN și documentație", "Mediu-Ridicat", "Lucru coordonat de proiectare și validare."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă protecție radiologică CT",
        summary:
          "Estimatorul tratează proiectul ca infrastructură CT: plumb, zone controlate, documentație și CNCAN. RF shielding-ul nu este componenta principală.",
        score: normalizedScore,
        metricLabel: "Complexitate radioprotecție CT",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 76 ? "4-7 luni" : "3-6 luni",
          [
            ["Audit amplasament", "1-2 săptămâni", "Planuri și vecinătăți."],
            ["Radioprotecție și CNCAN", "3-8 săptămâni", "Calcul și documentație."],
            ["Execuție și ecranare", "3-7 săptămâni", "Plumb, uși și elemente constructive."],
            ["Instalare și predare", "1-3 săptămâni", "Integrare și verificare."],
          ],
          ["Fișa echipamentului CT", "Calcul radioprotecție", "Status CNCAN", "Planuri finale"],
          ["CNCAN neînceput", "protecție neproiectată", "vecinătăți sensibile", "calendar comprimat"],
        ),
        risks: [
          risk("CNCAN", "High", "Documentația și zonele controlate trebuie tratate din faza de proiectare.", "Integrați cerințele CNCAN din timp."),
          risk("Ecranare cu plumb", "High", "Detaliile constructive trebuie corelate cu echipamentul și vecinătățile.", "Validați soluția înainte de execuție."),
          risk("Integrare CT", "Medium", "Alimentarea, datele și accesul pot schimba proiectul.", "Coordonați furnizorul echipamentului cu proiectarea."),
        ],
        assumptions: [
          "CT activează protecție radiologică, nu RF shielding.",
          "Bugetul depinde de vecinătăți și documentația de autorizare.",
          "Estimarea este orientativă și necesită validare tehnică.",
        ],
        missingData: missingFromValues(values, [
          "Fișa echipamentului CT și poziția finală",
          "Calcul radioprotecție și vecinătăți",
          "Stadiul documentației CNCAN",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Protecție radiologică",
          "Radiologie",
          "Consultanță CNCAN",
          "Integrare aparatură medicală",
        ],
        nextSteps: [
          "Verificați radioprotecția cu Radiology Room Planner.",
          "Pregătiți planurile și poziția echipamentului.",
          "Continuați în Proposal Builder pentru o propunere tehnică preliminară.",
        ],
        emphasis: [
          "Plumb, zone controlate și CNCAN.",
          "Layout și vecinătăți sensibile.",
          "Fără confuzie cu RF shielding-ul RMN.",
        ],
      });
    }
    case "power-electric": {
      let score = 34;
      if (values.modality === "multiple") score += 20;
      if (values.modality === "rmn") score += 18;
      if (values.modality === "ct") score += 14;
      if (values.infra === "partial") score += 12;
      if (values.infra === "not-ready") score += 18;
      if (values.backup === "no") score += 8;
      if (values.backup === "unknown") score += 6;
      if (values.urgency === "1-3") score += 10;
      if (values.urgency === "immediate") score += 14;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasRmn: values.modality === "rmn" || values.modality === "multiple",
        hasCtRx: values.modality === "ct" || values.modality === "rx" || values.modality === "multiple",
        hasEquipment: true,
        hasService: false,
        hasRfShielding: values.modality === "rmn" || values.modality === "multiple",
        hasLeadShielding: values.modality === "ct" || values.modality === "rx" || values.modality === "multiple",
        isExistingBuilding: values.infra !== "ready",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit electric", "EUR 2k-10k", "Capacitate, tablouri, circuite și redundanță."),
        line("Upgrade alimentare și protecții", "EUR 15k-85k+", "Panouri, cabluri, protecții și separare sarcini."),
        line("Redundanță / UPS", "EUR 8k-45k+", "Dacă proiectul cere continuitate sau protecție a datelor."),
        line("Testare și commissioning", "EUR 3k-18k", "Măsurători și validare operațională."),
      ];
      budget.serviceBreakdown = [
        line("Electric imagistică", "Mediu-Ridicat", "Capacitate și stabilitate pentru aparatură."),
        line("UPS / backup", "Mediu", "Continuitate pentru IT și echipamente sensibile."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă putere electrică imagistică",
        summary:
          "Estimatorul verifică nivelul de complexitate pentru alimentare, tablouri, redundanță și pregătirea infrastructurii electrice pentru imagistică.",
        score: normalizedScore,
        metricLabel: "Complexitate electrică",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 68 ? "2-5 luni" : "1-3 luni",
          [
            ["Audit electric", "1-2 săptămâni", "Capacitate și consumuri."],
            ["Proiectare upgrade", "1-3 săptămâni", "Tablouri, circuite și redundanță."],
            ["Execuție", "2-6 săptămâni", "Cabluri, protecții și instalații."],
            ["Testare", "1-2 săptămâni", "Măsurători și predare."],
          ],
          ["Capacitate electrică reală", "Consum echipament", "Necesitatea de backup", "Acces la tablouri"],
          ["capacitate neclară", "backup lipsă", "echipamente multiple", "calendar comprimat"],
        ),
        risks: [
          risk("Capacitate electrică", "High", "Capacitatea insuficientă poate bloca instalarea sau porni proiectul cu compromisuri.", "Validați consumurile și rezervele înainte de execuție."),
          risk("Redundanță", values.backup === "no" ? "Medium" : "Low", "Lipsa redundanței poate crește riscul de întreruperi.", "Definește nevoia de UPS sau backup încă din faza de proiect."),
          risk("Coordonare cu echipamentele", "Medium", "Consumurile reale se clarifică odată cu fișa echipamentelor.", "Blocați specificațiile furnizorului în timp util."),
        ],
        assumptions: [
          "Calculul tratează electricitatea ca infrastructură pentru imagistică, nu ca audit final al clădirii.",
          "Echipamentul și redundanța pot modifica bugetul.",
          "Este nevoie de validare tehnică înainte de achiziție finală.",
        ],
        missingData: missingFromValues(values, [
          "Capacitatea reală a tabloului și consumuri",
          "Lista echipamentelor și redundanță dorită",
          "Necesarul de backup / UPS",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Imagistică medicală",
          "Aparatură medicală",
          "Integrare aparatură medicală",
        ],
        nextSteps: [
          "Verificați consumurile cu fișa echipamentului.",
          "Încadrați necesarul de redundanță și UPS.",
          "Continuați în Proposal Builder sau Project Intake.",
        ],
        emphasis: [
          "Capacitate, redundanță și tablouri.",
          "Echipamente multiple cresc complexitatea.",
          "Estimare orientativă, nu verificare electrică finală.",
        ],
      });
    }
    case "hvac-imagistica": {
      let score = 36;
      if (values.modality === "rmn") score += 16;
      if (values.modality === "ct") score += 10;
      if (values.modality === "multiple") score += 20;
      if (values.roomSize === "large") score += 8;
      if (values.roomSize === "xl") score += 12;
      if (values.hvac === "special") score += 12;
      if (values.hvac === "strict") score += 18;
      if (values.urgency === "1-3") score += 8;
      if (values.urgency === "immediate") score += 14;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasRmn: values.modality === "rmn" || values.modality === "multiple",
        hasCtRx: values.modality === "ct" || values.modality === "rx" || values.modality === "multiple",
        hasEquipment: true,
        hasService: false,
        hasRfShielding: values.modality === "rmn" || values.modality === "multiple",
        hasLeadShielding: values.modality === "ct" || values.modality === "rx" || values.modality === "multiple",
        isExistingBuilding: values.hvac !== "ready",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit HVAC", "EUR 2k-8k", "Temperaturi, umiditate și calitatea aerului."),
        line("Adaptări de sistem", "EUR 12k-75k+", "Ducting, răcire, control și dezumidificare."),
        line("Integrare cu echipamentul", "EUR 6k-25k", "Cerințe furnizor și balans de încărcare."),
        line("Testare și reglaj", "EUR 2k-10k", "Măsurători și ajustări după instalare."),
      ];
      budget.serviceBreakdown = [
        line("HVAC imagistică", "Mediu-Ridicat", "Temperatură, umiditate și echilibru termic."),
        line("RMN / CT / RX", "Ridicat", "Cerințele se schimbă după modul și volum."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă HVAC pentru imagistică",
        summary:
          "Estimatorul verifică cât de mult trebuie ajustat climatul tehnic pentru aparatură de imagistică, inclusiv cerințe stricte pentru RMN.",
        score: normalizedScore,
        metricLabel: "Complexitate HVAC",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 70 ? "2-5 luni" : "1-3 luni",
          [
            ["Audit termic", "1-2 săptămâni", "Temperaturi, umiditate și sarcină termică."],
            ["Proiectare HVAC", "1-3 săptămâni", "Debit, control și integrare cu echipamentul."],
            ["Execuție", "2-5 săptămâni", "Ducting, echipamente și control."],
            ["Balans și testare", "1-2 săptămâni", "Măsurători și reglaj final."],
          ],
          ["Sarcina termică reală", "Cerințe furnizor", "Acces la trasee", "Interval de temperatură admis"],
          ["HVAC nevalidat", "sarcină subestimată", "echipamente multiple", "timeline comprimat"],
        ),
        risks: [
          risk("Control termic", "High", "RMN și imagistica pot cere stabilitate mult mai bună decât o cameră obișnuită.", "Coordonați HVAC cu fișa echipamentului."),
          risk("Umiditate / confort", "Medium", "Abaterile pot afecta echipamentul și experiența operațională.", "Stabiliți intervale clare și măsurabile."),
          risk("Integrare spațiu", "Medium", "Traseele și spațiul tehnic pot limita soluția.", "Validați spațiul din timp."),
        ],
        assumptions: [
          "Estimatorul tratează HVAC-ul ca infrastructură pentru imagistică, nu ca soluție generală de clădire.",
          "RMN poate ridica cerințele de mediu mai mult decât CT/RX.",
          "Necesită validare tehnică înainte de finalizare.",
        ],
        missingData: missingFromValues(values, [
          "Sarcina termică estimată și planuri",
          "Cerințele de temperatură și umiditate ale echipamentului",
          "Traseele și spațiul tehnic disponibil",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Imagistică medicală",
          "RF shielding pentru RMN",
          "Protecție radiologică",
        ],
        nextSteps: [
          "Clarificați cerințele de mediu cu furnizorul.",
          "Corelați HVAC cu spațiul și traseele.",
          "Continuați în Proposal Builder pentru etapizare.",
        ],
        emphasis: [
          "Control termic și umiditate.",
          "RMN are cerințe mai stricte.",
          "Nu înlocuiește verificarea pe amplasament.",
        ],
      });
    }
    case "space-rmn": {
      let score = 40;
      if (values.roomSize === "large") score += 10;
      if (values.roomSize === "xl") score += 16;
      if (values.building === "existing-nonmedical") score += 12;
      if (values.building === "converted") score += 14;
      if (values.shielding === "designed") score += 10;
      if (values.shielding === "unknown") score += 8;
      if (values.urgency === "1-3") score += 8;
      if (values.urgency === "immediate") score += 12;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasRmn: true,
        hasEquipment: true,
        hasService: false,
        hasRfShielding: true,
        isExistingBuilding: values.building !== "new",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit spațiu", "EUR 2k-8k", "Releveu, flux și dimensiuni utilitare."),
        line("Corecții de layout", "EUR 10k-60k+", "Pereți, uși, trasee și acces."),
        line("RF / HVAC coordonare", "EUR 15k-90k+", "Cerințe de infrastructură specifice RMN."),
        line("Testare și predare", "EUR 3k-15k", "Confirmare spațiu și pregătire finală."),
      ];
      budget.serviceBreakdown = [
        line("Spațiu minim RMN", "Ridicat", "Necesită validare pe plan și pe amplasament."),
        line("RF / HVAC", "Ridicat", "Se leagă direct de configurația echipamentului."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă spațiu minim RMN",
        summary:
          "Estimatorul arată cât de dificil este să aduci un spațiu la nivelul potrivit pentru un proiect RMN, inclusiv spații tehnice și corecții necesare.",
        score: normalizedScore,
        metricLabel: "Complexitate spațiu RMN",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 68 ? "2-4 luni" : "1-3 luni",
          [
            ["Audit spațiu", "1 săptămână", "Releveu și dimensiuni."],
            ["Corecții layout", "2-5 săptămâni", "Flux, acces și pereți."],
            ["RF / HVAC", "2-4 săptămâni", "Cerințe speciale RMN."],
            ["Testare", "1-2 săptămâni", "Verificare finală."],
          ],
          ["Dimensiuni finale", "Acces echipament", "Cerințe RF și HVAC", "Planuri reale"],
          ["spațiu insuficient", "RF nevalidat", "HVAC neclar", "echipament neselectat"],
        ),
        risks: [
          risk("Dimensiuni", "High", "Spațiul real poate cere mai mult decât pare din planul inițial.", "Verificați dimensiunile utile și zonele tehnice."),
          risk("RF shielding", "High", "Cerințele RMN se leagă direct de cușca Faraday și de integrare.", "Validați RF înainte de achiziție."),
          risk("Acces echipament", "Medium", "Traseele și accesul pot bloca livrarea și montajul.", "Blocați logistica din timp."),
        ],
        assumptions: [
          "Estimatorul tratează spațiul ca proiect RMN, nu ca amenajare generică.",
          "RF shielding și HVAC sunt cerințe centrale.",
          "Este necesară validare tehnică înainte de execuție.",
        ],
        missingData: missingFromValues(values, [
          "Planuri, dimensiuni utile și trasee",
          "Fișa echipamentului RMN",
          "Cerințe RF și HVAC finale",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "RF shielding pentru RMN",
          "Radiologie",
          "Imagistică medicală",
        ],
        nextSteps: [
          "Verificați spațiul cu Radiology Room Planner.",
          "Pregătiți fișa echipamentului și planurile finale.",
          "Continuați în Proposal Builder.",
        ],
        emphasis: [
          "Spațiul minim trebuie validat pe plan și pe amplasament.",
          "RMN activează RF shielding și HVAC specializat.",
          "Nu este o estimare de ofertă finală.",
        ],
      });
    }
    case "space-ct": {
      let score = 38;
      if (values.roomSize === "large") score += 8;
      if (values.roomSize === "xl") score += 12;
      if (values.building === "existing-nonmedical") score += 12;
      if (values.building === "converted") score += 14;
      if (values.shielding === "needed") score += 14;
      if (values.cncan === "not-started") score += 12;
      if (values.urgency === "1-3") score += 8;
      if (values.urgency === "immediate") score += 12;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasCtRx: true,
        hasEquipment: true,
        hasService: false,
        hasLeadShielding: true,
        isExistingBuilding: values.building !== "new",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit spațiu", "EUR 2k-8k", "Releveu și poziționare în raport cu vecinătățile."),
        line("Ecranare și layout", "EUR 18k-95k+", "Plumb, uși și corecții constructive."),
        line("CNCAN / validare", "EUR 4k-20k", "Documentație și zone controlate."),
        line("Testare și predare", "EUR 3k-15k", "Integrare finală și verificări."),
      ];
      budget.serviceBreakdown = [
        line("Spațiu minim CT", "Ridicat", "Layout, ecranare și vecinătăți."),
        line("Radioprotecție", "Ridicat", "Legat de plumb și cerințe CNCAN."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă spațiu minim CT",
        summary:
          "Estimatorul arată cât de mult trebuie ajustat spațiul pentru un proiect CT, cu accent pe ecranare, vecinătăți și cerințe de autorizare.",
        score: normalizedScore,
        metricLabel: "Complexitate spațiu CT",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 66 ? "2-4 luni" : "1-3 luni",
          [
            ["Audit spațiu", "1 săptămână", "Releveu și vecinătăți."],
            ["Radioprotecție / layout", "2-4 săptămâni", "Plumb, uși și zone controlate."],
            ["CNCAN și verificări", "2-4 săptămâni", "Documente și coordonare."],
            ["Predare", "1-2 săptămâni", "Integrare și validare finală."],
          ],
          ["Vecinătăți sensibile", "Fișa CT", "Cerințe CNCAN", "Layout final"],
          ["spațiu insuficient", "CNCAN neclar", "protecție nevalidată", "echipament neselectat"],
        ),
        risks: [
          risk("Radioprotecție", "High", "Spațiul poate necesita plumb și detalii constructive neașteptate.", "Validați radioprotecția înainte de execuție."),
          risk("CNCAN", "High", "Documentația trebuie tratată devreme.", "Integrați cerințele în proiectare."),
          risk("Acces / logistica", "Medium", "Traseele și vecinătățile pot schimba layout-ul.", "Clarificați accesul și fluxul."),
        ],
        assumptions: [
          "Estimatorul tratează CT-ul ca proiect de radioprotecție.",
          "CNCAN și ecranarea cu plumb sunt centrale.",
          "Nu este o ofertă finală.",
        ],
        missingData: missingFromValues(values, [
          "Planuri și vecinătăți",
          "Fișa echipamentului CT",
          "Status CNCAN și ecranare",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Protecție radiologică",
          "Radiologie",
          "Consultanță CNCAN",
        ],
        nextSteps: [
          "Verificați spațiul în Radiology Room Planner.",
          "Pregătiți planurile și fișa echipamentului.",
          "Continuați în Proposal Builder.",
        ],
        emphasis: [
          "Ecranare cu plumb și vecinătăți.",
          "CNCAN și layout-ul trebuie validate devreme.",
          "Nu este RF shielding.",
        ],
      });
    }
    case "implementation": {
      let score = 30;
      if (values.projectType === "radiology") score += 16;
      if (values.projectType === "rmn") score += 20;
      if (values.projectType === "ct") score += 18;
      if (values.projectType === "ivd") score += 12;
      if (values.building === "existing") score += 10;
      if (values.auth === "not-started") score += 12;
      if (values.auth === "unknown") score += 8;
      if (values.equipment === "selected") score += 8;
      if (values.urgency === "1-3") score += 10;
      if (values.urgency === "immediate") score += 14;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: values.projectType === "radiology" || values.projectType === "rmn" || values.projectType === "ct",
        hasRmn: values.projectType === "rmn",
        hasCtRx: values.projectType === "ct",
        hasLab: values.projectType === "ivd",
        hasEquipment: true,
        hasService: false,
        hasRfShielding: values.projectType === "rmn",
        hasLeadShielding: values.projectType === "ct",
        isExistingBuilding: values.building === "existing",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Brief și concept", "EUR 2k-10k", "Clarificare scop, spațiu și cerințe."),
        line("Proiectare și autorizare", "EUR 5k-30k", "Planuri, documentație și validări."),
        line("Execuție și integrare", "EUR 15k-120k+", "Lucrări, instalări și coordonare."),
        line("Commissioning", "EUR 4k-20k", "Predare și verificări finale."),
      ];
      budget.serviceBreakdown = [
        line("Planning medical", "Mediu-Ridicat", "Depinde de tipul proiectului și stadiu."),
        line("Autorizare și coordonare", "Mediu-Ridicat", "Când proiectul trebuie trecut în execuție."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă timp implementare proiect medical",
        summary:
          "Estimatorul oferă o estimare de calendar pentru proiecte medicale, în funcție de stadiu, tipul spațiului, autorizare și echipament.",
        score: normalizedScore,
        metricLabel: "Complexitate calendar",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 68 ? "6-10 luni" : "3-6 luni",
          [
            ["Brief și concept", "1-3 săptămâni", "Datele proiectului și scopul."],
            ["Proiectare și autorizare", "3-8 săptămâni", "Planuri, documente și validări."],
            ["Execuție", "4-12 săptămâni", "Lucrări și instalări."],
            ["Commissioning", "1-4 săptămâni", "Testare și predare."],
          ],
          ["Brief complet", "Date de autorizare", "Fișa echipamentului", "Calendar realist"],
          ["proiect neclar", "autorizare neîncepută", "echipament neselectat", "timeline comprimat"],
        ),
        risks: [
          risk("Calendar", values.urgency === "immediate" ? "High" : "Medium", "Termenele scurte cresc riscul de rework și de lipsă de documente.", "Separă orientarea de execuția finală."),
          risk("Autorizare", "Medium", "Faza de autorizare poate muta semnificativ calendarul.", "Clarifică stadiul de la început."),
          risk("Echipament", "Medium", "Modelul și disponibilitatea pot modifica timeline-ul.", "Blochează specificațiile cheie devreme."),
        ],
        assumptions: [
          "Timpul este estimat pentru un proiect medical preliminar.",
          "Autorizarea și echipamentul pot schimba semnificativ calendarul.",
          "Nu este promisiune de termen final.",
        ],
        missingData: missingFromValues(values, [
          "Scopul proiectului și stadiul real",
          "Fișa echipamentului și starea autorizării",
          "Disponibilitatea spațiului și a echipei",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Project Intake",
          "Proposal Builder",
          "Consultanță tehnică",
        ],
        nextSteps: [
          "Structurați proiectul în Project Intake.",
          "Cereți o propunere preliminară în Proposal Builder.",
          "Validați termenii de execuție cu echipa ZES.",
        ],
        emphasis: [
          "Calendar orientativ, nu termen contractual.",
          "Autorizarea poate muta fazele.",
          "Util pentru planificare internă.",
        ],
      });
    }
    case "modernization": {
      let score = 32;
      if (values.scope === "radiology") score += 14;
      if (values.scope === "full") score += 18;
      if (values.facility === "old") score += 14;
      if (values.facility === "mixed") score += 10;
      if (values.downtime === "low") score += 12;
      if (values.downtime === "none") score += 16;
      if (values.urgency === "1-3") score += 10;
      if (values.urgency === "immediate") score += 14;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: values.scope !== "none",
        hasRmn: values.scope === "radiology" || values.scope === "full",
        hasCtRx: values.scope === "radiology" || values.scope === "full",
        hasLab: values.scope === "full",
        hasEquipment: true,
        hasService: true,
        hasRfShielding: values.scope === "radiology",
        hasLeadShielding: values.scope === "radiology",
        isExistingBuilding: true,
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit clinică existentă", "EUR 3k-12k", "Stare, flux, utilități și limitări."),
        line("Corecții și modernizare", "EUR 25k-180k+", "Finisaje, instalații și reconfigurare."),
        line("Integrare echipamente", "EUR 8k-55k", "Aparatură, service și utilizare."),
        line("Predare și optimizare", "EUR 3k-15k", "Testare și ajustare operațională."),
      ];
      budget.serviceBreakdown = [
        line("Modernizare clinică", "Mediu-Ridicat", "Depinde de starea spațiului și a instalațiilor."),
        line("Radiologie / aparatură", "Ridicat", "Dacă proiectul include imagistică sau IVD."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă modernizare clinică",
        summary:
          "Estimatorul tratează modernizarea ca proiect de corecții tehnice, reconfigurare și integrare, nu ca simplă renovare.",
        score: normalizedScore,
        metricLabel: "Complexitate modernizare",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 70 ? "4-8 luni" : "2-5 luni",
          [
            ["Audit clinică", "1-2 săptămâni", "Stare, flux și utilități."],
            ["Proiectare modernizare", "2-4 săptămâni", "Corecții și reconfigurare."],
            ["Execuție", "3-8 săptămâni", "Lucrări și integrare."],
            ["Predare", "1-3 săptămâni", "Testare și optimizare."],
          ],
          ["Starea clădirii", "Downtime acceptat", "Scope-ul real", "Echipamentele existente"],
          ["infrastructură veche", "downtime neclar", "echipamente multiple", "scope extins"],
        ),
        risks: [
          risk("Stare clădire", "High", "Spațiul existent poate ascunde corecții costisitoare.", "Faceți audit înainte de buget final."),
          risk("Downtime", values.downtime === "none" ? "High" : "Medium", "Clinica poate avea nevoie de fazare și relocări temporare.", "Planificați fazarea înainte de execuție."),
          risk("Integrare", "Medium", "Dacă proiectul include imagistică, cerințele tehnice cresc.", "Coordonați echipamentele și infrastructura."),
        ],
        assumptions: [
          "Modernizarea este tratată ca proiect tehnic, nu doar cosmetic.",
          "Spațiul existent poate genera costuri suplimentare.",
          "Necesară validare tehnică înainte de implementare.",
        ],
        missingData: missingFromValues(values, [
          "Starea reală a clinicii și a instalațiilor",
          "Toleranța la downtime și fazare",
          "Scope-ul exact al modernizării",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Modernizare clinică",
          "Constructii medicale",
          "Aparatură medicală",
        ],
        nextSteps: [
          "Documentați starea clinicii și fazele posibile.",
          "Clarificați downtime-ul acceptabil.",
          "Continuați în Proposal Builder.",
        ],
        emphasis: [
          "Modernizare tehnică, nu doar renovare.",
          "Downtime și fazare sunt factori cheie.",
          "Dacă există radiologie, crește complexitatea.",
        ],
      });
    }
    case "radiology-infra": {
      let score = 42;
      if (values.modalities === "multiple") score += 20;
      if (values.modalities === "rmn") score += 16;
      if (values.modalities === "ct") score += 14;
      if (values.infrastructure === "not-ready") score += 16;
      if (values.infrastructure === "partial") score += 10;
      if (values.shielding === "both") score += 14;
      if (values.shielding === "rf") score += 10;
      if (values.shielding === "lead") score += 10;
      if (values.urgency === "1-3") score += 8;
      if (values.urgency === "immediate") score += 12;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasRmn: values.modalities === "rmn" || values.modalities === "multiple",
        hasCtRx: values.modalities === "ct" || values.modalities === "rx" || values.modalities === "multiple",
        hasEquipment: true,
        hasService: true,
        hasRfShielding: values.shielding === "rf" || values.shielding === "both" || values.modalities === "rmn" || values.modalities === "multiple",
        hasLeadShielding: values.shielding === "lead" || values.shielding === "both" || values.modalities === "ct" || values.modalities === "rx" || values.modalities === "multiple",
        isExistingBuilding: values.infrastructure !== "ready",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit radiologie", "EUR 4k-16k", "Flux, spațiu și cerințe tehnice."),
        line("Infrastructură și shielding", "EUR 25k-180k+", "RF și/sau plumb după modul."),
        line("Integrare echipamente", "EUR 12k-75k+", "Aparatură, date, service și commissioning."),
        line("Predare", "EUR 3k-15k", "Testare și corecții finale."),
      ];
      budget.serviceBreakdown = [
        line("Infrastructură radiologie", "Ridicat", "Se combină mai multe cerințe tehnice."),
        line("Shielding și integrare", "Ridicat-Complex", "RF și/sau radioprotecție, în funcție de mod."),
      ];

      return buildScenarioResult({
        title: "Estimare orientativă infrastructură radiologie",
        summary:
          "Estimatorul tratează radiologia ca proiect multi-strat: spațiu, shielding, integrare, service și pregătirea operațională.",
        score: normalizedScore,
        metricLabel: "Complexitate infrastructură",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 74 ? "4-8 luni" : "2-5 luni",
          [
            ["Audit și concept", "1-2 săptămâni", "Flux, spațiu și modul de lucru."],
            ["Proiectare tehnică", "2-4 săptămâni", "RF și/sau plumb, electric și HVAC."],
            ["Execuție", "3-8 săptămâni", "Lucrări și integrare echipamente."],
            ["Commissioning", "1-3 săptămâni", "Testare și predare."],
          ],
          ["Modulul ales", "Spațiu și vecinătăți", "Cerințe de shielding", "Datele de integrare"],
          ["radiologie mixtă", "shielding neclar", "echipamente multiple", "planuri incomplete"],
        ),
        risks: [
          risk("Complexitate multi-mod", "High", "RMN, CT și RX au cerințe diferite și nu trebuie amestecate.", "Separă fluxurile și cerințele pe modul."),
          risk("Shielding", "High", "RF și plumb trebuie tratate în proiecte distincte.", "Asociază shielding-ul cu echipamentul corect."),
          risk("Integrare și service", "Medium", "Fără service și commissioning clare pot apărea întârzieri.", "Includeți uptime și service în plan."),
        ],
        assumptions: [
          "Radiologia este tratată ca infrastructură, nu ca echipament singular.",
          "RMN, CT și RX au cerințe diferite.",
          "Bugetul este orientativ și depinde de configurația finală.",
        ],
        missingData: missingFromValues(values, [
          "Modul/ele exacte și fișele echipamentelor",
          "Starea infrastructurii și a vecinătăților",
          "Nivelul de shielding necesar",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Radiologie",
          "Imagistică medicală",
          "RF shielding pentru RMN",
          "Protecție radiologică",
        ],
        nextSteps: [
          "Alegeți scenariul corect pe modul și echipament.",
          "Validați shielding-ul potrivit pentru RMN sau CT/RX.",
          "Continuați în Proposal Builder pentru structurare.",
        ],
        emphasis: [
          "RF pentru RMN, plumb pentru CT/RX.",
          "Radiologia are cerințe multi-mod și de integrare.",
          "Buget orientativ, nu ofertă finală.",
        ],
      });
    }
    case "ups": {
      let score = 30;
      if (values.modality === "multiple") score += 18;
      if (values.modality === "rmn") score += 12;
      if (values.modality === "ct") score += 10;
      if (values.outage === "critical") score += 16;
      if (values.outage === "high") score += 12;
      if (values.current === "none") score += 12;
      if (values.current === "unknown") score += 8;
      if (values.urgency === "immediate") score += 12;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasRmn: values.modality === "rmn" || values.modality === "multiple",
        hasCtRx: values.modality === "ct" || values.modality === "rx" || values.modality === "multiple",
        hasEquipment: true,
        hasService: false,
        hasRfShielding: values.modality === "rmn" || values.modality === "multiple",
        hasLeadShielding: values.modality === "ct" || values.modality === "rx" || values.modality === "multiple",
        isExistingBuilding: true,
        isUrgent: values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Audit consumatori", "EUR 1k-5k", "Identificare ce trebuie susținut."),
        line("Soluție UPS", "EUR 8k-60k+", "Capacitate și timp de back-up."),
        line("Integrare și test", "EUR 3k-18k", "Comutare, protecție și validare."),
        line("Monitorizare", "EUR 1k-6k", "Alerte și mentenanță."),
      ];
      budget.serviceBreakdown = [
        line("UPS imagistică", "Mediu", "Protecție pentru IT și echipamente sensibile."),
        line("Continuitate operațională", "Mediu-Ridicat", "Depinde de echipament și timp de back-up."),
      ];

      return buildScenarioResult({
        title: "Calculator necesar UPS imagistică",
        summary:
          "Estimatorul arată cât de importantă este redundanța pentru echipamentele de imagistică și ce nivel de backup ar trebui evaluat.",
        score: normalizedScore,
        metricLabel: "Prioritate UPS",
        metricValue: normalizedScore >= 72 ? "Critic" : normalizedScore >= 52 ? "Ridicat" : "Mediu",
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 68 ? "1-3 luni" : "2-6 săptămâni",
          [
            ["Audit consumatori", "3-7 zile", "Ce trebuie protejat și cât timp."],
            ["Dimensionare UPS", "1-2 săptămâni", "Capacitate și autonomie."],
            ["Integrare", "1-3 săptămâni", "Tablouri, comutare și protecții."],
            ["Testare", "1 săptămână", "Validare și plan de fallback."],
          ],
          ["Autonomie dorită", "Consum echipamente", "Sarcina critică", "Spațiu tehnic"],
          ["autonomie neclară", "consum necunoscut", "echipamente multiple", "timp de back-up critic"],
        ),
        risks: [
          risk("Downtime", values.outage === "critical" ? "Critical" : "High", "Fără backup pot exista opriri sau pierderi de date.", "Stabiliți autonomia și prioritățile."),
          risk("Dimensionare", "High", "UPS-ul subdimensionat nu rezolvă problema.", "Calculați consumul real al echipamentelor."),
          risk("Integrare", "Medium", "Comutarea și protecția trebuie testate.", "Includeți testarea în implementare."),
        ],
        assumptions: [
          "UPS-ul este tratat ca parte a infrastructurii imagistice.",
          "Autonomia și consumul real schimbă rezultatul.",
          "Nu înlocuiește un audit electric final.",
        ],
        missingData: missingFromValues(values, [
          "Consum total și autonomie dorită",
          "Care echipamente sunt critice",
          "Spațiul tehnic și integrarea cu tabloul",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Imagistică medicală",
          "Aparatură medicală",
          "Integrare aparatură medicală",
        ],
        nextSteps: [
          "Clarificați consumurile și autonomia dorită.",
          "Includeți UPS-ul în planificarea tehnică.",
          "Continuați în Proposal Builder.",
        ],
        emphasis: [
          "Autonomia trebuie definită clar.",
          "Protecție pentru imagistică și IT.",
          "Estimare orientativă.",
        ],
      });
    }
    case "patient-flow": {
      let score = 28;
      if (values.modality === "multiple") score += 16;
      if (values.modality === "ct") score += 10;
      if (values.modality === "rmn") score += 12;
      if (values.volume === "high") score += 16;
      if (values.volume === "medium") score += 10;
      if (values.rooms === "multiple") score += 12;
      if (values.staff === "partial") score += 8;
      if (values.staff === "low") score += 12;
      if (values.urgency === "1-3") score += 8;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: true,
        hasRmn: values.modality === "rmn" || values.modality === "multiple",
        hasCtRx: values.modality === "ct" || values.modality === "rx" || values.modality === "multiple",
        hasEquipment: true,
        hasService: false,
        hasRfShielding: values.modality === "rmn" || values.modality === "multiple",
        hasLeadShielding: values.modality === "ct" || values.modality === "rx" || values.modality === "multiple",
        isExistingBuilding: true,
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Analiză flux", "EUR 1k-6k", "Volum, trasee și puncte de blocaj."),
        line("Optimizare layout", "EUR 6k-25k", "Schimbări pentru recepție, așteptare și circulație."),
        line("Semnalistică și control", "EUR 2k-10k", "Direcționare, check-in și acces."),
        line("Implementare", "EUR 2k-12k", "Ajustări finale și validare."),
      ];
      budget.serviceBreakdown = [
        line("Flux pacienți imagistică", "Mediu", "Mai important pe volum și timp de așteptare."),
        line("Planificare operațională", "Mediu-Ridicat", "Ajută la reducerea blocajelor."),
      ];

      return buildScenarioResult({
        title: "Calculator flux pacienți imagistică",
        summary:
          "Estimatorul tratează fluxul pacienților ca un factor de proiectare, nu doar de recepție. Pot ajuta la reducerea blocajelor și la o planificare mai bună.",
        score: normalizedScore,
        metricLabel: "Complexitate flux",
        metricValue: getAdvancedComplexity(normalizedScore),
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 60 ? "3-5 săptămâni" : "1-3 săptămâni",
          [
            ["Analiză flux", "3-5 zile", "Volum și trasee."],
            ["Optimizare layout", "1-2 săptămâni", "Recepție, așteptare și acces."],
            ["Implementare", "1-2 săptămâni", "Semnalistică și organizare."],
            ["Validare", "3-5 zile", "Testarea fluxului pe scenariu real."],
          ],
          ["Volum pacienți", "Spațiu de așteptare", "Număr de camere", "Rolul personalului"],
          ["volum mare", "layout neclar", "echipă mică", "proiect cu mai multe camere"],
        ),
        risks: [
          risk("Blocaje de flux", values.volume === "high" ? "High" : "Medium", "Fluxul neoptimizat crește așteptarea și fricțiunea.", "Cartografiați traseele înainte de implementare."),
          risk("Capacitate", "Medium", "Mai multe camere sau volum mare cresc presiunea pe recepție.", "Planificați pe scenarii de vârf."),
          risk("Coordonare operațională", "Medium", "Fără layout bun, echipamentele și pacienții se încurcă.", "Includeți operaționalul în proiectare."),
        ],
        assumptions: [
          "Fluxul este tratat ca factor de proiectare clinică.",
          "Volumul și numărul de camere schimbă rezultatul.",
          "Nu este un model de procesare clinică finală.",
        ],
        missingData: missingFromValues(values, [
          "Volumul zilnic estimat",
          "Numărul de camere și staff disponibil",
          "Spațiul de așteptare și traseele",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Planificare clinică",
          "Imagistică medicală",
          "Constructii medicale",
        ],
        nextSteps: [
          "Cartografiați traseele și timpii de așteptare.",
          "Ajustați layout-ul pentru volum real.",
          "Continuați în Project Intake.",
        ],
        emphasis: [
          "Fluxul pacienților este o variabilă operațională reală.",
          "Reducerea blocajelor crește calitatea proiectului.",
          "Estimare orientativă.",
        ],
      });
    }
    case "clinic-eval": {
      let score = 26;
      if (values.projectType === "radiology") score += 16;
      if (values.projectType === "rmn") score += 20;
      if (values.projectType === "ct") score += 18;
      if (values.projectType === "ivd") score += 12;
      if (values.projectType === "modernization") score += 14;
      if (values.building === "existing") score += 8;
      if (values.docs === "partial") score += 8;
      if (values.docs === "none") score += 14;
      if (values.equipment === "selected") score += 8;
      if (values.urgency === "1-3") score += 8;
      if (values.urgency === "immediate") score += 12;

      const normalizedScore = clampScore(score);
      const budget = createBudgetEstimate({
        score: normalizedScore,
        hasRadiology: values.projectType === "radiology" || values.projectType === "rmn" || values.projectType === "ct",
        hasRmn: values.projectType === "rmn",
        hasCtRx: values.projectType === "ct",
        hasLab: values.projectType === "ivd",
        hasEquipment: true,
        hasService: false,
        hasRfShielding: values.projectType === "rmn",
        hasLeadShielding: values.projectType === "ct",
        isExistingBuilding: values.building === "existing",
        isUrgent: values.urgency === "1-3" || values.urgency === "immediate",
      });
      budget.phaseBreakdown = [
        line("Evaluare inițială", "EUR 1k-5k", "Stadiu, spațiu, documente și echipamente."),
        line("Pregătire proiect", "EUR 4k-20k", "Brief, proiectare și validări."),
        line("Implementare", "EUR 12k-100k+", "Lucrări și integrare în funcție de complexitate."),
        line("Predare", "EUR 2k-10k", "Ajustări și verificări finale."),
      ];
      budget.serviceBreakdown = [
        line("Evaluare preliminară", "Mediu", "Ajută la definirea următorului pas."),
        line("Planificare tehnică", "Mediu-Ridicat", "Se activează când proiectul are nevoie de structurare."),
      ];

      return buildScenarioResult({
        title: "Calculator evaluare preliminară clinică",
        summary:
          "Estimatorul oferă o citire rapidă a complexității unui proiect clinic și a pașilor necesari înainte de o discuție tehnică serioasă.",
        score: normalizedScore,
        metricLabel: "Pregătire proiect",
        metricValue: normalizedScore >= 72 ? "Pregătit pentru propunere" : normalizedScore >= 48 ? "Pregătit pentru analiză" : "Exploratoriu",
        budget,
        timelineEstimate: timeline(
          normalizedScore >= 68 ? "3-6 luni" : "1-4 luni",
          [
            ["Evaluare inițială", "3-5 zile", "Spațiu, scop și documente."],
            ["Structurare proiect", "1-3 săptămâni", "Brief și ipoteze."],
            ["Implementare", "2-8 săptămâni", "Lucrări și integrare."],
            ["Predare", "1 săptămână", "Verificări și ajustări."],
          ],
          ["Tipul proiectului", "Stadiul documentelor", "Starea spațiului", "Echipamentele",],
          ["proiect vag", "documente lipsă", "echipament neselectat", "execuție încă neclară"],
        ),
        risks: [
          risk("Claritate proiect", "Medium", "Fără structură, discuția rămâne generică.", "Folosiți Project Intake pentru datele esențiale."),
          risk("Documente lipsă", values.docs === "none" ? "High" : "Medium", "Lipsa documentelor crește riscul de rework.", "Cererea de planuri și documente trebuie făcută devreme."),
          risk("Echipament / spațiu", "Medium", "Echipamentul ales prea devreme poate schimba proiectul.", "Validați infrastructura înainte de achiziție."),
        ],
        assumptions: [
          "Este un test de pregătire a proiectului, nu o ofertă finală.",
          "Stadiul documentelor și al echipamentelor schimbă rezultatul.",
          "Pot apărea riscuri diferite în funcție de specialitate.",
        ],
        missingData: missingFromValues(values, [
          "Stadiul proiectului și al documentelor",
          "Tipul de spațiu și echipamentele",
          "Ritmul dorit și nivelul de urgență",
        ]),
        confidenceEstimate: confidence(values, normalizedScore),
        recommendedServices: [
          "Project Intake",
          "Proposal Builder",
          "Consultanță tehnică",
        ],
        nextSteps: [
          "Completează Project Intake pentru datele esențiale.",
          "Treci în Proposal Builder pentru o propunere orientativă.",
          "Validează detaliile tehnice cu ZES.",
        ],
        emphasis: [
          "Evaluați proiectul înainte de decizii mari.",
          "Documentele și echipamentul influențează puternic complexitatea.",
          "Estimare orientativă, nu validare finală.",
        ],
      });
    }
  }
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
