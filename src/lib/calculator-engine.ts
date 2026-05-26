import {
  getProgrammaticCalculatorBySlug,
  programmaticCalculators,
  type ProgrammaticCalculatorDefinition,
} from "@/data/calculators";
import type { InternalLinkRecommendation, RelatedContentSection } from "@/lib/internal-linking";

export type CalculatorHubGroup =
  | "imaging"
  | "radiology"
  | "radioprotection"
  | "infrastructure"
  | "service"
  | "planning";

export type CalculatorHubSection = {
  group: CalculatorHubGroup;
  title: string;
  description: string;
  calculators: ProgrammaticCalculatorDefinition[];
};

type CalculatorGroupMeta = {
  group: CalculatorHubGroup;
  title: string;
  description: string;
};

const calculatorGroupMetaBySlug: Record<string, CalculatorGroupMeta> = {
  "cost-camera-rmn": {
    group: "imaging",
    title: "Imagistica RMN",
    description: "Estimari pentru camere RMN, RF shielding si spatiu dedicat.",
  },
  "cost-camera-ct": {
    group: "radiology",
    title: "Imagistica CT / radiologie",
    description: "Estimari pentru camere CT, radioprotectie si layout.",
  },
  "cost-laborator-ivd": {
    group: "service",
    title: "Laborator IVD",
    description: "Estimari pentru laborator, echipamente si service continut.",
  },
  "cost-echipamente-imagistica": {
    group: "imaging",
    title: "Echipamente imagistica",
    description: "Achizitie, integrare si readiness pentru aparatura de imagistica.",
  },
  "service-aparatura": {
    group: "service",
    title: "Service si mentenanta",
    description: "Evaluare de urgenta, downtime si planificare service.",
  },
  "rf-shielding-estimare": {
    group: "radiology",
    title: "RF shielding",
    description: "Planificare pentru cuști Faraday, usi RF si integrare RMN.",
  },
  "radioprotectie-ct-estimare": {
    group: "radioprotection",
    title: "Radioprotectie CT",
    description: "Ecranare cu plumb, CNCAN si zone controlate.",
  },
  "putere-electrica-imagistica": {
    group: "infrastructure",
    title: "Infrastructura electrica",
    description: "Tablouri, redundanta, backup si capacitate pentru imagistica.",
  },
  "hvac-imagistica-estimare": {
    group: "infrastructure",
    title: "HVAC si mediu",
    description: "Temperatura, umiditate si racire pentru echipamente medicale.",
  },
  "spatiu-minim-rmn": {
    group: "imaging",
    title: "Spatiu RMN",
    description: "Validarea spatiului si a traseelor pentru camere RMN.",
  },
  "spatiu-minim-ct": {
    group: "radiology",
    title: "Spatiu CT",
    description: "Validarea camerei CT, vecinatatilor si protectiei radiologice.",
  },
  "timp-implementare-proiect-medical": {
    group: "planning",
    title: "Timp de implementare",
    description: "Calendar pentru proiecte medicale si fazare realista.",
  },
  "modernizare-clinica-estimare": {
    group: "planning",
    title: "Modernizare clinica",
    description: "Corectii de infrastructura, downtime si integrare.",
  },
  "infrastructura-radiologie-estimare": {
    group: "radiology",
    title: "Infrastructura radiologie",
    description: "Scenarii multi-mod pentru RMN, CT si RX.",
  },
  "ups-imagistica": {
    group: "infrastructure",
    title: "UPS si backup",
    description: "Redundanta si continuitate pentru echipamente sensibile.",
  },
  "flux-pacienti-imagistica": {
    group: "planning",
    title: "Flux pacienti",
    description: "Trasee, receptie si volum de lucru pentru imagistica.",
  },
  "evaluare-preliminara-clinica": {
    group: "planning",
    title: "Evaluare clinica",
    description: "Pregatirea unui proiect clinic inainte de planificare.",
  },
};

const hubOrder: CalculatorHubGroup[] = [
  "imaging",
  "radiology",
  "radioprotection",
  "infrastructure",
  "service",
  "planning",
];

export function getCalculatorBySlug(slug: string) {
  return getProgrammaticCalculatorBySlug(slug);
}

export function getCalculatorHubMetaForSlug(slug: string) {
  return calculatorGroupMetaByGroup[
    calculatorGroupMetaBySlug[slug]?.group ?? "planning"
  ];
}

export function getCalculatorHubSections(): CalculatorHubSection[] {
  const sections = new Map<CalculatorHubGroup, ProgrammaticCalculatorDefinition[]>();

  for (const calculator of programmaticCalculators) {
    const group = calculatorGroupMetaBySlug[calculator.slug]?.group ?? "planning";
    const list = sections.get(group) ?? [];
    list.push(calculator);
    sections.set(group, list);
  }

  return hubOrder.map((group) => ({
    group,
    title: calculatorGroupMetaByGroup[group].title,
    description: calculatorGroupMetaByGroup[group].description,
    calculators: (sections.get(group) ?? []).sort((a, b) => a.title.localeCompare(b.title, "ro")),
  }));
}

const calculatorGroupMetaByGroup: Record<CalculatorHubGroup, CalculatorGroupMeta> = {
  imaging: {
    group: "imaging",
    title: "Imagistica",
    description: "Estimari pentru RMN, echipamente si spatiu dedicat.",
  },
  radiology: {
    group: "radiology",
    title: "Radiologie",
    description: "Estimari pentru CT, radiologie si spatii hibride.",
  },
  radioprotection: {
    group: "radioprotection",
    title: "Radioprotectie / RF shielding",
    description: "RMN, CT, CNCAN si separarea clara a cerintelor tehnice.",
  },
  infrastructure: {
    group: "infrastructure",
    title: "Infrastructura",
    description: "Electric, HVAC, backup si alte conditii tehnice.",
  },
  service: {
    group: "service",
    title: "Service si mentenanta",
    description: "Downtime, triere si continuitate operationala.",
  },
  planning: {
    group: "planning",
    title: "Planificare clinică",
    description: "Calendar, modernizare, fluxuri si evaluare preliminara.",
  },
};

export function getCalculatorDiscoverySections(
  calculator: ProgrammaticCalculatorDefinition,
): RelatedContentSection[] {
  const services = new Map<string, InternalLinkRecommendation>();
  const calculators = new Map<string, InternalLinkRecommendation>();
  const articles = new Map<string, InternalLinkRecommendation>();
  const comparisons = new Map<string, InternalLinkRecommendation>();
  const glossary = new Map<string, InternalLinkRecommendation>();

  for (const link of calculator.relatedLinks) {
    if (link.href.startsWith("/services/")) {
      services.set(link.href, {
        label: link.label,
        href: link.href,
        role: "service",
        reason: "Serviciu relevant pentru acest calcul.",
        priority: 84,
      });
      continue;
    }

    if (link.href.startsWith("/calculatoare/")) {
      calculators.set(link.href, {
        label: link.label,
        href: link.href,
        role: "calculator",
        reason: "Calculator complementar pentru pasul urmator.",
        priority: 88,
      });
      continue;
    }

    if (link.href.startsWith("/knowledge-hub/")) {
      articles.set(link.href, {
        label: link.label,
        href: link.href,
        role: "article",
        reason: "Articol tehnic pentru context si clarificare.",
        priority: 80,
      });
      continue;
    }

    if (link.href.startsWith("/comparatii/")) {
      comparisons.set(link.href, {
        label: link.label,
        href: link.href,
        role: "comparison",
        reason: "Comparatie utila pentru decizia tehnica.",
        priority: 82,
      });
      continue;
    }

    if (link.href.startsWith("/glosar/")) {
      glossary.set(link.href, {
        label: link.label,
        href: link.href,
        role: "glossary",
        reason: "Termen util pentru validare si definire.",
        priority: 78,
      });
    }
  }

  return [
    section("Servicii relevante", "Ce poate valida ZES dupa estimare.", [...services.values()]),
    section("Calculatoare conexe", "Pasi utili pentru estimari complementare.", [...calculators.values()]),
    section("Comparatii tehnice", "Comparații care ajuta la alegerea corecta.", [...comparisons.values()]),
    section("Articole utile", "Context si clarificari tehnice.", [...articles.values()]),
    section("Glosar tehnic", "Termeni si definitii care apar in proiect.", [...glossary.values()]),
  ].filter((section) => section.links.length > 0);
}

function section(title: string, description: string, links: InternalLinkRecommendation[]): RelatedContentSection {
  return { title, description, links };
}
