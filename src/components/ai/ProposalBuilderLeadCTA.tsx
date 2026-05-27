"use client";

import { useEffect, useMemo, useState } from "react";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import {
  createDiscoveryContextSummary,
  loadDiscoveryContext,
  type SerializableDiscoveryContext,
} from "@/lib/ai-intelligence/discovery-context";
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
  const [discoveryContext, setDiscoveryContext] = useState<SerializableDiscoveryContext | null>(null);
  useEffect(() => {
    setDiscoveryContext(loadDiscoveryContext());
  }, []);

  const mergedSummary = useMemo(() => {
    if (!discoveryContext) return generatedSummary;
    return [generatedSummary, createDiscoveryContextSummary(discoveryContext)]
      .filter(Boolean)
      .join("\n\n");
  }, [discoveryContext, generatedSummary]);

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
      generatedSummary={mergedSummary}
      inquiryType={discoveryContext ? "Proposal Builder din AI Discovery" : "Proposal Builder"}
      sourcePage="/proposal-builder"
      sourceTool={discoveryContext ? "proposal-builder-from-discovery" : "proposal-builder"}
      submitLabel="Solicitați discuție pe propunere"
      summary={summary}
      title="Transformați propunerea preliminară într-o discuție aplicată."
      tone="light"
    />
  );
}
