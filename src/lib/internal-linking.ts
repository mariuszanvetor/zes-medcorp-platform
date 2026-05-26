import { articles, type Article, type ArticleTool } from "@/data/articles";
import { comparisonPages, type ComparisonPageData } from "@/data/comparisons";
import { glossaryTerms } from "@/data/glossary";
import {
  programmaticCalculators,
  type ProgrammaticCalculatorDefinition,
} from "@/data/calculators";
import { seoClusters, type SeoCluster } from "@/data/seo-clusters";
import { services, type Service } from "@/data/services";
import { getServiceFunnelCrossLinks } from "@/lib/service-funnel-engine";
import {
  topicTaxonomy,
  type AuthorityCluster,
  type ArticleBlueprint,
  type ArticleRelationshipMap,
  type CommercialIntent,
  type FunnelStage,
  type Modality,
  type PlanningPhase,
  type ProjectComplexity,
  type SearchIntent,
  type TopicPillar,
} from "@/lib/content-engine";

export type LinkRole =
  | "primary-service"
  | "supporting-service"
  | "calculator"
  | "tool"
  | "guide"
  | "article"
  | "comparison"
  | "service"
  | "hub"
  | "glossary"
  | "contact";

export type InternalLinkRecommendation = {
  label: string;
  href: string;
  role: LinkRole;
  reason: string;
  priority: number;
};

export type InternalLinkPlan = {
  primaryCta: InternalLinkRecommendation;
  contextualLinks: InternalLinkRecommendation[];
  relatedServices: InternalLinkRecommendation[];
  relatedTools: InternalLinkRecommendation[];
  relatedArticles: InternalLinkRecommendation[];
  relatedGuides: InternalLinkRecommendation[];
};

export type LinkableContent = {
  href: string;
  label: string;
  text: string;
  pillarHints: TopicPillar[];
};

export type ArticleSemanticProfile = {
  slug: string;
  pillars: TopicPillar[];
  intent: SearchIntent;
  funnelStage: FunnelStage;
  planningPhases: PlanningPhase[];
  modalities: Modality[];
  equipmentTypes: Modality[];
  projectComplexity: ProjectComplexity;
  commercialIntent: CommercialIntent;
  authorityClusters: AuthorityCluster[];
};

export type RelatedContentSection = {
  title: string;
  description: string;
  links: InternalLinkRecommendation[];
};

const directToolRoutes: ArticleTool[] = [
  { label: "Analiză preliminară", href: "/ai-project-advisor" },
  { label: "Estimare proiect medical", href: "/calculator-proiect-medical" },
  { label: "Planificare radiologie", href: "/radiology-room-planner" },
  { label: "Evaluare service", href: "/service-diagnostic" },
  { label: "Propunere preliminară", href: "/proposal-builder" },
  { label: "Discutați cu ZES", href: "/contact" },
];

export function buildInternalLinkPlan(
  blueprint: ArticleBlueprint,
): InternalLinkPlan {
  const relationshipMap = createRelationshipMap(blueprint);
  const relatedServices = relationshipMap.services.map((href, index) =>
    serviceToRecommendation(href, index === 0 ? "primary-service" : "supporting-service"),
  );
  const hubLinks = getHubRecommendationsFromBlueprint(blueprint);
  const serviceFunnels = getServiceFunnelCrossLinks(blueprint);
  const calculators = relationshipMap.calculators.map((tool, index) =>
    toolToRecommendation(tool, "calculator", 92 - index),
  );
  const tools = relationshipMap.tools.map((tool, index) =>
    toolToRecommendation(tool, "tool", 88 - index),
  );
  const relatedArticles = relationshipMap.articles.map((slug, index) =>
    articleToRecommendation(slug, 78 - index),
  );
  const relatedGuides = getGuideRecommendations(blueprint).slice(0, 3);
  const primaryCta =
    choosePrimaryCta(blueprint, calculators, tools, relatedServices) ??
    toolToRecommendation({ label: "Discutați cu ZES", href: "/contact" }, "contact", 70);

  return {
    primaryCta,
    contextualLinks: uniqueRecommendations([
      ...relatedServices,
      ...hubLinks,
      ...serviceFunnels,
      ...calculators,
      ...tools,
      ...relatedGuides,
      ...relatedArticles,
    ])
      .filter((link) => link.href !== primaryCta.href)
      .slice(0, 8),
    relatedServices: uniqueRecommendations([...relatedServices, ...serviceFunnels]).slice(0, 4),
    relatedTools: uniqueRecommendations([...calculators, ...tools]).slice(0, 4),
    relatedArticles: relatedArticles.slice(0, 4),
    relatedGuides,
  };
}

export function createRelationshipMap(
  blueprint: ArticleBlueprint,
): ArticleRelationshipMap {
  const taxonomy = topicTaxonomy[blueprint.pillar];
  const custom = blueprint.relationships;
  const inferredArticles = inferRelatedArticles(blueprint).map((article) => article.slug);

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
    articles: uniqueStrings([
      ...(custom?.articles ?? []),
      ...inferredArticles,
    ]).slice(0, 5),
  };
}

export function getServiceRecommendations(
  blueprint: ArticleBlueprint,
): InternalLinkRecommendation[] {
  return createRelationshipMap(blueprint).services.map((href, index) =>
    serviceToRecommendation(href, index === 0 ? "primary-service" : "supporting-service"),
  );
}

export function getToolRecommendations(
  blueprint: ArticleBlueprint,
): InternalLinkRecommendation[] {
  const relationships = createRelationshipMap(blueprint);

  return uniqueRecommendations([
    ...relationships.calculators.map((tool, index) =>
      toolToRecommendation(tool, "calculator", 92 - index),
    ),
    ...relationships.tools.map((tool, index) =>
      toolToRecommendation(tool, "tool", 88 - index),
    ),
  ]);
}

export function getArticleRecommendations(
  blueprint: ArticleBlueprint,
  limit = 4,
): InternalLinkRecommendation[] {
  return createRelationshipMap(blueprint)
    .articles.map((slug, index) => articleToRecommendation(slug, 78 - index))
    .filter(Boolean)
    .slice(0, limit);
}

export function getGuideRecommendations(
  blueprint: ArticleBlueprint,
): InternalLinkRecommendation[] {
  const query = buildSearchText(blueprint);

  return seoClusters
    .map((cluster) => ({
      cluster,
      score: scoreTextMatch(query, [
        cluster.title,
        cluster.description,
        cluster.targetKeyword,
        ...cluster.secondaryKeywords,
        cluster.category,
      ]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ cluster }, index) => clusterToRecommendation(cluster, 74 - index));
}

export function getCalculatorRecommendations(
  blueprint: ArticleBlueprint,
): InternalLinkRecommendation[] {
  const query = buildSearchText(blueprint);

  return programmaticCalculators
    .map((calculator) => ({
      calculator,
      score: scoreTextMatch(query, [
        calculator.title,
        calculator.description,
        calculator.targetKeyword,
        ...calculator.keywords,
      ]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ calculator }, index) => calculatorToRecommendation(calculator, 86 - index));
}

export function validateInternalLinkPlan(plan: InternalLinkPlan) {
  const allLinks = [
    plan.primaryCta,
    ...plan.contextualLinks,
    ...plan.relatedServices,
    ...plan.relatedTools,
    ...plan.relatedArticles,
    ...plan.relatedGuides,
  ];
  const duplicateHrefs = findDuplicates(allLinks.map((link) => link.href));
  const invalidLinks = allLinks.filter((link) => !link.href.startsWith("/"));

  return {
    isValid: duplicateHrefs.length === 0 && invalidLinks.length === 0,
    duplicateHrefs,
    invalidLinks,
  };
}

export function getPrimaryConversionTarget(
  pillar: TopicPillar,
  intent: SearchIntent,
): ArticleTool {
  if (intent === "problem-solving" || pillar === "service-aparatura") {
    return { label: "Evaluare service", href: "/service-diagnostic" };
  }

  if (pillar === "rf-shielding-rmn" || pillar === "radiologie-cncan") {
    return { label: "Planificare radiologie", href: "/radiology-room-planner" };
  }

  if (intent === "commercial-investigation") {
    return { label: "Propunere preliminară", href: "/proposal-builder" };
  }

  return { label: "Analiză preliminară", href: "/ai-project-advisor" };
}

export function createLinkableContentIndex(): LinkableContent[] {
  return [
    ...services.map((service) => ({
      href: service.href,
      label: service.shortTitle,
      text: [
        service.title,
        service.seoDescription,
        service.schemaServiceType,
        ...service.keywords,
      ].join(" "),
      pillarHints: inferPillarsFromText(service.title + " " + service.seoDescription),
    })),
    ...programmaticCalculators.map((calculator) => ({
      href: `/calculatoare/${calculator.slug}`,
      label: calculator.title,
      text: [calculator.title, calculator.description, calculator.targetKeyword].join(" "),
      pillarHints: inferPillarsFromText(calculator.title + " " + calculator.description),
    })),
    ...seoClusters.map((cluster) => ({
      href: `/ghiduri/${cluster.slug}`,
      label: cluster.title,
      text: [cluster.title, cluster.description, cluster.targetKeyword].join(" "),
      pillarHints: inferPillarsFromText(cluster.title + " " + cluster.description),
    })),
    ...comparisonPages.map((page) => ({
      href: `/comparatii/${page.slug}`,
      label: page.title,
      text: buildComparisonText(page),
      pillarHints: inferPillarsFromText(page.title + " " + page.description),
    })),
    ...glossaryTerms.map((term) => ({
      href: `/glosar/${term.slug}`,
      label: term.title,
      text: [
        term.title,
        term.description,
        term.summary,
        term.definition,
        ...term.technicalNotes,
        ...term.validationNotes,
      ].join(" "),
      pillarHints: inferPillarsFromText(term.title + " " + term.description),
    })),
    ...articles.map((article) => ({
      href: `/knowledge-hub/${article.slug}`,
      label: article.title,
      text: [article.title, article.description, article.targetKeyword, ...article.tags].join(
        " ",
      ),
      pillarHints: inferPillarsFromText(article.title + " " + article.description),
    })),
  ];
}

export function getArticleSemanticProfile(article: Article): ArticleSemanticProfile {
  const text = buildArticleText(article);
  const normalized = normalizeText(text);
  const pillars = inferPillarsFromText(text);
  const planningPhases = inferPlanningPhases(normalized);
  const modalities = inferModalities(normalized);
  const authorityClusters = inferAuthorityClusters(normalized, pillars, modalities);
  const semantic = article.semantic;

  return {
    slug: article.slug,
    pillars: semantic?.pillars ?? pillars,
    intent: semantic?.intent ?? inferSearchIntent(normalized),
    funnelStage: semantic?.funnelStage ?? inferFunnelStage(normalized),
    planningPhases: semantic?.planningPhases ?? planningPhases,
    modalities: semantic?.modalities ?? modalities,
    equipmentTypes: semantic?.equipmentTypes ?? modalities.filter((modality) =>
      ["rmn", "ct", "rx", "ecografie", "ivd", "laborator"].includes(modality),
    ),
    projectComplexity:
      semantic?.projectComplexity ??
      inferProjectComplexity(pillars, modalities, normalized),
    commercialIntent: semantic?.commercialIntent ?? inferCommercialIntent(normalized),
    authorityClusters: semantic?.authorityClusters ?? authorityClusters,
  };
}

export function scoreSemanticRelevance(
  source: ArticleSemanticProfile,
  candidate: ArticleSemanticProfile,
) {
  if (source.slug === candidate.slug) {
    return 0;
  }

  let score = 0;

  score += overlap(source.authorityClusters, candidate.authorityClusters) * 18;
  score += overlap(source.modalities, candidate.modalities) * 16;
  score += overlap(source.pillars, candidate.pillars) * 14;
  score += overlap(source.planningPhases, candidate.planningPhases) * 8;

  if (source.intent === candidate.intent) {
    score += 8;
  }

  if (source.funnelStage === candidate.funnelStage) {
    score += 6;
  }

  if (source.commercialIntent === "high" && candidate.commercialIntent !== "low") {
    score += 4;
  }

  if (source.projectComplexity === candidate.projectComplexity) {
    score += 3;
  }

  return score;
}

export function getSemanticArticleRecommendations(
  article: Article,
  limit = 6,
): InternalLinkRecommendation[] {
  const sourceProfile = getArticleSemanticProfile(article);
  const manualSlugs = new Set(article.relatedArticles);

  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const profile = getArticleSemanticProfile(candidate);
      const manualBoost = manualSlugs.has(candidate.slug) ? 24 : 0;
      const score = scoreSemanticRelevance(sourceProfile, profile) + manualBoost;

      return { candidate, score };
    })
    .filter((item) => item.score >= 18)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate, score }) => ({
      label: candidate.title,
      href: `/knowledge-hub/${candidate.slug}`,
      role: "article",
      reason: createSemanticReason(sourceProfile, getArticleSemanticProfile(candidate)),
      priority: Math.min(96, 58 + score),
    }));
}

export function getSemanticServiceRecommendations(
  article: Article,
  limit = 4,
): InternalLinkRecommendation[] {
  const sourceProfile = getArticleSemanticProfile(article);
  const manual = article.relatedServices.map((href, index) => ({
    href,
    score: 48 - index * 4,
  }));
  const inferred = services.map((service) => {
    const text = [
      service.title,
      service.shortTitle,
      service.seoDescription,
      service.schemaServiceType,
      ...service.keywords,
    ].join(" ");
    const servicePillars = inferPillarsFromText(text);
    const score =
      overlap(sourceProfile.pillars, servicePillars) * 22 +
      scoreTextMatch(buildArticleText(article), [
        service.title,
        service.shortTitle,
        service.seoDescription,
        ...service.keywords,
      ]);

    return { href: service.href, score };
  });

  return mergeScoredHrefs([...manual, ...inferred])
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item, index) =>
      serviceToRecommendation(
        item.href,
        index === 0 ? "primary-service" : "supporting-service",
      ),
    );
}

export function getSemanticCalculatorRecommendations(
  article: Article,
  limit = 3,
): InternalLinkRecommendation[] {
  const sourceProfile = getArticleSemanticProfile(article);

  return programmaticCalculators
    .map((calculator) => {
      const text = [
        calculator.title,
        calculator.description,
        calculator.targetKeyword,
        ...calculator.keywords,
      ].join(" ");
      const profile = profileFromText(`calculator-${calculator.slug}`, text);
      const score =
        scoreSemanticRelevance(sourceProfile, profile) +
        scoreTextMatch(buildArticleText(article), [
          calculator.title,
          calculator.description,
          calculator.targetKeyword,
          ...calculator.keywords,
        ]);

      return { calculator, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ calculator, score }) =>
      calculatorToRecommendation(calculator, Math.min(94, 72 + score)),
    );
}

export function getSemanticGuideRecommendations(
  article: Article,
  limit = 4,
): InternalLinkRecommendation[] {
  const sourceProfile = getArticleSemanticProfile(article);

  return seoClusters
    .map((cluster) => {
      const text = [
        cluster.title,
        cluster.description,
        cluster.targetKeyword,
        ...cluster.secondaryKeywords,
        cluster.category,
      ].join(" ");
      const profile = profileFromText(`guide-${cluster.slug}`, text);
      const score =
        scoreSemanticRelevance(sourceProfile, profile) +
        scoreTextMatch(buildArticleText(article), [
          cluster.title,
          cluster.description,
          cluster.targetKeyword,
          ...cluster.secondaryKeywords,
        ]);

      return { cluster, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ cluster, score }) =>
      clusterToRecommendation(cluster, Math.min(88, 62 + score)),
    );
}

export function getSemanticComparisonRecommendations(
  article: Article,
  limit = 4,
): InternalLinkRecommendation[] {
  const sourceProfile = getArticleSemanticProfile(article);
  const query = buildArticleText(article);

  return comparisonPages
    .map((page) => {
      const profile = profileFromText(`comparison-${page.slug}`, buildComparisonText(page));
      const score =
        scoreSemanticRelevance(sourceProfile, profile) +
        scoreTextMatch(query, [
          page.title,
          page.description,
          page.targetKeyword,
          page.category,
          page.summaryVerdict,
          ...page.entities.flatMap((entity) => [
            entity.label,
            entity.summary,
            ...entity.chooseWhen,
            ...entity.tradeoffs,
          ]),
          ...page.decisionFactors,
          ...page.costImplications,
          ...page.infrastructureImplications,
          ...page.regulatoryNotes,
          ...page.mistakesToAvoid,
          ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
        ]);

      return { page, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ page, score }, index) => ({
      label: page.title,
      href: `/comparatii/${page.slug}`,
      role: "comparison" as const,
      reason: page.summaryVerdict,
      priority: Math.min(92, 68 + score - index),
    }));
}

export function getSemanticGlossaryRecommendations(
  article: Article,
  limit = 4,
): InternalLinkRecommendation[] {
  const query = buildArticleText(article);

  return glossaryTerms
    .map((term) => {
      const score = scoreTextMatch(query, [
        term.title,
        term.description,
        term.summary,
        term.definition,
        ...term.technicalNotes,
        ...term.validationNotes,
        ...term.methodology,
        ...term.standards,
      ]);

      return { term, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ term, score }, index) => ({
      label: term.title,
      href: `/glosar/${term.slug}`,
      role: "glossary" as const,
      reason: term.summary,
      priority: Math.min(92, 70 + score - index),
    }));
}

export function getSemanticToolRecommendations(
  article: Article,
  limit = 4,
): InternalLinkRecommendation[] {
  const sourceProfile = getArticleSemanticProfile(article);
  const preferredTools = toolsForProfile(sourceProfile);
  const manualTools = article.relatedTools.map((tool, index) =>
    toolToRecommendation(tool, inferToolRole(tool.href), 86 - index),
  );
  const inferredTools = preferredTools.map((tool, index) =>
    toolToRecommendation(tool, inferToolRole(tool.href), 82 - index),
  );

  return uniqueRecommendations([...manualTools, ...inferredTools]).slice(0, limit);
}

export function getArticleDiscoverySections(article: Article): RelatedContentSection[] {
  const hubs = getHubRecommendationsFromArticle(article);
  const calculators = getSemanticCalculatorRecommendations(article, 3);
  const tools = getSemanticToolRecommendations(article, 3);
  const services = getSemanticServiceRecommendations(article, 4);
  const guides = getSemanticGuideRecommendations(article, 3);
  const comparisons = getSemanticComparisonRecommendations(article, 3);
  const glossary = getSemanticGlossaryRecommendations(article, 4);
  const articlesForCluster = getSemanticArticleRecommendations(article, 5);
  const nextSteps = uniqueRecommendations([...calculators, ...tools]).slice(0, 4);
  const used = new Set<string>();
  const freshLinks = (links: InternalLinkRecommendation[]) =>
    links.filter((link) => {
      if (used.has(link.href)) {
        return false;
      }

      used.add(link.href);
      return true;
    });

  return [
    {
      title: "Hub-uri esentiale",
      description:
        "Salt rapid catre hub-ul potrivit: servicii, calculatoare, comparatii, glosar, planificare, propunere sau intake.",
      links: freshLinks(hubs),
    },
    {
      title: "Planificare recomandata",
      description:
        "Instrumente utile pentru a transforma lectura intr-o verificare tehnica preliminara.",
      links: freshLinks(nextSteps),
    },
    {
      title: "Servicii pentru acest context",
      description:
        "Pilonii ZES care se leaga natural de subiect, fara a amesteca cerinte tehnice diferite.",
      links: freshLinks(services),
    },
    {
      title: "Ghiduri si calculatoare conexe",
      description:
        "Resurse orientate pe cost, autorizare, infrastructura sau echipamente, in functie de intentie.",
      links: freshLinks(uniqueRecommendations([...guides, ...calculators]).slice(0, 4)),
    },
    {
      title: "Comparatii tehnice utile",
      description:
        "Pagini care clarifica diferentele reale intre optiuni apropiate si ajuta la decizia corecta.",
      links: freshLinks(comparisons),
    },
    {
      title: "Glosar relevant",
      description:
        "Definitii si comparatii utile pentru a clarifica termenii tehnici si a evita confuziile de proiect.",
      links: freshLinks(glossary),
    },
    {
      title: "Articole din acelasi cluster",
      description:
        "Lecturi apropiate ca etapa de proiect, echipament, risc sau intentie de cautare.",
      links: freshLinks(articlesForCluster),
    },
  ].filter((section) => section.links.length > 0);
}

function choosePrimaryCta(
  blueprint: ArticleBlueprint,
  calculators: InternalLinkRecommendation[],
  tools: InternalLinkRecommendation[],
  services: InternalLinkRecommendation[],
) {
  const target = getPrimaryConversionTarget(blueprint.pillar, blueprint.intent);
  const candidates = [...calculators, ...tools, ...services];
  const exact = candidates.find((candidate) => candidate.href === target.href);

  if (exact) {
    return exact;
  }

  if (blueprint.intent === "commercial-investigation") {
    return calculators[0] ?? tools[0] ?? services[0];
  }

  return tools[0] ?? calculators[0] ?? services[0];
}

function inferRelatedArticles(blueprint: ArticleBlueprint) {
  const query = buildSearchText(blueprint);

  return articles
    .map((article) => ({
      article,
      score: scoreTextMatch(query, [
        article.title,
        article.description,
        article.targetKeyword,
        article.category,
        ...article.tags,
      ]),
    }))
    .filter((item) => item.score > 0 && item.article.slug !== blueprint.slug)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article);
}

function buildArticleText(article: Article) {
  return [
    article.slug,
    article.title,
    article.description,
    article.category,
    article.targetKeyword,
    ...article.tags,
    article.intro,
    ...article.sections.flatMap((section) => [
      section.title,
      ...toTextArray(section.body),
      ...(section.bullets ?? []),
      section.callout?.title ?? "",
      section.callout?.body ?? "",
    ]),
    ...article.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
}

function buildComparisonText(page: ComparisonPageData) {
  return [
    page.slug,
    page.title,
    page.description,
    page.targetKeyword,
    page.category,
    page.intro,
    page.summaryVerdict,
    ...page.entities.flatMap((entity) => [
      entity.label,
      entity.summary,
      ...entity.chooseWhen,
      ...entity.tradeoffs,
    ]),
    ...page.comparisonTable.rows.flatMap((row) => [row.label, ...Object.values(row.values)]),
    ...page.decisionFactors,
    ...page.costImplications,
    ...page.infrastructureImplications,
    ...page.regulatoryNotes,
    ...page.mistakesToAvoid,
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
}

function profileFromText(slug: string, text: string): ArticleSemanticProfile {
  const normalized = normalizeText(text);
  const pillars = inferPillarsFromText(text);
  const modalities = inferModalities(normalized);

  return {
    slug,
    pillars,
    intent: inferSearchIntent(normalized),
    funnelStage: inferFunnelStage(normalized),
    planningPhases: inferPlanningPhases(normalized),
    modalities,
    equipmentTypes: modalities.filter((modality) =>
      ["rmn", "ct", "rx", "ecografie", "ivd", "laborator"].includes(modality),
    ),
    projectComplexity: inferProjectComplexity(pillars, modalities, normalized),
    commercialIntent: inferCommercialIntent(normalized),
    authorityClusters: inferAuthorityClusters(normalized, pillars, modalities),
  };
}

function inferSearchIntent(text: string): SearchIntent {
  if (/cncan|dsp|autoriz/.test(text)) {
    return "regulatory";
  }

  if (/service|mentenanta|downtime|defect|eroare|interventie/.test(text)) {
    return "problem-solving";
  }

  if (/cost|buget|achizitie|contract|oferta|pret/.test(text)) {
    return "commercial-investigation";
  }

  if (/checklist|pregat|planific|proiectare|instalare|integrare/.test(text)) {
    return "technical-planning";
  }

  return "educational-authority";
}

function inferFunnelStage(text: string): FunnelStage {
  if (/service|mentenanta|contact|interventie|oferta|proposal|contract/.test(text)) {
    return "post-lead";
  }

  if (/cost|buget|achizitie|calculator|pret|cat dureaza/.test(text)) {
    return "high-intent";
  }

  if (/checklist|pregat|planific|proiectare|modernizare|autoriz/.test(text)) {
    return "mid";
  }

  return "awareness";
}

function inferPlanningPhases(text: string): PlanningPhase[] {
  const phases: PlanningPhase[] = [];

  addIf(phases, "concept", /idee|concept|flux|strategie|planificare/.test(text));
  addIf(phases, "feasibility", /cost|buget|estim|fezabil|investitie|durata/.test(text));
  addIf(phases, "authorization", /dsp|cncan|autoriz|documentatie|conform/.test(text));
  addIf(phases, "design", /proiectare|layout|camera|spatiu|infrastructura/.test(text));
  addIf(phases, "procurement", /achizitie|alegere|aparatura|echipament|furnizor/.test(text));
  addIf(phases, "installation", /instalare|montaj|integrare|livrare/.test(text));
  addIf(phases, "commissioning", /testare|commissioning|validare|calibrare|qc/.test(text));
  addIf(phases, "operation", /operare|operational|uptime|flux pacient|flux probe/.test(text));
  addIf(phases, "maintenance", /service|mentenanta|preventiv|corectiv|downtime/.test(text));
  addIf(phases, "modernization", /modernizare|retrofit|existent|inlocuire/.test(text));

  return phases.length ? phases : ["concept"];
}

function inferModalities(text: string): Modality[] {
  const modalities: Modality[] = [];

  addIf(modalities, "rmn", /\brmn\b|\bmri\b|faraday|rf shielding|cusca faraday/.test(text));
  addIf(modalities, "ct", /\bct\b|computer tomograf/.test(text));
  addIf(modalities, "rx", /\brx\b|x-ray|radiografie|fluoroscopie/.test(text));
  addIf(modalities, "ecografie", /ecograf|ultrasound|ecografie/.test(text));
  addIf(modalities, "ivd", /\bivd\b|diagnostic in vitro/.test(text));
  addIf(modalities, "laborator", /laborator|probe|analiz/.test(text));
  addIf(modalities, "clinica", /clinica|cabinet|spital|sectie/.test(text));
  addIf(modalities, "service", /service|mentenanta|downtime|interventie/.test(text));

  return modalities.length ? modalities : ["clinica"];
}

function inferAuthorityClusters(
  text: string,
  pillars: TopicPillar[],
  modalities: Modality[],
): AuthorityCluster[] {
  const clusters: AuthorityCluster[] = [];

  addIf(
    clusters,
    "clinic-planning",
    pillars.includes("constructii-medicale") ||
      pillars.includes("proiectare-medicala") ||
      modalities.includes("clinica"),
  );
  addIf(clusters, "radiology-planning", /radiolog|imagistic|camera/.test(text));
  addIf(clusters, "rmn-rf", modalities.includes("rmn") || pillars.includes("rf-shielding-rmn"));
  addIf(
    clusters,
    "ct-radiation",
    modalities.includes("ct") ||
      modalities.includes("rx") ||
      pillars.includes("protectie-radiologica"),
  );
  addIf(clusters, "cncan-dsp", /cncan|dsp|autoriz|conform/.test(text));
  addIf(
    clusters,
    "equipment-imaging",
    pillars.includes("imagistica-medicala") ||
      pillars.includes("achizitie-echipamente") ||
      /aparatura|echipament|ecograf/.test(text),
  );
  addIf(
    clusters,
    "ivd-lab",
    pillars.includes("ivd-laborator") ||
      modalities.includes("ivd") ||
      modalities.includes("laborator"),
  );
  addIf(
    clusters,
    "service-uptime",
    pillars.includes("service-aparatura") ||
      modalities.includes("service") ||
      /uptime|mentenanta|downtime/.test(text),
  );
  addIf(clusters, "modernization", /modernizare|retrofit|existent|inlocuire/.test(text));
  addIf(clusters, "budgeting", /cost|buget|estim|investitie|pret/.test(text));

  return clusters.length ? clusters : ["clinic-planning"];
}

function inferProjectComplexity(
  pillars: TopicPillar[],
  modalities: Modality[],
  text: string,
): ProjectComplexity {
  const hasSpecialModality =
    modalities.includes("rmn") || modalities.includes("ct") || modalities.includes("rx");
  const hasMultipleDomains = pillars.length >= 3 || modalities.length >= 3;

  if (
    hasMultipleDomains ||
    /turnkey|spital|sectie|complex|imediat|critic|cncan.*ct|rmn.*rf/.test(text)
  ) {
    return "high-complexity";
  }

  if (hasSpecialModality || /ivd|laborator|modernizare|autoriz/.test(text)) {
    return "advanced";
  }

  if (/cabinet|ecograf|preventiv|concept/.test(text)) {
    return "basic";
  }

  return "moderate";
}

function inferCommercialIntent(text: string): CommercialIntent {
  if (/imediat|critic|urgent|oprit complet|downtime/.test(text)) {
    return "urgent";
  }

  if (/cost|buget|oferta|achizitie|proposal|contract|calculator/.test(text)) {
    return "high";
  }

  if (/checklist|planific|pregat|autoriz|modernizare|instalare/.test(text)) {
    return "medium";
  }

  return "low";
}

function createSemanticReason(
  source: ArticleSemanticProfile,
  candidate: ArticleSemanticProfile,
) {
  const modalityMatch = source.modalities.filter((modality) =>
    candidate.modalities.includes(modality),
  );
  const clusterMatch = source.authorityClusters.filter((cluster) =>
    candidate.authorityClusters.includes(cluster),
  );

  if (modalityMatch.length) {
    return `Related by modality: ${modalityMatch.join(", ")}.`;
  }

  if (clusterMatch.length) {
    return `Related authority cluster: ${clusterMatch[0]}.`;
  }

  return "Related by search intent and planning stage.";
}

function toolsForProfile(profile: ArticleSemanticProfile): ArticleTool[] {
  const tools: ArticleTool[] = [];

  if (
    profile.modalities.some((modality) => ["rmn", "ct", "rx"].includes(modality)) ||
    profile.authorityClusters.some((cluster) =>
      ["rmn-rf", "ct-radiation", "radiology-planning"].includes(cluster),
    )
  ) {
    tools.push({ label: "Radiology Room Planner", href: "/radiology-room-planner" });
  }

  if (
    profile.authorityClusters.includes("service-uptime") ||
    profile.commercialIntent === "urgent"
  ) {
    tools.push({ label: "Diagnostic service", href: "/service-diagnostic" });
  }

  if (
    profile.commercialIntent === "high" ||
    profile.projectComplexity === "high-complexity"
  ) {
    tools.push({ label: "Proposal Builder", href: "/proposal-builder" });
  }

  if (
    profile.authorityClusters.includes("clinic-planning") ||
    profile.authorityClusters.includes("budgeting") ||
    profile.funnelStage === "mid"
  ) {
    tools.push({ label: "Consultant AI", href: "/ai-project-advisor" });
  }

  return tools.length
    ? uniqueTools(tools)
    : [{ label: "Consultanta tehnica", href: "/contact" }];
}

function inferToolRole(
  href: string,
): Extract<LinkRole, "calculator" | "tool" | "contact"> {
  if (href === "/contact") {
    return "contact";
  }

  if (href.startsWith("/calculatoare") || href === "/calculator-proiect-medical") {
    return "calculator";
  }

  return "tool";
}

function mergeScoredHrefs(items: Array<{ href: string; score: number }>) {
  const scored = new Map<string, number>();

  for (const item of items) {
    scored.set(item.href, Math.max(scored.get(item.href) ?? 0, item.score));
  }

  return Array.from(scored, ([href, score]) => ({ href, score }));
}

function serviceToRecommendation(
  href: string,
  role: Extract<LinkRole, "primary-service" | "supporting-service">,
): InternalLinkRecommendation {
  const service = services.find((item) => item.href === href);

  return {
    label: service?.shortTitle ?? href,
    href,
    role,
    reason: service
      ? `Relevant service for ${service.schemaServiceType}.`
      : "Service path supplied by content blueprint.",
    priority: role === "primary-service" ? 95 : 82,
  };
}

function toolToRecommendation(
  tool: ArticleTool,
  role: Extract<LinkRole, "calculator" | "tool" | "contact">,
  priority: number,
): InternalLinkRecommendation {
  return {
    label: tool.label,
    href: tool.href,
    role,
    reason: "Recommended next step based on topic intent.",
    priority,
  };
}

function articleToRecommendation(
  slug: string,
  priority: number,
): InternalLinkRecommendation {
  const article = articles.find((item) => item.slug === slug);

  return {
    label: article?.title ?? slug,
    href: `/knowledge-hub/${slug}`,
    role: "article",
    reason: article
      ? `Related Knowledge Hub article in ${article.category}.`
      : "Related article supplied by content blueprint.",
    priority,
  };
}

function hubToRecommendation(
  href: string,
  label: string,
  reason: string,
  priority: number,
): InternalLinkRecommendation {
  return {
    label,
    href,
    role: "hub",
    reason,
    priority,
  };
}

function getHubRecommendationsFromBlueprint(
  blueprint: Pick<
    ArticleBlueprint,
    "pillar" | "intent" | "funnelStage" | "projectComplexity" | "authorityCluster" | "commercialIntent"
  >,
) {
  return getHubRecommendationsFromTraits({
    pillar: blueprint.pillar,
    intent: blueprint.intent,
    funnelStage: blueprint.funnelStage,
    projectComplexity: blueprint.projectComplexity,
    authorityCluster: blueprint.authorityCluster,
    commercialIntent: blueprint.commercialIntent,
  });
}

function getHubRecommendationsFromArticle(article: Article) {
  const profile = getArticleSemanticProfile(article);

  return getHubRecommendationsFromTraits({
    pillar: profile.pillars[0] ?? "planning-tools",
    intent: profile.intent,
    funnelStage: profile.funnelStage,
    projectComplexity: profile.projectComplexity,
    authorityCluster: profile.authorityClusters[0],
    commercialIntent: profile.commercialIntent,
  });
}

function getHubRecommendationsFromTraits(traits: {
  pillar: TopicPillar;
  intent: SearchIntent;
  funnelStage: FunnelStage;
  projectComplexity?: ProjectComplexity;
  authorityCluster?: AuthorityCluster;
  commercialIntent?: CommercialIntent;
}) {
  const hubs: InternalLinkRecommendation[] = [];
  const technicalIntent =
    traits.intent === "commercial-investigation" ||
    traits.intent === "technical-planning" ||
    traits.intent === "problem-solving";
  const awarenessIntent =
    traits.intent === "educational-authority" || traits.funnelStage === "awareness";
  const projectIntent =
    traits.commercialIntent === "high" ||
    traits.commercialIntent === "urgent" ||
    traits.funnelStage === "high-intent" ||
    traits.projectComplexity === "high-complexity";

  addIf(
    hubs,
    hubToRecommendation(
      "/servicii",
      "Servicii comerciale",
      "Connect the article to the commercial service hub.",
      96,
    ),
    traits.pillar !== "planning-tools" || projectIntent,
  );

  addIf(
    hubs,
    hubToRecommendation(
      "/calculatoare",
      "Calculatoare medicale",
      "Move readers toward oriented estimates and project sizing.",
      94,
    ),
    technicalIntent || projectIntent || traits.funnelStage !== "awareness",
  );

  addIf(
    hubs,
    hubToRecommendation(
      "/comparatii",
      "Comparații tehnice",
      "Surface a comparison path when readers are weighing options.",
      92,
    ),
    technicalIntent || awarenessIntent || traits.authorityCluster === "equipment-imaging",
  );

  addIf(
    hubs,
    hubToRecommendation(
      "/glosar",
      "Glosar medical",
      "Help readers decode the technical language before they continue.",
      90,
    ),
    awarenessIntent ||
      traits.authorityCluster === "cncan-dsp" ||
      traits.authorityCluster === "rmn-rf" ||
      traits.authorityCluster === "ct-radiation",
  );

  addIf(
    hubs,
    hubToRecommendation(
      "/planificare",
      "Planificare proiect",
      "Route readers into the scenario-based planning hub.",
      89,
    ),
    traits.funnelStage === "awareness" ||
      traits.funnelStage === "mid" ||
      traits.pillar === "constructii-medicale" ||
      traits.pillar === "proiectare-medicala" ||
      traits.pillar === "modernizare-clinici",
  );

  addIf(
    hubs,
    hubToRecommendation(
      "/knowledge-hub",
      "Knowledge Hub",
      "Keep the reader inside the educational resource library.",
      88,
    ),
    true,
  );

  addIf(
    hubs,
    hubToRecommendation(
      "/proposal-builder",
      "Proposal Builder",
      "Move high-intent readers toward a preliminary proposal.",
      97,
    ),
    projectIntent || traits.intent === "commercial-investigation",
  );

  addIf(
    hubs,
    hubToRecommendation(
      "/project-intake",
      "Project Intake",
      "Collect the technical details needed for a clearer analysis.",
      98,
    ),
    projectIntent || traits.authorityCluster === "clinic-planning" || traits.authorityCluster === "modernization",
  );

  return uniqueRecommendations(hubs).slice(0, 6);
}

function clusterToRecommendation(
  cluster: SeoCluster,
  priority: number,
): InternalLinkRecommendation {
  return {
    label: cluster.title,
    href: `/ghiduri/${cluster.slug}`,
    role: "guide",
    reason: `Related guide for ${cluster.targetKeyword}.`,
    priority,
  };
}

function calculatorToRecommendation(
  calculator: ProgrammaticCalculatorDefinition,
  priority: number,
): InternalLinkRecommendation {
  return {
    label: calculator.title,
    href: `/calculatoare/${calculator.slug}`,
    role: "calculator",
    reason: `Related estimator for ${calculator.targetKeyword}.`,
    priority,
  };
}

function buildSearchText(blueprint: ArticleBlueprint) {
  return [
    blueprint.title,
    blueprint.description,
    blueprint.thesis,
    blueprint.keywordCluster.primary,
    ...blueprint.keywordCluster.secondary,
    ...blueprint.requiredAngles,
    topicTaxonomy[blueprint.pillar].label,
  ].join(" ");
}

function scoreTextMatch(query: string, candidates: string[]) {
  const queryTokens = tokenize(query);
  const candidateTokens = tokenize(candidates.join(" "));
  let score = 0;

  for (const token of queryTokens) {
    if (candidateTokens.has(token)) {
      score += token.length > 5 ? 3 : 1;
    }
  }

  return score;
}

function tokenize(text: string) {
  return new Set(
    normalizeText(text)
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 2),
  );
}

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function toTextArray(value: string | string[]) {
  return Array.isArray(value) ? value : [value];
}

function addIf<T>(items: T[], item: T, condition: boolean) {
  if (condition && !items.includes(item)) {
    items.push(item);
  }
}

function overlap<T>(first: T[], second: T[]) {
  const secondSet = new Set(second);
  return first.filter((item) => secondSet.has(item)).length;
}

function inferPillarsFromText(text: string): TopicPillar[] {
  const normalized = normalizeText(text);
  const pillars: TopicPillar[] = [];

  if (/construct|amenajar|clinica|dsp/.test(normalized)) {
    pillars.push("constructii-medicale");
  }
  if (/radiolog|cncan|ct|rx/.test(normalized)) {
    pillars.push("radiologie-cncan");
  }
  if (/rmn|mri|rf|faraday/.test(normalized)) {
    pillars.push("rf-shielding-rmn");
  }
  if (/plumb|radioprotect|protectie radiologica/.test(normalized)) {
    pillars.push("protectie-radiologica");
  }
  if (/imagistic|ecograf|ultrasound/.test(normalized)) {
    pillars.push("imagistica-medicala");
  }
  if (/ivd|laborator/.test(normalized)) {
    pillars.push("ivd-laborator");
  }
  if (/service|mentenanta|diagnostic/.test(normalized)) {
    pillars.push("service-aparatura");
  }

  return pillars.length ? pillars : ["planning-tools"];
}

function uniqueRecommendations(items: InternalLinkRecommendation[]) {
  const seen = new Set<string>();

  return items
    .filter((item) => {
      if (seen.has(item.href)) {
        return false;
      }

      seen.add(item.href);
      return true;
    })
    .sort((a, b) => b.priority - a.priority);
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

function uniqueStrings(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function findDuplicates(items: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item)) {
      duplicates.add(item);
    }

    seen.add(item);
  }

  return Array.from(duplicates);
}

export { directToolRoutes };
