export type JourneyLink = {
  label: string;
  href: string;
};

export type PlanningJourneyStage = {
  stage: "orientare" | "validare-tehnica" | "proiectare-autorizare" | "executie-integrare" | "service-mentenanta";
  title: string;
  description: string;
};

export type PlanningJourney = {
  slug: string;
  title: string;
  description: string;
  userIntent: string;
  projectStage: string;
  recommendedFirstStep: string;
  recommendedServices: JourneyLink[];
  recommendedTools: JourneyLink[];
  recommendedArticles: string[];
  recommendedGuides: JourneyLink[];
  nextActions: string[];
  risks: string[];
  stages: PlanningJourneyStage[];
  cta: JourneyLink & {
    description: string;
  };
};

const defaultStages: PlanningJourneyStage[] = [
  {
    stage: "orientare",
    title: "Orientare",
    description:
      "Clarifica obiectivul, spatiul, echipamentele vizate si informatiile lipsa.",
  },
  {
    stage: "validare-tehnica",
    title: "Validare tehnica",
    description:
      "Verifica ipotezele tehnice inainte de buget, achizitie sau executie.",
  },
  {
    stage: "proiectare-autorizare",
    title: "Proiectare / autorizare",
    description:
      "Coordoneaza proiectarea cu DSP, CNCAN unde este cazul, ecranare si cerinte de aparatura.",
  },
  {
    stage: "executie-integrare",
    title: "Executie / integrare",
    description:
      "Pregateste infrastructura, aparatura, testarea si commissioning-ul fara decizii tardive.",
  },
  {
    stage: "service-mentenanta",
    title: "Service / mentenanta",
    description:
      "Planifica accesul service, mentenanta preventiva si continuitatea operationala.",
  },
];

export const planningJourneys: PlanningJourney[] = [
  {
    slug: "deschid-clinica-medicala",
    title: "Deschid o clinica medicala",
    description:
      "Pentru fondatori, investitori sau manageri care pornesc o clinica si trebuie sa lege spatiul, DSP, aparatura, fluxurile si bugetarea.",
    userIntent: "Vreau sa inteleg ce trebuie planificat inainte de buget final.",
    projectStage: "Concept / bugetare",
    recommendedFirstStep:
      "Porneste cu o analiza preliminara a fluxurilor, specialitatilor si echipamentelor principale.",
    recommendedServices: [
      { label: "Constructii medicale", href: "/services/constructii-medicale" },
      { label: "Amenajari medicale", href: "/services/amenajari-medicale" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "IVD / laborator", href: "/services/ivd-laborator" },
    ],
    recommendedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    recommendedArticles: [
      "cum-se-construieste-o-clinica-medicala-in-romania",
      "autorizare-dsp-clinica-medicala",
      "costuri-ascunse-amenajare-clinica-medicala",
      "planificare-fluxuri-clinica-medicala",
    ],
    recommendedGuides: [
      { label: "Cost clinica medicala", href: "/ghiduri/cost-clinica-medicala" },
      { label: "Autorizare DSP", href: "/ghiduri/autorizare-dsp" },
    ],
    nextActions: [
      "Defineste specialitatile si fluxurile principale.",
      "Listeaza aparatura care poate schimba spatiul si instalatiile.",
      "Clarifica cerintele DSP si eventualele zone de radiologie sau laborator.",
      "Cere o propunere preliminara inainte de achizitii majore.",
    ],
    risks: [
      "estimare doar pe metru patrat",
      "aparatura aleasa dupa proiectarea finala",
      "DSP tratat ca etapa de final",
      "service si mentenanta neincluse in buget",
    ],
    stages: defaultStages,
    cta: {
      label: "Structureaza proiectul",
      href: "/proposal-builder",
      description:
        "Genereaza o propunere preliminara cu servicii, faze, buget orientativ si informatii lipsa.",
    },
  },
  {
    slug: "amenajez-camera-rmn",
    title: "Amenajez o camera RMN",
    description:
      "Pentru proiecte RMN unde trebuie clarificate RF shielding-ul, cusca Faraday, HVAC-ul, accesul magnetului si integrarea echipamentului.",
    userIntent: "Vreau sa stiu ce trebuie verificat pentru camera RMN.",
    projectStage: "Planificare tehnica / echipament in analiza",
    recommendedFirstStep:
      "Separa cerintele RMN de CT/RX: pentru RMN discutia critica este RF shielding, nu plumb.",
    recommendedServices: [
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "Imagistica medicala", href: "/services/imagistica-medicala" },
    ],
    recommendedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    recommendedArticles: [
      "checklist-camera-rmn-inainte-instalare",
      "cat-dureaza-amenajarea-camera-rmn",
      "camera-faraday-rmn",
      "verificari-inainte-achizitie-rmn",
    ],
    recommendedGuides: [
      { label: "Cost camera RMN", href: "/ghiduri/cost-camera-rmn" },
      { label: "Amenajare radiologie", href: "/ghiduri/amenajare-radiologie" },
    ],
    nextActions: [
      "Colecteaza cerintele furnizorului RMN.",
      "Verifica RF shielding, usa RF, filtre, waveguides si penetrari.",
      "Analizeaza HVAC, vibratii, acces magnet si zone tehnice.",
      "Planifica testarea RF inainte de receptie.",
    ],
    risks: [
      "confuzie intre RF shielding si ecranare cu plumb",
      "penetrari RF tratate tarziu",
      "HVAC sau vibratii analizate dupa executie",
      "date incomplete de la furnizorul RMN",
    ],
    stages: defaultStages,
    cta: {
      label: "Planifica camera RMN",
      href: "/radiology-room-planner",
      description:
        "Raspunde la intrebarile de camera RMN si obtine o prima orientare tehnica.",
    },
  },
  {
    slug: "amenajez-camera-ct-rx",
    title: "Amenajez o camera CT / RX",
    description:
      "Pentru camere CT, RX sau fluoroscopie unde conteaza protectia radiologica, plumbul, zonele controlate, CNCAN si integrarea aparaturii.",
    userIntent: "Vreau sa pregatesc camera pentru radiologie cu radiatii ionizante.",
    projectStage: "Planificare radiologie / autorizare",
    recommendedFirstStep:
      "Porneste cu echipamentul, layout-ul, vecinatatile si cerintele de protectie radiologica.",
    recommendedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
      { label: "Imagistica medicala", href: "/services/imagistica-medicala" },
    ],
    recommendedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    recommendedArticles: [
      "checklist-camera-ct-inainte-instalare",
      "cat-dureaza-amenajarea-camera-ct",
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "protectie-radiologica-camera-rx",
    ],
    recommendedGuides: [
      { label: "Cost camera CT", href: "/ghiduri/cost-camera-ct" },
      { label: "Autorizare CNCAN", href: "/ghiduri/autorizare-cncan" },
    ],
    nextActions: [
      "Clarifica echipamentul CT/RX si pozitia operatorului.",
      "Verifica protectia radiologica, usile, sticla si zonele controlate.",
      "Integreaza cerintele CNCAN inainte de executie.",
      "Coordoneaza alimentarea, HVAC-ul, datele si service-ul echipamentului.",
    ],
    risks: [
      "CNCAN tratat prea tarziu",
      "plumb si zone controlate validate dupa executie",
      "CT/RX confundat cu cerintele RMN",
      "layout necorelat cu fluxul pacient / operator",
    ],
    stages: defaultStages,
    cta: {
      label: "Planifica CT / RX",
      href: "/radiology-room-planner",
      description:
        "Structureaza camera CT/RX cu protectie radiologica si pasi de validare.",
    },
  },
  {
    slug: "modernizez-radiologie",
    title: "Modernizez o radiologie",
    description:
      "Pentru clinici sau spitale care inlocuiesc aparatura, refac camere existente sau vor sa reduca riscul de intrerupere operationala.",
    userIntent: "Vreau sa modernizez fara blocaje si fara confuzie intre RMN, CT si RX.",
    projectStage: "Modernizare / spatiu existent",
    recommendedFirstStep:
      "Auditeaza camera existenta, aparatura, autorizarea, ecranarea si accesul service inainte de decizia finala.",
    recommendedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "RF shielding", href: "/services/rf-shielding" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
      { label: "Service aparatura", href: "/services/service-aparatura-medicala" },
    ],
    recommendedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Estimator service", href: "/calculatoare/service-aparatura" },
    ],
    recommendedArticles: [
      "modernizare-radiologie-clinica",
      "greseli-amenajare-camera-radiologie",
      "riscuri-aparatura-cumparata-inainte-proiectare",
      "service-ct-rmn-mentenanta-uptime",
    ],
    recommendedGuides: [
      { label: "Amenajare radiologie", href: "/ghiduri/amenajare-radiologie" },
      { label: "Service aparatura medicala", href: "/ghiduri/service-aparatura-medicala" },
    ],
    nextActions: [
      "Verifica ce se pastreaza si ce trebuie refacut.",
      "Separa RMN/RF de CT/RX/protectie radiologica.",
      "Planifica fazarea lucrarilor si downtime-ul.",
      "Include service-ul si piesele critice in decizie.",
    ],
    risks: [
      "camera existenta presupusa compatibila fara audit",
      "echipament nou cumparat inainte de verificarea infrastructurii",
      "downtime subestimat",
      "documentatie veche necorelata cu noul echipament",
    ],
    stages: defaultStages,
    cta: {
      label: "Pregateste modernizarea",
      href: "/proposal-builder",
      description:
        "Transforma contextul intr-un plan preliminar cu faze, riscuri si servicii relevante.",
    },
  },
  {
    slug: "aleg-aparatura-medicala",
    title: "Aleg aparatura medicala",
    description:
      "Pentru decizii de achizitie, comparare, integrare si service pentru aparatura medicala, imagistica, ecografie sau echipamente conexe.",
    userIntent: "Vreau sa aleg aparatura fara sa descopar tarziu costuri de infrastructura.",
    projectStage: "Achizitie / comparare furnizori",
    recommendedFirstStep:
      "Compara echipamentul cu spatiul, utilitatile, integrarea, service-ul si fluxul clinic.",
    recommendedServices: [
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Imagistica medicala", href: "/services/imagistica-medicala" },
      { label: "Service aparatura", href: "/services/service-aparatura-medicala" },
    ],
    recommendedTools: [
      { label: "Calculator echipamente imagistica", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
    ],
    recommendedArticles: [
      "cum-alegi-aparatura-medicala-pentru-o-clinica",
      "greseli-alegere-aparatura-medicala",
      "integrare-aparatura-medicala-clinica",
      "riscuri-aparatura-cumparata-inainte-proiectare",
    ],
    recommendedGuides: [
      { label: "Aparatura imagistica medicala", href: "/ghiduri/aparatura-imagistica-medicala" },
    ],
    nextActions: [
      "Defineste nevoia clinica si volumul estimat.",
      "Solicita cerinte tehnice, service si garantie de la furnizor.",
      "Verifica infrastructura inainte de comanda.",
      "Include integrarea si mentenanta in bugetul total.",
    ],
    risks: [
      "pret de echipament fara cost de integrare",
      "spatiu nepregatit pentru livrare sau service",
      "contract de mentenanta neclar",
      "alegere bazata doar pe oferta comerciala",
    ],
    stages: defaultStages,
    cta: {
      label: "Estimeaza aparatura",
      href: "/calculatoare/cost-echipamente-imagistica",
      description:
        "Verifica orientativ complexitatea achizitiei, integrarii si service-ului.",
    },
  },
  {
    slug: "pregatesc-laborator-ivd",
    title: "Pregatesc un laborator IVD",
    description:
      "Pentru proiecte de laborator in care conteaza fluxul probelor, echipamentele IVD, utilitatile, calibrarea, validarea si service-ul.",
    userIntent: "Vreau sa pregatesc laboratorul pentru echipamente IVD si operare coerenta.",
    projectStage: "Planificare laborator / echipamente",
    recommendedFirstStep:
      "Porneste de la fluxul probelor, volumul estimat, lista de analize si echipamentele principale.",
    recommendedServices: [
      { label: "IVD / laborator", href: "/services/ivd-laborator" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Service aparatura", href: "/services/service-aparatura-medicala" },
    ],
    recommendedTools: [
      { label: "Calculator laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
    ],
    recommendedArticles: [
      "pregatire-laborator-echipamente-ivd",
      "integrare-echipamente-ivd-flux-laborator",
      "echipamente-ivd-laborator-alegere-integrare-service",
      "echipamente-necesare-laborator-ivd",
    ],
    recommendedGuides: [
      { label: "Echipamente IVD / laborator", href: "/ghiduri/echipamente-ivd-laborator" },
    ],
    nextActions: [
      "Mapeaza traseul probelor si zonele suport.",
      "Clarifica utilitati, consumabile, calibrare si QC.",
      "Verifica integrarea LIS/date unde este relevant.",
      "Planifica service-ul preventiv si accesul tehnic.",
    ],
    risks: [
      "echipamente selectate fara flux probe clar",
      "utilitati si consumabile subestimate",
      "calibrare / validare scoase din calendar",
      "service neplanificat",
    ],
    stages: defaultStages,
    cta: {
      label: "Estimeaza laboratorul",
      href: "/calculatoare/cost-laborator-ivd",
      description:
        "Obtine o orientare pentru infrastructura, echipamente IVD, integrare si service.",
    },
  },
  {
    slug: "am-nevoie-service-aparatura",
    title: "Am nevoie de service aparatura",
    description:
      "Pentru probleme active, mentenanta preventiva, uptime, diagnostic preliminar si planificarea interventiilor la aparatura medicala.",
    userIntent: "Vreau sa inteleg urgenta, riscul operational si pasii de service.",
    projectStage: "Operare / mentenanta",
    recommendedFirstStep:
      "Pregateste modelul, seria, simptomele, codurile de eroare si impactul operational.",
    recommendedServices: [
      { label: "Service aparatura medicala", href: "/services/service-aparatura-medicala" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Imagistica medicala", href: "/services/imagistica-medicala" },
    ],
    recommendedTools: [
      { label: "Service Diagnostic", href: "/service-diagnostic" },
      { label: "Estimator service", href: "/calculatoare/service-aparatura" },
      { label: "Contact ZES", href: "/contact" },
    ],
    recommendedArticles: [
      "service-preventiv-vs-corectiv-aparatura-medicala",
      "contract-mentenanta-aparatura-medicala",
      "mentenanta-preventiva-aparatura-medicala",
      "service-ct-rmn-mentenanta-uptime",
    ],
    recommendedGuides: [
      { label: "Service aparatura medicala", href: "/ghiduri/service-aparatura-medicala" },
    ],
    nextActions: [
      "Descrie problema si impactul operational.",
      "Verifica istoricul de service si contractul existent.",
      "Stabileste daca este corectiv, preventiv sau evaluare.",
      "Solicita triere daca echipamentul afecteaza activitatea.",
    ],
    risks: [
      "downtime prelungit",
      "probleme intermitente ignorate",
      "lipsa istoric service",
      "contract de mentenanta neclar",
    ],
    stages: defaultStages.filter((stage) =>
      ["orientare", "validare-tehnica", "service-mentenanta"].includes(stage.stage),
    ),
    cta: {
      label: "Evalueaza problema",
      href: "/service-diagnostic",
      description:
        "Foloseste trierea service pentru urgenta, risc si pasii recomandati.",
    },
  },
  {
    slug: "nu-stiu-de-unde-sa-incep",
    title: "Nu stiu de unde sa incep",
    description:
      "Pentru utilizatori aflati la inceput, cu idei neclare despre spatiu, echipamente, autorizari, buget sau ordinea deciziilor.",
    userIntent: "Vreau un traseu de orientare inainte sa aleg serviciul sau instrumentul.",
    projectStage: "Orientare initiala",
    recommendedFirstStep:
      "Raspunde la cateva intrebari pentru a separa infrastructura, aparatura, radiologia, IVD-ul si service-ul.",
    recommendedServices: [
      { label: "Servicii ZES", href: "/services" },
      { label: "Constructii medicale", href: "/services/constructii-medicale" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
    ],
    recommendedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    recommendedArticles: [
      "cum-se-construieste-o-clinica-medicala-in-romania",
      "diferenta-rmn-ct-infrastructura",
      "cum-alegi-aparatura-medicala-pentru-o-clinica",
      "buget-modernizare-clinica-medicala",
    ],
    recommendedGuides: [
      { label: "Cost clinica medicala", href: "/ghiduri/cost-clinica-medicala" },
      { label: "Knowledge Hub", href: "/knowledge-hub" },
    ],
    nextActions: [
      "Alege scenariul cel mai apropiat de situatie.",
      "Noteaza ce nu stii inca: spatiu, echipament, autorizari, buget.",
      "Foloseste Consultantul AI pentru o prima triere.",
      "Treci la Proposal Builder cand ai context suficient.",
    ],
    risks: [
      "decizii luate inainte de clarificarea obiectivului",
      "amestecarea cerintelor RMN cu CT/RX",
      "bugetare fara echipamente si service",
      "calendar nerealist",
    ],
    stages: defaultStages,
    cta: {
      label: "Incepe orientarea",
      href: "/ai-project-advisor",
      description:
        "Porneste cu un intake ghidat pentru proiecte medicale, aparatura, radiologie, IVD sau service.",
    },
  },
];

export function getPlanningJourneyBySlug(slug: string) {
  return planningJourneys.find((journey) => journey.slug === slug);
}

export function getPlanningJourneyRecommendations({
  articleSlug,
  guideHref,
  serviceHref,
  toolHref,
  limit = 3,
}: {
  articleSlug?: string;
  guideHref?: string;
  serviceHref?: string;
  toolHref?: string;
  limit?: number;
} = {}) {
  return planningJourneys
    .map((journey) => {
      let score = 0;

      if (articleSlug && journey.recommendedArticles.includes(articleSlug)) {
        score += 42;
      }

      if (guideHref && journey.recommendedGuides.some((guide) => guide.href === guideHref)) {
        score += 36;
      }

      if (serviceHref && journey.recommendedServices.some((service) => service.href === serviceHref)) {
        score += 38;
      }

      if (toolHref && journey.recommendedTools.some((tool) => tool.href === toolHref)) {
        score += 34;
      }

      if (!score && journey.slug === "nu-stiu-de-unde-sa-incep") {
        score += 10;
      }

      return { journey, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.journey);
}
