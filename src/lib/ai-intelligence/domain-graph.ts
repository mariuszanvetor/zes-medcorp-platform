import { medicalDomainProfiles } from "@/data/intelligence/medical-domains";
import type {
  DomainRequirement,
  IntelligenceInput,
  MedicalDomainId,
  MedicalDomainProfile,
  RequirementCategory,
} from "@/lib/ai-intelligence/types";

export type DomainMatch = {
  domain: MedicalDomainProfile;
  score: number;
  reasons: string[];
};

export type DomainKnowledgeGraph = {
  domains: MedicalDomainProfile[];
  adjacency: Record<MedicalDomainId, MedicalDomainId[]>;
  requirementIndex: Partial<Record<RequirementCategory, DomainRequirement[]>>;
};

const domainKeywords: Record<MedicalDomainId, string[]> = {
  mri: ["mri", "rmn", "1.5t", "3t", "faraday", "rf", "magnet"],
  ct: ["ct", "computer tomograf", "tomografie", "radioprotectie", "cncan", "plumb"],
  radiology: ["radiologie", "rx", "x-ray", "fluoroscopie", "radiografie"],
  dental: ["dentar", "stomatologie", "cbct", "panoramic"],
  "ivd-laboratory": ["ivd", "laborator", "analizor", "analizatoare", "lis", "probe"],
  "surgery-or": ["sala operatie", "bloc operator", "or", "chirurgie", "steril"],
  "ati-critical-care": ["ati", "terapie intensiva", "critical care", "monitorizare", "gaze medicale"],
  sterilization: ["sterilizare", "autoclav", "zona curata", "zona murdara"],
  ultrasound: ["ecografie", "ultrasound", "sonograf"],
  cardiology: ["cardiologie", "ecg", "holter", "efort", "angiografie"],
  "clinic-modernization": ["modernizare", "renovare", "downtime", "clinica existenta", "migrare"],
  "healthcare-infrastructure": ["clinica", "spital", "infrastructura", "proiect medical", "amenajare"],
  "medical-electrical": ["electric", "putere", "alimentare", "tablou", "circuit"],
  hvac: ["hvac", "ventilatie", "climatizare", "racire", "temperatura"],
  "ups-power": ["ups", "backup", "continuitate", "generator", "autonomie"],
  "operational-workflow": ["flux", "pacienti", "workflow", "personal", "programari", "operare"],
};

export function listMedicalDomains() {
  return medicalDomainProfiles;
}

export function getMedicalDomainProfile(id: MedicalDomainId) {
  return medicalDomainProfiles.find((domain) => domain.id === id);
}

export function buildDomainKnowledgeGraph(): DomainKnowledgeGraph {
  const adjacency = Object.fromEntries(
    medicalDomainProfiles.map((domain) => [domain.id, domain.commonDependencies]),
  ) as Record<MedicalDomainId, MedicalDomainId[]>;
  const requirementIndex: Partial<Record<RequirementCategory, DomainRequirement[]>> = {};

  for (const domain of medicalDomainProfiles) {
    for (const requirement of domain.requirements) {
      requirementIndex[requirement.category] = [
        ...(requirementIndex[requirement.category] ?? []),
        requirement,
      ];
    }
  }

  return { domains: medicalDomainProfiles, adjacency, requirementIndex };
}

export function matchMedicalDomains(input: IntelligenceInput, limit = 5): DomainMatch[] {
  const explicit = new Set(input.domains ?? []);
  const text = normalize(
    [
      input.freeText,
      input.intent,
      input.projectStage,
      input.equipmentTypes?.join(" "),
      input.roomTypes?.join(" "),
      input.constraints?.join(" "),
    ].join(" "),
  );

  const matches = medicalDomainProfiles
    .map((domain) => {
      let score = explicit.has(domain.id) ? 80 : 0;
      const reasons: string[] = [];

      if (explicit.has(domain.id)) {
        reasons.push("Domain selected explicitly.");
      }

      for (const keyword of domainKeywords[domain.id]) {
        if (text.includes(normalize(keyword))) {
          score += keyword.length > 4 ? 16 : 10;
          reasons.push(`Matched signal: ${keyword}.`);
        }
      }

      if (input.modernization && domain.id === "clinic-modernization") {
        score += 24;
        reasons.push("Modernization context detected.");
      }

      if (input.existingBuilding && ["clinic-modernization", "healthcare-infrastructure"].includes(domain.id)) {
        score += 12;
        reasons.push("Existing building context detected.");
      }

      return { domain, score, reasons };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (matches.length) return matches;

  return [
    {
      domain: medicalDomainProfiles.find((domain) => domain.id === "healthcare-infrastructure")!,
      score: 30,
      reasons: ["Fallback domain for incomplete project context."],
    },
  ];
}

export function getRequirementsForDomains(domainIds: MedicalDomainId[]) {
  const seen = new Set<string>();
  const requirements: DomainRequirement[] = [];

  for (const id of domainIds) {
    const domain = getMedicalDomainProfile(id);
    if (!domain) continue;

    for (const requirement of domain.requirements) {
      if (seen.has(requirement.id)) continue;
      seen.add(requirement.id);
      requirements.push(requirement);
    }
  }

  return requirements.sort((a, b) => criticalityWeight(b.criticality) - criticalityWeight(a.criticality));
}

export function getRelatedDomainIds(domainIds: MedicalDomainId[]) {
  const related = new Set<MedicalDomainId>();

  for (const id of domainIds) {
    const profile = getMedicalDomainProfile(id);
    if (!profile) continue;
    profile.commonDependencies.forEach((dependency) => related.add(dependency));
  }

  domainIds.forEach((id) => related.delete(id));
  return [...related];
}

function criticalityWeight(value: DomainRequirement["criticality"]) {
  if (value === "critical") return 3;
  if (value === "important") return 2;
  return 1;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
