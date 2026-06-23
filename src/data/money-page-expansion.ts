import type { SeoCommercialLanding } from "@/data/seo-commercial-landings";

const whyZescorp = [
  "ZESCORP trateaza cererea ca proiect comercial si tehnic: echipament, spatiu, flux operational, service, mentenanta si documentatie.",
  "Beneficiarul primeste o discutie structurata pentru oferta, nu un raspuns generic. Scopul este sa fie clare datele lipsa, riscurile si pasul urmator.",
  "Pentru imagistica, radiologie, PACS, service sau infrastructura medicala, ZESCORP poate corela achizitia cu instalarea, suportul si mentenanta.",
  "Nu sunt promise autorizari, certificari sau rezultate care depind de autoritati ori specialisti externi. Datele finale se valideaza in etapa tehnica.",
];

const baseFaqs = [
  {
    question: "Pot cere oferta daca proiectul nu este complet definit?",
    answer:
      "Da. Pentru prima discutie sunt suficiente obiectivul, locatia, termenul dorit si datele disponibile despre echipament, spatiu sau serviciu.",
  },
  {
    question: "Se pot comunica preturi fixe direct de pe pagina?",
    answer:
      "Nu. Costul depinde de configuratie, locatie, documente, servicii incluse si disponibilitatea datelor tehnice. ZESCORP pregateste oferta dupa clarificare.",
  },
  {
    question: "Ce informatii ajuta cel mai mult la preluarea cererii?",
    answer:
      "Tipul proiectului sau echipamentului, orasul, termenul, fotografii sau documente disponibile, bugetul orientativ si datele de contact.",
  },
];

type MoneyPageConfig = {
  slug: string;
  path: string;
  title: string;
  h1: string;
  eyebrow: string;
  serviceType: string;
  offerAngle: string;
  keywords: string[];
  audience: string[];
  deliverables: string[];
  internalLinks: Array<{ href: string; label: string }>;
  costFocus: string;
  implementationFocus: string;
};

function createMoneyPage(config: MoneyPageConfig): SeoCommercialLanding {
  const intro =
    `${config.title} este o pagina comerciala pentru clinici, spitale private, centre medicale si investitori care au nevoie de o directie clara pentru oferta. ` +
    `ZESCORP poate structura solicitarea pentru ${config.offerAngle}, astfel incat discutia sa porneasca de la date reale, risc operational si urmatorul pas comercial.`;

  return {
    slug: config.slug,
    path: config.path,
    title: config.title,
    metadataTitle: `${config.title} | Oferta si consultanta ZESCORP`,
    metadataDescription: `${config.title} pentru proiecte medicale B2B: evaluare, oferta personalizata, consultanta, WhatsApp si preluare rapida prin ZESCORP.`,
    h1: config.h1,
    eyebrow: config.eyebrow,
    intro,
    targetKeywords: config.keywords,
    audience: config.audience,
    benefits: [
      `clarificare rapida pentru ${config.offerAngle}`,
      "reducerea riscului de ofertare incompleta sau greu de comparat",
      "corelarea cererii comerciale cu spatiul, echipamentul, termenul si suportul necesar",
      "pregatirea unei discutii aplicate pentru achizitii, administrator sau echipa tehnica",
      "posibilitatea de a include service, mentenanta si suport operational in aceeasi cerere",
      "traseu simplu: solicitare, clarificare, oferta preliminara si pas urmator",
    ],
    implementation: [
      {
        title: "Preluare cerere",
        description:
          "Se colecteaza obiectivul, orasul, termenul, tipul de echipament sau proiect si datele de contact pentru clarificari.",
      },
      {
        title: "Clarificare tehnica",
        description:
          config.implementationFocus,
      },
      {
        title: "Incadrare comerciala",
        description:
          "Solicitarea este separata pe componente: produs, lucrari, instalare, documentatie, service, mentenanta si suport post-implementare.",
      },
      {
        title: "Identificare riscuri",
        description:
          "Se noteaza elementele care pot modifica bugetul sau termenul: acces, utilitati, compatibilitati, autorizari, documente sau disponibilitate.",
      },
      {
        title: "Oferta personalizata",
        description:
          "Dupa clarificare, ZESCORP poate pregati o oferta sau o directie comerciala cu ipoteze explicite.",
      },
      {
        title: "Plan de urmat",
        description:
          "Beneficiarul primeste urmatorul pas recomandat: discutie tehnica, documente necesare, vizita, lista de echipamente sau oferta etapizata.",
      },
    ],
    deliverables: config.deliverables,
    costFactors: [
      config.costFocus,
      "complexitatea proiectului, locatia si termenul dorit",
      "daca solicitarea include doar consultanta sau si furnizare, instalare, lucrari, service si mentenanta",
      "disponibilitatea documentelor, planurilor, pozelor, fiselor tehnice si datelor despre echipamente",
    ],
    procurementNotes: [
      "Defineste rezultatul dorit inainte sa compari preturi.",
      "Trimite datele disponibile, chiar daca proiectul nu este complet.",
      "Cere separarea componentelor comerciale: produs, instalare, lucrari, service si mentenanta.",
      "Evita deciziile bazate doar pe pret daca exista risc de downtime, autorizare sau integrare.",
    ],
    whyZESCORP: whyZescorp,
    internalLinks: [
      ...config.internalLinks,
      { href: "/contact", label: "Contact ZESCORP" },
      { href: "/servicii", label: "Servicii ZESCORP" },
    ],
    faqs: [
      ...baseFaqs,
      {
        question: `Cand merita ceruta oferta pentru ${config.title.toLowerCase()}?`,
        answer:
          "Cand exista intentie reala de achizitie, modernizare, service, amenajare sau bugetare. O cerere timpurie ajuta la identificarea riscurilor inainte de costuri inutile.",
      },
      {
        question: "Pot trimite fotografii, schite sau liste de echipamente?",
        answer:
          "Da. Fotografiile, planurile, listele de echipamente, codurile de eroare sau fisele tehnice ajuta la incadrarea mai rapida a cererii.",
      },
      {
        question: "ZESCORP poate include si suport dupa implementare?",
        answer:
          "Da. In functie de caz, solicitarea poate include service, mentenanta preventiva, suport tehnic, instalare, relocare sau consultanta operationala.",
      },
    ],
    commercialNarrative: [
      {
        title: "Ce cumperi de fapt",
        body:
          `Pentru ${config.title.toLowerCase()}, valoarea nu sta doar in produs sau serviciu izolat. Conteaza modul in care cererea se potriveste cu spatiul, fluxul clinic, echipa, termenul si suportul necesar dupa livrare.`,
      },
      {
        title: "De ce conteaza clarificarea initiala",
        body:
          "O oferta utila trebuie sa arate ce este inclus, ce ramane de verificat si ce ipoteze pot schimba bugetul. Fara aceasta etapa, comparatia intre oferte poate deveni inselatoare.",
      },
      {
        title: "Cum ajuta ZESCORP",
        body:
          "ZESCORP structureaza cererea in limbaj comercial si tehnic, astfel incat administratorul, medicul coordonator si achizitiile sa poata discuta acelasi scenariu.",
      },
      {
        title: "Cand proiectul devine ofertabil",
        body:
          "Proiectul devine ofertabil cand sunt clare obiectivul, locatia, categoria echipamentului sau serviciului, termenul, datele de contact si documentele disponibile.",
      },
    ],
    primaryCta: "Solicita oferta",
    secondaryCta: "Cere consultanta",
    consultationCta: "Discuta cu ZESCORP",
    serviceType: config.serviceType,
    offerAngle: config.offerAngle,
  };
}

export const moneyPageExpansionLandings: SeoCommercialLanding[] = [
  createMoneyPage({
    slug: "mentenanta-aparatura-medicala",
    path: "/mentenanta-aparatura-medicala",
    title: "Mentenanta aparatura medicala",
    h1: "Mentenanta aparatura medicala pentru continuitate operationala",
    eyebrow: "Mentenanta preventiva",
    serviceType: "Mentenanta aparatura medicala",
    offerAngle: "contracte de mentenanta, verificari preventive si suport tehnic pentru aparatura medicala",
    keywords: ["mentenanta aparatura medicala", "contract mentenanta aparatura medicala", "mentenanta preventiva echipamente medicale"],
    audience: ["clinici cu echipamente critice", "laboratoare si centre imagistica", "spitale private", "administratori care vor reducerea downtime-ului"],
    deliverables: ["plan de mentenanta preventiva", "lista echipamente prioritare", "oferta contract service", "niveluri de raspuns", "raportare interventii", "recomandari pentru ciclul de viata"],
    internalLinks: [
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/servicii/mentenanta-echipamente-medicale", label: "Mentenanta echipamente medicale" },
    ],
    costFocus: "numarul de echipamente, criticitatea, frecventa verificarilor si timpul de raspuns solicitat",
    implementationFocus: "Se verifica echipamentele, istoricul de interventii, riscul de oprire si nivelul de suport dorit.",
  }),
  createMoneyPage({
    slug: "autorizare-cncan",
    path: "/autorizare-cncan",
    title: "Autorizare CNCAN",
    h1: "Autorizare CNCAN pentru proiecte de radiologie si imagistica",
    eyebrow: "Radiologie si conformitate",
    serviceType: "Consultanta preliminara CNCAN",
    offerAngle: "pregatirea preliminara a cererii, documentelor si datelor tehnice pentru proiecte care implica radiologie",
    keywords: ["autorizare CNCAN", "CNCAN radiologie", "autorizare camera RX", "documentatie CNCAN"],
    audience: ["clinici care deschid camera RX", "centre CT sau radiologie", "investitori medicali", "manageri de proiect medical"],
    deliverables: ["lista preliminara de date necesare", "brief pentru camera RX/CT", "corelare cu radioprotectia", "pasii comerciali pentru ofertare", "identificarea documentelor lipsa", "recomandare de specialist autorizat unde este cazul"],
    internalLinks: [
      { href: "/autorizare-cncan-camera-rx", label: "Autorizare CNCAN camera RX" },
      { href: "/servicii/consultanta-cncan-radiologie", label: "Consultanta CNCAN radiologie" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie RX" },
    ],
    costFocus: "tipul echipamentului, camera, planul, radioprotectia, documentatia si validarea de specialitate",
    implementationFocus: "Se clarifica tipul de echipament, planul camerei, vecinatatile, statusul documentatiei si ce trebuie validat de specialisti autorizati.",
  }),
  createMoneyPage({
    slug: "camera-radiologie",
    path: "/camera-radiologie",
    title: "Camera radiologie",
    h1: "Camera radiologie pentru clinici si centre medicale",
    eyebrow: "Camera RX",
    serviceType: "Camera radiologie",
    offerAngle: "amenajare, proiectare, radioprotectie si dotare pentru camere de radiologie",
    keywords: ["camera radiologie", "amenajare camera radiologie", "camera RX", "proiect camera radiologie"],
    audience: ["clinici private", "centre medicale regionale", "cabinete cu radiologie", "investitori in imagistica"],
    deliverables: ["brief camera radiologie", "lista cerinte spatiu", "radioprotectie preliminara", "oferta lucrari si echipamente", "plan de implementare", "suport service ulterior"],
    internalLinks: [
      { href: "/servicii/amenajare-camera-radiologie", label: "Amenajare camera radiologie" },
      { href: "/servicii/proiectare-camera-rx", label: "Proiectare camera RX" },
      { href: "/servicii/radioprotectie", label: "Radioprotectie" },
    ],
    costFocus: "starea spatiului, echipamentul RX, radioprotectia, finisajele, usa, vitrajul si instalarea",
    implementationFocus: "Se analizeaza spatiul, planul, echipamentul, fluxul pacientilor, vecinatatile si cerintele de protectie radiologica.",
  }),
  createMoneyPage({
    slug: "camera-computer-tomograf",
    path: "/camera-computer-tomograf",
    title: "Camera computer tomograf",
    h1: "Camera computer tomograf pentru proiecte CT ofertabile",
    eyebrow: "Camera CT",
    serviceType: "Camera computer tomograf",
    offerAngle: "camera CT, infrastructura, utilitati, radioprotectie, instalare si service",
    keywords: ["camera computer tomograf", "camera CT", "amenajare camera CT", "infrastructura CT"],
    audience: ["centre imagistica", "spitale private", "clinici care instaleaza CT", "investitori in diagnostic avansat"],
    deliverables: ["brief camera CT", "cerinte utilitati", "evaluare acces echipament", "radioprotectie preliminara", "oferta infrastructura", "plan service si mentenanta"],
    internalLinks: [
      { href: "/produse/computer-tomograf", label: "Computer tomograf" },
      { href: "/servicii/service-computer-tomograf", label: "Service CT" },
      { href: "/servicii/radioprotectie-ct", label: "Radioprotectie CT" },
    ],
    costFocus: "modelul CT, alimentarea electrica, HVAC-ul, accesul, radioprotectia, lucrarile si service-ul",
    implementationFocus: "Se coreleaza cerintele aparatului CT cu spatiul, accesul, utilitatile, fluxurile si protectia radiologica.",
  }),
  createMoneyPage({
    slug: "camera-rmn",
    path: "/camera-rmn",
    title: "Camera RMN",
    h1: "Camera RMN pentru proiecte medicale cu ecranare RF",
    eyebrow: "Camera RMN",
    serviceType: "Camera RMN",
    offerAngle: "camera RMN, RF shielding, infrastructura, acces magnet, instalare si suport tehnic",
    keywords: ["camera RMN", "amenajare camera RMN", "infrastructura RMN", "RF shielding RMN"],
    audience: ["centre imagistica", "spitale private", "investitori RMN", "manageri tehnici de proiect"],
    deliverables: ["brief camera RMN", "cerinte RF shielding", "analiza acces magnet", "cerinte HVAC si electric", "oferta camera RMN", "plan suport si mentenanta"],
    internalLinks: [
      { href: "/servicii/camera-rmn-la-cheie", label: "Camera RMN la cheie" },
      { href: "/servicii/rf-shielding-rmn", label: "RF shielding RMN" },
      { href: "/produse/rmn", label: "RMN" },
    ],
    costFocus: "tipul RMN, accesul pentru magnet, RF shielding-ul, HVAC-ul, lucrarile si suportul post-instalare",
    implementationFocus: "Se verifica spatiul, accesul pentru magnet, ecranarea RF, utilitatile, fluxurile si cerintele furnizorului de echipament.",
  }),
  createMoneyPage({
    slug: "radioprotectie-medicala",
    path: "/radioprotectie-medicala",
    title: "Radioprotectie medicala",
    h1: "Radioprotectie medicala pentru camere RX, CT si mamografie",
    eyebrow: "Protectie radiologica",
    serviceType: "Radioprotectie medicala",
    offerAngle: "evaluare preliminara, materiale radioprotectoare, plumbare si coordonare pentru camere cu radiatii ionizante",
    keywords: ["radioprotectie medicala", "protectie radiologica medicala", "plumbare radiologie", "radioprotectie camera RX"],
    audience: ["clinici radiologie", "centre CT", "cabinete dentare cu CBCT", "spitale private"],
    deliverables: ["evaluare preliminara radioprotectie", "lista date necesare", "oferta materiale si lucrari", "coordonare cu specialisti", "recomandari de flux", "pas urmator pentru validare"],
    internalLinks: [
      { href: "/servicii/radioprotectie", label: "Radioprotectie" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie si plumbare RX" },
      { href: "/servicii/placare-plumb-camera-rx", label: "Placare plumb camera RX" },
    ],
    costFocus: "tipul echipamentului, vecinatatile, planul camerei, materialele, usile si vitrajele radioprotejate",
    implementationFocus: "Se clarifica echipamentul, planul, vecinatatile, nivelul de utilizare si documentele disponibile pentru specialist.",
  }),
  createMoneyPage({
    slug: "ecranare-rf-rmn",
    path: "/ecranare-rf-rmn",
    title: "Ecranare RF RMN",
    h1: "Ecranare RF RMN pentru camere de rezonanta magnetica",
    eyebrow: "RF shielding",
    serviceType: "Ecranare RF RMN",
    offerAngle: "RF shielding, camera Faraday, infrastructura RMN si cerinte tehnice pentru instalare",
    keywords: ["ecranare RF RMN", "RF shielding RMN", "cusca Faraday RMN", "camera Faraday RMN"],
    audience: ["centre RMN", "spitale private", "investitori imagistica", "furnizori si manageri tehnici"],
    deliverables: ["brief RF shielding", "cerinte camera RMN", "lista date tehnice", "oferta ecranare RF", "plan de coordonare", "suport pentru verificari tehnice"],
    internalLinks: [
      { href: "/servicii/rf-shielding-rmn", label: "RF shielding RMN" },
      { href: "/servicii/cusca-faraday-rmn", label: "Cusca Faraday RMN" },
      { href: "/servicii/camera-rmn-la-cheie", label: "Camera RMN la cheie" },
    ],
    costFocus: "dimensiunea camerei, cerintele producatorului RMN, usile, ferestrele, penetrarile, HVAC-ul si testarea",
    implementationFocus: "Se coreleaza cerintele producatorului RMN cu camera, penetrarile, accesul, HVAC-ul si conditiile de testare.",
  }),
  createMoneyPage({
    slug: "proiectare-clinica-medicala",
    path: "/proiectare-clinica-medicala",
    title: "Proiectare clinica medicala",
    h1: "Proiectare clinica medicala pentru spatii functionale si ofertabile",
    eyebrow: "Proiectare medicala",
    serviceType: "Proiectare clinica medicala",
    offerAngle: "planificare spatii medicale, fluxuri, infrastructura, echipamente si cerere de oferta",
    keywords: ["proiectare clinica medicala", "amenajare clinica medicala", "proiect spatiu medical", "infrastructura clinica medicala"],
    audience: ["investitori medicali", "clinici noi", "centre multidisciplinare", "administratori care modernizeaza spatii"],
    deliverables: ["brief proiect clinica", "lista functiuni", "fluxuri pacient/personal", "cerinte infrastructura", "etapizare oferta", "legatura cu echipamente si service"],
    internalLinks: [
      { href: "/amenajare-cabinet-medical", label: "Amenajare cabinet medical" },
      { href: "/amenajare-centre-imagistica", label: "Amenajare centre imagistica" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
    ],
    costFocus: "suprafata, specialitatile, nivelul de finisaj, echipamentele, instalatiile si etapele de autorizare",
    implementationFocus: "Se definesc functiunile, fluxurile, echipamentele critice, utilitatile si prioritatile de bugetare.",
  }),
  createMoneyPage({
    slug: "infrastructura-imagistica-medicala",
    path: "/infrastructura-imagistica-medicala",
    title: "Infrastructura imagistica medicala",
    h1: "Infrastructura imagistica medicala pentru CT, RMN, RX si PACS",
    eyebrow: "Imagistica medicala",
    serviceType: "Infrastructura imagistica medicala",
    offerAngle: "camere CT/RMN/RX, utilitati, PACS, service si mentenanta pentru centre de imagistica",
    keywords: ["infrastructura imagistica medicala", "infrastructura CT RMN", "centru imagistica medicala", "proiect imagistica medicala"],
    audience: ["centre imagistica", "spitale private", "clinici regionale", "investitori in diagnostic medical"],
    deliverables: ["brief infrastructura", "lista cerinte pe modalitati", "plan utilitati", "PACS/RIS si date", "oferta etapizata", "plan service"],
    internalLinks: [
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
      { href: "/amenajare-centre-imagistica", label: "Amenajare centre imagistica" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
    ],
    costFocus: "numarul de modalitati, spatiul, utilitatile, protectiile specializate, PACS-ul si suportul operational",
    implementationFocus: "Se coreleaza fiecare modalitate imagistica cu spatiul, utilitatile, datele, fluxurile si cerintele de service.",
  }),
  createMoneyPage({
    slug: "pacs-ris",
    path: "/pacs-ris",
    title: "PACS RIS",
    h1: "PACS RIS pentru fluxuri de imagistica medicala",
    eyebrow: "Software imagistica",
    serviceType: "PACS RIS",
    offerAngle: "PACS, RIS, arhivare imagini, DICOM, worklist, raportare si integrare digitala",
    keywords: ["PACS RIS", "sistem PACS RIS", "PACS imagistica", "RIS radiologie"],
    audience: ["centre imagistica", "radiologie privata", "spitale private", "retele medicale"],
    deliverables: ["brief PACS/RIS", "lista fluxuri si utilizatori", "cerinte DICOM", "arhivare si backup", "oferta sistem", "plan suport operational"],
    internalLinks: [
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/produse/pacs-ris", label: "PACS / RIS produse" },
      { href: "/servicii/arhivare-pacs", label: "Arhivare PACS" },
    ],
    costFocus: "numarul de modalitati, utilizatori, locatii, volum de imagini, integrare RIS si arhivare",
    implementationFocus: "Se inventariaza echipamentele, utilizatorii, fluxul DICOM, raportarea, arhiva si cerintele de acces.",
  }),
  createMoneyPage({
    slug: "relocare-aparatura-medicala",
    path: "/relocare-aparatura-medicala",
    title: "Relocare aparatura medicala",
    h1: "Relocare aparatura medicala cu plan tehnic si operational",
    eyebrow: "Relocare echipamente",
    serviceType: "Relocare aparatura medicala",
    offerAngle: "demontare, transport, reinstalare, verificari si repunere in functiune pentru echipamente medicale",
    keywords: ["relocare aparatura medicala", "mutare echipamente medicale", "relocare echipamente radiologie", "reinstalare aparatura medicala"],
    audience: ["clinici care se muta", "centre medicale in renovare", "laboratoare", "spitale private"],
    deliverables: ["plan relocare", "lista echipamente", "evaluare acces", "plan demontare/reinstalare", "oferta logistica", "suport dupa relocare"],
    internalLinks: [
      { href: "/servicii/interventii-tehnice-echipamente-medicale", label: "Interventii tehnice" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/instalare-aparatura-medicala", label: "Instalare aparatura medicala" },
    ],
    costFocus: "dimensiunea echipamentelor, accesul, distanta, ambalarea, reinstalarea si verificarile necesare",
    implementationFocus: "Se verifica echipamentele, locatia veche, locatia noua, accesul, documentele si conditiile de repunere in functiune.",
  }),
  createMoneyPage({
    slug: "instalare-aparatura-medicala",
    path: "/instalare-aparatura-medicala",
    title: "Instalare aparatura medicala",
    h1: "Instalare aparatura medicala pentru clinici si laboratoare",
    eyebrow: "Instalare si punere in functiune",
    serviceType: "Instalare aparatura medicala",
    offerAngle: "instalare, punere in functiune, verificari initiale si suport operational pentru aparatura medicala",
    keywords: ["instalare aparatura medicala", "punere in functiune aparatura medicala", "instalare echipamente medicale"],
    audience: ["clinici noi", "laboratoare", "centre imagistica", "cabinete care achizitioneaza echipamente"],
    deliverables: ["plan instalare", "verificare spatiu", "cerinte utilitati", "punere in functiune", "instruire de baza", "oferta service"],
    internalLinks: [
      { href: "/produse", label: "Produse medicale" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
    ],
    costFocus: "tipul echipamentului, complexitatea instalarii, utilitatile, accesul, trainingul si suportul post-instalare",
    implementationFocus: "Se verifica cerintele producatorului, spatiul, alimentarea, accesul, documentele si responsabilitatile de punere in functiune.",
  }),
  createMoneyPage({
    slug: "audit-tehnic-aparatura-medicala",
    path: "/audit-tehnic-aparatura-medicala",
    title: "Audit tehnic aparatura medicala",
    h1: "Audit tehnic aparatura medicala pentru decizii de service si investitii",
    eyebrow: "Audit tehnic",
    serviceType: "Audit tehnic aparatura medicala",
    offerAngle: "inventariere, evaluare stare, risc operational, prioritizare service si recomandari de mentenanta",
    keywords: ["audit tehnic aparatura medicala", "evaluare aparatura medicala", "audit echipamente medicale", "inventar aparatura medicala"],
    audience: ["clinici cu multe echipamente", "spitale private", "laboratoare", "retele medicale"],
    deliverables: ["inventar echipamente", "prioritizare risc", "recomandari service", "plan mentenanta", "lista inlocuiri posibile", "raport pentru bugetare"],
    internalLinks: [
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/mentenanta-aparatura-medicala", label: "Mentenanta aparatura medicala" },
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
    ],
    costFocus: "numarul de echipamente, locatiile, accesul, nivelul de documentare si profunzimea raportului cerut",
    implementationFocus: "Se colecteaza lista de echipamente, vechimea, utilizarea, istoricul de service si impactul operational.",
  }),
  createMoneyPage({
    slug: "consultanta-imagistica-medicala",
    path: "/consultanta-imagistica-medicala",
    title: "Consultanta imagistica medicala",
    h1: "Consultanta imagistica medicala pentru proiecte CT, RMN, RX si PACS",
    eyebrow: "Consultanta medicala tehnica",
    serviceType: "Consultanta imagistica medicala",
    offerAngle: "selectie echipamente, infrastructura, PACS, service, bugetare si etape de implementare pentru imagistica medicala",
    keywords: ["consultanta imagistica medicala", "consultanta centru imagistica", "consultanta CT RMN", "proiect imagistica medicala"],
    audience: ["investitori in imagistica", "clinici care extind serviciile", "spitale private", "manageri de proiect medical"],
    deliverables: ["brief de proiect imagistica", "lista optiuni echipamente", "riscuri infrastructura", "PACS si flux digital", "bugetare etapizata", "recomandari service"],
    internalLinks: [
      { href: "/amenajare-centre-imagistica", label: "Amenajare centre imagistica" },
      { href: "/infrastructura-imagistica-medicala", label: "Infrastructura imagistica medicala" },
      { href: "/pacs-ris", label: "PACS RIS" },
    ],
    costFocus: "modalitatile imagistice, nivelul de performanta, infrastructura, PACS-ul, termenul si suportul operational",
    implementationFocus: "Se clarifica obiectivul investitiei, echipamentele dorite, spatiul, fluxul pacientilor, bugetul si etapa proiectului.",
  }),
];
