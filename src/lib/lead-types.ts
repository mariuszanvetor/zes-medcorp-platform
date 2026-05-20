export type LeadPayload = {
  sourceTool: string;
  sourcePage: string;
  inquiryType: string;
  projectType?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  urgency?: string;
  message?: string;
  generatedSummary?: string;
  generatedBudgetRange?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
  timestamp: string;
  metadata?: Record<string, string>;
};

export type LeadSummaryPreview = {
  projectType?: string;
  complexity?: string;
  budgetRange?: string;
  riskLevel?: string;
  urgency?: string;
  nextStep?: string;
};

export type LeadSubmissionState = "idle" | "loading" | "success" | "error";

export const futureLeadIntegrationNotes = [
  "HubSpot / CRM sync pentru lead scoring și pipeline comercial.",
  "Notificări email către echipa ZES pe categorii de solicitare.",
  "Export PDF pentru propuneri preliminare și rapoarte generate.",
  "Saved project reports pentru revenire, comparații și revizuiri tehnice.",
];
