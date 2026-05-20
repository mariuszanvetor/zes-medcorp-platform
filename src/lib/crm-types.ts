import type { LeadPayload } from "@/lib/lead-types";
import type { LeadScoreResult } from "@/lib/lead-scoring";

export type CrmProvider =
  | "hubspot"
  | "pipedrive"
  | "zoho"
  | "custom-webhook"
  | "mock";

export type CrmContactPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
};

export type CrmCompanyPayload = {
  name?: string;
  domain?: string;
};

export type CrmSourcePayload = {
  provider: CrmProvider;
  sourceTool: string;
  sourcePage: string;
  inquiryType: string;
};

export type CrmProjectPayload = {
  projectType?: string;
  urgency?: string;
  message?: string;
  recommendedServices?: string[];
};

export type CrmEstimatePayload = {
  budgetRange?: string;
  complexity?: string;
  riskLevel?: string;
};

export type CrmAttributionPayload = {
  landingPage?: string;
  latestPage?: string;
  campaign?: string;
  medium?: string;
  source?: string;
};

export type CrmPayload = {
  contact: CrmContactPayload;
  company: CrmCompanyPayload;
  source: CrmSourcePayload;
  project: CrmProjectPayload;
  estimates: CrmEstimatePayload;
  scoring: LeadScoreResult;
  attribution: CrmAttributionPayload;
  notes: string[];
  timestamps: {
    receivedAt: string;
    preparedAt: string;
  };
  rawLead: LeadPayload;
};

export type CrmContactRecord = {
  email: string;
  properties: Record<string, string | undefined>;
};

export type CrmDealRecord = {
  name: string;
  stage: "new" | "qualified" | "priority-review" | "mock";
  valueRange?: string;
  properties: Record<string, string | number | undefined>;
};

export type CrmSendResult = {
  ok: boolean;
  mode: "mock";
  provider: CrmProvider;
  externalId?: string;
  message: string;
};
