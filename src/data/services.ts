export type ServiceSlug =
  | "constructii-medicale"
  | "amenajari-medicale"
  | "radiologie"
  | "rf-shielding"
  | "protectie-radiologica"
  | "aparatura-medicala"
  | "imagistica-medicala"
  | "ivd-laborator"
  | "service-aparatura-medicala";

export type ServiceStep = {
  title: string;
  description: string;
};

export type ServiceFAQItem = {
  question: string;
  answer: string;
};

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  href: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  schemaServiceType: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  overview: string;
  risksTitle: string;
  risks: string[];
  solutionTitle: string;
  solutionDescription: string;
  solutionBullets: string[];
  capabilities: string[];
  process: ServiceStep[];
  faqs: ServiceFAQItem[];
  relatedSlugs: ServiceSlug[];
};

const defaultProcess: ServiceStep[] = [
  {
    title: "Analiză",
    description:
      "Clarificăm obiectivele, spațiul, echipamentele, fluxurile, autorizările și riscurile tehnice.",
  },
  {
    title: "Proiectare",
    description:
      "Transformăm cerințele într-un plan coordonat între arhitectură, instalații, aparatură și operare.",
  },
  {
    title: "Execuție",
    description:
      "Coordonăm lucrările și furnizorii cu atenție la calitate, documentație și continuitatea proiectului.",
  },
  {
    title: "Integrare",
    description:
      "Aliniem infrastructura, aparatura, ecranarea, software-ul, accesul de service și testarea.",
  },
  {
    title: "Service",
    description:
      "Pregătim exploatarea prin mentenanță, suport tehnic, intervenții și planificarea continuității operaționale.",
  },
];

export const services: Service[] = [
  {
    slug: "constructii-medicale",
    title: "Construcții medicale",
    shortTitle: "Construcții medicale",
    href: "/services/constructii-medicale",
    seoTitle: "Construcții clinici medicale",
    seoDescription:
      "Construcții medicale pentru clinici, centre de diagnostic și proiecte healthcare, coordonate cu fluxuri DSP, instalații, aparatură și service.",
    keywords: [
      "construcții clinici medicale",
      "construcții medicale",
      "infrastructură medicală",
      "DSP",
      "proiecte medicale turnkey",
    ],
    schemaServiceType: "Construcții medicale",
    heroEyebrow: "Medical construction",
    heroTitle:
      "Construcții medicale coordonate pentru operare, tehnologie și extindere.",
    heroDescription:
      "ZES MEDCORP construiește infrastructură medicală pentru clinici, laboratoare și centre de diagnostic, cu atenție la fluxuri, echipamente, autorizări și service.",
    overview:
      "Un proiect medical modern nu este doar o lucrare de construcție. Este o infrastructură în care pacienții, echipele, echipamentele, instalațiile și cerințele de autorizare trebuie coordonate din prima fază.",
    risksTitle: "Riscuri când construcția medicală este tratată ca spațiu obișnuit",
    risks: [
      "Fluxuri medicale și cerințe DSP neclare.",
      "Spații nepregătite pentru echipamente medicale, imagistică sau laborator.",
      "Instalații, acces service și mentenanță planificate prea târziu.",
      "Costuri suplimentare generate de modificări după achiziția aparaturii.",
    ],
    solutionTitle: "Soluția ZES: construcție medicală conectată la tehnologie",
    solutionDescription:
      "ZES aliniază construcția, fit-out-ul, aparatura medicală, imagistica, IVD-ul, service-ul și consultanța tehnică într-un proces coerent.",
    solutionBullets: [
      "Analiză tehnică înainte de execuție.",
      "Coordonare între spațiu, instalații și echipamente.",
      "Pregătire pentru autorizări, service și scalare.",
      "Consultanță turnkey pentru proiecte medicale complexe.",
    ],
    capabilities: [
      "Clinici, centre de diagnostic și spații medicale",
      "Fluxuri pacienți, personal și echipamente",
      "Infrastructură pentru imagistică, IVD și service",
      "Coordonare DSP, furnizori și mentenanță",
      "Consultanță tehnică turnkey",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "ZES este o firmă de construcții clasică?",
        answer:
          "Nu. ZES lucrează la intersecția dintre infrastructură medicală, aparatură, imagistică, laborator, integrare și service.",
      },
      {
        question: "Poate ZES coordona proiecte turnkey?",
        answer:
          "Da. ZES poate coordona analiza, proiectarea, execuția, integrarea echipamentelor și service-ul.",
      },
      {
        question: "Când trebuie implicată echipa tehnică?",
        answer:
          "Ideal înainte de blocarea bugetului, spațiului sau furnizorilor de aparatură.",
      },
    ],
    relatedSlugs: ["amenajari-medicale", "aparatura-medicala", "ivd-laborator"],
  },
  {
    slug: "amenajari-medicale",
    title: "Amenajări medicale",
    shortTitle: "Amenajări medicale",
    href: "/services/amenajari-medicale",
    seoTitle: "Amenajări medicale",
    seoDescription:
      "Amenajări medicale pentru clinici, cabinete, laboratoare și centre de diagnostic, corelate cu fluxuri DSP, echipamente, imagistică și service.",
    keywords: [
      "amenajări medicale",
      "amenajare clinică medicală",
      "fit-out medical",
      "DSP",
      "echipamente medicale",
    ],
    schemaServiceType: "Amenajări medicale",
    heroEyebrow: "Medical fit-out",
    heroTitle:
      "Amenajări medicale clare, funcționale și pregătite pentru tehnologie.",
    heroDescription:
      "ZES transformă spațiile medicale în zone operaționale pentru consultații, diagnostic, laborator, imagistică, aparatură și service.",
    overview:
      "Amenajarea medicală trebuie să susțină fluxurile, aparatura, curățenia, mentenanța, autorizarea și experiența pacientului fără improvizații.",
    risksTitle: "Riscuri în amenajări medicale fără coordonare tehnică",
    risks: [
      "Compartimentări care nu susțin fluxurile medicale.",
      "Echipamente integrate după ce spațiul este deja blocat.",
      "Instalații insuficiente pentru aparatură, laborator sau imagistică.",
      "Service dificil după punerea în funcțiune.",
    ],
    solutionTitle: "Soluția ZES: fit-out medical orientat pe operare",
    solutionDescription:
      "ZES corelează amenajarea cu echipamentele, fluxurile DSP, integrarea tehnică și mentenanța pe termen lung.",
    solutionBullets: [
      "Analiză de spațiu și funcțiuni medicale.",
      "Pregătire pentru echipamente și laborator.",
      "Coordonare finisaje, instalații și mobilier medical.",
      "Planificare pentru service și extindere.",
    ],
    capabilities: [
      "Clinici, cabinete, recepții și zone clinice",
      "Laboratoare și spații IVD",
      "Centre de diagnostic și zone de imagistică",
      "Fluxuri DSP și spații suport",
      "Integrare aparatură și mobilier medical",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Ce diferențiază amenajarea medicală de una obișnuită?",
        answer:
          "Amenajarea medicală trebuie să răspundă fluxurilor, echipamentelor, igienei, DSP, service-ului și operării zilnice.",
      },
      {
        question: "Poate ZES lucra pe spații existente?",
        answer:
          "Da. ZES poate analiza spații existente și poate propune reconfigurări tehnice și funcționale.",
      },
      {
        question: "Includeți consultanță pentru aparatură?",
        answer:
          "Da. Amenajarea poate fi corelată cu selecția, integrarea și service-ul aparaturii.",
      },
    ],
    relatedSlugs: ["constructii-medicale", "ivd-laborator", "aparatura-medicala"],
  },
  {
    slug: "radiologie",
    title: "Radiologie",
    shortTitle: "Radiologie",
    href: "/services/radiologie",
    seoTitle: "Infrastructură camere CT, RMN și RX",
    seoDescription:
      "Infrastructură tehnică pentru camere CT, RMN și RX, cu layout, instalații, autorizări, integrare aparatură și coordonare între RF shielding și protecție radiologică.",
    keywords: ["radiologie", "cameră CT", "cameră RMN", "cameră RX", "CNCAN", "imagistică medicală"],
    schemaServiceType: "Infrastructură radiologie",
    heroEyebrow: "Radiology infrastructure",
    heroTitle:
      "Camere CT, RMN și RX planificate ca infrastructură medicală critică.",
    heroDescription:
      "ZES coordonează spațiul, instalațiile, accesul, autorizările, ecranarea și integrarea aparaturii pentru camere de imagistică medicală.",
    overview:
      "Radiologia conectează mai multe discipline: layout, furnizor de echipament, instalații, autorizări, ecranare, service și mentenanță. RF shielding și protecția radiologică sunt servicii diferite și trebuie tratate separat.",
    risksTitle: "Riscuri în proiectele de radiologie",
    risks: [
      "Camera este dimensionată fără cerințele furnizorului de echipament.",
      "RF shielding pentru RMN este confundat cu protecția radiologică pentru CT/RX.",
      "CNCAN, DSP și documentația tehnică sunt tratate prea târziu.",
      "Accesul, răcirea, alimentarea și service-ul nu sunt corelate.",
    ],
    solutionTitle: "Soluția ZES: radiologie coordonată tehnic",
    solutionDescription:
      "ZES integrează camera, aparatura, ecranarea potrivită, autorizările și service-ul într-un plan tehnic clar.",
    solutionBullets: [
      "Planificare CT, RMN și RX.",
      "Separare clară între RF shielding și protecție radiologică.",
      "Coordonare CNCAN / DSP unde este cazul.",
      "Integrare aparatură, service și mentenanță.",
    ],
    capabilities: [
      "Camere CT, RMN și RX",
      "Layout, instalații, acces și răcire",
      "Coordonare RF shielding pentru RMN",
      "Coordonare protecție radiologică pentru CT/RX",
      "Integrare echipamente de imagistică",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "RF shielding este același lucru cu protecția radiologică?",
        answer:
          "Nu. RF shielding este pentru RMN și interferențe electromagnetice. Protecția radiologică este pentru RX, CT și radiații ionizante.",
      },
      {
        question: "Când trebuie planificată camera de radiologie?",
        answer:
          "Înainte de execuție și ideal înainte de achiziția finală a echipamentului.",
      },
      {
        question: "Pot începe cu un planner?",
        answer:
          "Da. Radiology Room Planner poate structura cerințele inițiale pentru o discuție tehnică ZES.",
      },
    ],
    relatedSlugs: ["imagistica-medicala", "rf-shielding", "protectie-radiologica"],
  },
  {
    slug: "rf-shielding",
    title: "RF shielding pentru RMN",
    shortTitle: "RF shielding",
    href: "/services/rf-shielding",
    seoTitle: "RF shielding pentru camere RMN",
    seoDescription:
      "RF shielding pentru camere RMN: cușcă Faraday, atenuare RF, uși RF, waveguides, filtre, penetrări și integritatea camerei magnetice.",
    keywords: ["RF shielding", "ecranare RF", "cameră RMN", "cușcă Faraday", "MRI room"],
    schemaServiceType: "RF shielding pentru RMN",
    heroEyebrow: "MRI RF shielding",
    heroTitle:
      "RF shielding pentru RMN, separat clar de protecția radiologică.",
    heroDescription:
      "ZES coordonează ecranarea RF pentru camere RMN: cușcă Faraday, uși RF, waveguides, filtre, penetrări, HVAC și integritatea camerei magnetice.",
    overview:
      "RF shielding protejează performanța camerei RMN împotriva interferențelor electromagnetice. Nu este ecranare cu plumb și nu are același scop ca protecția radiologică pentru CT/RX.",
    risksTitle: "Riscuri când RF shielding-ul este tratat ca detaliu secundar",
    risks: [
      "Interferențe care afectează calitatea imaginii RMN.",
      "Uși RF, penetrări, filtre sau waveguides necoordonate.",
      "HVAC, vibrații și acces magnet tratate prea târziu.",
      "Costuri de remediere după instalarea echipamentului.",
    ],
    solutionTitle: "Soluția ZES: integritate RF pentru camere RMN",
    solutionDescription:
      "ZES corelează RF shielding-ul cu echipamentul RMN, camera, instalațiile, accesul, testarea și service-ul.",
    solutionBullets: [
      "Cușcă Faraday și detalii RF coordonate.",
      "Uși RF, waveguides, filtre și penetrări.",
      "Coordonare HVAC, vibrații și trasee tehnice.",
      "Pregătire pentru testare și mentenanță.",
    ],
    capabilities: [
      "RF attenuation pentru camere RMN",
      "Cușcă Faraday și integritate magnetică",
      "Uși RF, filtre, waveguides și penetrări",
      "Coordonare cu furnizorul RMN",
      "Service și verificări tehnice",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Pentru ce este RF shielding?",
        answer:
          "RF shielding este pentru RMN și protecția împotriva interferențelor electromagnetice.",
      },
      {
        question: "RF shielding folosește plumb?",
        answer:
          "Nu ca principiu principal. Plumbul ține de protecția radiologică pentru radiații ionizante, nu de atenuare RF pentru RMN.",
      },
      {
        question: "Ce trebuie coordonat într-o cameră RMN?",
        answer:
          "Cușca Faraday, ușa RF, trecerile, HVAC-ul, vibrațiile, accesul magnetului și cerințele furnizorului.",
      },
    ],
    relatedSlugs: ["radiologie", "imagistica-medicala", "protectie-radiologica"],
  },
  {
    slug: "protectie-radiologica",
    title: "Protecție radiologică / ecranare cu plumb",
    shortTitle: "Protecție radiologică",
    href: "/services/protectie-radiologica",
    seoTitle: "Protecție radiologică și ecranare cu plumb",
    seoDescription:
      "Protecție radiologică pentru RX, CT, fluoroscopie și radiologie: pereți plumbați, uși plumbate, sticlă plumbată, zone controlate și cerințe CNCAN.",
    keywords: ["protecție radiologică", "ecranare cu plumb", "radioprotecție", "CNCAN", "cameră CT", "cameră RX"],
    schemaServiceType: "Protecție radiologică",
    heroEyebrow: "Radiation protection",
    heroTitle:
      "Protecție radiologică pentru RX, CT și zone cu radiații ionizante.",
    heroDescription:
      "ZES coordonează ecranarea cu plumb și protecția radiologică pentru camere RX, CT și spații de radiologie, cu atenție la CNCAN, layout și siguranță.",
    overview:
      "Ecranarea cu plumb protejează împotriva radiațiilor ionizante. Include pereți plumbați, uși plumbate, sticlă plumbată, zone controlate și documentație tehnică specifică.",
    risksTitle: "Riscuri când protecția radiologică este planificată târziu",
    risks: [
      "Pereți, uși sau sticlă insuficient dimensionate.",
      "Layout necorelat cu calculul de protecție radiologică.",
      "CNCAN și zonele controlate clarificate prea târziu.",
      "Refaceri costisitoare după execuție.",
    ],
    solutionTitle: "Soluția ZES: protecție radiologică separată de RF shielding",
    solutionDescription:
      "ZES tratează protecția radiologică drept serviciu distinct pentru CT/RX, separat de RF shielding-ul pentru RMN.",
    solutionBullets: [
      "Coordonare pereți, uși și sticlă plumbată.",
      "Planificare zone controlate și siguranță radiologică.",
      "Corelare cu layout-ul camerei și aparatura.",
      "Pregătire pentru cerințe CNCAN.",
    ],
    capabilities: [
      "Pereți cu protecție plumbată pentru RX și CT",
      "Uși plumbate și sticlă plumbată",
      "Protecție radiologică pentru zone controlate",
      "Coordonare CNCAN și layout",
      "Integrare cu aparatura de imagistică",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Protecția radiologică este pentru RMN?",
        answer:
          "Nu în sensul CT/RX. RMN are cerințe de RF shielding și siguranță magnetică, nu protecție la radiații ionizante.",
      },
      {
        question: "Ce elemente poate include ecranarea cu plumb?",
        answer:
          "Pereți plumbați, uși plumbate, sticlă plumbată și alte soluții validate prin cerințe de protecție radiologică.",
      },
      {
        question: "CNCAN trebuie avut în vedere?",
        answer:
          "Da, pentru camere și activități cu radiații ionizante, CNCAN trebuie clarificat încă din planificare.",
      },
    ],
    relatedSlugs: ["radiologie", "imagistica-medicala", "rf-shielding"],
  },
  {
    slug: "aparatura-medicala",
    title: "Aparatură medicală",
    shortTitle: "Aparatură medicală",
    href: "/services/aparatura-medicala",
    seoTitle: "Vânzare și integrare aparatură medicală",
    seoDescription:
      "Aparatură medicală pentru clinici, diagnostic și laborator: consultanță alegere echipamente, vânzare, integrare, instalare, service și mentenanță.",
    keywords: ["aparatură medicală", "vânzare aparatură medicală", "integrare echipamente", "service aparatură medicală"],
    schemaServiceType: "Aparatură medicală",
    heroEyebrow: "Medical equipment",
    heroTitle:
      "Aparatură medicală aleasă, integrată și susținută tehnic.",
    heroDescription:
      "ZES este partener pentru echipamente medicale, consultanță de selecție, integrare, instalare și service, nu doar pentru infrastructura spațiului.",
    overview:
      "Aparatura medicală influențează spațiul, instalațiile, fluxurile, bugetul, service-ul și performanța clinicii. Alegerea și integrarea trebuie tratate împreună.",
    risksTitle: "Riscuri când aparatura este separată de proiect",
    risks: [
      "Echipamente incompatibile cu spațiul sau instalațiile.",
      "Costuri ascunse pentru acces, alimentare, răcire și service.",
      "Alegere aparatură fără plan de mentenanță.",
      "Întârzieri la instalare și punere în funcțiune.",
    ],
    solutionTitle: "Soluția ZES: echipament + infrastructură + service",
    solutionDescription:
      "ZES ajută la alegerea, vânzarea, integrarea și susținerea aparaturii medicale în proiecte reale de operare.",
    solutionBullets: [
      "Consultanță alegere aparatură.",
      "Vânzare și integrare echipamente medicale.",
      "Coordonare cu spațiul, instalațiile și service-ul.",
      "Mentenanță și suport tehnic.",
    ],
    capabilities: [
      "Echipamente clinice și diagnostic",
      "Imagistică, ecografie și echipamente suport",
      "IVD și echipamente laborator",
      "Integrare și instalare",
      "Service și mentenanță",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "ZES poate ajuta la alegerea aparaturii?",
        answer:
          "Da. ZES poate susține selecția echipamentelor în funcție de spațiu, specialitate, buget, service și integrare.",
      },
      {
        question: "Vânzarea este separată de integrare?",
        answer:
          "Sunt servicii distincte, dar coordonate. Echipamentul trebuie ales și integrat corect în infrastructură.",
      },
      {
        question: "Includeți service?",
        answer:
          "Da. Service-ul și mentenanța sunt piloni separați ai platformei ZES.",
      },
    ],
    relatedSlugs: ["imagistica-medicala", "ivd-laborator", "service-aparatura-medicala"],
  },
  {
    slug: "imagistica-medicala",
    title: "Imagistică medicală",
    shortTitle: "Imagistică medicală",
    href: "/services/imagistica-medicala",
    seoTitle: "Echipamente de imagistică medicală",
    seoDescription:
      "Echipamente de imagistică medicală: CT, RMN, RX, ecografie, integrare aparatură, infrastructură cameră, service și consultanță tehnică.",
    keywords: ["imagistică medicală", "CT", "RMN", "RX", "ecografie", "echipamente imagistică"],
    schemaServiceType: "Imagistică medicală",
    heroEyebrow: "Imaging equipment",
    heroTitle:
      "Imagistică medicală ca pilon tehnologic, nu doar ca instalare.",
    heroDescription:
      "ZES susține proiectele de imagistică prin echipamente CT, RMN, RX, ecografie, infrastructură dedicată, integrare și service.",
    overview:
      "Imagistica cere corelarea echipamentului cu camera, ecranarea potrivită, autorizarea, instalațiile, software-ul, service-ul și fluxurile clinice.",
    risksTitle: "Riscuri în proiectele de imagistică",
    risks: [
      "Echipament ales fără verificarea camerei și a instalațiilor.",
      "Confuzie între RF shielding pentru RMN și ecranarea cu plumb pentru CT/RX.",
      "Service, răcire și acces insuficient planificate.",
      "Buget incomplet pentru integrare și mentenanță.",
    ],
    solutionTitle: "Soluția ZES: imagistică integrată complet",
    solutionDescription:
      "ZES conectează selecția echipamentului, infrastructura camerei, ecranarea, autorizările și service-ul.",
    solutionBullets: [
      "Consultanță CT, RMN, RX și ecografie.",
      "Integrare cu infrastructura camerei.",
      "Coordonare RF shielding sau protecție radiologică după caz.",
      "Plan de service și mentenanță.",
    ],
    capabilities: [
      "CT, RMN, RX și ecografie",
      "Selecție și integrare echipamente imagistică",
      "Infrastructură cameră și trasee tehnice",
      "Service, mentenanță și continuitate operațională",
      "Consultanță buget și etapizare",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Imagistica include doar aparatul?",
        answer:
          "Nu. Include camera, infrastructura, ecranarea, autorizarea, service-ul și integrarea în fluxul clinic.",
      },
      {
        question: "ZES poate lucra cu CT, RMN, RX și ecografie?",
        answer:
          "Da. ZES tratează imagistica drept pilon separat de echipamente și infrastructură.",
      },
      {
        question: "Ce instrument este util pentru început?",
        answer:
          "Radiology Room Planner poate structura cerințele inițiale pentru CT, RMN sau RX.",
      },
    ],
    relatedSlugs: ["radiologie", "aparatura-medicala", "service-aparatura-medicala"],
  },
  {
    slug: "ivd-laborator",
    title: "IVD / laborator",
    shortTitle: "IVD / laborator",
    href: "/services/ivd-laborator",
    seoTitle: "IVD și echipamente laborator",
    seoDescription:
      "IVD și echipamente de laborator pentru proiecte medicale: consultanță, vânzare, integrare, fluxuri, service și mentenanță.",
    keywords: ["IVD", "echipamente laborator", "laborator medical", "aparatură laborator", "service laborator"],
    schemaServiceType: "IVD și laborator",
    heroEyebrow: "IVD & laboratory",
    heroTitle:
      "Echipamente IVD și laborator integrate în infrastructura clinicii.",
    heroDescription:
      "ZES susține laboratoare și zone IVD prin echipamente, consultanță, integrare, fluxuri tehnice, service și mentenanță.",
    overview:
      "Laboratorul are nevoie de echipamente, fluxuri, alimentări, ventilație, apă, consumabile, service și mentenanță coordonate de la început.",
    risksTitle: "Riscuri în proiectele IVD / laborator",
    risks: [
      "Echipamente alese fără fluxuri și instalații confirmate.",
      "Spații de laborator insuficient pregătite pentru operare.",
      "Service și consumabile planificate prea târziu.",
      "Buget incomplet pentru integrare și mentenanță.",
    ],
    solutionTitle: "Soluția ZES: laborator ca sistem tehnic",
    solutionDescription:
      "ZES conectează echipamentele IVD, spațiul, fluxurile, instalațiile și service-ul într-un plan de operare clar.",
    solutionBullets: [
      "Consultanță alegere echipamente IVD.",
      "Vânzare și integrare aparatură laborator.",
      "Coordonare fluxuri și instalații.",
      "Service și mentenanță pentru continuitate.",
    ],
    capabilities: [
      "Echipamente IVD și laborator",
      "Consultanță pentru selecție aparatură",
      "Integrare în spații medicale existente sau noi",
      "Fluxuri, instalații și consumabile",
      "Service și mentenanță laborator",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "ZES include zona de laborator?",
        answer:
          "Da. IVD și laborator sunt piloni separați în oferta ZES, nu doar completări la construcții.",
      },
      {
        question: "Puteți ajuta la alegerea echipamentelor?",
        answer:
          "Da. ZES poate susține alegerea echipamentelor în funcție de flux, volum, spațiu și mentenanță.",
      },
      {
        question: "Includeți service pentru laborator?",
        answer:
          "Da. Service-ul și mentenanța sunt integrate în planificarea tehnică.",
      },
    ],
    relatedSlugs: ["aparatura-medicala", "amenajari-medicale", "service-aparatura-medicala"],
  },
  {
    slug: "service-aparatura-medicala",
    title: "Service aparatură medicală",
    shortTitle: "Service aparatură",
    href: "/services/service-aparatura-medicala",
    seoTitle: "Service și mentenanță aparatură medicală",
    seoDescription:
      "Service aparatură medicală, mentenanță, suport tehnic și continuitate operațională pentru clinici, imagistică, IVD, laborator și echipamente medicale.",
    keywords: ["service aparatură medicală", "mentenanță aparatură", "service imagistică", "service laborator"],
    schemaServiceType: "Service aparatură medicală",
    heroEyebrow: "Service & maintenance",
    heroTitle:
      "Service aparatură medicală pentru echipamente care trebuie să rămână operaționale.",
    heroDescription:
      "ZES oferă suport tehnic, mentenanță și planificare de service pentru echipamente medicale, imagistică, IVD și infrastructură medicală.",
    overview:
      "Service-ul este un pilon al platformei ZES. Uptime-ul depinde de acces, documentație, piese, mentenanță preventivă și intervenții coordonate.",
    risksTitle: "Riscuri când service-ul este doar reactiv",
    risks: [
      "Timp de nefuncționare crescut.",
      "Acces dificil la echipamente.",
      "Diagnostic tehnic lent și documentație incompletă.",
      "Costuri mai mari prin intervenții urgente.",
    ],
    solutionTitle: "Soluția ZES: service conectat cu infrastructura",
    solutionDescription:
      "ZES planifică service-ul împreună cu integrarea echipamentelor și infrastructura, pentru continuitate operațională.",
    solutionBullets: [
      "Mentenanță preventivă și suport tehnic.",
      "Service pentru echipamente medicale, imagistică și laborator.",
      "Coordonare acces, documentație și intervenții.",
      "Recomandări pentru continuitate și operare.",
    ],
    capabilities: [
      "Service aparatură medicală",
      "Mentenanță imagistică și laborator",
      "Diagnostic tehnic și intervenții",
      "Planificare continuitate",
      "Suport pentru proiecte noi și existente",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Service-ul este separat de vânzarea de aparatură?",
        answer:
          "Da. Service-ul este un pilon distinct, dar se coordonează cu vânzarea, integrarea și infrastructura.",
      },
      {
        question: "Poate service-ul fi planificat din proiect?",
        answer:
          "Da. Este recomandat ca accesul, mentenanța și documentația să fie gândite înainte de instalare.",
      },
      {
        question: "Includeți suport pentru imagistică și laborator?",
        answer:
          "Da. ZES susține echipamente medicale, imagistică, IVD și laborator.",
      },
    ],
    relatedSlugs: ["aparatura-medicala", "imagistica-medicala", "ivd-laborator"],
  },
];

export function getServiceBySlug(slug: ServiceSlug): Service {
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    throw new Error(`Service not found: ${slug}`);
  }

  return service;
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedSlugs.map(getServiceBySlug);
}
