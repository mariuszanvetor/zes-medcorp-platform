"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import type { LeadSummaryPreview } from "@/lib/lead-types";

export type ServiceDiagnosticLeadCTAProps = {
  summary?: LeadSummaryPreview;
  generatedSummary?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
};

export function ServiceDiagnosticLeadCTA({
  summary,
  generatedSummary,
  generatedRiskLevel,
  generatedComplexity,
}: ServiceDiagnosticLeadCTAProps) {
  return (
    <LeadCaptureForm
      description="Trimite simptomele, impactul operațional și datele de contact pentru o evaluare service. Rezultatul nu înlocuiește verificarea tehnică pe echipament."
      extraFields={[
        { id: "projectType", label: "Tip echipament", placeholder: "CT, RMN, RX, IVD..." },
      ]}
      eyebrow="Solicită intervenție / evaluare service ZES"
      generatedComplexity={generatedComplexity}
      generatedRiskLevel={generatedRiskLevel}
      generatedSummary={generatedSummary}
      inquiryType="Service Diagnostic"
      sourcePage="/service-diagnostic"
      sourceTool="service-diagnostic"
      submitLabel="Solicită evaluare service"
      summary={summary}
      title="Trimite cazul către echipa tehnică pentru o evaluare aplicată."
      tone="light"
    />
  );
}
