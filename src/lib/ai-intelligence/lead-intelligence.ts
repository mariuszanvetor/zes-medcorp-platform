import type { LeadPayload } from "@/lib/lead-types";
import type { LeadPriority, LeadScoreResult } from "@/lib/lead-scoring";

export type LeadFollowUpType =
  | "educational-nurture"
  | "technical-clarification"
  | "proposal-preparation"
  | "urgent-technical-review";

export type LeadCommercialIntent = "low" | "medium" | "high";
export type LeadConfidenceLevel = "low" | "medium" | "high";

export type LeadIntelligence = {
  leadSource: string;
  sourceContext: string;
  projectDomain: string;
  projectStage: string;
  readinessScore: number;
  urgencyScore: number;
  complexityLevel: string;
  riskLevel: string;
  missingInformationSummary: string;
  validationNeeds: string[];
  recommendedServices: string[];
  recommendedCalculators: Array<{ label: string; href: string }>;
  recommendedNextAction: string;
  internalSummary: string;
  followUpPriority: LeadPriority;
  followUpType: LeadFollowUpType;
  commercialIntent: LeadCommercialIntent;
  confidenceLevel: LeadConfidenceLevel;
};

export function createLeadIntelligence({
  lead,
  scoring,
  recommendedServices = [],
}: {
  lead: LeadPayload;
  scoring: LeadScoreResult;
  recommendedServices?: string[];
}): LeadIntelligence {
  const text = normalize(
    [
      lead.sourceTool,
      lead.sourcePage,
      lead.inquiryType,
      lead.projectType,
      lead.urgency,
      lead.generatedSummary,
      lead.generatedComplexity,
      lead.generatedRiskLevel,
      lead.generatedBudgetRange,
      lead.message,
      lead.metadata ? Object.values(lead.metadata).join(" ") : "",
    ].join(" "),
  );
  const projectDomain = detectDomain(text);
  const readinessScore = inferReadinessScore(lead, scoring, text);
  const urgencyScore = inferUrgencyScore(lead.urgency, text);
  const riskLevel = inferRiskLevel(lead.generatedRiskLevel, text);
  const complexityLevel = inferComplexity(lead.generatedComplexity, projectDomain, text);
  const validationNeeds = inferValidationNeeds(projectDomain, text);
  const missingInformation = inferMissingInformation(lead, projectDomain, text);
  const services = unique([
    ...recommendedServices,
    ...(lead.metadata?.recommendedServices ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    ...inferServices(projectDomain, text),
  ]).slice(0, 8);
  const calculators = inferCalculators(projectDomain, text);
  const commercialIntent = inferCommercialIntent(lead, scoring, readinessScore);
  const confidenceLevel = inferConfidence(lead, readinessScore, missingInformation.length);
  const followUpType = inferFollowUpType(scoring.priority, riskLevel, readinessScore, lead.sourceTool);
  const recommendedNextAction = chooseNextAction({
    followUpType,
    projectDomain,
    validationNeeds,
  });

  return {
    leadSource: lead.sourceTool,
    sourceContext: `${lead.sourceTool} / ${lead.sourcePage}`,
    projectDomain,
    projectStage: inferProjectStage(lead, text),
    readinessScore,
    urgencyScore,
    complexityLevel,
    riskLevel,
    missingInformationSummary: missingInformation.join("; ") || "Nu au fost marcate informatii lipsa explicite.",
    validationNeeds,
    recommendedServices: services,
    recommendedCalculators: calculators,
    recommendedNextAction,
    internalSummary: buildInternalSummary({
      confidenceLevel,
      domain: projectDomain,
      followUpType,
      readinessScore,
      riskLevel,
      scoring,
      source: lead.sourceTool,
    }),
    followUpPriority: scoring.priority,
    followUpType,
    commercialIntent,
    confidenceLevel,
  };
}

function detectDomain(text: string) {
  if (containsAny(text, ["rmn", "mri", "rf shielding", "faraday"])) return "RMN / RF shielding";
  if (containsAny(text, ["ct", "rx", "radioprotect", "cncan", "plumb", "radiologie"])) return "CT/RX / radioprotectie";
  if (containsAny(text, ["ivd", "laborator", "analizator", "lis", "probe"])) return "IVD / laborator";
  if (containsAny(text, ["service", "mentenanta", "downtime", "eroare", "oprit"])) return "Service aparatura";
  if (containsAny(text, ["modernizare", "existent", "downtime operational"])) return "Modernizare clinica";
  if (containsAny(text, ["stomatolog", "dental", "cbct"])) return "Stomatologie / CBCT";
  if (containsAny(text, ["sala operatie", "or", "ati", "sterilizare"])) return "Bloc operator / zone critice";
  if (containsAny(text, ["hvac", "electric", "ups", "racire", "ventilatie"])) return "Infrastructura tehnica";
  return "Infrastructura medicala generala";
}

function inferProjectStage(lead: LeadPayload, text: string) {
  if (containsAny(text, ["executie", "in executie", "commissioning"])) return "executie";
  if (containsAny(text, ["autorizare", "cncan", "dsp"])) return "autorizare";
  if (containsAny(text, ["proiectare", "design"])) return "proiectare";
  if (containsAny(text, ["buget", "cost", "estimare"])) return "bugetare";
  if (containsAny(text, ["achizitie", "echipament ales", "fisa tehnica"])) return "achizitie";
  if (containsAny(text, ["service", "eroare", "oprit"])) return "problema tehnica activa";
  if (lead.sourceTool.includes("contact")) return "de calificat";
  return "idee / analiza preliminara";
}

function inferReadinessScore(lead: LeadPayload, scoring: LeadScoreResult, text: string) {
  const explicit = text.match(/readiness\s+(\d{1,3})\/100/);
  if (explicit?.[1]) return clamp(Number(explicit[1]));

  let score = Math.round(scoring.score * 0.72);
  if (lead.generatedSummary) score += 10;
  if (lead.projectType) score += 6;
  if (lead.generatedBudgetRange) score += 6;
  if (lead.generatedComplexity) score += 5;
  if (containsAny(text, ["plan", "fisa tehnica", "echipament", "documentatie"])) score += 6;
  if (containsAny(text, ["nu stiu", "nespecificat", "de clarificat", "missing"])) score -= 8;

  return clamp(score);
}

function inferUrgencyScore(urgency: string | undefined, text: string) {
  const value = normalize(urgency ?? text);
  if (containsAny(value, ["imediat", "urgent", "critic", "oprit"])) return 90;
  if (containsAny(value, ["1-3", "1–3", "1â€“3"])) return 74;
  if (containsAny(value, ["3-6", "3–6", "3â€“6"])) return 56;
  if (containsAny(value, ["exploratoriu", "idee"])) return 28;
  return 45;
}

function inferRiskLevel(risk: string | undefined, text: string) {
  const value = normalize([risk, text].filter(Boolean).join(" "));
  if (containsAny(value, ["critical", "critic"])) return "Critic";
  if (containsAny(value, ["high", "ridicat", "urgent", "cncan", "rf shielding"])) return "Ridicat";
  if (containsAny(value, ["medium", "mediu", "moderate"])) return "Mediu";
  return "Redus";
}

function inferComplexity(complexity: string | undefined, domain: string, text: string) {
  if (complexity) return complexity;
  if (containsAny(text, ["high-complexity", "enterprise"])) return "High-complexity medical infrastructure";
  if (["RMN / RF shielding", "CT/RX / radioprotectie", "Bloc operator / zone critice"].includes(domain)) return "Advanced";
  if (domain === "Infrastructura medicala generala") return "Moderate";
  return "Advanced";
}

function inferValidationNeeds(domain: string, text: string) {
  const needs = new Set<string>(["Validare planuri, amplasament si date tehnice inainte de oferta finala."]);
  if (domain.includes("RMN") || containsAny(text, ["rmn", "rf", "faraday"])) {
    needs.add("RF shielding, usa RF, penetratii, filtre/waveguides, HVAC si acces magnet.");
  }
  if (domain.includes("CT") || containsAny(text, ["ct", "rx", "cncan", "radioprotect"])) {
    needs.add("Radioprotectie, vecinatati, zone controlate si flux CNCAN unde este aplicabil.");
  }
  if (domain.includes("IVD") || containsAny(text, ["ivd", "laborator"])) {
    needs.add("Flux probe, analizoare, LIS, utilitati, calibrare, QC si service.");
  }
  if (containsAny(text, ["hvac", "electric", "ups", "racire"])) {
    needs.add("Electric, HVAC, UPS, racire, date si scenarii de continuitate.");
  }
  if (containsAny(text, ["modernizare", "existent", "downtime"])) {
    needs.add("Releveu, fazare, downtime si compatibilitate cu instalatiile existente.");
  }
  return [...needs].slice(0, 6);
}

function inferMissingInformation(lead: LeadPayload, domain: string, text: string) {
  const items = new Set<string>();
  const missingMatch = lead.generatedSummary?.match(/(?:Missing information|Informatii lipsa|Informații lipsă):\s*([^\n]+)/i);
  if (missingMatch?.[1]) {
    missingMatch[1]
      .split(/[.;]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((item) => items.add(item));
  }
  if (!lead.projectType) items.add("tip proiect confirmat");
  if (!lead.generatedBudgetRange) items.add("buget orientativ sau interval de decizie");
  if (!lead.generatedComplexity) items.add("complexitate tehnica estimata");
  if (domain.includes("RMN")) items.add("fisa tehnica RMN si plan camera");
  if (domain.includes("CT")) items.add("layout camera si vecinatati pentru radioprotectie");
  if (domain.includes("IVD")) items.add("lista analize, volume probe si echipamente IVD");
  if (!containsAny(text, ["plan", "releveu", "fisa", "datasheet"])) {
    items.add("planuri, releveu, fotografii sau fise tehnice disponibile");
  }
  return [...items].slice(0, 7);
}

function inferServices(domain: string, text: string) {
  const services = new Set<string>(["Analiza tehnica preliminara"]);
  if (domain.includes("RMN")) services.add("RF shielding pentru RMN");
  if (domain.includes("CT")) services.add("Radioprotectie pentru imagistica");
  if (domain.includes("IVD")) services.add("IVD / laborator");
  if (domain.includes("Service")) services.add("Service si mentenanta aparatura medicala");
  if (domain.includes("Modernizare")) services.add("Modernizare clinica medicala");
  if (containsAny(text, ["imagistica", "radiologie", "rmn", "ct", "rx"])) services.add("Planificare infrastructura imagistica");
  if (containsAny(text, ["hvac", "electric", "ups"])) services.add("Coordonare infrastructura tehnica medicala");
  return [...services];
}

function inferCalculators(domain: string, text: string) {
  const calculators: Array<{ label: string; href: string }> = [];
  if (domain.includes("RMN")) calculators.push({ label: "Estimare cost camera RMN", href: "/calculatoare/cost-camera-rmn" });
  if (domain.includes("RMN") || containsAny(text, ["rf", "faraday"])) calculators.push({ label: "Estimare RF shielding", href: "/calculatoare/rf-shielding-estimare" });
  if (domain.includes("CT")) calculators.push({ label: "Estimare radioprotectie CT", href: "/calculatoare/radioprotectie-ct-estimare" });
  if (domain.includes("IVD")) calculators.push({ label: "Estimare laborator IVD", href: "/calculatoare/cost-laborator-ivd" });
  if (domain.includes("Service")) calculators.push({ label: "Service aparatura", href: "/calculatoare/service-aparatura" });
  if (!calculators.length) calculators.push({ label: "Calculator proiect medical", href: "/calculator-proiect-medical" });
  return calculators.slice(0, 4);
}

function inferCommercialIntent(lead: LeadPayload, scoring: LeadScoreResult, readiness: number): LeadCommercialIntent {
  const source = normalize(lead.sourceTool);
  if (scoring.score >= 70 || readiness >= 70 || source.includes("proposal") || source.includes("intake")) return "high";
  if (scoring.score >= 40 || source.includes("calculator") || source.includes("discovery")) return "medium";
  return "low";
}

function inferConfidence(lead: LeadPayload, readiness: number, missingCount: number): LeadConfidenceLevel {
  if (readiness >= 72 && missingCount <= 3 && lead.generatedSummary) return "high";
  if (readiness >= 45 || lead.generatedSummary) return "medium";
  return "low";
}

function inferFollowUpType(
  priority: LeadPriority,
  riskLevel: string,
  readiness: number,
  sourceTool: string,
): LeadFollowUpType {
  if (priority === "Critical / immediate opportunity" || riskLevel === "Critic") return "urgent-technical-review";
  if (sourceTool.includes("proposal") || readiness >= 70) return "proposal-preparation";
  if (sourceTool.includes("contact") && readiness < 45) return "educational-nurture";
  return "technical-clarification";
}

function chooseNextAction({
  followUpType,
  projectDomain,
  validationNeeds,
}: {
  followUpType: LeadFollowUpType;
  projectDomain: string;
  validationNeeds: string[];
}) {
  if (followUpType === "urgent-technical-review") {
    return `Contact rapid pentru ${projectDomain}; validati prioritar: ${validationNeeds.slice(0, 2).join(" / ")}.`;
  }
  if (followUpType === "proposal-preparation") {
    return `Pregatiti propunerea preliminara dupa clarificarea documentelor si a riscurilor pentru ${projectDomain}.`;
  }
  if (followUpType === "educational-nurture") {
    return "Trimite resurse relevante si solicita clarificari minime despre proiect, buget si calendar.";
  }
  const needs = validationNeeds
    .slice(0, 2)
    .map((item) => item.replace(/[.]+$/g, ""))
    .join(" / ");
  return `Solicita clarificari tehnice pentru ${projectDomain}: ${needs}.`;
}

function buildInternalSummary({
  confidenceLevel,
  domain,
  followUpType,
  readinessScore,
  riskLevel,
  scoring,
  source,
}: {
  confidenceLevel: LeadConfidenceLevel;
  domain: string;
  followUpType: LeadFollowUpType;
  readinessScore: number;
  riskLevel: string;
  scoring: LeadScoreResult;
  source: string;
}) {
  return `${source} lead pentru ${domain}: readiness ${readinessScore}/100, risc ${riskLevel}, prioritate ${scoring.priority}, follow-up ${followUpType}, incredere ${confidenceLevel}. Interpretarea este preliminara si necesita validare tehnica.`;
}

function containsAny(value: string, tokens: string[]) {
  return tokens.some((token) => value.includes(normalize(token)));
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function clamp(value: number) {
  if (!Number.isFinite(value)) return 35;
  return Math.max(0, Math.min(100, Math.round(value)));
}
