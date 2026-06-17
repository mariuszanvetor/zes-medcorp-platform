import type { SeoCluster } from "@/data/seo-clusters";

type InvestmentClusterSpec = {
  slug: string;
  title: string;
  description: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  category: string;
  project: string;
  equipment: string;
  infrastructure: string;
  compliance: string;
  service: string;
  budgetRange: string;
  risk: string;
  primaryTool: { label: string; href: string };
  links: {
    services: Array<{ label: string; href: string }>;
    tools: Array<{ label: string; href: string }>;
    articles: Array<{ label: string; href: string }>;
  };
};

const sharedCta = {
  title: "Transforma estimarea intr-un proiect discutabil comercial.",
  description:
    "ZESCORP poate pregati o directie preliminara pentru buget, calendar, riscuri, documente si servicii necesare, fara sa inventeze preturi sau autorizari.",
  label: "Solicita analiza de fezabilitate",
  href: "/contact",
};

function buildInvestmentCluster(spec: InvestmentClusterSpec): SeoCluster {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    targetKeyword: spec.targetKeyword,
    secondaryKeywords: spec.secondaryKeywords,
    category: spec.category,
    intro: `${spec.project} este o investitie high-ticket, unde intrebarea "cat costa" trebuie legata de echipament, spatiu, infrastructura, autorizari, service si modelul de business. Pentru investitori, proprietari de clinici si directori tehnici, bugetul corect nu inseamna o cifra rapida, ci o structura care arata ce se cumpara, ce trebuie validat si ce risc poate schimba proiectul.`,
    sections: [
      {
        title: "Costul echipamentului si al configuratiei",
        body: [
          `${spec.equipment}. In faza de buget, echipamentul trebuie analizat prin configuratie, aplicatii clinice, accesorii, software, integrare si conditii de instalare. O estimare superficiala poate compara doua oferte aparent similare, dar cu responsabilitati diferite: unele includ punere in functiune, training sau accesorii, altele lasa aceste costuri pentru etapa urmatoare.`,
          "Pentru management, intrebarea nu este doar cat costa aparatul, ci ce capacitate operationala cumpara clinica. Diferenta dintre o configuratie minima si una pregatita pentru volum, integrare si service poate schimba veniturile, timpul de recuperare a investitiei si riscul de downtime. ZESCORP trateaza echipamentul ca parte dintr-un proiect, nu ca o linie izolata de catalog.",
        ],
        bullets: [
          "configuratie si aplicatie medicala",
          "software, accesorii si integrare",
          "conditii de instalare si training",
          "service, garantie si mentenanta dupa livrare",
        ],
      },
      {
        title: "Costul amenajarii si al spatiului",
        body: [
          `${spec.infrastructure}. Spatiul poate parea pregatit la prima vedere, dar costul real apare cand sunt analizate accesul, structura, electricul, HVAC-ul, finisajele, fluxurile si zonele tehnice. O cladire existenta poate reduce timpul de pornire, dar poate aduce limitari care fac proiectul mai scump decat o planificare noua.`,
          "Amenajarea trebuie corelata cu echipamentul selectat si cu modul in care clinica va opera. Un centru de imagistica nu are aceleasi cerinte ca un cabinet simplu, iar o camera tehnica, o zona de comanda, un traseu de pacient sau un spatiu de asteptare pot influenta atat bugetul, cat si venitul lunar estimat.",
        ],
      },
      {
        title: "Radioprotectie, RF shielding si cerinte speciale",
        body: [
          "Costurile speciale trebuie separate clar. CT, RX si mamografia implica radioprotectie, plumbare, usi sau vitraje radioprotejate si documente care trebuie validate. RMN-ul implica RF shielding, ecranare electromagnetica, usa RF, penetratii controlate, HVAC si cerinte ale furnizorului. Confuzia dintre aceste discipline produce estimari gresite.",
          "Pentru un investitor, cel mai important este sa stie ce categorie de risc are proiectul. Daca este radiologie, intrebarea este legata de radioprotectie si CNCAN. Daca este RMN, intrebarea este legata de ecranare RF, magnet, acces si conditii tehnice. ZESCORP poate ajuta la separarea costurilor pentru o decizie mai clara.",
        ],
        bullets: [
          "radioprotectie pentru CT, RX si mamografie",
          "RF shielding si ecranare electromagnetica pentru RMN",
          "usi, vitraje, penetratii, filtre si elemente speciale",
          "validari de specialitate inainte de oferta finala",
        ],
      },
      {
        title: "Autorizari, documentatie si responsabilitati",
        body: [
          `${spec.compliance}. Documentatia nu trebuie privita ca o etapa administrativa separata, ci ca parte din buget si calendar. Lipsa planurilor, a datelor despre vecinatati sau a informatiilor despre echipament poate intarzia oferta si poate modifica solutia tehnica.`,
          "ZESCORP nu promite autorizari si nu inlocuieste specialistii autorizati. Rolul practic este pregatirea informatiei: ce exista, ce lipseste, ce trebuie validat si ce poate fi ofertat preliminar. Aceasta claritate protejeaza beneficiarul de decizii luate pe presupuneri incomplete.",
        ],
      },
      {
        title: "Service, mentenanta si costul de operare",
        body: [
          `${spec.service}. Un proiect medical nu se termina la punerea in functiune. Costul de operare include verificari, interventii, consumabile, contracte de mentenanta, actualizari, piese si timp de raspuns. Pentru echipamente critice, downtime-ul poate costa mai mult decat o mentenanta preventiva gandita corect.`,
          "Investitorul trebuie sa compare costul initial cu costul total de utilizare. Un echipament mai ieftin la achizitie poate fi mai scump daca este greu de intretinut, greu de integrat sau vulnerabil la opriri. ZESCORP poate lega oferta de echipament de o discutie despre service si continuitate operationala.",
        ],
      },
      {
        title: "Cost total proiect si intervale orientative",
        body: [
          `${spec.budgetRange}. Intervalul depinde de calitatea echipamentului, tipul spatiului, nivelul lucrarilor, documentatie, termene si pachetele de suport. Fara aceste date, o cifra exacta ar fi mai mult marketing decat planificare.`,
          "O estimare buna separa bugetul in capitole: echipament, infrastructura, lucrari speciale, documentatie, instalare, service si rezerva de risc. Aceasta structura ajuta managementul sa decida daca proiectul este fezabil, daca trebuie fazat sau daca trebuie schimbata strategia de achizitie.",
        ],
      },
      {
        title: "Riscuri care pot schimba bugetul",
        body: [
          `${spec.risk}. Riscul apare de obicei din date lipsa: planuri incomplete, echipament neselectat, conditii de acces neverificate, HVAC subdimensionat, status CNCAN neclar sau responsabilitati nedefinite intre furnizori. Acestea nu sunt detalii mici, ci factori care pot schimba semnificativ bugetul.`,
          "Pentru proiecte de 50.000 EUR pana la peste 2.000.000 EUR, riscul trebuie transformat in lista de verificare. Cine valideaza spatiul, cine raspunde de instalatii, cine coordoneaza echipamentul, cine gestioneaza documentatia si cine asigura service-ul dupa lansare? Fara raspunsuri, oferta poate fi incompleta.",
        ],
      },
      {
        title: "Timeline si fazare",
        body: [
          "Calendarul depinde de maturitatea proiectului. Un proiect cu locatie, planuri, echipament selectat si documente existente se poate bugeta mult mai rapid decat un proiect aflat in faza de idee. Pentru investitori, viteza nu trebuie confundata cu graba; un proiect grabit, dar prost definit, poate deveni mai lent in executie.",
          "Fazarea poate reduce presiunea pe cash-flow: analiza, selectie echipament, proiectare, lucrari, instalare, punere in functiune, service si optimizare. ZESCORP poate ajuta la ordonarea acestor pasi pentru ca decizia comerciala sa fie coerenta.",
        ],
      },
      {
        title: "Model de business si ROI",
        body: [
          "ROI-ul nu depinde doar de pretul proiectului. Conteaza volumul de pacienti, tariful mediu, contractele cu parteneri, programul de lucru, timpul de examinare, downtime-ul estimat si capacitatea clinicii de a vinde serviciul medical. Un proiect ieftin, dar lent sau greu de operat, poate recupera investitia mai greu.",
          "Pentru centre de imagistica, decizia trebuie sa lege costul de piata locala. Orasul, competitia, disponibilitatea medicilor, fluxul de pacienti si tipul de servicii influenteaza valoarea. ZESCORP poate pregati o discutie comerciala care nu ramane doar la cost, ci include scenarii de operare.",
        ],
      },
      {
        title: "Ce date trebuie pregatite",
        body: [
          "Pentru o estimare utila sunt necesare: orasul, tipul proiectului, spatiul existent sau nou, suprafata, echipamentele dorite, termenul, bugetul orientativ, planurile disponibile, statusul documentatiei si persoana de contact. Daca exista fise tehnice sau oferte preliminare, acestea accelereaza evaluarea.",
          "Nu este nevoie ca beneficiarul sa stie toate detaliile tehnice de la inceput. Important este sa existe un punct de pornire corect si sa fie clar ce lipseste. O cerere bine structurata poate trece mai repede de la discutie la oferta preliminara.",
        ],
      },
      {
        title: "Cum poate ajuta ZESCORP",
        body: [
          "ZESCORP poate lega infrastructura, echipamentul, service-ul, mentenanta si documentatia intr-o discutie comerciala coerenta. In loc sa trateze fiecare capitol separat, echipa poate pregati o harta a proiectului: ce este critic, ce este optional, ce trebuie validat si ce se poate oferta imediat.",
          "ZES, asistentul digital ZESCORP, poate colecta rapid datele initiale si poate pregati un brief pentru echipa comerciala. Pentru proiecte high-ticket, asta reduce frictiunea dintre intentia investitorului si o cerere de oferta actionabila.",
        ],
      },
      {
        title: "Cand merita ceruta analiza",
        body: [
          "Analiza merita ceruta inainte de semnarea contractului de chirie, inainte de achizitia echipamentului sau inainte de inceperea lucrarilor. In aceste momente, o decizie gresita este inca reversibila. Dupa executie, corectiile sunt mai scumpe si pot afecta lansarea.",
          "Daca proiectul are buget, termen sau locatie, urmatorul pas este o discutie structurata. ZESCORP poate pregati o evaluare preliminara, poate indica lipsurile si poate recomanda ordinea corecta a deciziilor.",
        ],
      },
      {
        title: "Cum se transforma estimarea in oferta",
        body: [
          "Estimarea devine oferta doar dupa clarificarea datelor tehnice si comerciale. Oferta trebuie sa arate ce include, ce exclude, ce depinde de validare si ce presupuneri au fost folosite. In proiectele medicale, transparenta este mai importanta decat o cifra rapida.",
          "O cerere de oferta buna trebuie sa permita comparatie reala intre furnizori. Daca o oferta include instalare, documentatie si service, iar alta include doar produsul, preturile nu sunt comparabile. ZESCORP poate ajuta la separarea capitolelor pentru decizie.",
        ],
      },
      {
        title: "Urmatorul pas comercial",
        body: [
          "Pentru a continua, trimite obiectivul proiectului, orasul, termenul, bugetul orientativ si orice plan sau fisa tehnica disponibila. Daca proiectul este inca la inceput, porneste cu calculatorul relevant si solicita apoi o analiza de fezabilitate.",
          "Scopul nu este sa primesti o promisiune generica, ci o directie comerciala care poate fi discutata intern: buget, riscuri, documente, servicii necesare si calendar. Aceasta este baza unui proiect medical controlat.",
        ],
      },
      {
        title: "Structura de achizitie recomandata",
        body: [
          "Pentru proiectele medicale high-ticket, achizitia ar trebui structurata pe pachete clare: echipament, infrastructura, lucrari speciale, software, instalare, service si mentenanta. Daca toate sunt amestecate intr-o singura cifra, managementul nu mai poate vedea unde este valoarea reala si unde sunt riscurile. O structura buna ajuta si la negociere, pentru ca separa ce este obligatoriu de ce poate fi fazat sau optimizat.",
          "In practica, o achizitie buna contine si responsabilitati. Cine confirma spatiul, cine pregateste camera, cine livreaza echipamentul, cine coordoneaza punerea in functiune si cine raspunde la primul incident operational? Fara aceste raspunsuri, proiectul poate parea castigat comercial, dar fragil in implementare. ZESCORP recomanda ca oferta sa includa responsabilitatile principale inca din faza de analiza.",
        ],
      },
      {
        title: "Finantare, cash-flow si decizie investitionala",
        body: [
          "Pentru investitori, bugetul trebuie sa fie compatibil cu strategia de cash-flow. Un proiect poate fi profitabil, dar dificil de sustinut daca platile, livrarile si lucrarile nu sunt fazate. De aceea, costul total trebuie vazut impreuna cu momentul platilor, data estimata de lansare, durata pana la venituri si rezerva de risc pentru lucrari suplimentare. Aceasta analiza este importanta mai ales pentru centre de imagistica si camere RMN sau CT.",
          "O discutie serioasa de finantare cere documente: descriere proiect, capitole de cost, ipoteze de venit, riscuri tehnice si pasi de implementare. ZESCORP nu inlocuieste consultantul financiar, dar poate pregati partea tehnic-comerciala astfel incat investitorul sa aiba o baza mai clara pentru banca, parteneri, fonduri sau decizia interna de capital.",
        ],
      },
      {
        title: "Red flags inainte de semnarea contractelor",
        body: [
          "Exista semnale care ar trebui sa opreasca temporar decizia: lipsa planului camerei, echipament neselectat, oferta fara responsabilitati, termen prea optimist, spatiu neverificat pentru acces, HVAC necunoscut, status CNCAN neclar sau lipsa unei discutii despre service. Aceste semnale nu inseamna ca proiectul este imposibil, ci ca oferta trebuie maturizata inainte de angajamente ferme.",
          "Un alt red flag este comparatia exclusiva pe pret. In proiecte medicale, doua oferte pot avea acelasi titlu, dar continut diferit. Una poate include instalare, testare si suport, alta poate exclude lucrarile critice. Inainte de decizie, beneficiarul trebuie sa stie ce ramane in afara ofertei si ce costuri pot aparea dupa semnare.",
        ],
      },
      {
        title: "Checklist pentru intalnirea cu ZESCORP",
        body: [
          "Pentru o intalnire eficienta, pregateste obiectivul proiectului, locatia, tipul de cladire, suprafata, echipamentele dorite, termenul, bugetul orientativ, planurile disponibile, statusul autorizatiilor si persoana responsabila de decizie. Daca exista oferte de echipament, fise tehnice, poze ale spatiului sau documente de urbanism, acestea pot scurta analiza preliminara.",
          "In intalnire, scopul nu este sa se inchida imediat o oferta finala, ci sa se clarifice traseul: ce date lipsesc, ce riscuri pot modifica bugetul, ce servicii sunt obligatorii, ce poate fi ofertat rapid si ce trebuie validat de specialisti. O intalnire buna se termina cu un brief comercial, nu cu o lista vaga de promisiuni.",
        ],
      },
      {
        title: "Scenarii de scalare dupa lansare",
        body: [
          "Un proiect medical ar trebui gandit si pentru etapa urmatoare. Un centru care porneste cu un singur echipament poate adauga ulterior CT, RMN, mamografie, PACS extins, service contractual sau raportare la distanta. Daca infrastructura este gandita fara scalare, orice extindere poate deveni scumpa si lenta. De aceea, spatiile tehnice, traseele, reteaua si mentenanta trebuie discutate inca din etapa de buget.",
          "Scalarea influenteaza si achizitia initiala. Uneori merita pregatita infrastructura pentru crestere chiar daca echipamentul suplimentar vine mai tarziu. Alteori, este mai prudent sa se limiteze investitia initiala si sa se pastreze o rezerva pentru service, marketing si optimizarea fluxurilor. ZESCORP poate ajuta la separarea acestor scenarii pentru o decizie mai buna.",
        ],
      },
      {
        title: "De ce aceasta pagina nu ofera pret fix",
        body: [
          "Un pret fix public pentru proiecte de imagistica, radioprotectie sau RMN ar fi imprecis fara date. Aceeasi categorie de proiect poate avea costuri diferite in functie de oras, cladire, acces, suprafata, echipament, stadiul documentatiei si nivelul de suport inclus. O cifra prea precisa, fara verificare, poate crea asteptari gresite si decizii slabe.",
          "Abordarea corecta este estimarea pe capitole si validarea progresiva. Prima etapa arata intervalul si riscurile. A doua etapa cere documente. A treia etapa transforma datele intr-o oferta personalizata. Pentru proiecte high-ticket, aceasta disciplina este un avantaj comercial, deoarece protejeaza investitia si reduce rework-ul.",
        ],
      },
      {
        title: "Cum ar trebui sa arate decizia executiva",
        body: [
          "Decizia executiva ar trebui sa contina un rezumat clar: investitie estimata, venituri posibile, riscuri tehnice, dependente de documentatie, calendar si responsabilitati. Pentru un proprietar de clinica sau fond de investitii, acest rezumat este mai util decat o lista lunga de preturi, pentru ca arata daca proiectul poate fi aparat in fata partenerilor, bancii sau boardului.",
          "Un board nu decide doar daca proiectul este interesant, ci daca este controlabil. Controlabil inseamna ca exista scenarii, rezerva de risc, fazare, criterii de selectie pentru furnizori si o intelegere clara a costului de operare. ZESCORP poate ajuta la transformarea datelor tehnice intr-un limbaj comercial potrivit pentru decizie.",
        ],
      },
      {
        title: "Cum se transforma vizitatorul in lead calificat",
        body: [
          "Un lead high-ticket nu trebuie impins direct catre o oferta finala. Primul pas util este calificarea: ce vrea sa construiasca, ce echipamente sunt vizate, unde este proiectul, ce buget exista, ce termen se urmareste si ce documente sunt disponibile. Aceste date separa vizitatorii curiosi de investitorii care pot intra rapid intr-o discutie comerciala.",
          "De aceea, paginile de cost sunt legate de calculatoare, Project Intake, contact si ZES. Calculatorul ofera orientare, ZES colecteaza context, iar echipa ZESCORP poate continua cu analiza de fezabilitate. Fluxul este gandit pentru proiecte reale, nu pentru trafic generic: mai putine conversatii inutile, mai multe cereri care pot deveni propuneri.",
        ],
      },
      {
        title: "Rezultatul asteptat pentru decident",
        body: [
          "La finalul procesului, decidentul ar trebui sa aiba o imagine simpla: investitia estimata, serviciile obligatorii, serviciile optionale, riscurile principale, datele lipsa si urmatorul pas. Daca aceste elemente sunt clare, proiectul poate merge catre oferta, finantare sau faza de proiectare cu mai putina incertitudine.",
          "Aceasta claritate este motivul pentru care ZESCORP trateaza paginile de cost ca instrumente comerciale, nu ca articole generale. Scopul este sa ajute un investitor real sa actioneze: sa ceara audit, sa incarce planul, sa discute echipamentul si sa pregateasca o decizie de buget.",
        ],
      },
    ],
    faq: [
      {
        question: "Pot primi un cost exact fara planuri si fise tehnice?",
        answer:
          "Nu in mod responsabil. Se poate pregati o estimare orientativa, dar costul final depinde de spatiu, echipament, documentatie si validari tehnice.",
      },
      {
        question: "Ce include o analiza preliminara ZESCORP?",
        answer:
          "Include obiectivul proiectului, echipamentele vizate, riscurile tehnice, documentele lipsa, capitolele de buget si urmatorii pasi pentru oferta.",
      },
      {
        question: "De ce nu sunt publicate preturi fixe?",
        answer:
          "Pentru proiecte medicale, pretul fix fara context poate induce in eroare. Configuratia, spatiul, instalatiile, radioprotectia si service-ul pot schimba bugetul.",
      },
      {
        question: "Cand este momentul potrivit pentru contact?",
        answer:
          "Ideal inainte de achizitia echipamentului sau inceperea lucrarilor, cand deciziile tehnice inca pot fi corectate fara costuri mari.",
      },
      {
        question: "Poate ZESCORP sa ajute si dupa implementare?",
        answer:
          "Da. Discutia poate include service, mentenanta, suport tehnic, modernizare si planificarea inlocuirilor viitoare.",
      },
    ],
    relatedServices: spec.links.services,
    relatedTools: [spec.primaryTool, ...spec.links.tools],
    relatedArticles: spec.links.articles,
    cta: sharedCta,
  };
}

const specs: InvestmentClusterSpec[] = [
  {
    slug: "cost-rmn-1-5t",
    title: "Cost RMN 1.5T: buget complet pentru echipament, camera si operare",
    description:
      "Estimare comerciala pentru investitia intr-un RMN 1.5T: echipament, camera, RF shielding, amenajare, autorizari, service si cost total de proiect.",
    targetKeyword: "cost RMN 1.5T",
    secondaryKeywords: ["RMN 1.5T pret", "camera RMN 1.5T", "buget RMN", "investitie RMN"],
    category: "Investitii imagistica",
    project: "Un proiect RMN 1.5T",
    equipment:
      "RMN-ul 1.5T este adesea ales pentru echilibrul dintre cost, aplicatii clinice si volum operational",
    infrastructure:
      "Camera RMN 1.5T cere RF shielding, conditii de mediu, acces pentru magnet, camera tehnica si trasee coordonate",
    compliance:
      "Documentatia trebuie corelata cu cerintele furnizorului RMN, siguranta operationala si validarile tehnice",
    service:
      "Service-ul RMN si mentenanta preventiva trebuie discutate din faza de achizitie, deoarece downtime-ul afecteaza direct veniturile",
    budgetRange:
      "Bugetul total poate varia de la proiecte medii spre investitii mari, in functie de echipament nou sau reconditionat, camera si suport",
    risk:
      "Riscurile principale sunt accesul magnetului, RF shielding incomplet, HVAC insuficient si subestimarea costului de operare",
    primaryTool: { label: "Calculeaza investitia", href: "/calculatoare/investitie-centru-imagistica" },
    links: {
      services: [
        { label: "RF shielding RMN", href: "/servicii/rf-shielding-rmn" },
        { label: "Camera RMN la cheie", href: "/servicii/camera-rmn-la-cheie" },
        { label: "Service RMN", href: "/servicii/service-rmn" },
      ],
      tools: [{ label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" }],
      articles: [{ label: "Diferenta RF shielding si plumb", href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb" }],
    },
  },
  {
    slug: "cost-rmn-3t",
    title: "Cost RMN 3T: investitie premium pentru imagistica avansata",
    description:
      "Buget pentru proiect RMN 3T: echipament, camera, RF shielding, infrastructura, service, riscuri si cost total pentru centre de imagistica.",
    targetKeyword: "cost RMN 3T",
    secondaryKeywords: ["RMN 3T pret", "camera RMN 3T", "investitie RMN 3T", "RF shielding RMN 3T"],
    category: "Investitii imagistica",
    project: "Un proiect RMN 3T",
    equipment:
      "RMN-ul 3T este o investitie premium, potrivita pentru aplicatii avansate si centre care urmaresc diferentiere clinica",
    infrastructure:
      "Camera RMN 3T cere o coordonare mai stricta a ecranarii RF, accesului, mediului si cerintelor furnizorului",
    compliance:
      "Validarile tehnice si documentatia trebuie pregatite devreme, deoarece echipamentul are cerinte mai sensibile de instalare",
    service:
      "Mentenanta RMN 3T trebuie tratata ca element de continuitate, nu ca serviciu optional dupa instalare",
    budgetRange:
      "Bugetul total este de regula in zona investitiilor mari si trebuie corelat cu scenariul de volum, specialitati si ROI",
    risk:
      "Riscurile includ subestimarea cerintelor de camera, zgomot electromagnetic, instalatii insuficiente si downtime costisitor",
    primaryTool: { label: "Calculeaza investitia", href: "/calculatoare/investitie-centru-imagistica" },
    links: {
      services: [
        { label: "RF shielding RMN", href: "/servicii/rf-shielding-rmn" },
        { label: "Ecranare electromagnetica medicala", href: "/servicii/ecranare-electromagnetica-medicala" },
        { label: "Camera RMN la cheie", href: "/servicii/camera-rmn-la-cheie" },
      ],
      tools: [{ label: "Calculator RF shielding", href: "/calculatoare/rf-shielding" }],
      articles: [{ label: "Cost camera RMN", href: "/ghiduri/cost-camera-rmn" }],
    },
  },
  {
    slug: "cost-computer-tomograf",
    title: "Cost computer tomograf: echipament CT, camera si radioprotectie",
    description:
      "Costuri pentru investitia intr-un computer tomograf: echipament, camera CT, radioprotectie, CNCAN, service si buget total.",
    targetKeyword: "cost computer tomograf",
    secondaryKeywords: ["pret CT medical", "camera CT cost", "radioprotectie CT cost", "investitie CT"],
    category: "Investitii CT",
    project: "Un proiect de computer tomograf",
    equipment:
      "Computerul tomograf trebuie ales in functie de volum, aplicatii, configuratie, software, service si integrare PACS",
    infrastructure:
      "Camera CT cere radioprotectie, camera de comanda, electric, HVAC, acces, finisaje si coordonare cu echipamentul",
    compliance:
      "Documentatia pentru radioprotectie si CNCAN trebuie pregatita in raport cu modelul CT si planul camerei",
    service:
      "Service-ul CT este critic pentru continuitate, deoarece oprirea aparatului poate afecta imediat programarile",
    budgetRange:
      "Bugetul poate varia de la proiecte medii spre investitii mari, in functie de performanta CT, lucrari si suport inclus",
    risk:
      "Riscurile principale sunt radioprotectia discutata tarziu, accesul dificil si subestimarea instalatiilor necesare",
    primaryTool: { label: "Calculeaza costul CT", href: "/calculatoare/cost-camera-ct" },
    links: {
      services: [
        { label: "Radioprotectie CT", href: "/servicii/radioprotectie-ct" },
        { label: "Service computer tomograf", href: "/servicii/service-computer-tomograf" },
        { label: "Infrastructura imagistica", href: "/servicii/infrastructura-imagistica" },
      ],
      tools: [{ label: "Calculator radioprotectie", href: "/calculatoare/radioprotectie" }],
      articles: [{ label: "Autorizare CNCAN", href: "/ghiduri/autorizare-cncan" }],
    },
  },
  {
    slug: "cost-radiologie-digitala",
    title: "Cost radiologie digitala: camera RX, detector, PACS si service",
    description:
      "Buget pentru radiologie digitala: aparat RX, detector, camera radiologie, placare cu plumb, PACS, service si mentenanta.",
    targetKeyword: "cost radiologie digitala",
    secondaryKeywords: ["radiologie digitala pret", "camera RX cost", "detector digital RX", "plumbare camera RX"],
    category: "Investitii radiologie",
    project: "Un proiect de radiologie digitala",
    equipment:
      "Radiologia digitala include aparatul RX, detectorul, statia de lucru, software, PACS si accesorii operationale",
    infrastructure:
      "Camera RX cere radioprotectie, plumbare, usa/vitraj unde este cazul, flux pacient si acces pentru service",
    compliance:
      "Documentatia trebuie corelata cu aparatul, radioprotectia si statusul CNCAN, fara promisiuni de autorizare online",
    service:
      "Service-ul radiologiei digitale include detector, generator, statie, software, calibrare si suport de continuitate",
    budgetRange:
      "Bugetul este influentat de nivelul echipamentului, detector, lucrari de camera, plumbare, PACS si mentenanta",
    risk:
      "Riscul major este sa cumperi echipamentul fara camera pregatita sau sa finalizezi camera fara cerintele aparatului",
    primaryTool: { label: "Calculeaza radioprotectia", href: "/calculatoare/radioprotectie" },
    links: {
      services: [
        { label: "Placare plumb camera RX", href: "/servicii/placare-plumb-camera-rx" },
        { label: "Amenajare camera radiologie", href: "/servicii/amenajare-camera-radiologie" },
        { label: "Service radiologie", href: "/servicii/service-radiologie" },
      ],
      tools: [{ label: "Infrastructura radiologie", href: "/calculatoare/infrastructura-radiologie-estimare" }],
      articles: [{ label: "Cost plumbare camera RX", href: "/knowledge-hub/cat-costa-plumbarea-unei-camere-rx" }],
    },
  },
  {
    slug: "cost-radioprotectie",
    title: "Cost radioprotectie: buget pentru camere RX, CT si mamografie",
    description:
      "Cost radioprotectie pentru clinici si imagistica: plumbare, pereti, usa, vitraj, documentatie, CNCAN si oferta preliminara.",
    targetKeyword: "cost radioprotectie",
    secondaryKeywords: ["pret radioprotectie", "cost plumbare", "radioprotectie camera RX", "radioprotectie CT"],
    category: "Radioprotectie",
    project: "Un proiect de radioprotectie",
    equipment:
      "Echipamentul radiologic influenteaza direct solutia de protectie, pentru ca RX, CT si mamografia nu au aceleasi cerinte",
    infrastructure:
      "Radioprotectia se leaga de pereti, usa, vitraj, vecinatati, camera de comanda, finisaje si executie",
    compliance:
      "Grosimile si solutia finala trebuie validate de specialisti autorizati si corelate cu documentatia aplicabila",
    service:
      "Service-ul echipamentului trebuie integrat in proiect pentru acces, verificari si continuitate dupa punerea in functiune",
    budgetRange:
      "Bugetul depinde de suprafete, materiale, elemente speciale, complexitatea camerei si statusul documentatiei",
    risk:
      "Riscul este executia dupa ipoteze gresite, cu pereti, usi sau vecinatati tratate superficial",
    primaryTool: { label: "Calculeaza radioprotectia", href: "/calculatoare/radioprotectie" },
    links: {
      services: [
        { label: "Radioprotectie", href: "/servicii/radioprotectie" },
        { label: "Radioprotectie CT", href: "/servicii/radioprotectie-ct" },
        { label: "Radioprotectie mamografie", href: "/servicii/radioprotectie-mamografie" },
      ],
      tools: [{ label: "Radioprotectie CT estimare", href: "/calculatoare/radioprotectie-ct-estimare" }],
      articles: [{ label: "Autorizare CNCAN radiologie", href: "/servicii/consultanta-cncan-radiologie" }],
    },
  },
  {
    slug: "cost-rf-shielding",
    title: "Cost RF shielding: buget pentru camera RMN si ecranare RF",
    description:
      "Cost RF shielding pentru RMN: cusca Faraday, usa RF, filtre, penetratii, testare, infrastructura si oferta preliminara.",
    targetKeyword: "cost RF shielding",
    secondaryKeywords: ["cost cusca Faraday RMN", "ecranare RF pret", "RF shielding medical", "camera RMN cost"],
    category: "RF shielding",
    project: "Un proiect de RF shielding",
    equipment:
      "RMN-ul dicteaza cerintele RF, iar modelul echipamentului trebuie cunoscut inainte de oferta finala",
    infrastructure:
      "RF shielding-ul include incinta conductiva, usa RF, filtre, waveguides, penetratii, HVAC si testare",
    compliance:
      "Performanta ecranarii se valideaza tehnic, in raport cu cerintele furnizorului si testele aplicabile",
    service:
      "Mentenanta camerei si accesul pentru service trebuie gandite inainte de instalarea magnetului",
    budgetRange:
      "Bugetul variaza in functie de dimensiuni, numar de penetratii, usa RF, detalii HVAC si testare",
    risk:
      "Riscurile sunt penetratii netratate, coordonare slaba cu instalatiile si confuzia dintre RF shielding si plumb",
    primaryTool: { label: "Calculeaza RF shielding", href: "/calculatoare/rf-shielding" },
    links: {
      services: [
        { label: "RF shielding RMN", href: "/servicii/rf-shielding-rmn" },
        { label: "Ecranare electromagnetica medicala", href: "/servicii/ecranare-electromagnetica-medicala" },
        { label: "Camera RMN la cheie", href: "/servicii/camera-rmn-la-cheie" },
      ],
      tools: [{ label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" }],
      articles: [{ label: "Diferenta RF shielding si plumb", href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb" }],
    },
  },
  {
    slug: "cost-camera-rmn",
    title: "Cost camera RMN: infrastructura, RF shielding si instalare",
    description:
      "Cost camera RMN pentru clinici si centre de imagistica: RF shielding, HVAC, acces magnet, camera tehnica, documentatie si service.",
    targetKeyword: "cost camera RMN",
    secondaryKeywords: ["amenajare camera RMN", "infrastructura RMN", "camera RMN la cheie", "RF shielding RMN"],
    category: "Infrastructura RMN",
    project: "O camera RMN",
    equipment:
      "Echipamentul RMN impune cerinte de camera, acces, mediu, zone de siguranta si service",
    infrastructure:
      "Camera RMN combina RF shielding, HVAC, acces, electric, finisaje, camera tehnica si coordonare cu furnizorul",
    compliance:
      "Validarea depinde de cerintele echipamentului, testare RF si documentele tehnice ale proiectului",
    service:
      "Service-ul si mentenanta trebuie sa fie posibile fara interventii costisitoare in camera finalizata",
    budgetRange:
      "Costul camerei variaza de la lucrari medii la investitii complexe, in functie de cladire si echipament",
    risk:
      "Riscurile sunt accesul magnetului, HVAC insuficient, ecranare incompleta si coordonare tarzie",
    primaryTool: { label: "Calculeaza camera RMN", href: "/calculatoare/cost-camera-rmn" },
    links: {
      services: [
        { label: "Camera RMN la cheie", href: "/servicii/camera-rmn-la-cheie" },
        { label: "RF shielding RMN", href: "/servicii/rf-shielding-rmn" },
        { label: "Service RMN", href: "/servicii/service-rmn" },
      ],
      tools: [{ label: "Spatiu minim RMN", href: "/calculatoare/spatiu-minim-rmn" }],
      articles: [{ label: "Checklist camera RMN", href: "/glosar/checklist-camera-rmn-inainte-instalare" }],
    },
  },
  {
    slug: "cost-centru-imagistica",
    title: "Cost centru imagistica: buget pentru RMN, CT, RX si operare",
    description:
      "Business case pentru centru de imagistica: echipamente, camere, radioprotectie, RF shielding, PACS, service, buget si ROI.",
    targetKeyword: "cost centru imagistica",
    secondaryKeywords: ["buget centru imagistica", "investitie centru imagistica", "deschidere centru imagistica", "ROI imagistica"],
    category: "Business case imagistica",
    project: "Un centru de imagistica",
    equipment:
      "Un centru de imagistica poate combina RMN, CT, RX, mamografie, ecografie, PACS si statii de lucru, fiecare cu buget separat",
    infrastructure:
      "Infrastructura include camere dedicate, fluxuri, receptie, zone de asteptare, utilitati, IT, radioprotectie si RF shielding",
    compliance:
      "Documentatia trebuie pregatita pe fiecare modalitate si coordonata cu cerintele de radioprotectie, siguranta si operare",
    service:
      "Service-ul multi-echipament si mentenanta preventiva sunt esentiale pentru continuitate si protectia veniturilor",
    budgetRange:
      "Bugetul total poate varia de la sute de mii de euro la peste doua milioane de euro, in functie de mixul de echipamente",
    risk:
      "Riscul major este planificarea pe echipamente separate, fara business case pentru flux, service si venituri",
    primaryTool: { label: "Calculeaza investitia", href: "/calculatoare/investitie-centru-imagistica" },
    links: {
      services: [
        { label: "Infrastructura imagistica", href: "/servicii/infrastructura-imagistica" },
        { label: "PACS medical", href: "/servicii/pacs-medical" },
        { label: "Mentenanta echipamente medicale", href: "/servicii/mentenanta-echipamente-medicale" },
      ],
      tools: [{ label: "Flux pacienti imagistica", href: "/calculatoare/flux-pacienti-imagistica" }],
      articles: [{ label: "Amenajare centre imagistica", href: "/amenajare-centre-imagistica" }],
    },
  },
  {
    slug: "buget-clinica-radiologie",
    title: "Buget clinica radiologie: camera RX, echipament si autorizari",
    description:
      "Buget pentru clinica de radiologie: aparat RX, camera radiologie, radioprotectie, CNCAN, PACS, service si costuri de operare.",
    targetKeyword: "buget clinica radiologie",
    secondaryKeywords: ["cost clinica radiologie", "deschidere radiologie", "camera RX buget", "radiologie digitala investitie"],
    category: "Business case radiologie",
    project: "O clinica de radiologie",
    equipment:
      "Radiologia necesita aparat RX, detector, statie, software, PACS si accesorii alese dupa fluxul clinic",
    infrastructure:
      "Camera radiologie include plumbare, flux pacient, camera de comanda, finisaje, electric si acces pentru service",
    compliance:
      "Statusul CNCAN, planul camerei si radioprotectia influenteaza semnificativ calendarul si bugetul",
    service:
      "Service-ul RX si mentenanta detectorului trebuie incluse in bugetul operational, nu lasate pentru urgente",
    budgetRange:
      "Bugetul poate fi mediu sau mare, in functie de nivelul echipamentului, lucrari si integrare digitala",
    risk:
      "Riscurile sunt plumbare incompleta, documentatie neclara, detector subdimensionat si lipsa contractului de service",
    primaryTool: { label: "Calculeaza radioprotectia", href: "/calculatoare/radioprotectie" },
    links: {
      services: [
        { label: "Amenajare camera radiologie", href: "/servicii/amenajare-camera-radiologie" },
        { label: "Placare plumb camera RX", href: "/servicii/placare-plumb-camera-rx" },
        { label: "Service radiologie", href: "/servicii/service-radiologie" },
      ],
      tools: [{ label: "Infrastructura radiologie", href: "/calculatoare/infrastructura-radiologie-estimare" }],
      articles: [{ label: "Autorizare CNCAN camera RX", href: "/autorizare-cncan-camera-rx" }],
    },
  },
  {
    slug: "roi-centru-imagistica",
    title: "ROI centru imagistica: cum se evalueaza recuperarea investitiei",
    description:
      "Analiza ROI pentru centre de imagistica: investitie initiala, volum pacienti, downtime, service, tarife, mix de echipamente si risc.",
    targetKeyword: "ROI centru imagistica",
    secondaryKeywords: ["rentabilitate centru imagistica", "business plan imagistica", "investitie imagistica ROI", "venituri centru imagistica"],
    category: "Business case imagistica",
    project: "ROI-ul unui centru de imagistica",
    equipment:
      "Mixul de echipamente influenteaza veniturile: RMN, CT, RX, mamografie si ecografie au costuri si ritmuri operationale diferite",
    infrastructure:
      "Infrastructura influenteaza productivitatea prin flux, programari, uptime, acces pacient si viteza de operare",
    compliance:
      "Autorizarea si documentatia pot afecta data de lansare, iar fiecare luna de intarziere modifica recuperarea investitiei",
    service:
      "Service-ul si mentenanta influenteaza direct ROI-ul, pentru ca downtime-ul reduce veniturile si poate afecta reputatia",
    budgetRange:
      "Analiza ROI trebuie sa lege investitia initiala de venituri, costuri lunare, service, amortizare si scenarii de ocupare",
    risk:
      "Riscul major este estimarea veniturilor fara a calcula downtime, sezonalitate, personal, marketing si costuri de suport",
    primaryTool: { label: "Calculeaza investitia", href: "/calculatoare/investitie-centru-imagistica" },
    links: {
      services: [
        { label: "Infrastructura imagistica", href: "/servicii/infrastructura-imagistica" },
        { label: "Contract mentenanta radiologie", href: "/servicii/contract-mentenanta-radiologie" },
        { label: "Diagnostic la distanta", href: "/servicii/diagnostic-la-distanta" },
      ],
      tools: [{ label: "Flux pacienti imagistica", href: "/calculatoare/flux-pacienti-imagistica" }],
      articles: [{ label: "Cost centru imagistica", href: "/ghiduri/cost-centru-imagistica" }],
    },
  },
];

export const investmentSeoClusters = specs.map(buildInvestmentCluster);
