import { createAdaptiveDiscoveryPlan } from "@/lib/ai-intelligence/discovery";
import { planDocumentUnderstandingWorkflow } from "@/lib/ai-intelligence/document-intelligence";
import {
  getRelatedDomainIds,
  matchMedicalDomains,
} from "@/lib/ai-intelligence/domain-graph";
import {
  createProposalIntelligenceContext,
  scoreLeadIntelligence,
} from "@/lib/ai-intelligence/lead-proposal-intelligence";
import { generateIntelligenceRecommendations } from "@/lib/ai-intelligence/recommendation-engine";
import { evaluateRegulatoryAwareness } from "@/lib/ai-intelligence/regulatory-awareness";
import { createValidationNotice } from "@/lib/ai-intelligence/safety";
import type {
  ComplexityLevel,
  DiscoveryQuestion,
  DocumentUnderstandingArtifact,
  IntelligenceInput,
  IntelligenceRecommendation,
  MedicalDomainId,
  MissingInformationItem,
  ProjectStage,
  RelatedResourceType,
} from "@/lib/ai-intelligence/types";

export type DiscoveryRiskLevel = "low" | "medium" | "high" | "critical";

export type UploadPrompt = {
  id: string;
  title: string;
  reason: string;
  artifactTypes: DocumentUnderstandingArtifact["type"][];
  relatedDomains: MedicalDomainId[];
  optionalNote: string;
};

export type RiskAssessment = {
  riskLevel: DiscoveryRiskLevel;
  complexityLevel: ComplexityLevel;
  riskReasons: string[];
  validationNeeds: string[];
};

export type LeadDiscoveryIntelligence = {
  readinessScore: number;
  urgencyScore: number;
  commercialIntent: "low" | "medium" | "high";
  missingInfoScore: number;
  recommendedFollowUpType:
    | "educational-nurture"
    | "technical-clarification"
    | "proposal-preparation"
    | "urgent-technical-review";
  internalSummary: string;
};

export type OrchestratedDiscoveryResult = {
  detectedDomains: MedicalDomainId[];
  relatedDomains: MedicalDomainId[];
  projectStage: ProjectStage;
  confidenceScore: number;
  confidenceLevel: "low" | "medium" | "high";
  missingInformation: MissingInformationItem[];
  nextBestQuestions: DiscoveryQuestion[];
  uploadPrompts: UploadPrompt[];
  canContinue: boolean;
  continueWithAssumptionsNote: string;
  riskAssessment: RiskAssessment;
  recommendations: IntelligenceRecommendation[];
  relevantResources: Array<{ label: string; href: string; type: RelatedResourceType }>;
  likelyServices: string[];
  leadIntelligence: LeadDiscoveryIntelligence;
  proposalPreparationNotes: string[];
  safeDisclaimer: string;
};

const domainQuestionBank: Record<MedicalDomainId, DiscoveryQuestion[]> = {
  mri: [
    q("mri-field-strength", "equipment", "RMN-ul este 1.5T, 3T sau inca nu este ales?", ["mri"], true),
    q("mri-rf-scope", "infrastructure", "Exista deja o solutie RF shielding/Faraday sau trebuie planificata de la zero?", ["mri"], true),
    q("mri-quench-hvac", "infrastructure", "Sunt cunoscute cerintele de quench, HVAC, racire si acces magnet?", ["mri"]),
  ],
  ct: [
    q("ct-equipment-model", "equipment", "Este ales modelul CT sau exista doar o directie de achizitie?", ["ct"], true),
    q("ct-radioprotection", "documentation", "Exista analiza preliminara pentru radioprotectie, vecinatati si zone controlate?", ["ct"], true),
    q("ct-control-room", "space", "Camera de comanda si fluxul pacientului sunt deja pozitionate in layout?", ["ct"]),
  ],
  radiology: [
    q("radiology-modalities", "domain", "Ce modalitati sunt planificate: RX, fluoroscopie, mamografie, CT sau combinatie?", ["radiology"], true),
    q("radiology-controlled-areas", "documentation", "Sunt definite zonele controlate si relatia cu spatiile vecine?", ["radiology"]),
  ],
  dental: [
    q("dental-equipment", "equipment", "Este vorba despre CBCT, panoramic, intraoral sau alta configuratie?", ["dental"], true),
    q("dental-layout", "space", "Echipamentul este intr-un cabinet existent sau intr-un spatiu nou?", ["dental"]),
  ],
  "ivd-laboratory": [
    q("ivd-test-menu", "domain", "Ce tipuri de analize si volume de probe sunt vizate?", ["ivd-laboratory"], true),
    q("ivd-analyzers", "equipment", "Analizoarele sunt alese sau se compara optiuni?", ["ivd-laboratory"], true),
    q("ivd-lis-flow", "operation", "Exista cerinte LIS, flux de probe, calibrare sau service definite?", ["ivd-laboratory"]),
  ],
  "surgery-or": [
    q("or-procedure-types", "domain", "Ce tip de interventii trebuie sa sustina sala?", ["surgery-or"], true),
    q("or-utilities", "infrastructure", "Sunt cunoscute cerintele pentru HVAC, gaze medicale, electric si zone sterile?", ["surgery-or"], true),
  ],
  "ati-critical-care": [
    q("ati-capacity", "domain", "Cate posturi ATI sau de ingrijire critica sunt planificate?", ["ati-critical-care"], true),
    q("ati-continuity", "infrastructure", "Sunt definite cerintele de gaze medicale, UPS, monitorizare si continuitate?", ["ati-critical-care"], true),
  ],
  sterilization: [
    q("sterilization-flow", "operation", "Fluxul curat/murdar si capacitatea de sterilizare sunt definite?", ["sterilization"], true),
    q("sterilization-equipment", "equipment", "Sunt alese autoclavele sau echipamentele de spalare/dezinfectie?", ["sterilization"]),
  ],
  ultrasound: [
    q("ultrasound-room-count", "space", "Cate cabinete de ecografie sunt planificate si ce flux de pacienti trebuie sustinut?", ["ultrasound"]),
    q("ultrasound-integration", "infrastructure", "Exista cerinte de date, arhivare imagini sau integrare cu sistemele clinicii?", ["ultrasound"]),
  ],
  cardiology: [
    q("cardiology-functions", "domain", "Ce functiuni sunt vizate: ECG, holter, test de efort, ecografie cardiaca sau monitorizare?", ["cardiology"], true),
    q("cardiology-workflow", "operation", "Cum se separa consultatia, investigatia si asteptarea pacientilor?", ["cardiology"]),
  ],
  "clinic-modernization": [
    q("modernization-downtime", "operation", "Clinica poate fi oprita temporar sau proiectul trebuie etapizat in timpul functionarii?", ["clinic-modernization"], true),
    q("modernization-existing-infra", "infrastructure", "Ce instalatii existente sunt cunoscute: electric, HVAC, date, gaze medicale, apa?", ["clinic-modernization"]),
  ],
  "healthcare-infrastructure": [
    q("clinic-service-mix", "domain", "Ce servicii medicale trebuie sa sustina clinica in prima etapa?", ["healthcare-infrastructure"], true),
    q("clinic-greenfield", "space", "Este proiect greenfield, conversie de spatiu sau amenajare intr-o cladire existenta?", ["healthcare-infrastructure"], true),
  ],
  "medical-electrical": [
    q("electrical-loads", "infrastructure", "Exista lista de consumatori si puteri pentru echipamentele medicale?", ["medical-electrical"], true),
    q("electrical-backup", "infrastructure", "Ce circuite necesita backup, UPS sau generator?", ["medical-electrical"]),
  ],
  hvac: [
    q("hvac-loads", "infrastructure", "Sunt cunoscute sarcinile termice, cerintele de ventilatie si conditiile producatorilor?", ["hvac"], true),
    q("hvac-existing", "space", "HVAC-ul este existent sau trebuie proiectat pentru functiunea medicala?", ["hvac"]),
  ],
  "ups-power": [
    q("ups-critical-loads", "infrastructure", "Ce echipamente sau procese trebuie sa ramana active la intreruperea alimentarii?", ["ups-power"], true),
    q("ups-autonomy", "infrastructure", "Exista o autonomie tinta sau un scenariu de continuitate operationala?", ["ups-power"]),
  ],
  "operational-workflow": [
    q("workflow-patient-volume", "operation", "Care este volumul estimat de pacienti sau probe pe zi?", ["operational-workflow"], true),
    q("workflow-bottlenecks", "operation", "Unde apar cele mai mari riscuri de blocaj: receptie, investigatie, asteptare, service, curatenie?", ["operational-workflow"]),
  ],
};

export function orchestrateAdaptiveDiscovery(input: IntelligenceInput): OrchestratedDiscoveryResult {
  const domainMatches = matchMedicalDomains(input, 6);
  const detectedDomains = uniqueDomains([
    ...(input.domains ?? []),
    ...domainMatches.map((match) => match.domain.id),
  ]);
  const enrichedInput: IntelligenceInput = { ...input, domains: detectedDomains };
  const discoveryPlan = createAdaptiveDiscoveryPlan(enrichedInput);
  const recommendationSet = generateIntelligenceRecommendations(enrichedInput);
  const regulatoryFlags = evaluateRegulatoryAwareness(enrichedInput);
  const documentWorkflow = planDocumentUnderstandingWorkflow(enrichedInput);
  const leadScore = scoreLeadIntelligence(enrichedInput);
  const proposalContext = createProposalIntelligenceContext(enrichedInput);
  const riskAssessment = assessDiscoveryRisk(enrichedInput, detectedDomains, discoveryPlan.missingInformation);
  const uploadPrompts = buildUploadPrompts(enrichedInput, detectedDomains, documentWorkflow.suggestedArtifacts);
  const nextBestQuestions = selectOrchestratedQuestions(enrichedInput, detectedDomains, discoveryPlan.nextQuestions);

  return {
    detectedDomains,
    relatedDomains: getRelatedDomainIds(detectedDomains),
    projectStage: discoveryPlan.projectStage,
    confidenceScore: discoveryPlan.confidence.score,
    confidenceLevel: discoveryPlan.confidence.level,
    missingInformation: discoveryPlan.missingInformation,
    nextBestQuestions,
    uploadPrompts,
    canContinue: canContinueWithAssumptions(discoveryPlan.missingInformation, riskAssessment.riskLevel),
    continueWithAssumptionsNote: buildContinueNote(discoveryPlan.missingInformation, riskAssessment.riskLevel),
    riskAssessment: {
      ...riskAssessment,
      validationNeeds: uniqueStrings([
        ...riskAssessment.validationNeeds,
        ...regulatoryFlags.map((flag) => flag.title),
      ]).slice(0, 8),
    },
    recommendations: recommendationSet.recommendations,
    relevantResources: uniqueResources<Array<{ label: string; href: string; type: RelatedResourceType }>[number]>([
      ...recommendationSet.recommendedResources,
      ...recommendationSet.recommendations.flatMap((recommendation) => recommendation.relatedResources),
      { label: "Project Intake ZES", href: "/project-intake", type: "tool" as const },
      { label: "Proposal Builder", href: "/proposal-builder", type: "tool" as const },
    ]).slice(0, 10),
    likelyServices: recommendationSet.recommendedServices,
    leadIntelligence: {
      readinessScore: leadScore.score,
      urgencyScore: scoreUrgency(enrichedInput),
      commercialIntent: scoreCommercialIntent(enrichedInput),
      missingInfoScore: scoreMissingInformation(discoveryPlan.missingInformation),
      recommendedFollowUpType: chooseFollowUpType(leadScore.score, riskAssessment.riskLevel, scoreUrgency(enrichedInput)),
      internalSummary: buildInternalSummary(enrichedInput, detectedDomains, leadScore.score, riskAssessment),
    },
    proposalPreparationNotes: uniqueStrings([
      ...proposalContext.assumptions,
      ...proposalContext.validationNeeds.map((need) => `Validare necesara: ${need}`),
      ...proposalContext.recommendedNextActions.map((action) => `Urmator pas: ${action}`),
    ]).slice(0, 8),
    safeDisclaimer: createValidationNotice(discoveryPlan.confidence.level),
  };
}

export function canContinueWithAssumptions(
  missingInformation: MissingInformationItem[],
  riskLevel: DiscoveryRiskLevel = "medium",
) {
  const criticalMissing = missingInformation.filter((item) => item.priority === "critical").length;
  if (riskLevel === "critical" && criticalMissing >= 4) return false;
  return true;
}

export function assessDiscoveryRisk(
  input: IntelligenceInput,
  domains = matchMedicalDomains(input, 6).map((match) => match.domain.id),
  missingInformation: MissingInformationItem[] = [],
): RiskAssessment {
  const reasons: string[] = [];
  const validationNeeds: string[] = [];
  let score = 0;
  const text = normalize([input.freeText, input.urgency, input.constraints?.join(" "), input.equipmentTypes?.join(" ")].join(" "));

  if (domains.includes("mri")) {
    score += 3;
    reasons.push("RMN implica RF shielding, HVAC strict, integrare echipament si acces magnet.");
    validationNeeds.push("RF shielding / camera Faraday", "HVAC si integrare echipament RMN");
  }

  if (domains.some((domain) => ["ct", "radiology", "dental"].includes(domain))) {
    score += 3;
    reasons.push("Domeniul implica radioprotectie, layout si posibile fluxuri de autorizare.");
    validationNeeds.push("Radioprotectie si vecinatati", "CNCAN acolo unde este aplicabil");
  }

  if (domains.some((domain) => ["surgery-or", "ati-critical-care", "sterilization"].includes(domain))) {
    score += 3;
    reasons.push("Zonele critice necesita coordonare interdisciplinara si validare de specialitate.");
    validationNeeds.push("Fluxuri medicale critice", "HVAC, gaze medicale si continuitate operationala");
  }

  if (domains.includes("ivd-laboratory")) {
    score += 2;
    reasons.push("Laboratorul IVD depinde de fluxuri de probe, validare, utilitati si service.");
    validationNeeds.push("Flux laborator, LIS, analizatoare si service access");
  }

  if (domains.some((domain) => ["medical-electrical", "hvac", "ups-power"].includes(domain))) {
    score += 2;
    reasons.push("Proiectul are dependente explicite de infrastructura tehnica.");
    validationNeeds.push("Electric, HVAC, UPS si scenarii de continuitate");
  }

  if (input.modernization || input.existingBuilding || domains.includes("clinic-modernization")) {
    score += 2;
    reasons.push("Spatiul existent poate introduce constrangeri, etapizare si downtime.");
    validationNeeds.push("Releveu, fotografii si scenariu de fazare");
  }

  if (!input.equipmentSpecsAvailable && domains.some((domain) => ["mri", "ct", "ivd-laboratory", "dental"].includes(domain))) {
    score += 2;
    reasons.push("Lipsa fiselor tehnice creste incertitudinea pentru utilitati si integrare.");
  }

  if (!input.plansAvailable && (input.existingBuilding || domains.some((domain) => ["mri", "ct", "surgery-or", "ivd-laboratory"].includes(domain)))) {
    score += 2;
    reasons.push("Lipsa planurilor limiteaza verificarea spatiului, accesului si fluxurilor.");
  }

  if (/urgent|imediat|rapid|1-3|luna viitoare|deadline/.test(text)) {
    score += 2;
    reasons.push("Calendar agresiv sau urgenta operationala detectata.");
  }

  if (/multi.?vendor|mai multi furnizori|furnizori diferiti|echipament cumparat/.test(text)) {
    score += 2;
    reasons.push("Complexitate multi-vendor sau echipament deja achizitionat.");
  }

  score += Math.min(3, missingInformation.filter((item) => item.priority === "critical").length);

  return {
    riskLevel: riskLevelFromScore(score),
    complexityLevel: complexityFromScore(score),
    riskReasons: reasons.length ? reasons : ["Riscurile majore nu sunt inca evidente din contextul primit."],
    validationNeeds: uniqueStrings(validationNeeds),
  };
}

function selectOrchestratedQuestions(
  input: IntelligenceInput,
  domains: MedicalDomainId[],
  baselineQuestions: DiscoveryQuestion[],
) {
  const knownStageQuestions = new Set(baselineQuestions.map((question) => question.id));
  const domainQuestions = domains.flatMap((domain) => domainQuestionBank[domain] ?? []);
  const stagePriority = new Set(baselineQuestions.map((question) => question.stage));

  return uniqueById([...baselineQuestions, ...domainQuestions])
    .filter((question) => {
      if (question.appliesTo?.length && !question.appliesTo.some((domain) => domains.includes(domain))) return false;
      if (question.stage === "equipment" && input.equipmentSpecsAvailable && !question.requiredForConfidence) return false;
      if (question.stage === "space" && input.plansAvailable && input.surfaceKnown && !question.requiredForConfidence) return false;
      if (question.stage === "documentation" && input.plansAvailable && input.equipmentSpecsAvailable && !question.requiredForConfidence) return false;
      return knownStageQuestions.has(question.id) || question.requiredForConfidence || stagePriority.has(question.stage);
    })
    .slice(0, 8);
}

function buildUploadPrompts(
  input: IntelligenceInput,
  domains: MedicalDomainId[],
  artifacts: DocumentUnderstandingArtifact[],
): UploadPrompt[] {
  const prompts: UploadPrompt[] = [];

  if (!input.plansAvailable && domains.some((domain) => ["mri", "ct", "ivd-laboratory", "surgery-or", "clinic-modernization", "healthcare-infrastructure"].includes(domain))) {
    prompts.push(uploadPrompt(
      "room-plan-or-sketch",
      "Plan, releveu sau schita a spatiului",
      "Ajuta la intelegerea dimensiunilor, accesului, vecinatatilor si constrangerilor de layout.",
      ["room-plan", "sketch", "layout"],
      domains,
    ));
  }

  if (!input.equipmentSpecsAvailable && domains.some((domain) => ["mri", "ct", "ivd-laboratory", "dental", "cardiology", "ultrasound"].includes(domain))) {
    prompts.push(uploadPrompt(
      "equipment-datasheet",
      "Fisa tehnica sau cerinte de pre-instalare",
      "Reduce incertitudinea pentru electric, HVAC, spatiu, service si integrarea echipamentului.",
      ["equipment-spec", "pdf"],
      domains,
    ));
  }

  if (input.existingBuilding || input.modernization || domains.includes("clinic-modernization")) {
    prompts.push(uploadPrompt(
      "existing-space-photos",
      "Fotografii sau layout pentru spatiul existent",
      "Pot clarifica starea existenta, accesul, traseele vizibile si zonele care necesita verificare.",
      ["photo", "layout"],
      domains,
    ));
  }

  if (domains.some((domain) => ["medical-electrical", "hvac", "ups-power", "mri", "ct", "surgery-or", "ati-critical-care"].includes(domain))) {
    prompts.push(uploadPrompt(
      "technical-infrastructure-plan",
      "Plan tehnic pentru electric, HVAC sau UPS daca exista",
      "Ajuta la identificarea intrebarilor de coordonare, fara sa fie obligatoriu pentru continuare.",
      ["pdf", "layout"],
      domains,
    ));
  }

  const artifactDerived = artifacts.slice(0, 2).map((artifact) =>
    uploadPrompt(
      `artifact-${artifact.id}`,
      artifact.label,
      artifact.safeUse,
      [artifact.type],
      domains,
    ),
  );

  return uniqueById([...prompts, ...artifactDerived]).slice(0, 5);
}

function uploadPrompt(
  id: string,
  title: string,
  reason: string,
  artifactTypes: DocumentUnderstandingArtifact["type"][],
  relatedDomains: MedicalDomainId[],
): UploadPrompt {
  return {
    id,
    title,
    reason,
    artifactTypes,
    relatedDomains,
    optionalNote: "Optional: puteti continua si fara documente; sistemul va marca ipotezele si nivelul de incredere.",
  };
}

function buildContinueNote(missingInformation: MissingInformationItem[], riskLevel: DiscoveryRiskLevel) {
  if (!canContinueWithAssumptions(missingInformation, riskLevel)) {
    return "Continuarea este posibila doar ca orientare generala; pentru recomandari utile sunt necesare clarificari tehnice minime.";
  }

  if (missingInformation.length === 0) {
    return "Contextul este suficient pentru o analiza preliminara structurata, cu validare tehnica ulterioara.";
  }

  return "Puteti continua cu ipoteze orientative; informatiile lipsa vor fi marcate explicit si trebuie validate inainte de decizii finale.";
}

function scoreUrgency(input: IntelligenceInput) {
  const text = normalize([input.urgency, input.freeText].join(" "));
  if (/imediat|urgent|oprit|problema activa|saptamana/.test(text)) return 90;
  if (/1-3|trei luni|luna viitoare|rapid/.test(text)) return 70;
  if (/3-6|bugetare|planificare/.test(text)) return 45;
  return 25;
}

function scoreCommercialIntent(input: IntelligenceInput): LeadDiscoveryIntelligence["commercialIntent"] {
  const text = normalize([input.intent, input.freeText, input.urgency].join(" "));
  if (input.budgetKnown || /oferta|propunere|achizitie|implementare|contract|pret/.test(text)) return "high";
  if (/cost|buget|estimare|compar|modernizare|planific/.test(text)) return "medium";
  return "low";
}

function scoreMissingInformation(items: MissingInformationItem[]) {
  const penalty = items.reduce((score, item) => {
    if (item.priority === "critical") return score + 18;
    if (item.priority === "important") return score + 10;
    return score + 5;
  }, 0);

  return Math.max(0, Math.min(100, 100 - penalty));
}

function chooseFollowUpType(
  readinessScore: number,
  riskLevel: DiscoveryRiskLevel,
  urgencyScore: number,
): LeadDiscoveryIntelligence["recommendedFollowUpType"] {
  if (riskLevel === "critical" || urgencyScore >= 85) return "urgent-technical-review";
  if (readinessScore >= 74) return "proposal-preparation";
  if (readinessScore >= 42) return "technical-clarification";
  return "educational-nurture";
}

function buildInternalSummary(
  input: IntelligenceInput,
  domains: MedicalDomainId[],
  readinessScore: number,
  risk: RiskAssessment,
) {
  const stage = input.projectStage ?? "unknown-stage";
  return `Detected ${domains.join(", ")} at ${stage}; readiness ${readinessScore}/100; risk ${risk.riskLevel}. Main validation needs: ${risk.validationNeeds.slice(0, 3).join(", ") || "to be clarified"}.`;
}

function riskLevelFromScore(score: number): DiscoveryRiskLevel {
  if (score >= 10) return "critical";
  if (score >= 7) return "high";
  if (score >= 4) return "medium";
  return "low";
}

function complexityFromScore(score: number): ComplexityLevel {
  if (score >= 10) return "critical";
  if (score >= 7) return "high";
  if (score >= 4) return "moderate";
  return "low";
}

function q(
  id: string,
  stage: DiscoveryQuestion["stage"],
  prompt: string,
  appliesTo: MedicalDomainId[],
  requiredForConfidence = false,
): DiscoveryQuestion {
  return { id, stage, prompt, appliesTo, requiredForConfidence };
}

function uniqueDomains(items: MedicalDomainId[]) {
  return [...new Set(items)];
}

function uniqueById<T extends { id: string }>(items: T[]) {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

function uniqueResources<T extends { href: string }>(items: T[]) {
  return [...new Map(items.map((item) => [item.href, item])).values()];
}

function uniqueStrings(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
