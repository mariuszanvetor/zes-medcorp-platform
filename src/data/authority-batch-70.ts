import type { Article } from "@/data/articles";

const proposalBuilderCta = {
  title: "Ai nevoie sa transformi tema intr-un plan clar?",
  description:
    "Poti continua cu o propunere preliminara, servicii relevante, riscuri si informatie lipsa inainte de bugetul final.",
  label: "Deschide Proposal Builder",
  href: "/proposal-builder",
};

const intakeCta = {
  title: "Vrei sa trimiti detaliile proiectului?",
  description:
    "Trimite datele tehnice esentiale si primesti un context de analiza mai clar, fara promisiuni artificiale.",
  label: "Completeaza Project Intake",
  href: "/project-intake",
};

const rfEstimateTool = { label: "Estimare RF shielding", href: "/calculatoare/rf-shielding-estimare" };
const hvacEstimateTool = { label: "Estimare HVAC", href: "/calculatoare/hvac-imagistica-estimare" };
const electricEstimateTool = { label: "Estimare putere electrica", href: "/calculatoare/putere-electrica-imagistica" };
const modernizationEstimateTool = { label: "Estimare modernizare clinica", href: "/calculatoare/modernizare-clinica-estimare" };
const ivdEstimateTool = { label: "Estimare laborator IVD", href: "/calculatoare/cost-laborator-ivd" };
const clinicEvaluateTool = { label: "Evaluare preliminara", href: "/calculatoare/evaluare-preliminara-clinica" };
const serviceDiagnosticTool = { label: "Evaluare service", href: "/service-diagnostic" };
const radiologyPlannerTool = { label: "Radiology Room Planner", href: "/radiology-room-planner" };
const projectMedicalCalculatorTool = { label: "Calculator proiect medical", href: "/calculator-proiect-medical" };

export const authorityBatch70: Article[] = [
  {
    slug: "ce-presupune-autorizarea-cncan-pentru-o-camera-rx",
    title: "Ce presupune autorizarea CNCAN pentru o camera RX?",
    description:
      "Ghid practic pentru clinici si investitori: ce presupune preliminar autorizarea CNCAN pentru o camera RX, ce informatii sunt necesare si cand merita evaluarea tehnica.",
    category: "Autorizări",
    tags: ["CNCAN", "camera RX", "radioprotectie", "autorizare radiologie"],
    readingTime: "9 min",
    targetKeyword: "autorizare CNCAN camera RX",
    relatedServices: [
      "/radioprotectie-plumbare-rx",
      "/services/protectie-radiologica",
      "/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Discuta cu ZES despre camera RX", href: "/" },
      { label: "Pregateste cererea preliminara", href: "/project-intake" },
      { label: "Radioprotectie si plumbare RX", href: "/radioprotectie-plumbare-rx" },
    ],
    intro:
      "Autorizarea CNCAN pentru o camera RX nu este un formular singular completat la final de proiect, ci un proces in care configuratia camerei, tipul echipamentului si solutia de radioprotectie trebuie corelate din timp. O abordare corecta reduce riscul de refaceri si blocaje in calendar.",
    sections: [
      {
        id: "ce-este-cncan-si-de-ce-conteaza",
        title: "Ce este CNCAN si de ce conteaza",
        body: [
          "Pentru proiectele cu radiologie, cadrul CNCAN este relevant deoarece gestioneaza cerintele de protectie radiologica in contextul utilizarii aparaturii cu radiatii ionizante.",
          "In practica, pentru o clinica sau un investitor, asta inseamna ca proiectul camerei RX trebuie gandit astfel incat deciziile de amenajare, ecranare si exploatare sa fie coerente tehnic.",
        ],
      },
      {
        id: "ce-trebuie-clarificat-inainte",
        title: "Ce trebuie clarificat inainte de autorizare",
        body: [
          "Inainte de a discuta despre o documentatie completa, trebuie clarificate datele de baza: tipul echipamentului RX, contextul de utilizare, vecinatatile camerei si constrangerile de spatiu.",
          "Fara aceste premise, evaluarea costurilor, a termenului si a nivelului de radioprotectie ramane incompleta.",
        ],
        bullets: [
          "tipul de aparat si configuratia de lucru",
          "spatiu existent versus constructie noua",
          "zone adiacente si fluxuri de personal/pacienti",
          "orizont de implementare si stadiul proiectului",
        ],
      },
      {
        id: "rolul-planului-camerei-rx",
        title: "Rolul planului camerei RX",
        body: [
          "Planul camerei este baza pentru orice discutie tehnica serioasa. El permite estimarea corecta a suprafetelor, analizarea punctelor sensibile si definirea solutiilor de ecranare.",
          "Daca planul lipseste sau este incomplet, recomandarile pot fi doar orientative si trebuie revizuite ulterior.",
        ],
      },
      {
        id: "radioprotectie-si-plumbare",
        title: "Radioprotectie si plumbare",
        body: [
          "Plumbarea este doar o parte a radioprotectiei. Solutia completa depinde de echipament, de geometria camerei, de vecinatati si de modul in care spatiul va fi folosit in operare.",
          "Din acest motiv, nu exista o reteta universala aplicabila identic pentru toate camerele RX.",
        ],
      },
      {
        id: "documente-si-informatii-utile",
        title: "Documente si informatii utile",
        body: [
          "Pentru o evaluare preliminara eficienta, sunt utile planul camerei, date tehnice de echipament si informatii despre utilizare. Acest pachet minim scurteaza clarificarile si imbunatateste calitatea estimarii.",
          "Pe masura ce proiectul avanseaza, documentatia se completeaza impreuna cu specialistii relevanti.",
        ],
      },
      {
        id: "greseli-frecvente",
        title: "Greseli frecvente",
        body: [
          "Una dintre cele mai frecvente greseli este amanarea radioprotectiei pana dupa alegerile de finisaj sau dupa blocarea bugetului. In acel punct, orice ajustare poate deveni costisitoare.",
          "O alta greseala este presupunerea ca un pret generic pentru plumbare echivaleaza cu o solutie validata pentru proiect.",
        ],
        callout: {
          title: "Nota de conformare",
          body: "Informatiile sunt orientative si trebuie validate cu specialisti autorizati.",
        },
      },
      {
        id: "cum-poate-ajuta-zes",
        title: "Cum poate ajuta ZES",
        body: [
          "ZES poate organiza rapid informatia initiala, poate evidentia datele lipsa si poate pregati un context util pentru discutia tehnica. Astfel, echipa ta intra mai pregatita in etapa de evaluare preliminara.",
          "In functie de caz, poti continua catre discutia de radioprotectie/plumbare sau catre pregatirea cererii preliminare de proiect.",
        ],
      },
      {
        id: "cand-sa-soliciti-evaluare",
        title: "Cand sa soliciti evaluare",
        body: [
          "Merita sa soliciti evaluare cand ai cel putin tipul echipamentului, planul (chiar preliminar) si contextul de utilizare. In acest punct poti primi o directie tehnica mai clara.",
          "Daca proiectul este in faza timpurie, incepe cu ZES pentru trierea informatiei si stabilirea urmatorilor pasi.",
        ],
      },
    ],
    faqs: [
      {
        question: "Poate ZESCORP sa acorde direct autorizarea CNCAN?",
        answer:
          "Nu. ZESCORP poate oferi ghidaj tehnic preliminar si suport de pregatire, iar etapele de autorizare trebuie gestionate in cadrul legal aplicabil, cu specialisti autorizati.",
      },
      {
        question: "Este suficienta doar plumbarea pentru conformare?",
        answer:
          "Nu intotdeauna. Radioprotectia trebuie abordata ca sistem, in functie de echipament, vecinatati, utilizare si documentatia tehnica.",
      },
      {
        question: "Se poate porni evaluarea fara plan final?",
        answer:
          "Da, la nivel preliminar. Pentru decizii tehnice finale este necesara documentatie completa validata de specialisti.",
      },
      {
        question: "Cand este potrivita cererea preliminara?",
        answer:
          "Cand exista date de baza despre camera RX, aparat si stadiul proiectului, astfel incat discutia sa devina practica si orientata pe implementare.",
      },
    ],
    relatedArticles: [
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "protectie-radiologica-camera-rx",
      "cat-costa-plumbarea-unei-camere-rx",
    ],
    cta: {
      title: "Discuta cu ZES despre camera RX",
      description:
        "Pregateste contextul tehnic al proiectului si continua cu urmatorii pasi pentru evaluare preliminara.",
      label: "Pregateste cererea preliminara",
      href: "/project-intake",
    },
    publishedAt: "2026-05-28",
    updatedAt: "2026-05-28",
  },
  {
    slug: "ce-faci-cand-monitorul-de-functii-vitale-nu-mai-porneste",
    title: "Ce faci cand un monitor de functii vitale nu mai porneste?",
    description:
      "Ghid practic pentru clinici si echipe biomedicale: simptome, cauze posibile si cand este necesara evaluarea specializata pentru un monitor de functii vitale care nu mai porneste.",
    category: "Service",
    tags: ["service aparatura medicala", "monitor functii vitale", "diagnostic preliminar", "mentenanta"],
    readingTime: "8 min",
    targetKeyword: "monitor functii vitale nu mai porneste",
    relatedServices: [
      "/service-aparatura-medicala",
      "/services/service-aparatura-medicala",
      "/services/aparatura-medicala",
    ],
    relatedTools: [
      { label: "Discuta cu ZES despre problema aparatului", href: "/" },
      { label: "Solicita evaluare preliminara", href: "/project-intake" },
      { label: "Service aparatura medicala", href: "/service-aparatura-medicala" },
    ],
    intro:
      "Cand un monitor de functii vitale nu mai porneste, presiunea operationala poate fi mare, mai ales in zone clinice active. O abordare corecta inseamna triere calma, verificari de baza in conditii sigure si escaladare rapida catre service calificat atunci cand exista risc de functionare incorecta.",
    sections: [
      {
        id: "simptome-frecvente",
        title: "Simptome frecvente",
        body: [
          "In practica, problemele apar sub forme diferite: echipamentul nu porneste deloc, porneste partial, are semnal acustic fara afisaj stabil sau se opreste imediat dupa boot.",
          "Observarea exacta a simptomului ajuta echipa de service sa prioritizeze cazul si sa reduca timpul de diagnostic.",
        ],
      },
      {
        id: "cauze-posibile",
        title: "Cauze posibile la nivel preliminar",
        body: [
          "Fara a deschide echipamentul, cauzele posibile pot include alimentare instabila, acumulator degradat, problema de pornire software, defect de afisaj, eroare interna sau incompatibilitate pe lantul de accesorii/cabluri.",
          "Aceste ipoteze sunt orientative si nu inlocuiesc evaluarea tehnica de service.",
        ],
        bullets: [
          "alimentare sau adaptor cu comportament instabil",
          "acumulator cu autonomie critica sau defect",
          "failure de startup/boot",
          "problema pe display/backlight",
          "defect intern care necesita diagnostic specializat",
          "cabluri/accesorii cu contact incorect",
        ],
      },
      {
        id: "ce-se-poate-verifica-in-siguranta",
        title: "Ce poate fi verificat in siguranta",
        body: [
          "Pot fi verificate doar elemente externe, fara interventii invazive: sursa de alimentare aprobata, conectica externa evidenta si conditiile de mediu de baza. Daca simptomul persista, nu continua utilizarea in flux clinic critic fara evaluare.",
          "Nu este recomandata deschiderea echipamentului sau tentativa de reparatie interna de catre personal neautorizat.",
        ],
      },
      {
        id: "cand-este-necesar-service-specializat",
        title: "Cand este necesar service specializat",
        body: [
          "Service-ul specializat este necesar atunci cand monitorul nu porneste repetat, afisajul ramane instabil sau exista dubii privind functionarea corecta in context clinic.",
          "Cu cat datele initiale despre simptom sunt mai clare, cu atat trierea si interventia pot fi mai rapide.",
        ],
      },
      {
        id: "riscuri-utilizare-defect",
        title: "Riscuri in utilizarea unui echipament defect",
        body: [
          "Utilizarea unui monitor cu pornire instabila sau comportament neclar poate afecta siguranta operationala si deciziile clinice. In scenarii critice, continuitatea monitorizarii trebuie protejata prin echipamente functionale.",
          "Daca exista incertitudine privind functionarea corecta, echipamentul ar trebui scos temporar din uz pana la evaluare tehnica.",
        ],
        callout: {
          title: "Siguranta operationala",
          body: "Acest ghid nu include instructiuni de reparatie interna. Pentru diagnostic si remediere, folositi service calificat.",
        },
      },
      {
        id: "cum-poate-ajuta-zes",
        title: "Cum poate ajuta ZES",
        body: [
          "ZES poate colecta rapid contextul de service (simptom, model, urgenta, locatie) si poate pregati cererea preliminara pentru echipa tehnica.",
          "Astfel, comunicarea initiala devine mai clara, iar prioritizarea cazului este mai eficienta.",
        ],
      },
      {
        id: "cand-sa-solicitati-evaluare",
        title: "Cand sa solicitati evaluare preliminara",
        body: [
          "Solicitati evaluare imediat ce observati un simptom repetitiv de pornire sau functionare instabila in context clinic. Escaladarea timpurie reduce riscul de downtime prelungit.",
          "Pentru urgente, mentionati in cerere impactul operational (sectie, interval indisponibil, disponibilitate backup).",
        ],
      },
    ],
    faqs: [
      {
        question: "Este sigur sa folosesc monitorul daca porneste intermitent?",
        answer:
          "Nu este recomandat in flux critic pana la o evaluare tehnica. Functionarea intermitenta poate ascunde defecte care afecteaza fiabilitatea monitorizarii.",
      },
      {
        question: "Pot deschide echipamentul pentru verificare interna?",
        answer:
          "Nu. Reparatiile interne trebuie facute doar de personal calificat, cu proceduri si trasabilitate adecvata.",
      },
      {
        question: "Ce informatii ajuta cel mai mult la triere?",
        answer:
          "Modelul echipamentului, simptomul exact, momentul aparitiei, urgenta operationala si locatia clinica.",
      },
      {
        question: "Cand trebuie ceruta evaluare preliminara?",
        answer:
          "Cand monitorul nu mai porneste stabil sau exista impact asupra activitatii clinice. Cu cat cererea este trimisa mai devreme, cu atat interventia poate fi planificata mai eficient.",
      },
    ],
    relatedArticles: [
      "service-ct-rmn-mentenanta-uptime",
      "mentenanta-preventiva-aparatura-medicala",
      "contract-mentenanta-aparatura-medicala",
    ],
    cta: {
      title: "Discuta cu ZES despre problema aparatului",
      description:
        "Descrie simptomul monitorului si pregateste rapid o cerere clara pentru evaluare preliminara.",
      label: "Solicita evaluare preliminara",
      href: "/project-intake",
    },
    publishedAt: "2026-05-28",
    updatedAt: "2026-05-28",
  },
  {
    slug: "rmn-1-5t-vs-3t-infrastructura",
    title: "RMN 1.5T vs 3T din punct de vedere al infrastructurii",
    description:
      "Cum se schimba cerintele de spatiu, RF shielding, HVAC, acces si service atunci cand compari un RMN 1.5T cu unul 3T.",
    category: "RF shielding",
    tags: ["RMN", "1.5T", "3T", "infrastructura"],
    readingTime: "10 min",
    targetKeyword: "RMN 1.5T vs 3T infrastructura",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/radiologie",
    ],
    relatedTools: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Diferenta dintre un RMN 1.5T si unul 3T nu este doar despre performanta imaginii. Din perspectiva infrastructurii, alegerea schimba cerintele de RF shielding, controlul mediului, accesul pentru magnet, testarea camerei si modul in care proiectul este operat pe termen lung. Daca proiectul este gandit prea tarziu in jurul aparatului, infrastructura ajunge sa dicteze bugetul si calendarul.",
    sections: [
      {
        id: "ce-se-schimba",
        title: "Ce se schimba intre 1.5T si 3T",
        body: [
          "Pe partea de infrastructura, 3T tinde sa impuna o disciplina mai stricta asupra camerei, asupra RF shielding-ului si asupra mediului. In practica, nu inseamna doar o lista mai lunga de cerinte, ci o atentie mai mare la stabilitate, la integrarea echipamentelor si la modul in care spatiul sustine performanta echipamentului.",
          "Un 1.5T poate fi mai flexibil in anumite scenarii, dar asta nu inseamna ca proiectul este simplu. Accesul, traseele, instalatiile, testarea si service-ul trebuie verificate din timp pentru ambele variante.",
        ],
      },
      {
        id: "rf-si-hvac",
        title: "RF shielding si HVAC",
        body: [
          "In ambele cazuri, RF shielding-ul ramane disciplina centrala. Cu cat cerintele de performanta sunt mai ridicate, cu atat detaliile de executie, penetrarile, usa RF si continuitatea camerei conteaza mai mult. RMN-ul nu se proiecteaza ca un spatiu generic cu finisaje bune.",
          "HVAC-ul trebuie tratat ca parte a performantei sistemului, nu ca un accesoriu. Temperatura, umiditatea, traseele, zgomotul si compatibilitatea cu camera sunt elemente care pot schimba costul si termenul mai mult decat pare la prima vedere.",
        ],
      },
      {
        id: "alegere-practica",
        title: "Cum alegi practic",
        body: [
          "Alegerea corecta porneste de la profilul clinicii, volumul de lucru si tipul de pacienti. Apoi se verifica spatiul, livrarea magnetului, cerintele furnizorului si bugetul total de implementare, nu doar pretul echipamentului.",
          "Daca proiectul este la limita intre 1.5T si 3T, merita discutata din timp si strategia de operare: service, uptime, extindere, consumuri si modul in care camera va fi folosita in urmatorii ani.",
        ],
      },
    ],
    faqs: [
      {
        question: "Este 3T automat mai greu de implementat decat 1.5T?",
        answer:
          "Nu automat, dar de multe ori cere mai multa atentie la RF shielding, HVAC, stabilitate si coordonarea cu furnizorul.",
      },
      {
        question: "RMN-ul are nevoie de plumb?",
        answer:
          "Nu in mod obisnuit. RMN-ul are nevoie de RF shielding, nu de ecranare radiologica pentru radiaii ionizante.",
      },
      {
        question: "Pot alege echipamentul inainte de verificarea spatiului?",
        answer:
          "Este riscant. FiÈ™a echipamentului trebuie corelata cu spatiul, accesul si instalatiile inainte de decizie.",
      },
      {
        question: "Care este primul instrument util?",
        answer:
          "Radiology Room Planner si calculatorul pentru camera RMN sunt utile pentru prima triere a riscurilor.",
      },
    ],
    relatedArticles: [
      "cerinte-electrice-rmn",
      "cat-dureaza-amenajarea-camera-rmn",
      "checklist-camera-rmn-inainte-instalare",
    ],
    cta: {
      title: "Compari variantele RMN?",
      description:
        "Pune infrastructura, RF shielding-ul si service-ul pe acelasi plan inainte de decizie.",
      label: "Calculeaza camera RMN",
      href: "/calculatoare/cost-camera-rmn",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "cerinte-electrice-rmn",
    title: "Cerinte electrice pentru RMN: ce trebuie verificat din timp",
    description:
      "Cerintele electrice influenteaza amplasamentul, puterea disponibila, protectiile, traseele si calendarul unui proiect RMN.",
    category: "RF shielding",
    tags: ["RMN", "electrice", "alimentare", "infrastructura"],
    readingTime: "9 min",
    targetKeyword: "cerinte electrice RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator putere electrica", href: "/calculatoare/putere-electrica-imagistica" },
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Project Intake ZES", href: "/project-intake" },
    ],
    intro:
      "Un RMN nu se verifica doar pentru camera si RF shielding. Cerintele electrice pot schimba complet proiectul: puterea disponibila, protectiile, traseele, zonele tehnice si timpul de implementare. Daca electricul este tratat ca o formalitate, apare riscul de refacere chiar inainte de instalare.",
    sections: [
      {
        id: "putere-si-rezerve",
        title: "Putere, rezerve si continuitate",
        body: [
          "Proiectul trebuie sa porneasca de la puterea real disponibila si de la rezervele necesare echipamentelor conexe. RMN-ul nu consuma singur tot bugetul electric; apar si cerintele pentru HVAC, iluminat, IT, sisteme de siguranta si eventuale trasee dedicate pentru service.",
          "In spatiile existente, limita nu este doar capacitatea taboului. Conteaza traseele, sectiunile, protectiile, redundanta si modul in care se poate interveni fara sa opresti operarea pe termen lung.",
        ],
      },
      {
        id: "trasee-si-protectii",
        title: "Trasee si protectii",
        body: [
          "Traseele electrice trebuie planificate impreuna cu RF shielding-ul si cu accesul de service. Daca se schimba dupa inchiderea camerei, apare rework si pot fi afectate continuitatea sistemului si testarea finala.",
          "Protectiile trebuie definite pentru scenarii reale, nu doar pentru o valoare teoretica. Infrastructura buna inseamna sa poti alimenta si proteja echipamentul in regim stabil, dar si sa mentii accesul pentru mentenanta si diagnostic.",
        ],
      },
      {
        id: "cum-verifici",
        title: "Cum verifici practic",
        body: [
          "Verificarea porneste de la fiÈ™a tehnica a echipamentului, de la starea cladirii si de la traseul camerei. Apoi se compara cerintele RMN cu infrastructura existenta si se marcheaza lipsurile care trebuie rezolvate inainte de instalare.",
          "Radiology Room Planner, calculatorul de putere electrica si Proposal Builder pot transforma aceste lipsuri intr-o lista de actiuni. Pentru un proiect real, ZES valideaza apoi ce este necesar pentru implementare.",
        ],
      },
    ],
    faqs: [
      {
        question: "Cand trebuie verificata puterea electrica pentru RMN?",
        answer:
          "Ideal inainte de achizitie si inainte de blocarea layout-ului final, pentru a evita refaceri si intarzieri.",
      },
      {
        question: "RMN-ul are nevoie doar de curent mare?",
        answer:
          "Nu. Sunt importante si traseele, protectiile, redundanta, HVAC-ul si accesul pentru service.",
      },
      {
        question: "Poate electricul sa schimbe proiectul?",
        answer:
          "Da. In unele cazuri poate schimba amplasamentul echipamentului sau chiar calendarul de implementare.",
      },
      {
        question: "Ce instrument ajuta la prima estimare?",
        answer:
          "Calculatorul de putere electrica si Radiology Room Planner sunt utile pentru triere initiala.",
      },
    ],
    relatedArticles: [
      "verificari-inainte-achizitie-rmn",
      "cat-dureaza-amenajarea-camera-rmn",
      "checklist-camera-rmn-inainte-instalare",
    ],
    cta: {
      title: "Verifici cerintele electrice ale unui RMN?",
      description:
        "Coreleaza puterea, traseele si accesul de service inainte de instalare.",
      label: "Deschide Project Intake",
      href: "/project-intake",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "hvac-camera-rmn",
    title: "HVAC pentru camera RMN: de ce influenteaza proiectul mai mult decat pare",
    description:
      "HVAC-ul pentru RMN influenteaza performanta, confortul, accesul de service, RF shielding-ul si timpul de implementare.",
    category: "RF shielding",
    tags: ["RMN", "HVAC", "racire", "infrastructura"],
    readingTime: "9 min",
    targetKeyword: "HVAC camera RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator HVAC", href: "/calculatoare/hvac-imagistica-estimare" },
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "HVAC-ul pentru o camera RMN nu este doar confort termic. El influenteaza stabilitatea echipamentului, compatibilitatea cu RF shielding-ul, accesul pentru service si chiar termenul de punere in functiune. Daca este tratat ca o instalatie de decor, proiectul ajunge sa se corecteze tarziu si scump.",
    sections: [
      {
        id: "stabilitate",
        title: "Stabilitate si control ambiental",
        body: [
          "Camera RMN are nevoie de un mediu stabil. Temperatura, umiditatea, zgomotul si traseele HVAC trebuie sa fie compatibile cu echipamentul si cu modul de operare al clinicii. Orice variatie mare poate afecta confortul, mentenanta si, indirect, performanta.",
          "In proiectele existente, traseele HVAC trebuie verificate impreuna cu RF shielding-ul. Daca apar schimbari dupa executie, pot aparea penetrari suplimentare, rework si probleme la testarea camerei.",
        ],
      },
      {
        id: "integrare-cu-rf",
        title: "Integrarea cu RF shielding",
        body: [
          "HVAC-ul trebuie tratat impreuna cu cuÈ™ca Faraday, nu separat. Penetrarile, grilele, traseele si accesul pentru mentenanta trebuie compatibilizate cu solutia RF pentru a evita compromiterea camerei.",
          "Aceasta este una dintre zonele in care discutiile tarzii costa cel mai mult. Un proiect bun decide de la inceput cum se imbina ventilatia, temperatura si integritatea RF.",
        ],
      },
      {
        id: "ce-verifici",
        title: "Ce verifici inainte de instalare",
        body: [
          "Verifici capacitatea reala, traseele, zgomotul, accesul, intretinerea si modul in care sistemul se comporta in scenarii de functionare reala. Apoi compari datele cu cerintele furnizorului RMN.",
          "Radiology Room Planner si calculatorul pentru camera RMN ajuta la prima orientare, dar analiza finala trebuie facuta pe plan si cu datele reale ale echipamentului.",
        ],
      },
    ],
    faqs: [
      {
        question: "HVAC-ul poate intarzia un RMN?",
        answer:
          "Da, mai ales daca trebuie modificat dupa ce RF shielding-ul sau traseele au fost deja executate.",
      },
      {
        question: "Este suficienta o instalatie HVAC generica?",
        answer:
          "Nu. Trebuie verificata compatibilitatea cu echipamentul, cu camera si cu accesul pentru service.",
      },
      {
        question: "HVAC-ul poate afecta RF shielding-ul?",
        answer:
          "Da, prin penetrari, trasee si detalii de executie daca nu este coordonat din timp.",
      },
      {
        question: "Ce se foloseste pentru orientare initiala?",
        answer:
          "Calculatorul de camera RMN si Radiology Room Planner sunt utile pentru prima analiza.",
      },
    ],
    relatedArticles: [
      "cat-dureaza-amenajarea-camera-rmn",
      "checklist-camera-rmn-inainte-instalare",
      "verificari-inainte-achizitie-rmn",
    ],
    cta: {
      title: "Planifici HVAC-ul pentru RMN?",
      description:
        "Verifica traseele, penetrarile si cerintele reale inainte de executie.",
      label: "Incepe analiza",
      href: "/ai-project-advisor",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "erori-proiectare-camera-ct",
    title: "Erori frecvente in proiectarea camerelor CT",
    description:
      "Cele mai comune greseli din proiectarea unei camere CT: protectie radiologica, layout, acces, HVAC, service si documentatie.",
    category: "Protecție radiologică",
    tags: ["CT", "proiectare", "protectie radiologica", "greseli"],
    readingTime: "10 min",
    targetKeyword: "erori proiectare camera CT",
    relatedServices: [
      "/services/protectie-radiologica",
      "/services/radiologie",
      "/services/imagistica-medicala",
    ],
    relatedTools: [
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "O camera CT poate parea mai simpla decat o camera RMN, dar greselile de proiectare apar frecvent tocmai pentru ca cerintele de protectie radiologica, acces, HVAC si documentatie sunt tratate prea tarziu. Un CT proiectat cu erori consuma timp, bani si energie inainte sa ajunga la exploatare.",
    sections: [
      {
        id: "greseli-layout",
        title: "Greseli de layout",
        body: [
          "Una dintre cele mai mari greseli este desenarea camerei fara sa fie clar echipamentul si modul de exploatare. Pozitia gantry-ului, zona operatorului, accesul pacientului si spatiile suport trebuie gandite impreuna, nu ca elemente separate.",
          "Daca layout-ul este improvizat, apar deseori camere prea stranse, acces dificil de service sau trasee care trebuie mutate dupa ce peretii sunt deja inchisi.",
        ],
      },
      {
        id: "protectie-radiologica",
        title: "Protectie radiologica lasata prea tarziu",
        body: [
          "CT-ul implica radiaÈ›ii ionizante si necesita protectie radiologica, zone controlate si solutii compatibile cu vecinatatile. Daca aceasta analiza vine dupa finisaje, pot aparea refaceri costisitoare.",
          "Problema nu este doar materialul, ci modul in care solutia se integreaza in camera reala: usi, ferestre, trasee si acces. CNCAN si radioprotecÈ›ia trebuie tratate din faza de concept.",
        ],
      },
      {
        id: "operare-si-service",
        title: "Operare si service",
        body: [
          "Un CT bun nu se limiteaza la instalare. Accesul pentru service, alimentarea, racirea, datele si modul in care se face mentenanta influenteaza uptime-ul pe termen lung.",
          "Planificarea corecta porneste de la aparatul ales, iar calculatorul de camera CT poate ajuta la o prima orientare. Pentru decizia reala trebuie validate spatiul, echipamentul si modul de operare.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este cea mai frecventa eroare la camera CT?",
        answer:
          "Amplasarea si protectia radiologica lasate prea tarziu, dupa ce layout-ul si finisajele sunt deja stabilite.",
      },
      {
        question: "CT are nevoie de RF shielding?",
        answer:
          "Nu in mod uzual. CT-ul are nevoie de protectie radiologica, nu de cuÈ™ca Faraday pentru RMN.",
      },
      {
        question: "CNCAN trebuie analizat din faza de concept?",
        answer:
          "Da, pentru ca influenteaza protectia radiologica, camera si documentatia.",
      },
      {
        question: "Ce poate intarzia proiectul CT?",
        answer:
          "Modificarea protectiei radiologice, a accesului sau a traseelor dupa ce camera a fost deja executata.",
      },
    ],
    relatedArticles: [
      "cat-dureaza-amenajarea-camera-ct",
      "verificari-inainte-achizitie-ct",
      "autorizare-cncan-pas-cu-pas",
    ],
    cta: {
      title: "Verifici o camera CT?",
      description:
        "Evalueaza layout-ul, protectia radiologica si riscurile de executie inainte de comanda.",
      label: "Calculeaza camera CT",
      href: "/calculatoare/cost-camera-ct",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "flux-pacienti-imagistica",
    title: "Fluxul pacientilor intr-o zona de imagistica: cum eviti blocajele",
    description:
      "Fluxul pacientilor influenteaza receptia, asteptarea, accesul la echipamente, siguranta si eficienta operationala in imagistica.",
    category: "Imagistică",
    tags: ["flux pacienti", "imagistica", "operare", "layout"],
    readingTime: "9 min",
    targetKeyword: "flux pacienti imagistica",
    relatedServices: [
      "/services/imagistica-medicala",
      "/services/amenajari-medicale",
      "/services/radiologie",
    ],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Planificare proiect medical", href: "/planificare" },
      { label: "Project Intake ZES", href: "/project-intake" },
    ],
    intro:
      "Fluxul pacientilor este una dintre cele mai subestimate parti ale unei zone de imagistica. Daca receptia, asteptarea, pregatirea si accesul la echipament nu sunt gandite impreuna, apar blocaje, timp pierdut si o experienta slaba pentru pacient si personal.",
    sections: [
      {
        id: "receptie-si-asteptare",
        title: "Receptie si asteptare",
        body: [
          "Receptia trebuie sa primeasca pacientii fara sa aglomereze accesul catre camerele tehnice. In proiectele bune, zona de asteptare nu interfereaza cu traseele operatorilor, cu transportul echipamentelor si cu accesul de service.",
          "Daca traficul de pacienti este mare, zonele de asteptare, programare si orientare trebuie dimensionate mai atent. Nu ajunge sa existe locuri suficiente; spatiile trebuie sa sustina fluxul real de lucru.",
        ],
      },
      {
        id: "pregatire-si-triaj",
        title: "Pregatire si triaj",
        body: [
          "In imagistica, pregatirea pacientului poate necesita spatiu suplimentar, echipamente auxiliare sau acces controlat. Acest lucru trebuie reflectat in layout, nu lasat pentru un colt improvizat.",
          "Daca exista mai multe modalitati, de exemplu RMN si CT, este util sa separi traseele si sa clarifici unde sunt zonele comune si unde apar zonele dedicate. Aceasta separare reduce confuziile si intarzierile.",
        ],
      },
      {
        id: "operare-zilnica",
        title: "Operare zilnica si performanta",
        body: [
          "Un flux bine proiectat reduce timpul mort si creste predictibilitatea. Asta inseamna mai putine intoarceri, mai putine asteptari si o utilizare mai buna a echipamentelor si a personalului.",
          "Planificarea trebuie sa tina cont de programari, de durata procedurilor, de accesul de service si de modul in care sala este pregatita intre pacienti. O analiza preliminara poate identifica blocajele inainte de constructie.",
        ],
      },
    ],
    faqs: [
      {
        question: "De ce conteaza fluxul pacientilor in imagistica?",
        answer:
          "Pentru ca influenteaza timpul de asteptare, eficienta operatorilor si modul in care echipamentele sunt folosite.",
      },
      {
        question: "Se poate planifica doar din suprafata?",
        answer:
          "Nu suficient. Fluxul, programarile si traseele pacientilor pot schimba complet spatiul necesar.",
      },
      {
        question: "Fluxul difera intre RMN si CT?",
        answer:
          "Da, pentru ca cerintele de pregatire, siguranta si operare sunt diferite.",
      },
      {
        question: "Ce instrument ZES ajuta?",
        answer:
          "Planificarea proiectului, Calculatorul proiectului medical si Project Intake sunt utile pentru prima analiza.",
      },
    ],
    relatedArticles: [
      "planificare-fluxuri-clinica-medicala",
      "modernizare-radiologie-clinica",
      "cum-se-construieste-o-clinica-medicala-in-romania",
    ],
    cta: {
      title: "Vrei sa clarifici fluxul?",
      description:
        "Verifica traseele pacientilor, receptia si operarea inainte de lucrarile finale.",
      label: "Deschide Project Intake",
      href: "/project-intake",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "planificare-ups-imagistica",
    title: "Planificarea unui UPS pentru imagistica medicala",
    description:
      "UPS-ul pentru imagistica trebuie gandit pe sarcina reala, pe trasee, pe criticitatea echipamentelor si pe uptime-ul clinicii.",
    category: "Aparatură medicală",
    tags: ["UPS", "imagistica", "electrice", "uptime"],
    readingTime: "9 min",
    targetKeyword: "UPS imagistica medicala",
    relatedServices: [
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
      "/services/imagistica-medicala",
    ],
    relatedTools: [
      { label: "Calculator putere electrica", href: "/calculatoare/putere-electrica-imagistica" },
      { label: "Service Diagnostic", href: "/service-diagnostic" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "In imagistica, UPS-ul nu este doar o siguranta. Este o piesa din strategia de continuitate. Daca este subdimensionat sau montat fara sa intelegi sarcina reala, poti avea intreruperi, alarme sau costuri ascunse chiar in primele faze de operare.",
    sections: [
      {
        id: "ce-protejeaza",
        title: "Ce protejeaza de fapt UPS-ul",
        body: [
          "UPS-ul protejeaza echipamente, date si proceduri, dar nu rezolva problemele de infrastructura slaba. El trebuie dimensionat in functie de sarcina reala, de prioritatile operationale si de modul in care clinica vrea sa gestioneze intreruperile.",
          "In unele cazuri, este mai important sa definesti clar ce trebuie mentinut in functiune decat sa alegi o putere mare fara strategie. Nu toate sistemele au aceleasi cerinte de autonomie sau de oprire controlata.",
        ],
      },
      {
        id: "dimensionare",
        title: "Dimensionare si integrare",
        body: [
          "Dimensionarea trebuie facuta impreuna cu alimentarea electrica, cu echipamentele conectate si cu infrastructura tehnica a camerei. Daca UPS-ul este gandit izolat, poate sa nu acopere exact echipamentele critice sau sa fie supradimensionat fara sens.",
          "In proiectele cu imagistica, trebuie verificat si accesul pentru service, spatiul de ventilatie si modul in care UPS-ul interactioneaza cu restul instalatiilor. Aceste detalii influenteaza uptime-ul si mentenanta.",
        ],
      },
      {
        id: "cum-planifici",
        title: "Cum planifici corect",
        body: [
          "Porneste de la echipamentele critice si de la scenariile de intrerupere. Apoi adauga cerintele de alimentare, protectie si management al sarcinii. Calculatorul de putere electrica si analiza preliminara ajuta la prima orientare.",
          "Daca proiectul include RMN, CT sau laborator, UPS-ul trebuie integrat in imaginea de ansamblu a infrastructurii, nu tratat ca o achizitie separata de ultima ora.",
        ],
      },
    ],
    faqs: [
      {
        question: "UPS-ul este obligatoriu pentru orice imagistica?",
        answer:
          "Nu in mod universal, dar pentru multe proiecte este important pentru continuitate si protectie.",
      },
      {
        question: "Se dimensioneaza doar dupa puterea aparatului?",
        answer:
          "Nu. Trebuie luate in calcul si sistemele auxiliare, autonomia dorita si scenariile de oprire.",
      },
      {
        question: "Poate UPS-ul sa rezolve intreruperile cladirii?",
        answer:
          "Poate ajuta, dar nu inlocuieste o infrastructura electrica bine gandita.",
      },
      {
        question: "Ce instrument ZES ajuta?",
        answer:
          "Calculatorul de putere electrica si Project Intake sunt utile pentru o analiza initiala.",
      },
    ],
    relatedArticles: [
      "cerinte-electrice-rmn",
      "cerinte-electrice-rmn",
      "timp-realistic-implementare-rmn",
    ],
    cta: {
      title: "Planifici continuitatea imagisticii?",
      description:
        "Verifica sarcina, autonomia si scenariile de intrerupere inainte de investitie.",
      label: "Deschide analiza",
      href: "/ai-project-advisor",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "cerinte-racire-imagistica",
    title: "Cerinte de racire pentru imagistica medicala",
    description:
      "Racirea corecta pentru imagistica influenteaza performanta, uptime-ul, spatiile tehnice si integrarea echipamentelor.",
    category: "Imagistică",
    tags: ["racire", "imagistica", "HVAC", "uptime"],
    readingTime: "8 min",
    targetKeyword: "cerinte racire imagistica medicala",
    relatedServices: [
      "/services/imagistica-medicala",
      "/services/amenajari-medicale",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator HVAC", href: "/calculatoare/hvac-imagistica-estimare" },
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
    ],
    intro:
      "Racirea este unul dintre acele subiecte care par secundare pana cand apar primele probleme. In imagistica, caldura generata de echipamente, de camerele tehnice si de operare trebuie controlata corect. Daca racirea este tratata generic, proiectul poate avea zgomot, instabilitate sau service dificil.",
    sections: [
      {
        id: "sarcina-termica",
        title: "Sarcina termica si echilibrul camerei",
        body: [
          "Camerele de imagistica adauga sarcina termica prin echipamente, persoane, iluminat si zone tehnice. Racirea trebuie dimensionata pentru modul real de folosire, nu doar pentru un calcul simplu pe suprafata.",
          "In unele proiecte, diferenta dintre un spatiu acceptabil si unul bun este data exact de modul in care tratezi evacuarea caldurii si modul in care mentii stabilitatea in orele de varf.",
        ],
      },
      {
        id: "integrare-cu-ventilatia",
        title: "Integrarea cu ventilatia si traseele",
        body: [
          "Racirea nu se separa de traseele de aer, de zgomot sau de accesul pentru service. In proiectele cu RMN, integrarea se face si cu RF shielding-ul. In proiectele cu CT, conteaza si vecinatatile, zona controlata si accesul operatorilor.",
          "Daca traseele sunt schimbate tarziu, racirea se transforma intr-o sursa de rework. De aceea, planificarea trebuie sa fie facuta impreuna cu layout-ul si cu echipamentele reale.",
        ],
      },
      {
        id: "cum-verifici",
        title: "Cum verifici corect",
        body: [
          "Porneste de la fiÈ™a echipamentului, de la programul de lucru si de la cerintele de service. Apoi verifica daca sistemul HVAC poate sustine si perioadele de varf, nu doar un scenariu ideal.",
          "Calculatorul HVAC si analiza tehnica preliminara pot ajuta sa vezi rapid daca racirea este doar o formalitate sau un element critic al proiectului.",
        ],
      },
    ],
    faqs: [
      {
        question: "De ce conteaza racirea in imagistica?",
        answer:
          "Pentru ca influenteaza stabilitatea echipamentului, confortul si uptime-ul clinicii.",
      },
      {
        question: "Racirea se poate decide dupa achizitie?",
        answer:
          "Ideal nu. Cerintele echipamentului trebuie cunoscute din timp pentru a evita refaceri.",
      },
      {
        question: "Racirea si HVAC sunt acelasi lucru?",
        answer:
          "Nu complet. Racirea este parte din arhitectura HVAC si trebuie integrata cu traseele si echipamentele.",
      },
      {
        question: "Ce instrument ajuta?",
        answer:
          "Calculatorul HVAC pentru imagistica si Project Intake sunt utile la inceputul proiectului.",
      },
    ],
    relatedArticles: [
      "hvac-camera-rmn",
      "planificare-ups-imagistica",
      "cerinte-electrice-rmn",
    ],
    cta: {
      title: "Vrei sa verifici racirea?",
      description:
        "Analizeaza HVAC-ul inainte sa blochezi layout-ul si bugetul final.",
      label: "Deschide calculatorul HVAC",
      href: "/calculatoare/hvac-imagistica-estimare",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "consideratii-structurale-rmn",
    title: "Consideratii structurale pentru RMN",
    description:
      "Structura cladirii poate schimba accesul magnetului, vibratiile, instalarea si costul total al unui proiect RMN.",
    category: "RF shielding",
    tags: ["RMN", "structura", "vibratii", "acces magnet"],
    readingTime: "9 min",
    targetKeyword: "consideratii structurale RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
    ],
    relatedTools: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Project Intake ZES", href: "/project-intake" },
    ],
    intro:
      "Un RMN nu se instaleaza intr-o cladire ca orice alt echipament. Structura, accesul, sarcina pe plansee, vibratiile si vecinatatile pot dicta daca proiectul avanseaza simplu sau devine un lant de adaptari. Consideratiile structurale trebuie evaluate inainte de achizitie, nu dupa ce echipamentul este deja comandat.",
    sections: [
      {
        id: "acces-si-sarcina",
        title: "Acces si sarcina",
        body: [
          "Magnetul cere traseu clar, spatiu de manipulare si o structura care poate sustine operarea si service-ul. In spatiile existente, accesul si sarcina pot fi mai limitative decat suprafata utila.",
          "Daca cladirile sunt vechi sau compartimentarea este fixa, verificarea structurii devine o etapa crititca. Nu este suficient ca spatiul sa fie gol; trebuie sa fie pregatit pentru echipament si pentru exploatare.",
        ],
      },
      {
        id: "vibratii-si-vecinatati",
        title: "Vibratii si vecinatati",
        body: [
          "RMN-ul este sensibil la vibratii si la anumite vecinatati tehnice. Lifturile, echipamentele mecanice, traficul intens sau alte surse de vibratie pot cere masuri suplimentare in proiect.",
          "Aceste aspecte se verifica inainte de instalare pentru a evita probleme de performanta sau de service. Cand sunt ignorate, apar costuri care nu erau vizibile in bugetul initial.",
        ],
      },
      {
        id: "cum-decizi",
        title: "Cum decizi corect",
        body: [
          "Cere datele de acces si de greutate ale echipamentului, compara-le cu cladirile disponibile si verifica modul in care se poate face instalarea fara interventii excesive.",
          "Radiology Room Planner, calculatorul de camera RMN si analiza preliminara ajuta la prima triere. ZES poate valida apoi daca structura si spatiul sunt compatibile cu proiectul.",
        ],
      },
    ],
    faqs: [
      {
        question: "Structura poate opri un proiect RMN?",
        answer:
          "Da, daca accesul, sarcina sau vibratiile nu sunt compatibile cu cerintele echipamentului.",
      },
      {
        question: "Trebuie verificata structura inainte de achizitie?",
        answer:
          "Da. Este mult mai eficient sa stii din timp daca spatiul poate sustine proiectul.",
      },
      {
        question: "RMN-ul are aceleasi cerinte structurale ca CT-ul?",
        answer:
          "Nu. Cerintele sunt diferite, deoarece RMN-ul implica magnet, RF shielding si alte constrangeri.",
      },
      {
        question: "Ce ajuta la prima evaluare?",
        answer:
          "Radiology Room Planner si Calculatorul cost camera RMN sunt bune pentru orientare.",
      },
    ],
    relatedArticles: [
      "verificari-inainte-achizitie-rmn",
      "cat-dureaza-amenajarea-camera-rmn",
      "checklist-camera-rmn-inainte-instalare",
    ],
    cta: {
      title: "Verifici structura pentru RMN?",
      description:
        "Compari accesul, vibratiile si sarcina inainte de a merge mai departe.",
      label: "Planifica proiectul",
      href: "/planificare/amenajez-camera-rmn",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "timp-realistic-implementare-rmn",
    title: "Timpul realist de implementare pentru un proiect RMN",
    description:
      "Cat dureaza in mod realist un RMN: analiza, RF shielding, HVAC, instalare, testare, integrare si service.",
    category: "RF shielding",
    tags: ["RMN", "calendar", "implementare", "RF shielding"],
    readingTime: "10 min",
    targetKeyword: "timp implementare RMN",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Un proiect RMN nu are un singur termen bun pentru toate cazurile. Durata reala depinde de spatiu, echipament, RF shielding, HVAC, accesul magnetului, aprovizionare si coordonarea dintre furnizori. Daca incerci sa promiÈ›i un calendar fara sa stii toate dependenÈ›ele, vei subestima proiectul.",
    sections: [
      {
        id: "faze-timp",
        title: "Fazele care consuma timp",
        body: [
          "Un calendar bun separa analiza, proiectarea, executia, testarea si punerea in functiune. Fiecare faza are propriile dependenÈ›e: planuri, furnizor, echipamente, materiale si acces. Cand o faza este grabita, urmatoarea plateste costul.",
          "RF shielding-ul, HVAC-ul si accesul magnetului sunt de multe ori pe traseul critic. Daca acestea nu sunt clarificate la inceput, termenul final devine fragil si pot aparea refaceri in fazele tarzii.",
        ],
      },
      {
        id: "de-ce-merge-lent",
        title: "De ce proiectele merg mai lent decat par",
        body: [
          "Pentru ca RMN-ul cere mai mult decat o camera finisata. Echipamentul trebuie compatibilizat cu spatiul, iar spatiul cu echipamentul. Daca apar modificari dupa ce peretii sunt gata, timpul creste imediat.",
          "De aceea, proiectul trebuie tratat ca o suma de decizii tehnice, nu ca o lista de achizitii. Cand lipsesc datele, calendarul devine doar o estimare orientativa, nu un angajament real.",
        ],
      },
      {
        id: "cum-estimezi-corect",
        title: "Cum estimezi corect",
        body: [
          "Porneste de la un scenariu clar: spatiu nou sau existent, echipament ales sau in selectie, acces simplu sau complex, cerinte RF standard sau mai riguroase. Apoi adauga timpul pentru verificari si coordonare.",
          "Calculatorul de camera RMN si Radiology Room Planner pot ajuta la prima orientare. Proposal Builder este util cand proiectul a trecut de etapa de presupuneri si trebuie structurata o discutie tehnica.",
        ],
      },
    ],
    faqs: [
      {
        question: "Exista un termen standard pentru un RMN?",
        answer:
          "Nu. Termenul depinde de spatiu, echipament, RF shielding, HVAC si de cat de clare sunt datele initiale.",
      },
      {
        question: "Ce poate intarzia cel mai mult?",
        answer:
          "Schimbarea cerintelor dupa proiectare, accesul dificil al magnetului si modificarile la RF shielding sau HVAC.",
      },
      {
        question: "Se poate promite un timp fix?",
        answer:
          "Nu fara date complete. Un proiect medical corect ramane orientativ pana la validarea tehnica.",
      },
      {
        question: "Ce instrument ZES e util?",
        answer:
          "Calculatorul de camera RMN si Project Intake sunt utile pentru primele clarificari.",
      },
    ],
    relatedArticles: [
      "cat-dureaza-amenajarea-camera-rmn",
      "checklist-camera-rmn-inainte-instalare",
      "verificari-inainte-achizitie-rmn",
    ],
    cta: {
      title: "Vrei un calendar realist pentru RMN?",
      description:
        "Identifica dependenÈ›ele inainte sa blochezi termenul comercial.",
      label: "Completeaza Project Intake",
      href: "/project-intake",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "costuri-ascunse-proiecte-imagistice",
    title: "Costuri ascunse in proiectele imagistice",
    description:
      "Ce costuri apar frecvent in proiectele imagistice: acces, service, HVAC, electric, verificari, rework si integrare.",
    category: "Imagistică",
    tags: ["costuri", "imagistica", "buget", "implementare"],
    readingTime: "9 min",
    targetKeyword: "costuri ascunse proiecte imagistice",
    relatedServices: [
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
    ],
    intro:
      "Cele mai neplacute costuri din imagistica sunt cele care apar dupa ce bugetul pare deja stabilit. Accesul, service-ul, HVAC-ul, electricul, testarea si modificarile de rework pot adauga sume care nu apar in estimarea initiala. Tocmai de aceea, proiectele bune pleaca de la infrastructura, nu doar de la pretul echipamentului.",
    sections: [
      {
        id: "unde-se-ascund",
        title: "Unde se ascund costurile",
        body: [
          "Costurile ascunse apar cel mai des in zonele care nu arata spectaculos: trasee, protectii, ajustari de layout, modificari de instalatii, spatii tehnice, acces de service si testare. Sunt costuri care apar pentru ca proiectul a fost gandit prea tarziu in jurul echipamentului.",
          "In proiectele cu RMN, CT sau laborator, apar si costuri de integrare: compatibilizari cu furnizorii, documentatie, interventii de validare si ajustari de mediu. Ele trebuie bugetate din prima, altfel lovesc direct in marja si in calendar.",
        ],
      },
      {
        id: "cum-le-prevezi",
        title: "Cum le previi",
        body: [
          "Cea mai buna metoda este sa transformi ipotezele in cerinte explicite. Verifici camera, echipamentul, accesul, HVAC-ul, electricul si serviciul de mentenanta inainte de bugetul final. Orice necunoscuta ramasa este un cost potential.",
          "Calculatorul proiectului medical, Proposal Builder si Project Intake pot scoate la suprafata aceste costuri inainte de semnare. Daca proiectul ramane doar pe o schita, costurile ascunse nu dispar; doar se muta mai tarziu.",
        ],
      },
      {
        id: "decizie-si-buget",
        title: "Decizie si buget",
        body: [
          "Bugetul trebuie construit pe faze, cu rezerve pentru adaptari. Un proiect medical matur nu promite preturi finale fara analiza tehnica. In schimb, pune pe masa zonele de risc si decide unde merita cheltuit mai mult din start.",
          "Daca proiectul este complex, este mai eficient sa ai o discutie tehnica anticipata decat sa corectezi costuri dupa achizitie. Aceasta este diferenta dintre o estimare comerciala si o implementare controlata.",
        ],
      },
    ],
    faqs: [
      {
        question: "De ce apar costuri ascunse?",
        answer:
          "Pentru ca multe cerinte tehnice sunt descoperite prea tarziu: acces, service, HVAC, electric, protectii si rework.",
      },
      {
        question: "Pot fi evitate complet?",
        answer:
          "Nu complet, dar pot fi reduse mult daca proiectul este analizat tehnic inainte de bugetul final.",
      },
      {
        question: "Este suficient pretul echipamentului?",
        answer:
          "Nu. In imagistica, infrastructura si integrarea pot schimba substantial costul total.",
      },
      {
        question: "Ce instrument ZES ajuta?",
        answer:
          "Calculatorul proiectului medical si Proposal Builder ajuta la structurarea riscurilor de cost.",
      },
    ],
    relatedArticles: [
      "verificari-inainte-achizitie-ct",
      "verificari-inainte-achizitie-rmn",
      "planificare-ups-imagistica",
    ],
    cta: {
      title: "Vrei sa vezi costurile ascunse?",
      description:
        "Scoate la suprafata riscurile tehnice inainte sa blochezi bugetul.",
      label: "Deschide analiza",
      href: "/ai-project-advisor",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "probleme-frecvente-custi-faraday",
    title: "Probleme frecvente la custile Faraday",
    description:
      "Ghid despre defectele si dezechilibrele care apar frecvent la custile Faraday: discontinuitati, usi RF, penetrari si efectele lor asupra performantelor RMN.",
    category: "RF shielding",
    tags: ["Faraday", "RF shielding", "RMN", "usi RF", "penetrari"],
    readingTime: "8 min",
    targetKeyword: "probleme custi Faraday",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      rfEstimateTool,
      radiologyPlannerTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "CuÈ™a Faraday functioneaza bine doar daca este gandita ca sistem complet: pereti, imbinari, usi, penetrari, filtre si integrare cu restul camerei. Problemele apar de obicei exact in punctele pe care proiectul le trateaza superficial.",
    sections: [
      {
        id: "unde-apar",
        title: "Unde apar cel mai des problemele",
        body: [
          "Cele mai sensibile puncte sunt imbinarile, usa RF, penetrarile pentru cabluri si modul in care tot ansamblul este cuplat cu HVAC-ul si cu restul camerei. Orice discontinuitate poate afecta performanta.",
          "Cand proiectul este grabit, apar solutii care arata bine vizual, dar nu sunt robuste tehnic.",
        ],
      },
      {
        id: "ce-inseamna-practic",
        title: "Ce inseamna in practica",
        body: [
          "O problema la cuÈ™a poate insemna recalibrare, timp pierdut, costuri suplimentare sau chiar imposibilitatea de a pune echipamentul in functiune la timp. De aceea nu trebuie tratata ca un detaliu de finisaj.",
          "Calculatorul de RF shielding si Proposal Builder sunt utile pentru structurarea cerintelor, dar validarea finala ramane obligatorie.",
        ],
      },
      {
        id: "cum-se-evita",
        title: "Cum se evita in proiect",
        body: [
          "Se evita prin proiectare clara, coordonare buna intre furnizori si verificari succesive. O cuÈ™a Faraday buna nu este rezultatul unei singure decizii, ci al mai multor pasi facuti corect.",
          "Daca ai un spatiu existent, merita sa treci din timp prin Project Intake ca sa vezi ce constrangeri reale ai inainte de a cumpara sau construi.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care este problema cel mai greu de detectat la o cuÈ™a Faraday?",
        answer:
          "Deseori apar probleme la detalii de executie care nu sunt evidente vizual, cum ar fi discontinuitatile sau penetrarile necontrolate.",
      },
      {
        question: "Pot rezolva totul doar din concept?",
        answer:
          "Nu. Conceptul este inceputul, dar testarea si validarea sunt cele care confirma daca solutia functioneaza.",
      },
      {
        question: "Cat de importanta este usa RF?",
        answer:
          "Este unul dintre cele mai sensibile puncte ale sistemului si trebuie tratata ca element critic, nu auxiliar.",
      },
    ],
    relatedArticles: [
      "probleme-frecvente-custi-faraday",
      "usi-ferestre-rf-proiectare",
      "testare-validare-rf-shielding",
    ],
    cta: {
      title: "Ai nevoie sa verifici daca solutia RF este coerenta?",
      description:
        "Porneste de la o estimare orientativa si treci apoi la o verificare de proiect mai stricta.",
      label: "Estimare RF",
      href: "/calculatoare/rf-shielding-estimare",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "hvac-in-proiecte-rf-shielding",
    title: "Integrarea HVAC in proiectele de RF shielding",
    description:
      "Cum se integreaza corect HVAC-ul intr-un proiect RF shielding pentru RMN, fara sa compromiti cuÈ™a Faraday, penetrarile, debitul sau intretinerea camerei.",
    category: "RF shielding",
    tags: ["HVAC", "RF shielding", "RMN", "Faraday", "integrare"],
    readingTime: "8 min",
    targetKeyword: "HVAC in proiecte RF shielding",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      hvacEstimateTool,
      rfEstimateTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "HVAC-ul si RF shielding-ul trebuie gandite impreuna. Daca le proiectezi separat, risti penetrari nefericite, trasee incomode sau solutii care functioneaza pe plan, dar nu si in camera finala.",
    sections: [
      {
        id: "de-ce-se-coupleaza",
        title: "De ce se cupleaza in aceeasi discutie",
        body: [
          "HVAC-ul are nevoie de trasee, iar RF shielding-ul cere continuitate si control al penetrarilor. Tocmai de aceea, solutia de climatizare nu trebuie desenata dupa ce cuÈ™a este deja stabilita fara coordonare.",
          "Intr-un proiect bun, sectiunea de HVAC intra in conceptul camerei din primele schite.",
        ],
      },
      {
        id: "ce-poate-strica",
        title: "Ce poate strica o integrare slaba",
        body: [
          "Poate aparea o discontinuitate in shielding, o pozitionare proasta a traseelor sau un acces dificil pentru service. Toate acestea se traduc in probleme de performanta si intretinere.",
          "Nu toate solutiile HVAC merg bine intr-o camera cu cerinte RF. De aceea trebuie verificata compatibilitatea cu intregul proiect, nu doar eficienta termica.",
        ],
      },
      {
        id: "cum-se-planifica",
        title: "Cum se planifica corect",
        body: [
          "Planificarea corecta porneste de la echipament, trasee si puncte de penetrare. Apoi se ajusteaza unitatile si infrastructura pentru a pastra integritatea sistemului.",
          "Radiology Room Planner si Calculatorul de HVAC sunt utile pentru un cadru initial, apoi se trece la validare tehnica.",
        ],
      },
    ],
    faqs: [
      {
        question: "Pot pune HVAC-ul si RF shielding-ul in contracte separate?",
        answer:
          "Da, dar numai daca exista coordonare clara intre proiectare si executie. Altfel apar conflicte de trasee si penetrari.",
      },
      {
        question: "Care este greseala tipica la integrarea HVAC?",
        answer:
          "Sa alegi traseele fara sa tii cont de continuitatea RF si de accesul pentru service.",
      },
      {
        question: "Este suficient un calcul orientativ de HVAC?",
        answer:
          "Nu pentru executie. Este util pentru inceput, dar trebuie validat in contextul camerei si al shielding-ului.",
      },
    ],
    relatedArticles: [
      "hvac-camera-rmn",
      "hvac-camera-rmn",
      "testare-validare-rf-shielding",
    ],
    cta: {
      title: "Vrei sa vezi daca HVAC-ul tau se impaca cu RF shielding-ul?",
      description:
        "Incepe cu o estimare si apoi verifica proiectul inainte de a fixa traseele.",
      label: "Estimare HVAC",
      href: "/calculatoare/hvac-imagistica-estimare",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "usi-ferestre-rf-proiectare",
    title: "Usi si ferestre RF: ce conteaza in proiectare",
    description:
      "Ghid orientat pe detaliile care fac diferenta la usile si ferestrele RF: compatibilitate, integrare, performanta, pozitionare si verificarea in camera RMN.",
    category: "RF shielding",
    tags: ["usi RF", "ferestre RF", "RMN", "proiectare", "shielding"],
    readingTime: "7 min",
    targetKeyword: "usi si ferestre RF proiectare",
    relatedServices: [
      "/services/rf-shielding",
      "/services/constructii-medicale",
      "/services/imagistica-medicala",
    ],
    relatedTools: [
      rfEstimateTool,
      radiologyPlannerTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Usa si fereastra RF sunt puncte critice ale camerei RMN. Daca aceste elemente nu sunt tratate corect de la inceput, intreaga solutie de shielding poate pierde din performanta sau poate deveni greu de intretinut.",
    sections: [
      {
        id: "ce-este-critic",
        title: "Ce este critic la aceste elemente",
        body: [
          "Critice sunt compatibilitatea cu restul sistemului, modul de montaj si continuitatea fata de restul cuÈ™tii Faraday. Nu este suficient sa existe fizic; ele trebuie sa fie corect integrate.",
          "In proiectele bune, usa si fereastra sunt parte din conceptul camerei, nu accesorii adaugate ulterior.",
        ],
      },
      {
        id: "ce-trebuie-verificat",
        title: "Ce trebuie verificat inainte de executie",
        body: [
          "Trebuie verificate dimensiunile, compatibilitatea cu access-ul, pozitia fata de flux si eventualele limitari de montaj. Daca aceste elemente sunt neclare, apar refaceri si probleme de performanta.",
          "In proiectele existente, multe probleme vin din faptul ca o componenta este aleasa inainte de a se cunoaste complet spatiul.",
        ],
      },
      {
        id: "legatura-cu-proiectul",
        title: "Legatura cu proiectul complet",
        body: [
          "Usa si fereastra RF trebuie discutate in acelasi timp cu HVAC, penetrarile si service-ul camerei. Asta reduce riscul de a compromite detalii importante in etapa finala.",
          "Calculatorul de RF shielding si Radiology Room Planner ofera un cadru bun pentru inceput, dar nu inlocuiesc validarea tehnica.",
        ],
      },
    ],
    faqs: [
      {
        question: "Pot alege usa RF dupa ce am terminat proiectul?",
        answer:
          "Poti, dar risti sa nu mai fie compatibila cu spatiul sau cu restul sistemului. Ideal este sa fie integrata devreme in proiect.",
      },
      {
        question: "Ferestrele RF sunt doar un element de vizibilitate?",
        answer:
          "Nu. Ele fac parte din sistemul de shielding si trebuie tratate ca elemente tehnice, nu decorative.",
      },
      {
        question: "De ce apar probleme dupa montaj?",
        answer:
          "De obicei din lipsa de coordonare intre proiectare, montaj si restul camerei, nu dintr-o singura piesa defecta.",
      },
    ],
    relatedArticles: [
      "probleme-frecvente-custi-faraday",
      "usi-ferestre-rf-proiectare",
      "probleme-frecvente-custi-faraday",
    ],
    cta: {
      title: "Vrei sa vezi daca usile si ferestrele RF sunt corect integrate?",
      description:
        "Porneste de la o estimare de shielding si verifica apoi detaliile inainte de executie.",
      label: "Estimare RF",
      href: "/calculatoare/rf-shielding-estimare",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "testare-validare-rf-shielding",
    title: "Testarea si validarea RF shielding-ului",
    description:
      "De ce testarea finala este esentiala pentru RF shielding: cum se verifica integritatea, ce indica rezultatele si de ce validarea nu trebuie tratata ca formalitate.",
    category: "RF shielding",
    tags: ["testare", "validare", "RF shielding", "RMN", "integrare"],
    readingTime: "8 min",
    targetKeyword: "testare si validare RF shielding",
    relatedServices: [
      "/services/rf-shielding",
      "/services/imagistica-medicala",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      rfEstimateTool,
      clinicEvaluateTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Fara testare, RF shielding-ul ramane o presupunere bine executata. Validarea este momentul in care afli daca solutia montata se comporta asa cum a fost proiectata.",
    sections: [
      {
        id: "de-ce-este-obligatorie",
        title: "De ce este obligatorie",
        body: [
          "Testarea confirma performanta sistemului si arata daca imbinarile, usile, penetrarile si integrarea au fost realizate corect. Ea nu este doar o bifare, ci o parte din acceptarea tehnica.",
          "In proiectele bune, validarea este planificata din faza de proiect, nu lasata la final ca o surpriza.",
        ],
      },
      {
        id: "cum-se-citeste",
        title: "Cum se citesc rezultatele",
        body: [
          "Rezultatele trebuie citite in contextul camerei, al echipamentului si al tolerantelor de proiect. O valoare slaba inseamna o problema reala de performanta si trebuie urmarita pana la cauza.",
          "In functie de rezultat, pot fi necesare ajustari, reparatii sau refaceri punctuale. De aceea, testarea trebuie tratata ca parte din planul de executie, nu ca o ultima formalitate.",
        ],
      },
      {
        id: "cum-se-conecteaza",
        title: "Cum se conecteaza cu restul proiectului",
        body: [
          "Validarea RF shielding-ului trebuie legata de HVAC, electric, acces si pregatirea pentru echipament. Daca solutia de testare vine prea tarziu, modificarile devin mai scumpe.",
          "Proposal Builder si Project Intake ajuta la documentarea clara a cerintelor si la evitarea surprizelor in etapa de acceptare.",
        ],
      },
    ],
    faqs: [
      {
        question: "Este testarea RF shielding doar o formalitate?",
        answer:
          "Nu. Ea confirma daca sistemul construit este compatibil cu cerintele reale ale camerei RMN.",
      },
      {
        question: "Ce se intampla daca rezultatul e slab?",
        answer:
          "Se analizeaza cauza si se corecteaza punctele problematice. Validarea este tocmai mecanismul care previne acceptarea unei solutii slabe.",
      },
      {
        question: "Cand trebuie planificata testarea?",
        answer:
          "Din faza de proiect, pentru ca ea influenteaza si executia, si calendarul de punere in functiune.",
      },
    ],
    relatedArticles: [
      "probleme-frecvente-custi-faraday",
      "probleme-frecvente-custi-faraday",
      "intretinere-rf-shielding",
    ],
    cta: {
      title: "Vrei sa stii daca solutia RF merita validata acum?",
      description:
        "Porneste cu o estimare si apoi discuta testarea inainte de punerea in functiune.",
      label: "Deschide analiza",
      href: "/ai-project-advisor",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "intretinere-rf-shielding",
    title: "Intretinerea RF shielding-ului in exploatare",
    description:
      "Ce presupune intretinerea RF shielding-ului dupa instalare: verificari, uzura, usi RF, penetratii si cum se pastreaza performanta in exploatarea clinica.",
    category: "Service",
    tags: ["RF shielding", "intretinere", "service", "RMN", "validare"],
    readingTime: "7 min",
    targetKeyword: "intretinere RF shielding",
    relatedServices: [
      "/services/rf-shielding",
      "/services/service-aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      serviceDiagnosticTool,
      clinicEvaluateTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "O cuÈ™a Faraday nu ramane identica dupa instalare. Uzura, accesul intens si interventiile de service pot modifica performanta daca nu exista o rutina de intretinere clara.",
    sections: [
      {
        id: "ce-se-verifica",
        title: "Ce se verifica periodic",
        body: [
          "Trebuie verificate usa RF, imbinarile vizibile, elementele de acces si orice zona care poate suferi uzura mecanica. Nu este nevoie de alarmism, ci de disciplina operationala.",
          "Un plan bun de intretinere reduce riscul de descoperire tarzie a unei probleme care ar fi putut fi identificata rapid.",
        ],
      },
      {
        id: "de-ce-influenteaza",
        title: "De ce influenteaza operarea clinica",
        body: [
          "Daca shielding-ul se degradeaza, rezultatul poate fi intrerupere operationala, timp pierdut si reparatii costisitoare. Intr-o clinica activa, asta conteaza direct in program si in productivitate.",
          "De aceea, service-ul nu este separat de proiectare; este continuarea ei fireasca.",
        ],
      },
      {
        id: "cum-se-foloseste",
        title: "Cum se foloseste in planificare",
        body: [
          "Daca proiectul e inca in faza de implementare, merita sa discuti din timp contractele de service si responsabilitatile de exploatare. Daca spatiul este deja in functie, o evaluare de service poate arata unde exista riscuri.",
          "Evaluarea service si Project Intake sunt bune pentru a decide daca trebuie doar monitorizare sau si o interventie de corectie.",
        ],
      },
    ],
    faqs: [
      {
        question: "RF shielding-ul are nevoie de mentenanta?",
        answer:
          "Da, mai ales la elementele mecanice si la detaliile care pot fi afectate de uzura sau interventii repetate.",
      },
      {
        question: "Mentenanta inseamna refacere completa?",
        answer:
          "Nu. De cele mai multe ori este vorba despre verificari periodice si corectii punctuale, nu despre refacerea intregului sistem.",
      },
      {
        question: "Cum stiu daca am nevoie de service?",
        answer:
          "Un diagnostic de service iti arata daca problema este una de exploatare, uzura sau proiectare initiala.",
      },
    ],
    relatedArticles: [
      "service-ct-rmn-mentenanta-uptime",
      "service-ct-rmn-mentenanta-uptime",
      "probleme-frecvente-custi-faraday",
    ],
    cta: {
      title: "Vrei sa vezi daca sistemul tau are nevoie de service?",
      description:
        "Porneste de la o evaluare simpla si apoi stabileste ce trebuie urmarit in exploatare.",
      label: "Evaluare service",
      href: "/service-diagnostic",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "modernizare-etapizata-clinica-medicala",
    title: "Modernizare etapizata a unei clinici medicale",
    description:
      "Cum modernizezi o clinica fara sa opresti totul deodata: etape, prioritati, downtime, logistica si modul in care se pastreaza continuitatea operationala.",
    category: "Service",
    tags: ["modernizare", "clinica", "downtime", "operaÈ›ional", "proiect medical"],
    readingTime: "8 min",
    targetKeyword: "modernizare etapizata clinica medicala",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      modernizationEstimateTool,
      clinicEvaluateTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Modernizarea etapizata reduce riscul de blocaj operational si permite o tranzitie mai buna intre ce functioneaza deja si ce trebuie imbunatatit. Nu este o solutie simplificata, ci una care cere coordonare mai atenta.",
    sections: [
      {
        id: "cum-se-imparte",
        title: "Cum se imparte modernizarea in etape",
        body: [
          "Se porneste de la zonele critice, de la dependentele tehnice si de la modul in care clinica isi mentine activitatea. Etapele nu trebuie alese arbitrar, ci dupa impact si risc.",
          "In multe proiecte, zona de imagistica sau infrastructura de service sunt primele care cer atentie, dar ordinea finala depinde de proiectul real.",
        ],
      },
      {
        id: "cum-se-evita-blocajul",
        title: "Cum se evita blocajul operational",
        body: [
          "Blocajul se evita prin programare clara, mutarea temporara a activitatilor si coordonarea atenta a echipelor. Cand lucrarile sunt facute fara etapizare, clinica plateste in downtime si in stres organizational.",
          "Calculatorul de modernizare si Project Intake sunt utile pentru a vedea de la inceput unde sunt riscurile de continuitate.",
        ],
      },
      {
        id: "de-ce-e-mai-sigur",
        title: "De ce este mai sigura decat o oprire totala",
        body: [
          "O modernizare etapizata permite ajustari si control mai bun asupra calitatii. Nu elimina riscurile, dar le face mai usor de gestionat, mai ales cand infrastructura actuala nu poate fi oprita complet.",
          "Pentru proiectele mai mari, aceasta abordare este adesea mai realista decat incercarea de a schimba totul intr-un singur pas.",
        ],
      },
    ],
    faqs: [
      {
        question: "Modernizarea etapizata e mereu mai ieftina?",
        answer:
          "Nu neaparat mai ieftina, dar poate fi mai controlabila operational si mai potrivita pentru clinici care trebuie sa ramana deschise.",
      },
      {
        question: "Pot moderniza doar o zona si sa las restul pentru mai tarziu?",
        answer:
          "Da, daca etapele sunt alese astfel incat sa nu blocheze restul proiectului si sa nu creeze dependente greu de rezolvat.",
      },
      {
        question: "Cum incep corect modernizarea?",
        answer:
          "Cu o evaluare a infrastructurii si a riscurilor operationale, nu cu demolari sau achizitii inainte de clarificare.",
      },
    ],
    relatedArticles: [
      "modernizare-radiologie-clinica",
      "modernizare-clinica-existenta-pasi-riscuri",
      "cum-reduci-downtime-modernizare-clinica",
    ],
    cta: {
      title: "Vrei sa vezi daca modernizarea ta poate fi etapizata?",
      description:
        "Incepe cu o estimare si apoi construieste o secventa de implementare realista.",
      label: "Estimare modernizare",
      href: "/calculatoare/modernizare-clinica-estimare",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "cum-reduci-downtime-modernizare-clinica",
    title: "Cum reduci downtime-ul in timpul modernizarii unei clinici",
    description:
      "Strategii practice pentru a reduce intreruperile in timpul modernizarii: etapizare, relocare temporara, prioritizare, coordonare si comunicare operationala.",
    category: "Service",
    tags: ["downtime", "modernizare", "clinica", "operational", "planificare"],
    readingTime: "7 min",
    targetKeyword: "reduci downtime modernizare clinica",
    relatedServices: [
      "/services/service-aparatura-medicala",
      "/services/amenajari-medicale",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      modernizationEstimateTool,
      clinicEvaluateTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Downtime-ul este unul dintre costurile cele mai subestimate in modernizare. Nu se vede mereu in oferta, dar se simte in programul clinicii, in personal si in continuitatea serviciilor.",
    sections: [
      {
        id: "ce-produce",
        title: "Ce produce downtime in practica",
        body: [
          "Downtime-ul apare cand zonele nu pot fi utilizate temporar, cand echipele se incurca intre ele sau cand lucrarile fac imposibila operarea normala. In proiectele medicale, chiar si o scurta intrerupere poate avea efecte mult mai mari decat pare.",
          "De aceea, planificarea trebuie facuta in jurul activitatii reale a clinicii, nu doar in jurul lucrarilor.",
        ],
      },
      {
        id: "cum-se-limiteaza",
        title: "Cum se limiteaza",
        body: [
          "Prin etape, prin mutari temporare bine planificate si prin clarificarea responsabilitatilor inainte de executie. Daca proiectul este impartit corect, clinica poate continua sa functioneze pe zone separate.",
          "Un calculator de modernizare si un intake clar ajuta sa vezi inca dinainte unde apare presiunea operationala.",
        ],
      },
      {
        id: "ce-nu-trebuie-facut",
        title: "Ce nu trebuie facut",
        body: [
          "Nu trebuie amanata decizia pana cand lucrarile au inceput deja. Nu trebuie presupus ca se rezolva pe parcurs. Si nu trebuie ignorat impactul asupra programului clinicii.",
          "Downtime-ul se reduce prin pregatire, nu prin improvizatie.",
        ],
      },
    ],
    faqs: [
      {
        question: "Pot avea zero downtime intr-o modernizare?",
        answer:
          "Rareori. Poti insa sa-l reduci semnificativ daca modernizarea este etapizata si bine coordonata.",
      },
      {
        question: "Ce ajuta cel mai mult la reducerea intreruperilor?",
        answer:
          "Planificarea pe zone, comunicarea si relocarea temporara gandita inainte de executie.",
      },
      {
        question: "Are sens sa discut modernizarea inainte de a lua echipamente noi?",
        answer:
          "Da, pentru ca altfel poti cumpara echipamente care nu se potrivesc cu ritmul de lucru si cu infrastructura existenta.",
      },
    ],
    relatedArticles: [
      "modernizare-etapizata-clinica-medicala",
      "modernizare-radiologie-clinica",
      "planificare-fluxuri-clinica-medicala",
    ],
    cta: {
      title: "Vrei sa vezi unde se pierde cel mai mult timp in proiectul tau?",
      description:
        "Porneste de la o estimare orientativa si apoi construieste planul pe zone.",
      label: "Estimare modernizare",
      href: "/calculatoare/modernizare-clinica-estimare",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "migrare-echipamente-medicale-modernizare",
    title: "Migrarea echipamentelor medicale in timpul modernizarii",
    description:
      "Cum planifici migrarea echipamentelor in modernizare astfel incat sa eviti avarii, intarzieri si reluari costisitoare ale operatiunilor clinice.",
    category: "Service",
    tags: ["migrare echipamente", "modernizare", "service", "logistica", "medical"],
    readingTime: "7 min",
    targetKeyword: "migrare echipamente medicale modernizare",
    relatedServices: [
      "/services/service-aparatura-medicala",
      "/services/service-aparatura-medicala",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      serviceDiagnosticTool,
      clinicEvaluateTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Migrarea echipamentelor este unul dintre momentele in care modernizarea poate deveni fragila. Daca transportul, temporizarea si re-instalarea nu sunt planificate bine, proiectul isi pierde foarte repede ordinea.",
    sections: [
      {
        id: "ce-trebuie-protejat",
        title: "Ce trebuie protejat in timpul migrarii",
        body: [
          "Trebuie protejate echipamentele, accesoriile, traseele si integritatea spatiilor unde acestea vor ajunge. Protectia nu inseamna doar transport fizic, ci si mentinerea secventei corecte de instalare.",
          "O migrare buna incepe cu inventariere, ambalare, responsabilitati si timpi clari.",
        ],
      },
      {
        id: "ce-merge-rau",
        title: "Ce merge de obicei rau",
        body: [
          "Problemele apar cand echipamentul ajunge inainte ca spatiul sa fie pregatit sau cand responsabilitatile sunt impartite vag intre furnizori. Atunci apar avarii, intarzieri si reluari ale lucrarii.",
          "Nu este suficient sa muti echipamentul; trebuie sa-l replasezi intr-un context validat.",
        ],
      },
      {
        id: "cum-se-planifica",
        title: "Cum se planifica realist",
        body: [
          "Planificarea trebuie sa includa traseul, riscurile, suportul tehnic si ordinea de repornire. In proiectele medicale serioase, migrarea este o etapa in sine, nu o actiune de ultim moment.",
          "Project Intake si evaluarea service sunt utile pentru a vedea ce poate fi mutat, ce trebuie recalibrat si unde apar dependente.",
        ],
      },
    ],
    faqs: [
      {
        question: "Pot muta echipamentele medicale in timpul unei modernizari fara risc?",
        answer:
          "Fara risc nu, dar poti reduce riscul mult daca migrarea este planificata ca parte a proiectului.",
      },
      {
        question: "Cine trebuie implicat in migrare?",
        answer:
          "Echipa tehnica, furnizorii relevanti si persoanele care cunosc cerintele spatiului si ale echipamentului.",
      },
      {
        question: "Migrarea este doar logistica?",
        answer:
          "Nu. Are si componenta tehnica, deoarece echipamentele trebuie reinstalate si verificate in noul context.",
      },
    ],
    relatedArticles: [
      "service-ct-rmn-mentenanta-uptime",
      "modernizare-radiologie-clinica",
      "etape-validare-infrastructura-medicala",
    ],
    cta: {
      title: "Vrei sa vezi daca migrarea poate fi facuta fara intreruperi mari?",
      description:
        "Incepe cu o evaluare de service si apoi construieste traseul de mutare.",
      label: "Evaluare service",
      href: "/service-diagnostic",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "cerinte-infrastructura-laborator-ivd",
    title: "Cerinte de infrastructura pentru un laborator IVD",
    description:
      "Ce trebuie verificat in infrastructura unui laborator IVD: spatiu, electric, climatizare, fluxuri, amplasare si compatibilitatea cu echipamentele de analiza.",
    category: "IVD / laborator",
    tags: ["IVD", "laborator", "infrastructura", "analizatoare", "planificare"],
    readingTime: "8 min",
    targetKeyword: "cerinte infrastructura laborator IVD",
    relatedServices: [
      "/services/ivd-laborator",
      "/services/service-aparatura-medicala",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      ivdEstimateTool,
      projectMedicalCalculatorTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Un laborator IVD nu se reduce la alegerea analizatoarelor. Infrastructura, fluxurile si conditiile de operare pot determina daca laboratorul va functiona stabil sau va necesita ajustari continue.",
    sections: [
      {
        id: "ce-se-verifica",
        title: "Ce se verifica la infrastructura",
        body: [
          "Se verifica spatiul util, zonele de lucru, electricul, climatizarea, accesul pentru service si modul in care echipamentele vor fi amplasate. Daca aceste lucruri nu sunt clare, laboratorul poate deveni scump de operat.",
          "Un proiect bun separa fluxul tehnic de fluxul de lucru si evita amestecul intre zone care ar trebui sa ramana distincte.",
        ],
      },
      {
        id: "cum-influenteaza-aparatura",
        title: "Cum influenteaza aparatura planul",
        body: [
          "Aparatul ales influenteaza atat spatiul, cat si instalatiile. Daca il alegi prea devreme, poti descoperi ca laboratorul are nevoie de ajustari care nu au fost bugetate.",
          "Calculatorul pentru cost laborator IVD si Project Intake sunt bune pentru a porni o discutie structurata despre ce este realist in spatiul tau.",
        ],
      },
      {
        id: "cum-se-evita-improvizatia",
        title: "Cum se evita improvizatia",
        body: [
          "Improvizatia se evita prin validare inainte de achizitie, printr-un layout clar si prin definirea responsabilitatilor tehnice. Laboratorul trebuie privit ca sistem, nu ca lista de echipamente.",
          "Daca spatiul este limitat, merita sa incepi cu o evaluare tehnica si sa vezi unde apar compromisurile.",
        ],
      },
    ],
    faqs: [
      {
        question: "Un laborator IVD poate fi amenajat in orice spatiu?",
        answer:
          "Nu. Spatiul trebuie verificat pentru flux, instalatii si compatibilitate cu echipamentele, inainte de decizie.",
      },
      {
        question: "Ce este cel mai important la infrastructura?",
        answer:
          "Compatibilitatea dintre spatiu, echipamente si modul de operare al laboratorului.",
      },
      {
        question: "Are sens un calcul orientativ de cost?",
        answer:
          "Da, ca prim pas. Pentru executie insa ai nevoie de o structurare mai tehnica.",
      },
    ],
    relatedArticles: [
      "echipamente-necesare-laborator-ivd",
      "integrare-echipamente-ivd-flux-laborator",
      "pregatire-laborator-echipamente-ivd",
    ],
    cta: {
      title: "Vrei sa vezi daca laboratorul tau este pregatit pentru IVD?",
      description:
        "Porneste de la o estimare si apoi discuta infrastructura inainte de achizitie.",
      label: "Estimare laborator",
      href: "/calculatoare/cost-laborator-ivd",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "flux-operational-laborator-ivd",
    title: "Flux operational intr-un laborator IVD",
    description:
      "Cum arata un flux operational sanatos intr-un laborator IVD: receptie, prelucrare, analiza, verificare, livrare si modul in care spatiul sprijina viteza de lucru.",
    category: "IVD / laborator",
    tags: ["IVD", "flux operational", "laborator", "procese", "planificare"],
    readingTime: "7 min",
    targetKeyword: "flux operational laborator IVD",
    relatedServices: [
      "/services/ivd-laborator",
      "/services/constructii-medicale",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      ivdEstimateTool,
      clinicEvaluateTool,
      { label: "Project Intake", href: "/project-intake" },
    ],
    intro:
      "Fluxul operational este puntea dintre infrastructura si rezultate. In laboratorul IVD, un flux bun scurteaza timpii, reduce blocajele si ajuta la folosirea eficienta a echipamentului si a spatiului.",
    sections: [
      {
        id: "de-ce-e-important",
        title: "De ce este important fluxul",
        body: [
          "Un laborator cu flux slab poate avea echipamente bune, dar sa functioneze greoi. De aceea, spatiul si procesele trebuie gandite impreuna, nu separat.",
          "In proiectele serioase, fluxul este un criteriu de design la fel de important ca electricul sau HVAC-ul.",
        ],
      },
      {
        id: "ce-ajuta-la-viteza",
        title: "Ce ajuta la viteza si stabilitate",
        body: [
          "Ajuta separarea clara a etapelor, pozitionarea logica a echipamentelor si accesul bun la zonele de lucru. Cand aceste lucruri sunt clare, laboratorul lucreaza mai coerent si cu mai putine blocaje.",
          "Calculatorul de cost laborator si Project Intake sunt utile pentru a transforma fluxul in cerinte concrete.",
        ],
      },
      {
        id: "cum-se-pastreaza",
        title: "Cum se pastreaza pe termen lung",
        body: [
          "Fluxul trebuie revizuit si dupa punerea in functiune, mai ales daca volumul de lucru creste sau daca apar echipamente suplimentare. In laborator, o buna planificare initiala face schimbarea mai usoara ulterior.",
          "Daca exista risc de crestere, merita sa tratezi proiectul ca pe un sistem extensibil, nu ca pe o configuratie fixa.",
        ],
      },
    ],
    faqs: [
      {
        question: "Fluxul laboratorului afecteaza rezultatele?",
        answer:
          "Indirect, da. Un flux prost poate incetini lucrul, poate crea blocaje si poate creste riscul operational.",
      },
      {
        question: "Trebuie planificat fluxul inainte de aparate?",
        answer:
          "Ideal da. Fluxul si echipamentele trebuie gandite impreuna, deoarece se influenteaza reciproc.",
      },
      {
        question: "Pot reface fluxul dupa ce laboratorul este pornit?",
        answer:
          "Poti ajusta, dar este mai usor si mai ieftin sa-l planifici corect din faza de proiect.",
      },
    ],
    relatedArticles: [
      "pregatire-laborator-echipamente-ivd",
      "integrare-echipamente-ivd-flux-laborator",
      "cerinte-infrastructura-laborator-ivd",
    ],
    cta: {
      title: "Vrei sa vezi daca fluxul laboratorului tau este coerent?",
      description:
        "Incepe cu o estimare si apoi treci la proiectarea spatiului si a echipamentelor.",
      label: "Estimare laborator",
      href: "/calculatoare/cost-laborator-ivd",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "checklist-pre-implementare-imagistica",
    title: "Checklist de pre-implementare pentru un proiect de imagistica",
    description:
      "Un checklist practic pentru a pregati un proiect de imagistica inainte de implementare: date, spatiu, echipament, instalatii, flux si responsabilitati.",
    category: "Imagistică",
    tags: ["checklist", "imagistica", "implementare", "pregatire", "proiect"],
    readingTime: "7 min",
    targetKeyword: "checklist pre-implementare imagistica",
    relatedServices: [
      "/services/imagistica-medicala",
      "/services/constructii-medicale",
      "/services/service-aparatura-medicala",
    ],
    relatedTools: [
      projectMedicalCalculatorTool,
      clinicEvaluateTool,
      { label: "Project Intake", href: "/project-intake" },
    ],
    intro:
      "Un proiect de imagistica pornit fara checklist ajunge usor sa depinda de presupuneri. Un check-list bun pune pe masa exact ce trebuie clarificat inainte de a trece la oferta, achizitie sau executie.",
    sections: [
      {
        id: "ce-trebuie-strans",
        title: "Ce trebuie strans inainte",
        body: [
          "Ai nevoie de date despre spatiu, echipament, vecinatati, cerinte tehnice, buget, calendar si responsabilitati. Daca lipseste una dintre aceste piese, proiectul se bazeaza pe aproximari.",
          "Un checklist bun reduce timpul de clarificare si imbunatateste calitatea primei discutii cu furnizorii.",
        ],
      },
      {
        id: "ce-decizii-grabite",
        title: "Ce decizii grabite trebuie evitate",
        body: [
          "Nu fixa echipamentul inainte de a valida spatiul. Nu presupune ca un calcul generic este suficient. Si nu porni executia fara sa stii ce urmeaza dupa primul pas.",
          "Checklist-ul este tocmai instrumentul care te ajuta sa opresti aceste scurtaturi.",
        ],
      },
      {
        id: "cum-se-leaga-de-proces",
        title: "Cum se leaga de procesul de proiect",
        body: [
          "Checklist-ul este util inainte de Proposal Builder, pentru ca iti ordoneaza datele si iti scade riscul de raspunsuri incomplete. Dupa aceea, Project Intake le poate transforma in analiza tehnica.",
          "Este una dintre cele mai simple metode de a creste calitatea unui lead fara a-l forta spre o oferta premature.",
        ],
      },
    ],
    faqs: [
      {
        question: "Un checklist inlocuieste analiza tehnica?",
        answer:
          "Nu. Ajuta la pregatire, dar analiza tehnica ramane pasul necesar pentru decizie.",
      },
      {
        question: "Cand ar trebui folosit?",
        answer:
          "Inainte de achizitie, inainte de proiectare detaliata si inainte de a bloca bugetul.",
      },
      {
        question: "Ce face diferenta intre un checklist bun si unul slab?",
        answer:
          "Unul bun aduna datele care schimba proiectul, nu doar lucrurile evidente.",
      },
    ],
    relatedArticles: [
      "cum-se-construieste-o-clinica-medicala-in-romania",
      "rmn-1-5t-vs-3t-infrastructura",
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
    ],
    cta: {
      title: "Vrei sa transformi checklist-ul in analiza?",
      description:
        "Completeaza Project Intake si muta datele din checklist intr-un plan clar.",
      label: "Deschide Project Intake",
      href: "/project-intake",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "planificare-multi-vendor-proiect-medical",
    title: "Planificare multi-vendor intr-un proiect medical",
    description:
      "Cum coordonezi mai multi furnizori intr-un proiect medical fara sa pierzi controlul asupra cerintelor, dependintelor, termenelor si responsabilitatilor.",
    category: "Aparatură medicală",
    tags: ["multi-vendor", "proiect medical", "coord. furnizori", "implementare"],
    readingTime: "8 min",
    targetKeyword: "planificare multi-vendor proiect medical",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/service-aparatura-medicala",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      projectMedicalCalculatorTool,
      clinicEvaluateTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Cand intr-un proiect apar mai multi furnizori, riscul principal nu este lipsa de oferta, ci lipsa de coordonare. Un proiect medical multi-vendor are nevoie de un cadru clar pentru cerinte, etape si responsabilitati.",
    sections: [
      {
        id: "de-ce-e-dificil",
        title: "De ce este dificil multi-vendor",
        body: [
          "Fiecare furnizor vine cu propriile presupuneri despre spatiu, instalatii si limite tehnice. Daca aceste presupuneri nu sunt aliniate, apar suprapuneri, goluri sau refaceri.",
          "Coordonarea buna inseamna sa separi ce livreaza fiecare si ce ramane in responsabilitatea proiectului ca intreg.",
        ],
      },
      {
        id: "cum-se-structureaza",
        title: "Cum se structureaza corect",
        body: [
          "Se incepe cu lista de cerinte si cu o ordine clara a deciziilor. Apoi se stabilesc punctele de interfata intre furnizori: ce trebuie validat, cine confirma si cand se considera pasul inchis.",
          "Project Intake si Proposal Builder sunt utile pentru a scoate din zona vaga cerintele si a le pune intr-o structura usor de urmarit.",
        ],
      },
      {
        id: "unde-se-pierde-controlul",
        title: "Unde se pierde controlul",
        body: [
          "Se pierde atunci cand fiecare furnizor optimizeaza doar propria parte si nimeni nu vede imaginea de ansamblu. In proiectele medicale, asta duce la costuri suplimentare si la termene fragile.",
          "Un management bun de implementare tine proiectul unit, chiar daca lucreaza cu mai multi parteneri.",
        ],
      },
    ],
    faqs: [
      {
        question: "Mai multi furnizori inseamna automat mai multe riscuri?",
        answer:
          "Nu automat, dar cere o coordonare mult mai buna si un cadru clar de responsabilitati.",
      },
      {
        question: "Cine trebuie sa tina proiectul unit?",
        answer:
          "Ideal o echipa de coordonare sau un partener care vede infrastructura, echipamentele si implementarea ca un singur sistem.",
      },
      {
        question: "Merita un intake inainte de ofertare?",
        answer:
          "Da, pentru ca reduce numarul de presupuneri si ajuta furnizorii sa raspunda pe aceeasi baza.",
      },
    ],
    relatedArticles: [
      "checklist-pre-implementare-imagistica",
      "etape-validare-infrastructura-medicala",
      "costuri-ascunse-proiecte-imagistice",
    ],
    cta: {
      title: "Vrei sa coordonezi mai clar furnizorii proiectului?",
      description:
        "PorneÈ™te de la Proposal Builder sau Project Intake si construieste cadrul comun.",
      label: "Deschide Proposal Builder",
      href: "/proposal-builder",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
  {
    slug: "cat-costa-plumbarea-unei-camere-rx",
    title: "Cat costa plumbarea unei camere RX?",
    description:
      "Estimare realista pentru costul de plumbare/radioprotectie la camera RX: ce influenteaza pretul, ce documente sunt necesare si cand merita ceruta oferta preliminara.",
    category: "Radiologie",
    tags: ["plumbare RX", "radioprotectie", "camera RX", "cost amenajare radiologie"],
    readingTime: "9 min",
    targetKeyword: "cat costa plumbarea unei camere RX",
    relatedServices: [
      "/radioprotectie-plumbare-rx",
      "/services/protectie-radiologica",
      "/service-aparatura-medicala",
    ],
    relatedTools: [
      { label: "Discuta cu ZES despre camera RX", href: "/" },
      { label: "Solicita oferta preliminara", href: "/project-intake" },
      { label: "Radioprotectie si plumbare RX", href: "/radioprotectie-plumbare-rx" },
    ],
    intro:
      "Costul pentru plumbarea unei camere RX nu are o valoare fixa valabila pentru toate clinicile. Pretul depinde de tipul echipamentului, configuratia camerei, vecinatati, grosimile rezultate din calculul de radioprotectie si nivelul de interventie necesar in santier.",
    sections: [
      {
        id: "de-ce-costul-nu-este-fix",
        title: "De ce costul nu este fix",
        body: [
          "Doua camere RX pot avea costuri diferite chiar daca suprafata este apropiata. Diferenta vine din tipul aparatului, distributia fluxurilor, pozitionarea fata de spatii sensibile si cerintele tehnice de executie.",
          "Un pret orientativ poate exista in faza de pre-buget, dar valoarea finala trebuie ancorata in planuri si in calculul de radioprotectie pentru proiectul concret.",
        ],
      },
      {
        id: "factori-care-influenteaza-pretul",
        title: "Factorii care influenteaza pretul",
        body: [
          "Pretul este influentat de grosimile necesare de ecranare, suprafetele reale care trebuie tratate, tipul usilor/vitrajelor radioprotectate, detaliile de executie pentru penetrari si nivelul de finisaj solicitat de clinica.",
          "Conteaza si logistica: accesul in spatiu, programul de lucru, eventualele restrictii operationale si necesarul de coordonare intre constructor, proiectant si specialistul de radioprotectie.",
        ],
        bullets: [
          "tip aparat RX si parametrii de exploatare",
          "vecinatati (spatii ocupate, circulatii, zone administrative)",
          "configuratia peretilor, plafonului si pardoselii",
          "usi, vitraje si detalii de etansare la radiatii",
          "interventii in spatiu existent versus amenajare noua",
        ],
      },
      {
        id: "spatiu-existent-vs-constructie-noua",
        title: "Spatiu existent vs constructie noua",
        body: [
          "In spatiu existent apar frecvent costuri suplimentare pentru demolari locale, adaptari de instalatii, corectii de planeitate si integrarea elementelor radioprotectate fara a bloca fluxul clinicii.",
          "In constructie noua, secventa poate fi mai predictibila daca proiectarea este facuta din timp. Totusi, si aici costul depinde de specificatia finala a camerei si de validarea tehnica a solutiei.",
        ],
      },
      {
        id: "documente-necesare",
        title: "Ce documente sunt necesare pentru estimare serioasa",
        body: [
          "Pentru o estimare utila ai nevoie de planul camerei, date despre aparat, scenariul de utilizare si informatii despre vecinatati. Fara acest set minim, orice cifra ramane aproximativa.",
          "Daca proiectul este in faza foarte timpurie, poti incepe cu o discutie orientativa, apoi completezi datele pentru a trece la oferta preliminara coerenta.",
        ],
        bullets: [
          "plan camera (dimensiuni, pozitie usa, vecinatati)",
          "fisa aparatului RX sau date de baza de la furnizor",
          "regim de lucru estimat (program, volum orientativ)",
          "stadiu proiect: concept, executie, modernizare",
        ],
      },
      {
        id: "rolul-planului-camerei",
        title: "Rolul planului camerei in calculul de cost",
        body: [
          "Planul camerei este documentul care transforma discutia din general in executabil. Fara plan, nu poti evalua corect suprafetele, detaliile de inchidere, traseele tehnice si punctele sensibile.",
          "Daca nu ai inca plan final, ZES poate ajuta cu trierea informatiei lipsa si cu pregatirea unui brief tehnic pentru discutia cu specialistul.",
        ],
      },
      {
        id: "cncan-si-radioprotectie",
        title: "CNCAN si radioprotectie: ce trebuie retinut",
        body: [
          "Plumbarea unei camere RX este parte dintr-un context mai larg de radioprotectie si conformare documentata. Solutia finala nu se stabileste dintr-un tabel generic, ci pe baza datelor proiectului si a validarii tehnice.",
          "Grosimile finale de ecranare si configuratia completa trebuie validate de specialist autorizat, in conformitate cu cerintele aplicabile proiectului. Articolul de fata are rol orientativ, nu de aprobare finala.",
        ],
        callout: {
          title: "Validare obligatorie",
          body: "Estimarea din faza initiala este utila pentru buget si planificare, dar decizia finala de radioprotectie/plumbare trebuie confirmata de specialist autorizat pe baza documentatiei complete.",
        },
      },
      {
        id: "cum-poate-ajuta-zes",
        title: "Cum poate ajuta ZES",
        body: [
          "ZES poate structura rapid datele initiale, poate marca informatiile lipsa si poate orienta clinica spre urmatorul pas practic: discutie tehnica, oferta preliminara sau pregatirea documentatiei pentru evaluare.",
          "Daca proiectul include si operare pe echipamente existente, poate fi util sa corelezi devreme partea de radioprotectie cu planul de service si mentenanta pentru uptime.",
        ],
      },
      {
        id: "cand-merita-oferta",
        title: "Cand merita ceruta oferta preliminara",
        body: [
          "Merita sa ceri oferta preliminara cand ai cel putin planul camerei, tipul aparatului si un orizont de implementare. In acest punct, discutia devine concreta si poti compara realist variantele.",
          "Daca lipsesc date, incepe cu ZES si completeaza etapizat. Este mai eficient decat sa fortezi o cifra finala inainte sa ai premize tehnice suficiente.",
        ],
      },
    ],
    faqs: [
      {
        question: "Exista un pret fix pe metru patrat pentru plumbare RX?",
        answer:
          "Nu. Exista intervale orientative, dar costul final depinde de configuratia camerei, tipul aparatului, vecinatati si detalii de executie validate tehnic.",
      },
      {
        question: "Pot obtine oferta preliminara fara plan final?",
        answer:
          "Da, poti primi un cadru preliminar. Pentru oferta mai precisa sunt necesare planul camerei si date tehnice de echipament.",
      },
      {
        question: "Cine stabileste grosimea finala de ecranare?",
        answer:
          "Grosimea finala trebuie stabilita si validata de specialist autorizat, pe baza documentatiei tehnice si a contextului real de proiect.",
      },
      {
        question: "Este relevant service-ul in discutia despre plumbare RX?",
        answer:
          "Da, mai ales in modernizari. Integrarea radioprotectiei cu planul de service reduce riscul de opriri neplanificate dupa punerea in functiune.",
      },
    ],
    relatedArticles: [
      "protectie-radiologica-camera-rx",
      "ce-trebuie-sa-stii-despre-autorizarea-cncan",
      "cost-camera-ct-romania",
    ],
    cta: {
      title: "Discuta cu ZES despre camera RX",
      description:
        "Trimite datele de baza ale proiectului si primesti un cadru tehnic pentru radioprotectie, cost orientativ si pasi urmatori.",
      label: "Solicita oferta preliminara",
      href: "/project-intake",
    },
    publishedAt: "2026-05-28",
    updatedAt: "2026-05-28",
  },
  {
    slug: "etape-validare-infrastructura-medicala",
    title: "Etape de validare a infrastructurii medicale",
    description:
      "Cum validezi infrastructura medicala in etape: spatiu, instalatii, acces, compatibilitate, service si acceptanta tehnica inainte de punerea in functiune.",
    category: "Infrastructură medicală",
    tags: ["validare", "infrastructura", "medical", "etape", "acceptanta"],
    readingTime: "8 min",
    targetKeyword: "etape validare infrastructura medicala",
    relatedServices: [
      "/services/constructii-medicale",
      "/services/service-aparatura-medicala",
      "/services/constructii-medicale",
    ],
    relatedTools: [
      projectMedicalCalculatorTool,
      clinicEvaluateTool,
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    intro:
      "Validarea infrastructurii este momentul in care proiectul trece de la presupuneri la confirmari. Fara aceasta secventa, orice decizie mare din proiect ramane vulnerabila la surprize.",
    sections: [
      {
        id: "ce-se-valideaza",
        title: "Ce se valideaza",
        body: [
          "Se valideaza spatiul, instalatiile, accesul, cerintele tehnice si compatibilitatea cu echipamentele. Fiecare disciplina trebuie sa confirme ca ce e pe plan poate fi realizat in practica.",
          "Daca proiectul are mai multe specialitati, validarea devine si un exercitiu de coordonare intre ele.",
        ],
      },
      {
        id: "de-ce-in-etape",
        title: "De ce in etape",
        body: [
          "Pentru ca nu toate riscurile se vad in acelasi moment. Unele apar la spatiu, altele la echipament, altele la service sau la punerea in functiune. Validarea pe etape reduce riscul de a descoperi problema prea tarziu.",
          "Un calculator de evaluare si Project Intake te ajuta sa nu sari peste informatiile esentiale.",
        ],
      },
      {
        id: "legatura-cu-livrarea",
        title: "Legatura cu livrarea finala",
        body: [
          "Livrarea finala trebuie sa vina dupa ce infrastructura este confirmata si echipamentul poate fi integrat fara improvizatii. Validarea este locul in care proiectul devine executabil in mod credibil.",
          "Aici se vede si diferenta dintre o estimare comerciala si o implementare bine controlata.",
        ],
      },
    ],
    faqs: [
      {
        question: "Validarea infrastructurii este acelasi lucru cu receptia finala?",
        answer:
          "Nu exact. Validarea este mai devreme si mai tehnica, iar receptia finala vine dupa ce ai confirmat ca spatiul poate sustine proiectul.",
      },
      {
        question: "Pot sari peste validare daca proiectul pare simplu?",
        answer:
          "Nu e recomandat. Chiar si proiectele aparent simple ascund dependente tehnice si costuri de corectie.",
      },
      {
        question: "Cine ar trebui sa participe la validare?",
        answer:
          "Cei care cunosc spatiul, instalatiile si cerintele echipamentului sau ale serviciului medical.",
      },
    ],
    relatedArticles: [
      "rmn-1-5t-vs-3t-infrastructura",
      "erori-proiectare-camera-ct",
      "checklist-pre-implementare-imagistica",
    ],
    cta: {
      title: "Vrei sa treci de la ipoteze la validari?",
      description:
        "Completeaza Project Intake si transforma lista de conditii in verificari reale.",
      label: "Deschide Project Intake",
      href: "/project-intake",
    },
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
  },
];




