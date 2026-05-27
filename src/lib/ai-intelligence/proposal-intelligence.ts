import { orchestrateAdaptiveDiscovery } from "@/lib/ai-intelligence/discovery-orchestrator";
import type { SerializableDiscoveryContext } from "@/lib/ai-intelligence/discovery-context";
import type { AdvancedComplexityLevel, RiskSeverity } from "@/lib/ai-estimation";
import type { IntelligenceInput, RelatedResourceType } from "@/lib/ai-intelligence/types";

export type ProposalIntelligenceFormInput = {
  projectType: string;
  projectScale: string;
  imaging: string;
  lab: string;
  shielding: string;
  equipment: string;
  projectStage: string;
  urgency: string;
  description: string;
};

export type ProposalIntelligenceSignalInput = {
  score: number;
  complexity: AdvancedComplexityLevel;
  riskLevel?: RiskSeverity;
  budgetRange?: string;
};

export type ProposalIntelligenceRisk = {
  label: string;
  severity: RiskSeverity;
  reason: string;
  validationNeed: string;
};

export type ProposalIntelligenceResource = {
  label: string;
  href: string;
  type: RelatedResourceType;
  reason: string;
};

export type ProposalIntelligenceOutput = {
  projectIntelligenceSummary: string;
  complexityAnalysis: {
    level: AdvancedComplexityLevel | string;
    drivers: string[];
  };
  riskAnalysis: ProposalIntelligenceRisk[];
  missingInformation: string[];
  assumptions: string[];
  recommendedServices: string[];
  recommendedCalculators: ProposalIntelligenceResource[];
  recommendedResources: ProposalIntelligenceResource[];
  likelyInfrastructureAreas: string[];
  validationNeeds: string[];
  proposalReadinessScore: number;
  internalLeadNotes: string[];
  nextBestAction: string;
  discussionPrep: string[];
  importedDiscoverySummary?: string;
};

export function createProposalIntelligence({
  form,
  discoveryContext,
  proposalSignals,
}: {
  form: ProposalIntelligenceFormInput;
  discoveryContext?: SerializableDiscoveryContext | null;
  proposalSignals: ProposalIntelligenceSignalInput;
}): ProposalIntelligenceOutput {
  const orchestratorInput = buildIntelligenceInput(form, discoveryContext);
  const orchestrated = orchestrateAdaptiveDiscovery(orchestratorInput);
  const domains = new Set([
    ...orchestrated.detectedDomains,
    ...(discoveryContext?.project.domains ?? []),
  ]);
  const infrastructureAreas = inferInfrastructureAreas(form, domains);
  const validationNeeds = uniqueStrings([
    ...orchestrated.riskAssessment.validationNeeds,
    ...(discoveryContext?.intelligence.validationNeeds ?? []),
    ...inferValidationNeeds(form, domains),
  ]).slice(0, 9);
  const missingInformation = uniqueStrings([
    ...orchestrated.missingInformation.map((item) => item.label),
    ...(discoveryContext?.intelligence.missingInformation ?? []),
    ...inferMissingInformation(form, domains),
  ]).slice(0, 10);
  const assumptions = uniqueStrings([
    "Propunerea este preliminara si depinde de validarea planurilor, echipamentelor si amplasamentului.",
    "Bugetul si calendarul sunt orientative, nu oferta comerciala finala.",
    ...(discoveryContext
      ? [
          "Contextul AI Discovery a fost folosit ca ipoteza locala de continuare.",
          `AI Discovery a indicat risc ${discoveryContext.intelligence.riskLevel} si readiness ${discoveryContext.intelligence.readinessScore}/100.`,
        ]
      : []),
  ]);
  const recommendedServices = uniqueStrings([
    ...orchestrated.likelyServices,
    ...(discoveryContext?.recommendations.suggestedServices ?? []),
    ...inferServices(form, domains),
  ]).slice(0, 10);
  const recommendedResources = uniqueResources([
    ...orchestrated.relevantResources.map((resource) => ({
      ...resource,
      reason: "Recomandat de orchestratorul de discovery.",
    })),
    ...(discoveryContext?.recommendations.suggestedResources ?? []).map((resource) => ({
      label: resource.label,
      href: resource.href,
      type: resource.type as RelatedResourceType,
      reason: "Preluat din contextul AI Discovery.",
    })),
    ...inferResources(form, domains),
  ]).slice(0, 10);
  const riskAnalysis = buildRiskAnalysis(form, domains, proposalSignals, validationNeeds);
  const readinessScore = calculateReadinessScore({
    discoveryScore: discoveryContext?.intelligence.readinessScore,
    missingCount: missingInformation.length,
    proposalScore: proposalSignals.score,
    riskCount: riskAnalysis.filter((risk) => risk.severity === "High" || risk.severity === "Critical").length,
  });

  return {
    projectIntelligenceSummary: buildSummary(form, domains, proposalSignals, readinessScore, discoveryContext),
    complexityAnalysis: {
      level: proposalSignals.complexity,
      drivers: uniqueStrings([
        ...infrastructureAreas,
        ...riskAnalysis.map((risk) => risk.label),
        ...(discoveryContext ? ["context AI Discovery importat"] : []),
      ]).slice(0, 8),
    },
    riskAnalysis,
    missingInformation,
    assumptions,
    recommendedServices,
    recommendedCalculators: recommendedResources.filter((resource) => resource.type === "calculator").slice(0, 5),
    recommendedResources,
    likelyInfrastructureAreas: infrastructureAreas,
    validationNeeds,
    proposalReadinessScore: readinessScore,
    internalLeadNotes: [
      `Readiness propunere: ${readinessScore}/100.`,
      `Complexitate: ${proposalSignals.complexity}. Risc principal: ${proposalSignals.riskLevel ?? "de validat"}.`,
      `Informatii lipsa: ${missingInformation.length}. Validari: ${validationNeeds.slice(0, 4).join("; ") || "de clarificat"}.`,
      `Urmator pas: ${chooseNextBestAction(readinessScore, riskAnalysis, discoveryContext)}`,
    ],
    nextBestAction: chooseNextBestAction(readinessScore, riskAnalysis, discoveryContext),
    discussionPrep: uniqueStrings([
      "Planuri, releveu sau schita spatiu.",
      "Fise tehnice echipamente si cerinte de pre-instalare.",
      "Status DSP/CNCAN acolo unde este aplicabil.",
      "Buget orientativ si termen tinta.",
      ...missingInformation.slice(0, 4).map((item) => `Clarificare: ${item}`),
    ]).slice(0, 8),
    importedDiscoverySummary: discoveryContext?.generatedSummary,
  };
}

function buildIntelligenceInput(
  form: ProposalIntelligenceFormInput,
  discoveryContext?: SerializableDiscoveryContext | null,
): IntelligenceInput {
  return {
    freeText: [form.description, discoveryContext?.generatedSummary].filter(Boolean).join("\n\n"),
    domains: discoveryContext?.project.domains,
    existingBuilding:
      discoveryContext?.project.knownAnswers.existingBuilding ??
      /modernizare|existent/i.test(`${form.projectType} ${form.description}`),
    modernization:
      discoveryContext?.project.knownAnswers.modernization ??
      /modernizare/i.test(`${form.projectType} ${form.description}`),
    equipmentSpecsAvailable: discoveryContext?.project.knownAnswers.equipmentSpecsAvailable,
    plansAvailable: discoveryContext?.project.knownAnswers.plansAvailable,
    budgetKnown: discoveryContext?.project.knownAnswers.budgetKnown ?? !/nu stiu/i.test(form.projectScale),
    timelineKnown: discoveryContext?.project.knownAnswers.timelineKnown ?? !/exploratoriu/i.test(form.urgency),
    projectStage: mapProjectStage(form.projectStage, discoveryContext?.project.stage),
    urgency: form.urgency,
    equipmentTypes: [form.imaging, form.equipment].filter(Boolean),
    constraints: [form.shielding, form.lab, form.projectScale].filter(Boolean),
  };
}

function inferInfrastructureAreas(form: ProposalIntelligenceFormInput, domains: Set<string>) {
  const areas = new Set<string>(["brief tehnic", "planuri si amplasament"]);
  if (domains.has("mri") || /RMN|RF/i.test(`${form.imaging} ${form.shielding}`)) {
    areas.add("RF shielding / camera Faraday");
    areas.add("HVAC si acces magnet RMN");
  }
  if (domains.has("ct") || domains.has("radiology") || /CT|RX|plumb|radiologic/i.test(`${form.imaging} ${form.shielding}`)) {
    areas.add("radioprotectie si layout zone controlate");
    areas.add("documentatie CNCAN unde este aplicabil");
  }
  if (domains.has("ivd-laboratory") || /IVD|laborator/i.test(`${form.projectType} ${form.lab}`)) {
    areas.add("flux laborator, utilitati si service analizatoare");
  }
  if (/electric|HVAC|UPS|date/i.test(form.description)) {
    areas.add("electric, HVAC, UPS si date");
  }
  if (/modernizare|existent/i.test(`${form.projectType} ${form.description}`)) {
    areas.add("faze de modernizare si downtime operational");
  }
  return [...areas];
}

function inferValidationNeeds(form: ProposalIntelligenceFormInput, domains: Set<string>) {
  const needs = new Set<string>(["validare planuri si amplasament"]);
  if (domains.has("mri") || /RMN|RF/i.test(`${form.imaging} ${form.shielding}`)) {
    needs.add("validare RF shielding, penetratii, usa RF, filtre si HVAC RMN");
  }
  if (domains.has("ct") || domains.has("radiology") || /CT|RX|plumb|radiologic/i.test(`${form.imaging} ${form.shielding}`)) {
    needs.add("validare radioprotectie si flux CNCAN unde este aplicabil");
  }
  if (domains.has("ivd-laboratory") || /IVD|laborator/i.test(`${form.projectType} ${form.lab}`)) {
    needs.add("validare flux probe, analizoare, LIS, utilitati si service IVD");
  }
  if (/urgent|imediat|1/i.test(form.urgency)) {
    needs.add("validare calendar si riscuri de decizie rapida");
  }
  return [...needs];
}

function inferMissingInformation(form: ProposalIntelligenceFormInput, domains: Set<string>) {
  const missing = new Set<string>();
  if (form.description.trim().length < 160) missing.add("descriere extinsa cu locatie, constrangeri si obiectiv");
  if (/Nu|nu stiu/i.test(form.shielding)) missing.add("clarificare ecranare RF vs radioprotectie");
  if (/Nu|nu stiu/i.test(form.equipment)) missing.add("fise tehnice sau directie de echipament");
  if (/Nu|nu stiu/i.test(form.imaging) && (domains.has("mri") || domains.has("ct") || domains.has("radiology"))) {
    missing.add("modalitate imagistica si model echipament");
  }
  missing.add("planuri, releveu, fotografii sau dimensiuni confirmate");
  return [...missing];
}

function inferServices(form: ProposalIntelligenceFormInput, domains: Set<string>) {
  const services = new Set<string>(["Consultanta tehnica si analiza preliminara"]);
  if (domains.has("mri") || /RMN|RF/i.test(`${form.imaging} ${form.shielding}`)) services.add("RF shielding pentru RMN");
  if (domains.has("ct") || domains.has("radiology") || /CT|RX|radiologic/i.test(form.imaging)) services.add("Radioprotectie pentru imagistica");
  if (domains.has("ivd-laboratory") || /IVD|laborator/i.test(`${form.projectType} ${form.lab}`)) services.add("IVD / laborator");
  if (/modernizare/i.test(form.projectType)) services.add("Modernizare clinica medicala");
  if (/service/i.test(`${form.projectType} ${form.equipment}`)) services.add("Service si mentenanta aparatura medicala");
  return [...services];
}

function inferResources(form: ProposalIntelligenceFormInput, domains: Set<string>): ProposalIntelligenceResource[] {
  const resources: ProposalIntelligenceResource[] = [
    { label: "Project Intake ZES", href: "/project-intake", type: "tool", reason: "Pentru detalii structurate inainte de discutia tehnica." },
    { label: "Calculator proiect medical", href: "/calculator-proiect-medical", type: "tool", reason: "Pentru calibrare orientativa a proiectului." },
  ];
  if (domains.has("mri") || /RMN|RF/i.test(`${form.imaging} ${form.shielding}`)) {
    resources.push(
      { label: "Estimare RF shielding", href: "/calculatoare/rf-shielding-estimare", type: "calculator", reason: "Relevant pentru camere RMN." },
      { label: "RF shielding vs radioprotectie", href: "/comparatii/rf-shielding-vs-radioprotectie", type: "comparison", reason: "Clarifica diferenta fata de plumb." },
    );
  }
  if (domains.has("ct") || domains.has("radiology") || /CT|RX|radiologic/i.test(form.imaging)) {
    resources.push(
      { label: "Estimare radioprotectie CT", href: "/calculatoare/radioprotectie-ct-estimare", type: "calculator", reason: "Relevant pentru CT/RX si zone controlate." },
      { label: "Camera RMN vs camera CT", href: "/comparatii/camera-rmn-vs-camera-ct", type: "comparison", reason: "Ajuta la separarea infrastructurii." },
    );
  }
  if (domains.has("ivd-laboratory") || /IVD|laborator/i.test(`${form.projectType} ${form.lab}`)) {
    resources.push({ label: "Cost laborator IVD", href: "/calculatoare/cost-laborator-ivd", type: "calculator", reason: "Bun pentru orientare laborator." });
  }
  return resources;
}

function buildRiskAnalysis(
  form: ProposalIntelligenceFormInput,
  domains: Set<string>,
  proposalSignals: ProposalIntelligenceSignalInput,
  validationNeeds: string[],
): ProposalIntelligenceRisk[] {
  const risks: ProposalIntelligenceRisk[] = [
    {
      label: "Date incomplete pentru oferta finala",
      severity: proposalSignals.riskLevel ?? "Medium",
      reason: "Propunerea este construita pe raspunsuri si context preliminar.",
      validationNeed: "Planuri, fise tehnice, amplasament si documentatie.",
    },
  ];
  if (domains.has("mri") || /RMN|RF/i.test(`${form.imaging} ${form.shielding}`)) {
    risks.push({
      label: "RF shielding RMN",
      severity: "Critical",
      reason: "RF shielding-ul influenteaza camera, penetratiile, usa, filtrele, HVAC-ul si testarea.",
      validationNeed: "Validare RF separata de radioprotectie.",
    });
  }
  if (domains.has("ct") || domains.has("radiology") || /CT|RX|radiologic/i.test(form.imaging)) {
    risks.push({
      label: "Radioprotectie / CNCAN",
      severity: "High",
      reason: "CT/RX pot cere radioprotectie, vecinatati, zone controlate si documentatie specifica.",
      validationNeed: "Calcul si validare de specialitate unde este aplicabil.",
    });
  }
  if (/imediat|1/i.test(form.urgency)) {
    risks.push({
      label: "Calendar comprimat",
      severity: "High",
      reason: "Urgenta poate reduce timpul disponibil pentru clarificari si coordonare.",
      validationNeed: "Prioritizare riscuri care pot bloca implementarea.",
    });
  }
  if (validationNeeds.some((need) => /HVAC|electric|UPS/i.test(need))) {
    risks.push({
      label: "Dependinte infrastructura tehnica",
      severity: "Medium",
      reason: "Electricul, HVAC-ul, UPS-ul si datele pot schimba bugetul si calendarul.",
      validationNeed: "Coordonare cu proiectanti si furnizori.",
    });
  }
  return risks.slice(0, 6);
}

function calculateReadinessScore({
  proposalScore,
  discoveryScore,
  missingCount,
  riskCount,
}: {
  proposalScore: number;
  discoveryScore?: number;
  missingCount: number;
  riskCount: number;
}) {
  const base = Math.round((proposalScore + (discoveryScore ?? proposalScore)) / 2);
  return Math.max(10, Math.min(100, base - missingCount * 3 - riskCount * 4));
}

function buildSummary(
  form: ProposalIntelligenceFormInput,
  domains: Set<string>,
  signals: ProposalIntelligenceSignalInput,
  readinessScore: number,
  discoveryContext?: SerializableDiscoveryContext | null,
) {
  const source = discoveryContext ? "cu context importat din AI Discovery" : "din raspunsurile Proposal Builder";
  return `Propunerea interpreteaza proiectul ${source} ca ${form.projectType}, cu domenii probabile ${[...domains].slice(0, 5).join(", ") || "de clarificat"}. Scorul de readiness este ${readinessScore}/100, complexitatea este ${signals.complexity}, iar bugetul ramane orientativ (${signals.budgetRange ?? "de validat"}). Recomandarile necesita validare tehnica pe planuri, echipamente si amplasament.`;
}

function chooseNextBestAction(
  readinessScore: number,
  risks: ProposalIntelligenceRisk[],
  discoveryContext?: SerializableDiscoveryContext | null,
) {
  if (risks.some((risk) => risk.severity === "Critical")) {
    return "Solicita review tehnic ZES pentru riscurile critice inainte de blocarea bugetului.";
  }
  if (readinessScore >= 72) {
    return "Pregateste discutia de propunere preliminara cu planuri si fise tehnice.";
  }
  if (discoveryContext) {
    return "Completeaza informatiile lipsa marcate in AI Discovery si apoi valideaza propunerea.";
  }
  return "Completeaza Project Intake sau AI Discovery pentru clarificarea contextului inainte de oferta finala.";
}

function mapProjectStage(value: string, fallback?: string): IntelligenceInput["projectStage"] {
  if (fallback) return fallback as IntelligenceInput["projectStage"];
  if (/buget/i.test(value)) return "budgeting";
  if (/proiect/i.test(value)) return "design";
  if (/exec/i.test(value)) return "execution";
  if (/achizi/i.test(value)) return "procurement";
  if (/service|problem/i.test(value)) return "active-issue";
  return "idea";
}

function uniqueStrings(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function uniqueResources(items: ProposalIntelligenceResource[]) {
  return [...new Map(items.map((item) => [item.href, item])).values()];
}
