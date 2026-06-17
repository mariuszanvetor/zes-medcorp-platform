import type { SeoCommercialLanding } from "@/data/seo-commercial-landings";

type EquipmentLandingSpec = {
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
  buyer: string;
  clinicalUse: string;
  infrastructure: string;
  integration: string;
  service: string;
  budget: string;
  category: string;
  links: Array<{ href: string; label: string }>;
  properties: Array<{ label: string; value: string }>;
};

const equipmentWhyZescorp = [
  "ZESCORP abordeaza achizitia ca proiect complet: echipament, spatiu, instalare, integrare, service, mentenanta si documentatie comerciala.",
  "Discutia comerciala este construita in jurul aplicatiei medicale, al fluxului operational si al bugetului, nu doar in jurul unei liste de produse.",
  "Pentru echipamente de imagistica, PACS, monitorizare sau infrastructura critica, echipa poate corela produsul cu spatiul, instalatiile, datele si suportul tehnic.",
  "Nu sunt inventate preturi, certificari sau proiecte realizate. Oferta se pregateste dupa configuratie, documente disponibile, locatie si cerintele reale ale beneficiarului.",
];

const baseLinks = [
  { href: "/produse", label: "Catalog produse medicale" },
  { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
  { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
  { href: "/contracte-mentenanta", label: "Contracte de mentenanta" },
  { href: "/contact", label: "Contact ZESCORP" },
];

function buildEquipmentLanding(spec: EquipmentLandingSpec): SeoCommercialLanding {
  return {
    slug: spec.slug,
    path: spec.path,
    title: spec.title,
    metadataTitle: spec.metadataTitle,
    metadataDescription: spec.metadataDescription,
    h1: spec.h1,
    eyebrow: spec.eyebrow,
    intro: `${spec.equipment} trebuie ales ca investitie operationala, nu ca simplu produs dintr-un catalog. Pentru ${spec.buyer}, decizia influenteaza fluxul pacientilor, calitatea actului medical, costurile de exploatare, necesarul de service si modul in care clinica poate creste in urmatorii ani. ZESCORP poate pregati discutia comerciala pentru selectie, ofertare, integrare si suport, cu accent pe configuratie, infrastructura si continuitate operationala.`,
    targetKeywords: [spec.keyword, ...spec.secondaryKeywords],
    audience: [
      `${spec.buyer} care vor sa cumpere sau sa inlocuiasca ${spec.equipment.toLowerCase()} cu o configuratie potrivita aplicatiei clinice.`,
      `administratori si investitori medicali care au nevoie de oferta, comparatie de configuratii si plan de implementare pentru ${spec.clinicalUse}.`,
      `clinici si spitale care vor sa conecteze achizitia cu ${spec.infrastructure}, service, mentenanta si integrare IT.`,
      `echipe de achizitii care trebuie sa justifice bugetul prin beneficii operationale, risc redus si suport post-vanzare.`,
    ],
    benefits: [
      `selectie mai clara a configuratiei pentru ${spec.clinicalUse}, fara achizitie bazata doar pe pretul initial`,
      `corelare intre echipament, spatiu, infrastructura si fluxul medical, astfel incat implementarea sa fie previzibila`,
      `posibilitatea de a include instalare, training, service si mentenanta in aceeasi discutie comerciala`,
      `reducerea riscului de blocaje cauzate de utilitati, date, acces, compatibilitate sau lipsa documentelor`,
      `cerere de oferta structurata pentru decizie interna, finantare, licitatie sau achizitie directa`,
      `suport pentru evaluarea costului total, nu doar pentru pretul de achizitie al echipamentului`,
    ],
    implementation: [
      {
        title: "Clarificare aplicatie medicala",
        description: `Se stabileste ce servicii va sustine echipamentul: ${spec.clinicalUse}, volumul estimat, tipul pacientilor si rolul in fluxul clinic.`,
      },
      {
        title: "Configuratie si cerinte",
        description: `Se discuta configuratia, accesoriile, optiunile software, consumabilele si cerintele operationale care pot schimba bugetul si termenul.`,
      },
      {
        title: "Verificare infrastructura",
        description: `${spec.infrastructure} trebuie evaluata inainte de oferta finala, mai ales daca echipamentul are cerinte de spatiu, alimentare, date sau siguranta.`,
      },
      {
        title: "Integrare si fluxuri",
        description: `${spec.integration} se clarifica din faza comerciala pentru a evita achizitia unui echipament bun, dar greu de folosit in procesul real al clinicii.`,
      },
      {
        title: "Service si mentenanta",
        description: `${spec.service} se discuta inainte de achizitie, pentru ca disponibilitatea suportului poate conta la fel de mult ca performanta tehnica.`,
      },
      {
        title: "Oferta si decizie",
        description: `ZESCORP poate pregati o cerere structurata pentru oferta personalizata, consultanta sau analiza proiect, cu ipoteze si informatii lipsa clar mentionate.`,
      },
    ],
    deliverables: [
      `cerere de oferta pentru ${spec.equipment.toLowerCase()}`,
      `comparatie de configuratii si accesorii relevante pentru ${spec.clinicalUse}`,
      `brief tehnic-comercial pentru achizitie, licitatie sau proiect de dotare`,
      `lista de cerinte pentru ${spec.infrastructure}`,
      `recomandari pentru instalare, punere in functiune si suport post-vanzare`,
      `optiuni de service, mentenanta preventiva si contract de suport`,
    ],
    costFactors: [
      spec.budget,
      "configuratia aleasa, accesoriile, software-ul, licentele, consumabilele si documentatia disponibila",
      "instalarea, transportul, accesul in spatiu, pregatirea camerei si eventualele lucrari conexe",
      "nivelul de service, timpul de raspuns, mentenanta preventiva si durata de utilizare estimata",
      "cerintele de integrare cu sistemele existente si nivelul de suport cerut dupa livrare",
    ],
    procurementNotes: [
      "Stabileste utilizarea principala, volumul de lucru si termenul dorit.",
      "Pregateste datele despre spatiu, utilitati, IT, accesorii si echipamente existente.",
      "Cere oferta pe configuratie completa, nu doar pe echipamentul de baza.",
      "Include service-ul, mentenanta si suportul in analiza costului total.",
      "Pentru proiecte finantate sau licitatii, clarifica livrabilele si documentatia inainte de publicarea cererii.",
    ],
    whyZESCORP: equipmentWhyZescorp,
    internalLinks: [...spec.links, ...baseLinks].filter(
      (link, index, links) => links.findIndex((item) => item.href === link.href) === index,
    ),
    faqs: [
      {
        question: `Pot solicita oferta pentru ${spec.equipment.toLowerCase()} fara configuratie finala?`,
        answer:
          "Da. O cerere preliminara poate porni de la aplicatia medicala, bugetul orientativ, locatie si termen. Configuratia finala se clarifica dupa discutia tehnica si comerciala.",
      },
      {
        question: "De ce nu este afisat un pret fix?",
        answer:
          "Pretul depinde de configuratie, accesorii, software, instalare, servicii incluse, termen, locatie si conditiile comerciale. ZESCORP nu afiseaza preturi inventate sau stoc neconfirmat.",
      },
      {
        question: "Se poate include instalarea in oferta?",
        answer:
          "Da, daca proiectul o cere. Instalarea, punerea in functiune, integrarea, trainingul si mentenanta pot fi discutate impreuna cu echipamentul.",
      },
      {
        question: "Ce date ajuta la pregatirea ofertei?",
        answer:
          "Sunt utile specialitatea medicala, volumul de lucru, locatia, termenul, bugetul orientativ, spatiul disponibil, echipamentele existente si orice cerinte de integrare.",
      },
      {
        question: "Pot cere consultanta inainte de achizitie?",
        answer:
          "Da. Pentru proiecte medicale, consultanta inainte de achizitie poate reduce riscul de configuratie nepotrivita, costuri omise sau probleme la implementare.",
      },
      {
        question: "ZESCORP poate pregati documentatia pentru licitatie?",
        answer:
          "ZESCORP poate ajuta la structurarea cererii comerciale si a cerintelor tehnice preliminare. Specificatiile finale trebuie validate conform procedurilor beneficiarului si cerintelor aplicabile.",
      },
    ],
    commercialNarrative: [
      {
        title: "Cine ar trebui sa cumpere",
        body: `${spec.equipment} este potrivit pentru organizatii care au o nevoie medicala clara si vor o achizitie sustinuta de infrastructura, service si buget realist. Pentru ${spec.buyer}, valoarea apare cand echipamentul sustine fluxul clinic, reduce timpul pierdut si poate fi utilizat constant de echipa. O achizitie buna trebuie sa fie usor de justificat intern: ce servicii permite, ce volum poate sustine, ce riscuri elimina si ce suport va exista dupa instalare.`,
      },
      {
        title: "Beneficiu operational",
        body: `Beneficiul operational nu este doar performanta tehnica a echipamentului. Conteaza cat de repede este integrat, cat de simplu il foloseste personalul, cum se conecteaza la procesele existente si cat de clar este traseul de service. Pentru ${spec.clinicalUse}, o configuratie corecta poate imbunatati programarea pacientilor, disponibilitatea serviciului, predictibilitatea costurilor si increderea echipei in infrastructura medicala folosita zilnic.`,
      },
      {
        title: "Beneficiu financiar",
        body: `Achizitia trebuie analizata prin cost total: produs, accesorii, instalare, integrare, mentenanta, consumabile, training si timp de nefunctionare. ${spec.budget}. ZESCORP poate structura oferta astfel incat decidentii sa inteleaga ce este inclus, ce este optional, ce trebuie verificat si unde pot aparea costuri suplimentare. Aceasta claritate ajuta in achizitii directe, proiecte finantate sau licitatii.`,
      },
      {
        title: "Integrare cu infrastructura existenta",
        body: `${spec.infrastructure} poate influenta direct termenul si costul. Uneori echipamentul este disponibil, dar spatiul, utilitatile, datele sau fluxul pacientilor nu sunt pregatite. O discutie corecta inainte de oferta evita modificari tarzii, livrari incomplete sau responsabilitati neclare intre furnizor, constructor, IT si service. Pentru ZESCORP, echipamentul trebuie conectat la realitatea fizica si operationala a clinicii.`,
      },
      {
        title: "Instalare si punere in functiune",
        body: `Punerea in functiune trebuie tratata ca etapa comerciala si tehnica. Beneficiarul trebuie sa stie ce se livreaza, cine pregateste spatiul, ce accesorii sunt incluse, ce teste se fac, ce instruire este necesara si ce documente se predau. Pentru ${spec.equipment.toLowerCase()}, aceasta etapa este importanta mai ales cand echipamentul intra intr-un flux critic sau cand exista dependente de infrastructura si IT.`,
      },
      {
        title: "Service si mentenanta",
        body: `${spec.service}. Pentru achizitii medicale, suportul de dupa livrare poate face diferenta intre o investitie stabila si un echipament care produce blocaje. Contractele preventive, timpii de raspuns, disponibilitatea pieselor si istoricul interventiilor trebuie discutate inainte de decizie. ZESCORP poate include aceste elemente in oferta sau intr-un plan separat de suport.`,
      },
      {
        title: "Costuri si factori de buget",
        body: `Bugetul final depinde de configuratie, aplicatie, termen, servicii incluse si conditii comerciale. Pentru proiecte mari, costul echipamentului este doar o parte din investitie; trebuie adaugate pregatirea spatiului, integrarea, trainingul si mentenanta. ZESCORP nu promite preturi fixe fara date, dar poate pregati repere de ofertare si poate separa costurile obligatorii de cele optionale.`,
      },
      {
        title: "Urmatorul pas",
        body: `Cel mai eficient pas este o cerere scurta cu obiectivul medical, orasul, termenul, bugetul orientativ si orice document disponibil. Daca proiectul este la inceput, ZESCORP poate oferi consultanta pentru alegerea configuratiei. Daca exista deja un necesar, cererea poate deveni oferta personalizata. Daca echipamentul trebuie integrat intr-un proiect mai amplu, analiza poate include infrastructura, service si mentenanta.`,
      },
    ],
    productSchema: {
      category: spec.category,
      properties: spec.properties,
    },
    primaryCta: "Solicita oferta",
    secondaryCta: "Analiza proiect",
    consultationCta: "Cere consultanta",
    serviceType: spec.category,
    offerAngle: `${spec.equipment.toLowerCase()}, configuratie, instalare, service si mentenanta`,
  };
}

const specs: EquipmentLandingSpec[] = [
  {
    slug: "rmn",
    path: "/produse/rmn",
    title: "RMN",
    metadataTitle: "RMN pentru clinici si centre imagistica | Oferta ZESCORP",
    metadataDescription:
      "RMN pentru clinici si centre de imagistica: selectie echipament, camera RMN, RF shielding, instalare, service, mentenanta si oferta personalizata.",
    h1: "RMN pentru clinici si centre de imagistica medicala",
    eyebrow: "Imagistica medicala",
    keyword: "RMN",
    secondaryKeywords: ["aparat RMN", "camera RMN", "RF shielding RMN", "oferta RMN"],
    equipment: "RMN",
    buyer: "centre de imagistica, clinici private si spitale care planifica servicii de rezonanta magnetica",
    clinicalUse: "investigatii de rezonanta magnetica pentru diagnostic avansat si fluxuri imagistice cu volum ridicat",
    infrastructure: "camera RMN, RF shielding, alimentarea, climatizarea, accesul pacientilor si zona tehnica",
    integration: "integrarea cu PACS/RIS, fluxul de raportare, imprimare, arhivare si transmiterea imaginilor",
    service: "Service-ul si mentenanta pentru RMN trebuie planificate cu timpi de raspuns, verificari preventive si suport pentru infrastructura asociata",
    budget:
      "Bugetul pentru RMN este influentat de campul magnetic, configuratie, bobine, software, camera, ecranare RF, chiller, instalare si mentenanta",
    category: "Echipamente RMN",
    links: [
      { href: "/servicii/cusca-faraday-rmn", label: "Cusca Faraday RMN" },
      { href: "/servicii/rf-shielding-rmn", label: "RF Shielding RMN" },
      { href: "/servicii/camera-rmn-la-cheie", label: "Camera RMN la cheie" },
      { href: "/servicii/ecranare-electromagnetica-medicala", label: "Ecranare electromagnetica medicala" },
      { href: "/servicii/consultanta-cncan-radiologie", label: "Consultanta CNCAN" },
      { href: "/solutii-medicale/camere-rmn", label: "Camere RMN" },
      { href: "/services/rf-shielding", label: "RF shielding" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
    ],
    properties: [
      { label: "Aplicatie", value: "Imagistica prin rezonanta magnetica" },
      { label: "Infrastructura asociata", value: "Camera RMN, RF shielding, HVAC, acces si IT" },
      { label: "Servicii ZESCORP", value: "Consultanta, ofertare, instalare, service si mentenanta" },
    ],
  },
  {
    slug: "computer-tomograf",
    path: "/produse/computer-tomograf",
    title: "Computer tomograf",
    metadataTitle: "Computer tomograf CT pentru clinici | Oferta si infrastructura ZESCORP",
    metadataDescription:
      "Computer tomograf pentru clinici si centre medicale: selectie CT, camera CT, radioprotectie, instalare, service, mentenanta si oferta personalizata.",
    h1: "Computer tomograf CT pentru clinici si centre medicale",
    eyebrow: "CT si infrastructura imagistica",
    keyword: "computer tomograf",
    secondaryKeywords: ["CT medical", "camera CT", "oferta computer tomograf", "service CT"],
    equipment: "Computer tomograf CT",
    buyer: "clinici, spitale si centre de diagnostic care vor sa deschida sau sa modernizeze o linie CT",
    clinicalUse: "diagnostic CT, urgente, investigatii programate si servicii imagistice cu cerere comerciala ridicata",
    infrastructure: "camera CT, radioprotectia, alimentarea electrica, climatizarea, pardoseala, accesul si fluxul pacientilor",
    integration: "integrarea cu PACS/RIS, raportare, arhivare, imprimare DICOM si schimb de imagini",
    service: "Service-ul CT trebuie gandit impreuna cu mentenanta preventiva, disponibilitatea pieselor si suportul pentru downtime",
    budget:
      "Bugetul pentru CT depinde de numarul de slice-uri, tub, generator, software, injectomat, lucrari de camera, radioprotectie si service",
    category: "Echipamente CT",
    links: [
      { href: "/servicii/radioprotectie-ct", label: "Radioprotectie CT" },
      { href: "/servicii/proiectare-camera-rx", label: "Proiectare camera RX" },
      { href: "/servicii/radioprotectie", label: "Radioprotectie" },
      { href: "/servicii/consultanta-cncan-radiologie", label: "Consultanta CNCAN" },
      { href: "/solutii-medicale/camere-ct", label: "Camere CT" },
      { href: "/servicii/rx-room-design", label: "RX room design" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
    ],
    properties: [
      { label: "Aplicatie", value: "Tomografie computerizata" },
      { label: "Infrastructura asociata", value: "Camera CT, radioprotectie, HVAC si IT" },
      { label: "Servicii ZESCORP", value: "Oferta, instalare, radioprotectie, PACS si service" },
    ],
  },
  {
    slug: "radiologie-digitala",
    path: "/produse/radiologie-digitala",
    title: "Radiologie digitala",
    metadataTitle: "Radiologie digitala RX | Echipamente si ofertare ZESCORP",
    metadataDescription:
      "Radiologie digitala pentru clinici: echipamente RX, detector digital, camera RX, radioprotectie, PACS, instalare, service si oferta personalizata.",
    h1: "Radiologie digitala RX pentru clinici si centre de diagnostic",
    eyebrow: "RX digital",
    keyword: "radiologie digitala",
    secondaryKeywords: ["RX digital", "echipament radiologie digitala", "camera RX", "detector digital"],
    equipment: "Sistem de radiologie digitala",
    buyer: "clinici de radiologie, centre medicale, cabinete cu RX si investitori care pregatesc camera RX",
    clinicalUse: "investigatii RX digitale, flux rapid de examinare, arhivare DICOM si raportare imagistica",
    infrastructure: "camera RX, radioprotectia, pozitionarea aparatului, usa radioprotejata, alimentarea si fluxul de acces",
    integration: "integrarea cu PACS, imprimanta DICOM, statie de achizitie si flux de raportare",
    service: "Service-ul pentru radiologie digitala trebuie sa acopere detectorul, generatorul, statia, calibrarea si mentenanta preventiva",
    budget:
      "Bugetul depinde de tipul sistemului RX, detector, generator, masa, stativ, software, camera, radioprotectie si integrarea PACS",
    category: "Echipamente radiologie digitala",
    links: [
      { href: "/servicii/placare-plumb-camera-rx", label: "Placare plumb" },
      { href: "/servicii/amenajare-camera-radiologie", label: "Amenajare camera radiologie" },
      { href: "/servicii/radioprotectie", label: "Radioprotectie" },
      { href: "/servicii/consultanta-cncan-radiologie", label: "Consultanta CNCAN" },
      { href: "/servicii/rx-room-design", label: "RX room design" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie RX" },
      { href: "/servicii/proiectare-radiologie", label: "Proiectare radiologie" },
      { href: "/servicii/arhivare-pacs", label: "Arhivare PACS" },
    ],
    properties: [
      { label: "Aplicatie", value: "Radiologie digitala RX" },
      { label: "Infrastructura asociata", value: "Camera RX, radioprotectie, PACS si imprimare DICOM" },
      { label: "Servicii ZESCORP", value: "Proiectare, ofertare, instalare si service RX" },
    ],
  },
  {
    slug: "ecograf",
    path: "/produse/ecograf",
    title: "Ecograf",
    metadataTitle: "Ecograf pentru clinici si cabinete | Oferta ZESCORP",
    metadataDescription:
      "Ecograf pentru clinici, cabinete si spitale: selectie sonde, configuratie, aplicatii medicale, instalare, service, mentenanta si oferta personalizata.",
    h1: "Ecograf pentru clinici, cabinete si spitale",
    eyebrow: "Diagnostic si ecografie",
    keyword: "ecograf",
    secondaryKeywords: ["aparat ecografie", "ecograf medical", "oferta ecograf", "service ecografe"],
    equipment: "Ecograf medical",
    buyer: "clinici, cabinete multidisciplinare, centre de diagnostic si spitale care extind serviciile de ecografie",
    clinicalUse: "ecografie generala, cardiologie, ginecologie, vascular, musculoscheletal, urgente sau aplicatii specializate",
    infrastructure: "spatiul de consult, alimentarea, conectivitatea, mobilierul, igiena si fluxul pacientilor",
    integration: "integrarea cu imprimare, arhivare, export DICOM si eventual PACS/RIS",
    service: "Service-ul pentru ecograf include verificari, sonde, accesorii, software, calibrare si interventii pentru reducerea downtime-ului",
    budget:
      "Bugetul pentru ecograf este influentat de platforma, sonde, aplicatii software, mobilitate, garantie, service si accesorii",
    category: "Ecografe medicale",
    links: [
      { href: "/service-ecografe", label: "Service ecografe" },
      { href: "/contracte-mentenanta/mentenanta-ecografe", label: "Mentenanta ecografe" },
      { href: "/produse/monitor-pacient", label: "Monitor pacient" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
    ],
    properties: [
      { label: "Aplicatie", value: "Ecografie medicala" },
      { label: "Configuratie", value: "Console, sonde, software si accesorii" },
      { label: "Servicii ZESCORP", value: "Oferta, instalare, service si mentenanta" },
    ],
  },
  {
    slug: "mamograf",
    path: "/produse/mamograf",
    title: "Mamograf",
    metadataTitle: "Mamograf pentru clinici si screening | Oferta ZESCORP",
    metadataDescription:
      "Mamograf pentru clinici si centre de imagistica: selectie echipament, camera, radioprotectie, integrare PACS, service, mentenanta si oferta personalizata.",
    h1: "Mamograf pentru clinici, screening si centre de imagistica",
    eyebrow: "Imagistica mamara",
    keyword: "mamograf",
    secondaryKeywords: ["mamografie digitala", "oferta mamograf", "camera mamografie", "service mamograf"],
    equipment: "Mamograf digital",
    buyer: "clinici de imagistica, centre de screening, spitale si furnizori medicali care dezvolta servicii de mamografie",
    clinicalUse: "mamografie digitala, screening, diagnostic mamar si raportare imagistica",
    infrastructure: "camera de mamografie, radioprotectia, pozitionarea echipamentului, accesul pacientelor si zona de raportare",
    integration: "integrarea cu PACS/RIS, arhivare DICOM, statii de diagnostic si fluxul de programare",
    service: "Service-ul pentru mamograf trebuie sa includa mentenanta preventiva, verificari periodice, suport pentru detector si componente critice",
    budget:
      "Bugetul depinde de configuratie, detector, optiuni 2D/3D unde sunt solicitate, camera, radioprotectie, software, instalare si service",
    category: "Echipamente mamografie",
    links: [
      { href: "/servicii/radioprotectie-mamografie", label: "Radioprotectie mamografie" },
      { href: "/servicii/radioprotectie", label: "Radioprotectie" },
      { href: "/servicii/consultanta-cncan-radiologie", label: "Consultanta CNCAN" },
      { href: "/servicii/rx-room-design", label: "Design camera radiologie" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie" },
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/service-radiologie-romania", label: "Service radiologie" },
    ],
    properties: [
      { label: "Aplicatie", value: "Mamografie digitala" },
      { label: "Infrastructura asociata", value: "Camera mamografie, radioprotectie si PACS" },
      { label: "Servicii ZESCORP", value: "Oferta, instalare, service si mentenanta" },
    ],
  },
  {
    slug: "c-arm",
    path: "/produse/c-arm",
    title: "C-arm",
    metadataTitle: "C-arm pentru sali de interventii | Oferta ZESCORP",
    metadataDescription:
      "C-arm pentru chirurgie, ortopedie si interventii: selectie echipament, integrare sala, radioprotectie, instalare, service si oferta personalizata.",
    h1: "C-arm pentru sali de interventii, ortopedie si chirurgie",
    eyebrow: "Imagistica intraoperatorie",
    keyword: "C-arm",
    secondaryKeywords: ["arc C", "C-arm medical", "oferta C-arm", "service C-arm"],
    equipment: "C-arm",
    buyer: "spitale, clinici chirurgicale, centre ortopedice si unitati medicale care folosesc imagistica intraoperatorie",
    clinicalUse: "proceduri chirurgicale, ortopedie, traumatologie, durere, urologie sau interventii ghidate imagistic",
    infrastructure: "sala de interventii, alimentarea, mobilitatea echipamentului, radioprotectia personalului si fluxul steril",
    integration: "integrarea cu monitorizare, arhivare imagini, DICOM, imprimare si documentarea procedurilor",
    service: "Service-ul C-arm trebuie sa tina cont de detector, generator, monitoare, mobilitate, baterii unde exista si verificari preventive",
    budget:
      "Bugetul depinde de tipul detectorului, puterea generatorului, dimensiunea campului, software, monitoare, accesorii si service",
    category: "Echipamente C-arm",
    links: [
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie" },
      { href: "/service-radiologie-romania", label: "Service radiologie" },
      { href: "/produse/imprimanta-dicom", label: "Imprimanta DICOM" },
    ],
    properties: [
      { label: "Aplicatie", value: "Imagistica intraoperatorie" },
      { label: "Infrastructura asociata", value: "Sala interventii, radioprotectie si DICOM" },
      { label: "Servicii ZESCORP", value: "Oferta, instalare, service si mentenanta" },
    ],
  },
  {
    slug: "imprimanta-dicom",
    path: "/produse/imprimanta-dicom",
    title: "Imprimanta DICOM",
    metadataTitle: "Imprimanta DICOM pentru imagistica medicala | Oferta ZESCORP",
    metadataDescription:
      "Imprimanta DICOM pentru radiologie si imagistica: integrare cu PACS, CT, RMN, RX, consumabile, service, mentenanta si oferta personalizata.",
    h1: "Imprimanta DICOM pentru radiologie si imagistica medicala",
    eyebrow: "DICOM si flux imagistic",
    keyword: "imprimanta DICOM",
    secondaryKeywords: ["printer DICOM", "imprimare imagistica medicala", "PACS DICOM", "film medical"],
    equipment: "Imprimanta DICOM",
    buyer: "centre de imagistica, clinici de radiologie si spitale care au nevoie de imprimare medicala integrata",
    clinicalUse: "printare imagini DICOM din CT, RMN, RX, mamografie, C-arm sau alte echipamente de imagistica",
    infrastructure: "reteaua IT, statia de lucru, PACS-ul, consumabilele, spatiul de operare si fluxul de predare rezultate",
    integration: "integrarea cu PACS/RIS, modalitati DICOM, arhivare, statii de diagnostic si politici de lucru",
    service: "Service-ul pentru imprimanta DICOM include consumabile, calibrare, conectivitate, mentenanta si suport pentru blocaje de flux",
    budget:
      "Bugetul depinde de tehnologia de imprimare, volum, consumabile, compatibilitatea DICOM, service si costul total pe termen lung",
    category: "Echipamente DICOM",
    links: [
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/servicii/arhivare-pacs", label: "Arhivare PACS" },
      { href: "/produse/radiologie-digitala", label: "Radiologie digitala" },
      { href: "/produse/computer-tomograf", label: "Computer tomograf" },
    ],
    properties: [
      { label: "Aplicatie", value: "Imprimare imagistica DICOM" },
      { label: "Integrare", value: "PACS, RIS, CT, RMN, RX si statii de lucru" },
      { label: "Servicii ZESCORP", value: "Oferta, integrare, service si consumabile" },
    ],
  },
  {
    slug: "ups-medical",
    path: "/produse/ups-medical",
    title: "UPS medical",
    metadataTitle: "UPS medical pentru echipamente critice | Oferta ZESCORP",
    metadataDescription:
      "UPS medical pentru clinici, imagistica, laborator si echipamente critice: dimensionare, instalare, mentenanta, service si oferta personalizata.",
    h1: "UPS medical pentru echipamente critice si infrastructura clinica",
    eyebrow: "Infrastructura electrica medicala",
    keyword: "UPS medical",
    secondaryKeywords: ["UPS aparatura medicala", "UPS clinica", "UPS imagistica", "alimentare echipamente medicale"],
    equipment: "UPS medical",
    buyer: "clinici, laboratoare, centre de imagistica si spitale care vor continuitate electrica pentru echipamente critice",
    clinicalUse: "protectia echipamentelor medicale, reducerea intreruperilor si sustinerea fluxurilor critice in caz de instabilitate electrica",
    infrastructure: "reteaua electrica, tablourile, sarcinile critice, autonomia dorita, spatiul tehnic si mentenanta bateriilor",
    integration: "integrarea cu echipamente medicale, infrastructura IT, PACS, laborator, monitorizare si eventual sisteme de avertizare",
    service: "Service-ul UPS include verificari preventive, baterii, teste de sarcina, inlocuiri programate si interventii pentru continuitate",
    budget:
      "Bugetul depinde de putere, autonomie, redundanta, baterii, instalare, monitorizare, mentenanta si criticitatea echipamentelor protejate",
    category: "UPS medical si infrastructura electrica",
    links: [
      { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
      { href: "/services/constructii-medicale", label: "Constructii medicale" },
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
      { href: "/produse/computer-tomograf", label: "Computer tomograf" },
    ],
    properties: [
      { label: "Aplicatie", value: "Protectie electrica pentru echipamente medicale" },
      { label: "Parametri", value: "Putere, autonomie, redundanta si mentenanta baterii" },
      { label: "Servicii ZESCORP", value: "Dimensionare, instalare, service si mentenanta" },
    ],
  },
  {
    slug: "monitor-pacient",
    path: "/produse/monitor-pacient",
    title: "Monitor pacient",
    metadataTitle: "Monitor pacient pentru clinici si spitale | Oferta ZESCORP",
    metadataDescription:
      "Monitor pacient pentru clinici, ATI, urgenta si sali de interventii: configuratie, accesorii, instalare, service, mentenanta si oferta personalizata.",
    h1: "Monitor pacient pentru clinici, ATI, urgente si sali de interventii",
    eyebrow: "Monitorizare pacient",
    keyword: "monitor pacient",
    secondaryKeywords: ["monitor multiparametric", "monitor functii vitale", "oferta monitor pacient", "service monitor pacient"],
    equipment: "Monitor pacient multiparametric",
    buyer: "clinici, spitale, centre chirurgicale, ATI, UPU si cabinete care monitorizeaza pacienti in fluxuri critice",
    clinicalUse: "monitorizarea functiilor vitale, supravegherea pacientilor, proceduri, recuperare si situatii clinice care necesita control continuu",
    infrastructure: "paturile, carucioarele, alimentarea, suporturile, reteaua, accesoriile si fluxul de lucru al personalului medical",
    integration: "integrarea cu accesorii, statii centrale, export date, alarme si eventual sisteme clinice existente",
    service: "Service-ul pentru monitor pacient include cabluri, senzori, baterii, display, alarme, verificari si mentenanta preventiva",
    budget:
      "Bugetul depinde de parametrii monitorizati, accesorii, ecran, baterie, conectivitate, numar de unitati si suportul inclus",
    category: "Monitorizare pacient",
    links: [
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
      { href: "/produse/ups-medical", label: "UPS medical" },
      { href: "/produse/ecograf", label: "Ecograf" },
    ],
    properties: [
      { label: "Aplicatie", value: "Monitorizare functii vitale" },
      { label: "Configuratie", value: "Parametri, accesorii, baterie si conectivitate" },
      { label: "Servicii ZESCORP", value: "Oferta, accesorii, service si mentenanta" },
    ],
  },
  {
    slug: "pacs-ris",
    path: "/produse/pacs-ris",
    title: "PACS RIS",
    metadataTitle: "PACS RIS pentru imagistica medicala | Oferta ZESCORP",
    metadataDescription:
      "PACS RIS pentru clinici si radiologie: arhivare imagini, flux DICOM, raportare, diagnostic la distanta, integrare, suport si oferta personalizata.",
    h1: "PACS RIS pentru clinici, radiologie si centre de imagistica",
    eyebrow: "Software imagistica",
    keyword: "PACS RIS",
    secondaryKeywords: ["PACS medical", "RIS radiologie", "arhivare DICOM", "diagnostic la distanta"],
    equipment: "PACS RIS",
    buyer: "centre de imagistica, clinici de radiologie si spitale care vor arhivare, raportare si flux digital coerent",
    clinicalUse: "arhivare imagini, management radiologie, raportare, acces medici, diagnostic la distanta si colaborare imagistica",
    infrastructure: "servere, stocare, retea, securitate, statii de diagnostic, modalitati DICOM si politici de backup",
    integration: "integrarea cu CT, RMN, RX, ecograf, C-arm, imprimante DICOM, programari, raportare si acces extern",
    service: "Suportul PACS RIS include configurare, utilizatori, backup, conectivitate DICOM, mentenanta si asistenta operationala",
    budget:
      "Bugetul depinde de numarul de utilizatori, modalitati conectate, stocare, licente, servicii de integrare, suport si mentenanta",
    category: "PACS RIS",
    links: [
      { href: "/servicii/pacs-medical", label: "PACS medical" },
      { href: "/servicii/arhivare-pacs", label: "Arhivare PACS" },
      { href: "/servicii/diagnostic-la-distanta", label: "Diagnostic la distanta" },
      { href: "/produse/imprimanta-dicom", label: "Imprimanta DICOM" },
    ],
    properties: [
      { label: "Aplicatie", value: "PACS, RIS, DICOM si arhivare imagistica" },
      { label: "Integrare", value: "CT, RMN, RX, ecograf, C-arm si imprimante DICOM" },
      { label: "Servicii ZESCORP", value: "Consultanta, configurare, integrare si suport" },
    ],
  },
];

export const medicalEquipmentLandings: SeoCommercialLanding[] = specs.map(buildEquipmentLanding);
