import type { LeadPayload } from "@/lib/lead-types";
import type { LeadPriority, LeadScoreResult } from "@/lib/lead-scoring";
import {
  createMockLeadStorageProvider,
} from "@/lib/integrations/mock-lead-storage";

export type LeadStorageProviderName =
  | "mock"
  | "vercel-postgres"
  | "supabase"
  | "neon"
  | "airtable"
  | "google-sheets"
  | "hubspot"
  | "custom-webhook";

export type StoredLeadStatus =
  | "new"
  | "qualified"
  | "priority"
  | "contacted"
  | "in-review"
  | "proposal"
  | "closed";

export type StoredLeadNote = {
  id: string;
  body: string;
  createdAt: string;
  author?: string;
};

export type StoredLeadRecord = {
  id: string;
  payload: LeadPayload;
  status: StoredLeadStatus;
  score: number;
  priority: LeadPriority;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
  notes: StoredLeadNote[];
};

export type SaveLeadInput = {
  lead: LeadPayload;
  scoring: LeadScoreResult;
  status?: StoredLeadStatus;
};

export type LeadStorageResult<T = undefined> = {
  ok: boolean;
  storageMode: LeadStorageProviderName;
  leadId?: string;
  data?: T;
  message: string;
};

export type ListLeadsQuery = {
  status?: StoredLeadStatus;
  sourceTool?: string;
  limit?: number;
};

export type LeadStorageProvider = {
  readonly mode: LeadStorageProviderName;
  saveLead(input: SaveLeadInput): Promise<LeadStorageResult<StoredLeadRecord>>;
  getLeadById(id: string): Promise<LeadStorageResult<StoredLeadRecord | null>>;
  listLeads(query?: ListLeadsQuery): Promise<LeadStorageResult<StoredLeadRecord[]>>;
  updateLeadStatus(
    id: string,
    status: StoredLeadStatus,
  ): Promise<LeadStorageResult<StoredLeadRecord | null>>;
  addLeadNote(
    id: string,
    note: Omit<StoredLeadNote, "id" | "createdAt">,
  ): Promise<LeadStorageResult<StoredLeadNote>>;
};

export type FutureLeadStorageProviderPlan = {
  provider: Exclude<LeadStorageProviderName, "mock">;
  recommendedFor: string;
  requiredEnv: string[];
  notes: string;
};

export const futureLeadStorageProviders: FutureLeadStorageProviderPlan[] = [
  {
    provider: "vercel-postgres",
    recommendedFor: "Vercel-native deployment with SQL reporting needs.",
    requiredEnv: ["LEAD_DATABASE_URL"],
    notes: "Good first real database option for a Next.js deployment on Vercel.",
  },
  {
    provider: "supabase",
    recommendedFor: "Admin dashboards, row-level security and future auth.",
    requiredEnv: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
    notes: "Use server-side service role only; never expose it to the browser.",
  },
  {
    provider: "neon",
    recommendedFor: "Serverless Postgres with branching and SQL portability.",
    requiredEnv: ["LEAD_DATABASE_URL"],
    notes: "Useful when the team wants Postgres without vendor-specific APIs.",
  },
  {
    provider: "airtable",
    recommendedFor: "Lightweight operations workflow before a full CRM.",
    requiredEnv: ["AIRTABLE_API_KEY", "AIRTABLE_BASE_ID"],
    notes: "Good for prototyping, but review privacy and access controls.",
  },
  {
    provider: "google-sheets",
    recommendedFor: "Temporary internal review workflow with low volume.",
    requiredEnv: ["GOOGLE_SHEETS_ID"],
    notes: "Not recommended for sensitive production lead storage without strict access control.",
  },
  {
    provider: "hubspot",
    recommendedFor: "CRM-first lead routing and sales pipeline.",
    requiredEnv: ["CRM_API_KEY"],
    notes: "Prefer storing sales objects in CRM after internal consent/privacy review.",
  },
  {
    provider: "custom-webhook",
    recommendedFor: "Forwarding leads to an existing internal system.",
    requiredEnv: ["CRM_WEBHOOK_URL"],
    notes: "Webhook payloads must be signed and retried safely.",
  },
];

export function getLeadStorageProvider(): LeadStorageProvider {
  const provider = normalizeStorageProvider(process.env.LEAD_STORAGE_PROVIDER);

  if (provider !== "mock") {
    // Future providers are intentionally not connected yet.
    // Keep this fallback safe until authentication, storage and privacy review are complete.
    return createMockLeadStorageProvider(provider);
  }

  return createMockLeadStorageProvider("mock");
}

export async function saveLead(input: SaveLeadInput) {
  return getLeadStorageProvider().saveLead(input);
}

export async function getLeadById(id: string) {
  return getLeadStorageProvider().getLeadById(id);
}

export async function listLeads(query?: ListLeadsQuery) {
  return getLeadStorageProvider().listLeads(query);
}

export async function updateLeadStatus(id: string, status: StoredLeadStatus) {
  return getLeadStorageProvider().updateLeadStatus(id, status);
}

export async function addLeadNote(
  id: string,
  note: Omit<StoredLeadNote, "id" | "createdAt">,
) {
  return getLeadStorageProvider().addLeadNote(id, note);
}

function normalizeStorageProvider(
  value: string | undefined,
): LeadStorageProviderName {
  const provider = value?.toLowerCase();

  if (
    provider === "vercel-postgres" ||
    provider === "supabase" ||
    provider === "neon" ||
    provider === "airtable" ||
    provider === "google-sheets" ||
    provider === "hubspot" ||
    provider === "custom-webhook"
  ) {
    return provider;
  }

  return "mock";
}
