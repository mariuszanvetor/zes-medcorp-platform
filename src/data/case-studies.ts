export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  category: string;
  situation: string;
  challenges: string[];
  solution: string[];
  implementation: string[];
  results: string[];
  timeline: string;
  budget: string;
  avoidedRisks: string[];
  relatedLinks: Array<{ label: string; href: string }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "camera-rmn",
    title: "Camera RMN: scenariu de infrastructura, RF shielding si instalare",
    description:
      "Framework de studiu de caz pentru camera RMN: spatiu, acces, RF shielding, HVAC, documentatie, instalare si mentenanta.",
    category: "RMN",
    situation:
      "Un investitor pregateste o camera RMN intr-un spatiu existent si are nevoie de clarificarea costurilor, a accesului pentru magnet si a cerintelor de RF shielding.",
    challenges: [
      "spatiu existent cu acces tehnic neconfirmat",
      "necesar de RF shielding si ecranare electromagnetica",
      "coordonare intre furnizorul RMN, santier, HVAC si service",
      "buget care trebuie separat pe echipament, camera si suport",
    ],
    solution: [
      "audit preliminar al spatiului si al traseului de acces",
      "brief pentru RF shielding, usa RF, penetratii si testare",
      "separarea bugetului in infrastructura, echipament, instalare si mentenanta",
      "plan de discutie pentru furnizorul RMN si echipa de executie",
    ],
    implementation: [
      "colectare planuri si fise tehnice",
      "validare cerinte camera si zone tehnice",
      "ofertare pe capitole si stabilirea responsabilitatilor",
      "plan de service si mentenanta dupa punerea in functiune",
    ],
    results: [
      "buget mai clar pentru management",
      "risc redus de refacere a lucrarilor",
      "cerere de oferta pregatita pentru decizie",
      "traseu clar intre proiect, executie si service",
    ],
    timeline: "3-9 luni, in functie de spatiu, echipament si documentatie.",
    budget: "Investitie orientativa high-ticket, de regula EUR 250k-2M+ pentru proiect complet.",
    avoidedRisks: ["RF shielding incomplet", "acces magnet neconfirmat", "HVAC subdimensionat", "service ignorat"],
    relatedLinks: [
      { label: "Camera RMN la cheie", href: "/servicii/camera-rmn-la-cheie" },
      { label: "RF shielding RMN", href: "/servicii/rf-shielding-rmn" },
      { label: "Cost RMN 1.5T", href: "/ghiduri/cost-rmn-1-5t" },
    ],
  },
  {
    slug: "radiologie-digitala",
    title: "Radiologie digitala: scenariu camera RX, detector si PACS",
    description:
      "Framework comercial pentru camera de radiologie digitala: RX, detector, radioprotectie, PACS, service si buget.",
    category: "Radiologie",
    situation:
      "O clinica vrea sa deschida sau sa modernizeze radiologia si trebuie sa coreleze camera RX cu echipamentul, PACS-ul si radioprotectia.",
    challenges: [
      "camera RX fara documentatie completa",
      "nevoie de detector digital si flux DICOM",
      "radioprotectie si consultanta CNCAN preliminara",
      "mentenanta si downtime dupa lansare",
    ],
    solution: [
      "analiza plan camera si vecinatati",
      "brief pentru placare cu plumb, usa si vitraj radioprotejat",
      "integrare PACS si arhivare imagini",
      "contract de service radiologie pentru continuitate",
    ],
    implementation: [
      "definirea echipamentului RX si a fluxului",
      "stabilirea lucrarilor de camera",
      "pregatirea cererii comerciale si tehnice",
      "planificarea mentenantei preventive",
    ],
    results: [
      "oferta comparabila pe capitole",
      "risc redus de blocaj CNCAN",
      "flux digital mai clar",
      "service inclus in decizia initiala",
    ],
    timeline: "2-6 luni, in functie de spatiu, radioprotectie si echipament.",
    budget: "Buget mediu spre ridicat, in functie de detector, camera, radioprotectie si PACS.",
    avoidedRisks: ["plumbare incompleta", "PACS neclar", "detector necorelat", "service reactiv"],
    relatedLinks: [
      { label: "Amenajare camera radiologie", href: "/servicii/amenajare-camera-radiologie" },
      { label: "Placare plumb camera RX", href: "/servicii/placare-plumb-camera-rx" },
      { label: "Cost radiologie digitala", href: "/ghiduri/cost-radiologie-digitala" },
    ],
  },
  {
    slug: "radioprotectie-clinica",
    title: "Radioprotectie clinica: scenariu de plumbare si documentatie",
    description:
      "Framework pentru radioprotectie in clinica: camera RX/CT/mamografie, plumbare, documentatie si oferta preliminara.",
    category: "Radioprotectie",
    situation:
      "O clinica are un spatiu identificat pentru radiologie si trebuie sa inteleaga ce inseamna radioprotectia inainte de executie.",
    challenges: [
      "vecinatati neclarificate",
      "plan camera incomplet",
      "necesar de usa si vitraj radioprotejat",
      "status CNCAN neinceput",
    ],
    solution: [
      "colectare plan, vecinatati si model echipament",
      "separarea costurilor pentru pereti, usa, vitraj si finisaje",
      "pregatirea informatiilor pentru validare de specialitate",
      "cerere de oferta cu ipoteze clare",
    ],
    implementation: [
      "audit preliminar",
      "clarificarea documentelor lipsa",
      "oferta pe capitole",
      "coordonare cu proiectare radiologie si service",
    ],
    results: [
      "cerere de oferta mai rapida",
      "reducerea riscului de lucrari refacute",
      "claritate asupra costurilor speciale",
      "traseu comercial pentru implementare",
    ],
    timeline: "1-4 luni, in functie de documentatie si lucrari.",
    budget: "Buget variabil in functie de suprafata, echipament si elemente radioprotejate.",
    avoidedRisks: ["grosimi asumate gresit", "pereti ignorati", "usa neconforma", "documente lipsa"],
    relatedLinks: [
      { label: "Radioprotectie", href: "/servicii/radioprotectie" },
      { label: "Consultanta CNCAN", href: "/servicii/consultanta-cncan-radiologie" },
      { label: "Cost radioprotectie", href: "/ghiduri/cost-radioprotectie" },
    ],
  },
  {
    slug: "modernizare-centru-imagistica",
    title: "Modernizare centru imagistica: scenariu CT, RMN, PACS si service",
    description:
      "Framework pentru modernizarea unui centru de imagistica: infrastructura, echipamente, PACS, service si mentenanta.",
    category: "Modernizare",
    situation:
      "Un centru existent vrea sa modernizeze echipamentele si fluxul digital fara sa opreasca inutil activitatea.",
    challenges: [
      "downtime operational",
      "echipamente existente cu cerinte diferite",
      "PACS/RIS si arhivare neuniforme",
      "contracte de service fragmentate",
    ],
    solution: [
      "audit al echipamentelor si al infrastructurii",
      "prioritizare dupa venit, risc si downtime",
      "plan de modernizare PACS si service",
      "faze de implementare pentru continuitate",
    ],
    implementation: [
      "inventar tehnic",
      "plan de inlocuire si modernizare",
      "ofertare pe echipamente si servicii",
      "contract de mentenanta multi-vendor",
    ],
    results: [
      "risc operational redus",
      "decizie de investitie mai clara",
      "service preventiv integrat",
      "baza pentru cresterea capacitatii centrului",
    ],
    timeline: "2-12 luni, in functie de numarul de echipamente si fazare.",
    budget: "Investitie medie spre foarte mare, in functie de inlocuiri, infrastructura si PACS.",
    avoidedRisks: ["opriri neplanificate", "integrare PACS slaba", "service fragmentat", "buget fara prioritati"],
    relatedLinks: [
      { label: "Infrastructura imagistica", href: "/servicii/infrastructura-imagistica" },
      { label: "PACS medical", href: "/servicii/pacs-medical" },
      { label: "ROI centru imagistica", href: "/ghiduri/roi-centru-imagistica" },
    ],
  },
];
