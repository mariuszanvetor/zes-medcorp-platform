import type { SeoCommercialLanding } from "@/data/seo-commercial-landings";

type RadioprotectionRfSpec = {
  slug: string;
  path: string;
  title: string;
  metadataTitle: string;
  metadataDescription: string;
  h1: string;
  eyebrow: string;
  keyword: string;
  secondaryKeywords: string[];
  projectType: string;
  buyer: string;
  technicalFocus: string;
  complianceFocus: string;
  budgetFocus: string;
  timelineFocus: string;
  riskFocus: string;
  documentationFocus: string;
  links: Array<{ href: string; label: string }>;
};

const sharedWhyZescorp = [
  "ZESCORP trateaza radioprotectia si ecranarea ca parte din proiectul medical complet: spatiu, echipament, documentatie, executie, service si mentenanta.",
  "Pentru camere RX, CT, mamografie sau RMN, discutia comerciala este corelata cu fluxul operational, utilitatile, accesul pentru echipament si riscurile de implementare.",
  "ZESCORP poate pregati o cerere clara pentru oferta, cu date tehnice, prioritati si documente utile pentru validarea de specialitate.",
  "Nu promitem autorizari finale si nu inlocuim specialistii autorizati. Sprijinul este preliminar, comercial si tehnic, cu accent pe pregatirea corecta a proiectului.",
];

const sharedInternalLinks = [
  { href: "/servicii/proiectare-radiologie", label: "Proiectare radiologie" },
  { href: "/servicii/service-radiologie", label: "Service radiologie" },
  { href: "/servicii/mentenanta-echipamente-medicale", label: "Mentenanta echipamente medicale" },
  { href: "/servicii/pacs-medical", label: "PACS medical" },
  { href: "/contact", label: "Contact ZESCORP" },
];

function buildRadioprotectionLanding(spec: RadioprotectionRfSpec): SeoCommercialLanding {
  return {
    slug: spec.slug,
    path: spec.path,
    title: spec.title,
    metadataTitle: spec.metadataTitle,
    metadataDescription: spec.metadataDescription,
    h1: spec.h1,
    eyebrow: spec.eyebrow,
    intro: `${spec.projectType} este o decizie tehnica si comerciala importanta pentru orice clinica, centru de imagistica sau spital care pregateste un spatiu medical cu risc radiologic ori electromagnetic. Pentru ${spec.buyer}, proiectul trebuie sa fie clar inainte de executie: ce echipament se instaleaza, ce spatiu exista, ce vecinatati sunt relevante, ce documente lipsesc, ce buget este realist si ce validari sunt necesare inainte de ofertarea finala. ZESCORP ajuta beneficiarul sa transforme o intentie generala intr-o cerere de evaluare si oferta care poate fi discutata cu echipa tehnica, achizitii si management.`,
    targetKeywords: [spec.keyword, ...spec.secondaryKeywords],
    audience: [
      `${spec.buyer} care pregatesc investitii in imagistica, radiologie sau spatii medicale tehnice.`,
      "proprietari de clinici care vor sa evite lucrari refacute, intarzieri si costuri aparute dupa inceperea santierului.",
      "manageri de proiect, arhitecti si echipe de achizitii care trebuie sa coreleze echipamentul cu spatiul, documentatia si bugetul.",
      "centre medicale care modernizeaza camere existente si au nevoie de o ruta clara pentru oferta, executie si suport.",
    ],
    benefits: [
      "clarificarea timpurie a riscurilor tehnice inainte de achizitie sau executie",
      "reducerea probabilitatii de costuri suplimentare generate de planuri incomplete",
      "corelarea echipamentului cu radioprotectia, utilitatile, accesul si fluxul operational",
      "pregatirea unei cereri de oferta care poate fi analizata de management si achizitii",
      "separarea costurilor de lucrari, documentatie, echipament, service si mentenanta",
      "sprijin pentru decizii comerciale realiste, fara promisiuni nevalidate sau preturi inventate",
    ],
    implementation: [
      {
        title: "Discutie initiala si obiectiv",
        description: `Se clarifica tipul proiectului, echipamentul, locatia, termenul si rolul spatiului in activitatea medicala. ${spec.technicalFocus}`,
      },
      {
        title: "Plan, vecinatati si flux",
        description:
          "Planul camerei, peretii, accesul, usa, vitrajele, traseele pacientilor si vecinatatile sunt esentiale pentru o evaluare preliminara coerenta.",
      },
      {
        title: "Documentatie si validari",
        description: `${spec.documentationFocus}. Informatiile sunt pregatite pentru discutii de specialitate, fara a transforma pagina intr-o promisiune de autorizare.`,
      },
      {
        title: "Buget preliminar",
        description: `${spec.budgetFocus}. Costul final depinde de masuratori, materiale, executie, documente si configuratia echipamentului.`,
      },
      {
        title: "Oferta si responsabilitati",
        description:
          "Oferta trebuie sa diferentieze clar proiectarea, materialele, manopera, elementele speciale, suportul tehnic si ceea ce ramane conditionat de verificari.",
      },
      {
        title: "Implementare si suport",
        description: `${spec.timelineFocus}. Dupa clarificare, proiectul poate fi etapizat pentru executie, receptie, punere in functiune si mentenanta.`,
      },
    ],
    deliverables: [
      `brief tehnic si comercial pentru ${spec.projectType.toLowerCase()}`,
      "lista de date necesare pentru evaluare preliminara",
      "analiza planului camerei, daca exista schita sau desen disponibil",
      "clarificare de buget, termen, documente si riscuri de implementare",
      "recomandari pentru servicii asociate: service, mentenanta, PACS, instalare si suport",
      "cerere de oferta structurata pentru echipa ZESCORP",
    ],
    costFactors: [
      "dimensiunea spatiului, forma camerei si vecinatatile relevante",
      "tipul echipamentului, energia sau cerintele tehnice ale acestuia",
      "nivelul de interventie: spatiu existent, modernizare sau proiect nou",
      "materialele, usa, vitrajele, finisajele, utilitatile si accesul pentru service",
      "documentatia disponibila si validarea de specialitate necesara",
      "termenul cerut si gradul de urgenta al proiectului",
    ],
    procurementNotes: [
      "Pregateste planul sau schita camerei, chiar daca este preliminara.",
      "Noteaza tipul echipamentului si modelul, daca a fost deja selectat.",
      "Clarifica daca spatiul este existent sau construit de la zero.",
      "Include bugetul orientativ, termenul si statusul documentatiei.",
      "Nu compara ofertele doar dupa pret; verifica ce include fiecare responsabilitate.",
    ],
    whyZESCORP: sharedWhyZescorp,
    internalLinks: [...spec.links, ...sharedInternalLinks].filter(
      (link, index, links) => links.findIndex((item) => item.href === link.href) === index,
    ),
    faqs: [
      {
        question: `Cand merita ceruta oferta pentru ${spec.projectType.toLowerCase()}?`,
        answer:
          "Merita ceruta oferta imediat ce exista o locatie, un tip de echipament sau un termen de implementare. Oferta preliminara poate porni cu date incomplete, dar oferta finala depinde de documente si validari.",
      },
      {
        question: "Este suficienta o schita simpla a camerei?",
        answer:
          "Pentru discutia initiala, da. Pentru calcul, executie si validari, pot fi necesare planuri, vecinatati, detalii constructive si informatii despre echipament.",
      },
      {
        question: "ZESCORP poate garanta autorizarea CNCAN?",
        answer:
          "Nu. Autorizarea si deciziile finale tin de cadrul legal si specialistii autorizati. ZESCORP poate ajuta la pregatirea preliminara a informatiilor si la structurarea proiectului.",
      },
      {
        question: "Ce influenteaza cel mai mult costul?",
        answer:
          "Dimensiunea camerei, tipul echipamentului, vecinatatile, materialele speciale, usa, vitrajul, utilitatile, finisajele si documentatia influenteaza costul.",
      },
      {
        question: "Se poate lucra pe spatiu existent?",
        answer:
          "Da, dar spatiul existent trebuie evaluat cu atentie. Uneori conversia este simpla, alteori apar limitari de acces, structura, instalatii sau vecinatati.",
      },
      {
        question: "Cum ajuta ZES in prima etapa?",
        answer:
          "ZES poate colecta datele minime: tip proiect, oras, plan disponibil, termen, buget, status documente si contact. Cererea devine apoi mai clara pentru echipa ZESCORP.",
      },
    ],
    commercialNarrative: [
      {
        title: "De ce proiectul trebuie clarificat inainte de executie",
        body: `${spec.projectType} nu trebuie pornit ca o lucrare izolata de finisaje. In practica, cele mai scumpe intarzieri apar cand echipamentul, planul camerei, traseele tehnice si documentatia sunt tratate separat. O usa comandata prea devreme, un perete inchis fara verificarea vecinatatilor sau o camera amenajata fara acces pentru service pot transforma un buget controlabil intr-un proiect fragmentat. ZESCORP urmareste ca beneficiarul sa stie ce se poate decide acum si ce trebuie validat inainte de contractare.`,
      },
      {
        title: "Beneficiari si decidenti",
        body: "Aceste proiecte implica de obicei proprietarul clinicii, managerul medical, responsabilul tehnic, arhitectul, echipa de achizitii si uneori finantatorul. Fiecare are o intrebare diferita: ce se cumpara, cat costa, cat dureaza, ce riscuri exista si cine raspunde dupa livrare. O pagina comerciala utila trebuie sa lege aceste intrebari intr-un traseu de oferta, nu sa ramana la definitii generale.",
      },
      {
        title: "Riscuri tehnice",
        body: `${spec.riskFocus}. Riscul nu este doar tehnic, ci si comercial. Daca proiectul nu este clar, oferta poate parea mai ieftina decat este in realitate sau poate exclude elemente critice. In etapa preliminara, ZESCORP recomanda identificarea riscurilor care pot schimba bugetul: vecinatati, acces, structura, utilitati, documente, echipament ales si termen.`,
      },
      {
        title: "Documentatie necesara",
        body: `${spec.documentationFocus}. Documentatia nu trebuie sa fie perfecta la prima discutie, dar trebuie sa existe un traseu pentru completare. Planul camerei, sectiunile, informatiile despre echipament, statusul CNCAN sau datele despre instalatii pot schimba configuratia lucrarii. Cand documentele lipsesc, cererea trebuie sa mentioneze clar ipotezele, pentru ca oferta preliminara sa nu fie confundata cu oferta finala.`,
      },
      {
        title: "Conformitate si validare",
        body: `${spec.complianceFocus}. ZESCORP nu prezinta informatii orientative ca aprobari finale. Pentru radioprotectie, CNCAN si proiecte cu echipamente sensibile, validarea de specialitate ramane esentiala. Rolul comercial al paginii este sa pregateasca beneficiarul pentru o discutie corecta: ce trebuie verificat, ce documente sunt utile si unde apar responsabilitati separate.`,
      },
      {
        title: "Bugetare realista",
        body: `${spec.budgetFocus}. Un buget realist include mai mult decat materialul vizibil. Conteaza manopera, accesul, finisajele, elementele speciale, documentele, timpul de executie si eventualele adaptari ale spatiului. Pentru management, diferenta importanta este intre un pret scurt si un cost total care poate fi aparat in decizia de investitie.`,
      },
      {
        title: "Termen si planificare",
        body: `${spec.timelineFocus}. Termenul depinde de claritatea datelor, de disponibilitatea materialelor, de etapa in care se afla santierul si de deciziile privind echipamentul. In proiectele medicale, intarzierea unei camere poate bloca lansarea unui serviciu, mutarea unui aparat sau deschiderea unei clinici. De aceea, termenul trebuie discutat impreuna cu riscul si bugetul.`,
      },
      {
        title: "Integrare cu echipamente medicale",
        body: "Radioprotectia, plumbarea, RF shielding-ul sau amenajarea camerei nu sunt separate de echipamentul medical. Un CT, un RMN, un mamograf sau un sistem RX aduce cerinte de spatiu, acces, alimentare, conectivitate, service si mentenanta. ZESCORP poate conecta discutia de infrastructura cu paginile de echipamente medicale, service si suport, astfel incat proiectul sa fie gandit ca sistem.",
      },
      {
        title: "Integrare cu service si mentenanta",
        body: "Un proiect corect trebuie sa ia in calcul ce se intampla dupa punerea in functiune. Accesul pentru service, documentatia, contractele de mentenanta, verificarea componentelor si compatibilitatea cu fluxurile clinicii sunt importante inca din faza de proiect. Cand acestea sunt ignorate, beneficiarul descopera mai tarziu ca o camera aparent finalizata este greu de intretinut sau de modificat.",
      },
      {
        title: "Ce primeste managementul",
        body: "Managementul nu are nevoie de o lista lunga de termeni tehnici, ci de claritate comerciala: ce se cere, ce se include, ce riscuri exista, ce documente lipsesc, ce costuri pot aparea si care este urmatorul pas. ZESCORP structureaza solicitarea astfel incat decidentul sa poata compara alternativele si sa ceara o oferta personalizata fara sa piarda timp cu intrebari repetitive.",
      },
      {
        title: "Ce nu trebuie promis",
        body: "Nu este profesionist sa promiti grosimi, costuri finale, aprobari sau termene fixe fara date. Pentru proiecte de radioprotectie, RF shielding sau CNCAN, informatiile trebuie prezentate ca repere preliminare, cu validare ulterioara. Aceasta abordare protejeaza beneficiarul si furnizorul, pentru ca evita decizii luate pe presupuneri incomplete.",
      },
      {
        title: "Cerere de oferta buna",
        body: "O cerere de oferta buna include orasul, tipul proiectului, tipul echipamentului, statusul spatiului, planul disponibil, termenul, bugetul orientativ, statusul documentatiei si datele de contact. Daca exista fotografii, schite, fise tehnice sau documente anterioare, acestea accelereaza evaluarea. Daca lipsesc, proiectul poate porni totusi, dar cu ipoteze notate explicit.",
      },
      {
        title: "Rolul ZES in conversie",
        body: "ZES poate prelua rapid datele dintr-o discutie scurta si poate transforma nevoia intr-un brief pentru ofertare. Pentru beneficiarul non-tehnic, asta reduce presiunea de a sti dinainte toate detaliile. Pentru echipa ZESCORP, inseamna o cerere mai clara: proiect, locatie, timp, buget, documente, contact si urmatorul pas recomandat.",
      },
      {
        title: "Urmatorul pas recomandat",
        body: "Daca proiectul este real, urmatorul pas este simplu: trimite planul sau descrierea spatiului, spune ce echipament ai in vedere, mentioneaza orasul si termenul, apoi solicita o discutie comerciala. ZESCORP poate pregati o evaluare preliminara si poate indica ce informatii lipsesc inainte de oferta finala. Scopul este un proiect bugetabil, nu o promisiune vaga.",
      },
    ],
    primaryCta: "Solicita evaluare",
    secondaryCta: "Cere oferta preliminara",
    consultationCta: "Consultanta proiect",
    serviceType: spec.title,
    offerAngle: `${spec.projectType.toLowerCase()}, documentatie preliminara, evaluare plan, bugetare si suport de implementare`,
  };
}

const specs: RadioprotectionRfSpec[] = [
  {
    slug: "radioprotectie",
    path: "/servicii/radioprotectie",
    title: "Radioprotectie",
    metadataTitle: "Radioprotectie medicala | Camere RX, CT si mamografie ZESCORP",
    metadataDescription:
      "Radioprotectie medicala pentru camere RX, CT si mamografie: evaluare preliminara, planificare, documentatie, bugetare si oferta ZESCORP.",
    h1: "Radioprotectie medicala pentru clinici, camere RX si imagistica",
    eyebrow: "Radioprotectie medicala",
    keyword: "radioprotectie",
    secondaryKeywords: ["radioprotectie medicala", "protectie radiologica", "radioprotectie camere RX", "radioprotectie clinici"],
    projectType: "Radioprotectia medicala",
    buyer: "clinici private, centre de radiologie, spitale si investitori medicali",
    technicalFocus: "Se stabileste daca discutam despre RX, CT, mamografie sau alta sursa radiologica si ce impact are asupra spatiului.",
    complianceFocus: "Radioprotectia trebuie corelata cu cerintele aplicabile si cu validarea specialistilor autorizati.",
    budgetFocus: "Bugetul depinde de suprafete, vecinatati, elemente radioprotejate, echipament si nivelul lucrarilor.",
    timelineFocus: "Planificarea trebuie facuta inainte de inchiderea peretilor, comandarea usilor sau stabilirea finisajelor finale.",
    riskFocus: "Riscurile principale sunt subestimarea vecinatatilor, alegerea materialelor nepotrivite si inceperea santierului fara date tehnice.",
    documentationFocus: "Sunt utile planul camerei, destinatia spatiilor invecinate, tipul aparatului, schitele si statusul documentatiei CNCAN.",
    links: [
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie si plumbare RX" },
      { href: "/servicii/radioprotectie-ct", label: "Radioprotectie CT" },
      { href: "/servicii/radioprotectie-mamografie", label: "Radioprotectie mamografie" },
      { href: "/servicii/consultanta-cncan-radiologie", label: "Consultanta CNCAN radiologie" },
    ],
  },
  {
    slug: "placare-plumb-camera-rx",
    path: "/servicii/placare-plumb-camera-rx",
    title: "Placare plumb camera RX",
    metadataTitle: "Placare plumb camera RX | Radioprotectie si oferta ZESCORP",
    metadataDescription:
      "Placare cu plumb pentru camera RX: evaluare plan, pereti, usa, vitraj, documentatie preliminara, buget si oferta personalizata ZESCORP.",
    h1: "Placare cu plumb pentru camera RX si radiologie",
    eyebrow: "Plumbare RX",
    keyword: "placare plumb camera RX",
    secondaryKeywords: ["plumbare camera RX", "pereti plumb radiologie", "usa plumbata RX", "camera radiologie plumbata"],
    projectType: "Placarea cu plumb pentru camera RX",
    buyer: "clinici, cabinete de radiologie, centre dentare cu RX si investitori in imagistica",
    technicalFocus: "Se clarifica peretii, usa, eventualul vitraj, pozitia echipamentului si spatiile invecinate.",
    complianceFocus: "Grosimile si solutia finala trebuie validate in proiectul de specialitate, nu stabilite generic online.",
    budgetFocus: "Bugetul variaza in functie de suprafete, elemente speciale, finisaje, acces si manopera.",
    timelineFocus: "Placarea trebuie planificata inainte de finisaje si inainte ca spatiul sa fie considerat pregatit pentru echipament.",
    riskFocus: "Riscul major este executia dupa o ipoteza gresita: perete ignorat, usa subestimata sau vecinatate neclarificata.",
    documentationFocus: "Planul camerei, schita amplasarii aparatului si destinatia incaperilor vecine sunt informatii minime pentru discutie.",
    links: [
      { href: "/servicii/proiectare-camera-rx", label: "Proiectare camera RX" },
      { href: "/servicii/rx-room-design", label: "RX room design" },
      { href: "/produse/radiologie-digitala", label: "Radiologie digitala" },
      { href: "/servicii/service-radiologie", label: "Service radiologie" },
    ],
  },
  {
    slug: "amenajare-camera-radiologie",
    path: "/servicii/amenajare-camera-radiologie",
    title: "Amenajare camera radiologie",
    metadataTitle: "Amenajare camera radiologie | Proiect, radioprotectie si oferta ZESCORP",
    metadataDescription:
      "Amenajare camera radiologie pentru clinici si centre medicale: flux, radioprotectie, echipament, documentatie, buget si implementare ZESCORP.",
    h1: "Amenajare camera radiologie pentru clinici si centre medicale",
    eyebrow: "Amenajare radiologie",
    keyword: "amenajare camera radiologie",
    secondaryKeywords: ["camera radiologie", "amenajare radiologie", "spatiu radiologie", "camera RX clinica"],
    projectType: "Amenajarea camerei de radiologie",
    buyer: "clinici private, centre medicale regionale si proprietari care deschid sau modernizeaza radiologia",
    technicalFocus: "Se coreleaza fluxul pacientului, operatorul, echipamentul, radioprotectia, utilitatile si accesul.",
    complianceFocus: "Amenajarea trebuie gandita cu respect pentru cerintele de radioprotectie si validari de specialitate.",
    budgetFocus: "Bugetul include lucrari, radioprotectie, finisaje, utilitati, echipament si suport dupa instalare.",
    timelineFocus: "Termenul realist depinde de faza santierului, documente, echipamentul ales si disponibilitatea echipelor.",
    riskFocus: "Cele mai frecvente riscuri sunt flux slab, acces dificil pentru aparat si separarea gresita a lucrarilor de echipament.",
    documentationFocus: "Sunt utile planuri, fotografii ale spatiului, destinatia incaperilor vecine si informatii despre aparatul dorit.",
    links: [
      { href: "/servicii/proiectare-radiologie", label: "Proiectare radiologie" },
      { href: "/produse/radiologie-digitala", label: "Echipamente radiologie digitala" },
      { href: "/servicii/placare-plumb-camera-rx", label: "Placare plumb camera RX" },
      { href: "/servicii/contract-mentenanta-radiologie", label: "Contract mentenanta radiologie" },
    ],
  },
  {
    slug: "proiectare-camera-rx",
    path: "/servicii/proiectare-camera-rx",
    title: "Proiectare camera RX",
    metadataTitle: "Proiectare camera RX | Radioprotectie si infrastructura ZESCORP",
    metadataDescription:
      "Proiectare camera RX pentru clinici: amplasare echipament, flux, radioprotectie, utilitati, documentatie, buget si oferta preliminara.",
    h1: "Proiectare camera RX cu radioprotectie si flux operational",
    eyebrow: "Proiectare RX",
    keyword: "proiectare camera RX",
    secondaryKeywords: ["proiect camera RX", "proiectare radiologie", "camera RX la cheie", "design camera RX"],
    projectType: "Proiectarea camerei RX",
    buyer: "manageri de proiect, arhitecti medicali, clinici si investitori care pregatesc o camera RX",
    technicalFocus: "Se analizeaza amplasarea aparatului, pozitia operatorului, accesul pacientului si utilitatile.",
    complianceFocus: "Proiectarea trebuie corelata cu cerintele de radioprotectie si cu validarea documentatiei de catre specialisti.",
    budgetFocus: "Bugetul depinde de starea spatiului, radioprotectie, utilitati, finisaje, aparatura si instalare.",
    timelineFocus: "Proiectarea timpurie reduce riscul de refacere a lucrarilor si accelereaza faza de ofertare.",
    riskFocus: "Riscurile apar cand camera este desenata fara echipamentul real, fara vecinatati si fara acces de service.",
    documentationFocus: "Planul arhitectural, modelul aparatului, vecinatatile si cerintele operationale sunt baza discutiei.",
    links: [
      { href: "/servicii/rx-room-design", label: "RX room design" },
      { href: "/servicii/amenajare-camera-radiologie", label: "Amenajare camera radiologie" },
      { href: "/produse/radiologie-digitala", label: "Radiologie digitala" },
      { href: "/servicii/service-radiologie", label: "Service radiologie" },
    ],
  },
  {
    slug: "radioprotectie-ct",
    path: "/servicii/radioprotectie-ct",
    title: "Radioprotectie CT",
    metadataTitle: "Radioprotectie CT | Camera computer tomograf ZESCORP",
    metadataDescription:
      "Radioprotectie CT pentru camera computer tomograf: evaluare spatiu, vecinatati, flux, documentatie, buget si oferta preliminara ZESCORP.",
    h1: "Radioprotectie CT pentru camera computer tomograf",
    eyebrow: "Radioprotectie CT",
    keyword: "radioprotectie CT",
    secondaryKeywords: ["camera CT", "radioprotectie computer tomograf", "amenajare camera CT", "proiect camera CT"],
    projectType: "Radioprotectia pentru camera CT",
    buyer: "centre de imagistica, clinici private si spitale care instaleaza sau modernizeaza computer tomograf",
    technicalFocus: "Se coreleaza gantry-ul, camera de comanda, traseele tehnice, accesul pentru instalare si vecinatatile.",
    complianceFocus: "Proiectul CT necesita analiza radioprotectiei in raport cu echipamentul si validarea documentatiei aplicabile.",
    budgetFocus: "Bugetul poate include radioprotectie, lucrari de camera, alimentare, climatizare, acces, finisaje si suport tehnic.",
    timelineFocus: "Camera CT trebuie planificata impreuna cu livrarea aparatului, accesul si instalarea, nu dupa ce spatiul este inchis.",
    riskFocus: "Riscurile includ subdimensionarea spatiului, climatizare insuficienta, acces dificil si radioprotectie discutata prea tarziu.",
    documentationFocus: "Sunt utile planurile, modelul CT, camera de comanda, vecinatatile, fisele tehnice si statusul documentatiei.",
    links: [
      { href: "/produse/computer-tomograf", label: "Computer tomograf" },
      { href: "/servicii/service-computer-tomograf", label: "Service computer tomograf" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
    ],
  },
  {
    slug: "radioprotectie-mamografie",
    path: "/servicii/radioprotectie-mamografie",
    title: "Radioprotectie mamografie",
    metadataTitle: "Radioprotectie mamografie | Camera mamograf ZESCORP",
    metadataDescription:
      "Radioprotectie pentru camera de mamografie: planificare spatiu, echipament, documentatie, buget, service si oferta preliminara ZESCORP.",
    h1: "Radioprotectie pentru camera de mamografie",
    eyebrow: "Radioprotectie mamografie",
    keyword: "radioprotectie mamografie",
    secondaryKeywords: ["camera mamografie", "amenajare mamografie", "mamograf clinica", "proiect camera mamograf"],
    projectType: "Radioprotectia pentru mamografie",
    buyer: "clinici de imagistica, centre de screening, spitale si proiecte de sanatate feminina",
    technicalFocus: "Se analizeaza pozitia mamografului, fluxul pacientei, camera de comanda, accesul si vecinatatile.",
    complianceFocus: "Radioprotectia pentru mamografie trebuie analizata in functie de echipament, utilizare si validari de specialitate.",
    budgetFocus: "Bugetul depinde de spatiu, echipament, elemente radioprotejate, finisaje, instalare si suport post-livrare.",
    timelineFocus: "Termenul trebuie corelat cu livrarea mamografului, pregatirea camerei si disponibilitatea documentelor.",
    riskFocus: "Riscurile apar cand camera este tratata ca spatiu simplu, fara flux pentru pacienta si fara plan de service.",
    documentationFocus: "Sunt utile planul camerei, modelul mamografului, vecinatatile si cerintele de functionare ale centrului.",
    links: [
      { href: "/produse/mamograf", label: "Mamograf" },
      { href: "/servicii/service-mamograf", label: "Service mamograf" },
      { href: "/servicii/proiectare-radiologie", label: "Proiectare radiologie" },
      { href: "/servicii/contract-mentenanta-radiologie", label: "Contract mentenanta radiologie" },
    ],
  },
  {
    slug: "rf-shielding-rmn",
    path: "/servicii/rf-shielding-rmn",
    title: "RF shielding RMN",
    metadataTitle: "RF shielding RMN | Camera RMN si ecranare RF ZESCORP",
    metadataDescription:
      "RF shielding pentru camera RMN: ecranare electromagnetica, camera RMN, infrastructura, documentatie, buget si oferta preliminara ZESCORP.",
    h1: "RF shielding pentru camera RMN si infrastructura imagistica",
    eyebrow: "RF shielding RMN",
    keyword: "RF shielding RMN",
    secondaryKeywords: ["cusca Faraday RMN", "ecranare RF RMN", "camera RMN", "ecranare electromagnetica medicala"],
    projectType: "RF shielding-ul pentru camera RMN",
    buyer: "centre de imagistica, clinici si spitale care instaleaza sau modernizeaza RMN",
    technicalFocus: "Se diferentiaza ecranarea RF de radioprotectie si se coreleaza camera RMN cu magnetul, accesul, HVAC-ul si utilitatile.",
    complianceFocus: "Ecranarea RF trebuie validata in raport cu cerintele echipamentului, mediul electromagnetic si testele aplicabile.",
    budgetFocus: "Bugetul depinde de dimensiunea camerei, sistemul de ecranare, usa RF, ferestre, penetratii, HVAC si testare.",
    timelineFocus: "RF shielding-ul trebuie planificat inainte de instalarea magnetului si coordonat cu santierul si furnizorul echipamentului.",
    riskFocus: "Riscurile includ interferente, penetratii netratate, coordonare slaba cu HVAC-ul si acces insuficient pentru instalare.",
    documentationFocus: "Sunt utile planurile, modelul RMN, cerintele furnizorului, traseele HVAC, accesul si eventualele masuratori.",
    links: [
      { href: "/servicii/camera-rmn-la-cheie", label: "Camera RMN la cheie" },
      { href: "/servicii/cusca-faraday-rmn", label: "Cusca Faraday RMN" },
      { href: "/produse/rmn", label: "RMN" },
      { href: "/servicii/service-rmn", label: "Service RMN" },
    ],
  },
  {
    slug: "camera-rmn-la-cheie",
    path: "/servicii/camera-rmn-la-cheie",
    title: "Camera RMN la cheie",
    metadataTitle: "Camera RMN la cheie | RF shielding si infrastructura ZESCORP",
    metadataDescription:
      "Camera RMN la cheie pentru clinici si imagistica: RF shielding, infrastructura, acces, HVAC, documentatie, buget si oferta ZESCORP.",
    h1: "Camera RMN la cheie pentru clinici si centre de imagistica",
    eyebrow: "Camera RMN",
    keyword: "camera RMN la cheie",
    secondaryKeywords: ["amenajare camera RMN", "infrastructura RMN", "RF shielding RMN", "camera rezonanta magnetica"],
    projectType: "Camera RMN la cheie",
    buyer: "investitori in imagistica, clinici private si spitale care pregatesc un serviciu RMN",
    technicalFocus: "Se coreleaza magnetul, camera tehnica, RF shielding-ul, accesul, HVAC-ul, energia si zonele de siguranta.",
    complianceFocus: "Proiectul RMN trebuie coordonat cu cerintele furnizorului de echipament si validarile tehnice aplicabile.",
    budgetFocus: "Bugetul include infrastructura, ecranare RF, lucrari, acces, utilitati, suport de instalare si mentenanta.",
    timelineFocus: "Termenul trebuie coordonat cu livrarea magnetului, pregatirea santierului, testarea si punerea in functiune.",
    riskFocus: "Riscurile apar cand camera RMN este tratata ca o camera obisnuita, fara integrarea magnetului si a zonelor tehnice.",
    documentationFocus: "Sunt necesare planuri, cerinte furnizor RMN, trasee tehnice, acces, conditii HVAC si status de santier.",
    links: [
      { href: "/produse/rmn", label: "RMN" },
      { href: "/servicii/rf-shielding-rmn", label: "RF shielding RMN" },
      { href: "/servicii/service-rmn", label: "Service RMN" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
    ],
  },
  {
    slug: "ecranare-electromagnetica-medicala",
    path: "/servicii/ecranare-electromagnetica-medicala",
    title: "Ecranare electromagnetica medicala",
    metadataTitle: "Ecranare electromagnetica medicala | Spatii sensibile ZESCORP",
    metadataDescription:
      "Ecranare electromagnetica medicala pentru RMN si spatii sensibile: analiza preliminara, RF shielding, documentatie, buget si oferta ZESCORP.",
    h1: "Ecranare electromagnetica medicala pentru spatii si echipamente sensibile",
    eyebrow: "Ecranare electromagnetica",
    keyword: "ecranare electromagnetica medicala",
    secondaryKeywords: ["ecranare RF", "protectie electromagnetica medicala", "spatii medicale sensibile", "RF shielding medical"],
    projectType: "Ecranarea electromagnetica medicala",
    buyer: "clinici, centre de imagistica, laboratoare si proiecte medicale cu echipamente sensibile",
    technicalFocus: "Se clarifica sursele de interferenta, echipamentul protejat, mediul tehnic, penetratiile si cerintele de testare.",
    complianceFocus: "Ecranarea trebuie discutata cu specialisti si in raport cu cerintele echipamentului, nu aplicata generic.",
    budgetFocus: "Bugetul depinde de suprafata, nivel de ecranare, usa, ferestre, penetratii, testare si integrarea cu instalatiile.",
    timelineFocus: "Planificarea este importanta inainte de inchiderea spatiului si inainte de instalarea echipamentelor sensibile.",
    riskFocus: "Riscurile includ interferente persistente, penetratii netratate si solutii partiale care nu rezolva problema operationala.",
    documentationFocus: "Sunt utile planuri, cerinte echipament, informatii despre surse de interferenta, trasee si date de instalare.",
    links: [
      { href: "/servicii/rf-shielding-rmn", label: "RF shielding RMN" },
      { href: "/servicii/camera-rmn-la-cheie", label: "Camera RMN la cheie" },
      { href: "/produse/rmn", label: "RMN" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
    ],
  },
  {
    slug: "consultanta-cncan-radiologie",
    path: "/servicii/consultanta-cncan-radiologie",
    title: "Consultanta CNCAN radiologie",
    metadataTitle: "Consultanta CNCAN radiologie | Pregatire preliminara ZESCORP",
    metadataDescription:
      "Consultanta preliminara CNCAN pentru radiologie: informatii, documente, plan camera, echipament, radioprotectie si oferta de suport ZESCORP.",
    h1: "Consultanta preliminara CNCAN pentru proiecte de radiologie",
    eyebrow: "CNCAN radiologie",
    keyword: "consultanta CNCAN radiologie",
    secondaryKeywords: ["autorizare CNCAN radiologie", "documentatie CNCAN camera RX", "CNCAN camera radiologie", "consultanta radiologie"],
    projectType: "Consultanta preliminara CNCAN pentru radiologie",
    buyer: "clinici, cabinete RX, centre de imagistica si investitori care pregatesc documentatia radiologica",
    technicalFocus: "Se clarifica tipul de aparat, spatiul, planul, statusul documentelor si etapele care trebuie validate.",
    complianceFocus: "Informatiile sunt orientative si trebuie validate de specialisti autorizati; ZESCORP nu emite autorizari CNCAN.",
    budgetFocus: "Bugetul depinde de radioprotectie, documente, lucrari, echipament, specialisti implicati si etapa proiectului.",
    timelineFocus: "Termenul trebuie planificat realist, pentru ca documentatia si validarile pot influenta deschiderea serviciului.",
    riskFocus: "Riscurile apar cand achizitia sau santierul pornesc inainte ca cerintele documentare si tehnice sa fie clare.",
    documentationFocus: "Sunt utile planul camerei, datele echipamentului, vecinatatile, statusul spatiului si documentele existente.",
    links: [
      { href: "/autorizare-cncan-camera-rx", label: "Autorizare CNCAN camera RX" },
      { href: "/servicii/radioprotectie", label: "Radioprotectie" },
      { href: "/servicii/proiectare-camera-rx", label: "Proiectare camera RX" },
      { href: "/produse/radiologie-digitala", label: "Radiologie digitala" },
    ],
  },
];

export const radioprotectionRfLandings = specs.map(buildRadioprotectionLanding);
