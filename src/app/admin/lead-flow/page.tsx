import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  LeadFlowMonitor,
  type LeadFlowCheck,
  type LeadFlowMonitorConfig,
} from "@/components/admin/LeadFlowMonitor";
import { canRenderAdminContent } from "@/lib/admin-access";
import { getLeadIntegrationConfig } from "@/lib/integration-config";
import { validateEmailConfig } from "@/lib/integrations/email-adapter";
import { validateSheetsConfig } from "@/lib/integrations/google-sheets-adapter";
import { getZESAIConfig } from "@/lib/zes-ai";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Lead Flow Monitor | ZES MEDCORP",
  },
  description:
    "Panou intern pentru diagnosticarea fluxului de leaduri ZES.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLeadFlowPage() {
  const canRender = await canRenderAdminContent();
  const config = canRender ? buildLeadFlowMonitorConfig() : null;

  return (
    <AdminShell
      eyebrow="Internal diagnostic"
      subtitle="Panou intern pentru verificarea modurilor active de lead capture, email, Google Sheets si storage. Nu afiseaza secrete si nu ruleaza teste automat."
      title="Lead Flow Monitor"
    >
      {config ? <LeadFlowMonitor config={config} /> : null}
    </AdminShell>
  );
}

function buildLeadFlowMonitorConfig(): LeadFlowMonitorConfig {
  const integrationConfig = getLeadIntegrationConfig();
  const emailConfig = validateEmailConfig({ requiresInternalRecipient: true });
  const sheetsConfig = validateSheetsConfig(integrationConfig.sheetsRequested);
  const zesAiConfig = getZESAIConfig();
  const emailProvider = process.env.EMAIL_PROVIDER || "mock";
  const storageProvider = process.env.LEAD_STORAGE_PROVIDER || "mock";

  return {
    integrationMode: integrationConfig.mode,
    expectedAiMode: zesAiConfig.enabled
      ? "real"
      : zesAiConfig.requested
        ? "mock"
        : "mock",
    aiModel: zesAiConfig.model,
    expectedEmailMode: integrationConfig.emailRequested
      ? emailConfig.mode
      : "mock",
    expectedSheetsMode: integrationConfig.sheetsRequested
      ? sheetsConfig.ok
        ? "real"
        : "config-error"
      : "mock",
    storageMode: storageProvider,
    zesAi: buildZesAiChecks(zesAiConfig),
    resend: buildResendChecks({
      emailProvider,
      emailRequested: integrationConfig.emailRequested,
    }),
    sheets: buildSheetsChecks({
      sheetsRequested: integrationConfig.sheetsRequested,
    }),
    flags: buildFlagChecks(),
  };
}

function buildZesAiChecks(config: ReturnType<typeof getZESAIConfig>): LeadFlowCheck[] {
  return [
    {
      label: "ZES AI enabled flag",
      status: config.requested ? "configured" : "safe",
      detail: config.requested
        ? "ZES_AI_ENABLED=true. Server-side AI poate fi folosit cand cheia este prezenta."
        : "ZES ruleaza in fallback determinist pana la activarea explicita a AI-ului.",
    },
    presenceCheck("OpenAI API key", "OPENAI_API_KEY", true),
    {
      label: "ZES AI model",
      status: config.model ? "configured" : "missing",
      detail: `Model curent: ${config.model}.`,
    },
  ];
}

function buildResendChecks({
  emailProvider,
  emailRequested,
}: {
  emailProvider: string;
  emailRequested: boolean;
}): LeadFlowCheck[] {
  return [
    {
      label: "Email integration requested",
      status: emailRequested ? "configured" : "disabled",
      detail: emailRequested
        ? "LEAD_INTEGRATION_MODE solicita email."
        : "Email-ul nu este cerut de modul curent.",
    },
    {
      label: "Email provider",
      status:
        emailProvider === "resend"
          ? "configured"
          : emailRequested
            ? "attention"
            : "disabled",
      detail:
        emailProvider === "resend"
          ? "Resend este provider-ul selectat."
          : `Provider curent: ${emailProvider}.`,
    },
    presenceCheck("Resend API key", "RESEND_API_KEY", true),
    presenceCheck("Email sender", "EMAIL_FROM"),
    presenceCheck("Notification recipient", "LEAD_NOTIFICATION_EMAIL"),
    presenceCheck("Verified domain", "RESEND_VERIFIED_DOMAIN"),
    {
      label: "Domain verification flag",
      status:
        process.env.RESEND_DOMAIN_VERIFIED === "true"
          ? "configured"
          : "missing",
      detail:
        process.env.RESEND_DOMAIN_VERIFIED === "true"
          ? "Domeniul este marcat ca verificat in configuratie."
          : "Setati true doar dupa verificarea domeniului in Resend.",
    },
  ];
}

function buildSheetsChecks({
  sheetsRequested,
}: {
  sheetsRequested: boolean;
}): LeadFlowCheck[] {
  return [
    {
      label: "Sheets integration requested",
      status: sheetsRequested ? "configured" : "disabled",
      detail: sheetsRequested
        ? "LEAD_INTEGRATION_MODE solicita Google Sheets."
        : "Google Sheets nu este cerut de modul curent.",
    },
    presenceCheck(
      "Spreadsheet ID",
      "GOOGLE_SHEETS_SPREADSHEET_ID",
      false,
      "GOOGLE_SHEETS_ID",
    ),
    presenceCheck(
      "Client email",
      "GOOGLE_SHEETS_CLIENT_EMAIL",
      false,
      "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    ),
    presenceCheck(
      "Private key",
      "GOOGLE_SHEETS_PRIVATE_KEY",
      true,
      "GOOGLE_PRIVATE_KEY",
    ),
    presenceCheck("Project ID", "GOOGLE_SHEETS_PROJECT_ID", false, undefined, true),
    {
      label: "Sheet tab",
      status: process.env.GOOGLE_SHEETS_TAB_NAME ? "configured" : "safe",
      detail: process.env.GOOGLE_SHEETS_TAB_NAME
        ? "Tab name este configurat."
        : "Se va folosi fallback-ul sigur: Leads.",
    },
  ];
}

function buildFlagChecks(): LeadFlowCheck[] {
  return [
    {
      label: "Lead confirmation email",
      status:
        process.env.LEAD_CONFIRMATION_EMAIL_ENABLED === "true"
          ? "attention"
          : "safe",
      detail:
        process.env.LEAD_CONFIRMATION_EMAIL_ENABLED === "true"
          ? "Confirmarile catre utilizatori sunt active. Verificati politica de confidentialitate."
          : "Confirmarile catre utilizatori sunt dezactivate.",
    },
    {
      label: "High priority alert email",
      status:
        process.env.HIGH_PRIORITY_ALERT_EMAIL_ENABLED === "true"
          ? "attention"
          : "safe",
      detail:
        process.env.HIGH_PRIORITY_ALERT_EMAIL_ENABLED === "true"
          ? "Alertele separate pot genera emailuri interne suplimentare."
          : "Alertele separate sunt dezactivate; contextul ramane in notificarea principala.",
    },
    {
      label: "Submission cooldown",
      status: "safe",
      detail: `Cooldown duplicate: ${process.env.LEAD_SUBMISSION_COOLDOWN_SECONDS || "45"} secunde.`,
    },
    {
      label: "Lead storage",
      status:
        !process.env.LEAD_STORAGE_PROVIDER ||
        process.env.LEAD_STORAGE_PROVIDER === "mock"
          ? "safe"
          : "attention",
      detail:
        !process.env.LEAD_STORAGE_PROVIDER ||
        process.env.LEAD_STORAGE_PROVIDER === "mock"
          ? "Storage persistent nu este activ."
          : "Storage provider diferit de mock. Verificati autentificarea admin.",
    },
  ];
}

function presenceCheck(
  label: string,
  envKey: string,
  secret = false,
  legacyKey?: string,
  optional = false,
): LeadFlowCheck {
  const isConfigured = Boolean(process.env[envKey] || (legacyKey && process.env[legacyKey]));

  return {
    label,
    status: isConfigured ? "configured" : optional ? "disabled" : "missing",
    detail: isConfigured
      ? secret
        ? "Configurat. Valoarea este ascunsa."
        : "Configurat."
      : optional
        ? "Optional pentru fluxul curent."
        : `Lipseste ${envKey}${legacyKey ? ` sau aliasul ${legacyKey}` : ""}.`,
  };
}
