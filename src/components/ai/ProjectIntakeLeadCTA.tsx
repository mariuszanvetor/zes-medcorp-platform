"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import {
  createDiscoveryContextSummary,
  type SerializableDiscoveryContext,
} from "@/lib/ai-intelligence/discovery-context";
import { trackEvent } from "@/lib/analytics";
import type { ProjectIntakeResult } from "@/components/ai/ProjectIntakeWizard";

export type ProjectIntakeLeadCTAProps = {
  result: ProjectIntakeResult;
  discoveryContext?: SerializableDiscoveryContext | null;
};

export function ProjectIntakeLeadCTA({ result, discoveryContext }: ProjectIntakeLeadCTAProps) {
  const generatedSummary = [
    result.generatedSummary,
    discoveryContext ? createDiscoveryContextSummary(discoveryContext) : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <LeadCaptureForm
      description="Trimite contextul structurat către ZES pentru o discuție tehnică mai clară. Informațiile rămân orientative până la validarea planurilor, echipamentelor și documentației."
      eyebrow="Transmitere intake"
      extraFields={[
        {
          id: "projectType",
          label: "Tip proiect",
          options: [result.projectType],
          required: true,
          type: "select",
        },
        {
          id: "urgency",
          label: "Urgenta",
          options: [result.urgency],
          required: true,
          type: "select",
        },
      ]}
      generatedComplexity={`${result.technicalComplexity} / ${result.readinessLevel}`}
      generatedRiskLevel={result.riskLevel}
      generatedSummary={generatedSummary}
      inquiryType={discoveryContext ? "Project intake tehnic din AI Discovery" : "Project intake tehnic"}
      onSubmitted={() => {
        trackEvent("intake_lead_submit", {
          sourcePage: "/project-intake",
          sourceTool: discoveryContext ? "project-intake-from-discovery" : "project-intake",
          inquiryType: discoveryContext ? "Project intake tehnic din AI Discovery" : "Project intake tehnic",
          projectType: result.projectType,
          complexity: result.technicalComplexity,
          riskLevel: result.riskLevel,
          urgency: result.urgency,
        });
      }}
      sourcePage="/project-intake"
      sourceTool={discoveryContext ? "project-intake-from-discovery" : "project-intake"}
      submitLabel="Trimite informațiile pentru analiza ZES"
      successDescription="Informațiile au fost pregătite pentru triere tehnică. Următorul pas real este validarea lor cu planuri, echipamente și documentație."
      successTitle="Intake-ul a fost pregătit pentru analiză."
      summary={{
        complexity: result.technicalComplexity,
        nextStep: result.nextStep,
        projectType: result.projectType,
        riskLevel: result.riskLevel,
        urgency: result.urgency,
      }}
      title="Trimite informațiile pentru analiza tehnică ZES"
      tone="light"
    />
  );
}
