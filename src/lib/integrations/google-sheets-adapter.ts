import type { LeadIntegrationMode } from "@/lib/integration-config";
import type { LeadPayload } from "@/lib/lead-types";
import type { LeadScoreResult } from "@/lib/lead-scoring";

export type GoogleSheetsLeadRow = {
  leadId: string;
  receivedAt: string;
  sourceTool: string;
  sourcePage: string;
  inquiryType: string;
  projectType?: string;
  company?: string;
  contactName: string;
  email: string;
  phone: string;
  urgency?: string;
  estimatedBudgetRange?: string;
  complexity?: string;
  riskLevel?: string;
  score: number;
  priority: string;
  nextAction: string;
  recommendedServices: string;
};

export type GoogleSheetsConfigStatus = {
  ok: boolean;
  mode: "mock";
  requested: boolean;
  missingEnv: string[];
  tabName: string;
  message: string;
};

export type GoogleSheetsAppendResult = {
  ok: boolean;
  sheetsMode: "mock";
  requested: boolean;
  rowPrepared: boolean;
  message: string;
};

export type BuildGoogleSheetsLeadRowInput = {
  lead: LeadPayload;
  scoring: LeadScoreResult;
  leadId: string;
  recommendedServices?: string[];
};

export function buildGoogleSheetsLeadRow({
  lead,
  scoring,
  leadId,
  recommendedServices = [],
}: BuildGoogleSheetsLeadRowInput): GoogleSheetsLeadRow {
  return {
    leadId,
    receivedAt: lead.timestamp || new Date().toISOString(),
    sourceTool: lead.sourceTool,
    sourcePage: lead.sourcePage,
    inquiryType: lead.inquiryType,
    projectType: lead.projectType,
    company: lead.company,
    contactName: lead.name,
    email: lead.email,
    phone: lead.phone,
    urgency: lead.urgency,
    estimatedBudgetRange: lead.generatedBudgetRange,
    complexity: lead.generatedComplexity,
    riskLevel: lead.generatedRiskLevel,
    score: scoring.score,
    priority: scoring.priority,
    nextAction: scoring.nextAction,
    recommendedServices: recommendedServices.join(", "),
  };
}

export async function appendLeadToGoogleSheets(
  row: GoogleSheetsLeadRow,
  integrationMode: LeadIntegrationMode = "mock",
): Promise<GoogleSheetsAppendResult> {
  void row;
  const sheetsRequested =
    integrationMode === "sheets-only" || integrationMode === "email-and-sheets";
  const config = validateSheetsConfig(sheetsRequested);

  if (!sheetsRequested) {
    return {
      ok: true,
      sheetsMode: "mock",
      requested: false,
      rowPrepared: true,
      message:
        "Google Sheets row prepared only. Integration mode does not request Sheets logging.",
    };
  }

  if (!config.ok) {
    return {
      ok: true,
      sheetsMode: "mock",
      requested: true,
      rowPrepared: true,
      message:
        "Google Sheets logging was requested, but configuration is incomplete. Mock mode remained active.",
    };
  }

  return {
    ok: true,
    sheetsMode: "mock",
    requested: true,
    rowPrepared: true,
    message:
      "Google Sheets row prepared in mock mode. No Google API dependency is installed and no row was appended.",
  };
}

export function validateSheetsConfig(
  requested = false,
): GoogleSheetsConfigStatus {
  const requiredEnv = [
    "GOOGLE_SHEETS_ID",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_PRIVATE_KEY",
  ];
  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  return {
    ok: requested ? missingEnv.length === 0 : false,
    mode: "mock",
    requested,
    missingEnv,
    tabName: process.env.GOOGLE_SHEETS_TAB_NAME || "Leads",
    message: requested
      ? missingEnv.length
        ? "Google Sheets configuration is incomplete. No external call will be made."
        : "Google Sheets configuration shape is present, but the adapter is still mock-only."
      : "Google Sheets logging is not requested in the current integration mode.",
  };
}

