export type LeadIntegrationMode =
  | "mock"
  | "email-only"
  | "sheets-only"
  | "email-and-sheets"
  | "crm";

export type LeadIntegrationConfig = {
  mode: LeadIntegrationMode;
  emailRequested: boolean;
  sheetsRequested: boolean;
  crmRequested: boolean;
  isMockSafe: boolean;
};

export function getLeadIntegrationConfig(): LeadIntegrationConfig {
  const mode = normalizeIntegrationMode(process.env.LEAD_INTEGRATION_MODE);

  return {
    mode,
    emailRequested: mode === "email-only" || mode === "email-and-sheets",
    sheetsRequested: mode === "sheets-only" || mode === "email-and-sheets",
    crmRequested: mode === "crm",
    isMockSafe: mode === "mock",
  };
}

export function normalizeIntegrationMode(
  value: string | undefined,
): LeadIntegrationMode {
  const mode = value?.toLowerCase();

  if (
    mode === "email-only" ||
    mode === "sheets-only" ||
    mode === "email-and-sheets" ||
    mode === "crm"
  ) {
    return mode;
  }

  return "mock";
}

