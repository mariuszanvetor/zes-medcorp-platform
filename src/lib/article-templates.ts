import type { ArticleCTA, ArticleFAQ } from "@/data/articles";
import {
  buildDefaultRelationships,
  createArticleSeoDescriptor,
  createBulletListBlock,
  createCalloutBlock,
  createComparisonTableBlock,
  createCtaBlock,
  createDefaultCta,
  createFaqBlock,
  createParagraphBlock,
  createRiskWarningBlock,
  topicTaxonomy,
  validateArticleBlueprint,
  type ArticleBlock,
  type ArticleBlueprint,
  type ArticleContentType,
  type ArticleDraft,
} from "@/lib/content-engine";
import {
  buildInternalLinkPlan,
  getPrimaryConversionTarget,
  type InternalLinkPlan,
} from "@/lib/internal-linking";

export type ArticleTemplateSection =
  | "intro"
  | "decision-context"
  | "technical-foundation"
  | "cost-complexity"
  | "risk"
  | "process"
  | "comparison"
  | "faq"
  | "next-step";

export type ArticleTemplateDefinition = {
  type: ArticleContentType;
  label: string;
  purpose: string;
  minimumWordTarget: number;
  recommendedWordTarget: [number, number];
  sectionSequence: ArticleTemplateSection[];
  blockFactory: (
    blueprint: ArticleBlueprint,
    linkPlan: InternalLinkPlan,
  ) => ArticleBlock[];
  faqFactory: (blueprint: ArticleBlueprint) => ArticleFAQ[];
  ctaFactory?: (
    blueprint: ArticleBlueprint,
    linkPlan: InternalLinkPlan,
  ) => ArticleCTA;
};

export const articleTemplates: Record<ArticleContentType, ArticleTemplateDefinition> = {
  "money-page": {
    type: "money-page",
    label: "Money page",
    purpose: "Commercial SEO page for users evaluating budget, vendor fit or project action.",
    minimumWordTarget: 900,
    recommendedWordTarget: [1200, 2200],
    sectionSequence: [
      "intro",
      "decision-context",
      "cost-complexity",
      "risk",
      "process",
      "next-step",
      "faq",
    ],
    blockFactory: createMoneyPageBlocks,
    faqFactory: createCommercialFaqs,
    ctaFactory: createIntentAwareCta,
  },
  "authority-page": {
    type: "authority-page",
    label: "Authority page",
    purpose: "Technical explainer that builds topical authority and improves lead quality.",
    minimumWordTarget: 1200,
    recommendedWordTarget: [1600, 3000],
    sectionSequence: [
      "intro",
      "technical-foundation",
      "comparison",
      "risk",
      "process",
      "next-step",
      "faq",
    ],
    blockFactory: createAuthorityPageBlocks,
    faqFactory: createAuthorityFaqs,
    ctaFactory: createIntentAwareCta,
  },
  guide: {
    type: "guide",
    label: "Guide",
    purpose: "Practical planning resource with steps, checklists and decision criteria.",
    minimumWordTarget: 900,
    recommendedWordTarget: [1100, 2200],
    sectionSequence: [
      "intro",
      "decision-context",
      "process",
      "risk",
      "next-step",
      "faq",
    ],
    blockFactory: createGuideBlocks,
    faqFactory: createGuideFaqs,
    ctaFactory: createIntentAwareCta,
  },
  "comparison-page": {
    type: "comparison-page",
    label: "Comparison page",
    purpose: "Clarifies two or more technical options without forcing a false winner.",
    minimumWordTarget: 900,
    recommendedWordTarget: [1100, 2000],
    sectionSequence: [
      "intro",
      "comparison",
      "technical-foundation",
      "risk",
      "next-step",
      "faq",
    ],
    blockFactory: createComparisonPageBlocks,
    faqFactory: createComparisonFaqs,
    ctaFactory: createIntentAwareCta,
  },
  "faq-page": {
    type: "faq-page",
    label: "FAQ page",
    purpose: "Structured answer page for recurring technical and commercial questions.",
    minimumWordTarget: 700,
    recommendedWordTarget: [800, 1600],
    sectionSequence: ["intro", "faq", "risk", "next-step"],
    blockFactory: createFaqPageBlocks,
    faqFactory: createGuideFaqs,
    ctaFactory: createIntentAwareCta,
  },
};

export function createArticleDraftFromBlueprint(
  blueprint: ArticleBlueprint,
): ArticleDraft {
  const template = articleTemplates[blueprint.type];
  const linkPlan = buildInternalLinkPlan(blueprint);
  const cta = template.ctaFactory?.(blueprint, linkPlan) ?? createDefaultCta(blueprint);
  const baseFaqs = template.faqFactory(blueprint);
  const blocks = [
    ...template.blockFactory(blueprint, linkPlan),
    createFaqBlock("intrebari-frecvente", "Intrebari frecvente", baseFaqs),
    createCtaBlock(cta),
  ];
  const quality = validateArticleBlueprint(blueprint);

  return {
    blueprint,
    intro: createIntro(blueprint),
    blocks,
    faqs: baseFaqs,
    relationships: buildDefaultRelationships(blueprint),
    cta,
    seo: createArticleSeoDescriptor(blueprint),
    quality,
  };
}

export function getTemplateForType(type: ArticleContentType) {
  return articleTemplates[type];
}

export function createReusableCtaBlock(
  blueprint: ArticleBlueprint,
  linkPlan = buildInternalLinkPlan(blueprint),
) {
  return createCtaBlock(createIntentAwareCta(blueprint, linkPlan));
}

export function createReusableComparisonBlock({
  id,
  title,
  intro,
  leftLabel,
  rightLabel,
  rows,
}: {
  id: string;
  title: string;
  intro: string;
  leftLabel: string;
  rightLabel: string;
  rows: Array<{ label: string; left: string; right: string }>;
}) {
  return createComparisonTableBlock({
    id,
    title,
    intro,
    columns: [
      { key: "left", label: leftLabel },
      { key: "right", label: rightLabel },
    ],
    rows: rows.map((row) => ({
      label: row.label,
      values: {
        left: row.left,
        right: row.right,
      },
    })),
  });
}

export function createReusableRiskBlock(
  blueprint: ArticleBlueprint,
  risks = defaultRiskList(blueprint),
) {
  return createRiskWarningBlock({
    id: "riscuri-de-evitat",
    title: "Riscuri de evitat",
    body:
      "Riscurile apar cand deciziile tehnice sunt luate fara date complete despre spatiu, echipament, autorizari sau exploatare.",
    risks,
    mitigation:
      "Validarea tehnica trebuie facuta inainte de buget final, achizitie sau executie.",
  });
}

export function createReusableCalloutBlock(
  title: string,
  body: string,
  id = "observatie-tehnica",
) {
  return createCalloutBlock(id, title, body, "technical");
}

function createMoneyPageBlocks(
  blueprint: ArticleBlueprint,
  linkPlan: InternalLinkPlan,
): ArticleBlock[] {
  return [
    createParagraphBlock("context-decizie", "Contextul deciziei", [
      blueprint.thesis,
      `Pentru ${topicTaxonomy[blueprint.pillar].label}, cititorul trebuie sa inteleaga ce schimba bugetul, calendarul si riscul inainte de a cere o oferta finala.`,
    ]),
    createBulletListBlock({
      id: "ce-influenteaza-costul",
      title: "Ce influenteaza costul si complexitatea",
      body:
        "O estimare buna nu porneste de la o singura cifra. Porneste de la variabilele care pot schimba proiectul.",
      bullets: [
        "starea spatiului si dimensiunea proiectului",
        "echipamentele principale si cerintele producatorului",
        "autorizari, documentatie si responsabilitati tehnice",
        "service, mentenanta si continuitate operationala",
      ],
    }),
    createReusableRiskBlock(blueprint),
    createBulletListBlock({
      id: "proces-recomandat",
      title: "Proces recomandat",
      body:
        "Procesul editorial recomandat trebuie sa duca cititorul spre clarificare, nu spre promisiuni comerciale premature.",
      bullets: [
        "defineste scenariul de proiect si echipamentul",
        "valideaza spatiul, instalatiile si constrangerile",
        "separa cerintele de autorizare de cerintele tehnice",
        `foloseste ${linkPlan.primaryCta.label} pentru urmatorul pas`,
      ],
    }),
  ];
}

function createAuthorityPageBlocks(
  blueprint: ArticleBlueprint,
  linkPlan: InternalLinkPlan,
): ArticleBlock[] {
  return [
    createParagraphBlock("fundatie-tehnica", "Fundatia tehnica", [
      blueprint.thesis,
      "O pagina de autoritate trebuie sa explice conceptele, limitele si diferentele tehnice inainte de a recomanda o solutie.",
    ]),
    createReusableComparisonBlock({
      id: "diferente-cheie",
      title: "Diferente cheie de clarificat",
      intro:
        "Compara doar concepte care ajuta cititorul sa ia o decizie mai buna. Evita comparatiile artificiale.",
      leftLabel: "Concept A",
      rightLabel: "Concept B",
      rows: [
        {
          label: "Scop",
          left: "Definit prin cerinta tehnica reala.",
          right: "Definit prin risc, echipament si context.",
        },
        {
          label: "Validare",
          left: "Necesita date de proiect.",
          right: "Necesita verificare pe spatiu si echipament.",
        },
      ],
    }),
    createReusableRiskBlock(blueprint),
    createCalloutBlock(
      "Legatura cu urmatorul pas",
      `Daca cititorul are un proiect activ, urmatorul pas recomandat este ${linkPlan.primaryCta.label}.`,
      "urmatorul-pas-tehnic",
    ),
  ];
}

function createGuideBlocks(
  blueprint: ArticleBlueprint,
  linkPlan: InternalLinkPlan,
): ArticleBlock[] {
  return [
    createParagraphBlock("cum-folosesti-ghidul", "Cum folosesti ghidul", [
      blueprint.thesis,
      "Ghidul trebuie sa functioneze ca instrument de orientare: ce verifici, in ce ordine si cand ceri validare tehnica.",
    ]),
    createBulletListBlock({
      id: "pasii-principali",
      title: "Pasii principali",
      body: "Pastreaza pasii suficient de concreti pentru a fi utili inainte de discutia comerciala.",
      bullets: [
        "clarifica obiectivul proiectului",
        "colecteaza date despre spatiu si echipament",
        "identifica autorizari si dependinte",
        "noteaza informatiile lipsa",
        `continua cu ${linkPlan.primaryCta.label}`,
      ],
    }),
    createReusableRiskBlock(blueprint),
  ];
}

function createComparisonPageBlocks(
  blueprint: ArticleBlueprint,
  linkPlan: InternalLinkPlan,
): ArticleBlock[] {
  return [
    createReusableComparisonBlock({
      id: "comparatie-principala",
      title: "Comparatie principala",
      intro:
        "O comparatie buna arata diferentele de scop, implementare, autorizare si risc. Nu forteaza concluzii fara context.",
      leftLabel: "Prima optiune",
      rightLabel: "A doua optiune",
      rows: [
        {
          label: "Scop tehnic",
          left: "Depinde de echipament si risc.",
          right: "Depinde de spatiu, flux si exploatare.",
        },
        {
          label: "Impact in proiect",
          left: "Poate schimba bugetul si calendarul.",
          right: "Poate schimba autorizarea si executia.",
        },
        {
          label: "Urmatorul pas",
          left: linkPlan.primaryCta.label,
          right: "Validare tehnica inainte de decizie.",
        },
      ],
    }),
    createParagraphBlock("cand-alegi-fiecare-optiune", "Cand alegi fiecare optiune", [
      blueprint.thesis,
      "Alegerea trebuie legata de proiectul real, nu de o regula generala folosita pentru toate cazurile.",
    ]),
    createReusableRiskBlock(blueprint),
  ];
}

function createFaqPageBlocks(
  blueprint: ArticleBlueprint,
  linkPlan: InternalLinkPlan,
): ArticleBlock[] {
  return [
    createParagraphBlock("context-intrebari", "Context", [
      blueprint.thesis,
      "O pagina FAQ trebuie sa raspunda scurt, dar sa trimita cititorul spre ghidul sau instrumentul potrivit cand intrebarea indica un proiect real.",
    ]),
    createCalloutBlock(
      "Cand devine necesara consultanta",
      `Daca raspunsul depinde de spatiu, echipament sau autorizari, foloseste ${linkPlan.primaryCta.label}.`,
      "consultanta-necesara",
    ),
    createReusableRiskBlock(blueprint),
  ];
}

function createCommercialFaqs(blueprint: ArticleBlueprint): ArticleFAQ[] {
  return [
    {
      question: `Cat costa ${blueprint.keywordCluster.primary}?`,
      answer:
        "Costul poate fi estimat doar orientativ fara date despre spatiu, echipament, autorizari si calendar. Evita ofertele finale bazate pe informatii incomplete.",
    },
    {
      question: "Ce date sunt necesare pentru o estimare mai buna?",
      answer:
        "Sunt utile planurile spatiului, dimensiunile, echipamentele vizate, stadiul autorizarii, cerintele tehnice si termenul dorit.",
    },
    {
      question: "Cand trebuie contactat ZES?",
      answer:
        "Cat mai devreme, inainte de achizitie, executie sau blocarea layout-ului final.",
    },
  ];
}

function createAuthorityFaqs(blueprint: ArticleBlueprint): ArticleFAQ[] {
  return [
    {
      question: `De ce conteaza ${blueprint.keywordCluster.primary}?`,
      answer:
        "Conteaza pentru ca influenteaza decizii de spatiu, echipament, autorizare, buget, calendar si risc operational.",
    },
    {
      question: "Poate fi folosita aceeasi solutie in toate proiectele?",
      answer:
        "Nu. Solutia depinde de echipament, spatiu, utilizare, vecinatati, autorizari si obiective operationale.",
    },
    {
      question: "Ce trebuie evitat?",
      answer:
        "Evita amestecarea cerintelor tehnice diferite si deciziile bazate pe keyword-uri, nu pe proiectul real.",
    },
  ];
}

function createGuideFaqs(blueprint: ArticleBlueprint): ArticleFAQ[] {
  return [
    {
      question: "Care este primul pas?",
      answer:
        "Primul pas este clarificarea obiectivului, spatiului, echipamentului si constrangerilor tehnice.",
    },
    {
      question: "Ghidul inlocuieste consultanta tehnica?",
      answer:
        "Nu. Ghidul ajuta la pregatirea discutiei, dar proiectele medicale trebuie validate tehnic.",
    },
    {
      question: `Ce instrument ajuta pentru ${blueprint.keywordCluster.primary}?`,
      answer:
        "Alege instrumentul ZES recomandat in pagina: calculator, planner, diagnostic sau Proposal Builder, in functie de intentie.",
    },
  ];
}

function createComparisonFaqs(blueprint: ArticleBlueprint): ArticleFAQ[] {
  return [
    {
      question: "Cum se alege varianta corecta?",
      answer:
        "Varianta corecta se alege dupa echipament, risc, spatiu, autorizari si obiectivul operational.",
    },
    {
      question: "Exista o varianta universal mai buna?",
      answer:
        "Nu. Comparatiile tehnice trebuie facute in context, fara concluzii standard pentru proiecte diferite.",
    },
    {
      question: `Ce greseala apare frecvent in ${blueprint.keywordCluster.primary}?`,
      answer:
        "Greseala frecventa este aplicarea unei solutii generale fara validarea datelor specifice proiectului.",
    },
  ];
}

function createIntentAwareCta(
  blueprint: ArticleBlueprint,
  linkPlan: InternalLinkPlan,
): ArticleCTA {
  const target = getPrimaryConversionTarget(blueprint.pillar, blueprint.intent);
  const primary = linkPlan.primaryCta.href === target.href ? linkPlan.primaryCta : target;

  return {
    title: "Transforma informatia intr-un plan tehnic",
    description:
      "Urmatorul pas este sa clarifici cerintele, riscurile, bugetul orientativ si datele lipsa pentru proiectul tau.",
    label: primary.label,
    href: primary.href,
  };
}

function createIntro(blueprint: ArticleBlueprint) {
  return `${blueprint.thesis} Articolul trateaza subiectul prin prisma proiectelor medicale reale: decizii tehnice, riscuri, informatii lipsa si urmatorul pas potrivit.`;
}

function defaultRiskList(blueprint: ArticleBlueprint) {
  const baseRisks = [
    "date incomplete despre spatiu",
    "echipament ales fara validarea infrastructurii",
    "autorizari tratate prea tarziu",
    "buget interpretat ca oferta finala",
  ];

  if (blueprint.pillar === "rf-shielding-rmn") {
    return [
      "confuzie intre RF shielding si ecranare cu plumb",
      "penetrari RF netratate corect",
      "HVAC sau vibratii analizate prea tarziu",
      "date incomplete de la producatorul RMN",
    ];
  }

  if (
    blueprint.pillar === "radiologie-cncan" ||
    blueprint.pillar === "protectie-radiologica"
  ) {
    return [
      "confuzie intre CNCAN si DSP",
      "protectie radiologica analizata dupa executie",
      "zone controlate neclarificate",
      "CT/RX confundat cu cerintele RMN",
    ];
  }

  return baseRisks;
}
