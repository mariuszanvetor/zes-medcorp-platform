import type { ArticleCTA, ArticleFAQ } from "@/data/articles";
import type { ComparisonColumn, ComparisonRow, SearchIntent } from "@/lib/content-engine";

export type ComparisonHubGroup =
  | "imagistica"
  | "infrastructura"
  | "radioprotectie-rf"
  | "echipamente"
  | "service-mentenanta"
  | "planificare-clinica";

export type ComparisonLink = {
  label: string;
  href: string;
};

export type ComparisonEntity = {
  key: string;
  label: string;
  summary: string;
  chooseWhen: string[];
  tradeoffs: string[];
};

export type ComparisonPageData = {
  slug: string;
  title: string;
  description: string;
  targetKeyword: string;
  intent: SearchIntent;
  hubGroup: ComparisonHubGroup;
  category: string;
  intro: string;
  summaryVerdict: string;
  entities: ComparisonEntity[];
  comparisonTable: {
    columns: ComparisonColumn[];
    rows: ComparisonRow[];
  };
  decisionFactors: string[];
  costImplications: string[];
  infrastructureImplications: string[];
  regulatoryNotes: string[];
  mistakesToAvoid: string[];
  faqs: ArticleFAQ[];
  relatedServices: ComparisonLink[];
  relatedCalculators: ComparisonLink[];
  relatedArticles: ComparisonLink[];
  relatedGlossaryTerms: ComparisonLink[];
  cta: ArticleCTA;
  publishedAt: string;
  updatedAt: string;
};

const now = "2026-05-26";

const proposalCta = {
  title: "Transforma comparatia intr-un plan tehnic",
  description:
    "Structura proiectul, validarea si pasii urmatori intr-o propunere preliminara, inainte de decizia finala.",
  label: "Pregateste propunerea preliminara",
  href: "/proposal-builder",
};

const intakeCta = {
  title: "Ai nevoie de clarificare mai buna inainte de decizie?",
  description:
    "Trimite informatiile esentiale despre proiect si pregateste o discutie tehnica mai precisa.",
  label: "Trimite Project Intake",
  href: "/project-intake",
};

const plannerCta = {
  title: "Vrei sa validezi spatiul si echipamentul inainte de buget?",
  description:
    "Seteaza traseul potrivit pentru camera, infrastructura si cerintele tehnice ale proiectului.",
  label: "Deschide Radiology Room Planner",
  href: "/radiology-room-planner",
};

const serviceCta = {
  title: "Ai nevoie de evaluare tehnica, nu doar de comparatie?",
  description:
    "Discuta proiectul cu echipa ZES si clarifica infrastructura, riscurile si urmatorul pas corect.",
  label: "Solicita evaluare tehnica",
  href: "/contact",
};

export const comparisonPages: ComparisonPageData[] = [
  {
    slug: "rmn-vs-ct",
    title: "RMN vs CT: cum alegi infrastructura potrivita",
    description:
      "Comparatie tehnica intre RMN si CT pentru clinici care trebuie sa decida ce echipament si ce infrastructura merita prioritate.",
    targetKeyword: "RMN vs CT infrastructura",
    intent: "commercial-investigation",
    hubGroup: "imagistica",
    category: "Imagistica",
    intro:
      "RMN si CT raspund unor nevoi diferite si cer infrastructuri diferite. RMN-ul pune accent pe RF shielding, cușca Faraday, HVAC si integrare electromagnetica, in timp ce CT-ul cere protectie radiologica, CNCAN si zone controlate. Alegerea corecta nu tine doar de tehnologie, ci de ce poate sustine spatiul tau pe termen lung.",
    summaryVerdict:
      "Alege RMN cand proiectul are sens prin contrast de tesuturi moi si poti sustine RF shielding + HVAC strict; alege CT cand ai nevoie de flux mai rapid, radioprotectie si un proiect clar de autorizare.",
    entities: [
      {
        key: "rmn",
        label: "RMN",
        summary:
          "Mai potrivit pentru investigatii care depind de contrast de tesuturi moi si de un control foarte bun al mediului electromagnetic.",
        chooseWhen: [
          "cand diagnosticul cere detaliu bun pe tesuturi moi",
          "cand proiectul poate sustine RF shielding si HVAC strict",
        ],
        tradeoffs: [
          "cerinte tehnice mai sensibile la interferente",
          "amenajarea si integrarea cer mai multa coordonare",
        ],
      },
      {
        key: "ct",
        label: "CT",
        summary:
          "Mai potrivit pentru fluxuri rapide, evaluari ample si proiecte in care radioprotectia si CNCAN pot fi planificate clar.",
        chooseWhen: [
          "cand ai nevoie de randament si timp scurt de examinare",
          "cand proiectul poate integra radioprotectie si zone controlate",
        ],
        tradeoffs: [
          "cere tratament riguros pentru radiații ionizante",
          "implica documentatie si layout atent inainte de executie",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "rmn", label: "RMN" },
        { key: "ct", label: "CT" },
      ],
      rows: [
        {
          label: "Scop principal",
          values: {
            rmn: "Contrast fin, tesuturi moi, explorare detaliata.",
            ct: "Flux rapid, imagistica extinsa, urgenta si planificare larga.",
          },
        },
        {
          label: "Cerinta infrastructurala dominanta",
          values: {
            rmn: "RF shielding, cușca Faraday, HVAC si control electromagnetic.",
            ct: "Radioprotectie, plumb, zone controlate si relationare cu CNCAN.",
          },
        },
        {
          label: "Greu de amanat",
          values: {
            rmn: "Cerintele furnizorului si penetrarile RF.",
            ct: "Layout-ul, protectia radiologica si autorizarea.",
          },
        },
        {
          label: "Impact asupra costului",
          values: {
            rmn: "Muta bugetul in ecranare, HVAC si integrare.",
            ct: "Muta bugetul in radioprotectie, documentatie si executie.",
          },
        },
        {
          label: "Risc tipic",
          values: {
            rmn: "Confuzia intre RF shielding si plumb.",
            ct: "Amanarea radioprotectiei pana dupa executie.",
          },
        },
      ],
    },
    decisionFactors: [
      "Ce tip de diagnostic vrei sa prioritizezi in prima etapa.",
      "Ce infrastructura poate sustine fara compromisuri echipamentul ales.",
      "Cat de clar poti planifica autorizarea, executia si service-ul.",
      "Cat de repede trebuie sa ajunga proiectul in productie.",
    ],
    costImplications: [
      "RMN poate creste costul prin RF shielding, usi RF, filtre, waveguides si cerinte HVAC mai stricte.",
      "CT poate creste costul prin plumb, zone controlate, documentatie si validarea radioprotecției.",
      "In ambele cazuri, costul real depinde de clădire, trasee, integrare si echipamentele selectate.",
    ],
    infrastructureImplications: [
      "RMN necesita continuitate electromagnetica si o relatie buna intre camera, echipament si mediu.",
      "CT necesita o camera dimensionata pentru flux, protectie, operator si vecinatati sensibile.",
      "Ambele cer alimentare, date, HVAC si acces de service gandite inainte de executie.",
    ],
    regulatoryNotes: [
      "CT si RX se leaga de radioprotectie si CNCAN; RMN nu se trateaza ca proiect de plumb.",
      "Daca proiectul amesteca RMN si CT in acelasi traseu decizional, separa cerintele tehnice inainte de buget final.",
    ],
    mistakesToAvoid: [
      "sa alegi doar dupa pretul aparatului",
      "sa tratezi RF shielding-ul ca pe un finisaj obisnuit",
      "sa lasi CNCAN sau radioprotecția pentru final",
    ],
    faqs: [
      {
        question: "Exista o alegere universal mai buna intre RMN si CT?",
        answer:
          "Nu. Alegerea depinde de specialitatile clinice, infrastructura, fluxul de pacienti si modul in care poate fi validat proiectul.",
      },
      {
        question: "Pot compara doar costul echipamentului?",
        answer:
          "Nu este suficient. Infrastructura, autorizarea, service-ul si integrarea pot schimba decisiv bugetul total.",
      },
      {
        question: "RMN si CT cer aceleasi lucrari?",
        answer:
          "Nu. RMN cere RF shielding si control electromagnetic; CT cere radioprotectie, plumb si documentatie CNCAN.",
      },
      {
        question: "Ce instrument ZES ajuta la decizie?",
        answer:
          "Radiology Room Planner, Calculator cost camera RMN sau CT si Proposal Builder ajuta sa structurezi primul pas corect.",
      },
    ],
    relatedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
    ],
    relatedCalculators: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
    ],
    relatedArticles: [
      { label: "Diferenta RMN vs CT din punct de vedere al infrastructurii", href: "/knowledge-hub/diferenta-rmn-ct-infrastructura" },
      { label: "Modernizare radiologie clinica", href: "/knowledge-hub/modernizare-radiologie-clinica" },
    ],
    relatedGlossaryTerms: [
      { label: "RMN vs CT infrastructura", href: "/glosar/rmn-vs-ct-infrastructura" },
      { label: "MRI project timeline", href: "/glosar/mri-project-timeline" },
    ],
    cta: proposalCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "ct-vs-cbct",
    title: "CT vs CBCT: ce schimba in proiect, cost si autorizare",
    description:
      "Comparatie intre CT si CBCT pentru proiecte care au nevoie de claritate in infrastructura, radioprotectie si volum de lucru.",
    targetKeyword: "CT vs CBCT",
    intent: "commercial-investigation",
    hubGroup: "imagistica",
    category: "Imagistica",
    intro:
      "CT si CBCT par apropiate la prima vedere, dar proiectul se schimba in functie de rezolutie, zona de aplicare, fluxul pacientilor si cerintele de protectie radiologica. Daca alegi gresit, poti ajunge cu o infrastructura prea mica sau cu o camera mai complexa decat ai nevoie.",
    summaryVerdict:
      "CT-ul este mai versatil pentru utilizare larga si integrare in fluxuri clinice, iar CBCT are sens cand obiectivul este focalizat, cu cerinte mai compacte si scenarii mai clare de utilizare.",
    entities: [
      {
        key: "ct",
        label: "CT",
        summary:
          "Mai potrivit pentru volum mai mare de examinari si utilizare mai larga in clinici si spitale.",
        chooseWhen: [
          "cand vrei flexibilitate clinica mai mare",
          "cand proiectul trebuie sa sustina radioprotectie robusta si flux intens",
        ],
        tradeoffs: [
          "infrastructura si autorizarea pot fi mai ample",
          "cerintele tehnice sunt mai puternic legate de camera dedicata",
        ],
      },
      {
        key: "cbct",
        label: "CBCT",
        summary:
          "Mai potrivit pentru scenarii directionate, cu camera si flux mai concentrate pe aplicatii specifice.",
        chooseWhen: [
          "cand ai o zona de lucru mai restransa si scop bine delimitat",
          "cand vrei o investitie orientata pe un set limitat de aplicatii",
        ],
        tradeoffs: [
          "nu inlocuieste automat versatilitatea CT-ului clasic",
          "trebuie validat clar contextul de utilizare si autorizare",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "ct", label: "CT" },
        { key: "cbct", label: "CBCT" },
      ],
      rows: [
        {
          label: "Scop",
          values: {
            ct: "Imagistica extinsa si flux mai larg.",
            cbct: "Aplicatii directionate, de obicei mai compacte.",
          },
        },
        {
          label: "Infrastructura",
          values: {
            ct: "Camera mai riguroasa, cu radioprotectie ampla.",
            cbct: "Camera mai specifica, dar tot sub reguli clare de radioprotectie.",
          },
        },
        {
          label: "Autorizare",
          values: {
            ct: "Radioprotectie si CNCAN clar planificate.",
            cbct: "Trebuie verificata exact in functie de utilizare si echipament.",
          },
        },
        {
          label: "Buget",
          values: {
            ct: "Mai mare ca impact infrastructural si operational.",
            cbct: "Poate fi mai compact, dar nu automat mai simplu in toate cazurile.",
          },
        },
        {
          label: "Decizia buna cand",
          values: {
            ct: "Vrei versatilitate si volum de lucru mai mare.",
            cbct: "Vrei o zona de aplicare restransa si bine controlata.",
          },
        },
      ],
    },
    decisionFactors: [
      "aplicatia clinica principala",
      "volumul de pacienti si tipul de examinari",
      "spatiul si vecinatatile camerei",
      "cerintele de radioprotectie si autorizare",
    ],
    costImplications: [
      "CT-ul poate implica lucrari mai ample de protectie si integrare.",
      "CBCT poate reduce complexitatea, dar nu elimina nevoia de validare tehnica.",
      "costul final este dominat de camera, nu doar de aparat.",
    ],
    infrastructureImplications: [
      "CT-ul cere un layout mai robust pentru operator, pacient si service.",
      "CBCT-ul trebuie totusi integrat in fluxul clinic si in cerintele de siguranta.",
      "In ambele cazuri, datele producatorului trebuie avute inainte de executie.",
    ],
    regulatoryNotes: [
      "Radioprotectia si CNCAN raman relevante pentru ambele optiuni, in functie de utilizare.",
      "Nu lasa proiectul sa porneasca de la ideea ca CBCT inseamna automat mai putina planificare.",
    ],
    mistakesToAvoid: [
      "sa tratezi CBCT ca pe o varianta fara cerinte",
      "sa proiectezi camera fara vecinatati si fluxuri",
      "sa amani cerintele de radioprotectie",
    ],
    faqs: [
      {
        question: "CBCT este automat mai simplu decat CT?",
        answer:
          "Nu intotdeauna. Poate fi mai compact, dar proiectul trebuie validat dupa echipament, flux si cerinte de utilizare.",
      },
      {
        question: "Pot folosi acelasi layout pentru CT si CBCT?",
        answer:
          "Nu presupune asta. Layout-ul si protectia trebuie adaptate echipamentului si modului de operare.",
      },
      {
        question: "Ce este mai important la decizie?",
        answer:
          "Scopul clinic, volumul de pacienti si cerintele de radioprotectie sunt de obicei mai importante decat comparatia simpla de pret.",
      },
      {
        question: "Ce pas recomanda ZES?",
        answer:
          "Radiology Room Planner si Proposal Builder pentru a verifica ce poti sustine tehnic inainte de achizitie.",
      },
    ],
    relatedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
      { label: "Imagistica medicala", href: "/services/imagistica-medicala" },
    ],
    relatedCalculators: [
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    relatedArticles: [
      { label: "Ce verificari sunt necesare inainte de instalarea unui CT", href: "/knowledge-hub/verificari-inainte-instalare-ct" },
      { label: "Protectie radiologica pentru camera RX", href: "/knowledge-hub/protectie-radiologica-camera-rx" },
    ],
    relatedGlossaryTerms: [
      { label: "CT vs CBCT", href: "/glosar/ct-vs-cbct" },
      { label: "Layout camera CT", href: "/glosar/layout-camera-ct" },
    ],
    cta: plannerCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "camera-rmn-vs-camera-ct",
    title: "Camera RMN vs camera CT: diferentele care schimba proiectul",
    description:
      "Comparatie intre cerintele de camera RMN si camera CT, cu accent pe RF shielding, radioprotectie, HVAC, layout si service.",
    targetKeyword: "camera RMN vs camera CT",
    intent: "technical-planning",
    hubGroup: "infrastructura",
    category: "Infrastructura",
    intro:
      "Nu este suficient sa compari echipamentele. Camera RMN si camera CT schimba bugetul, traseele, instalatiile si modul in care este gandita intreaga infrastructura a proiectului. RMN-ul cere disciplina RF si mediu controlat, iar CT-ul cere radioprotectie si layout foarte clar.",
    summaryVerdict:
      "Camera RMN se proiecteaza in jurul RF shielding-ului si al mediului electromagnetic; camera CT se proiecteaza in jurul radioprotectiei, al zonelor controlate si al cerintelor CNCAN.",
    entities: [
      {
        key: "rmn",
        label: "Camera RMN",
        summary:
          "Camera devine un sistem electromagnetic controlat, cu cerinte stricte pentru continuitate, HVAC si acces.",
        chooseWhen: [
          "cand echipamentul si aplicatiile cer RF shielding consistent",
          "cand poti controla mediul tehnic si accesul service",
        ],
        tradeoffs: [
          "mai multa sensibilitate la penetrari si echipamente adiacente",
          "HVAC, vibratiile si accesul trebuie validate din timp",
        ],
      },
      {
        key: "ct",
        label: "Camera CT",
        summary:
          "Camera este o zona de radiologie dedicata, in care radioprotectia si fluxul operatorului sunt dominante.",
        chooseWhen: [
          "cand radioprotectia si CNCAN pot fi tratate curat",
          "cand camera trebuie sa sustina un flux rapid si clar de operare",
        ],
        tradeoffs: [
          "necesita tratament clar pentru plumb si zone controlate",
          "layout-ul si vecinatatile pot impune modificari importante",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "rmn", label: "Camera RMN" },
        { key: "ct", label: "Camera CT" },
      ],
      rows: [
        {
          label: "Bariera tehnica principala",
          values: {
            rmn: "RF shielding si cușca Faraday.",
            ct: "Radioprotectie si ecranare cu plumb.",
          },
        },
        {
          label: "Sensibilitate la mediu",
          values: {
            rmn: "Foarte mare: electromagnetic, HVAC, vibratii.",
            ct: "Mare: radioprotectie, vecinatati, flux si acces.",
          },
        },
        {
          label: "Ordinea corecta a deciziilor",
          values: {
            rmn: "Echipament -> RF/HVAC -> layout -> testare.",
            ct: "Echipament -> radioprotectie -> layout -> CNCAN.",
          },
        },
        {
          label: "Riscul cel mai des ignorat",
          values: {
            rmn: "Penetrari RF si cerinte de mediu tratate tarziu.",
            ct: "Protectia radiologica amanata pana dupa executie.",
          },
        },
        {
          label: "Daca proiectul este in cladire existenta",
          values: {
            rmn: "Verifica continuitatea RF si traseele tehnice.",
            ct: "Verifica vecinatatile, peretii si zonele controlate.",
          },
        },
      ],
    },
    decisionFactors: [
      "tipul de echipament si furnizorul ales",
      "spatiul existent si limitarile de structura",
      "ce autoritati si validari intra in proiect",
      "cat de devreme sunt blocate cerintele tehnice",
    ],
    costImplications: [
      "RMN muta costul in RF shielding, usi, filtre, HVAC si testare.",
      "CT muta costul in radioprotectie, plumb, documentatie si zone controlate.",
      "O camera 'ieftina' poate deveni scumpa daca trebuie refacuta dupa validare.",
    ],
    infrastructureImplications: [
      "RMN cere o camera care sa fie stabila electromagnetic si termic.",
      "CT cere o camera care sa sustina radioprotectia si fluxul operatorului.",
      "Ambele cer service accesibil, alimentare si date gandite din proiect.",
    ],
    regulatoryNotes: [
      "CNCAN se leaga de CT/RX; RMN trebuie separat clar de cerintele de radioprotectie.",
      "Nu amesteca in acelasi check-list RF shielding si radioprotectie fara sa marchezi distinctia.",
    ],
    mistakesToAvoid: [
      "sa folosesti acelasi checklist pentru RMN si CT",
      "sa validezi spatiul dupa ce echipamentul este cumparat",
      "sa tratezi service-ul ca detaliu secundar",
    ],
    faqs: [
      {
        question: "Pot proiecta camera RMN si CT cu aceleasi principii?",
        answer:
          "Nu. Principiile de baza sunt diferite: RMN-ul este despre RF shielding, iar CT-ul despre radioprotectie si CNCAN.",
      },
      {
        question: "Ce influenteaza cel mai mult bugetul camerei?",
        answer:
          "Echipamentul selectat, starea cladirii, vecinatatile, instalatiile si lucrarile de validare fac de obicei cea mai mare diferenta.",
      },
      {
        question: "Cand trebuie cerute cerintele producatorului?",
        answer:
          "Inainte de proiectarea finala. Ele schimba layout-ul, HVAC-ul, accesul si testarea.",
      },
      {
        question: "Ce instrument ZES e util aici?",
        answer:
          "Radiology Room Planner si Proposal Builder sunt cele mai utile pentru a separa RMN de CT corect.",
      },
    ],
    relatedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
    ],
    relatedCalculators: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
    ],
    relatedArticles: [
      { label: "Checklist camera RMN inainte de instalare", href: "/knowledge-hub/checklist-camera-rmn-inainte-instalare" },
      { label: "Checklist camera CT inainte de instalare", href: "/knowledge-hub/checklist-camera-ct-inainte-instalare" },
    ],
    relatedGlossaryTerms: [
      { label: "MRI room dimensions guide", href: "/glosar/mri-room-dimensions-guide" },
      { label: "Radiology room electrical requirements", href: "/glosar/radiology-room-electrical-requirements" },
    ],
    cta: plannerCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "rf-shielding-vs-radioprotectie",
    title: "RF shielding vs radioprotectie: doua cerinte diferite",
    description:
      "Pagina de comparatie care separa clar cerintele RMN de cele ale CT/RX pentru a evita proiectarea gresita si confuziile de buget.",
    targetKeyword: "RF shielding vs radioprotectie",
    intent: "educational-authority",
    hubGroup: "radioprotectie-rf",
    category: "Radioprotecție / RF shielding",
    intro:
      "Una dintre cele mai frecvente confuzii in proiectele medicale este echivalarea RF shielding-ului cu radioprotectia. In realitate, ele rezolva probleme diferite: RF shielding-ul protejeaza RMN-ul de interferente electromagnetice, iar radioprotectia controleaza expunerea la radiatii ionizante in proiectele CT/RX.",
    summaryVerdict:
      "Daca proiectul include RMN, gandeste in termeni de RF shielding; daca include CT sau RX, gandeste in termeni de radioprotectie si CNCAN.",
    entities: [
      {
        key: "rf",
        label: "RF shielding",
        summary:
          "Sistemul care mentine integritatea electromagnetica a camerei RMN.",
        chooseWhen: [
          "cand echipamentul este RMN / MRI",
          "cand problema principala este interferenta electromagnetica",
        ],
        tradeoffs: [
          "nu rezolva radiatia ionizanta",
          "implica cerinte de executie si testare foarte precise",
        ],
      },
      {
        key: "radioprotectie",
        label: "Radioprotectie",
        summary:
          "Sistemul care limiteaza expunerea la radiatii ionizante in CT, RX si alte zone relevante.",
        chooseWhen: [
          "cand echipamentul este CT / RX / fluoroscopie",
          "cand trebuie tratate plumbul, zonele controlate si documentatia CNCAN",
        ],
        tradeoffs: [
          "nu inlocuieste RF shielding-ul unui RMN",
          "cere calcule si layout foarte bine documentate",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "rf", label: "RF shielding" },
        { key: "radioprotectie", label: "Radioprotectie" },
      ],
      rows: [
        {
          label: "Problema pe care o rezolva",
          values: {
            rf: "Interferente electromagnetice.",
            radioprotectie: "Expunere la radiatii ionizante.",
          },
        },
        {
          label: "Echipamente tipice",
          values: {
            rf: "RMN / MRI.",
            radioprotectie: "CT, RX, fluoroscopie.",
          },
        },
        {
          label: "Elemente tipice",
          values: {
            rf: "Cușca Faraday, usi RF, filtre, waveguides.",
            radioprotectie: "Plumb, zone controlate, sticla protejata.",
          },
        },
        {
          label: "Autoritate de validare",
          values: {
            rf: "Specificatiile echipamentului si testarea RF.",
            radioprotectie: "Documentatia de radioprotectie si CNCAN.",
          },
        },
        {
          label: "Greseala comuna",
          values: {
            rf: "Sa fie tratat ca o varianta de plumb.",
            radioprotectie: "Sa fie amanat pana dupa executie.",
          },
        },
      ],
    },
    decisionFactors: [
      "tipul de echipament si fizica lui de functionare",
      "ce risc trebuie controlat in camera",
      "ce documentatie trebuie pregatita din timp",
      "ce modifica cel mai mult bugetul si executia",
    ],
    costImplications: [
      "RF shielding creste costul prin materiale, usi, filtre si testare.",
      "Radioprotectia creste costul prin plumb, calcul, executie si validare.",
      "Ambele devin costisitoare cand sunt tratate tarziu, fara date complete.",
    ],
    infrastructureImplications: [
      "RF shielding cere integritate continua a camerei si control electromagnetic.",
      "Radioprotectia cere layout, vecinatati si separare clara a zonelor.",
      "Daca proiectul amesteca cele doua, trebuie separat pe faze si pe echipamente.",
    ],
    regulatoryNotes: [
      "CNCAN se aplica proiectelor cu radiatii ionizante, nu RF shielding-ului RMN in sine.",
      "Foloseste terminologia corecta in documente si in estimari pentru a evita validari gresite.",
    ],
    mistakesToAvoid: [
      "sa spui ca plumbul rezolva RMN-ul",
      "sa spui ca RF shielding-ul rezolva CT-ul",
      "sa combini ghidurile fara sa separi domeniul de risc",
    ],
    faqs: [
      {
        question: "RF shielding si radioprotectia sunt acelasi lucru?",
        answer:
          "Nu. RF shielding trateaza interferente electromagnetice; radioprotectia trateaza expunerea la radiatii ionizante.",
      },
      {
        question: "Cand intra CNCAN in discutie?",
        answer:
          "Cand proiectul include CT, RX, fluoroscopie sau alte scenarii cu radiatii ionizante.",
      },
      {
        question: "Pot folosi aceeasi echipa pentru ambele?",
        answer:
          "Poate exista coordonare, dar proiectele trebuie tratate distinct tehnic si documentar.",
      },
      {
        question: "Ce pagina ZES ajuta cel mai bine?",
        answer:
          "Radiology Room Planner si Proposal Builder sunt utile cand vrei sa separi corect cerintele proiectului.",
      },
    ],
    relatedServices: [
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
      { label: "Radiologie", href: "/services/radiologie" },
    ],
    relatedCalculators: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
    ],
    relatedArticles: [
      { label: "Diferenta dintre RMN si CT din punct de vedere al infrastructurii", href: "/knowledge-hub/diferenta-rmn-ct-infrastructura" },
      { label: "Ce trebuie sa stii despre autorizarea CNCAN", href: "/knowledge-hub/ce-trebuie-sa-stii-despre-autorizarea-cncan" },
    ],
    relatedGlossaryTerms: [
      { label: "Plumb vs RF shielding", href: "/glosar/plumb-vs-rf-shielding" },
      { label: "Faraday cage explicatie", href: "/glosar/faraday-cage-explicatie" },
    ],
    cta: proposalCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "camera-faraday-vs-ecranare-cu-plumb",
    title: "Camera Faraday vs ecranare cu plumb: unde se aplica fiecare",
    description:
      "Comparatie clara intre camera Faraday si ecranarea cu plumb, utila pentru proiecte RMN, CT si radiologie care nu vor sa amestece cerintele tehnice.",
    targetKeyword: "camera Faraday vs ecranare cu plumb",
    intent: "educational-authority",
    hubGroup: "radioprotectie-rf",
    category: "Radioprotecție / RF shielding",
    intro:
      "Camera Faraday si ecranarea cu plumb sunt mentionate des in proiectele medicale, dar nu rezolva aceeasi problema. Camera Faraday tine sub control interferentele electromagnetice, in timp ce plumbul apartine radioprotectiei pentru radiatii ionizante.",
    summaryVerdict:
      "Pentru RMN ai nevoie de o camera Faraday / RF shielding; pentru CT si RX ai nevoie de ecranare cu plumb si radioprotectie validata.",
    entities: [
      {
        key: "faraday",
        label: "Camera Faraday",
        summary:
          "Solutia tehnica pentru controlul interferentelor electromagnetice in RMN.",
        chooseWhen: [
          "cand camerele sau echipamentul cer izolatie RF",
          "cand proiectul trebuie sa ramana stabil electromagnetic",
        ],
        tradeoffs: [
          "nu rezolva protectia la radiatii",
          "este sensibila la detalii de executie si penetrari",
        ],
      },
      {
        key: "plumb",
        label: "Ecranare cu plumb",
        summary:
          "Solutia tehnica pentru limitarea radiatiei ionizante in CT, RX si scenarii similare.",
        chooseWhen: [
          "cand echipamentul emite radiatii ionizante",
          "cand trebuie create zone controlate si protectie radiologica",
        ],
        tradeoffs: [
          "nu are rol in RF shielding RMN",
          "trebuie calculata in contextul layout-ului real",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "faraday", label: "Camera Faraday" },
        { key: "plumb", label: "Ecranare cu plumb" },
      ],
      rows: [
        {
          label: "Problema tehnica",
          values: {
            faraday: "Interferente RF.",
            plumb: "Radiatii ionizante.",
          },
        },
        {
          label: "Unde apare",
          values: {
            faraday: "RMN / MRI.",
            plumb: "CT / RX / fluoroscopie.",
          },
        },
        {
          label: "Elemente asociate",
          values: {
            faraday: "usi RF, filtre, waveguides.",
            plumb: "pereti, usi si geamuri protejate.",
          },
        },
        {
          label: "Greseala comuna",
          values: {
            faraday: "Sa fie tratata ca o forma de radioprotectie.",
            plumb: "Sa fie folosita ca raspuns la RMN.",
          },
        },
        {
          label: "Cand trebuie validata",
          values: {
            faraday: "Inainte de executie si testare RF.",
            plumb: "Inainte de executie si in relatia cu CNCAN.",
          },
        },
      ],
    },
    decisionFactors: [
      "ce produce echipamentul si ce risc trebuie redus",
      "ce vecinatati si camere adiacente exista",
      "ce documentatie si validare trebuie pregatite",
      "ce face furnizorul echipamentului obligatoriu",
    ],
    costImplications: [
      "Camera Faraday muta costul in materiale, etansare si controlul penetrarilor.",
      "Ecranarea cu plumb muta costul in lucrari de radioprotectie si validare.",
      "Amestecarea lor in buget produce estimari eronate si refaceri mai tarziu.",
    ],
    infrastructureImplications: [
      "Camera Faraday necesita o executie curata, fara intreruperi necontrolate.",
      "Ecranarea cu plumb necesita un layout care sa protejeze vecinatatile si fluxul.",
      "Ambele trebuie tratate in proiectul de baza, nu la final.",
    ],
    regulatoryNotes: [
      "Plumbul si radioprotectia nu se aplica RMN-ului ca in CT/RX.",
      "RF shielding-ul nu inlocuieste cerintele de radioprotectie atunci cand exista radiatii ionizante.",
    ],
    mistakesToAvoid: [
      "sa folosesti cuvintele Faraday si plumb ca sinonime",
      "sa amanati protectia pana dupa achizitie",
      "sa mentionezi CNCAN fara sa fie clar tipul de echipament",
    ],
    faqs: [
      {
        question: "Camera Faraday este acelasi lucru cu plumbul?",
        answer:
          "Nu. Camera Faraday rezolva problema RF; plumbul rezolva problema radiatiilor ionizante.",
      },
      {
        question: "RMN-ul are nevoie de plumb?",
        answer:
          "In mod uzual, nu. RMN-ul are nevoie de RF shielding si de o camera bine controlata electromagnetic.",
      },
      {
        question: "CT-ul are nevoie de camera Faraday?",
        answer:
          "Nu ca principiu principal. CT-ul cere radioprotectie si validare CNCAN, nu RF shielding.",
      },
      {
        question: "Ce pagina ZES clarifica diferenta?",
        answer:
          "Proposal Builder si Radiology Room Planner ajuta la separarea cerintelor corecte inainte de executie.",
      },
    ],
    relatedServices: [
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Protectie radiologica", href: "/services/protectie-radiologica" },
      { label: "Radiologie", href: "/services/radiologie" },
    ],
    relatedCalculators: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
    ],
    relatedArticles: [
      { label: "Ce este camera Faraday pentru RMN si cand este necesara", href: "/knowledge-hub/camera-faraday-rmn" },
      { label: "Ce presupune protectia radiologica pentru o camera RX", href: "/knowledge-hub/protectie-radiologica-camera-rx" },
    ],
    relatedGlossaryTerms: [
      { label: "Faraday cage explicatie", href: "/glosar/faraday-cage-explicatie" },
      { label: "Plumb vs RF shielding", href: "/glosar/plumb-vs-rf-shielding" },
    ],
    cta: proposalCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "echipament-medical-nou-vs-refurbished",
    title: "Echipament medical nou vs refurbished: ce implica in proiect",
    description:
      "Comparatie pentru clinici care analizeaza achizitia unui echipament medical nou sau refurbished, cu accent pe risc, service si infrastructura.",
    targetKeyword: "echipament medical nou vs refurbished",
    intent: "commercial-investigation",
    hubGroup: "echipamente",
    category: "Echipamente",
    intro:
      "In practică, dilema nu este doar pretul de achizitie. Un echipament nou si unul refurbished schimba profilul de risc, garantia, service-ul, compatibilitatea cu infrastructura si modul in care poate fi planificata punerea in functiune.",
    summaryVerdict:
      "Echipamentul nou ofera mai multa predictibilitate, iar refurbished poate avea sens daca ai validat foarte bine istoricul, service-ul si impactul asupra infrastructurii.",
    entities: [
      {
        key: "nou",
        label: "Echipament nou",
        summary:
          "Cea mai buna alegere cand vrei predictibilitate, compatibilitate clara si risc mai mic de integrare.",
        chooseWhen: [
          "cand vrei o baza tehnica clara pentru proiect",
          "cand service-ul si garantia sunt prioritare",
        ],
        tradeoffs: [
          "cost initial mai mare",
          "livrarea poate fi legata de termenele producatorului",
        ],
      },
      {
        key: "refurbished",
        label: "Refurbished",
        summary:
          "Poate fi o varianta buna daca vrei o investitie mai controlata si poti verifica exact starea tehnica.",
        chooseWhen: [
          "cand bugetul trebuie optimizat",
          "cand ai acces la istoric, service si testare corecta",
        ],
        tradeoffs: [
          "mai mult risc daca documentatia este slaba",
          "poate cere verificari suplimentare in infrastructura",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "nou", label: "Nou" },
        { key: "refurbished", label: "Refurbished" },
      ],
      rows: [
        {
          label: "Predictibilitate",
          values: {
            nou: "Mai mare, cu specificatii si garantie mai clare.",
            refurbished: "Depinde de istoric, testare si furnizor.",
          },
        },
        {
          label: "Buget initial",
          values: {
            nou: "De regula mai mare.",
            refurbished: "Poate fi mai mic, dar cu verificari suplimentare.",
          },
        },
        {
          label: "Service",
          values: {
            nou: "Mai usor de planificat pe termen lung.",
            refurbished: "Trebuie validat cu atentie inainte de contractare.",
          },
        },
        {
          label: "Infrastructura",
          values: {
            nou: "Mai usor de corelat cu proiectul curent.",
            refurbished: "Poate cere ajustari daca specificatiile reale difera.",
          },
        },
        {
          label: "Risc",
          values: {
            nou: "Mai mic daca proiectul este validat corect.",
            refurbished: "Mai mare daca lipsesc date, testare sau istoric.",
          },
        },
      ],
    },
    decisionFactors: [
      "istoricul si starea tehnica a echipamentului",
      "bugetul disponibil si costul total de operare",
      "cat de importanta este predictibilitatea pe termen lung",
      "daca infrastructura poate suporta echipamentul fara refaceri",
    ],
    costImplications: [
      "Echipamentul nou inseamna de regula un cost initial mai mare, dar cu mai putine surprize la integrare.",
      "Refurbished poate reduce costul de achizitie, dar poate creste costul de verificare si adaptare.",
      "Costul real trebuie privit impreuna cu service-ul si downtime-ul posibil.",
    ],
    infrastructureImplications: [
      "Un echipament nou se integreaza mai simplu daca proiectul este inca deschis.",
      "Un refurbished poate cere verificari de putere, acces, greutate sau racire.",
      "Niciunul nu ar trebui achizitionat fara validarea spatiului si a instalatiilor.",
    ],
    regulatoryNotes: [
      "Pentru echipamente de imagistica, autorizarea si validarea sunt mai importante decat eticheta 'nou' sau 'refurbished'.",
      "Cere documente clare, fișe tehnice si confirmari de service inainte de decizie.",
    ],
    mistakesToAvoid: [
      "sa alegi doar dupa pretul de achizitie",
      "sa iei refurbished fara istoric tehnic",
      "sa ignori ce modifica infrastructura si service-ul",
    ],
    faqs: [
      {
        question: "Refurbished este mereu mai slab decat nou?",
        answer:
          "Nu neaparat, dar necesita mai multa verificare si un cadru foarte clar de service, testare si acceptare.",
      },
      {
        question: "Echipamentul nou elimina riscul?",
        answer:
          "Nu complet. Tot trebuie validata infrastructura, integrarea si service-ul.",
      },
      {
        question: "Cand merita refurbished?",
        answer:
          "Cand ai un buget bine controlat si poti confirma tehnic starea si compatibilitatea echipamentului.",
      },
      {
        question: "Ce pas ZES ajuta cel mai bine?",
        answer:
          "Project Intake si Proposal Builder ajuta la clarificarea riscului si a cerintelor inainte de achizitie.",
      },
    ],
    relatedServices: [
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Imagistica medicala", href: "/services/imagistica-medicala" },
      { label: "Service specializat", href: "/services/service-aparatura-medicala" },
    ],
    relatedCalculators: [
      { label: "Calculator cost echipamente imagistica", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    relatedArticles: [
      { label: "Cum alegi aparatura medicala pentru o clinica noua", href: "/knowledge-hub/alegere-aparatura-medicala-clinica" },
      { label: "Greșeli frecvente in alegerea aparaturii medicale", href: "/knowledge-hub/greseli-alegere-aparatura-medicala" },
    ],
    relatedGlossaryTerms: [
      { label: "Service contract vs maintenance", href: "/glosar/service-contract-vs-maintenance" },
      { label: "HVAC imagistica medicala", href: "/glosar/hvac-imagistica-medicala" },
    ],
    cta: intakeCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "service-preventiv-vs-service-reactiv",
    title: "Service preventiv vs service reactiv: ce alegi pentru uptime",
    description:
      "Comparatie pentru echipamente medicale si imagistica in care diferenta dintre mentenanta preventiva si interventia reactiva schimba direct uptime-ul.",
    targetKeyword: "service preventiv vs service reactiv",
    intent: "problem-solving",
    hubGroup: "service-mentenanta",
    category: "Service / mentenanta",
    intro:
      "Cand apar probleme la echipamente medicale, alegerea dintre service preventiv si service reactiv nu este doar o chestiune de cost. Ea afecteaza uptime-ul, planificarea pacientilor, riscul operational si modul in care mentii controlul asupra pieselor si timpilor de raspuns.",
    summaryVerdict:
      "Service-ul preventiv reduce surprizele si stabileste o rutina de uptime; service-ul reactiv rezolva problemele dupa ce apar, dar de obicei cu risc operational mai mare.",
    entities: [
      {
        key: "preventiv",
        label: "Service preventiv",
        summary:
          "Alege-l cand vrei sa reduci downtime-ul si sa mentii echipamentul stabil in exploatare.",
        chooseWhen: [
          "cand echipamentul este critic pentru operare",
          "cand vrei sa planifici intervențiile in loc sa astepti defectiunea",
        ],
        tradeoffs: [
          "cere disciplina si calendar regulat",
          "pare mai putin urgent, dar aduce valoare prin continuitate",
        ],
      },
      {
        key: "reactiv",
        label: "Service reactiv",
        summary:
          "Alege-l cand ai o problema concreta si trebuie reparata cat mai repede.",
        chooseWhen: [
          "cand exista o defectiune activa",
          "cand trebuie diagnosticata o problema izolata fara program de preventie",
        ],
        tradeoffs: [
          "poate produce downtime mai mare",
          "de obicei ajunge mai scump daca se repeta des",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "preventiv", label: "Preventiv" },
        { key: "reactiv", label: "Reactiv" },
      ],
      rows: [
        {
          label: "Scop",
          values: {
            preventiv: "Prevenirea defectiunilor si mentinerea uptime-ului.",
            reactiv: "Rezolvarea unei probleme aparute deja.",
          },
        },
        {
          label: "Impact operational",
          values: {
            preventiv: "Mai mic in exploatare pe termen lung.",
            reactiv: "Mai mare, pentru ca intervii dupa intrerupere.",
          },
        },
        {
          label: "Planificare",
          values: {
            preventiv: "Se programeaza in avans.",
            reactiv: "Se activeaza cand apare incidentul.",
          },
        },
        {
          label: "Risc",
          values: {
            preventiv: "Mai bine controlat.",
            reactiv: "Mai mare, mai ales la echipamente critice.",
          },
        },
        {
          label: "Buna alegere cand",
          values: {
            preventiv: "Vrei continuitate si predictibilitate.",
            reactiv: "Ai o problema activa si ai nevoie de diagnostic.",
          },
        },
      ],
    },
    decisionFactors: [
      "cat de critic este echipamentul pentru clinica",
      "cat de mult te costa o ora de nefunctionare",
      "daca ai piese si acces service usor",
      "daca poti construi o rutina de mentenanta",
    ],
    costImplications: [
      "Preventivul poate parea mai greu de justificat lunar, dar reduce costul total al defectiunilor.",
      "Reactia la defectiuni poate fi mai ieftina punctual, dar duce adesea la costuri mai mari pe termen lung.",
      "Dupa cateva incidente, diferenta de cost se muta in downtime si in reorganizarea programului.",
    ],
    infrastructureImplications: [
      "Preventivul cere acces bun, documentatie si calendar clar.",
      "Reactia la defectiuni cere diagnostic rapid si piese disponibile.",
      "Ambele sunt mai eficiente cand infrastructura a fost gandita pentru service de la inceput.",
    ],
    regulatoryNotes: [
      "Nu amesteca service-ul cu validarea de executie sau cu autorizarea initiala a proiectului.",
      "Pentru echipamente critice, service-ul trebuie tratat ca parte din modelul de operare, nu ca reactie ocazionala.",
    ],
    mistakesToAvoid: [
      "sa bugetezi doar interventii reactivate",
      "sa ignori programul de mentenanta pana la defectiune",
      "sa nu rezervi acces pentru service",
    ],
    faqs: [
      {
        question: "Service-ul preventiv chiar reduce downtime-ul?",
        answer:
          "Da, pentru ca detecteaza problemele inainte sa devina defectiuni care opresc activitatea.",
      },
      {
        question: "Reactia la defectiune este gresita?",
        answer:
          "Nu, dar nu ar trebui sa fie singura strategie daca echipamentul este esential pentru operare.",
      },
      {
        question: "Pot combina cele doua?",
        answer:
          "Da, de obicei cea mai buna abordare este un contract preventiv cu capacitate clara de interventie reactiva.",
      },
      {
        question: "Ce instrument ZES ajuta?",
        answer:
          "Service Diagnostic si Proposal Builder pot structura nevoile de uptime si mentenanta.",
      },
    ],
    relatedServices: [
      { label: "Service specializat", href: "/services/service-aparatura-medicala" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Imagistica medicala", href: "/services/imagistica-medicala" },
    ],
    relatedCalculators: [
      { label: "Service aparatura", href: "/calculatoare/service-aparatura" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    relatedArticles: [
      { label: "Service CT si RMN: mentenanta, uptime si riscuri", href: "/knowledge-hub/service-ct-rmn-mentenanta-uptime" },
      { label: "Cand merita contract de mentenanta pentru aparatura medicala", href: "/knowledge-hub/contract-mentenanta-aparatura-medicala" },
    ],
    relatedGlossaryTerms: [
      { label: "Service contract vs maintenance", href: "/glosar/service-contract-vs-maintenance" },
      { label: "Medical imaging room HVAC guide", href: "/glosar/medical-imaging-room-hvac-guide" },
    ],
    cta: serviceCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "modernizare-clinica-vs-clinica-noua",
    title: "Modernizare clinica vs clinica noua: cand merita fiecare",
    description:
      "Comparatie pentru decidenți care trebuie sa aleaga intre modernizarea unui spatiu existent si pornirea unei clinici noi de la zero.",
    targetKeyword: "modernizare clinica vs clinica noua",
    intent: "commercial-investigation",
    hubGroup: "planificare-clinica",
    category: "Planificare clinica",
    intro:
      "Decizia dintre modernizare si constructie noua pare simpla doar pana cand incepi sa pui in acelasi tabel infrastructura, autorizarea, echipamentele si timpul de lansare. Modernizarea poate salva timp si locatie, dar o clinica noua poate salva compromisuri pe termen lung.",
    summaryVerdict:
      "Modernizarea merita cand spatiul este bun si infrastructura poate fi corectata; clinica noua merita cand vrei control complet, extindere si mai putine compromisuri ascunse.",
    entities: [
      {
        key: "modernizare",
        label: "Modernizare",
        summary:
          "Alegere buna cand exista deja o locatie utila si vrei sa imbunatatesti fara sa pierzi rapiditatea de implementare.",
        chooseWhen: [
          "cand infrastructura existenta poate fi corectata",
          "cand ai nevoie de viteza si locatie buna",
        ],
        tradeoffs: [
          "poate ascunde limitari tehnice vechi",
          "unele lucrari apar dupa deschiderea proiectului",
        ],
      },
      {
        key: "noua",
        label: "Clinica noua",
        summary:
          "Alegere buna cand vrei control complet asupra fluxurilor, instalatiilor si layout-ului.",
        chooseWhen: [
          "cand proiectul trebuie gandit fara compromisuri importante",
          "cand vrei sa blochezi corect viitorul de crestere",
        ],
        tradeoffs: [
          "poate dura mai mult pana la deschidere",
          "implica decizii si avize mai multe din start",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "modernizare", label: "Modernizare" },
        { key: "noua", label: "Clinica noua" },
      ],
      rows: [
        {
          label: "Viteza de implementare",
          values: {
            modernizare: "Mai rapida daca spatiul este potrivit.",
            noua: "Mai lenta, dar cu control mai bun asupra proiectului.",
          },
        },
        {
          label: "Control asupra infrastructurii",
          values: {
            modernizare: "Limitat de ce exista deja.",
            noua: "Mult mai mare, de la layout la instalatii.",
          },
        },
        {
          label: "Risc de compromisuri ascunse",
          values: {
            modernizare: "Mai mare daca spatiul este vechi sau rigid.",
            noua: "Mai mic, dar necesita mai mult planning upfront.",
          },
        },
        {
          label: "Cost total",
          values: {
            modernizare: "Poate fi eficient, dar apar adesea costuri de corectie.",
            noua: "Mai mare initial, mai controlabil pe termen lung.",
          },
        },
        {
          label: "Cand are sens",
          values: {
            modernizare: "Ai locatie buna si infrastructura rezonabila.",
            noua: "Vrei arhitectura si flux complet gandite de la zero.",
          },
        },
      ],
    },
    decisionFactors: [
      "calitatea spatiului existent",
      "cata infrastructura trebuie refacuta",
      "cat de mult depinde proiectul de timp",
      "ce nivel de control vrei asupra viitorului clinicii",
    ],
    costImplications: [
      "Modernizarea poate reduce costul initial, dar poate ascunde corectii scumpe.",
      "Clinica noua costa mai mult la inceput, dar poate fi mai previzibila in exploatare.",
      "Decizia trebuie facuta cu bugetul total, nu doar cu costul de la prima faza.",
    ],
    infrastructureImplications: [
      "Modernizarea cere audit al instalatiilor, structural si de flux.",
      "Clinica noua permite un plan coerent de la arhitectura la service.",
      "Daca proiectul include radiologie sau laborator, modernizarea trebuie verificata si mai atent.",
    ],
    regulatoryNotes: [
      "DSP si alte cerinte pot fi mai usor de integrat intr-o clinica noua, dar nu dispar in modernizare.",
      "In proiectele cu radiologie, separate clar radioprotecția si documentatia tehnica.",
    ],
    mistakesToAvoid: [
      "sa alegi modernizarea doar fiindca pare mai ieftina",
      "sa subestimezi lucrarile de corectie intr-un spatiu vechi",
      "sa presupui ca o clinica noua este automat mai simpla",
    ],
    faqs: [
      {
        question: "Cand merita modernizarea?",
        answer:
          "Cand spatiul existent este bun, iar corectiile tehnice sunt gestionabile fara sa compromita proiectul.",
      },
      {
        question: "Cand merita o clinica noua?",
        answer:
          "Cand vrei control complet asupra fluxurilor, instalatiilor si extinderii viitoare.",
      },
      {
        question: "Modernizarea rezolva toate problemele vechi?",
        answer:
          "Nu intotdeauna. Uneori o parte din limitari ramane si trebuie gestionata explicit.",
      },
      {
        question: "Ce instrument ZES ajuta?",
        answer:
          "Project Intake, Proposal Builder si calculatorul de proiect medical ajuta sa compari scenariile.",
      },
    ],
    relatedServices: [
      { label: "Constructii medicale", href: "/services/constructii-medicale" },
      { label: "Amenajari medicale", href: "/services/amenajari-medicale" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
    ],
    relatedCalculators: [
      { label: "Calculator cost echipamente imagistica", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      { label: "Modernizare radiologie clinica", href: "/knowledge-hub/modernizare-radiologie-clinica" },
      { label: "Costuri ascunse in amenajarea unei clinici medicale", href: "/knowledge-hub/costuri-ascunse-amenajare-clinica-medicala" },
    ],
    relatedGlossaryTerms: [
      { label: "Radiology clinic startup requirements", href: "/glosar/radiology-clinic-startup-requirements" },
      { label: "Cerinte start clinica radiologie", href: "/glosar/cerinte-start-clinica-radiologie" },
    ],
    cta: intakeCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "calculator-cost-rmn-vs-oferta-tehnica-reala",
    title: "Calculator cost RMN vs oferta tehnica reala: ce poti afla si ce nu",
    description:
      "Comparatie intre o estimare orientativa si o oferta tehnica reala pentru RMN, ca sa stii cand este suficient un calculator si cand trebuie validare completa.",
    targetKeyword: "calculator cost RMN vs oferta tehnica reala",
    intent: "commercial-investigation",
    hubGroup: "planificare-clinica",
    category: "Planificare clinica",
    intro:
      "Un calculator iti ofera directie, nu o oferta finala. Pentru RMN, diferenta dintre o estimare orientativa si o oferta tehnica reala este data de specificatiile echipamentului, de RF shielding, de HVAC, de integrare si de modul in care poate fi validat spatiul.",
    summaryVerdict:
      "Calculatorul este bun pentru orientare si prioritizare; oferta tehnica reala devine necesara cand exista planuri, specificatii si un spatiu care poate fi verificat concret.",
    entities: [
      {
        key: "calculator",
        label: "Calculator cost RMN",
        summary:
          "Bun pentru orientare initiala, setarea ipotezelor si identificarea riscurilor principale.",
        chooseWhen: [
          "cand proiectul este in faza de concept",
          "cand ai nevoie de ordine de marime si nu de pret final",
        ],
        tradeoffs: [
          "nu vede toate detaliile spatiului",
          "nu poate inlocui verificarea tehnica finala",
        ],
      },
      {
        key: "oferta",
        label: "Oferta tehnica reala",
        summary:
          "Necesara cand exista date reale despre spatiu, echipament, instalatii si faze de executie.",
        chooseWhen: [
          "cand vrei bugetare precisa si decizie de achizitie",
          "cand echipamentul si amplasamentul sunt aproape definite",
        ],
        tradeoffs: [
          "necesita mai multe informatii si verificari",
          "poate schimba semnificativ pretul orientativ initial",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "calculator", label: "Calculator" },
        { key: "oferta", label: "Oferta reala" },
      ],
      rows: [
        {
          label: "Nivel de detaliu",
          values: {
            calculator: "Orientativ si rapid.",
            oferta: "Specific, tehnic si bazat pe date reale.",
          },
        },
        {
          label: "Cand e util",
          values: {
            calculator: "La inceputul proiectului.",
            oferta: "Cand ai un spatiu si un echipament clar.",
          },
        },
        {
          label: "Ce poate lipsi",
          values: {
            calculator: "Detalii de spatiu si specificatii exacte.",
            oferta: "Poate include corectii si date complete.",
          },
        },
        {
          label: "Risc de interpretare gresita",
          values: {
            calculator: "Ridicat daca este luat drept pret final.",
            oferta: "Mai mic, dar necesita verificare a ipotezelor.",
          },
        },
        {
          label: "Urmatorul pas bun",
          values: {
            calculator: "Project Intake sau Proposal Builder.",
            oferta: "Validare tehnica si contractare.",
          },
        },
      ],
    },
    decisionFactors: [
      "cat de clar este spatiul si amplasamentul",
      "daca ai date reale despre echipament",
      "daca RF shielding si HVAC sunt deja intelese",
      "cat de rapid trebuie sa treci la decizie",
    ],
    costImplications: [
      "Calculatorul reduce timpul de orientare, dar nu fixeaza costul final.",
      "Oferta tehnica reala include de obicei mai multe detalii si poate corecta estimarea initiala.",
      "Pentru RMN, diferentele apar adesea in RF shielding, HVAC si integrare.",
    ],
    infrastructureImplications: [
      "Calculatorul nu poate vedea toate constrangerile structurale.",
      "Oferta reala trebuie sa integreze spatiul, echipamentul si cerintele producatorului.",
      "Daca proiectul este complex, treci rapid de la calculator la validare.",
    ],
    regulatoryNotes: [
      "Cand proiectul are radiologie sau RF shielding, validarea tehnica este obligatorie inainte de buget final.",
      "Nu transforma un rezultat orientativ in promisiune comerciala.",
    ],
    mistakesToAvoid: [
      "sa tratezi estimarea ca oferta finala",
      "sa cumperi echipamentul inainte de validarea spatiului",
      "sa ramai doar la calculator cand proiectul este deja avansat",
    ],
    faqs: [
      {
        question: "Un calculator poate inlocui oferta tehnica?",
        answer:
          "Nu. Calculatorul ajuta la orientare; oferta tehnica reala necesita date concrete si verificare.",
      },
      {
        question: "Cand devine necesara validarea completa?",
        answer:
          "Cand proiectul are deja spatiu, echipament sau termeni de executie mai bine definiti.",
      },
      {
        question: "Pot folosi calculatorul pentru bugetare interna?",
        answer:
          "Da, daca il tratezi ca pe o ipoteza de lucru si nu ca pe un pret final.",
      },
      {
        question: "Ce pas ZES e potrivit dupa calculator?",
        answer:
          "Project Intake si Proposal Builder sunt pasii potriviti pentru a transforma orientarea in plan tehnic.",
      },
    ],
    relatedServices: [
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Imagistica medicala", href: "/services/imagistica-medicala" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
    ],
    relatedCalculators: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    relatedArticles: [
      { label: "Cost camera RMN in Romania", href: "/knowledge-hub/cost-camera-rmn-romania" },
      { label: "Verificari inainte de achizitia unui echipament RMN", href: "/knowledge-hub/verificari-inainte-achizitie-rmn" },
    ],
    relatedGlossaryTerms: [
      { label: "MRI project timeline", href: "/glosar/mri-project-timeline" },
      { label: "MRI infrastructure mistakes", href: "/glosar/mri-infrastructure-mistakes" },
    ],
    cta: proposalCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "project-intake-vs-consultanta-clasica",
    title: "Project Intake vs consultanta clasica: de ce structura conteaza",
    description:
      "Comparatie intre Project Intake ZES si consultanta clasica, pentru proiecte medicale care au nevoie de informatii mai clare inainte de discutia tehnica.",
    targetKeyword: "Project Intake vs consultanta clasica",
    intent: "commercial-investigation",
    hubGroup: "planificare-clinica",
    category: "Planificare clinica",
    intro:
      "Nu toate discutiiile pornite dintr-un formular au acelasi nivel de utilitate. Project Intake aduna informatiile esentiale intr-un format structurat, iar consultanta clasica poate porni de la o conversatie mai libera, dar cu mai multe riscuri de a pierde detalii tehnice importante.",
    summaryVerdict:
      "Project Intake este mai bun cand vrei un briefing clar si comparabil; consultanta clasica este mai buna cand proiectul este inca foarte informal si are nevoie de orientare initiala.",
    entities: [
      {
        key: "intake",
        label: "Project Intake",
        summary:
          "Bun pentru colectarea structurata a datelor, a riscurilor si a informatiilor lipsa.",
        chooseWhen: [
          "cand proiectul are deja un minim de claritate",
          "cand vrei sa ajungi la o discutie tehnica mai eficienta",
        ],
        tradeoffs: [
          "cere putin mai multa disciplina din partea clientului",
          "poate parea mai formal la inceput",
        ],
      },
      {
        key: "clasica",
        label: "Consultanta clasica",
        summary:
          "Buna pentru explorare libera, dar mai putin consistenta in colectarea informatiilor tehnice.",
        chooseWhen: [
          "cand proiectul este inca foarte vag",
          "cand ai nevoie de orientare generala fara formular structurat",
        ],
        tradeoffs: [
          "poate lasa loc de lipsuri in date",
          "poate necesita mai multe runde pentru acelasi nivel de claritate",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "intake", label: "Project Intake" },
        { key: "clasica", label: "Consultanta clasica" },
      ],
      rows: [
        {
          label: "Structura datelor",
          values: {
            intake: "Ridicata si comparabila.",
            clasica: "Variabila, in functie de conversatie.",
          },
        },
        {
          label: "Risc de informatii lipsa",
          values: {
            intake: "Mai mic.",
            clasica: "Mai mare daca discutia ramane generala.",
          },
        },
        {
          label: "Viteza spre analiza tehnica",
          values: {
            intake: "Mai rapida cand formularul este complet.",
            clasica: "Poate cere clarificari suplimentare.",
          },
        },
        {
          label: "Potrivire pentru proiecte complexe",
          values: {
            intake: "Foarte buna.",
            clasica: "Depinde de cat de bine este condusa discutia.",
          },
        },
        {
          label: "Bun cand",
          values: {
            intake: "Vrei un pas clar spre propunere.",
            clasica: "Vrei orientare initiala fara date multe.",
          },
        },
      ],
    },
    decisionFactors: [
      "cat de complex este proiectul",
      "cat de repede vrei sa obtii o analiza tehnica utila",
      "cat de multe date poti colecta din prima",
      "daca ai nevoie de comparabilitate in lead-uri",
    ],
    costImplications: [
      "Project Intake reduce costul de rework in discutia tehnica.",
      "Consultanta clasica poate produce mai multe runde de clarificari.",
      "Pentru proiecte complexe, ordinea corecta aduce valoare mai mare decat viteza aparentei conversatii.",
    ],
    infrastructureImplications: [
      "Project Intake ajuta la validarea din timp a spatiului si echipamentului.",
      "Consultanta clasica poate rataci detalii daca nu este urmata de un cadru structurat.",
      "Ambele pot duce la rezultat bun daca sunt urmate de validare tehnica.",
    ],
    regulatoryNotes: [
      "Pentru proiectele cu autorizare sau radiologie, datele colectate trebuie sa fie suficient de precise pentru validare.",
      "Nu transforma discutia initiala in promisiune de executie fara analiza.",
    ],
    mistakesToAvoid: [
      "sa sari peste colectarea datelor esentiale",
      "sa tratezi discutia libera ca suficienta pentru proiecte complexe",
      "sa lasi informatiile lipsa neclarificate prea mult timp",
    ],
    faqs: [
      {
        question: "Project Intake inlocuieste o discutie reala?",
        answer:
          "Nu. Il face mai eficienta si mai structurata, dar discutia tehnica ramane necesara.",
      },
      {
        question: "Cand e mai buna consultanta clasica?",
        answer:
          "Cand proiectul este foarte vag si clientul are nevoie doar de orientare initiala.",
      },
      {
        question: "Poate Project Intake sa imbunatateasca lead quality?",
        answer:
          "Da, pentru ca structureaza informatia si reduce riscul de leaduri incomplete.",
      },
      {
        question: "Ce urmeaza dupa Project Intake?",
        answer:
          "Proposal Builder si analiza tehnica preliminara sunt pasii urmatori naturali.",
      },
    ],
    relatedServices: [
      { label: "Consultanta tehnica", href: "/contact" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Constructii medicale", href: "/services/constructii-medicale" },
    ],
    relatedCalculators: [
      { label: "Calculator cost echipamente imagistica", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      { label: "Cum se construieste o clinica medicala in Romania", href: "/knowledge-hub/cum-se-construieste-o-clinica-medicala-in-romania" },
      { label: "Cum se planifica fluxurile intr-o clinica medicala", href: "/knowledge-hub/planificare-fluxuri-clinica-medicala" },
    ],
    relatedGlossaryTerms: [
      { label: "Radiology clinic startup requirements", href: "/glosar/radiology-clinic-startup-requirements" },
      { label: "Cerinte start clinica radiologie", href: "/glosar/cerinte-start-clinica-radiologie" },
    ],
    cta: intakeCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "radiologie-digitala-vs-radiologie-conventionala",
    title: "Radiologie digitala vs radiologie conventionala: impact tehnic si operational",
    description:
      "Comparatie pentru clinici care trebuie sa decida intre radiologie digitala si conventionala, cu accent pe infrastructura, flux si modernizare.",
    targetKeyword: "radiologie digitala vs radiologie conventionala",
    intent: "commercial-investigation",
    hubGroup: "imagistica",
    category: "Imagistica",
    intro:
      "Diferenta dintre radiologia digitala si cea conventionala nu este doar despre tipul de imagine. Ea afecteaza fluxul pacientilor, integrarea, arhivarea, service-ul si modul in care se modernizeaza o unitate existenta.",
    summaryVerdict:
      "Radiologia digitala este, de regula, alegerea mai buna pentru eficienta si integrare, in timp ce radiologia conventionala ramane relevanta cand infrastructura, bugetul sau contextul fac pasul digital mai greu de justificat.",
    entities: [
      {
        key: "digitala",
        label: "Radiologie digitala",
        summary:
          "Mai buna pentru flux, integrare si modernizare pe termen lung.",
        chooseWhen: [
          "cand vrei sa reduci timpul de lucru si sa simplifici fluxul",
          "cand modernizarea include si integrare tehnica mai buna",
        ],
        tradeoffs: [
          "poate cere investitie initiala mai mare",
          "necesita o infrastructura bine gandita pentru IT si date",
        ],
      },
      {
        key: "conventionala",
        label: "Radiologie conventionala",
        summary:
          "Poate fi adecvata in scenarii simple sau in etape de tranzitie, dar are limite de flux si integrare.",
        chooseWhen: [
          "cand proiectul este inca in tranzitie",
          "cand infrastructura sau bugetul impun o etapa intermediara",
        ],
        tradeoffs: [
          "mai putina eficienta operationala",
          "poate limita extinderea si digitalizarea completa",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "digitala", label: "Digitala" },
        { key: "conventionala", label: "Conventionala" },
      ],
      rows: [
        {
          label: "Flux",
          values: {
            digitala: "Mai rapid si mai usor de integrat.",
            conventionala: "Mai lent si mai dependent de procese manuale.",
          },
        },
        {
          label: "Arhivare si date",
          values: {
            digitala: "Mai buna pentru integrare si date.",
            conventionala: "Mai putin eficienta pentru workflow modern.",
          },
        },
        {
          label: "Modernizare",
          values: {
            digitala: "Sprijina trecerea la standarde moderne.",
            conventionala: "Poate ramane ca etapa intermediara.",
          },
        },
        {
          label: "Buget",
          values: {
            digitala: "Mai mare la inceput, dar mai bun operational.",
            conventionala: "Poate parea mai ieftina initial.",
          },
        },
        {
          label: "Cand merita",
          values: {
            digitala: "Cand vrei eficienta si integrare.",
            conventionala: "Cand ai constrangeri serioase de tranzitie.",
          },
        },
      ],
    },
    decisionFactors: [
      "cat de modern este fluxul dorit",
      "daca vrei integrare buna cu restul clinicii",
      "ce volum de lucru ai si cat de repede trebuie procesat",
      "cum arata traseele de modernizare si service",
    ],
    costImplications: [
      "Radiologia digitala poate cere investitie initiala mai mare, dar reduce frictiunea operationala.",
      "Radiologia conventionala poate fi mai ieftina la start, dar poate limita eficienta si extensia.",
      "Diferenta reala apare in costul total de operare, nu doar in achizitie.",
    ],
    infrastructureImplications: [
      "Digitalul cere o infrastructura mai buna pentru date, integrare si flux.",
      "Conventionalul poate tolera mai mult tranzitia, dar cu limite clare.",
      "Modernizarea trebuie gandita in contextul intregului departament, nu pe un singur echipament.",
    ],
    regulatoryNotes: [
      "Daca vorbim despre RX sau CT in acelasi departament, radioprotectia si CNCAN raman separate de partea digitala.",
      "Modernizarea nu anuleaza cerintele de siguranta sau de validare tehnica.",
    ],
    mistakesToAvoid: [
      "sa confunzi digitalizarea cu simpla inlocuire de aparat",
      "sa ignori datele si integrarea",
      "sa lasi modernizarea fara plan pentru service si uptime",
    ],
    faqs: [
      {
        question: "Digital inseamna automat mai scump?",
        answer:
          "La start, de obicei da, dar analiza corecta trebuie facuta pe cost total si pe eficienta.",
      },
      {
        question: "Mai are sens radiologia conventionala?",
        answer:
          "Poate avea sens in scenarii de tranzitie sau atunci cand bugetul si infrastructura impun o etapa intermediara.",
      },
      {
        question: "Ce impact are asupra fluxului?",
        answer:
          "De regula, digitalul reduce frictiunea si simplifica procesarea, integrarea si arhivarea.",
      },
      {
        question: "Ce pas ZES recomanda?",
        answer:
          "Proposal Builder si Radiology Room Planner ajuta la structurarea modernizarii si a impactului tehnic.",
      },
    ],
    relatedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Service specializat", href: "/services/service-aparatura-medicala" },
    ],
    relatedCalculators: [
      { label: "Calculator cost echipamente imagistica", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    relatedArticles: [
      { label: "Modernizare radiologie clinica", href: "/knowledge-hub/modernizare-radiologie-clinica" },
      { label: "Service CT si RMN: mentenanta, uptime si riscuri", href: "/knowledge-hub/service-ct-rmn-mentenanta-uptime" },
    ],
    relatedGlossaryTerms: [
      { label: "Radiology clinic startup requirements", href: "/glosar/radiology-clinic-startup-requirements" },
      { label: "Layout camera CT", href: "/glosar/layout-camera-ct" },
    ],
    cta: proposalCta,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "laborator-ivd-intern-vs-externalizare-analize",
    title: "Laborator IVD intern vs externalizare analize: cum alegi modelul potrivit",
    description:
      "Comparatie pentru clinici si spitale care trebuie sa decida daca merg pe laborator IVD intern sau pe externalizarea analizelor.",
    targetKeyword: "laborator IVD intern vs externalizare analize",
    intent: "commercial-investigation",
    hubGroup: "planificare-clinica",
    category: "IVD / laborator",
    intro:
      "Modelul de laborator schimba tot: fluxul de probe, viteza de raspuns, integrarea echipamentelor, necesarul de personal, service-ul si modul in care sunt bugetate investitiile. Alegerea dintre laborator intern si externalizare trebuie facuta in functie de volum, business si controlul pe care il vrei asupra rezultatelor.",
    summaryVerdict:
      "Laboratorul intern merita cand ai volum, control si nevoie de rapiditate; externalizarea merita cand vrei simplitate operationala si investitie initiala mai mica.",
    entities: [
      {
        key: "intern",
        label: "Laborator IVD intern",
        summary:
          "Mai bun pentru control, viteza si integrarea fluxurilor atunci cand volumul de lucru justifica investitia.",
        chooseWhen: [
          "cand ai volum suficient de analize",
          "cand vrei sa controlezi timpii, calitatea si fluxul probelor",
        ],
        tradeoffs: [
          "cere investitie initiala mai mare",
          "implica service, calibrare si validare interna",
        ],
      },
      {
        key: "externalizare",
        label: "Externalizare",
        summary:
          "Mai simpla operational si mai usoara la start, dar cu control mai mic asupra fluxului si timpului de raspuns.",
        chooseWhen: [
          "cand volumul este mic sau variabil",
          "cand vrei sa limitezi investitia initiala",
        ],
        tradeoffs: [
          "depinde de partener si de SLA",
          "poate prelungi timpul de raspuns si poate reduce controlul intern",
        ],
      },
    ],
    comparisonTable: {
      columns: [
        { key: "intern", label: "Intern" },
        { key: "externalizare", label: "Externalizare" },
      ],
      rows: [
        {
          label: "Control operational",
          values: {
            intern: "Ridicat.",
            externalizare: "Mai redus, depinde de partener.",
          },
        },
        {
          label: "Investitie initiala",
          values: {
            intern: "Mai mare.",
            externalizare: "Mai mica.",
          },
        },
        {
          label: "Timp de raspuns",
          values: {
            intern: "Mai bun daca fluxul e bine organizat.",
            externalizare: "Poate fi bun, dar depinde de transport si SLA.",
          },
        },
        {
          label: "Necesar tehnic",
          values: {
            intern: "Echipamente, calibrare, validare si service.",
            externalizare: "Mai putina infrastructura interna.",
          },
        },
        {
          label: "Cand are sens",
          values: {
            intern: "Volum si nevoie de control.",
            externalizare: "Start rapid si investitie mai mica.",
          },
        },
      ],
    },
    decisionFactors: [
      "volumul si tipul analizelor",
      "necesarul de control asupra probelor si timpilor",
      "capacitatea de a gestiona echipamente si service",
      "costul total versus simplitatea operationala",
    ],
    costImplications: [
      "Laboratorul intern muta costul in echipamente, validare, calibrari si service.",
      "Externalizarea muta costul in contracte si in dependenta de furnizor.",
      "Daca volumul creste, modelul intern poate deveni mai eficient pe termen lung.",
    ],
    infrastructureImplications: [
      "Laboratorul intern cere un layout clar pentru fluxul probelor si echipamente.",
      "Externalizarea cere mai putina infrastructura, dar mai mult control logistic.",
      "Integrarea IVD trebuie gandita impreuna cu spatiul si cu echipamentele selectate.",
    ],
    regulatoryNotes: [
      "Analizele si validarea interna cer disciplina tehnica, iar diferenta dintre intern si externalizare trebuie tratata clar in documentatie.",
      "Nu confunda modelul de laborator cu simpla achizitie de aparat.",
    ],
    mistakesToAvoid: [
      "sa alegi doar dupa costul initial",
      "sa subestimezi fluxul probelor si service-ul",
      "sa cumperi echipamente fara sa stii daca ai volum suficient",
    ],
    faqs: [
      {
        question: "Cand merita laboratorul intern?",
        answer:
          "Cand volumul, nevoia de control si timpul de raspuns justifica investitia si mentenanta.",
      },
      {
        question: "Externalizarea este mereu mai ieftina?",
        answer:
          "Nu pe termen lung, mai ales daca volumul creste sau daca ai nevoie de control foarte bun.",
      },
      {
        question: "Ce este critic la un laborator intern?",
        answer:
          "Fluxul, calibrarea, validarea, service-ul si continuitatea operationala.",
      },
      {
        question: "Ce pas ZES ajuta?",
        answer:
          "Project Intake si Proposal Builder ajuta la verificarea modelului potrivit inainte de investitie.",
      },
    ],
    relatedServices: [
      { label: "IVD / laborator", href: "/services/ivd-laborator" },
      { label: "Aparatura medicala", href: "/services/aparatura-medicala" },
      { label: "Service specializat", href: "/services/service-aparatura-medicala" },
    ],
    relatedCalculators: [
      { label: "Calculator cost laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
    relatedArticles: [
      { label: "Echipamente IVD pentru laborator: alegere, integrare si service", href: "/knowledge-hub/echipamente-ivd-laborator-alegere-integrare-service" },
      { label: "Cum se pregateste un laborator pentru echipamente IVD", href: "/knowledge-hub/pregatire-laborator-echipamente-ivd" },
    ],
    relatedGlossaryTerms: [
      { label: "Service contract vs maintenance", href: "/glosar/service-contract-vs-maintenance" },
      { label: "HVAC imagistica medicala", href: "/glosar/hvac-imagistica-medicala" },
    ],
    cta: intakeCta,
    publishedAt: now,
    updatedAt: now,
  },
];
