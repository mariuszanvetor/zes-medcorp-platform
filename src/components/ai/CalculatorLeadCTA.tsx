"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import type { LeadSummaryPreview } from "@/lib/lead-types";

export type CalculatorLeadCTAProps = {
  sourcePage?: string;
  inquiryType?: string;
  summary?: LeadSummaryPreview;
  generatedSummary?: string;
  generatedBudgetRange?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
};

export function CalculatorLeadCTA({
  sourcePage = "/calculator-proiect-medical",
  inquiryType = "Medical Project Calculator",
  summary,
  generatedSummary,
  generatedBudgetRange,
  generatedRiskLevel,
  generatedComplexity,
}: CalculatorLeadCTAProps) {
  return (
    <LeadCaptureForm
      description="Calculatorul oferă orientări de complexitate și buget, nu prețuri finale. ZES poate valida ipotezele pe baza spațiului, echipamentelor și documentației reale."
      eyebrow="Solicită analiză tehnică ZES"
      generatedBudgetRange={generatedBudgetRange}
      generatedComplexity={generatedComplexity}
      generatedRiskLevel={generatedRiskLevel}
      generatedSummary={generatedSummary}
      inquiryType={inquiryType}
      sourcePage={sourcePage}
      sourceTool="calculator"
      submitLabel="Trimite estimarea către ZES"
      summary={summary}
      title="Transformă estimarea într-o discuție tehnică aplicată."
      tone="dark"
    />
  );
}
