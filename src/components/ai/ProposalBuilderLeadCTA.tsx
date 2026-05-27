"use client";

import { useEffect, useMemo, useState } from "react";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import {
  createDiscoveryContextSummary,
  loadDiscoveryContext,
  type SerializableDiscoveryContext,
} from "@/lib/ai-intelligence/discovery-context";
import type { ProposalIntelligenceOutput } from "@/lib/ai-intelligence/proposal-intelligence";
import type { LeadSummaryPreview } from "@/lib/lead-types";

export type ProposalBuilderLeadCTAProps = {
  summary?: LeadSummaryPreview;
  generatedSummary?: string;
  generatedBudgetRange?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
  proposalIntelligence?: ProposalIntelligenceOutput;
};

export function ProposalBuilderLeadCTA({
  summary,
  generatedSummary,
  generatedBudgetRange,
  generatedRiskLevel,
  generatedComplexity,
  proposalIntelligence,
}: ProposalBuilderLeadCTAProps) {
  const [discoveryContext, setDiscoveryContext] = useState<SerializableDiscoveryContext | null>(null);
  useEffect(() => {
    setDiscoveryContext(loadDiscoveryContext());
  }, []);

  const mergedSummary = useMemo(() => {
    const intelligenceSummary = proposalIntelligence
      ? [
          `Proposal intelligence: readiness ${proposalIntelligence.proposalReadinessScore}/100, complexitate ${proposalIntelligence.complexityAnalysis.level}, informatii lipsa ${proposalIntelligence.missingInformation.length}.`,
          proposalIntelligence.projectIntelligenceSummary,
          ...proposalIntelligence.internalLeadNotes,
        ].join("\n")
      : "";

    return [
      generatedSummary,
      discoveryContext ? createDiscoveryContextSummary(discoveryContext) : "",
      intelligenceSummary,
    ]
      .filter(Boolean)
      .join("\n\n");
  }, [discoveryContext, generatedSummary, proposalIntelligence]);

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
