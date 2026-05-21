import type {
  Article,
  ArticleCategory,
  ArticleCTA,
  ArticleFAQ,
  ArticleSection,
  ArticleTool,
} from "@/data/articles";

export type ArticleContentType =
  | "money-page"
  | "authority-page"
  | "guide"
  | "comparison-page"
  | "faq-page";

export type SearchIntent =
  | "commercial-investigation"
  | "technical-planning"
  | "regulatory"
  | "problem-solving"
  | "educational-authority";

export type FunnelStage = "awareness" | "mid" | "high-intent" | "post-lead";

export type PlanningPhase =
  | "concept"
  | "feasibility"
  | "authorization"
  | "design"
  | "procurement"
  | "installation"
  | "commissioning"
  | "operation"
  | "maintenance"
  | "modernization";

export type Modality =
  | "rmn"
  | "ct"
  | "rx"
  | "ecografie"
  | "ivd"
  | "laborator"
  | "clinica"
  | "service";

export type ProjectComplexity =
  | "basic"
  | "moderate"
  | "advanced"
  | "high-complexity";

export type CommercialIntent = "low" | "medium" | "high" | "urgent";

export type AuthorityCluster =
  | "clinic-planning"
  | "radiology-planning"
  | "rmn-rf"
  | "ct-radiation"
  | "cncan-dsp"
  | "equipment-imaging"
  | "ivd-lab"
  | "service-uptime"
  | "modernization"
  | "budgeting";

export type TopicPillar =
  | "constructii-medicale"
  | "radiologie-cncan"
  | "rf-shielding-rmn"
  | "protectie-radiologica"
  | "imagistica-medicala"
  | "ivd-laborator"
  | "service-aparatura"
  | "proiectare-medicala"
  | "autorizare-conformitate"
  | "achizitie-echipamente"
  | "modernizare-clinici"
  | "planning-tools";

export type KeywordCluster = {
  primary: string;
  secondary: string[];
  exclusions?: string[];
  naturalLanguageVariants?: string[];
};

export type TopicTaxonomyItem = {
  pillar: TopicPillar;
  label: string;
  description: string;
  leadIntent: string;
  defaultServices: string[];
  defaultTools: ArticleTool[];
  defaultCalculators: ArticleTool[];
};

export type ArticleRelationshipMap = {
  services: string[];
  tools: ArticleTool[];
  calculators: ArticleTool[];
  articles: string[];
};

export type ArticleBlueprint = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  type: ArticleContentType;
  pillar: TopicPillar;
  intent: SearchIntent;
  funnelStage: FunnelStage;
  planningPhases?: PlanningPhase[];
  modalities?: Modality[];
  projectComplexity?: ProjectComplexity;
  commercialIntent?: CommercialIntent;
  equipmentTypes?: Modality[];
  authorityCluster?: AuthorityCluster;
  keywordCluster: KeywordCluster;
  audience: string[];
  thesis: string;
  requiredAngles: string[];
  prohibitedClaims?: string[];
  relationships?: Partial<ArticleRelationshipMap>;
  cta?: ArticleCTA;
  publishedAt?: string;
  updatedAt?: string;
};

export type ComparisonColumn = {
  key: string;
  label: string;
};

export type ComparisonRow = {
  label: string;
  values: Record<string, string>;
};

export type ArticleBlock =
  | {
      type: "paragraphs";
      id: string;
      title: string;
      body: string[];
    }
  | {
      type: "bullet-list";
      id: string;
      title: string;
      body: string[];
      bullets: string[];
    }
  | {
      type: "callout";
      id: string;
      title: string;
      body: string;
      tone?: "neutral" | "technical" | "commercial";
    }
  | {
      type: "risk-warning";
      id: string;
      title: string;
      body: string[];
      risks: string[];
      mitigation: string;
    }
  | {
      type: "comparison-table";
      id: string;
      title: string;
      intro: string;
      columns: ComparisonColumn[];
      rows: ComparisonRow[];
    }
  | {
      type: "faq";
      id: string;
      title: string;
      items: ArticleFAQ[];
    }
  | {
      type: "cta";
      id: string;
      title: string;
      description: string;
      label: string;
      href: string;
    };

export type ArticleDraft = {
  blueprint: ArticleBlueprint;
  intro: string;
  blocks: ArticleBlock[];
  faqs: ArticleFAQ[];
  relationships: ArticleRelationshipMap;
  cta: ArticleCTA;
  seo: ArticleSeoDescriptor;
  quality: ArticleQualityReport;
};

export type ArticleSeoDescriptor = {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string[];
  targetKeyword: string;
  contentType: ArticleContentType;
  intent: SearchIntent;
};

export type ArticleQualityIssue = {
  severity: "error" | "warning";
  message: string;
};

export type ArticleQualityReport = {
  isPublishable: boolean;
  issues: ArticleQualityIssue[];
  rulesApplied: string[];
};

export const seoSafeContentCompositionRules = [
  "Use one primary search intent per article.",
  "Do not create doorway pages or near-duplicate topic variants.",
  "Do not invent testimonials, clients, case studies, accreditations or regulations.",
  "Separate RF shielding for RMN from radiation protection / lead shielding for CT and RX.",
  "Clarify that CNCAN relates to ionizing radiation projects, not RF shielding by itself.",
  "Keep budget language indicative unless a validated commercial offer exists.",
  "Use internal links only when they help the reader choose a next step.",
  "Prefer practical sequencing, risks, assumptions and missing-data checks over keyword repetition.",
  "Keep FAQ answers specific and short enough to be useful in schema.",
  "Route high-intent readers toward a relevant calculator, planner, Proposal Builder or contact flow.",
] as const;

export const topicTaxonomy: Record<TopicPillar, TopicTaxonomyItem> = {
  "constructii-medicale": {
    pillar: "constructii-medicale",
    label: "Constructii medicale",
    description: "Clinic construction, fit-out, DSP planning and technical coordination.",
    leadIntent: "Clinic founders, investors and expansion projects.",
    defaultServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/aparatura-medicala",
    ],
    defaultTools: [
      { label: "Analiză preliminară", href: "/ai-project-advisor" },
      { label: "Propunere preliminară", href: "/proposal-builder" },
    ],
    defaultCalculators: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
  },
  "radiologie-cncan": {
    pillar: "radiologie-cncan",
    label: "Radiologie / CNCAN",
    description: "CT/RX planning, controlled areas, radiation protection and CNCAN topics.",
    leadIntent: "Radiology rooms, imaging centers and CT/RX investors.",
    defaultServices: [
      "/services/radiologie",
      "/services/protectie-radiologica",
      "/services/imagistica-medicala",
    ],
    defaultTools: [
      { label: "Planificare radiologie", href: "/radiology-room-planner" },
      { label: "Propunere preliminară", href: "/proposal-builder" },
    ],
    defaultCalculators: [
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
    ],
  },
  "rf-shielding-rmn": {
    pillar: "rf-shielding-rmn",
    label: "RF shielding / RMN",
    description: "MRI/RMN Faraday cage, RF doors, filters, penetrations and room integrity.",
    leadIntent: "RMN projects with shielding, HVAC and integration questions.",
    defaultServices: [
      "/services/rf-shielding",
      "/services/radiologie",
      "/services/imagistica-medicala",
    ],
    defaultTools: [
      { label: "Planificare radiologie", href: "/radiology-room-planner" },
      { label: "Propunere preliminară", href: "/proposal-builder" },
    ],
    defaultCalculators: [
      { label: "Calculator cost camera RMN", href: "/calculatoare/cost-camera-rmn" },
    ],
  },
  "protectie-radiologica": {
    pillar: "protectie-radiologica",
    label: "Protectie radiologica",
    description: "Lead shielding, controlled areas, CT/RX protection and CNCAN coordination.",
    leadIntent: "CT/RX projects that need radiation protection planning.",
    defaultServices: [
      "/services/protectie-radiologica",
      "/services/radiologie",
      "/services/imagistica-medicala",
    ],
    defaultTools: [
      { label: "Planificare radiologie", href: "/radiology-room-planner" },
    ],
    defaultCalculators: [
      { label: "Calculator cost camera CT", href: "/calculatoare/cost-camera-ct" },
    ],
  },
  "imagistica-medicala": {
    pillar: "imagistica-medicala",
    label: "Imagistica medicala",
    description: "CT, RMN, RX, ultrasound, infrastructure readiness and equipment integration.",
    leadIntent: "Procurement and modernization projects for imaging equipment.",
    defaultServices: [
      "/services/imagistica-medicala",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    defaultTools: [
      { label: "Propunere preliminară", href: "/proposal-builder" },
      { label: "Planificare radiologie", href: "/radiology-room-planner" },
    ],
    defaultCalculators: [
      {
        label: "Calculator echipamente imagistica",
        href: "/calculatoare/cost-echipamente-imagistica",
      },
    ],
  },
  "ivd-laborator": {
    pillar: "ivd-laborator",
    label: "IVD / laborator",
    description: "Laboratory workflows, IVD equipment, calibration, validation and service.",
    leadIntent: "Laboratory setup, equipment acquisition and service planning.",
    defaultServices: [
      "/services/ivd-laborator",
      "/services/aparatura-medicala",
      "/services/service-aparatura-medicala",
    ],
    defaultTools: [{ label: "Propunere preliminară", href: "/proposal-builder" }],
    defaultCalculators: [
      { label: "Calculator cost laborator IVD", href: "/calculatoare/cost-laborator-ivd" },
    ],
  },
  "service-aparatura": {
    pillar: "service-aparatura",
    label: "Service aparatura",
    description: "Equipment uptime, diagnostics, preventive maintenance and service triage.",
    leadIntent: "Operational teams with downtime or maintenance risk.",
    defaultServices: [
      "/services/service-aparatura-medicala",
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
    ],
    defaultTools: [{ label: "Evaluare service", href: "/service-diagnostic" }],
    defaultCalculators: [
      { label: "Estimator service aparatura", href: "/calculatoare/service-aparatura" },
    ],
  },
  "proiectare-medicala": {
    pillar: "proiectare-medicala",
    label: "Proiectare medicala",
    description: "Medical planning, workflows, equipment readiness and technical sequencing.",
    leadIntent: "Early-stage projects that need feasibility and project structure.",
    defaultServices: [
      "/services/constructii-medicale",
      "/services/amenajari-medicale",
      "/services/aparatura-medicala",
    ],
    defaultTools: [
      { label: "Analiză preliminară", href: "/ai-project-advisor" },
      { label: "Propunere preliminară", href: "/proposal-builder" },
    ],
    defaultCalculators: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
  },
  "autorizare-conformitate": {
    pillar: "autorizare-conformitate",
    label: "Autorizare si conformitate",
    description: "DSP, CNCAN, technical documentation and planning risk.",
    leadIntent: "Projects that need regulatory sequencing and fewer late-stage surprises.",
    defaultServices: [
      "/services/constructii-medicale",
      "/services/radiologie",
      "/services/protectie-radiologica",
    ],
    defaultTools: [{ label: "Analiză preliminară", href: "/ai-project-advisor" }],
    defaultCalculators: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
  },
  "achizitie-echipamente": {
    pillar: "achizitie-echipamente",
    label: "Achizitie echipamente",
    description: "Equipment selection, acquisition, lifecycle planning, service and integration.",
    leadIntent: "Procurement, finance and owners evaluating equipment decisions.",
    defaultServices: [
      "/services/aparatura-medicala",
      "/services/imagistica-medicala",
      "/services/ivd-laborator",
    ],
    defaultTools: [{ label: "Propunere preliminară", href: "/proposal-builder" }],
    defaultCalculators: [
      {
        label: "Calculator echipamente imagistica",
        href: "/calculatoare/cost-echipamente-imagistica",
      },
    ],
  },
  "modernizare-clinici": {
    pillar: "modernizare-clinici",
    label: "Modernizare clinici",
    description: "Retrofit, phased works, replacement equipment and operational continuity.",
    leadIntent: "Existing clinics and hospitals planning modernization with minimal downtime.",
    defaultServices: [
      "/services/amenajari-medicale",
      "/services/service-aparatura-medicala",
      "/services/aparatura-medicala",
    ],
    defaultTools: [
      { label: "Propunere preliminară", href: "/proposal-builder" },
      { label: "Evaluare service", href: "/service-diagnostic" },
    ],
    defaultCalculators: [
      { label: "Estimator service aparatura", href: "/calculatoare/service-aparatura" },
    ],
  },
  "planning-tools": {
    pillar: "planning-tools",
    label: "Planning tools",
    description: "Calculators, planners and structured intake flows for technical decisions.",
    leadIntent: "Users who need a next step, risk estimate or budget orientation.",
    defaultServices: ["/services", "/contact"],
    defaultTools: [
      { label: "Analiză preliminară", href: "/ai-project-advisor" },
      { label: "Propunere preliminară", href: "/proposal-builder" },
    ],
    defaultCalculators: [
      { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
    ],
  },
};

export function createKeywordCluster(
  primary: string,
  secondary: string[] = [],
  options: Pick<KeywordCluster, "exclusions" | "naturalLanguageVariants"> = {},
): KeywordCluster {
  return {
    primary,
    secondary: uniqueStrings(secondary),
    ...options,
  };
}

export function createArticleSeoDescriptor(
  blueprint: ArticleBlueprint,
): ArticleSeoDescriptor {
  return {
    title: blueprint.title,
    description: blueprint.description,
    canonicalPath: `/knowledge-hub/${blueprint.slug}`,
    keywords: uniqueStrings([
      blueprint.keywordCluster.primary,
      ...blueprint.keywordCluster.secondary,
      ...(blueprint.keywordCluster.naturalLanguageVariants ?? []),
    ]),
    targetKeyword: blueprint.keywordCluster.primary,
    contentType: blueprint.type,
    intent: blueprint.intent,
  };
}

export function buildDefaultRelationships(
  blueprint: ArticleBlueprint,
): ArticleRelationshipMap {
  const taxonomy = topicTaxonomy[blueprint.pillar];
  const custom = blueprint.relationships;

  return {
    services: uniqueStrings([
      ...taxonomy.defaultServices,
      ...(custom?.services ?? []),
    ]).slice(0, 5),
    tools: uniqueTools([...taxonomy.defaultTools, ...(custom?.tools ?? [])]).slice(0, 4),
    calculators: uniqueTools([
      ...taxonomy.defaultCalculators,
      ...(custom?.calculators ?? []),
    ]).slice(0, 3),
    articles: uniqueStrings(custom?.articles ?? []).slice(0, 5),
  };
}

export function createDefaultCta(blueprint: ArticleBlueprint): ArticleCTA {
  if (blueprint.cta) {
    return blueprint.cta;
  }

  const taxonomy = topicTaxonomy[blueprint.pillar];
  const action = taxonomy.defaultTools[0] ?? taxonomy.defaultCalculators[0];

  return {
    title: "Ai nevoie de o validare tehnica inainte de urmatorul pas?",
    description:
      "Foloseste instrumentele ZES pentru a clarifica cerintele, riscurile si serviciile relevante inainte de o oferta finala.",
    label: action?.label ?? "Discuta cu ZES",
    href: action?.href ?? "/contact",
  };
}

export function validateArticleBlueprint(
  blueprint: ArticleBlueprint,
): ArticleQualityReport {
  const issues: ArticleQualityIssue[] = [];
  const allText = [
    blueprint.title,
    blueprint.description,
    blueprint.thesis,
    ...blueprint.requiredAngles,
    blueprint.keywordCluster.primary,
    ...blueprint.keywordCluster.secondary,
  ].join(" ");

  if (!blueprint.slug || !/^[a-z0-9-]+$/.test(blueprint.slug)) {
    issues.push({
      severity: "error",
      message: "Slug must be lowercase, URL-safe and deterministic.",
    });
  }

  if (blueprint.title.length < 20 || blueprint.title.length > 90) {
    issues.push({
      severity: "warning",
      message: "Title should usually stay between 20 and 90 characters.",
    });
  }

  if (blueprint.description.length < 80 || blueprint.description.length > 180) {
    issues.push({
      severity: "warning",
      message: "Description should be concise and useful for search previews.",
    });
  }

  if (blueprint.keywordCluster.secondary.length > 8) {
    issues.push({
      severity: "warning",
      message: "Keyword cluster is large; reduce secondary keywords to avoid stuffing.",
    });
  }

  if (hasForbiddenClaimPattern(allText)) {
    issues.push({
      severity: "error",
      message:
        "Blueprint contains unsafe authority language: fake testimonials, fake guarantees or invented credentials are not allowed.",
    });
  }

  if (blueprint.pillar === "rf-shielding-rmn" && /cncan|plumb/i.test(allText)) {
    issues.push({
      severity: "warning",
      message:
        "RF/RMN content mentions CNCAN or plumb. Keep the distinction explicit and avoid implying equivalence.",
    });
  }

  if (
    (blueprint.pillar === "radiologie-cncan" ||
      blueprint.pillar === "protectie-radiologica") &&
    /faraday|rf shielding/i.test(allText)
  ) {
    issues.push({
      severity: "warning",
      message:
        "CT/RX/radiation content mentions RF concepts. Make the contrast explicit and keep requirements separate.",
    });
  }

  return {
    isPublishable: !issues.some((issue) => issue.severity === "error"),
    issues,
    rulesApplied: [...seoSafeContentCompositionRules],
  };
}

export function estimateReadingTime(text: string, wordsPerMinute = 180) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return `${minutes} min`;
}

export function toKnowledgeHubArticle(draft: ArticleDraft): Article {
  const textForReadingTime = [
    draft.intro,
    ...draft.blocks.flatMap(blockToText),
    ...draft.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
  const relationships = draft.relationships;

  return {
    slug: draft.blueprint.slug,
    title: draft.blueprint.title,
    description: draft.blueprint.description,
    category: draft.blueprint.category,
    tags: draft.seo.keywords.slice(0, 8),
    readingTime: estimateReadingTime(textForReadingTime),
    targetKeyword: draft.seo.targetKeyword,
    relatedServices: relationships.services,
    relatedTools: uniqueTools([...relationships.tools, ...relationships.calculators]),
    intro: draft.intro,
    sections: blocksToArticleSections(draft.blocks),
    faqs: draft.faqs,
    relatedArticles: relationships.articles,
    cta: draft.cta,
    publishedAt: draft.blueprint.publishedAt ?? new Date().toISOString().slice(0, 10),
    updatedAt: draft.blueprint.updatedAt ?? new Date().toISOString().slice(0, 10),
    semantic: {
      pillars: [draft.blueprint.pillar],
      intent: draft.blueprint.intent,
      funnelStage: draft.blueprint.funnelStage,
      planningPhases: draft.blueprint.planningPhases,
      modalities: draft.blueprint.modalities,
      equipmentTypes: draft.blueprint.equipmentTypes,
      projectComplexity: draft.blueprint.projectComplexity,
      commercialIntent: draft.blueprint.commercialIntent,
      authorityClusters: draft.blueprint.authorityCluster
        ? [draft.blueprint.authorityCluster]
        : undefined,
    },
  };
}

export function blocksToArticleSections(blocks: ArticleBlock[]): ArticleSection[] {
  return blocks
    .filter((block) => block.type !== "faq" && block.type !== "cta")
    .map((block): ArticleSection => {
      if (block.type === "callout") {
        return {
          id: block.id,
          title: block.title,
          body: block.body,
          callout: {
            title: block.title,
            body: block.body,
          },
        };
      }

      if (block.type === "risk-warning") {
        return {
          id: block.id,
          title: block.title,
          body: [...block.body, block.mitigation],
          bullets: block.risks,
          callout: {
            title: "De verificat",
            body: block.mitigation,
          },
        };
      }

      if (block.type === "comparison-table") {
        return {
          id: block.id,
          title: block.title,
          body: [
            block.intro,
            ...block.rows.map((row) => {
              const values = block.columns
                .map((column) => `${column.label}: ${row.values[column.key] ?? "-"}`)
                .join(" | ");

              return `${row.label}: ${values}`;
            }),
          ],
        };
      }

      return {
        id: block.id,
        title: block.title,
        body: block.body,
        bullets: block.type === "bullet-list" ? block.bullets : undefined,
      };
    });
}

export function createParagraphBlock(
  id: string,
  title: string,
  body: string | string[],
): ArticleBlock {
  return {
    type: "paragraphs",
    id,
    title,
    body: Array.isArray(body) ? body : [body],
  };
}

export function createBulletListBlock({
  id,
  title,
  body,
  bullets,
}: {
  id: string;
  title: string;
  body: string | string[];
  bullets: string[];
}): ArticleBlock {
  return {
    type: "bullet-list",
    id,
    title,
    body: Array.isArray(body) ? body : [body],
    bullets,
  };
}

export function createCalloutBlock(
  id: string,
  title: string,
  body: string,
  tone: Extract<ArticleBlock, { type: "callout" }>["tone"] = "technical",
): ArticleBlock {
  return {
    type: "callout",
    id,
    title,
    body,
    tone,
  };
}

export function createRiskWarningBlock({
  id,
  title,
  body,
  risks,
  mitigation,
}: {
  id: string;
  title: string;
  body: string | string[];
  risks: string[];
  mitigation: string;
}): ArticleBlock {
  return {
    type: "risk-warning",
    id,
    title,
    body: Array.isArray(body) ? body : [body],
    risks,
    mitigation,
  };
}

export function createComparisonTableBlock({
  id,
  title,
  intro,
  columns,
  rows,
}: {
  id: string;
  title: string;
  intro: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
}): ArticleBlock {
  return {
    type: "comparison-table",
    id,
    title,
    intro,
    columns,
    rows,
  };
}

export function createFaqBlock(
  id: string,
  title: string,
  items: ArticleFAQ[],
): ArticleBlock {
  return {
    type: "faq",
    id,
    title,
    items,
  };
}

export function createCtaBlock(cta: ArticleCTA, id = "next-step"): ArticleBlock {
  return {
    type: "cta",
    id,
    ...cta,
  };
}

export function slugifyTopic(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function blockToText(block: ArticleBlock): string[] {
  if (block.type === "faq") {
    return block.items.flatMap((item) => [item.question, item.answer]);
  }

  if (block.type === "cta") {
    return [block.title, block.description, block.label];
  }

  if (block.type === "callout") {
    return [block.title, block.body];
  }

  if (block.type === "risk-warning") {
    return [block.title, ...block.body, ...block.risks, block.mitigation];
  }

  if (block.type === "comparison-table") {
    return [
      block.title,
      block.intro,
      ...block.columns.map((column) => column.label),
      ...block.rows.flatMap((row) => [
        row.label,
        ...Object.values(row.values),
      ]),
    ];
  }

  if (block.type === "bullet-list") {
    return [block.title, ...block.body, ...block.bullets];
  }

  return [block.title, ...block.body];
}

function hasForbiddenClaimPattern(text: string) {
  return /(garantat|cel mai bun|numarul 1|testimonial|clientii nostri spun|certificat oficial fara sursa|studiu de caz real fara date)/i.test(
    text,
  );
}

function uniqueStrings(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function uniqueTools(items: ArticleTool[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.href)) {
      return false;
    }

    seen.add(item.href);
    return true;
  });
}
