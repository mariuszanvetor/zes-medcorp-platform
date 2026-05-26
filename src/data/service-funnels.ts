import type { ArticleFAQ } from "@/data/articles";

export type ServiceFunnelCategory =
  | "imagistica"
  | "radioprotectie-rf"
  | "infrastructura"
  | "planificare-clinica";

export type ServiceFunnelLink = {
  label: string;
  href: string;
  reason: string;
};

export type ServiceFunnelStep = {
  title: string;
  description: string;
};

export type ServiceFunnelCTA = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type ServiceFunnelPage = {
  slug: string;
  title: string;
  category: ServiceFunnelCategory;
  description: string;
  targetKeyword: string;
  seoKeywords: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  overview: string;
  methodology: string;
  process: ServiceFunnelStep[];
  infrastructureConsiderations: string[];
  commonMistakes: string[];
  trustPoints: string[];
  disclaimer: string;
  relatedCalculators: ServiceFunnelLink[];
  relatedComparisons: ServiceFunnelLink[];
  relatedGlossary: ServiceFunnelLink[];
  relatedArticles: ServiceFunnelLink[];
  faqs: ArticleFAQ[];
  cta: ServiceFunnelCTA;
  updatedAt: string;
};

const standardProcess: ServiceFunnelStep[] = [
  {
    title: "Clarificare scope",
    description:
      "Confirmam tipul proiectului, nivelul de complexitate, echipamentul si obiectivul comercial inainte de a desena solutii premature.",
  },
  {
    title: "Validare tehnica",
    description:
      "Corelam camera, utilitatile, furnizorul de echipament si constrangerile de site pentru a evita reconfigurarile tarzii.",
  },
  {
    title: "Planificare si integrare",
    description:
      "Asezam in acelasi cadru infrastructura, instalatiile, autorizarea si operarea curenta sau viitoare.",
  },
  {
    title: "Pasul urmator",
    description:
      "Daca proiectul este suficient de clar, trecem in Project Intake sau Proposal Builder pentru structura detaliata.",
  },
];

const standardTrustPoints = [
  "Orientare preliminara, nu aprobarea finala a proiectului.",
  "Decizia finala depinde de echipament, locatie si cerinte reale de amplasament.",
  "Serviciile sunt gandite pentru proiecte medicale serioase, nu pentru marketing generic.",
];

const updatedAt = "2026-05-26";

function link(label: string, href: string, reason: string): ServiceFunnelLink {
  return { label, href, reason };
}

export const serviceFunnelCategoryLabels: Record<ServiceFunnelCategory, string> = {
  imagistica: "Imagistica",
  "radioprotectie-rf": "Radioprotectie / RF shielding",
  infrastructura: "Infrastructura",
  "planificare-clinica": "Planificare clinica",
};

export const serviceFunnels: ServiceFunnelPage[] = [
  {
    slug: "proiectare-camera-rmn",
    title: "Proiectare cameră RMN",
    category: "imagistica",
    description:
      "Proiectare tehnica pentru camera RMN, cu accent pe RF shielding, acces, integrare si pregatirea pentru instalare.",
    targetKeyword: "proiectare cameră RMN",
    seoKeywords: [
      "camera RMN",
      "proiectare RMN",
      "RF shielding",
      "cușcă Faraday",
      "planificare RMN",
    ],
    heroEyebrow: "MRI project design",
    heroTitle: "Proiectare cameră RMN care pornește de la echipament și de la site, nu de la o schiță generică.",
    heroDescription:
      "ZES tratează proiectarea camerei RMN ca un proces tehnic complet: RF shielding, acces, HVAC, trasee de service, cerințe de integrare și pași de validare.",
    overview:
      "O cameră RMN bine proiectată reduce riscul de refaceri, blochează mai puține decizii târzii și permite furnizorului de echipament să lucreze pe o bază coerentă.",
    methodology:
      "Analizăm încă din start cerințele furnizorului RMN, constrângerile de spațiu, traseele de acces și poziționarea sistemelor critice, apoi corelăm acestea cu RF shielding și instalațiile auxiliare.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Cușca Faraday, ușile RF și penetrările trebuie corelate cu modelul de echipament.",
      "HVAC-ul și vibrațiile pot afecta performanța și confortul operațional.",
      "Accesul pentru service și fluxul pacientului trebuie planificate înainte de execuție.",
      "Quench pipe-ul și detaliile de siguranță nu se improvizează la final.",
    ],
    commonMistakes: [
      "Confuzia între RF shielding și protecția radiologică.",
      "Alegerea echipamentului înainte de validarea camerei.",
      "Neglijarea detaliilor de integrare pentru uși, filtre și penetrări.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Această pagină oferă orientare tehnică preliminară. Soluția finală depinde de amplasament, specificația echipamentului și validarea tehnică de proiect.",
    relatedCalculators: [
      link("Estimare cost cameră RMN", "/calculatoare/cost-camera-rmn", "Ajută la orientarea bugetului înainte de decizia finală."),
      link("Estimare RF shielding", "/calculatoare/rf-shielding-estimare", "Utilă pentru scenariile în care camera RMN trebuie corelată cu ecranarea RF."),
      link("Estimare spațiu minim RMN", "/calculatoare/spatiu-minim-rmn", "Ajută la verificarea dimensiunilor de bază înainte de proiectare."),
    ],
    relatedComparisons: [
      link("RMN vs CT", "/comparatii/rmn-vs-ct", "Compară două scenarii cu cerințe de infrastructură diferite."),
      link("Camera RMN vs camera CT", "/comparatii/camera-rmn-vs-camera-ct", "Arată diferențele de proiectare între cele două camere."),
      link("RF shielding vs radioprotecție", "/comparatii/rf-shielding-vs-radioprotectie", "Clarifică diferența care apare des în discuțiile de proiect."),
    ],
    relatedGlossary: [
      link("Cameră Faraday pentru RMN", "/glosar/camera-faraday-rmn", "Explică piesa de bază a infrastructurii RF."),
      link("Explicație Faraday cage", "/glosar/faraday-cage-explicatie", "Bună pentru echipele care au nevoie de context simplu."),
      link("MRI project timeline", "/glosar/mri-project-timeline", "Ajută la poziționarea etapelor de lucru."),
    ],
    relatedArticles: [
      link("Pregătire înainte de instalarea unui RMN", "/knowledge-hub/pregatire-instalare-rmn", "Următorul pas util după definirea camerei."),
      link("Checklist cameră RMN înainte de instalare", "/knowledge-hub/checklist-camera-rmn-inainte-instalare", "Simplifică pregătirea inițială."),
      link("Greșeli frecvente în proiectarea camerelor RMN", "/knowledge-hub/greseli-critice-in-proiectarea-camerelor-rmn", "Arată riscurile tipice de evitat."),
    ],
    faqs: [
      {
        question: "Ce este cel mai important într-o cameră RMN?",
        answer:
          "Corelarea dintre echipament, RF shielding, acces și instalații auxiliare este mai importantă decât orice detaliu izolat.",
      },
      {
        question: "Poate fi proiectarea făcută înainte de alegerea exactă a aparatului?",
        answer:
          "Se poate face o orientare inițială, dar validarea finală depinde de echipamentul ales și de cerințele furnizorului.",
      },
      {
        question: "De ce este importantă etapa de consultanță?",
        answer:
          "Pentru a evita decizii de tipul \"design first, validate later\", care duc de obicei la costuri suplimentare.",
      },
    ],
    cta: {
      title: "Ai un proiect RMN și vrei să-l structurezi corect de la început?",
      description:
        "Continuă cu Project Intake sau cere o propunere preliminară dacă ai deja date suficiente despre spațiu și echipament.",
      primaryLabel: "Start Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "proiectare-camera-ct",
    title: "Proiectare cameră CT",
    category: "imagistica",
    description:
      "Proiectare tehnica pentru camera CT, cu accent pe protectie radiologica, flux, instalatii si pregatirea documentelor de proiect.",
    targetKeyword: "proiectare cameră CT",
    seoKeywords: [
      "camera CT",
      "proiectare CT",
      "protecție radiologică",
      "CNCAN",
      "planificare radiologie",
    ],
    heroEyebrow: "CT room planning",
    heroTitle: "Proiectare cameră CT care leagă protecția radiologică de layout, utilități și operare.",
    heroDescription:
      "ZES tratează camera CT ca pe un spațiu tehnic critic: protecție radiologică, alimentare, răcire, acces pentru service și compatibilitate cu fluxul clinic.",
    overview:
      "O cameră CT bine gândită reduce reconfigurările de după achiziție și clarifică din timp zona controlată, cerințele de protecție și cerințele de autorizare.",
    methodology:
      "Pornim de la echipamentul propus și de la condițiile reale ale spațiului, apoi corelăm protecția radiologică, poziționarea consolei, traseele de acces și logica de exploatare.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Protecția radiologică se dimensionează după scenariul real al camerei, nu după presupuneri generale.",
      "CNCAN și documentația tehnică trebuie luate în calcul în faza de planificare.",
      "Ventilația și alimentarea electrică trebuie corelate cu echipamentul și cu operațiunea zilnică.",
      "Fluxul pacienților și accesul pentru service influențează layout-ul final.",
    ],
    commonMistakes: [
      "Amânarea deciziei privind protecția radiologică până după achiziția echipamentului.",
      "Subestimarea cerințelor pentru uși, sticlă plumbată și zone controlate.",
      "Presupunerea că o cameră CT seamănă cu o cameră RMN din punct de vedere al ecranării.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Analiza este orientativă și nu înlocuiește validarea finală pe amplasament sau cerințele specifice de proiect și autorizare.",
    relatedCalculators: [
      link("Estimare cost cameră CT", "/calculatoare/cost-camera-ct", "Ajută la orientarea bugetului pentru scenariul CT."),
      link("Estimare radioprotecție CT", "/calculatoare/radioprotectie-ct-estimare", "Utilă pentru scenariile cu ecranare și zone controlate."),
      link("Estimare putere electrică imagistică", "/calculatoare/putere-electrica-imagistica", "Ajută la verificarea utilităților."),
    ],
    relatedComparisons: [
      link("CT vs CBCT", "/comparatii/ct-vs-cbct", "Arată diferențele între scenarii cu cerințe diferite."),
      link("RMN vs CT", "/comparatii/rmn-vs-ct", "Bună pentru clarificarea infrastructurii înainte de decizie."),
      link("RF shielding vs radioprotecție", "/comparatii/rf-shielding-vs-radioprotectie", "Clarifică diferența dintre RMN și CT."),
    ],
    relatedGlossary: [
      link("Protecție radiologică pentru cameră RX", "/glosar/protectie-radiologica-camera-rx", "Bună pentru echipele care planifică radiologia."),
      link("Cerințe electrice radiologie", "/glosar/cerinte-electrice-radiologie", "Ajută la validarea utilităților."),
      link("Explicație Faraday cage", "/glosar/faraday-cage-explicatie", "Utilă doar pentru a separa clar RMN de CT."),
    ],
    relatedArticles: [
      link("Verificări înainte de instalarea unui CT", "/knowledge-hub/verificari-inainte-instalare-ct", "Clarifică ce trebuie verificat înainte de montaj."),
      link("Checklist cameră CT înainte de instalare", "/knowledge-hub/checklist-camera-ct-inainte-instalare", "Ajută la pregătirea proiectului."),
      link("Autorizare CNCAN pas cu pas", "/knowledge-hub/autorizare-cncan-pas-cu-pas", "Utilă pentru contextul de proiect și autorizare."),
    ],
    faqs: [
      {
        question: "Cum diferă o cameră CT de una RMN?",
        answer:
          "CT are cerințe de protecție radiologică și flux diferite de RMN, care are cerințe RF și de compatibilitate electromagnetică.",
      },
      {
        question: "Ce este important în faza de proiectare?",
        answer:
          "Alinierea dintre echipament, layout, utilități și cerințele de autorizare.",
      },
      {
        question: "De ce nu este bine să lași protecția radiologică pe final?",
        answer:
          "Pentru că poate duce la refaceri costisitoare și la întârzierea punerii în funcțiune.",
      },
    ],
    cta: {
      title: "Ai în vedere o cameră CT și vrei o structură clară înainte de achiziție?",
      description:
        "Folosește Project Intake pentru datele inițiale sau Proposal Builder pentru o propunere preliminară.",
      primaryLabel: "Start Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "rf-shielding-rmn",
    title: "RF shielding pentru RMN",
    category: "radioprotectie-rf",
    description:
      "Ecranare RF pentru RMN, cușcă Faraday, uși RF, waveguides și detalii de integrare pentru camera magnetică.",
    targetKeyword: "RF shielding pentru RMN",
    seoKeywords: ["RF shielding", "cușcă Faraday", "RMN", "uși RF", "ecranare electromagnetica"],
    heroEyebrow: "MRI RF shielding",
    heroTitle: "RF shielding pentru RMN care tratează camera ca un sistem, nu ca un accesoriu.",
    heroDescription:
      "Un proiect RMN bun are nevoie de ecranare RF corectă, integrare a ușilor și penetrărilor, plus o relație clară cu HVAC și întreținerea spațiului.",
    overview:
      "RF shielding-ul definește performanța camerei RMN. Dacă este tratat ca detaliu secundar, pot apărea interferențe, întârzieri și costuri de remediere.",
    methodology:
      "Verificăm împreună cu echipamentul și cu site-ul exact ce trebuie integrat: cușca Faraday, ușa RF, filtrele, waveguides și cerințele auxiliare.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Cușca Faraday trebuie dimensionată în raport cu echipamentul și traseele reale.",
      "Ușile RF și penetrările trebuie alese înainte de execuție.",
      "HVAC-ul, vibrațiile și accesul de service influențează rezultatul final.",
      "Testarea și mentenanța trebuie planificate încă din faza de proiect.",
    ],
    commonMistakes: [
      "Confundarea RF shielding-ului cu ecranarea cu plumb.",
      "Neglijarea penetrărilor și a detaliilor de integrare.",
      "Tratarea camerei ca spațiu standard, nu ca sistem tehnic sensibil.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Scenariul este preliminar și nu înlocuiește validarea tehnică finală sau cerințele furnizorului de echipament.",
    relatedCalculators: [
      link("Estimare RF shielding", "/calculatoare/rf-shielding-estimare", "Ajută la orientarea bugetului pentru ecranarea RF."),
      link("Estimare cost cameră RMN", "/calculatoare/cost-camera-rmn", "Dă context pentru costul total al camerei."),
      link("Estimare HVAC pentru imagistică", "/calculatoare/hvac-imagistica-estimare", "Utilă pentru integrarea infrastructurii auxiliare."),
    ],
    relatedComparisons: [
      link("RF shielding vs radioprotecție", "/comparatii/rf-shielding-vs-radioprotectie", "Buna clarificare pentru proiectele RMN/CT."),
      link("Camera Faraday vs ecranare cu plumb", "/comparatii/camera-faraday-vs-ecranare-cu-plumb", "Înlătură confuzia între logici diferite."),
      link("RMN vs CT", "/comparatii/rmn-vs-ct", "Arată diferențele de infrastructură în contextul potrivit."),
    ],
    relatedGlossary: [
      link("Cameră Faraday pentru RMN", "/glosar/camera-faraday-rmn", "Explică rolul infrastructurii RF."),
      link("Quench pipe RMN", "/glosar/quench-pipe-rmn", "Relevant pentru siguranță și integrare."),
      link("Materiale RF cage", "/glosar/materiale-rf-cage-comparatie", "Ajută la înțelegerea opțiunilor de materiale."),
    ],
    relatedArticles: [
      link("Pregătire înainte de instalarea unui RMN", "/knowledge-hub/pregatire-instalare-rmn", "Pregătește proiectul înainte de montaj."),
      link("Checklist cameră RMN înainte de instalare", "/knowledge-hub/checklist-camera-rmn-inainte-instalare", "Listă utilă pentru pregătire."),
      link("Greșeli critice în proiectarea camerelor RMN", "/knowledge-hub/greseli-critice-in-proiectarea-camerelor-rmn", "Arată unde apar de obicei problemele."),
    ],
    faqs: [
      {
        question: "De ce este RF shielding diferit de radioprotecție?",
        answer:
          "Pentru că RMN folosește logică de compatibilitate electromagnetică, nu protecție față de radiații ionizante.",
      },
      {
        question: "Ce trebuie stabilit înainte de montaj?",
        answer:
          "Detaliile de integrare, ușile RF, penetrările și compatibilitatea cu echipamentul ales.",
      },
      {
        question: "Poate fi făcută validarea fără planuri?",
        answer:
          "Nu în mod serios. Valoarea și soluția finală depind de planuri, echipament și site.",
      },
    ],
    cta: {
      title: "Ai nevoie să validezi o cameră RMN înainte de achiziție?",
      description:
        "Începe cu Project Intake sau cere o propunere preliminară pentru a vedea ce influențează proiectul.",
      primaryLabel: "Start Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "radioprotectie-imagistica",
    title: "Radioprotecție pentru imagistică",
    category: "radioprotectie-rf",
    description:
      "Radioprotecție pentru spații RX și CT, cu accent pe protecție, layout, zone controlate și cerințe de proiect.",
    targetKeyword: "radioprotecție pentru imagistică",
    seoKeywords: ["radioprotecție", "CT", "RX", "CNCAN", "ecranare cu plumb"],
    heroEyebrow: "Radiation protection",
    heroTitle: "Radioprotecție pentru imagistică gândită împreună cu layout-ul și echipamentul.",
    heroDescription:
      "Pentru CT și RX, protecția radiologică trebuie stabilită în paralel cu spațiul, echipamentul, cerințele de siguranță și documentația de proiect.",
    overview:
      "Radioprotecția nu este doar un strat de plumb. Este o combinație de layout, elemente de ecranare și decizii de proiect care trebuie validate înainte de execuție.",
    methodology:
      "Pornim de la scenariul de utilizare și de la echipamentul planificat, apoi definim pereții, ușile, sticla plumbată și alte elemente relevante.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Zonele controlate și vecinătățile influențează exact soluția de ecranare.",
      "CNCAN trebuie tratat ca parte din proiectare, nu ca formalitate finală.",
      "Coordonarea cu furnizorul echipamentului reduce riscul de refacere.",
      "Accesul și modul de operare contează la fel de mult ca materialele folosite.",
    ],
    commonMistakes: [
      "Amestecarea logicii CT/RX cu logica RMN.",
      "Subestimarea rolului ușilor, ferestrelor și penetrațiilor.",
      "Tratarea protecției ca simplă listă de materiale, nu ca scenariu tehnic.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Aici vorbim despre orientare tehnică preliminară; soluția exactă se definește numai după validarea camerei și a echipamentului ales.",
    relatedCalculators: [
      link("Estimare radioprotecție CT", "/calculatoare/radioprotectie-ct-estimare", "Ajută la orientarea bugetului pentru protecția radiologică."),
      link("Estimare cost cameră CT", "/calculatoare/cost-camera-ct", "Poate clarifica scenariul total al camerei."),
      link("Estimare spațiu minim CT", "/calculatoare/spatiu-minim-ct", "Utilă pentru layout înainte de proiectare."),
    ],
    relatedComparisons: [
      link("RF shielding vs radioprotecție", "/comparatii/rf-shielding-vs-radioprotectie", "Clarifică diferența de principiu între RMN și CT."),
      link("Camera Faraday vs ecranare cu plumb", "/comparatii/camera-faraday-vs-ecranare-cu-plumb", "Bună pentru clarificarea materialelor și a scopului."),
      link("CT vs CBCT", "/comparatii/ct-vs-cbct", "Arată scenarii cu cerințe diferite de protecție."),
    ],
    relatedGlossary: [
      link("Protecție radiologică pentru cameră RX", "/glosar/protectie-radiologica-camera-rx", "Definiție utilă pentru echipele de proiect."),
      link("Plumb vs RF shielding", "/glosar/plumb-vs-rf-shielding", "Clarifică diferența care apare frecvent în brief."),
      link("Cerințe electrice radiologie", "/glosar/cerinte-electrice-radiologie", "Ajută la integrarea cu instalațiile."),
    ],
    relatedArticles: [
      link("Autorizare CNCAN pas cu pas", "/knowledge-hub/autorizare-cncan-pas-cu-pas", "Context util pentru proiectele cu radiații ionizante."),
      link("Protecția radiologică pentru o cameră RX", "/knowledge-hub/protectie-radiologica-camera-rx", "Oferă detaliile de bază."),
      link("Verificări înainte de instalarea unui CT", "/knowledge-hub/verificari-inainte-instalare-ct", "Bună pentru etapa de pregătire."),
    ],
    faqs: [
      {
        question: "Radioprotecția este aceeași cu RF shielding?",
        answer:
          "Nu. Radioprotecția este pentru RX și CT, iar RF shielding este pentru RMN.",
      },
      {
        question: "Când trebuie clarificate cerințele CNCAN?",
        answer:
          "Cât mai devreme, ideal înainte de execuție și înainte de blocarea layout-ului final.",
      },
      {
        question: "Poate fi pregătit proiectul doar pe baza unei schițe?",
        answer:
          "Poate fi orientat, dar soluția finală trebuie validată tehnic și documentar.",
      },
    ],
    cta: {
      title: "Planifici un spațiu CT sau RX și vrei să reduci riscul de refacere?",
      description:
        "Pornește cu Project Intake sau cere o propunere preliminară dacă deja ai schițe și specificații.",
      primaryLabel: "Start Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "modernizare-clinica-medicala",
    title: "Modernizare clinică medicală",
    category: "infrastructura",
    description:
      "Modernizare etapizată pentru clinici active, cu atenție la downtime, fluxuri, echipamente și continuitate operațională.",
    targetKeyword: "modernizare clinică medicală",
    seoKeywords: ["modernizare clinică", "fit-out medical", "downtime clinică", "infrastructură medicală"],
    heroEyebrow: "Clinic modernization",
    heroTitle: "Modernizare clinică medicală planificată pe faze, nu în valuri de improvizații.",
    heroDescription:
      "ZES ajută clinicile active să modernizeze spațiile fără să piardă din vedere operarea zilnică, traseele pacienților și continuitatea serviciilor.",
    overview:
      "O modernizare bună nu încearcă să repare totul simultan. Ea definește faze, priorități și ferestre de lucru care respectă activitatea curentă.",
    methodology:
      "Începem cu evaluarea spațiului existent, a fluxurilor, a echipamentelor și a problemelor care produc costuri sau risc operațional.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Downtime-ul și accesul pacienților trebuie planificate în același timp cu bugetul.",
      "Instalațiile existente pot limita ritmul lucrărilor dacă nu sunt evaluate timpuriu.",
      "Integrarea echipamentelor noi schimbă traseele și necesarul tehnic.",
      "Modernizarea bună include și service-ul post-implementare.",
    ],
    commonMistakes: [
      "Reconfigurarea spațiilor fără analiza fluxurilor curente.",
      "Plasarea echipamentelor înainte de a verifica infrastructura.",
      "Tratarea modernizării ca proiect de design, nu ca proiect operațional.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Soluția finală depinde de spațiul existent, de echipamente și de constrângerile operaționale ale clinicii.",
    relatedCalculators: [
      link("Estimare modernizare clinică", "/calculatoare/modernizare-clinica-estimare", "Ajută la orientarea bugetului de modernizare."),
      link("Estimare timp implementare proiect medical", "/calculatoare/timp-implementare-proiect-medical", "Utilă pentru fazare și calendar."),
      link("Estimare evaluare preliminară clinică", "/calculatoare/evaluare-preliminara-clinica", "Bună pentru un prim filtru al proiectului."),
    ],
    relatedComparisons: [
      link("Modernizare clinică vs clinică nouă", "/comparatii/modernizare-clinica-vs-clinica-noua", "Ajută la decizia de strategie."),
      link("Service preventiv vs service reactiv", "/comparatii/service-preventiv-vs-service-reactiv", "Relevant pentru continuitatea operațională."),
      link("Calculator cost RMN vs ofertă tehnică reală", "/comparatii/calculator-cost-rmn-vs-oferta-tehnica-reala", "Clădește așteptări corecte de buget."),
    ],
    relatedGlossary: [
      link("Cerinte start clinica radiologie", "/glosar/cerinte-start-clinica-radiologie", "Bun pentru faza inițială de planificare."),
      link("Radiology clinic startup requirements", "/glosar/radiology-clinic-startup-requirements", "Util pentru echipele care pornesc un proiect nou."),
      link("Cerințe inițiale clinică", "/glosar/cerinte-start-clinica-radiologie", "Ajută la contextul de buget și scenariu."),
    ],
    relatedArticles: [
      link("Modernizare clinică existentă: pași, riscuri și priorități", "/knowledge-hub/modernizare-clinica-existenta-pasi-riscuri", "Următorul pas firesc după evaluare."),
      link("Costuri ascunse în amenajarea unei clinici medicale", "/knowledge-hub/costuri-ascunse-amenajare-clinica-medicala", "Bun pentru bugetare realistă."),
      link("Cum se planifică fluxurile într-o clinică medicală", "/knowledge-hub/planificare-fluxuri-clinica-medicala", "Ajută la reorganizare."),
    ],
    faqs: [
      {
        question: "Ce contează mai mult la modernizare?",
        answer:
          "Fluxul clinic și continuitatea operațională contează la fel de mult ca designul final.",
      },
      {
        question: "Se poate moderniza clinică activă fără oprire completă?",
        answer:
          "Uneori da, dar depinde de fazare, de tipul lucrărilor și de ce spații pot fi izolate.",
      },
      {
        question: "Cum se evită surprizele?",
        answer:
          "Prin evaluarea infrastructurii existente și a echipamentelor înainte de a fixa calendarul final.",
      },
    ],
    cta: {
      title: "Ai o clinică activă și vrei să modernizezi fără să pierzi controlul operațional?",
      description:
        "Începe cu evaluarea preliminară sau trimite un proiect prin Project Intake.",
      primaryLabel: "Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Evaluare preliminară",
      secondaryHref: "/calculator-proiect-medical",
    },
    updatedAt,
  },
  {
    slug: "planificare-infrastructura-imagistica",
    title: "Planificare infrastructură imagistică",
    category: "infrastructura",
    description:
      "Planificare pentru infrastructura de imagistică medicală: electric, HVAC, acces, integrare echipament și fazare.",
    targetKeyword: "planificare infrastructură imagistică",
    seoKeywords: ["infrastructură imagistică", "radiologie", "CT", "RMN", "electrice", "HVAC"],
    heroEyebrow: "Imaging infrastructure",
    heroTitle: "Planificare infrastructură imagistică gândită ca sistem, nu ca listă de lucrări.",
    heroDescription:
      "ZES corelează imaginea de ansamblu cu detaliile de implementare: alimentare, HVAC, acces, service, poziționarea echipamentelor și pașii de pregătire.",
    overview:
      "Infrastructura imagistică are nevoie de disciplină tehnică. Dacă deciziile despre electric, HVAC și layout sunt luate separat, apare refacere și timp pierdut.",
    methodology:
      "Pornim de la specialitate, tipul de echipament și nivelul de trafic, apoi mapăm infrastructura în funcție de cerințele reale ale proiectului.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Electricul, HVAC-ul și accesul de service trebuie evaluate împreună.",
      "Fluxul pacientului și poziția consolei schimbă designul final.",
      "Cerințele RMN, CT și RX diferă și nu trebuie unificate artificial.",
      "Echipamentul ales influențează infrastructura, nu invers.",
    ],
    commonMistakes: [
      "Apropierea de un proiect de imagistică ca și cum ar fi o cameră standard.",
      "Separarea electricului de cerințele echipamentului.",
      "Neglijarea traseelor de service și a logisticii de exploatare.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Este o orientare preliminară. Cerințele finale depind de echipament, planuri și validarea tehnică a proiectului.",
    relatedCalculators: [
      link("Estimare infrastructură radiologie", "/calculatoare/infrastructura-radiologie-estimare", "Ajută la o vedere de ansamblu asupra infrastructurii."),
      link("Estimare putere electrică imagistică", "/calculatoare/putere-electrica-imagistica", "Utilă pentru alimentare și rezervare de putere."),
      link("Estimare HVAC pentru imagistică", "/calculatoare/hvac-imagistica-estimare", "Ajută la scenariile de climatizare."),
    ],
    relatedComparisons: [
      link("RMN vs CT", "/comparatii/rmn-vs-ct", "Bună pentru a înțelege diferențele de infrastructură."),
      link("Radiologie digitală vs radiologie convențională", "/comparatii/radiologie-digitala-vs-radiologie-conventionala", "Arată scenarii diferite de implementare."),
      link("CT vs CBCT", "/comparatii/ct-vs-cbct", "Utilă pentru nivelul de complexitate."),
    ],
    relatedGlossary: [
      link("Cerințe electrice radiologie", "/glosar/cerinte-electrice-radiologie", "Util pentru proiectarea utilităților."),
      link("HVAC imagistică medicală", "/glosar/hvac-imagistica-medicala", "Ajută la clarificarea cerințelor de climatizare."),
      link("Radiology room electrical requirements", "/glosar/radiology-room-electrical-requirements", "Bun pentru integrarea electrică."),
    ],
    relatedArticles: [
      link("Imagistică medicală: CT, RMN, RX și integrare tehnică", "/knowledge-hub/imagistica-medicala-ct-rmn-rx-si-integrare-tehnica", "Explică legătura dintre aparatură și infrastructură."),
      link("Planificarea fluxurilor într-o clinică medicală", "/knowledge-hub/planificare-fluxuri-clinica-medicala", "Utilă pentru organizarea spațiului."),
      link("Integrarea aparaturii medicale într-o clinică", "/knowledge-hub/integrare-aparatura-medicala-clinica", "Relevantă pentru etapa de implementare."),
    ],
    faqs: [
      {
        question: "Ce se planifică primul?",
        answer:
          "Specialitatea, tipul de echipament și cerințele de site, nu finisajele.",
      },
      {
        question: "Electricul și HVAC-ul pot fi rezolvate mai târziu?",
        answer:
          "Doar parțial. În proiectele de imagistică, ele trebuie discutate din timp.",
      },
      {
        question: "Se poate face planificare fără consultanță tehnică?",
        answer:
          "Se poate încerca, dar riscul de refacere și de buget greșit crește semnificativ.",
      },
    ],
    cta: {
      title: "Vrei o structură clară pentru infrastructura imagistică înainte de execuție?",
      description:
        "Trimite proiectul prin Project Intake sau cere o propunere preliminară dacă ai deja schițe și necesar.",
      primaryLabel: "Start Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "consultanta-proiecte-medicale",
    title: "Consultanță proiecte medicale",
    category: "planificare-clinica",
    description:
      "Consultanță tehnică pentru proiecte medicale, cu accent pe structură, validare și traseul corect către implementare.",
    targetKeyword: "consultanță proiecte medicale",
    seoKeywords: ["consultanță medicală", "proiecte medicale", "planificare clinică", "validare tehnică"],
    heroEyebrow: "Medical project consulting",
    heroTitle: "Consultanță pentru proiecte medicale care clarifică pașii înainte să apară costurile mari.",
    heroDescription:
      "ZES ajută echipele să înțeleagă ce merită decis acum, ce trebuie validat mai târziu și ce tip de proiect are sens comercial și tehnic.",
    overview:
      "Consultanța bună nu încearcă să vândă o soluție prematură. Ea organizează informația, riscurile, opțiunile și următorii pași într-un mod util pentru decizie.",
    methodology:
      "Analizăm tipul proiectului, stadiul, documentele disponibile și riscurile tehnice pentru a construi un traseu clar către implementare.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Stadiul proiectului schimbă radical ce tip de consultanță este utilă.",
      "Datele incomplete trebuie tratate ca risc, nu ca detaliu minor.",
      "Consultanța trebuie să ducă spre un next step practic: Intake, Proposal sau verificare tehnică.",
      "Nu toate proiectele au nevoie de aceeași intensitate de intervenție.",
    ],
    commonMistakes: [
      "Confuzia între consultanță tehnică și ofertare comercială.",
      "Lipsa documentelor de bază înainte de discuție.",
      "Așteptarea unei răspuns simplu pentru un proiect complex.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Consultanța este orientativă și trebuie adaptată la datele reale ale proiectului, la echipamente și la constrângerile de amplasament.",
    relatedCalculators: [
      link("Evaluare preliminară clinică", "/calculatoare/evaluare-preliminara-clinica", "Ajută la stabilirea maturității proiectului."),
      link("Estimare timp implementare proiect medical", "/calculatoare/timp-implementare-proiect-medical", "Utilă pentru calendar și fazare."),
      link("Estimare modernizare clinică", "/calculatoare/modernizare-clinica-estimare", "Bună pentru proiectele de upgrade."),
    ],
    relatedComparisons: [
      link("Project Intake vs consultanță clasică", "/comparatii/project-intake-vs-consultanta-clasica", "Arată de ce structura contează."),
      link("Modernizare clinică vs clinică nouă", "/comparatii/modernizare-clinica-vs-clinica-noua", "Ajută la alegerea direcției."),
      link("Calculator cost RMN vs ofertă tehnică reală", "/comparatii/calculator-cost-rmn-vs-oferta-tehnica-reala", "Setează așteptările privind estimările."),
    ],
    relatedGlossary: [
      link("Cerinte start clinica radiologie", "/glosar/cerinte-start-clinica-radiologie", "Bun pentru primele discuții."),
      link("Radiology clinic startup requirements", "/glosar/radiology-clinic-startup-requirements", "Ajută la pregătirea unui brief realist."),
      link("Cerințe CNCAN", "/glosar/cerinte-start-clinica-radiologie", "Util pentru proiectele cu radiologie."),
    ],
    relatedArticles: [
      link("Cum se construiește o clinică medicală în România", "/knowledge-hub/cum-se-construieste-o-clinica-medicala-in-romania", "Context bun pentru proiecte noi."),
      link("DSP vs CNCAN pentru proiecte medicale", "/knowledge-hub/dsp-vs-cncan-diferente-pentru-proiecte-medicale", "Clarifică două trasee diferite."),
      link("Autorizare DSP pentru clinică medicală", "/knowledge-hub/autorizare-dsp-clinica-medicala", "Utile pentru partea de conformitate."),
    ],
    faqs: [
      {
        question: "Ce primește clientul din consultanță?",
        answer:
          "O structură clară a pașilor, riscurilor și opțiunilor, nu o promisiune finală de implementare.",
      },
      {
        question: "Este consultanța utilă și pentru proiecte mici?",
        answer:
          "Da, mai ales atunci când există incertitudine privind spațiul, echipamentul sau autorizarea.",
      },
      {
        question: "Pe ce se bazează evaluarea?",
        answer:
          "Pe datele furnizate, pe tipul de proiect și pe semnalele tehnice și comerciale relevante.",
      },
    ],
    cta: {
      title: "Ai un proiect medical și vrei să-l transformi într-un brief clar?",
      description:
        "Completează Project Intake sau cere o propunere preliminară pentru a structura discuția.",
      primaryLabel: "Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "amenajare-spatii-radiologie",
    title: "Amenajare spații radiologie",
    category: "imagistica",
    description:
      "Amenajare pentru spații de radiologie, cu atenție la layout, utilități, protecție și integrarea echipamentelor.",
    targetKeyword: "amenajare spații radiologie",
    seoKeywords: ["amenajare radiologie", "radiologie", "RX", "CT", "imagistică medicală"],
    heroEyebrow: "Radiology fit-out",
    heroTitle: "Amenajare spații radiologie care păstrează ordinea între aparatură, protecție și circulație.",
    heroDescription:
      "Spațiile de radiologie au nevoie de o amenajare care să țină cont de echipamente, siguranță, trasee și cerințe de operare din prima etapă.",
    overview:
      "Amenajarea bună nu se limitează la finisaje. Ea decide dacă spațiul va putea susține echipamentul și fluxul clinic fără rework.",
    methodology:
      "Pornim de la specialitatea și de la tipul de echipament, apoi definim spațiul, protecțiile, utilitățile și punctele de acces.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Layout-ul trebuie să sprijine atât fluxul pacientului, cât și accesul echipamentului.",
      "Radiologia RX și CT cere protecție radiologică corectă, nu ecranare RF.",
      "Spațiile auxiliare și traseele tehnice trebuie clarificate timpuriu.",
      "Rezultatul final depinde de relația dintre amenajare și echipament.",
    ],
    commonMistakes: [
      "A face amenajarea fără date despre echipament.",
      "A trata radiologia ca pe o cameră standard, nu ca pe un spațiu tehnic.",
      "A amâna discuția despre protecție și utilități.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Scenariul este orientativ și trebuie ajustat după verificarea spațiului, a echipamentului și a cerințelor specifice de proiect.",
    relatedCalculators: [
      link("Estimare cost cameră CT", "/calculatoare/cost-camera-ct", "Ajută la orientarea bugetului pentru radiologie."),
      link("Estimare cost cameră RMN", "/calculatoare/cost-camera-rmn", "Utilă când proiectul include și RMN."),
      link("Estimare putere electrică imagistică", "/calculatoare/putere-electrica-imagistica", "Relevantă pentru utilități și echipamente."),
    ],
    relatedComparisons: [
      link("Camera RMN vs camera CT", "/comparatii/camera-rmn-vs-camera-ct", "Arată diferențele dintre cele două scenarii."),
      link("RF shielding vs radioprotecție", "/comparatii/rf-shielding-vs-radioprotectie", "Clarifică diferența de principiu."),
      link("Camera Faraday vs ecranare cu plumb", "/comparatii/camera-faraday-vs-ecranare-cu-plumb", "Ajută la evitarea confuziilor."),
    ],
    relatedGlossary: [
      link("Layout camera CT", "/glosar/layout-camera-ct", "Bun pentru planificarea spațiului."),
      link("Cerințe electrice radiologie", "/glosar/cerinte-electrice-radiologie", "Relevant pentru utilități."),
      link("HVAC imagistică medicală", "/glosar/hvac-imagistica-medicala", "Ajută la climatizare și confort."),
    ],
    relatedArticles: [
      link("Greșeli frecvente în amenajarea unei camere de radiologie", "/knowledge-hub/greseli-amenajare-camera-radiologie", "Arată capcanele clasice."),
      link("Checklist cameră CT înainte de instalare", "/knowledge-hub/checklist-camera-ct-inainte-instalare", "Utilă pentru pregătire."),
      link("Checklist cameră RMN înainte de instalare", "/knowledge-hub/checklist-camera-rmn-inainte-instalare", "Relevantă pentru scenariile mixte."),
    ],
    faqs: [
      {
        question: "Ce se prioritizează la amenajarea radiologiei?",
        answer:
          "Compatibilitatea cu echipamentul, protecția și fluxul real de operare.",
      },
      {
        question: "Se poate porni fără echipament ales?",
        answer:
          "Doar orientativ; soluția finală depinde de echipamentul ales și de site.",
      },
      {
        question: "Ce diferențiază radiologia de alte spații medicale?",
        answer:
          "Cerințele de siguranță, protecție și integrare tehnică sunt mai stricte.",
      },
    ],
    cta: {
      title: "Amenajezi un spațiu de radiologie și vrei să reduci refacerile?",
      description:
        "Pornește cu Project Intake sau cere o propunere preliminară pentru a vedea ce lipsește.",
      primaryLabel: "Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "evaluare-infrastructura-clinica",
    title: "Evaluare infrastructură clinică",
    category: "planificare-clinica",
    description:
      "Evaluare preliminară a infrastructurii unei clinici pentru a identifica riscuri, lipsuri și priorități de intervenție.",
    targetKeyword: "evaluare infrastructură clinică",
    seoKeywords: ["evaluare clinică", "infrastructură medicală", "audit tehnic", "planificare clinică"],
    heroEyebrow: "Infrastructure review",
    heroTitle: "Evaluare infrastructură clinică înainte să blochezi bugetul sau echipamentele.",
    heroDescription:
      "ZES ajută la filtrarea proiectelor care au nevoie de priorități clare înainte de investiție, extindere sau modernizare.",
    overview:
      "Evaluarea bună scoate la lumină lipsurile care pot schimba bugetul, calendarul și ordinea logică a proiectului.",
    methodology:
      "Analizăm spațiul, stadiul proiectului, documentele disponibile și constrângerile tehnice pentru a stabili ce trebuie verificat mai întâi.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Infrastructura existentă poate limita planul de extindere.",
      "Nu toate riscurile apar la suprafață; unele sunt ascunse în instalații sau în fluxuri.",
      "Evaluarea trebuie să conducă spre o decizie operațională, nu doar spre o listă de probleme.",
      "Dacă echipamentele sunt deja cumpărate, riscul de refacere crește semnificativ.",
    ],
    commonMistakes: [
      "A presupune că spațiul actual poate susține orice echipament.",
      "A comanda aparatura înainte de verificarea infrastructurii.",
      "A amesteca validarea tehnică cu bugetarea finală.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Evaluarea este orientativă și nu înlocuiește auditul tehnic complet sau verificarea pe amplasament.",
    relatedCalculators: [
      link("Evaluare preliminară clinică", "/calculatoare/evaluare-preliminara-clinica", "Bună pentru o primă filtrare a proiectului."),
      link("Estimare timp implementare proiect medical", "/calculatoare/timp-implementare-proiect-medical", "Ajută la estimarea calendarului."),
      link("Estimare modernizare clinică", "/calculatoare/modernizare-clinica-estimare", "Relevantă pentru reconfigurări și upgrade."),
    ],
    relatedComparisons: [
      link("Modernizare clinică vs clinică nouă", "/comparatii/modernizare-clinica-vs-clinica-noua", "Următorul pas dacă evaluarea arată opțiuni diferite."),
      link("Project Intake vs consultanță clasică", "/comparatii/project-intake-vs-consultanta-clasica", "Arată cum se structurează mai bine datele."),
      link("Calculator cost RMN vs ofertă tehnică reală", "/comparatii/calculator-cost-rmn-vs-oferta-tehnica-reala", "Stabilește așteptări realiste pentru buget."),
    ],
    relatedGlossary: [
      link("Cerinte start clinica radiologie", "/glosar/cerinte-start-clinica-radiologie", "Bun pentru evaluarea de bază."),
      link("Radiology clinic startup requirements", "/glosar/radiology-clinic-startup-requirements", "Util pentru proiecte noi."),
      link("Cerințe DSP", "/glosar/cerinte-start-clinica-radiologie", "Relevant pentru contextul de clinică."),
    ],
    relatedArticles: [
      link("Costuri ascunse în amenajarea unei clinici medicale", "/knowledge-hub/costuri-ascunse-amenajare-clinica-medicala", "Explică de ce evaluarea timpurie contează."),
      link("Riscuri când aparatura este cumpărată înainte de proiectare", "/knowledge-hub/riscuri-aparatura-cumparata-inainte-proiectare", "Foarte relevant pentru acest scenariu."),
      link("Cum se planifică fluxurile într-o clinică medicală", "/knowledge-hub/planificare-fluxuri-clinica-medicala", "Ajută la diagnosticarea spațiului."),
    ],
    faqs: [
      {
        question: "Ce înseamnă o evaluare bună?",
        answer:
          "O imagine clară a riscurilor, a priorităților și a pașilor următori.",
      },
      {
        question: "Se poate evalua un spațiu fără planuri?",
        answer:
          "Se poate orienta, dar acuratețea scade și trebuie validare suplimentară.",
      },
      {
        question: "De ce se recomandă evaluarea înainte de buget?",
        answer:
          "Pentru că altfel poți bloca o investiție pe o ipoteză greșită.",
      },
    ],
    cta: {
      title: "Ai nevoie de o evaluare rapidă a infrastructurii înainte de decizie?",
      description:
        "Trimite datele prin Project Intake sau cere o propunere preliminară dacă vrei o structură de lucru.",
      primaryLabel: "Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "planificare-electrica-imagistica",
    title: "Planificare electrică imagistică",
    category: "infrastructura",
    description:
      "Planificare electrică pentru spații de imagistică, cu accent pe consum, rezervă, UPS și integrare echipament.",
    targetKeyword: "planificare electrică imagistică",
    seoKeywords: ["electric", "imagistică", "UPS", "CT", "RMN", "putere electrică"],
    heroEyebrow: "Electrical planning",
    heroTitle: "Planificare electrică imagistică care pornește de la echipament și nu de la presupuneri.",
    heroDescription:
      "ZES vede electricul ca parte din infrastructura critică, mai ales acolo unde aparatul, răcirea și rezervarea trebuie corelate.",
    overview:
      "Dacă electricul este subdimensionat, întregul proiect poate întârzia sau poate necesita refaceri scumpe la instalare.",
    methodology:
      "Determinăm mai întâi consumul și scenariile de utilizare, apoi stabilim alimentarea, protecțiile și, dacă e cazul, UPS-ul sau rezervarea.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Consumurile reale depind de tipul de echipament și de ciclul de lucru.",
      "UPS-ul sau rezervarea nu se aleg generic; depind de criticitatea sistemului.",
      "Alimentarea trebuie corelată cu HVAC-ul și cu traseele de cablare.",
      "Necesitățile de service și redundanță trebuie discutate înainte de execuție.",
    ],
    commonMistakes: [
      "Subestimarea consumului total al camerei.",
      "Separarea electricului de restul infrastructurii.",
      "Alegerea UPS-ului fără să cunoști echipamentul și scenariul de utilizare.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Acest ghid oferă orientare preliminară și trebuie validat după specificația echipamentului și condițiile reale ale site-ului.",
    relatedCalculators: [
      link("Estimare putere electrică imagistică", "/calculatoare/putere-electrica-imagistica", "Bună pentru verificarea energiei disponibile."),
      link("Calculator UPS imagistică", "/calculatoare/ups-imagistica", "Relevantă pentru scenariile cu rezervare."),
      link("Estimare infrastructură radiologie", "/calculatoare/infrastructura-radiologie-estimare", "Ajută la vedere de ansamblu."),
    ],
    relatedComparisons: [
      link("Radiologie digitală vs radiologie convențională", "/comparatii/radiologie-digitala-vs-radiologie-conventionala", "Arată niveluri diferite de necesar tehnic."),
      link("RMN vs CT", "/comparatii/rmn-vs-ct", "Bună pentru a înțelege consumul și infrastructura."),
      link("CT vs CBCT", "/comparatii/ct-vs-cbct", "Ajută la compararea scenariilor."),
    ],
    relatedGlossary: [
      link("Cerințe electrice radiologie", "/glosar/cerinte-electrice-radiologie", "Definiție utilă pentru proiectare."),
      link("Radiology room electrical requirements", "/glosar/radiology-room-electrical-requirements", "Ajută la detalierea traseelor și rezervelor."),
      link("HVAC imagistică medicală", "/glosar/hvac-imagistica-medicala", "Relevant pentru coordonarea utilităților."),
    ],
    relatedArticles: [
      link("Verificări înainte de instalarea unui RMN", "/knowledge-hub/verificari-inainte-achizitie-rmn", "Bun pentru integrare timpurie."),
      link("Verificări înainte de instalarea unui CT", "/knowledge-hub/verificari-inainte-achizitie-ct", "Relevant pentru scenarii CT."),
      link("Pregătirea pentru instalarea unui RMN", "/knowledge-hub/pregatire-instalare-rmn", "Ajută la corelarea electricului cu restul lucrărilor."),
    ],
    faqs: [
      {
        question: "De ce contează electricul în imagistică?",
        answer:
          "Pentru că un echipament bun nu funcționează corect într-o infrastructură slab pregătită.",
      },
      {
        question: "UPS-ul este necesar mereu?",
        answer:
          "Nu mereu. Depinde de echipament, criticitate și de scenariul de operare.",
      },
      {
        question: "Se poate dimensiona electricul fără echipament ales?",
        answer:
          "Doar orientativ; validarea finală cere specificația tehnică a echipamentului.",
      },
    ],
    cta: {
      title: "Ai nevoie să verifici dacă infrastructura electrică susține proiectul imagistic?",
      description:
        "Pornește cu Project Intake sau cere o propunere preliminară pentru scenariul tău.",
      primaryLabel: "Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "hvac-imagistica-medicala",
    title: "HVAC pentru imagistică medicală",
    category: "infrastructura",
    description:
      "HVAC pentru spații de imagistică, cu atenție la temperatură, umiditate, confort, echipament și continuitate.",
    targetKeyword: "HVAC pentru imagistică medicală",
    seoKeywords: ["HVAC", "imagistică medicală", "RMN", "CT", "climatizare"],
    heroEyebrow: "HVAC planning",
    heroTitle: "HVAC pentru imagistică medicală care ține cont de echipament, nu doar de confortul general.",
    heroDescription:
      "Climatizarea corectă în spațiile de imagistică influențează performanța, confortul și continuitatea operațională a camerei.",
    overview:
      "Un sistem HVAC bun în imagistică trebuie să răspundă la cerințele echipamentului, la ocupare și la constrângerile spațiului, nu doar la o valoare nominală.",
    methodology:
      "Corelăm cerințele de răcire cu nivelul de utilizare, cu traseele tehnice și cu restul infrastructurii, ca să evităm subdimensionarea.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Temperatura și umiditatea trebuie corelate cu echipamentul și cu rolul camerei.",
      "Răcirea nu trebuie să interfereze cu integrarea RF sau cu protecția radiologică.",
      "Traseele și accesul la service trebuie păstrate clare încă din proiectare.",
      "Instalația trebuie gândită pentru funcționare continuă, nu doar pentru sezonul de pornire.",
    ],
    commonMistakes: [
      "Subdimensionarea HVAC-ului pentru echipamente critice.",
      "Separarea climatizării de restul infrastructurii.",
      "Lipsa unui plan pentru service și mentenanță.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Orice estimare HVAC rămâne orientativă până la validarea echipamentului, a camerei și a fluxului real de utilizare.",
    relatedCalculators: [
      link("Estimare HVAC pentru imagistică", "/calculatoare/hvac-imagistica-estimare", "Ajută la scenarii de climatizare."),
      link("Estimare putere electrică imagistică", "/calculatoare/putere-electrica-imagistica", "Relevantă pentru infrastructura auxiliară."),
      link("Estimare spațiu minim RMN", "/calculatoare/spatiu-minim-rmn", "Bună pentru integrarea camerei."),
    ],
    relatedComparisons: [
      link("Camera RMN vs camera CT", "/comparatii/camera-rmn-vs-camera-ct", "Arată cerințe diferite de infrastructură."),
      link("RF shielding vs radioprotecție", "/comparatii/rf-shielding-vs-radioprotectie", "Ajută la separarea logicilor."),
      link("Modernizare clinică vs clinică nouă", "/comparatii/modernizare-clinica-vs-clinica-noua", "Utilă când HVAC-ul intră în modernizare."),
    ],
    relatedGlossary: [
      link("HVAC imagistică medicală", "/glosar/hvac-imagistica-medicala", "Definiție utilă pentru echipe tehnice."),
      link("Medical imaging room HVAC guide", "/glosar/medical-imaging-room-hvac-guide", "Ajută la contextul de planning."),
      link("Radiology room electrical requirements", "/glosar/radiology-room-electrical-requirements", "Corelat cu utilitățile."),
    ],
    relatedArticles: [
      link("Pregătirea înainte de instalarea unui RMN", "/knowledge-hub/pregatire-instalare-rmn", "Utilă pentru integrarea cu echipamentul."),
      link("Verificări înainte de instalarea unui CT", "/knowledge-hub/verificari-inainte-instalare-ct", "Relevantă pentru scenariile CT."),
      link("Imaging medical room HVAC guide", "/knowledge-hub/medical-imaging-room-hvac-guide", "Conectează partea de HVAC cu proiectul."),
    ],
    faqs: [
      {
        question: "HVAC-ul este doar despre confort?",
        answer:
          "Nu, în imagistică HVAC-ul afectează și performanța și fiabilitatea echipamentului.",
      },
      {
        question: "Se poate ajusta HVAC după achiziție?",
        answer:
          "Parțial, dar corecțiile târzii pot costa mai mult și pot întârzia proiectul.",
      },
      {
        question: "Este nevoie de validare tehnică?",
        answer:
          "Da, pentru că fiecare echipament și fiecare cameră schimbă scenariul final.",
      },
    ],
    cta: {
      title: "Ai nevoie să verifici dacă HVAC-ul suportă proiectul imagistic?",
      description:
        "Trimite detalii prin Project Intake sau cere o propunere preliminară pentru verificare.",
      primaryLabel: "Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
  {
    slug: "management-implementare-proiect-medical",
    title: "Management implementare proiect medical",
    category: "planificare-clinica",
    description:
      "Management de implementare pentru proiecte medicale, de la coordonare și fazare până la integrare și finalizare.",
    targetKeyword: "management implementare proiect medical",
    seoKeywords: ["implementare proiect medical", "management proiect medical", "fazări", "coordonare"],
    heroEyebrow: "Implementation management",
    heroTitle: "Management de implementare care ține proiectul medical pe șine, nu doar pe slide-uri.",
    heroDescription:
      "ZES aliniază echipele, etapele și riscurile ca să transforme proiectul medical din intenție în execuție controlată.",
    overview:
      "Implementarea bună reduce blocajele dintre concept, autorizație, execuție, montaj și intrarea în exploatare.",
    methodology:
      "Stabilim ordinea logică a deciziilor, identificăm dependențele critice și coordonăm pașii cu date suficiente, nu cu presupuneri.",
    process: standardProcess,
    infrastructureConsiderations: [
      "Fiecare etapă are dependențe: echipamente, construcții, utilități și verificări.",
      "Fazarea ajută la limitarea downtime-ului și a costurilor de rework.",
      "Documentația trebuie să rămână aliniată cu ce se execută în teren.",
      "Un project manager bun urmărește riscul, nu doar calendarul.",
    ],
    commonMistakes: [
      "Planificarea implementării fără să fie clar ce echipament intră și când.",
      "Separarea documentelor de ce se întâmplă efectiv în teren.",
      "Așteptarea că toate echipele vor avea același ritm fără coordonare centrală.",
    ],
    trustPoints: standardTrustPoints,
    disclaimer:
      "Managementul este orientativ și depinde de stadiul proiectului, de echipamente și de relația dintre furnizori și spațiu.",
    relatedCalculators: [
      link("Estimare timp implementare proiect medical", "/calculatoare/timp-implementare-proiect-medical", "Ajută la fazare și calendar."),
      link("Evaluare preliminară clinică", "/calculatoare/evaluare-preliminara-clinica", "Bună pentru maturitatea proiectului."),
      link("Estimare modernizare clinică", "/calculatoare/modernizare-clinica-estimare", "Relevantă pentru upgrade-uri și fazare."),
    ],
    relatedComparisons: [
      link("Project Intake vs consultanță clasică", "/comparatii/project-intake-vs-consultanta-clasica", "Explică de ce structura contează."),
      link("Modernizare clinică vs clinică nouă", "/comparatii/modernizare-clinica-vs-clinica-noua", "Ajută la definirea strategiei."),
      link("Calculator cost RMN vs ofertă tehnică reală", "/comparatii/calculator-cost-rmn-vs-oferta-tehnica-reala", "Stabilește așteptări de buget."),
    ],
    relatedGlossary: [
      link("Cerinte start clinica radiologie", "/glosar/cerinte-start-clinica-radiologie", "Ajută la orientarea inițială."),
      link("Radiology clinic startup requirements", "/glosar/radiology-clinic-startup-requirements", "Util pentru proiecte noi."),
      link("MRI project timeline", "/glosar/mri-project-timeline", "Bun pentru fazarea unui proiect RMN."),
    ],
    relatedArticles: [
      link("Cum se construiește o clinică medicală în România", "/knowledge-hub/cum-se-construieste-o-clinica-medicala-in-romania", "Bun pentru startul de la zero."),
      link("Planificarea fluxurilor într-o clinică medicală", "/knowledge-hub/planificare-fluxuri-clinica-medicala", "Ajută la ordonarea etapelor."),
      link("Integrarea aparaturii medicale într-o clinică", "/knowledge-hub/integrare-aparatura-medicala-clinica", "Utilă pentru partea de montaj."),
    ],
    faqs: [
      {
        question: "Ce înseamnă management de implementare?",
        answer:
          "Coordonarea etapelor, a dependențelor și a deciziilor ca proiectul să nu se blocheze.",
      },
      {
        question: "Este util și pentru proiecte mici?",
        answer:
          "Da, mai ales când există mai mulți furnizori sau când proiectul are multe dependențe.",
      },
      {
        question: "Se înlocuiește astfel proiectantul?",
        answer:
          "Nu. Rolul este complementar și urmărește coerența între faze și livrabile.",
      },
    ],
    cta: {
      title: "Vrei să ții proiectul medical sub control de la concept la implementare?",
      description:
        "Trimite proiectul prin Project Intake sau cere o propunere preliminară pentru a vedea ce lipsește.",
      primaryLabel: "Project Intake",
      primaryHref: "/project-intake",
      secondaryLabel: "Proposal Builder",
      secondaryHref: "/proposal-builder",
    },
    updatedAt,
  },
];

export function getServiceFunnelBySlug(slug: string) {
  const page = serviceFunnels.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`Service funnel not found: ${slug}`);
  }

  return page;
}

export function getServiceFunnelHubGroups() {
  const order: ServiceFunnelCategory[] = [
    "imagistica",
    "radioprotectie-rf",
    "infrastructura",
    "planificare-clinica",
  ];

  return order.map((category) => ({
    category,
    label: serviceFunnelCategoryLabels[category],
    items: serviceFunnels.filter((page) => page.category === category),
  }));
}

export function getServiceFunnelDiscoverySections(page: ServiceFunnelPage) {
  return [
    {
      title: "Calculatoare relevante",
      description: "Estimări orientative utile pentru contextul tehnic și bugetar.",
      links: page.relatedCalculators.map((item) => ({
        label: item.label,
        href: item.href,
        role: "calculator" as const,
        reason: item.reason,
        priority: 90,
      })),
    },
    {
      title: "Comparații utile",
      description: "Pagini care clarifică opțiunile și diferențele tehnice.",
      links: page.relatedComparisons.map((item) => ({
        label: item.label,
        href: item.href,
        role: "comparison" as const,
        reason: item.reason,
        priority: 86,
      })),
    },
    {
      title: "Glosar și definiții",
      description: "Termeni care reduc confuzia în discuțiile tehnice.",
      links: page.relatedGlossary.map((item) => ({
        label: item.label,
        href: item.href,
        role: "glossary" as const,
        reason: item.reason,
        priority: 84,
      })),
    },
    {
      title: "Articole și pași următori",
      description: "Resurse care ajută la trecerea de la orientare la structură.",
      links: page.relatedArticles.map((item) => ({
        label: item.label,
        href: item.href,
        role: "article" as const,
        reason: item.reason,
        priority: 82,
      })),
    },
  ];
}

export function getServiceFunnelRecommendations(blueprint: { pillar: string; intent: string }) {
  const mapping: Record<string, string[]> = {
    "constructii-medicale": [
      "consultanta-proiecte-medicale",
      "management-implementare-proiect-medical",
      "evaluare-infrastructura-clinica",
    ],
    "radiologie-cncan": [
      "planificare-infrastructura-imagistica",
      "amenajare-spatii-radiologie",
      "radioprotectie-imagistica",
    ],
    "rf-shielding-rmn": [
      "rf-shielding-rmn",
      "proiectare-camera-rmn",
      "planificare-infrastructura-imagistica",
    ],
    "protectie-radiologica": [
      "radioprotectie-imagistica",
      "proiectare-camera-ct",
      "amenajare-spatii-radiologie",
    ],
    "imagistica-medicala": [
      "proiectare-camera-rmn",
      "proiectare-camera-ct",
      "planificare-electrica-imagistica",
    ],
    "ivd-laborator": [
      "consultanta-proiecte-medicale",
      "evaluare-infrastructura-clinica",
      "management-implementare-proiect-medical",
    ],
    "service-aparatura": [
      "management-implementare-proiect-medical",
      "evaluare-infrastructura-clinica",
      "consultanta-proiecte-medicale",
    ],
    "modernizare-clinici": [
      "modernizare-clinica-medicala",
      "evaluare-infrastructura-clinica",
      "management-implementare-proiect-medical",
    ],
    "proiectare-medicala": [
      "consultanta-proiecte-medicale",
      "planificare-infrastructura-imagistica",
      "management-implementare-proiect-medical",
    ],
  };

  const slugs = mapping[blueprint.pillar] ?? [];

  return slugs
    .map((slug, index) => {
      const page = serviceFunnels.find((item) => item.slug === slug);

      if (!page) {
        return null;
      }

      return {
        label: page.title,
        href: `/servicii/${page.slug}`,
        role: "service" as const,
        reason:
          index === 0
            ? `Pagină comercială relevantă pentru ${blueprint.intent}.`
            : "Pas complementar pentru planificare și validare tehnică.",
        priority: 88 - index,
      };
    })
    .filter(Boolean) as { label: string; href: string; role: "service"; reason: string; priority: number }[];
}
