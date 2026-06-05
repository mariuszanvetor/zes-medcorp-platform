import type { FAQItem } from "@/components/seo/FAQSchema";
import { corporateVisuals, type VisualAsset } from "@/lib/visual-assets";

export type MaintenanceContractLink = {
  href: string;
  label: string;
};

export type MaintenanceContractPage = {
  slug: string;
  category: string;
  pageIntent: string;
  title: string;
  description: string;
  metadataTitle: string;
  metadataDescription: string;
  heroNote: string;
  zesPrompt: string;
  primaryCta: string;
  leadTitle: string;
  leadDescription: string;
  audiences: string[];
  coveredEquipment: string[];
  contractValue: string[];
  requiredInfo: string[];
  workflow: string[];
  serviceLevels: string[];
  complianceNote: string;
  faqs: FAQItem[];
  relatedLinks: MaintenanceContractLink[];
  visual: VisualAsset;
};

export const maintenanceHub = {
  path: "/contracte-mentenanta",
  title: "Contracte mentenanta aparatura medicala",
  description:
    "Planuri de mentenanta preventiva, service multimarca si suport tehnic pentru clinici, laboratoare si centre de imagistica care vor sa reduca downtime-ul si sa transforme service-ul intr-un proces predictibil.",
  metadataTitle: "Contracte mentenanta aparatura medicala | ZESCORP",
  metadataDescription:
    "Contracte de mentenanta pentru imagistica, radiologie digitala, ecografe, laborator IVD si service multimarca. Calculator orientativ si formular de evaluare.",
  zesPrompt: "Vreau un contract de mentenanta pentru aparatura medicala",
  primaryCta: "Solicita evaluare mentenanta",
};

const standardWorkflow = [
  "Inventar echipamente si locatii",
  "Prioritizare dupa criticitate si downtime",
  "Plan preventiv si nivel de raspuns",
  "Oferta contractuala si responsabilitati",
  "Revizii, interventii si raportare operationala",
];

const standardCompliance =
  "Planurile sunt orientative. Nivelul final de mentenanta depinde de producator, model, vechime, istoric de service, disponibilitatea pieselor si conditiile reale de exploatare.";

function route(slug: string) {
  return `/contracte-mentenanta/${slug}`;
}

export const maintenanceContractPages: MaintenanceContractPage[] = [
  {
    slug: "mentenanta-imagistica-medicala",
    category: "Imagistica medicala",
    pageIntent: "maintenance-imaging",
    title: "Mentenanta imagistica medicala",
    description:
      "Contracte de mentenanta pentru echipamente de imagistica, cu accent pe continuitate operationala, interventii planificate si reducerea riscului de downtime in clinici si centre medicale.",
    metadataTitle: "Mentenanta imagistica medicala | ZESCORP",
    metadataDescription:
      "Mentenanta preventiva si service pentru echipamente de imagistica medicala: inventar, plan de revizii, prioritate service si evaluare contractuala.",
    heroNote:
      "Imagistica are impact direct in programari, fluxul pacientilor si venituri. Contractul trebuie construit in jurul criticitatii echipamentului, nu doar in jurul unei revizii anuale.",
    zesPrompt: "Vreau mentenanta pentru echipamente de imagistica medicala",
    primaryCta: "Evalueaza mentenanta imagistica",
    leadTitle: "Solicita evaluare pentru mentenanta imagistica.",
    leadDescription:
      "Trimite inventarul aproximativ, orasul si numarul de locatii. Echipa ZESCORP poate propune un nivel de service potrivit criticitatii echipamentelor.",
    audiences: [
      "Centre de imagistica",
      "Clinici cu echipamente RX, CT sau RMN",
      "Administratori care urmaresc uptime si predictibilitate",
    ],
    coveredEquipment: [
      "RX digital si analog",
      "CT si camere de control",
      "RMN si infrastructura asociata",
      "Mamografie, C-Arm si sisteme de imagistica",
    ],
    contractValue: [
      "Reducerea interventiilor reactive prin revizii planificate",
      "Clarificarea prioritatilor pentru echipamente critice",
      "Plan de service corelat cu programul clinicii",
      "Istoric tehnic mai usor de urmarit pentru decizii de investitie",
    ],
    requiredInfo: [
      "Lista echipamentelor si producatorii",
      "Numarul de locatii",
      "Gradul de utilizare si criticitatea",
      "Istoric de defecte sau downtime",
    ],
    workflow: standardWorkflow,
    serviceLevels: ["Plan preventiv", "Plan operational", "Plan prioritar pentru echipamente critice"],
    complianceNote: standardCompliance,
    visual: corporateVisuals.maintenance,
    faqs: [
      {
        question: "Mentenanta preventiva elimina toate defectiunile?",
        answer:
          "Nu. Reduce riscul si imbunatateste controlul operational, dar nu poate elimina toate defectiunile sau indisponibilitatile neprevazute.",
      },
      {
        question: "Se poate face contract pentru mai multe marci?",
        answer:
          "Da, contractul poate fi structurat multimarca, cu limitari clare in functie de producator, piese, documentatie si acces tehnic.",
      },
      {
        question: "De ce conteaza numarul de locatii?",
        answer:
          "Locatiile influenteaza timpii de deplasare, prioritizarea interventiilor, stocurile utile si modul in care se organizeaza reviziile.",
      },
    ],
    relatedLinks: [
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/solutii-medicale/service-echipamente-medicale", label: "Service echipamente medicale" },
      { href: "/solutii-medicale/contracte-mentenanta-preventiva", label: "Mentenanta preventiva" },
      { href: "/projects", label: "Proiecte si infrastructura" },
    ],
  },
  {
    slug: "mentenanta-radiologie-digitala",
    category: "Radiologie digitala",
    pageIntent: "maintenance-digital-radiology",
    title: "Mentenanta radiologie digitala",
    description:
      "Planuri de mentenanta pentru camere RX, sisteme DR/CR, console, detectori si fluxuri digitale, cu suport pentru clinici care depind zilnic de radiologie.",
    metadataTitle: "Mentenanta radiologie digitala | ZESCORP",
    metadataDescription:
      "Contracte service si mentenanta radiologie digitala: RX, detectori, console, workflow, verificari preventive si suport operational.",
    heroNote:
      "Radiologia digitala combina echipament, statie de lucru, detectori, retea si flux operational. Un contract bun acopera sistemul, nu doar aparatul principal.",
    zesPrompt: "Vreau mentenanta pentru radiologie digitala",
    primaryCta: "Solicita plan radiologie",
    leadTitle: "Trimite datele camerei de radiologie pentru evaluare.",
    leadDescription:
      "Mentioneaza tipul sistemului RX, detectorii, orasul si daca exista probleme recurente de imagine, consola sau disponibilitate.",
    audiences: ["Clinici RX", "Centre de radiologie digitala", "Cabinete cu flux DR/CR"],
    coveredEquipment: ["Sisteme RX", "Detectori digitali", "Console si statii de lucru", "Accesorii si flux imagine"],
    contractValue: [
      "Reducerea blocajelor in programul de radiologie",
      "Verificari preventive ale componentelor critice",
      "Plan de escaladare pentru probleme de imagine sau consola",
      "Clarificarea responsabilitatilor intre echipament, IT si infrastructura",
    ],
    requiredInfo: ["Tip RX si producator", "Detectori si software", "Volum aproximativ de utilizare", "Probleme recurente"],
    workflow: standardWorkflow,
    serviceLevels: ["Revizie programata", "Suport operational", "Prioritate pentru downtime radiologie"],
    complianceNote:
      "Service-ul tehnic nu inlocuieste evaluarile sau validarile autorizate necesare pentru radioprotectie, CNCAN sau verificari reglementate.",
    visual: corporateVisuals.radiationProtection,
    faqs: [
      {
        question: "Contractul poate include si detectorii?",
        answer:
          "Da, daca informatiile despre detectori, producator si starea lor sunt disponibile pentru evaluare.",
      },
      {
        question: "Ce se intampla daca problema este de retea sau software?",
        answer:
          "Se poate face triere tehnica pentru a separa zona echipamentului de infrastructura IT sau fluxul de lucru.",
      },
      {
        question: "Radiologia are nevoie si de verificari de radioprotectie?",
        answer:
          "Da, acolo unde proiectul si reglementarile o cer. Aceste validari trebuie tratate separat de mentenanta tehnica a aparatului.",
      },
    ],
    relatedLinks: [
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotectie si plumbare RX" },
      { href: "/proiectare-radiologie", label: "Proiectare radiologie" },
      { href: "/service-radiologie-romania", label: "Service radiologie Romania" },
      { href: route("interventii-suport-tehnic"), label: "Interventii si suport tehnic" },
    ],
  },
  {
    slug: "mentenanta-ecografe",
    category: "Ecografie",
    pageIntent: "maintenance-ultrasound",
    title: "Mentenanta ecografe",
    description:
      "Contracte si suport pentru ecografe utilizate in cabinete, policlinici si clinici multi-specialitate, cu focus pe disponibilitate, sonde, accesorii si utilizare zilnica.",
    metadataTitle: "Mentenanta ecografe | ZESCORP",
    metadataDescription:
      "Mentenanta si service ecografe: evaluare inventar, sonde, accesorii, verificari preventive si plan de suport pentru clinici.",
    heroNote:
      "Ecograful pare un echipament mobil si simplu, dar downtime-ul sondei, al display-ului sau al unitatii principale poate bloca rapid activitatea cabinetului.",
    zesPrompt: "Vreau mentenanta pentru ecografe",
    primaryCta: "Evalueaza ecografele",
    leadTitle: "Solicita evaluare pentru ecografe si sonde.",
    leadDescription:
      "Trimite marca, modelul, numarul de sonde si locatia. Daca exista defecte active, descrie simptomul pe scurt.",
    audiences: ["Cabinete de ecografie", "Clinici multi-specialitate", "Centre de cardiologie, ginecologie sau medicina interna"],
    coveredEquipment: ["Ecografe stationare", "Ecografe portabile", "Sonde si accesorii", "Display, alimentare si conectivitate"],
    contractValue: [
      "Monitorizarea echipamentelor folosite zilnic",
      "Plan de verificare pentru sonde si accesorii",
      "Triage rapid pentru defecte recurente",
      "Recomandari pentru inlocuire, service sau upgrade",
    ],
    requiredInfo: ["Marca si model", "Numar de sonde", "Specialitatea utilizata", "Defecte sau alarme existente"],
    workflow: standardWorkflow,
    serviceLevels: ["Suport de baza", "Mentenanta preventiva", "Suport operational pentru flota de ecografe"],
    complianceNote: standardCompliance,
    visual: corporateVisuals.equipment,
    faqs: [
      {
        question: "Se poate include mentenanta sondelor?",
        answer:
          "Da, sondele pot fi incluse in inventar si tratate ca elemente critice, mai ales daca sunt folosite intensiv.",
      },
      {
        question: "Pot solicita service pentru un singur ecograf?",
        answer:
          "Da. Pagina este utila si pentru contracte recurente, si pentru evaluarea unei nevoi punctuale care poate deveni plan de mentenanta.",
      },
      {
        question: "Este nevoie de poze sau coduri de eroare?",
        answer:
          "Sunt utile, dar nu obligatorii pentru prima discutie. Nu incarcati date medicale ale pacientilor.",
      },
    ],
    relatedLinks: [
      { href: "/solutii-medicale/ecografe-sisteme-ultrasunete", label: "Ecografe si sisteme ultrasunete" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: route("contracte-service-multimarca"), label: "Contracte service multimarca" },
      { href: "/contact", label: "Contact ZESCORP" },
    ],
  },
  {
    slug: "mentenanta-laborator-ivd",
    category: "Laborator / IVD",
    pageIntent: "maintenance-laboratory-ivd",
    title: "Mentenanta laborator / IVD",
    description:
      "Mentenanta pentru echipamente de laborator si IVD, cu accent pe continuitatea fluxului de probe, preventie, suport operational si clarificarea responsabilitatilor tehnice.",
    metadataTitle: "Mentenanta laborator IVD | ZESCORP",
    metadataDescription:
      "Contracte mentenanta laborator si IVD: analizatoare, echipamente auxiliare, flux operational, preventie si suport tehnic.",
    heroNote:
      "In laborator, continuitatea nu depinde doar de aparatul principal. Depinde de consumabile, utilitati, accesorii, calibrare, software si ritmul real de lucru.",
    zesPrompt: "Vreau mentenanta pentru laborator sau echipamente IVD",
    primaryCta: "Evalueaza laboratorul",
    leadTitle: "Trimite inventarul laboratorului pentru plan de mentenanta.",
    leadDescription:
      "Mentioneaza tipurile de analizatoare, numarul de locatii si daca exista echipamente critice pentru fluxul zilnic.",
    audiences: ["Laboratoare private", "Clinici cu laborator intern", "Centre care folosesc analizatoare IVD"],
    coveredEquipment: ["Analizatoare IVD", "Echipamente auxiliare", "Sisteme de probe si accesorii", "Echipamente de suport laborator"],
    contractValue: [
      "Reducerea blocajelor in fluxul de probe",
      "Planificarea reviziilor fara intreruperi majore",
      "Clarificarea pieselor, consumabilelor si responsabilitatilor",
      "Prioritizarea echipamentelor critice pentru raportare",
    ],
    requiredInfo: ["Lista analizatoarelor", "Volum aproximativ de probe", "Contracte existente", "Probleme recurente sau downtime"],
    workflow: standardWorkflow,
    serviceLevels: ["Plan preventiv laborator", "Plan operational IVD", "Suport prioritar pentru echipamente critice"],
    complianceNote:
      "Cerintele finale pot depinde de producator, proceduri interne, validari de laborator si reglementari aplicabile. Evaluarea initiala nu inlocuieste validarea responsabililor competenti.",
    visual: corporateVisuals.laboratory,
    faqs: [
      {
        question: "Contractul poate include echipamente de la producatori diferiti?",
        answer:
          "Da, cu limite tehnice clare si cu verificarea accesului la documentatie, piese, consumabile si suport producator.",
      },
      {
        question: "Ce conteaza cel mai mult in laborator?",
        answer:
          "Criticitatea echipamentelor, volumul de lucru, dependenta de consumabile si impactul opririi asupra fluxului de probe.",
      },
      {
        question: "Se poate incepe fara inventar complet?",
        answer:
          "Da. Se poate porni cu o lista aproximativa, iar inventarul poate fi clarificat in etapa urmatoare.",
      },
    ],
    relatedLinks: [
      { href: "/solutii-medicale/echipamente-laborator-ivd", label: "Echipamente laborator / IVD" },
      { href: "/calculatoare/cost-laborator-ivd", label: "Calculator laborator IVD" },
      { href: route("contracte-service-multimarca"), label: "Service multimarca" },
      { href: "/projects", label: "Proiecte ZESCORP" },
    ],
  },
  {
    slug: "contracte-service-multimarca",
    category: "Service multimarca",
    pageIntent: "multi-vendor-service-contracts",
    title: "Contracte service multimarca",
    description:
      "Contracte service pentru clinici cu echipamente de la mai multi producatori, structurate pe inventar, criticitate, responsabilitati si niveluri de raspuns.",
    metadataTitle: "Contracte service multimarca | ZESCORP",
    metadataDescription:
      "Service multimarca aparatura medicala: contracte pentru clinici cu inventar mixt, preventie, suport tehnic si prioritizare operationala.",
    heroNote:
      "Un inventar mixt are nevoie de reguli clare: ce se poate acoperi direct, ce necesita producatorul si ce trebuie escaladat.",
    zesPrompt: "Vreau contract service multimarca pentru aparatura medicala",
    primaryCta: "Structureaza contractul",
    leadTitle: "Solicita structurarea unui contract service multimarca.",
    leadDescription:
      "Trimite categoriile de echipamente, numarul aproximativ de aparate si locatiile. Nu este necesar inventar perfect pentru prima evaluare.",
    audiences: ["Policlinici cu inventar mixt", "Retele de clinici", "Administratori care vor un singur cadru de suport"],
    coveredEquipment: ["Imagistica", "Ecografe", "Laborator / IVD", "Monitoare, sterilizare si echipamente biomedicale"],
    contractValue: [
      "Un singur cadru operational pentru mai multe categorii",
      "Excluderi si responsabilitati explicite",
      "Prioritizare in functie de criticitate",
      "Planificare mai buna a bugetului de service",
    ],
    requiredInfo: ["Categorii de echipamente", "Numar aproximativ de aparate", "Locatii", "Contracte sau garantii active"],
    workflow: standardWorkflow,
    serviceLevels: ["Inventar si triere", "Mentenanta recurenta", "Suport prioritar pe categorii critice"],
    complianceNote: standardCompliance,
    visual: corporateVisuals.maintenance,
    faqs: [
      {
        question: "Ce inseamna multimarca?",
        answer:
          "Inseamna ca inventarul include echipamente de la producatori diferiti, iar contractul defineste clar ce poate fi acoperit si ce necesita escaladare.",
      },
      {
        question: "Se pot include echipamente in garantie?",
        answer:
          "Da, dar responsabilitatile trebuie clarificate pentru a nu interfera cu garantia sau cu obligatiile producatorului.",
      },
      {
        question: "Este potrivit pentru retele de clinici?",
        answer:
          "Da, mai ales daca exista mai multe locatii si un inventar eterogen care trebuie prioritizat.",
      },
    ],
    relatedLinks: [
      { href: "/solutii-medicale/service-multi-vendor", label: "Service multi-vendor" },
      { href: "/solutii-medicale/service-echipamente-medicale", label: "Service echipamente medicale" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    slug: "interventii-suport-tehnic",
    category: "Suport tehnic",
    pageIntent: "technical-support-interventions",
    title: "Interventii si suport tehnic",
    description:
      "Suport tehnic pentru echipamente medicale, interventii planificate sau prioritare si triere pentru probleme care afecteaza operarea clinicii.",
    metadataTitle: "Interventii si suport tehnic aparatura medicala | ZESCORP",
    metadataDescription:
      "Interventii service si suport tehnic pentru aparatura medicala: triere, prioritizare, plan de actiune si cerere de evaluare.",
    heroNote:
      "Nu orice problema necesita acelasi raspuns. Un caz de downtime clinic trebuie separat rapid de o interventie planificata sau o revizie preventiva.",
    zesPrompt: "Am nevoie de interventie sau suport tehnic pentru aparatura medicala",
    primaryCta: "Solicita suport tehnic",
    leadTitle: "Trimite cazul pentru triere tehnica.",
    leadDescription:
      "Descrie echipamentul, simptomul, orasul si urgenta. Pentru echipamente cu functionare nesigura, opriti utilizarea pana la evaluarea corespunzatoare.",
    audiences: ["Clinici cu echipamente indisponibile", "Administratori tehnici", "Unitati care au nevoie de triere rapida"],
    coveredEquipment: ["Echipamente de imagistica", "Monitoare si echipamente biomedicale", "Ecografe", "Laborator si IVD"],
    contractValue: [
      "Triage rapid pentru cazuri active",
      "Separarea urgentelor de interventii planificate",
      "Baza pentru contract de mentenanta ulterior",
      "Recomandari de continuitate dupa interventie",
    ],
    requiredInfo: ["Tip echipament", "Marca si model", "Simptom sau cod eroare", "Oras si nivel de urgenta"],
    workflow: ["Triage caz", "Colectare date minime", "Prioritizare", "Clarificare interventie", "Recomandare service sau contract"],
    serviceLevels: ["Interventie planificata", "Suport accelerat", "Triage prioritar pentru downtime"],
    complianceNote:
      "Nu deschideti si nu reparati echipamente medicale fara personal calificat. Pentru aparatura cu functionare nesigura, opriti utilizarea pana la evaluare.",
    visual: corporateVisuals.service,
    faqs: [
      {
        question: "Ce informatii sunt esentiale pentru o interventie?",
        answer:
          "Tipul echipamentului, marca, modelul, simptomul, orasul, urgenta si daca exista coduri de eroare sau poze fara date de pacient.",
      },
      {
        question: "Pot transforma o interventie intr-un contract?",
        answer:
          "Da. Dupa triere sau prima interventie se poate discuta un plan de mentenanta recurenta pentru reducerea riscului viitor.",
      },
      {
        question: "Se pot trimite poze sau etichete?",
        answer:
          "Da, sunt utile pentru triere. Nu includeti date medicale ale pacientilor sau informatii sensibile inutile.",
      },
    ],
    relatedLinks: [
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/service-diagnostic", label: "Diagnostic service" },
      { href: route("contracte-service-multimarca"), label: "Contracte service multimarca" },
      { href: "/contact", label: "Contact rapid" },
    ],
  },
];

export function getMaintenanceContractPage(slug: string) {
  return maintenanceContractPages.find((page) => page.slug === slug);
}
