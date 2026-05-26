import {
  generateGlossarySlug,
  getGlossaryTermBySlug,
  glossaryCategories,
  glossaryTerms,
  type GlossaryTerm,
} from "@/data/glossary";

export type GlossaryCluster = {
  label: string;
  slugs: string[];
  description: string;
};

export type GlossaryDiscoverySection = {
  title: string;
  description: string;
  links: Array<{
    label: string;
    href: string;
    role: "glossary" | "calculator" | "tool" | "guide" | "article" | "service" | "contact";
    reason: string;
    priority: number;
  }>;
};

export function getGlossaryStaticParams() {
  return glossaryTerms.map((term) => ({
    slug: term.slug,
  }));
}

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return getGlossaryTermBySlug(slug);
}

export function buildGlossaryClusters(): GlossaryCluster[] {
  return glossaryCategories.map((label) => {
    const slugs = glossaryTerms
      .filter((term) => term.category === label)
      .map((term) => term.slug);

    return {
      label,
      slugs,
      description: getClusterDescription(label),
    };
  });
}

export function getGlossaryDiscoverySections(term: GlossaryTerm): GlossaryDiscoverySection[] {
  return [
    {
      title: "Termeni înrudiți",
      description:
        "Continuă cu definiții și comparații care clarifică același traseu tehnic.",
      links: getRelatedTermLinks(term),
    },
    {
      title: "Calculatoare și instrumente",
      description:
        "Treci din definiție în estimare, planificare sau propunere preliminară.",
      links: term.relatedTools.map((tool, index) => ({
        label: tool.label,
        href: tool.href,
        role: tool.href.includes("calculator")
          ? "calculator"
          : tool.href.includes("proposal")
            ? "tool"
            : "tool",
        reason: "Instrument util pentru a transforma termenul în cerințe de proiect.",
        priority: 88 - index,
      })),
    },
    {
      title: "Servicii și ghiduri",
      description:
        "Urmează traseul tehnic potrivit pentru consultanță, infrastructură sau radiologie.",
      links: [
        ...term.relatedServices.map((href, index) => ({
          label: serviceLabelFromHref(href),
          href,
          role: "service" as const,
          reason: "Serviciu relevant pentru implementarea sau validarea termenului.",
          priority: 84 - index,
        })),
        ...term.relatedGuides.map((guide, index) => ({
          label: guide.label,
          href: guide.href,
          role: "guide" as const,
          reason: "Ghid util pentru contextul tehnic al termenului.",
          priority: 78 - index,
        })),
      ],
    },
    {
      title: "Următorul pas",
      description:
        "Dacă termenul descrie situația ta, continuă către un parcurs de proiect sau o propunere preliminară.",
      links: [
        {
          label: term.cta.label,
          href: term.cta.href,
          role: "contact",
          reason: term.cta.description,
          priority: 95,
        },
      ],
    },
  ];
}

export function getGlossaryRelatedTerms(
  term: GlossaryTerm,
  limit = 4,
): GlossaryTerm[] {
  const related = new Map<string, GlossaryTerm>();

  for (const slug of term.relatedTerms) {
    const relatedTerm = glossaryTerms.find((item) => item.slug === slug);
    if (relatedTerm && relatedTerm.slug !== term.slug) {
      related.set(relatedTerm.slug, relatedTerm);
    }
  }

  if (related.size < limit) {
    const normalizedText = normalizeGlossaryText(
      [term.title, term.description, term.summary, ...term.technicalNotes, ...term.validationNotes].join(" "),
    );

    const scored = glossaryTerms
      .filter((candidate) => candidate.slug !== term.slug && !related.has(candidate.slug))
      .map((candidate) => ({
        candidate,
        score: scoreGlossaryMatch(
          normalizedText,
          [candidate.title, candidate.description, candidate.summary, candidate.definition, ...candidate.technicalNotes, ...candidate.validationNotes].join(" "),
        ),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    for (const item of scored) {
      if (related.size >= limit) break;
      related.set(item.candidate.slug, item.candidate);
    }
  }

  return [...related.values()].slice(0, limit);
}

export function createGlossarySlug(title: string) {
  return generateGlossarySlug(title);
}

function getRelatedTermLinks(term: GlossaryTerm) {
  return getGlossaryRelatedTerms(term, 4).map((relatedTerm, index) => ({
    label: relatedTerm.title,
    href: `/glosar/${relatedTerm.slug}`,
    role: "glossary" as const,
    reason: relatedTerm.description,
    priority: 90 - index,
  }));
}

function scoreGlossaryMatch(query: string, candidateText: string) {
  const normalizedCandidate = normalizeGlossaryText(candidateText);
  const keywords = query.split(/\s+/).filter(Boolean);
  let score = 0;

  for (const keyword of keywords) {
    if (keyword.length < 3) continue;
    if (normalizedCandidate.includes(keyword)) score += 6;
  }

  return score;
}

function normalizeGlossaryText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getClusterDescription(label: string) {
  switch (label) {
    case "RMN / RF":
      return "Definiții, comparații și checklist-uri pentru proiecte RMN și ecranare RF.";
    case "CT / RX":
      return "Termeni pentru protecție radiologică, layout, ventilare și integrare CT / RX.";
    case "Radiologie / planificare":
      return "Resurse pentru infrastructură, planificare, fluxuri și pregătire de proiect.";
    case "Service / continuitate":
      return "Termeni care ajută la uptime, mentenanță și continuitate operațională.";
    case "Infrastructură medicală":
      return "Noțiuni pentru clădiri medicale, HVAC și integrare tehnică.";
    case "Comparare tehnică":
      return "Comparații utile pentru a alege varianta corectă înainte de investiție.";
    default:
      return "Termeni conectați semantic pentru proiecte medicale complexe.";
  }
}

function serviceLabelFromHref(href: string) {
  const map: Record<string, string> = {
    "/services/constructii-medicale": "Construcții medicale",
    "/services/amenajari-medicale": "Amenajări medicale",
    "/services/radiologie": "Radiologie",
    "/services/rf-shielding": "RF shielding",
    "/services/protectie-radiologica": "Protecție radiologică",
    "/services/aparatura-medicala": "Aparatură medicală",
    "/services/imagistica-medicala": "Imagistică medicală",
    "/services/ivd-laborator": "IVD / laborator",
    "/services/service-aparatura-medicala": "Service aparatură medicală",
  };

  return map[href] ?? href;
}
