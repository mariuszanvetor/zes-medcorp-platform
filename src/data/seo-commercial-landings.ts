import type { FAQItem } from "@/components/seo/FAQSchema";

export type SeoCommercialLanding = {
  slug: string;
  path: string;
  title: string;
  metadataTitle: string;
  metadataDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  targetKeywords: string[];
  audience: string[];
  benefits: string[];
  implementation: Array<{ title: string; description: string }>;
  deliverables: string[];
  costFactors: string[];
  procurementNotes: string[];
  whyZescorp: string[];
  internalLinks: Array<{ href: string; label: string }>;
  faqs: FAQItem[];
  primaryCta: string;
  secondaryCta: string;
  consultationCta: string;
  serviceType: string;
  offerAngle: string;
};

const sharedWhyZescorp = [
  "ZESCORP trateaza proiectul ca un ansamblu comercial si tehnic: echipament, spatiu, instalatii, service, mentenanta si documentatie.",
  "Discutia porneste de la nevoia reala a clinicii, nu de la o lista generica de produse. Asta ajuta la pregatirea unei oferte mai clare si mai usor de comparat.",
  "Pentru proiecte de imagistica, radiologie, PACS, laborator sau service, echipa poate structura cererea astfel incat urmatorul pas sa fie o evaluare sau o oferta personalizata.",
  "Nu promitem autorizari, certificari sau rezultate care depind de autoritati ori specialisti externi. ZESCORP poate pregati contextul tehnic si poate coordona etapele comerciale.",
];

const standardFaqs = {
  offer: {
    question: "Pot cere oferta daca nu am toate datele tehnice?",
    answer:
      "Da. Pentru prima discutie sunt suficiente obiectivul proiectului, locatia, tipul de echipament sau serviciu si un termen orientativ. Oferta finala se clarifica dupa datele tehnice disponibile.",
  },
  timeline: {
    question: "Cat dureaza pana primesc o directie comerciala?",
    answer:
      "Pentru solicitari clare, ZESCORP poate pregati rapid o directie preliminara. Timpul pentru oferta finala depinde de complexitate, documente, echipamente si eventualele validari de specialitate.",
  },
  noFakePrice: {
    question: "Se poate estima costul direct de pe pagina?",
    answer:
      "Pagina ofera repere comerciale si factori de cost. Pretul final nu este inventat online si se stabileste dupa configuratie, locatie, cantitate, servicii incluse si disponibilitatea documentelor.",
  },
};

export const seoCommercialLandings: SeoCommercialLanding[] = [
  {
    slug: "service-aparatura-medicala",
    path: "/service-aparatura-medicala",
    title: "Service aparatura medicala",
    metadataTitle: "Service aparatura medicala | Interventii si mentenanta ZESCORP",
    metadataDescription:
      "Service aparatura medicala pentru clinici, spitale si laboratoare: triere tehnica, mentenanta preventiva, interventii, contracte service si oferta personalizata.",
    h1: "Service aparatura medicala pentru clinici, spitale si laboratoare",
    eyebrow: "Service si mentenanta",
    intro:
      "ZESCORP ajuta organizatiile medicale sa transforme problemele tehnice in cereri clare de service, mentenanta sau evaluare. Pagina este construita pentru administratori, responsabili tehnici si proprietari de clinici care au nevoie de suport practic pentru echipamente medicale, fara promisiuni vagi si fara reparatii improvizate.",
    targetKeywords: [
      "service aparatura medicala",
      "mentenanta aparatura medicala",
      "service echipamente medicale",
      "contract service aparatura medicala",
    ],
    audience: [
      "clinici private cu echipamente critice pentru activitatea zilnica",
      "spitale private sau centre medicale regionale care vor continuitate operationala",
      "laboratoare, centre de imagistica si cabinete cu aparatura folosita intens",
      "administratori care vor contracte preventive si un proces clar de raportare",
    ],
    benefits: [
      "reducerea timpului pierdut cu solicitari incomplete si diagnostic neclar",
      "prioritizarea cazurilor in functie de impactul operational si urgenta",
      "posibilitatea de a transforma interventiile reactive in planuri preventive",
      "vizibilitate mai buna asupra echipamentelor critice si a riscurilor de downtime",
      "o ruta comerciala clara: triere, evaluare, oferta si plan de interventie",
      "suport pentru discutii de service multimarca, acolo unde datele tehnice permit",
    ],
    implementation: [
      {
        title: "Triage initial",
        description:
          "Se colecteaza tipul echipamentului, marca, modelul, simptomul, eroarea, locatia, urgenta si impactul asupra activitatii medicale.",
      },
      {
        title: "Clarificare tehnica",
        description:
          "Echipa verifica daca exista fotografii, etichete, manuale, istoric de interventii sau contracte existente care pot ajuta la incadrarea cazului.",
      },
      {
        title: "Prioritizare",
        description:
          "Un aparat oprit intr-o clinica aglomerata este tratat diferit fata de o verificare planificata. Prioritatea trebuie legata de risc si downtime.",
      },
      {
        title: "Oferta sau plan de interventie",
        description:
          "Dupa clarificare, solicitarea poate deveni oferta punctuala, vizita tehnica, contract de mentenanta sau recomandare pentru evaluare suplimentara.",
      },
      {
        title: "Mentenanta preventiva",
        description:
          "Pentru echipamente folosite frecvent, ZESCORP poate propune intervale de verificare, evidenta interventiilor si niveluri de suport.",
      },
      {
        title: "Raportare si urmatorul pas",
        description:
          "Scopul este ca beneficiarul sa stie ce s-a cerut, ce lipseste, ce urmeaza si ce poate fi bugetat.",
      },
    ],
    deliverables: [
      "triage service pentru aparatura medicala",
      "cerere structurata pentru interventie",
      "propunere de contract de mentenanta preventiva",
      "plan de prioritizare pentru echipamente critice",
      "suport pentru service imagistica, laborator, monitorizare si echipamente biomedicale",
      "oferta personalizata pe baza echipamentelor si locatiei",
    ],
    costFactors: [
      "tipul echipamentului, criticitatea si accesul la date tehnice",
      "distanta, urgenta, disponibilitatea pieselor si nivelul de suport cerut",
      "daca solicitarea este interventie unica, abonament preventiv sau contract multi-echipament",
      "costurile pot fi mici pentru triere simpla, medii pentru interventii planificate si mari pentru echipamente critice sau contracte multi-site",
    ],
    procurementNotes: [
      "Pregateste lista de echipamente si prioritatea fiecaruia.",
      "Noteaza simptomele exacte si cand apar.",
      "Evita interventiile interne nesigure si pastreaza codurile de eroare.",
      "Pentru contracte, stabileste ce inseamna timp de raspuns acceptabil.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
      { href: "/service-radiologie-romania", label: "Service radiologie Romania" },
      { href: "/service-ecografe", label: "Service ecografe" },
      { href: "/service-laborator-ivd", label: "Service laborator / IVD" },
      { href: "/contact", label: "Contact ZESCORP" },
    ],
    faqs: [
      standardFaqs.offer,
      standardFaqs.timeline,
      standardFaqs.noFakePrice,
      {
        question: "Ce echipamente pot fi discutate pentru service?",
        answer:
          "Pot fi discutate echipamente de imagistica, monitorizare, laborator, biomedicale, sterilizare sau alte aparate medicale. Preluarea depinde de datele tehnice si de tipul interventiei.",
      },
      {
        question: "Ce date sunt esentiale pentru un caz urgent?",
        answer:
          "Telefonul, orasul, tipul aparatului, modelul, simptomul si nivelul de downtime sunt cele mai importante pentru preluarea initiala.",
      },
      {
        question: "Se poate cere contract de mentenanta pentru mai multe aparate?",
        answer:
          "Da. Un contract poate grupa echipamente dupa criticitate, locatie si tip de suport, dar trebuie definit clar ce intra si ce nu intra in acoperire.",
      },
    ],
    primaryCta: "Solicita service",
    secondaryCta: "Cere oferta de mentenanta",
    consultationCta: "Discuta cu un specialist",
    serviceType: "Service aparatura medicala",
    offerAngle: "service, mentenanta preventiva si suport tehnic pentru echipamente medicale",
  },
  {
    slug: "aparatura-medicala-bucuresti",
    path: "/aparatura-medicala-bucuresti",
    title: "Aparatura medicala Bucuresti",
    metadataTitle: "Aparatura medicala Bucuresti | Echipamente si servicii ZESCORP",
    metadataDescription:
      "Aparatura medicala in Bucuresti pentru clinici si laboratoare: echipamente, instalare, service, mentenanta, consultanta si oferta personalizata ZESCORP.",
    h1: "Aparatura medicala Bucuresti pentru proiecte, dotari si service",
    eyebrow: "Echipamente medicale",
    intro:
      "Pentru Bucuresti si Ilfov, nevoia de aparatura medicala apare de obicei in trei scenarii: deschiderea unei clinici, modernizarea unui spatiu existent sau inlocuirea unui echipament care afecteaza fluxul operational. ZESCORP trateaza achizitia ca parte dintr-un proiect complet: selectie, integrare, instalare, service si mentenanta.",
    targetKeywords: [
      "aparatura medicala Bucuresti",
      "echipamente medicale Bucuresti",
      "dotare clinica Bucuresti",
      "service aparatura medicala Bucuresti",
    ],
    audience: [
      "clinici private din Bucuresti si Ilfov care pregatesc dotari noi",
      "cabinete care inlocuiesc echipamente vechi sau greu de mentinut",
      "laboratoare si centre de diagnostic cu nevoie de aparatura si suport",
      "investitori medicali care vor sa coreleze echipamentele cu infrastructura",
    ],
    benefits: [
      "selectie mai clara intre echipament, aplicatie si buget",
      "reducerea riscului de a cumpara aparatura greu de integrat in spatiu",
      "conectarea achizitiei cu service-ul si mentenanta de dupa livrare",
      "suport pentru configuratii, accesorii si cerinte operationale",
      "cerere de oferta structurata pentru decizie comerciala mai rapida",
      "posibilitatea de a discuta pachete pentru mai multe specialitati",
    ],
    implementation: [
      {
        title: "Definire necesar",
        description:
          "Se stabileste specialitatea, tipul pacientilor, volumul de lucru si rolul echipamentului in fluxul clinic.",
      },
      {
        title: "Alegere categorie",
        description:
          "Echipamentele pot fi pentru imagistica, laborator, monitorizare, sterilizare, mobilier medical sau aparatura biomedicala.",
      },
      {
        title: "Verificare infrastructura",
        description:
          "Pentru echipamente mai complexe, se analizeaza spatiul, alimentarea electrica, datele, ventilatia, accesul si service-ul.",
      },
      {
        title: "Configurare cerere",
        description:
          "Oferta devine mai precisa daca include aplicatie, cantitate, buget, termen, accesorii si nevoie de instalare.",
      },
      {
        title: "Livrare si suport",
        description:
          "Discutia comerciala trebuie sa includa punerea in functiune, instruirea de baza si planul de mentenanta.",
      },
      {
        title: "Post-vanzare",
        description:
          "Achizitia nu se termina la livrare. ZESCORP poate discuta service, consumabile, accesorii si mentenanta preventiva.",
      },
    ],
    deliverables: [
      "oferta personalizata pentru aparatura medicala",
      "selectie orientativa pe categorie si aplicatie",
      "suport pentru echipamente de diagnostic, laborator si monitorizare",
      "integrare cu service si contracte de mentenanta",
      "recomandari pentru instalare si punere in functiune",
      "corelare cu infrastructura medicala existenta",
    ],
    costFactors: [
      "categoria echipamentului si nivelul de performanta cerut",
      "configuratia, accesoriile, cantitatea si termenul de livrare",
      "nevoia de instalare, training, service si mentenanta",
      "pentru proiecte complete, costul include si lucrari de infrastructura, nu doar echipamentul",
    ],
    procurementNotes: [
      "Stabileste aplicatia medicala inainte de a cere pret.",
      "Cere diferentierea intre echipament, accesorii, instalare si mentenanta.",
      "Noteaza termenul de deschidere sau de inlocuire.",
      "Pentru Bucuresti, clarifica accesul, livrarea si conditiile de instalare.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/produse", label: "Catalog produse medicale" },
      { href: "/solutii-medicale/echipamente-imagistica-diagnostic", label: "Echipamente imagistica si diagnostic" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
      { href: "/contact", label: "Solicita oferta" },
    ],
    faqs: [
      standardFaqs.offer,
      standardFaqs.noFakePrice,
      {
        question: "ZESCORP vinde doar aparatura sau si servicii?",
        answer:
          "ZESCORP poate discuta aparatura medicala impreuna cu servicii de instalare, mentenanta, service, infrastructura si suport pentru proiecte medicale.",
      },
      {
        question: "Pot cere oferta pentru o clinica intreaga?",
        answer:
          "Da. Pentru o clinica intreaga este utila o lista pe specialitati, spatii, buget si termen, astfel incat oferta sa fie etapizata.",
      },
      {
        question: "Aparatura medicala este disponibila cu pret online?",
        answer:
          "Nu se inventeaza preturi sau stoc. Pretul se confirma in functie de produs, configuratie, cantitate si conditii comerciale.",
      },
      {
        question: "Se poate discuta si service pentru echipamente existente?",
        answer:
          "Da. Daca exista echipamente deja instalate, solicitarea poate fi orientata catre service, mentenanta sau inlocuire.",
      },
    ],
    primaryCta: "Solicita oferta aparatura",
    secondaryCta: "Trimite lista de echipamente",
    consultationCta: "Cere consultanta de dotare",
    serviceType: "Aparatura medicala Bucuresti",
    offerAngle: "echipamente medicale, dotari, instalare, service si mentenanta pentru Bucuresti si Ilfov",
  },
  {
    slug: "pacs-medical",
    path: "/servicii/pacs-medical",
    title: "PACS medical",
    metadataTitle: "PACS medical | Solutii pentru imagistica si arhivare ZESCORP",
    metadataDescription:
      "PACS medical pentru clinici si centre de imagistica: arhivare imagini, flux DICOM, integrare RIS, acces medici si proiectare infrastructura.",
    h1: "PACS medical pentru clinici, radiologie si centre de imagistica",
    eyebrow: "PACS si imagistica",
    intro:
      "Un PACS medical nu este doar un loc unde se stocheaza imagini. Pentru o clinica de radiologie, PACS-ul devine infrastructura digitala care leaga echipamentele, medicii, arhiva, raportarea si accesul la investigatii. ZESCORP pozitioneaza PACS-ul ca proiect tehnic si operational, nu ca simpla licenta software.",
    targetKeywords: ["PACS medical", "PACS imagistica", "sistem PACS", "PACS radiologie"],
    audience: [
      "centre de imagistica ce opereaza CT, RMN, RX, mamografie sau ecografie",
      "clinici care vor acces rapid la imagini si istoric",
      "spitale private care coordoneaza mai multe puncte de diagnostic",
      "investitori care planifica infrastructura digitala inainte de achizitia echipamentelor",
    ],
    benefits: [
      "centralizarea imaginilor si reducerea cautarii manuale",
      "flux mai clar intre echipament, medic, raport si pacient",
      "posibilitatea de acces controlat pentru medici si colaboratori",
      "pregatire mai buna pentru teleradiologie si diagnostic la distanta",
      "scalare mai usoara cand apar echipamente sau locatii noi",
      "baza mai buna pentru continuitate, backup si politici de arhivare",
    ],
    implementation: [
      {
        title: "Analiza fluxului actual",
        description:
          "Se identifica echipamentele, formatele, utilizatorii, volumul de imagini si modul in care imaginile sunt folosite astazi.",
      },
      {
        title: "Definire arhitectura PACS",
        description:
          "Se clarifica daca sistemul trebuie local, cloud, hibrid, multi-site sau pregatit pentru acces extern controlat.",
      },
      {
        title: "Integrare DICOM/RIS",
        description:
          "Se discuta conexiunea cu modalitatile imagistice, RIS, worklist, raportare si eventuale sisteme existente.",
      },
      {
        title: "Securitate si acces",
        description:
          "Accesul medicilor, drepturile utilizatorilor, auditul si politica de retentie trebuie tratate ca parte din proiect.",
      },
      {
        title: "Migrare si testare",
        description:
          "Daca exista arhiva veche, migrarea trebuie planificata atent pentru a evita pierderi, duplicari sau indisponibilitate.",
      },
      {
        title: "Suport operational",
        description:
          "Dupa pornire, sistemul are nevoie de proceduri clare pentru utilizatori, backup, incidente si extinderi.",
      },
    ],
    deliverables: [
      "evaluare preliminara PACS",
      "cerere structurata pentru furnizor PACS",
      "specificatie functionala pentru flux imagistica",
      "plan de integrare DICOM/RIS",
      "recomandari pentru arhivare, acces si backup",
      "oferta personalizata pentru proiect PACS",
    ],
    costFactors: [
      "numarul de echipamente conectate si volumul anual de imagini",
      "modelul local, cloud sau hibrid si cerintele de stocare",
      "numarul de utilizatori, medici, locatii si nivelul de acces extern",
      "integrarea cu RIS, migrarea arhivei si suportul post-implementare",
    ],
    procurementNotes: [
      "Nu cere doar pret pe licenta; cere flux, integrare, suport si arhivare.",
      "Stabileste volumul estimat de studii si durata de pastrare.",
      "Clarifica cine citeste, cine raporteaza si cine acceseaza extern.",
      "Include backup, securitate si proceduri de incident in cerere.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/servicii/arhivare-pacs", label: "Arhivare PACS" },
      { href: "/servicii/diagnostic-la-distanta", label: "Diagnostic la distanta" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
      { href: "/solutii-medicale/solutii-pacs-ris", label: "PACS / RIS" },
      { href: "/contact", label: "Solicita consultanta PACS" },
    ],
    faqs: [
      standardFaqs.offer,
      {
        question: "Ce inseamna PACS?",
        answer:
          "PACS este sistemul folosit pentru stocarea, administrarea si accesarea imaginilor medicale, de regula in fluxuri DICOM pentru imagistica.",
      },
      {
        question: "PACS si RIS sunt acelasi lucru?",
        answer:
          "Nu. PACS gestioneaza imaginile, iar RIS gestioneaza de obicei programari, fluxuri de radiologie si raportare. In practica, ele trebuie integrate coerent.",
      },
      {
        question: "Se poate conecta PACS la echipamente existente?",
        answer:
          "De regula, da, daca echipamentele si sistemele suporta fluxurile necesare. Este nevoie de verificare tehnica pentru fiecare modalitate.",
      },
      {
        question: "PACS-ul ajuta la diagnostic la distanta?",
        answer:
          "Da, daca este proiectat cu acces securizat, drepturi clare si proceduri pentru medici, raportare si arhivare.",
      },
      standardFaqs.noFakePrice,
    ],
    primaryCta: "Solicita proiect PACS",
    secondaryCta: "Cere oferta personalizata",
    consultationCta: "Discuta integrarea PACS",
    serviceType: "PACS medical",
    offerAngle: "sistem PACS pentru imagistica, arhivare, integrare si acces controlat",
  },
  {
    slug: "arhivare-pacs",
    path: "/servicii/arhivare-pacs",
    title: "Arhivare PACS",
    metadataTitle: "Arhivare PACS | Stocare imagini medicale si flux DICOM",
    metadataDescription:
      "Arhivare PACS pentru clinici si radiologie: stocare imagini medicale, retentie, backup, acces medici, migrare arhiva si oferta personalizata.",
    h1: "Arhivare PACS pentru imagini medicale si continuitate operationala",
    eyebrow: "Arhiva imagistica",
    intro:
      "Arhivarea PACS este componenta care protejeaza istoricul imagistic si sustine accesul rapid la investigatii. Pentru o clinica, arhiva nu trebuie gandita doar ca spatiu de stocare, ci ca infrastructura care influenteaza viteza de lucru, continuitatea, costurile si capacitatea de crestere.",
    targetKeywords: ["arhivare PACS", "arhiva imagini medicale", "stocare DICOM", "PACS imagistica"],
    audience: [
      "clinici de radiologie cu volum mare de investigatii",
      "centre care au arhive vechi greu de accesat",
      "spitale private care vor retentie, backup si acces controlat",
      "retele medicale care pregatesc extinderea fluxului PACS",
    ],
    benefits: [
      "acces mai rapid la istoricul pacientilor si investigatiilor",
      "reducerea riscului de pierdere sau duplicare a imaginilor",
      "baza tehnica pentru teleradiologie si colaborare intre medici",
      "planificare mai buna a stocarii pe termen mediu si lung",
      "posibilitatea de migrare controlata din sisteme vechi",
      "claritate in costuri: stocare, backup, mentenanta si suport",
    ],
    implementation: [
      {
        title: "Inventar arhiva existenta",
        description:
          "Se identifica volumul actual, formatele, sistemele vechi, echipamentele conectate si istoricul care trebuie pastrat.",
      },
      {
        title: "Politica de retentie",
        description:
          "Se clarifica pentru cat timp se pastreaza imaginile si ce nivel de acces este necesar pentru medici si administratori.",
      },
      {
        title: "Stocare si backup",
        description:
          "Se compara scenarii locale, cloud sau hibride, cu accent pe continuitate, cost si timp de recuperare.",
      },
      {
        title: "Migrare controlata",
        description:
          "Daca exista arhiva veche, migrarea se planifica pe loturi si se testeaza pentru integritate si acces.",
      },
      {
        title: "Acces utilizatori",
        description:
          "Medicii, tehnicienii si administratorii au nevoie de drepturi si fluxuri diferite, definite inainte de productie.",
      },
      {
        title: "Suport si scalare",
        description:
          "Arhiva trebuie sa poata creste cu volumul de investigatii, fara sa blocheze fluxul clinic.",
      },
    ],
    deliverables: [
      "audit preliminar arhiva PACS",
      "estimare volum si cerinte de stocare",
      "plan de backup si continuitate",
      "recomandari pentru migrare",
      "specificatie pentru acces medici si utilizatori",
      "oferta pentru arhivare PACS si suport",
    ],
    costFactors: [
      "volumul existent si cresterea lunara/anuala a imaginilor",
      "durata de retentie si nivelul de redundanta",
      "numarul de locatii, utilizatori si echipamente conectate",
      "daca exista migrare din arhiva veche sau integrare cu sisteme multiple",
    ],
    procurementNotes: [
      "Cere estimare de volum, nu doar pret pe luna.",
      "Clarifica cine raspunde de backup si recuperare.",
      "Stabileste ce arhiva veche trebuie migrata.",
      "Include cerinte de acces, audit si securitate.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/servicii/diagnostic-la-distanta", label: "Diagnostic la distanta" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
      { href: "/contact", label: "Solicita oferta arhivare" },
    ],
    faqs: [
      standardFaqs.offer,
      standardFaqs.noFakePrice,
      {
        question: "Arhivarea PACS este acelasi lucru cu backup-ul?",
        answer:
          "Nu. Arhiva gestioneaza accesul si pastrarea imaginilor, iar backup-ul este o masura de protectie si recuperare. Ambele trebuie gandite impreuna.",
      },
      {
        question: "Se pot migra imagini dintr-un sistem vechi?",
        answer:
          "De multe ori da, dar depinde de format, acces, volum si starea arhivei. Migrarea trebuie testata si planificata.",
      },
      {
        question: "Ce informatii trebuie sa trimit pentru evaluare?",
        answer:
          "Ajuta numarul de echipamente, volumul lunar de studii, durata de pastrare, sistemele existente si numarul de utilizatori.",
      },
      {
        question: "Este utila arhivarea pentru clinici mici?",
        answer:
          "Da, daca exista imagistica recurenta si nevoia de acces rapid la istoricul pacientilor sau colaborare cu medici externi.",
      },
    ],
    primaryCta: "Solicita arhivare PACS",
    secondaryCta: "Cere oferta personalizata",
    consultationCta: "Discuta arhiva imagistica",
    serviceType: "Arhivare PACS",
    offerAngle: "arhivare imagini medicale, stocare DICOM, backup si migrare PACS",
  },
  {
    slug: "proiectare-radiologie",
    path: "/servicii/proiectare-radiologie",
    title: "Proiectare radiologie",
    metadataTitle: "Proiectare radiologie | Camera RX, fluxuri si radioprotectie",
    metadataDescription:
      "Proiectare radiologie pentru clinici: camera RX, fluxuri, infrastructura, radioprotectie, documentatie preliminara si oferta personalizata ZESCORP.",
    h1: "Proiectare radiologie pentru camere RX si centre de diagnostic",
    eyebrow: "Radiologie RX",
    intro:
      "Proiectarea radiologiei trebuie sa uneasca echipamentul, camera, fluxul pacientului, instalatiile si radioprotectia. Pentru o clinica, o camera RX planificata gresit inseamna refaceri, intarzieri si costuri greu de controlat. ZESCORP ajuta la structurarea proiectului inainte ca deciziile scumpe sa fie deja blocate.",
    targetKeywords: ["proiectare radiologie", "proiect camera RX", "infrastructura radiologie", "RX room"],
    audience: [
      "clinici care deschid o camera RX noua",
      "centre medicale care modernizeaza radiologia existenta",
      "investitori care evalueaza un spatiu inainte de amenajare",
      "administratori care trebuie sa pregateasca documente si oferte",
    ],
    benefits: [
      "alinierea echipamentului cu planul camerei si vecinatatile",
      "reducerea riscului de lucrari refacute dupa verificari tehnice",
      "claritate asupra radioprotectiei, accesului si zonelor controlate",
      "cerere de oferta mai completa pentru furnizori si executie",
      "posibilitatea de a integra service-ul si mentenanta de la inceput",
      "pregatire mai buna pentru discutii cu specialisti autorizati",
    ],
    implementation: [
      {
        title: "Colectare date",
        description:
          "Se clarifica tipul echipamentului RX, planul camerei, vecinatatile, fluxul pacientilor si stadiul proiectului.",
      },
      {
        title: "Analiza camerei",
        description:
          "Se verifica dimensiuni, acces, pozitionare, instalatii, console, usi, vitraje si zone cu potential impact radiologic.",
      },
      {
        title: "Radioprotectie preliminara",
        description:
          "Se pregateste contextul pentru validare de specialitate, fara a inventa grosimi sau solutii finale.",
      },
      {
        title: "Coordonare echipament",
        description:
          "Fișa tehnica a aparatului si cerintele furnizorului trebuie corelate cu planul si lucrarile.",
      },
      {
        title: "Pregatire ofertare",
        description:
          "Cererea finala separa lucrarile, echipamentul, radioprotectia, documentatia si suportul post-implementare.",
      },
      {
        title: "Implementare controlata",
        description:
          "Executia trebuie sa urmeze date validate, nu presupuneri generale sau solutii standard.",
      },
    ],
    deliverables: [
      "evaluare preliminara camera RX",
      "lista de informatii lipsa pentru ofertare",
      "brief tehnic pentru radioprotectie",
      "recomandari pentru flux si amplasare",
      "cerere structurata pentru oferta de proiectare si lucrari",
      "suport pentru corelare echipament-infrastructura",
    ],
    costFactors: [
      "camera existenta sau constructie noua",
      "tipul echipamentului RX si utilizarea estimata",
      "necesarul de radioprotectie, usi, vitraje si finisaje",
      "documentatia disponibila si nivelul de coordonare cerut",
    ],
    procurementNotes: [
      "Nu cere pret doar pe metru patrat; camera RX depinde de echipament si vecinatati.",
      "Solicita separarea costurilor pentru proiectare, radioprotectie si executie.",
      "Pregateste planul camerei si descrierea spatiilor vecine.",
      "Mentioneaza termenul de deschidere si stadiul CNCAN daca exista.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/proiectare-radiologie", label: "Proiectare radiologie si infrastructura RX" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie si plumbare RX" },
      { href: "/servicii/rx-room-design", label: "RX room design" },
      { href: "/autorizare-cncan-camera-rx", label: "Autorizare CNCAN camera RX" },
      { href: "/contact", label: "Solicita evaluare" },
    ],
    faqs: [
      standardFaqs.offer,
      standardFaqs.noFakePrice,
      {
        question: "Proiectarea radiologiei include autorizarea CNCAN?",
        answer:
          "Nu se promite autorizare. ZESCORP poate pregati contextul tehnic si cererea, iar validarile si procedurile trebuie realizate cu specialisti autorizati.",
      },
      {
        question: "Este obligatoriu planul camerei?",
        answer:
          "Pentru oferta serioasa, da. Se poate incepe orientativ fara plan, dar planul cu dimensiuni si vecinatati devine esential.",
      },
      {
        question: "Pot moderniza o camera RX existenta?",
        answer:
          "Da, dar trebuie verificat ce se pastreaza, ce se schimba si daca solutia existenta mai corespunde echipamentului si fluxului nou.",
      },
      {
        question: "Care este cel mai bun moment pentru discutie?",
        answer:
          "Inainte de a cumpara echipamentul sau de a incepe lucrarile, cand inca pot fi ajustate layout-ul si bugetul.",
      },
    ],
    primaryCta: "Solicita proiectare radiologie",
    secondaryCta: "Cere oferta preliminara",
    consultationCta: "Discuta cu ZESCORP",
    serviceType: "Proiectare radiologie",
    offerAngle: "camera RX, radioprotectie, fluxuri, infrastructura si documentatie preliminara",
  },
  {
    slug: "cusca-faraday-rmn",
    path: "/servicii/cusca-faraday-rmn",
    title: "Cusca Faraday RMN",
    metadataTitle: "Cusca Faraday RMN | RF shielding pentru camere RMN",
    metadataDescription:
      "Cusca Faraday pentru RMN si RF shielding: proiectare preliminara, camera RMN, usi RF, penetrari, integrare si oferta personalizata ZESCORP.",
    h1: "Cusca Faraday RMN si RF shielding pentru camere de rezonanta magnetica",
    eyebrow: "RF shielding RMN",
    intro:
      "Cusca Faraday pentru RMN este una dintre cele mai sensibile componente ale unei camere de rezonanta magnetica. Daca ecranarea RF, usile, filtrele si penetrarile nu sunt tratate ca sistem, camera poate genera probleme de imagine, interferente sau costuri de remediere. ZESCORP pozitioneaza RF shielding-ul ca proiect de infrastructura, nu ca accesoriu comandat separat.",
    targetKeywords: ["cusca faraday RMN", "RF shielding RMN", "camera Faraday RMN", "ecranare RF"],
    audience: [
      "clinici care planifica instalarea unui RMN",
      "centre care modernizeaza sau relocheaza un aparat RMN",
      "investitori care compara costul camerei RMN cu costul echipamentului",
      "echipe tehnice care au nevoie de claritate privind RF shielding",
    ],
    benefits: [
      "separarea corecta intre RF shielding si radioprotectie",
      "reducerea riscului de interferente si refaceri scumpe",
      "coordonarea usilor RF, penetrarilor, filtrelor si HVAC",
      "pregatirea camerei pentru cerintele furnizorului RMN",
      "estimare comerciala mai clara pentru lucrari si integrare",
      "suport pentru extinderi, relocari sau verificari de infrastructura",
    ],
    implementation: [
      {
        title: "Definire echipament",
        description:
          "Modelul RMN, cerintele furnizorului si traseele de instalare influenteaza solutia de RF shielding.",
      },
      {
        title: "Analiza spatiu",
        description:
          "Camera, vecinatatile, vibratiile, accesul, HVAC-ul si traseele tehnice trebuie analizate impreuna.",
      },
      {
        title: "Concept RF",
        description:
          "Se clarifica peretii, tavanul, pardoseala, usa RF, filtrele, waveguides si penetrarile necesare.",
      },
      {
        title: "Integrare cu proiectul",
        description:
          "Cusca Faraday trebuie integrata cu constructia, finisajele, instalatiile si planul de service.",
      },
      {
        title: "Testare si validare",
        description:
          "Testele si acceptanta se planifica in functie de cerintele tehnice si de furnizorul RMN.",
      },
      {
        title: "Suport post-instalare",
        description:
          "Dupa instalare, camera poate necesita verificari, ajustari si mentenanta a elementelor RF.",
      },
    ],
    deliverables: [
      "evaluare preliminara cusca Faraday RMN",
      "brief tehnic pentru RF shielding",
      "lista de clarificari pentru furnizorul RMN",
      "scenariu de integrare cu HVAC si instalatii",
      "cerere structurata pentru oferta RF",
      "suport pentru modernizare sau relocare RMN",
    ],
    costFactors: [
      "dimensiunea camerei si configuratia ecranarii RF",
      "tipul usii RF, penetrarile, filtrele si elementele speciale",
      "gradul de integrare cu HVAC, finisaje si lucrari existente",
      "daca proiectul este nou, modernizare sau remediere dupa o problema",
    ],
    procurementNotes: [
      "Nu confunda cusca Faraday cu placarea cu plumb.",
      "Cere oferta dupa ce ai modelul RMN sau cerintele furnizorului.",
      "Include in discutie usa RF, filtrele, penetrarile si testarea.",
      "Verifica daca spatiul permite accesul si service-ul echipamentului.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/services/rf-shielding", label: "RF shielding" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
      { href: "/solutii-medicale/camere-rmn", label: "Camere RMN" },
      { href: "/amenajare-centre-imagistica", label: "Amenajare centre imagistica" },
      { href: "/contact", label: "Solicita oferta RF" },
    ],
    faqs: [
      standardFaqs.offer,
      standardFaqs.noFakePrice,
      {
        question: "Cusca Faraday RMN este acelasi lucru cu radioprotectia?",
        answer:
          "Nu. RMN nu foloseste radiatie ionizanta ca RX/CT. Cusca Faraday se refera la ecranarea RF si compatibilitatea electromagnetica.",
      },
      {
        question: "Pot cere oferta fara modelul exact de RMN?",
        answer:
          "Se poate discuta orientativ, dar oferta serioasa cere modelul sau cerintele furnizorului, dimensiunile camerei si planul tehnic.",
      },
      {
        question: "Ce elemente intra intr-un proiect RF?",
        answer:
          "De regula se discuta panouri/ecranare, usa RF, filtre, penetrari, waveguides, integrare cu HVAC si testare.",
      },
      {
        question: "Cand trebuie discutat RF shielding-ul?",
        answer:
          "Cat mai devreme, inainte de lucrari si finisaje, pentru ca modificarile tarzii pot fi costisitoare.",
      },
    ],
    primaryCta: "Solicita oferta cusca Faraday",
    secondaryCta: "Cere evaluare RMN",
    consultationCta: "Discuta cu un consultant",
    serviceType: "Cusca Faraday RMN",
    offerAngle: "RF shielding, camera RMN, usa RF, penetrari si integrare tehnica",
  },
  {
    slug: "infrastructura-imagistica",
    path: "/servicii/infrastructura-imagistica",
    title: "Infrastructura imagistica",
    metadataTitle: "Infrastructura imagistica medicala | CT, RMN, RX, PACS",
    metadataDescription:
      "Infrastructura imagistica medicala pentru CT, RMN, RX, PACS si clinici: spatiu, utilitati, radioprotectie, RF shielding si ofertare.",
    h1: "Infrastructura imagistica medicala pentru CT, RMN, RX si PACS",
    eyebrow: "Imagistica medicala",
    intro:
      "Infrastructura imagistica este partea care decide daca echipamentele scumpe pot fi instalate, operate si mentinute fara blocaje. O camera CT, un RMN, o radiologie digitala sau un PACS nu functioneaza izolat. Ele depind de spatiu, electric, HVAC, radioprotectie, RF shielding, date, acces service si procese operationale.",
    targetKeywords: ["infrastructura imagistica", "infrastructura imagistica medicala", "camera CT RMN RX", "PACS imagistica"],
    audience: [
      "centre de imagistica la inceput de proiect",
      "clinici care extind radiologia sau adauga CT/RMN",
      "spitale private care modernizeaza fluxurile de diagnostic",
      "investitori care vor sa evalueze fezabilitatea unui spatiu",
    ],
    benefits: [
      "decizii mai bune inainte de achizitia echipamentului",
      "reducerea riscului de blocaj la instalare",
      "corelarea camerelor fizice cu infrastructura digitala",
      "claritate asupra costurilor ascunse din utilitati si lucrari",
      "pregatire pentru service, mentenanta si extindere",
      "cerere de oferta mai completa pentru furnizori si executanti",
    ],
    implementation: [
      {
        title: "Analiza obiectiv",
        description:
          "Se clarifica daca proiectul include CT, RMN, RX, ecografie, PACS, laborator sau combinatie de servicii.",
      },
      {
        title: "Evaluare spatiu",
        description:
          "Se verifica suprafata, accesul, vecinatatile, fluxurile si zonele tehnice care pot afecta instalarea.",
      },
      {
        title: "Utilitati critice",
        description:
          "Electricul, HVAC-ul, datele, racirea, UPS-ul si traseele de service trebuie validate inainte de executie.",
      },
      {
        title: "Protectii specializate",
        description:
          "Radioprotectia pentru RX/CT si RF shielding pentru RMN se trateaza separat si se valideaza pe date reale.",
      },
      {
        title: "Integrare digitala",
        description:
          "PACS, RIS, arhivarea si diagnosticarea la distanta sunt parte din infrastructura, nu adaugiri tarzii.",
      },
      {
        title: "Ofertare etapizata",
        description:
          "Proiectul trebuie impartit in pachete clare: spatiu, lucrari, echipamente, software, service si mentenanta.",
      },
    ],
    deliverables: [
      "evaluare preliminara infrastructura imagistica",
      "lista de riscuri tehnice si comerciale",
      "brief pentru CT/RMN/RX/PACS",
      "recomandari pentru utilitati si fluxuri",
      "cerere de oferta structurata",
      "plan de fazare pentru implementare",
    ],
    costFactors: [
      "numarul si tipul modalitatilor imagistice",
      "starea spatiului existent si nivelul lucrarilor necesare",
      "radioprotectia, RF shielding-ul, electricul, HVAC-ul si datele",
      "software-ul PACS/RIS, service-ul si mentenanta dupa instalare",
    ],
    procurementNotes: [
      "Nu separa echipamentul de camera si utilitati.",
      "Solicita deviz pe pachete, nu o suma globala neclara.",
      "Include costurile de service si mentenanta in analiza.",
      "Cere validare pentru accesul echipamentelor in cladire.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/amenajare-centre-imagistica", label: "Amenajare centre imagistica" },
      { href: "/servicii/proiectare-radiologie", label: "Proiectare radiologie" },
      { href: "/servicii/cusca-faraday-rmn", label: "Cusca Faraday RMN" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/contact", label: "Solicita evaluare infrastructura" },
    ],
    faqs: [
      standardFaqs.offer,
      standardFaqs.noFakePrice,
      {
        question: "Ce intra in infrastructura de imagistica?",
        answer:
          "Spatiul, accesul, electricul, HVAC-ul, datele, radioprotectia, RF shielding-ul, integrarea digitala si service-ul de dupa instalare.",
      },
      {
        question: "Cand trebuie evaluata infrastructura?",
        answer:
          "Inainte de achizitia finala sau de inceperea lucrarilor, pentru ca echipamentul poate schimba cerintele tehnice.",
      },
      {
        question: "Este suficient furnizorul aparatului?",
        answer:
          "Furnizorul aparatului este esential, dar infrastructura locala, lucrarile, fluxurile si mentenanta trebuie coordonate separat.",
      },
      {
        question: "Poate ZESCORP ajuta la proiecte mixte CT/RMN/RX?",
        answer:
          "Da, prin structurarea cererii, evaluarea preliminara si coordonarea serviciilor relevante pentru fiecare tip de camera.",
      },
    ],
    primaryCta: "Solicita evaluare infrastructura",
    secondaryCta: "Cere oferta personalizata",
    consultationCta: "Discuta proiectul",
    serviceType: "Infrastructura imagistica",
    offerAngle: "infrastructura pentru CT, RMN, RX, PACS, utilitati si servicii conexe",
  },
  {
    slug: "diagnostic-la-distanta",
    path: "/servicii/diagnostic-la-distanta",
    title: "Diagnostic la distanta",
    metadataTitle: "Diagnostic la distanta | Teleradiologie, PACS si flux imagistica",
    metadataDescription:
      "Diagnostic la distanta pentru imagistica: PACS, acces medici, flux teleradiologie, arhivare, securitate si proiectare operationala.",
    h1: "Diagnostic la distanta pentru imagistica si fluxuri medicale digitale",
    eyebrow: "Teleradiologie",
    intro:
      "Diagnosticarea la distanta devine relevanta cand o clinica vrea sa foloseasca medici colaboratori, sa accelereze raportarea sau sa conecteze mai multe locatii. Nu este suficient sa trimiti imagini printr-un canal improvizat. Este nevoie de PACS, arhivare, acces controlat, proceduri si o infrastructura digitala coerenta.",
    targetKeywords: ["diagnostic la distanta", "proiectare diagnostic la distanta", "teleradiologie", "PACS imagistica"],
    audience: [
      "centre de imagistica ce lucreaza cu medici colaboratori",
      "clinici regionale care vor raportare mai rapida",
      "retele medicale cu mai multe puncte de diagnostic",
      "spitale private care vor acces organizat la imagini si rapoarte",
    ],
    benefits: [
      "acces mai bun la medici specialisti si colaboratori",
      "flux mai clar pentru imagini, rapoarte si arhivare",
      "reducerea transferurilor manuale si a riscului de erori",
      "pregatire pentru crestere multi-site",
      "control mai bun asupra drepturilor de acces si istoricului",
      "baza tehnica pentru servicii comerciale mai rapide",
    ],
    implementation: [
      {
        title: "Definire scenariu",
        description:
          "Se clarifica ce investigatii se raporteaza la distanta, cine raporteaza, ce timp de raspuns se doreste si ce sisteme exista.",
      },
      {
        title: "PACS si arhivare",
        description:
          "Imaginile trebuie sa fie disponibile in sistem, cu retentie si acces potrivit pentru utilizatori.",
      },
      {
        title: "Acces securizat",
        description:
          "Medicii trebuie sa acceseze imaginile prin flux controlat, nu prin metode improvizate sau greu de auditat.",
      },
      {
        title: "Raportare si integrare",
        description:
          "Raportul trebuie legat de pacient, investigatie si arhiva, cu flux clar intre clinica si medic.",
      },
      {
        title: "Proceduri operationale",
        description:
          "Se definesc responsabilitati, escaladari, timp de raspuns si mod de lucru pentru cazuri urgente.",
      },
      {
        title: "Suport si imbunatatire",
        description:
          "Dupa lansare se urmaresc blocajele, calitatea fluxului si volumul de cazuri.",
      },
    ],
    deliverables: [
      "evaluare flux diagnostic la distanta",
      "specificatie pentru PACS si acces medici",
      "recomandari pentru arhivare si raportare",
      "lista de riscuri operationale",
      "plan de implementare si testare",
      "oferta personalizata pentru infrastructura digitala",
    ],
    costFactors: [
      "numarul de medici, utilizatori si locatii",
      "volumul de investigatii si viteza de raportare dorita",
      "sistemele existente si nivelul de integrare necesar",
      "cerintele de arhivare, securitate, suport si training",
    ],
    procurementNotes: [
      "Stabileste cine raporteaza si in ce timp.",
      "Nu separa teleradiologia de PACS si arhivare.",
      "Clarifica drepturile de acces si responsabilitatile.",
      "Include proceduri pentru cazuri urgente si incidente tehnice.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/servicii/arhivare-pacs", label: "Arhivare PACS" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
      { href: "/amenajare-centre-imagistica", label: "Amenajare centre imagistica" },
      { href: "/contact", label: "Solicita consultanta" },
    ],
    faqs: [
      standardFaqs.offer,
      {
        question: "Diagnostic la distanta inseamna doar trimiterea imaginilor?",
        answer:
          "Nu. Un flux serios include PACS, acces controlat, arhivare, raportare, proceduri si responsabilitati clare.",
      },
      {
        question: "Este nevoie de PACS pentru diagnostic la distanta?",
        answer:
          "In practica, PACS-ul sau o infrastructura echivalenta este baza pentru acces organizat la imagini si istoric.",
      },
      {
        question: "Ce trebuie stabilit inainte de implementare?",
        answer:
          "Modalitatile imagistice, medicii, utilizatorii, timpii de raspuns, sistemele existente si politica de arhivare.",
      },
      {
        question: "Poate fi implementat pentru o singura clinica?",
        answer:
          "Da. Chiar si o singura clinica poate avea nevoie de colaboratori externi sau raportare la distanta.",
      },
      standardFaqs.noFakePrice,
    ],
    primaryCta: "Solicita proiect diagnostic la distanta",
    secondaryCta: "Cere oferta PACS",
    consultationCta: "Discuta fluxul digital",
    serviceType: "Diagnostic la distanta",
    offerAngle: "teleradiologie, PACS, arhivare si acces controlat pentru medici",
  },
  {
    slug: "cbct",
    path: "/produse/cbct",
    title: "CBCT pentru stomatologie si imagistica dentara",
    metadataTitle: "CBCT | Echipamente imagistica dentara si oferta ZESCORP",
    metadataDescription:
      "CBCT pentru clinici dentare si maxilo-faciale: selectie echipament, camera, radioprotectie, instalare, service si oferta personalizata.",
    h1: "CBCT pentru clinici dentare, chirurgie si imagistica maxilo-faciala",
    eyebrow: "Echipamente CBCT",
    intro:
      "CBCT-ul este o achizitie cu impact comercial direct pentru clinici dentare, implantologie, ortodontie si chirurgie maxilo-faciala. Alegerea aparatului nu trebuie separata de spatiu, radioprotectie, fluxul pacientului, software, service si mentenanta. ZESCORP trateaza CBCT-ul ca produs si proiect, nu ca simplu aparat pus in camera.",
    targetKeywords: ["CBCT", "aparat CBCT", "CBCT stomatologie", "imagistica dentara CBCT"],
    audience: [
      "clinici dentare mari care vor imagistica interna",
      "centre de chirurgie maxilo-faciala sau implantologie",
      "investitori care extind serviciile cu diagnostic 3D",
      "cabinete care vor sa reduca trimiterea pacientilor catre centre externe",
    ],
    benefits: [
      "control mai bun asupra fluxului de diagnostic si planificare",
      "posibilitate de servicii imagistice interne pentru pacienti",
      "integrare cu tratamente de implantologie, ortodontie si chirurgie",
      "selectie mai corecta intre FOV, aplicatie si buget",
      "pregatire pentru radioprotectie si instalare inainte de achizitie",
      "service si mentenanta gandite din etapa de cumparare",
    ],
    implementation: [
      {
        title: "Definire aplicatie",
        description:
          "Se stabileste daca aparatul este pentru implantologie, ortodontie, chirurgie, endodontie, radiologie dentara sau utilizare mixta.",
      },
      {
        title: "Selectie configuratie",
        description:
          "FOV-ul, rezolutia, software-ul, fluxul de lucru si accesoriile influenteaza valoarea comerciala a aparatului.",
      },
      {
        title: "Verificare spatiu",
        description:
          "Camera trebuie analizata pentru acces, alimentare, flux pacienti si radioprotectie.",
      },
      {
        title: "Radioprotectie",
        description:
          "Soluția finala depinde de aparat, plan, vecinatati si validare de specialitate.",
      },
      {
        title: "Instalare si training",
        description:
          "Achizitia trebuie sa includa punere in functiune, instruire si clarificarea responsabilitatilor de suport.",
      },
      {
        title: "Service si mentenanta",
        description:
          "CBCT-ul trebuie inclus intr-un plan de service pentru continuitate si protejarea investitiei.",
      },
    ],
    deliverables: [
      "cerere structurata pentru oferta CBCT",
      "recomandare de selectie pe aplicatie",
      "evaluare preliminara spatiu si radioprotectie",
      "oferta pentru echipament si servicii conexe",
      "plan de instalare si suport",
      "optiuni de service si mentenanta",
    ],
    costFactors: [
      "FOV, software, aplicatie clinica si nivel de performanta",
      "radioprotectia camerei si lucrarile necesare",
      "instalarea, trainingul, service-ul si mentenanta",
      "daca se achizitioneaza un singur aparat sau un pachet de dotare clinica",
    ],
    procurementNotes: [
      "Nu compara CBCT-urile doar dupa pret.",
      "Stabileste aplicatia principala si volumul estimat de pacienti.",
      "Include radioprotectia si service-ul in buget.",
      "Cere clarificari despre software, training si suport.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/aparatura-medicala-bucuresti", label: "Aparatura medicala Bucuresti" },
      { href: "/servicii/rx-room-design", label: "RX room design" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie RX" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/contact", label: "Solicita oferta CBCT" },
    ],
    faqs: [
      standardFaqs.offer,
      standardFaqs.noFakePrice,
      {
        question: "Ce trebuie sa stiu inainte sa cer oferta pentru CBCT?",
        answer:
          "Aplicatia clinica, spatiul disponibil, bugetul orientativ, termenul de instalare si daca radioprotectia este deja clarificata.",
      },
      {
        question: "CBCT necesita radioprotectie?",
        answer:
          "Da, in functie de aparat, camera si utilizare. Solutia se valideaza cu specialisti competenti si date reale de proiect.",
      },
      {
        question: "Se poate include si service in oferta?",
        answer:
          "Da. Este recomandat sa discuti service-ul si mentenanta inainte de achizitie, nu dupa ce apar probleme.",
      },
      {
        question: "Este CBCT potrivit pentru orice cabinet dentar?",
        answer:
          "Nu neaparat. Decizia depinde de volumul de cazuri, specialitati, buget, spatiu si capacitatea de operare.",
      },
    ],
    primaryCta: "Solicita oferta CBCT",
    secondaryCta: "Cere evaluare camera",
    consultationCta: "Discuta configuratia",
    serviceType: "CBCT",
    offerAngle: "echipament CBCT, camera, radioprotectie, instalare si service",
  },
  {
    slug: "rx-room-design",
    path: "/servicii/rx-room-design",
    title: "RX room design",
    metadataTitle: "RX room design | Proiectare camera RX si radioprotectie",
    metadataDescription:
      "RX room design pentru clinici: camera RX, fluxuri, radioprotectie, echipament, utilitati, oferta personalizata si consultanta ZESCORP.",
    h1: "RX room design pentru camere de radiologie functionale si ofertabile",
    eyebrow: "Camera RX",
    intro:
      "RX room design inseamna mai mult decat desenarea unei camere cu un aparat in mijloc. Pentru o clinica, camera RX trebuie sa fie proiectata pentru pacient, personal, echipament, radioprotectie, service si documentatie. ZESCORP ajuta la transformarea intentiei intr-un brief tehnic-comercial care poate fi ofertat si validat.",
    targetKeywords: ["RX room", "RX room design", "camera RX", "proiect camera radiologie"],
    audience: [
      "clinici care vor camera RX noua",
      "spatii existente care trebuie convertite in radiologie",
      "centre medicale care modernizeaza radiologia conventionala",
      "investitori care cauta o directie tehnica inainte de oferta",
    ],
    benefits: [
      "camera gandita pentru flux real, nu doar pentru desen",
      "radioprotectie luata in calcul din faza de concept",
      "cerere de oferta mai usor de inteles pentru executanti",
      "integrarea aparaturii cu electricul, accesul si finisajele",
      "reducerea riscului de erori inainte de validarea finala",
      "posibilitatea de a discuta costuri pe componente clare",
    ],
    implementation: [
      {
        title: "Brief comercial",
        description:
          "Se stabileste ce tip de radiologie se doreste, ce pacienti deserveste si ce rezultat comercial se asteapta.",
      },
      {
        title: "Plan si vecinatati",
        description:
          "Camera RX se analizeaza impreuna cu spatiile din jur, traseele pacientilor si zonele personalului.",
      },
      {
        title: "Echipament si consola",
        description:
          "Pozitionarea aparatului, consolei, usii si vitrajului influenteaza fluxul si radioprotectia.",
      },
      {
        title: "Radioprotectie",
        description:
          "Nu se folosesc grosimi inventate. Solutia finala trebuie validata pe datele echipamentului si spatiului.",
      },
      {
        title: "Utilitati si finisaje",
        description:
          "Electricul, datele, HVAC-ul, pardoseala si accesul pentru service trebuie corelate cu echipamentul.",
      },
      {
        title: "Oferta si implementare",
        description:
          "Dupa clarificare, proiectul poate fi impartit in echipament, lucrari, radioprotectie, instalare si suport.",
      },
    ],
    deliverables: [
      "brief RX room design",
      "evaluare preliminara plan camera",
      "lista de cerinte pentru radioprotectie",
      "recomandari pentru flux si amplasare",
      "cerere de oferta pentru lucrari si echipamente",
      "suport pentru instalare, service si mentenanta",
    ],
    costFactors: [
      "starea spatiului si nivelul de conversie necesar",
      "tipul echipamentului RX si accesoriile",
      "radioprotectia, usa, vitrajul si finisajele",
      "instalarea, documentatia, service-ul si mentenanta",
    ],
    procurementNotes: [
      "Cere separat costul echipamentului si costul camerei.",
      "Nu incepe finisajele inainte de clarificarea radioprotectiei.",
      "Pregateste planul si vecinatatile.",
      "Include service-ul in discutia comerciala initiala.",
    ],
    whyZescorp: sharedWhyZescorp,
    internalLinks: [
      { href: "/servicii/proiectare-radiologie", label: "Proiectare radiologie" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie si plumbare RX" },
      { href: "/autorizare-cncan-camera-rx", label: "Autorizare CNCAN camera RX" },
      { href: "/produse/cbct", label: "CBCT" },
      { href: "/contact", label: "Solicita RX room design" },
    ],
    faqs: [
      standardFaqs.offer,
      standardFaqs.noFakePrice,
      {
        question: "Ce inseamna RX room design?",
        answer:
          "Inseamna planificarea camerei RX in raport cu echipamentul, fluxurile, radioprotectia, utilitatile si cerintele de implementare.",
      },
      {
        question: "Pot folosi o camera existenta?",
        answer:
          "Da, dar trebuie verificata pentru dimensiuni, acces, vecinatati, utilitati si radioprotectie.",
      },
      {
        question: "Cand primesc o oferta finala?",
        answer:
          "Dupa clarificarea planului, echipamentului si cerintelor tehnice. Oferta preliminara poate fi pregatita mai devreme, cu ipoteze clare.",
      },
      {
        question: "RX room design include CBCT?",
        answer:
          "Poate include si CBCT sau radiologie dentara, dar cerintele trebuie analizate in functie de aparatul ales si utilizare.",
      },
    ],
    primaryCta: "Solicita RX room design",
    secondaryCta: "Cere oferta camera RX",
    consultationCta: "Discuta proiectul RX",
    serviceType: "RX room design",
    offerAngle: "camera RX, proiectare, radioprotectie, echipament si suport operational",
  },
];

export function getSeoCommercialLandingByPath(path: string) {
  return seoCommercialLandings.find((page) => page.path === path);
}

export function getSeoCommercialLandingBySlug(slug: string) {
  return seoCommercialLandings.find((page) => page.slug === slug);
}
