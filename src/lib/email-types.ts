import type { LeadPayload } from "@/lib/lead-types";
import type { LeadIntelligence } from "@/lib/ai-intelligence/lead-intelligence";
import type { LeadPriority, LeadScoreResult } from "@/lib/lead-scoring";

export type EmailProvider = "resend" | "sendgrid" | "smtp" | "gmail-workspace" | "mock";

export type LeadNotificationEmail = {
  provider: EmailProvider;
  to: string[];
  subject: string;
  summary: string;
  priority: LeadPriority;
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  projectDetails: {
    sourceTool: string;
    sourcePage: string;
    inquiryType: string;
    projectType?: string;
    urgency?: string;
    message?: string;
  };
  estimatedBudget?: string;
  recommendedServices: string[];
  nextStep: string;
  adminReviewLink: string;
  scoring: LeadScoreResult;
  leadIntelligence?: LeadIntelligence;
  createdAt: string;
};

export type LeadConfirmationEmail = {
  provider: EmailProvider;
  to: string;
  subject: string;
  summary: string;
  nextStep: string;
  createdAt: string;
  sourcePage: string;
};

export type EmailSendResult = {
  ok: boolean;
  mode: "mock" | "live" | "config-error" | "provider-error" | "unsupported";
  provider: EmailProvider;
  message: string;
};

export type EmailBuildContext = {
  lead: LeadPayload;
  scoring: LeadScoreResult;
  leadId: string;
  recommendedServices?: string[];
  leadIntelligence?: LeadIntelligence;
};
