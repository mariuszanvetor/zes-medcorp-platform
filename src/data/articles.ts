export const articleCategories = [
  "Infrastructură medicală",
  "Radiologie",
  "RF shielding",
  "Protecție radiologică",
  "Aparatură medicală",
  "Imagistică",
  "IVD / laborator",
  "Service",
  "Autorizări",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export type ArticleTool = {
  label: string;
  href: string;
};

export type ArticleSection = {
  id: string;
  title: string;
  body: string | string[];
  bullets?: string[];
  callout?: {
    title: string;
    body: string;
  };
};

export type ArticleFAQ = {
  question: string;
  answer: string;
};

export type ArticleCTA = {
  title: string;
  description: string;
  label: string;
  href: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  tags: string[];
  readingTime: string;
  targetKeyword: string;
  relatedServices: string[];
  relatedTools: ArticleTool[];
  intro: string;
  sections: ArticleSection[];
  faqs: ArticleFAQ[];
  relatedArticles: string[];
  cta: ArticleCTA;
  publishedAt: string;
  updatedAt: string;
};

const defaultCta: ArticleCTA = {
  title: "Ai un proiect medical și nu știi de unde să începi?",
  description:
    "Instrumentele ZES ajută la structurarea primelor cerințe, riscuri, servicii relevante și pași următori pentru proiectul tău.",
  label: "Primește analiză tehnică inițială",
  href: "/ai-project-advisor",
};

const baseArticles: Article[] = [
  {
    slug: "cum-se-construieste-o-clinica-medicala-in-romania",
    title: "Cum se construiește o clinică medicală în România",
    description:
      "Etapele critice pentru o clinică modernă: analiză tehnică, proiectare, DSP, execuție, integrare echipamente și mentenanță.",
    category: "Infrastructură medicală",
    tags: ["clinici medicale", "DSP", "turnkey", "infrastructură"],
    readingTime: "8 min",
    targetKeyword: "construcție clinică medicală România",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/aparatura-medicala",
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    intro:
      "O clinică medicală funcțională nu începe cu finisajele, ci cu o analiză coordonată între fluxuri, autorizații, instalații, echipamente și mentenanță. Această pagină oferă un cadru scurt pentru deciziile inițiale.",
    sections: [
      {
        id: "analiza-initiala",
        title: "Analiza inițială",
        body:
          "Înainte de execuție trebuie stabilite specialitățile medicale, fluxurile de pacienți, zonele tehnice, cerințele DSP și echipamentele care vor influența spațiul.",
        bullets: [
          "lista specialităților și fluxurile clinice",
          "suprafețe, compartimentări și zone suport",
          "cerințe pentru echipamente, service și extindere",
        ],
      },
      {
        id: "proiectare-si-autorizari",
        title: "Proiectare și autorizări",
        body:
          "Proiectarea trebuie să lege arhitectura, instalațiile, circuitele medicale și documentația. Pentru proiectele cu radiologie apar cerințe suplimentare CNCAN.",
      },
      {
        id: "executie-si-integrare",
        title: "Execuție și integrare",
        body:
          "Execuția devine eficientă când spațiul este pregătit pentru echipamente, acces service, mentenanță și operare zilnică, nu doar pentru recepția construcției.",
      },
    ],
    faqs: [
      {
        question: "Care este primul pas pentru o clinică medicală?",
        answer:
          "Primul pas este analiza tehnică a spațiului, fluxurilor medicale, echipamentelor și cerințelor de autorizare.",
      },
      {
        question: "DSP trebuie luat în calcul din faza de concept?",
        answer:
          "Da. Cerințele DSP influențează compartimentarea, circuitele, finisajele, instalațiile și documentația proiectului.",
      },
      {
        question: "Când se aleg echipamentele medicale?",
        answer:
          "Ideal, echipamentele principale se aleg înainte de proiectarea finală, deoarece pot schimba instalațiile, spațiul și accesul de service.",
      },
      {
        question: "Poate fi proiectul gândit turnkey?",
        answer:
          "Da, dacă infrastructura, aparatura, integrarea, service-ul și autorizările sunt coordonate într-un singur plan tehnic.",
      },
    ],
    relatedArticles: [
      "dsp-vs-cncan-diferente-pentru-proiecte-medicale",
      "cum-alegi-aparatura-medicala-pentru-o-clinica",
      "costuri-in-amenajarea-unei-camere-de-radiologie",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "ce-trebuie-sa-stii-despre-autorizarea-cncan",
    title: "Ce trebuie să știi despre autorizarea CNCAN",
    description:
      "Un ghid de pornire pentru camere CT, RX și fluoroscopie: protecție radiologică, documentație, fluxuri tehnice și zone controlate.",
    category: "Protecție radiologică",
    tags: ["CNCAN", "radiologie", "protecție radiologică", "CT", "RX"],
    readingTime: "7 min",
    targetKeyword: "autorizare CNCAN radiologie",
    relatedServices: [
      "/services/radiologie",
      "/services/protectie-radiologica",
      "/services/imagistica-medicala",
    ],
    relatedTools: [{ label: "Radiology Room Planner", href: "/radiology-room-planner" }],
    intro:
      "Autorizarea CNCAN este relevantă pentru proiectele care folosesc echipamente cu radiații ionizante. Nu este o formalitate de final, ci o componentă care influențează layout-ul, protecția radiologică și documentația.",
    sections: [
      {
        id: "cand-apare-cncan",
        title: "Când apare CNCAN în proiect",
        body:
          "CNCAN devine relevant pentru camere CT, RX, fluoroscopie și alte aplicații cu radiații ionizante. Cerințele trebuie discutate înainte de execuția pereților și a protecției.",
      },
      {
        id: "protectie-radiologica",
        title: "Protecție radiologică și zone controlate",
        body:
          "Ecranarea cu plumb, ușile plumbuite, sticla plumbuită și calculul zonelor controlate țin de protecția la radiații, nu de RF shielding.",
        bullets: [
          "analiza vecinătăților și fluxurilor",
          "protecție pentru pereți, uși și geamuri",
          "coordonare cu documentația tehnică",
        ],
      },
      {
        id: "coordonare-cu-dsp",
        title: "Coordonare cu DSP și proiectarea medicală",
        body:
          "Cerințele CNCAN nu înlocuiesc cerințele DSP. Un proiect coerent le tratează împreună, dar păstrează rolurile tehnice separate.",
      },
    ],
    faqs: [
      {
        question: "CNCAN se aplică și pentru RMN?",
        answer:
          "În mod obișnuit, RMN-ul nu folosește radiații ionizante. Pentru RMN este critic RF shielding-ul, nu ecranarea cu plumb.",
      },
      {
        question: "CT și RX necesită protecție radiologică?",
        answer:
          "Da. CT și RX trebuie analizate pentru protecție radiologică, zone controlate și documentație specifică.",
      },
      {
        question: "Când trebuie începută discuția despre CNCAN?",
        answer:
          "Înainte de proiectarea finală a camerei, pentru a evita refaceri de pereți, uși, sticlă sau trasee tehnice.",
      },
    ],
    relatedArticles: [
      "dsp-vs-cncan-diferente-pentru-proiecte-medicale",
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      "costuri-in-amenajarea-unei-camere-de-radiologie",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
    title: "Diferența dintre RF shielding și ecranarea cu plumb",
    description:
      "Clarificarea separării dintre cușca Faraday pentru RMN și protecția radiologică cu plumb pentru CT, RX și fluoroscopie.",
    category: "RF shielding",
    tags: ["RF shielding", "RMN", "plumb", "Faraday", "CNCAN"],
    readingTime: "6 min",
    targetKeyword: "RF shielding vs ecranare cu plumb",
    relatedServices: [
      "/services/rf-shielding",
      "/services/protectie-radiologica",
      "/services/radiologie",
    ],
    relatedTools: [{ label: "Radiology Room Planner", href: "/radiology-room-planner" }],
    intro:
      "RF shielding și ecranarea cu plumb rezolvă probleme complet diferite. Confuzia dintre ele poate duce la costuri inutile, camere neperformante sau cerințe de autorizare tratate greșit.",
    sections: [
      {
        id: "rf-shielding-rmn",
        title: "RF shielding pentru RMN",
        body:
          "RF shielding-ul protejează camera RMN de interferențe electromagnetice. Se discută despre cușcă Faraday, uși RF, filtre, waveguides, penetrări și integritatea camerei.",
      },
      {
        id: "plumb-radiologie",
        title: "Ecranare cu plumb pentru CT și RX",
        body:
          "Ecranarea cu plumb ține de protecția radiologică. Este relevantă pentru CT, RX și fluoroscopie, unde obiectivul este controlul dozei și protejarea zonelor adiacente.",
      },
      {
        id: "de-ce-conteaza-separarea",
        title: "De ce contează separarea",
        body:
          "O cameră RMN bine ecranată RF nu este automat pregătită pentru RX, iar o cameră plumbuită nu rezolvă interferențele RF. Decizia depinde de echipament.",
      },
    ],
    faqs: [
      {
        question: "RF shielding înseamnă plumb?",
        answer:
          "Nu. RF shielding-ul controlează interferențele electromagnetice, iar plumbul controlează expunerea la radiații ionizante.",
      },
      {
        question: "RMN are nevoie de protecție radiologică cu plumb?",
        answer:
          "RMN-ul nu funcționează cu radiații ionizante, deci focusul tehnic este RF shielding, nu plumb.",
      },
      {
        question: "CT are nevoie de cușcă Faraday?",
        answer:
          "În mod uzual, CT-ul are nevoie de protecție radiologică, nu de cușcă Faraday pentru RF shielding.",
      },
    ],
    relatedArticles: [
      "greseli-critice-in-proiectarea-camerelor-rmn",
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "costuri-in-amenajarea-unei-camere-de-radiologie",
    title: "Costuri în amenajarea unei camere de radiologie",
    description:
      "Ce influențează complexitatea bugetului: spațiu, echipament, protecție radiologică, autorizări, HVAC și integrare tehnică.",
    category: "Radiologie",
    tags: ["cameră CT", "cameră RX", "buget", "amenajare radiologie"],
    readingTime: "9 min",
    targetKeyword: "cost amenajare cameră radiologie",
    relatedServices: [
      "/services/radiologie",
      "/services/protectie-radiologica",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
    ],
    intro:
      "Costul unei camere de radiologie nu poate fi redus la finisaje. Echipamentul, protecția radiologică, autorizările, traseele tehnice și integrarea determină complexitatea reală.",
    sections: [
      {
        id: "factorii-majori",
        title: "Factorii majori de cost",
        body:
          "Suprafața, vecinătățile, tipul echipamentului, instalațiile, HVAC-ul și nivelul de protecție radiologică pot schimba semnificativ bugetul.",
      },
      {
        id: "costuri-ascunse",
        title: "Costuri care apar prea târziu",
        body:
          "Cele mai frecvente costuri suplimentare apar când echipamentul este ales după compartimentare sau când autorizările sunt tratate separat de execuție.",
        bullets: [
          "modificări de pereți sau uși",
          "trasee electrice și HVAC refăcute",
          "acces de service insuficient",
        ],
      },
      {
        id: "cum-se-estimeaza",
        title: "Cum se estimează responsabil",
        body:
          "O estimare serioasă pornește de la echipament, cameră, protecție, autorizări și timeline. Prețul final trebuie validat prin analiză tehnică.",
      },
    ],
    faqs: [
      {
        question: "Se pot afișa prețuri standard pentru o cameră CT?",
        answer:
          "Doar orientativ. O cameră CT depinde de spațiu, echipament, protecție radiologică, instalații și autorizări.",
      },
      {
        question: "Protecția cu plumb influențează bugetul?",
        answer:
          "Da. Ușile, sticla, pereții și cerințele de protecție pot influența bugetul și calendarul.",
      },
      {
        question: "Calculatorul ZES oferă ofertă finală?",
        answer:
          "Nu. Calculatorul oferă o orientare de complexitate, nu ofertă tehnică sau comercială finală.",
      },
    ],
    relatedArticles: [
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
      "dsp-vs-cncan-diferente-pentru-proiecte-medicale",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "greseli-critice-in-proiectarea-camerelor-rmn",
    title: "Greșeli critice în proiectarea camerelor RMN",
    description:
      "Riscuri de planificare pentru RMN: RF shielding, integritatea camerei, HVAC, vibrații, penetrări, uși RF și coordonare cu echipamentul.",
    category: "RF shielding",
    tags: ["RMN", "RF shielding", "Faraday", "HVAC", "vibrații"],
    readingTime: "8 min",
    targetKeyword: "proiectare cameră RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/radiologie",
    ],
    relatedTools: [{ label: "Radiology Room Planner", href: "/radiology-room-planner" }],
    intro:
      "O cameră RMN este un proiect de infrastructură tehnică, nu doar o încăpere finisată. RF shielding-ul, HVAC-ul, vibrațiile și traseele trebuie coordonate înainte de instalare.",
    sections: [
      {
        id: "rf-integrity",
        title: "Integritatea RF",
        body:
          "Cușca Faraday trebuie gândită ca sistem complet. Ușile RF, filtrele, waveguides și penetrările pot compromite performanța dacă sunt tratate izolat.",
      },
      {
        id: "hvac-si-vibratii",
        title: "HVAC și vibrații",
        body:
          "RMN-ul are cerințe specifice de mediu. Temperaturile, umiditatea, vibrațiile și traseele tehnice influențează stabilitatea echipamentului.",
      },
      {
        id: "coordonare-echipament",
        title: "Coordonare cu echipamentul",
        body:
          "Datele de la producător trebuie integrate în proiect. Fără ele, apar riscuri de acces, montaj, testare și service.",
      },
    ],
    faqs: [
      {
        question: "Care este cea mai frecventă greșeală la RMN?",
        answer:
          "Tratarea camerei ca spațiu obișnuit, fără coordonare între RF shielding, HVAC, acces și cerințele echipamentului.",
      },
      {
        question: "Ușa RF este importantă?",
        answer:
          "Da. Ușa RF este parte critică din integritatea camerei și trebuie coordonată cu sistemul de shielding.",
      },
      {
        question: "RMN-ul cere plumb?",
        answer:
          "Nu pentru radiații ionizante. RMN-ul are nevoie de RF shielding și cerințe speciale de integrare tehnică.",
      },
    ],
    relatedArticles: [
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
      "costuri-in-amenajarea-unei-camere-de-radiologie",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "dsp-vs-cncan-diferente-pentru-proiecte-medicale",
    title: "DSP vs CNCAN: diferențe pentru proiecte medicale",
    description:
      "Cum se separă cerințele DSP de cerințele CNCAN și de ce proiectele medicale cu radiologie trebuie planificate integrat.",
    category: "Autorizări",
    tags: ["DSP", "CNCAN", "autorizări", "proiecte medicale"],
    readingTime: "7 min",
    targetKeyword: "DSP vs CNCAN proiect medical",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/radiologie",
      "/services/protectie-radiologica",
    ],
    relatedTools: [{ label: "Consultant AI", href: "/ai-project-advisor" }],
    intro:
      "DSP și CNCAN răspund la cerințe diferite. Pentru proiectele medicale complexe, diferența contează încă din concept, mai ales când proiectul include radiologie.",
    sections: [
      {
        id: "rolul-dsp",
        title: "Rolul DSP",
        body:
          "DSP privește funcționarea spațiului medical, circuitele, condițiile igienico-sanitare, compartimentarea și documentația pentru activitatea medicală.",
      },
      {
        id: "rolul-cncan",
        title: "Rolul CNCAN",
        body:
          "CNCAN intervine pentru activități cu radiații ionizante, cum sunt CT, RX sau fluoroscopie. Aici apar cerințe de protecție radiologică.",
      },
      {
        id: "planificare-integrata",
        title: "Planificare integrată",
        body:
          "Un proiect bun nu amestecă autoritățile, ci le coordonează. Așa se reduc întârzierile, refacerile și costurile generate de decizii tehnice întârziate.",
      },
    ],
    faqs: [
      {
        question: "DSP și CNCAN sunt același lucru?",
        answer:
          "Nu. DSP privește cadrul medical și sanitar, iar CNCAN privește activitățile cu radiații ionizante.",
      },
      {
        question: "Un cabinet fără radiologie are nevoie de CNCAN?",
        answer:
          "În mod obișnuit, CNCAN devine relevant când există echipamente sau activități cu radiații ionizante.",
      },
      {
        question: "Radiologia trebuie proiectată separat?",
        answer:
          "Radiologia trebuie proiectată specializat, dar integrată în proiectul medical general.",
      },
    ],
    relatedArticles: [
      "cum-se-construieste-o-clinica-medicala-in-romania",
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "costuri-in-amenajarea-unei-camere-de-radiologie",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "cum-alegi-aparatura-medicala-pentru-o-clinica",
    title: "Cum alegi aparatura medicală pentru o clinică",
    description:
      "Criterii tehnice și comerciale pentru alegerea aparaturii: flux clinic, compatibilitate, service, uptime, integrare și scalare.",
    category: "Aparatură medicală",
    tags: ["aparatură medicală", "integrare", "service", "clinică"],
    readingTime: "8 min",
    targetKeyword: "alegere aparatură medicală clinică",
    relatedServices: [
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Diagnostic service", href: "/service-diagnostic" },
    ],
    intro:
      "Aparatura medicală trebuie aleasă împreună cu fluxul clinic, spațiul, service-ul și integrarea tehnică. O decizie bună reduce riscul de downtime și crește predictibilitatea operațională.",
    sections: [
      {
        id: "criterii-clinice",
        title: "Criterii clinice și operaționale",
        body:
          "Echipamentul trebuie să susțină volumul de pacienți, specialitățile, competența echipei și nivelul de calitate dorit.",
      },
      {
        id: "integrare-tehnica",
        title: "Integrare tehnică",
        body:
          "Spațiul, alimentarea, datele, conectivitatea, accesul de service și mentenanța trebuie validate înainte de achiziție.",
      },
      {
        id: "service-si-uptime",
        title: "Service și uptime",
        body:
          "Costul real al aparaturii include mentenanța, consumabilele, disponibilitatea pieselor și viteza intervențiilor.",
      },
    ],
    faqs: [
      {
        question: "Aparatura se alege înainte sau după amenajare?",
        answer:
          "Echipamentele principale trebuie alese înainte de finalizarea proiectării, pentru a coordona infrastructura corect.",
      },
      {
        question: "Service-ul influențează alegerea?",
        answer:
          "Da. Uptime-ul, piesele, mentenanța și suportul tehnic sunt criterii importante în decizia de achiziție.",
      },
      {
        question: "ZES poate ajuta cu integrarea aparaturii?",
        answer:
          "Da. ZES poate conecta alegerea, infrastructura, integrarea și service-ul într-o analiză tehnică unitară.",
      },
    ],
    relatedArticles: [
      "ghid-pentru-echipamente-ivd-si-laborator",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
      "mentenanta-aparaturii-medicale-ce-trebuie-urmarit",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "ghid-pentru-echipamente-ivd-si-laborator",
    title: "Ghid pentru echipamente IVD și laborator",
    description:
      "Ce trebuie urmărit la alegerea și integrarea echipamentelor IVD: fluxuri de probe, calibrare, consumabile, QC și service.",
    category: "IVD / laborator",
    tags: ["IVD", "laborator", "calibrare", "QC", "echipamente laborator"],
    readingTime: "7 min",
    targetKeyword: "echipamente IVD laborator",
    relatedServices: [
      "/services/ivd-laborator",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Diagnostic service", href: "/service-diagnostic" },
    ],
    intro:
      "Echipamentele IVD și de laborator depind de fluxuri de probe, consumabile, calibrare, control de calitate și service. Integrarea trebuie gândită înainte de operare.",
    sections: [
      {
        id: "fluxuri-laborator",
        title: "Fluxuri de laborator",
        body:
          "Planificarea trebuie să țină cont de recepția probelor, procesare, depozitare, eliminare și trasee curate sau controlate.",
      },
      {
        id: "calibrare-si-qc",
        title: "Calibrare și QC",
        body:
          "Performanța echipamentelor IVD depinde de calibrare, controale interne, consumabile și condiții de mediu stabile.",
      },
      {
        id: "service-laborator",
        title: "Service și continuitate",
        body:
          "Pentru laborator, downtime-ul poate bloca fluxul de rezultate. Service-ul preventiv și disponibilitatea consumabilelor sunt critice.",
      },
    ],
    faqs: [
      {
        question: "Ce înseamnă IVD?",
        answer:
          "IVD se referă la diagnostic in vitro, adică echipamente și sisteme folosite pentru analiza probelor biologice.",
      },
      {
        question: "Calibrarea este parte din service?",
        answer:
          "Da, calibrarea și verificările QC sunt componente esențiale pentru funcționarea corectă a echipamentelor de laborator.",
      },
      {
        question: "Laboratorul influențează amenajarea spațiului?",
        answer:
          "Da. Fluxurile de probe, condițiile de mediu, alimentarea și depozitarea pot schimba proiectul spațiului.",
      },
    ],
    relatedArticles: [
      "cum-alegi-aparatura-medicala-pentru-o-clinica",
      "mentenanta-aparaturii-medicale-ce-trebuie-urmarit",
      "cum-se-construieste-o-clinica-medicala-in-romania",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "mentenanta-aparaturii-medicale-ce-trebuie-urmarit",
    title: "Mentenanța aparaturii medicale: ce trebuie urmărit",
    description:
      "Indicatori de risc pentru echipamente medicale: downtime, erori recurente, mentenanță preventivă, calibrare și continuitate operațională.",
    category: "Service",
    tags: ["service aparatură", "mentenanță", "downtime", "uptime"],
    readingTime: "6 min",
    targetKeyword: "mentenanță aparatură medicală",
    relatedServices: [
      "/services/service-aparatura-medicala",
      "/services/aparatura-medicala",
      "/services/ivd-laborator",
    ],
    relatedTools: [{ label: "Diagnostic service", href: "/service-diagnostic" }],
    intro:
      "Mentenanța aparaturii medicale nu este doar o intervenție după defect. Este o strategie de uptime, siguranță, documentare și continuitate operațională.",
    sections: [
      {
        id: "semnale-de-risc",
        title: "Semnale de risc",
        body:
          "Erorile recurente, imaginea degradată, funcționarea intermitentă, supraîncălzirea sau zgomotele neobișnuite trebuie investigate rapid.",
      },
      {
        id: "preventiv-vs-reactiv",
        title: "Preventiv vs reactiv",
        body:
          "Mentenanța preventivă reduce intervențiile reactive și ajută echipa să planifice ferestrele de service fără blocaje operaționale.",
      },
      {
        id: "documentare-service",
        title: "Documentare service",
        body:
          "Istoricul intervențiilor, piesele, calibrările și verificările periodice oferă control mai bun asupra riscului tehnic.",
      },
    ],
    faqs: [
      {
        question: "Când este critică o problemă de service?",
        answer:
          "Când echipamentul este oprit complet, afectează fluxul clinic sau prezintă semne de supraîncălzire, zgomot sau eroare majoră.",
      },
      {
        question: "Mentenanța preventivă merită planificată?",
        answer:
          "Da. Poate reduce downtime-ul, intervențiile urgente și riscul de oprire în perioade cu programări active.",
      },
      {
        question: "Ce informații ajută la trierea service?",
        answer:
          "Modelul, seria, codurile de eroare, impactul operațional, frecvența problemei și istoricul de service.",
      },
    ],
    relatedArticles: [
      "cum-alegi-aparatura-medicala-pentru-o-clinica",
      "ghid-pentru-echipamente-ivd-si-laborator",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
    title: "Imagistică medicală: CT, RMN, RX și integrare tehnică",
    description:
      "Cum se planifică infrastructura pentru imagistică medicală: echipament, cameră, ecranare, HVAC, autorizări și service.",
    category: "Imagistică",
    tags: ["CT", "RMN", "RX", "imagistică", "integrare tehnică"],
    readingTime: "9 min",
    targetKeyword: "imagistică medicală CT RMN RX",
    relatedServices: [
      "/services/imagistica-medicala",
      "/services/radiologie",
      "/services/rf-shielding",
      "/services/protectie-radiologica",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    intro:
      "Imagistica medicală cere o coordonare fină între echipament, cameră, instalații, ecranare, autorizări și service. CT, RMN și RX nu au aceleași cerințe.",
    sections: [
      {
        id: "ct-rx-rmn",
        title: "CT, RX și RMN au logici diferite",
        body:
          "CT și RX implică protecție radiologică și considerații CNCAN. RMN-ul implică RF shielding, câmp magnetic, HVAC și controlul interferențelor.",
      },
      {
        id: "integrare-camera-echipament",
        title: "Integrare cameră-echipament",
        body:
          "Camera trebuie proiectată în jurul echipamentului: acces, greutate, alimentare, date, răcire, service și trasee tehnice.",
      },
      {
        id: "operare-si-service",
        title: "Operare și service",
        body:
          "După instalare, performanța depinde de mentenanță, condiții de mediu, calibrare și intervenții rapide când apar erori.",
      },
    ],
    faqs: [
      {
        question: "CT și RMN folosesc același tip de ecranare?",
        answer:
          "Nu. CT-ul se tratează prin protecție radiologică, iar RMN-ul prin RF shielding și cerințe de integrare magnetică.",
      },
      {
        question: "Imagistica influențează construcția?",
        answer:
          "Da. Greutatea, accesul, instalațiile, HVAC-ul, service-ul și autorizările pot schimba soluția de amenajare.",
      },
      {
        question: "Când trebuie implicat furnizorul echipamentului?",
        answer:
          "Cât mai devreme, pentru a valida cerințele tehnice înainte de execuție.",
      },
    ],
    relatedArticles: [
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      "greseli-critice-in-proiectarea-camerelor-rmn",
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
    ],
    cta: defaultCta,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
  },
  {
    slug: "cost-camera-rmn-romania",
    title: "Cost cameră RMN în România: ce influențează bugetul real",
    description:
      "Ghid tehnic pentru estimarea orientativă a unei camere RMN: RF shielding, cușcă Faraday, HVAC, vibrații, integrare echipament și pași de planificare.",
    category: "RF shielding",
    tags: [
      "cost cameră RMN",
      "RF shielding",
      "cușcă Faraday",
      "camera RMN",
      "integrare RMN",
      "HVAC RMN",
    ],
    readingTime: "14 min",
    targetKeyword: "cost camera RMN Romania",
    relatedServices: [
      "/services/rf-shielding",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" },
    ],
    intro:
      "Costul unei camere RMN în România nu poate fi redus la prețul aparatului sau la o sumă fixă pe metru pătrat. O cameră RMN este un proiect tehnic în care echipamentul, RF shielding-ul, HVAC-ul, traseele de cabluri, accesul, structura clădirii, vibrațiile și mentenanța trebuie gândite împreună. Estimarea corectă începe cu întrebarea simplă: spațiul poate susține performanța echipamentului pe termen lung, nu doar instalarea inițială?",
    sections: [
      {
        id: "ce-intra-in-buget",
        title: "Ce intră, de fapt, în bugetul unei camere RMN",
        body: [
          "Bugetul pentru o cameră RMN include mai multe categorii tehnice: analiza spațiului, proiectarea, amenajarea camerei, RF shielding-ul, integrarea echipamentului, HVAC-ul, alimentarea electrică, traseele de cabluri, pregătirea pentru service și testarea finală. Fiecare categorie poate deveni critică dacă este tratată prea târziu.",
          "Aparatul RMN este doar centrul sistemului. În jurul lui trebuie creat un mediu controlat, cu protecție la interferențe electromagnetice, temperatură stabilă, umiditate controlată, acces pentru mentenanță și trasee tehnice compatibile cu cerințele producătorului. De aceea, două camere cu aceeași suprafață pot avea bugete foarte diferite.",
        ],
        bullets: [
          "analiză tehnică a spațiului și a accesului pentru echipament",
          "RF shielding pentru RMN, inclusiv uși RF, filtre și penetrări controlate",
          "HVAC, răcire, electricitate, date și trasee de service",
          "integrare aparatură imagistică și testare de performanță",
        ],
      },
      {
        id: "rf-shielding-nu-plumb",
        title: "RF shielding nu înseamnă ecranare cu plumb",
        body: [
          "Pentru RMN, discuția principală este RF shielding, nu ecranarea cu plumb. RMN-ul nu folosește radiații ionizante ca CT-ul sau RX-ul, iar camera trebuie protejată împotriva interferențelor radiofrecvență care pot afecta calitatea imaginii și stabilitatea investigației.",
          "Soluția tipică este o cușcă Faraday proiectată în jurul camerei: panouri conductoare, îmbinări controlate, uși RF, filtre, waveguides și detalii speciale pentru fiecare penetrare prin ecranare. O singură trecere necontrolată prin anvelopa RF poate reduce performanța camerei.",
        ],
        callout: {
          title: "Separare critică",
          body: "Pentru o cameră RMN, protecția relevantă este RF shielding. Plumbul este asociat cu protecția radiologică pentru CT, RX sau fluoroscopie, nu cu performanța RF a unei camere RMN.",
        },
      },
      {
        id: "factori-care-schimba-costul",
        title: "Factorii care schimbă costul orientativ",
        body: [
          "Costul crește atunci când spațiul este într-o clădire existentă dificil de adaptat, când accesul pentru magnet este limitat, când sunt necesare lucrări structurale, când HVAC-ul existent nu poate fi folosit sau când echipamentul este deja comandat înainte ca infrastructura să fie validată.",
          "Un proiect RMN într-o clinică nouă, planificat din faza de concept, este de obicei mai predictibil decât o conversie într-un spațiu nemedical. În conversii apar frecvent limitări de înălțime, trasee tehnice improprii, camere tehnice insuficiente, vibrații, vecinătăți sensibile și constrângeri de acces.",
        ],
        bullets: [
          "dimensiunea camerei și configurația suitei RMN",
          "starea clădirii: nouă, existentă medicală sau conversie nemedicală",
          "complexitatea HVAC și a răcirii echipamentului",
          "distanța și traseele dintre camera RMN, camera tehnică și zonele auxiliare",
          "cerințele furnizorului de aparatură și nivelul de integrare necesar",
        ],
      },
      {
        id: "hva-vibratii-integrare",
        title: "HVAC, vibrații și integrarea echipamentului",
        body: [
          "Un RMN are nevoie de condiții stabile de funcționare. HVAC-ul nu este doar confort ambiental, ci parte din infrastructura de performanță. Temperatura, umiditatea, schimburile de aer, răcirea componentelor și poziționarea echipamentelor auxiliare trebuie corelate cu documentația tehnică.",
          "Vibrațiile pot influența calitatea investigațiilor și experiența de operare. De aceea, proiectarea camerei trebuie să verifice amplasarea față de surse de vibrații, echipamente mecanice, trafic intern sau elemente structurale sensibile. Aceste verificări nu sunt spectaculoase vizual, dar pot preveni costuri mari după instalare.",
        ],
      },
      {
        id: "buget-orientativ",
        title: "Cum se citește o estimare de buget",
        body: [
          "O estimare sănătoasă pentru camera RMN se construiește pe faze: proiectare și consultanță, amenajare, RF shielding, instalații, integrare echipament, testare și pregătire pentru service. Separarea pe faze ajută beneficiarul să vadă unde sunt riscurile, nu doar totalul.",
          "Intervalele orientative pot varia mult în funcție de aparatul ales, clădire, localizare, disponibilitatea documentației și nivelul de finisare. Din acest motiv, orice calculator sau analiză preliminară trebuie tratată ca punct de plecare pentru discuție tehnică, nu ca ofertă finală.",
        ],
        callout: {
          title: "Limită de estimare",
          body: "Estimare orientativă, nu ofertă tehnică sau comercială finală. Bugetul trebuie validat pe baza planurilor, specificațiilor echipamentului și unei analize tehnice a spațiului.",
        },
      },
      {
        id: "greseli-frecvente",
        title: "Greșeli care scumpesc o cameră RMN",
        body: [
          "Cea mai frecventă greșeală este achiziția sau rezervarea echipamentului fără validarea camerei. A doua este tratarea RF shielding-ului ca un element separat, comandat târziu, fără coordonare cu HVAC-ul, ușile, traseele și mobilierul tehnic.",
          "O altă problemă apare când proiectarea se concentrează doar pe camera de examinare, ignorând camera tehnică, traseele de service, accesul pentru instalare, zona pacientului și fluxurile de lucru. Camera RMN funcționează ca o suită tehnică, nu ca o încăpere izolată.",
        ],
        bullets: [
          "echipament selectat înainte de validarea spațiului",
          "penetrații RF adăugate după execuția ecranării",
          "HVAC subdimensionat sau necorelat cu echipamentul",
          "lipsă acces pentru mentenanță și înlocuiri ulterioare",
          "buget calculat fără faze, riscuri și dependențe",
        ],
      },
      {
        id: "cum-ajuta-zes",
        title: "Cum poate aborda ZES un proiect RMN",
        body: [
          "ZES poate trata camera RMN ca proiect integrat: infrastructură, RF shielding, imagistică, aparatură, integrare și service. Valoarea apare din coordonarea timpurie între cerințele echipamentului și realitatea spațiului.",
          "Pentru o primă orientare, poți folosi calculatorul de cost cameră RMN sau Radiology Room Planner. Pentru o propunere mai structurată, Proposal Builder poate transforma informațiile proiectului într-un sumar tehnic preliminar cu faze, riscuri și buget orientativ.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este costul exact pentru o cameră RMN?",
        answer:
          "Costul exact nu poate fi stabilit responsabil fără planuri, specificațiile echipamentului și analiza spațiului. Se poate porni de la intervale orientative, apoi bugetul trebuie validat tehnic.",
      },
      {
        question: "Camera RMN are nevoie de plumb?",
        answer:
          "În mod normal, camera RMN are nevoie de RF shielding, nu de ecranare cu plumb. Plumbul este folosit pentru protecția radiologică la echipamente cu radiații ionizante, precum CT sau RX.",
      },
      {
        question: "Ce este cușca Faraday pentru RMN?",
        answer:
          "Este o anvelopă conductoare proiectată pentru a reduce interferențele radiofrecvență. Include detalii tehnice pentru uși, filtre, waveguides și toate penetrările prin ecranare.",
      },
      {
        question: "Când trebuie implicat furnizorul de echipament?",
        answer:
          "Cât mai devreme. Specificațiile aparatului influențează camera, instalațiile, răcirea, accesul, service-ul și testarea finală.",
      },
      {
        question: "Pot estima online bugetul unei camere RMN?",
        answer:
          "Da, ca orientare preliminară. Un calculator ajută la structurarea discuției, dar nu înlocuiește analiza tehnică și oferta comercială.",
      },
    ],
    relatedArticles: [
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      "greseli-critice-in-proiectarea-camerelor-rmn",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
    ],
    cta: {
      title: "Planifici o cameră RMN?",
      description:
        "Începe cu o verificare tehnică a spațiului, RF shielding-ului și cerințelor de integrare a echipamentului.",
      label: "Planifică în Radiology Room Planner",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "cost-camera-ct-romania",
    title: "Cost cameră CT în România: infrastructură, protecție radiologică și CNCAN",
    description:
      "Ghid tehnic pentru estimarea orientativă a unei camere CT: protecție radiologică, ecranare cu plumb, zone controlate, CNCAN, layout și integrare echipament.",
    category: "Protecție radiologică",
    tags: [
      "cost cameră CT",
      "protecție radiologică",
      "ecranare cu plumb",
      "CNCAN",
      "camera CT",
      "integrare CT",
    ],
    readingTime: "13 min",
    targetKeyword: "cost camera CT Romania",
    relatedServices: [
      "/services/protectie-radiologica",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator cost cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Ghid cost cameră CT", href: "/ghiduri/cost-camera-ct" },
    ],
    intro:
      "Costul unei camere CT în România depinde de mai mult decât amenajarea unei încăperi și instalarea echipamentului. Un proiect CT trebuie să trateze protecția radiologică, zonele controlate, ecranarea cu plumb, fluxul pacientului, accesul la echipament, alimentarea electrică, HVAC-ul, integrarea digitală și documentația necesară pentru autorizare. Estimarea de buget trebuie să fie orientativă, etapizată și conectată la realitatea tehnică a spațiului.",
    sections: [
      {
        id: "diferenta-fata-de-rmn",
        title: "Camera CT nu are aceleași cerințe ca o cameră RMN",
        body: [
          "CT-ul folosește radiații ionizante, deci discuția principală este protecția radiologică. Aceasta poate include pereți ecranați cu plumb sau soluții echivalente validate, uși cu protecție, geam plombat, controlul zonelor adiacente și documentație pentru autorizare.",
          "RF shielding-ul folosit la RMN nu rezolvă cerințele unei camere CT. Pentru CT contează protecția la radiații, calculul de ecranare, poziția echipamentului, direcțiile de expunere, zonele controlate și conformarea cu cerințele aplicabile proiectelor radiologice.",
        ],
        callout: {
          title: "CT nu este RMN",
          body: "CT/RX înseamnă protecție radiologică și CNCAN. RMN înseamnă RF shielding și integritate electromagnetică. Cele două nu trebuie amestecate în planificare.",
        },
      },
      {
        id: "ce-intra-in-cost",
        title: "Ce intră în costul unei camere CT",
        body: [
          "Bugetul include proiectare, evaluarea camerei, protecție radiologică, amenajări, instalații, integrare echipament, testare, documentație și coordonare cu pașii de autorizare. În funcție de spațiu, pot apărea lucrări suplimentare pentru structură, trasee, camere tehnice sau adaptarea fluxurilor.",
          "Costul nu trebuie analizat doar prin suprafață. O cameră mică, dar prost amplasată, poate fi mai complicată decât o cameră mai mare, corect poziționată. Vecinătățile, pereții, planșeele, zonele de circulație și încăperile alăturate influențează soluția de protecție radiologică.",
        ],
        bullets: [
          "proiectare tehnică și coordonare cu cerințele echipamentului",
          "protecție radiologică: pereți, uși, geamuri, zone controlate",
          "instalații electrice, HVAC, date și trasee pentru service",
          "documentație și pași de autorizare unde este cazul",
          "integrare cu fluxul clinicii și cu sistemele imagistice",
        ],
      },
      {
        id: "cncan-si-documentatie",
        title: "Rolul CNCAN în planificarea unei camere CT",
        body: [
          "Pentru proiectele care implică echipamente radiologice, CNCAN devine un element de planificare, nu o etapă administrativă de final. Documentația, calculul de protecție radiologică, amplasarea, fluxurile și condițiile de operare trebuie luate în calcul înainte de execuție.",
          "Acest ghid nu înlocuiește consultanța juridică sau de reglementare. Scopul este să arate că bugetul unei camere CT poate fi influențat direct de documentația necesară, de condițiile spațiului și de modul în care sunt tratate zonele cu risc radiologic.",
        ],
      },
      {
        id: "layout-si-zone-controlate",
        title: "Layout, zone controlate și flux de operare",
        body: [
          "O cameră CT trebuie gândită împreună cu zona operatorului, accesul pacientului, spațiile auxiliare, poziția ușilor, direcția echipamentului și vecinătățile. Protecția radiologică nu este doar material aplicat pe pereți, ci rezultat al unei configurații controlate.",
          "Dacă layout-ul se schimbă după calculul inițial, ecranarea poate trebui refăcută sau completată. Acesta este unul dintre motivele pentru care proiectarea camerei CT trebuie sincronizată cu arhitectura, instalațiile și alegerea echipamentului.",
        ],
        bullets: [
          "poziționarea gantry-ului și a mesei pacientului",
          "zona operatorului și vizibilitatea prin geam de protecție",
          "trasee pentru pacient, personal, service și echipament",
          "încăperi adiacente și nivelul de ocupare al acestora",
        ],
      },
      {
        id: "echipament-si-integrare",
        title: "Echipamentul CT schimbă infrastructura",
        body: [
          "Specificațiile echipamentului influențează alimentarea, răcirea, greutatea, accesul, traseele de date, spațiul de service și integrarea cu sistemele clinice. Alegerea unui model CT fără verificarea infrastructurii poate crea costuri neprevăzute.",
          "Integrarea include și pregătirea pentru operare: conectivitate, flux de imagini, zone pentru personal, service, mentenanță și continuitate operațională. Un CT funcțional nu este doar instalat, ci integrat într-un proces medical.",
        ],
      },
      {
        id: "buget-orientativ-ct",
        title: "Cum se structurează o estimare orientativă",
        body: [
          "O estimare utilă separă costurile pe faze: consultanță, proiectare, protecție radiologică, amenajare, instalații, integrare echipament, testare și suport pentru autorizare. Această separare ajută beneficiarul să înțeleagă ce poate fi optimizat și ce nu ar trebui comprimat.",
          "Intervalele de buget pot varia în funcție de clădire, echipament, gradul de pregătire al documentației, complexitatea ecranării și calendarul dorit. Urgența crește riscul de decizii scumpe, mai ales dacă autorizarea și protecția radiologică sunt tratate târziu.",
        ],
        callout: {
          title: "Limită de estimare",
          body: "Estimare orientativă, nu ofertă tehnică sau comercială finală. Pentru o decizie reală sunt necesare planuri, date despre echipament și verificarea condițiilor de amplasare.",
        },
      },
      {
        id: "pasii-recomandati",
        title: "Pașii recomandați înainte de ofertare",
        body: [
          "Înainte de a cere o ofertă finală, este utilă o etapă de analiză: ce echipament este vizat, unde va fi camera, ce spații sunt adiacente, ce trasee tehnice există, ce documentație este disponibilă și ce calendar comercial urmărește beneficiarul.",
          "Calculatorul de cost cameră CT și Radiology Room Planner pot ajuta la structurarea acestor informații. Pentru o viziune mai completă, Proposal Builder poate genera o propunere tehnică preliminară cu faze, riscuri, buget orientativ și informații lipsă.",
        ],
      },
    ],
    faqs: [
      {
        question: "Camera CT are nevoie de RF shielding?",
        answer:
          "În mod normal, nu. Pentru CT contează protecția radiologică, ecranarea cu plumb sau soluții echivalente și cerințele legate de radiații ionizante.",
      },
      {
        question: "CNCAN este relevant pentru camera CT?",
        answer:
          "Da, proiectele cu echipamente radiologice implică cerințe și documentație specifice. Pașii exacți trebuie validați cu specialiști și în funcție de proiect.",
      },
      {
        question: "De ce variază costul între camere CT similare?",
        answer:
          "Clădirea, vecinătățile, layout-ul, echipamentul, instalațiile, protecția radiologică și stadiul documentației pot schimba semnificativ bugetul.",
      },
      {
        question: "Pot estima bugetul înainte de alegerea echipamentului?",
        answer:
          "Se poate obține o orientare, dar alegerea echipamentului clarifică multe cerințe de alimentare, răcire, spațiu, greutate și service.",
      },
      {
        question: "Ce trebuie pregătit pentru o discuție tehnică?",
        answer:
          "Planurile spațiului, echipamentul vizat, vecinătățile camerei, stadiul autorizărilor, calendarul și orice documentație tehnică disponibilă.",
      },
    ],
    relatedArticles: [
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "costuri-in-amenajarea-unei-camere-de-radiologie",
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
    ],
    cta: {
      title: "Verifică proiectul camerei CT",
      description:
        "Clarifică protecția radiologică, pașii CNCAN, infrastructura și integrarea echipamentului înainte de bugetarea finală.",
      label: "Calculează orientativ camera CT",
      href: "/calculatoare/cost-camera-ct",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "autorizare-cncan-pas-cu-pas",
    title: "Autorizare CNCAN pas cu pas pentru proiecte de radiologie",
    description:
      "Ghid practic despre planificarea autorizării CNCAN pentru CT, RX și proiecte radiologice: documentație, protecție radiologică, riscuri și pași de pregătire.",
    category: "Autorizări",
    tags: [
      "autorizare CNCAN",
      "radiologie",
      "protecție radiologică",
      "camera CT",
      "camera RX",
      "documentație CNCAN",
    ],
    readingTime: "15 min",
    targetKeyword: "autorizare CNCAN pas cu pas",
    relatedServices: [
      "/services/radiologie",
      "/services/protectie-radiologica",
      "/services/imagistica-medicala",
      "/services/amenajari-medicale",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Ghid autorizare CNCAN", href: "/ghiduri/autorizare-cncan" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    intro:
      "Autorizarea CNCAN este una dintre etapele care pot influența decisiv calendarul unui proiect de radiologie. Pentru CT, RX sau alte echipamente care implică radiații ionizante, autorizarea nu ar trebui tratată ca o formalitate de final, ci ca parte din proiectarea camerei, a protecției radiologice și a fluxului operațional. Acest ghid explică pașii de pregătire la nivel practic, fără să promită rezultate sau să înlocuiască analiza de specialitate.",
    sections: [
      {
        id: "ce-este-cncan",
        title: "Ce este CNCAN și când devine relevant",
        body: [
          "CNCAN este autoritatea relevantă pentru domeniul activităților nucleare și al utilizării surselor de radiații ionizante. În contextul unei clinici sau al unui departament de radiologie, devine importantă atunci când proiectul include echipamente precum CT, RX, fluoroscopie sau alte sisteme care generează radiații ionizante.",
          "Pentru beneficiar, implicația practică este simplă: proiectul camerei, protecția radiologică, documentația și modul de operare trebuie pregătite în raport cu cerințele aplicabile. Nu este o etapă separată de infrastructură, ci o condiție care poate influența layout-ul, materialele, traseele și calendarul.",
        ],
      },
      {
        id: "cncan-nu-este-rf-shielding",
        title: "CNCAN nu este același lucru cu RF shielding",
        body: [
          "O confuzie frecventă apare între proiectele CT/RX și proiectele RMN. Pentru CT sau RX, problema centrală este protecția radiologică, inclusiv ecranarea cu plumb sau soluții echivalente, zone controlate și documentație specifică radiațiilor ionizante.",
          "Pentru RMN, discuția este diferită: RF shielding, cușcă Faraday, interferențe electromagnetice, uși RF, filtre și integritatea camerei. În mod obișnuit, CNCAN nu este autorizația care definește performanța RF a unei camere RMN. Cele două domenii trebuie separate încă din faza de planificare.",
        ],
        callout: {
          title: "Nu amesteca cerințele",
          body: "CT/RX: protecție radiologică și CNCAN. RMN: RF shielding și performanță electromagnetică. Amestecarea acestor cerințe duce la bugete neclare și riscuri de proiectare.",
        },
      },
      {
        id: "pasul-1-incadrare",
        title: "Pasul 1: clarificarea echipamentului și a încadrării proiectului",
        body: [
          "Primul pas este să definești ce echipament va fi instalat, ce tip de investigații va susține, unde va fi amplasat și ce spații sunt în jurul camerei. Un CT într-o clădire nouă, un RX într-o clinică existentă și o modernizare de radiologie pot avea cerințe și riscuri diferite.",
          "În această etapă se adună informațiile de bază: planuri, suprafețe, vecinătăți, flux pacient, zona operatorului, echipamentul vizat, stadiul DSP, stadiul documentației tehnice și calendarul dorit. Cu cât datele sunt mai clare, cu atât estimările ulterioare devin mai realiste.",
        ],
        bullets: [
          "tipul echipamentului: CT, RX, fluoroscopie sau alt sistem radiologic",
          "amplasarea camerei și încăperile adiacente",
          "stadiul proiectului: concept, proiectare, execuție sau modernizare",
          "documentația disponibilă și responsabilitățile tehnice",
        ],
      },
      {
        id: "pasul-2-protectie-radiologica",
        title: "Pasul 2: protecția radiologică și calculul de ecranare",
        body: [
          "Protecția radiologică este baza tehnică a proiectului. Ea poate include pereți ecranați, uși, geam de protecție, soluții pentru planșee sau tratamente specifice în funcție de poziția echipamentului și de zonele ocupate din jur.",
          "Calculul și soluția de ecranare trebuie corelate cu layout-ul real, nu cu o schiță provizorie. Dacă se mută ușa, camera operatorului, echipamentul sau destinația încăperilor vecine, soluția poate necesita revizuire. De aceea, protecția radiologică trebuie coordonată înainte de execuție, nu după.",
        ],
      },
      {
        id: "pasul-3-documentatie",
        title: "Pasul 3: documentație, responsabilități și calendar",
        body: [
          "Un dosar pregătit slab poate întârzia un proiect chiar dacă execuția pare aproape finalizată. Documentația trebuie să fie consecventă: planuri, date tehnice, soluții de protecție, descrierea spațiului, fluxurile și informațiile despre echipament trebuie să spună aceeași poveste.",
          "Nu toate proiectele au același calendar. Modernizările în spații existente pot aduce constrângeri suplimentare, iar schimbările de echipament sau layout pot genera reluări de analiză. O abordare bună rezervă timp pentru clarificări, verificări și coordonare între părți.",
        ],
        bullets: [
          "planuri și detalii ale camerei radiologice",
          "specificații ale echipamentului",
          "soluția de protecție radiologică",
          "informații despre operare și zonele adiacente",
          "corelarea cu pașii DSP și cu proiectarea tehnică",
        ],
      },
      {
        id: "pasul-4-executie-si-verificare",
        title: "Pasul 4: execuție controlată și verificare",
        body: [
          "Execuția camerei trebuie să respecte soluția tehnică. În practică, multe probleme apar din modificări aparent mici: o trecere nouă printr-un perete, o ușă schimbată, o diferență de material, un traseu tehnic adăugat sau o cameră vecină cu altă utilizare decât cea din plan.",
          "Verificarea finală nu trebuie privită ca o simplă bifă. Ea confirmă dacă infrastructura, ecranarea, integrarea echipamentului și condițiile de operare sunt coerente. Dacă problemele sunt descoperite după montaj, corecțiile pot deveni costisitoare și pot întârzia deschiderea.",
        ],
      },
      {
        id: "greseli-care-intarzie",
        title: "Greșeli care întârzie autorizarea",
        body: [
          "Cele mai frecvente întârzieri vin din planuri incomplete, schimbări de layout după stabilirea soluției, lipsa specificațiilor echipamentului, tratarea protecției radiologice ca finisaj și confuzia dintre cerințele CT/RX și cele RMN.",
          "O altă greșeală este separarea autorizării de buget. Dacă nu sunt bugetate proiectarea, documentația, ecranarea și verificările, proiectul ajunge să caute economii exact în zonele care pot bloca funcționarea.",
        ],
        bullets: [
          "echipament ales târziu sau schimbat după proiectare",
          "planuri necorelate cu execuția reală",
          "vecinătăți și zone controlate tratate superficial",
          "lipsa coordonării între proiectare, furnizor echipament și execuție",
          "confuzia între CNCAN, DSP, RF shielding și protecție radiologică",
        ],
      },
      {
        id: "cum-pregatesti-discutia",
        title: "Cum pregătești o discuție tehnică eficientă",
        body: [
          "Înainte de a porni procedurile, merită să pregătești o imagine clară asupra proiectului: ce echipament vrei, unde va fi instalat, ce lucrări sunt necesare, ce documentație există și ce obiectiv comercial are proiectul. Această claritate reduce riscul de bugete fragmentate.",
          "Radiology Room Planner poate ajuta la trierea inițială a cerințelor, iar Proposal Builder poate transforma informațiile într-o propunere tehnică preliminară. Pentru proiecte complexe, următorul pas firesc rămâne analiza tehnică a spațiului și a documentației.",
        ],
      },
    ],
    faqs: [
      {
        question: "Pentru ce echipamente este relevantă autorizarea CNCAN?",
        answer:
          "În context medical, CNCAN este relevantă pentru echipamente care implică radiații ionizante, precum CT, RX sau fluoroscopie. Încadrarea exactă trebuie verificată pentru fiecare proiect.",
      },
      {
        question: "CNCAN se aplică la RF shielding pentru RMN?",
        answer:
          "RF shielding-ul pentru RMN ține de performanța electromagnetică a camerei, nu de protecția radiologică pentru radiații ionizante. Nu trebuie confundat cu cerințele CNCAN pentru CT/RX.",
      },
      {
        question: "Când trebuie începută pregătirea pentru CNCAN?",
        answer:
          "Cât mai devreme în proiect, ideal înainte de execuția camerei. Layout-ul, echipamentul, ecranarea și documentația trebuie coordonate din faza de proiectare.",
      },
      {
        question: "Este acest ghid o garanție de autorizare?",
        answer:
          "Nu. Ghidul are rol informativ și de planificare. Pașii, documentele și soluțiile trebuie validate de specialiști în funcție de proiect și de cerințele aplicabile.",
      },
      {
        question: "Ce documente ajută la prima analiză?",
        answer:
          "Planurile spațiului, specificațiile echipamentului, destinația încăperilor vecine, stadiul DSP, calendarul dorit și orice documentație tehnică existentă.",
      },
      {
        question: "Cum poate ZES ajuta în această etapă?",
        answer:
          "ZES poate ajuta prin analiză tehnică, coordonare de infrastructură, radiologie, protecție radiologică, integrare echipamente și structurarea pașilor de proiect.",
      },
    ],
    relatedArticles: [
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "dsp-vs-cncan-diferente-pentru-proiecte-medicale",
      "cost-camera-ct-romania",
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
    ],
    cta: {
      title: "Pregătești un proiect radiologic?",
      description:
        "Clarifică echipamentul, protecția radiologică, documentația și pașii de planificare înainte de execuție.",
      label: "Generează o propunere preliminară",
      href: "/proposal-builder",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "modernizare-radiologie-clinica",
    title: "Modernizare radiologie clinică: infrastructură, echipamente și riscuri tehnice",
    description:
      "Ghid pentru modernizarea unei radiologii existente: CT, RX, RMN, protecție radiologică, RF shielding, echipamente, fluxuri, autorizări și continuitate operațională.",
    category: "Radiologie",
    tags: [
      "modernizare radiologie",
      "camera CT",
      "camera RMN",
      "protecție radiologică",
      "RF shielding",
      "integrare imagistică",
    ],
    readingTime: "15 min",
    targetKeyword: "modernizare radiologie clinica",
    relatedServices: [
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/protectie-radiologica",
      "/services/rf-shielding",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Calculator cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Calculator cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Contact ZES", href: "/contact" },
    ],
    intro:
      "Modernizarea unei radiologii clinice este mai delicată decât amenajarea unei camere noi, pentru că proiectul pornește de la constrângeri existente: pereți, instalații, echipamente aflate în operare, fluxuri de pacienți, autorizări, spații vecine și presiune comercială pentru a reduce perioada de întrerupere. O modernizare bună nu înseamnă doar înlocuirea aparatului sau refacerea finisajelor, ci verificarea întregului sistem tehnic care susține imagistica.",
    sections: [
      {
        id: "ce-inseamna-modernizare",
        title: "Ce înseamnă modernizarea unei radiologii",
        body: [
          "O radiologie modernizată trebuie să răspundă la trei întrebări: ce echipamente vor funcționa, ce condiții tehnice cer acestea și cum rămâne clinica operațională în timpul lucrărilor. În practică, modernizarea poate include schimbarea unui CT sau RX, introducerea unui RMN, extinderea zonei de imagistică, înlocuirea infrastructurii electrice, refacerea protecției radiologice sau pregătirea unei camere pentru un alt tip de echipament.",
          "Riscul apare când modernizarea este tratată ca lucrare de finisaj. Radiologia este un spațiu tehnic: greutate echipament, trasee, răcire, date, poziție operator, acces service, autorizări și protecție trebuie analizate împreună. Un perete existent nu este automat potrivit, o ușă existentă nu este automat compatibilă, iar o cameră care a găzduit un echipament vechi nu este automat pregătită pentru unul nou.",
        ],
        bullets: [
          "inventarierea echipamentelor existente și viitoare",
          "verificarea camerei, a instalațiilor și a zonelor adiacente",
          "planificarea lucrărilor fără blocarea inutilă a activității",
          "corelarea autorizărilor cu soluția tehnică reală",
        ],
      },
      {
        id: "ct-rx-versus-rmn",
        title: "CT/RX și RMN au cerințe diferite",
        body: [
          "În modernizare, separarea dintre CT/RX și RMN este esențială. Pentru CT și RX, tema principală este protecția radiologică: ecranare cu plumb sau soluții echivalente, uși de protecție, geam plombat, zone controlate, poziționare și documentație relevantă pentru CNCAN.",
          "Pentru RMN, tema principală este RF shielding-ul: cușcă Faraday, uși RF, filtre, waveguides, penetrări controlate, interferențe electromagnetice, HVAC, vibrații și integrarea magnetului. Ecranarea cu plumb nu rezolvă performanța RF a unei camere RMN, iar RF shielding-ul nu rezolvă protecția radiologică pentru CT sau RX.",
        ],
        callout: {
          title: "Separare tehnică obligatorie",
          body: "Modernizarea CT/RX se analizează prin protecție radiologică și CNCAN. Modernizarea RMN se analizează prin RF shielding, integritate electromagnetică, HVAC și cerințe de integrare a magnetului.",
        },
      },
      {
        id: "auditul-spatiului",
        title: "Auditul spațiului înainte de buget",
        body: [
          "Înainte de ofertare, spațiul trebuie citit tehnic: dimensiuni reale, înălțimi, structură, acces, trasee de alimentare, poziții pentru echipamente auxiliare, ventilație, răcire, trasee de date și destinația încăperilor vecine. Pentru radiologie, vecinătățile pot schimba soluția de protecție, iar pentru RMN pot apărea probleme legate de interferențe, vibrații sau accesul magnetului.",
          "Auditul ar trebui să includă și documentația existentă. Planurile vechi pot să nu mai corespundă execuției, iar schimbările făcute în timp pot introduce neconcordanțe. Dacă modernizarea pornește de la informații inexacte, bugetul preliminar devine fragil și calendarul se poate modifica în execuție.",
        ],
        bullets: [
          "planuri actualizate și măsurători la fața locului",
          "verificarea încăperilor adiacente și a fluxurilor",
          "starea instalațiilor electrice, HVAC și date",
          "documentația echipamentelor existente și viitoare",
          "impactul lucrărilor asupra activității clinice",
        ],
      },
      {
        id: "echipament-si-integrare",
        title: "Echipamentul nou schimbă infrastructura",
        body: [
          "Înlocuirea unui echipament imagistic cu unul mai performant poate schimba cerințele camerei. Alimentarea electrică, răcirea, masa echipamentului, traseele de cabluri, spațiul de service și conectivitatea trebuie validate înainte de comandă. Nu este suficient ca noul aparat să încapă în cameră; trebuie să poată fi instalat, operat și întreținut corect.",
          "Integrarea include și legătura cu sistemele digitale ale clinicii, fluxul pacientului, zona operatorului și accesul pentru service. Dacă radiologia rămâne parțial operațională în timpul modernizării, fazarea lucrărilor devine la fel de importantă ca soluția tehnică.",
        ],
      },
      {
        id: "autorizari-si-documentatie",
        title: "Autorizări, DSP, CNCAN și schimbări de funcțiune",
        body: [
          "Modernizarea poate declanșa nevoi de actualizare documentară. Pentru CT, RX sau alte echipamente cu radiații ionizante, protecția radiologică și pașii CNCAN trebuie reevaluați în raport cu noua configurație. Pentru RMN, cerințele țin de performanța camerei și de integrarea tehnică, nu de aceeași logică radiologică.",
          "DSP și CNCAN nu sunt același lucru și nu acoperă aceleași riscuri. DSP privește cadrul de funcționare medicală, fluxurile și condițiile spațiului medical, în timp ce CNCAN devine relevant pentru utilizarea surselor de radiații ionizante. O modernizare coerentă ține cont de ambele acolo unde proiectul o cere.",
        ],
      },
      {
        id: "continuitate-operationala",
        title: "Continuitatea operațională trebuie planificată",
        body: [
          "Într-o clinică activă, costul real al modernizării include și întreruperea activității. Dacă radiologia este o sursă importantă de programări și venituri, calendarul trebuie construit astfel încât perioadele de downtime să fie previzibile, comunicate și cât mai scurte fără a compromite calitatea execuției.",
          "Un plan bun include faze clare: pregătire documentară, comandă echipament, lucrări preliminare, oprire controlată, intervenții critice, instalare, testare și reluare operațională. În lipsa acestei fazări, proiectul poate intra într-o zonă de improvizație care consumă timp și buget.",
        ],
        bullets: [
          "stabilirea ferestrelor de oprire",
          "prioritizarea lucrărilor critice înainte de livrarea echipamentului",
          "coordonarea furnizorilor de echipamente, ecranare și instalații",
          "pregătirea echipei clinice pentru schimbarea fluxurilor",
        ],
      },
      {
        id: "buget-si-pasi",
        title: "Cum se construiește bugetul orientativ",
        body: [
          "Bugetul unei modernizări de radiologie trebuie separat pe categorii: analiză tehnică, proiectare, protecție radiologică sau RF shielding, amenajări, instalații, echipament, integrare, testare și service. Această separare previne confuzia dintre costurile de cameră, costurile de aparat și costurile de autorizare.",
          "Estimatorul online poate ajuta la orientare, dar nu trebuie tratat ca ofertă finală. Pentru modernizări, informațiile lipsă sunt deseori decisive: planuri reale, starea instalațiilor, modelul echipamentului, documentația existentă, restricțiile clădirii și nivelul de downtime acceptabil.",
        ],
        callout: {
          title: "Estimare responsabilă",
          body: "Orice discuție de cost pentru modernizarea radiologiei trebuie tratată ca estimare orientativă, nu ofertă tehnică sau comercială finală.",
        },
      },
      {
        id: "cum-poate-ajuta-zes",
        title: "Cum poate ajuta ZES într-o modernizare",
        body: [
          "ZES poate analiza modernizarea ca proiect integrat: radiologie, imagistică, protecție radiologică, RF shielding pentru RMN, echipamente, integrare și service. Obiectivul este reducerea riscurilor înainte de execuție și clarificarea pașilor tehnici înainte de achiziții sau opriri operaționale.",
          "Radiology Room Planner este util pentru trierea inițială a cerințelor, iar Proposal Builder poate organiza informațiile într-o propunere tehnică preliminară. Pentru discuții aplicate pe spațiu, contactul direct rămâne pasul firesc.",
        ],
      },
    ],
    faqs: [
      {
        question: "Modernizarea unei camere CT implică RF shielding?",
        answer:
          "În mod obișnuit, nu. Camera CT se tratează prin protecție radiologică, ecranare cu plumb sau soluții echivalente, zone controlate și pași CNCAN.",
      },
      {
        question: "Modernizarea unei camere RMN implică plumb?",
        answer:
          "În mod obișnuit, nu. Pentru RMN contează RF shielding-ul, cușca Faraday, controlul interferențelor, HVAC-ul, vibrațiile și integrarea magnetului.",
      },
      {
        question: "Poate funcționa clinica în timpul modernizării radiologiei?",
        answer:
          "Uneori da, dar depinde de lucrări, acces, siguranță, echipamente și fluxuri. Continuitatea trebuie planificată prin faze și ferestre de oprire.",
      },
      {
        question: "Ce informații sunt necesare pentru o analiză inițială?",
        answer:
          "Planuri actualizate, echipamentul existent și cel dorit, stadiul autorizărilor, detalii despre instalații, vecinătăți și calendarul dorit.",
      },
      {
        question: "Modernizarea cere o ofertă separată de echipament?",
        answer:
          "Da, de regulă echipamentul, infrastructura, ecranarea, integrarea și service-ul trebuie bugetate distinct, apoi corelate într-un plan comun.",
      },
    ],
    relatedArticles: [
      "cost-camera-rmn-romania",
      "cost-camera-ct-romania",
      "autorizare-cncan-pas-cu-pas",
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
    ],
    cta: {
      title: "Modernizezi o radiologie existentă?",
      description:
        "Clarifică diferențele dintre CT/RX și RMN, riscurile de ecranare, integrarea echipamentului și calendarul de oprire.",
      label: "Planifică modernizarea",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "service-ct-rmn-mentenanta-uptime",
    title: "Service CT și RMN: mentenanță, uptime și riscuri operaționale",
    description:
      "Ghid pentru service CT și RMN: mentenanță preventivă, diagnostic, piese de schimb, uptime, continuitate operațională și triere tehnică.",
    category: "Service",
    tags: [
      "service CT",
      "service RMN",
      "mentenanță imagistică",
      "uptime medical",
      "diagnostic aparatură",
      "piese de schimb",
    ],
    readingTime: "14 min",
    targetKeyword: "service CT RMN mentenanta uptime",
    relatedServices: [
      "/services/service-aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
      "/services/radiologie",
      "/services/rf-shielding",
    ],
    relatedTools: [
      { label: "Service Diagnostic", href: "/service-diagnostic" },
      { label: "Calculator service aparatură", href: "/calculatoare/service-aparatura" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Contact service ZES", href: "/contact" },
    ],
    intro:
      "Service-ul pentru CT și RMN nu este doar o reacție la o eroare apărută pe ecran. Pentru o clinică sau un departament de imagistică, service-ul este o componentă de continuitate operațională: reduce opririle neplanificate, protejează programările, susține calitatea investigațiilor și ajută echipa medicală să lucreze predictibil. Când aparatul este critic pentru fluxul clinicii, mentenanța devine o decizie de business, nu doar o intervenție tehnică.",
    sections: [
      {
        id: "de-ce-uptime-ul-conteaza",
        title: "De ce uptime-ul contează în imagistică",
        body: [
          "Un CT sau un RMN oprit poate afecta rapid programările, veniturile, încrederea pacienților și colaborarea cu medicii trimițători. În multe clinici, imagistica este un nod operațional: dacă aparatul nu funcționează, întregul flux se decalează.",
          "Uptime-ul nu înseamnă promisiunea că nu vor apărea niciodată probleme. Înseamnă pregătirea unui sistem care reduce frecvența incidentelor, scurtează timpul de diagnostic, clarifică responsabilitățile și prioritizează intervențiile în funcție de impact. O strategie de service bună începe înainte de prima defecțiune majoră.",
        ],
        bullets: [
          "programări mai predictibile",
          "risc mai mic de opriri prelungite",
          "triage mai rapid când apare o eroare",
          "planificarea pieselor și a mentenanței preventive",
        ],
      },
      {
        id: "mentenanta-preventiva",
        title: "Mentenanța preventivă nu este o formalitate",
        body: [
          "Mentenanța preventivă urmărește condițiile de funcționare înainte ca ele să producă o oprire. Pentru CT, aceasta poate include verificări ale componentelor, răcirii, alimentării, calității imaginii și parametrilor de funcționare. Pentru RMN, se adaugă atenție la condițiile de mediu, răcire, integritate RF, sisteme auxiliare și comportamentul camerei.",
          "Un plan preventiv nu elimină toate riscurile, dar schimbă modul în care clinica le gestionează. Problemele pot fi observate mai devreme, intervențiile se pot programa în ferestre mai puțin aglomerate, iar bugetul de service devine mai predictibil.",
        ],
        callout: {
          title: "Principiu de continuitate",
          body: "Service-ul bun nu începe în ziua în care aparatul se oprește. Începe cu mentenanță preventivă, monitorizarea condițiilor de operare și documentarea incidentelor.",
        },
      },
      {
        id: "diagnostic-corect",
        title: "Diagnostic tehnic: simptomul nu este mereu cauza",
        body: [
          "O eroare de sistem, artefactele de imagine, supraîncălzirea sau funcționarea intermitentă pot avea cauze diferite: componentă electronică, alimentare electrică, răcire, software, cablare, mediu de cameră, integrare sau utilizare. De aceea, trierea inițială este importantă.",
          "Pentru RMN, unele probleme pot părea legate de echipament, dar să fie influențate de RF shielding, interferențe, HVAC sau modificări în cameră. Pentru CT, calitatea imaginii, erorile sau opririle pot necesita verificarea echipamentului, dar și a condițiilor de alimentare, răcire și utilizare.",
        ],
        bullets: [
          "eroare afișată și momentul apariției",
          "impact operațional: oprit, funcționare parțială sau degradare",
          "istoricul incidentelor și al mentenanței",
          "condițiile de mediu și modificările recente în cameră",
        ],
      },
      {
        id: "piese-de-schimb",
        title: "Piese de schimb și planificare logistică",
        body: [
          "O intervenție rapidă depinde nu doar de diagnostic, ci și de disponibilitatea pieselor, compatibilitatea lor, istoricul echipamentului și procedurile furnizorului. În echipamente imagistice complexe, o piesă critică indisponibilă poate transforma o problemă tehnică într-o întrerupere operațională serioasă.",
          "Planificarea pieselor nu înseamnă stocarea haotică a componentelor. Înseamnă identificarea elementelor cu risc, înțelegerea timpilor de livrare, stabilirea priorităților și documentarea modelului echipamentului. Pentru aparatele esențiale, această discuție ar trebui să facă parte din planul de service.",
        ],
      },
      {
        id: "ct-versus-rmn-service",
        title: "Diferențe între service CT și service RMN",
        body: [
          "CT-ul și RMN-ul pot avea nevoi comune, precum mentenanță preventivă, diagnostic electronic, verificări de calitate a imaginii și managementul pieselor. Totuși, cerințele de cameră sunt diferite. CT-ul se leagă de protecția radiologică, flux, răcire și echipament cu radiații ionizante. RMN-ul se leagă de RF shielding, câmp magnetic, HVAC, vibrații și integrarea magnetului.",
          "Această diferență contează în service. O modificare în camera RMN poate afecta performanța RF sau condițiile de mediu. O schimbare într-o cameră CT poate avea impact asupra protecției radiologice sau a operării. Service-ul responsabil privește aparatul și infrastructura împreună.",
        ],
      },
      {
        id: "contract-service",
        title: "Contract de service sau intervenții la cerere",
        body: [
          "Intervențiile la cerere pot părea flexibile, dar pentru echipamente critice pot crea incertitudine: cine răspunde, în ce timp, cu ce documentație, ce piese sunt disponibile și cum se prioritizează cazul. Un contract sau o structură clară de suport poate reduce aceste incertitudini.",
          "Nu orice clinică are nevoie de aceeași formulă. Un centru cu volum mare și echipament esențial are alt profil de risc decât un cabinet cu utilizare ocazională. Decizia trebuie legată de impactul opririi, vechimea echipamentului, disponibilitatea pieselor, istoricul incidentelor și calendarul de lucru.",
        ],
      },
      {
        id: "ce-sa-pregatesti",
        title: "Ce informații ajută la o triere rapidă",
        body: [
          "Când apare o problemă, calitatea informațiilor transmise scurtează timpul de triere. Un mesaj vag de tipul „nu merge” ajută puțin. Mai util este un sumar: tip echipament, eroare afișată, momentul apariției, dacă aparatul este complet oprit, ce investigații sunt afectate și ce s-a schimbat recent în cameră.",
          "Service Diagnostic poate ajuta la structurarea acestui prim sumar fără să pretindă un diagnostic final. Rezultatul poate orienta urgența, riscurile operaționale și pașii următori înainte de o discuție tehnică aplicată.",
        ],
        bullets: [
          "tipul și modelul echipamentului, dacă este disponibil",
          "simptomul, codul de eroare și frecvența apariției",
          "impactul asupra programărilor",
          "istoricul de mentenanță și intervenții recente",
          "condiții de mediu sau lucrări recente în cameră",
        ],
      },
      {
        id: "cum-abordeaza-zes",
        title: "Cum abordează ZES service-ul imagistic",
        body: [
          "ZES tratează service-ul ca parte dintr-un sistem mai larg: echipament, infrastructură, integrare, cameră, utilizare și continuitate operațională. Pentru CT și RMN, această abordare este importantă deoarece unele probleme apar la granița dintre aparat și mediul tehnic.",
          "Pentru o primă triere, folosește Service Diagnostic sau calculatorul de service aparatură. Pentru un plan mai amplu, Proposal Builder poate include mentenanța, riscurile, bugetul orientativ și pașii de continuitate într-o propunere preliminară.",
        ],
      },
    ],
    faqs: [
      {
        question: "Cât de des trebuie făcută mentenanța pentru CT sau RMN?",
        answer:
          "Frecvența depinde de echipament, utilizare, recomandările producătorului și istoricul incidentelor. Trebuie stabilită într-un plan tehnic, nu printr-o regulă generică.",
      },
      {
        question: "Artefactele de imagine înseamnă automat defect al aparatului?",
        answer:
          "Nu întotdeauna. Pot exista cauze legate de echipament, software, calibrare, mediu, RF shielding la RMN sau condiții de operare.",
      },
      {
        question: "Ce este mai important: intervenția rapidă sau mentenanța preventivă?",
        answer:
          "Ambele sunt importante. Intervenția rapidă reduce impactul incidentului, iar mentenanța preventivă reduce probabilitatea și severitatea unor incidente.",
      },
      {
        question: "Un contract de service garantează uptime total?",
        answer:
          "Nu. Un contract poate îmbunătăți predictibilitatea și timpii de reacție, dar nu poate garanta lipsa oricărei opriri sau disponibilitatea instantanee a tuturor pieselor.",
      },
      {
        question: "Ce trebuie trimis înainte de o solicitare service?",
        answer:
          "Tipul echipamentului, simptomul, codul de eroare, impactul operațional, istoricul incidentelor și orice schimbare recentă în cameră sau infrastructură.",
      },
    ],
    relatedArticles: [
      "mentenanta-aparaturii-medicale-ce-trebuie-urmarit",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
      "modernizare-radiologie-clinica",
      "cost-camera-rmn-romania",
    ],
    cta: {
      title: "Ai o problemă cu un CT sau RMN?",
      description:
        "Structurează rapid simptomele, impactul operațional și pașii recomandați înainte de intervenția tehnică.",
      label: "Deschide Service Diagnostic",
      href: "/service-diagnostic",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "echipamente-ivd-laborator-alegere-integrare-service",
    title: "Echipamente IVD pentru laborator: alegere, integrare și service",
    description:
      "Ghid pentru alegerea echipamentelor IVD și de laborator: workflow, capacitate, integrare, calibrare, validare, service și continuitate operațională.",
    category: "IVD / laborator",
    tags: [
      "echipamente IVD",
      "laborator medical",
      "integrare laborator",
      "service IVD",
      "calibrare",
      "validare laborator",
    ],
    readingTime: "14 min",
    targetKeyword: "echipamente IVD laborator alegere integrare service",
    relatedServices: [
      "/services/ivd-laborator",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
      "/services/amenajari-medicale",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      { label: "Calculator cost laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Contact ZES", href: "/contact" },
      { label: "Ghid echipamente IVD", href: "/ghiduri/echipamente-ivd-laborator" },
    ],
    intro:
      "Alegerea echipamentelor IVD pentru un laborator medical nu ar trebui să pornească doar de la lista de analize sau de la prețul unui analizor. Un laborator funcțional este un sistem de workflow: prelevare, recepție probe, pregătire, analiză, control calitate, raportare, mentenanță, consumabile, calibrare, validare și service. Dacă aceste elemente nu sunt gândite împreună, echipamentul poate fi bun pe hârtie, dar dificil de operat în realitate.",
    sections: [
      {
        id: "workflow-inainte-de-echipament",
        title: "Workflow-ul vine înaintea echipamentului",
        body: [
          "Primul pas în alegerea echipamentelor IVD este definirea fluxului laboratorului. Ce probe intră, în ce volum, cu ce frecvență, ce timp de răspuns se dorește, ce personal operează echipamentele, cum se gestionează consumabilele și cum se raportează rezultatele? Răspunsurile schimbă complet selecția.",
          "Un laborator mic cu volum predictibil poate avea nevoie de o configurație compactă și ușor de întreținut. Un laborator cu volum ridicat sau cu portofoliu divers are nevoie de redundanță, automatizare, integrare digitală, spații de lucru clare și un plan de service mai robust.",
        ],
        bullets: [
          "tipuri de probe și trasee interne",
          "volum zilnic și vârfuri de lucru",
          "timp de răspuns dorit",
          "personal disponibil și nivel de automatizare",
          "integrare cu sistemele de raportare",
        ],
      },
      {
        id: "selectia-echipamentelor",
        title: "Criterii de selecție pentru echipamente IVD",
        body: [
          "Selecția trebuie să echilibreze capacitatea, fiabilitatea, disponibilitatea consumabilelor, cerințele de service, spațiul necesar, conectivitatea și costul total de operare. Prețul de achiziție este doar o parte din decizie. Contează cât de ușor se operează echipamentul, cât de predictibil este suportul și cât de bine se potrivește fluxului laboratorului.",
          "Este util să separi decizia pe categorii: analizor principal, echipamente auxiliare, consumabile, reactivi, software, mentenanță, calibrare și service. Când toate sunt puse într-un singur total, riscul este să fie subestimate costurile operaționale.",
        ],
        bullets: [
          "capacitate și tipuri de teste",
          "necesar de spațiu, alimentare și mediu",
          "consumabile și disponibilitate",
          "interfațare și raportare",
          "service, mentenanță și timp de reacție",
        ],
      },
      {
        id: "integrarea-in-laborator",
        title: "Integrarea echipamentelor în spațiul de laborator",
        body: [
          "Integrarea nu înseamnă doar conectarea la priză. Echipamentele IVD pot cere mese, alimentări dedicate, apă, evacuare, ventilație, temperatură controlată, spațiu pentru consumabile, trasee pentru probe și zone de lucru separate. Într-un laborator aglomerat, o poziționare greșită poate încetini fluxul și crește riscul de erori.",
          "Integrarea digitală este la fel de importantă. Rezultatele trebuie să circule coerent între echipament, sistemele interne și raportare. Chiar dacă nu se implementează totul din prima zi, laboratorul trebuie gândit astfel încât să poată evolua fără reamenajări majore.",
        ],
      },
      {
        id: "calibrare-validare",
        title: "Calibrare, validare și control calitate",
        body: [
          "În laborator, performanța echipamentului trebuie susținută prin proceduri, calibrare, validare și control calitate. Acestea nu sunt detalii administrative; ele influențează încrederea în rezultate, ritmul de lucru și modul în care echipa reacționează la abateri.",
          "Când un echipament nou intră în laborator, perioada de instalare trebuie să includă verificări, instruire, configurare și documentare. Dacă validarea este grăbită sau neclară, apar probleme în operare: rezultate întârziate, repetări, neînțelegeri între echipe sau utilizare sub capacitate.",
        ],
        callout: {
          title: "Laboratorul este un sistem",
          body: "Un analizor performant nu compensează un workflow slab, lipsa consumabilelor, integrarea digitală incompletă sau un plan de service insuficient.",
        },
      },
      {
        id: "service-si-continuitate",
        title: "Service IVD și continuitate operațională",
        body: [
          "Service-ul pentru IVD trebuie gândit în raport cu impactul asupra probelor și timpului de răspuns. O oprire a unui analizor critic poate bloca fluxul, poate crea întârzieri și poate pune presiune pe personal. De aceea, planul de service trebuie să includă mentenanță preventivă, triere rapidă, documentare și, unde este justificat, soluții de backup.",
          "Pentru laboratoare cu volum mare, disponibilitatea consumabilelor și a pieselor devine parte din continuitate. Nu este suficient să ai echipamentul instalat; trebuie să existe un lanț operațional care susține funcționarea zilnică.",
        ],
        bullets: [
          "mentenanță preventivă și verificări periodice",
          "proceduri pentru erori și opriri",
          "plan pentru consumabile și piese critice",
          "instruire personal și documentare internă",
          "opțiuni de backup pentru teste critice",
        ],
      },
      {
        id: "buget-total-operare",
        title: "Bugetul real: achiziție plus operare",
        body: [
          "Bugetul pentru echipamente IVD nu trebuie privit doar ca achiziție. Costul total include consumabile, reactivi, mentenanță, service, calibrare, eventuale interfețe software, amenajarea spațiului și instruirea personalului. Uneori, un echipament cu preț inițial mai mic poate avea costuri operaționale mai mari sau suport mai dificil.",
          "Un calculator de laborator IVD poate ajuta la o primă orientare, dar estimarea rămâne preliminară. Pentru o decizie comercială reală trebuie analizate volumul, meniul de teste, condițiile spațiului, suportul dorit și planul de creștere al laboratorului.",
        ],
        callout: {
          title: "Estimare orientativă",
          body: "Discuțiile despre buget pentru IVD trebuie tratate ca orientare preliminară, nu ca ofertă tehnică sau comercială finală.",
        },
      },
      {
        id: "greseli-frecvente",
        title: "Greșeli frecvente în alegerea echipamentelor IVD",
        body: [
          "O greșeală frecventă este alegerea echipamentului înainte de definirea fluxului. Alta este ignorarea service-ului și a consumabilelor până după achiziție. În laborator, aceste decizii apar rapid în costuri, întârzieri și utilizare sub nivelul așteptat.",
          "Mai există și riscul de a proiecta spațiul ca pe un simplu cabinet tehnic. Laboratorul are zone, trasee, depozitare, condiții de mediu și proceduri. Dacă ele sunt aglomerate sau neclare, echipamentele performante nu livrează eficiența așteptată.",
        ],
        bullets: [
          "alegere pe preț inițial, fără cost total de operare",
          "subestimarea consumabilelor și a mentenanței",
          "lipsa spațiului pentru probe, reactivi și deșeuri",
          "integrare digitală amânată prea mult",
          "fără plan de service și continuitate",
        ],
      },
      {
        id: "cum-ajuta-zes",
        title: "Cum poate ajuta ZES în proiecte IVD",
        body: [
          "ZES poate aborda laboratorul prin infrastructură, echipamente, integrare și service. Scopul este ca alegerea aparaturii să fie conectată la flux, spațiu, capacitate, buget orientativ și continuitate operațională.",
          "Pentru o primă structurare, poți folosi calculatorul de cost laborator IVD sau Proposal Builder. Pentru proiecte cu achiziții, integrare și service, o discuție tehnică ajută la clarificarea cerințelor înainte de ofertare.",
        ],
      },
    ],
    faqs: [
      {
        question: "Cum aleg echipamentele IVD pentru un laborator nou?",
        answer:
          "Începe cu fluxul de probe, volumul estimat, meniul de teste, personalul, spațiul, integrarea digitală și planul de service. Abia apoi compară echipamentele.",
      },
      {
        question: "Prețul de achiziție este cel mai important criteriu?",
        answer:
          "Nu. Contează costul total de operare: consumabile, mentenanță, calibrare, service, integrare, instruire și eventuale adaptări ale spațiului.",
      },
      {
        question: "Ce înseamnă integrarea echipamentelor IVD?",
        answer:
          "Înseamnă amplasare, condiții tehnice, utilități, workflow, conectivitate, raportare, instruire și pregătirea pentru service.",
      },
      {
        question: "De ce sunt importante calibrarea și validarea?",
        answer:
          "Pentru că susțin performanța, încrederea în rezultate și operarea controlată. Ele trebuie incluse în planul de instalare și operare.",
      },
      {
        question: "Laboratorul are nevoie de plan de service?",
        answer:
          "Da. Un plan de service reduce riscul de opriri prelungite, clarifică reacția la incidente și ajută la menținerea continuității operaționale.",
      },
    ],
    relatedArticles: [
      "ghid-pentru-echipamente-ivd-si-laborator",
      "cum-alegi-aparatura-medicala-pentru-o-clinica",
      "mentenanta-aparaturii-medicale-ce-trebuie-urmarit",
      "cum-se-construieste-o-clinica-medicala-in-romania",
    ],
    cta: {
      title: "Planifici un laborator IVD?",
      description:
        "Structurează fluxul, echipamentele, integrarea, calibrarea și service-ul înainte de achiziție.",
      label: "Calculează orientativ laboratorul IVD",
      href: "/calculatoare/cost-laborator-ivd",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "diferenta-rmn-ct-infrastructura",
    title: "Ce diferență este între RMN și CT din punct de vedere al infrastructurii",
    description:
      "Explicație practică despre diferențele de infrastructură dintre RMN și CT: RF shielding, protecție radiologică, HVAC, autorizări, integrare și riscuri de proiectare.",
    category: "Imagistică",
    tags: [
      "RMN vs CT",
      "infrastructură imagistică",
      "RF shielding",
      "protecție radiologică",
      "camera RMN",
      "camera CT",
    ],
    readingTime: "11 min",
    targetKeyword: "diferenta RMN CT infrastructura",
    relatedServices: [
      "/services/imagistica-medicala",
      "/services/radiologie",
      "/services/rf-shielding",
      "/services/protectie-radiologica",
      "/services/aparatura-medicala",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "RMN și CT sunt ambele echipamente de imagistică medicală, dar din punct de vedere al infrastructurii sunt proiecte diferite. Confuzia dintre ele duce la bugete greșite, camere proiectate incomplet și riscuri în autorizare sau operare. RMN-ul cere control electromagnetic și RF shielding. CT-ul cere protecție radiologică, zone controlate și coordonare cu cerințele aplicabile echipamentelor cu radiații ionizante.",
    sections: [
      {
        id: "principiul-de-baza",
        title: "Principiul de bază: RMN nu este CT",
        body: [
          "RMN-ul funcționează cu câmp magnetic și radiofrecvență, nu cu radiații ionizante. De aceea, camera RMN trebuie gândită în jurul performanței electromagnetice: cușcă Faraday, ușă RF, filtre, penetrări controlate, HVAC, vibrații, acces pentru magnet și condiții de mediu stabile.",
          "CT-ul folosește radiații ionizante. Pentru camera CT, infrastructura se concentrează pe protecție radiologică, ecranare cu plumb sau soluții echivalente, uși și geamuri protejate, poziționare, zone controlate, documentație și pași CNCAN unde este cazul.",
        ],
        callout: {
          title: "Distincție esențială",
          body: "RF shielding-ul este specific camerei RMN. Protecția radiologică și CNCAN sunt relevante pentru CT/RX și alte echipamente cu radiații ionizante.",
        },
      },
      {
        id: "camera-rmn",
        title: "Ce cere infrastructura pentru RMN",
        body: [
          "O cameră RMN trebuie să protejeze echipamentul și calitatea imaginii de interferențe radiofrecvență. Asta înseamnă o anvelopă RF coerentă, fără întreruperi necontrolate. Orice trecere pentru cabluri, ventilație, gaze, conducte sau accesorii trebuie tratată prin soluții compatibile cu ecranarea.",
          "Pe lângă RF shielding, RMN-ul cere atenție la HVAC, răcire, umiditate, vibrații, acces pentru instalare și spațiu de service. Camera tehnică, traseele de cabluri și cerințele producătorului echipamentului trebuie analizate înainte de execuție, nu după livrarea aparatului.",
        ],
        bullets: [
          "cușcă Faraday, ușă RF, filtre și waveguides",
          "controlul penetrărilor prin ecranare",
          "HVAC, răcire, vibrații și condiții de mediu",
          "acces pentru instalare și mentenanță",
        ],
      },
      {
        id: "camera-ct",
        title: "Ce cere infrastructura pentru CT",
        body: [
          "Camera CT este proiectată în jurul siguranței radiologice și al fluxului de operare. Contează poziția gantry-ului, direcțiile de expunere, zona operatorului, pereții și încăperile adiacente, accesul pacientului, ușa camerei și geamul de vizualizare.",
          "Protecția radiologică poate include materiale cu plumb sau soluții echivalente validate tehnic. Layout-ul nu trebuie schimbat după stabilirea soluției fără reevaluare, deoarece mutarea echipamentului, ușii sau zonei operatorului poate afecta protecția.",
        ],
        bullets: [
          "ecranare cu plumb sau soluții echivalente",
          "uși și geamuri cu protecție radiologică",
          "zone controlate și vecinătăți analizate",
          "coordonare cu documentația CNCAN unde este cazul",
        ],
      },
      {
        id: "buget-si-calendar",
        title: "De ce bugetul și calendarul sunt diferite",
        body: [
          "Un buget RMN poate fi influențat puternic de RF shielding, HVAC, accesul magnetului și condițiile camerei. Un buget CT poate fi influențat de protecția radiologică, calculul de ecranare, autorizare și poziționarea față de spațiile vecine.",
          "În ambele cazuri, echipamentul schimbă infrastructura. Modelul ales dictează alimentarea, răcirea, spațiul de service, traseele și cerințele de instalare. De aceea, comparația simplă RMN vs CT prin suprafață sau finisaje nu este relevantă.",
        ],
      },
      {
        id: "cum-verifici-proiectul",
        title: "Cum verifici ce tip de infrastructură ai nevoie",
        body: [
          "Primul pas este clarificarea echipamentului: RMN, CT, RX sau combinație. Apoi trebuie analizate spațiul, clădirea, vecinătățile, documentația, instalațiile și stadiul proiectului. Pentru proiecte mixte, separarea cerințelor este obligatorie: nu există o singură soluție de ecranare pentru toate tipurile de imagistică.",
          "Radiology Room Planner poate ajuta la trierea inițială, iar Proposal Builder poate structura fazele, riscurile și bugetul orientativ. Pentru decizia finală este nevoie de validare tehnică pe planuri și specificații de echipament.",
        ],
      },
    ],
    faqs: [
      {
        question: "RMN-ul are nevoie de protecție cu plumb?",
        answer:
          "În mod obișnuit, nu. RMN-ul are nevoie de RF shielding pentru control electromagnetic, nu de plumb pentru radiații ionizante.",
      },
      {
        question: "CT-ul are nevoie de cușcă Faraday?",
        answer:
          "Nu în logica unei camere RMN. Pentru CT contează protecția radiologică, ecranarea cu plumb sau soluții echivalente și zonele controlate.",
      },
      {
        question: "CNCAN se aplică la RMN?",
        answer:
          "CNCAN este relevant pentru echipamente cu radiații ionizante, precum CT/RX. Nu trebuie confundat cu RF shielding-ul pentru RMN.",
      },
      {
        question: "Care cameră este mai complexă, RMN sau CT?",
        answer:
          "Depinde de spațiu și echipament. RMN-ul are complexitate RF, HVAC și integrare magnetică. CT-ul are complexitate radiologică, CNCAN și protecție cu plumb.",
      },
      {
        question: "Pot planifica o cameră fără modelul exact de echipament?",
        answer:
          "Se poate face o orientare, dar proiectarea serioasă cere specificații de echipament pentru alimentare, răcire, spațiu, greutate și service.",
      },
    ],
    relatedArticles: [
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      "cost-camera-rmn-romania",
      "cost-camera-ct-romania",
      "modernizare-radiologie-clinica",
    ],
    cta: {
      title: "Ai un proiect RMN sau CT?",
      description:
        "Clarifică diferențele de infrastructură înainte de buget, autorizări sau achiziția echipamentului.",
      label: "Planifică în Radiology Room Planner",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "camera-faraday-rmn",
    title: "Ce este camera Faraday pentru RMN și când este necesară",
    description:
      "Ghid despre camera Faraday pentru RMN: rolul RF shielding-ului, uși RF, filtre, waveguides, penetrări, testare și riscuri de proiectare.",
    category: "RF shielding",
    tags: [
      "camera Faraday RMN",
      "cușcă Faraday",
      "RF shielding",
      "camera RMN",
      "uși RF",
      "filtre RF",
    ],
    readingTime: "10 min",
    targetKeyword: "camera Faraday RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Contact ZES", href: "/contact" },
    ],
    intro:
      "Camera Faraday pentru RMN este anvelopa tehnică prin care camera este protejată de interferențe radiofrecvență. În limbaj de proiect, vorbim despre RF shielding: pereți, tavan, pardoseală, ușă RF, filtre, waveguides și toate detaliile care mențin integritatea electromagnetică a camerei. Nu este o soluție decorativă și nu este același lucru cu ecranarea cu plumb pentru CT sau RX.",
    sections: [
      {
        id: "rolul-camerei-faraday",
        title: "Rolul camerei Faraday în RMN",
        body: [
          "RMN-ul este sensibil la interferențe radiofrecvență. Aceste interferențe pot afecta calitatea imaginii, stabilitatea investigației și performanța camerei. Camera Faraday are rolul de a crea o barieră controlată între mediul exterior și zona de examinare.",
          "Performanța nu depinde doar de materialele folosite, ci de continuitatea întregului sistem. O îmbinare slabă, o ușă nepotrivită sau o trecere necontrolată prin ecranare poate compromite rezultatul. De aceea, RF shielding-ul trebuie proiectat și executat ca sistem, nu ca listă de materiale.",
        ],
      },
      {
        id: "componente",
        title: "Componentele principale",
        body: [
          "O cameră Faraday include suprafețe conductoare pe pereți, tavan și pardoseală, ușă RF, elemente pentru ventilație, filtre pentru cabluri și soluții speciale pentru fiecare penetrare. Fiecare componentă trebuie să contribuie la aceeași performanță de atenuare.",
          "Waveguides și filtrele permit trecerea aerului, cablurilor sau altor trasee fără a deschide camera către interferențe. Aceste detalii sunt frecvent subestimate în faze timpurii, dar pot deveni costisitoare dacă sunt adăugate după execuție.",
        ],
        bullets: [
          "anvelopă RF continuă",
          "ușă RF și feronerie compatibilă",
          "filtre pentru cabluri și alimentări",
          "waveguides pentru ventilație și treceri controlate",
          "testare de performanță după execuție",
        ],
      },
      {
        id: "cand-este-necesara",
        title: "Când este necesară",
        body: [
          "Camera Faraday este necesară pentru camere RMN în care echipamentul cere controlul interferențelor RF. Practic, este o componentă standard în planificarea unei camere RMN moderne, dar soluția exactă depinde de echipament, spațiu, clădire și cerințele producătorului.",
          "Nu trebuie confundată cu protecția radiologică. Dacă proiectul este CT sau RX, discuția se mută către plumb, zone controlate și CNCAN. Dacă proiectul este RMN, discuția se mută către RF, câmp magnetic, HVAC, vibrații și acces pentru magnet.",
        ],
        callout: {
          title: "Nu este ecranare radiologică",
          body: "Camera Faraday pentru RMN controlează interferențele radiofrecvență. Nu înlocuiește protecția radiologică pentru CT/RX și nu este o cerință CNCAN în sine.",
        },
      },
      {
        id: "greseli-frecvente",
        title: "Greșeli frecvente în proiectarea camerei Faraday",
        body: [
          "Prima greșeală este proiectarea camerei RMN fără lista completă de penetrări. HVAC-ul, cablurile, monitorizarea, accesoriile și traseele tehnice trebuie definite devreme. A doua greșeală este tratarea ușii RF ca produs separat, deși ea este parte critică din anvelopă.",
          "O altă problemă apare când mobilierul, finisajele sau echipamentele auxiliare sunt decise după instalarea RF shielding-ului. Orice modificare care trece prin anvelopa camerei trebuie coordonată tehnic.",
        ],
        bullets: [
          "trasee tehnice adăugate târziu",
          "ușă RF aleasă fără coordonare cu anvelopa",
          "lipsă spațiu pentru service și echipamente auxiliare",
          "testare amânată până după recepție",
        ],
      },
      {
        id: "planificare",
        title: "Cum se planifică responsabil",
        body: [
          "Planificarea începe cu specificațiile RMN-ului, planurile camerei și analiza clădirii. Trebuie clarificate dimensiunile, accesul pentru magnet, poziția camerei tehnice, traseele, HVAC-ul, vibrațiile și condițiile de service. Abia apoi soluția RF poate fi bugetată realist.",
          "Pentru o primă orientare, calculatorul de cameră RMN și Radiology Room Planner pot evidenția riscurile. Pentru decizia finală, ZES poate valida cerințele tehnice și poate coordona RF shielding-ul cu infrastructura și integrarea echipamentului.",
        ],
      },
    ],
    faqs: [
      {
        question: "Camera Faraday este același lucru cu RF shielding?",
        answer:
          "În context RMN, termenii sunt folosiți apropiat. Camera Faraday descrie anvelopa de ecranare RF care reduce interferențele radiofrecvență.",
      },
      {
        question: "Se folosește plumb într-o cameră Faraday pentru RMN?",
        answer:
          "Plumbul este asociat cu protecția radiologică pentru CT/RX. Pentru RMN contează ecranarea RF, nu protecția la radiații ionizante.",
      },
      {
        question: "Ce poate compromite RF shielding-ul?",
        answer:
          "Penetrările necontrolate, îmbinările slabe, ușile nepotrivite, filtrele lipsă și modificările târzii prin anvelopă pot reduce performanța.",
      },
      {
        question: "Când se testează camera Faraday?",
        answer:
          "Testarea trebuie planificată după execuția ecranării și înainte de acceptarea finală, conform cerințelor proiectului și echipamentului.",
      },
      {
        question: "Cine trebuie implicat în planificare?",
        answer:
          "Beneficiarul, furnizorul RMN, echipa de proiectare, integratorul RF shielding și specialiștii în infrastructură medicală.",
      },
    ],
    relatedArticles: [
      "diferenta-rmn-ct-infrastructura",
      "cost-camera-rmn-romania",
      "greseli-critice-in-proiectarea-camerelor-rmn",
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
    ],
    cta: {
      title: "Verifică cerințele RF pentru camera RMN",
      description:
        "Clarifică anvelopa RF, penetrările, HVAC-ul, accesul și integrarea echipamentului înainte de execuție.",
      label: "Calculează camera RMN",
      href: "/calculatoare/cost-camera-rmn",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "protectie-radiologica-camera-rx",
    title: "Ce presupune protecția radiologică pentru o cameră RX",
    description:
      "Ghid practic despre protecția radiologică pentru camera RX: ecranare cu plumb, uși, geamuri, zone controlate, CNCAN și greșeli de proiectare.",
    category: "Protecție radiologică",
    tags: [
      "protecție radiologică RX",
      "camera RX",
      "ecranare cu plumb",
      "CNCAN",
      "radiologie",
      "zone controlate",
    ],
    readingTime: "10 min",
    targetKeyword: "protectie radiologica camera RX",
    relatedServices: [
      "/services/protectie-radiologica",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Ghid autorizare CNCAN", href: "/ghiduri/autorizare-cncan" },
    ],
    intro:
      "Protecția radiologică pentru o cameră RX înseamnă controlul expunerii la radiații ionizante pentru pacienți, personal și spațiile din jur. Nu este o simplă finisare a camerei și nu trebuie confundată cu RF shielding-ul pentru RMN. O cameră RX bine planificată pornește de la echipament, layout, vecinătăți, zone controlate și documentație tehnică.",
    sections: [
      {
        id: "ce-inseamna-protectie-radiologica",
        title: "Ce înseamnă protecție radiologică",
        body: [
          "Protecția radiologică este ansamblul de măsuri prin care radiațiile ionizante sunt controlate în camera RX și în spațiile adiacente. Poate include pereți protejați, uși cu plumb, geam de protecție, poziționarea echipamentului, reguli de acces și documentație.",
          "Soluția depinde de echipament, utilizare, vecinătăți și fluxul camerei. O cameră RX lângă o zonă circulată are alte riscuri decât una amplasată într-o zonă tehnică. De aceea, nu există o soluție universală valabilă pentru toate camerele.",
        ],
      },
      {
        id: "elemente-tehnice",
        title: "Elementele tehnice ale unei camere RX",
        body: [
          "În proiectare se analizează pereții, ușa, geamul operatorului, tavanul, pardoseala, poziția echipamentului și direcțiile de expunere. Protecția poate folosi plumb sau soluții echivalente, dar alegerea trebuie validată tehnic pentru situația reală.",
          "Camera operatorului și traseul pacientului sunt importante. Operatorul trebuie să aibă vizibilitate și control, iar accesul trebuie gândit astfel încât camera să funcționeze predictibil și sigur.",
        ],
        bullets: [
          "pereți și uși cu protecție radiologică",
          "geam de protecție pentru zona operatorului",
          "poziționarea echipamentului și a fasciculului",
          "zone adiacente și nivel de ocupare",
          "documentație pentru pașii CNCAN unde este cazul",
        ],
      },
      {
        id: "cncan-si-rx",
        title: "CNCAN și camera RX",
        body: [
          "Pentru camere RX, CNCAN poate fi relevant deoarece echipamentul implică radiații ionizante. Pașii exacți trebuie validați pentru fiecare proiect, dar planificarea camerei ar trebui să țină cont din timp de documentație și protecție radiologică.",
          "Este riscant să se execute camera și abia apoi să se caute completarea documentației. Modificările cerute după execuție pot afecta uși, pereți, geamuri, poziția echipamentului sau zonele din jur.",
        ],
        callout: {
          title: "Atenție la confuzii",
          body: "CNCAN privește radiațiile ionizante și protecția radiologică. Nu este același lucru cu RF shielding-ul folosit la camere RMN.",
        },
      },
      {
        id: "greseli-de-evitat",
        title: "Greșeli de evitat",
        body: [
          "Una dintre cele mai frecvente greșeli este alegerea camerei RX după criterii de spațiu liber, nu după criterii tehnice. Vecinătățile, fluxul și poziția echipamentului pot conta mai mult decât suprafața aparent disponibilă.",
          "O altă greșeală este modificarea layout-ului după stabilirea protecției. Schimbarea ușii, mutarea echipamentului sau schimbarea destinației unei camere vecine pot necesita reevaluare.",
        ],
        bullets: [
          "protecție radiologică bugetată prea târziu",
          "echipament ales fără verificarea camerei",
          "zone controlate neclare",
          "geam sau ușă nepotrivite pentru cerințele camerei",
        ],
      },
      {
        id: "pasii-recomandati",
        title: "Pașii recomandați înainte de execuție",
        body: [
          "Pregătește planurile, echipamentul dorit, destinația încăperilor vecine și stadiul documentației. Apoi verifică protecția radiologică, fluxurile, zona operatorului și modul în care camera se integrează în clinică.",
          "Radiology Room Planner și Proposal Builder pot ajuta la structurarea riscurilor. Pentru ofertare finală este nevoie de verificare tehnică și documentație aplicată proiectului.",
        ],
      },
    ],
    faqs: [
      {
        question: "Camera RX are nevoie de plumb?",
        answer:
          "De multe ori, protecția radiologică implică plumb sau soluții echivalente, dar soluția exactă depinde de echipament, cameră și vecinătăți.",
      },
      {
        question: "RF shielding-ul este relevant pentru RX?",
        answer:
          "Nu în logica unei camere RMN. RX-ul implică protecție radiologică, nu cușcă Faraday pentru control RF.",
      },
      {
        question: "Când trebuie analizată protecția radiologică?",
        answer:
          "Înainte de execuție și înainte de blocarea layout-ului. Protecția influențează pereții, ușile, geamul, poziționarea și documentația.",
      },
      {
        question: "Camera RX intră în zona CNCAN?",
        answer:
          "Echipamentele RX folosesc radiații ionizante, deci cerințele relevante trebuie verificate pentru proiect. Nu se recomandă presupuneri generale.",
      },
      {
        question: "Ce informații sunt necesare la început?",
        answer:
          "Planuri, echipament vizat, utilizare estimată, vecinătăți, fluxuri, stadiu documentație și orice cerințe tehnice ale furnizorului.",
      },
    ],
    relatedArticles: [
      "autorizare-cncan-pas-cu-pas",
      "diferenta-rmn-ct-infrastructura",
      "cost-camera-ct-romania",
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
    ],
    cta: {
      title: "Pregătești o cameră RX?",
      description:
        "Verifică protecția radiologică, zonele controlate și documentația înainte de execuție.",
      label: "Planifică în Radiology Room Planner",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "verificari-inainte-instalare-ct",
    title: "Ce verificări sunt necesare înainte de instalarea unui CT",
    description:
      "Checklist tehnic pentru instalarea unui CT: spațiu, protecție radiologică, CNCAN, alimentare, HVAC, acces, integrare și service.",
    category: "Radiologie",
    tags: [
      "instalare CT",
      "verificări CT",
      "camera CT",
      "CNCAN",
      "protecție radiologică",
      "integrare CT",
    ],
    readingTime: "11 min",
    targetKeyword: "verificari inainte instalare CT",
    relatedServices: [
      "/services/radiologie",
      "/services/protectie-radiologica",
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Service Diagnostic", href: "/service-diagnostic" },
    ],
    intro:
      "Instalarea unui CT nu începe în ziua livrării echipamentului. Înainte ca aparatul să ajungă în clinică, spațiul trebuie verificat tehnic: protecție radiologică, acces, alimentare, HVAC, structură, trasee de cabluri, documentație și integrare. O verificare făcută târziu poate transforma instalarea într-o succesiune de remedieri costisitoare.",
    sections: [
      {
        id: "spatiu-si-layout",
        title: "Spațiul și layout-ul camerei",
        body: [
          "Camera CT trebuie verificată în raport cu dimensiunile echipamentului, zona operatorului, accesul pacientului, spațiul de service și vecinătățile. Nu este suficient ca aparatul să încapă fizic. Trebuie să existe spațiu pentru operare, mentenanță și intervenții ulterioare.",
          "Layout-ul influențează protecția radiologică și fluxul. Mutarea unei uși sau schimbarea poziției gantry-ului poate cere reevaluare. De aceea, planul final trebuie blocat înainte de execuția protecției.",
        ],
      },
      {
        id: "protectie-radiologica",
        title: "Protecție radiologică și zone controlate",
        body: [
          "CT-ul implică radiații ionizante, deci camera trebuie analizată prin protecție radiologică. Pereții, ușile, geamurile, planșeele și zonele adiacente pot necesita soluții specifice, în funcție de echipament și utilizare.",
          "Această verificare nu are legătură cu RF shielding-ul pentru RMN. Pentru CT contează radiația, ecranarea cu plumb sau soluții echivalente, zonele controlate și documentația asociată.",
        ],
        callout: {
          title: "CT nu cere cușcă Faraday",
          body: "Înainte de instalarea CT-ului, verificarea critică este protecția radiologică, nu RF shielding-ul specific RMN-ului.",
        },
      },
      {
        id: "instalatii",
        title: "Alimentare, HVAC și infrastructură tehnică",
        body: [
          "Specificațiile echipamentului dictează alimentarea electrică, răcirea, condițiile de mediu, traseele de date și cerințele pentru camera tehnică. Aceste date trebuie verificate cu furnizorul echipamentului înainte de instalare.",
          "HVAC-ul subdimensionat, traseele de cabluri improvizate sau lipsa spațiului pentru service pot afecta funcționarea și mentenanța. Într-un CT, infrastructura slab pregătită nu se vede întotdeauna la început, dar poate crea incidente operaționale.",
        ],
        bullets: [
          "alimentare electrică și protecții dedicate",
          "răcire, ventilație și condiții de mediu",
          "trasee de date și conectivitate",
          "spațiu pentru service și acces la componente",
        ],
      },
      {
        id: "documentatie-cncan",
        title: "Documentație și pași CNCAN",
        body: [
          "Pentru CT, documentația relevantă trebuie pregătită înainte de punerea în operare. Pașii exacți depind de proiect și trebuie validați cu specialiști, dar planificarea protecției radiologice și a camerei nu poate fi lăsată pentru final.",
          "Dacă documentația, layout-ul și execuția nu sunt coerente, apar întârzieri. Camera trebuie să corespundă planului pe baza căruia a fost gândită protecția.",
        ],
      },
      {
        id: "integrare-si-service",
        title: "Integrare, testare și service",
        body: [
          "Instalarea CT-ului include integrarea în fluxul clinicii: conectivitate, raportare, acces operator, programări, mentenanță și suport tehnic. După montaj, testarea și recepția trebuie să confirme că echipamentul și camera funcționează împreună.",
          "Pentru proiecte aflate în bugetare, calculatorul de cameră CT poate oferi o primă orientare. Pentru o propunere tehnică structurată, Proposal Builder ajută la organizarea fazelor, riscurilor și informațiilor lipsă.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce verificare este critică înainte de instalarea CT-ului?",
        answer:
          "Protecția radiologică, layout-ul, alimentarea, HVAC-ul, accesul și documentația trebuie verificate înainte de livrarea echipamentului.",
      },
      {
        question: "Poate fi instalat CT-ul într-o cameră existentă?",
        answer:
          "Da, uneori, dar camera trebuie evaluată tehnic. Spațiul, vecinătățile, protecția și instalațiile pot necesita adaptări.",
      },
      {
        question: "Când trebuie discutat CNCAN?",
        answer:
          "Din faza de planificare, nu după execuție. CT-ul implică radiații ionizante și trebuie tratat responsabil.",
      },
      {
        question: "Este suficientă verificarea furnizorului de echipament?",
        answer:
          "Furnizorul echipamentului este esențial, dar camera trebuie coordonată și cu infrastructura, protecția radiologică și operarea clinicii.",
      },
      {
        question: "Cum reduc riscul de întârziere la instalare?",
        answer:
          "Blochează layout-ul, validează protecția radiologică, verifică instalațiile și pregătește documentația înainte de livrare.",
      },
    ],
    relatedArticles: [
      "cost-camera-ct-romania",
      "autorizare-cncan-pas-cu-pas",
      "protectie-radiologica-camera-rx",
      "modernizare-radiologie-clinica",
    ],
    cta: {
      title: "Pregătești instalarea unui CT?",
      description:
        "Verifică spațiul, protecția radiologică, instalațiile și pașii de integrare înainte de livrare.",
      label: "Calculează camera CT",
      href: "/calculatoare/cost-camera-ct",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "pregatire-instalare-rmn",
    title: "Ce trebuie pregătit înainte de instalarea unui RMN",
    description:
      "Checklist tehnic pentru instalarea RMN: acces magnet, RF shielding, cușcă Faraday, HVAC, vibrații, camera tehnică, service și integrare.",
    category: "RF shielding",
    tags: [
      "instalare RMN",
      "pregătire cameră RMN",
      "RF shielding",
      "cușcă Faraday",
      "HVAC RMN",
      "integrare RMN",
    ],
    readingTime: "11 min",
    targetKeyword: "pregatire instalare RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Contact ZES", href: "/contact" },
    ],
    intro:
      "Instalarea unui RMN cere o pregătire diferită de instalarea unui CT sau RX. Înainte de livrarea magnetului, trebuie clarificate accesul, RF shielding-ul, camera Faraday, HVAC-ul, vibrațiile, camera tehnică, traseele și condițiile de service. O cameră RMN pregătită superficial poate funcționa sub așteptări sau poate necesita corecții dificile după instalare.",
    sections: [
      {
        id: "acces-magnet",
        title: "Accesul pentru magnet și echipamente auxiliare",
        body: [
          "Primul risc practic este accesul fizic. Magnetul poate avea dimensiuni, greutate și cerințe de manipulare care depășesc accesul obișnuit al unei clădiri. Traseul de la exterior până în cameră trebuie verificat: uși, holuri, înălțimi, planșee, lifturi, zone de întoarcere și eventuale lucrări temporare.",
          "Accesul nu se verifică doar pentru instalare. Trebuie gândit și pentru service, înlocuiri și intervenții viitoare. Dacă totul este construit fără această perspectivă, orice problemă majoră poate deveni o intervenție complicată.",
        ],
      },
      {
        id: "rf-shielding",
        title: "RF shielding și camera Faraday",
        body: [
          "Pentru RMN, RF shielding-ul este una dintre cerințele centrale. Camera trebuie protejată împotriva interferențelor radiofrecvență printr-o anvelopă coerentă: pereți, tavan, pardoseală, ușă RF, filtre și penetrări controlate.",
          "Această ecranare nu este protecție cu plumb și nu are aceeași logică precum camera CT/RX. Nu urmărește radiații ionizante, ci integritate electromagnetică și calitatea imaginii RMN.",
        ],
        callout: {
          title: "RMN înseamnă RF, nu plumb",
          body: "Pentru instalarea RMN, verifică RF shielding-ul, ușa RF, filtrele, waveguides și toate trecerile prin anvelopă. Plumbul aparține protecției radiologice pentru CT/RX.",
        },
      },
      {
        id: "hva-vibratii",
        title: "HVAC, vibrații și condiții de mediu",
        body: [
          "RMN-ul are nevoie de condiții stabile de mediu. Temperatura, umiditatea, răcirea, schimburile de aer și poziționarea echipamentelor auxiliare trebuie corelate cu cerințele producătorului. HVAC-ul nu este doar confort pentru pacient, ci parte din performanța camerei.",
          "Vibrațiile pot afecta funcționarea și calitatea investigațiilor. Trebuie analizate sursele din clădire, echipamentele mecanice, traficul intern și structura. Aceste verificări sunt mai ușor de făcut înainte de execuție decât după instalare.",
        ],
      },
      {
        id: "camera-tehnica",
        title: "Camera tehnică și traseele",
        body: [
          "Camera RMN nu este doar spațiul de examinare. Camera tehnică, traseele de cabluri, alimentarea, răcirea și accesul pentru service trebuie planificate împreună. Poziționarea greșită a echipamentelor auxiliare poate complica mentenanța și poate crește costurile.",
          "Toate penetrările prin camera Faraday trebuie definite devreme. Adăugarea târzie a unui cablu, unei conducte sau unui traseu de ventilație poate compromite ecranarea dacă nu este tratată corect.",
        ],
        bullets: [
          "camera tehnică dimensionată corect",
          "trasee RF-compatible",
          "acces pentru service",
          "corelare cu furnizorul echipamentului",
        ],
      },
      {
        id: "validare-finala",
        title: "Validarea înainte de instalare",
        body: [
          "Înainte de instalarea RMN, proiectul trebuie verificat cu planurile camerei, specificațiile echipamentului și soluția de RF shielding. Nu este suficient ca lucrările să fie terminate vizual. Camera trebuie să fie pregătită tehnic.",
          "Calculatorul de cameră RMN poate oferi o orientare de complexitate, iar Radiology Room Planner poate identifica riscurile. Pentru proiecte reale, ZES poate ajuta la coordonarea RF shielding-ului, infrastructurii, echipamentului și service-ului.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce trebuie verificat prima dată pentru instalarea RMN?",
        answer:
          "Accesul magnetului, dimensiunile camerei, RF shielding-ul, HVAC-ul, vibrațiile, camera tehnică și cerințele furnizorului.",
      },
      {
        question: "RMN-ul are nevoie de CNCAN?",
        answer:
          "RMN-ul nu folosește radiații ionizante ca CT/RX. Cerințele sale principale sunt RF shielding, câmp magnetic, infrastructură și integrare.",
      },
      {
        question: "Ce este cel mai riscant de adăugat târziu?",
        answer:
          "Penetrările prin anvelopa RF, traseele HVAC, cablurile, ușile și modificările care afectează cușca Faraday.",
      },
      {
        question: "Poate fi instalat RMN într-o clădire existentă?",
        answer:
          "Da, dar clădirea trebuie evaluată pentru acces, structură, vibrații, HVAC, RF shielding și spații tehnice.",
      },
      {
        question: "Când trebuie implicat integratorul RF?",
        answer:
          "Înainte de execuția camerei, ideal încă din faza de proiectare și coordonare cu furnizorul RMN.",
      },
    ],
    relatedArticles: [
      "camera-faraday-rmn",
      "cost-camera-rmn-romania",
      "greseli-critice-in-proiectarea-camerelor-rmn",
      "diferenta-rmn-ct-infrastructura",
    ],
    cta: {
      title: "Pregătești instalarea unui RMN?",
      description:
        "Clarifică accesul, RF shielding-ul, HVAC-ul, vibrațiile și integrarea înainte de livrare.",
      label: "Planifică instalarea RMN",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "alegere-aparatura-medicala-clinica",
    title: "Cum alegi aparatura medicală pentru o clinică nouă",
    description:
      "Ghid practic pentru alegerea aparaturii medicale într-o clinică nouă: fluxuri, buget, integrare, service, imagistică, IVD și continuitate operațională.",
    category: "Aparatură medicală",
    tags: [
      "aparatură medicală clinică",
      "clinică nouă",
      "echipamente medicale",
      "integrare aparatură",
      "imagistică medicală",
      "service aparatură",
    ],
    readingTime: "11 min",
    targetKeyword: "alegere aparatura medicala clinica",
    relatedServices: [
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
      "/services/service-aparatura-medicala",
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Calculator echipamente imagistică", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
    ],
    intro:
      "Alegerea aparaturii medicale pentru o clinică nouă ar trebui să pornească de la serviciile medicale, fluxurile de lucru și modelul operațional, nu doar de la o listă de produse. Un echipament bun într-un spațiu nepregătit poate deveni greu de utilizat, greu de întreținut sau subfolosit. Planificarea corectă leagă aparatura de infrastructură, personal, buget, service și creșterea viitoare a clinicii.",
    sections: [
      {
        id: "porneste-de-la-servicii",
        title: "Pornește de la serviciile clinicii",
        body: [
          "Primul pas este clarificarea serviciilor medicale care vor fi oferite. Consultațiile, tratamentele, imagistica, recoltarea, laboratorul, recuperarea sau procedurile au cerințe diferite. Aparatura trebuie aleasă în funcție de flux, volum, specialități și nivelul de complexitate dorit.",
          "O clinică nouă are avantajul planificării de la zero. Dacă echipamentele sunt decise devreme, spațiul, instalațiile, mobilierul, datele și service-ul pot fi pregătite coerent. Dacă sunt decise târziu, proiectul poate necesita modificări costisitoare.",
        ],
        bullets: [
          "specialități medicale și servicii oferite",
          "volum estimat de pacienți",
          "fluxuri de personal, pacient și materiale",
          "nevoi de imagistică, IVD sau tratament",
        ],
      },
      {
        id: "buget-total",
        title: "Nu compara doar prețul de achiziție",
        body: [
          "Costul real al aparaturii include achiziția, livrarea, instalarea, consumabilele, mentenanța, service-ul, instruirea, integrarea digitală și eventualele lucrări de infrastructură. Un echipament ieftin la achiziție poate deveni scump dacă are consumabile greu disponibile sau suport tehnic dificil.",
          "Pentru clinicile noi, este utilă împărțirea pe categorii: aparatură de bază, imagistică, IVD/laborator, echipamente auxiliare, mobilier medical, service și buget de rezervă. Această structură oferă o imagine mai realistă decât o listă lungă de produse.",
        ],
      },
      {
        id: "integrare-infrastructura",
        title: "Aparatura schimbă infrastructura",
        body: [
          "Unele echipamente cer alimentări dedicate, rețea de date, apă, evacuare, ventilație, spațiu de service, condiții de temperatură sau protecții speciale. Imagistica poate schimba complet proiectul: RMN cere RF shielding, CT/RX cere protecție radiologică și documentație specifică.",
          "De aceea, alegerea aparaturii nu trebuie separată de proiectarea clinicii. O decizie luată târziu poate afecta pereți, trasee, camere tehnice, acces, HVAC și calendarul de deschidere.",
        ],
        callout: {
          title: "Aparatura nu este mobilier",
          body: "Echipamentele medicale trebuie integrate în spațiu, instalații, service și fluxuri. Nu se tratează ca obiecte adăugate după amenajare.",
        },
      },
      {
        id: "service-si-continuitate",
        title: "Service-ul trebuie gândit înainte de cumpărare",
        body: [
          "Înainte de achiziție, întreabă ce se întâmplă dacă echipamentul se oprește: cine intervine, în cât timp, ce piese sunt disponibile, cum se face mentenanța și ce impact are oprirea asupra clinicii. Pentru aparatura critică, planul de service este parte din decizia de achiziție.",
          "Continuitatea operațională contează mai ales pentru imagistică, laborator și echipamente cu volum mare de utilizare. Dacă o oprire blochează programările, costul riscului trebuie luat în calcul de la început.",
        ],
      },
      {
        id: "cum-structurezi-decizia",
        title: "Cum structurezi decizia de echipare",
        body: [
          "O abordare practică începe cu lista de servicii, apoi definește echipamentele obligatorii, echipamentele care pot fi fazate, cerințele de infrastructură și planul de service. Nu toate achizițiile trebuie făcute în prima zi, dar spațiul trebuie pregătit pentru dezvoltare.",
          "Calculatorul de proiect medical și Proposal Builder pot ajuta la structurarea bugetului orientativ, a fazelor și a riscurilor. Pentru decizie finală, ZES poate valida conexiunea dintre aparatură, infrastructură și service.",
        ],
      },
    ],
    faqs: [
      {
        question: "Când trebuie aleasă aparatura pentru o clinică nouă?",
        answer:
          "Cât mai devreme în proiect, deoarece aparatura influențează spațiul, instalațiile, fluxurile, service-ul și bugetul.",
      },
      {
        question: "Este mai bine să cumpăr totul din prima?",
        answer:
          "Nu întotdeauna. Unele achiziții pot fi fazate, dar infrastructura trebuie pregătită pentru direcția de dezvoltare a clinicii.",
      },
      {
        question: "Ce echipamente schimbă cel mai mult proiectul?",
        answer:
          "Imagistica, IVD/laboratorul și echipamentele cu cerințe speciale de alimentare, HVAC, protecție sau service pot schimba semnificativ proiectul.",
      },
      {
        question: "Cum compar două oferte de aparatură?",
        answer:
          "Compară nu doar prețul, ci costul total de operare, consumabilele, service-ul, integrarea, disponibilitatea pieselor și impactul asupra spațiului.",
      },
      {
        question: "Poate ZES ajuta la alegerea aparaturii?",
        answer:
          "ZES poate ajuta prin consultanță tehnică, integrare, planificare infrastructură, imagistică, IVD și service specializat.",
      },
    ],
    relatedArticles: [
      "cum-alegi-aparatura-medicala-pentru-o-clinica",
      "echipamente-ivd-laborator-alegere-integrare-service",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
      "cum-se-construieste-o-clinica-medicala-in-romania",
    ],
    cta: {
      title: "Echipezi o clinică nouă?",
      description:
        "Structurează aparatura, infrastructura, bugetul și service-ul înainte de achiziții.",
      label: "Generează o propunere preliminară",
      href: "/proposal-builder",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "echipamente-necesare-laborator-ivd",
    title: "Ce echipamente sunt necesare într-un laborator IVD",
    description:
      "Ghid pentru echiparea unui laborator IVD: analizatoare, workflow, probe, consumabile, integrare, calibrare, validare și service.",
    category: "IVD / laborator",
    tags: [
      "echipamente laborator IVD",
      "laborator medical",
      "analizoare IVD",
      "workflow laborator",
      "calibrare",
      "service laborator",
    ],
    readingTime: "10 min",
    targetKeyword: "echipamente necesare laborator IVD",
    relatedServices: [
      "/services/ivd-laborator",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Ghid IVD / laborator", href: "/ghiduri/echipamente-ivd-laborator" },
    ],
    intro:
      "Un laborator IVD nu se definește doar prin lista de analizoare. Echipamentele necesare depind de tipul probelor, volumul estimat, meniul de teste, timpul de răspuns, spațiul disponibil, integrarea digitală, consumabile și service. O listă corectă începe cu workflow-ul laboratorului și se transformă apoi în aparatură, infrastructură și plan de operare.",
    sections: [
      {
        id: "workflow-laborator",
        title: "Începe cu workflow-ul probelor",
        body: [
          "Înainte de alegerea echipamentelor, definește traseul probelor: recepție, identificare, pregătire, analiză, validare, raportare și arhivare. Fiecare etapă poate cere echipamente, spații, consumabile și proceduri diferite.",
          "Un laborator cu volum mic poate funcționa cu o configurație compactă, dar un laborator cu volum ridicat are nevoie de capacitate, redundanță și integrare digitală. Alegerea fără această analiză poate duce la echipamente subdimensionate sau inutil de complexe.",
        ],
      },
      {
        id: "categorii-echipamente",
        title: "Categorii de echipamente IVD",
        body: [
          "Lista depinde de profilul laboratorului, dar poate include analizoare pentru biochimie, hematologie, imunologie, coagulare, urină, microbiologie sau alte zone specializate. Pe lângă acestea apar centrifuge, sisteme de pregătire probe, frigidere, congelatoare, echipamente auxiliare și sisteme de raportare.",
          "Nu toate laboratoarele au nevoie de toate categoriile. Decizia trebuie legată de meniul de teste, volumul estimat, specializarea clinicii și nivelul de externalizare acceptat.",
        ],
        bullets: [
          "analizoare principale și echipamente auxiliare",
          "sisteme pentru pregătirea și păstrarea probelor",
          "consumabile, reactivi și control calitate",
          "software, conectivitate și raportare",
          "plan de service și mentenanță",
        ],
      },
      {
        id: "spatiu-si-utilitati",
        title: "Spațiul și utilitățile laboratorului",
        body: [
          "Echipamentele IVD pot cere alimentare electrică, apă, evacuare, temperatură controlată, ventilație, mese tehnice, spațiu pentru consumabile și zone de lucru separate. Dacă spațiul nu este pregătit, echipamentele pot funcționa cu dificultăți sau pot aglomera fluxul.",
          "Amenajarea trebuie să țină cont de mișcarea probelor, a personalului, a consumabilelor și a deșeurilor. Un laborator eficient nu este doar dotat, ci organizat.",
        ],
      },
      {
        id: "calibrare-validare-service",
        title: "Calibrare, validare și service",
        body: [
          "Instalarea echipamentelor trebuie urmată de configurare, calibrare, validare și instruire. Aceste etape susțin încrederea în rezultate și reduc riscul de operare inconsistentă.",
          "Service-ul trebuie planificat din faza de achiziție. Pentru echipamente critice, timpul de reacție, disponibilitatea consumabilelor și pieselor, istoricul de mentenanță și suportul tehnic pot fi la fel de importante ca performanța declarată.",
        ],
        callout: {
          title: "IVD înseamnă workflow",
          body: "Un laborator IVD bun se proiectează în jurul probelor, rezultatelor, controlului calității și continuității operaționale, nu doar în jurul analizatoarelor.",
        },
      },
      {
        id: "cum-bugetezi",
        title: "Cum bugetezi un laborator IVD",
        body: [
          "Bugetarea trebuie să includă aparatura, mobilierul tehnic, utilitățile, consumabilele inițiale, calibrarea, validarea, integrarea digitală, service-ul și eventualele adaptări de spațiu. Fără aceste categorii, estimarea poate părea mică la început și insuficientă în implementare.",
          "Calculatorul de laborator IVD poate ajuta la o primă orientare, iar Proposal Builder poate organiza fazele și riscurile într-un sumar tehnic preliminar. Estimările rămân orientative până la validarea proiectului.",
        ],
      },
    ],
    faqs: [
      {
        question: "Există o listă standard de echipamente IVD?",
        answer:
          "Nu una universală. Lista depinde de meniul de teste, volumul probelor, spațiu, personal, integrare și nivelul de externalizare.",
      },
      {
        question: "Ce echipamente sunt de obicei critice?",
        answer:
          "Analizoarele principale, echipamentele de pregătire probe, stocarea controlată, consumabilele și sistemele de raportare pot deveni critice.",
      },
      {
        question: "Când se face validarea echipamentelor?",
        answer:
          "După instalare și configurare, conform procedurilor aplicabile laboratorului și cerințelor echipamentului.",
      },
      {
        question: "Service-ul trebuie inclus în buget?",
        answer:
          "Da. Mentenanța, suportul, piesele și consumabilele influențează costul total de operare al laboratorului.",
      },
      {
        question: "Poate fi laboratorul extins ulterior?",
        answer:
          "Da, dacă spațiul, utilitățile și fluxurile sunt gândite de la început cu posibilitate de creștere.",
      },
    ],
    relatedArticles: [
      "echipamente-ivd-laborator-alegere-integrare-service",
      "ghid-pentru-echipamente-ivd-si-laborator",
      "alegere-aparatura-medicala-clinica",
      "mentenanta-preventiva-aparatura-medicala",
    ],
    cta: {
      title: "Configurezi un laborator IVD?",
      description:
        "Clarifică workflow-ul, echipamentele, utilitățile, validarea și service-ul înainte de achiziții.",
      label: "Calculează laboratorul IVD",
      href: "/calculatoare/cost-laborator-ivd",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "mentenanta-preventiva-aparatura-medicala",
    title: "Când este recomandată mentenanța preventivă pentru aparatura medicală",
    description:
      "Ghid despre mentenanța preventivă a aparaturii medicale: uptime, verificări periodice, diagnostic, risc operațional, service și continuitate.",
    category: "Service",
    tags: [
      "mentenanță preventivă",
      "service aparatură medicală",
      "uptime",
      "diagnostic service",
      "continuitate operațională",
      "echipamente medicale",
    ],
    readingTime: "10 min",
    targetKeyword: "mentenanta preventiva aparatura medicala",
    relatedServices: [
      "/services/service-aparatura-medicala",
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
    ],
    relatedTools: [
      { label: "Service Diagnostic", href: "/service-diagnostic" },
      { label: "Calculator service aparatură", href: "/calculatoare/service-aparatura" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Contact ZES", href: "/contact" },
    ],
    intro:
      "Mentenanța preventivă este recomandată atunci când oprirea echipamentului ar afecta activitatea medicală, programările, rezultatele sau siguranța operațională. Nu este doar o bifă tehnică. Este o metodă prin care clinica reduce riscul de opriri neplanificate, menține condiții de funcționare mai stabile și pregătește intervențiile înainte ca problema să devină urgentă.",
    sections: [
      {
        id: "ce-este-mentenanta-preventiva",
        title: "Ce este mentenanța preventivă",
        body: [
          "Mentenanța preventivă înseamnă verificări periodice, curățare tehnică unde este cazul, calibrare, testare, actualizări, inspecții și documentare. Conținutul exact depinde de tipul echipamentului, recomandările producătorului, utilizare și istoricul de service.",
          "Scopul nu este să promită că aparatura nu se va defecta niciodată. Scopul este să reducă probabilitatea unor incidente, să identifice semnele timpurii și să creeze o reacție mai rapidă atunci când apare o problemă.",
        ],
      },
      {
        id: "cand-devine-importanta",
        title: "Când devine importantă",
        body: [
          "Mentenanța preventivă devine critică pentru echipamente cu utilizare frecventă, aparatură care susține fluxuri de venit, echipamente imagistice, IVD/laborator, monitorizare pacient și orice sistem a cărui oprire afectează programări sau rezultate.",
          "Cu cât impactul opririi este mai mare, cu atât service-ul preventiv trebuie tratat mai serios. Pentru un echipament rar folosit, planul poate fi simplu. Pentru un CT, RMN sau analizor IVD central, planul trebuie să fie mai structurat.",
        ],
        bullets: [
          "echipamente cu volum mare de utilizare",
          "aparatură critică pentru programări",
          "sisteme cu piese greu disponibile",
          "echipamente cu istoric de erori intermitente",
          "laboratoare sau imagistică unde downtime-ul este costisitor",
        ],
      },
      {
        id: "ce-se-verifica",
        title: "Ce se verifică în practică",
        body: [
          "Verificările pot include condițiile de mediu, alimentarea, răcirea, componentele critice, calibrarea, calitatea imaginii sau a rezultatelor, erorile memorate, consumabilele, filtrele și starea accesoriilor. Pentru fiecare categorie de aparatură, lista trebuie adaptată.",
          "În imagistică, service-ul poate urmări calitatea imaginii, răcirea, electronica, condițiile camerei și sistemele auxiliare. În IVD, verificările pot include calibrare, validare, consumabile, fluxul probelor și conectivitatea.",
        ],
      },
      {
        id: "preventiv-versus-corectiv",
        title: "Preventiv nu înlocuiește corectivul",
        body: [
          "Mentenanța preventivă reduce riscul, dar nu elimină nevoia de intervenții corective. Diferența este că o clinică pregătită are documentație, istoric, contacte de service și priorități clare când apare incidentul.",
          "Fără mentenanță, multe probleme ajung să fie observate doar când echipamentul se oprește complet. Cu mentenanță, unele simptome pot fi investigate înainte de oprire: zgomote, încălzire, erori intermitente, degradarea imaginii sau valori instabile.",
        ],
        callout: {
          title: "Uptime realist",
          body: "Nicio mentenanță nu garantează funcționare permanentă, dar un plan bun reduce improvizația și scurtează traseul de la simptom la decizie.",
        },
      },
      {
        id: "cum-incepi",
        title: "Cum începi un plan preventiv",
        body: [
          "Începe cu inventarul echipamentelor, nivelul lor de criticitate, istoricul de erori, recomandările producătorului și impactul opririi. Apoi stabilește frecvențe, responsabilități, documentare, priorități și procedura de escaladare.",
          "Service Diagnostic poate ajuta la trierea unei probleme curente, iar calculatorul de service poate orienta nivelul de risc. Pentru un plan complet, ZES poate analiza echipamentele și poate propune o structură de service adaptată activității.",
        ],
      },
    ],
    faqs: [
      {
        question: "Mentenanța preventivă este obligatorie pentru toate echipamentele?",
        answer:
          "Depinde de echipament, utilizare și cerințe aplicabile. Din perspectivă operațională, este recomandată mai ales pentru aparatura critică.",
      },
      {
        question: "Cât de des trebuie făcută?",
        answer:
          "Frecvența trebuie stabilită pe baza recomandărilor producătorului, utilizării, istoricului de service și impactului operațional.",
      },
      {
        question: "Ce echipamente au prioritate?",
        answer:
          "Echipamentele care blochează programări, rezultate sau fluxuri medicale: imagistică, IVD, monitorizare critică și aparatură cu utilizare intensă.",
      },
      {
        question: "Mentenanța preventivă reduce costurile?",
        answer:
          "Poate reduce opririle neplanificate și intervențiile de urgență, dar nu trebuie prezentată ca garanție de economii. Beneficiul principal este predictibilitatea.",
      },
      {
        question: "Ce trebuie documentat?",
        answer:
          "Verificările, erorile, piesele schimbate, recomandările, condițiile de mediu și orice simptom repetitiv.",
      },
    ],
    relatedArticles: [
      "service-ct-rmn-mentenanta-uptime",
      "mentenanta-aparaturii-medicale-ce-trebuie-urmarit",
      "echipamente-ivd-laborator-alegere-integrare-service",
      "alegere-aparatura-medicala-clinica",
    ],
    cta: {
      title: "Vrei să reduci riscul de opriri?",
      description:
        "Evaluează echipamentele, criticitatea și pașii de mentenanță preventivă într-un format structurat.",
      label: "Deschide Service Diagnostic",
      href: "/service-diagnostic",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "greseli-amenajare-camera-radiologie",
    title: "Ce greșeli apar frecvent în amenajarea unei camere de radiologie",
    description:
      "Lista greșelilor frecvente în amenajarea camerelor de radiologie: CT, RX, RMN, ecranare, autorizări, echipamente, HVAC, service și layout.",
    category: "Radiologie",
    tags: [
      "greșeli cameră radiologie",
      "amenajare radiologie",
      "camera CT",
      "camera RMN",
      "camera RX",
      "ecranare",
    ],
    readingTime: "11 min",
    targetKeyword: "greseli amenajare camera radiologie",
    relatedServices: [
      "/services/radiologie",
      "/services/amenajari-medicale",
      "/services/protectie-radiologica",
      "/services/rf-shielding",
      "/services/imagistica-medicala",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Calculator cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Cele mai costisitoare greșeli în amenajarea unei camere de radiologie apar rar din lipsa finisajelor. Apar din decizii tehnice luate prea târziu: echipament ales după layout, ecranare tratată generic, HVAC subdimensionat, documentație incompletă, spații de service ignorate sau confuzie între CT/RX și RMN. O cameră de radiologie trebuie proiectată în jurul echipamentului și al riscurilor sale reale.",
    sections: [
      {
        id: "confuzia-tipului-de-camera",
        title: "Greșeala 1: confuzia între CT/RX și RMN",
        body: [
          "CT și RX folosesc radiații ionizante și cer protecție radiologică, ecranare cu plumb sau soluții echivalente, zone controlate și pași CNCAN unde este cazul. RMN-ul cere RF shielding, cușcă Faraday, control electromagnetic, HVAC, vibrații și acces pentru magnet.",
          "Când aceste cerințe sunt amestecate, bugetul devine neclar și soluțiile pot fi greșite. Plumbul nu rezolvă RF shielding-ul unui RMN, iar cușca Faraday nu rezolvă protecția radiologică a unui CT.",
        ],
        callout: {
          title: "Regula de aur",
          body: "Nu proiecta o cameră de radiologie generică. Proiectează camera pentru echipamentul concret: CT, RX sau RMN.",
        },
      },
      {
        id: "echipament-ales-tarziu",
        title: "Greșeala 2: echipamentul este ales prea târziu",
        body: [
          "Echipamentul dictează dimensiuni, greutate, alimentare, răcire, spațiu de service, trasee, acces și uneori autorizări. Dacă modelul este ales după execuție, camera poate să nu fie pregătită pentru instalare.",
          "Chiar și echipamentele din aceeași categorie pot avea cerințe diferite. De aceea, proiectarea trebuie să pornească de la specificații sau măcar de la un scenariu tehnic realist.",
        ],
      },
      {
        id: "layout-instabil",
        title: "Greșeala 3: layout-ul se schimbă după ecranare",
        body: [
          "Mutarea unei uși, schimbarea poziției operatorului, modificarea camerei tehnice sau adăugarea unui traseu poate afecta protecția. În CT/RX, modificările pot cere reevaluarea protecției radiologice. În RMN, penetrările pot afecta anvelopa RF.",
          "Layout-ul trebuie stabilizat înainte de execuția elementelor critice. Dacă schimbările sunt inevitabile, ele trebuie evaluate tehnic, nu tratate ca simple ajustări de șantier.",
        ],
      },
      {
        id: "hva-si-service",
        title: "Greșeala 4: HVAC-ul și service-ul sunt ignorate",
        body: [
          "Radiologia are nevoie de condiții stabile de operare. HVAC-ul, răcirea, alimentarea, datele și spațiul pentru service influențează direct funcționarea echipamentului. O cameră frumoasă, dar greu de întreținut, va crea probleme operaționale.",
          "Service-ul trebuie gândit din faza de proiectare: acces la componente, trasee clare, camera tehnică, spațiu pentru intervenții și documentație. O intervenție dificilă devine timp pierdut pentru clinică.",
        ],
      },
      {
        id: "documentatie-si-buget",
        title: "Greșeala 5: documentația și bugetul sunt incomplete",
        body: [
          "O estimare care include doar amenajări și finisaje este insuficientă. Camera poate cere proiectare, ecranare, instalații, autorizări, integrare, testare și service. Dacă aceste categorii lipsesc, bugetul pare mic la început și devine tensionat în execuție.",
          "Radiology Room Planner poate ajuta la trierea riscurilor, iar Proposal Builder poate organiza fazele și informațiile lipsă. Scopul este evitarea surprizelor, nu promisiunea unui cost fix fără verificare.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este cea mai frecventă greșeală?",
        answer:
          "Proiectarea camerei fără specificațiile echipamentului și fără separarea cerințelor CT/RX de cerințele RMN.",
      },
      {
        question: "Pot folosi aceeași cameră pentru CT și RMN?",
        answer:
          "Nu fără analiză majoră. CT și RMN au cerințe tehnice diferite, iar soluțiile de ecranare nu sunt interschimbabile.",
      },
      {
        question: "Când trebuie stabilită ecranarea?",
        answer:
          "După clarificarea echipamentului, layout-ului și vecinătăților, dar înainte de execuția camerei.",
      },
      {
        question: "De ce contează spațiul de service?",
        answer:
          "Pentru că intervențiile ulterioare trebuie făcute rapid și fără demontări inutile. Lipsa accesului crește downtime-ul.",
      },
      {
        question: "Cum reduc riscul de greșeli?",
        answer:
          "Prin analiză tehnică timpurie, coordonare cu furnizorul echipamentului, verificarea ecranării, instalațiilor și documentației.",
      },
    ],
    relatedArticles: [
      "modernizare-radiologie-clinica",
      "diferenta-rmn-ct-infrastructura",
      "verificari-inainte-instalare-ct",
      "pregatire-instalare-rmn",
    ],
    cta: {
      title: "Vrei să verifici camera de radiologie?",
      description:
        "Identifică riscurile de layout, ecranare, instalații, autorizări și integrare înainte de execuție.",
      label: "Verifică în Radiology Room Planner",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
  {
    slug: "buget-modernizare-clinica-medicala",
    title: "Cum estimezi bugetul pentru modernizarea unei clinici medicale",
    description:
      "Ghid pentru bugetarea modernizării unei clinici: spațiu, instalații, aparatură, imagistică, IVD, service, fazare și riscuri tehnice.",
    category: "Infrastructură medicală",
    tags: [
      "buget modernizare clinică",
      "modernizare clinică medicală",
      "amenajări medicale",
      "aparatură medicală",
      "imagistică",
      "IVD",
    ],
    readingTime: "11 min",
    targetKeyword: "buget modernizare clinica medicala",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Contact ZES", href: "/contact" },
      { label: "Ghid cost clinică", href: "/ghiduri/cost-clinica-medicala" },
    ],
    intro:
      "Bugetul pentru modernizarea unei clinici medicale trebuie construit pe faze și riscuri, nu doar pe suprafață. O modernizare poate însemna schimbări de flux, instalații, aparatură, imagistică, laborator, finisaje, autorizări, service și perioade de întrerupere. Dacă bugetul pornește doar de la lucrări de amenajare, costurile tehnice apar târziu și devin greu de controlat.",
    sections: [
      {
        id: "defineste-scopul",
        title: "Definește scopul modernizării",
        body: [
          "Primul pas este să clarifici ce modernizezi: recepție, cabinete, sală de tratament, imagistică, laborator, fluxuri, aparatură sau întreaga clinică. Fiecare direcție are costuri diferite și riscuri diferite.",
          "Modernizarea pentru confort vizual este diferită de modernizarea pentru introducerea unui CT, RMN sau laborator IVD. În al doilea caz, infrastructura tehnică poate domina bugetul.",
        ],
      },
      {
        id: "categorii-buget",
        title: "Separă bugetul pe categorii",
        body: [
          "Un buget util trebuie împărțit în categorii: analiză tehnică, proiectare, lucrări de amenajare, instalații, aparatură, imagistică, IVD, integrare, service, documentație și rezervă pentru riscuri. Această separare arată ce este esențial și ce poate fi fazat.",
          "Dacă toate costurile sunt puse într-o singură sumă, beneficiarul pierde controlul asupra deciziilor. Nu mai este clar ce ține de finisaje, ce ține de aparatură și ce ține de cerințe tehnice obligatorii.",
        ],
        bullets: [
          "amenajări și instalații",
          "aparatură medicală și integrare",
          "imagistică și ecranare unde este cazul",
          "IVD/laborator și consumabile inițiale",
          "service, mentenanță și continuitate",
        ],
      },
      {
        id: "radiologie-ivd-aparatura",
        title: "Radiologia, IVD-ul și aparatura schimbă bugetul",
        body: [
          "Dacă modernizarea include imagistică, trebuie separate clar cerințele. RMN-ul aduce RF shielding, HVAC, vibrații și acces pentru magnet. CT/RX aduc protecție radiologică, plumb, zone controlate și pași CNCAN. Aceste costuri nu sunt echivalente și nu trebuie amestecate.",
          "Dacă modernizarea include laborator IVD, bugetul trebuie să includă echipamente, workflow, utilități, calibrare, validare, consumabile și service. Aparatura medicală poate cere adaptări ale spațiului, nu doar achiziție.",
        ],
        callout: {
          title: "Buget tehnic, nu doar amenajare",
          body: "Clinica medicală modernizată trebuie bugetată ca sistem: spațiu, aparatură, instalații, autorizări, service și operare.",
        },
      },
      {
        id: "downtime-si-fazare",
        title: "Include downtime-ul și fazarea lucrărilor",
        body: [
          "O clinică activă nu poate fi modernizată ca un spațiu gol. Trebuie planificate zonele care rămân operaționale, ferestrele de oprire, protecția pacienților, accesul personalului și comunicarea internă.",
          "Fazarea poate reduce riscul, dar poate crește complexitatea. Uneori este mai eficientă o oprire scurtă și bine coordonată decât lucrări lungi care perturbă permanent fluxul clinicii.",
        ],
      },
      {
        id: "estimare-si-validare",
        title: "Cum treci de la estimare la decizie",
        body: [
          "Un calculator poate oferi o estimare orientativă, dar modernizarea reală cere planuri, vizită tehnică, inventar de aparatură, stadiu de autorizări și scenariu de operare. Estimarea trebuie actualizată pe măsură ce informațiile devin clare.",
          "Calculatorul de proiect medical și Proposal Builder pot structura fazele și riscurile. Pentru proiecte cu radiologie, laborator sau echipamente critice, o analiză tehnică ZES poate valida bugetul înainte de ofertare.",
        ],
        callout: {
          title: "Fără promisiuni de preț fix",
          body: "Orice buget preliminar pentru modernizare este orientativ și trebuie validat tehnic înainte de ofertă finală.",
        },
      },
    ],
    faqs: [
      {
        question: "Pot estima modernizarea doar pe metru pătrat?",
        answer:
          "Nu responsabil. Suprafața ajută, dar aparatura, instalațiile, radiologia, IVD-ul, autorizările și downtime-ul pot schimba major bugetul.",
      },
      {
        question: "Ce costuri sunt uitate frecvent?",
        answer:
          "Integrarea echipamentelor, service-ul, documentația, protecția radiologică, RF shielding-ul, consumabilele inițiale și fazarea lucrărilor.",
      },
      {
        question: "Modernizarea poate fi făcută în etape?",
        answer:
          "Da, dar fazarea trebuie proiectată. Altfel, fiecare etapă poate perturba activitatea și poate crea costuri suplimentare.",
      },
      {
        question: "Cum includ imagistica în buget?",
        answer:
          "Separă RMN-ul de CT/RX. RMN înseamnă RF shielding și integrare specifică, CT/RX înseamnă protecție radiologică și CNCAN unde este cazul.",
      },
      {
        question: "Care este primul pas recomandat?",
        answer:
          "O analiză tehnică a spațiului, aparaturii dorite, fluxurilor și documentației existente.",
      },
    ],
    relatedArticles: [
      "cum-se-construieste-o-clinica-medicala-in-romania",
      "modernizare-radiologie-clinica",
      "alegere-aparatura-medicala-clinica",
      "echipamente-necesare-laborator-ivd",
    ],
    cta: {
      title: "Modernizezi o clinică medicală?",
      description:
        "Transformă ideea într-un buget orientativ pe faze, riscuri și servicii tehnice relevante.",
      label: "Calculează proiectul medical",
      href: "/calculator-proiect-medical",
    },
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
  },
];

const overnightSeoArticles: Article[] = [
  {
    slug: "autorizare-dsp-clinica-medicala",
    title: "Autorizare DSP pentru clinică medicală: ce trebuie pregătit",
    description:
      "Ghid practic despre pregătirea unei clinici pentru autorizare DSP: fluxuri, spații, documentație, aparatură, circuite și riscuri tehnice.",
    category: "Autorizări",
    tags: ["DSP", "clinică medicală", "autorizare", "fluxuri medicale"],
    readingTime: "12 min",
    targetKeyword: "autorizare DSP clinică medicală",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/aparatura-medicala",
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Autorizarea DSP pentru o clinică medicală nu începe în ziua depunerii documentației. În practică, pregătirea începe din faza de concept, când se decid specialitățile, fluxurile, camerele, instalațiile, aparatura și modul în care spațiul va funcționa. Acest ghid nu înlocuiește consultanța legală sau analiza autorităților, dar explică ce trebuie pregătit tehnic pentru ca proiectul să pornească mai coerent.",
    sections: [
      {
        id: "rolul-dsp",
        title: "Ce verifică DSP în logica unui proiect medical",
        body: [
          "DSP privește clinica din perspectiva funcționării medicale: circuite, condiții igienico-sanitare, destinații ale spațiilor, zone suport, fluxuri pentru pacienți și personal, materiale, dotări și documentație. Pentru beneficiar, asta înseamnă că amenajarea nu poate fi tratată ca un simplu spațiu comercial cu mobilier medical adăugat ulterior.",
          "Înainte de orice decizie de execuție, trebuie clarificat ce servicii va oferi clinica, câte camere sunt necesare, ce aparatură intră în fiecare zonă și cum se vor deplasa pacienții, personalul, materialele curate, materialele contaminate și consumabilele. Multe blocaje apar când aceste lucruri sunt desenate după ce pereții au fost deja ridicați.",
        ],
      },
      {
        id: "date-initiale",
        title: "Datele inițiale care trebuie strânse",
        body: [
          "Un proiect matur începe cu o listă de funcțiuni medicale. Consultațiile, tratamentele, recoltarea, laboratorul, imagistica, sterilizarea, spațiile administrative și zonele tehnice au cerințe diferite. Chiar dacă proiectul este mic, fiecare funcțiune trebuie așezată într-o logică operațională, nu doar într-un tabel de suprafețe.",
          "A doua categorie de date ține de spațiu: planuri, releveu, înălțimi, vecinătăți, acces, utilități existente, ventilație, instalații electrice, posibilități de compartimentare și eventuale limitări structurale. Dacă proiectul include aparatură medicală importantă, datele echipamentelor trebuie introduse devreme.",
        ],
        bullets: [
          "lista specialităților și serviciilor medicale",
          "planuri, releveu și destinații propuse",
          "flux pacient, personal și materiale",
          "lista aparaturii medicale și cerințele de integrare",
          "stadiul documentației și constrângerile spațiului",
        ],
      },
      {
        id: "fluxuri-circuite",
        title: "Fluxuri și circuite: partea care schimbă layout-ul",
        body: [
          "Fluxurile sunt adesea subestimate. O clinică trebuie să permită intrarea, orientarea, consultația, investigația, așteptarea, recoltarea, evacuarea deșeurilor, depozitarea și accesul personalului fără conflicte inutile. Nu toate proiectele au circuite complexe, dar fiecare proiect are o logică de funcționare care trebuie verificată.",
          "Când fluxurile sunt ignorate, apar soluții incomode: camere care nu pot fi folosite eficient, recepții aglomerate, trasee de materiale care se intersectează cu pacienții, zone tehnice fără acces sau spații de depozitare insuficiente. Aceste probleme nu sunt doar estetice; ele afectează autorizarea, operarea și experiența pacientului.",
        ],
      },
      {
        id: "aparatura-si-instalatii",
        title: "Aparatura medicală trebuie corelată cu instalațiile",
        body: [
          "DSP nu este singura zonă de risc. Aparatura medicală poate schimba complet proiectul. Un ecograf, un analizor IVD, un sistem de sterilizare, un RX sau o cameră de tratament pot cere alimentare electrică, date, ventilație, mobilier, acces service, spații de consumabile și condiții de mediu.",
          "Dacă aparatura este aleasă după finalizarea layout-ului, beneficiarul poate descoperi că instalațiile nu sunt suficiente sau că accesul de service este imposibil. De aceea, echipamentele principale trebuie incluse în discuția DSP ca parte din funcționarea clinicii, chiar dacă oferta comercială finală nu este încă stabilită.",
        ],
        callout: {
          title: "Radiologia adaugă o disciplină separată",
          body: "Dacă proiectul include CT sau RX, apare și discuția de protecție radiologică și CNCAN. Dacă include RMN, discuția este despre RF shielding și integrare RMN, nu despre CNCAN pentru RF shielding.",
        },
      },
      {
        id: "documentatie",
        title: "Documentație, ipoteze și validare",
        body: [
          "Documentația pentru DSP trebuie să fie coerentă cu ceea ce se construiește. Planurile, destinațiile camerelor, fluxurile, dotările și descrierea activității trebuie să se susțină reciproc. Un proiect în care documentația spune una, iar execuția arată altceva devine greu de apărat și poate necesita refaceri.",
          "Este util să separi ce este confirmat de ce este încă ipoteză. De exemplu, lista de specialități poate fi clară, dar aparatura poate fi încă în selecție. Sau spațiul poate fi ales, dar fluxul de laborator să nu fie definit. O analiză tehnică preliminară ajută tocmai prin scoaterea acestor necunoscute la suprafață.",
        ],
      },
      {
        id: "greseli",
        title: "Greșeli frecvente înainte de autorizare",
        body: [
          "Cea mai frecventă greșeală este începerea lucrărilor înainte de clarificarea funcțiunilor. A doua este copierea unui layout dintr-un alt proiect fără adaptare la spațiul real. A treia este ignorarea aparaturii și service-ului. A patra este amestecarea DSP cu CNCAN sau presupunerea că o autorizație rezolvă toate cerințele tehnice.",
          "DSP și CNCAN pot apărea în același proiect, dar nu au același rol. DSP privește funcționarea medicală și condițiile spațiului. CNCAN devine relevant pentru activități cu radiații ionizante, cum sunt CT sau RX. RMN-ul are alte riscuri, în special RF shielding, Faraday cage, HVAC și integrare tehnică.",
        ],
      },
    ],
    faqs: [
      {
        question: "DSP trebuie discutat înainte de amenajare?",
        answer:
          "Da. Cerințele de funcționare pot influența compartimentarea, fluxurile, instalațiile, finisajele, dotările și documentația.",
      },
      {
        question: "Ce documente trebuie pregătite prima dată?",
        answer:
          "Planurile spațiului, lista funcțiunilor medicale, fluxurile, lista aparaturii și stadiul documentației existente sunt un punct de pornire util.",
      },
      {
        question: "DSP și CNCAN sunt același lucru?",
        answer:
          "Nu. DSP privește funcționarea medicală și condițiile spațiului. CNCAN privește activități cu radiații ionizante, cum sunt CT sau RX.",
      },
      {
        question: "Aparatura medicală influențează autorizarea?",
        answer:
          "Da, indirect prin funcțiuni, instalații, fluxuri, condiții de mediu, acces service și spații suport necesare operării.",
      },
      {
        question: "Care este pasul recomandat înainte de buget final?",
        answer:
          "O analiză tehnică preliminară care corelează spațiul, fluxurile, DSP, aparatura și eventualele cerințe de radiologie.",
      },
    ],
    relatedArticles: [
      "cum-se-construieste-o-clinica-medicala-in-romania",
      "diferenta-dsp-cncan-proiecte-medicale",
      "planificare-fluxuri-clinica-medicala",
      "integrare-aparatura-medicala-clinica",
    ],
    cta: {
      title: "Pregătești o clinică pentru autorizare?",
      description:
        "Structurează funcțiunile, fluxurile, aparatura și riscurile tehnice înainte de bugetul final.",
      label: "Începe analiza preliminară",
      href: "/ai-project-advisor",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "diferenta-dsp-cncan-proiecte-medicale",
    title: "Diferența dintre DSP și CNCAN în proiectele medicale",
    description:
      "Explicație clară despre rolul DSP și CNCAN în proiectele medicale, cu diferențe între clinică, CT/RX, RMN, radiologie și autorizări.",
    category: "Autorizări",
    tags: ["DSP", "CNCAN", "radiologie", "autorizări medicale"],
    readingTime: "11 min",
    targetKeyword: "diferența DSP CNCAN proiecte medicale",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/radiologie",
      "/services/protectie-radiologica",
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "DSP și CNCAN sunt adesea puse în aceeași conversație, mai ales când proiectul medical include radiologie. Totuși, ele nu înseamnă același lucru și nu verifică aceleași riscuri. Pentru o clinică, înțelegerea diferenței ajută la un layout mai bun, la documentație mai coerentă și la evitarea confuziei dintre autorizarea medicală, protecția radiologică și RF shielding-ul pentru RMN.",
    sections: [
      {
        id: "rol-dsp",
        title: "Rolul DSP în proiectele medicale",
        body: [
          "DSP este relevant pentru modul în care spațiul medical funcționează: circuite, destinații, igienă, dotări, fluxuri, zone suport și condiții pentru activitatea medicală. Într-o clinică obișnuită, DSP influențează încă din concept modul în care sunt așezate recepția, cabinetele, tratamentele, recoltarea, depozitarea și traseele personalului.",
          "Din perspectiva proiectului, DSP nu trebuie privit ca o hârtie de final. Dacă cerințele sunt discutate după execuție, pot apărea pereți de mutat, camere de redimensionat, fluxuri de regândit sau dotări care nu mai încap. Cel mai sănătos este ca proiectarea să pornească de la funcționarea medicală reală.",
        ],
      },
      {
        id: "rol-cncan",
        title: "Rolul CNCAN în radiologie",
        body: [
          "CNCAN devine relevant pentru activități cu radiații ionizante. În proiectele medicale, discuția apare în special pentru CT, RX, fluoroscopie și alte echipamente de radiologie care implică protecție radiologică. Aici apar termeni precum zone controlate, ecranare cu plumb, uși plumbuite, sticlă plumbuită și documentație specifică.",
          "CNCAN nu este o autoritate pentru RF shielding-ul în sine. Dacă proiectul include RMN, problema tehnică principală este interferența electromagnetică și integritatea camerei RMN prin cușcă Faraday, ușă RF, filtre, waveguides, penetrări și testare. RMN-ul trebuie planificat serios, dar nu trebuie confundat cu CT/RX.",
        ],
        callout: {
          title: "Separare esențială",
          body: "CT/RX înseamnă radiații ionizante, protecție radiologică și CNCAN. RMN înseamnă RF shielding, Faraday cage, HVAC, vibrații și integrare RMN.",
        },
      },
      {
        id: "cand-apar-impreuna",
        title: "Când apar DSP și CNCAN în același proiect",
        body: [
          "Cele două zone se întâlnesc când o clinică include radiologie cu CT sau RX. Clinica are nevoie de funcționare medicală coerentă, deci DSP rămâne relevant. Camera de radiologie are nevoie și de protecție radiologică, iar acolo apare CNCAN. În practică, layout-ul trebuie să răspundă ambelor logici, fără să le amestece.",
          "De exemplu, fluxul pacientului, zona de așteptare, accesul personalului și spațiile suport țin de funcționarea clinicii. În același timp, poziția echipamentului, vecinătățile, protecția pereților și accesul controlat țin de radioprotecție. Dacă proiectul le tratează separat, dar coordonat, riscul de refaceri scade.",
        ],
      },
      {
        id: "ce-nu-trebuie-confundat",
        title: "Ce nu trebuie confundat",
        body: [
          "Nu trebuie confundată autorizarea DSP cu aprobarea oricărei soluții tehnice de radiologie. Nu trebuie confundată protecția radiologică pentru CT/RX cu RF shielding-ul pentru RMN. Nu trebuie presupus că achiziția echipamentului rezolvă automat spațiul, instalațiile și documentația.",
          "O altă confuzie apare între aparatură și infrastructură. Furnizorul echipamentului poate oferi cerințe tehnice, dar spațiul trebuie pregătit, autorizat și integrat în funcționarea clinicii. De aceea, beneficiarul are nevoie de o coordonare între proiectare, execuție, echipament, service și documentație.",
        ],
      },
      {
        id: "planificare-corecta",
        title: "Cum planifici corect din faza de concept",
        body: [
          "Primul pas este să definești serviciile medicale și echipamentele critice. Dacă nu există radiologie cu radiații ionizante, CNCAN poate să nu fie relevant pentru acel proiect. Dacă există CT sau RX, trebuie introdus devreme în calendar. Dacă există RMN, trebuie introdus devreme RF shielding-ul și integrarea RMN.",
          "Al doilea pas este să aduni documentația: planuri, releveu, vecinătăți, specificații de echipamente, fluxuri și stadiu de autorizări. Al treilea pas este să separi riscurile: DSP, CNCAN, RF shielding, aparatură, instalații, HVAC, service și buget. Proposal Builder poate ajuta la structurarea acestor zone înainte de discuția tehnică.",
        ],
      },
      {
        id: "riscuri",
        title: "Riscuri când diferența nu este clară",
        body: [
          "Când DSP și CNCAN sunt amestecate, proiectul poate porni cu o listă incompletă de cerințe. Camera de radiologie poate fi desenată ca un cabinet obișnuit, iar nevoia de protecție radiologică apare târziu. Sau, invers, un proiect RMN poate fi tratat ca o problemă de plumb, deși riscul real este RF shielding-ul.",
          "Aceste confuzii cresc costurile, întârzie proiectul și slăbesc încrederea între beneficiar, proiectanți și furnizori. Un proiect bun nu promite că toate aprobările vor fi simple, dar clarifică din timp cine verifică ce, ce informații lipsesc și ce decizii nu trebuie luate pe ipoteze.",
        ],
      },
    ],
    faqs: [
      {
        question: "DSP și CNCAN sunt aceeași autoritate?",
        answer:
          "Nu. DSP privește funcționarea medicală a spațiului. CNCAN privește activitățile cu radiații ionizante, precum CT sau RX.",
      },
      {
        question: "RMN intră în logica CNCAN?",
        answer:
          "RMN-ul nu folosește radiații ionizante. El are cerințe tehnice de RF shielding, câmp magnetic, HVAC, vibrații și integrare, nu protecție radiologică cu plumb.",
      },
      {
        question: "O clinică fără radiologie are nevoie de CNCAN?",
        answer:
          "În mod obișnuit, nu dacă nu există activități cu radiații ionizante. Trebuie însă verificat proiectul concret.",
      },
      {
        question: "Când trebuie analizate DSP și CNCAN?",
        answer:
          "Din faza de concept, înainte de layout final, buget, execuție sau achiziția echipamentelor critice.",
      },
      {
        question: "Ce instrument ZES ajută la prima triere?",
        answer:
          "Consultantul AI poate structura proiectul general, iar Radiology Room Planner poate separa cerințele CT/RX de cele RMN.",
      },
    ],
    relatedArticles: [
      "autorizare-dsp-clinica-medicala",
      "autorizare-cncan-pas-cu-pas",
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      "modernizare-radiologie-clinica",
    ],
    cta: {
      title: "Ai un proiect cu DSP, CNCAN sau radiologie?",
      description:
        "Separă cerințele de funcționare medicală de riscurile radiologice și tehnice înainte de execuție.",
      label: "Planifică proiectul",
      href: "/ai-project-advisor",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "cat-dureaza-amenajarea-camera-rmn",
    title: "Cât durează amenajarea unei camere RMN",
    description:
      "Durata orientativă pentru amenajarea unei camere RMN depinde de RF shielding, HVAC, acces magnet, vibrații, echipament și testare.",
    category: "RF shielding",
    tags: ["cameră RMN", "RF shielding", "amenajare RMN", "timeline"],
    readingTime: "12 min",
    targetKeyword: "cât durează amenajarea unei camere RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Amenajarea unei camere RMN nu are un termen universal. Durata depinde de spațiu, echipament, accesul magnetului, RF shielding, HVAC, vibrații, furnizori, testare și stadiul documentației. O estimare realistă nu pornește de la suprafață, ci de la întrebarea dacă încăperea poate susține funcționarea RMN pe termen lung.",
    sections: [
      {
        id: "faze-principale",
        title: "Fazele care influențează calendarul",
        body: [
          "Un proiect RMN trece prin analiză tehnică, validare spațiu, proiectare, coordonare cu furnizorul echipamentului, execuție, RF shielding, integrare instalații, montaj echipament, testare și punere în funcțiune. Fiecare etapă poate dura puțin dacă datele sunt clare sau mult dacă apar necunoscute.",
          "Calendarul devine fragil când echipamentul este ales târziu, când spațiul este existent și are constrângeri, când accesul magnetului nu a fost verificat sau când HVAC-ul este subdimensionat. De aceea, o estimare bună include dependențe, nu doar un număr de săptămâni.",
        ],
        bullets: [
          "analiză spațiu și acces magnet",
          "date tehnice de la furnizorul RMN",
          "proiectare RF shielding și HVAC",
          "execuție cușcă Faraday și penetrări controlate",
          "testare, instalare și commissioning",
        ],
      },
      {
        id: "rf-shielding",
        title: "RF shielding-ul este pe traseul critic",
        body: [
          "Pentru RMN, RF shielding-ul este una dintre componentele care poate decide durata proiectului. Nu este vorba despre plumb și nu este o cerință CNCAN pentru radiații ionizante. Este vorba despre o incintă conductivă, de tip cușcă Faraday, care controlează interferențele de radiofrecvență și păstrează integritatea camerei RMN.",
          "Ușa RF, filtrele, waveguides, penetrările pentru instalații, continuitatea sistemului și testarea de atenuare trebuie coordonate cu execuția camerei. Dacă traseele tehnice se schimbă după realizarea shielding-ului, apar întârzieri și risc de refacere. Din acest motiv, RF shielding-ul trebuie planificat înainte de lucrările finale.",
        ],
      },
      {
        id: "hvac-si-vibratii",
        title: "HVAC, vibrații și condiții de mediu",
        body: [
          "O cameră RMN cere condiții stabile de mediu. HVAC-ul nu este doar confort; el susține echipamentul, camera și operarea. Debitele, temperaturile, traseele, zgomotul, accesul pentru mentenanță și compatibilitatea cu RF shielding-ul trebuie tratate împreună.",
          "Vibrațiile, vecinătățile tehnice și structura clădirii pot schimba calendarul. Într-un spațiu existent, verificările pot arăta că sunt necesare adaptări înainte de instalare. Aceste verificări nu sunt obstacole birocratice, ci moduri de a evita opriri, artefacte, probleme de service și performanță slabă.",
        ],
      },
      {
        id: "achizitie-echipament",
        title: "Echipamentul ales devreme scurtează incertitudinea",
        body: [
          "Când modelul RMN este cunoscut, proiectarea poate folosi date reale: greutate, acces, cerințe de alimentare, HVAC, trasee, service, dimensiuni, magnet, recomandări de instalare și condiții furnizor. Când modelul nu este ales, proiectul lucrează cu ipoteze, iar ipotezele pot schimba calendarul.",
          "Aparatura cumpărată fără verificarea spațiului poate crea problema inversă: echipamentul există, dar camera nu este pregătită. În acest caz, termenul nu depinde de livrare, ci de cât de repede poate fi adaptat spațiul fără compromis tehnic.",
        ],
        callout: {
          title: "Durata este orientativă",
          body: "O cameră RMN poate părea simplă pe plan, dar termenul real depinde de RF shielding, HVAC, acces magnet, furnizor, testare și validarea spațiului.",
        },
      },
      {
        id: "cum-estimezi",
        title: "Cum estimezi realist durata",
        body: [
          "O estimare sănătoasă separă etapele: concept și analiză, proiectare, comenzi speciale, execuție, RF shielding, instalații, testare și integrare echipament. Fiecare etapă trebuie legată de o dependență: planuri, furnizor, materiale, echipe, acces, autorizări sau disponibilitatea spațiului.",
          "Radiology Room Planner poate ajuta la prima triere, iar calculatorul pentru cameră RMN poate structura bugetul și riscurile. Pentru o decizie reală, ZES trebuie să valideze spațiul, specificațiile echipamentului și constrângerile de calendar. Fără aceste date, orice termen rămâne orientativ.",
        ],
      },
    ],
    faqs: [
      {
        question: "Există o durată fixă pentru amenajarea unei camere RMN?",
        answer:
          "Nu. Durata depinde de spațiu, echipament, RF shielding, HVAC, acces magnet, testare și coordonarea furnizorilor.",
      },
      {
        question: "RF shielding-ul poate întârzia proiectul?",
        answer:
          "Da, mai ales dacă penetrările, ușa RF, filtrele, HVAC-ul sau traseele tehnice nu sunt definite înainte de execuție.",
      },
      {
        question: "RMN-ul are nevoie de plumb?",
        answer:
          "În mod obișnuit, nu. RMN-ul are nevoie de RF shielding și control al interferențelor, nu de protecție radiologică pentru radiații ionizante.",
      },
      {
        question: "Când trebuie ales echipamentul RMN?",
        answer:
          "Cât mai devreme, pentru ca proiectarea să folosească cerințele reale ale furnizorului și să reducă ipotezele.",
      },
      {
        question: "Care este primul pas recomandat?",
        answer:
          "Verificarea spațiului, accesului magnetului, cerințelor RF, HVAC și datelor furnizorului de echipament.",
      },
    ],
    relatedArticles: [
      "checklist-camera-rmn-inainte-instalare",
      "pregatire-instalare-rmn",
      "camera-faraday-rmn",
      "verificari-inainte-achizitie-rmn",
    ],
    cta: {
      title: "Planifici o cameră RMN?",
      description:
        "Verifică riscurile de RF shielding, acces, HVAC și integrare înainte de a bloca termenul.",
      label: "Deschide Radiology Room Planner",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "cat-dureaza-amenajarea-camera-ct",
    title: "Cât durează amenajarea unei camere CT",
    description:
      "Durata orientativă pentru o cameră CT depinde de protecție radiologică, CNCAN, layout, echipament, instalații și integrare tehnică.",
    category: "Protecție radiologică",
    tags: ["cameră CT", "CNCAN", "protecție radiologică", "timeline"],
    readingTime: "12 min",
    targetKeyword: "cât durează amenajarea unei camere CT",
    relatedServices: [
      "/services/protectie-radiologica",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "O cameră CT poate părea mai simplă decât o cameră RMN, dar calendarul ei depinde de alte riscuri: protecție radiologică, ecranare cu plumb, CNCAN, layout, vecinătăți, alimentare, HVAC, acces service și instalarea echipamentului. Durata trebuie estimată pe faze, nu promisă ca termen fix.",
    sections: [
      {
        id: "etape",
        title: "Etapele unei camere CT",
        body: [
          "Un proiect CT începe cu analiza spațiului și a echipamentului. Se verifică dimensiunile camerei, accesul pentru montaj, poziția gantry-ului, zona operatorului, vecinătățile, traseele electrice, datele, HVAC-ul și modul în care pacientul circulă. Abia apoi se poate discuta realist despre execuție.",
          "După proiectare, urmează soluția de protecție radiologică, lucrările de amenajare, integrarea instalațiilor, documentația relevantă, instalarea echipamentului, testele și punerea în funcțiune. Dacă o etapă este grăbită, riscul se mută în următoarea.",
        ],
      },
      {
        id: "radioprotectie",
        title: "Protecția radiologică influențează termenul",
        body: [
          "CT-ul folosește radiații ionizante, deci discuția principală nu este RF shielding, ci protecție radiologică. Soluția poate include pereți protejați, uși plumbuite, sticlă plumbuită și detalii constructive adaptate camerei și vecinătăților. Aceste elemente trebuie stabilite înainte de finisaje.",
          "Dacă protecția radiologică este introdusă târziu, se pot reface pereți, uși, goluri, finisaje și trasee. Termenul proiectului crește nu din cauza lucrării în sine, ci din cauza rework-ului. De aceea, analiza radioprotecției este una dintre primele dependențe ale calendarului.",
        ],
      },
      {
        id: "cncan",
        title: "CNCAN și documentația nu trebuie lăsate la final",
        body: [
          "Pentru camere CT, CNCAN este o discuție relevantă deoarece echipamentul implică radiații ionizante. Asta nu înseamnă promisiuni de autorizare rapidă, ci planificare responsabilă: date tehnice, vecinătăți, layout, protecție radiologică și documentație coerentă.",
          "Când documentația este pregătită după execuție, apar inconsecvențe între camera reală și proiect. Un calendar sănătos alocă timp pentru clarificări, nu doar pentru montaj. În proiectele cu termene strânse, această etapă trebuie urmărită separat.",
        ],
      },
      {
        id: "echipament-instalatii",
        title: "Echipament, instalații și acces service",
        body: [
          "Modelul CT influențează alimentarea electrică, răcirea, datele, greutatea, poziția operatorului, traseele și accesul pentru service. Fără fișa echipamentului, proiectul lucrează cu ipoteze, iar ipotezele pot modifica durata când furnizorul transmite cerințele finale.",
          "Accesul pentru montaj este la fel de important. Un echipament CT nu se introduce într-un spațiu doar prin dorință comercială. Trebuie verificate uși, coridoare, lifturi, platforme, rezistență, manipulare și zone temporare de lucru. O problemă de acces descoperită târziu poate bloca întregul calendar.",
        ],
      },
      {
        id: "estimare",
        title: "Cum pregătești o estimare realistă",
        body: [
          "Estimarea duratei trebuie împărțită în analiză, proiectare, protecție radiologică, documentație, lucrări, instalare, testare și commissioning. Fiecare etapă are dependențe: planuri, echipament, vecinătăți, furnizori, materiale și disponibilitatea spațiului.",
          "Calculatorul pentru cameră CT poate oferi o primă structură de risc și buget orientativ, iar Radiology Room Planner poate clarifica diferențele între CT/RX și RMN. Pentru o decizie reală, ZES trebuie să valideze planurile, echipamentul și stadiul documentației.",
        ],
        callout: {
          title: "Nu confunda CT cu RMN",
          body: "CT înseamnă protecție radiologică, plumb și CNCAN. RMN înseamnă RF shielding, Faraday cage și control electromagnetic.",
        },
      },
    ],
    faqs: [
      {
        question: "Cât durează o cameră CT?",
        answer:
          "Nu există o durată fixă. Termenul depinde de spațiu, echipament, protecție radiologică, CNCAN, lucrări și instalare.",
      },
      {
        question: "CT are nevoie de RF shielding?",
        answer:
          "În mod obișnuit, nu. CT-ul are nevoie de protecție radiologică și ecranare cu plumb, nu de cușcă Faraday pentru RMN.",
      },
      {
        question: "CNCAN poate schimba calendarul?",
        answer:
          "Da. Documentația și clarificările pentru activități cu radiații ionizante trebuie incluse în planificare.",
      },
      {
        question: "Când trebuie verificat accesul echipamentului?",
        answer:
          "Înainte de execuție și înainte de confirmarea finală a calendarului de livrare și montaj.",
      },
      {
        question: "Ce instrument ZES ajută la estimare?",
        answer:
          "Calculatorul pentru cameră CT și Radiology Room Planner pot structura primele riscuri și dependențe.",
      },
    ],
    relatedArticles: [
      "checklist-camera-ct-inainte-instalare",
      "verificari-inainte-instalare-ct",
      "autorizare-cncan-pas-cu-pas",
      "verificari-inainte-achizitie-ct",
    ],
    cta: {
      title: "Planifici o cameră CT?",
      description:
        "Separă protecția radiologică, CNCAN, accesul echipamentului și instalațiile înainte de execuție.",
      label: "Calculează camera CT",
      href: "/calculatoare/cost-camera-ct",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "checklist-camera-rmn-inainte-instalare",
    title: "Checklist cameră RMN înainte de instalare",
    description:
      "Checklist tehnic pentru camera RMN înainte de instalare: RF shielding, Faraday cage, HVAC, vibrații, acces magnet și service.",
    category: "RF shielding",
    tags: ["checklist RMN", "instalare RMN", "RF shielding", "Faraday"],
    readingTime: "13 min",
    targetKeyword: "checklist cameră RMN înainte de instalare",
    relatedServices: [
      "/services/rf-shielding",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Înainte de instalarea unui RMN, camera trebuie verificată ca sistem tehnic. Nu este suficient ca spațiul să fie liber și finisat. RMN-ul cere RF shielding, control electromagnetic, HVAC, acces pentru magnet, verificări de vibrații, trasee compatibile, service și coordonare cu furnizorul echipamentului. Checklist-ul de mai jos ajută la o primă triere, dar nu înlocuiește validarea tehnică.",
    sections: [
      {
        id: "documente",
        title: "Documente și date de pornire",
        body: [
          "Primul pas este centralizarea documentelor: planuri actuale, releveu, secțiuni, fotografii, trasee existente, date de la furnizorul RMN și constrângerile clădirii. Fără aceste informații, discuția rămâne la nivel de presupuneri și poate rata riscuri evidente.",
          "Fișa echipamentului este critică. Ea influențează greutatea, dimensiunile, accesul, alimentarea, HVAC-ul, cerințele RF, zonele de service și condițiile de instalare. Dacă modelul nu este încă ales, checklist-ul trebuie marcat cu ipoteze și actualizat după selecție.",
        ],
        bullets: [
          "planuri și releveu confirmat",
          "specificații furnizor RMN",
          "traseu de acces pentru magnet",
          "date HVAC și electrice",
          "limitări structurale sau operaționale",
        ],
      },
      {
        id: "rf-shielding",
        title: "RF shielding și cușcă Faraday",
        body: [
          "Camera RMN trebuie verificată pentru RF shielding: pereți, pardoseală, plafon, ușă RF, filtre, waveguides și penetrări. Fiecare trecere prin sistem trebuie controlată. O gaură, o îmbinare slabă sau o ușă tratată superficial poate afecta performanța camerei.",
          "Acesta nu este un checklist de plumb. RMN-ul nu este CT și nu se bazează pe protecție radiologică pentru radiații ionizante. Cerința principală este integritatea electromagnetică. Dacă proiectul menționează CNCAN în contextul RF shielding-ului, trebuie clarificat despre ce echipament și ce risc se discută.",
        ],
        callout: {
          title: "RF nu înseamnă plumb",
          body: "RF shielding-ul pentru RMN controlează interferențele electromagnetice. Ecranarea cu plumb este pentru CT/RX și radiații ionizante.",
        },
      },
      {
        id: "hvac-electric-date",
        title: "HVAC, electric, date și penetrări",
        body: [
          "HVAC-ul trebuie verificat împreună cu RF shielding-ul. Traseele de aer, cablurile, alimentarea, datele și orice penetrare în cameră trebuie compatibilizate cu cușca Faraday. O instalație gândită după execuția shielding-ului poate crea rework.",
          "Alimentarea electrică și datele trebuie comparate cu cerințele echipamentului și cu recomandările furnizorului. Nu este suficient să existe curent și rețea. Contează capacitatea, traseele, protecțiile, stabilitatea, accesul de service și modul în care trecerile sunt tratate RF.",
        ],
      },
      {
        id: "acces-si-structura",
        title: "Acces magnet, structură și vibrații",
        body: [
          "Un RMN poate avea cerințe serioase de acces. Trebuie verificate traseele de introducere, ușile, golurile, coridoarele, lifturile, platformele, zonele de manipulare și eventualele intervenții temporare în clădire. O problemă de acces descoperită la livrare poate bloca proiectul.",
          "Structura și vibrațiile influențează performanța și service-ul. Vecinătățile cu echipamente mecanice, trafic, lifturi sau zone cu vibrații pot cere analiză suplimentară. Aceste verificări sunt mai ieftine înainte de instalare decât după apariția artefactelor sau instabilității.",
        ],
      },
      {
        id: "testare-si-predare",
        title: "Testare, predare și plan de service",
        body: [
          "Înainte de instalare trebuie definit cum va fi testat RF shielding-ul și cine validează rezultatul. De asemenea, trebuie clarificate responsabilitățile dintre beneficiar, furnizorul RMN, echipa de shielding, instalații și service. Fără aceste responsabilități, problemele de la final devin greu de atribuit.",
          "Planul de service trebuie inclus din start: acces la echipament, trasee libere, condiții de mediu, mentenanță preventivă și reacție la erori. O cameră RMN nu este finalizată când arată bine, ci când echipamentul poate funcționa, poate fi testat și poate fi întreținut.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce trebuie verificat prima dată înainte de instalarea RMN?",
        answer:
          "Planurile, accesul magnetului, specificațiile echipamentului, cerințele RF, HVAC-ul și limitările clădirii.",
      },
      {
        question: "RMN are nevoie de CNCAN?",
        answer:
          "RMN-ul nu folosește radiații ionizante. Cerința critică este RF shielding-ul, nu protecția radiologică pentru CT/RX.",
      },
      {
        question: "Ce sunt penetrările RF?",
        answer:
          "Sunt treceri pentru cabluri, ventilație sau alte trasee prin cușca Faraday și trebuie tratate cu soluții compatibile RF.",
      },
      {
        question: "De ce contează accesul magnetului?",
        answer:
          "Pentru că echipamentul poate necesita trasee, goluri, manipulare și verificări structurale care nu se pot improviza în ziua livrării.",
      },
      {
        question: "Checklist-ul înlocuiește proiectarea?",
        answer:
          "Nu. Checklist-ul ajută la triere, dar camera RMN trebuie validată tehnic pe planuri și date de echipament.",
      },
    ],
    relatedArticles: [
      "cat-dureaza-amenajarea-camera-rmn",
      "pregatire-instalare-rmn",
      "camera-faraday-rmn",
      "verificari-inainte-achizitie-rmn",
    ],
    cta: {
      title: "Verifică pregătirea camerei RMN",
      description:
        "Folosește plannerul pentru a separa RF shielding, HVAC, acces, vibrații și integrare înainte de instalare.",
      label: "Planifică camera RMN",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "checklist-camera-ct-inainte-instalare",
    title: "Checklist cameră CT înainte de instalare",
    description:
      "Checklist tehnic pentru camera CT înainte de instalare: protecție radiologică, CNCAN, plumb, layout, acces echipament și service.",
    category: "Protecție radiologică",
    tags: ["checklist CT", "instalare CT", "CNCAN", "protecție radiologică"],
    readingTime: "13 min",
    targetKeyword: "checklist cameră CT înainte de instalare",
    relatedServices: [
      "/services/protectie-radiologica",
      "/services/radiologie",
      "/services/imagistica-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "O cameră CT trebuie verificată înainte de instalare prin prisma protecției radiologice, layout-ului, echipamentului, CNCAN, instalațiilor și accesului de service. Spre deosebire de RMN, discuția principală nu este RF shielding, ci radiații ionizante, ecranare cu plumb și zone controlate. Checklist-ul ajută la identificarea riscurilor înainte ca echipamentul să ajungă în șantier.",
    sections: [
      {
        id: "date-echipament",
        title: "Datele echipamentului CT",
        body: [
          "Înainte de instalare trebuie confirmat modelul echipamentului, dimensiunile, greutatea, cerințele de alimentare, răcire, date, poziționare, service și montaj. Fără fișa tehnică, camera este proiectată pe presupuneri, iar presupunerile pot afecta protecția radiologică și calendarul.",
          "Datele furnizorului trebuie corelate cu planurile spațiului. Poziția gantry-ului, consola, traseele tehnice și accesul pacientului influențează atât operarea, cât și protecția. Dacă echipamentul este deja cumpărat, verificarea trebuie făcută urgent, înainte de lucrări ireversibile.",
        ],
      },
      {
        id: "radioprotectie",
        title: "Protecție radiologică și plumb",
        body: [
          "Camera CT trebuie analizată pentru protecție radiologică. În funcție de echipament, utilizare și vecinătăți, pot fi necesare pereți protejați, uși plumbuite, sticlă plumbuită sau alte soluții constructive. Aceste decizii nu trebuie luate ca pachet standard, ci validate pe proiect.",
          "Protecția radiologică nu este același lucru cu RF shielding-ul. CT-ul implică radiații ionizante, deci discuția este despre doză, zone controlate, plumb și CNCAN. Dacă proiectul folosește termeni de RMN pentru o cameră CT, există risc de confuzie tehnică.",
        ],
        bullets: [
          "verificare vecinătăți și zone ocupate",
          "pereți, uși și geamuri protejate unde este cazul",
          "poziție operator și control acces",
          "documentație radioprotecție corelată cu layout-ul",
        ],
      },
      {
        id: "cncan-documentatie",
        title: "CNCAN și documentația tehnică",
        body: [
          "Pentru CT, CNCAN este o parte importantă a planificării deoarece echipamentul folosește radiații ionizante. Asta nu înseamnă că un checklist poate garanta autorizarea, ci că proiectul trebuie să pregătească date coerente: echipament, layout, protecție, vecinătăți și fluxuri.",
          "Documentația trebuie să reflecte camera reală. Dacă pereții, ușile, poziția echipamentului sau vecinătățile se schimbă după pregătirea documentelor, pot apărea întârzieri. De aceea, instalarea CT trebuie coordonată cu documentația, nu tratată ca etapă separată.",
        ],
      },
      {
        id: "acces-instalatii",
        title: "Acces, instalații și camera tehnică",
        body: [
          "Accesul pentru echipament trebuie verificat înainte de livrare: uși, coridoare, lifturi, platforme, goluri, manipulare și trasee temporare. O cameră CT pregătită impecabil poate fi inutilă dacă echipamentul nu poate fi introdus sau poziționat fără intervenții suplimentare.",
          "Instalațiile trebuie comparate cu cerințele furnizorului: alimentare, împământare, date, răcire, climatizare, trasee și acces pentru service. În proiectele existente, aceste verificări pot scoate la iveală lucrări necesare înainte de montaj.",
        ],
      },
      {
        id: "predare-service",
        title: "Testare, predare și service",
        body: [
          "Înainte de instalare trebuie clarificat cine verifică ce: constructorul, furnizorul echipamentului, echipa de protecție radiologică, beneficiarul și echipa de service. Lipsa responsabilităților clare duce la discuții dificile când apar probleme la final.",
          "Service-ul începe din proiectare. Camera trebuie să permită acces, mentenanță, verificări, intervenții și continuitate operațională. Un CT poate genera pierderi semnificative când este oprit, de aceea mentenanța preventivă și condițiile de operare trebuie planificate din start.",
        ],
        callout: {
          title: "Checklist orientativ",
          body: "Acest checklist ajută la triere. Camera CT trebuie validată pe planuri, echipament și documentație tehnică înainte de instalare.",
        },
      },
    ],
    faqs: [
      {
        question: "Care este diferența dintre checklist CT și checklist RMN?",
        answer:
          "CT-ul se verifică pentru protecție radiologică, plumb și CNCAN. RMN-ul se verifică pentru RF shielding, cușcă Faraday, HVAC și interferențe.",
      },
      {
        question: "Pot instala CT-ul înainte de clarificarea protecției radiologice?",
        answer:
          "Nu este recomandat. Protecția radiologică și layout-ul trebuie validate înainte de instalare.",
      },
      {
        question: "Ce trebuie verificat la acces?",
        answer:
          "Traseul de introducere, ușile, coridoarele, lifturile, manipularea, platformele și poziția finală a echipamentului.",
      },
      {
        question: "CNCAN garantează funcționarea camerei?",
        answer:
          "Nu. CNCAN privește zona de radiații ionizante, dar camera trebuie să fie și funcțională tehnic, operațional și serviceabil.",
      },
      {
        question: "Ce instrument ZES ajută la prima verificare?",
        answer:
          "Radiology Room Planner și calculatorul pentru cameră CT pot structura primele riscuri și date lipsă.",
      },
    ],
    relatedArticles: [
      "cat-dureaza-amenajarea-camera-ct",
      "verificari-inainte-instalare-ct",
      "autorizare-cncan-pas-cu-pas",
      "verificari-inainte-achizitie-ct",
    ],
    cta: {
      title: "Verifică pregătirea camerei CT",
      description:
        "Separă protecția radiologică, CNCAN, accesul, instalațiile și service-ul înainte de instalare.",
      label: "Calculează camera CT",
      href: "/calculatoare/cost-camera-ct",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "integrare-aparatura-medicala-clinica",
    title: "Ce presupune integrarea aparaturii medicale într-o clinică",
    description:
      "Integrarea aparaturii medicale înseamnă mai mult decât livrare: spațiu, instalații, date, workflow, service, training și validare tehnică.",
    category: "Aparatură medicală",
    tags: ["aparatură medicală", "integrare echipamente", "clinică", "service"],
    readingTime: "12 min",
    targetKeyword: "integrare aparatură medicală clinică",
    relatedServices: [
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Service Diagnostic", href: "/service-diagnostic" },
    ],
    intro:
      "Integrarea aparaturii medicale într-o clinică nu se oprește la achiziție și montaj. Un echipament trebuie să aibă spațiu potrivit, instalații suficiente, flux de lucru clar, conexiuni de date, acces de service, condiții de mediu, consumabile, mentenanță și responsabilități operaționale. Dacă aceste lucruri sunt lăsate după livrare, apar întârzieri, costuri suplimentare și echipamente care funcționează sub potențial.",
    sections: [
      {
        id: "dincolo-de-achizitie",
        title: "Integrarea începe înainte de achiziție",
        body: [
          "Alegerea echipamentului trebuie făcută împreună cu verificarea spațiului. Dimensiunile, greutatea, consumul, cerințele de alimentare, datele, ventilația, mobilierul, accesul și service-ul pot schimba layout-ul clinicii. Un preț bun la achiziție poate deveni scump dacă echipamentul cere modificări neplanificate.",
          "Beneficiarul trebuie să întrebe nu doar ce face aparatul, ci unde va sta, cine îl operează, cum se întreține, ce consumabile folosește și ce se întâmplă când are o eroare. Integrarea este zona în care decizia comercială se transformă în infrastructură reală.",
        ],
      },
      {
        id: "spatiu-instalatii",
        title: "Spațiu, instalații și condiții de mediu",
        body: [
          "Fiecare categorie de aparatură are cerințe diferite. Echipamentele de consultație pot fi simple, dar imagistica, IVD-ul, sterilizarea sau monitorizarea pot cere alimentare stabilă, date, ventilație, apă, evacuare, temperatură controlată sau zone de consumabile. Aceste cerințe trebuie introduse în proiectare.",
          "În spațiile existente, verificarea instalațiilor este esențială. Nu este suficient ca aparatul să încapă fizic. Trebuie să poată funcționa în condiții stabile, să nu blocheze fluxurile și să poată fi accesat pentru service. În caz contrar, clinica poate plăti pentru reparații și adaptări după instalare.",
        ],
        bullets: [
          "alimentare electrică și protecții",
          "date, conectivitate și integrare software",
          "HVAC, temperatură și ventilație",
          "mobilier, consumabile și spații suport",
          "acces service și mentenanță preventivă",
        ],
      },
      {
        id: "workflow",
        title: "Aparatura trebuie legată de workflow",
        body: [
          "Un echipament eficient într-un catalog poate deveni incomod într-o clinică dacă nu este integrat în flux. Cine pregătește pacientul? Unde se așteaptă? Unde se depozitează consumabilele? Cine preia rezultatele? Cum circulă probele sau datele? Aceste întrebări influențează productivitatea.",
          "Integrarea bună reduce pașii inutili și riscul de eroare. Într-un laborator, traseul probei contează. În imagistică, traseul pacientului, poziția operatorului și accesul echipamentului contează. În service, accesul rapid contează. Aparatura nu trebuie plasată unde rămâne loc, ci unde susține fluxul.",
        ],
      },
      {
        id: "service",
        title: "Service-ul este parte din integrare",
        body: [
          "Service-ul nu începe după prima defecțiune. El trebuie planificat din faza de proiect: acces la componente, spațiu de intervenție, condiții de mediu, istoric de mentenanță, contracte, consumabile și piese critice. Fără aceste elemente, uptime-ul clinicii depinde de reacții improvizate.",
          "Pentru echipamente critice, mentenanța preventivă este la fel de importantă ca montajul. Dacă aparatul susține venituri, programări sau fluxuri clinice importante, o oprire neplanificată poate afecta nu doar costul tehnic, ci și activitatea clinicii.",
        ],
      },
      {
        id: "imagistica-ivd",
        title: "Imagistică și IVD: integrare mai complexă",
        body: [
          "Echipamentele de imagistică și IVD cer o coordonare mai atentă. CT/RX pot implica protecție radiologică și CNCAN. RMN implică RF shielding, Faraday cage, HVAC și vibrații. IVD implică workflow de probe, calibrare, validare, QC, consumabile și service.",
          "A le trata ca simple achiziții duce la riscuri. Camera poate să nu fie pregătită, documentația poate fi incompletă, service-ul poate fi dificil, iar bugetul poate crește. Proposal Builder poate ajuta la prima structurare a serviciilor și fazelor, dar validarea finală trebuie făcută tehnic.",
        ],
        callout: {
          title: "Întreabă înainte de cumpărare",
          body: "Ce cere echipamentul de la spațiu, instalații, operator, service și documentație? Răspunsul trebuie aflat înainte de comandă.",
        },
      },
    ],
    faqs: [
      {
        question: "Integrarea aparaturii înseamnă doar instalare?",
        answer:
          "Nu. Integrarea include spațiu, instalații, workflow, date, service, consumabile, condiții de mediu și validare tehnică.",
      },
      {
        question: "Când trebuie analizată aparatura?",
        answer:
          "Înainte de proiectarea finală și înainte de achiziția echipamentelor critice.",
      },
      {
        question: "Ce risc apare dacă aparatura este aleasă târziu?",
        answer:
          "Poate cere modificări de instalații, compartimentări, HVAC, date, acces sau service după ce lucrările au început.",
      },
      {
        question: "Service-ul influențează layout-ul?",
        answer:
          "Da. Echipamentele trebuie să poată fi accesate pentru mentenanță și intervenții fără blocarea inutilă a clinicii.",
      },
      {
        question: "Ce instrument ZES ajută la structurare?",
        answer:
          "Proposal Builder și calculatorul de proiect medical pot evidenția servicii, riscuri, bugete orientative și date lipsă.",
      },
    ],
    relatedArticles: [
      "riscuri-aparatura-cumparata-inainte-proiectare",
      "greseli-alegere-aparatura-medicala",
      "alegere-aparatura-medicala-clinica",
      "echipamente-ivd-laborator-alegere-integrare-service",
    ],
    cta: {
      title: "Ai aparatură de integrat într-o clinică?",
      description:
        "Verifică spațiul, instalațiile, service-ul și workflow-ul înainte de decizia finală.",
      label: "Structurați propunerea",
      href: "/proposal-builder",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "planificare-infrastructura-imagistica-medicala",
    title: "Cum planifici infrastructura pentru imagistică medicală",
    description:
      "Planificarea infrastructurii pentru CT, RMN, RX și ecografie: spațiu, ecranare, instalații, autorizări, service și integrare.",
    category: "Imagistică",
    tags: ["imagistică medicală", "CT", "RMN", "RX", "infrastructură"],
    readingTime: "13 min",
    targetKeyword: "planificare infrastructură imagistică medicală",
    relatedServices: [
      "/services/imagistica-medicala",
      "/services/radiologie",
      "/services/rf-shielding",
      "/services/protectie-radiologica",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator echipamente imagistică", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Imagistica medicală trebuie planificată ca infrastructură critică, nu ca o simplă cameră cu echipament. CT, RMN, RX și ecografia au cerințe diferite de spațiu, instalații, ecranare, autorizare, service și operare. Un proiect bun separă corect riscurile fiecărei tehnologii și le coordonează cu obiectivele clinicii.",
    sections: [
      {
        id: "pornire",
        title: "Începe cu serviciul medical, nu cu aparatul",
        body: [
          "Prima întrebare este ce rol va avea imagistica în clinică. Va susține screening, diagnostic rapid, flux intern, trimitere externă, laborator, urgențe sau servicii specializate? Răspunsul influențează tipul echipamentului, volumul de pacienți, amplasarea, personalul și service-ul.",
          "Alegerea aparatului înainte de definirea fluxului poate duce la supra-investiție, subdimensionare sau spațiu greu de operat. O clinică poate avea nevoie de ecografie, RX, CT sau RMN, dar fiecare decizie trebuie legată de cerere, infrastructură, buget și capacitatea de operare.",
        ],
      },
      {
        id: "ct-rx",
        title: "CT și RX: protecție radiologică și CNCAN",
        body: [
          "Pentru CT și RX, discuția principală este protecția radiologică. Camera trebuie analizată în raport cu echipamentul, vecinătățile, poziția operatorului, zonele controlate, pereții, ușile și eventualele suprafețe vitrate. Aici apare și contextul CNCAN pentru radiații ionizante.",
          "Nu este recomandat să tratezi CT/RX ca pe simple camere tehnice. Protecția radiologică trebuie inclusă în layout, buget și calendar. Dacă este introdusă după execuție, apar refaceri și întârzieri. Calculatorul pentru cameră CT poate ajuta la o primă orientare.",
        ],
      },
      {
        id: "rmn",
        title: "RMN: RF shielding, Faraday cage și HVAC",
        body: [
          "RMN-ul are altă logică. Nu folosește radiații ionizante, deci nu se planifică prin plumb ca un CT. Camera RMN cere RF shielding, cușcă Faraday, ușă RF, filtre, waveguides, penetrări controlate, HVAC, vibrații și verificarea accesului magnetului.",
          "Această separare este esențială. Dacă proiectul amestecă RF shielding cu protecția radiologică, bugetul și execuția pot merge în direcția greșită. RMN-ul trebuie coordonat cu furnizorul echipamentului și cu echipa de shielding înainte de lucrările finale.",
        ],
        callout: {
          title: "Două lumi tehnice diferite",
          body: "CT/RX înseamnă radiații ionizante, plumb și CNCAN. RMN înseamnă RF shielding, Faraday cage și control electromagnetic.",
        },
      },
      {
        id: "instalatii-service",
        title: "Instalații, date și service",
        body: [
          "Imagistica cere infrastructură stabilă: alimentare electrică, date, HVAC, răcire, spații tehnice, acces pentru echipament și acces pentru service. Aceste cerințe nu trebuie tratate ca anexe, pentru că pot schimba soluția de amenajare și calendarul.",
          "Service-ul trebuie gândit încă din proiectare. Dacă echipamentul nu poate fi accesat pentru mentenanță, dacă temperatura nu este stabilă sau dacă traseele sunt greu de verificat, clinica va plăti ulterior prin downtime și intervenții dificile.",
        ],
      },
      {
        id: "buget-calendar",
        title: "Buget și calendar orientativ",
        body: [
          "Bugetul pentru imagistică trebuie împărțit pe categorii: echipament, amenajare, protecție radiologică sau RF shielding, instalații, documentație, integrare, testare și service. O singură sumă globală ascunde riscuri și face comparațiile comerciale greu de folosit.",
          "Calendarul trebuie să includă furnizorul echipamentului, lucrările speciale, documentația, montajul și testarea. Radiology Room Planner și Proposal Builder pot structura ipotezele, însă decizia finală cere validare tehnică pe planuri și specificații.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este primul pas în planificarea imagisticii?",
        answer:
          "Definirea rolului imagisticii în clinică, apoi alegerea echipamentului și verificarea infrastructurii necesare.",
      },
      {
        question: "CT și RMN au aceleași cerințe?",
        answer:
          "Nu. CT/RX cer protecție radiologică și CNCAN; RMN cere RF shielding, Faraday cage, HVAC și control electromagnetic.",
      },
      {
        question: "Ecografia are aceleași riscuri ca CT/RMN?",
        answer:
          "Nu. Ecografia este mai simplă ca infrastructură, dar tot cere spațiu, flux, alimentare, date și service.",
      },
      {
        question: "Când trebuie implicat furnizorul echipamentului?",
        answer:
          "Înainte de layout final și înainte de execuția instalațiilor, pentru cerințe tehnice reale.",
      },
      {
        question: "Ce instrument ZES este potrivit pentru imagistică?",
        answer:
          "Radiology Room Planner pentru camere CT/RMN/RX și calculatorul de imagistică pentru achiziție și integrare.",
      },
    ],
    relatedArticles: [
      "cum-alegi-ct-rmn-rx-clinica",
      "diferenta-rmn-ct-infrastructura",
      "cat-dureaza-amenajarea-camera-rmn",
      "cat-dureaza-amenajarea-camera-ct",
    ],
    cta: {
      title: "Planifici imagistică medicală?",
      description:
        "Clarifică tipul echipamentului, infrastructura, ecranarea și riscurile înainte de achiziție.",
      label: "Deschide Radiology Room Planner",
      href: "/radiology-room-planner",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "cum-alegi-ct-rmn-rx-clinica",
    title: "Cum alegi între CT, RMN și RX pentru o clinică",
    description:
      "Criterii practice pentru alegerea între CT, RMN și RX: servicii, infrastructură, autorizări, costuri orientative, service și operare.",
    category: "Imagistică",
    tags: ["CT", "RMN", "RX", "imagistică medicală", "clinică"],
    readingTime: "12 min",
    targetKeyword: "cum alegi CT RMN RX pentru clinică",
    relatedServices: [
      "/services/imagistica-medicala",
      "/services/radiologie",
      "/services/rf-shielding",
      "/services/protectie-radiologica",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator echipamente imagistică", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Alegerea între CT, RMN și RX nu este doar o decizie medicală sau comercială. Este și o decizie de infrastructură, autorizare, service, personal, flux pacient și buget. O clinică trebuie să înțeleagă ce poate susține spațiul, ce cerere există, ce riscuri tehnice apar și ce presupune operarea pe termen lung.",
    sections: [
      {
        id: "servicii",
        title: "Pornește de la serviciile pe care clinica vrea să le ofere",
        body: [
          "CT, RMN și RX răspund unor nevoi diferite. RX-ul poate susține investigații mai simple și fluxuri rapide. CT-ul aduce capacitate de diagnostic avansat, dar implică protecție radiologică și CNCAN. RMN-ul aduce o altă categorie de diagnostic, dar cere RF shielding, HVAC, acces magnet și integrare complexă.",
          "Decizia trebuie legată de specialitățile clinicii, volumul estimat, zona geografică, personal, parteneriate și modelul economic. O achiziție făcută doar pentru imagine comercială poate deveni o povară dacă infrastructura și cererea nu sunt pregătite.",
        ],
      },
      {
        id: "infrastructura",
        title: "Compară cerințele de infrastructură",
        body: [
          "RX și CT intră în zona radiațiilor ionizante. Asta înseamnă protecție radiologică, ecranare cu plumb, zone controlate și discuții CNCAN unde este cazul. Layout-ul, vecinătățile și poziția operatorului devin importante încă din concept.",
          "RMN-ul are altă logică. El cere RF shielding, Faraday cage, ușă RF, filtre, waveguides, control al penetrărilor, HVAC, vibrații, câmp magnetic și acces pentru magnet. RMN-ul nu trebuie planificat ca un CT cu altă marcă, pentru că riscurile sunt diferite.",
        ],
        callout: {
          title: "Criteriu critic",
          body: "Dacă spațiul nu poate susține infrastructura, echipamentul potrivit comercial poate deveni nepotrivit operațional.",
        },
      },
      {
        id: "buget",
        title: "Bugetul nu este doar prețul echipamentului",
        body: [
          "În imagistică, echipamentul este doar o parte din investiție. Bugetul trebuie să includă camera, instalațiile, protecția radiologică sau RF shielding-ul, HVAC-ul, documentația, montajul, testarea, software-ul, service-ul și eventualele adaptări ale clădirii.",
          "CT-ul poate aduce costuri legate de protecție radiologică și CNCAN. RMN-ul poate aduce costuri legate de RF shielding, acces magnet, HVAC și vibrații. RX-ul poate fi mai simplu, dar tot trebuie verificat pentru protecție, flux și integrare. Estimările trebuie să rămână orientative până la validarea tehnică.",
        ],
      },
      {
        id: "operare-service",
        title: "Operare, personal și service",
        body: [
          "Un echipament de imagistică are nevoie de personal, programare, mentenanță, consumabile, software, raportare, condiții de mediu și reacție la erori. Dacă aceste lucruri nu sunt planificate, echipamentul poate funcționa sub capacitate sau poate genera downtime scump.",
          "Service-ul trebuie inclus în decizia de achiziție. Cine intervine, în cât timp, ce piese sunt critice, ce mentenanță preventivă se face și ce condiții trebuie păstrate? Pentru CT și RMN, uptime-ul este o componentă comercială importantă, nu doar un detaliu tehnic.",
        ],
      },
      {
        id: "decizie",
        title: "Cum iei decizia fără să blochezi proiectul",
        body: [
          "O decizie sănătoasă compară trei scenarii: necesar medical, infrastructură posibilă și capacitate de operare. Dacă toate trei sunt aliniate, proiectul poate merge spre bugetare. Dacă unul lipsește, este mai bine să îl clarifici înainte de comandă.",
          "Calculatorul pentru echipamente de imagistică și Radiology Room Planner pot oferi o primă structură. ZES poate valida apoi spațiul, lista de echipamente, riscurile de shielding, documentația și service-ul. Scopul nu este să alegi cel mai spectaculos aparat, ci echipamentul care poate funcționa corect în clinica ta.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce este mai simplu de integrat: CT, RMN sau RX?",
        answer:
          "Depinde de proiect, dar RX-ul este de obicei mai simplu. CT-ul implică protecție radiologică și CNCAN, iar RMN-ul implică RF shielding și integrare complexă.",
      },
      {
        question: "RMN are nevoie de protecție cu plumb?",
        answer:
          "În mod obișnuit, nu. RMN-ul are nevoie de RF shielding și control electromagnetic, nu de plumb pentru radiații ionizante.",
      },
      {
        question: "CT-ul cere CNCAN?",
        answer:
          "CT-ul implică radiații ionizante, deci CNCAN este o zonă relevantă de planificare și documentație.",
      },
      {
        question: "Pot decide doar pe baza prețului echipamentului?",
        answer:
          "Nu este recomandat. Trebuie incluse infrastructura, shielding-ul, autorizările, service-ul și operarea.",
      },
      {
        question: "Care este primul pas?",
        answer:
          "Definirea serviciilor medicale și verificarea spațiului față de cerințele CT/RMN/RX.",
      },
    ],
    relatedArticles: [
      "planificare-infrastructura-imagistica-medicala",
      "diferenta-rmn-ct-infrastructura",
      "verificari-inainte-achizitie-rmn",
      "verificari-inainte-achizitie-ct",
    ],
    cta: {
      title: "Compari CT, RMN și RX pentru clinică?",
      description:
        "Structurează scenariile de infrastructură, buget și service înainte de decizia comercială.",
      label: "Estimează echipamentele de imagistică",
      href: "/calculatoare/cost-echipamente-imagistica",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "riscuri-aparatura-cumparata-inainte-proiectare",
    title: "Ce riscuri apar când aparatura este cumpărată înainte de proiectare",
    description:
      "Aparatura cumpărată înainte de proiectare poate genera rework, costuri ascunse, instalații insuficiente, probleme de autorizare și service dificil.",
    category: "Aparatură medicală",
    tags: ["aparatură medicală", "achiziție echipamente", "proiectare", "riscuri"],
    readingTime: "12 min",
    targetKeyword: "aparatură cumpărată înainte de proiectare",
    relatedServices: [
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Calculator echipamente imagistică", href: "/calculatoare/cost-echipamente-imagistica" },
    ],
    intro:
      "Cumpărarea aparaturii medicale înainte de proiectare poate părea eficientă: se blochează un preț, se rezervă livrarea, se face un pas concret. Dar dacă spațiul, instalațiile, fluxurile, autorizările și service-ul nu sunt validate, echipamentul poate deveni sursa principală de costuri suplimentare. Riscul nu este aparatul în sine, ci lipsa de aliniere între aparat și infrastructură.",
    sections: [
      {
        id: "spatiu-nepregatit",
        title: "Echipamentul poate cere un spațiu diferit",
        body: [
          "Dimensiunea, greutatea, accesul, zona de operare și service-ul pot schimba layout-ul. Un echipament ales pe hârtie poate să nu încapă confortabil, să blocheze fluxuri sau să ceară camere tehnice, mobilier sau zone suport neprevăzute.",
          "Într-o clinică, fiecare metru pătrat are rol operațional. Dacă aparatura apare după proiectare, poate forța compromisuri: camere prea mici, acces dificil, operatori poziționați prost sau depozitări improvizate. Aceste compromisuri se văd în operare, nu doar în șantier.",
        ],
      },
      {
        id: "instalatii",
        title: "Instalațiile pot fi insuficiente",
        body: [
          "Aparatura medicală poate cere alimentare electrică, protecții, împământare, date, apă, evacuare, aer comprimat, climatizare, răcire sau condiții speciale de mediu. Dacă proiectul nu știe aceste cerințe, instalațiile se execută generic și apoi se modifică.",
          "Modificările de instalații după execuție sunt costisitoare și pot întârzia deschiderea. Mai grav, pot afecta finisaje, compartimentări și documentație. O analiză de integrare înainte de achiziție reduce aceste riscuri și permite comparații comerciale mai realiste.",
        ],
      },
      {
        id: "radiologie",
        title: "Radiologia amplifică riscul",
        body: [
          "Dacă echipamentul este CT sau RX, apar cerințe de protecție radiologică, plumb, vecinătăți, zone controlate și CNCAN. Dacă echipamentul este RMN, apar cerințe de RF shielding, Faraday cage, HVAC, vibrații și acces magnet. Aceste riscuri nu sunt interschimbabile.",
          "Un CT cumpărat înainte de verificarea camerei poate impune modificări de layout și protecție. Un RMN cumpărat fără verificarea accesului magnetului sau RF shielding-ului poate bloca proiectul. De aceea, radiologia nu trebuie tratată ca simplă achiziție de aparatură.",
        ],
        callout: {
          title: "Regula simplă",
          body: "Nu cumpăra echipamentul critic înainte să știi ce cere de la spațiu, instalații, autorizări, shielding și service.",
        },
      },
      {
        id: "service-si-operare",
        title: "Service-ul poate deveni dificil",
        body: [
          "Un echipament instalat într-un colț incomod, fără acces, fără spațiu de intervenție sau fără condiții de mediu stabile poate funcționa, dar va fi greu de întreținut. Service-ul trebuie gândit înainte de montaj, nu după prima eroare.",
          "Downtime-ul costă mai mult decât o intervenție tehnică. Înseamnă programări amânate, personal nefolosit, pacienți nemulțumiți și pierderi operaționale. Mentenanța preventivă și accesul service sunt criterii de achiziție, nu detalii secundare.",
        ],
      },
      {
        id: "cum-reduci-riscul",
        title: "Cum reduci riscul înainte de comandă",
        body: [
          "Înainte de achiziție, cere fișa tehnică, cerințele de instalare, dimensiunile, consumul, HVAC-ul, datele, condițiile de service și recomandările furnizorului. Apoi compară aceste date cu spațiul real, nu cu o intenție de layout.",
          "Proposal Builder poate structura serviciile și riscurile, iar calculatorul de proiect medical poate oferi o primă estimare orientativă. Pentru echipamente de imagistică sau IVD, este recomandată o validare tehnică înainte de angajamente comerciale.",
        ],
      },
    ],
    faqs: [
      {
        question: "Este greșit să cumpăr aparatura înainte de proiectare?",
        answer:
          "Nu întotdeauna, dar este riscant dacă spațiul, instalațiile, accesul, shielding-ul și service-ul nu au fost validate.",
      },
      {
        question: "Care este cel mai mare risc?",
        answer:
          "Rework-ul: modificări de instalații, pereți, HVAC, documentație sau acces după ce bugetul părea deja stabil.",
      },
      {
        question: "Ce echipamente cer atenție specială?",
        answer:
          "CT, RMN, RX, echipamente IVD, sterilizare, monitorizare critică și orice echipament cu cerințe speciale de mediu sau service.",
      },
      {
        question: "Ce trebuie cerut de la furnizor?",
        answer:
          "Fișă tehnică, cerințe de instalare, consumuri, dimensiuni, service, HVAC, date, acces și condiții de operare.",
      },
      {
        question: "Cum ajută ZES?",
        answer:
          "ZES poate corela echipamentul cu infrastructura, amenajarea, shielding-ul, autorizările și service-ul înainte de decizia finală.",
      },
    ],
    relatedArticles: [
      "integrare-aparatura-medicala-clinica",
      "greseli-alegere-aparatura-medicala",
      "verificari-inainte-achizitie-rmn",
      "verificari-inainte-achizitie-ct",
    ],
    cta: {
      title: "Ai ales deja aparatura?",
      description:
        "Verifică impactul asupra spațiului, instalațiilor, shielding-ului și service-ului înainte de execuție.",
      label: "Structurați propunerea",
      href: "/proposal-builder",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "costuri-ascunse-amenajare-clinica-medicala",
    title: "Costuri ascunse în amenajarea unei clinici medicale",
    description:
      "Costurile ascunse într-o clinică apar din instalații, aparatură, service, autorizări, radiologie, IVD, downtime și decizii luate prea târziu.",
    category: "Infrastructură medicală",
    tags: ["costuri clinică", "amenajare medicală", "buget", "riscuri"],
    readingTime: "12 min",
    targetKeyword: "costuri ascunse amenajare clinică medicală",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
    ],
    intro:
      "În amenajarea unei clinici medicale, costurile ascunse nu apar doar pentru că bugetul a fost mic. Ele apar mai ales când proiectul nu include toate dependențele: instalații, fluxuri, aparatură, service, autorizări, consumabile, radiologie, IVD și fazarea lucrărilor. Un buget orientativ util nu promite un preț final, ci arată ce poate schimba costul.",
    sections: [
      {
        id: "instalatii",
        title: "Instalațiile sunt subestimate frecvent",
        body: [
          "O clinică nu funcționează doar cu finisaje curate. Alimentarea electrică, datele, HVAC-ul, apa, evacuările, iluminatul, ventilația, protecțiile și traseele tehnice pot schimba bugetul. Dacă acestea sunt tratate generic, apar modificări în timpul execuției.",
          "Costul ascuns apare când echipamentele cer mai mult decât s-a prevăzut. Un analizor IVD, un sistem de sterilizare, un RX sau o zonă de tratament pot necesita adaptări. De aceea, lista aparaturii trebuie discutată înainte de devizul final.",
        ],
      },
      {
        id: "aparatura",
        title: "Aparatura schimbă spațiul și bugetul",
        body: [
          "Aparatura medicală nu este doar o linie separată de achiziție. Ea influențează mobilierul, prizele, traseele de date, ventilația, accesul, service-ul, consumabilele și chiar fluxurile. Dacă este aleasă după amenajare, costurile apar ca refaceri.",
          "În imagistică, riscul este și mai mare. RMN-ul aduce RF shielding, Faraday cage, HVAC și vibrații. CT/RX aduc protecție radiologică, plumb și CNCAN. Aceste costuri nu trebuie amestecate și nu trebuie lăsate ca surprize de final.",
        ],
      },
      {
        id: "autorizari",
        title: "Autorizările pot crea costuri indirecte",
        body: [
          "DSP, iar unde este cazul CNCAN, influențează proiectul prin documentație, circuite, destinații, protecție și corelarea cu spațiul real. Costul nu este doar taxa sau documentul, ci timpul, modificările și coordonarea necesară pentru a face proiectul coerent.",
          "Dacă cerințele apar după execuție, clinica poate plăti de două ori: o dată pentru lucrare și încă o dată pentru corectare. O analiză tehnică preliminară reduce riscul de surprize și ajută la bugetarea pe faze.",
        ],
      },
      {
        id: "downtime",
        title: "Downtime-ul este un cost real",
        body: [
          "Pentru o clinică existentă, modernizarea sau amenajarea pe etape poate afecta programările, personalul și veniturile. Chiar și o întrerupere scurtă poate costa dacă nu este planificată. Acest cost nu apare întotdeauna în devizul de lucrări, dar apare în operare.",
          "Fazarea trebuie bugetată. Protecțiile temporare, lucrul în afara programului, relocarea unor servicii, curățenia, comunicarea și testarea pot fi necesare. O ofertă aparent ieftină care ignoră downtime-ul poate deveni scumpă pentru clinică.",
        ],
      },
      {
        id: "cum-le-controlezi",
        title: "Cum controlezi costurile ascunse",
        body: [
          "Separă bugetul pe categorii: proiectare, amenajare, instalații, aparatură, radiologie, IVD, service, autorizări, integrare și rezervă de risc. Apoi marchează ce este confirmat și ce este ipoteză. Bugetele orientative sunt utile doar când arată aceste ipoteze.",
          "Calculatorul de proiect medical și Proposal Builder pot structura riscurile și fazele. Pentru decizie, ZES trebuie să valideze planurile, lista de echipamente și constrângerile spațiului. Scopul este să reduci surprizele, nu să promiți un preț fix înainte de analiză.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care sunt cele mai frecvente costuri ascunse?",
        answer:
          "Instalațiile, integrarea aparaturii, service-ul, autorizările, modificările de layout, downtime-ul și cerințele de radiologie sau IVD.",
      },
      {
        question: "Pot estima costul doar pe metru pătrat?",
        answer:
          "Nu responsabil. Suprafața ajută, dar aparatura, fluxurile, instalațiile și autorizările pot schimba mult bugetul.",
      },
      {
        question: "Radiologia crește riscul de costuri ascunse?",
        answer:
          "Da. RMN implică RF shielding, iar CT/RX implică protecție radiologică și CNCAN unde este cazul.",
      },
      {
        question: "Cum reduc riscul înainte de execuție?",
        answer:
          "Prin analiză tehnică, listă de echipamente, validarea instalațiilor și buget pe faze cu ipoteze explicite.",
      },
      {
        question: "Ce instrument ZES ajută la bugetare?",
        answer:
          "Calculatorul de proiect medical și Proposal Builder pot oferi o primă structură orientativă.",
      },
    ],
    relatedArticles: [
      "buget-modernizare-clinica-medicala",
      "modernizare-clinica-existenta-pasi-riscuri",
      "riscuri-aparatura-cumparata-inainte-proiectare",
      "integrare-aparatura-medicala-clinica",
    ],
    cta: {
      title: "Vrei un buget fără surprize majore?",
      description:
        "Structurează fazele, echipamentele, riscurile și costurile orientative înainte de execuție.",
      label: "Calculează proiectul medical",
      href: "/calculator-proiect-medical",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "greseli-alegere-aparatura-medicala",
    title: "Greșeli frecvente în alegerea aparaturii medicale",
    description:
      "Greșeli frecvente la alegerea aparaturii medicale: decizie doar pe preț, lipsă de integrare, service neclar, spațiu neverificat și consumabile ignorate.",
    category: "Aparatură medicală",
    tags: ["aparatură medicală", "achiziție", "service", "integrare"],
    readingTime: "11 min",
    targetKeyword: "greșeli alegere aparatură medicală",
    relatedServices: [
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator echipamente imagistică", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Service Diagnostic", href: "/service-diagnostic" },
    ],
    intro:
      "Alegerea aparaturii medicale influențează investiția, fluxurile, service-ul și reputația clinicii. Greșelile apar când decizia este redusă la preț, brand sau termen de livrare, fără verificarea infrastructurii și operării. Un echipament bun pentru o clinică poate fi nepotrivit pentru alta dacă spațiul, personalul, consumabilele și service-ul nu sunt pregătite.",
    sections: [
      {
        id: "pret",
        title: "Alegerea doar pe preț",
        body: [
          "Prețul de achiziție este important, dar nu este costul complet. Aparatura poate cere consumabile, calibrare, mentenanță, piese, software, training, integrare, condiții de mediu și adaptări ale spațiului. O ofertă mai mică poate deveni mai scumpă dacă aceste lucruri nu sunt incluse.",
          "Comparația corectă trebuie să includă costul de operare și riscul de downtime. Pentru echipamente critice, disponibilitatea service-ului și timpul de intervenție pot conta mai mult decât diferența inițială de preț.",
        ],
      },
      {
        id: "infrastructura",
        title: "Ignorarea infrastructurii",
        body: [
          "Un echipament trebuie comparat cu spațiul real: dimensiuni, acces, alimentare, date, HVAC, mobilier, circulații și service. Dacă aceste cerințe sunt verificate după comandă, proiectul poate necesita modificări de layout sau instalații.",
          "În imagistică, greșeala devine critică. RMN-ul cere RF shielding și integrare specifică. CT/RX cer protecție radiologică și CNCAN. IVD-ul cere workflow de laborator, validare și service. Fiecare categorie trebuie tratată diferit.",
        ],
      },
      {
        id: "service",
        title: "Service neclar sau subestimat",
        body: [
          "Service-ul nu trebuie discutat abia după garanție. Beneficiarul trebuie să știe cine intervine, ce mentenanță preventivă este necesară, ce piese sunt critice, ce condiții anulează performanța și cum se gestionează erorile.",
          "Pentru CT, RMN, RX, IVD sau echipamente de laborator, uptime-ul poate influența direct activitatea clinicii. Alegerea fără un plan de mentenanță poate crea blocaje operaționale, chiar dacă echipamentul este performant.",
        ],
      },
      {
        id: "workflow",
        title: "Echipament bun, workflow greșit",
        body: [
          "Un aparat poate fi performant, dar plasat prost. Dacă pacientul, proba, operatorul, consumabilele sau rezultatul parcurg trasee inutile, clinica pierde eficiență. Aparatura trebuie aleasă în funcție de workflow, nu invers.",
          "Pentru laborator, analiza începe cu fluxul probelor. Pentru imagistică, începe cu pacientul, operatorul, camera și service-ul. Pentru tratamente, începe cu siguranța, consumabilele și ergonomia. Fără această legătură, echipamentul nu lucrează pentru clinică.",
        ],
      },
      {
        id: "validare",
        title: "Cum alegi mai responsabil",
        body: [
          "Cere fișa tehnică, condițiile de instalare, consumabilele, service-ul, cerințele de mediu, trainingul și integrarea software. Apoi verifică spațiul și bugetul complet. Nu bloca decizia până când nu știi ce trebuie modificat în clinică.",
          "ZES poate ajuta prin corelarea aparaturii cu infrastructura, amenajarea, imagistica, IVD-ul și service-ul. Calculatorul de echipamente sau Proposal Builder pot fi o primă etapă de orientare, dar decizia finală trebuie validată tehnic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este cea mai frecventă greșeală la aparatură?",
        answer:
          "Alegerea doar pe preț, fără calculul infrastructurii, consumabilelor, service-ului și costului de operare.",
      },
      {
        question: "Service-ul trebuie inclus în achiziție?",
        answer:
          "Da. Mentenanța, accesul, piesele și intervențiile influențează uptime-ul și costul real.",
      },
      {
        question: "Aparatura poate schimba layout-ul?",
        answer:
          "Da. Dimensiunile, accesul, instalațiile, HVAC-ul și service-ul pot schimba compartimentarea.",
      },
      {
        question: "Ce e diferit la CT/RMN?",
        answer:
          "CT/RX implică protecție radiologică și CNCAN. RMN implică RF shielding, Faraday cage, HVAC și vibrații.",
      },
      {
        question: "Cum poate ZES ajuta la alegere?",
        answer:
          "Prin validarea tehnică a echipamentului în raport cu spațiul, fluxul, infrastructura și service-ul.",
      },
    ],
    relatedArticles: [
      "alegere-aparatura-medicala-clinica",
      "riscuri-aparatura-cumparata-inainte-proiectare",
      "integrare-aparatura-medicala-clinica",
      "contract-mentenanta-aparatura-medicala",
    ],
    cta: {
      title: "Alegi aparatură pentru clinică?",
      description:
        "Verifică infrastructura, service-ul și costurile reale înainte de comandă.",
      label: "Estimează echipamentele",
      href: "/calculatoare/cost-echipamente-imagistica",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "planificare-fluxuri-clinica-medicala",
    title: "Cum se planifică fluxurile într-o clinică medicală",
    description:
      "Planificarea fluxurilor într-o clinică medicală: pacienți, personal, materiale, probe, aparatură, service, DSP și operare zilnică.",
    category: "Infrastructură medicală",
    tags: ["fluxuri clinică", "DSP", "amenajare medicală", "operare"],
    readingTime: "12 min",
    targetKeyword: "planificare fluxuri clinică medicală",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/aparatura-medicala",
      "/services/ivd-laborator",
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Fluxurile unei clinici medicale sunt traseele invizibile care decid dacă spațiul funcționează sau devine obositor. Pacienții, personalul, probele, materialele, aparatura, consumabilele și service-ul trebuie să circule logic. Un layout frumos, dar fără fluxuri clare, poate crea aglomerație, erori și costuri operaționale.",
    sections: [
      {
        id: "tipuri-fluxuri",
        title: "Ce fluxuri trebuie gândite",
        body: [
          "Cele mai vizibile fluxuri sunt cele ale pacienților și personalului, dar ele nu sunt singurele. Trebuie gândite fluxurile de probe, consumabile, materiale curate, materiale contaminate, deșeuri, aparatură mobilă, documente, rezultate și service.",
          "Nu toate clinicile au aceeași complexitate. Un cabinet simplu are fluxuri mai reduse decât un centru cu imagistică, laborator IVD sau proceduri. Totuși, orice proiect trebuie să aibă o logică operațională validată înainte de execuție.",
        ],
        bullets: [
          "pacienți și însoțitori",
          "personal medical și administrativ",
          "probe, consumabile și materiale",
          "deșeuri și zone suport",
          "service, mentenanță și acces tehnic",
        ],
      },
      {
        id: "dsp",
        title: "Fluxurile și DSP",
        body: [
          "DSP privește funcționarea medicală a spațiului, iar fluxurile sunt parte din această funcționare. Circuitele, destinațiile camerelor, zonele suport și condițiile de igienă trebuie corelate cu activitatea reală a clinicii.",
          "Când fluxurile sunt desenate după finisaje, apar compromisuri: spații suport insuficiente, trasee încrucișate, camere incomode sau acces service blocat. Aceste probleme pot afecta autorizarea, dar mai ales operarea de zi cu zi.",
        ],
      },
      {
        id: "aparatura",
        title: "Aparatura schimbă fluxurile",
        body: [
          "Aparatura medicală nu este neutră. Un laborator IVD schimbă traseul probelor. O cameră RX schimbă traseul pacientului și al operatorului. Un RMN cere acces, zone tehnice și condiții speciale. Service-ul cere acces fără blocarea întregii clinici.",
          "De aceea, aparatura principală trebuie introdusă în planificarea fluxurilor. Dacă este aleasă târziu, layout-ul poate arăta corect pe hârtie, dar să funcționeze prost în practică. Într-o clinică, ergonomia operațională este parte din calitate.",
        ],
      },
      {
        id: "receptie-zone-suport",
        title: "Recepție, așteptare și zone suport",
        body: [
          "Recepția este un nod de flux, nu doar o zonă de design. Aici se întâlnesc programările, pacienții, informațiile, plățile, trimiterea către cabinete și comunicarea internă. O recepție subdimensionată creează presiune în tot spațiul.",
          "Zonele suport sunt la fel de importante: depozitări, vestiare, grupuri sanitare, curățenie, server/date, consumabile și spații tehnice. Dacă sunt sacrificate pentru camere suplimentare, clinica câștigă pe hârtie și pierde în operare.",
        ],
      },
      {
        id: "validare",
        title: "Cum validezi fluxurile",
        body: [
          "Validarea fluxurilor se face prin scenarii: pacient nou, pacient recurent, probă de laborator, curățenie, aprovizionare, intervenție service, incident tehnic, oră aglomerată. Fiecare scenariu arată dacă spațiul susține activitatea sau o blochează.",
          "Consultantul AI și Proposal Builder pot structura primele funcțiuni și riscuri. Pentru proiectare, ZES poate valida fluxurile împreună cu aparatura, DSP, instalațiile și service-ul. Scopul este o clinică ușor de operat, nu doar corect desenată.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce este un flux într-o clinică?",
        answer:
          "Este traseul pacienților, personalului, materialelor, probelor, deșeurilor, echipamentelor și service-ului prin spațiu.",
      },
      {
        question: "Fluxurile influențează DSP?",
        answer:
          "Da. Funcționarea medicală și circuitele sunt relevante pentru pregătirea spațiului și documentației.",
      },
      {
        question: "Aparatura schimbă fluxurile?",
        answer:
          "Da. Imagistica, IVD-ul, sterilizarea și echipamentele critice pot schimba circulațiile și zonele suport.",
      },
      {
        question: "Când se validează fluxurile?",
        answer:
          "Înainte de layout final și înainte de execuție, prin scenarii operaționale concrete.",
      },
      {
        question: "Ce risc apare dacă fluxurile sunt ignorate?",
        answer:
          "Aglomerație, trasee inutile, camere incomode, service dificil și posibile modificări după execuție.",
      },
    ],
    relatedArticles: [
      "autorizare-dsp-clinica-medicala",
      "cum-se-construieste-o-clinica-medicala-in-romania",
      "integrare-aparatura-medicala-clinica",
      "modernizare-clinica-existenta-pasi-riscuri",
    ],
    cta: {
      title: "Proiectezi fluxurile unei clinici?",
      description:
        "Structurează funcțiunile, aparatura și zonele suport înainte de layout final.",
      label: "Începe analiza preliminară",
      href: "/ai-project-advisor",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "modernizare-clinica-existenta-pasi-riscuri",
    title: "Modernizare clinică existentă: pași, riscuri și priorități",
    description:
      "Modernizarea unei clinici existente cere audit tehnic, fazare, aparatură, fluxuri, service, downtime și prioritizare realistă.",
    category: "Infrastructură medicală",
    tags: ["modernizare clinică", "amenajări medicale", "downtime", "aparatură"],
    readingTime: "12 min",
    targetKeyword: "modernizare clinică existentă pași riscuri",
    relatedServices: [
      "/services/amenajari-medicale",
      "/services/constructii-medicale",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
    ],
    intro:
      "Modernizarea unei clinici existente este mai dificilă decât amenajarea unui spațiu gol, pentru că proiectul trebuie să țină cont de activitatea curentă, aparatura existentă, pacienți, personal, instalații vechi, documentație și downtime. Prioritatea nu este să schimbi totul, ci să alegi ordinea corectă a intervențiilor.",
    sections: [
      {
        id: "audit",
        title: "Începe cu auditul spațiului și al echipamentelor",
        body: [
          "Auditul trebuie să verifice planurile reale, instalațiile, fluxurile, finisajele, accesul, aparatura, istoricul de service și zonele care generează blocaje. Fără această etapă, modernizarea pornește de la impresii și poate rata cauzele reale ale problemelor.",
          "Este util să separi problemele urgente de dorințele estetice. Uneori, o clinică are nevoie mai întâi de instalații, service sau reorganizare de flux, nu de finisaje noi. Alteori, aparatura veche limitează serviciile și trebuie înlocuită sau integrată altfel.",
        ],
      },
      {
        id: "fazasare",
        title: "Fazarea lucrărilor și continuitatea operațională",
        body: [
          "O clinică activă nu poate fi tratată ca șantier liber. Modernizarea trebuie fazată: ce zone se închid, ce servicii rămân funcționale, când se lucrează, cum sunt protejați pacienții și cum se comunică schimbările.",
          "Fazarea reduce riscul operațional, dar poate crește complexitatea. Uneori, o oprire scurtă și bine planificată este mai eficientă decât luni de lucrări fragmentate. Decizia trebuie luată pe baza impactului real, nu doar a preferinței de a evita orice oprire.",
        ],
      },
      {
        id: "aparatura",
        title: "Aparatura existentă și aparatura nouă",
        body: [
          "Modernizarea trebuie să țină cont de echipamentele existente: care rămân, care se mută, care se înlocuiesc, care au nevoie de service și ce cerințe tehnice au. Mutarea unui echipament poate cere verificări, recalibrare sau adaptări ale spațiului.",
          "Dacă se adaugă imagistică sau laborator IVD, riscurile cresc. RMN înseamnă RF shielding și integrare specifică. CT/RX înseamnă protecție radiologică și CNCAN. IVD înseamnă flux de probe, calibrare, validare și service.",
        ],
      },
      {
        id: "prioritati",
        title: "Cum alegi prioritățile",
        body: [
          "Prioritățile trebuie stabilite după impact: siguranță, autorizare, operare, venituri, service, experiența pacientului și posibilitatea de extindere. Nu toate intervențiile au același efect. Unele reduc riscul imediat, altele cresc capacitatea clinicii.",
          "O matrice simplă ajută: impact mare / urgență mare, impact mare / urgență mică, impact mic / urgență mare, impact mic / urgență mică. Această abordare evită modernizarea decorativă înaintea infrastructurii critice.",
        ],
      },
      {
        id: "buget",
        title: "Buget și validare tehnică",
        body: [
          "Bugetul trebuie împărțit pe faze și pe riscuri: audit, proiectare, lucrări, instalații, aparatură, service, autorizări și downtime. Costurile ascunse apar când una dintre aceste categorii lipsește din plan.",
          "Calculatorul de proiect medical poate oferi o estimare orientativă, iar Proposal Builder poate structura pașii. Pentru decizia finală, ZES trebuie să valideze spațiul, aparatura și calendarul real de operare.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este primul pas într-o modernizare?",
        answer:
          "Auditul spațiului, instalațiilor, fluxurilor, aparaturii și documentației existente.",
      },
      {
        question: "Modernizarea poate fi făcută fără oprirea clinicii?",
        answer:
          "Uneori da, dar fazarea trebuie planificată atent. Uneori o oprire scurtă este mai sigură decât lucrări lungi în paralel.",
      },
      {
        question: "Aparatura existentă trebuie verificată?",
        answer:
          "Da. Mutarea, integrarea sau înlocuirea ei poate schimba instalațiile, service-ul și calendarul.",
      },
      {
        question: "Ce costuri apar frecvent în modernizare?",
        answer:
          "Instalații, downtime, service, reconfigurări, documentație, echipamente și adaptări pentru fluxuri noi.",
      },
      {
        question: "Cum prioritizez lucrările?",
        answer:
          "După impact asupra siguranței, operării, autorizării, veniturilor, service-ului și extinderii.",
      },
    ],
    relatedArticles: [
      "costuri-ascunse-amenajare-clinica-medicala",
      "buget-modernizare-clinica-medicala",
      "planificare-fluxuri-clinica-medicala",
      "modernizare-radiologie-clinica",
    ],
    cta: {
      title: "Modernizezi o clinică existentă?",
      description:
        "Prioritizează riscurile, fazarea și aparatura înainte de bugetul final.",
      label: "Calculează proiectul medical",
      href: "/calculator-proiect-medical",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "service-preventiv-vs-corectiv-aparatura-medicala",
    title: "Service preventiv vs service corectiv pentru aparatură medicală",
    description:
      "Diferența dintre service preventiv și corectiv pentru aparatură medicală: uptime, mentenanță, riscuri, costuri orientative și continuitate operațională.",
    category: "Service",
    tags: ["service aparatură", "mentenanță preventivă", "service corectiv", "uptime"],
    readingTime: "11 min",
    targetKeyword: "service preventiv vs corectiv aparatură medicală",
    relatedServices: [
      "/services/service-aparatura-medicala",
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
    ],
    relatedTools: [
      { label: "Service Diagnostic", href: "/service-diagnostic" },
      { label: "Calculator service aparatură", href: "/calculatoare/service-aparatura" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Service-ul preventiv și service-ul corectiv au roluri diferite. Preventivul încearcă să reducă riscul de oprire prin verificări, mentenanță și planificare. Corectivul intervine după ce problema a apărut. Pentru o clinică, diferența nu este doar tehnică, ci operațională: uptime, programări, pacienți, venituri și încredere.",
    sections: [
      {
        id: "preventiv",
        title: "Ce înseamnă service preventiv",
        body: [
          "Service-ul preventiv include verificări periodice, curățare tehnică, calibrare unde este cazul, verificarea condițiilor de mediu, update-uri, inspecții și recomandări înainte ca defectul să oprească echipamentul. Scopul nu este să elimine orice problemă, ci să reducă probabilitatea și impactul lor.",
          "Pentru aparatura critică, preventivul trebuie legat de utilizare. Un echipament folosit intens are alt regim decât unul folosit ocazional. CT, RMN, RX, IVD sau monitorizarea pacientului au cerințe diferite și trebuie tratate în funcție de rolul lor în clinică.",
        ],
      },
      {
        id: "corectiv",
        title: "Ce înseamnă service corectiv",
        body: [
          "Service-ul corectiv apare când echipamentul are o problemă: nu pornește, generează erori, produce imagini slabe, se supraîncălzește, funcționează intermitent sau afectează fluxul clinic. Intervenția este orientată spre diagnostic, remediere și readucerea echipamentului în funcțiune.",
          "Corectivul este inevitabil, dar devine riscant când este singura strategie. Fără istoric de mentenanță, fără contract, fără piese planificate și fără acces service, intervenția poate dura mai mult și poate afecta activitatea clinicii.",
        ],
      },
      {
        id: "uptime",
        title: "Impactul asupra uptime-ului",
        body: [
          "Uptime-ul este durata în care echipamentul poate fi folosit efectiv. Pentru aparatura de imagistică, laborator sau monitorizare, uptime-ul influențează programările, rezultatele, personalul și veniturile. Un echipament oprit nu este doar o problemă tehnică, ci o problemă de operare.",
          "Service-ul preventiv susține uptime-ul prin reducerea surprizelor. Service-ul corectiv restabilește funcționarea după incident. O clinică matură le folosește pe ambele: preventiv pentru control, corectiv pentru situații reale.",
        ],
      },
      {
        id: "cand-alegi",
        title: "Când merită preventivul și când corectivul",
        body: [
          "Mentenanța preventivă este mai importantă pentru echipamente critice, scumpe, folosite intens sau greu de înlocuit temporar. Corectivul punctual poate fi suficient pentru aparatură secundară, cu risc operațional redus, dar această decizie trebuie luată conștient.",
          "Nu există o formulă universală. Decizia depinde de tipul echipamentului, volum, contract, disponibilitate service, piese, vechime și impactul opririi. Service Diagnostic poate ajuta la prima triere a urgenței și riscului operațional.",
        ],
      },
      {
        id: "plan",
        title: "Cum construiești un plan de service",
        body: [
          "Planul de service trebuie să includă echipamentele critice, frecvența verificărilor, responsabilitățile, condițiile de mediu, istoricul incidentelor, piesele consumabile și modul de escaladare. Fără aceste informații, service-ul devine reactiv.",
          "ZES poate ajuta prin evaluarea aparaturii, recomandări de mentenanță, triere service și planificarea continuității operaționale. Scopul este să reduci opririle neplanificate și să ai un mod clar de reacție când apar probleme.",
        ],
      },
    ],
    faqs: [
      {
        question: "Service-ul preventiv elimină toate defecțiunile?",
        answer:
          "Nu. Reduce riscul și ajută la depistarea problemelor, dar nu garantează lipsa oricărei defecțiuni.",
      },
      {
        question: "Service-ul corectiv este suficient?",
        answer:
          "Poate fi suficient pentru echipamente secundare, dar este riscant pentru aparatura critică sau folosită intens.",
      },
      {
        question: "Ce echipamente au nevoie de preventiv serios?",
        answer:
          "CT, RMN, RX, IVD, echipamente de laborator, monitorizare pacient și aparatură critică pentru fluxul clinic.",
      },
      {
        question: "Cum se măsoară impactul operațional?",
        answer:
          "Prin downtime, programări afectate, venituri, personal blocat, urgență și posibilitatea de înlocuire temporară.",
      },
      {
        question: "Ce instrument ZES ajută la triere?",
        answer:
          "Service Diagnostic poate oferi o primă orientare privind urgența, riscul și pașii recomandați.",
      },
    ],
    relatedArticles: [
      "mentenanta-preventiva-aparatura-medicala",
      "contract-mentenanta-aparatura-medicala",
      "service-ct-rmn-mentenanta-uptime",
      "greseli-alegere-aparatura-medicala",
    ],
    cta: {
      title: "Ai o problemă de service sau mentenanță?",
      description:
        "Evaluează urgența, riscul de downtime și pașii recomandați înainte de intervenție.",
      label: "Deschide Service Diagnostic",
      href: "/service-diagnostic",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "contract-mentenanta-aparatura-medicala",
    title: "Când merită contract de mentenanță pentru aparatura medicală",
    description:
      "Contractul de mentenanță merită analizat în funcție de criticitatea echipamentului, uptime, service, piese, volum și risc operațional.",
    category: "Service",
    tags: ["contract mentenanță", "aparatură medicală", "service", "uptime"],
    readingTime: "11 min",
    targetKeyword: "contract mentenanță aparatură medicală",
    relatedServices: [
      "/services/service-aparatura-medicala",
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
    ],
    relatedTools: [
      { label: "Service Diagnostic", href: "/service-diagnostic" },
      { label: "Calculator service aparatură", href: "/calculatoare/service-aparatura" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Un contract de mentenanță pentru aparatură medicală nu este doar o cheltuială fixă. El poate fi o formă de control al riscului operațional. Merită analizat când echipamentul este critic, greu de înlocuit, folosit intens sau când downtime-ul afectează direct programările și veniturile clinicii.",
    sections: [
      {
        id: "cand-merita",
        title: "Când merită un contract de mentenanță",
        body: [
          "Contractul merită luat în calcul pentru echipamente care susțin activitatea zilnică: CT, RMN, RX, IVD, echipamente de laborator, monitorizare pacient sau aparatură fără alternativă rapidă. Cu cât impactul unei opriri este mai mare, cu atât mentenanța planificată devine mai importantă.",
          "Nu toate echipamentele au nevoie de același nivel de contract. Unele pot fi gestionate prin intervenții punctuale, altele au nevoie de verificări periodice, SLA-uri, piese și suport predictibil. Decizia trebuie legată de criticitate și volum, nu doar de prețul aparatului.",
        ],
      },
      {
        id: "ce-include",
        title: "Ce ar trebui clarificat într-un contract",
        body: [
          "Contractul trebuie să clarifice frecvența verificărilor, ce operațiuni sunt incluse, ce este exclus, timpul de răspuns, piesele, consumabilele, deplasările, calibrarea, documentarea intervențiilor și condițiile de mediu care pot influența performanța.",
          "Pentru echipamente critice, trebuie discutat și scenariul de downtime: cum se raportează problema, cine decide prioritatea, ce informații trebuie transmise, ce piese sunt frecvente și cum se păstrează istoricul de service.",
        ],
      },
      {
        id: "cost-vs-risc",
        title: "Costul contractului versus costul opririi",
        body: [
          "Un contract pare scump când este comparat doar cu o lună fără probleme. Devine mai ușor de justificat când este comparat cu o oprire majoră: programări amânate, personal blocat, pacienți reprogramați, venituri pierdute și intervenții urgente.",
          "Estimarea trebuie să fie orientativă și realistă. Nu orice contract previne orice problemă, dar poate reduce durata de reacție, poate organiza mentenanța și poate face costurile mai previzibile. Pentru o clinică în creștere, previzibilitatea contează.",
        ],
      },
      {
        id: "imagistica-ivd",
        title: "Imagistică și IVD: contracte cu impact mare",
        body: [
          "CT și RMN au impact operațional ridicat. RMN-ul are și condiții speciale de mediu, RF shielding, HVAC și integrare. CT-ul are protecție radiologică, utilizare intensă și componente critice. Pentru aceste echipamente, service-ul trebuie conectat la infrastructură.",
          "IVD-ul are alt tip de risc: fluxul probelor, calibrarea, validarea, QC-ul, consumabilele și continuitatea rezultatelor. Un analizor oprit poate afecta întregul laborator. Contractul trebuie adaptat la volumul și rolul echipamentului.",
        ],
      },
      {
        id: "decizie",
        title: "Cum iei decizia",
        body: [
          "Listează echipamentele, criticitatea, vechimea, istoricul incidentelor, volumul de utilizare, impactul opririi și disponibilitatea alternativelor. Apoi stabilește ce nivel de mentenanță este rezonabil: preventiv, corectiv prioritar, piese, calibrare sau suport extins.",
          "Calculatorul de service și Service Diagnostic pot ajuta la prima triere. Pentru decizie, ZES poate evalua aparatura, riscurile operaționale și modul în care mentenanța poate fi conectată la infrastructura clinicii.",
        ],
      },
    ],
    faqs: [
      {
        question: "Contractul de mentenanță este obligatoriu?",
        answer:
          "Depinde de echipament, context și cerințele furnizorului. Chiar când nu este obligatoriu, poate fi util pentru aparatura critică.",
      },
      {
        question: "Ce contează mai mult: prețul contractului sau timpul de răspuns?",
        answer:
          "Ambele contează, dar pentru echipamente critice timpul de răspuns și disponibilitatea service-ului pot avea impact mai mare.",
      },
      {
        question: "IVD-ul are nevoie de mentenanță planificată?",
        answer:
          "Da, în multe situații. Analizoarele IVD pot cere verificări, calibrare, consumabile, QC și continuitate operațională.",
      },
      {
        question: "Ce se întâmplă fără contract?",
        answer:
          "Clinica se bazează pe intervenții punctuale, care pot fi suficiente pentru unele echipamente, dar riscante pentru cele critice.",
      },
      {
        question: "Cum poate ZES ajuta?",
        answer:
          "Prin evaluarea riscului, recomandări de mentenanță, service și planificarea continuității operaționale.",
      },
    ],
    relatedArticles: [
      "service-preventiv-vs-corectiv-aparatura-medicala",
      "mentenanta-preventiva-aparatura-medicala",
      "service-ct-rmn-mentenanta-uptime",
      "echipamente-ivd-laborator-alegere-integrare-service",
    ],
    cta: {
      title: "Analizezi un contract de mentenanță?",
      description:
        "Evaluează criticitatea aparaturii, downtime-ul și nivelul de service potrivit.",
      label: "Evaluează service-ul",
      href: "/calculatoare/service-aparatura",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "pregatire-laborator-echipamente-ivd",
    title: "Cum se pregătește un laborator pentru echipamente IVD",
    description:
      "Pregătirea unui laborator pentru IVD cere workflow de probe, utilități, analyzere, consumabile, calibrare, validare, service și date.",
    category: "IVD / laborator",
    tags: ["IVD", "laborator", "echipamente laborator", "workflow probe"],
    readingTime: "12 min",
    targetKeyword: "pregătire laborator echipamente IVD",
    relatedServices: [
      "/services/ivd-laborator",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
    ],
    intro:
      "Un laborator pregătit pentru echipamente IVD nu înseamnă doar o cameră cu blaturi și prize. Înseamnă flux de probe, analyzere potrivite, utilități, consumabile, depozitare, calibrare, validare, date, service și control al riscului operațional. Pregătirea corectă începe înainte de achiziția echipamentelor.",
    sections: [
      {
        id: "workflow-probe",
        title: "Pornește de la fluxul probelor",
        body: [
          "Fluxul probelor dictează laboratorul: recoltare, recepție, pregătire, analiză, validare, raportare, stocare și eliminare. Dacă acest flux nu este clar, echipamentele pot fi amplasate greșit și personalul poate pierde timp în mișcări inutile.",
          "Laboratorul trebuie gândit pentru volum, tipuri de analize, urgență, consumabile și posibilitate de extindere. Un workflow simplu la început poate deveni blocaj dacă laboratorul crește și spațiul nu permite reorganizare.",
        ],
      },
      {
        id: "echipamente",
        title: "Alegerea echipamentelor IVD",
        body: [
          "Echipamentele IVD trebuie alese în funcție de meniu, volum, consumabile, service, integrare software, spațiu și cerințe de operare. Un analizor performant poate fi nepotrivit dacă fluxul de probe sau utilitățile nu îl susțin.",
          "Înainte de achiziție, trebuie clarificate cerințele de alimentare, apă, evacuare, temperatură, calibrare, QC, consumabile și mentenanță. Aceste date trebuie introduse în proiectul de amenajare, nu gestionate după livrare.",
        ],
      },
      {
        id: "utilitati-date",
        title: "Utilități, date și spații suport",
        body: [
          "Laboratorul IVD poate cere alimentare stabilă, apă, evacuare, ventilație, temperatură, date, spații de consumabile, zone de depozitare și trasee curate. Dacă aceste elemente sunt subdimensionate, echipamentele pot funcționa greu sau pot genera rework.",
          "Integrarea digitală contează. Rezultatele, interfațarea, raportarea și trasabilitatea trebuie discutate împreună cu echipamentele. Chiar dacă implementarea software vine mai târziu, infrastructura de date trebuie pregătită.",
        ],
      },
      {
        id: "validare-service",
        title: "Calibrare, validare și service",
        body: [
          "Echipamentele IVD cer proceduri de calibrare, validare, QC și mentenanță. Aceste lucruri nu sunt detalii administrative, ci condiții pentru funcționare predictibilă. Fără ele, laboratorul poate avea rezultate întârziate, erori sau opriri neplanificate.",
          "Service-ul trebuie inclus în planificare: acces la echipamente, consumabile, piese, istoricul intervențiilor și responsabilități. Un laborator blocat de un analizor oprit are impact direct asupra fluxului medical.",
        ],
      },
      {
        id: "buget",
        title: "Buget orientativ și fazare",
        body: [
          "Bugetul laboratorului trebuie separat pe amenajare, utilități, echipamente IVD, consumabile inițiale, integrare, calibrare, validare și service. O singură sumă globală ascunde ce poate schimba costul.",
          "Calculatorul pentru laborator IVD poate oferi o primă estimare orientativă. Pentru decizie, ZES trebuie să valideze fluxul probelor, echipamentele, spațiul și cerințele de service.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce trebuie definit înainte de echipamentele IVD?",
        answer:
          "Meniul de analize, volumul, fluxul probelor, utilitățile, consumabilele, datele și service-ul.",
      },
      {
        question: "Laboratorul IVD are nevoie de spații suport?",
        answer:
          "Da. Consumabile, depozitare, pregătire probe, deșeuri, date și acces service pot necesita zone dedicate.",
      },
      {
        question: "Ce risc apare dacă echipamentele sunt alese târziu?",
        answer:
          "Instalațiile, blaturile, fluxurile și datele pot necesita modificări după amenajare.",
      },
      {
        question: "Calibrarea și validarea se planifică din proiect?",
        answer:
          "Da. Ele influențează punerea în funcțiune, operarea și continuitatea laboratorului.",
      },
      {
        question: "Ce instrument ZES ajută la estimare?",
        answer:
          "Calculatorul pentru laborator IVD și Proposal Builder pot structura primele faze și riscuri.",
      },
    ],
    relatedArticles: [
      "echipamente-necesare-laborator-ivd",
      "integrare-echipamente-ivd-flux-laborator",
      "echipamente-ivd-laborator-alegere-integrare-service",
      "contract-mentenanta-aparatura-medicala",
    ],
    cta: {
      title: "Pregătești un laborator IVD?",
      description:
        "Clarifică fluxul, echipamentele, utilitățile și service-ul înainte de achiziție.",
      label: "Calculează laboratorul IVD",
      href: "/calculatoare/cost-laborator-ivd",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "integrare-echipamente-ivd-flux-laborator",
    title: "Integrarea echipamentelor IVD cu fluxul de lucru al laboratorului",
    description:
      "Integrarea IVD trebuie corelată cu fluxul probelor, analyzerele, validarea, raportarea, consumabilele, service-ul și datele laboratorului.",
    category: "IVD / laborator",
    tags: ["IVD", "workflow laborator", "integrare echipamente", "validare"],
    readingTime: "12 min",
    targetKeyword: "integrare echipamente IVD flux laborator",
    relatedServices: [
      "/services/ivd-laborator",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Service Diagnostic", href: "/service-diagnostic" },
    ],
    intro:
      "Integrarea echipamentelor IVD cu fluxul laboratorului decide cât de repede, clar și sigur pot circula probele și rezultatele. Un analizor nu este izolat. El interacționează cu recoltarea, pregătirea probelor, consumabilele, validarea, raportarea, service-ul și datele. Dacă aceste legături nu sunt proiectate, laboratorul devine dependent de improvizații.",
    sections: [
      {
        id: "flux",
        title: "Fluxul probei este coloana vertebrală",
        body: [
          "O probă trece prin mai multe stări: primire, identificare, pregătire, analiză, validare, raportare și eventual stocare. Fiecare etapă trebuie să aibă loc fizic și digital. Dacă aparatul este amplasat fără această logică, personalul pierde timp și crește riscul de eroare.",
          "În laboratoarele mici, fluxul poate părea simplu. Totuși, pe măsură ce volumul crește, distanțele, aglomerarea, depozitarea și raportarea devin critice. Integrarea IVD trebuie gândită pentru ziua de azi și pentru extinderea realistă.",
        ],
      },
      {
        id: "echipamente-consumabile",
        title: "Echipamente, consumabile și utilități",
        body: [
          "Echipamentele IVD au nevoie de consumabile, reactivi, control, calibrare, spații de pregătire și condiții de mediu. Dacă aceste elemente nu sunt plasate aproape și logic, laboratorul devine lent.",
          "Utilitățile trebuie verificate înainte de instalare: alimentare, apă, evacuare, ventilație, temperatură, date și spațiu de service. O integrare bună reduce traseele inutile și face mentenanța mai simplă.",
        ],
      },
      {
        id: "date-raportare",
        title: "Date, raportare și trasabilitate",
        body: [
          "Integrarea IVD include și fluxul informației. Rezultatele trebuie colectate, validate, raportate și arhivate. Chiar dacă platforma software este decisă separat, laboratorul trebuie să aibă infrastructura de date pregătită.",
          "Trasabilitatea este importantă pentru control intern și calitate. Fără reguli clare, rezultatele pot circula prin metode improvizate, iar laboratorul pierde timp. Echipamentele, oamenii și datele trebuie proiectate împreună.",
        ],
      },
      {
        id: "validare-service",
        title: "Validare, QC și service",
        body: [
          "Echipamentele IVD trebuie integrate cu procedurile de calibrare, validare și control al calității. Aceste proceduri pot cere spații, consumabile, timpi și responsabilități. Dacă sunt ignorate, punerea în funcțiune poate întârzia.",
          "Service-ul trebuie să aibă acces la echipamente fără blocarea întregului laborator. Istoricul intervențiilor, mentenanța preventivă și piesele critice ajută la continuitate. Pentru laboratoare cu volum mare, downtime-ul unui analizor poate afecta întregul flux.",
        ],
      },
      {
        id: "proiectare",
        title: "Cum se proiectează integrarea",
        body: [
          "Integrarea începe cu o hartă a fluxului: de unde vine proba, ce se întâmplă cu ea, cine validează, unde ajunge rezultatul și ce se întâmplă când apar erori. Apoi se aleg echipamentele și se verifică spațiul.",
          "ZES poate corela amenajarea, echipamentele IVD, utilitățile, service-ul și fluxul laboratorului. Calculatorul IVD oferă o primă estimare, iar Proposal Builder poate transforma datele într-o structură de propunere preliminară.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce înseamnă integrare IVD?",
        answer:
          "Corelarea echipamentelor cu fluxul probelor, utilitățile, datele, validarea, consumabilele și service-ul.",
      },
      {
        question: "De ce contează fluxul probei?",
        answer:
          "Pentru că el dictează amplasarea echipamentelor, timpul de lucru, riscul de eroare și productivitatea laboratorului.",
      },
      {
        question: "Datele trebuie planificate din proiect?",
        answer:
          "Da. Raportarea, trasabilitatea și interfațarea cer infrastructură și responsabilități clare.",
      },
      {
        question: "Service-ul influențează laboratorul?",
        answer:
          "Da. Accesul pentru mentenanță și istoricul service susțin continuitatea operațională.",
      },
      {
        question: "Ce instrument ZES ajută?",
        answer:
          "Calculatorul laborator IVD și Proposal Builder pot structura riscurile, fazele și bugetul orientativ.",
      },
    ],
    relatedArticles: [
      "pregatire-laborator-echipamente-ivd",
      "echipamente-necesare-laborator-ivd",
      "echipamente-ivd-laborator-alegere-integrare-service",
      "service-preventiv-vs-corectiv-aparatura-medicala",
    ],
    cta: {
      title: "Integrezi echipamente IVD?",
      description:
        "Verifică fluxul probelor, utilitățile, datele și service-ul înainte de instalare.",
      label: "Calculează laboratorul IVD",
      href: "/calculatoare/cost-laborator-ivd",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "verificari-inainte-achizitie-rmn",
    title: "Ce trebuie verificat înainte de achiziția unui echipament RMN",
    description:
      "Înainte de achiziția unui RMN trebuie verificate spațiul, accesul magnetului, RF shielding-ul, HVAC-ul, vibrațiile, service-ul și integrarea.",
    category: "RF shielding",
    tags: ["achiziție RMN", "RF shielding", "camera RMN", "imagistică"],
    readingTime: "12 min",
    targetKeyword: "verificări înainte achiziție RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/radiologie",
      "/services/aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Achiziția unui RMN trebuie verificată înainte de semnarea deciziei comerciale. Echipamentul influențează camera, accesul, RF shielding-ul, HVAC-ul, vibrațiile, service-ul, calendarul și bugetul. Un RMN ales fără validarea spațiului poate crea costuri și întârzieri care nu apar în oferta aparatului.",
    sections: [
      {
        id: "spatiu-acces",
        title: "Spațiul și accesul magnetului",
        body: [
          "Primul control este fizic: camera, traseul de acces, ușile, coridoarele, lifturile, platformele, structura și manipularea. Magnetul trebuie introdus, poziționat și service-at. Dacă accesul nu este posibil, livrarea devine problemă de construcție, nu doar logistică.",
          "Planurile trebuie comparate cu dimensiunile reale ale echipamentului. În spații existente, pot apărea limitări de înălțime, rezistență, traseu sau vecinătăți. Acestea trebuie cunoscute înainte de comandă.",
        ],
      },
      {
        id: "rf",
        title: "RF shielding și Faraday cage",
        body: [
          "RMN-ul cere RF shielding, nu ecranare cu plumb. Camera trebuie pregătită cu cușcă Faraday, ușă RF, filtre, waveguides și penetrări controlate. Cerințele depind de echipament, spațiu și performanța necesară.",
          "Dacă RF shielding-ul este bugetat după achiziție, costul real poate surprinde beneficiarul. Este mai sigur ca cerințele de shielding să fie discutate împreună cu furnizorul RMN și echipa tehnică înainte de semnare.",
        ],
      },
      {
        id: "hvac-vibratii",
        title: "HVAC, vibrații și condiții de mediu",
        body: [
          "RMN-ul are nevoie de condiții stabile de mediu. HVAC-ul, temperatura, umiditatea, zgomotul, traseele și compatibilitatea cu RF shielding-ul trebuie verificate. O soluție HVAC improvizată poate afecta performanța și service-ul.",
          "Vibrațiile și vecinătățile pot influența calitatea imaginii. Înainte de achiziție, este util să verifici clădirea, sursele mecanice, lifturile, traficul și alte echipamente. Aceste riscuri sunt mai ușor de gestionat înainte de instalare.",
        ],
      },
      {
        id: "service-buget",
        title: "Service, consumabile și buget complet",
        body: [
          "Service-ul trebuie discutat înainte de achiziție: mentenanță, timp de răspuns, acces, piese, condiții, istoric și responsabilități. Un RMN cu service greu accesibil poate deveni o investiție vulnerabilă.",
          "Bugetul complet include echipamentul, camera, RF shielding, HVAC, lucrări, testare, integrare și service. Calculatorul pentru cameră RMN poate oferi o primă estimare orientativă, dar decizia cere validare tehnică.",
        ],
        callout: {
          title: "Nu cumpăra RMN-ul izolat",
          body: "RMN-ul trebuie cumpărat împreună cu înțelegerea camerei, RF shielding-ului, HVAC-ului, accesului și service-ului.",
        },
      },
    ],
    faqs: [
      {
        question: "Ce verific înainte de achiziția RMN?",
        answer:
          "Spațiul, accesul magnetului, RF shielding-ul, HVAC-ul, vibrațiile, service-ul și cerințele furnizorului.",
      },
      {
        question: "RMN are nevoie de plumb?",
        answer:
          "În mod obișnuit, nu. RMN are nevoie de RF shielding și control electromagnetic.",
      },
      {
        question: "Când se bugetează RF shielding-ul?",
        answer:
          "Înainte de decizia finală de achiziție, pentru a înțelege costul complet al proiectului.",
      },
      {
        question: "Service-ul influențează achiziția?",
        answer:
          "Da. Timpul de răspuns, mentenanța, piesele și accesul pot influența uptime-ul.",
      },
      {
        question: "Ce instrument ZES ajută?",
        answer:
          "Calculatorul pentru cameră RMN și Radiology Room Planner pot structura primele riscuri.",
      },
    ],
    relatedArticles: [
      "checklist-camera-rmn-inainte-instalare",
      "cat-dureaza-amenajarea-camera-rmn",
      "camera-faraday-rmn",
      "riscuri-aparatura-cumparata-inainte-proiectare",
    ],
    cta: {
      title: "Verifici achiziția unui RMN?",
      description:
        "Evaluează camera, RF shielding-ul, accesul și service-ul înainte de comandă.",
      label: "Calculează camera RMN",
      href: "/calculatoare/cost-camera-rmn",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
  {
    slug: "verificari-inainte-achizitie-ct",
    title: "Ce trebuie verificat înainte de achiziția unui echipament CT",
    description:
      "Înainte de achiziția unui CT trebuie verificate camera, protecția radiologică, CNCAN, accesul echipamentului, instalațiile, service-ul și bugetul complet.",
    category: "Protecție radiologică",
    tags: ["achiziție CT", "CNCAN", "protecție radiologică", "camera CT"],
    readingTime: "12 min",
    targetKeyword: "verificări înainte achiziție CT",
    relatedServices: [
      "/services/protectie-radiologica",
      "/services/imagistica-medicala",
      "/services/radiologie",
      "/services/aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Achiziția unui CT trebuie verificată tehnic înainte de decizia comercială. Echipamentul implică radiații ionizante, protecție radiologică, CNCAN, layout, alimentare, HVAC, acces, service și documentație. Un CT cumpărat fără validarea camerei poate genera rework și întârzieri.",
    sections: [
      {
        id: "camera-layout",
        title: "Camera și layout-ul",
        body: [
          "Camera CT trebuie verificată pentru dimensiuni, poziția echipamentului, zona operatorului, traseul pacientului, accesul pentru montaj și zonele suport. Layout-ul influențează atât operarea, cât și protecția radiologică.",
          "Datele furnizorului trebuie comparate cu spațiul real. Dacă modelul este ales înainte de verificare, beneficiarul poate descoperi că sunt necesare modificări de pereți, uși, instalații sau fluxuri.",
        ],
      },
      {
        id: "radioprotectie-cncan",
        title: "Protecție radiologică și CNCAN",
        body: [
          "CT-ul folosește radiații ionizante, deci trebuie analizată protecția radiologică. Pereții, ușile, sticla, vecinătățile și zonele controlate pot influența bugetul și calendarul. Acesta nu este RF shielding pentru RMN.",
          "CNCAN trebuie tratat ca parte din planificare, fără promisiuni de rezultat automat. Documentația, calculele și datele tehnice trebuie să fie coerente cu echipamentul și camera reală.",
        ],
      },
      {
        id: "instalatii-acces",
        title: "Instalații, acces și montaj",
        body: [
          "Înainte de achiziție trebuie verificate alimentarea, datele, HVAC-ul, răcirea, traseele, împământarea și camera tehnică unde este cazul. Un echipament CT poate cere adaptări care nu sunt vizibile în oferta comercială.",
          "Accesul de montaj este critic: uși, coridoare, lifturi, platforme, greutate și manipulare. Dacă accesul nu este verificat, proiectul poate întârzia chiar dacă echipamentul a fost livrat la timp.",
        ],
      },
      {
        id: "service-operare",
        title: "Service, operare și buget complet",
        body: [
          "Service-ul influențează decizia: mentenanță, timp de răspuns, acces, piese, condiții de mediu și istoricul intervențiilor. Un CT oprit poate afecta semnificativ programările și veniturile clinicii.",
          "Bugetul complet include echipamentul, camera, protecția radiologică, lucrările, documentația, instalarea, testarea și service-ul. Calculatorul pentru cameră CT oferă o primă orientare, dar validarea finală trebuie făcută pe proiect.",
        ],
        callout: {
          title: "CT nu este RMN",
          body: "Pentru CT, discuția este despre radiații ionizante, protecție radiologică, plumb și CNCAN, nu despre cușcă Faraday.",
        },
      },
    ],
    faqs: [
      {
        question: "Ce verific înainte de achiziția CT?",
        answer:
          "Camera, layout-ul, protecția radiologică, CNCAN, instalațiile, accesul, service-ul și bugetul complet.",
      },
      {
        question: "CT are nevoie de RF shielding?",
        answer:
          "În mod obișnuit, nu. CT-ul are nevoie de protecție radiologică și ecranare cu plumb unde este cazul.",
      },
      {
        question: "CNCAN trebuie analizat înainte de comandă?",
        answer:
          "Da. CT-ul implică radiații ionizante, iar documentația trebuie inclusă în planificare.",
      },
      {
        question: "Poate aparatul schimba camera?",
        answer:
          "Da. Dimensiunile, poziția, alimentarea, răcirea și service-ul pot schimba layout-ul.",
      },
      {
        question: "Ce instrument ZES ajută?",
        answer:
          "Calculatorul pentru cameră CT și Radiology Room Planner pot structura primele riscuri.",
      },
    ],
    relatedArticles: [
      "checklist-camera-ct-inainte-instalare",
      "cat-dureaza-amenajarea-camera-ct",
      "autorizare-cncan-pas-cu-pas",
      "riscuri-aparatura-cumparata-inainte-proiectare",
    ],
    cta: {
      title: "Verifici achiziția unui CT?",
      description:
        "Clarifică protecția radiologică, CNCAN, camera și service-ul înainte de comandă.",
      label: "Calculează camera CT",
      href: "/calculatoare/cost-camera-ct",
    },
    publishedAt: "2026-05-21",
    updatedAt: "2026-05-21",
  },
];

const authorityArticleUpgrades: Record<string, Partial<Article>> = {
  "cum-se-construieste-o-clinica-medicala-in-romania": {
    readingTime: "18 min",
    tags: [
      "construcții clinici medicale",
      "DSP",
      "CNCAN",
      "aparatură medicală",
      "turnkey",
      "radiologie",
    ],
    relatedServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/radiologie",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
    ],
    intro:
      "Construirea unei clinici medicale în România este un proiect de infrastructură, nu doar o amenajare cu recepție, cabinete și finisaje lavabile. O clinică funcțională trebuie să lege fluxuri medicale, cerințe DSP, instalații, aparatură, acces de service, documentație și un mod realist de operare după deschidere. Când aceste decizii sunt amânate, proiectul pare mai simplu la început, dar devine mai scump și mai lent în execuție. Când sunt tratate din prima fază, spațiul devine predictibil, autorizabil și scalabil.",
    sections: [
      {
        id: "ce-inseamna-clinica-medicala",
        title: "Ce înseamnă, tehnic, o clinică medicală",
        body: [
          "O clinică medicală nu este un birou adaptat pentru consultații. Este un sistem în care pacienții, personalul, echipamentele, materialele, probele, deșeurile, documentele și intervențiile de service circulă după reguli clare. Această realitate schimbă modul în care se proiectează recepția, cabinetele, zonele de tratament, spațiile de sterilizare, grupurile sanitare, depozitarea, camera tehnică și zonele pentru personal.",
          "Diferența majoră față de un spațiu comercial obișnuit apare la nivel de responsabilitate tehnică. Un perete mutat prea târziu poate afecta circuite DSP. O alegere întârziată de aparatură poate modifica alimentarea electrică, datele, HVAC-ul sau accesul de service. O cameră de radiologie introdusă după concept poate schimba complet logica proiectului prin protecție radiologică, CNCAN și condiții de operare.",
        ],
        callout: {
          title: "Principiu ZES",
          body: "Într-un proiect medical bun, arhitectura, instalațiile, aparatura și autorizările se proiectează împreună, nu în etape izolate.",
        },
      },
      {
        id: "etapa-1-analiza-tehnica",
        title: "Etapa 1: analiza tehnică înainte de proiectare",
        body: [
          "Prima etapă ar trebui să clarifice ce tip de activitate medicală va funcționa în spațiu: consultații, tratamente, imagistică, laborator, recoltare, recuperare, proceduri sau o combinație între ele. Fiecare activitate produce cerințe diferite pentru compartimentare, instalații, materiale, ventilație, protecție, depozitare și mentenanță.",
          "Analiza tehnică trebuie să includă suprafața disponibilă, starea clădirii, accesul pacienților, accesul echipamentelor, traseele pentru materiale, cerințele de alimentare electrică, climatizarea, rețeaua de date, posibilitatea de extindere și restricțiile date de vecinătăți. Dacă proiectul include CT, RX, fluoroscopie sau RMN, această discuție trebuie purtată înainte de layout-ul final, nu după ce camera este deja desenată.",
        ],
        bullets: [
          "specialități medicale și fluxuri clinice",
          "suprafață, compartimentare și vecinătăți",
          "cerințe pentru aparatură, service și mentenanță",
          "riscuri DSP, CNCAN, radiologie sau laborator",
        ],
      },
      {
        id: "dsp-si-autorizari",
        title: "DSP și autorizările medicale",
        body: [
          "DSP influențează modul în care spațiul poate funcționa medical. Cerințele pot atinge circuitele, finisajele, igiena, grupurile sanitare, zonele de așteptare, compartimentarea, fluxurile personalului și documentația necesară. De aceea, DSP nu trebuie tratat ca o verificare de final, ci ca o condiție de proiectare.",
          "În practică, multe probleme apar când un spațiu este amenajat frumos, dar nu este coerent medical. Circuitele sunt neclare, spațiile suport sunt insuficiente, zonele tehnice lipsesc, iar documentația trebuie refăcută. O abordare corectă pornește de la activitatea medicală și construiește spațiul în jurul ei, nu invers.",
        ],
      },
      {
        id: "cncan-si-radiologie",
        title: "CNCAN și radiologia în proiectele medicale",
        body: [
          "Dacă proiectul include radiologie cu CT, RX sau fluoroscopie, apare o zonă tehnică separată: protecția radiologică și cerințele CNCAN. Acestea nu sunt același lucru cu cerințele DSP și nu trebuie confundate cu RF shielding-ul pentru RMN. Pentru CT și RX, discuția se poartă despre radiații ionizante, zone controlate, pereți protejați, uși plumbuite, sticlă plumbuită și documentație specifică.",
          "Un proiect medical care introduce radiologia prea târziu riscă să refacă pereți, uși, ferestre, trasee și instalații. De aceea, camera de radiologie trebuie analizată împreună cu echipamentul, vecinătățile, fluxul pacienților, poziția operatorului, spațiul tehnic și cerințele de service. Pentru o primă orientare, Radiology Room Planner poate ajuta la structurarea riscurilor înainte de discuția tehnică detaliată.",
        ],
        callout: {
          title: "Separare importantă",
          body: "CT și RX cer protecție radiologică și considerații CNCAN. RMN cere RF shielding, cușcă Faraday și controlul interferențelor electromagnetice.",
        },
      },
      {
        id: "planificarea-aparaturii",
        title: "Planificarea aparaturii medicale",
        body: [
          "Aparatura medicală nu ar trebui aleasă după ce proiectul este aproape final. Chiar și echipamente aparent simple pot influența alimentarea, datele, spațiul de lucru, accesul de service, consumabilele și fluxul pacienților. În cazul imagisticii, IVD-ului sau echipamentelor cu cerințe speciale, impactul este mult mai mare.",
          "O clinică modernă trebuie să știe ce echipamente sunt critice pentru activitatea ei, ce echipamente pot fi adăugate ulterior și ce infrastructură trebuie pregătită de la început pentru extindere. Această gândire previne situațiile în care spațiul este gata, dar echipamentul nu poate fi instalat corect sau nu poate fi servisat fără intervenții costisitoare.",
        ],
        bullets: [
          "vânzare și integrare aparatură medicală",
          "imagistică medicală: CT, RMN, RX, ecografie",
          "IVD și echipamente de laborator",
          "service, mentenanță și uptime operațional",
        ],
      },
      {
        id: "hvac-electric-date",
        title: "HVAC, electric și date",
        body: [
          "Instalațiile sunt una dintre zonele în care proiectele medicale subestimează complexitatea. HVAC-ul nu înseamnă doar confort. În funcție de activitate, poate susține condiții de mediu, continuitatea echipamentelor, evacuarea căldurii, stabilitatea laboratorului sau cerințe specifice pentru camere de imagistică.",
          "Electricul și datele trebuie gândite pentru consumul real al echipamentelor, protecții, redundanțe, prize dedicate, trasee curate, conectivitate și acces pentru intervenții. O clinică poate arăta finalizată, dar dacă aceste trasee nu sunt coordonate cu aparatura, service-ul și fluxul operațional, costurile apar imediat după recepție.",
        ],
      },
      {
        id: "workflow-si-operare",
        title: "Workflow, personal și operare zilnică",
        body: [
          "O clinică bună se simte coerentă în exploatare. Pacientul ajunge ușor unde trebuie, personalul nu intersectează inutil fluxuri, materialele sunt la îndemână, iar echipamentele pot fi folosite și întreținute fără blocaje. Acest lucru nu apare din întâmplare, ci din proiectarea fluxurilor.",
          "În faza de concept trebuie discutate orele de vârf, tipul de programări, timpul de pregătire a cabinetelor, accesul pentru probe, circuitele pentru deșeuri, depozitarea consumabilelor și modul în care service-ul poate interveni fără să blocheze întreaga activitate. Aceste detalii separă o clinică doar amenajată de o infrastructură medicală matură.",
        ],
      },
      {
        id: "greseli-frecvente",
        title: "Greșeli frecvente în construcția unei clinici",
        body: [
          "Cele mai costisitoare greșeli apar din separarea deciziilor. Arhitectura se face fără aparatură, aparatura se cumpără fără infrastructură, radiologia se discută după compartimentare, iar service-ul este luat în calcul doar când apare prima problemă. Fiecare decizie întârziată poate produce refaceri.",
          "Altă greșeală este bugetarea doar pe lucrări vizibile. În proiectele medicale, costul real include proiectare, consultanță, documentație, instalații, protecții, aparatură, integrare, testare, service și timp de coordonare. Calculatorul de proiect medical poate oferi o primă orientare de complexitate, dar nu înlocuiește oferta tehnică.",
        ],
        bullets: [
          "subestimarea instalațiilor și a spațiilor tehnice",
          "alegerea târzie a aparaturii",
          "confuzia dintre DSP, CNCAN, RF shielding și protecție radiologică",
          "lipsa unei strategii de service și mentenanță",
        ],
      },
      {
        id: "abordare-turnkey",
        title: "De ce contează abordarea turnkey",
        body: [
          "O abordare turnkey nu înseamnă doar un singur furnizor pentru toate lucrările. Înseamnă o coordonare tehnică între construcții, amenajări, radiologie, ecranare, aparatură, integrare și service. Pentru beneficiarul medical, valoarea este reducerea riscului de fragmentare.",
          "ZES MEDCORP poziționează proiectul medical ca infrastructură plus tehnologie medicală. Asta înseamnă că întrebările despre spațiu sunt conectate cu întrebările despre echipamente, autorizări, mentenanță și operare. Pentru proiecte complexe, această coordonare este mai importantă decât o listă izolată de lucrări.",
        ],
      },
      {
        id: "buget-si-timeline",
        title: "Buget și timeline realist",
        body: [
          "Timeline-ul depinde de starea spațiului, nivelul de intervenție, autorizații, disponibilitatea echipamentelor, complexitatea instalațiilor și coordonarea furnizorilor. O clinică simplă poate avansa rapid dacă deciziile sunt clare. Un proiect cu radiologie, RMN, IVD sau infrastructură complexă cere mai multă analiză înainte de execuție.",
          "Bugetul trebuie privit pe faze: analiză și proiectare, construcții și amenajări, infrastructură tehnică, radiologie sau shielding, aparatură, integrare și service. O estimare sănătoasă include ipoteze explicite și rezerve pentru decizii care nu sunt încă definite. Înainte de blocarea bugetului, folosește Consultantul AI sau solicită o analiză tehnică aplicată.",
        ],
      },
      {
        id: "concluzie",
        title: "Concluzie",
        body: [
          "Construcția unei clinici medicale în România cere mai mult decât execuție corectă. Cere gândire de infrastructură medicală, coordonare cu tehnologia și o înțelegere clară a autorizărilor. Cele mai bune proiecte sunt cele în care spațiul, aparatura, radiologia, IVD-ul, service-ul și operarea sunt planificate împreună.",
          "Dacă proiectul este încă în faza de idee, cea mai bună decizie este să clarifici cerințele înainte de proiectarea finală. Dacă spațiul există deja, analiza trebuie să identifice limitările și costurile ascunse. În ambele cazuri, o planificare tehnică timpurie scade riscul de refaceri și crește șansa ca proiectul să devină o clinică funcțională, nu doar un spațiu renovat.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este primul pas în construcția unei clinici medicale?",
        answer:
          "Primul pas este analiza tehnică a activității medicale, spațiului, fluxurilor, echipamentelor, cerințelor DSP și eventualelor cerințe CNCAN pentru radiologie.",
      },
      {
        question: "Când trebuie implicată aparatura medicală în proiect?",
        answer:
          "Aparatura principală trebuie discutată înainte de proiectarea finală, deoarece influențează instalațiile, spațiul, HVAC-ul, datele, accesul de service și bugetul.",
      },
      {
        question: "O clinică fără radiologie are nevoie de CNCAN?",
        answer:
          "În mod obișnuit, CNCAN devine relevant când proiectul include echipamente sau activități cu radiații ionizante, cum sunt CT, RX sau fluoroscopie.",
      },
      {
        question: "RMN-ul intră în aceeași logică de ecranare ca CT-ul?",
        answer:
          "Nu. RMN-ul cere RF shielding și controlul interferențelor electromagnetice, în timp ce CT-ul și RX-ul cer protecție radiologică și considerații CNCAN.",
      },
      {
        question: "Cum se estimează realist bugetul unei clinici?",
        answer:
          "Bugetul se estimează pe faze: consultanță, proiectare, construcții, amenajări, infrastructură, radiologie sau shielding, aparatură, integrare și service.",
      },
    ],
    relatedArticles: [
      "dsp-vs-cncan-diferente-pentru-proiecte-medicale",
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "cum-alegi-aparatura-medicala-pentru-o-clinica",
      "costuri-in-amenajarea-unei-camere-de-radiologie",
    ],
  },
  "ce-trebuie-sa-stii-despre-autorizarea-cncan": {
    readingTime: "16 min",
    tags: [
      "CNCAN",
      "radiologie",
      "CT",
      "RX",
      "protecție radiologică",
      "zone controlate",
      "DSP",
    ],
    relatedServices: [
      "/services/radiologie",
      "/services/protectie-radiologica",
      "/services/imagistica-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    intro:
      "Autorizarea CNCAN este una dintre zonele care pot decide dacă un proiect de radiologie avansează coerent sau intră într-un șir de refaceri. Pentru CT, RX, fluoroscopie și alte aplicații cu radiații ionizante, planificarea nu se rezumă la alegerea echipamentului. Camera, vecinătățile, protecția radiologică, documentația, zonele controlate și relația cu DSP trebuie tratate din faza de concept. CNCAN nu este RF shielding, iar această separare este critică pentru decizii corecte.",
    sections: [
      {
        id: "ce-este-cncan",
        title: "Ce este CNCAN și de ce contează",
        body: [
          "CNCAN este autoritatea relevantă pentru activități care implică radiații ionizante. În proiectele medicale, discuția apare în special pentru radiologie, CT, RX, fluoroscopie și alte echipamente care generează expunere radiologică. Scopul nu este doar administrativ, ci ține de siguranța pacienților, personalului și zonelor adiacente.",
          "Pentru beneficiar, asta înseamnă că un proiect de radiologie trebuie planificat altfel decât un cabinet obișnuit. Pereții, ușile, geamurile, poziția echipamentului, zona operatorului, vecinătățile și fluxul pacienților pot deveni cerințe tehnice relevante. Dacă aceste lucruri sunt discutate târziu, proiectul poate necesita modificări costisitoare.",
        ],
      },
      {
        id: "cand-este-necesara-autorizarea",
        title: "Când este necesară autorizarea CNCAN",
        body: [
          "CNCAN devine relevant când proiectul include echipamente sau activități cu radiații ionizante. Exemplele uzuale sunt camerele RX, camerele CT, fluoroscopia și anumite aplicații de radiologie intervențională. Fiecare tip de echipament are implicații diferite pentru protecție, poziționare, acces și documentație.",
          "Nu toate spațiile medicale intră în această logică. Un cabinet de consultații fără radiologie nu are aceeași nevoie. Un RMN nu este tratat ca un CT, pentru că RMN-ul nu folosește radiații ionizante. În schimb, RMN-ul ridică probleme de RF shielding, câmp magnetic, HVAC și integritate electromagnetică.",
        ],
        callout: {
          title: "CNCAN nu este RF shielding",
          body: "CNCAN privește radiațiile ionizante și protecția radiologică. RF shielding-ul privește camerele RMN și controlul interferențelor electromagnetice.",
        },
      },
      {
        id: "implicatii-pentru-ct-rx",
        title: "Implicații pentru CT, RX și camere de radiologie",
        body: [
          "Pentru CT și RX, camera trebuie analizată în raport cu echipamentul, poziția pacientului, poziția operatorului și vecinătățile. O cameră lângă o zonă intens circulată, lângă un alt cabinet sau lângă spații ocupate constant poate avea cerințe diferite față de o cameră izolată tehnic.",
          "Planificarea trebuie să includă protecția pereților, ușilor și eventualelor suprafețe vitrate, precum și traseele pentru alimentare, date, HVAC, acces de service și montaj. Aceste elemente nu se decid doar estetic. Ele fac parte din infrastructura de funcționare a camerei de radiologie.",
        ],
      },
      {
        id: "zone-controlate",
        title: "Zone controlate și protecție radiologică",
        body: [
          "Conceptul de zonă controlată ține de modul în care este gestionată expunerea și accesul în jurul sursei de radiații ionizante. În proiectare, acest lucru poate influența semnalizarea, accesul, vecinătățile, poziționarea operatorului și soluțiile constructive.",
          "Protecția radiologică nu înseamnă automat aceeași soluție în toate proiectele. Uneori se discută despre pereți protejați, uși cu plumb, sticlă plumbuită sau alte soluții specifice. Important este ca decizia să fie corelată cu echipamentul, utilizarea camerei și documentația necesară.",
        ],
        bullets: [
          "pereți și elemente constructive protejate",
          "uși plumbuite și sticlă plumbuită unde este cazul",
          "poziție operator, flux pacient și acces controlat",
          "documentație tehnică aliniată cu echipamentul",
        ],
      },
      {
        id: "documentatie",
        title: "Documentație și coordonare tehnică",
        body: [
          "Documentația pentru un proiect cu radiologie nu trebuie tratată separat de proiectarea camerei. Datele echipamentului, layout-ul, soluțiile de protecție, instalațiile și fluxurile trebuie să spună aceeași poveste. Când documentația este pregătită după execuție, riscul de neconcordanțe crește.",
          "Un proiect matur centralizează informațiile de la beneficiar, proiectant, furnizorul de echipament, echipa de execuție și consultanții relevanți. Această coordonare nu garantează eliminarea tuturor riscurilor, dar reduce semnificativ situațiile în care lucrările trebuie refăcute pentru că o cerință critică a apărut prea târziu.",
        ],
      },
      {
        id: "relatia-cu-dsp",
        title: "Relația dintre CNCAN și DSP",
        body: [
          "DSP și CNCAN nu sunt același lucru. DSP privește funcționarea medicală a spațiului, circuitele, condițiile igienico-sanitare și cadrul de autorizare pentru activitatea medicală. CNCAN privește activități cu radiații ionizante și protecția radiologică aferentă.",
          "Într-un proiect real, cele două zone se întâlnesc. O cameră de radiologie trebuie să fie coerentă cu fluxul clinic și cu cerințele spațiului medical, dar trebuie să răspundă și cerințelor de protecție radiologică. De aceea, separarea conceptuală este utilă, dar proiectarea trebuie coordonată.",
        ],
      },
      {
        id: "greseli-frecvente-cncan",
        title: "Greșeli frecvente în proiectele cu CNCAN",
        body: [
          "Prima greșeală este introducerea radiologiei într-un layout deja blocat. A doua este alegerea echipamentului fără verificarea spațiului. A treia este confuzia dintre protecția radiologică pentru CT/RX și RF shielding-ul pentru RMN. A patra este tratarea documentației ca etapă finală.",
          "Aceste greșeli duc la modificări de pereți, uși, geamuri, trasee, camere tehnice și costuri suplimentare. Mai grav, pot întârzia deschiderea sau pot limita funcționarea camerei. Radiology Room Planner este util ca primă triere pentru a separa riscurile CT/RX de riscurile RMN.",
        ],
      },
      {
        id: "shielding-corect",
        title: "Shielding corect: plumb pentru radiații, RF pentru RMN",
        body: [
          "În proiectele CT și RX, discuția de shielding se referă la protecție radiologică. Aici pot apărea soluții cu plumb pentru pereți, uși sau sticlă, în funcție de analiza tehnică. Obiectivul este reducerea expunerii în zonele relevante și controlul siguranței radiologice.",
          "În proiectele RMN, shielding-ul înseamnă altceva: cușcă Faraday, uși RF, filtre, waveguides, penetrări controlate și integritatea camerei față de interferențe electromagnetice. CNCAN nu trebuie confundat cu această logică. Un proiect care le amestecă riscă să cumpere soluții greșite pentru problema greșită.",
        ],
      },
      {
        id: "proces-recomandat",
        title: "Proces recomandat pentru proiecte cu radiologie",
        body: [
          "Un proces sănătos începe cu definirea echipamentului sau a clasei de echipament. Urmează analiza spațiului, vecinătăților, fluxurilor, cerințelor de protecție, instalațiilor, accesului de montaj și service. Abia apoi layout-ul devine stabil.",
          "După stabilizarea conceptului, documentația și execuția trebuie să rămână coordonate. Dacă se schimbă echipamentul, camera sau vecinătățile, ipotezele tehnice trebuie verificate din nou. În radiologie, schimbările aparent mici pot avea efecte disproporționate asupra protecției și autorizării.",
        ],
        bullets: [
          "definește echipamentul sau scenariul tehnic",
          "analizează spațiul, vecinătățile și fluxurile",
          "separă protecția radiologică de RF shielding",
          "corelează documentația cu execuția și service-ul",
        ],
      },
      {
        id: "concluzie",
        title: "Concluzie",
        body: [
          "Autorizarea CNCAN trebuie privită ca parte din arhitectura tehnică a proiectului, nu ca un pas birocratic de final. Pentru CT, RX și fluoroscopie, deciziile despre protecție radiologică, zone controlate, documentație și layout trebuie luate înainte de execuție.",
          "Cea mai importantă clarificare este separarea dintre CNCAN și RF shielding. CNCAN ține de radiații ionizante. RF shielding ține de RMN și interferențe electromagnetice. Dacă proiectul începe cu această distincție, planificarea devine mai clară, bugetul mai realist și riscul de refaceri mult mai mic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce este CNCAN în proiectele medicale?",
        answer:
          "CNCAN este autoritatea relevantă pentru activități cu radiații ionizante, inclusiv proiecte medicale cu CT, RX, fluoroscopie sau alte aplicații de radiologie.",
      },
      {
        question: "Când apare nevoia de autorizare CNCAN?",
        answer:
          "Nevoia apare când proiectul include echipamente sau activități cu radiații ionizante. Camera și documentația trebuie analizate înainte de execuție.",
      },
      {
        question: "CNCAN se aplică pentru RMN?",
        answer:
          "RMN-ul nu folosește radiații ionizante. Pentru RMN, tema critică este RF shielding-ul, nu protecția radiologică cu plumb.",
      },
      {
        question: "Care este diferența dintre DSP și CNCAN?",
        answer:
          "DSP privește cadrul medical și sanitar al spațiului. CNCAN privește activitățile cu radiații ionizante și protecția radiologică.",
      },
      {
        question: "Ce greșeală trebuie evitată cel mai mult?",
        answer:
          "Cea mai riscantă greșeală este proiectarea sau execuția camerei înainte de clarificarea echipamentului, protecției radiologice și documentației necesare.",
      },
    ],
    relatedArticles: [
      "dsp-vs-cncan-diferente-pentru-proiecte-medicale",
      "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      "costuri-in-amenajarea-unei-camere-de-radiologie",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
    ],
  },
  "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb": {
    readingTime: "19 min",
    tags: [
      "RF shielding",
      "ecranare cu plumb",
      "RMN",
      "CT",
      "RX",
      "cușcă Faraday",
      "protecție radiologică",
    ],
    relatedServices: [
      "/services/rf-shielding",
      "/services/protectie-radiologica",
      "/services/radiologie",
      "/services/imagistica-medicala",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    intro:
      "RF shielding și ecranarea cu plumb sunt două discipline tehnice diferite, folosite pentru riscuri diferite, în camere medicale diferite. RF shielding-ul este specific camerelor RMN și urmărește controlul interferențelor electromagnetice printr-o cușcă Faraday și detalii de integritate RF. Ecranarea cu plumb ține de protecția radiologică pentru RX, CT sau fluoroscopie și urmărește reducerea expunerii la radiații ionizante. Confuzia dintre ele poate duce la proiecte scumpe, întârziate și tehnic greșite.",
    sections: [
      {
        id: "problema-confuziei",
        title: "De ce apare confuzia",
        body: [
          "În limbajul comercial, cuvântul ecranare este folosit pentru multe lucruri. Beneficiarii aud despre cameră ecranată, protecție, shielding, uși speciale sau geamuri speciale și presupun că toate se referă la același tip de risc. În realitate, un proiect RMN și un proiect CT pornesc de la fizici diferite.",
          "RMN-ul are o problemă de interferență electromagnetică și integritate magnetică. CT-ul și RX-ul au o problemă de radiații ionizante și protecție radiologică. Soluțiile constructive, materialele, testarea, autorizările și riscurile sunt diferite. Un proiect matur începe prin a întreba ce echipament intră în cameră, nu ce termen generic de shielding se folosește.",
        ],
      },
      {
        id: "rf-shielding-definitie",
        title: "Ce este RF shielding",
        body: [
          "RF shielding-ul este soluția prin care o cameră RMN este protejată de interferențe de radiofrecvență din exterior și prin care se menține performanța mediului electromagnetic necesar imagisticii prin rezonanță magnetică. În practică, se discută despre o incintă conductivă, cunoscută adesea ca o cușcă Faraday.",
          "O cușcă Faraday pentru RMN nu este doar un strat de material pus pe pereți. Este un sistem. Include pereți, plafon, pardoseală, ușă RF, ferestre sau soluții vizuale compatibile, filtre, waveguides, penetrări controlate și detalii de continuitate electrică. O singură întrerupere prost tratată poate compromite performanța întregii camere.",
        ],
        bullets: [
          "cușcă Faraday pentru camera RMN",
          "uși RF și etanșare electromagnetică",
          "filtre pentru trasee electrice și semnale",
          "waveguides și penetrări controlate",
          "testare de atenuare și integritate RF",
        ],
      },
      {
        id: "lead-shielding-definitie",
        title: "Ce este ecranarea cu plumb",
        body: [
          "Ecranarea cu plumb ține de protecția radiologică. Este relevantă pentru echipamente care folosesc radiații ionizante, precum RX, CT sau fluoroscopie. Scopul este protejarea personalului, pacienților și zonelor adiacente prin reducerea expunerii la niveluri acceptabile conform analizei tehnice și cerințelor aplicabile.",
          "În proiecte, ecranarea cu plumb poate însemna pereți plumbuiți, uși plumbuite, sticlă plumbuită, protecții locale și soluții adaptate vecinătăților. Nu toate camerele au aceeași nevoie. Tipul echipamentului, direcția fasciculului, utilizarea camerei, vecinătățile și zonele ocupate influențează soluția.",
        ],
        callout: {
          title: "Termeni care nu trebuie amestecați",
          body: "Plumbul protejează împotriva radiațiilor ionizante. RF shielding-ul protejează performanța RMN împotriva interferențelor electromagnetice.",
        },
      },
      {
        id: "mri-vs-ct-rx",
        title: "RMN versus CT/RX: echipamente diferite, camere diferite",
        body: [
          "RMN-ul funcționează prin rezonanță magnetică și folosește câmp magnetic puternic plus semnale de radiofrecvență. Problemele principale sunt interferențele RF, compatibilitatea echipamentelor din jur, câmpul magnetic, vibrațiile, HVAC-ul și accesul tehnic. De aceea, discuția se poartă despre RF shielding și integrare specializată.",
          "CT-ul și RX-ul funcționează cu radiații ionizante. Problemele principale sunt protecția radiologică, zonele controlate, poziția operatorului, vecinătățile, documentația CNCAN și protecțiile constructive. De aceea, discuția se poartă despre pereți, uși și geamuri protejate, plus planificarea autorizării.",
        ],
      },
      {
        id: "implementare-rf",
        title: "Cum se implementează tehnic RF shielding-ul",
        body: [
          "Un proiect de RF shielding începe cu cerințele echipamentului RMN și cu analiza spațiului. Se verifică vecinătățile, traseele tehnice, accesul, HVAC-ul, poziția camerei, pătrunderile necesare și modul în care ușa RF se integrează în flux. De aici rezultă soluția de cușcă Faraday.",
          "Detaliile sunt critice. O pătrundere necontrolată pentru cabluri, o ușă montată incorect, un filtru nepotrivit sau o discontinuitate în sistem poate reduce atenuarea. De aceea, RF shielding-ul trebuie proiectat și executat ca sistem, apoi verificat prin testare, nu tratat ca simplu finisaj tehnic.",
        ],
      },
      {
        id: "implementare-plumb",
        title: "Cum se implementează protecția cu plumb",
        body: [
          "Protecția cu plumb pentru CT, RX sau fluoroscopie pornește de la echipament, utilizarea camerei și vecinătăți. Se analizează zonele în care pot ajunge radiațiile, cine ocupă spațiile adiacente și ce elemente constructive trebuie protejate. Soluția poate include pereți, uși, geamuri și detalii de îmbinare.",
          "Spre deosebire de RF shielding, protecția radiologică este legată direct de documentația și cerințele de autorizare pentru activități cu radiații ionizante. Aici apare discuția CNCAN. Din nou, nu este o problemă de interferență electromagnetică, ci una de protecție la radiații.",
        ],
      },
      {
        id: "costuri-si-complexitate",
        title: "Implicații de cost și complexitate",
        body: [
          "Costul RF shielding-ului este influențat de dimensiunea camerei RMN, sistemul de cușcă Faraday, ușa RF, filtrele, waveguides, penetrările, testarea și coordonarea cu HVAC-ul și echipamentul. Complexitatea crește când spațiul este existent, când traseele sunt deja fixate sau când camera nu a fost gândită pentru RMN.",
          "Costul protecției cu plumb este influențat de tipul echipamentului, vecinătăți, suprafețe protejate, uși, sticlă, detalii constructive și cerințe de documentație. O cameră CT sau RX într-un spațiu existent poate deveni complexă dacă pereții sau accesul nu permit integrarea corectă. În ambele cazuri, estimările fără analiză tehnică sunt fragile.",
        ],
      },
      {
        id: "riscuri-de-proiect",
        title: "Riscuri când cele două concepte sunt confundate",
        body: [
          "Când RF shielding-ul și protecția cu plumb sunt amestecate, proiectul poate cumpăra soluții nepotrivite. O cameră RMN cu accent pe plumb nu rezolvă interferențele RF. O cameră CT cu discuție de cușcă Faraday nu rezolvă protecția radiologică și cerințele CNCAN. Rezultatul este cost fără performanță.",
          "Confuzia afectează și calendarul. Furnizorii primesc cerințe neclare, proiectarea se modifică, documentația devine inconsistentă, iar execuția avansează cu ipoteze greșite. În proiectele medicale, cea mai scumpă decizie nu este întotdeauna soluția tehnică, ci momentul greșit în care este descoperită.",
        ],
        bullets: [
          "soluții cumpărate pentru riscul greșit",
          "documentație inconsistentă",
          "întârzieri de autorizare sau instalare",
          "refaceri de pereți, uși, trasee și finisaje",
        ],
      },
      {
        id: "cum-alegi-corect",
        title: "Cum alegi corect soluția",
        body: [
          "Întrebarea de pornire este simplă: ce echipament va funcționa în cameră? Dacă este RMN, se analizează RF shielding, cușcă Faraday, câmp magnetic, HVAC, vibrații și integrare. Dacă este CT, RX sau fluoroscopie, se analizează protecție radiologică, plumb, zone controlate și CNCAN.",
          "După această separare, proiectul trebuie să intre în detalii: furnizor de echipament, date tehnice, vecinătăți, acces, trasee, service, documentație și buget. Radiology Room Planner poate ajuta la prima triere, iar Consultantul AI poate structura proiectul mai larg dacă radiologia face parte dintr-o clinică sau un centru medical complet.",
        ],
      },
      {
        id: "rolul-zes",
        title: "Rolul ZES într-un proiect de shielding",
        body: [
          "ZES MEDCORP tratează shielding-ul ca parte din infrastructura medicală și tehnologică a proiectului. Asta înseamnă că RF shielding-ul pentru RMN nu este amestecat cu protecția radiologică pentru CT/RX, iar ambele sunt coordonate cu aparatura, instalațiile, service-ul și fluxurile medicale.",
          "Această abordare este importantă pentru beneficiarii care nu vor doar o cameră finalizată, ci o cameră care poate funcționa, poate fi autorizată unde este cazul, poate primi echipamentul și poate fi întreținută în exploatare. Shielding-ul corect este o decizie de performanță, siguranță și continuitate, nu un simplu element de construcție.",
        ],
      },
      {
        id: "concluzie",
        title: "Concluzie",
        body: [
          "RF shielding și ecranarea cu plumb nu sunt variante ale aceleiași soluții. RF shielding-ul aparține lumii RMN: cușcă Faraday, EMI, atenuare, filtre, penetrări, waveguides și integritate RF. Ecranarea cu plumb aparține lumii CT/RX/fluoroscopie: radiații ionizante, protecție radiologică, pereți plumbuiți, uși plumbuite, sticlă plumbuită, CNCAN și zone controlate.",
          "Pentru un proiect medical, această distincție trebuie făcută la început. Ea influențează bugetul, calendarul, furnizorii, documentația, execuția și riscul de refaceri. Dacă ai o cameră de imagistică în planificare, începe prin a separa corect echipamentul și riscul tehnic, apoi construiește soluția în jurul lor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este diferența principală dintre RF shielding și plumb?",
        answer:
          "RF shielding-ul protejează camera RMN împotriva interferențelor electromagnetice. Plumbul este folosit pentru protecție radiologică în camere CT, RX sau fluoroscopie.",
      },
      {
        question: "RMN are nevoie de ecranare cu plumb?",
        answer:
          "În mod obișnuit, nu. RMN-ul nu folosește radiații ionizante, deci problema critică este RF shielding-ul, nu protecția radiologică cu plumb.",
      },
      {
        question: "CT are nevoie de cușcă Faraday?",
        answer:
          "În mod uzual, nu. CT-ul are nevoie de protecție radiologică și considerații CNCAN, nu de cușcă Faraday pentru interferențe RF.",
      },
      {
        question: "Ce sunt penetrările în RF shielding?",
        answer:
          "Penetrările sunt treceri prin sistemul RF pentru cabluri, ventilație sau alte trasee. Ele trebuie controlate prin soluții compatibile, altfel pot compromite integritatea camerei.",
      },
      {
        question: "De ce contează această distincție pentru buget?",
        answer:
          "Pentru că fiecare soluție are materiale, execuție, testare și documentație diferite. Confuzia poate genera costuri fără să rezolve riscul real al camerei.",
      },
    ],
    relatedArticles: [
      "greseli-critice-in-proiectarea-camerelor-rmn",
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
      "costuri-in-amenajarea-unei-camere-de-radiologie",
    ],
  },
};

const proposalBuilderTool: ArticleTool = {
  label: "Proposal Builder",
  href: "/proposal-builder",
};

export const articles: Article[] = [...baseArticles, ...overnightSeoArticles].map((article) => {
  const upgradedArticle = {
    ...article,
    ...authorityArticleUpgrades[article.slug],
  };
  const hasProposalBuilder = upgradedArticle.relatedTools.some(
    (tool) => tool.href === proposalBuilderTool.href,
  );

  return {
    ...upgradedArticle,
    relatedTools: hasProposalBuilder
      ? upgradedArticle.relatedTools
      : [...upgradedArticle.relatedTools, proposalBuilderTool],
  };
});

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
