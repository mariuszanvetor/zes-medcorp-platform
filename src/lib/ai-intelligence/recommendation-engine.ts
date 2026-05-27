import {
  getRelatedDomainIds,
  getRequirementsForDomains,
  matchMedicalDomains,
} from "@/lib/ai-intelligence/domain-graph";
import type {
  ConfidenceLevel,
  IntelligenceInput,
  IntelligenceRecommendation,
  MedicalDomainId,
  RelatedResourceType,
} from "@/lib/ai-intelligence/types";

type ResourceLink = IntelligenceRecommendation["relatedResources"][number];

export type RecommendationSet = {
  recommendations: IntelligenceRecommendation[];
  relatedDomains: MedicalDomainId[];
  recommendedServices: string[];
  recommendedResources: ResourceLink[];
};

export function generateIntelligenceRecommendations(input: IntelligenceInput): RecommendationSet {
  const domainMatches = matchMedicalDomains(input, 4);
  const domainIds = domainMatches.map((match) => match.domain.id);
  const relatedDomains = getRelatedDomainIds(domainIds).slice(0, 5);
  const requirements = getRequirementsForDomains([...domainIds, ...relatedDomains]);
  const resources = uniqueResources(
    domainMatches.flatMap((match) => [
      ...match.domain.relatedResources,
      ...match.domain.relatedTools.map((tool) => ({ ...tool, type: "tool" as RelatedResourceType })),
    ]),
  );

  const recommendations: IntelligenceRecommendation[] = [];

  for (const requirement of requirements.slice(0, 6)) {
    recommendations.push({
      id: `requirement-${requirement.id}`,
      kind: requirement.category === "documentation" ? "documentation" : "infrastructure",
      title: requirement.title,
      rationale: `${requirement.whyItMatters} ${requirement.planningQuestion}`,
      confidence: confidenceFromCriticality(requirement.criticality),
      validationRequired: requirement.validationNeeded,
      relatedDomains: domainIds,
      relatedResources: resources.slice(0, 4),
    });
  }

  if (domainIds.includes("mri")) {
    recommendations.push({
      id: "mri-rf-validation",
      kind: "infrastructure",
      title: "Validati separat RF shielding pentru camera RMN",
      rationale:
        "Proiectele RMN au nevoie de logica RF shielding/Faraday, nu de radioprotectie cu plumb. Solutia depinde de echipament, camera, penetratii, usa RF, filtre si integrarea HVAC.",
      confidence: "high",
      validationRequired: true,
      relatedDomains: ["mri", "hvac", "medical-electrical"],
      relatedResources: withFallback(resources, [
        { label: "RF shielding pentru RMN", href: "/servicii/rf-shielding-rmn", type: "service" },
        { label: "Estimare RF shielding", href: "/calculatoare/rf-shielding-estimare", type: "calculator" },
      ]),
    });
  }

  if (domainIds.some((id) => ["ct", "radiology", "dental"].includes(id))) {
    recommendations.push({
      id: "ionizing-radiation-validation",
      kind: "regulatory-awareness",
      title: "Tratati radioprotectia ca flux separat de validare",
      rationale:
        "CT, RX, fluoroscopia si anumite echipamente dentare implica analiza de radioprotectie, layout, zone controlate si verificari de conformitate. Cerintele finale depind de echipament si configuratia spatiului.",
      confidence: "high",
      validationRequired: true,
      relatedDomains: ["ct", "radiology", "dental"],
      relatedResources: withFallback(resources, [
        { label: "Radioprotectie pentru imagistica", href: "/servicii/radioprotectie-imagistica", type: "service" },
        { label: "Estimare radioprotectie CT", href: "/calculatoare/radioprotectie-ct-estimare", type: "calculator" },
      ]),
    });
  }

  if (input.modernization || domainIds.includes("clinic-modernization")) {
    recommendations.push({
      id: "modernization-phasing",
      kind: "operational",
      title: "Planificati etapizarea pentru a reduce intreruperile operationale",
      rationale:
        "Modernizarea unei clinici existente trebuie corelata cu fluxul pacientilor, accesul echipelor tehnice, migrarea echipamentelor, testarea si ferestrele de lucru.",
      confidence: "medium",
      validationRequired: true,
      relatedDomains: ["clinic-modernization", "operational-workflow"],
      relatedResources: withFallback(resources, [
        { label: "Modernizare clinica medicala", href: "/servicii/modernizare-clinica-medicala", type: "service" },
        { label: "Project Intake", href: "/project-intake", type: "tool" },
      ]),
    });
  }

  recommendations.push({
    id: "next-step-project-intake",
    kind: "next-step",
    title: "Pregatiti contextul pentru analiza tehnica",
    rationale:
      "Un rezumat structurat cu scopul proiectului, stadiu, locatie, echipamente, planuri disponibile si constrangeri ajuta la o discutie tehnica mai eficienta.",
    confidence: "high",
    validationRequired: false,
    relatedDomains: domainIds,
    relatedResources: uniqueResources([
      ...resources.slice(0, 3),
      { label: "Project Intake ZES", href: "/project-intake", type: "tool" },
      { label: "Proposal Builder", href: "/proposal-builder", type: "tool" },
    ]),
  });

  return {
    recommendations: uniqueById(recommendations).slice(0, 10),
    relatedDomains,
    recommendedServices: uniqueStrings(domainMatches.flatMap((match) => match.domain.relatedServices)).slice(0, 8),
    recommendedResources: resources.slice(0, 8),
  };
}

function confidenceFromCriticality(criticality: "baseline" | "important" | "critical"): ConfidenceLevel {
  if (criticality === "critical") return "high";
  if (criticality === "important") return "medium";
  return "low";
}

function withFallback(resources: ResourceLink[], fallback: ResourceLink[]) {
  return uniqueResources([...fallback, ...resources]).slice(0, 5);
}

function uniqueResources(resources: ResourceLink[]) {
  return uniqueBy(resources, (resource) => resource.href);
}

function uniqueById<T extends { id: string }>(items: T[]) {
  return uniqueBy(items, (item) => item.id);
}

function uniqueBy<T>(items: T[], keyGetter: (item: T) => string) {
  return [...new Map(items.map((item) => [keyGetter(item), item])).values()];
}

function uniqueStrings(items: string[]) {
  return [...new Set(items)];
}
