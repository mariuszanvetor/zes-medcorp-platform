"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import type { LeadPayload, LeadSummaryPreview } from "@/lib/lead-types";
import type { OrchestratedDiscoveryResult } from "@/lib/ai-intelligence/discovery-orchestrator";
import { trackEvent } from "@/lib/analytics";

export function DiscoveryLeadCTA({
  result,
}: {
  result: OrchestratedDiscoveryResult;
}) {
  const summary: LeadSummaryPreview = {
    projectType: result.detectedDomains.join(", ") || "proiect medical",
    complexity: result.riskAssessment.complexityLevel,
    riskLevel: result.riskAssessment.riskLevel,
    urgency: `${result.leadIntelligence.urgencyScore}/100`,
    nextStep: result.leadIntelligence.recommendedFollowUpType,
  };

  return (
    <LeadCaptureForm
      description="Trimite contextul de discovery pentru o analiza preliminara ZES. Datele sunt folosite pentru triere tehnica si pregatirea unei discutii aplicate."
      eyebrow="Analiza preliminara"
      generatedComplexity={result.riskAssessment.complexityLevel}
      generatedRiskLevel={result.riskAssessment.riskLevel}
      generatedSummary={buildGeneratedSummary(result)}
      inquiryType="AI discovery workspace"
      sourcePage="/ai-discovery"
      sourceTool="ai-discovery"
      submitLabel="Trimite pentru analiza preliminara"
      successDescription="Contextul a fost transmis pentru triere tehnica. Echipa ZES poate continua cu intrebari aplicate si validarea ipotezelor."
      successTitle="Discovery-ul a fost trimis catre ZES."
      summary={summary}
      title="Trimite discovery-ul catre echipa ZES"
      tone="light"
      onSubmitted={(payload: LeadPayload) => {
        trackEvent("ai_discovery_lead_submit", {
          sourcePage: "/ai-discovery",
          sourceTool: "ai-discovery",
          inquiryType: payload.inquiryType,
          projectType: summary.projectType,
          complexity: result.riskAssessment.complexityLevel,
          riskLevel: result.riskAssessment.riskLevel,
        });
      }}
    />
  );
}

function buildGeneratedSummary(result: OrchestratedDiscoveryResult) {
  return [
    `AI Discovery preliminary context.`,
    `Detected domains: ${result.detectedDomains.join(", ") || "not clear"}.`,
    `Stage: ${result.projectStage}. Confidence: ${result.confidenceScore}/100 (${result.confidenceLevel}).`,
    `Risk: ${result.riskAssessment.riskLevel}; complexity: ${result.riskAssessment.complexityLevel}.`,
    `Missing information: ${result.missingInformation.map((item) => item.label).slice(0, 6).join("; ") || "none marked"}.`,
    `Validation needs: ${result.riskAssessment.validationNeeds.slice(0, 6).join("; ") || "to be clarified"}.`,
    `Recommended next actions: ${result.recommendations.map((item) => item.title).slice(0, 5).join("; ")}.`,
    `Safety note: preliminary planning support only; final requirements depend on project, equipment, site and competent validation.`,
  ].join("\n");
}
