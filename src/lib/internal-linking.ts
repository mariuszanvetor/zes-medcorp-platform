import { articles, type Article, type ArticleTool } from "@/data/articles";
import {
  programmaticCalculators,
  type ProgrammaticCalculatorDefinition,
} from "@/data/calculators";
import { seoClusters, type SeoCluster } from "@/data/seo-clusters";
import { services, type Service } from "@/data/services";
import {
  topicTaxonomy,
  type ArticleBlueprint,
  type ArticleRelationshipMap,
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

const directToolRoutes: ArticleTool[] = [
  { label: "Consultant AI", href: "/ai-project-advisor" },
  { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
  { label: "Radiology Room Planner", href: "/radiology-room-planner" },
  { label: "Diagnostic service", href: "/service-diagnostic" },
  { label: "Proposal Builder", href: "/proposal-builder" },
  { label: "Contact ZES", href: "/contact" },
];

export function buildInternalLinkPlan(
  blueprint: ArticleBlueprint,
): InternalLinkPlan {
  const relationshipMap = createRelationshipMap(blueprint);
  const relatedServices = relationshipMap.services.map((href, index) =>
    serviceToRecommendation(href, index === 0 ? "primary-service" : "supporting-service"),
  );
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
    toolToRecommendation({ label: "Contact ZES", href: "/contact" }, "contact", 70);

  return {
    primaryCta,
    contextualLinks: uniqueRecommendations([
      ...relatedServices,
      ...calculators,
      ...tools,
      ...relatedGuides,
      ...relatedArticles,
    ])
      .filter((link) => link.href !== primaryCta.href)
      .slice(0, 8),
    relatedServices: relatedServices.slice(0, 4),
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
    return { label: "Diagnostic service", href: "/service-diagnostic" };
  }

  if (pillar === "rf-shielding-rmn" || pillar === "radiologie-cncan") {
    return { label: "Radiology Room Planner", href: "/radiology-room-planner" };
  }

  if (intent === "commercial-investigation") {
    return { label: "Proposal Builder", href: "/proposal-builder" };
  }

  return { label: "Consultant AI", href: "/ai-project-advisor" };
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
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 2),
  );
}

function inferPillarsFromText(text: string): TopicPillar[] {
  const normalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
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
