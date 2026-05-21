import { createSign } from "node:crypto";

import type { LeadIntegrationMode } from "@/lib/integration-config";
import type { LeadPayload } from "@/lib/lead-types";
import type { LeadScoreResult } from "@/lib/lead-scoring";

const sheetsScope = "https://www.googleapis.com/auth/spreadsheets";
const tokenUrl = "https://oauth2.googleapis.com/token";

export type GoogleSheetsLeadRow = {
  timestamp: string;
  leadId: string;
  sourceTool: string;
  sourcePage: string;
  inquiryType: string;
  projectType?: string;
  company?: string;
  name: string;
  email: string;
  phone: string;
  urgency?: string;
  score: number;
  priority: string;
  estimatedBudgetRange?: string;
  complexity?: string;
  riskLevel?: string;
  recommendedNextStep: string;
  recommendedServices: string;
  message?: string;
};

export type GoogleSheetsConfigStatus = {
  ok: boolean;
  mode: "mock" | "ready";
  requested: boolean;
  missingEnv: string[];
  spreadsheetId?: string;
  tabName: string;
  message: string;
};

export type GoogleSheetsAppendResult = {
  ok: boolean;
  sheetsMode: "mock" | "live";
  requested: boolean;
  rowPrepared: boolean;
  appended: boolean;
  status:
    | "mock"
    | "not-requested"
    | "configuration-error"
    | "append-success"
    | "append-error";
  message: string;
};

export type BuildGoogleSheetsLeadRowInput = {
  lead: LeadPayload;
  scoring: LeadScoreResult;
  leadId: string;
  recommendedServices?: string[];
};

type GoogleTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

export function buildGoogleSheetsLeadRow({
  lead,
  scoring,
  leadId,
  recommendedServices = [],
}: BuildGoogleSheetsLeadRowInput): GoogleSheetsLeadRow {
  return {
    timestamp: lead.timestamp || new Date().toISOString(),
    leadId,
    sourceTool: lead.sourceTool,
    sourcePage: lead.sourcePage,
    inquiryType: lead.inquiryType,
    projectType: lead.projectType,
    company: lead.company,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    urgency: lead.urgency,
    score: scoring.score,
    priority: scoring.priority,
    estimatedBudgetRange: lead.generatedBudgetRange,
    complexity: lead.generatedComplexity,
    riskLevel: lead.generatedRiskLevel,
    recommendedNextStep: scoring.nextAction,
    recommendedServices: recommendedServices.join(", "),
    message: lead.message,
  };
}

export async function appendLeadToGoogleSheets(
  row: GoogleSheetsLeadRow,
  integrationMode: LeadIntegrationMode = "mock",
): Promise<GoogleSheetsAppendResult> {
  const sheetsRequested =
    integrationMode === "sheets-only" || integrationMode === "email-and-sheets";

  if (!sheetsRequested) {
    return {
      ok: true,
      sheetsMode: "mock",
      requested: false,
      rowPrepared: true,
      appended: false,
      status: "not-requested",
      message:
        "Google Sheets row prepared only. Integration mode does not request Sheets logging.",
    };
  }

  const config = validateSheetsConfig(true);

  if (!config.ok || !config.spreadsheetId) {
    return {
      ok: false,
      sheetsMode: "mock",
      requested: true,
      rowPrepared: true,
      appended: false,
      status: "configuration-error",
      message:
        "Google Sheets logging was requested, but configuration is incomplete. No external call was made.",
    };
  }

  try {
    const accessToken = await getGoogleSheetsAccessToken();
    await appendRowWithSheetsApi({
      accessToken,
      row,
      spreadsheetId: config.spreadsheetId,
      tabName: config.tabName,
    });

    return {
      ok: true,
      sheetsMode: "live",
      requested: true,
      rowPrepared: true,
      appended: true,
      status: "append-success",
      message: "Google Sheets row appended successfully.",
    };
  } catch (error) {
    return {
      ok: false,
      sheetsMode: "live",
      requested: true,
      rowPrepared: true,
      appended: false,
      status: "append-error",
      message:
        error instanceof Error
          ? `Google Sheets append failed safely: ${error.message}`
          : "Google Sheets append failed safely.",
    };
  }
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
  const ok = requested && missingEnv.length === 0;

  return {
    ok,
    mode: ok ? "ready" : "mock",
    requested,
    missingEnv,
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    tabName: process.env.GOOGLE_SHEETS_TAB_NAME || "Leads",
    message: requested
      ? missingEnv.length
        ? "Google Sheets configuration is incomplete. No external call will be made."
        : "Google Sheets configuration is present. Real append can run when integration mode requests it."
      : "Google Sheets logging is not requested in the current integration mode.",
  };
}

function getGooglePrivateKey() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("GOOGLE_PRIVATE_KEY is missing.");
  }

  return privateKey.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

async function getGoogleSheetsAccessToken() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!serviceAccountEmail) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL is missing.");
  }

  const now = Math.floor(Date.now() / 1000);
  const jwtHeader = base64UrlEncode(
    JSON.stringify({
      alg: "RS256",
      typ: "JWT",
    }),
  );
  const jwtClaim = base64UrlEncode(
    JSON.stringify({
      iss: serviceAccountEmail,
      scope: sheetsScope,
      aud: tokenUrl,
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsignedJwt = `${jwtHeader}.${jwtClaim}`;
  const signature = createSign("RSA-SHA256")
    .update(unsignedJwt)
    .sign(getGooglePrivateKey());
  const assertion = `${unsignedJwt}.${base64UrlEncode(signature)}`;

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const body = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !body.access_token) {
    throw new Error(body.error_description || body.error || "Google OAuth token request failed.");
  }

  return body.access_token;
}

async function appendRowWithSheetsApi({
  accessToken,
  row,
  spreadsheetId,
  tabName,
}: {
  accessToken: string;
  row: GoogleSheetsLeadRow;
  spreadsheetId: string;
  tabName: string;
}) {
  const range = encodeURIComponent(`${quoteSheetName(tabName)}!A:R`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    spreadsheetId,
  )}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [googleSheetsRowToValues(row)],
    }),
  });

  if (!response.ok) {
    throw new Error(`Sheets API append returned ${response.status}.`);
  }
}

function googleSheetsRowToValues(row: GoogleSheetsLeadRow) {
  return [
    row.timestamp,
    row.leadId,
    row.sourceTool,
    row.sourcePage,
    row.inquiryType,
    row.projectType ?? "",
    row.company ?? "",
    row.name,
    row.email,
    row.phone,
    row.urgency ?? "",
    row.score,
    row.priority,
    row.estimatedBudgetRange ?? "",
    row.complexity ?? "",
    row.riskLevel ?? "",
    row.recommendedNextStep,
    row.message ?? "",
  ];
}

function quoteSheetName(tabName: string) {
  const escaped = tabName.replace(/'/g, "''");
  return `'${escaped}'`;
}

function base64UrlEncode(value: string | Buffer) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);

  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
