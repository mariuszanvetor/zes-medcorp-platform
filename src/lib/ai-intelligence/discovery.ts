import {
  getRequirementsForDomains,
  matchMedicalDomains,
} from "@/lib/ai-intelligence/domain-graph";
import type {
  DiscoveryQuestion,
  DiscoveryStageId,
  IntelligenceInput,
  IntelligenceScore,
  MedicalDomainId,
  MissingInformationItem,
  ProjectStage,
} from "@/lib/ai-intelligence/types";

export type DiscoveryStageDefinition = {
  id: DiscoveryStageId;
  label: string;
  goal: string;
  progressiveQuestions: DiscoveryQuestion[];
};

export type AdaptiveDiscoveryPlan = {
  detectedDomains: MedicalDomainId[];
  projectStage: ProjectStage;
  confidence: IntelligenceScore;
  missingInformation: MissingInformationItem[];
  nextQuestions: DiscoveryQuestion[];
  skippedStages: DiscoveryStageId[];
};

export const discoveryStages: DiscoveryStageDefinition[] = [
  {
    id: "intent",
    label: "Intent",
    goal: "Clarify what the user is trying to achieve before asking technical questions.",
    progressiveQuestions: [
      question("intent-project-type", "intent", "Ce incercati sa planificati: clinica noua, modernizare, camera medicala, echipament sau service?"),
      question("intent-stage", "intent", "In ce stadiu este proiectul: idee, bugetare, proiectare, autorizare, executie sau problema activa?"),
    ],
  },
  {
    id: "domain",
    label: "Medical domain",
    goal: "Route the project to relevant medical domains and avoid generic advice.",
    progressiveQuestions: [
      question("domain-equipment", "domain", "Ce tip de echipament sau spatiu medical este implicat?", undefined, true),
      question("domain-room", "domain", "Exista deja o camera sau este un spatiu nou/conversie?"),
    ],
  },
  {
    id: "space",
    label: "Space",
    goal: "Understand site context, surface, existing building limits and access.",
    progressiveQuestions: [
      question("space-surface", "space", "Care este suprafata aproximativa sau dimensiunea camerei?"),
      question("space-existing", "space", "Este cladire existenta, spatiu medical existent sau greenfield?"),
      question("space-plans", "space", "Aveti planuri, releveu sau schite care pot fi analizate ulterior?"),
    ],
  },
  {
    id: "equipment",
    label: "Equipment",
    goal: "Clarify if equipment is selected, planned or unknown.",
    progressiveQuestions: [
      question("equipment-selected", "equipment", "Echipamentul este deja ales sau inca se compara optiuni?", undefined, true),
      question("equipment-specs", "equipment", "Exista fise tehnice sau cerinte de pre-instalare?"),
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    goal: "Detect likely infrastructure needs without pretending to validate design.",
    progressiveQuestions: [
      question("infra-hvac", "infrastructure", "Exista cerinte sau incertitudini legate de HVAC, racire sau ventilatie?"),
      question("infra-electrical", "infrastructure", "Exista date despre putere electrica, UPS sau backup?"),
      question("infra-shielding", "infrastructure", "Este vorba despre RF shielding, radioprotectie/plumb sau nu se stie inca?"),
    ],
  },
  {
    id: "documentation",
    label: "Documentation",
    goal: "Identify missing data and validation paths.",
    progressiveQuestions: [
      question("docs-authority", "documentation", "Exista status DSP, CNCAN sau alta zona de verificare relevanta?"),
      question("docs-budget", "documentation", "Bugetul si termenul sunt definite sau orientative?"),
    ],
  },
  {
    id: "operation",
    label: "Operation",
    goal: "Assess operational impact, downtime and service implications.",
    progressiveQuestions: [
      question("ops-downtime", "operation", "Clinica trebuie sa ramana operationala in timpul proiectului?"),
      question("ops-service", "operation", "Exista cerinte de service, mentenanta sau continuitate operationala?"),
    ],
  },
  {
    id: "next-step",
    label: "Next step",
    goal: "Prepare the project for Proposal Builder, Project Intake or human review.",
    progressiveQuestions: [
      question("next-upload", "next-step", "Puteti pregati planuri, schite, poze sau fise tehnice pentru o analiza viitoare?"),
      question("next-contact", "next-step", "Doriti o propunere preliminara sau o discutie tehnica structurata?"),
    ],
  },
];

export function createAdaptiveDiscoveryPlan(input: IntelligenceInput): AdaptiveDiscoveryPlan {
  const domainMatches = matchMedicalDomains(input);
  const detectedDomains = domainMatches.map((match) => match.domain.id);
  const projectStage = inferProjectStage(input);
  const missingInformation = detectMissingInformation(input, detectedDomains);
  const confidence = scoreDiscoveryConfidence(input, detectedDomains, missingInformation);
  const skippedStages = getSkippedStages(input, detectedDomains);

  return {
    detectedDomains,
    projectStage,
    confidence,
    missingInformation,
    nextQuestions: selectNextQuestions(input, detectedDomains, missingInformation).slice(0, 5),
    skippedStages,
  };
}

export function detectMissingInformation(
  input: IntelligenceInput,
  domains = matchMedicalDomains(input).map((match) => match.domain.id),
): MissingInformationItem[] {
  const items: MissingInformationItem[] = [];

  if (!input.freeText && !input.intent) {
    items.push(missing("missing-intent", "Project intent", "The assistant needs the user's goal before routing the project.", "intent", "critical"));
  }
  if (!input.locationKnown) {
    items.push(missing("missing-location", "Location or site context", "Location/site context helps qualify implementation constraints.", "space", "important"));
  }
  if (!input.surfaceKnown) {
    items.push(missing("missing-surface", "Surface or room dimensions", "Space information affects feasibility, cost and workflow.", "space", "important"));
  }
  if (!input.equipmentSpecsAvailable && domains.some((domain) => ["mri", "ct", "ivd-laboratory", "dental"].includes(domain))) {
    items.push(missing("missing-equipment-specs", "Equipment specifications", "Equipment specs are needed before technical validation.", "equipment", "critical"));
  }
  if (!input.plansAvailable && input.existingBuilding) {
    items.push(missing("missing-plans", "Plans, sketch or releveu", "Existing buildings require plans or sketches to reduce uncertainty.", "space", "important"));
  }
  if (!input.budgetKnown) {
    items.push(missing("missing-budget", "Budget range", "Budget clarity helps route toward estimation or proposal preparation.", "documentation", "baseline"));
  }
  if (!input.timelineKnown) {
    items.push(missing("missing-timeline", "Timeline", "Timeline affects urgency, phasing and lead priority.", "documentation", "baseline"));
  }

  const criticalRequirements = getRequirementsForDomains(domains).filter(
    (requirement) => requirement.criticality === "critical" && requirement.validationNeeded,
  );

  for (const requirement of criticalRequirements.slice(0, 4)) {
    items.push(
      missing(
        `requirement-${requirement.id}`,
        requirement.title,
        requirement.planningQuestion,
        "infrastructure",
        requirement.criticality,
      ),
    );
  }

  return uniqueById(items);
}

export function scoreDiscoveryConfidence(
  input: IntelligenceInput,
  domains: MedicalDomainId[],
  missingInformation: MissingInformationItem[],
): IntelligenceScore {
  let score = 20;
  const reasons: string[] = [];

  if (domains.length) {
    score += Math.min(25, domains.length * 10);
    reasons.push("Medical domain signals detected.");
  }
  if (input.freeText && input.freeText.length > 80) {
    score += 12;
    reasons.push("Project description contains useful detail.");
  }
  if (input.plansAvailable) {
    score += 12;
    reasons.push("Plans or sketches are available for future review.");
  }
  if (input.equipmentSpecsAvailable) {
    score += 14;
    reasons.push("Equipment specifications are available.");
  }
  if (input.locationKnown && input.surfaceKnown) {
    score += 10;
    reasons.push("Site and surface context are available.");
  }
  if (input.budgetKnown && input.timelineKnown) {
    score += 8;
    reasons.push("Budget and timeline are defined.");
  }

  score -= missingInformation.filter((item) => item.priority === "critical").length * 8;
  score -= missingInformation.filter((item) => item.priority === "important").length * 4;

  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score: normalizedScore,
    level: normalizedScore >= 72 ? "high" : normalizedScore >= 42 ? "medium" : "low",
    reasons: reasons.length ? reasons : ["Insufficient project context; continue progressive discovery."],
  };
}

function selectNextQuestions(
  input: IntelligenceInput,
  domains: MedicalDomainId[],
  missingInformation: MissingInformationItem[],
) {
  const missingStages = new Set(missingInformation.map((item) => item.stage));
  const candidates = discoveryStages.flatMap((stage) => stage.progressiveQuestions);

  return candidates.filter((questionItem) => {
    if (questionItem.appliesTo?.length && !questionItem.appliesTo.some((domain) => domains.includes(domain))) {
      return false;
    }

    if (questionItem.stage === "equipment" && input.equipmentSpecsAvailable) return false;
    if (questionItem.stage === "space" && input.plansAvailable && input.surfaceKnown) return false;
    if (questionItem.stage === "intent" && input.intent && input.projectStage) return false;

    return missingStages.has(questionItem.stage) || questionItem.requiredForConfidence;
  });
}

function getSkippedStages(input: IntelligenceInput, domains: MedicalDomainId[]) {
  const skipped: DiscoveryStageId[] = [];

  if (input.equipmentSpecsAvailable) skipped.push("equipment");
  if (input.plansAvailable && input.surfaceKnown) skipped.push("space");
  if (!domains.some((domain) => ["mri", "ct", "radiology", "dental"].includes(domain))) {
    skipped.push("documentation");
  }

  return skipped;
}

function inferProjectStage(input: IntelligenceInput): ProjectStage {
  if (input.projectStage) return input.projectStage;
  const text = normalize([input.freeText, input.urgency].join(" "));
  if (text.includes("urgent") || text.includes("imediat") || text.includes("oprit")) return "active-issue";
  if (text.includes("autoriz")) return "authorization";
  if (text.includes("execut")) return "execution";
  if (text.includes("buget")) return "budgeting";
  if (text.includes("service")) return "operation";
  return "idea";
}

function question(
  id: string,
  stage: DiscoveryStageId,
  prompt: string,
  appliesTo?: MedicalDomainId[],
  requiredForConfidence = false,
): DiscoveryQuestion {
  return { id, stage, prompt, appliesTo, requiredForConfidence };
}

function missing(
  id: string,
  label: string,
  reason: string,
  stage: DiscoveryStageId,
  priority: MissingInformationItem["priority"],
): MissingInformationItem {
  return { id, label, reason, stage, priority };
}

function uniqueById<T extends { id: string }>(items: T[]) {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
