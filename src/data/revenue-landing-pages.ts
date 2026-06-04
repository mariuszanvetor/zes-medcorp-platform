import type { FAQItem } from "@/components/seo/FAQSchema";

export type RevenuePillar =
  | "medical-infrastructure"
  | "medical-equipment"
  | "service-maintenance";

export type RevenueLandingLink = {
  href: string;
  label: string;
};

export type RevenueLandingPage = {
  slug: string;
  pillar: RevenuePillar;
  pageIntent: string;
  eyebrow: string;
  title: string;
  description: string;
  metadataTitle: string;
  metadataDescription: string;
  keywords: string[];
  heroNote: string;
  zesPrompt: string;
  primaryCta: string;
  leadTitle: string;
  leadDescription: string;
  audiences: string[];
  scopeItems: string[];
  requiredInfo: string[];
  workflow: string[];
  mistakes: string[];
  complianceNote: string;
  faqs: FAQItem[];
  relatedLinks: RevenueLandingLink[];
};

export const revenuePillarLabels: Record<RevenuePillar, string> = {
  "medical-infrastructure": "Infrastructură medicală",
  "medical-equipment": "Echipamente medicale",
  "service-maintenance": "Service & mentenanță",
};

export const revenuePillarDescriptions: Record<RevenuePillar, string> = {
  "medical-infrastructure":
    "Spații medicale, camere de imagistică, ecranări și integrarea instalațiilor cu echipamentele reale.",
  "medical-equipment":
    "Selecție tehnico-comercială, ofertare și integrare pentru echipamente de diagnostic, laborator și digitalizare.",
  "service-maintenance":
    "Continuitate operațională prin service, mentenanță preventivă, relocare, instalare și suport multi-vendor.",
};

const infrastructureCompliance =
  "Cerințele finale depind de echipament, amplasament și documentația proiectului. Soluțiile tehnice și cerințele de autorizare se validează înainte de execuție cu specialiști competenți.";
const equipmentCompliance =
  "Configurația finală se stabilește după clarificarea aplicației clinice, a specificațiilor tehnice și a condițiilor de instalare. Pagina nu reprezintă o ofertă comercială finală.";
const serviceCompliance =
  "Triage-ul inițial nu înlocuiește diagnosticul tehnic realizat de personal calificat. Nu utilizați echipamente cu funcționare nesigură până la evaluarea corespunzătoare.";

const infrastructureWorkflow = [
  "Clarificare proiect și echipament",
  "Revizuire spațiu, planuri și dependențe",
  "Validare tehnică preliminară",
  "Ofertare și etapizare",
  "Implementare coordonată",
];

const equipmentWorkflow = [
  "Clarificare aplicație clinică",
  "Definire configurație și opțiuni",
  "Verificare infrastructură și integrare",
  "Ofertare tehnico-comercială",
  "Livrare, instalare și suport",
];

const serviceWorkflow = [
  "Triage solicitare",
  "Colectare date echipament",
  "Prioritizare și clarificări",
  "Ofertă sau plan de intervenție",
  "Service și recomandări de continuitate",
];

function route(slug: string) {
  return `/solutii-medicale/${slug}`;
}

export const revenueLandingPages: RevenueLandingPage[] = [
  {
    slug: "camere-ct",
    pillar: "medical-infrastructure",
    pageIntent: "ct-room-infrastructure",
    eyebrow: "Infrastructură CT",
    title: "Camere CT: proiectare, radioprotecție și pregătire pentru instalare",
    description:
      "Planificare tehnică pentru camere CT noi, relocări și modernizări: layout, radioprotecție, electric, HVAC, acces și documentație corelate înainte de execuție.",
    metadataTitle: "Camere CT: proiectare și infrastructură | ZESCORP",
    metadataDescription:
      "Proiectare și amenajare camere CT: radioprotecție, instalații electrice, HVAC, acces, documentație și suport tehnic pentru ofertare.",
    keywords: ["proiectare cameră CT", "amenajare cameră CT", "radioprotecție CT", "infrastructură CT"],
    heroNote:
      "O cameră CT corect pregătită reduce modificările după livrarea echipamentului și clarifică din timp pașii tehnici.",
    zesPrompt: "Am nevoie de proiectare și infrastructură pentru o cameră CT",
    primaryCta: "Discută camera CT cu ZES",
    leadTitle: "Trimite datele proiectului CT pentru evaluare preliminară.",
    leadDescription:
      "Spune-ne dacă este un proiect nou, o relocare sau o modernizare. Un plan și modelul echipamentului accelerează discuția tehnică.",
    audiences: [
      "Clinici care pregătesc un CT nou",
      "Centre de imagistică ce relochează sau înlocuiesc echipamentul",
      "Investitori care verifică un spațiu înainte de achiziție",
    ],
    scopeItems: [
      "Layout cameră, consolă și circulații",
      "Radioprotecție, uși și vitraje protejate",
      "Alimentare electrică, UPS și trasee",
      "HVAC, răcire și condiții de exploatare",
      "Acces pentru instalare și service",
    ],
    requiredInfo: ["Plan sau releveu", "Model CT sau specificație preliminară", "Spațiu existent ori construcție nouă", "Oraș și termen estimat"],
    workflow: infrastructureWorkflow,
    mistakes: ["Alegerea spațiului fără verificarea accesului", "Pornirea finisajelor înainte de radioprotecție", "Subestimarea cerințelor electrice și HVAC"],
    complianceNote: infrastructureCompliance,
    faqs: [
      { question: "Puteți evalua o cameră CT înainte de alegerea aparatului?", answer: "Da, preliminar. Validarea finală depinde de modelul echipamentului și de cerințele furnizorului." },
      { question: "Radioprotecția CT este o soluție standard?", answer: "Nu. Configurația se stabilește în funcție de aparat, plan, vecinătăți și utilizarea estimată." },
      { question: "Este util un plan simplu al spațiului?", answer: "Da. Un releveu cu dimensiuni și vecinătăți este suficient pentru prima discuție tehnică." },
    ],
    relatedLinks: [
      { href: route("radioprotectie-imagistica"), label: "Radioprotecție pentru imagistică" },
      { href: "/servicii/proiectare-camera-ct", label: "Ghid detaliat proiectare cameră CT" },
      { href: "/calculatoare/cost-camera-ct", label: "Estimare preliminară cost cameră CT" },
      { href: route("instalare-punere-in-functiune"), label: "Instalare și punere în funcțiune" },
    ],
  },
  {
    slug: "camere-rmn",
    pillar: "medical-infrastructure",
    pageIntent: "mri-room-infrastructure",
    eyebrow: "Infrastructură RMN",
    title: "Camere RMN: RF shielding, integrare și pregătire tehnică",
    description:
      "Planificare pentru camere RMN și relocări de echipamente: cușcă Faraday, penetrații RF, HVAC, acces de instalare, trasee tehnice și coordonare cu furnizorul.",
    metadataTitle: "Camere RMN și RF shielding | ZESCORP",
    metadataDescription:
      "Proiectare camere RMN: RF shielding, cușcă Faraday, HVAC, acces de instalare, trasee tehnice și integrare echipament.",
    keywords: ["proiectare cameră RMN", "amenajare cameră RMN", "RF shielding RMN", "cușcă Faraday RMN"],
    heroNote:
      "Într-un proiect RMN, RF shielding, accesul de instalare și instalațiile auxiliare trebuie coordonate ca un singur sistem.",
    zesPrompt: "Am nevoie de o cameră RMN și vreau să verific infrastructura",
    primaryCta: "Discută camera RMN cu ZES",
    leadTitle: "Pregătește evaluarea preliminară pentru camera RMN.",
    leadDescription:
      "Trimite contextul spațiului, puterea magnetului dacă este cunoscută și stadiul proiectului. Planul poate fi adăugat ulterior.",
    audiences: ["Centre RMN noi", "Clinici care extind imagistica", "Echipe care relochează un sistem RMN"],
    scopeItems: ["Cușcă Faraday și uși RF", "Waveguides, filtre și penetrații", "HVAC și răcire", "Acces pentru magnet și service", "Coordonare quench și siguranță tehnică"],
    requiredInfo: ["Planul spațiului", "Tip RMN și putere magnet", "Acces disponibil pentru instalare", "Calendar și stadiu proiect"],
    workflow: infrastructureWorkflow,
    mistakes: ["Confundarea RF shielding cu plumbarea RX", "Neglijarea traseului de instalare", "Stabilirea HVAC-ului fără cerințele furnizorului"],
    complianceNote: infrastructureCompliance,
    faqs: [
      { question: "Camera RMN are nevoie de plumbare?", answer: "RMN necesită RF shielding, nu radioprotecție cu plumb ca un sistem RX sau CT. Cerințele sunt diferite." },
      { question: "Puteți analiza un spațiu existent?", answer: "Da. Evaluarea preliminară urmărește dimensiunile, accesul, structura și dependențele tehnice." },
      { question: "Când trebuie implicat furnizorul RMN?", answer: "Cât mai devreme, pentru corelarea infrastructurii cu modelul concret de echipament." },
    ],
    relatedLinks: [
      { href: route("rf-shielding-rmn"), label: "RF shielding pentru RMN" },
      { href: "/servicii/proiectare-camera-rmn", label: "Ghid detaliat proiectare cameră RMN" },
      { href: "/calculatoare/cost-camera-rmn", label: "Estimare preliminară cost cameră RMN" },
      { href: route("relocare-echipamente-medicale"), label: "Relocare echipamente medicale" },
    ],
  },
  {
    slug: "rf-shielding-rmn",
    pillar: "medical-infrastructure",
    pageIntent: "rf-shielding-mri",
    eyebrow: "Ecranare RF",
    title: "RF shielding pentru camere RMN",
    description:
      "Soluții de ecranare RF pentru RMN: cușcă Faraday, uși, ferestre, filtre și penetrații integrate cu instalațiile și cerințele echipamentului.",
    metadataTitle: "RF shielding pentru camere RMN | ZESCORP",
    metadataDescription:
      "RF shielding și cuști Faraday pentru camere RMN: integrare uși, ferestre, filtre, penetrații și validare tehnică.",
    keywords: ["RF shielding RMN", "cușcă Faraday RMN", "ecranare RF cameră RMN", "ușă RF RMN"],
    heroNote:
      "Integritatea ecranării depinde de detalii: fiecare ușă, filtru și penetrație trebuie corelată cu proiectul real.",
    zesPrompt: "Am nevoie de RF shielding pentru o cameră RMN",
    primaryCta: "Discută RF shielding cu ZES",
    leadTitle: "Trimite contextul camerei RMN pentru o discuție despre RF shielding.",
    leadDescription:
      "Un plan, modelul echipamentului și lista preliminară de penetrații ajută echipa să pregătească următorii pași.",
    audiences: ["Centre RMN noi", "Proiecte de relocare RMN", "Camere care necesită modernizare sau verificare RF"],
    scopeItems: ["Cușcă Faraday", "Uși și ferestre RF", "Filtre electrice și waveguides", "Penetrații HVAC și trasee", "Testare și validare tehnică"],
    requiredInfo: ["Plan cameră", "Model RMN", "Lista penetrărilor cunoscute", "Stadiul amenajării"],
    workflow: infrastructureWorkflow,
    mistakes: ["Tratarea ecranării RF ca lucrare izolată", "Modificarea penetrărilor după montaj", "Confundarea RF shielding cu radioprotecția"],
    complianceNote: infrastructureCompliance,
    faqs: [
      { question: "RF shielding este același lucru cu radioprotecția?", answer: "Nu. RF shielding controlează interferențele electromagnetice pentru RMN; radioprotecția este relevantă pentru RX și CT." },
      { question: "Se pot adăuga ulterior penetrații?", answer: "Orice modificare trebuie analizată atent, deoarece poate afecta integritatea ecranării." },
      { question: "Este necesară testarea finală?", answer: "Da. Soluția trebuie verificată conform cerințelor proiectului și echipamentului." },
    ],
    relatedLinks: [{ href: route("camere-rmn"), label: "Camere RMN" }, { href: "/services/rf-shielding", label: "Serviciul RF shielding" }, { href: "/comparatii/rf-shielding-vs-radioprotectie", label: "RF shielding vs radioprotecție" }, { href: "/calculatoare/rf-shielding-estimare", label: "Estimare RF shielding" }],
  },
  {
    slug: "radioprotectie-imagistica",
    pillar: "medical-infrastructure",
    pageIntent: "radiation-protection-imaging",
    eyebrow: "Radioprotecție",
    title: "Radioprotecție pentru RX, CT și spații de imagistică",
    description:
      "Evaluare preliminară și planificare pentru pereți, uși, vitraje și vecinătăți în spații RX și CT, cu validare de specialitate înainte de execuție.",
    metadataTitle: "Radioprotecție RX și CT | ZESCORP",
    metadataDescription:
      "Radioprotecție pentru camere RX și CT: evaluare preliminară, plumbare, uși, vitraje și planificare tehnică validată de specialiști.",
    keywords: ["radioprotecție RX", "plumbare cameră RX", "radioprotecție CT", "ușă plumbată radiologie"],
    heroNote:
      "Soluția nu pornește de la o grosime universală, ci de la aparat, plan, vecinătăți și utilizarea reală.",
    zesPrompt: "Am nevoie de radioprotecție pentru o cameră RX sau CT",
    primaryCta: "Discută radioprotecția cu ZES",
    leadTitle: "Trimite planul și contextul camerei pentru evaluare preliminară.",
    leadDescription: "Spune-ne tipul echipamentului, orașul și dacă spațiul este existent sau nou.",
    audiences: ["Clinici cu cameră RX", "Centre CT", "Proiecte de mamografie sau fluoroscopie"],
    scopeItems: ["Pereți, tavane și pardoseli", "Uși și vitraje radioprotejate", "Vecinătăți și fluxuri", "Poziționare echipament", "Context preliminar pentru pașii CNCAN"],
    requiredInfo: ["Tip echipament", "Plan și vecinătăți", "Spațiu existent sau nou", "Termen orientativ"],
    workflow: infrastructureWorkflow,
    mistakes: ["Comandarea materialelor prea devreme", "Omiterea vecinătăților", "Confundarea radioprotecției RX/CT cu RF shielding RMN"],
    complianceNote: "Estimările sunt preliminare. Grosimile și configurația finală de radioprotecție trebuie validate de specialist autorizat.",
    faqs: [
      { question: "Cât plumb este necesar?", answer: "Nu există o grosime universală. Configurația trebuie stabilită pentru proiectul real și validată de specialist autorizat." },
      { question: "Pot solicita ofertă cu un plan preliminar?", answer: "Da. Se poate pregăti o listă de clarificări și o evaluare inițială." },
      { question: "Radioprotecția este necesară și pentru RMN?", answer: "RMN are cerințe RF distincte. Nu trebuie confundate cu plumbarea pentru RX sau CT." },
    ],
    relatedLinks: [{ href: "/radioprotectie-plumbare-rx", label: "Radioprotecție și plumbare camere RX" }, { href: "/plumbare-radiologica", label: "Plumbare radiologică" }, { href: route("camere-ct"), label: "Camere CT" }, { href: "/knowledge-hub/cat-costa-plumbarea-unei-camere-rx", label: "Cât costă plumbarea unei camere RX?" }],
  },
  {
    slug: "dezvoltare-unitati-medicale",
    pillar: "medical-infrastructure",
    pageIntent: "medical-facility-development",
    eyebrow: "Dezvoltare medicală",
    title: "Dezvoltare și amenajare unități medicale",
    description:
      "Coordonare pentru clinici, centre de diagnostic și laboratoare: spații, fluxuri, instalații, echipamente și etapizare pentru implementare realistă.",
    metadataTitle: "Dezvoltare și amenajare unități medicale | ZESCORP",
    metadataDescription: "Planificare și amenajare unități medicale: clinici, centre de diagnostic și laboratoare coordonate cu echipamentele și fluxurile reale.",
    keywords: ["amenajare clinică medicală", "dezvoltare clinică", "infrastructură medicală", "fit-out medical"],
    heroNote: "Un proiect medical funcțional leagă arhitectura de echipamente, instalații și operarea de zi cu zi.",
    zesPrompt: "Vreau să dezvolt sau să modernizez o unitate medicală",
    primaryCta: "Discută proiectul cu ZES",
    leadTitle: "Trimite datele unității medicale pentru o discuție aplicată.",
    leadDescription: "Poți începe cu funcțiunile dorite, suprafața aproximativă și termenul proiectului.",
    audiences: ["Clinici noi", "Unități medicale în modernizare", "Investitori care evaluează un spațiu"],
    scopeItems: ["Funcțiuni și fluxuri", "Infrastructură electrică și HVAC", "Integrare echipamente", "Etapizare și continuitate", "Coordonare documentație"],
    requiredInfo: ["Tip unitate", "Suprafață și plan", "Servicii medicale vizate", "Termen și etapă de bugetare"],
    workflow: infrastructureWorkflow,
    mistakes: ["Blocarea compartimentării prea devreme", "Bugetarea separată de echipamente", "Ignorarea service-ului și extinderii viitoare"],
    complianceNote: infrastructureCompliance,
    faqs: [
      { question: "Puteți lucra pe spații existente?", answer: "Da. Modernizarea etapizată este frecventă și trebuie corelată cu activitatea clinicii." },
      { question: "Când trebuie discutate echipamentele?", answer: "Din faza preliminară, pentru că influențează instalațiile, spațiul și calendarul." },
      { question: "Este necesar un proiect complet pentru prima discuție?", answer: "Nu. O schiță și lista funcțiunilor sunt suficiente pentru trierea inițială." },
    ],
    relatedLinks: [{ href: "/amenajare-centre-imagistica", label: "Amenajare centre imagistică" }, { href: "/services/amenajari-medicale", label: "Amenajări medicale" }, { href: route("echipamente-laborator-ivd"), label: "Echipamente laborator / IVD" }, { href: route("contracte-mentenanta-preventiva"), label: "Contracte de mentenanță preventivă" }],
  },
  {
    slug: "echipamente-imagistica-diagnostic",
    pillar: "medical-equipment",
    pageIntent: "diagnostic-imaging-equipment",
    eyebrow: "Echipamente imagistică",
    title: "Echipamente de imagistică medicală pentru diagnostic",
    description:
      "Suport pentru selecție, ofertare și integrare de echipamente RX, CT, RMN și soluții de imagistică, corelate cu aplicația clinică și infrastructura disponibilă.",
    metadataTitle: "Echipamente imagistică medicală | ZESCORP",
    metadataDescription: "Echipamente RX, CT și RMN pentru diagnostic: selecție tehnico-comercială, ofertare, integrare și suport de implementare.",
    keywords: ["echipamente imagistică medicală", "ofertă CT", "ofertă RMN", "aparatură radiologie"],
    heroNote: "Alegerea echipamentului și verificarea infrastructurii trebuie tratate împreună, nu în etape izolate.",
    zesPrompt: "Vreau ofertă pentru echipamente de imagistică medicală",
    primaryCta: "Pregătește cererea de ofertă cu ZES",
    leadTitle: "Spune-ne ce tip de echipament de imagistică ai în vedere.",
    leadDescription: "Aplicația clinică, bugetul orientativ și termenul ajută la structurarea cererii comerciale.",
    audiences: ["Clinici care deschid imagistică", "Centre care înlocuiesc echipamente", "Investitori care compară scenarii"],
    scopeItems: ["RX, CT și RMN", "Configurații și opțiuni", "Infrastructură necesară", "Instalare și commissioning", "Service și mentenanță"],
    requiredInfo: ["Tip investigații", "Echipament dorit", "Spațiu disponibil", "Buget și termen orientativ"],
    workflow: equipmentWorkflow,
    mistakes: ["Compararea exclusivă pe preț", "Neglijarea infrastructurii", "Omiterea service-ului și trainingului"],
    complianceNote: equipmentCompliance,
    faqs: [
      { question: "Puteți ajuta înainte de alegerea modelului exact?", answer: "Da. Clarificăm aplicația, infrastructura și criteriile utile pentru ofertare." },
      { question: "Includeți și instalarea?", answer: "Poate fi inclusă în discuția tehnico-comercială, împreună cu punerea în funcțiune și suportul." },
      { question: "Ce informație este cea mai utilă la început?", answer: "Tipul investigațiilor, volumul estimat și termenul achiziției." },
    ],
    relatedLinks: [{ href: route("camere-ct"), label: "Camere CT" }, { href: route("camere-rmn"), label: "Camere RMN" }, { href: route("instalare-punere-in-functiune"), label: "Instalare și commissioning" }, { href: "/proposal-builder", label: "Proposal Builder" }],
  },
  {
    slug: "ecografe-sisteme-ultrasunete",
    pillar: "medical-equipment",
    pageIntent: "ultrasound-equipment",
    eyebrow: "Ecografie",
    title: "Ecografe și sisteme de ultrasunete",
    description: "Selecție și ofertare pentru ecografe destinate cabinetelor, clinicilor și spitalelor, cu atenție la aplicații, transductori, mobilitate și suport tehnic.",
    metadataTitle: "Ecografe și sisteme ultrasunete | ZESCORP",
    metadataDescription: "Ecografe pentru clinici și spitale: selecție, ofertare, configurații, transductori, instalare și suport tehnic.",
    keywords: ["ofertă ecograf", "ecograf clinică", "sistem ultrasunete medical", "ecograf doppler"],
    heroNote: "Configurația potrivită pornește de la aplicațiile clinice și fluxul real, nu doar de la lista de opțiuni.",
    zesPrompt: "Vreau ofertă pentru un ecograf",
    primaryCta: "Discută configurația cu ZES",
    leadTitle: "Pregătește cererea pentru un sistem de ecografie.",
    leadDescription: "Spune-ne specialitatea, aplicațiile principale și termenul achiziției.",
    audiences: ["Cabinete de specialitate", "Clinici multidisciplinare", "Spitale și centre de diagnostic"],
    scopeItems: ["Aplicații clinice", "Transductori", "Doppler și opțiuni software", "Mobilitate și ergonomie", "Service și training"],
    requiredInfo: ["Specialitate", "Aplicații principale", "Buget orientativ", "Termen achiziție"],
    workflow: equipmentWorkflow,
    mistakes: ["Alegerea unui pachet generic", "Subestimarea transductorilor necesari", "Neglijarea suportului post-instalare"],
    complianceNote: equipmentCompliance,
    faqs: [
      { question: "Ce trebuie precizat pentru ofertă?", answer: "Specialitatea, tipurile de examinări, transductorii necesari și termenul dorit." },
      { question: "Puteți discuta și trainingul?", answer: "Da. Trainingul și suportul tehnic pot fi clarificate împreună cu configurația." },
      { question: "Este util bugetul orientativ?", answer: "Da. Ajută la compararea unor configurații realiste pentru aplicația clinică." },
    ],
    relatedLinks: [{ href: route("service-echipamente-medicale"), label: "Service echipamente medicale" }, { href: route("contracte-mentenanta-preventiva"), label: "Mentenanță preventivă" }, { href: route("instalare-punere-in-functiune"), label: "Instalare și punere în funcțiune" }, { href: "/contact", label: "Contact tehnico-comercial" }],
  },
  {
    slug: "sisteme-mamografie",
    pillar: "medical-equipment",
    pageIntent: "mammography-equipment",
    eyebrow: "Mamografie",
    title: "Sisteme de mamografie și integrare tehnică",
    description: "Suport tehnico-comercial pentru sisteme de mamografie, integrarea în fluxul clinic și corelarea cu cerințele spațiului și radioprotecției.",
    metadataTitle: "Sisteme mamografie și integrare | ZESCORP",
    metadataDescription: "Sisteme de mamografie pentru clinici: ofertare, integrare tehnică, radioprotecție, instalare și suport.",
    keywords: ["sistem mamografie", "ofertă mamograf", "mamografie digitală", "radioprotecție mamografie"],
    heroNote: "Mamografia trebuie discutată împreună cu fluxul clinic, spațiul și cerințele de radioprotecție.",
    zesPrompt: "Vreau ofertă și integrare pentru un sistem de mamografie",
    primaryCta: "Discută mamografia cu ZES",
    leadTitle: "Trimite contextul pentru ofertarea sistemului de mamografie.",
    leadDescription: "Spune-ne dacă este un cabinet nou, o înlocuire de aparat sau o modernizare.",
    audiences: ["Centre de screening", "Clinici de imagistică", "Spitale și centre medicale"],
    scopeItems: ["Configurație sistem", "Flux pacient", "Spațiu și radioprotecție", "Integrare digitală", "Instalare și mentenanță"],
    requiredInfo: ["Tip proiect", "Spațiu disponibil", "Configurație dorită", "Termen orientativ"],
    workflow: equipmentWorkflow,
    mistakes: ["Alegerea aparatului fără analiza camerei", "Separarea radioprotecției de ofertare", "Neglijarea fluxului și trainingului"],
    complianceNote: equipmentCompliance,
    faqs: [
      { question: "Este necesară analiza spațiului?", answer: "Da. Integrarea trebuie corelată cu planul, fluxul și radioprotecția." },
      { question: "Puteți ajuta și cu camera?", answer: "Da. Putem discuta infrastructura și echipamentul în același context." },
      { question: "Includeți mentenanța?", answer: "Contractul de mentenanță poate fi clarificat în etapa comercială." },
    ],
    relatedLinks: [{ href: route("radioprotectie-imagistica"), label: "Radioprotecție imagistică" }, { href: route("instalare-punere-in-functiune"), label: "Instalare și commissioning" }, { href: route("contracte-mentenanta-preventiva"), label: "Contracte mentenanță" }, { href: "/contact", label: "Contact ZESCORP" }],
  },
  {
    slug: "sisteme-c-arm",
    pillar: "medical-equipment",
    pageIntent: "c-arm-equipment",
    eyebrow: "C-Arm",
    title: "Sisteme C-Arm pentru bloc operator și intervenții",
    description: "Ofertare și suport de integrare pentru sisteme C-Arm mobile, cu atenție la aplicații, mobilitate, spațiu, radioprotecție și continuitatea tehnică.",
    metadataTitle: "Sisteme C-Arm pentru bloc operator | ZESCORP",
    metadataDescription: "Sisteme C-Arm mobile: selecție, ofertare, integrare în bloc operator, radioprotecție, instalare și mentenanță.",
    keywords: ["sistem C-Arm", "C-Arm bloc operator", "ofertă C-Arm", "fluoroscopie mobilă"],
    heroNote: "Pentru C-Arm, aplicațiile clinice și modul de utilizare influențează configurația, accesoriile și discuția de radioprotecție.",
    zesPrompt: "Vreau ofertă pentru un sistem C-Arm",
    primaryCta: "Discută sistemul C-Arm cu ZES",
    leadTitle: "Pregătește cererea tehnico-comercială pentru C-Arm.",
    leadDescription: "Spune-ne aplicația, tipul sălii și termenul achiziției.",
    audiences: ["Blocuri operatorii", "Centre de ortopedie", "Clinici cu proceduri intervenționale"],
    scopeItems: ["Aplicații și putere sistem", "Mobilitate și ergonomie", "Accesorii", "Radioprotecție și operare", "Service și uptime"],
    requiredInfo: ["Aplicație clinică", "Tip sală", "Volum estimat", "Termen achiziție"],
    workflow: equipmentWorkflow,
    mistakes: ["Alegerea fără validarea aplicației", "Ignorarea mobilității în sală", "Lipsa unui plan de mentenanță"],
    complianceNote: equipmentCompliance,
    faqs: [
      { question: "Ce influențează alegerea unui C-Arm?", answer: "Aplicația clinică, spațiul, mobilitatea, accesoriile și nivelul de utilizare estimat." },
      { question: "Trebuie discutată radioprotecția?", answer: "Da. Utilizarea și contextul sălii trebuie analizate de specialiști competenți." },
      { question: "Puteți include service-ul?", answer: "Da. Suportul și mentenanța pot fi incluse în discuția comercială." },
    ],
    relatedLinks: [{ href: route("radioprotectie-imagistica"), label: "Radioprotecție imagistică" }, { href: route("service-echipamente-medicale"), label: "Service echipamente" }, { href: route("instalare-punere-in-functiune"), label: "Instalare și commissioning" }, { href: "/contact", label: "Contact ZESCORP" }],
  },
  {
    slug: "echipamente-laborator-ivd",
    pillar: "medical-equipment",
    pageIntent: "laboratory-ivd-equipment",
    eyebrow: "Laborator / IVD",
    title: "Echipamente de laborator și soluții IVD",
    description: "Suport pentru ofertare și integrare de analizoare, echipamente IVD și fluxuri de laborator, corelate cu spațiul, utilitățile și operarea curentă.",
    metadataTitle: "Echipamente laborator și IVD | ZESCORP",
    metadataDescription: "Echipamente de laborator și soluții IVD: ofertare, analizoare, integrare, infrastructură, fluxuri și mentenanță.",
    keywords: ["echipamente laborator medical", "analizor IVD", "ofertă echipamente laborator", "integrare laborator"],
    heroNote: "Un laborator eficient depinde de flux, utilități și mentenanță la fel de mult ca de echipamente.",
    zesPrompt: "Vreau ofertă pentru echipamente de laborator sau IVD",
    primaryCta: "Discută laboratorul cu ZES",
    leadTitle: "Trimite lista preliminară pentru laborator sau IVD.",
    leadDescription: "Poți începe cu tipurile de analize, volumul estimat și spațiul disponibil.",
    audiences: ["Laboratoare private", "Clinici cu laborator intern", "Unități medicale în extindere"],
    scopeItems: ["Analizoare și echipamente IVD", "Flux probe", "Electric, apă și HVAC", "Integrare și LIS unde este cazul", "Service și consumabile"],
    requiredInfo: ["Tipuri de analize", "Volum estimat", "Spațiu și utilități", "Termen proiect"],
    workflow: equipmentWorkflow,
    mistakes: ["Alegerea analizoarelor fără flux", "Ignorarea utilităților", "Lipsa unui plan de mentenanță și consumabile"],
    complianceNote: equipmentCompliance,
    faqs: [
      { question: "Puteți ajuta și cu infrastructura laboratorului?", answer: "Da. Spațiul, utilitățile și fluxurile trebuie analizate împreună cu echipamentele." },
      { question: "Este necesară lista completă de analizoare?", answer: "Nu pentru prima discuție. Tipurile de analize și volumul estimat sunt un început bun." },
      { question: "Includeți service și mentenanță?", answer: "Da. Continuitatea poate fi discutată odată cu oferta." },
    ],
    relatedLinks: [{ href: route("dezvoltare-unitati-medicale"), label: "Dezvoltare unități medicale" }, { href: "/services/ivd-laborator", label: "Servicii IVD / laborator" }, { href: route("contracte-mentenanta-preventiva"), label: "Mentenanță preventivă" }, { href: "/calculatoare/cost-laborator-ivd", label: "Estimare preliminară laborator IVD" }],
  },
  {
    slug: "solutii-pacs-ris",
    pillar: "medical-equipment",
    pageIntent: "pacs-ris-solutions",
    eyebrow: "PACS / RIS",
    title: "Soluții PACS / RIS pentru imagistică medicală",
    description: "Clarificare și ofertare preliminară pentru fluxuri PACS / RIS, arhivare, acces la imagini și integrarea operațională a centrelor de imagistică.",
    metadataTitle: "Soluții PACS / RIS pentru imagistică | ZESCORP",
    metadataDescription: "Soluții PACS și RIS pentru imagistică medicală: arhivare, fluxuri, acces la imagini, integrare și suport tehnic.",
    keywords: ["PACS RIS", "PACS imagistică medicală", "RIS radiologie", "arhivare imagini medicale"],
    heroNote: "Digitalizarea utilă pornește de la fluxul operațional și cerințele reale de acces, arhivare și integrare.",
    zesPrompt: "Vreau să discut o soluție PACS RIS pentru imagistică",
    primaryCta: "Discută PACS / RIS cu ZES",
    leadTitle: "Descrie fluxul actual de imagistică pentru o evaluare PACS / RIS.",
    leadDescription: "Spune-ne numărul de locații, modalitățile și principalele blocaje operaționale.",
    audiences: ["Centre de imagistică", "Clinici multi-site", "Unități medicale care modernizează radiologia"],
    scopeItems: ["Arhivare imagini", "Fluxuri RIS", "Acces multi-site", "Integrare modalități", "Suport și etapizare"],
    requiredInfo: ["Număr locații", "Modalități imagistică", "Flux actual", "Obiectivul modernizării"],
    workflow: equipmentWorkflow,
    mistakes: ["Alegerea fără maparea fluxului", "Ignorarea volumului de date", "Lipsa etapizării pentru utilizatori"],
    complianceNote: equipmentCompliance,
    faqs: [
      { question: "Ce informații sunt utile pentru prima discuție?", answer: "Modalitățile, locațiile, volumul orientativ și blocajele fluxului actual." },
      { question: "PACS și RIS sunt același lucru?", answer: "Nu. Sunt componente complementare ale fluxului digital de imagistică." },
      { question: "Se poate implementa etapizat?", answer: "Da. Etapizarea este frecvent utilă pentru reducerea riscului operațional." },
    ],
    relatedLinks: [{ href: route("echipamente-imagistica-diagnostic"), label: "Echipamente imagistică diagnostic" }, { href: route("service-multi-vendor"), label: "Service multi-vendor" }, { href: "/services/imagistica-medicala", label: "Imagistică medicală" }, { href: "/contact", label: "Contact ZESCORP" }],
  },
  {
    slug: "service-echipamente-medicale",
    pillar: "service-maintenance",
    pageIntent: "medical-equipment-service",
    eyebrow: "Service medical",
    title: "Service pentru echipamente medicale",
    description: "Triage și suport tehnic pentru echipamente medicale: simptome, erori, downtime și datele necesare pentru prioritizarea unei intervenții calificate.",
    metadataTitle: "Service echipamente medicale | ZESCORP",
    metadataDescription: "Service pentru echipamente medicale: triere tehnică, erori, downtime, mentenanță și solicitare rapidă de intervenție.",
    keywords: ["service echipamente medicale", "reparații aparatură medicală", "mentenanță aparatură", "service biomedical"],
    heroNote: "Pentru o preluare eficientă, descrierea simptomului, modelul echipamentului și locația sunt esențiale.",
    zesPrompt: "Am nevoie de service pentru un echipament medical",
    primaryCta: "Solicită service prin ZES",
    leadTitle: "Trimite solicitarea de service pentru triere tehnică.",
    leadDescription: "Pentru cazuri urgente, include modelul, simptomul, orașul și timpul de indisponibilitate.",
    audiences: ["Clinici", "Spitale", "Laboratoare și centre de diagnostic"],
    scopeItems: ["Triage simptom", "Identificare echipament", "Prioritizare downtime", "Clarificare intervenție", "Recomandări de continuitate"],
    requiredInfo: ["Tip echipament", "Marcă și model", "Simptom sau cod eroare", "Oraș și urgență"],
    workflow: serviceWorkflow,
    mistakes: ["Continuarea utilizării unui aparat nesigur", "Descrierea incompletă a simptomului", "Lipsa istoricului de service"],
    complianceNote: serviceCompliance,
    faqs: [
      { question: "Ce informații accelerează preluarea?", answer: "Modelul, simptomul, codul de eroare dacă există, locația și impactul operațional." },
      { question: "Pot atașa fotografii?", answer: "Da, dacă sunt disponibile. Nu încărca date medicale ale pacienților." },
      { question: "Primesc instrucțiuni de reparație la distanță?", answer: "Nu oferim instrucțiuni nesigure. Triage-ul ajută la pregătirea unei intervenții calificate." },
    ],
    relatedLinks: [{ href: "/service-aparatura-medicala", label: "Service aparatură medicală" }, { href: route("contracte-mentenanta-preventiva"), label: "Contracte mentenanță preventivă" }, { href: route("suport-tehnic-echipamente"), label: "Suport tehnic" }, { href: "/service-diagnostic", label: "Service Diagnostic" }],
  },
  {
    slug: "contracte-mentenanta-preventiva",
    pillar: "service-maintenance",
    pageIntent: "preventive-maintenance-contracts",
    eyebrow: "Mentenanță preventivă",
    title: "Contracte de mentenanță preventivă pentru aparatură medicală",
    description: "Planificare pentru verificări periodice, priorități de uptime, inventar tehnic și continuitate operațională pentru clinici și centre medicale.",
    metadataTitle: "Contracte mentenanță preventivă medicală | ZESCORP",
    metadataDescription: "Contracte de mentenanță preventivă pentru echipamente medicale: verificări periodice, uptime, inventar și suport tehnic.",
    keywords: ["contract mentenanță aparatură medicală", "mentenanță preventivă clinică", "service periodic medical", "uptime echipamente medicale"],
    heroNote: "Mentenanța preventivă transformă intervențiile izolate într-un plan de continuitate controlabil.",
    zesPrompt: "Vreau contract de mentenanță preventivă pentru aparatura clinicii",
    primaryCta: "Discută mentenanța cu ZES",
    leadTitle: "Trimite inventarul preliminar pentru un plan de mentenanță.",
    leadDescription: "Poți începe cu tipurile de echipamente, locațiile și prioritățile operaționale.",
    audiences: ["Clinici private", "Centre imagistică", "Laboratoare și unități multi-site"],
    scopeItems: ["Inventar tehnic", "Frecvențe de verificare", "Priorități uptime", "Istoric intervenții", "Plan de escaladare"],
    requiredInfo: ["Lista echipamentelor", "Locații", "Istoric disponibil", "Niveluri de criticitate"],
    workflow: serviceWorkflow,
    mistakes: ["Intervenții exclusiv reactive", "Inventar incomplet", "Aceeași prioritate pentru toate echipamentele"],
    complianceNote: serviceCompliance,
    faqs: [
      { question: "Ce include discuția inițială?", answer: "Inventarul, criticitatea, istoricul și frecvența potrivită pentru verificări." },
      { question: "Este util și pentru clinici mici?", answer: "Da. Un plan proporțional reduce surprizele și clarifică prioritățile." },
      { question: "Poate acoperi mai multe mărci?", answer: "În funcție de inventar și specializare, se poate discuta o abordare multi-vendor." },
    ],
    relatedLinks: [{ href: route("service-echipamente-medicale"), label: "Service echipamente medicale" }, { href: route("service-multi-vendor"), label: "Service multi-vendor" }, { href: "/comparatii/service-preventiv-vs-service-reactiv", label: "Service preventiv vs reactiv" }, { href: "/calculatoare/service-aparatura", label: "Estimare mentenanță imagistică" }],
  },
  {
    slug: "relocare-echipamente-medicale",
    pillar: "service-maintenance",
    pageIntent: "medical-equipment-relocation",
    eyebrow: "Relocare echipamente",
    title: "Relocare echipamente medicale și pregătirea noului amplasament",
    description: "Planificare tehnică pentru mutarea echipamentelor medicale: evaluare, acces, demontare coordonată, transport, pregătirea spațiului și repunere în funcțiune.",
    metadataTitle: "Relocare echipamente medicale | ZESCORP",
    metadataDescription: "Relocare echipamente medicale: evaluare, acces, pregătirea amplasamentului, demontare, transport, instalare și commissioning.",
    keywords: ["relocare echipamente medicale", "mutare aparat CT", "relocare RMN", "instalare aparatură medicală"],
    heroNote: "Relocarea reușită începe cu noul amplasament și cu traseul de instalare, nu cu ziua transportului.",
    zesPrompt: "Vreau să relochez un echipament medical",
    primaryCta: "Discută relocarea cu ZES",
    leadTitle: "Pregătește contextul pentru relocarea echipamentului.",
    leadDescription: "Spune-ne echipamentul, locația actuală, destinația și termenul dorit.",
    audiences: ["Centre imagistică", "Clinici în modernizare", "Laboratoare și spitale"],
    scopeItems: ["Evaluare echipament", "Traseu și acces", "Pregătire amplasament", "Coordonare logistică", "Reinstalare și verificări"],
    requiredInfo: ["Echipament și model", "Locație actuală și destinație", "Plan nou spațiu", "Termen"],
    workflow: serviceWorkflow,
    mistakes: ["Planificarea transportului înainte de acces", "Neglijarea utilităților noului spațiu", "Lipsa etapelor de verificare după reinstalare"],
    complianceNote: serviceCompliance,
    faqs: [
      { question: "Ce trebuie verificat înainte de relocare?", answer: "Echipamentul, accesul, traseul, noul spațiu, utilitățile și calendarul." },
      { question: "Puteți ajuta și cu infrastructura noului spațiu?", answer: "Da. Pentru CT și RMN, această verificare este esențială." },
      { question: "Este suficient un plan al spațiului?", answer: "Este un început bun, dar verificarea tehnică poate necesita clarificări suplimentare." },
    ],
    relatedLinks: [{ href: route("camere-ct"), label: "Camere CT" }, { href: route("camere-rmn"), label: "Camere RMN" }, { href: route("instalare-punere-in-functiune"), label: "Instalare și commissioning" }, { href: route("suport-tehnic-echipamente"), label: "Suport tehnic" }],
  },
  {
    slug: "instalare-punere-in-functiune",
    pillar: "service-maintenance",
    pageIntent: "installation-commissioning",
    eyebrow: "Instalare",
    title: "Instalare și punere în funcțiune pentru echipamente medicale",
    description: "Coordonare pentru recepție, instalare, verificarea amplasamentului și punere în funcțiune, cu dependențele tehnice clarificate înainte de livrare.",
    metadataTitle: "Instalare și punere în funcțiune echipamente medicale | ZESCORP",
    metadataDescription: "Instalare și commissioning pentru echipamente medicale: amplasament, utilități, acces, recepție, configurare și suport.",
    keywords: ["instalare echipamente medicale", "punere în funcțiune aparatură", "commissioning medical", "integrare echipamente"],
    heroNote: "Ziua instalării ar trebui să confirme un plan pregătit, nu să descopere probleme de acces sau utilități.",
    zesPrompt: "Am nevoie de instalare și punere în funcțiune pentru echipament medical",
    primaryCta: "Discută instalarea cu ZES",
    leadTitle: "Trimite datele echipamentului pentru planul de instalare.",
    leadDescription: "Spune-ne modelul, locația, data estimată a livrării și stadiul spațiului.",
    audiences: ["Clinici cu echipamente noi", "Centre care înlocuiesc aparatura", "Distribuitori care caută suport de integrare"],
    scopeItems: ["Verificare amplasament", "Acces și manipulare", "Utilități", "Recepție și configurare", "Recomandări de operare"],
    requiredInfo: ["Model echipament", "Locație", "Calendar livrare", "Stadiu spațiu"],
    workflow: serviceWorkflow,
    mistakes: ["Livrare înainte de verificarea amplasamentului", "Lipsa utilităților", "Coordonare tardivă cu echipele locale"],
    complianceNote: serviceCompliance,
    faqs: [
      { question: "Când trebuie începută pregătirea?", answer: "Înainte de livrare, pentru verificarea accesului, utilităților și responsabilităților." },
      { question: "Includeți și relocarea?", answer: "Poate fi discutată separat, dacă proiectul implică mutarea unui echipament existent." },
      { question: "Ce document este util?", answer: "Fișa tehnică, planul spațiului și calendarul estimat de livrare." },
    ],
    relatedLinks: [{ href: route("relocare-echipamente-medicale"), label: "Relocare echipamente" }, { href: route("echipamente-imagistica-diagnostic"), label: "Echipamente imagistică" }, { href: route("echipamente-laborator-ivd"), label: "Echipamente laborator / IVD" }, { href: route("contracte-mentenanta-preventiva"), label: "Mentenanță preventivă" }],
  },
  {
    slug: "suport-tehnic-echipamente",
    pillar: "service-maintenance",
    pageIntent: "technical-support-equipment",
    eyebrow: "Suport tehnic",
    title: "Suport tehnic pentru echipamente și infrastructură medicală",
    description: "Clarificări tehnice, triere și coordonare pentru probleme de echipament, dependențe de infrastructură și situații care necesită un pas bine definit.",
    metadataTitle: "Suport tehnic echipamente medicale | ZESCORP",
    metadataDescription: "Suport tehnic pentru aparatură și infrastructură medicală: triere, clarificări, prioritizare și direcție de intervenție.",
    keywords: ["suport tehnic medical", "asistență tehnică aparatură", "suport clinică medicală", "triere service medical"],
    heroNote: "O solicitare bine structurată reduce timpul pierdut între echipament, infrastructură și furnizori.",
    zesPrompt: "Am nevoie de suport tehnic pentru echipament sau infrastructură medicală",
    primaryCta: "Descrie situația către ZES",
    leadTitle: "Trimite situația tehnică pentru triere.",
    leadDescription: "Include echipamentul sau zona afectată, impactul și datele de contact.",
    audiences: ["Administratori clinici", "Echipe tehnice", "Centre cu furnizori multipli"],
    scopeItems: ["Triage inițial", "Clarificare responsabilități", "Analiză dependențe", "Prioritizare", "Recomandare pas următor"],
    requiredInfo: ["Situație observată", "Echipament sau zonă", "Impact operațional", "Oraș și contact"],
    workflow: serviceWorkflow,
    mistakes: ["Escaladări fără date minime", "Confundarea simptomului cu cauza", "Amânarea unei verificări pentru echipamente nesigure"],
    complianceNote: serviceCompliance,
    faqs: [
      { question: "Este suportul tehnic același lucru cu intervenția?", answer: "Nu. Triage-ul clarifică următorul pas și informațiile necesare pentru intervenție." },
      { question: "Pot trimite o solicitare incompletă?", answer: "Da. Echipa poate reveni cu întrebările necesare." },
      { question: "ZES oferă diagnostic final?", answer: "Nu. ZES ajută la structurarea situației; verificarea tehnică este realizată de personal calificat." },
    ],
    relatedLinks: [{ href: route("service-echipamente-medicale"), label: "Service echipamente" }, { href: route("contracte-mentenanta-preventiva"), label: "Mentenanță preventivă" }, { href: "/service-diagnostic", label: "Service Diagnostic" }, { href: "/contact", label: "Contact direct" }],
  },
  {
    slug: "service-multi-vendor",
    pillar: "service-maintenance",
    pageIntent: "multi-vendor-service",
    eyebrow: "Multi-vendor",
    title: "Service multi-vendor pentru clinici și centre medicale",
    description: "Abordare operațională pentru inventare eterogene de echipamente: prioritizare, mentenanță, escaladare și coordonarea solicitărilor tehnice.",
    metadataTitle: "Service multi-vendor pentru clinici | ZESCORP",
    metadataDescription: "Service multi-vendor pentru echipamente medicale: inventar, prioritizare, mentenanță, suport și coordonarea intervențiilor.",
    keywords: ["service multi-vendor medical", "mentenanță clinică", "service aparatură clinică", "contract service medical"],
    heroNote: "Pentru o clinică cu mai multe mărci, inventarul și nivelurile de criticitate sunt baza unui plan realist.",
    zesPrompt: "Vreau să discut service multi-vendor pentru echipamentele clinicii",
    primaryCta: "Discută inventarul cu ZES",
    leadTitle: "Trimite inventarul preliminar pentru o discuție multi-vendor.",
    leadDescription: "Poți începe cu categoriile de echipamente, mărcile și locațiile.",
    audiences: ["Clinici multidisciplinare", "Centre multi-site", "Laboratoare și unități cu inventar mixt"],
    scopeItems: ["Inventar tehnic", "Categorii și mărci", "Niveluri de criticitate", "Mentenanță preventivă", "Escaladare și raportare"],
    requiredInfo: ["Inventar orientativ", "Mărci și categorii", "Locații", "Priorități operaționale"],
    workflow: serviceWorkflow,
    mistakes: ["Abordarea identică pentru toate aparatele", "Lipsa unei evidențe actualizate", "Follow-up neclar după intervenții"],
    complianceNote: serviceCompliance,
    faqs: [
      { question: "Ce înseamnă multi-vendor?", answer: "Coordonarea unui inventar cu mai multe categorii și mărci, cu reguli clare de triere și escaladare." },
      { question: "Aveți nevoie de inventarul complet?", answer: "Pentru început este suficient un inventar orientativ, care poate fi rafinat ulterior." },
      { question: "Include și mentenanță preventivă?", answer: "Da. Frecvențele și acoperirea se stabilesc după analiza inventarului." },
    ],
    relatedLinks: [{ href: route("contracte-mentenanta-preventiva"), label: "Contracte mentenanță" }, { href: route("service-echipamente-medicale"), label: "Service echipamente" }, { href: route("suport-tehnic-echipamente"), label: "Suport tehnic" }, { href: "/contact", label: "Contact ZESCORP" }],
  },
];

export function getRevenueLandingPage(slug: string) {
  return revenueLandingPages.find((page) => page.slug === slug);
}

export function getRevenueLandingGroups() {
  return (Object.keys(revenuePillarLabels) as RevenuePillar[]).map((pillar) => ({
    pillar,
    label: revenuePillarLabels[pillar],
    description: revenuePillarDescriptions[pillar],
    items: revenueLandingPages.filter((page) => page.pillar === pillar),
  }));
}
