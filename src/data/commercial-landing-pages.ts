import type { FAQItem } from "@/components/seo/FAQSchema";

export type CommercialLandingLink = {
  href: string;
  label: string;
};

export type CommercialLandingPage = {
  slug: string;
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
  secondaryCta: string;
  audienceTitle: string;
  audienceDescription: string;
  audiences: string[];
  helpTitle: string;
  helpDescription: string;
  helpItems: string[];
  infoTitle: string;
  infoDescription: string;
  requiredInfo: string[];
  processTitle: string;
  processDescription: string;
  processSteps: string[];
  mistakesTitle: string;
  mistakes: string[];
  complianceNote?: string;
  faqs: FAQItem[];
  relatedLinks: CommercialLandingLink[];
};

export const commercialLandingPages: CommercialLandingPage[] = [
  {
    slug: "amenajare-centre-imagistica",
    pageIntent: "imaging-center-planning",
    eyebrow: "Centre de imagistică",
    title: "Amenajare centre imagistică medicală",
    description:
      "Planificare coerentă pentru centre RX, CT și RMN: spațiu, instalații, fluxuri, radioprotecție și pași de implementare clarificați înainte de ofertare.",
    metadataTitle: "Amenajare centre imagistică medicală | ZES MEDCORP",
    metadataDescription:
      "Amenajare centre de imagistică medicală pentru RX, CT și RMN: planificare infrastructură, fluxuri, instalații și evaluare preliminară cu ZESCORP.",
    keywords: [
      "amenajare centru imagistica medicala",
      "infrastructura CT RMN RX",
      "proiect centru imagistica",
      "planificare clinica imagistica",
    ],
    heroNote:
      "Un centru de imagistică funcțional pornește din coordonarea corectă a echipamentului cu spațiul, instalațiile și fluxul clinic.",
    zesPrompt: "Vreau să amenajez un centru de imagistică medicală",
    primaryCta: "Discută amenajarea cu ZES",
    secondaryCta: "Trimite proiectul pentru evaluare",
    audienceTitle: "Pentru clinici și investitori care vor să înceapă corect",
    audienceDescription:
      "Pagina este utilă înainte de alegerea finală a echipamentelor, în etapa de verificare a spațiului sau când proiectul trebuie structurat pentru ofertare.",
    audiences: [
      "Centre medicale care pregătesc o extindere RX, CT sau RMN",
      "Investitori care evaluează un spațiu înainte de semnarea contractului",
      "Clinici care coordonează mai mulți furnizori și specialități tehnice",
    ],
    helpTitle: "Ce poate coordona ZESCORP",
    helpDescription:
      "Amenajarea trebuie privită ca un proiect integrat, nu ca o listă de lucrări separate.",
    helpItems: [
      "Analiza preliminară a spațiului și a traseelor de acces pentru echipamente",
      "Clarificarea cerințelor electrice, HVAC, răcire și UPS",
      "Radioprotecție pentru RX/CT și RF shielding pentru RMN, tratate distinct",
      "Fluxuri pentru pacienți, personal și zone tehnice",
      "Pregătirea etapelor pentru ofertare și implementare",
    ],
    infoTitle: "Informații utile pentru prima evaluare",
    infoDescription:
      "Poți începe și cu date incomplete. Un plan disponibil scurtează discuția tehnică.",
    requiredInfo: [
      "Tipurile de investigații și echipamentele vizate",
      "Spațiu existent, relocare sau construcție nouă",
      "Plan, releveu sau schiță disponibilă",
      "Oraș, termen orientativ și etapă de bugetare",
      "Constrângeri cunoscute de acces, electric sau HVAC",
    ],
    processTitle: "Flux de lucru pentru un centru de imagistică",
    processDescription:
      "ZES pregătește contextul, iar echipa tehnică validează ipotezele înainte de ofertare.",
    processSteps: [
      "Discuție ghidată cu ZES",
      "Evaluare preliminară a spațiului",
      "Clarificare echipamente și instalații",
      "Planificare pe etape",
      "Ofertare și implementare coordonată",
    ],
    mistakesTitle: "Blocaje care merită prevenite",
    mistakes: [
      "Alegerea spațiului fără verificarea accesului de instalare",
      "Separarea tardivă a cerințelor RX/CT de cerințele RF pentru RMN",
      "Subestimarea lucrărilor electrice, HVAC și a perioadei de testare",
    ],
    complianceNote:
      "Cerințele finale depind de echipamente, amplasament și documentația proiectului. Validarea tehnică se face înainte de execuție.",
    faqs: [
      {
        question: "Se poate începe evaluarea înainte de alegerea exactă a echipamentelor?",
        answer:
          "Da. Evaluarea preliminară poate identifica riscurile spațiului și informațiile care trebuie cerute furnizorilor. Cerințele finale se validează după clarificarea echipamentelor.",
      },
      {
        question: "Radioprotecția și RF shielding sunt același lucru?",
        answer:
          "Nu. Radioprotecția este relevantă pentru echipamente cu radiații ionizante, precum RX și CT. RF shielding este specific camerei RMN și se tratează separat.",
      },
      {
        question: "Ce document ajută cel mai mult la început?",
        answer:
          "Un plan sau un releveu al spațiului, împreună cu lista preliminară de echipamente și termenul proiectului.",
      },
    ],
    relatedLinks: [
      { href: "/proiectare-radiologie", label: "Proiectare radiologie și infrastructură RX" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotecție și plumbare camere RX" },
      { href: "/servicii/proiectare-camera-ct", label: "Proiectare cameră CT" },
      { href: "/servicii/proiectare-camera-rmn", label: "Proiectare cameră RMN" },
      { href: "/knowledge-hub/checklist-pre-implementare-imagistica", label: "Checklist pre-implementare imagistică" },
    ],
  },
  {
    slug: "proiectare-radiologie",
    pageIntent: "radiology-design",
    eyebrow: "Proiectare radiologie",
    title: "Proiectare radiologie și infrastructură RX",
    description:
      "Planificare tehnică pentru camere de radiologie: echipament, spațiu, fluxuri, instalații, radioprotecție și documentele necesare pentru următorii pași.",
    metadataTitle: "Proiectare radiologie și infrastructură RX | ZES MEDCORP",
    metadataDescription:
      "Proiectare radiologie și infrastructură RX pentru clinici: plan cameră, fluxuri, instalații, radioprotecție și pregătire tehnică pentru ofertare.",
    keywords: [
      "proiectare radiologie",
      "proiect camera RX",
      "infrastructura radiologie",
      "amenajare camera radiologie",
    ],
    heroNote:
      "O cameră RX bine pregătită reduce clarificările târzii și ajută echipa să coreleze amenajarea cu echipamentul și documentația.",
    zesPrompt: "Am nevoie de proiectare pentru o cameră de radiologie",
    primaryCta: "Discută proiectul cu ZES",
    secondaryCta: "Solicită evaluare preliminară",
    audienceTitle: "Când este utilă proiectarea preliminară",
    audienceDescription:
      "Planificarea devine valoroasă înainte de execuție, atunci când deciziile despre spațiu și echipament încă pot fi ajustate eficient.",
    audiences: [
      "Clinici care deschid o cameră RX nouă",
      "Centre medicale care modernizează un spațiu existent",
      "Echipe care trebuie să coreleze amenajarea cu pașii CNCAN",
    ],
    helpTitle: "Zone analizate în etapa de proiectare",
    helpDescription:
      "O evaluare utilă privește camera RX împreună cu vecinătățile și fluxul operațional.",
    helpItems: [
      "Poziționarea echipamentului și geometria camerei",
      "Pereți, uși, vitraje și zone adiacente",
      "Circulații pentru pacienți și personal",
      "Alimentare electrică, trasee și cerințe tehnice de bază",
      "Datele necesare pentru analiza de radioprotecție",
    ],
    infoTitle: "Ce să pregătești pentru discuția tehnică",
    infoDescription:
      "ZES poate structura solicitarea chiar dacă ai doar un plan simplu și tipul de echipament.",
    requiredInfo: [
      "Tipul echipamentului RX și utilizarea estimată",
      "Planul camerei și vecinătățile",
      "Spațiu existent sau construcție nouă",
      "Stadiul discuțiilor CNCAN",
      "Termenul și bugetul orientativ",
    ],
    processTitle: "Cum avansează proiectarea",
    processDescription:
      "Pornim de la datele disponibile și separăm ipotezele de cerințele care necesită validare.",
    processSteps: [
      "Colectare date prin ZES",
      "Revizuire plan și context",
      "Clarificare radioprotecție",
      "Listă de dependențe tehnice",
      "Pregătire pentru ofertare",
    ],
    mistakesTitle: "Greșeli frecvente în proiectarea radiologiei",
    mistakes: [
      "Pornirea finisajelor înainte de clarificarea radioprotecției",
      "Ignorarea vecinătăților sau a fluxurilor din jurul camerei",
      "Tratarea documentației CNCAN ca un pas care poate fi rezolvat la final",
    ],
    complianceNote:
      "Proiectarea și estimările de radioprotecție trebuie validate de specialiști autorizați în raport cu echipamentul și amplasamentul real.",
    faqs: [
      {
        question: "Este suficient un plan arhitectural pentru prima discuție?",
        answer:
          "De regulă, da. Pentru evaluarea inițială ajută un plan cu dimensiuni, vecinătăți și poziția estimată a echipamentului.",
      },
      {
        question: "Se poate proiecta camera înainte de alegerea furnizorului?",
        answer:
          "Se pot defini ipoteze preliminare, dar cerințele finale trebuie corelate cu fișa tehnică a echipamentului selectat.",
      },
      {
        question: "ZESCORP emite autorizarea CNCAN?",
        answer:
          "Nu. ZESCORP ajută la pregătirea contextului tehnic și la planificare. Procesul și documentele trebuie validate cu specialiști autorizați.",
      },
    ],
    relatedLinks: [
      { href: "/plumbare-radiologica", label: "Plumbare radiologică și protecție RX" },
      { href: "/autorizare-cncan-camera-rx", label: "Pași preliminari pentru autorizare CNCAN" },
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotecție și plumbare camere RX" },
      { href: "/knowledge-hub/protectie-radiologica-camera-rx", label: "Ghid protecție radiologică pentru camera RX" },
      { href: "/knowledge-hub/greseli-amenajare-camera-radiologie", label: "Greșeli de evitat în amenajarea radiologiei" },
    ],
  },
  {
    slug: "autorizare-cncan-camera-rx",
    pageIntent: "cncan-rx-preliminary",
    eyebrow: "Ghid preliminar CNCAN",
    title: "Autorizare CNCAN cameră RX — pași preliminari",
    description:
      "Clarifică informațiile și documentele care trebuie pregătite pentru o cameră RX înainte de discuția cu specialiști autorizați și de implementarea lucrărilor.",
    metadataTitle: "Autorizare CNCAN cameră RX — pași preliminari | ZES MEDCORP",
    metadataDescription:
      "Pași preliminari pentru autorizarea CNCAN a unei camere RX: plan, echipament, radioprotecție și documentație explicate practic pentru clinici.",
    keywords: [
      "autorizare CNCAN camera RX",
      "documente CNCAN radiologie",
      "pasi autorizare radiologie",
      "radioprotectie camera RX",
    ],
    heroNote:
      "O discuție timpurie despre plan, echipament și radioprotecție reduce riscul unor refaceri costisitoare în etapa de amenajare.",
    zesPrompt: "Am nevoie de pași preliminari pentru autorizare CNCAN cameră RX",
    primaryCta: "Pregătește contextul cu ZES",
    secondaryCta: "Solicită discuție tehnică",
    audienceTitle: "Pentru cine este util acest traseu",
    audienceDescription:
      "Este un punct de pornire pentru proprietari și administratori care vor să înțeleagă ce trebuie clarificat înainte de execuție.",
    audiences: [
      "Clinici care pregătesc o cameră RX nouă",
      "Administratori care trebuie să organizeze documentele proiectului",
      "Investitori care vor să evite refaceri după începerea lucrărilor",
    ],
    helpTitle: "Ce trebuie clarificat la început",
    helpDescription:
      "Cerințele exacte diferă de la proiect la proiect. ZES ajută la structurarea datelor pentru validare umană.",
    helpItems: [
      "Tipul echipamentului și utilizarea estimată",
      "Planul camerei, poziția echipamentului și vecinătățile",
      "Soluția preliminară de radioprotecție",
      "Documentele tehnice disponibile",
      "Ordinea realistă a pașilor înainte de implementare",
    ],
    infoTitle: "Documente și informații utile",
    infoDescription:
      "Nu trebuie să ai dosarul complet pentru prima discuție, dar planul și datele echipamentului sunt repere importante.",
    requiredInfo: [
      "Plan sau releveu al camerei RX",
      "Fișa tehnică a echipamentului, dacă este disponibilă",
      "Descrierea spațiilor vecine",
      "Stadiul actual al proiectului",
      "Termenul orientativ pentru deschidere",
    ],
    processTitle: "Traseu preliminar orientativ",
    processDescription:
      "Fluxul exact se validează cu specialiști autorizați. Etapele de mai jos te ajută să pregătești discuția.",
    processSteps: [
      "Definire echipament și spațiu",
      "Revizuire plan și vecinătăți",
      "Analiză preliminară de radioprotecție",
      "Clarificare documentație",
      "Validare cu specialiști autorizați",
    ],
    mistakesTitle: "Ce merită evitat",
    mistakes: [
      "Executarea lucrărilor înainte de validarea soluției tehnice",
      "Folosirea unei soluții standard fără raportare la echipamentul real",
      "Transmiterea incompletă a vecinătăților și a fluxurilor camerei",
    ],
    complianceNote:
      "Informațiile sunt orientative și trebuie validate cu specialiști autorizați. ZESCORP nu acordă autorizări CNCAN.",
    faqs: [
      {
        question: "ZESCORP poate acorda autorizarea CNCAN?",
        answer:
          "Nu. ZESCORP oferă suport preliminar de planificare și poate ajuta la structurarea informațiilor tehnice. Autorizarea și validările se gestionează prin specialiști autorizați și autoritățile competente.",
      },
      {
        question: "Este necesar planul camerei RX?",
        answer:
          "Planul este important pentru înțelegerea dimensiunilor, vecinătăților și amplasării echipamentului. Fără el, discuția rămâne orientativă.",
      },
      {
        question: "Pot cere o evaluare înainte să am toate documentele?",
        answer:
          "Da. Poți începe cu datele disponibile, iar ZES îți va arăta ce informații lipsesc pentru următorul pas.",
      },
    ],
    relatedLinks: [
      { href: "/proiectare-radiologie", label: "Proiectare radiologie și infrastructură RX" },
      { href: "/plumbare-radiologica", label: "Plumbare radiologică și protecție RX" },
      { href: "/knowledge-hub/ce-presupune-autorizarea-cncan-pentru-o-camera-rx", label: "Ghid complet: ce presupune autorizarea CNCAN" },
      { href: "/knowledge-hub/ce-trebuie-sa-stii-despre-autorizarea-cncan", label: "Ce trebuie să știi despre CNCAN" },
    ],
  },
  {
    slug: "service-radiologie-romania",
    pageIntent: "service-radiology",
    eyebrow: "Service radiologie",
    title: "Service radiologie România",
    description:
      "Triage rapid și suport tehnic pentru echipamente de radiologie și imagistică. ZES structurează simptomele, urgența și datele necesare pentru preluarea cazului.",
    metadataTitle: "Service radiologie România | ZES MEDCORP",
    metadataDescription:
      "Service radiologie în România: triere tehnică pentru echipamente RX și imagistică, mentenanță, clarificare simptome și solicitare rapidă prin ZES.",
    keywords: [
      "service radiologie Romania",
      "service aparat RX",
      "mentenanta radiologie",
      "service echipamente imagistica",
    ],
    heroNote:
      "Pentru un caz de service, informațiile clare despre echipament, simptom și downtime ajută la prioritizarea corectă a preluării.",
    zesPrompt: "Am nevoie de service pentru echipament de radiologie",
    primaryCta: "Solicită service prin ZES",
    secondaryCta: "Contact rapid pentru service",
    audienceTitle: "Când să trimiți o solicitare",
    audienceDescription:
      "ZES este util pentru triere inițială, indiferent dacă problema este urgentă sau trebuie planificată o verificare.",
    audiences: [
      "Clinici cu echipamente RX sau imagistică indisponibile",
      "Centre care observă erori recurente sau degradarea funcționării",
      "Administratori care vor să planifice mentenanța și continuitatea operațională",
    ],
    helpTitle: "Ce poate pregăti ZES pentru service",
    helpDescription:
      "Nu oferim instrucțiuni de reparație la distanță. ZES organizează datele pentru triere și intervenție calificată.",
    helpItems: [
      "Tipul echipamentului, producătorul și modelul",
      "Simptomul observat și eventualul cod de eroare",
      "Durata indisponibilității și impactul operațional",
      "Locația și datele de contact pentru preluare",
      "Poze sau documente tehnice, dacă sunt disponibile",
    ],
    infoTitle: "Date esențiale pentru preluare rapidă",
    infoDescription:
      "Pentru cazuri urgente, telefonul, orașul și descrierea clară a simptomului sunt cele mai importante.",
    requiredInfo: [
      "Echipament, marcă și model",
      "Simptom, alarmă sau cod de eroare",
      "Oraș și clinică",
      "Nivelul de urgență și downtime",
      "Contract de mentenanță existent, dacă este cazul",
    ],
    processTitle: "Flux de service",
    processDescription:
      "Cererea ajunge structurată la echipă, cu suficiente informații pentru următorul pas.",
    processSteps: [
      "Triage inițial prin ZES",
      "Clarificare tehnică",
      "Prioritizare caz",
      "Ofertă sau plan de intervenție",
      "Suport tehnic și recomandări",
    ],
    mistakesTitle: "Ce să eviți când apare o problemă",
    mistakes: [
      "Folosirea unui echipament cu funcționare nesigură înainte de evaluare",
      "Intervenții interne neautorizate care pot agrava problema",
      "Trimiterea solicitării fără model, simptom sau date de contact",
    ],
    complianceNote:
      "Pentru echipamente cu funcționare nesigură, opriți utilizarea clinică până la evaluarea de către personal calificat.",
    faqs: [
      {
        question: "Ce informații ajută cel mai mult la triere?",
        answer:
          "Modelul echipamentului, simptomul exact, codul de eroare dacă există, orașul și durata indisponibilității.",
      },
      {
        question: "Pot atașa o fotografie cu eticheta sau eroarea?",
        answer:
          "Da. Fotografiile pot ajuta evaluarea preliminară. Nu încărca date medicale ale pacienților.",
      },
      {
        question: "Primesc instrucțiuni de reparație la distanță?",
        answer:
          "Nu. ZES ajută la triere și pregătirea cererii. Diagnosticul și intervenția trebuie realizate de personal calificat.",
      },
    ],
    relatedLinks: [
      { href: "/service-aparatura-medicala", label: "Service aparatură medicală" },
      { href: "/service-diagnostic", label: "Diagnostic preliminar service" },
      { href: "/knowledge-hub/service-ct-rmn-mentenanta-uptime", label: "Service CT/RMN și continuitate operațională" },
      { href: "/knowledge-hub/service-preventiv-vs-corectiv-aparatura-medicala", label: "Service preventiv vs. corectiv" },
    ],
  },
  {
    slug: "plumbare-radiologica",
    pageIntent: "radioprotection",
    eyebrow: "Protecție RX",
    title: "Plumbare radiologică și protecție RX",
    description:
      "Evaluare preliminară și planificare pentru plumbarea camerelor RX: pereți, uși, vitraje, vecinătăți și documentele care trebuie validate înainte de execuție.",
    metadataTitle: "Plumbare radiologică și protecție RX | ZES MEDCORP",
    metadataDescription:
      "Plumbare radiologică și protecție RX pentru camere de radiologie: evaluare preliminară, planificare tehnică și ofertare cu validare de specialitate.",
    keywords: [
      "plumbare radiologica",
      "plumbare camera RX",
      "protectie radiologica RX",
      "usi radioprotejate",
    ],
    heroNote:
      "Soluția corectă nu pornește de la o grosime standard, ci de la echipament, plan, vecinătăți și utilizarea reală a camerei.",
    zesPrompt: "Am nevoie de plumbare/radioprotecție pentru o cameră RX",
    primaryCta: "Discută camera RX cu ZES",
    secondaryCta: "Solicită ofertă preliminară",
    audienceTitle: "Pentru proiecte RX care au nevoie de o soluție clară",
    audienceDescription:
      "Pagina este relevantă pentru camere noi, modernizări și spații existente care trebuie evaluate înainte de lucrări.",
    audiences: [
      "Radiologie convențională și cabinete RX",
      "Clinici cu proiecte de mamografie sau fluoroscopie",
      "Spații existente unde vecinătățile și accesul trebuie verificate atent",
    ],
    helpTitle: "Ce intră în discuția de radioprotecție",
    helpDescription:
      "O ofertă utilă pornește din datele tehnice și din validarea specialistului, nu dintr-o estimare generică.",
    helpItems: [
      "Pereți, tavane, pardoseli și zone adiacente",
      "Uși și vitraje radioprotejate",
      "Poziția echipamentului și direcțiile relevante de expunere",
      "Planul camerei și fluxurile de acces",
      "Documentele necesare pentru clarificarea soluției",
    ],
    infoTitle: "Ce informații scurtează ofertarea",
    infoDescription:
      "Dacă ai planul camerei și tipul echipamentului, ZES poate pregăti rapid o cerere structurată.",
    requiredInfo: [
      "Tipul echipamentului RX",
      "Planul sau schița spațiului",
      "Spațiu existent sau construcție nouă",
      "Vecinătățile camerei",
      "Oraș, termen și buget orientativ",
    ],
    processTitle: "De la plan la ofertare",
    processDescription:
      "Etapele păstrează diferența dintre evaluarea preliminară și validarea tehnică obligatorie.",
    processSteps: [
      "Discuție cu ZES",
      "Transmitere plan sau schiță",
      "Evaluare preliminară",
      "Validare de specialitate",
      "Ofertare și planificare lucrări",
    ],
    mistakesTitle: "Erori care pot costa timp",
    mistakes: [
      "Comandarea materialelor înainte de analiza configurației reale",
      "Omiterea ușilor, vitrajelor sau a vecinătăților din discuția inițială",
      "Confundarea plumbării RX cu RF shielding pentru RMN",
    ],
    complianceNote:
      "Estimările sunt preliminare. Grosimile și configurația finală de radioprotecție trebuie validate de specialist autorizat.",
    faqs: [
      {
        question: "Cât plumb este necesar pentru o cameră RX?",
        answer:
          "Nu există o grosime universală. Soluția depinde de echipament, plan, vecinătăți și utilizare și trebuie validată de specialist autorizat.",
      },
      {
        question: "Se poate solicita ofertă dacă planul nu este final?",
        answer:
          "Da. Se poate pregăti o evaluare preliminară și o listă de clarificări. Oferta finală depinde de datele validate.",
      },
      {
        question: "Plumbarea RX este potrivită și pentru camera RMN?",
        answer:
          "Nu. Camera RMN necesită RF shielding și cerințe specifice. Acestea nu trebuie confundate cu radioprotecția RX.",
      },
    ],
    relatedLinks: [
      { href: "/radioprotectie-plumbare-rx", label: "Radioprotecție și plumbare camere RX" },
      { href: "/proiectare-radiologie", label: "Proiectare radiologie și infrastructură RX" },
      { href: "/autorizare-cncan-camera-rx", label: "Pași preliminari CNCAN pentru camera RX" },
      { href: "/knowledge-hub/cat-costa-plumbarea-unei-camere-rx", label: "Cât costă plumbarea unei camere RX?" },
      { href: "/knowledge-hub/protectie-radiologica-camera-rx", label: "Ghid protecție radiologică pentru camera RX" },
    ],
  },
  {
    slug: "amenajare-cabinet-medical",
    pageIntent: "medical-office-fitout",
    eyebrow: "Amenajare cabinet medical",
    title: "Amenajare cabinet medical",
    description:
      "Planificare tehnica si comerciala pentru cabinete medicale, policlinici si spatii clinice care au nevoie de fluxuri, instalatii, echipamente si suport de implementare clare.",
    metadataTitle: "Amenajare cabinet medical | ZES MEDCORP",
    metadataDescription:
      "Amenajare cabinet medical: planificare spatiu, fluxuri, instalatii, echipamente, service si pregatire pentru ofertare cu ZESCORP.",
    keywords: [
      "amenajare cabinet medical",
      "amenajare clinica medicala",
      "proiect cabinet medical",
      "infrastructura cabinet medical",
    ],
    heroNote:
      "Un cabinet medical eficient se construieste in jurul fluxului clinic, al echipamentelor si al modului in care spatiul va fi operat zilnic.",
    zesPrompt: "Vreau sa amenajez un cabinet medical",
    primaryCta: "Discuta cabinetul cu ZES",
    secondaryCta: "Trimite spatiul pentru evaluare",
    audienceTitle: "Pentru proprietari si administratori care vor un spatiu medical functional",
    audienceDescription:
      "Pagina este potrivita pentru cabinete noi, extinderi de clinica si spatii existente care trebuie adaptate pentru activitate medicala.",
    audiences: [
      "Medici care deschid un cabinet sau o policlinica",
      "Investitori care verifica un spatiu inainte de amenajare",
      "Administratori care modernizeaza fluxuri si echipamente existente",
    ],
    helpTitle: "Ce poate clarifica ZESCORP",
    helpDescription:
      "Amenajarea medicala trebuie tratata impreuna cu echipamentele si operarea reala a cabinetului.",
    helpItems: [
      "Fluxuri pentru pacienti, personal, receptie si zone tehnice",
      "Necesitati electrice, HVAC, date si spatii auxiliare",
      "Integrarea echipamentelor medicale in layout",
      "Optiuni pentru service, mentenanta si suport post-implementare",
      "Pregatirea unei cereri coerente pentru ofertare",
    ],
    infoTitle: "Informatii utile pentru prima discutie",
    infoDescription:
      "Poti incepe cu un plan simplu sau o descriere a spatiului. Detaliile se clarifica progresiv.",
    requiredInfo: [
      "Specialitatea sau tipul cabinetului",
      "Oras si suprafata aproximativa",
      "Spatiu existent sau amenajare noua",
      "Echipamente medicale planificate",
      "Termen si buget orientativ",
    ],
    processTitle: "Proces de amenajare medicala",
    processDescription:
      "Fluxul separa rapid deciziile de spatiu, echipamente si operare, astfel incat oferta sa fie mai usor de pregatit.",
    processSteps: [
      "Discutie initiala",
      "Evaluare spatiu",
      "Clarificare echipamente",
      "Planificare lucrari",
      "Ofertare si implementare",
    ],
    mistakesTitle: "Greseli care merita evitate",
    mistakes: [
      "Alegerea finisajelor inainte de amplasarea echipamentelor",
      "Subestimarea instalatiilor electrice, HVAC si de date",
      "Lipsa unui plan de service si mentenanta dupa deschidere",
    ],
    complianceNote:
      "Cerintele finale depind de specialitate, echipamente, amplasament si reglementarile aplicabile. Validarea se face cu specialistii competenti.",
    faqs: [
      {
        question: "Se poate incepe fara proiect final?",
        answer:
          "Da. O evaluare preliminara poate identifica informatiile lipsa si pasii necesari pentru planificare si ofertare.",
      },
      {
        question: "ZESCORP poate ajuta si cu echipamentele?",
        answer:
          "Da, pagina poate conecta amenajarea cu selectia, instalarea si service-ul echipamentelor medicale relevante.",
      },
      {
        question: "Este acelasi lucru cu amenajarea unui centru de imagistica?",
        answer:
          "Nu. Centrele de imagistica au cerinte suplimentare pentru RX, CT, RMN, radioprotectie sau RF shielding.",
      },
    ],
    relatedLinks: [
      { href: "/solutii-medicale/dezvoltare-unitati-medicale", label: "Dezvoltare unitati medicale" },
      { href: "/amenajare-centre-imagistica", label: "Amenajare centre imagistica" },
      { href: "/solutii-medicale/echipamente-imagistica-diagnostic", label: "Echipamente medicale" },
      { href: "/contracte-mentenanta", label: "Contracte mentenanta" },
      { href: "/contact", label: "Contact ZESCORP" },
    ],
  },
  {
    slug: "service-ecografe",
    pageIntent: "ultrasound-service",
    eyebrow: "Service ecografe",
    title: "Service ecografe",
    description:
      "Service si mentenanta pentru ecografe stationare sau portabile, sonde si accesorii, cu triere rapida pentru defecte care afecteaza activitatea cabinetului.",
    metadataTitle: "Service ecografe | ZES MEDCORP",
    metadataDescription:
      "Service ecografe si sonde: triere defecte, mentenanta, suport tehnic, evaluare preliminara si solicitare service prin ZESCORP.",
    keywords: [
      "service ecografe",
      "mentenanta ecograf",
      "reparatii ecograf",
      "service sonde ecograf",
    ],
    heroNote:
      "Ecografele sunt echipamente folosite zilnic. O defectiune de sonda, display sau alimentare poate bloca rapid activitatea cabinetului.",
    zesPrompt: "Am nevoie de service pentru un ecograf",
    primaryCta: "Solicita service ecograf",
    secondaryCta: "Trimite cazul pentru triere",
    audienceTitle: "Pentru clinici care depind de ecografie zilnic",
    audienceDescription:
      "Pagina este utila pentru defecte active, mentenanta preventiva si evaluarea unui parc de ecografe.",
    audiences: [
      "Cabinete de ecografie si imagistica",
      "Clinici de cardiologie, ginecologie sau medicina interna",
      "Administratori cu mai multe ecografe sau sonde critice",
    ],
    helpTitle: "Ce poate include evaluarea",
    helpDescription:
      "Triage-ul porneste de la simptom si de la impactul operational, nu de la o presupunere de reparatie.",
    helpItems: [
      "Identificare marca, model si configuratie",
      "Simptome de pornire, display, imagine sau sonda",
      "Evaluare accesorii, cabluri si sonde disponibile",
      "Recomandare pentru interventie sau mentenanta recurenta",
      "Pregatirea cererii pentru preluare tehnica",
    ],
    infoTitle: "Date utile pentru service",
    infoDescription:
      "Cu datele minime, ZES poate pregati cererea si poate reduce timpul de clarificare.",
    requiredInfo: [
      "Marca si modelul ecografului",
      "Numarul si tipul sondelor",
      "Simptomul observat",
      "Oras si urgenta",
      "Poze cu eticheta sau eroarea, fara date de pacient",
    ],
    processTitle: "Flux service ecograf",
    processDescription:
      "Scopul este sa stabilim rapid daca discutam despre triere, interventie sau contract de mentenanta.",
    processSteps: [
      "Descriere simptom",
      "Date echipament",
      "Prioritate service",
      "Evaluare preliminara",
      "Interventie sau contract",
    ],
    mistakesTitle: "Ce trebuie evitat",
    mistakes: [
      "Continuarea utilizarii daca echipamentul are comportament nesigur",
      "Transmiterea de imagini cu date medicale ale pacientilor",
      "Amanarea mentenantei cand aceeasi problema reapare frecvent",
    ],
    complianceNote:
      "Nu deschideti si nu reparati echipamentul fara personal calificat. Pentru defecte cu risc operational, opriti utilizarea pana la evaluare.",
    faqs: [
      {
        question: "Pot solicita service doar pentru o sonda?",
        answer:
          "Da. Sonda poate fi tratata ca element critic, mai ales daca defectul afecteaza direct investigatiile programate.",
      },
      {
        question: "Este nevoie de poza cu eticheta?",
        answer:
          "Este utila pentru identificare, dar nu obligatorie. Nu includeti date de pacient.",
      },
      {
        question: "Se poate transforma interventia in contract?",
        answer:
          "Da. Daca exista mai multe ecografe sau probleme recurente, merita discutat un contract de mentenanta.",
      },
    ],
    relatedLinks: [
      { href: "/contracte-mentenanta/mentenanta-ecografe", label: "Mentenanta ecografe" },
      { href: "/solutii-medicale/ecografe-sisteme-ultrasunete", label: "Ecografe si sisteme ultrasunete" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/service-diagnostic", label: "Diagnostic service" },
      { href: "/contact", label: "Contact service" },
    ],
  },
  {
    slug: "service-laborator-ivd",
    pageIntent: "laboratory-ivd-service",
    eyebrow: "Service laborator / IVD",
    title: "Service laborator / IVD",
    description:
      "Service si mentenanta pentru echipamente de laborator si IVD, cu focus pe continuitatea fluxului de probe, analizatoare, echipamente auxiliare si suport operational.",
    metadataTitle: "Service laborator IVD | ZES MEDCORP",
    metadataDescription:
      "Service laborator si echipamente IVD: analizatoare, mentenanta, triere defecte, suport operational si contracte preventive prin ZESCORP.",
    keywords: [
      "service laborator IVD",
      "service echipamente laborator",
      "mentenanta analizatoare IVD",
      "service analizatoare medicale",
    ],
    heroNote:
      "In laborator, downtime-ul unui analizator poate afecta probe, raportare si fluxul clinic. Service-ul trebuie gandit impreuna cu operarea zilnica.",
    zesPrompt: "Am nevoie de service pentru echipamente de laborator IVD",
    primaryCta: "Solicita service laborator",
    secondaryCta: "Trimite inventarul pentru evaluare",
    audienceTitle: "Pentru laboratoare si clinici cu flux IVD critic",
    audienceDescription:
      "Pagina ajuta cand exista defecte active, echipamente critice sau nevoie de plan de mentenanta preventiva.",
    audiences: [
      "Laboratoare private si clinici cu laborator intern",
      "Administratori care urmaresc continuitatea fluxului de probe",
      "Centre cu analizatoare si echipamente auxiliare multimarca",
    ],
    helpTitle: "Ce poate clarifica ZESCORP",
    helpDescription:
      "Evaluarea initiala separa defectul activ, nevoia de preventie si eventualele dependente de producator sau consumabile.",
    helpItems: [
      "Analizatoare si echipamente auxiliare",
      "Simptome, erori, consumabile si accesorii",
      "Prioritate in functie de impactul asupra fluxului de probe",
      "Optiuni de mentenanta preventiva",
      "Recomandari pentru service multimarca sau escaladare",
    ],
    infoTitle: "Date utile pentru triere",
    infoDescription:
      "Nu este nevoie de inventar perfect. O lista aproximativa ajuta la prima evaluare.",
    requiredInfo: [
      "Tip analizator si producator",
      "Volum aproximativ de lucru",
      "Simptom sau eroare",
      "Locatie si urgenta",
      "Contracte, garantii sau mentenanta existenta",
    ],
    processTitle: "Flux service laborator",
    processDescription:
      "ZES structureaza cazul pentru preluare, iar echipa tehnica poate clarifica urmatorii pasi.",
    processSteps: [
      "Triage caz",
      "Inventar minim",
      "Criticitate laborator",
      "Plan de actiune",
      "Service sau mentenanta",
    ],
    mistakesTitle: "Riscuri care merita prevenite",
    mistakes: [
      "Ignorarea defectelor recurente pana cand blocheaza fluxul",
      "Lipsa unei evidente clare pentru consumabile, accesorii si contracte",
      "Amestecarea validarii laboratorului cu service-ul tehnic fara responsabilitati clare",
    ],
    complianceNote:
      "Service-ul tehnic nu inlocuieste validarile interne ale laboratorului sau cerintele aplicabile procedurilor IVD.",
    faqs: [
      {
        question: "Se pot include mai multe analizatoare intr-un contract?",
        answer:
          "Da, cu definirea clara a echipamentelor, prioritatilor, limitelor tehnice si responsabilitatilor.",
      },
      {
        question: "Ce conteaza pentru prioritate?",
        answer:
          "Impactul asupra fluxului de probe, lipsa echipamentului alternativ, urgenta raportarii si istoricul de defecte.",
      },
      {
        question: "Pot solicita evaluare fara contract existent?",
        answer:
          "Da. Cererea poate porni de la o problema activa sau de la intentia de a construi un plan preventiv.",
      },
    ],
    relatedLinks: [
      { href: "/contracte-mentenanta/mentenanta-laborator-ivd", label: "Mentenanta laborator / IVD" },
      { href: "/solutii-medicale/echipamente-laborator-ivd", label: "Echipamente laborator / IVD" },
      { href: "/calculatoare/cost-laborator-ivd", label: "Calculator laborator IVD" },
      { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
      { href: "/contact", label: "Contact service" },
    ],
  },
];

export function getCommercialLandingPage(slug: string) {
  return commercialLandingPages.find((page) => page.slug === slug);
}
