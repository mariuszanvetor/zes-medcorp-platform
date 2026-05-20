"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import type { LeadSummaryPreview } from "@/lib/lead-types";

export type ProposalBuilderLeadCTAProps = {
  summary?: LeadSummaryPreview;
  generatedSummary?: string;
  generatedBudgetRange?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
};

export function ProposalBuilderLeadCTA({
  summary,
  generatedSummary,
  generatedBudgetRange,
  generatedRiskLevel,
  generatedComplexity,
}: ProposalBuilderLeadCTAProps) {
  return (
    <LeadCaptureForm
      description="Propunerea rămâne preliminară până la validarea planurilor, echipamentelor și stadiului de proiect. Folosiți formularul pentru a cere o discuție tehnică pe ipotezele generate."
      extraFields={[
        { id: "projectType", label: "Tip proiect", placeholder: "Clinica, radiologie, IVD..." },
      ]}
      eyebrow="Discuție pe propunere"
      generatedBudgetRange={generatedBudgetRange}
      generatedComplexity={generatedComplexity}
      generatedRiskLevel={generatedRiskLevel}
      generatedSummary={generatedSummary}
      inquiryType="Proposal Builder"
      sourcePage="/proposal-builder"
      sourceTool="proposal-builder"
      submitLabel="Solicitați discuție pe propunere"
      summary={summary}
      title="Transformați propunerea preliminară într-o discuție aplicată."
      tone="light"
    />
  );
}
