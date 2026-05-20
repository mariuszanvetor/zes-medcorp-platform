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
      description="Propunerea preliminară rămâne orientativă. ZES poate transforma ipotezele într-o discuție aplicată după verificarea planurilor, echipamentelor și stadiului de proiect."
      extraFields={[
        { id: "projectType", label: "Tip proiect", placeholder: "Clinica, radiologie, IVD..." },
      ]}
      eyebrow="Solicită propunere tehnică personalizată ZES"
      generatedBudgetRange={generatedBudgetRange}
      generatedComplexity={generatedComplexity}
      generatedRiskLevel={generatedRiskLevel}
      generatedSummary={generatedSummary}
      inquiryType="Proposal Builder"
      sourcePage="/proposal-builder"
      sourceTool="proposal-builder"
      submitLabel="Solicită discuție pe propunere"
      summary={summary}
      title="Transformă propunerea preliminară într-o discuție aplicată."
      tone="light"
    />
  );
}
