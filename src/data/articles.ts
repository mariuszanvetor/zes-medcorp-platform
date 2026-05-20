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

export const articles: Article[] = baseArticles.map((article) => {
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
