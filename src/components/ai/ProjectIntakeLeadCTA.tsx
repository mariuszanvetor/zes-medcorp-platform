"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { trackEvent } from "@/lib/analytics";
import type { ProjectIntakeResult } from "@/components/ai/ProjectIntakeWizard";

export type ProjectIntakeLeadCTAProps = {
  result: ProjectIntakeResult;
};

export function ProjectIntakeLeadCTA({ result }: ProjectIntakeLeadCTAProps) {
  return (
    <LeadCaptureForm
      description="Trimite contextul structurat catre ZES pentru o discutie tehnica mai clara. Formularul ramane conectat la endpoint-ul mock existent, fara CRM sau stocare reala in aceasta etapa."
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
      generatedSummary={result.generatedSummary}
      inquiryType="Project intake tehnic"
      onSubmitted={() => {
        trackEvent("intake_lead_submit", {
          sourcePage: "/project-intake",
          sourceTool: "project-intake",
          inquiryType: "Project intake tehnic",
          projectType: result.projectType,
          complexity: result.technicalComplexity,
          riskLevel: result.riskLevel,
          urgency: result.urgency,
        });
      }}
      sourcePage="/project-intake"
      sourceTool="project-intake"
      submitLabel="Trimite informatiile pentru analiza ZES"
      successDescription="Informatiile au fost pregatite pentru triere tehnica. Urmatorul pas real este validarea lor cu planuri, echipamente si documentatie."
      successTitle="Intake-ul a fost pregatit pentru analiza."
      summary={{
        complexity: result.technicalComplexity,
        nextStep: result.nextStep,
        projectType: result.projectType,
        riskLevel: result.riskLevel,
        urgency: result.urgency,
      }}
      title="Trimite informatiile pentru analiza tehnica ZES"
      tone="light"
    />
  );
}
