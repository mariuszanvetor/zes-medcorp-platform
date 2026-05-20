import type {
  CrmContactRecord,
  CrmDealRecord,
  CrmPayload,
  CrmProvider,
  CrmSendResult,
} from "@/lib/crm-types";
import type { LeadPayload } from "@/lib/lead-types";
import { scoreLead, type LeadScoreResult } from "@/lib/lead-scoring";

export function buildCrmPayload(
  lead: LeadPayload,
  scoring: LeadScoreResult = scoreLead(lead),
): CrmPayload {
  const provider = getCrmProvider();

  return {
    contact: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
    },
    company: {
      name: lead.company,
    },
    source: {
      provider,
      sourceTool: lead.sourceTool,
      sourcePage: lead.sourcePage,
      inquiryType: lead.inquiryType,
    },
    project: {
      projectType: lead.projectType,
      urgency: lead.urgency,
      message: lead.message,
      recommendedServices: parseRecommendedServices(lead),
    },
    estimates: {
      budgetRange: lead.generatedBudgetRange,
      complexity: lead.generatedComplexity,
      riskLevel: lead.generatedRiskLevel,
    },
    scoring,
    attribution: {
      latestPage: lead.sourcePage,
    },
    notes: buildNotes(lead, scoring),
    timestamps: {
      receivedAt: lead.timestamp,
      preparedAt: new Date().toISOString(),
    },
    rawLead: lead,
  };
}

export async function sendToCrm(payload: CrmPayload): Promise<CrmSendResult> {
  // TODO: connect HubSpot, Pipedrive, Zoho, custom CRM or webhook provider.
  // This function must remain idempotent when real retries are added.
  void payload;

  return {
    ok: true,
    mode: "mock",
    provider: getCrmProvider(),
    message: "CRM payload built only. No external CRM call was made.",
  };
}

export function mapLeadToCrmContact(lead: LeadPayload): CrmContactRecord {
  return {
    email: lead.email,
    properties: {
      name: lead.name,
      phone: lead.phone,
      company: lead.company,
      source_tool: lead.sourceTool,
      source_page: lead.sourcePage,
    },
  };
}

export function mapLeadToCrmDeal(
  lead: LeadPayload,
  scoring: LeadScoreResult = scoreLead(lead),
): CrmDealRecord {
  return {
    name: `${lead.inquiryType} - ${lead.company || lead.name}`,
    stage:
      scoring.priority === "Critical / immediate opportunity"
        ? "priority-review"
        : scoring.priority === "High priority"
          ? "qualified"
          : "new",
    valueRange: lead.generatedBudgetRange,
    properties: {
      lead_score: scoring.score,
      priority: scoring.priority,
      project_type: lead.projectType,
      urgency: lead.urgency,
      risk_level: lead.generatedRiskLevel,
      complexity: lead.generatedComplexity,
    },
  };
}

function getCrmProvider(): CrmProvider {
  const provider = process.env.CRM_PROVIDER?.toLowerCase();

  if (
    provider === "hubspot" ||
    provider === "pipedrive" ||
    provider === "zoho" ||
    provider === "custom-webhook"
  ) {
    return provider;
  }

  return "mock";
}

function parseRecommendedServices(lead: LeadPayload) {
  const services = lead.metadata?.recommendedServices;
  if (!services) return undefined;

  return services
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildNotes(lead: LeadPayload, scoring: LeadScoreResult) {
  return [
    `Priority: ${scoring.priority} (${scoring.score}/100)`,
    lead.generatedSummary ? `Generated summary: ${lead.generatedSummary}` : "",
    lead.message ? `Message: ${lead.message}` : "",
    scoring.reasons.length ? `Scoring reasons: ${scoring.reasons.join("; ")}` : "",
  ].filter(Boolean);
}
