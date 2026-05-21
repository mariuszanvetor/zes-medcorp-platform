import type {
  LeadStorageProvider,
  LeadStorageProviderName,
  LeadStorageResult,
  SaveLeadInput,
  StoredLeadNote,
  StoredLeadRecord,
  StoredLeadStatus,
} from "@/lib/lead-storage";

export function createMockLeadStorageProvider(
  requestedMode: LeadStorageProviderName = "mock",
): LeadStorageProvider {
  const mode: LeadStorageProviderName = "mock";

  return {
    mode,
    async saveLead(input: SaveLeadInput) {
      const now = new Date().toISOString();
      const leadId = createMockLeadId();
      const record: StoredLeadRecord = {
        id: leadId,
        payload: input.lead,
        status: input.status ?? getDefaultStatus(input.scoring.score),
        score: input.scoring.score,
        priority: input.scoring.priority,
        nextAction: input.scoring.nextAction,
        createdAt: now,
        updatedAt: now,
        notes: [],
      };

      return {
        ok: true,
        storageMode: mode,
        leadId,
        data: record,
        message:
          requestedMode === "mock"
            ? "Mock lead storage accepted the lead. No persistent storage was used."
            : `Requested storage provider "${requestedMode}" is not connected. Mock storage was used instead.`,
      };
    },

    async getLeadById(id: string) {
      return mockReadResponse<StoredLeadRecord | null>(
        id,
        "Mock storage does not persist leads, so no stored record was returned.",
        null,
      );
    },

    async listLeads() {
      return {
        ok: true,
        storageMode: mode,
        data: [],
        message:
          "Mock storage does not maintain a persistent lead list. Admin currently uses demo data.",
      };
    },

    async updateLeadStatus(id: string, status: StoredLeadStatus) {
      void status;

      return mockReadResponse<StoredLeadRecord | null>(
        id,
        "Mock storage received a status update request, but no persistent lead was changed.",
        null,
      );
    },

    async addLeadNote(id: string, note: Omit<StoredLeadNote, "id" | "createdAt">) {
      const storedNote: StoredLeadNote = {
        ...note,
        id: `mock_note_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      return {
        ok: true,
        storageMode: mode,
        leadId: id,
        data: storedNote,
        message:
          "Mock storage accepted the note shape, but no persistent note was stored.",
      };
    },
  };
}

function createMockLeadId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `mock_${crypto.randomUUID()}`;
  }

  return `mock_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function getDefaultStatus(score: number): StoredLeadStatus {
  if (score >= 80) return "priority";
  if (score >= 60) return "qualified";
  return "new";
}

function mockReadResponse<T>(
  id: string,
  message: string,
  data: T,
): LeadStorageResult<T> {
  return {
    ok: true,
    storageMode: "mock",
    leadId: id,
    data,
    message,
  };
}
