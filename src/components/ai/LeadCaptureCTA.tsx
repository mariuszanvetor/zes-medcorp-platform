"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import type { LeadPayload, LeadSummaryPreview } from "@/lib/lead-types";

export type LeadCaptureCTAProps = {
  onCaptured?: () => void;
  summary?: LeadSummaryPreview;
  generatedSummary?: string;
  generatedBudgetRange?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
};

export function LeadCaptureCTA({
  onCaptured,
  summary,
  generatedSummary,
  generatedBudgetRange,
  generatedRiskLevel,
  generatedComplexity,
}: LeadCaptureCTAProps) {
  function handleSubmitted(_payload: LeadPayload) {
    onCaptured?.();
  }

  return (
    <LeadCaptureForm
      description="Trimite rezultatul și contextul proiectului pentru o discuție tehnică ZES. Estimarea rămâne orientativă până la validarea planurilor, spațiului și echipamentelor."
      eyebrow="Primește analiza tehnică personalizată de la ZES"
      generatedBudgetRange={generatedBudgetRange}
      generatedComplexity={generatedComplexity}
      generatedRiskLevel={generatedRiskLevel}
      generatedSummary={generatedSummary}
      inquiryType="AI Project Advisor"
      onSubmitted={handleSubmitted}
      sourcePage="/ai-project-advisor"
      sourceTool="ai-project-advisor"
      submitLabel="Trimite contextul către ZES"
      summary={summary}
      title="Trimite rezultatul către echipa ZES pentru o discuție tehnică."
      tone="dark"
    />
  );
}
