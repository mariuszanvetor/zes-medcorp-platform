import type { SeoCommercialLanding } from "@/data/seo-commercial-landings";

type ServiceMaintenanceSpec = {
  slug: string;
  path: string;
  title: string;
  metadataTitle: string;
  metadataDescription: string;
  h1: string;
  eyebrow: string;
  keyword: string;
  secondaryKeywords: string[];
  equipment: string;
  owner: string;
  downtimePain: string;
  diagnostics: string;
  maintenance: string;
  compliance: string;
  response: string;
  lifespan: string;
  commercialFit: string;
  links: Array<{ href: string; label: string }>;
};

const serviceWhyZescorp = [
  "ZESCORP trateaza service-ul ca activitate tehnic-comerciala: triere, diagnostic, prioritate, oferta, interventie, mentenanta si plan de continuitate.",
  "Pentru echipamente medicale critice, discutia trebuie sa porneasca de la impactul operational: downtime, programari afectate, risc de blocaj si costul amanarii.",
  "Expertiza in imagistica, infrastructura medicala, PACS, radiologie si service aparatura medicala permite corelarea interventiei cu spatiul, IT-ul, utilizarea si mentenanta.",
  "Nu promitem reparatii fara diagnostic si nu oferim instructiuni nesigure. Solicitarea este transformata intr-o cerere clara pentru evaluare tehnica si oferta.",
];

const sharedServiceLinks = [
  { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
  { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
  { href: "/produse", label: "Catalog produse medicale" },
  { href: "/contact", label: "Contact ZESCORP" },
];

function buildServiceLanding(spec: ServiceMaintenanceSpec): SeoCommercialLanding {
  return {
    slug: spec.slug,
    path: spec.path,
    title: spec.title,
    metadataTitle: spec.metadataTitle,
    metadataDescription: spec.metadataDescription,
    h1: spec.h1,
    eyebrow: spec.eyebrow,
    intro: `${spec.equipment} are valoare reala doar cand poate fi folosit constant, predictibil si cu risc operational controlat. Pentru ${spec.owner}, service-ul nu inseamna doar reparatie dupa defect, ci continuitate, mentenanta preventiva, diagnostic tehnic si reactie rapida cand activitatea medicala este afectata. ZESCORP poate prelua cererea de service, poate clarifica simptomul, urgenta, istoricul, documentele disponibile si poate pregati un traseu comercial pentru interventie, suport sau contract de mentenanta.`,
    targetKeywords: [spec.keyword, ...spec.secondaryKeywords],
    audience: [
      `${spec.owner} care au echipamente in exploatare si vor sa reduca timpul de nefunctionare.`,
      `administratori, responsabili tehnici si manageri medicali care trebuie sa justifice interventii, bugete de service sau contracte preventive.`,
      `centre medicale unde ${spec.downtimePain} produce pierderi de programari, presiune pe personal si risc reputational.`,
      `echipe de achizitii care vor o cerere clara pentru diagnostic, interventie, mentenanta sau suport tehnic externalizat.`,
    ],
    benefits: [
      `reducerea riscului de downtime prin triere rapida si prioritizare pe impact operational`,
      `transformarea defectelor repetitive in plan de mentenanta preventiva si verificari programate`,
      `claritate asupra simptomelor, istoricului de interventii, pieselor, accesoriilor si documentelor necesare`,
      `posibilitatea de a discuta contracte de suport in locul interventiilor reactive greu de bugetat`,
      `sprijin pentru continuitatea serviciilor medicale, protectia veniturilor si planificarea inlocuirilor viitoare`,
      `o ruta comerciala simpla: cerere service, diagnostic, oferta, interventie, raportare si urmatorul pas`,
    ],
    implementation: [
      {
        title: "Preluare caz si urgenta",
        description: `Se colecteaza tipul echipamentului, modelul, simptomul, codurile de eroare, orasul, contactul si nivelul de impact asupra activitatii. ${spec.response}`,
      },
      {
        title: "Triage tehnic",
        description: `${spec.diagnostics}. Scopul este incadrarea corecta: defect operational, problema de accesoriu, componenta critica, software, conectivitate sau nevoie de verificare preventiva.`,
      },
      {
        title: "Verificare documente si istoric",
        description:
          "Sunt utile fotografii, etichete, rapoarte anterioare, manuale, lista de accesorii, data ultimei interventii si orice modificare recenta a spatiului sau retelei.",
      },
      {
        title: "Oferta de interventie",
        description:
          "Dupa clarificare, cazul poate deveni oferta punctuala, vizita tehnica, diagnostic la fata locului, suport remote sau recomandare pentru evaluare detaliata.",
      },
      {
        title: "Mentenanta preventiva",
        description: `${spec.maintenance}. Pentru echipamente critice, verificarea programata poate fi mai ieftina decat oprirea neplanificata.`,
      },
      {
        title: "Contract si raportare",
        description:
          "Pentru echipamente folosite intens, ZESCORP poate discuta niveluri de suport, timpi de raspuns, raportare, inventar tehnic si plan de mentenanta.",
      },
    ],
    deliverables: [
      `cerere structurata de service pentru ${spec.equipment.toLowerCase()}`,
      "triage tehnic si clarificare urgenta",
      "oferta pentru diagnostic, interventie sau suport tehnic",
      "plan de mentenanta preventiva si verificari programate",
      "recomandari pentru reducerea downtime-ului si cresterea duratei de viata",
      "optiuni pentru contract de service, suport prioritar si raportare",
    ],
    costFactors: [
      "tipul echipamentului, complexitatea defectului si criticitatea in fluxul medical",
      "disponibilitatea pieselor, accesoriilor, documentelor si istoricului de service",
      "locatia, urgenta, timpul de raspuns solicitat si necesitatea deplasarii",
      "daca solicitarea este interventie unica, abonament de mentenanta sau contract multi-echipament",
      "nivelul de suport: remote, on-site, preventiv, prioritar sau contractual",
    ],
    procurementNotes: [
      "Noteaza simptomul exact si momentul in care apare.",
      "Pastreaza codurile de eroare, fotografiile si eticheta echipamentului.",
      "Stabileste daca aparatul este oprit complet sau functioneaza cu limitari.",
      "Pregateste orasul, persoana de contact, telefonul si nivelul de urgenta.",
      "Pentru contracte, pregateste lista de echipamente, locatii si criticitatea fiecaruia.",
    ],
    whyZESCORP: serviceWhyZescorp,
    internalLinks: [...spec.links, ...sharedServiceLinks].filter(
      (link, index, links) => links.findIndex((item) => item.href === link.href) === index,
    ),
    faqs: [
      {
        question: `Pot solicita service pentru ${spec.equipment.toLowerCase()} fara diagnostic final?`,
        answer:
          "Da. Prima etapa este trierea cazului: echipament, model, simptom, cod eroare, locatie si urgenta. Diagnosticul final se stabileste dupa verificare tehnica.",
      },
      {
        question: "Ce informatii sunt necesare pentru preluare rapida?",
        answer:
          "Sunt utile numele clinicii, orasul, telefonul, echipamentul, marca/modelul, simptomul, fotografiile, codurile de eroare si impactul asupra programarilor.",
      },
      {
        question: "Se poate incheia contract de mentenanta?",
        answer:
          "Da. Pentru echipamente folosite intens, un contract poate include verificari programate, raportare, prioritizare si conditii de suport adaptate riscului operational.",
      },
      {
        question: "Interventia poate fi urgenta?",
        answer:
          "Cazurile urgente pot fi prioritizate in functie de impact, locatie si datele disponibile. Pentru preluare rapida sunt importante telefonul, orasul si descrierea clara a defectului.",
      },
      {
        question: "ZESCORP poate garanta reparatia de la distanta?",
        answer:
          "Nu. ZESCORP poate face triere si poate pregati cererea de service, dar reparatia si solutia finala depind de diagnostic, piese, acces si verificare tehnica.",
      },
      {
        question: "Cum se estimeaza costul de service?",
        answer:
          "Costul depinde de echipament, defect, piese, deplasare, urgenta, documente disponibile si nivelul de suport cerut. Oferta se pregateste dupa clarificarea cazului.",
      },
    ],
    commercialNarrative: [
      {
        title: "Pain points operationale",
        body: `${spec.downtimePain}. Intr-o clinica, un echipament indisponibil nu este doar o problema tehnica. Afecteaza programari, venituri, pacienti, personal, reputatie si capacitatea de a respecta termene interne. De aceea, service-ul trebuie tratat ca proces comercial cu prioritate, nu ca mesaj generic trimis unui furnizor necunoscut.`,
      },
      {
        title: "Costul downtime-ului",
        body:
          "Costul real al unui aparat oprit include programari mutate, timp pierdut de personal, servicii amanate, presiune pe receptie si uneori pierderea pacientilor catre alte centre. Pentru echipamente de imagistica, monitorizare sau software medical, o zi de nefunctionare poate costa mai mult decat o verificare preventiva planificata. O cerere de service bine structurata scurteaza timpul pana la decizie.",
      },
      {
        title: "Mentenanta preventiva",
        body: `${spec.maintenance}. Mentenanta preventiva nu elimina toate defectele, dar reduce surprizele, identifica uzura, clarifica accesoriile problematice si ajuta la bugetarea interventiilor. Pentru echipamente critice, programarea verificarilor poate proteja continuitatea si durata de viata a aparaturii.`,
      },
      {
        title: "Conformitate si siguranta operationala",
        body: `${spec.compliance}. ZESCORP nu inlocuieste validarile oficiale si nu emite decizii legale, dar poate ajuta beneficiarul sa organizeze documentele, istoricul, datele tehnice si cererea catre specialistii relevanti. Pentru aparatura medicala, conformitatea practica inseamna si trasabilitate: cine a verificat, cand, ce s-a constatat si ce urmeaza.`,
      },
      {
        title: "Timp de raspuns si prioritizare",
        body: `${spec.response}. Nu toate cazurile au aceeasi urgenta. Un echipament critic oprit intr-un centru cu programari active trebuie separat de o verificare preventiva planificata. Prioritizarea corecta cere date clare: simptom, impact, locatie, contact si disponibilitatea echipamentului pentru verificare.`,
      },
      {
        title: "Durata de viata a echipamentului",
        body: `${spec.lifespan}. Un echipament medical bine intretinut poate ramane util mai mult timp si poate fi inlocuit mai predictibil. Fara istoric, accesorii corecte si verificari, decizia de reparatie sau inlocuire devine reactiva. ZESCORP poate ajuta la transformarea istoricului tehnic intr-un plan comercial de suport.`,
      },
      {
        title: "Contract de suport",
        body:
          "Pentru clinici cu mai multe echipamente sau locatii, contractul poate fi mai eficient decat interventiile izolate. Se pot stabili categorii de criticitate, niveluri de suport, raportare, verificari preventive si proceduri de escaladare. Contractul nu trebuie sa fie complicat; trebuie sa fie clar, aplicabil si legat de riscurile reale ale beneficiarului.",
      },
      {
        title: "Oferta si urmatorul pas",
        body: `${spec.commercialFit}. Urmatorul pas este trimiterea datelor minime: echipament, model, oras, simptom, urgenta si contact. Daca exista poze, erori, rapoarte sau fise tehnice, acestea accelereaza trierea. Daca nu exista, cererea poate porni de la descrierea problemei si poate fi completata gradual.`,
      },
      {
        title: "Suport de urgenta",
        body:
          "Pentru cazuri urgente, mesajul initial trebuie sa fie scurt si complet: ce aparat este afectat, daca este oprit, ce pacienti sau programari sunt influentate, unde se afla echipamentul si cine poate raspunde la telefon. Aceasta claritate ajuta ZESCORP sa incadreze cazul si sa propuna cel mai realist traseu de interventie sau suport.",
      },
      {
        title: "Plan de escaladare",
        body:
          "Un caz tehnic bun nu ramane blocat intr-o descriere vaga. Dupa preluare, trebuie stabilit cine confirma simptomul, cine poate permite accesul la echipament, ce documente exista, ce accesorii pot fi testate si ce decizie comerciala este acceptabila: interventie, diagnostic, piesa, inlocuire, suport remote sau programare preventiva. Pentru manageri si administratori, escaladarea clara inseamna mai putine apeluri repetitive si o decizie mai rapida asupra bugetului.",
      },
      {
        title: "Cerere completa pentru ofertare",
        body:
          "O cerere completa de service include informatii tehnice si comerciale: denumirea echipamentului, modelul, seria daca este disponibila, orasul, contactul, simptomul, urgenta, impactul asupra activitatii, poze, coduri de eroare, istoric de interventii si termenul dorit. Cu aceste date, ZESCORP poate pregati o directie realista pentru oferta si poate separa ce se poate face imediat de ce trebuie verificat la fata locului.",
      },
    ],
    primaryCta: "Solicita service",
    secondaryCta: "Cere analiza tehnica",
    consultationCta: "Suport urgent",
    serviceType: spec.title,
    offerAngle: `${spec.equipment.toLowerCase()}, diagnostic tehnic, mentenanta preventiva, suport si contract service`,
  };
}

const specs: ServiceMaintenanceSpec[] = [
  {
    slug: "service-radiologie",
    path: "/servicii/service-radiologie",
    title: "Service radiologie",
    metadataTitle: "Service radiologie | Interventii RX si mentenanta ZESCORP",
    metadataDescription:
      "Service radiologie pentru clinici si centre imagistica: echipamente RX, detector digital, camera RX, mentenanta, diagnostic tehnic si suport ZESCORP.",
    h1: "Service radiologie pentru echipamente RX si centre de imagistica",
    eyebrow: "Service radiologie",
    keyword: "service radiologie",
    secondaryKeywords: ["service RX", "mentenanta radiologie", "service detector digital", "interventii radiologie"],
    equipment: "Echipamentul de radiologie RX",
    owner: "clinici de radiologie, centre imagistice, cabinete cu RX si spitale private",
    downtimePain:
      "Cand radiologia este oprita, pacientii trebuie reprogramati, medicii nu primesc imagini, iar veniturile zilnice ale centrului pot fi afectate imediat",
    diagnostics:
      "Pentru radiologie se verifica simptomele legate de generator, detector, consola, stativ, masa, calitatea imaginii, comunicarea DICOM si alimentarea",
    maintenance:
      "Mentenanta radiologiei trebuie sa includa verificari preventive, controlul accesoriilor, starea detectorului, conectivitatea si observarea degradarii calitatii imaginii",
    compliance:
      "Pentru camere RX, service-ul trebuie gandit impreuna cu radioprotectia, documentatia echipamentului si traseul de verificare acceptat de beneficiar",
    response:
      "Cazurile cu aparat RX oprit, imagine neutilizabila sau detector nefunctional trebuie tratate prioritar fata de verificarile planificate",
    lifespan:
      "Durata de viata a unui sistem RX depinde de utilizare, detector, generator, intretinere, mediu, actualizari si modul in care sunt gestionate erorile recurente",
    commercialFit:
      "ZESCORP poate pregati oferta pentru interventie punctuala, verificare preventiva sau contract de service pentru camera RX si echipamentele asociate",
    links: [
      { href: "/produse/radiologie-digitala", label: "Radiologie digitala" },
      { href: "/servicii/rx-room-design", label: "RX room design" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie RX" },
      { href: "/servicii/service-computer-tomograf", label: "Service computer tomograf" },
    ],
  },
  {
    slug: "service-rmn",
    path: "/servicii/service-rmn",
    title: "Service RMN",
    metadataTitle: "Service RMN | Suport tehnic si mentenanta ZESCORP",
    metadataDescription:
      "Service RMN pentru centre de imagistica: triere, mentenanta preventiva, suport infrastructura, RF shielding, chiller, PACS si oferta tehnica.",
    h1: "Service RMN pentru centre de imagistica si clinici medicale",
    eyebrow: "Service RMN",
    keyword: "service RMN",
    secondaryKeywords: ["mentenanta RMN", "suport RMN", "service rezonanta magnetica", "RF shielding RMN"],
    equipment: "Sistemul RMN",
    owner: "centre RMN, clinici de imagistica si spitale care opereaza rezonanta magnetica",
    downtimePain:
      "Un RMN indisponibil blocheaza investigatii cu valoare ridicata, afecteaza programari complexe si poate crea pierderi operationale mari intr-un timp scurt",
    diagnostics:
      "Pentru RMN se clarifica simptomele legate de magnet, consola, bobine, masa, chiller, ecranare RF, imagine, software, PACS si conditiile camerei",
    maintenance:
      "Mentenanta RMN trebuie corelata cu bobinele, climatizarea, chillerul, ecranarea RF, curatenia zonei tehnice si istoricul de erori",
    compliance:
      "Pentru RMN, siguranta operationala include controlul accesului, conditiile camerei, documentatia tehnica si procedurile interne ale beneficiarului",
    response:
      "Cazurile in care RMN-ul nu scaneaza, pierde conectivitatea sau are probleme de imagine trebuie incadrate rapid in functie de impactul asupra programarilor",
    lifespan:
      "Durata de viata a unui RMN depinde de mentenanta sistemului, conditiile de camera, stabilitatea infrastructurii si gestionarea corecta a accesoriilor",
    commercialFit:
      "ZESCORP poate structura cererea pentru service RMN, mentenanta, verificari de infrastructura, RF shielding sau suport PACS asociat",
    links: [
      { href: "/produse/rmn", label: "RMN" },
      { href: "/servicii/cusca-faraday-rmn", label: "Cusca Faraday RMN" },
      { href: "/services/rf-shielding", label: "RF shielding" },
      { href: "/solutii-medicale/camere-rmn", label: "Camere RMN" },
    ],
  },
  {
    slug: "service-computer-tomograf",
    path: "/servicii/service-computer-tomograf",
    title: "Service computer tomograf",
    metadataTitle: "Service computer tomograf CT | Mentenanta si suport ZESCORP",
    metadataDescription:
      "Service computer tomograf CT pentru clinici si centre imagistica: diagnostic tehnic, mentenanta preventiva, suport camera CT, PACS si oferta.",
    h1: "Service computer tomograf CT pentru clinici si centre imagistica",
    eyebrow: "Service CT",
    keyword: "service computer tomograf",
    secondaryKeywords: ["service CT", "mentenanta CT", "interventii computer tomograf", "suport camera CT"],
    equipment: "Computerul tomograf CT",
    owner: "clinici si centre de diagnostic care opereaza echipamente CT",
    downtimePain:
      "Oprirea CT-ului poate afecta investigatii urgente, programari cu volum mare si colaborari cu medici trimitatori",
    diagnostics:
      "Pentru CT se clarifica erorile de consola, tub, generator, masa, injectomat, reconstructie, PACS, alimentare, climatizare si calitatea imaginii",
    maintenance:
      "Mentenanta CT trebuie sa urmareasca simptomele recurente, conditiile camerei, consumabilele asociate, accesoriile si verificarea preventiva a componentelor critice",
    compliance:
      "Pentru CT, cerintele operationale trebuie corelate cu radioprotectia, documentatia camerei, procedurile interne si validarile cerute de beneficiar",
    response:
      "Un CT blocat sau cu imagine compromisa trebuie prioritizat dupa numarul de pacienti afectati si riscul de anulare a programarilor",
    lifespan:
      "Durata de viata a CT-ului depinde de utilizare, tub, climatizare, alimentare, mentenanta si capacitatea de a preveni defecte repetitive",
    commercialFit:
      "ZESCORP poate pregati cereri de service CT, verificare infrastructura, mentenanta preventiva sau suport pentru modernizare si inlocuire",
    links: [
      { href: "/produse/computer-tomograf", label: "Computer tomograf" },
      { href: "/solutii-medicale/camere-ct", label: "Camere CT" },
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
    ],
  },
  {
    slug: "service-ecograf",
    path: "/servicii/service-ecograf",
    title: "Service ecograf",
    metadataTitle: "Service ecograf | Reparatii, sonde si mentenanta ZESCORP",
    metadataDescription:
      "Service ecograf pentru clinici si cabinete: sonde, imagine, display, conectivitate, accesorii, mentenanta preventiva si oferta ZESCORP.",
    h1: "Service ecograf pentru clinici, cabinete si centre medicale",
    eyebrow: "Service ecografe",
    keyword: "service ecograf",
    secondaryKeywords: ["service ecografe", "reparatii ecograf", "mentenanta ecograf", "sonde ecograf"],
    equipment: "Ecograful medical",
    owner: "clinici, cabinete, spitale si centre de diagnostic care folosesc ecografie zilnic",
    downtimePain:
      "Un ecograf indisponibil reduce imediat capacitatea de consult, afecteaza programarile si poate bloca servicii medicale rapide",
    diagnostics:
      "Pentru ecograf se verifica sondele, conectorii, display-ul, alimentarea, bateriile, software-ul, imaginea, imprimarea si exportul datelor",
    maintenance:
      "Mentenanta ecografului trebuie sa includa verificarea sondelor, cablurilor, conectorilor, curatarea corecta, accesorii si observarea degradarii imaginii",
    compliance:
      "Utilizarea sigura depinde de accesorii compatibile, curatare corecta, proceduri interne si evidenta interventiilor",
    response:
      "Cazurile cu sonda defecta, ecran negru, imagine slaba sau aparat care nu porneste trebuie descrise clar pentru triere rapida",
    lifespan:
      "Durata de viata a ecografului depinde mult de sonde, manipulare, curatare, software, baterie si modul in care sunt gestionate accesoriile",
    commercialFit:
      "ZESCORP poate pregati oferta pentru verificare ecograf, accesorii, sonde, interventie sau contract de mentenanta pentru mai multe unitati",
    links: [
      { href: "/produse/ecograf", label: "Ecograf" },
      { href: "/contracte-mentenanta/mentenanta-ecografe", label: "Mentenanta ecografe" },
      { href: "/produse/monitor-pacient", label: "Monitor pacient" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
    ],
  },
  {
    slug: "service-mamograf",
    path: "/servicii/service-mamograf",
    title: "Service mamograf",
    metadataTitle: "Service mamograf | Mentenanta mamografie ZESCORP",
    metadataDescription:
      "Service mamograf pentru clinici si centre de screening: diagnostic tehnic, detector, imagine, PACS, mentenanta, radioprotectie si oferta.",
    h1: "Service mamograf pentru clinici si centre de screening",
    eyebrow: "Service mamografie",
    keyword: "service mamograf",
    secondaryKeywords: ["mentenanta mamograf", "service mamografie", "interventii mamograf", "suport mamografie digitala"],
    equipment: "Mamograful digital",
    owner: "centre de imagistica, clinici de screening si spitale care opereaza mamografie",
    downtimePain:
      "Un mamograf indisponibil afecteaza programari sensibile, fluxuri de screening si increderea pacientelor in disponibilitatea serviciului",
    diagnostics:
      "Pentru mamograf se clarifica problemele de detector, compresie, consola, imagine, software, DICOM, PACS, alimentare si accesorii",
    maintenance:
      "Mentenanta mamografului trebuie sa urmareasca starea detectorului, calitatea imaginii, compresia, conectivitatea si istoricul interventiilor",
    compliance:
      "Pentru mamografie, service-ul trebuie corelat cu procedurile interne, radioprotectia si documentatia tehnica disponibila",
    response:
      "Problemele de imagine, detector sau imposibilitate de examinare trebuie prioritizate pentru a limita reprogramarile",
    lifespan:
      "Durata de viata a mamografului depinde de utilizare, detector, compresie, mentenanta, mediu si actualizari software",
    commercialFit:
      "ZESCORP poate structura cereri pentru service mamograf, mentenanta preventiva, verificare PACS sau plan de inlocuire",
    links: [
      { href: "/produse/mamograf", label: "Mamograf" },
      { href: "/servicii/service-radiologie", label: "Service radiologie" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
    ],
  },
  {
    slug: "service-c-arm",
    path: "/servicii/service-c-arm",
    title: "Service C-arm",
    metadataTitle: "Service C-arm | Suport arc C si mentenanta ZESCORP",
    metadataDescription:
      "Service C-arm pentru sali de interventii, ortopedie si chirurgie: diagnostic tehnic, imagine, detector, monitoare, mentenanta si oferta.",
    h1: "Service C-arm pentru sali de interventii si chirurgie",
    eyebrow: "Service C-arm",
    keyword: "service C-arm",
    secondaryKeywords: ["service arc C", "mentenanta C-arm", "interventii C-arm", "service imagistica intraoperatorie"],
    equipment: "C-arm-ul medical",
    owner: "spitale, clinici chirurgicale, centre ortopedice si unitati cu imagistica intraoperatorie",
    downtimePain:
      "Un C-arm defect poate bloca interventii, poate intarzia sala si poate crea presiune directa asupra programului chirurgical",
    diagnostics:
      "Pentru C-arm se clarifica simptomele de imagine, detector, generator, mobilitate, monitoare, frane, baterie, DICOM si accesorii",
    maintenance:
      "Mentenanta C-arm trebuie sa includa verificari de mobilitate, conectivitate, calitatea imaginii, accesorii, monitoare si componente mecanice",
    compliance:
      "Utilizarea C-arm implica radioprotectie pentru personal, proceduri de lucru si evidenta interventiilor tehnice",
    response:
      "Cazurile care afecteaza sala de operatie sau proceduri programate trebuie comunicate cu ora, locatie, simptom si impact",
    lifespan:
      "Durata de viata a C-arm-ului depinde de manipulare, mobilitate, detector, generator, mentenanta si gestionarea corecta a accesoriilor",
    commercialFit:
      "ZESCORP poate pregati cereri de service C-arm, verificare preventiva, accesorii, suport DICOM sau contract pentru echipamente interventii",
    links: [
      { href: "/produse/c-arm", label: "C-arm" },
      { href: "/servicii/service-radiologie", label: "Service radiologie" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie" },
      { href: "/produse/imprimanta-dicom", label: "Imprimanta DICOM" },
    ],
  },
  {
    slug: "service-pacs-ris",
    path: "/servicii/service-pacs-ris",
    title: "Service PACS RIS",
    metadataTitle: "Service PACS RIS | Suport DICOM si arhivare ZESCORP",
    metadataDescription:
      "Service PACS RIS pentru radiologie si imagistica: suport DICOM, arhivare, utilizatori, conectivitate, backup, diagnostic la distanta si oferta.",
    h1: "Service PACS RIS pentru radiologie si fluxuri DICOM",
    eyebrow: "Service software imagistica",
    keyword: "service PACS RIS",
    secondaryKeywords: ["suport PACS", "service RIS", "suport DICOM", "mentenanta PACS"],
    equipment: "Sistemul PACS RIS",
    owner: "centre de imagistica, clinici de radiologie si spitale care depind de arhivare, raportare si flux DICOM",
    downtimePain:
      "Cand PACS/RIS nu functioneaza corect, imaginile nu circula, raportarea se blocheaza, medicii nu pot accesa cazurile si pacientii asteapta rezultate",
    diagnostics:
      "Pentru PACS/RIS se verifica utilizatori, stocare, backup, conectivitate DICOM, modalitati, imprimare, acces remote, raportare si erori de workflow",
    maintenance:
      "Mentenanta PACS/RIS trebuie sa includa verificarea stocarii, backup-ului, conectivitatii, utilizatorilor si modalitatilor conectate",
    compliance:
      "Sistemele PACS/RIS trebuie operate cu atentie la acces, trasabilitate, backup, politici interne si protectia datelor medicale",
    response:
      "Blocajele PACS care opresc raportarea, arhivarea sau accesul medicilor trebuie prioritizate fata de configurari planificate",
    lifespan:
      "Durata de viata a unui PACS/RIS depinde de stocare, infrastructura IT, mentenanta, backup, actualizari si disciplina operationala",
    commercialFit:
      "ZESCORP poate pregati cereri pentru suport PACS/RIS, verificare DICOM, arhivare, diagnostic la distanta sau mentenanta software",
    links: [
      { href: "/produse/pacs-ris", label: "PACS RIS" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/servicii/arhivare-pacs", label: "Arhivare PACS" },
      { href: "/servicii/diagnostic-la-distanta", label: "Diagnostic la distanta" },
    ],
  },
  {
    slug: "mentenanta-echipamente-medicale",
    path: "/servicii/mentenanta-echipamente-medicale",
    title: "Mentenanta echipamente medicale",
    metadataTitle: "Mentenanta echipamente medicale | Contracte si suport ZESCORP",
    metadataDescription:
      "Mentenanta echipamente medicale pentru clinici, spitale si laboratoare: verificari preventive, contracte service, raportare, uptime si oferta.",
    h1: "Mentenanta echipamente medicale pentru uptime si continuitate",
    eyebrow: "Mentenanta preventiva",
    keyword: "mentenanta echipamente medicale",
    secondaryKeywords: ["mentenanta aparatura medicala", "contract mentenanta medicala", "service preventiv", "suport echipamente medicale"],
    equipment: "Parcul de echipamente medicale",
    owner: "clinici, spitale, laboratoare si centre medicale cu mai multe echipamente in exploatare",
    downtimePain:
      "Defectele neplanificate apar adesea in momentele cele mai scumpe: programari pline, personal disponibil si pacienti deja prezenti",
    diagnostics:
      "Pentru mentenanta se inventariaza echipamentele, criticitatea, istoricul, accesoriile, simptomele recurente, documentele si locatiile",
    maintenance:
      "Mentenanta preventiva inseamna verificari programate, evidenta interventiilor, prioritizare, recomandari si planificarea inlocuirilor cand reparatia nu mai este eficienta",
    compliance:
      "Pentru echipamente medicale, evidenta verificarilor si trasabilitatea interventiilor sustin disciplina operationala si auditabilitatea interna",
    response:
      "Un contract bun separa echipamentele critice de cele secundare si stabileste ce cazuri primesc suport prioritar",
    lifespan:
      "Durata de viata a echipamentelor creste cand accesoriile, consumabilele, curatarea si verificarile sunt gestionate predictibil",
    commercialFit:
      "ZESCORP poate pregati evaluare de parc, plan preventiv, niveluri de suport si oferta pentru mentenanta multi-echipament",
    links: [
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
      { href: "/servicii/contract-mentenanta-radiologie", label: "Contract mentenanta radiologie" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/produse/monitor-pacient", label: "Monitor pacient" },
    ],
  },
  {
    slug: "contract-mentenanta-radiologie",
    path: "/servicii/contract-mentenanta-radiologie",
    title: "Contract mentenanta radiologie",
    metadataTitle: "Contract mentenanta radiologie | Service RX si imagistica ZESCORP",
    metadataDescription:
      "Contract mentenanta radiologie pentru RX, CT, mamografie, C-arm si PACS: verificari preventive, raportare, suport prioritar si oferta.",
    h1: "Contract mentenanta radiologie pentru echipamente RX si imagistica",
    eyebrow: "Contract service radiologie",
    keyword: "contract mentenanta radiologie",
    secondaryKeywords: ["contract service radiologie", "mentenanta RX", "mentenanta imagistica", "service preventiv radiologie"],
    equipment: "Echipamentele de radiologie si imagistica",
    owner: "centre de radiologie, clinici imagistice si spitale cu RX, CT, mamografie, C-arm sau PACS",
    downtimePain:
      "Radiologia produce venituri recurente si depinde de disponibilitate; oprirea unui echipament poate afecta imediat programari si colaborari medicale",
    diagnostics:
      "Pentru contract se evalueaza echipamentele, varsta, criticitatea, istoricul de service, fluxul de pacienti, accesoriile si conectivitatea",
    maintenance:
      "Un contract de mentenanta radiologie trebuie sa includa verificari preventive, prioritizare, raportare, recomandari si reguli clare de escaladare",
    compliance:
      "Radiologia necesita disciplina in documente, radioprotectie, evidenta interventiilor si colaborare cu specialistii relevanti cand este cazul",
    response:
      "Contractul trebuie sa defineasca timpii de raspuns in functie de echipamentul afectat si impactul asupra activitatii centrului",
    lifespan:
      "Planificarea mentenantei ajuta la prelungirea utilizarii echipamentelor si la decizia corecta intre reparatie, modernizare si inlocuire",
    commercialFit:
      "ZESCORP poate pregati oferta pentru contract de mentenanta radiologie, cu niveluri de suport adaptate echipamentelor si locatiei",
    links: [
      { href: "/servicii/service-radiologie", label: "Service radiologie" },
      { href: "/servicii/service-computer-tomograf", label: "Service computer tomograf" },
      { href: "/servicii/service-mamograf", label: "Service mamograf" },
      { href: "/servicii/service-c-arm", label: "Service C-arm" },
    ],
  },
  {
    slug: "interventii-tehnice-echipamente-medicale",
    path: "/servicii/interventii-tehnice-echipamente-medicale",
    title: "Interventii tehnice echipamente medicale",
    metadataTitle: "Interventii tehnice echipamente medicale | Suport ZESCORP",
    metadataDescription:
      "Interventii tehnice pentru echipamente medicale: triere, diagnostic, service, mentenanta, suport urgent, raportare si oferta personalizata ZESCORP.",
    h1: "Interventii tehnice pentru echipamente medicale in clinici si spitale",
    eyebrow: "Suport tehnic medical",
    keyword: "interventii tehnice echipamente medicale",
    secondaryKeywords: ["interventii service aparatura medicala", "suport tehnic medical", "diagnostic echipamente medicale", "service urgent medical"],
    equipment: "Echipamentele medicale critice",
    owner: "clinici, spitale, laboratoare, centre de diagnostic si cabinete cu aparatura folosita zilnic",
    downtimePain:
      "O interventie intarziata poate transforma un defect minor intr-un blocaj operational, mai ales cand aparatul sustine programari, diagnostic sau tratament",
    diagnostics:
      "Pentru interventii tehnice se clarifica simptomul, accesoriile, alimentarea, software-ul, erorile, istoricul si conditiile de utilizare",
    maintenance:
      "Dupa interventie, mentenanta preventiva poate reduce repetarea defectului si poate clarifica ce echipamente merita incluse intr-un contract",
    compliance:
      "Interventiile trebuie documentate intern, fara improvizatii nesigure si fara manipularea echipamentelor de catre personal neautorizat",
    response:
      "Cazurile urgente se prioritizeaza dupa impact: aparat oprit, pacienti afectati, programari blocate si disponibilitatea contactului tehnic local",
    lifespan:
      "Interventiile corecte, documentate si urmate de recomandari preventive pot extinde durata de utilizare si pot reduce defectele recurente",
    commercialFit:
      "ZESCORP poate transforma solicitarea intr-o cerere clara de interventie, oferta, suport urgent sau plan de mentenanta",
    links: [
      { href: "/servicii/mentenanta-echipamente-medicale", label: "Mentenanta echipamente medicale" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/produse/ups-medical", label: "UPS medical" },
      { href: "/produse/monitor-pacient", label: "Monitor pacient" },
    ],
  },
];

export const serviceMaintenanceLandings: SeoCommercialLanding[] = specs.map(buildServiceLanding);
