"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import type { LeadSummaryPreview } from "@/lib/lead-types";

export type RadiologyPlannerLeadCTAProps = {
  summary?: LeadSummaryPreview;
  generatedSummary?: string;
  generatedBudgetRange?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
};

export function RadiologyPlannerLeadCTA({
  summary,
  generatedSummary,
  generatedBudgetRange,
  generatedRiskLevel,
  generatedComplexity,
}: RadiologyPlannerLeadCTAProps) {
  return (
    <LeadCaptureForm
      description="Validează camera înainte ca ecranarea, aparatura sau autorizarea să blocheze proiectul. Pentru RMN discutăm RF shielding; pentru CT/RX discutăm protecție radiologică."
      extraFields={[
        { id: "projectType", label: "Tip echipament", placeholder: "CT, RMN, RX..." },
      ]}
      eyebrow="Solicită verificare tehnică pentru camera de radiologie"
      generatedBudgetRange={generatedBudgetRange}
      generatedComplexity={generatedComplexity}
      generatedRiskLevel={generatedRiskLevel}
      generatedSummary={generatedSummary}
      inquiryType="Radiology Room Planner"
      sourcePage="/radiology-room-planner"
      sourceTool="radiology-room-planner"
      submitLabel="Solicită verificarea tehnică"
      summary={summary}
      title="Transformă rezultatul plannerului într-o verificare tehnică ZES."
      tone="dark"
    />
  );
}
