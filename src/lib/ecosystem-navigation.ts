export type EcosystemNavigationIntent =
  | "learn"
  | "compare"
  | "estimate"
  | "plan"
  | "request-proposal"
  | "submit-project-details";

export type EcosystemNavigationItem = {
  href: string;
  title: string;
  description: string;
  intent: EcosystemNavigationIntent;
  intentLabel: string;
  ctaLabel: string;
  priority: number;
};

const ecosystemNavigationItems: EcosystemNavigationItem[] = [
  {
    href: "/servicii",
    title: "Servicii comerciale",
    description:
      "Exploreaza hub-ul comercial ZES pentru infrastructura medicala, imagistica, RF shielding si implementare.",
    intent: "learn",
    intentLabel: "invata",
    ctaLabel: "Deschide hub-ul",
    priority: 100,
  },
  {
    href: "/calculatoare",
    title: "Calculatoare medicale",
    description:
      "Porneste cu estimari orientative pentru cost, spatiu, energie, HVAC si infrastructura de proiect.",
    intent: "estimate",
    intentLabel: "estimeaza",
    ctaLabel: "Deschide calculatoarele",
    priority: 95,
  },
  {
    href: "/comparatii",
    title: "Comparații tehnice",
    description:
      "Clarifica diferentele dintre optiuni apropiate si vezi implicatiile reale pentru proiect.",
    intent: "compare",
    intentLabel: "compara",
    ctaLabel: "Vezi compararile",
    priority: 92,
  },
  {
    href: "/glosar",
    title: "Glosar medical",
    description:
      "Definitiile si termenii tehnici care te ajuta sa citesti mai rapid documentatia si cerintele.",
    intent: "learn",
    intentLabel: "invata",
    ctaLabel: "Deschide glosarul",
    priority: 90,
  },
  {
    href: "/knowledge-hub",
    title: "Knowledge Hub",
    description:
      "Ghiduri tehnice, checklist-uri si articole care transforma intentia in context de proiect.",
    intent: "learn",
    intentLabel: "citeste",
    ctaLabel: "Vezi ghidurile",
    priority: 88,
  },
  {
    href: "/planificare",
    title: "Planificare proiect",
    description:
      "Alege scenariul potrivit si parcurge traseul recomandat pentru etapa proiectului tau.",
    intent: "plan",
    intentLabel: "planifica",
    ctaLabel: "Alege scenariul",
    priority: 94,
  },
  {
    href: "/proposal-builder",
    title: "Proposal Builder",
    description:
      "Transforma contextul proiectului intr-o propunere tehnica preliminara, usor de discutat intern.",
    intent: "request-proposal",
    intentLabel: "propunere",
    ctaLabel: "Deschide propunerea",
    priority: 97,
  },
  {
    href: "/project-intake",
    title: "Project Intake ZES",
    description:
      "Trimite detalii esentiale despre proiect pentru o analiza tehnica mai clara si mai eficienta.",
    intent: "submit-project-details",
    intentLabel: "detalii proiect",
    ctaLabel: "Trimite detaliile",
    priority: 98,
  },
];

export function getEcosystemNavigationItems() {
  return [...ecosystemNavigationItems].sort((left, right) => right.priority - left.priority);
}

