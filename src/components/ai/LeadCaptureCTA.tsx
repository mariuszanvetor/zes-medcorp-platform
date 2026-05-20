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
      description="Trimite rezultatul și contextul proiectului pentru o evaluare tehnică preliminară. ZES poate valida ipotezele doar după analizarea spațiului, planurilor și echipamentelor."
      eyebrow="Evaluare tehnică preliminară"
      generatedBudgetRange={generatedBudgetRange}
      generatedComplexity={generatedComplexity}
      generatedRiskLevel={generatedRiskLevel}
      generatedSummary={generatedSummary}
      inquiryType="AI Project Advisor"
      onSubmitted={handleSubmitted}
      sourcePage="/ai-project-advisor"
      sourceTool="ai-project-advisor"
      submitLabel="Solicitați evaluare tehnică"
      summary={summary}
      title="Transformați rezultatul într-o discuție tehnică aplicată."
      tone="dark"
    />
  );
}
