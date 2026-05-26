import { comparisonPages, type ComparisonHubGroup, type ComparisonPageData } from "@/data/comparisons";
import type { InternalLinkRecommendation, RelatedContentSection } from "@/lib/internal-linking";

export type ComparisonHubSection = {
  group: ComparisonHubGroup;
  title: string;
  description: string;
  pages: ComparisonPageData[];
};

export const comparisonHubMeta: Record<
  ComparisonHubGroup,
  { title: string; description: string }
> = {
  imagistica: {
    title: "Imagistica",
    description:
      "Comparatii care clarifica alegerile intre tehnologii de imagistica si modul in care afecteaza infrastructura.",
  },
  infrastructura: {
    title: "Infrastructura",
    description:
      "Comparatii despre camere, layout si cerinte tehnice care schimba proiectul inca din faza de concept.",
  },
  "radioprotectie-rf": {
    title: "Radioprotectie / RF shielding",
    description:
      "Comparatii care separa clar cerintele RMN de cerintele CT / RX si de regulile de validare asociate.",
  },
  echipamente: {
    title: "Echipamente",
    description:
      "Comparatii legate de achizitie, refurbished, integrare si impactul asupra infrastructurii si service-ului.",
  },
  "service-mentenanta": {
    title: "Service / mentenanta",
    description:
      "Comparatii despre uptime, preventie, interventie si modul in care mentii aparatura in exploatare.",
  },
  "planificare-clinica": {
    title: "Planificare clinica",
    description:
      "Comparatii care ajuta la decizii de buget, coordonare, intake si alegerea traseului corect de proiect.",
  },
};

const comparisonGroupOrder: ComparisonHubGroup[] = [
  "imagistica",
  "infrastructura",
  "radioprotectie-rf",
  "echipamente",
  "service-mentenanta",
  "planificare-clinica",
];

export function getComparisonPageBySlug(slug: string): ComparisonPageData | undefined {
  return comparisonPages.find((page) => page.slug === slug);
}

export function getComparisonHubSections(): ComparisonHubSection[] {
  return comparisonGroupOrder
    .map((group) => ({
      group,
      title: comparisonHubMeta[group].title,
      description: comparisonHubMeta[group].description,
      pages: comparisonPages.filter((page) => page.hubGroup === group),
    }))
    .filter((section) => section.pages.length > 0);
}

export function getComparisonDiscoverySections(
  page: ComparisonPageData,
): RelatedContentSection[] {
  const servicesSection = buildSection(
    "Servicii relevante",
    "Serviciile care se leaga natural de comparatia tehnica si pot valida proiectul in urmatorul pas.",
    page.relatedServices.map((link, index) =>
      toRecommendation(link, "service", 92 - index * 3, "Relevant service for this comparison."),
    ),
  );

  const calculatorsSection = buildSection(
    "Calculatoare si instrumente",
    "Instrumentele ZES care ajuta la orientare, planificare si validarea ipotezelor initiale.",
    page.relatedCalculators.map((link, index) =>
      toRecommendation(
        link,
        "calculator",
        90 - index * 3,
        "Calculator relevant for the technical decision.",
      ),
    ),
  );

  const articlesSection = buildSection(
    "Knowledge Hub",
    "Lecturi conexe care adancesc contextul tehnic si ajuta la separarea corecta a cerintelor.",
    page.relatedArticles.map((link, index) =>
      toRecommendation(
        link,
        "article",
        86 - index * 3,
        "Related Knowledge Hub article for deeper context.",
      ),
    ),
  );

  const glossarySection = buildSection(
    "Glosar relevant",
    "Termenii care clarifica terminologia si reduc riscul de confuzie in discutia tehnica.",
    page.relatedGlossaryTerms.map((link, index) =>
      toRecommendation(
        link,
        "glossary",
        84 - index * 2,
        "Glossary term that clarifies the technical vocabulary.",
      ),
    ),
  );

  const comparisonSection = buildSection(
    "Comparatii apropiate",
    "Pagini apropiate semantic, utile cand decizia inca se rafineaza sau se compara mai multe scenarii.",
    getRelatedComparisonRecommendations(page, 3),
  );

  return [servicesSection, calculatorsSection, articlesSection, glossarySection, comparisonSection].filter(
    (section) => section.links.length > 0,
  );
}

export function getComparisonHubCardGroups(): ComparisonHubSection[] {
  return getComparisonHubSections();
}

function getRelatedComparisonRecommendations(
  page: ComparisonPageData,
  limit = 3,
): InternalLinkRecommendation[] {
  const sourceText = buildComparisonText(page);

  return comparisonPages
    .filter((candidate) => candidate.slug !== page.slug)
    .map((candidate) => {
      const score = scoreTextMatch(sourceText, [
        candidate.title,
        candidate.description,
        candidate.targetKeyword,
        candidate.category,
        candidate.intro,
        candidate.summaryVerdict,
        ...candidate.entities.flatMap((entity) => [
          entity.label,
          entity.summary,
          ...entity.chooseWhen,
          ...entity.tradeoffs,
        ]),
        ...candidate.decisionFactors,
        ...candidate.costImplications,
        ...candidate.infrastructureImplications,
        ...candidate.regulatoryNotes,
        ...candidate.mistakesToAvoid,
        ...candidate.faqs.flatMap((faq) => [faq.question, faq.answer]),
      ]);

      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }, index) =>
      toRecommendation(
        {
          label: candidate.title,
          href: `/comparatii/${candidate.slug}`,
        },
        "comparison",
        82 - index * 2,
        candidate.summaryVerdict,
      ),
    );
}

function buildSection(
  title: string,
  description: string,
  links: InternalLinkRecommendation[],
): RelatedContentSection {
  return {
    title,
    description,
    links: uniqueRecommendations(links),
  };
}

function toRecommendation(
  link: ComparisonPageData["relatedServices"][number],
  role: InternalLinkRecommendation["role"],
  priority: number,
  reason: string,
): InternalLinkRecommendation {
  return {
    label: link.label,
    href: link.href,
    role,
    reason,
    priority,
  };
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

export { comparisonPages };
