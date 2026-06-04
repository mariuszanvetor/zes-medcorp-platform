export type SeoIndexingPriority = "critical" | "high" | "medium" | "low";

export type SeoIndexingType =
  | "homepage"
  | "conversion"
  | "hub"
  | "calculator"
  | "comparison"
  | "glossary"
  | "planning"
  | "service"
  | "article"
  | "legal"
  | "company";

export type SeoIndexingItem = {
  url: string;
  title: string;
  priority: SeoIndexingPriority;
  type: SeoIndexingType;
  reason: string;
  recommendedAction: string;
  searchConsoleAction: string;
  notes: string;
};

export type SeoIndexingGroup = {
  slug: string;
  title: string;
  description: string;
  items: SeoIndexingItem[];
};

export const seoIndexingPriorityGroups: SeoIndexingGroup[] = [
  {
    slug: "core-conversion",
    title: "Core conversion pages",
    description:
      "Pagini care sustin lead capture-ul si ar trebui verificate primele dupa deploy.",
    items: [
      item("/", "Homepage", "critical", "homepage", "Pagina principala concentreaza autoritatea generala si conversiile initiale.", "Inspect URL si cere indexarea daca este necesar.", "Request indexing dupa verificarea sitemap-ului.", "Verifica OG, canonical si headerul principal."),
      item("/contact", "Contact", "critical", "conversion", "Canalul principal pentru cereri reale de proiect si consultanta.", "Inspect URL si trimite la indexare daca este curata.", "Request indexing pentru pagina de contact.", "Confirmă datele companiei si formularul."),
      item("/proposal-builder", "Proposal Builder", "critical", "conversion", "Instrument de conversie cu intentie comerciala foarte mare.", "Inspect URL si solicita indexare prioritara.", "Request indexing pentru tool-ul principal.", "Verifica schema si output-ul orientativ."),
      item("/project-intake", "Project Intake", "critical", "conversion", "Colecteaza datele esentiale pentru analiza tehnica.", "Inspect URL si cere indexare.", "Request indexing pentru formularul de calificare.", "Fluxul de lead trebuie testat inainte."),
    ],
  },
  {
    slug: "calculator-hub",
    title: "Calculator hub",
    description:
      "Hub-ul de calculatoare si estimatoarele cu intentie comerciala puternica.",
    items: [
      item("/calculatoare", "Calculatoare medicale", "high", "hub", "Hub-ul sustine interlinking-ul si descoperirea tuturor estimatoarelor.", "Inspect URL si cere indexare dupa verificarea sitemap-ului.", "Submit URL si urmareste acoperirea.", "Asigura-te ca include link catre calculatoarele principale."),
      item("/calculatoare/cost-camera-rmn", "Estimare cost camera RMN", "high", "calculator", "Pagina are intentie mare de planificare si conversie.", "Inspect URL si cere indexare prioritar.", "Request indexing pentru calculatorul RMN.", "Unul dintre cele mai importante tool-uri pentru leaduri."),
      item("/calculatoare/cost-camera-ct", "Estimare cost camera CT", "high", "calculator", "Leaga direct bugetarea cu cerinte de radioprotectie.", "Inspect URL si solicita indexare.", "Request indexing pentru calculatorul CT.", "Folosit frecvent in proiecte radiologice."),
      item("/calculatoare/rf-shielding-estimare", "Estimare RF shielding", "high", "calculator", "Targeteaza un subiect tehnic de mare intentie.", "Inspect URL si cere indexare.", "Request indexing pentru calculatorul RF.", "Focus pe RMN si separare clara fata de plumb."),
      item("/calculatoare/radioprotectie-ct-estimare", "Estimare radioprotectie CT", "high", "calculator", "Pune accent pe plumb, zone controlate si CNCAN.", "Inspect URL si cere indexare.", "Request indexing pentru calculatorul CT radiologic.", "Nu confunda cu RF shielding."),
    ],
  },
  {
    slug: "commercial-lead-pages",
    title: "Commercial lead pages",
    description:
      "Pagini comerciale cu intentie mare pentru proiecte RX, imagistica, CNCAN si service radiologie.",
    items: [
      item("/amenajare-centre-imagistica", "Amenajare centre imagistica medicala", "critical", "service", "Pagina adreseaza proiecte noi si extinderi RX, CT sau RMN.", "Inspect URL si solicita indexare prioritara dupa deploy.", "Request indexing pentru landing page-ul de imagistica.", "Verifica CTA ZES, contactele directe si legaturile catre serviciile CT/RMN."),
      item("/proiectare-radiologie", "Proiectare radiologie si infrastructura RX", "critical", "service", "Pagina targeteaza clinici care pregatesc camera RX si documentatia tehnica.", "Inspect URL si solicita indexare prioritara.", "Request indexing pentru proiectare radiologie.", "Verifica legaturile CNCAN si radioprotectie."),
      item("/autorizare-cncan-camera-rx", "Autorizare CNCAN camera RX", "high", "service", "Pagina transforma intentia informationala CNCAN intr-un traseu comercial responsabil.", "Inspect URL si solicita indexare.", "Request indexing pentru pagina CNCAN preliminara.", "Pastreaza framing-ul orientativ si validarea de specialist."),
      item("/service-radiologie-romania", "Service radiologie Romania", "critical", "service", "Pagina raspunde cererilor urgente de service RX si imagistica.", "Inspect URL si solicita indexare prioritara.", "Request indexing pentru landing page-ul de service.", "Verifica preluarea rapida prin ZES si WhatsApp."),
      item("/plumbare-radiologica", "Plumbare radiologica si protectie RX", "critical", "service", "Pagina targeteaza intentia comerciala pentru camere RX si ofertare preliminara.", "Inspect URL si solicita indexare prioritara.", "Request indexing pentru landing page-ul de plumbare.", "Verifica distinctia fata de RF shielding pentru RMN."),
    ],
  },
  {
    slug: "comparison-hub",
    title: "Comparison hub",
    description:
      "Pagini de comparatie cu intentie comerciala si de evaluare.",
    items: [
      item("/comparatii", "Comparatii tehnice", "high", "hub", "Hub-ul ajuta la gruparea comparatiilor pe intentie.", "Inspect URL si solicita indexare.", "Request indexing pentru hub-ul de comparatii.", "Verifica sa nu existe pagini redundante."),
      item("/comparatii/rmn-vs-ct", "RMN vs CT", "high", "comparison", "Comparatie cu intentie mare pentru decizie de echipament.", "Inspect URL si cere indexare prioritara.", "Request indexing pentru pagina de comparatie.", "Una dintre cele mai valoroase comparatii."),
      item("/comparatii/ct-vs-cbct", "CT vs CBCT", "medium", "comparison", "Comparatie utila pentru planificare si selectie tehnica.", "Inspect URL si cere indexare.", "Request indexing pentru comparatia CBCT.", "Potrivita pentru segmentare medicala."),
      item("/comparatii/rf-shielding-vs-radioprotectie", "RF shielding vs radioprotectie", "high", "comparison", "Clarifica o confuzie frecventa in proiectele medicale.", "Inspect URL si solicita indexare.", "Request indexing pentru comparatia de terminologie.", "Important pentru acuratete tehnica."),
    ],
  },
  {
    slug: "revenue-solution-pages",
    title: "Revenue solution pages",
    description:
      "Hub si pagini comerciale Phase 84A pentru infrastructura medicala, echipamente si mentenanta.",
    items: [
      item("/solutii-medicale", "Solutii medicale", "critical", "hub", "Hub comercial pentru cele trei verticale ZESCORP.", "Inspect URL si solicita indexare dupa deploy.", "Request indexing pentru hub-ul comercial.", "Verifica CTA ZES, formularul si legaturile catre cei trei piloni."),
      item("/solutii-medicale/camere-ct", "Camere CT", "critical", "service", "Pagina targeteaza proiecte CT cu valoare comerciala ridicata.", "Inspect URL si solicita indexare prioritara.", "Request indexing pentru landing page CT.", "Verifica radioprotectia, formularul si legatura catre instalare."),
      item("/solutii-medicale/camere-rmn", "Camere RMN", "critical", "service", "Pagina targeteaza camere RMN, relocari si RF shielding.", "Inspect URL si solicita indexare prioritara.", "Request indexing pentru landing page RMN.", "Verifica separarea clara dintre RF shielding si radioprotectie."),
      item("/solutii-medicale/echipamente-imagistica-diagnostic", "Echipamente imagistica diagnostic", "critical", "service", "Pagina sustine cereri de oferta pentru RX, CT si RMN.", "Inspect URL si solicita indexare prioritara.", "Request indexing pentru pagina de echipamente imagistica.", "Verifica formularul tehnico-comercial."),
      item("/solutii-medicale/echipamente-laborator-ivd", "Echipamente laborator IVD", "high", "service", "Pagina extinde intentia comerciala in afara radiologiei.", "Inspect URL si solicita indexare.", "Request indexing pentru pagina laborator IVD.", "Verifica legatura catre mentenanta preventiva."),
      item("/solutii-medicale/service-echipamente-medicale", "Service echipamente medicale", "critical", "service", "Pagina raspunde cererilor de service pentru aparatura medicala din mai multe categorii.", "Inspect URL si solicita indexare prioritara.", "Request indexing pentru pagina de service medical.", "Verifica CTA ZES, formularul si mesajele de siguranta."),
      item("/solutii-medicale/contracte-mentenanta-preventiva", "Contracte mentenanta preventiva", "high", "service", "Pagina targeteaza contracte recurente si continuitate operationala.", "Inspect URL si solicita indexare.", "Request indexing pentru pagina de mentenanta.", "Verifica legaturile catre service multi-vendor."),
    ],
  },
  {
    slug: "glossary-hub",
    title: "Glossary hub",
    description:
      "Pagini de definitii si termeni care sprijina descoperirea semantica.",
    items: [
      item("/glosar", "Glosar medical", "high", "hub", "Hub-ul de glosar sustine arhitectura semantica.", "Inspect URL si trimite la indexare.", "Request indexing pentru hub-ul de glosar.", "Important pentru crawl si legaturi interne."),
      item("/glosar/camera-faraday-rmn", "Camera Faraday RMN", "high", "glossary", "Termen tehnic de baza pentru RMN.", "Inspect URL si cere indexare.", "Request indexing pentru termenul Faraday.", "Ar trebui sa fie bine interconectat."),
      item("/glosar/cost-rf-shielding-romania", "Cost RF shielding Romania", "medium", "glossary", "Termen orientat comercial si de planificare.", "Inspect URL si solicita indexare.", "Request indexing pentru termenul comercial.", "Urmareste snippet-ul SERP."),
      item("/glosar/checklist-camera-rmn-inainte-instalare", "Checklist camera RMN", "medium", "glossary", "Ajuta la planificare si verifica cerintele de pre-instalare.", "Inspect URL si cere indexare.", "Request indexing pentru checklist.", "Util pentru interlinking cu calculatoarele."),
    ],
  },
  {
    slug: "planning-hub",
    title: "Planning hub",
    description:
      "Pagini de planificare care conecteaza proiectele la instrumentele corecte.",
    items: [
      item("/planificare", "Planificare proiect medical", "high", "hub", "Pagina hub pentru scenarii de proiect si orientare.", "Inspect URL si solicita indexare.", "Request indexing pentru hub-ul de planificare.", "Ar trebui sa se conecteze clar la calculatoare."),
      item("/planificare/deschid-clinica-medicala", "Deschid clinica medicala", "high", "planning", "Scenariu cu intentie foarte mare si funnel initial.", "Inspect URL si cere indexare prioritara.", "Request indexing pentru scenariul clinicii noi.", "Unul dintre cele mai bune landing pages."),
      item("/planificare/amenajez-camera-rmn", "Amenajez camera RMN", "high", "planning", "Conecteaza planificarea la RF shielding si HVAC.", "Inspect URL si solicita indexare.", "Request indexing pentru scenariul RMN.", "Legatura cu calculatorul RMN este esentiala."),
      item("/planificare/nu-stiu-de-unde-sa-incep", "Nu stiu de unde sa incep", "high", "planning", "Scenariu de orientare cu intentie mare de explorare.", "Inspect URL si cere indexare.", "Request indexing pentru scenariul de orientare.", "Bun pentru conversie initiala."),
    ],
  },
  {
    slug: "service-pages",
    title: "Service pages",
    description:
      "Pagini de servicii cu valoare comerciala si relevanta tehnica.",
    items: [
      item("/services/radiologie", "Radiologie", "medium", "service", "Pagina de serviciu sustine toate subiectele radiologice.", "Inspect URL si solicita indexare.", "Request indexing pentru serviciul central.", "Legatura cu ghiduri si comparatii."),
      item("/services/rf-shielding", "RF shielding", "high", "service", "Serviciu tehnic de mare intentie pentru RMN.", "Inspect URL si cere indexare.", "Request indexing pentru serviciul RF.", "Trebuie sa clarifice distinctia fata de plumb."),
      item("/services/protectie-radiologica", "Protectie radiologica", "high", "service", "Relevant pentru CT, RX si CNCAN.", "Inspect URL si solicita indexare.", "Request indexing pentru serviciul radioprotecție.", "Serviciu cu intentie comerciala mare."),
      item("/services/ivd-laborator", "IVD / laborator", "medium", "service", "Legat de aparatura, fluxuri si validare.", "Inspect URL si cere indexare.", "Request indexing pentru serviciul IVD.", "Ar trebui sa ramana clar si practic."),
    ],
  },
  {
    slug: "content-and-trust",
    title: "High-value articles and trust pages",
    description:
      "Articolele si paginile de incredere care completeaza lantul de semnale SEO.",
    items: [
      item("/knowledge-hub/diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb", "RF shielding vs plumb", "high", "article", "Articol esential pentru clarificarea terminologiei.", "Inspect URL si cere indexare prioritara.", "Request indexing pentru articolul de diferentiere.", "Important pentru EEAT si acuratete."),
      item("/knowledge-hub/ce-trebuie-sa-stii-despre-autorizarea-cncan", "Autorizare CNCAN", "high", "article", "Articol de referinta pentru proiecte radiologice.", "Inspect URL si solicita indexare.", "Request indexing pentru articolul CNCAN.", "Bine conectat la comparatii si ghiduri."),
      item("/knowledge-hub/cum-se-construieste-o-clinica-medicala-in-romania", "Construire clinica medicala", "high", "article", "Articol cu intentie comerciala si informationala puternica.", "Inspect URL si cere indexare.", "Request indexing pentru articolul de baza.", "Bun pentru homepage si serviciile de constructii."),
      item("/companie", "Companie", "medium", "company", "Pagina de companie sprijina increderea si semnalele entity.", "Inspect URL si verifica indexarea.", "Request indexing pentru pagina companiei.", "Conecteaza datele oficiale ZES."),
      item("/privacy-policy", "Privacy policy", "low", "legal", "Paginile legale ajuta la trust si conformitate.", "Inspect URL doar dupa verificare.", "Nu este de obicei prioritar pentru indexing.", "Totusi trebuie sa fie accesibila si corecta."),
    ],
  },
  {
    slug: "authority-expansion-batch-70",
    title: "Authority expansion batch 70",
    description:
      "Pagini de autoritate cu intentie tehnica si comerciala mare, potrivite pentru indexare prioritara dupa publicare.",
    items: [
      item(
        "/knowledge-hub/rmn-1-5t-vs-3t-infrastructura",
        "RMN 1.5T vs 3T infrastructura",
        "high",
        "article",
        "Pagina targeteaza o decizie tehnica de mare valoare pentru proiecte RMN.",
        "Inspect URL si cere indexare prioritara.",
        "Request indexing pentru comparatia de infrastructura RMN.",
        "Una dintre cele mai bune pagini pentru intentie comerciala si tehnica.",
      ),
      item(
        "/knowledge-hub/cerinte-electrice-rmn",
        "Cerinte electrice RMN",
        "high",
        "article",
        "Pagina clarifica o cerinta infrastructurala critica pentru proiectele RMN.",
        "Inspect URL si cere indexare.",
        "Request indexing pentru ghidul electric RMN.",
        "Bun pentru interlinking cu calculatoarele electrice si cu Proposal Builder.",
      ),
      item(
        "/knowledge-hub/hvac-camera-rmn",
        "HVAC camera RMN",
        "high",
        "article",
        "Subiect tehnic important pentru executie si exploatare in camerele RMN.",
        "Inspect URL si cere indexare prioritara.",
        "Request indexing pentru ghidul HVAC RMN.",
        "Legat direct de RF shielding si operare pe termen lung.",
      ),
      item(
        "/knowledge-hub/erori-proiectare-camera-ct",
        "Erori proiectare camere CT",
        "high",
        "article",
        "O pagina cu intentie mare pentru proiecte CT si radioprotectie.",
        "Inspect URL si solicita indexare.",
        "Request indexing pentru pagina CT.",
        "Utila pentru leaduri care evalueaza riscurile inainte de achizitie.",
      ),
      item(
        "/knowledge-hub/testare-validare-rf-shielding",
        "Testare si validare RF shielding",
        "high",
        "article",
        "Pagina trateaza validarea finala a unui sistem RF cu valoare practica mare.",
        "Inspect URL si cere indexare.",
        "Request indexing pentru pagina de validare RF.",
        "Important pentru proiecte RMN in faza de comisionare.",
      ),
      item(
        "/knowledge-hub/cerinte-infrastructura-laborator-ivd",
        "Cerinte infrastructura laborator IVD",
        "high",
        "article",
        "Subiect de planificare si buget pentru laborator medical si IVD.",
        "Inspect URL si cere indexare.",
        "Request indexing pentru ghidul IVD.",
        "Conecteaza bine calculatorul de laborator cu serviciile ZES.",
      ),
      item(
        "/knowledge-hub/checklist-pre-implementare-imagistica",
        "Checklist pre-implementare imagistica",
        "medium",
        "article",
        "Pagina functioneaza ca resursa de orientare si pregatire pentru proiecte imagistice.",
        "Inspect URL si cere indexare.",
        "Request indexing pentru checklist-ul de pregatire.",
        "Bun pentru leaduri care inca strâng date si cerinte.",
      ),
      item(
        "/knowledge-hub/modernizare-etapizata-clinica-medicala",
        "Modernizare etapizata clinica medicala",
        "high",
        "article",
        "Pagina sustine intentia comerciala de modernizare si continuitate operationala.",
        "Inspect URL si cere indexare prioritara.",
        "Request indexing pentru pagina de modernizare etapizata.",
        "Se leaga bine de calculatoare si de service funnels.",
      ),
      item(
        "/knowledge-hub/flux-operational-laborator-ivd",
        "Flux operational laborator IVD",
        "medium",
        "article",
        "Pagina ajuta la discutii despre eficienta si layout in laboratoare.",
        "Inspect URL si cere indexare.",
        "Request indexing pentru pagina de flux IVD.",
        "Urmareste interne linkuri catre laborator si service.",
      ),
    ],
  },
];

function item(
  url: string,
  title: string,
  priority: SeoIndexingPriority,
  type: SeoIndexingType,
  reason: string,
  recommendedAction: string,
  searchConsoleAction: string,
  notes: string,
): SeoIndexingItem {
  return {
    url,
    title,
    priority,
    type,
    reason,
    recommendedAction,
    searchConsoleAction,
    notes,
  };
}

export const seoIndexingPriorityItems = seoIndexingPriorityGroups.flatMap((group) => group.items);
