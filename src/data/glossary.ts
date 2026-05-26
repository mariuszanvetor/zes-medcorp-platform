import type { ArticleCTA, ArticleTool } from "@/data/articles";

export type GlossaryContentType =
  | "definition"
  | "comparison"
  | "checklist"
  | "guide"
  | "faq";

export type GlossarySection = {
  id: string;
  title: string;
  body: string[];
  bullets?: string[];
  callout?: {
    title: string;
    body: string;
  };
};

export type GlossaryFAQ = {
  question: string;
  answer: string;
};

export type GlossaryTerm = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cluster: string;
  parentTopic: string;
  contentType: GlossaryContentType;
  targetKeyword: string;
  readingTime: string;
  summary: string;
  definition: string;
  sections: GlossarySection[];
  technicalNotes: string[];
  validationNotes: string[];
  methodology: string[];
  standards: string[];
  relatedTerms: string[];
  relatedServices: string[];
  relatedTools: ArticleTool[];
  relatedGuides: Array<{ label: string; href: string }>;
  relatedArticles: Array<{ label: string; href: string }>;
  faqs: GlossaryFAQ[];
  cta: ArticleCTA;
  publishedAt: string;
  updatedAt: string;
  howToSteps?: string[];
};

type GlossarySeed = Omit<GlossaryTerm, "faqs" | "sections">;

const defaultGlossaryCta: ArticleCTA = {
  title: "Ai nevoie de o validare tehnică mai clară?",
  description:
    "Folosește instrumentele ZES pentru a transforma termenul în cerințe, riscuri și pași următori pentru proiectul tău.",
  label: "Solicită analiză tehnică",
  href: "/proposal-builder",
};

const glossarySeeds: GlossarySeed[] = [
  {
    slug: "rmn-vs-ct-infrastructura",
    title: "RMN vs CT din punct de vedere al infrastructurii",
    description:
      "Comparația utilă când alegi între un proiect RMN și unul CT: cerințe de spațiu, RF, plumb, HVAC, acces, service și integrare.",
    category: "Comparare tehnică",
    cluster: "Radiologie / planificare",
    parentTopic: "radiologie-planning",
    contentType: "comparison",
    targetKeyword: "RMN vs CT infrastructură",
    readingTime: "6 min",
    summary:
      "RMN și CT au cerințe de infrastructură diferite. RMN pune accent pe RF shielding și compatibilitate electromagnetică, în timp ce CT cere protecție radiologică, zone controlate și coordonare CNCAN.",
    definition:
      "Această comparație arată cum se schimbă proiectul atunci când treci de la un sistem RMN la unul CT. Diferențele nu țin doar de aparat, ci și de structură, instalații, layout și operare.",
    technicalNotes: [
      "RMN-ul cere continuitate RF, iar CT-ul cere protecție la radiații ionizante.",
      "Dimensiunea camerei și accesul logistic pot fi critice în ambele cazuri, dar cu priorități diferite.",
      "HVAC-ul și traseele tehnice se validează diferit pentru magnet versus gantry.",
      "În proiectele mixte, cerințele se separă înainte de execuție, nu după.",
    ],
    validationNotes: [
      "Validează echipamentul ales, clădirea și vecinătățile înainte să blochezi bugetul.",
      "Separă clar RF shielding de ecranarea cu plumb pentru a evita refaceri costisitoare.",
    ],
    methodology: [
      "Compară cerințele furnizorului de echipament cu constrângerile spațiului.",
      "Discută proiectul cu echipa tehnică înainte de oferta finală.",
    ],
    standards: ["fișa tehnică a echipamentului", "documentația de proiect"],
    relatedTerms: [
      "faraday-cage-explicatie",
      "plumb-vs-rf-shielding",
      "radiology-room-electrical-requirements",
    ],
    relatedServices: [
      "/services/radiologie",
      "/services/rf-shielding",
      "/services/protectie-radiologica",
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator cost cameră CT", href: "/calculatoare/cost-camera-ct" },
    ],
    relatedGuides: [
      { label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" },
      { label: "Ghid cost cameră CT", href: "/ghiduri/cost-camera-ct" },
    ],
    relatedArticles: [
      {
        label: "Diferența dintre RMN și CT din punct de vedere al infrastructurii",
        href: "/knowledge-hub/diferenta-rmn-ct-infrastructura",
      },
      {
        label: "Diferența dintre RF shielding și ecranarea cu plumb",
        href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
    howToSteps: [
      "Alege modalitatea principală pentru proiect.",
      "Compară cerințele de infrastructură cu fișa de echipament.",
      "Validează spațiul și instalațiile înainte de bugetul final.",
    ],
  },
  {
    slug: "cost-rf-shielding-romania",
    title: "Cost RF shielding în România",
    description:
      "Termen de orientare pentru proiectele RMN care au nevoie de analiză RF, cameră Faraday, ușă RF și integrare cu spațiul existent.",
    category: "RF shielding",
    cluster: "RMN / RF",
    parentTopic: "rf-shielding-rmn",
    contentType: "guide",
    targetKeyword: "cost RF shielding România",
    readingTime: "5 min",
    summary:
      "Costul RF shielding-ului depinde de dimensiunea camerei, calitatea execuției, numărul de penetrări, ușa RF și modul în care se integrează cu echipamentul RMN.",
    definition:
      "RF shielding înseamnă protecția camerei RMN față de interferențe electromagnetice. Nu este un finisaj și nu se tratează ca o simplă pardoseală sau placare.",
    technicalNotes: [
      "Prețul variază cu geometria camerei și cu numărul de puncte de trecere tehnice.",
      "Ușa RF și detaliile de etanșare pot influența mult bugetul.",
      "Testarea finală trebuie inclusă în planificare, nu lăsată ca idee separată.",
      "În proiectele cu clădiri existente apar frecvent modificări suplimentare.",
    ],
    validationNotes: [
      "Cere fișa de echipament și condițiile de mediu înainte de estimare.",
      "Confirmă dacă spațiul permite o incintă RF completă fără compromisuri majore.",
    ],
    methodology: [
      "Validează mai întâi spațiul și cerințele magnetului.",
      "Transformă costul orientativ într-o structură de proiect și risc.",
    ],
    standards: ["specificațiile furnizorului", "analiza de amplasament"],
    relatedTerms: ["faraday-cage-explicatie", "materiale-rf-cage-comparatie", "quench-pipe-rmn"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala"],
    relatedTools: [
      { label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
    ],
    relatedGuides: [
      { label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" },
      { label: "Ghid RF shielding", href: "/ghiduri/amenajare-radiologie" },
    ],
    relatedArticles: [
      {
        label: "Cât costă o cameră RMN în România",
        href: "/knowledge-hub/cost-camera-rmn-romania",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "checklist-camera-rmn-inainte-instalare",
    title: "Checklist cameră RMN înainte de instalare",
    description:
      "Lista practică de validare înainte de instalarea unui RMN: spațiu, RF, HVAC, vibrații, acces, quench și integrare.",
    category: "Checklist",
    cluster: "RMN / RF",
    parentTopic: "rf-shielding-rmn",
    contentType: "checklist",
    targetKeyword: "checklist cameră RMN înainte de instalare",
    readingTime: "5 min",
    summary:
      "Checklist-ul ajută la evitarea greșelilor care apar când echipamentul este ales înainte ca spațiul să fie pregătit tehnic.",
    definition:
      "Este o listă de verificare înainte de instalare care reduce riscul de refaceri, întârzieri și costuri neprevăzute.",
    technicalNotes: [
      "Confirmă dimensiunile utile și traseele de acces pentru echipament.",
      "Verifică dacă RF shielding-ul poate fi implementat fără compromisuri majore.",
      "Validează HVAC-ul, temperatura, umiditatea și vibrațiile.",
      "Pregătește planul pentru service și eventuale intervenții ulterioare.",
    ],
    validationNotes: [
      "Cere fișa tehnică și cerințele de instalare ale furnizorului înainte de montaj.",
      "Validarea spațiului trebuie să se întâmple înainte de semnarea execuției finale.",
    ],
    methodology: [
      "Parcurge cerințele de echipament, spațiu și utilități într-o singură revizie.",
      "Transformă fiecare lipsă într-un risc sau într-o acțiune de proiect.",
    ],
    standards: ["fișa de instalare a echipamentului", "condițiile de mediu ale furnizorului"],
    relatedTerms: ["faraday-cage-explicatie", "mri-room-dimensions-guide", "quench-pipe-rmn"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala"],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedGuides: [{ label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" }],
    relatedArticles: [
      {
        label: "Ce trebuie pregătit înainte de instalarea unui RMN",
        href: "/knowledge-hub/pregatire-instalare-rmn",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
    howToSteps: [
      "Verifică spațiul și accesul.",
      "Confimă cerințele RF și HVAC.",
      "Pregătește documentația tehnică înainte de montaj.",
    ],
  },
  {
    slug: "cerinte-ventilatie-camera-ct",
    title: "Cerințe de ventilație pentru camera CT",
    description:
      "Termen de referință pentru proiectele CT: ventilație, răcire, temperatură, vecinătăți și integrare cu protecția radiologică.",
    category: "CT / RX",
    cluster: "CT / RX",
    parentTopic: "ct-radiation",
    contentType: "guide",
    targetKeyword: "cerințe ventilație cameră CT",
    readingTime: "5 min",
    summary:
      "Camera CT are nevoie de un sistem de ventilație și răcire coerent, nu doar de finisaje. Mediul afectează stabilitatea aparatului și continuitatea operațională.",
    definition:
      "Ventilația camerei CT înseamnă controlul temperaturii, al căldurii disipate și al modului în care spațiul susține echipamentul în utilizare continuă.",
    technicalNotes: [
      "Verifică sarcina termică a echipamentului și modul de evacuare a căldurii.",
      "Corelează ventilația cu spațiul de operator și cu vecinătățile tehnice.",
      "În proiectele cu protecție radiologică, traseele se validează împreună.",
      "Instalațiile trebuie gândite pentru service și intervenții, nu doar pentru pornire.",
    ],
    validationNotes: [
      "Cere parametrii de mediu ai furnizorului CT înainte de proiectare.",
      "Confirmă dacă HVAC-ul existent poate susține regimul de funcționare.",
    ],
    methodology: [
      "Analizează spațiul, sarcina termică și circulația aerului.",
      "Coordonează ventilația cu protecția radiologică și accesul tehnic.",
    ],
    standards: ["fișa tehnică a echipamentului CT", "proiectul de instalații"],
    relatedTerms: ["cerinte-electrice-radiologie", "layout-camera-ct", "ct-shielding-estimation-guide"],
    relatedServices: ["/services/protectie-radiologica", "/services/radiologie"],
    relatedTools: [
      { label: "Calculator cost cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
    ],
    relatedGuides: [
      { label: "Ghid cost cameră CT", href: "/ghiduri/cost-camera-ct" },
      { label: "Amenajare radiologie", href: "/ghiduri/amenajare-radiologie" },
    ],
    relatedArticles: [
      {
        label: "Cât durează amenajarea unei camere CT",
        href: "/knowledge-hub/cat-dureaza-amenajarea-camera-ct",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "cerinte-electrice-radiologie",
    title: "Cerințe electrice pentru radiologie",
    description:
      "Referință pentru alimentarea camerelor CT, RX și altor zone de imagistică: putere, redundanță, siguranță și service.",
    category: "CT / RX",
    cluster: "CT / RX",
    parentTopic: "radiology-planning",
    contentType: "guide",
    targetKeyword: "cerințe electrice radiologie",
    readingTime: "6 min",
    summary:
      "Echipamentele de radiologie cer mai mult decât o priză corect amplasată. Alimentarea, protecțiile și traseele trebuie corelate cu fluxul și cu echipamentul.",
    definition:
      "Prin cerințe electrice în radiologie înțelegem alimentarea, protecțiile, circuitarea și compatibilitatea dintre echipament și infrastructură.",
    technicalNotes: [
      "Puterea instalată trebuie confirmată cu furnizorul echipamentului.",
      "Traseele și protecțiile electrice trebuie gândite pentru continuitate operațională.",
      "Accesul de service și posibilitatea de intervenție contează la fel de mult ca montajul.",
      "În proiectele mixte, cerințele electrice sunt adesea subestimate până la execuție.",
    ],
    validationNotes: [
      "Verifică încă de la început dacă tabloul și rețeaua suportă aparatul dorit.",
      "Corelează electricul cu HVAC-ul și cu eventualele sisteme de protecție radiologică.",
    ],
    methodology: [
      "Definește aparatul înainte de proiectarea finală a instalațiilor.",
      "Adaugă rezervă pentru service și scenarii de extindere.",
    ],
    standards: ["specificațiile producătorului", "proiectul instalațiilor electrice"],
    relatedTerms: ["layout-camera-ct", "cerinte-ventilatie-camera-ct", "radiology-room-electrical-requirements"],
    relatedServices: ["/services/radiologie", "/services/aparatura-medicala"],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedGuides: [
      { label: "Aparatură imagistică medicală", href: "/ghiduri/aparatura-imagistica-medicala" },
    ],
    relatedArticles: [
      {
        label: "Ce presupune integrarea aparaturii medicale într-o clinică",
        href: "/knowledge-hub/integrare-aparatura-medicala-clinica",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "quench-pipe-rmn",
    title: "Quench pipe RMN",
    description:
      "Explicația scurtă a conductei de evacuare a heliului și a modului în care influențează proiectul RMN.",
    category: "RMN / RF",
    cluster: "RMN / RF",
    parentTopic: "rf-shielding-rmn",
    contentType: "definition",
    targetKeyword: "quench pipe RMN",
    readingTime: "4 min",
    summary:
      "Quench pipe-ul este un element de siguranță și proiectare care nu poate fi tratat ca o opțiune secundară atunci când se planifică o cameră RMN.",
    definition:
      "Quench pipe-ul evacuează gazul rezultat într-un scenariu de quench și trebuie planificat în corelație cu echipamentul, traseele și cerințele de siguranță.",
    technicalNotes: [
      "Traseul trebuie verificat din faza de proiectare, nu după montaj.",
      "Accesul și distanțele se corelează cu magnetul și cu clădirea.",
      "În clădirile existente apar frecvent limitări suplimentare.",
    ],
    validationNotes: [
      "Confirmă cerințele exacte ale producătorului RMN.",
      "Asigură-te că traseul este compatibil cu spațiul și cu evacuarea.",
    ],
    methodology: [
      "Validează siguranța și traseul împreună cu proiectul camerei.",
      "Nu trata quench pipe-ul ca pe un detaliu decorativ sau opțional.",
    ],
    standards: ["fișa de instalare a magnetului", "proiectul de siguranță"],
    relatedTerms: ["checklist-camera-rmn-inainte-instalare", "mri-room-dimensions-guide", "faraday-cage-explicatie"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala"],
    relatedTools: [
      { label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
    ],
    relatedGuides: [
      { label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" },
    ],
    relatedArticles: [
      {
        label: "Ce trebuie pregătit înainte de instalarea unui RMN",
        href: "/knowledge-hub/pregatire-instalare-rmn",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "materiale-rf-cage-comparatie",
    title: "Materiale pentru RF cage - comparație",
    description:
      "Compară materialele și soluțiile folosite pentru o incintă RF în proiectele RMN, cu accent pe performanță și execuție.",
    category: "RMN / RF",
    cluster: "RMN / RF",
    parentTopic: "rf-shielding-rmn",
    contentType: "comparison",
    targetKeyword: "materiale RF cage comparație",
    readingTime: "5 min",
    summary:
      "Alegerea materialelor pentru RF cage influențează performanța, costul și calitatea execuției. Contează detaliile de montaj, nu doar materialul de bază.",
    definition:
      "O incintă RF este o soluție tehnică în care materialele și detaliile de îmbinare trebuie să mențină continuitatea electromagnetică.",
    technicalNotes: [
      "Performanța nu depinde doar de foi sau panouri, ci și de îmbinări.",
      "Ușa RF, filtrele și penetrările sunt critice pentru rezultat.",
      "Execuția pe spațiu existent poate schimba alegerea soluției.",
    ],
    validationNotes: [
      "Compară materialul cu cerințele reale ale echipamentului RMN.",
      "Validează soluția cu furnizorul și cu echipa de proiect înainte de execuție.",
    ],
    methodology: [
      "Nu alege materialul izolat; privește incinta ca sistem complet.",
      "Cere testarea și punerea în funcțiune împreună cu execuția.",
    ],
    standards: ["proiectul RF", "cerințele de testare"],
    relatedTerms: ["faraday-cage-explicatie", "cost-rf-shielding-romania", "checklist-camera-rmn-inainte-instalare"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala"],
    relatedTools: [
      { label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" },
    ],
    relatedGuides: [{ label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" }],
    relatedArticles: [
      {
        label: "Diferența dintre RF shielding și ecranarea cu plumb",
        href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "ct-shielding-estimation-guide",
    title: "Ghid de estimare pentru ecranarea CT",
    description:
      "Cum gândești orientativ costul ecranării pentru o cameră CT, fără să confunzi estimarea cu oferta finală.",
    category: "CT / RX",
    cluster: "CT / RX",
    parentTopic: "ct-radiation",
    contentType: "guide",
    targetKeyword: "estimare ecranare CT",
    readingTime: "5 min",
    summary:
      "Estimarea ecranării pentru CT pornește de la poziția echipamentului, vecinătăți, grosimi, acces și scenariul de operare.",
    definition:
      "Este un ghid de lucru pentru a înțelege ce influențează protecția radiologică înainte de bugetul final.",
    technicalNotes: [
      "Analiza vecinătăților contează la fel de mult ca materialul de ecranare.",
      "Ușile, geamurile și punctele de trecere trebuie incluse în calcul.",
      "CNCAN și documentația trebuie tratate împreună cu layout-ul.",
    ],
    validationNotes: [
      "Solicită planul camerei și poziția exactă a echipamentului.",
      "Nu folosi o singură cifră până nu ai proiectul complet.",
    ],
    methodology: [
      "Estimează întâi riscul, apoi materialul și execuția.",
      "Corelează protecția cu utilizarea reală a camerei.",
    ],
    standards: ["documentația de proiect", "cerințe CNCAN"],
    relatedTerms: [
      "cerinte-ventilatie-camera-ct",
      "plumb-vs-rf-shielding",
      "radiology-room-electrical-requirements",
    ],
    relatedServices: ["/services/protectie-radiologica", "/services/radiologie"],
    relatedTools: [
      { label: "Calculator cost cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
    ],
    relatedGuides: [{ label: "Ghid cost cameră CT", href: "/ghiduri/cost-camera-ct" }],
    relatedArticles: [
      {
        label: "Ce presupune protecția radiologică pentru o cameră RX",
        href: "/knowledge-hub/protectie-radiologica-camera-rx",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "cerinte-start-clinica-radiologie",
    title: "Cerințe de pornire pentru o clinică de radiologie",
    description:
      "Checklist de bază pentru a lansa o clinică de radiologie cu fluxuri, echipamente, autorizări și service clar definite.",
    category: "Checklist",
    cluster: "Radiologie / planificare",
    parentTopic: "radiology-planning",
    contentType: "checklist",
    targetKeyword: "cerințe clinică radiologie",
    readingTime: "5 min",
    summary:
      "O clinică de radiologie pornește corect atunci când infrastructura, aparatura, autorizațiile și service-ul sunt pregătite în același plan.",
    definition:
      "Checklist-ul acoperă elementele de bază care trebuie blocate înainte de deschidere, pentru a evita o lansare fragilă.",
    technicalNotes: [
      "Definește clar ce echipamente intră în prima etapă.",
      "Separă cerințele RMN de cele CT/RX și de protecția radiologică.",
      "Pregătește scenariul de service și continuitate operațională.",
    ],
    validationNotes: [
      "Verifică dacă spațiul, instalațiile și autorizările sunt aliniate.",
      "Nu deschide clinică fără o structură de cost și riscuri.",
    ],
    methodology: [
      "Tratează deschiderea clinicii ca pe un proiect tehnic, nu doar comercial.",
      "Fă validarea înainte de contractele finale de echipamente.",
    ],
    standards: ["planul de proiect", "cerințe de operare"],
    relatedTerms: [
      "radiology-clinic-startup-requirements",
      "radiology-room-electrical-requirements",
      "layout-camera-ct",
    ],
    relatedServices: ["/services/constructii-medicale", "/services/radiologie"],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Project Intake ZES", href: "/project-intake" },
    ],
    relatedGuides: [
      { label: "Amenajare radiologie", href: "/ghiduri/amenajare-radiologie" },
    ],
    relatedArticles: [
      {
        label: "Cum se planifică fluxurile într-o clinică medicală",
        href: "/knowledge-hub/planificare-fluxuri-clinica-medicala",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
    howToSteps: [
      "Stabilește echipamentele și fluxurile.",
      "Validează infrastructura și autorizațiile.",
      "Pregătește service-ul și continuitatea operațională.",
    ],
  },
  {
    slug: "mri-room-dimensions-guide",
    title: "Dimensiuni cameră RMN",
    description:
      "Ghid de orientare pentru dimensiunile utile ale camerei RMN, cu accent pe acces, RF, service și instalații.",
    category: "RMN / RF",
    cluster: "RMN / RF",
    parentTopic: "rf-shielding-rmn",
    contentType: "guide",
    targetKeyword: "dimensiuni cameră RMN",
    readingTime: "4 min",
    summary:
      "Dimensiunile utile nu se calculează doar după aparat. Accesul, spațiile tehnice, ușile și zonele de service pot schimba proiectul.",
    definition:
      "Este un ghid orientativ pentru a înțelege cât spațiu util trebuie păstrat în jurul unei camere RMN, în funcție de echipament și flux.",
    technicalNotes: [
      "Spațiul trebuie verificat împreună cu furnizorul echipamentului.",
      "Circulația pacientului și accesul tehnic trebuie să rămână neafectate.",
      "În clădirile existente apar frecvent limitări de structură și trasee.",
    ],
    validationNotes: [
      "Nu porni de la o singură cifră standard; pornește de la echipament.",
      "Corelează dimensiunile cu RF shielding-ul și cu instalațiile.",
    ],
    methodology: [
      "Măsoară spațiul și compară-l cu fișa tehnică a magnetului.",
      "Lasă loc pentru service, întreținere și situații de risc.",
    ],
    standards: ["fișa de instalare", "planul de amplasament"],
    relatedTerms: ["checklist-camera-rmn-inainte-instalare", "quench-pipe-rmn", "faraday-cage-explicatie"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala"],
    relatedTools: [
      { label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" },
    ],
    relatedGuides: [{ label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" }],
    relatedArticles: [
      {
        label: "Ce trebuie pregătit înainte de instalarea unui RMN",
        href: "/knowledge-hub/pregatire-instalare-rmn",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "ct-vs-cbct",
    title: "CT vs CBCT",
    description:
      "Comparația dintre CT și CBCT pentru infrastructură, spațiu, protecție și scenarii de utilizare.",
    category: "Comparare tehnică",
    cluster: "CT / RX",
    parentTopic: "ct-radiation",
    contentType: "comparison",
    targetKeyword: "CT vs CBCT",
    readingTime: "5 min",
    summary:
      "Diferența dintre CT și CBCT nu ține doar de aparat, ci și de modul în care proiectezi spațiul, protecția și fluxurile de lucru.",
    definition:
      "Comparația ajută la alegerea tehnologiei corecte pentru nevoia clinică, fără să faci presupuneri despre cerințele de cameră.",
    technicalNotes: [
      "CT-ul implică, de regulă, cerințe mai complexe de radioprotecție.",
      "CBCT poate avea alte nevoi de integrare, dar tot trebuie validat tehnic.",
      "Alegerea echipamentului influențează direct bugetul și layout-ul.",
    ],
    validationNotes: [
      "Clarifică aplicația clinică înainte de a cumpăra aparatul.",
      "Verifică dacă infrastructura existentă poate susține tehnologia aleasă.",
    ],
    methodology: [
      "Compară utilizarea clinică și costul de operare, nu doar prețul aparatului.",
      "Apoi compară cerințele de cameră și autorizare.",
    ],
    standards: ["specificațiile furnizorului", "proiectul de radioprotecție"],
    relatedTerms: ["cerinte-ventilatie-camera-ct", "cerinte-electrice-radiologie", "radiology-room-electrical-requirements"],
    relatedServices: ["/services/radiologie", "/services/protectie-radiologica"],
    relatedTools: [
      { label: "Calculator cost cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
    ],
    relatedGuides: [{ label: "Ghid cost cameră CT", href: "/ghiduri/cost-camera-ct" }],
    relatedArticles: [
      {
        label: "Cum alegi între CT, RMN și RX pentru o clinică",
        href: "/knowledge-hub/cum-alegi-ct-rmn-rx-clinica",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "faraday-cage-explicatie",
    title: "Faraday cage - explicație",
    description:
      "Definiția simplă a cuștii Faraday și rolul ei în proiectele RMN.",
    category: "RMN / RF",
    cluster: "RMN / RF",
    parentTopic: "rf-shielding-rmn",
    contentType: "definition",
    targetKeyword: "Faraday cage explicație",
    readingTime: "4 min",
    summary:
      "Cușca Faraday este soluția tehnică ce protejează camera RMN de interferențe RF și trebuie tratată ca parte critică a infrastructurii.",
    definition:
      "Faraday cage este incinta conductivă care limitează pătrunderea și ieșirea semnalelor electromagnetice din camera RMN.",
    technicalNotes: [
      "Integrarea nu se rezumă la pereți; ușa, filtrele și penetrările sunt la fel de importante.",
      "Calitatea execuției influențează stabilitatea imaginii și performanța în operare.",
      "În spațiile existente, detaliile constructive pot schimba complet soluția.",
    ],
    validationNotes: [
      "Confirmă cerințele de la furnizor înainte de a alege materialele.",
      "Testează incinta ca sistem complet, nu pe bucăți separate.",
    ],
    methodology: [
      "Validează spațiul, echipamentul și detaliile constructive împreună.",
      "Tratează cușca Faraday ca infrastructură, nu ca finisaj.",
    ],
    standards: ["fișa de instalare RMN", "planul de RF"],
    relatedTerms: ["materiale-rf-cage-comparatie", "checklist-camera-rmn-inainte-instalare", "quench-pipe-rmn"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala"],
    relatedTools: [{ label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" }],
    relatedGuides: [{ label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" }],
    relatedArticles: [
      {
        label: "Ce este camera Faraday pentru RMN și când este necesară",
        href: "/knowledge-hub/camera-faraday-rmn",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "plumb-vs-rf-shielding",
    title: "Plumb vs RF shielding",
    description:
      "Comparația care separă clar protecția radiologică de ecranarea RF pentru proiectele medicale.",
    category: "Comparare tehnică",
    cluster: "Radiologie / planificare",
    parentTopic: "radiology-planning",
    contentType: "comparison",
    targetKeyword: "plumb vs RF shielding",
    readingTime: "5 min",
    summary:
      "Plumbul și RF shielding-ul rezolvă probleme diferite. Le amesteci doar dacă vrei costuri în plus și validare tehnică mai dificilă.",
    definition:
      "Plumbul ține de protecția la radiații ionizante, iar RF shielding ține de interferențe electromagnetice în RMN.",
    technicalNotes: [
      "CT și RX lucrează cu protecție radiologică, nu cu RF.",
      "RMN lucrează cu RF shielding, nu cu plumb ca soluție principală.",
      "În proiectele mixte, fiecare zonă trebuie tratată separat.",
    ],
    validationNotes: [
      "Definește mai întâi modalitatea și riscul fizic principal.",
      "Apoi aplică soluția corectă pe fiecare cameră, nu pe tot proiectul la grămadă.",
    ],
    methodology: [
      "Separați corect tehnologiile înainte de a discuta despre materiale.",
      "Faceți validarea cu echipa de proiect și cu furnizorul de echipament.",
    ],
    standards: ["proiect de radioprotecție", "proiect RF"],
    relatedTerms: [
      "faraday-cage-explicatie",
      "radiology-room-electrical-requirements",
      "rmn-vs-ct-infrastructura",
    ],
    relatedServices: ["/services/protectie-radiologica", "/services/rf-shielding"],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
    ],
    relatedGuides: [
      { label: "Ghid cost cameră CT", href: "/ghiduri/cost-camera-ct" },
      { label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" },
    ],
    relatedArticles: [
      {
        label: "Diferența dintre RF shielding și ecranarea cu plumb",
        href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "hvac-imagistica-medicala",
    title: "HVAC pentru imagistică medicală",
    description:
      "Cum gândești răcirea și climatizarea pentru camere RMN, CT și alte zone de imagistică.",
    category: "Infrastructură medicală",
    cluster: "Radiologie / planificare",
    parentTopic: "radiology-planning",
    contentType: "guide",
    targetKeyword: "HVAC imagistică medicală",
    readingTime: "5 min",
    summary:
      "HVAC-ul pentru imagistică nu este doar confort. El influențează stabilitatea echipamentului, continuitatea și costul total al proiectului.",
    definition:
      "Prin HVAC în imagistică înțelegem sistemul care controlează temperatura, umiditatea și evacuarea căldurii din camerele tehnice.",
    technicalNotes: [
      "RMN-ul și CT-ul pot avea cerințe diferite pentru sarcina termică și stabilitate.",
      "Traseele HVAC trebuie coordonate cu ecranarea, accesul și instalațiile electrice.",
      "Subdimensionarea HVAC-ului duce la downtime și la costuri de remediere.",
    ],
    validationNotes: [
      "Cere cerințele de mediu ale echipamentului înainte de proiectare.",
      "Verifică dacă spațiul poate susține funcționarea continuă, nu doar pornirea.",
    ],
    methodology: [
      "Calculul se face cu echipamentul în minte, nu după ce spațiul este deja terminat.",
      "Include în analiză și service-ul, nu doar confortul termic.",
    ],
    standards: ["fișa de mediu a echipamentului", "proiect HVAC"],
    relatedTerms: ["cerinte-ventilatie-camera-ct", "mri-room-dimensions-guide", "radiology-room-electrical-requirements"],
    relatedServices: ["/services/radiologie", "/services/aparatura-medicala"],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    relatedGuides: [
      { label: "Aparatură imagistică medicală", href: "/ghiduri/aparatura-imagistica-medicala" },
    ],
    relatedArticles: [
      {
        label: "Ghid pentru echipamente IVD și laborator",
        href: "/knowledge-hub/ghid-pentru-echipamente-ivd-si-laborator",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "layout-camera-ct",
    title: "Layout camera CT",
    description:
      "Structura de bază a camerei CT: poziționare, acces, protecție, operator și trasee tehnice.",
    category: "CT / RX",
    cluster: "CT / RX",
    parentTopic: "ct-radiation",
    contentType: "checklist",
    targetKeyword: "layout cameră CT",
    readingTime: "5 min",
    summary:
      "Un layout CT bun reduce riscurile de operare și simplifică protecția radiologică, service-ul și circulația personalului.",
    definition:
      "Layout-ul camerei CT este modul în care spațiul, echipamentul și fluxurile sunt așezate pentru operare sigură și eficientă.",
    technicalNotes: [
      "Poziția gantry-ului schimbă camerele adiacente și protecția.",
      "Operatorul trebuie să aibă control vizual și acces la zona de lucru.",
      "Traseele tehnice și accesul pentru service trebuie lăsate de la început.",
    ],
    validationNotes: [
      "Verifică vecinătățile și traseele înainte de execuție.",
      "Nu separa layout-ul de protecția radiologică și de documentația CNCAN.",
    ],
    methodology: [
      "Începe de la echipament și apoi așază spațiul.",
      "Tratează fiecare cameră adiacentă ca risc și ca cerință de proiect.",
    ],
    standards: ["plan CT", "proiect de radioprotecție"],
    relatedTerms: ["ct-vs-cbct", "cerinte-ventilatie-camera-ct", "ct-shielding-estimation-guide"],
    relatedServices: ["/services/radiologie", "/services/protectie-radiologica"],
    relatedTools: [{ label: "Calculator cost cameră CT", href: "/calculatoare/cost-camera-ct" }],
    relatedGuides: [{ label: "Ghid cost cameră CT", href: "/ghiduri/cost-camera-ct" }],
    relatedArticles: [
      {
        label: "Ce verificări sunt necesare înainte de instalarea unui CT",
        href: "/knowledge-hub/verificari-inainte-instalare-ct",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
    howToSteps: [
      "Așază echipamentul în raport cu accesul și camerele adiacente.",
      "Verifică protecția și traseele tehnice.",
      "Lasă loc pentru service și operare continuă.",
    ],
  },
  {
    slug: "radiology-room-electrical-requirements",
    title: "Cerințe electrice pentru camera de radiologie",
    description:
      "Ce trebuie verificat la alimentarea camerelor de radiologie, de la putere la redundanță și service.",
    category: "CT / RX",
    cluster: "Radiologie / planificare",
    parentTopic: "radiology-planning",
    contentType: "guide",
    targetKeyword: "cerințe electrice cameră radiologie",
    readingTime: "5 min",
    summary:
      "În radiologie, electricul trebuie proiectat pentru echipamente, siguranță și continuitate, nu doar pentru pornire.",
    definition:
      "Acest termen acoperă dimensionarea alimentării, protecțiile, punerea la pământ și compatibilitatea dintre aparat și spațiu.",
    technicalNotes: [
      "Puterea trebuie verificată cu echipamentul ales, nu estimată generic.",
      "Redundanța și protecțiile pot fi critice în zonele cu utilizare intensă.",
      "Relația cu HVAC-ul și cu layout-ul trebuie planificată integrat.",
    ],
    validationNotes: [
      "Cere datele electrice ale aparatului înainte să închizi proiectul.",
      "Verifică dacă tabloul și infrastructura existentă suportă sarcina.",
    ],
    methodology: [
      "Proiectează electricul împreună cu echipamentul și cu scenariul de service.",
      "Nu separa alimentarea de operare și mentenanță.",
    ],
    standards: ["fișa electrică a echipamentului", "proiectul de instalații"],
    relatedTerms: ["cerinte-ventilatie-camera-ct", "layout-camera-ct", "hvac-imagistica-medicala"],
    relatedServices: ["/services/radiologie", "/services/aparatura-medicala"],
    relatedTools: [{ label: "Calculator proiect medical", href: "/calculator-proiect-medical" }],
    relatedGuides: [{ label: "Amenajare radiologie", href: "/ghiduri/amenajare-radiologie" }],
    relatedArticles: [
      {
        label: "Cum se planifică infrastructura pentru imagistică medicală",
        href: "/knowledge-hub/planificare-infrastructura-imagistica-medicala",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "radiology-clinic-startup-requirements",
    title: "Cerințe pentru deschiderea unei clinici de radiologie",
    description:
      "Lista de pornire pentru o clinică de radiologie: spațiu, autorizări, echipamente, protecție și service.",
    category: "Checklist",
    cluster: "Radiologie / planificare",
    parentTopic: "radiology-planning",
    contentType: "checklist",
    targetKeyword: "cerințe clinică radiologie startup",
    readingTime: "5 min",
    summary:
      "O clinică de radiologie are nevoie de o structură clară încă din faza de start pentru a evita costuri ascunse și întârzieri.",
    definition:
      "Checklist-ul acoperă pașii de pregătire înainte de deschiderea clinicii și leagă infrastructura de operare.",
    technicalNotes: [
      "Definește exact ce echipamente intră în prima etapă.",
      "Separă cerințele RMN, CT/RX și cele de service.",
      "Pregătește bugetul și documentația înainte de execuția finală.",
    ],
    validationNotes: [
      "Verifică dacă spațiul permite operarea în siguranță și conform cerințelor.",
      "Nu porni fără scenariu de service și fără plan de continuare operațională.",
    ],
    methodology: [
      "Tratează deschiderea clinicii ca pe un proiect de sistem.",
      "Alege aparatura după ce ai validat infrastructura.",
    ],
    standards: ["plan de lansare", "cerințe tehnice ale echipamentelor"],
    relatedTerms: [
      "cerinte-start-clinica-radiologie",
      "layout-camera-ct",
      "service-contract-vs-maintenance",
    ],
    relatedServices: ["/services/constructii-medicale", "/services/radiologie"],
    relatedTools: [
      { label: "Project Intake ZES", href: "/project-intake" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedGuides: [{ label: "Cost clinică medicală", href: "/ghiduri/cost-clinica-medicala" }],
    relatedArticles: [
      {
        label: "Autorizare DSP pentru clinică medicală: ce trebuie pregătit",
        href: "/knowledge-hub/autorizare-dsp-clinica-medicala",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
    howToSteps: [
      "Definește serviciile și echipamentele.",
      "Validează spațiul, autorizațiile și bugetul.",
      "Pregătește serviciile de integrare și mentenanță.",
    ],
  },
  {
    slug: "mri-project-timeline",
    title: "Timeline RMN",
    description:
      "Cum arată, în linii mari, calendarul unui proiect RMN de la concept la punere în funcțiune.",
    category: "RMN / RF",
    cluster: "RMN / RF",
    parentTopic: "rf-shielding-rmn",
    contentType: "guide",
    targetKeyword: "timeline RMN",
    readingTime: "4 min",
    summary:
      "Un proiect RMN poate fi rapid sau lent în funcție de validarea spațiului, RF shielding, echipament și integrare.",
    definition:
      "Timeline-ul RMN descrie succesiunea etapelor de proiect: concept, validare, proiectare, execuție, instalare și operare.",
    technicalNotes: [
      "Cererile de instalare și RF trebuie validate cât mai devreme.",
      "Proiectele pe clădire existentă au de obicei mai multe dependențe.",
      "Interdependența dintre echipament și infrastructură schimbă calendarul.",
    ],
    validationNotes: [
      "Ordonarea corectă a etapelor reduce riscul de refacere și întârziere.",
      "Planifică și sesiunea de service / testare, nu doar montajul.",
    ],
    methodology: [
      "Mergi de la cerința clinică la spațiu și apoi la echipament.",
      "Alocă timp pentru validări și decizii tehnice înainte de execuție.",
    ],
    standards: ["fișa de instalare", "plan de proiect"],
    relatedTerms: ["checklist-camera-rmn-inainte-instalare", "quench-pipe-rmn", "mri-infrastructure-mistakes"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala"],
    relatedTools: [{ label: "Radiology Room Planner", href: "/radiology-room-planner" }],
    relatedGuides: [{ label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" }],
    relatedArticles: [
      {
        label: "Cât durează amenajarea unei camere RMN",
        href: "/knowledge-hub/cat-dureaza-amenajarea-camera-rmn",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "mri-infrastructure-mistakes",
    title: "Greșeli de infrastructură în proiectele RMN",
    description:
      "Cele mai frecvente greșeli tehnice când camera RMN este tratată ca spațiu obișnuit, nu ca sistem specializat.",
    category: "RMN / RF",
    cluster: "RMN / RF",
    parentTopic: "rf-shielding-rmn",
    contentType: "faq",
    targetKeyword: "greșeli infrastructură RMN",
    readingTime: "5 min",
    summary:
      "Cele mai scumpe greșeli apar când RF, HVAC, accesul și service-ul nu sunt tratate ca parte din același plan.",
    definition:
      "Termenul acoperă erorile de planificare care afectează performanța camerei RMN înainte și după instalare.",
    technicalNotes: [
      "Alegerea târzie a echipamentului.",
      "Confuzia între RF shielding și alte forme de protecție.",
      "Subestimarea HVAC și a accesului de service.",
    ],
    validationNotes: [
      "Înainte de execuție, verifică toate dependențele camerei.",
      "Orice lipsă de cerință tehnică devine cost suplimentar mai târziu.",
    ],
    methodology: [
      "Analizează proiectul ca sistem complet, nu ca sumă de lucrări separate.",
      "Dacă lipsește o piesă critică, oprește-te și validează înainte de buget final.",
    ],
    standards: ["plan de proiect RMN", "fișa echipamentului"],
    relatedTerms: ["checklist-camera-rmn-inainte-instalare", "faraday-cage-explicatie", "quench-pipe-rmn"],
    relatedServices: ["/services/rf-shielding", "/services/imagistica-medicala"],
    relatedTools: [
      { label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" },
    ],
    relatedGuides: [{ label: "Ghid cost cameră RMN", href: "/ghiduri/cost-camera-rmn" }],
    relatedArticles: [
      {
        label: "Greșeli critice în proiectarea camerelor RMN",
        href: "/knowledge-hub/greseli-critice-in-proiectarea-camerelor-rmn",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "service-contract-vs-maintenance",
    title: "Contract de mentenanță vs service reactiv",
    description:
      "De ce un contract de mentenanță schimbă disponibilitatea echipamentelor față de intervenția doar după defect.",
    category: "Service",
    cluster: "Service / continuitate",
    parentTopic: "service-aparatura",
    contentType: "comparison",
    targetKeyword: "contract mentenanță aparatură medicală",
    readingTime: "5 min",
    summary:
      "Service-ul reactiv rezolvă o problemă după ce apare. Contractul de mentenanță încearcă să reducă apariția problemei și timpul de nefuncționare.",
    definition:
      "Comparația clarifică diferența dintre continuitatea planificată și intervenția de avarie pentru aparatura medicală.",
    technicalNotes: [
      "Uptime-ul este mai ușor de controlat când există mentenanță planificată.",
      "Piese, timp de răspuns și prioritizare trebuie definite înainte de incident.",
      "Pentru echipamente critice, service-ul reactiv singur este de obicei insuficient.",
    ],
    validationNotes: [
      "Stabilește ce impact are oprirea echipamentului asupra clinicii.",
      "Apoi compară costul contractului cu costul downtime-ului.",
    ],
    methodology: [
      "Gândește service-ul ca parte din modelul operațional.",
      "Nu trata mentenanța ca pe o cheltuială opțională după lansare.",
    ],
    standards: ["SLA", "plan de mentenanță"],
    relatedTerms: [
      "mri-project-timeline",
      "medical-imaging-room-hvac-guide",
      "radiology-room-electrical-requirements",
    ],
    relatedServices: ["/services/service-aparatura-medicala", "/services/aparatura-medicala"],
    relatedTools: [{ label: "Service Diagnostic", href: "/service-diagnostic" }],
    relatedGuides: [
      { label: "Service aparatură medicală", href: "/ghiduri/service-aparatura-medicala" },
    ],
    relatedArticles: [
      {
        label: "Service CT și RMN: mentenanță, uptime și riscuri",
        href: "/knowledge-hub/service-ct-rmn-mentenanta-uptime",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    slug: "medical-imaging-room-hvac-guide",
    title: "Ghid HVAC pentru camera de imagistică medicală",
    description:
      "Referință pentru climatizare și răcire în camere de imagistică, cu accent pe continuitate și service.",
    category: "Infrastructură medicală",
    cluster: "Radiologie / planificare",
    parentTopic: "radiology-planning",
    contentType: "guide",
    targetKeyword: "HVAC cameră imagistică medicală",
    readingTime: "5 min",
    summary:
      "HVAC-ul pentru imagistică influențează performanța echipamentului, confortul și calitatea operării pe termen lung.",
    definition:
      "Acest ghid tratează temperatură, umiditate, disipare termică și modul în care sistemul HVAC se coordonează cu aparatura.",
    technicalNotes: [
      "Proiectarea se face după specificațiile echipamentului, nu invers.",
      "Zonele de service și acces trebuie protejate termic și funcțional.",
      "În proiectele mixte, HVAC-ul trebuie să respecte cerințele fiecărei modalități.",
    ],
    validationNotes: [
      "Cere datele de mediu pentru fiecare aparat.",
      "Confirmă că soluția HVAC susține operarea continuă.",
    ],
    methodology: [
      "Calculul corect începe cu echipamentul și cu sarcina termică.",
      "Include service-ul, nu doar pornirea inițială.",
    ],
    standards: ["fișe tehnice", "proiect de instalații"],
    relatedTerms: ["hvac-imagistica-medicala", "cerinte-ventilatie-camera-ct", "radiology-room-electrical-requirements"],
    relatedServices: ["/services/imagistica-medicala", "/services/radiologie"],
    relatedTools: [{ label: "Calculator proiect medical", href: "/calculator-proiect-medical" }],
    relatedGuides: [
      { label: "Aparatură imagistică medicală", href: "/ghiduri/aparatura-imagistica-medicala" },
    ],
    relatedArticles: [
      {
        label: "Cum planifici infrastructura pentru imagistică medicală",
        href: "/knowledge-hub/planificare-infrastructura-imagistica-medicala",
      },
    ],
    cta: defaultGlossaryCta,
    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
];

function buildFaqs(seed: GlossarySeed): GlossaryFAQ[] {
  const firstQuestion =
    seed.contentType === "comparison"
      ? `Când aleg ${seed.title.toLowerCase()}?`
      : seed.contentType === "checklist"
        ? `Ce verifici înainte de ${seed.title.toLowerCase()}?`
        : `De ce contează ${seed.title.toLowerCase()}?`;
  const secondQuestion =
    seed.contentType === "comparison"
      ? "Ce trebuie comparat înainte de decizie?"
      : seed.contentType === "checklist"
        ? "Ce risc apare dacă lipsește validarea?"
        : "Ce trebuie validat tehnic înainte de decizie?";

  return [
    {
      question: firstQuestion,
      answer: seed.summary,
    },
    {
      question: secondQuestion,
      answer: seed.validationNotes[0] ?? seed.definition,
    },
  ];
}

function buildSections(seed: GlossarySeed): GlossarySection[] {
  return [
    {
      id: "definitie",
      title: "Definiție și context",
      body: [seed.definition],
    },
    {
      id: "impact-tehnic",
      title:
        seed.contentType === "comparison"
          ? "Ce diferențe contează"
          : seed.contentType === "checklist"
            ? "Ce verifici în practică"
            : "De ce contează în proiect",
      body: [seed.summary],
      bullets: seed.technicalNotes,
    },
    {
      id: "validare",
      title: "Validare tehnică și metodologie",
      body: seed.validationNotes,
      bullets: seed.methodology,
      callout: {
        title: "Nota ZES",
        body:
          "Acest termen ajută la clarificarea cerințelor de proiect. Nu înlocuiește analiza de amplasament, fișele tehnice sau validarea finală de execuție.",
      },
    },
    {
      id: "standarde",
      title: "Referințe și relații",
      body: [
        `Urmărește ${seed.standards.join(", ")} atunci când transformi termenul într-o decizie de proiect.`,
      ],
      bullets: [
        `Pilon: ${seed.parentTopic}`,
        `Cluster: ${seed.cluster}`,
      ],
    },
  ];
}

function buildGlossaryTerm(seed: GlossarySeed): GlossaryTerm {
  return {
    ...seed,
    sections: buildSections(seed),
    faqs: buildFaqs(seed),
  };
}

export const glossaryTerms: GlossaryTerm[] = glossarySeeds.map(buildGlossaryTerm);

export const glossaryCategories = Array.from(
  new Set(glossaryTerms.map((term) => term.category)),
).sort();

export function getGlossaryTermBySlug(slug: string) {
  return glossaryTerms.find((term) => term.slug === slug);
}

export function getGlossaryTermsByCategory(category: string) {
  return glossaryTerms.filter((term) => term.category === category);
}

export function generateGlossarySlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
