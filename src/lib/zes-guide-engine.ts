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

export type ZESGuideRoutingTarget = {
  label: string;
  href: string;
  kind: "tool" | "service" | "workflow" | "contact";
  availability: "available" | "future";
};

export type ZESGuideSuggestion = {
  label: string;
  href: string;
};

export type ZESGuideResponse = {
  intent: ZESGuideIntentId;
  answer: string;
  missingQuestions: string[];
  recommendedServices: ZESGuideSuggestion[];
  suggestedWorkflows: ZESGuideRoutingTarget[];
  commercialOpportunityType: string;
  leadReadiness: "scazuta" | "moderata" | "ridicata";
  urgencySignal: "exploratoriu" | "planificare" | "activ" | "urgent";
  projectMaturity: "inceput" | "partial-definit" | "pregatit-pentru-analiza" | "pregatit-pentru-oferta";
  nextBestAction: string;
  ctas: ZESGuideRoutingTarget[];
  leadIntentSummary: string;
};

export const zesGuideStarters = [
  "Vreau sa deschid o clinica CT",
  "Am nevoie de camera RMN",
  "Vreau sa modernizez radiologia",
  "Am nevoie de service pentru aparatura",
  "Pregatesc proiect pe fonduri europene",
  "Vreau oferta pentru echipamente medicale",
  "Nu stiu de unde sa incep",
] as const;

const intentMatchers: Array<{ intent: ZESGuideIntentId; patterns: RegExp[] }> = [
  {
    intent: "ct-project",
    patterns: [/\bct\b/i, /\btomograf/i, /\bradiologie\b/i, /\brx\b/i],
  },
  {
    intent: "mri-project",
    patterns: [/\brmn\b/i, /\bmri\b/i, /\bmagnet\b/i, /\bfaraday\b/i],
  },
  {
    intent: "radiology-modernization",
    patterns: [/\bmoderniz/i, /\bupgrade\b/i, /\bradiologi/i],
  },
  {
    intent: "service-maintenance",
    patterns: [/\bservice\b/i, /\bmentenant/i, /\bdowntime\b/i, /\bdefect/i, /\beroare\b/i],
  },
  {
    intent: "lab-ivd",
    patterns: [/\blaborator\b/i, /\bivd\b/i, /\banaliz/i, /\banalizator/i],
  },
  {
    intent: "shielding-radioprotection",
    patterns: [/\brf shielding\b/i, /\bradioprotect/i, /\bplumb\b/i, /\bcusca faraday\b/i],
  },
  {
    intent: "cncan",
    patterns: [/\bcncan\b/i, /\bautoriz/i, /\baviz\b/i],
  },
  {
    intent: "funding",
    patterns: [/\bfonduri\b/i, /\bfinant/i, /\bgrant\b/i, /\bpnrr\b/i, /\beuropene\b/i],
  },
  {
    intent: "equipment-offer",
    patterns: [/\bofert/i, /\bechipament/i, /\baparatur/i, /\brefurbished\b/i],
  },
  {
    intent: "project-planning",
    patterns: [/\bplanific/i, /\bproiect\b/i, /\bclinica\b/i, /\bincep\b/i],
  },
];

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

export function createZESGuideResponse(input: string): ZESGuideResponse {
  const intent = detectZESGuideIntent(input);
  return responseByIntent(intent);
}

function responseByIntent(intent: ZESGuideIntentId): ZESGuideResponse {
  switch (intent) {
    case "ct-project":
      return {
        intent,
        answer:
          "ZES recomanda sa tratezi proiectul CT ca un pachet tehnic-comercial: camera, radioprotectie, HVAC/electric si planificare CNCAN.",
        missingQuestions: [
          "Ce model CT aveti in vedere si in ce stadiu este selectia?",
          "Exista planul camerei si vecinatatile relevante?",
          "Care este termenul tinta pentru punerea in functiune?",
        ],
        recommendedServices: [
          { label: "Proiectare camera CT", href: "/servicii/proiectare-camera-ct" },
          { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
        ],
        suggestedWorkflows: [
          route("AI Discovery", "/ai-discovery?scenario=ct-clinic", "workflow"),
          route("Proposal Builder", "/proposal-builder?source=zes-guide", "tool"),
          route("Calculator cost camera CT", "/calculatoare/cost-camera-ct", "tool"),
        ],
        commercialOpportunityType: "proiect CT cu intent comercial ridicat",
        leadReadiness: "moderata",
        urgencySignal: "planificare",
        projectMaturity: "partial-definit",
        nextBestAction:
          "Continuati in AI Discovery pentru clarificarea cerintelor tehnice si apoi generati context pentru ofertare.",
        ctas: [
          route("Continua cu AI Discovery", "/ai-discovery?scenario=ct-clinic", "workflow"),
          route("Genereaza context pentru ofertare", "/proposal-builder?source=zes-guide", "tool"),
          route("Solicita discutie cu specialist ZESCORP", "/contact", "contact"),
        ],
        leadIntentSummary:
          "Intent detectat: proiect CT. Urmator pas recomandat: validare tehnica radioprotectie + camera + utilitati.",
      };
    case "mri-project":
      return {
        intent,
        answer:
          "Pentru RMN, ZES recomanda validarea timpurie a RF shielding, traseului de instalare si dependentelor HVAC/electrice inaintea deciziei finale.",
        missingQuestions: [
          "Este definita clasa echipamentului (1.5T / 3T)?",
          "Exista planuri de camera si traseu de acces pentru instalare?",
          "Aveti fisa tehnica furnizorului pentru cerinte de instalare?",
        ],
        recommendedServices: [
          { label: "RF shielding pentru RMN", href: "/servicii/rf-shielding-rmn" },
          { label: "Proiectare camera RMN", href: "/servicii/proiectare-camera-rmn" },
        ],
        suggestedWorkflows: [
          route("AI Discovery", "/ai-discovery?scenario=mri-room", "workflow"),
          route("Calculator cost camera RMN", "/calculatoare/cost-camera-rmn", "tool"),
          route("Proposal Builder", "/proposal-builder?source=zes-guide", "tool"),
        ],
        commercialOpportunityType: "proiect RMN cu complexitate critica",
        leadReadiness: "moderata",
        urgencySignal: "planificare",
        projectMaturity: "partial-definit",
        nextBestAction:
          "Clarificati datele de echipament si camera in AI Discovery, apoi continuati cu Proposal Builder pentru structurarea ofertarii.",
        ctas: [
          route("Continua cu AI Discovery", "/ai-discovery?scenario=mri-room", "workflow"),
          route("Trimite cerere pentru oferta preliminara", "/proposal-builder?source=zes-guide", "tool"),
          route("Solicita discutie cu specialist ZESCORP", "/contact", "contact"),
        ],
        leadIntentSummary:
          "Intent detectat: camera RMN. Prioritate: RF shielding + instalare + utilitati.",
      };
    case "radiology-modernization":
      return {
        intent,
        answer:
          "ZES vede modernizarea radiologiei ca proiect de continuitate operationala: etapizare, risc de downtime si integrare cu infrastructura existenta.",
        missingQuestions: [
          "Ce echipamente raman in operare si ce se schimba?",
          "Care este downtime-ul maxim acceptat?",
          "Exista documentatie tehnica actualizata pentru spatiile existente?",
        ],
        recommendedServices: [
          { label: "Modernizare clinica medicala", href: "/servicii/modernizare-clinica-medicala" },
          { label: "Amenajare spatii radiologie", href: "/servicii/amenajare-spatii-radiologie" },
        ],
        suggestedWorkflows: [
          route("AI Discovery", "/ai-discovery?scenario=radiology-modernization", "workflow"),
          route("Project Intake", "/project-intake?source=zes-guide", "tool"),
          route("Service diagnostic", "/service-diagnostic", "tool"),
        ],
        commercialOpportunityType: "modernizare cu risc operational",
        leadReadiness: "ridicata",
        urgencySignal: "activ",
        projectMaturity: "pregatit-pentru-analiza",
        nextBestAction:
          "Porniti cu Project Intake pentru context complet si secventiere etapizata cu risc controlat.",
        ctas: [
          route("Continua cu AI Discovery", "/ai-discovery?scenario=radiology-modernization", "workflow"),
          route("Trimite detalii in Project Intake", "/project-intake?source=zes-guide", "tool"),
          route("Solicita discutie cu specialist ZESCORP", "/contact", "contact"),
        ],
        leadIntentSummary:
          "Intent detectat: modernizare radiologie. Follow-up recomandat: evaluare tehnica + plan de etapizare.",
      };
    case "service-maintenance":
      return {
        intent,
        answer:
          "Pentru service/mentenanta, ZES prioritizeaza impactul operational: urgenta, indisponibilitate echipament si acoperirea contractuala.",
        missingQuestions: [
          "Ce echipament este afectat si care este simptomul principal?",
          "Downtime-ul blocheaza activitatea clinicii?",
          "Exista istoric de interventii sau coduri de eroare?",
        ],
        recommendedServices: [
          { label: "Service aparatura medicala", href: "/services/service-aparatura-medicala" },
          { label: "Service diagnostic", href: "/service-diagnostic" },
        ],
        suggestedWorkflows: [
          route("Service Diagnostic", "/service-diagnostic", "tool"),
          route("Project Intake", "/project-intake?source=zes-guide", "tool"),
          route("Contact specialist", "/contact", "contact"),
        ],
        commercialOpportunityType: "service critic / continuitate operationala",
        leadReadiness: "ridicata",
        urgencySignal: "urgent",
        projectMaturity: "pregatit-pentru-analiza",
        nextBestAction:
          "Trimiteti imediat contextul tehnic minim prin Service Diagnostic sau Project Intake pentru triere rapida.",
        ctas: [
          route("Deschide Service Diagnostic", "/service-diagnostic", "tool"),
          route("Trimite detalii urgente", "/project-intake?source=zes-guide", "tool"),
          route("Solicita discutie cu specialist ZESCORP", "/contact", "contact"),
        ],
        leadIntentSummary:
          "Intent detectat: service/mentenanta cu risc de downtime. Prioritate: interventie si clarificare rapida.",
      };
    case "lab-ivd":
      return {
        intent,
        answer:
          "Pentru laborator IVD, ZES recomanda corelarea dintre analizatoare, flux operational si infrastructura (electric, HVAC, utilitati).",
        missingQuestions: [
          "Ce tipuri de analizatoare IVD sunt vizate?",
          "Laboratorul este nou sau modernizat in spatiu existent?",
          "Care sunt constrangerile de termen si buget?",
        ],
        recommendedServices: [
          { label: "IVD laborator", href: "/services/ivd-laborator" },
          { label: "Evaluare infrastructura clinica", href: "/servicii/evaluare-infrastructura-clinica" },
        ],
        suggestedWorkflows: [
          route("AI Discovery", "/ai-discovery", "workflow"),
          route("Calculator cost laborator IVD", "/calculatoare/cost-laborator-ivd", "tool"),
          route("Project Intake", "/project-intake?source=zes-guide", "tool"),
        ],
        commercialOpportunityType: "proiect laborator cu integrare operationala",
        leadReadiness: "moderata",
        urgencySignal: "planificare",
        projectMaturity: "partial-definit",
        nextBestAction:
          "Continuati in AI Discovery pentru clarificare de cerinte si apoi trimiteti contextul in Project Intake.",
        ctas: [
          route("Continua cu AI Discovery", "/ai-discovery", "workflow"),
          route("Calculeaza cost laborator IVD", "/calculatoare/cost-laborator-ivd", "tool"),
          route("Trimite detalii pentru analiza", "/project-intake?source=zes-guide", "tool"),
        ],
        leadIntentSummary:
          "Intent detectat: laborator IVD. Urmator pas: clarificare flux + infrastructura + documentatie tehnica.",
      };
    case "shielding-radioprotection":
      return {
        intent,
        answer:
          "ZES separa clar RF shielding (RMN) de radioprotectie (CT/RX). Alegerea depinde de modalitate, configuratia camerei si cerintele echipamentului.",
        missingQuestions: [
          "Proiectul este RMN sau CT/RX?",
          "Exista planul camerei si configuratia echipamentului?",
          "Aveti deja studii preliminare de protectie sau doar conceptul initial?",
        ],
        recommendedServices: [
          { label: "RF shielding", href: "/services/rf-shielding" },
          { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
        ],
        suggestedWorkflows: [
          route("Compara RF shielding vs radioprotectie", "/comparatii/rf-shielding-vs-radioprotectie", "tool"),
          route("AI Discovery", "/ai-discovery", "workflow"),
          route("Radiology room planner", "/radiology-room-planner", "tool"),
        ],
        commercialOpportunityType: "proiect protectie infrastructura",
        leadReadiness: "moderata",
        urgencySignal: "planificare",
        projectMaturity: "partial-definit",
        nextBestAction:
          "Identificati modalitatea exacta, apoi continuati in AI Discovery pentru traseu tehnic corect.",
        ctas: [
          route("Continua cu AI Discovery", "/ai-discovery", "workflow"),
          route("Solicita discutie tehnica de validare", "/contact", "contact"),
          route("Genereaza context pentru ofertare", "/proposal-builder?source=zes-guide", "tool"),
        ],
        leadIntentSummary:
          "Intent detectat: shielding/radioprotectie. Necesara clarificare modalitate si configuratie camera.",
      };
    case "cncan":
      return {
        intent,
        answer:
          "Pentru CNCAN, ZES poate orienta proiectul pe pasii de planificare tehnica si documentare preliminara, fara a oferi garantii de aprobare.",
        missingQuestions: [
          "Ce modalitate imagistica este implicata?",
          "In ce stadiu este documentatia tehnica a camerei?",
          "Cine coordoneaza partea de autorizare in proiect?",
        ],
        recommendedServices: [
          { label: "Radiologie", href: "/services/radiologie" },
          { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
        ],
        suggestedWorkflows: [
          route("AI Discovery", "/ai-discovery", "workflow"),
          route("Ghid autorizare CNCAN", "/ghiduri/autorizare-cncan", "tool"),
          route("Project Intake", "/project-intake?source=zes-guide", "tool"),
        ],
        commercialOpportunityType: "suport planificare conformitate",
        leadReadiness: "moderata",
        urgencySignal: "planificare",
        projectMaturity: "partial-definit",
        nextBestAction:
          "Structurati contextul tehnic in Project Intake si stabiliti validarea de specialitate pentru autorizare.",
        ctas: [
          route("Citeste ghidul CNCAN", "/ghiduri/autorizare-cncan", "tool"),
          route("Trimite context in Project Intake", "/project-intake?source=zes-guide", "tool"),
          route("Solicita discutie cu specialist ZESCORP", "/contact", "contact"),
        ],
        leadIntentSummary:
          "Intent detectat: CNCAN/conformitate. Urmator pas: structurare documentatie si validare tehnica.",
      };
    case "funding":
      return {
        intent,
        answer:
          "Pentru proiecte pe fonduri europene, ZES recomanda pregatirea timpurie a specificatiilor tehnice, bugetelor orientative si a secventierii de implementare.",
        missingQuestions: [
          "Care este tipul apelului de finantare si calendarul?",
          "Ce echipamente si spatii sunt incluse in proiect?",
          "Exista buget orientativ si prioritate pe faze?",
        ],
        recommendedServices: [
          { label: "Consultanta proiecte medicale", href: "/servicii/consultanta-proiecte-medicale" },
          { label: "Planificare infrastructura imagistica", href: "/servicii/planificare-infrastructura-imagistica" },
        ],
        suggestedWorkflows: [
          route("AI Discovery", "/ai-discovery?scenario=imaging-expansion", "workflow"),
          route("Project Intake", "/project-intake?source=zes-guide", "tool"),
          route("Proposal Builder", "/proposal-builder?source=zes-guide", "tool"),
        ],
        commercialOpportunityType: "proiect finantabil, orientat pe planificare",
        leadReadiness: "moderata",
        urgencySignal: "activ",
        projectMaturity: "pregatit-pentru-analiza",
        nextBestAction:
          "Continuati in AI Discovery pentru clarificare, apoi centralizati datele in Project Intake pentru discutia tehnica.",
        ctas: [
          route("Continua cu AI Discovery", "/ai-discovery?scenario=imaging-expansion", "workflow"),
          route("Trimite cerere pentru proiect", "/project-intake?source=zes-guide", "tool"),
          route("Genereaza context pentru ofertare", "/proposal-builder?source=zes-guide", "tool"),
        ],
        leadIntentSummary:
          "Intent detectat: proiect pe finantare. Prioritate: specificatii tehnice + buget + fazare implementare.",
      };
    case "equipment-offer":
      return {
        intent,
        answer:
          "Daca doriti oferta pentru echipamente, ZES recomanda sa corelati selectia comerciala cu infrastructura reala a spatiului si constrangerile de implementare.",
        missingQuestions: [
          "Ce tipuri de echipamente vizati si in ce volum?",
          "Spatiul este pregatit sau necesita adaptari?",
          "Care este termenul de achizitie/instalare dorit?",
        ],
        recommendedServices: [
          { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
          { label: "Consultanta proiecte medicale", href: "/servicii/consultanta-proiecte-medicale" },
        ],
        suggestedWorkflows: [
          route("Proposal Builder", "/proposal-builder?source=zes-guide", "tool"),
          route("Project Intake", "/project-intake?source=zes-guide", "tool"),
          route("Calculator cost echipamente imagistica", "/calculatoare/cost-echipamente-imagistica", "tool"),
        ],
        commercialOpportunityType: "intent de achizitie echipamente",
        leadReadiness: "ridicata",
        urgencySignal: "activ",
        projectMaturity: "pregatit-pentru-oferta",
        nextBestAction:
          "Generati contextul de ofertare in Proposal Builder si trimiteti detaliile in Project Intake pentru discutie cu specialistii ZESCORP.",
        ctas: [
          route("Genereaza context pentru ofertare", "/proposal-builder?source=zes-guide", "tool"),
          route("Trimite detalii in Project Intake", "/project-intake?source=zes-guide", "tool"),
          route("Solicita discutie cu specialist ZESCORP", "/contact", "contact"),
        ],
        leadIntentSummary:
          "Intent detectat: oferta echipamente. Pregatire comerciala ridicata, recomandat follow-up rapid.",
      };
    case "project-planning":
      return {
        intent,
        answer:
          "ZES poate ghida proiectul din faza de orientare pana la discutie tehnica: intentie, riscuri, informatii lipsa, servicii si urmatorul flux recomandat.",
        missingQuestions: [
          "Care este tipul principal de proiect medical?",
          "In ce etapa sunteti: idee, bugetare, proiectare sau executie?",
          "Ce informatii tehnice aveti deja (planuri, echipament, buget)?",
        ],
        recommendedServices: [
          { label: "Consultanta proiecte medicale", href: "/servicii/consultanta-proiecte-medicale" },
          { label: "Evaluare infrastructura clinica", href: "/servicii/evaluare-infrastructura-clinica" },
        ],
        suggestedWorkflows: [
          route("AI Discovery", "/ai-discovery", "workflow"),
          route("Planificare proiect medical", "/planificare", "workflow"),
          route("Project Intake", "/project-intake?source=zes-guide", "tool"),
        ],
        commercialOpportunityType: "lead orientat spre planificare",
        leadReadiness: "scazuta",
        urgencySignal: "exploratoriu",
        projectMaturity: "inceput",
        nextBestAction:
          "Incepeti cu AI Discovery pentru clarificare structurata, apoi continuati in Project Intake.",
        ctas: [
          route("Continua cu AI Discovery", "/ai-discovery", "workflow"),
          route("Vezi traseele de planificare", "/planificare", "workflow"),
          route("Trimite cerere pentru analiza preliminara", "/project-intake?source=zes-guide", "tool"),
        ],
        leadIntentSummary:
          "Intent detectat: orientare proiect. Necesare clarificari pentru cresterea readiness-ului.",
      };
    case "general":
    default:
      return {
        intent: "general",
        answer:
          "ZES te poate ghida spre traseul potrivit: AI Discovery pentru clarificare, Proposal Builder pentru context de ofertare sau Project Intake pentru analiza tehnica.",
        missingQuestions: [
          "Ce tip de proiect aveti in vedere: imagistica, laborator, modernizare sau service?",
          "In ce etapa sunteti acum?",
          "Care este prioritatea principala: termen, buget, conformitate sau continuitate operationala?",
        ],
        recommendedServices: [
          { label: "Servicii medicale ZESCORP", href: "/servicii" },
          { label: "Consultanta proiecte medicale", href: "/servicii/consultanta-proiecte-medicale" },
        ],
        suggestedWorkflows: [
          route("AI Discovery", "/ai-discovery", "workflow"),
          route("Proposal Builder", "/proposal-builder?source=zes-guide", "tool"),
          route("Project Intake", "/project-intake?source=zes-guide", "tool"),
        ],
        commercialOpportunityType: "inquiry general",
        leadReadiness: "scazuta",
        urgencySignal: "exploratoriu",
        projectMaturity: "inceput",
        nextBestAction:
          "Porniti cu AI Discovery pentru o clarificare rapida si apoi alegeti fluxul tehnic recomandat.",
        ctas: [
          route("Discutie ghidata in AI Discovery", "/ai-discovery", "workflow"),
          route("Genereaza context pentru ofertare", "/proposal-builder?source=zes-guide", "tool"),
          route("Trimite cerere pentru analiza", "/project-intake?source=zes-guide", "tool"),
        ],
        leadIntentSummary:
          "Intent detectat: general/necunoscut. Urmator pas: clarificare intentie si context tehnic.",
      };
  }
}

function route(
  label: string,
  href: string,
  kind: ZESGuideRoutingTarget["kind"],
  availability: ZESGuideRoutingTarget["availability"] = "available",
): ZESGuideRoutingTarget {
  return { label, href, kind, availability };
}
