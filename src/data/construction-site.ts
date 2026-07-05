import { companyContact } from "@/lib/brand";

export const constructionDomain = "https://constructii.zescorp.ro";

const constructionWhatsappMessage =
  "Buna, vreau o evaluare pentru o lucrare rezidentiala. Localitate: ... Tip lucrare: ... Stadiu: ...";

export const constructionSite = {
  name: "ZES Construct",
  legalName: companyContact.legalName,
  domain: constructionDomain,
  email: companyContact.email,
  emailHref: companyContact.emailHref,
  phone: companyContact.phone,
  phoneHref: companyContact.phoneHref,
  whatsappHref: `${companyContact.whatsappHref}?text=${encodeURIComponent(
    constructionWhatsappMessage,
  )}`,
  address: companyContact.address,
  areas: ["Romania", "Bucuresti", "Ilfov", "Arges"],
  priorityAreas: ["Bucuresti", "Ilfov", "Arges"],
  tagline: "Constructii, renovari si amenajari rezidentiale in Romania",
  description:
    "Echipa ZES pentru proiecte rezidentiale in Romania: renovari apartamente, amenajari interioare, constructii case, finisaje, instalatii si coordonare de santier, cu prioritate pentru Bucuresti, Ilfov si Arges.",
};

export type ConstructionServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  problems: string[];
  deliverables: string[];
  process: string[];
  proof: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  related: string[];
  intent?: "seo" | "ads";
  conversionPoints?: string[];
  qualification?: string[];
  defaultProjectType?: string;
  defaultTimeline?: string;
  defaultBudgetRange?: string;
  defaultPropertyStatus?: string;
  leadFormTitle?: string;
  leadFormDescription?: string;
};

export const constructionHeroImage =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=86";

const apartmentImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80";
const interiorImage =
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80";
const bathroomImage =
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1400&q=80";
const houseImage =
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80";
const planningImage =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80";

export const constructionServices: ConstructionServicePage[] = [
  {
    slug: "renovari-apartamente",
    title: "Renovari apartamente Bucuresti si Ilfov",
    shortTitle: "Renovari apartamente",
    metaTitle: "Renovari apartamente Bucuresti si Ilfov | ZES Construct",
    metaDescription:
      "Renovari apartamente Bucuresti si Ilfov: decopertari, instalatii, finisaje, baie, bucatarie, compartimentari usoare, deviz si coordonare santier.",
    lead:
      "Renovari complete sau etapizate pentru apartamente locuite, inchiriate ori pregatite pentru vanzare.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Apartament renovat cu finisaje moderne",
    keywords: [
      "renovari apartamente Bucuresti",
      "renovare apartament Ilfov",
      "firma renovari apartamente",
      "amenajari apartamente",
    ],
    problems: [
      "Devize greu de comparat si lucrari care se lungesc fara control.",
      "Instalatii vechi ascunse sub finisaje noi.",
      "Coordonare slaba intre mesteri, materiale si termene.",
    ],
    deliverables: [
      "Evaluare initiala si lista clara de interventii.",
      "Deviz pe etape: demolari, instalatii, pereti, pardoseli, finisaje.",
      "Plan de santier cu prioritati, termene si puncte de receptie.",
      "Recomandari pentru materiale rezistente si usor de intretinut.",
    ],
    process: [
      "Vizita tehnica si masuratori.",
      "Deviz transparent cu scenarii de buget.",
      "Programare echipe si aprovizionare.",
      "Executie pe etape si receptie finala.",
    ],
    proof:
      "Potrivit pentru apartamente de bloc, garsoniere, locuinte pentru inchiriere si renovari dupa achizitie.",
    faq: [
      {
        question: "Cat dureaza renovarea unui apartament?",
        answer:
          "Depinde de suprafata, instalatii si nivelul finisajelor. Dupa vizita tehnica pregatim un calendar realist pe etape.",
      },
      {
        question: "Puteti lucra si etapizat?",
        answer:
          "Da. Putem prioritiza baia, bucataria, instalatiile sau finisajele, in functie de buget si termen.",
      },
      {
        question: "Oferiti deviz inainte de inceperea lucrarii?",
        answer:
          "Da. Pornim cu o estimare structurata si o rafinam dupa masuratori, fotografii si selectie materiale.",
      },
    ],
    related: ["amenajari-interioare", "renovari-baie-bucatarie"],
  },
  {
    slug: "amenajari-interioare",
    title: "Amenajari interioare rezidentiale",
    shortTitle: "Amenajari interioare",
    metaTitle: "Amenajari interioare Bucuresti si Ilfov | Case si apartamente",
    metaDescription:
      "Amenajari interioare Bucuresti si Ilfov pentru case si apartamente: compartimentari, glet, zugraveli, pardoseli, iluminat, finisaje si santier coordonat.",
    lead:
      "Transformam spatiile interioare in locuinte functionale, curate si usor de folosit zi de zi.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Interior rezidential amenajat modern",
    keywords: [
      "amenajari interioare Bucuresti",
      "amenajari interioare apartamente",
      "amenajari case Ilfov",
      "finisaje interioare",
    ],
    problems: [
      "Design frumos pe hartie, dar greu de executat in buget.",
      "Finisaje alese fara legatura cu traficul real al locuintei.",
      "Detalii mici care apar tarziu: prize, lumini, muchii, plinte, usi.",
    ],
    deliverables: [
      "Plan de finisaje si prioritati functionale.",
      "Executie pentru pereti, pardoseli, plafoane, iluminat si detalii.",
      "Coordonare cu furnizorii de usi, mobilier si instalatii.",
      "Predare curata, cu lista de verificare la receptie.",
    ],
    process: [
      "Clarificam stilul, bugetul si constrangerile tehnice.",
      "Stabilim ordinea lucrarilor si materialele.",
      "Executam finisajele cu verificari intermediare.",
      "Corectam detaliile finale inainte de receptie.",
    ],
    proof:
      "Potrivit pentru apartamente noi, case la gri, locuinte vechi si spatii care trebuie aduse rapid la standard de locuire.",
    faq: [
      {
        question: "Faceti si finisaje premium?",
        answer:
          "Da, dar recomandam alegerea materialelor dupa trafic, umiditate si buget, nu doar dupa aspect.",
      },
      {
        question: "Puteti coordona si mobilierul?",
        answer:
          "Putem corela amenajarea cu masuratorile si pregatirile necesare pentru mobilier, electrice si corpuri de iluminat.",
      },
      {
        question: "Lucrati cu proiect de design?",
        answer:
          "Da. Putem executa dupa proiect existent sau putem ajuta la structurarea unei solutii practice pentru santier.",
      },
    ],
    related: ["renovari-apartamente", "renovari-baie-bucatarie"],
  },
  {
    slug: "constructii-case",
    title: "Constructii case si extinderi rezidentiale",
    shortTitle: "Constructii case",
    metaTitle: "Constructii case Bucuresti si Ilfov | ZES Construct",
    metaDescription:
      "Constructii case Bucuresti si Ilfov: lucrari la rosu, zidarie, acoperis, extinderi, instalatii, finisaje, deviz etapizat si coordonare santier.",
    lead:
      "Pentru proprietari care vor o executie coordonata, cu etape clare si control al deciziilor importante.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Casa rezidentiala finalizata",
    keywords: [
      "constructii case Bucuresti",
      "constructii case Ilfov",
      "firma constructii case",
      "case la rosu",
    ],
    problems: [
      "Etape critice tratate separat, fara coordonare generala.",
      "Costuri suplimentare aparute din detalii neclarificate la inceput.",
      "Aprovizionare, echipe si receptii fara responsabil unic.",
    ],
    deliverables: [
      "Planificare pe etape: fundatie, structura, inchideri, instalatii, finisaje.",
      "Coordonare santier si comunicare periodica.",
      "Deviz etapizat si recomandari de optimizare.",
      "Lista de verificare pentru receptii intermediare.",
    ],
    process: [
      "Analizam proiectul, terenul si autorizatiile disponibile.",
      "Stabilim etapele si responsabilitatile.",
      "Executam lucrarile prioritare cu verificari pe faze.",
      "Pregatim receptia si eventualele lucrari ramase.",
    ],
    proof:
      "Potrivit pentru case individuale, extinderi, anexe, mansardari si modernizari structurale usoare.",
    faq: [
      {
        question: "Preluati lucrari la rosu sau la cheie?",
        answer:
          "Putem discuta ambele variante. Recomandam inceperea cu etapa cea mai clara din proiect si un deviz separat pe faze.",
      },
      {
        question: "Avem nevoie de proiect tehnic?",
        answer:
          "Pentru lucrari structurale si constructii noi este necesara documentatie tehnica. Putem lucra pe baza documentelor disponibile.",
      },
      {
        question: "Puteti continua o lucrare inceputa?",
        answer:
          "Da, dupa verificarea stadiului existent, calitatii lucrarilor si riscurilor ramase.",
      },
    ],
    related: ["amenajari-interioare", "management-santier"],
  },
  {
    slug: "renovari-baie-bucatarie",
    title: "Renovari bai si bucatarii",
    shortTitle: "Bai si bucatarii",
    metaTitle: "Renovari baie si bucatarie Bucuresti | Instalatii si finisaje",
    metaDescription:
      "Renovari baie si bucatarie in Bucuresti si Ilfov: instalatii sanitare si electrice, placari, pardoseli, ventilatie, mobilier pregatit si finisaje.",
    lead:
      "Zonele cu apa, electric si trafic intens cer planificare buna inainte de finisaje.",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Baie renovata cu finisaje deschise",
    keywords: [
      "renovare baie Bucuresti",
      "renovare bucatarie",
      "amenajare baie apartament",
      "instalatii sanitare apartament",
    ],
    problems: [
      "Infiltratii sau pante gresite descoperite dupa montaj.",
      "Prize, corpuri si trasee gandite prea tarziu.",
      "Placari frumoase, dar greu de intretinut sau nepotrivite pentru spatiu.",
    ],
    deliverables: [
      "Plan de instalatii si pozitii pentru obiecte sanitare/electrice.",
      "Pregatire suprafete, hidroizolatii si placari.",
      "Coordonare cu mobilier, electrocasnice si corpuri sanitare.",
      "Testari si receptie pe puncte critice.",
    ],
    process: [
      "Masuram si verificam traseele existente.",
      "Confirmam layout-ul si materialele.",
      "Executam instalatiile inainte de finisaje.",
      "Predam lucrarea cu verificari functionale.",
    ],
    proof:
      "Potrivit pentru bai mici de bloc, bucatarii open-space, locuinte vechi si renovari rapide inainte de mutare.",
    faq: [
      {
        question: "Puteti schimba instalatiile vechi?",
        answer:
          "Da. Verificam traseele si recomandam inlocuirea lor cand exista risc de pierderi, suprasarcina sau incompatibilitati.",
      },
      {
        question: "Lucrati cu materiale cumparate de client?",
        answer:
          "Da, daca sunt compatibile cu lucrarea. Putem semnala din timp materialele cu risc de montaj sau intretinere.",
      },
      {
        question: "Cat de repede se poate face o baie?",
        answer:
          "Termenul depinde de demolare, instalatii, uscare si finisaje. Il stabilim realist dupa inspectie.",
      },
    ],
    related: ["renovari-apartamente", "amenajari-interioare"],
  },
  {
    slug: "management-santier",
    title: "Management de santier rezidential",
    shortTitle: "Management santier",
    metaTitle: "Management santier rezidential | Coordonare renovari si constructii",
    metaDescription:
      "Management de santier pentru renovari si constructii rezidentiale: planificare, devize, echipe, materiale, termene, verificari si receptii.",
    lead:
      "Coordonare pentru proprietari care nu vor sa piarda controlul asupra termenelor, costurilor si calitatii.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Santier rezidential coordonat",
    keywords: [
      "management santier rezidential",
      "coordonare renovare apartament",
      "diriginte santier locuinta",
      "coordonare constructii Bucuresti",
    ],
    problems: [
      "Prea multe decizii tehnice ajung la proprietar fara context.",
      "Costuri care cresc pentru ca materialele si echipele nu sunt sincronizate.",
      "Receptii facute la final, cand corectiile sunt scumpe.",
    ],
    deliverables: [
      "Plan de lucrari si responsabilitati.",
      "Centralizare devize, materiale si prioritati.",
      "Verificari intermediare si comunicare structurata.",
      "Lista de punch-uri pentru receptie.",
    ],
    process: [
      "Auditam stadiul si documentele.",
      "Clarificam ce trebuie controlat: cost, timp, calitate sau toate.",
      "Urmarim etapele si blocajele.",
      "Inchidem lucrarea cu receptie si lista de corectii.",
    ],
    proof:
      "Potrivit cand proprietarul lucreaza la distanta, cand sunt mai multe echipe sau cand proiectul are termen strict.",
    faq: [
      {
        question: "Puteti doar coordona, fara executie?",
        answer:
          "Da, putem discuta o implicare de coordonare, audit sau verificare pe etape.",
      },
      {
        question: "Ajuta la reducerea costurilor?",
        answer:
          "Ajuta mai ales la evitarea refacerilor, intarzierilor si achizitiilor gresite.",
      },
      {
        question: "Primim raportari?",
        answer:
          "Da. Stabilim un ritm de comunicare si ce informatii trebuie raportate: progres, blocaje, decizii si costuri.",
      },
    ],
    related: ["constructii-case", "renovari-apartamente"],
  },
];

export const constructionSeoPages: ConstructionServicePage[] = [
  {
    slug: "renovari-apartamente-bucuresti",
    title: "Renovari apartamente Bucuresti",
    shortTitle: "Renovari Bucuresti",
    metaTitle: "Renovari apartamente Bucuresti | Deviz si executie coordonata",
    metaDescription:
      "Renovari apartamente Bucuresti pentru locuinte vechi sau noi: instalatii, finisaje, baie, bucatarie, deviz etapizat si coordonare santier.",
    lead:
      "Pentru apartamente din Bucuresti unde trebuie tinute sub control accesul, zgomotul, aprovizionarea si etapele de lucru.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Apartament din Bucuresti renovat cu finisaje luminoase",
    keywords: [
      "renovari apartamente Bucuresti",
      "firma renovari apartamente Bucuresti",
      "renovare apartament Bucuresti",
      "deviz renovare apartament Bucuresti",
    ],
    problems: [
      "Apartamentele vechi pot ascunde instalatii electrice si sanitare care trebuie verificate inainte de finisaje.",
      "Accesul in bloc, transportul materialelor si evacuarea molozului trebuie planificate din timp.",
      "Termenele se lungesc cand baia, bucataria si finisajele nu sunt ordonate corect.",
    ],
    deliverables: [
      "Evaluare initiala pe suprafata, stadiu si poze sau vizita tehnica.",
      "Deviz separat pentru demolari, instalatii, glet, zugraveli, pardoseli si finisaje.",
      "Plan de aprovizionare si evacuare pentru blocuri din Bucuresti.",
      "Receptie pe etape pentru lucrarile ascunse si finisajele finale.",
    ],
    process: [
      "Clarificam sectorul, accesul si stadiul apartamentului.",
      "Stabilim lucrarile obligatorii inainte de finisaje.",
      "Programam echipele si materialele pe etape.",
      "Predam cu lista de verificare pentru baie, bucatarie, camere si instalatii.",
    ],
    proof:
      "Potrivit pentru apartamente de bloc, garsoniere, locuinte pentru inchiriere, renovari dupa achizitie si apartamente pregatite pentru vanzare.",
    faq: [
      {
        question: "Puteti renova apartamente locuite in Bucuresti?",
        answer:
          "Da, daca lucrarea poate fi impartita in etape realiste. Stabilim zonele de lucru, accesul si perioadele in care locuinta poate ramane folosibila.",
      },
      {
        question: "Se poate primi un deviz initial din poze?",
        answer:
          "Da. Pentru o prima estimare sunt utile pozele, suprafata, sectorul, anul blocului si lista lucrarilor dorite.",
      },
      {
        question: "Gestionati si molozul?",
        answer:
          "Luam in calcul evacuarea si logistica in planul lucrarii, mai ales pentru blocurile cu acces dificil sau reguli stricte.",
      },
    ],
    related: [
      "renovari-apartamente",
      "deviz-renovare-apartament-bucuresti",
      "renovari-baie-bucatarie-bucuresti",
    ],
  },
  {
    slug: "renovari-apartamente-sector-3",
    title: "Renovari apartamente Sector 3",
    shortTitle: "Renovari Sector 3",
    metaTitle: "Renovari apartamente Sector 3 Bucuresti | ZES Construct",
    metaDescription:
      "Renovari apartamente Sector 3: evaluare pentru blocuri vechi si noi, instalatii, baie, bucatarie, finisaje, deviz si santier coordonat.",
    lead:
      "Lucrari pentru apartamente din Sector 3, de la renovari dupa achizitie pana la pregatirea locuintei pentru inchiriere.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Living de apartament renovat pentru locuire",
    keywords: [
      "renovari apartamente Sector 3",
      "firma renovari Sector 3",
      "renovare apartament Titan",
      "renovare apartament Dristor",
    ],
    problems: [
      "Blocurile vechi din zona pot avea instalatii depasite care trebuie verificate inainte de placari si zugraveli.",
      "Apartamentele cumparate pentru inchiriere cer decizii rapide, dar materiale rezistente la uzura.",
      "Timpul pierdut cu materiale si acces poate intarzia inutil o lucrare relativ simpla.",
    ],
    deliverables: [
      "Lista clara de lucrari pentru baie, bucatarie, camere si instalatii.",
      "Recomandari de materiale potrivite pentru locuire sau inchiriere.",
      "Deviz pe etape, cu lucrari prioritare si optionale separate.",
      "Coordonare pentru aprovizionare, echipe si receptie finala.",
    ],
    process: [
      "Discutam zona exacta, accesul si intervalul dorit.",
      "Verificam stadiul apartamentului si lucrarile ascunse.",
      "Propunem ordinea lucrarilor ca sa reducem refacerile.",
      "Inchidem santierul cu verificari pe finisaje si functionare.",
    ],
    proof:
      "Relevant pentru Titan, Dristor, Vitan, Baba Novac, Theodor Pallady si zone apropiate din Sector 3.",
    faq: [
      {
        question: "Lucrati in Titan si Dristor?",
        answer:
          "Da, putem evalua lucrari in Sector 3 si zonele apropiate, in functie de calendar si complexitatea renovarii.",
      },
      {
        question: "Ce lucrari sunt prioritare intr-un apartament vechi?",
        answer:
          "De obicei verificam instalatiile, hidroizolatiile, peretii afectati si pardoselile inainte de finisajele vizibile.",
      },
      {
        question: "Puteti lucra rapid pentru inchiriere?",
        answer:
          "Da, daca scopul este clar. Separaram lucrarile obligatorii de cele estetice pentru a nu bloca bugetul.",
      },
    ],
    related: ["renovari-apartamente-bucuresti", "renovari-baie-bucatarie", "amenajari-interioare"],
  },
  {
    slug: "renovari-apartamente-popesti-leordeni",
    title: "Renovari apartamente Popesti-Leordeni",
    shortTitle: "Renovari Popesti",
    metaTitle: "Renovari apartamente Popesti-Leordeni | Finisaje si deviz",
    metaDescription:
      "Renovari apartamente Popesti-Leordeni pentru locuinte noi sau vechi: finisaje, baie, bucatarie, electrice, sanitare si coordonare.",
    lead:
      "Pentru apartamente noi sau recent cumparate in Popesti-Leordeni, unde finisajele, modificarile si mutarea trebuie sincronizate.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Apartament nou amenajat cu bucatarie si living",
    keywords: [
      "renovari apartamente Popesti-Leordeni",
      "amenajari apartamente Popesti",
      "renovare apartament nou Popesti",
      "firma renovari Popesti-Leordeni",
    ],
    problems: [
      "Apartamentele noi pot avea nevoie de ajustari la electrice, iluminat, baie si bucatarie inainte de mobilare.",
      "Termenul de mutare preseaza deciziile de materiale si finisaje.",
      "Modificarile aparent mici pot afecta mobilierul, electrocasnicele si receptia finala.",
    ],
    deliverables: [
      "Plan de finisaje si pregatiri pentru mobilier.",
      "Verificare prize, iluminat, obiecte sanitare si zone umede.",
      "Deviz pentru lucrari rapide inainte de mutare.",
      "Coordonare cu livrarile de materiale si furnizorii de mobilier.",
    ],
    process: [
      "Stabilim termenul de mutare si lucrarile obligatorii.",
      "Verificam planul apartamentului si zonele tehnice.",
      "Executam finisajele in ordinea corecta.",
      "Predam apartamentul pregatit pentru mobilare sau locuire.",
    ],
    proof:
      "Potrivit pentru apartamente noi, renovari usoare, bai si bucatarii, finisaje inainte de mutare si pregatiri pentru inchiriere.",
    faq: [
      {
        question: "Puteti interveni in apartamente noi?",
        answer:
          "Da. Verificam ce este deja executat si ce trebuie adaptat pentru mobilier, iluminat, baie, bucatarie sau finisaje.",
      },
      {
        question: "Se poate lucra inainte de montajul mobilei?",
        answer:
          "Da, este chiar recomandat. Pregatim peretii, prizele, traseele si finisajele inainte de montaj.",
      },
      {
        question: "Lucrati si pentru garsoniere?",
        answer:
          "Da, putem evalua si garsoniere sau apartamente mici, mai ales cand lucrarea are termen clar.",
      },
    ],
    related: ["amenajari-interioare", "renovari-apartamente-bucuresti", "renovari-baie-bucatarie-bucuresti"],
  },
  {
    slug: "renovari-apartamente-bragadiru",
    title: "Renovari apartamente Bragadiru",
    shortTitle: "Renovari Bragadiru",
    metaTitle: "Renovari apartamente Bragadiru | Amenajari si finisaje",
    metaDescription:
      "Renovari apartamente Bragadiru: amenajari interioare, finisaje, baie, bucatarie, instalatii si deviz pentru locuinte noi sau vechi.",
    lead:
      "Lucrari pentru apartamente si locuinte din Bragadiru unde sunt importante finisajele, pregatirea pentru mutare si controlul bugetului.",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Baie renovata intr-o locuinta rezidentiala",
    keywords: [
      "renovari apartamente Bragadiru",
      "amenajari interioare Bragadiru",
      "firma renovari Bragadiru",
      "renovare baie Bragadiru",
    ],
    problems: [
      "Locuintele noi pot avea finisaje standard care trebuie adaptate la folosirea reala.",
      "Bucataria si baia cer verificari inainte de mobilier, electrocasnice si placari finale.",
      "Bugetul se poate dezechilibra cand lucrarile mici sunt decise dupa inceperea santierului.",
    ],
    deliverables: [
      "Evaluare pentru finisaje, baie, bucatarie si lucrari de adaptare.",
      "Plan de materiale si ordinea etapelor inainte de mutare.",
      "Deviz separat pentru lucrari obligatorii si imbunatatiri optionale.",
      "Coordonare pana la predarea locuintei pregatite de folosire.",
    ],
    process: [
      "Clarificam tipul locuintei si termenul dorit.",
      "Stabilim ce trebuie rezolvat inainte de mobilier.",
      "Executam lucrarile tehnice si finisajele.",
      "Verificam detaliile finale si predam lucrarea.",
    ],
    proof:
      "Potrivit pentru apartamente noi, renovari inainte de mutare, bai, bucatarii si amenajari interioare in Bragadiru.",
    faq: [
      {
        question: "Lucrati in Bragadiru si zonele apropiate?",
        answer:
          "Da, evaluam lucrari in Bragadiru si in apropiere, in functie de acces, amploare si calendar.",
      },
      {
        question: "Puteti face doar baia sau bucataria?",
        answer:
          "Da. Putem prelua lucrari punctuale, cu verificarea instalatiilor si a finisajelor critice.",
      },
      {
        question: "Ce informatii trimit pentru oferta?",
        answer:
          "Sunt utile pozele, suprafata, tipul locuintei, lucrarile dorite, termenul si bugetul estimativ.",
      },
    ],
    related: ["renovari-apartamente", "amenajari-interioare", "renovari-baie-bucatarie-bucuresti"],
  },
  {
    slug: "amenajari-interioare-bucuresti",
    title: "Amenajari interioare Bucuresti",
    shortTitle: "Amenajari Bucuresti",
    metaTitle: "Amenajari interioare Bucuresti | Apartamente si case",
    metaDescription:
      "Amenajari interioare Bucuresti pentru apartamente si case: finisaje, compartimentari, pardoseli, iluminat, baie, bucatarie si coordonare.",
    lead:
      "Amenajari interioare pentru locuinte care trebuie sa arate bine, dar mai ales sa functioneze corect zi de zi.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Amenajare interioara moderna pentru apartament",
    keywords: [
      "amenajari interioare Bucuresti",
      "firma amenajari interioare Bucuresti",
      "finisaje interioare Bucuresti",
      "amenajari apartamente Bucuresti",
    ],
    problems: [
      "Finisajele alese doar dupa aspect pot fi greu de intretinut sau nepotrivite pentru trafic.",
      "Prizele, luminile si traseele trebuie stabilite inainte de glet, lavabila si mobilier.",
      "Fara coordonare, furnizorii de usi, mobilier si corpuri de iluminat se incurca intre ei.",
    ],
    deliverables: [
      "Plan de finisaje si detalii functionale.",
      "Executie pentru pereti, pardoseli, plafoane, lumini si detalii de montaj.",
      "Coordonare cu masuratorile pentru usi, mobilier si corpuri sanitare.",
      "Receptie pe zone: camere, hol, baie, bucatarie si detalii finale.",
    ],
    process: [
      "Clarificam stilul, folosirea locuintei si bugetul.",
      "Stabilim ordinea materialelor si lucrarilor.",
      "Executam finisajele cu verificari intermediare.",
      "Corectam detaliile inainte de predare.",
    ],
    proof:
      "Potrivit pentru apartamente noi, apartamente vechi, case la gri, locuinte pentru familie si proprietati pentru inchiriere.",
    faq: [
      {
        question: "Puteti lucra dupa proiect de design?",
        answer:
          "Da. Putem executa dupa proiect existent si putem semnala din timp detaliile care trebuie adaptate pentru santier.",
      },
      {
        question: "Faceti si compartimentari usoare?",
        answer:
          "Da, discutam compartimentari, plafoane, pereti decorativi si modificari interioare care nu afecteaza structura.",
      },
      {
        question: "Ajutati la alegerea materialelor?",
        answer:
          "Putem recomanda materiale in functie de trafic, umiditate, intretinere si buget.",
      },
    ],
    related: ["amenajari-interioare", "renovari-apartamente-bucuresti", "management-santier"],
  },
  {
    slug: "constructii-case-ilfov",
    title: "Constructii case Ilfov",
    shortTitle: "Case Ilfov",
    metaTitle: "Constructii case Ilfov | Lucrari la rosu, extinderi si finisaje",
    metaDescription:
      "Constructii case Ilfov: case la rosu, extinderi, zidarie, acoperis, instalatii, finisaje, deviz etapizat si coordonare santier.",
    lead:
      "Pentru proprietari din Ilfov care au proiect, teren sau lucrare inceputa si vor etape clare de executie.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Casa rezidentiala moderna in lucru",
    keywords: [
      "constructii case Ilfov",
      "firma constructii case Ilfov",
      "case la rosu Ilfov",
      "extinderi case Ilfov",
    ],
    problems: [
      "Etapele de structura, inchideri, acoperis si instalatii trebuie coordonate ca un singur proiect.",
      "Aprovizionarea si accesul in santier pot modifica termenul daca nu sunt planificate.",
      "Costurile cresc cand deciziile de finisaje apar inainte ca lucrarile tehnice sa fie clare.",
    ],
    deliverables: [
      "Analiza documentelor disponibile si a stadiului lucrarii.",
      "Plan etapizat pentru lucrari la rosu, inchideri, instalatii si finisaje.",
      "Coordonare pentru materiale, echipe si verificari intermediare.",
      "Lista de receptie pe faze, ca problemele sa fie prinse la timp.",
    ],
    process: [
      "Verificam proiectul, terenul, accesul si autorizatiile disponibile.",
      "Stabilim etapa de pornire si riscurile principale.",
      "Executam lucrarile cu receptii intermediare.",
      "Pregatim urmatoarea etapa sau predarea finala.",
    ],
    proof:
      "Relevant pentru case individuale, extinderi, modernizari, lucrari la rosu sau continuarea unei lucrari incepute in Ilfov.",
    faq: [
      {
        question: "Preluati lucrari incepute in Ilfov?",
        answer:
          "Da, dupa verificarea calitatii lucrarilor existente, documentelor si riscurilor ramase.",
      },
      {
        question: "Puteti lucra pe etape?",
        answer:
          "Da. Recomandam devize separate pe etape, mai ales pentru structura, inchideri, instalatii si finisaje.",
      },
      {
        question: "Avem nevoie de proiect tehnic?",
        answer:
          "Pentru lucrari structurale si constructii noi este necesara documentatie tehnica. Lucram pe baza documentelor disponibile.",
      },
    ],
    related: ["constructii-case", "management-santier", "amenajari-interioare-bucuresti"],
  },
  {
    slug: "renovari-baie-bucatarie-bucuresti",
    title: "Renovari baie si bucatarie Bucuresti",
    shortTitle: "Baie si bucatarie Bucuresti",
    metaTitle: "Renovari baie si bucatarie Bucuresti | Instalatii si finisaje",
    metaDescription:
      "Renovari baie si bucatarie Bucuresti: instalatii sanitare si electrice, hidroizolatii, placari, mobilier pregatit si finisaje.",
    lead:
      "Pentru zonele cele mai sensibile ale locuintei: apa, electric, ventilatie, mobilier si finisaje care trebuie sa tina.",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Baie moderna renovata cu finisaje deschise",
    keywords: [
      "renovare baie Bucuresti",
      "renovare bucatarie Bucuresti",
      "firma renovari baie Bucuresti",
      "amenajare baie apartament Bucuresti",
    ],
    problems: [
      "Infiltratiile, pantele si traseele vechi trebuie rezolvate inainte de placari.",
      "Prizele, iluminatul si electrocasnicele trebuie gandite impreuna cu mobilierul.",
      "O baie sau bucatarie mica cere decizii exacte ca sa nu se piarda spatiu util.",
    ],
    deliverables: [
      "Verificare instalatii sanitare, electrice si ventilatie.",
      "Plan de hidroizolatii, placari si pozitii pentru obiecte sanitare.",
      "Pregatire pentru mobilier, electrocasnice si corpuri de iluminat.",
      "Testari functionale inainte de predare.",
    ],
    process: [
      "Masuram si verificam traseele existente.",
      "Confirmam layout-ul si materialele.",
      "Executam instalatiile inainte de finisaje.",
      "Predam cu verificari pe apa, electric si finisaje.",
    ],
    proof:
      "Potrivit pentru bai de bloc, bucatarii inchise sau open-space, renovari rapide inainte de mutare si apartamente pentru inchiriere.",
    faq: [
      {
        question: "Se poate renova doar baia?",
        answer:
          "Da. Putem evalua doar baia, cu accent pe instalatii, hidroizolatie, placari si verificari functionale.",
      },
      {
        question: "Pregatiti bucataria pentru mobilier?",
        answer:
          "Da, stabilim pozitiile pentru prize, apa, scurgere, hota, electrocasnice si iluminat inainte de finisaje.",
      },
      {
        question: "Cat dureaza o baie?",
        answer:
          "Depinde de demolare, instalatii, uscare si finisaje. Dupa verificare propunem un termen realist.",
      },
    ],
    related: ["renovari-baie-bucatarie", "renovari-apartamente-bucuresti", "amenajari-interioare"],
  },
  {
    slug: "deviz-renovare-apartament-bucuresti",
    title: "Deviz renovare apartament Bucuresti",
    shortTitle: "Deviz renovare",
    metaTitle: "Deviz renovare apartament Bucuresti | Etape, buget si estimare",
    metaDescription:
      "Deviz renovare apartament Bucuresti: ce intra in estimare, cum se separa lucrarile, ce influenteaza costul si cum pregatim oferta.",
    lead:
      "O pagina pentru proprietarii care vor sa inteleaga ce informatii sunt necesare ca devizul sa fie util, nu doar o cifra rapida.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Plan de renovare si estimare de cost pentru apartament",
    keywords: [
      "deviz renovare apartament Bucuresti",
      "cost renovare apartament Bucuresti",
      "estimare renovare apartament",
      "pret renovare apartament",
    ],
    problems: [
      "Un pret pe metru patrat poate fi inselator daca nu include instalatii, demolari si finisaje.",
      "Doua apartamente cu aceeasi suprafata pot avea costuri diferite din cauza stadiului si materialelor.",
      "Devizele greu de comparat ascund diferente mari intre manopera, materiale si lucrari optionale.",
    ],
    deliverables: [
      "Lista informatiilor necesare: suprafata, camere, stadiu, poze, termen si nivel de finisaje.",
      "Separare intre lucrari obligatorii, recomandate si optionale.",
      "Estimare pe etape pentru demolari, instalatii, pereti, pardoseli, baie, bucatarie si finisaje.",
      "Clarificari inainte de vizita, ca discutia tehnica sa fie mai eficienta.",
    ],
    process: [
      "Trimiti datele de baza si fotografii.",
      "Identificam zonele care schimba bugetul.",
      "Pregatim o estimare initiala sau stabilim vizita.",
      "Rafinam devizul dupa masuratori si alegeri de materiale.",
    ],
    proof:
      "Util pentru proprietari care compara oferte, planifica bugetul sau vor sa stie ce intrebari sa puna inainte de renovare.",
    faq: [
      {
        question: "Puteti da pret fara vizita?",
        answer:
          "Putem da o estimare initiala daca avem suficiente informatii, dar devizul responsabil se confirma dupa masuratori si verificari.",
      },
      {
        question: "Ce influenteaza cel mai mult costul?",
        answer:
          "Instalatiile, starea peretilor si pardoselilor, baia, bucataria, nivelul finisajelor si logistica santierului.",
      },
      {
        question: "De ce sa separ lucrarile pe etape?",
        answer:
          "Pentru ca vezi ce este obligatoriu, ce poate astepta si unde se poate ajusta bugetul fara sa compromiti lucrarea.",
      },
    ],
    related: ["renovari-apartamente-bucuresti", "renovari-apartamente", "management-santier"],
  },
];

export const constructionCostGuidePages: ConstructionServicePage[] = [
  {
    slug: "cat-costa-renovarea-unui-apartament-bucuresti",
    title: "Cat costa renovarea unui apartament in Bucuresti",
    shortTitle: "Cost renovare apartament",
    metaTitle: "Cat costa renovarea unui apartament in Bucuresti | Ghid 2026",
    metaDescription:
      "Cat costa renovarea unui apartament in Bucuresti: ce influenteaza pretul, cum se separa manopera, materialele, instalatiile si finisajele.",
    lead:
      "Ghid pentru proprietari care vor sa inteleaga bugetul inainte sa ceara oferte si sa compare devize corect.",
    image: planningImage,
    imageAlt: "Deviz si plan de renovare pentru apartament",
    keywords: [
      "cat costa renovarea unui apartament Bucuresti",
      "cost renovare apartament Bucuresti",
      "pret renovare apartament",
      "deviz renovare apartament",
    ],
    problems: [
      "Preturile pe metru patrat nu arata daca sunt incluse instalatiile, baia, bucataria sau materialele.",
      "Bugetul se schimba rapid cand apar pereti strambi, trasee vechi sau hidroizolatii refacute.",
      "Devizele devin greu de comparat cand fiecare firma grupeaza lucrarile diferit.",
    ],
    deliverables: [
      "Lista de informatii necesare pentru o estimare utila: suprafata, stadiu, poze, termen si finisaje.",
      "Separare intre manopera, materiale, lucrari ascunse si finisaje vizibile.",
      "Explicarea etapelor care pot mari bugetul: instalatii, baie, bucatarie, pardoseli, usi si mobilier.",
      "Recomandari pentru compararea ofertelor fara sa alegi doar cea mai mica suma.",
    ],
    process: [
      "Strangem datele de baza despre apartament.",
      "Identificam lucrarile obligatorii si optionale.",
      "Pregatim un scenariu de buget pe etape.",
      "Confirmam devizul dupa masuratori si selectie materiale.",
    ],
    proof:
      "Util pentru apartamente vechi, locuinte noi, renovari inainte de mutare sau apartamente pregatite pentru inchiriere.",
    faq: [
      {
        question: "De ce variaza atat de mult costul renovarii?",
        answer:
          "Pentru ca aceeasi suprafata poate ascunde instalatii diferite, demolari, niveluri diferite de finisaje si logistica mai simpla sau mai dificila.",
      },
      {
        question: "Ce trebuie sa contina un deviz bun?",
        answer:
          "Etape separate, cantitati, materiale, manopera, lucrari optionale, conditii de executie si puncte de receptie.",
      },
      {
        question: "Pot primi o estimare din poze?",
        answer:
          "Da, pentru orientare. Devizul responsabil se confirma dupa masuratori si verificarea conditiilor reale.",
      },
    ],
    related: ["deviz-renovare-apartament-bucuresti", "renovari-apartamente-bucuresti", "firma-renovari-apartamente-bucuresti"],
  },
  {
    slug: "pret-renovare-baie-bucuresti",
    title: "Pret renovare baie Bucuresti",
    shortTitle: "Pret renovare baie",
    metaTitle: "Pret renovare baie Bucuresti | Instalatii, hidroizolatii, placari",
    metaDescription:
      "Pret renovare baie Bucuresti: demolare, instalatii sanitare, hidroizolatie, gresie, faianta, obiecte sanitare si verificari finale.",
    lead:
      "Baia pare o lucrare mica, dar are cele mai multe riscuri ascunse: apa, scurgeri, pante, ventilatie si placari.",
    image: bathroomImage,
    imageAlt: "Baie renovata cu placari si obiecte sanitare moderne",
    keywords: [
      "pret renovare baie Bucuresti",
      "cost renovare baie",
      "renovare baie apartament Bucuresti",
      "firma renovari baie Bucuresti",
    ],
    problems: [
      "Infiltratiile si pantele gresite pot strica finisajele dupa ce lucrarea pare terminata.",
      "Pozitiile pentru cada, dus, vas WC, lavoar si masina de spalat trebuie confirmate inainte de placari.",
      "Un pret mic poate exclude demolarea, evacuarea, hidroizolatia sau refacerea traseelor.",
    ],
    deliverables: [
      "Verificare trasee sanitare si electrice inainte de inchidere.",
      "Plan pentru hidroizolatie, placari, obiecte sanitare si ventilatie.",
      "Deviz separat pentru demolari, instalatii, materiale si finisaje.",
      "Testare functionala la predare.",
    ],
    process: [
      "Masuram baia si verificam traseele.",
      "Confirmam layout-ul si materialele.",
      "Executam instalatiile si hidroizolatia inainte de placari.",
      "Predam cu verificari pe apa, scurgeri si finisaje.",
    ],
    proof:
      "Potrivit pentru bai mici de bloc, bai vechi, bai in apartamente noi si renovari rapide inainte de mutare.",
    faq: [
      {
        question: "Ce creste cel mai mult pretul unei bai?",
        answer:
          "Mutarea obiectelor sanitare, refacerea traseelor, calitatea placarilor, hidroizolatia si accesul pentru evacuare.",
      },
      {
        question: "Este obligatorie hidroizolatia?",
        answer:
          "In zonele expuse la apa este recomandata. Omiterea ei poate transforma o economie mica intr-un cost mare ulterior.",
      },
      {
        question: "Puteti renova doar baia?",
        answer:
          "Da. Preluam si lucrari punctuale, daca stadiul si calendarul sunt clare.",
      },
    ],
    related: ["renovari-baie-bucatarie-bucuresti", "renovari-baie-bucatarie", "deviz-renovare-apartament-bucuresti"],
  },
  {
    slug: "oferta-renovare-apartament-ce-trebuie-sa-contina",
    title: "Oferta renovare apartament: ce trebuie sa contina",
    shortTitle: "Oferta renovare",
    metaTitle: "Oferta renovare apartament | Ce trebuie sa contina devizul",
    metaDescription:
      "Ce trebuie sa contina o oferta de renovare apartament: etape, materiale, manopera, termene, lucrari ascunse, receptii si conditii clare.",
    lead:
      "Un ghid pentru proprietarii care compara oferte si vor sa evite diferentele ascunse intre devize.",
    image: planningImage,
    imageAlt: "Oferta si checklist pentru renovare apartament",
    keywords: [
      "oferta renovare apartament",
      "ce trebuie sa contina deviz renovare",
      "deviz renovare apartament model",
      "comparare oferte renovare",
    ],
    problems: [
      "Ofertele scurte omit frecvent lucrarile ascunse, transportul, evacuarea sau pregatirea suprafetelor.",
      "Termenele fara etape nu arata unde pot aparea blocaje.",
      "Materialele si manopera trebuie separate pentru a putea compara corect.",
    ],
    deliverables: [
      "Checklist pentru continutul unei oferte: demolari, instalatii, finisaje, materiale, transport si receptie.",
      "Lista de intrebari pe care sa le pui inainte sa alegi executantul.",
      "Separare intre lucrari obligatorii, recomandate si optionale.",
      "Clarificari despre termene, garantii si puncte de verificare.",
    ],
    process: [
      "Verificam ce exista in oferta primita.",
      "Identificam lipsurile care pot schimba costul.",
      "Clarificam ce trebuie masurat sau fotografiat.",
      "Pregatim oferta comparabila pe etape.",
    ],
    proof:
      "Util cand ai primit deja 2-3 oferte sau cand vrei sa ceri prima oferta fara sa pierzi detalii importante.",
    faq: [
      {
        question: "Este bine sa aleg cea mai ieftina oferta?",
        answer:
          "Doar daca include aceleasi lucrari, materiale, conditii si receptii. Altfel compari lucruri diferite.",
      },
      {
        question: "Trebuie incluse materialele in oferta?",
        answer:
          "Depinde de proiect, dar materialele trebuie clarificate separat ca sa intelegi ce este inclus si ce ramane la client.",
      },
      {
        question: "Puteti verifica o oferta existenta?",
        answer:
          "Putem discuta pe baza ei si putem semnala intrebarile importante inainte de decizie.",
      },
    ],
    related: ["deviz-renovare-apartament-bucuresti", "cat-costa-renovarea-unui-apartament-bucuresti", "renovari-apartamente-bucuresti"],
  },
  {
    slug: "checklist-renovare-apartament-vechi-bucuresti",
    title: "Checklist renovare apartament vechi Bucuresti",
    shortTitle: "Checklist apartament vechi",
    metaTitle: "Checklist renovare apartament vechi Bucuresti | Instalatii si finisaje",
    metaDescription:
      "Checklist renovare apartament vechi Bucuresti: instalatii electrice si sanitare, pereti, pardoseli, baie, bucatarie, usi si receptie.",
    lead:
      "Apartamentele vechi au nevoie de verificari inainte de finisaje, altfel problemele raman ascunse sub lucrari noi.",
    image: apartmentImage,
    imageAlt: "Apartament vechi pregatit pentru renovare",
    keywords: [
      "checklist renovare apartament vechi",
      "renovare apartament vechi Bucuresti",
      "instalatii apartament vechi",
      "renovare apartament bloc vechi",
    ],
    problems: [
      "Instalatiile vechi pot fi nepotrivite pentru consumul actual.",
      "Peretii, pardoselile si tavanele pot necesita reparatii inainte de finisaje.",
      "Baia si bucataria pot ascunde probleme de apa, scurgere sau ventilatie.",
    ],
    deliverables: [
      "Checklist pentru instalatii electrice si sanitare.",
      "Verificari pentru pereti, pardoseli, usi, baie si bucatarie.",
      "Prioritizarea lucrarilor obligatorii fata de cele estetice.",
      "Recomandari pentru deviz si receptie pe etape.",
    ],
    process: [
      "Analizam stadiul apartamentului.",
      "Verificam elementele care devin ascunse dupa finisaje.",
      "Stabilim ordinea lucrarilor.",
      "Inchidem cu receptie pe zone.",
    ],
    proof:
      "Potrivit pentru blocuri vechi din Bucuresti, apartamente mostenite, locuinte cumparate pentru renovare si spatii pregatite pentru vanzare.",
    faq: [
      {
        question: "Ce verific prima data intr-un apartament vechi?",
        answer:
          "Instalatiile, zonele umede, peretii afectati, pardoselile si compatibilitatea cu finisajele dorite.",
      },
      {
        question: "Merita schimbate instalatiile?",
        answer:
          "Cand sunt vechi sau insuficiente, da. Este mai ieftin sa le rezolvi inainte de finisaje decat dupa.",
      },
      {
        question: "Puteti lucra etapizat?",
        answer:
          "Da. Putem prioritiza lucrarile critice si apoi finisajele, in functie de buget si termen.",
      },
    ],
    related: ["renovari-apartamente-bucuresti", "instalatii-electrice-sanitare-renovari", "deviz-renovare-apartament-bucuresti"],
  },
];

function makeSpecializedPage({
  slug,
  title,
  shortTitle,
  metaTitle,
  metaDescription,
  lead,
  image,
  keywords,
  focus,
  related,
}: {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  image: string;
  keywords: string[];
  focus: string;
  related: string[];
}): ConstructionServicePage {
  return {
    slug,
    title,
    shortTitle,
    metaTitle,
    metaDescription,
    lead,
    image,
    imageAlt: title,
    keywords,
    problems: [
      `Lucrarea de ${focus} trebuie definita clar inainte de pret, altfel apar costuri suplimentare greu de controlat.`,
      "Materialele, accesul, stadiul existent si ordinea echipelor pot schimba termenul real.",
      "Lucrarile ascunse trebuie discutate inainte de finisajele vizibile.",
    ],
    deliverables: [
      "Evaluare initiala pe baza de poze, suprafata, zona si lista de lucrari.",
      "Deviz structurat pe etape, cu lucrari obligatorii si optionale separate.",
      "Plan de executie cu materiale, ordine de lucru si puncte de verificare.",
      "Receptie pe zone si lista de corectii inainte de predare.",
    ],
    process: [
      "Clarificam stadiul si obiectivul lucrarii.",
      "Identificam riscurile tehnice si logistice.",
      "Pregatim devizul si ordinea etapelor.",
      "Executam si verificam lucrarea pe puncte clare.",
    ],
    proof: `Potrivit pentru proprietari care cauta ${focus} in Romania si vor o discutie aplicata inainte de deviz, cu raspuns prioritar pentru Bucuresti, Ilfov si Arges.`,
    faq: [
      {
        question: "Puteti pregati o estimare initiala din poze?",
        answer:
          "Da. Pozele, suprafata, zona, termenul si stadiul existent ajuta la o prima estimare. Devizul final se confirma dupa masuratori.",
      },
      {
        question: "Se poate lucra etapizat?",
        answer:
          "Da. Separarea pe etape ajuta la controlul bugetului si la prioritizarea lucrarilor care nu trebuie amanate.",
      },
      {
        question: "Ce informatii trimit pentru oferta?",
        answer:
          "Zona, suprafata, tipul locuintei, poze, termenul dorit, bugetul orientativ si ce lucrari sunt obligatorii.",
      },
    ],
    related,
  };
}

export const constructionServiceExpansionPages: ConstructionServicePage[] = [
  makeSpecializedPage({
    slug: "firma-renovari-apartamente-bucuresti",
    title: "Firma renovari apartamente Bucuresti",
    shortTitle: "Firma renovari apartamente",
    metaTitle: "Firma renovari apartamente Bucuresti | Deviz, echipe, coordonare",
    metaDescription:
      "Firma renovari apartamente Bucuresti: evaluare, deviz pe etape, demolari, instalatii, finisaje, baie, bucatarie si coordonare santier.",
    lead:
      "Pentru proprietari care cauta o firma care sa organizeze renovarea, nu doar executanti izolati pentru fiecare etapa.",
    image: apartmentImage,
    keywords: ["firma renovari apartamente Bucuresti", "firma renovare apartament", "echipa renovari Bucuresti"],
    focus: "renovare completa sau etapizata",
    related: ["renovari-apartamente-bucuresti", "cat-costa-renovarea-unui-apartament-bucuresti", "oferta-renovare-apartament-ce-trebuie-sa-contina"],
  }),
  makeSpecializedPage({
    slug: "renovari-apartamente-la-cheie-bucuresti",
    title: "Renovari apartamente la cheie Bucuresti",
    shortTitle: "Renovari la cheie",
    metaTitle: "Renovari apartamente la cheie Bucuresti | De la demolare la predare",
    metaDescription:
      "Renovari apartamente la cheie Bucuresti: demolari, instalatii, pereti, pardoseli, baie, bucatarie, finisaje si predare coordonata.",
    lead:
      "Pentru apartamente care trebuie preluate de la stadiu vechi sau gol si aduse pana la folosire.",
    image: interiorImage,
    keywords: ["renovari apartamente la cheie Bucuresti", "renovare la cheie apartament", "apartament la cheie Bucuresti"],
    focus: "renovare de la demolare la predare",
    related: ["renovari-apartamente-bucuresti", "deviz-renovare-apartament-bucuresti", "amenajari-interioare-bucuresti"],
  }),
  makeSpecializedPage({
    slug: "finisaje-interioare-bucuresti",
    title: "Finisaje interioare Bucuresti",
    shortTitle: "Finisaje interioare",
    metaTitle: "Finisaje interioare Bucuresti | Glet, lavabila, pardoseli, detalii",
    metaDescription:
      "Finisaje interioare Bucuresti pentru apartamente si case: glet, zugraveli, pardoseli, plinte, usi, detalii si receptie.",
    lead:
      "Finisajele bune depind de pregatirea suprafetelor, detalii corecte si verificari inainte de predare.",
    image: interiorImage,
    keywords: ["finisaje interioare Bucuresti", "glet lavabila Bucuresti", "finisaje apartament Bucuresti"],
    focus: "finisaje si detalii de predare",
    related: ["amenajari-interioare-bucuresti", "zugraveli-glet-parchet-bucuresti", "renovari-apartamente-bucuresti"],
  }),
  makeSpecializedPage({
    slug: "zugraveli-glet-parchet-bucuresti",
    title: "Zugraveli, glet si parchet Bucuresti",
    shortTitle: "Zugraveli si parchet",
    metaTitle: "Zugraveli, glet si parchet Bucuresti | Finisaje apartamente",
    metaDescription:
      "Zugraveli, glet si parchet Bucuresti: pregatire suprafete, reparatii, lavabila, pardoseli, plinte si finisaje interioare.",
    lead:
      "Lucrari de finisaj pentru apartamente care au nevoie de suprafete pregatite corect si detalii curate.",
    image: interiorImage,
    keywords: ["zugraveli Bucuresti", "glet Bucuresti", "montaj parchet Bucuresti"],
    focus: "glet, lavabila, pardoseli si detalii",
    related: ["finisaje-interioare-bucuresti", "amenajari-interioare-bucuresti", "renovari-apartamente-bucuresti"],
  }),
  makeSpecializedPage({
    slug: "montaj-gresie-faianta-bucuresti",
    title: "Montaj gresie si faianta Bucuresti",
    shortTitle: "Gresie si faianta",
    metaTitle: "Montaj gresie si faianta Bucuresti | Bai, bucatarii, placari",
    metaDescription:
      "Montaj gresie si faianta Bucuresti pentru bai, bucatarii si holuri: pregatire suprafete, hidroizolatii, pante si rosturi.",
    lead:
      "Placarea corecta incepe cu suportul, pantele, hidroizolatia si pozitionarea obiectelor, nu cu alegerea modelului.",
    image: bathroomImage,
    keywords: ["montaj gresie faianta Bucuresti", "placari baie Bucuresti", "gresie faianta apartament"],
    focus: "placari in baie, bucatarie si zone umede",
    related: ["pret-renovare-baie-bucuresti", "renovari-baie-bucatarie-bucuresti", "finisaje-interioare-bucuresti"],
  }),
  makeSpecializedPage({
    slug: "instalatii-electrice-sanitare-renovari",
    title: "Instalatii electrice si sanitare pentru renovari",
    shortTitle: "Instalatii renovari",
    metaTitle: "Instalatii electrice si sanitare renovari | Apartamente Bucuresti",
    metaDescription:
      "Instalatii electrice si sanitare pentru renovari de apartamente: trasee, prize, iluminat, apa, scurgeri si verificari inainte de finisaje.",
    lead:
      "Instalatiile sunt lucrarile care nu se mai vad dupa renovare, dar decid cat de bine functioneaza locuinta.",
    image: planningImage,
    keywords: ["instalatii electrice renovare apartament", "instalatii sanitare Bucuresti", "renovare instalatii apartament"],
    focus: "trasee electrice si sanitare inainte de finisaje",
    related: ["checklist-renovare-apartament-vechi-bucuresti", "renovari-baie-bucatarie-bucuresti", "renovari-apartamente-bucuresti"],
  }),
  makeSpecializedPage({
    slug: "renovari-case-bucuresti-ilfov",
    title: "Renovari case Bucuresti si Ilfov",
    shortTitle: "Renovari case",
    metaTitle: "Renovari case Bucuresti si Ilfov | Modernizari, finisaje, instalatii",
    metaDescription:
      "Renovari case Bucuresti si Ilfov: modernizari interioare, instalatii, finisaje, bai, bucatarii, extinderi usoare si coordonare.",
    lead:
      "Casele au mai multe dependinte intre instalatii, compartimentari, finisaje si exterior decat un apartament.",
    image: houseImage,
    keywords: ["renovari case Bucuresti", "renovari case Ilfov", "modernizare casa Bucuresti"],
    focus: "modernizare case si locuinte individuale",
    related: ["constructii-case-ilfov", "extinderi-case-ilfov", "amenajari-interioare-bucuresti"],
  }),
  makeSpecializedPage({
    slug: "extinderi-case-ilfov",
    title: "Extinderi case Ilfov",
    shortTitle: "Extinderi case",
    metaTitle: "Extinderi case Ilfov | Anexe, camere, terase, modernizari",
    metaDescription:
      "Extinderi case Ilfov: anexe, camere suplimentare, terase acoperite, adaptari, finisaje si coordonare pe etape.",
    lead:
      "Extinderile trebuie discutate cu atentie pentru ca ating structura, accesul, instalatiile si folosirea casei.",
    image: houseImage,
    keywords: ["extinderi case Ilfov", "extindere casa", "anexa casa Ilfov"],
    focus: "extinderi, anexe si modernizari de case",
    related: ["constructii-case-ilfov", "renovari-case-bucuresti-ilfov", "management-santier"],
  }),
];

type LocalPageInput = {
  slug: string;
  area: string;
  nearby: string;
  localNeed: string;
  related?: string[];
};

function makeLocalRenovationPage({
  slug,
  area,
  nearby,
  localNeed,
  related = [
    "renovari-apartamente-bucuresti",
    "deviz-renovare-apartament-bucuresti",
    "pret-renovare-baie-bucuresti",
  ],
}: LocalPageInput): ConstructionServicePage {
  return {
    slug,
    title: `Renovari apartamente ${area}`,
    shortTitle: `Renovari ${area}`,
    metaTitle: `Renovari apartamente ${area} | Deviz, instalatii, finisaje`,
    metaDescription: `Renovari apartamente ${area}: evaluare, instalatii, baie, bucatarie, finisaje, deviz pe etape si coordonare pentru locuinte rezidentiale.`,
    lead: `Renovari pentru apartamente din ${area}, cu planificare pentru acces, materiale, instalatii, finisaje si termen de predare.`,
    image: apartmentImage,
    imageAlt: `Apartament renovat in ${area}`,
    keywords: [
      `renovari apartamente ${area}`,
      `firma renovari ${area}`,
      `renovare apartament ${area}`,
      `amenajari apartamente ${area}`,
    ],
    problems: [
      `In ${area}, cele mai frecvente cereri sunt pentru ${localNeed}.`,
      `Zone relevante: ${nearby}. Accesul, parcarea, transportul materialelor si evacuarea molozului pot influenta calendarul.`,
      "Instalatiile si zonele umede trebuie verificate inainte de finisaje pentru a evita refaceri costisitoare.",
    ],
    deliverables: [
      "Discutie initiala pe poze, suprafata, zona si stadiu.",
      "Deviz separat pentru demolari, instalatii, baie, bucatarie, pereti, pardoseli si finisaje.",
      "Plan de lucru adaptat accesului si termenului dorit.",
      "Receptie pe zone si verificarea detaliilor finale.",
    ],
    process: [
      "Confirmam zona, accesul si tipul apartamentului.",
      "Verificam ce lucrari sunt obligatorii inainte de finisaje.",
      "Stabilim ordinea echipelor si aprovizionarea.",
      "Predam lucrarea cu lista de verificare.",
    ],
    proof: `Potrivit pentru ${localNeed} in ${area} si zone apropiate: ${nearby}.`,
    faq: [
      {
        question: `Lucrati in ${area}?`,
        answer: `Da, evaluam lucrari in ${area} si zone apropiate, in functie de calendar, acces si complexitatea renovarii.`,
      },
      {
        question: "Puteti face doar baie, bucatarie sau finisaje?",
        answer:
          "Da. Putem discuta lucrari punctuale sau renovari complete, in functie de stadiu si buget.",
      },
      {
        question: "Ce trimit pentru o estimare?",
        answer:
          "Poze, suprafata, localitate/sector, termen dorit, tipul lucrarii si orice plan sau lista de materiale existenta.",
      },
    ],
    related,
  };
}

export const constructionLocalExpansionPages: ConstructionServicePage[] = [
  makeLocalRenovationPage({
    slug: "renovari-apartamente-sector-1",
    area: "Sector 1",
    nearby: "Aviatiei, Baneasa, Bucurestii Noi, Domenii, Piata Victoriei",
    localNeed: "apartamente vechi, locuinte premium si renovari unde logistica si protectia finisajelor conteaza mult",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-sector-2",
    area: "Sector 2",
    nearby: "Obor, Colentina, Tei, Floreasca, Mosilor, Pantelimon",
    localNeed: "apartamente de bloc vechi, renovari dupa achizitie si bai sau bucatarii cu instalatii care trebuie verificate",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-sector-4",
    area: "Sector 4",
    nearby: "Tineretului, Berceni, Brancoveanu, Piata Sudului, Aparatorii Patriei",
    localNeed: "apartamente pregatite pentru mutare, inchiriere sau modernizare rapida",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-sector-5",
    area: "Sector 5",
    nearby: "Cotroceni, Rahova, 13 Septembrie, Sebastian, Ferentari",
    localNeed: "apartamente vechi, locuinte cu pereti si instalatii care trebuie clarificate inainte de finisaje",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-sector-6",
    area: "Sector 6",
    nearby: "Drumul Taberei, Militari, Crangasi, Gorjului, Lujerului",
    localNeed: "renovari de apartamente de bloc, finisaje interioare si lucrari etapizate pentru mutare",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-chiajna",
    area: "Chiajna",
    nearby: "Militari Residence, Dudu, Rosu si zonele noi din vestul Bucurestiului",
    localNeed: "apartamente noi care au nevoie de adaptari, finisaje, bai, bucatarii si pregatire pentru mobilier",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-otopeni",
    area: "Otopeni",
    nearby: "Odai, Tunari si zona de nord a Ilfovului",
    localNeed: "apartamente si case unde conteaza coordonarea lucrarilor, accesul si finisajele curate",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-voluntari",
    area: "Voluntari",
    nearby: "Pipera, Iancu Nicolae si zona de nord-est",
    localNeed: "locuinte noi sau premium unde detaliile de finisaj, iluminat si mobilier trebuie sincronizate",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-pantelimon",
    area: "Pantelimon",
    nearby: "zona Pantelimon, Cernica si estul Bucurestiului",
    localNeed: "apartamente si case care au nevoie de renovari etapizate, instalatii si finisaje rezistente",
  }),
  makeLocalRenovationPage({
    slug: "renovari-apartamente-berceni",
    area: "Berceni",
    nearby: "Berceni, Metalurgiei, Aparatorii Patriei si zona de sud",
    localNeed: "apartamente noi sau vechi pregatite pentru mutare, inchiriere sau amenajare completa",
  }),
];

type NationalPageInput = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  image: string;
  keywords: string[];
  focus: string;
  related: string[];
};

function makeNationalPage({
  slug,
  title,
  shortTitle,
  metaTitle,
  metaDescription,
  lead,
  image,
  keywords,
  focus,
  related,
}: NationalPageInput): ConstructionServicePage {
  return {
    slug,
    title,
    shortTitle,
    metaTitle,
    metaDescription,
    lead,
    image,
    imageAlt: title,
    keywords,
    problems: [
      `Pentru ${focus}, prima problema este compararea ofertelor fara aceeasi lista de lucrari.`,
      "Distanta, disponibilitatea echipelor, aprovizionarea si stadiul locuintei pot schimba termenul real.",
      "Lucrarile de instalatii, hidroizolatii si finisaje trebuie ordonate inainte de estimarea finala.",
    ],
    deliverables: [
      "Preluare initiala pentru proiecte din Romania, cu prioritate Bucuresti, Ilfov si Arges.",
      "Lista de informatii necesare: localitate, suprafata, poze, stadiu, termen si buget orientativ.",
      "Deviz etapizat sau directie de buget inainte de vizita tehnica.",
      "Recomandare pentru pasul urmator: vizita, oferta detaliata sau selectie materiale.",
    ],
    process: [
      "Trimiti localitatea, poze si tipul lucrarii.",
      "Clarificam telefonic stadiul, termenul si bugetul orientativ.",
      "Stabilim daca putem estima remote sau este necesara vizita.",
      "Pregatim oferta pe etape si urmatoarele decizii.",
    ],
    proof:
      "Lucram in Romania in functie de complexitatea proiectului, calendar si logistica. Bucuresti, Ilfov si Arges raman zone de raspuns prioritar.",
    faq: [
      {
        question: "Lucrati in afara Bucurestiului?",
        answer:
          "Da, evaluam proiecte in Romania. Pentru lucrari mici confirmam in functie de disponibilitate, iar pentru proiecte medii si mari putem discuta planificarea pe etape.",
      },
      {
        question: "Pot primi o estimare fara vizita?",
        answer:
          "Da, daca trimiti poze, suprafata, localitate, stadiu si lista lucrarilor. Estimarea finala se confirma dupa verificari.",
      },
      {
        question: "Care sunt zonele cu raspuns mai rapid?",
        answer:
          "Bucuresti, Ilfov si Arges sunt zone prioritare. Pentru alte judete, raspunsul depinde de amploarea lucrarii si calendar.",
      },
    ],
    related,
  };
}

export const constructionNationalPages: ConstructionServicePage[] = [
  makeNationalPage({
    slug: "renovari-apartamente-romania",
    title: "Renovari apartamente in Romania",
    shortTitle: "Renovari apartamente Romania",
    metaTitle: "Renovari apartamente Romania | Deviz, instalatii, finisaje",
    metaDescription:
      "Renovari apartamente in Romania: evaluare, deviz pe etape, instalatii, finisaje, baie, bucatarie si coordonare pentru proiecte rezidentiale.",
    lead:
      "Evaluam renovari de apartamente in Romania, cu raspuns prioritar pentru Bucuresti, Ilfov si Arges.",
    image: apartmentImage,
    keywords: [
      "renovari apartamente Romania",
      "firma renovari apartamente Romania",
      "renovare apartament Romania",
      "deviz renovare apartament",
    ],
    focus: "renovari de apartamente in Romania",
    related: [
      "oferta-renovare-apartament-romania",
      "cat-costa-renovarea-unui-apartament-bucuresti",
      "renovari-apartamente-bucuresti",
    ],
  }),
  makeNationalPage({
    slug: "constructii-case-romania",
    title: "Constructii case in Romania",
    shortTitle: "Constructii case Romania",
    metaTitle: "Constructii case Romania | Case, extinderi, lucrari rezidentiale",
    metaDescription:
      "Constructii case in Romania: lucrari la rosu, extinderi, modernizari, instalatii, finisaje, deviz etapizat si coordonare santier.",
    lead:
      "Pentru case, extinderi si anexe unde este nevoie de etape clare, deviz si coordonare.",
    image: houseImage,
    keywords: [
      "constructii case Romania",
      "firma constructii case Romania",
      "case la rosu Romania",
      "extinderi case Romania",
    ],
    focus: "constructii si extinderi de case",
    related: [
      "oferta-constructie-casa-romania",
      "constructii-case-ilfov",
      "renovari-case-bucuresti-ilfov",
    ],
  }),
  makeNationalPage({
    slug: "amenajari-interioare-romania",
    title: "Amenajari interioare in Romania",
    shortTitle: "Amenajari Romania",
    metaTitle: "Amenajari interioare Romania | Apartamente si case",
    metaDescription:
      "Amenajari interioare in Romania pentru apartamente si case: finisaje, compartimentari, pardoseli, iluminat, baie, bucatarie si coordonare.",
    lead:
      "Amenajari interioare pentru locuinte care trebuie aduse la un standard bun de folosire si predare.",
    image: interiorImage,
    keywords: [
      "amenajari interioare Romania",
      "firma amenajari interioare",
      "finisaje interioare Romania",
      "amenajari apartamente Romania",
    ],
    focus: "amenajari interioare pentru apartamente si case",
    related: [
      "oferta-amenajari-interioare-romania",
      "finisaje-interioare-bucuresti",
      "amenajari-interioare-bucuresti",
    ],
  }),
  makeNationalPage({
    slug: "renovari-baie-bucatarie-romania",
    title: "Renovari baie si bucatarie in Romania",
    shortTitle: "Baie si bucatarie Romania",
    metaTitle: "Renovari baie si bucatarie Romania | Instalatii si placari",
    metaDescription:
      "Renovari baie si bucatarie in Romania: demolare, instalatii, hidroizolatii, gresie, faianta, mobilier pregatit si verificari finale.",
    lead:
      "Pentru bai si bucatarii unde instalatiile, hidroizolatia si pozitionarea obiectelor trebuie stabilite corect.",
    image: bathroomImage,
    keywords: [
      "renovare baie Romania",
      "renovare bucatarie Romania",
      "firma renovari baie",
      "amenajare baie apartament",
    ],
    focus: "renovari de baie si bucatarie",
    related: [
      "oferta-renovare-baie-bucatarie",
      "pret-renovare-baie-bucuresti",
      "montaj-gresie-faianta-bucuresti",
    ],
  }),
  makeNationalPage({
    slug: "firma-renovari-constructii-romania",
    title: "Firma renovari si constructii in Romania",
    shortTitle: "Firma renovari Romania",
    metaTitle: "Firma renovari si constructii Romania | Apartamente, case, finisaje",
    metaDescription:
      "Firma pentru renovari si constructii in Romania: apartamente, case, bai, bucatarii, finisaje, instalatii, deviz si coordonare santier.",
    lead:
      "O intrare clara pentru proprietari care vor sa afle rapid daca lucrarea poate fi evaluata si cum se structureaza devizul.",
    image: planningImage,
    keywords: [
      "firma renovari Romania",
      "firma constructii Romania",
      "renovari constructii Romania",
      "echipa renovari locuinte",
    ],
    focus: "renovari si constructii rezidentiale",
    related: [
      "evaluare-rapida-renovari-constructii",
      "renovari-apartamente-romania",
      "constructii-case-romania",
    ],
  }),
];

type LeadCapturePageInput = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  image: string;
  keywords: string[];
  projectType: string;
  defaultBudgetRange: string;
  defaultPropertyStatus: string;
  qualification: string[];
  related: string[];
};

function makeLeadCapturePage({
  slug,
  title,
  shortTitle,
  metaTitle,
  metaDescription,
  lead,
  image,
  keywords,
  projectType,
  defaultBudgetRange,
  defaultPropertyStatus,
  qualification,
  related,
}: LeadCapturePageInput): ConstructionServicePage {
  return {
    slug,
    title,
    shortTitle,
    metaTitle,
    metaDescription,
    lead,
    image,
    imageAlt: title,
    keywords,
    intent: "ads",
    defaultProjectType: projectType,
    defaultTimeline: "Urgent",
    defaultBudgetRange,
    defaultPropertyStatus,
    leadFormTitle: `Cere oferta pentru ${shortTitle.toLowerCase()}`,
    leadFormDescription:
      "Completeaza telefonul, localitatea, bugetul orientativ si termenul. Te sunam pentru o prima triere si iti spunem ce informatii lipsesc pentru oferta.",
    conversionPoints: [
      "Telefon si WhatsApp vizibile imediat.",
      "Formular scurt cu buget si termen, potrivit pentru cereri urgente.",
      "Cereri din Romania, cu raspuns prioritar pentru Bucuresti, Ilfov si Arges.",
    ],
    qualification,
    problems: [
      "Ai nevoie de o prima estimare, dar nu vrei sa astepti zile pentru o discutie initiala.",
      "Vrei sa afli daca lucrarea poate fi preluata in localitatea ta si ce informatii sunt necesare.",
      "Nu vrei o oferta vaga, ci o discutie structurata pe suprafata, stadiu, buget si termen.",
    ],
    deliverables: [
      "Apel de clarificare pentru localitate, acces, suprafata si tip lucrare.",
      "Lista de poze si informatii necesare pentru deviz.",
      "Directie de buget inainte de vizita, cand informatiile permit.",
      "Urmatorul pas clar: vizita, oferta, etapizare sau recomandare de materiale.",
    ],
    process: [
      "Trimiti cererea scurta.",
      "Te contactam pentru filtrarea lucrarii.",
      "Cerem poze, suprafata si stadiu daca lipsesc.",
      "Stabilim daca mergem spre estimare, vizita sau oferta detaliata.",
    ],
    proof:
      "Potrivit pentru cereri din Romania, cu prioritate pentru Bucuresti, Ilfov si Arges. Pentru alte judete, discutam in functie de amploare si calendar.",
    faq: [
      {
        question: "Cat de repede pot primi un raspuns?",
        answer:
          "Pentru cereri clare, primul raspuns poate porni din informatiile trimise in formular: localitate, tip lucrare, buget, termen si poze.",
      },
      {
        question: "Pot cere oferta daca sunt din alt judet?",
        answer:
          "Da. Evaluam cereri din Romania, iar disponibilitatea se confirma dupa amploarea lucrarii, acces si calendar.",
      },
      {
        question: "De ce cereti buget orientativ?",
        answer:
          "Bugetul ajuta la filtrarea corecta a solutiilor si evita estimari care nu se potrivesc cu realitatea proiectului.",
      },
    ],
    related,
  };
}

export const constructionLeadCapturePages: ConstructionServicePage[] = [
  makeLeadCapturePage({
    slug: "contact",
    title: "Contact ZES Construct pentru renovari si constructii",
    shortTitle: "Contact",
    metaTitle: "Contact ZES Construct | Deviz renovari si constructii",
    metaDescription:
      "Contact ZES Construct pentru renovari apartamente, constructii case, amenajari interioare, bai, bucatarii si management santier in Romania.",
    lead:
      "Trimite o cerere scurta, suna sau scrie pe WhatsApp. Revenim cu intrebarile utile pentru deviz si urmatorul pas clar.",
    image: planningImage,
    keywords: [
      "contact ZES Construct",
      "contact renovari apartamente",
      "contact constructii case",
      "deviz renovari constructii",
    ],
    projectType: "Alta lucrare rezidentiala",
    defaultBudgetRange: "De estimat",
    defaultPropertyStatus: "Locuinta existenta",
    qualification: [
      "Localitatea sau sectorul unde este lucrarea.",
      "Tipul lucrarii: renovare apartament, constructie casa, baie, bucatarie sau amenajare.",
      "Stadiul actual si termenul dorit pentru incepere.",
      "Bugetul orientativ, daca exista deja.",
    ],
    related: [
      "evaluare-rapida-renovari-constructii",
      "oferta-renovare-apartament-romania",
      "oferta-constructie-casa-romania",
    ],
  }),
  {
    slug: "tiktok-renovari",
    title: "Renovari vazute pe TikTok, devizate realist",
    shortTitle: "TikTok renovari",
    metaTitle: "Renovari vazute pe TikTok | Deviz realist ZES Construct",
    metaDescription:
      "Ai vazut o idee de renovare pe TikTok sau Reels? ZES Construct verifica daca se poate executa, ce costa si ce riscuri apar in apartament sau casa.",
    lead:
      "Ai salvat un video cu o baie, bucatarie, apartament sau casa transformata? Trimite cererea si iti spunem ce informatii sunt necesare pentru un deviz realist.",
    image: interiorImage,
    imageAlt: "Amenajare interioara inspirata din videouri scurte",
    keywords: [
      "renovari TikTok",
      "renovare vazuta pe TikTok",
      "amenajari interioare TikTok",
      "deviz renovare apartament",
      "firma renovari apartamente",
    ],
    intent: "ads",
    defaultProjectType: "Renovare apartament",
    defaultTimeline: "In urmatoarele 1-3 luni",
    defaultBudgetRange: "10.000 - 25.000 EUR",
    defaultPropertyStatus: "Locuinta existenta",
    leadFormTitle: "Transforma ideea salvata intr-un deviz realist",
    leadFormDescription:
      "Spune ce ai vazut, localitatea, bugetul si termenul. Dupa formular, poti trimite pe WhatsApp video, poze sau linkuri de referinta.",
    conversionPoints: [
      "Pagina dedicata pentru trafic din bio, TikTok Ads, Reels si videouri Veo.",
      "Cerere scurta: ce vrei sa reproduci, unde este lucrarea, buget si termen.",
      "Urmatorul pas clar: poze, masuratori, vizita sau estimare initiala.",
    ],
    qualification: [
      "Linkul, captura sau descrierea ideii vazute pe TikTok, Reels sau Shorts.",
      "Localitatea si tipul locuintei: apartament, casa, baie, bucatarie sau camera.",
      "Ce trebuie schimbat: instalatii, compartimentare, finisaje, mobilier sau iluminat.",
      "Bugetul orientativ si termenul in care vrei sa inceapa lucrarea.",
    ],
    problems: [
      "Un video de 12 secunde nu arata instalatiile, hidroizolatia, peretii si costurile ascunse.",
      "Trendurile arata bine, dar unele solutii nu se potrivesc cu spatiul, bugetul sau blocul tau.",
      "Ai nevoie sa stii rapid daca ideea este executabila in Romania si ce informatii lipsesc.",
    ],
    deliverables: [
      "Filtrare a ideii: ce se poate copia, ce trebuie adaptat si ce poate deveni riscant.",
      "Lista de poze si masuratori necesare pentru estimarea initiala.",
      "Directie de buget pentru instalatii, finisaje, baie, bucatarie, mobilier si iluminat.",
      "Recomandare de etapa urmatoare: estimare remote, vizita tehnica sau oferta detaliata.",
    ],
    process: [
      "Completezi formularul sau intri pe WhatsApp.",
      "Trimiti referinta video, poze din locuinta si dimensiuni aproximative.",
      "Clarificam ce este estetic, ce este tehnic si ce influenteaza costul.",
      "Stabilim daca mergem spre estimare, vizita sau deviz pe etape.",
    ],
    proof:
      "Creat pentru trafic din continut video scurt: proprietari care vad transformari spectaculoase si vor sa afle ce inseamna executie reala.",
    faq: [
      {
        question: "Pot trimite un link de TikTok ca referinta?",
        answer:
          "Da. Linkul sau captura ne ajuta sa intelegem stilul dorit, dar devizul se bazeaza pe poze, masuratori, stadiul locuintei si lucrarile tehnice necesare.",
      },
      {
        question: "Puteti reproduce exact ce vad in video?",
        answer:
          "Uneori da, alteori trebuie adaptat. Verificam spatiul, instalatiile, accesul, bugetul si materialele inainte sa promitem o solutie.",
      },
      {
        question: "Este potrivita pagina pentru reclame TikTok?",
        answer:
          "Da. Formularul capteaza sursa campaniei si ajuta la trierea rapida a cererilor venite din video, bio sau reclame.",
      },
    ],
    related: [
      "contact",
      "deviz-renovare-apartament-24h",
      "oferta-renovare-baie-bucatarie",
    ],
  },
  {
    slug: "deviz-renovare-apartament-24h",
    title: "Deviz renovare apartament in 24h",
    shortTitle: "Deviz 24h",
    metaTitle: "Deviz renovare apartament in 24h | Oferta rapida ZES Construct",
    metaDescription:
      "Cere deviz pentru renovare apartament in 24h: Bucuresti, Ilfov si Romania. Formular scurt, telefon, WhatsApp, buget, poze si urmatorul pas clar.",
    lead:
      "Trimite datele esentiale despre apartament si te contactam rapid pentru prima triere: zona, suprafata, stadiu, buget, termen si poze.",
    image: apartmentImage,
    imageAlt: "Apartament renovat pentru deviz rapid",
    keywords: [
      "deviz renovare apartament 24h",
      "oferta renovare apartament rapida",
      "deviz renovare apartament Bucuresti",
      "firma renovari apartamente Bucuresti",
      "cost renovare apartament",
    ],
    intent: "ads",
    defaultProjectType: "Renovare apartament",
    defaultTimeline: "Urgent",
    defaultBudgetRange: "10.000 - 25.000 EUR",
    defaultPropertyStatus: "Locuinta existenta",
    leadFormTitle: "Prim raspuns pentru deviz in 24h",
    leadFormDescription:
      "Completeaza telefonul, localitatea, suprafata, bugetul orientativ si termenul. Pentru o estimare buna, trimite apoi poze pe WhatsApp.",
    conversionPoints: [
      "Telefon, WhatsApp si formular vizibile imediat pentru trafic din Ads.",
      "Campuri scurte: zona, tip lucrare, buget, termen si stadiu locuinta.",
      "Potrivit pentru Bucuresti, Ilfov si cereri din Romania cu buget clar.",
    ],
    qualification: [
      "Localitatea, sectorul sau judetul unde este apartamentul.",
      "Suprafata aproximativa, numarul de camere si daca locuinta este goala sau locuita.",
      "Daca se schimba instalatiile, baia, bucataria, pardoselile sau doar finisajele.",
      "Bugetul orientativ si cat de repede vrei sa inceapa lucrarea.",
    ],
    problems: [
      "Ai nevoie rapid de o directie de buget, dar nu vrei o oferta generica pe metru patrat.",
      "Vrei sa stii daca lucrarea merita vizita tehnica sau poate porni cu o estimare din poze.",
      "Nu vrei sa pierzi timp cu discutii lungi inainte sa afli ce informatii lipsesc pentru deviz.",
    ],
    deliverables: [
      "Prim apel pentru filtrarea lucrarii: zona, acces, suprafata, stadiu si termen.",
      "Lista clara de poze si informatii care lipsesc pentru estimarea initiala.",
      "Directie de buget pe etape: demolari, instalatii, baie, bucatarie, finisaje si materiale.",
      "Urmatorul pas recomandat: estimare remote, vizita tehnica sau oferta detaliata.",
    ],
    process: [
      "Completezi formularul scurt sau intri pe WhatsApp.",
      "Confirmam telefonic datele care influenteaza costul.",
      "Trimiti poze, suprafata si lista de lucrari.",
      "Stabilim daca pregatim estimare initiala, vizita sau deviz detaliat.",
    ],
    proof:
      "Creat pentru trafic din Google Ads si proprietari care compara rapid variante pentru renovarea unui apartament.",
    faq: [
      {
        question: "Primesc deviz final in 24h?",
        answer:
          "In 24h urmarim sa iti dam primul raspuns si directia corecta pentru deviz. Devizul final depinde de poze, masuratori, materiale si stadiul real al apartamentului.",
      },
      {
        question: "Pot trimite poze pe WhatsApp?",
        answer:
          "Da. Pozele ajuta mult pentru prima triere: baie, bucatarie, instalatii, pereti, pardoseli si acces.",
      },
      {
        question: "Lucrati doar in Bucuresti?",
        answer:
          "Bucuresti si Ilfov au raspuns prioritar. Evaluam si cereri din Romania daca lucrarea are amploare, buget si calendar clar.",
      },
    ],
    related: [
      "oferta-renovare-apartament-romania",
      "deviz-renovare-apartament-bucuresti",
      "renovari-apartamente-bucuresti",
    ],
  },
  makeLeadCapturePage({
    slug: "evaluare-rapida-renovari-constructii",
    title: "Evaluare rapida pentru renovari si constructii",
    shortTitle: "Evaluare rapida",
    metaTitle: "Evaluare rapida renovari si constructii | ZES Construct",
    metaDescription:
      "Cere evaluare rapida pentru renovari si constructii rezidentiale in Romania: apartamente, case, baie, bucatarie, finisaje si deviz.",
    lead:
      "Trimite o cerere scurta si afli ce informatii sunt necesare pentru o estimare responsabila.",
    image: planningImage,
    keywords: ["evaluare renovari", "oferta renovari", "deviz constructii", "firma renovari Romania"],
    projectType: "Alta lucrare rezidentiala",
    defaultBudgetRange: "De estimat",
    defaultPropertyStatus: "Locuinta existenta",
    qualification: [
      "Localitatea lucrarii.",
      "Tipul locuintei si suprafata aproximativa.",
      "Bugetul orientativ si termenul dorit.",
    ],
    related: ["firma-renovari-constructii-romania", "renovari-apartamente-romania", "constructii-case-romania"],
  }),
  makeLeadCapturePage({
    slug: "oferta-renovare-apartament-romania",
    title: "Oferta renovare apartament in Romania",
    shortTitle: "Oferta renovare apartament",
    metaTitle: "Oferta renovare apartament Romania | Deviz rapid pe etape",
    metaDescription:
      "Cere oferta pentru renovare apartament in Romania: instalatii, baie, bucatarie, finisaje, deviz pe etape si coordonare.",
    lead:
      "Pentru apartamente care trebuie renovate complet sau etapizat, cu deviz clar pe lucrari.",
    image: apartmentImage,
    keywords: ["oferta renovare apartament", "deviz renovare apartament", "renovare apartament Romania"],
    projectType: "Renovare apartament",
    defaultBudgetRange: "10.000 - 25.000 EUR",
    defaultPropertyStatus: "Locuinta existenta",
    qualification: [
      "Suprafata apartamentului si numarul de camere.",
      "Daca se schimba instalatiile electrice sau sanitare.",
      "Ce ramane in apartament si ce se demoleaza.",
    ],
    related: ["renovari-apartamente-romania", "cat-costa-renovarea-unui-apartament-bucuresti", "deviz-renovare-apartament-bucuresti"],
  }),
  makeLeadCapturePage({
    slug: "oferta-constructie-casa-romania",
    title: "Oferta constructie casa in Romania",
    shortTitle: "Oferta constructie casa",
    metaTitle: "Oferta constructie casa Romania | Etape, deviz, coordonare",
    metaDescription:
      "Cere oferta pentru constructie casa in Romania: lucrari la rosu, extinderi, instalatii, finisaje, deviz etapizat si coordonare.",
    lead:
      "Pentru case, extinderi si anexe unde trebuie stabilite etape, documente si buget realist.",
    image: houseImage,
    keywords: ["oferta constructie casa", "deviz constructie casa", "constructii case Romania"],
    projectType: "Constructie casa",
    defaultBudgetRange: "Peste 60.000 EUR",
    defaultPropertyStatus: "Teren / proiect in pregatire",
    qualification: [
      "Localitatea si accesul la teren sau casa.",
      "Stadiul proiectului tehnic si autorizatiile disponibile.",
      "Etapa dorita: rosu, gri, la cheie sau extindere.",
    ],
    related: ["constructii-case-romania", "constructii-case-ilfov", "extinderi-case-ilfov"],
  }),
  makeLeadCapturePage({
    slug: "oferta-renovare-baie-bucatarie",
    title: "Oferta renovare baie si bucatarie",
    shortTitle: "Oferta baie si bucatarie",
    metaTitle: "Oferta renovare baie si bucatarie | Instalatii si finisaje",
    metaDescription:
      "Cere oferta pentru renovare baie si bucatarie: instalatii sanitare si electrice, hidroizolatie, placari, mobilier si finisaje.",
    lead:
      "Pentru zonele critice ale locuintei, unde apa, electricul si finisajele trebuie coordonate corect.",
    image: bathroomImage,
    keywords: ["oferta renovare baie", "oferta renovare bucatarie", "renovare baie bucatarie"],
    projectType: "Baie / bucatarie",
    defaultBudgetRange: "10.000 - 25.000 EUR",
    defaultPropertyStatus: "Locuinta existenta",
    qualification: [
      "Dimensiunea baii sau bucatariei.",
      "Daca se schimba traseele de apa, scurgere sau electric.",
      "Daca exista mobilier sau obiecte sanitare deja alese.",
    ],
    related: ["renovari-baie-bucatarie-romania", "pret-renovare-baie-bucuresti", "montaj-gresie-faianta-bucuresti"],
  }),
  makeLeadCapturePage({
    slug: "oferta-amenajari-interioare-romania",
    title: "Oferta amenajari interioare in Romania",
    shortTitle: "Oferta amenajari interioare",
    metaTitle: "Oferta amenajari interioare Romania | Finisaje apartamente si case",
    metaDescription:
      "Cere oferta pentru amenajari interioare in Romania: finisaje, glet, zugraveli, pardoseli, iluminat, baie, bucatarie si coordonare.",
    lead:
      "Pentru apartamente si case care au nevoie de finisaje curate, materiale potrivite si coordonare.",
    image: interiorImage,
    keywords: ["oferta amenajari interioare", "amenajari interioare Romania", "finisaje interioare"],
    projectType: "Amenajare interioara",
    defaultBudgetRange: "25.000 - 60.000 EUR",
    defaultPropertyStatus: "Apartament nou",
    qualification: [
      "Tipul locuintei si suprafata.",
      "Stadiul finisajelor existente.",
      "Daca exista proiect de design, materiale alese sau mobilier comandat.",
    ],
    related: ["amenajari-interioare-romania", "finisaje-interioare-bucuresti", "zugraveli-glet-parchet-bucuresti"],
  }),
];

export const constructionGrowthPages = [
  ...constructionCostGuidePages,
  ...constructionServiceExpansionPages,
  ...constructionLocalExpansionPages,
  ...constructionNationalPages,
  ...constructionLeadCapturePages,
];

export const constructionAllPages = [
  ...constructionServices,
  ...constructionSeoPages,
  ...constructionGrowthPages,
];

export const constructionServiceMap = new Map(
  constructionServices.map((service) => [service.slug, service]),
);

export const constructionPageMap = new Map(
  constructionAllPages.map((page) => [page.slug, page]),
);

export const constructionFaq = [
  {
    question: "In ce zone lucrati?",
    answer:
      "Evaluam proiecte rezidentiale in Romania. Bucuresti, Ilfov si Arges sunt zone prioritare, iar pentru alte judete confirmam in functie de amploarea lucrarii, acces si calendar.",
  },
  {
    question: "Cum incepem discutia?",
    answer:
      "Trimite cateva detalii despre locatie, tipul lucrarii, termen si fotografii sau planuri daca exista. Revenim cu pasii de evaluare.",
  },
  {
    question: "Puteti face oferta fara vizita?",
    answer:
      "Putem pregati o estimare initiala, dar devizul responsabil se confirma dupa masuratori si verificarea conditiilor reale.",
  },
  {
    question: "Lucrati pentru persoane fizice?",
    answer:
      "Da. Lucram pentru proprietari, familii si investitori mici care au proiecte rezidentiale clare sau in etapa de estimare.",
  },
];

export function getConstructionUrl(path = "/") {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  return new URL(normalized, constructionDomain).toString();
}
