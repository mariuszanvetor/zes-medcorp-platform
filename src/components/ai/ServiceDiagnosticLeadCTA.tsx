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
      description="Trimiteți simptomele și impactul operațional pentru o triere service. Rezultatul nu înlocuiește verificarea tehnică pe echipament sau documentația de service."
      extraFields={[
        { id: "projectType", label: "Tip echipament", placeholder: "CT, RMN, RX, IVD..." },
      ]}
      eyebrow="Evaluare service"
      generatedComplexity={generatedComplexity}
      generatedRiskLevel={generatedRiskLevel}
      generatedSummary={generatedSummary}
      inquiryType="Service Diagnostic"
      sourcePage="/service-diagnostic"
      sourceTool="service-diagnostic"
      submitLabel="Solicitați evaluare service"
      summary={summary}
      title="Trimiteți cazul către echipa tehnică pentru o evaluare aplicată."
      tone="light"
    />
  );
}
