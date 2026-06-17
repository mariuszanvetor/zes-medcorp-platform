export type SeoClusterLink = {
  label: string;
  href: string;
};

export type SeoClusterSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type SeoClusterFAQ = {
  question: string;
  answer: string;
};

export type SeoClusterCTA = {
  title: string;
  description: string;
  label: string;
  href: string;
};

export type SeoCluster = {
  slug: string;
  title: string;
  description: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  category: string;
  intro: string;
  sections: SeoClusterSection[];
  faq: SeoClusterFAQ[];
  relatedServices: SeoClusterLink[];
  relatedTools: SeoClusterLink[];
  relatedArticles: SeoClusterLink[];
  cta: SeoClusterCTA;
};

import { investmentSeoClusters } from "@/data/investment-seo-clusters";

const defaultProposalCta: SeoClusterCTA = {
  title: "Ai nevoie de o direcție tehnică înainte de buget?",
  description:
    "Pregătește o discuție mai clară: servicii posibile, buget orientativ, calendar, riscuri și informații care lipsesc.",
  label: "Pregătește o propunere preliminară",
  href: "/proposal-builder",
};

const baseSeoClusters: SeoCluster[] = [
  {
    slug: "cost-clinica-medicala",
    title: "Cost clinică medicală: ce influențează investiția reală",
    description:
      "Ghid practic pentru estimarea investiției într-o clinică medicală: spațiu, DSP, amenajări, aparatură, imagistică, IVD, service și timeline.",
    targetKeyword: "cost clinică medicală",
    secondaryKeywords: [
      "construcție clinică medicală",
      "amenajare clinică medicală",
      "buget clinică medicală",
      "aparatură medicală clinică",
    ],
    category: "Infrastructură medicală",
    intro:
      "Costul unei clinici medicale nu este determinat doar de metri pătrați și finisaje. Investiția reală depinde de fluxuri, DSP, instalații, aparatură, imagistică, laborator, integrare, mentenanță și nivelul de coordonare tehnică. O estimare serioasă începe cu întrebarea: ce trebuie să poată face clinica în prima zi de operare?",
    sections: [
      {
        title: "Ce intră într-o estimare realistă",
        body: [
          "O clinică medicală are costuri directe, vizibile, dar și costuri tehnice care apar dacă aparatura este aleasă târziu sau dacă fluxurile nu sunt corelate cu cerințele DSP. Compartimentările, pardoselile, pereții, instalațiile electrice, HVAC-ul, datele, apa, gazele medicale și zonele suport trebuie privite împreună.",
          "Aparatura medicală poate influența bugetul mai mult decât amenajarea. Un centru cu imagistică, ecografie, IVD sau laborator va avea o structură de cost diferită de un cabinet simplu. De aceea, ZES tratează proiectul ca infrastructură medicală plus tehnologie, nu doar ca lucrare de amenajare.",
        ],
        bullets: [
          "suprafață și starea spațiului existent",
          "specialități medicale și fluxuri pacient / personal",
          "aparatură, imagistică, IVD și service",
          "cerințe DSP, radiologie sau protecție specializată",
        ],
      },
      {
        title: "Factorii care schimbă bugetul",
        body: [
          "Bugetul crește când proiectul include radiologie, RMN, CT, laborator, zone sterile, circuite complexe sau modernizarea unui spațiu nemedical. Spațiile existente pot părea avantajoase, dar pot ascunde limitări de structură, alimentare electrică, HVAC, trasee și acces pentru echipamente.",
          "Un alt factor critic este momentul în care se aleg echipamentele. Dacă aparatura este decisă după execuție, pot apărea refaceri de instalații, uși, trasee sau camere tehnice. O clinică bine planificată blochează cerințele principale înainte de bugetul final.",
        ],
      },
      {
        title: "Greșeli frecvente",
        body: [
          "Cea mai frecventă greșeală este estimarea proiectului doar prin cost pe metru pătrat. În medical, metrul pătrat nu spune suficient fără fluxuri, echipamente, autorizări și cerințe de operare. Două clinici de aceeași suprafață pot avea bugete radical diferite.",
          "A doua greșeală este separarea construcției de aparatură. În realitate, aparatura cere alimentare, date, HVAC, spațiu, acces, testare și service. Dacă aceste cerințe nu sunt incluse în propunerea inițială, costul apare mai târziu, de obicei în momentul cel mai incomod.",
        ],
      },
      {
        title: "Când să contactezi ZES",
        body: [
          "ZES este util înainte de bugetarea finală, mai ales când proiectul include mai multe specialități, aparatură, radiologie, IVD sau modernizarea unui spațiu existent. O analiză tehnică timpurie poate clarifica serviciile necesare și riscurile care trebuie bugetate separat.",
          "Pentru o primă orientare, poți folosi Consultantul AI, Calculatorul de proiect medical sau Proposal Builder. Rezultatul nu înlocuiește o ofertă tehnică, dar poate face discuția cu echipa ZES mai concretă.",
        ],
      },
    ],
    faq: [
      {
        question: "Se poate estima o clinică doar după suprafață?",
        answer:
          "Doar foarte aproximativ. Suprafața este importantă, dar aparatura, fluxurile, instalațiile, DSP și eventualele zone de radiologie sau laborator pot schimba major bugetul.",
      },
      {
        question: "Când trebuie aleasă aparatura medicală?",
        answer:
          "Ideal înainte de proiectarea finală, deoarece echipamentele influențează alimentarea, HVAC-ul, datele, accesul, spațiul și service-ul.",
      },
      {
        question: "DSP influențează costul?",
        answer:
          "Da. DSP poate influența compartimentarea, fluxurile, finisajele, instalațiile și documentația necesară pentru funcționare.",
      },
      {
        question: "ZES poate ajuta cu o abordare turnkey?",
        answer:
          "Da, ZES poate coordona infrastructură, aparatură, imagistică, IVD, ecranare, integrare și service în funcție de proiect.",
      },
    ],
    relatedServices: [
      { label: "Construcții medicale", href: "/services/constructii-medicale" },
      { label: "Aparatură medicală", href: "/services/aparatura-medicala" },
      { label: "IVD / laborator", href: "/services/ivd-laborator" },
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      {
        label: "Cum se construiește o clinică medicală în România",
        href: "/knowledge-hub/cum-se-construieste-o-clinica-medicala-in-romania",
      },
      {
        label: "Cum alegi aparatura medicală pentru o clinică",
        href: "/knowledge-hub/cum-alegi-aparatura-medicala-pentru-o-clinica",
      },
    ],
    cta: defaultProposalCta,
  },
  {
    slug: "cost-camera-rmn",
    title: "Cost cameră RMN: RF shielding, integrare și cerințe tehnice",
    description:
      "Ce influențează costul unei camere RMN: cușcă Faraday, RF shielding, HVAC, vibrații, acces magnet, integrare echipament și service.",
    targetKeyword: "cost cameră RMN",
    secondaryKeywords: [
      "RF shielding RMN",
      "cușcă Faraday RMN",
      "amenajare cameră RMN",
      "integrare RMN",
    ],
    category: "RF shielding",
    intro:
      "O cameră RMN este un proiect de infrastructură medicală specializată. Costul nu este dat doar de amenajare, ci de RF shielding, cușcă Faraday, ușă RF, filtre, penetrări, HVAC, vibrații, acces magnet, integrare aparatură și testare. RMN-ul nu trebuie confundat cu CT/RX: problema critică este interferența electromagnetică, nu protecția cu plumb.",
    sections: [
      {
        title: "Ce include o cameră RMN",
        body: [
          "Pentru RMN, camera trebuie să susțină performanța echipamentului. Asta înseamnă o incintă RF coerentă, adesea descrisă ca o cușcă Faraday, cu continuitate, ușă RF, filtre, waveguides și penetrări controlate. Fiecare trecere prin sistemul RF trebuie tratată atent.",
          "Pe lângă RF shielding, proiectul trebuie să includă HVAC, condiții de temperatură și umiditate, trasee, quench pipe unde este cazul, acces pentru livrare, zone de siguranță și service. Dacă aceste elemente sunt descoperite târziu, costul și timeline-ul cresc.",
        ],
        bullets: [
          "RF shielding / cușcă Faraday",
          "ușă RF, filtre, waveguides și penetrări",
          "HVAC, vibrații, acces magnet și service",
          "integrare cu furnizorul echipamentului RMN",
        ],
      },
      {
        title: "Ce afectează costul",
        body: [
          "Dimensiunea camerei, tipul echipamentului, cerințele furnizorului, starea clădirii și traseele tehnice influențează bugetul. O cameră RMN într-un spațiu existent poate necesita modificări semnificative dacă accesul, structura sau instalațiile nu au fost gândite pentru magnet.",
          "Costul RF shielding-ului depinde de suprafețe, detalii de execuție, numărul de penetrări, calitatea ușii RF, filtre și testare. Nu este recomandat să fie tratat ca un simplu finisaj, deoarece performanța camerei depinde de integritatea întregului sistem.",
        ],
      },
      {
        title: "Greșeli de evitat",
        body: [
          "Prima greșeală este confuzia dintre RF shielding și ecranarea cu plumb. RMN-ul nu folosește radiații ionizante, deci plumbul nu rezolvă problema principală. RF shielding-ul controlează interferențele electromagnetice și este o disciplină separată.",
          "A doua greșeală este proiectarea camerei fără cerințele furnizorului RMN. Datele despre acces, HVAC, vibrații, trasee și testare trebuie integrate înainte de execuție. Altfel, camera poate arăta finalizată, dar să nu fie pregătită tehnic pentru echipament.",
        ],
      },
      {
        title: "Cum începi corect",
        body: [
          "Începe cu tipul de echipament, fișa tehnică, spațiul disponibil și restricțiile clădirii. Apoi verifică RF shielding-ul, HVAC-ul, accesul și zonele tehnice. Abia după aceste clarificări estimarea poate deveni mai realistă.",
          "Radiology Room Planner și Proposal Builder pot structura primele ipoteze, dar validarea finală trebuie făcută tehnic. ZES poate ajuta la separarea cerințelor RMN de cerințele CT/RX și la coordonarea camerei cu aparatura.",
        ],
      },
    ],
    faq: [
      {
        question: "RMN are nevoie de ecranare cu plumb?",
        answer:
          "În mod obișnuit, nu. RMN-ul are nevoie de RF shielding pentru interferențe electromagnetice, nu de plumb pentru radiații ionizante.",
      },
      {
        question: "Ce este cușca Faraday pentru RMN?",
        answer:
          "Este sistemul conductiv care protejează camera RMN de interferențe RF și include pereți, ușă RF, filtre, waveguides și penetrări controlate.",
      },
      {
        question: "HVAC-ul influențează costul camerei RMN?",
        answer:
          "Da. Temperatură, umiditate, răcire, trasee și cerințe de instalare pot influența bugetul și calendarul.",
      },
      {
        question: "Când se validează RF shielding-ul?",
        answer:
          "Înainte de execuție și apoi prin testare, conform cerințelor tehnice ale echipamentului și proiectului.",
      },
    ],
    relatedServices: [
      { label: "RF shielding pentru RMN", href: "/services/rf-shielding" },
      { label: "Imagistică medicală", href: "/services/imagistica-medicala" },
      { label: "Radiologie", href: "/services/radiologie" },
    ],
    relatedTools: [
      { label: "Calculator cost cameră RMN", href: "/calculatoare/cost-camera-rmn" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      {
        label: "Diferența dintre RF shielding și ecranarea cu plumb",
        href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      },
      {
        label: "Greșeli critice în proiectarea camerelor RMN",
        href: "/knowledge-hub/greseli-critice-in-proiectarea-camerelor-rmn",
      },
    ],
    cta: defaultProposalCta,
  },
  {
    slug: "cost-camera-ct",
    title: "Cost cameră CT: protecție radiologică, CNCAN și integrare",
    description:
      "Ghid pentru estimarea unei camere CT: protecție radiologică, ecranare cu plumb, zone controlate, CNCAN, layout, instalații și aparatură.",
    targetKeyword: "cost cameră CT",
    secondaryKeywords: [
      "amenajare cameră CT",
      "protecție radiologică CT",
      "ecranare cu plumb CT",
      "autorizare CNCAN CT",
    ],
    category: "Protecție radiologică",
    intro:
      "O cameră CT are cerințe tehnice diferite de o cameră RMN. Costul este influențat de echipament, layout, protecție radiologică, pereți sau uși protejate, sticlă plumbată, zone controlate, CNCAN, instalații și integrare. RF shielding-ul nu este tema centrală pentru CT; discuția principală este protecția la radiații ionizante.",
    sections: [
      {
        title: "Ce include planificarea unei camere CT",
        body: [
          "Planificarea începe cu echipamentul CT, poziția mesei, pupitrul operatorului, accesul pacientului, vecinătățile și fluxurile. Aceste date influențează protecția radiologică și modul în care se tratează pereții, ușile, geamurile și eventualele penetrări tehnice.",
          "CNCAN trebuie gândit devreme, nu la final. Documentația, zonele controlate și protecția radiologică trebuie corelate cu execuția. Dacă se construiește înainte de validarea acestor elemente, pot apărea refaceri costisitoare.",
        ],
        bullets: [
          "layout cameră CT și poziție operator",
          "protecție radiologică / plumb",
          "zone controlate și documentație CNCAN",
          "integrare aparatură, HVAC, alimentare și date",
        ],
      },
      {
        title: "Ce schimbă bugetul",
        body: [
          "Costul poate crește în funcție de vecinătăți, suprafețe protejate, tipul ușilor, sticla plumbată, complexitatea instalațiilor și starea spațiului existent. O cameră într-o clădire nemedicală poate avea costuri suplimentare pentru adaptarea traseelor, structurii și fluxurilor.",
          "Aparatura CT influențează alimentarea, răcirea, datele, service-ul și accesul pentru instalare. O estimare fără fișa echipamentului și fără analiza vecinătăților este doar orientativă.",
        ],
      },
      {
        title: "Greșeli frecvente",
        body: [
          "O greșeală frecventă este tratarea camerei CT ca simplă încăpere finisată. În realitate, camera trebuie proiectată în jurul echipamentului și al protecției radiologice. Pereții, ușile, sticla, traseele și fluxurile au rol tehnic.",
          "A doua greșeală este confuzia cu RMN-ul. CT-ul are nevoie de protecție radiologică și CNCAN, nu de cușcă Faraday pentru RF shielding, cu excepția unor situații speciale care trebuie justificate separat.",
        ],
      },
      {
        title: "Când să contactezi ZES",
        body: [
          "Contactează ZES înainte de execuție sau înainte de achiziția finală a echipamentului. O verificare tehnică poate clarifica protecția radiologică, cerințele CNCAN, layout-ul și riscurile de integrare.",
          "Radiology Room Planner poate oferi o primă triere, iar Proposal Builder poate transforma datele într-o propunere preliminară cu faze, buget orientativ și riscuri.",
        ],
      },
    ],
    faq: [
      {
        question: "Camera CT are nevoie de RF shielding?",
        answer:
          "În mod uzual, nu. CT-ul are nevoie de protecție radiologică pentru radiații ionizante și de coordonare CNCAN.",
      },
      {
        question: "Ce înseamnă ecranare cu plumb pentru CT?",
        answer:
          "Poate include pereți, uși sau sticlă plumbată, în funcție de calcul, echipament, layout și vecinătăți.",
      },
      {
        question: "CNCAN influențează calendarul?",
        answer:
          "Da. Documentația și cerințele CNCAN trebuie integrate devreme pentru a evita întârzieri sau refaceri.",
      },
      {
        question: "Se poate estima costul fără echipament ales?",
        answer:
          "Se poate doar orientativ. Fișa echipamentului și layout-ul sunt esențiale pentru o estimare tehnică mai bună.",
      },
    ],
    relatedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "Protecție radiologică", href: "/services/protectie-radiologica" },
      { label: "Imagistică medicală", href: "/services/imagistica-medicala" },
    ],
    relatedTools: [
      { label: "Calculator cost cameră CT", href: "/calculatoare/cost-camera-ct" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      {
        label: "Ce trebuie să știi despre autorizarea CNCAN",
        href: "/knowledge-hub/ce-trebuie-sa-stii-despre-autorizarea-cncan",
      },
      {
        label: "Costuri în amenajarea unei camere de radiologie",
        href: "/knowledge-hub/costuri-in-amenajarea-unei-camere-de-radiologie",
      },
    ],
    cta: defaultProposalCta,
  },
  {
    slug: "autorizare-dsp",
    title: "Autorizare DSP pentru proiecte medicale: ce trebuie planificat",
    description:
      "Ghid pentru proiecte medicale care au nevoie de clarificări DSP: fluxuri, compartimentare, finisaje, instalații, documentație și riscuri.",
    targetKeyword: "autorizare DSP clinică medicală",
    secondaryKeywords: [
      "DSP proiect medical",
      "autorizare clinică medicală",
      "amenajare medicală DSP",
      "fluxuri medicale DSP",
    ],
    category: "Autorizări",
    intro:
      "DSP influențează modul în care un spațiu medical este gândit, compartimentat și pregătit pentru funcționare. Nu este doar o etapă administrativă de final. Fluxurile, destinațiile, finisajele, instalațiile, circuitele și documentația trebuie aliniate înainte de execuție.",
    sections: [
      {
        title: "Ce privește DSP într-un proiect medical",
        body: [
          "DSP privește funcționarea spațiului medical, circuitele, condițiile igienico-sanitare și documentația necesară pentru activitatea medicală. În practică, cerințele pot influența compartimentarea, fluxurile pacient / personal, zonele suport, finisajele și instalațiile.",
          "Pentru un proiect coerent, DSP trebuie discutat din faza de concept. Dacă proiectarea sau execuția avansează înainte de clarificarea fluxurilor, apar riscuri de modificări, întârzieri și costuri suplimentare.",
        ],
        bullets: [
          "destinații medicale și specialități",
          "fluxuri pacient, personal, materiale și zone suport",
          "finisaje, igienă, ventilație și instalații",
          "documentație și corelare cu proiectarea",
        ],
      },
      {
        title: "DSP versus CNCAN",
        body: [
          "DSP și CNCAN nu sunt același lucru. DSP privește cadrul medical și sanitar al spațiului. CNCAN devine relevant pentru activități cu radiații ionizante, precum CT, RX sau fluoroscopie. Un proiect cu radiologie poate avea nevoie de coordonarea ambelor zone.",
          "Pentru RMN, discuția critică este RF shielding-ul, nu CNCAN pentru radiații ionizante. Totuși, spațiul RMN face parte dintr-un proiect medical și poate avea implicații DSP prin fluxuri, amplasare și condiții de funcționare.",
        ],
      },
      {
        title: "Greșeli care duc la întârzieri",
        body: [
          "Cea mai frecventă greșeală este proiectarea spațiului ca birou sau retail, apoi încercarea de adaptare la cerințe medicale. A doua este alegerea aparaturii după compartimentare, fără a verifica dacă spațiul susține fluxul și instalațiile necesare.",
          "O altă greșeală este tratarea DSP separat de buget. Dacă cerințele de flux, finisaj sau instalații apar târziu, costul proiectului se schimbă. De aceea, analiza tehnică inițială trebuie să includă și perspectiva de autorizare.",
        ],
      },
      {
        title: "Cum ajută ZES",
        body: [
          "ZES poate ajuta la structurarea cerințelor tehnice înainte de execuție: funcțiuni, fluxuri, aparatură, radiologie, IVD, service și riscuri. Scopul este ca proiectul să fie planificat ca infrastructură medicală, nu doar ca amenajare.",
          "Pentru început, Consultantul AI sau Proposal Builder pot genera o primă structură de întrebări, servicii și date lipsă. Pentru validare, este necesară o analiză tehnică aplicată proiectului real.",
        ],
      },
    ],
    faq: [
      {
        question: "DSP trebuie discutat înainte de execuție?",
        answer:
          "Da. Cerințele DSP pot influența compartimentarea, finisajele, instalațiile, fluxurile și documentația proiectului.",
      },
      {
        question: "DSP este același lucru cu CNCAN?",
        answer:
          "Nu. DSP privește cadrul medical și sanitar, iar CNCAN privește activități cu radiații ionizante.",
      },
      {
        question: "Aparatura medicală influențează DSP?",
        answer:
          "Poate influența fluxurile, destinațiile, instalațiile și modul de folosire a spațiului, deci trebuie corelată devreme.",
      },
      {
        question: "ZES oferă autorizare finală?",
        answer:
          "ZES poate susține planificarea tehnică și coordonarea proiectului, dar validările finale depind de documentația și procedurile aplicabile.",
      },
    ],
    relatedServices: [
      { label: "Construcții medicale", href: "/services/constructii-medicale" },
      { label: "Amenajări medicale", href: "/services/amenajari-medicale" },
      { label: "Aparatură medicală", href: "/services/aparatura-medicala" },
    ],
    relatedTools: [
      { label: "Calculator cost laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      {
        label: "DSP vs CNCAN: diferențe pentru proiecte medicale",
        href: "/knowledge-hub/dsp-vs-cncan-diferente-pentru-proiecte-medicale",
      },
      {
        label: "Cum se construiește o clinică medicală în România",
        href: "/knowledge-hub/cum-se-construieste-o-clinica-medicala-in-romania",
      },
    ],
    cta: defaultProposalCta,
  },
  {
    slug: "autorizare-cncan",
    title: "Autorizare CNCAN pentru radiologie: CT, RX și protecție radiologică",
    description:
      "Ghid pentru proiecte cu CT, RX sau fluoroscopie: CNCAN, zone controlate, protecție radiologică, plumb și diferența față de RF shielding.",
    targetKeyword: "autorizare CNCAN radiologie",
    secondaryKeywords: [
      "CNCAN CT",
      "CNCAN RX",
      "protecție radiologică",
      "ecranare cu plumb",
    ],
    category: "Protecție radiologică",
    intro:
      "CNCAN este relevant pentru proiecte care implică radiații ionizante, cum sunt CT, RX sau fluoroscopie. Nu trebuie confundat cu RF shielding-ul pentru RMN, care privește interferențele electromagnetice. În radiologie, autorizarea și protecția trebuie planificate înainte de execuție.",
    sections: [
      {
        title: "Când apare CNCAN",
        body: [
          "CNCAN apare în proiecte cu echipamente sau activități care implică radiații ionizante. Pentru camere CT sau RX, discuția include protecție radiologică, zone controlate, vecinătăți, documentație și soluții constructive.",
          "Cerințele trebuie integrate în layout. Poziția echipamentului, a operatorului, a ușilor, a geamurilor și a pereților poate influența protecția. Dacă aceste decizii sunt luate după execuție, riscul de refaceri crește.",
        ],
        bullets: [
          "CT, RX, fluoroscopie și radiații ionizante",
          "zone controlate și vecinătăți",
          "protecție radiologică / plumb",
          "documentație corelată cu layout-ul",
        ],
      },
      {
        title: "CNCAN nu înseamnă RF shielding",
        body: [
          "O clarificare strategică: CNCAN nu se aplică RF shielding-ului în sine. RF shielding-ul este relevant pentru RMN, unde se discută despre cușcă Faraday, EMI, filtre și integritate RF. Protecția radiologică este relevantă pentru CT/RX, unde se discută despre radiații ionizante.",
          "Confuzia dintre cele două poate duce la soluții greșite. O cameră RMN nu devine performantă prin plumb, iar o cameră CT nu rezolvă protecția radiologică prin cușcă Faraday.",
        ],
      },
      {
        title: "Ce afectează calendarul",
        body: [
          "Calendarul este afectat de stadiul documentației, claritatea echipamentului, calculul de protecție, vecinătăți, spațiul existent și coordonarea cu execuția. Un proiect început fără aceste date poate părea rapid, dar devine lent când apar ajustările.",
          "Integrarea CNCAN în calendar nu înseamnă oprirea proiectului, ci planificarea realistă a deciziilor. Cu cât echipamentul și layout-ul sunt mai clare, cu atât riscul de blocaj este mai mic.",
        ],
      },
      {
        title: "Cum poate începe beneficiarul",
        body: [
          "Beneficiarul ar trebui să pregătească tipul echipamentului, planul camerei, vecinătățile, destinația spațiilor și stadiul proiectului. Aceste informații ajută la o primă analiză tehnică și la identificarea riscurilor.",
          "Radiology Room Planner poate separa primele riscuri CT/RX de riscurile RMN. Pentru o propunere mai amplă, Proposal Builder poate structura bugetul orientativ, fazele și datele lipsă.",
        ],
      },
    ],
    faq: [
      {
        question: "CNCAN se aplică pentru RMN?",
        answer:
          "RMN-ul nu folosește radiații ionizante. Pentru RMN, tema critică este RF shielding-ul, nu protecția radiologică cu plumb.",
      },
      {
        question: "CT și RX au nevoie de protecție radiologică?",
        answer:
          "Da. Camerele CT/RX trebuie analizate pentru protecție radiologică, zone controlate și documentație relevantă.",
      },
      {
        question: "Când trebuie începută discuția CNCAN?",
        answer:
          "Înainte de proiectarea finală și înainte de execuția elementelor constructive de protecție.",
      },
      {
        question: "ZES poate ajuta cu planificarea CNCAN?",
        answer:
          "ZES poate ajuta la structurarea tehnică a camerei, protecției radiologice, aparaturii și riscurilor de proiect.",
      },
    ],
    relatedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "Protecție radiologică", href: "/services/protectie-radiologica" },
      { label: "Imagistică medicală", href: "/services/imagistica-medicala" },
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      {
        label: "Ce trebuie să știi despre autorizarea CNCAN",
        href: "/knowledge-hub/ce-trebuie-sa-stii-despre-autorizarea-cncan",
      },
      {
        label: "Diferența dintre RF shielding și ecranarea cu plumb",
        href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      },
    ],
    cta: defaultProposalCta,
  },
  {
    slug: "amenajare-radiologie",
    title: "Amenajare radiologie: CT, RMN, RX, ecranare și integrare",
    description:
      "Ghid pentru amenajarea camerelor de radiologie și imagistică: CT/RX cu protecție radiologică, RMN cu RF shielding, aparatură și autorizări.",
    targetKeyword: "amenajare radiologie",
    secondaryKeywords: [
      "amenajare cameră CT",
      "amenajare cameră RMN",
      "cameră RX",
      "radiologie CNCAN",
    ],
    category: "Radiologie",
    intro:
      "Amenajarea unei zone de radiologie nu este un pachet unic. CT/RX implică protecție radiologică, plumb și CNCAN. RMN implică RF shielding, cușcă Faraday și cerințe de mediu. O planificare bună separă aceste logici, dar le coordonează în același proiect medical.",
    sections: [
      {
        title: "Începe cu echipamentul",
        body: [
          "Tipul echipamentului dictează camera. Un CT, un RX și un RMN nu au aceleași cerințe de layout, ecranare, instalații sau autorizare. Alegerea sau cel puțin restrângerea opțiunii tehnice trebuie făcută înainte de blocarea compartimentării.",
          "Furnizorul aparaturii oferă cerințe de alimentare, răcire, date, acces, greutate, service și instalare. Aceste date trebuie integrate în proiect, altfel amenajarea poate deveni incompatibilă cu echipamentul ales.",
        ],
        bullets: [
          "CT/RX: protecție radiologică și CNCAN",
          "RMN: RF shielding și cușcă Faraday",
          "ecografie: integrare aparatură și flux clinic",
          "service: acces și mentenanță din faza de proiect",
        ],
      },
      {
        title: "CT/RX versus RMN",
        body: [
          "Pentru CT/RX, protecția radiologică este tema principală. Se discută despre pereți, uși, sticlă plumbată, zone controlate, vecinătăți și documentație CNCAN. Obiectivul este siguranța radiologică și conformitatea proiectului.",
          "Pentru RMN, discuția este diferită: RF shielding, ușă RF, filtre, waveguides, penetrări, vibrații, HVAC și acces magnet. Plumbul nu rezolvă interferențele RF. Această separare previne soluții greșite și costuri inutile.",
        ],
      },
      {
        title: "Ce afectează amenajarea",
        body: [
          "Spațiul existent, vecinătățile, structura, alimentarea, HVAC-ul și accesul pot schimba semnificativ proiectul. În clădiri nemedicale, conversia poate fi mai dificilă decât pare, mai ales dacă echipamentul este mare sau are cerințe speciale.",
          "Timeline-ul este influențat de documentație, furnizori, autorizări și testare. O cameră de radiologie trebuie gândită pentru instalare, operare și service, nu doar pentru recepția lucrării.",
        ],
      },
      {
        title: "Cum ajută ZES",
        body: [
          "ZES poate structura amenajarea radiologiei ca proiect integrat: infrastructură, ecranare, aparatură, autorizări, testare și service. Scopul este reducerea riscului de incompatibilitate între cameră și echipament.",
          "Pentru prima triere, Radiology Room Planner este cel mai potrivit. Pentru o estimare mai largă a proiectului, Proposal Builder poate genera faze, buget orientativ și risc tehnic.",
        ],
      },
    ],
    faq: [
      {
        question: "Amenajarea RMN este la fel cu CT?",
        answer:
          "Nu. RMN are RF shielding și cerințe de mediu, iar CT are protecție radiologică și CNCAN.",
      },
      {
        question: "Radiologia trebuie planificată înainte de execuție?",
        answer:
          "Da. Echipamentul, ecranarea, instalațiile și autorizările pot schimba layout-ul camerei.",
      },
      {
        question: "Ce se întâmplă dacă aparatura este cumpărată târziu?",
        answer:
          "Pot apărea modificări de instalații, acces, ecranare sau layout, ceea ce crește costul și durata.",
      },
      {
        question: "ZES poate integra și aparatura?",
        answer:
          "Da, ZES poziționează radiologia ca infrastructură plus aparatură, integrare și service.",
      },
    ],
    relatedServices: [
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "RF shielding", href: "/services/rf-shielding" },
      { label: "Protecție radiologică", href: "/services/protectie-radiologica" },
    ],
    relatedTools: [
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      {
        label: "Costuri în amenajarea unei camere de radiologie",
        href: "/knowledge-hub/costuri-in-amenajarea-unei-camere-de-radiologie",
      },
      {
        label: "Imagistică medicală: CT, RMN, RX și integrare tehnică",
        href: "/knowledge-hub/imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
      },
    ],
    cta: defaultProposalCta,
  },
  {
    slug: "echipamente-ivd-laborator",
    title: "Echipamente IVD și laborator: selecție, integrare și service",
    description:
      "Ghid pentru alegerea și integrarea echipamentelor IVD/laborator: flux probe, utilități, calibrare, QC, service și mentenanță.",
    targetKeyword: "echipamente IVD laborator",
    secondaryKeywords: [
      "aparatură laborator medical",
      "echipamente laborator clinic",
      "integrare IVD",
      "service IVD",
    ],
    category: "IVD / laborator",
    intro:
      "Echipamentele IVD și de laborator nu trebuie cumpărate separat de infrastructură. Fluxul probelor, volumul estimat, utilitățile, consumabilele, calibrarea, controlul calității, service-ul și mentenanța influențează alegerea echipamentelor și amenajarea spațiului.",
    sections: [
      {
        title: "Ce trebuie clarificat înainte de achiziție",
        body: [
          "Un laborator medical trebuie dimensionat în funcție de tipurile de analize, volum, flux probe, personal, zone de recepție, prelucrare, depozitare și evacuare. Echipamentul ales trebuie să susțină aceste fluxuri, nu invers.",
          "Înainte de achiziție trebuie verificate alimentarea, apa, evacuarea, temperaturile, reactivii, consumabilele, spațiul de service și cerințele de calibrare. O alegere făcută doar pe fișa comercială poate genera costuri de integrare neprevăzute.",
        ],
        bullets: [
          "tipuri de analize și volum estimat",
          "flux probe, zone suport și consumabile",
          "utilități, temperatură și condiții de mediu",
          "calibrare, QC, service și mentenanță",
        ],
      },
      {
        title: "Ce influențează bugetul",
        body: [
          "Bugetul este influențat de numărul de echipamente, nivelul de automatizare, necesarul de consumabile, integrarea cu spațiul, cerințele de service și eventualele adaptări de infrastructură. Uneori, costul de integrare este subestimat față de costul de achiziție.",
          "Pentru proiectele care includ și clinică, imagistică sau radiologie, laboratorul trebuie coordonat cu întregul flux medical. Separarea laboratorului de infrastructura clinicii poate duce la trasee ineficiente și mentenanță dificilă.",
        ],
      },
      {
        title: "Greșeli frecvente",
        body: [
          "Prima greșeală este alegerea echipamentelor fără analizarea fluxului probelor și a volumului real. A doua este lipsa planului de service și mentenanță. În IVD, calibrarea și controlul calității sunt parte din operare, nu detalii de final.",
          "O altă greșeală este ignorarea utilităților. Dacă echipamentul cere condiții specifice de apă, temperatură, evacuare sau consumabile, spațiul trebuie pregătit înainte de livrare.",
        ],
      },
      {
        title: "Rolul ZES",
        body: [
          "ZES poate susține selecția, vânzarea, integrarea și service-ul pentru echipamente IVD/laborator, corelate cu infrastructura medicală. Scopul este ca laboratorul să fie funcțional, mentenabil și compatibil cu fluxul clinic.",
          "Pentru o primă structurare, Consultantul AI sau Proposal Builder pot identifica servicii relevante, buget orientativ, riscuri și date lipsă.",
        ],
      },
    ],
    faq: [
      {
        question: "Ce înseamnă echipamente IVD?",
        answer:
          "IVD se referă la echipamente de diagnostic in vitro, folosite în laborator pentru analiza probelor biologice.",
      },
      {
        question: "Service-ul trebuie planificat de la început?",
        answer:
          "Da. Accesul, mentenanța, calibrarea și consumabilele trebuie gândite înainte de instalare.",
      },
      {
        question: "Laboratorul influențează amenajarea clinicii?",
        answer:
          "Da. Fluxurile de probe, utilitățile și zonele suport pot influența compartimentarea și instalațiile.",
      },
      {
        question: "ZES poate ajuta cu selecția aparaturii?",
        answer:
          "Da, ZES poate sprijini consultanța de alegere, integrarea, vânzarea și service-ul echipamentelor.",
      },
    ],
    relatedServices: [
      { label: "IVD / laborator", href: "/services/ivd-laborator" },
      { label: "Aparatură medicală", href: "/services/aparatura-medicala" },
      { label: "Service aparatură medicală", href: "/services/service-aparatura-medicala" },
    ],
    relatedTools: [
      { label: "Consultant AI", href: "/ai-project-advisor" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      {
        label: "Ghid pentru echipamente IVD și laborator",
        href: "/knowledge-hub/ghid-pentru-echipamente-ivd-si-laborator",
      },
      {
        label: "Cum alegi aparatura medicală pentru o clinică",
        href: "/knowledge-hub/cum-alegi-aparatura-medicala-pentru-o-clinica",
      },
    ],
    cta: defaultProposalCta,
  },
  {
    slug: "aparatura-imagistica-medicala",
    title: "Aparatură imagistică medicală: CT, RMN, RX, ecografie",
    description:
      "Ghid pentru alegerea și integrarea aparaturii de imagistică medicală: CT, RMN, RX, ecografie, cameră, ecranare, service și uptime.",
    targetKeyword: "aparatură imagistică medicală",
    secondaryKeywords: [
      "echipamente imagistică medicală",
      "CT RMN RX ecografie",
      "integrare aparatură imagistică",
      "service imagistică medicală",
    ],
    category: "Imagistică",
    intro:
      "Aparatura de imagistică medicală trebuie aleasă împreună cu spațiul, camera, ecranarea, instalațiile, service-ul și fluxurile clinice. CT, RMN, RX și ecografia au cerințe diferite, iar costul real apare din combinația dintre echipament și infrastructura care îl susține.",
    sections: [
      {
        title: "Alegerea echipamentului",
        body: [
          "Alegerea unui CT, RMN, RX sau ecograf trebuie să pornească de la nevoia clinică, volumul estimat, specialități, spațiu și modelul operațional. Nu toate echipamentele cer aceeași infrastructură, iar diferențele trebuie înțelese înainte de ofertare.",
          "RMN-ul implică RF shielding și cerințe de mediu. CT/RX implică protecție radiologică și CNCAN. Ecografia are cerințe mai simple de cameră, dar tot trebuie integrată în fluxul clinic, service și mentenanță.",
        ],
        bullets: [
          "CT: protecție radiologică și CNCAN",
          "RMN: RF shielding, HVAC și acces magnet",
          "RX: layout, protecție și flux operator",
          "ecografie: integrare clinică și service",
        ],
      },
      {
        title: "Integrarea în spațiu",
        body: [
          "Integrarea aparaturii înseamnă mai mult decât livrare. Include alimentare, date, HVAC, acces pentru montaj, spațiu de service, compatibilitate cu finisajele și testare. Dacă aceste detalii nu sunt tratate în proiect, apar costuri după achiziție.",
          "Pentru camere de imagistică, furnizorul echipamentului trebuie coordonat cu proiectarea și execuția. ZES poate ajuta la traducerea cerințelor de aparatură în infrastructură medicală concretă.",
        ],
      },
      {
        title: "Buget și timeline",
        body: [
          "Bugetul aparaturii de imagistică poate fi major în raport cu amenajarea. Totuși, bugetul complet trebuie să includă camera, ecranarea, autorizarea, integrarea, testarea și mentenanța. Un preț de echipament fără infrastructură poate induce în eroare.",
          "Timeline-ul depinde de selecția echipamentului, disponibilitatea furnizorului, starea spațiului, ecranare, autorizări și testare. Aparatura cumpărată prea devreme sau prea târziu poate crea blocaje.",
        ],
      },
      {
        title: "Când să contactezi ZES",
        body: [
          "Contactează ZES când compari echipamente, când pregătești camera sau când vrei să înțelegi bugetul complet. O analiză tehnică poate separa costul aparaturii de costul infrastructurii necesare.",
          "Radiology Room Planner este util pentru CT/RMN/RX, iar Proposal Builder poate genera o propunere preliminară cu servicii, buget orientativ și riscuri.",
        ],
      },
    ],
    faq: [
      {
        question: "Ce echipamente intră în imagistică medicală?",
        answer:
          "În contextul ZES: CT, RMN, RX, ecografie și echipamente conexe pentru diagnostic și integrare tehnică.",
      },
      {
        question: "RMN și CT au aceleași cerințe de cameră?",
        answer:
          "Nu. RMN are RF shielding, iar CT are protecție radiologică și cerințe CNCAN.",
      },
      {
        question: "Trebuie inclus service-ul în planificare?",
        answer:
          "Da. Accesul service, mentenanța și uptime-ul trebuie luate în calcul din faza de proiect.",
      },
      {
        question: "ZES poate ajuta cu alegerea aparaturii?",
        answer:
          "Da, ZES poate sprijini consultanța, vânzarea, integrarea și service-ul aparaturii.",
      },
    ],
    relatedServices: [
      { label: "Imagistică medicală", href: "/services/imagistica-medicala" },
      { label: "Radiologie", href: "/services/radiologie" },
      { label: "Service aparatură medicală", href: "/services/service-aparatura-medicala" },
    ],
    relatedTools: [
      { label: "Calculator echipamente imagistică", href: "/calculatoare/cost-echipamente-imagistica" },
      { label: "Radiology Room Planner", href: "/radiology-room-planner" },
      { label: "Proposal Builder", href: "/proposal-builder" },
      { label: "Diagnostic service", href: "/service-diagnostic" },
    ],
    relatedArticles: [
      {
        label: "Imagistică medicală: CT, RMN, RX și integrare tehnică",
        href: "/knowledge-hub/imagistica-medicala-ct-rmn-rx-si-integrare-tehnica",
      },
      {
        label: "Diferența dintre RF shielding și ecranarea cu plumb",
        href: "/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb",
      },
    ],
    cta: defaultProposalCta,
  },
  {
    slug: "service-aparatura-medicala",
    title: "Service aparatură medicală: mentenanță, uptime și intervenții",
    description:
      "Ghid pentru service și mentenanță aparatură medicală: triere, uptime, mentenanță preventivă, imagistică, IVD, calibrare și continuitate operațională.",
    targetKeyword: "service aparatură medicală",
    secondaryKeywords: [
      "mentenanță aparatură medicală",
      "service echipamente medicale",
      "service imagistică medicală",
      "service IVD laborator",
    ],
    category: "Service",
    intro:
      "Service-ul aparaturii medicale nu este doar intervenție după defect. Pentru o clinică, centru de imagistică sau laborator, service-ul înseamnă uptime, mentenanță preventivă, continuitate operațională, calibrare, verificare, acces tehnic și decizii rapide când echipamentul afectează fluxul clinic.",
    sections: [
      {
        title: "Ce include un sistem de service matur",
        body: [
          "Un sistem matur de service include istoric tehnic, identificarea echipamentului, contract sau SLA, plan de mentenanță, acces pentru intervenție, piese, proceduri de escaladare și comunicare cu personalul medical. Fără aceste elemente, fiecare problemă devine reactivă.",
          "Pentru imagistică și IVD, service-ul poate include verificări de imagine, calibrare, QC, consumabile, temperatură, software, senzori sau componente specifice. Impactul nu este doar tehnic, ci operațional: programări, probe, rezultate și încredere în echipament.",
        ],
        bullets: [
          "mentenanță preventivă și istoric service",
          "triage pentru urgențe și downtime",
          "calibrare / QC pentru IVD și laborator",
          "continuitate operațională și acces service",
        ],
      },
      {
        title: "Cum se evaluează urgența",
        body: [
          "Urgența crește când echipamentul este oprit complet, are erori sistem, produce artefacte, se supraîncălzește sau afectează fluxul clinic. CT, RMN, RX și echipamentele IVD pot avea impact major dacă opresc programările sau fluxul de probe.",
          "Nu orice problemă este critică, dar problemele intermitente trebuie tratate serios. Ele pot indica alimentare instabilă, software, senzori, componente mecanice sau condiții de mediu care se agravează.",
        ],
      },
      {
        title: "Mentenanță preventivă",
        body: [
          "Mentenanța preventivă reduce riscul de intervenții reactive și ajută la planificarea downtime-ului. Pentru aparatura medicală, prevenția trebuie corelată cu volumul de utilizare, tipul echipamentului, consumabilele și cerințele producătorului.",
          "În laboratoare, calibrarea și QC-ul pot fi la fel de importante ca reparația. În imagistică, calitatea imaginii, protocoalele, sistemele de răcire și componentele critice trebuie urmărite înainte de apariția blocajelor.",
        ],
      },
      {
        title: "Când să contactezi ZES",
        body: [
          "Contactează ZES când echipamentul afectează activitatea, când nu există un contract clar de service sau când vrei să transformi mentenanța din reacție în plan. O triere bună începe cu model, serie, simptome, coduri de eroare și impact operațional.",
          "Service Diagnostic Assistant poate structura urgența, riscurile, posibilele cauze și pașii recomandați. Pentru proiecte mai largi, Proposal Builder poate include service-ul ca parte din propunerea tehnică.",
        ],
      },
    ],
    faq: [
      {
        question: "Ce informații trebuie pregătite pentru service?",
        answer:
          "Model, serie, coduri de eroare, descriere simptome, istoric service, impact operațional și date despre contractul existent.",
      },
      {
        question: "Mentenanța preventivă reduce downtime-ul?",
        answer:
          "Da. Nu elimină toate riscurile, dar reduce intervențiile reactive și permite planificarea verificărilor.",
      },
      {
        question: "IVD necesită calibrare și QC?",
        answer:
          "Da, multe echipamente IVD depind de calibrare, consumabile, reactivi și controlul calității.",
      },
      {
        question: "Când este service-ul urgent?",
        answer:
          "Când echipamentul este oprit, afectează diagnosticarea, produce erori, artefacte, supraîncălzire sau întrerupe fluxul clinic.",
      },
    ],
    relatedServices: [
      { label: "Service aparatură medicală", href: "/services/service-aparatura-medicala" },
      { label: "Aparatură medicală", href: "/services/aparatura-medicala" },
      { label: "IVD / laborator", href: "/services/ivd-laborator" },
    ],
    relatedTools: [
      { label: "Estimator service aparatură", href: "/calculatoare/service-aparatura" },
      { label: "Diagnostic service", href: "/service-diagnostic" },
      { label: "Proposal Builder", href: "/proposal-builder" },
    ],
    relatedArticles: [
      {
        label: "Mentenanța aparaturii medicale: ce trebuie urmărit",
        href: "/knowledge-hub/mentenanta-aparaturii-medicale-ce-trebuie-urmarit",
      },
      {
        label: "Cum alegi aparatura medicală pentru o clinică",
        href: "/knowledge-hub/cum-alegi-aparatura-medicala-pentru-o-clinica",
      },
    ],
    cta: {
      title: "Ai o problemă de service sau vrei prevenție?",
      description:
        "Folosește Diagnostic service pentru o primă triere: urgență, risc, pași recomandați și date necesare.",
      label: "Deschide Diagnostic service",
      href: "/service-diagnostic",
    },
  },
  ...investmentSeoClusters,
];

export const seoClusters: SeoCluster[] = Array.from(
  baseSeoClusters
    .reduce((clusters, cluster) => clusters.set(cluster.slug, cluster), new Map<string, SeoCluster>())
    .values(),
);

export function getSeoClusterBySlug(slug: string) {
  return seoClusters.find((cluster) => cluster.slug === slug);
}
