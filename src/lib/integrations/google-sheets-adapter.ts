import { createSign } from "node:crypto";

import type { LeadIntegrationMode } from "@/lib/integration-config";
import type { LeadPayload } from "@/lib/lead-types";
import type { LeadScoreResult } from "@/lib/lead-scoring";

const sheetsScope = "https://www.googleapis.com/auth/spreadsheets";
const tokenUrl = "https://oauth2.googleapis.com/token";
const defaultGoogleSheetsTimeoutMs = 10000;

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
  status: string;
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
  sheetsMode: "mock" | "real" | "config-error" | "provider-error";
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
    status: "Nou",
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
      sheetsMode: "config-error",
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
      sheetsMode: "real",
      requested: true,
      rowPrepared: true,
      appended: true,
      status: "append-success",
      message: "Google Sheets row appended successfully.",
    };
  } catch {
    return {
      ok: false,
      sheetsMode: "provider-error",
      requested: true,
      rowPrepared: true,
      appended: false,
      status: "append-error",
      message:
        "Google Sheets append failed safely. Provider details were not exposed.",
    };
  }
}

export function validateSheetsConfig(
  requested = false,
): GoogleSheetsConfigStatus {
  const missingEnv = [
    getEnvValue("GOOGLE_SHEETS_SPREADSHEET_ID", "GOOGLE_SHEETS_ID")
      ? ""
      : "GOOGLE_SHEETS_SPREADSHEET_ID",
    getEnvValue("GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_SERVICE_ACCOUNT_EMAIL")
      ? ""
      : "GOOGLE_SHEETS_CLIENT_EMAIL",
    getEnvValue("GOOGLE_SHEETS_PRIVATE_KEY", "GOOGLE_PRIVATE_KEY")
      ? ""
      : "GOOGLE_SHEETS_PRIVATE_KEY",
  ].filter(Boolean);
  const ok = requested && missingEnv.length === 0;
  const spreadsheetId = getEnvValue("GOOGLE_SHEETS_SPREADSHEET_ID", "GOOGLE_SHEETS_ID");

  return {
    ok,
    mode: ok ? "ready" : "mock",
    requested,
    missingEnv,
    spreadsheetId,
    tabName: process.env.GOOGLE_SHEETS_TAB_NAME || "Leads",
    message: requested
      ? missingEnv.length
        ? "Google Sheets configuration is incomplete. No external call will be made."
        : "Google Sheets configuration is present. Real append can run when integration mode requests it."
      : "Google Sheets logging is not requested in the current integration mode.",
  };
}

function getGooglePrivateKey() {
  const privateKey = getEnvValue("GOOGLE_SHEETS_PRIVATE_KEY", "GOOGLE_PRIVATE_KEY");

  if (!privateKey) {
    throw new Error("GOOGLE_SHEETS_PRIVATE_KEY is missing.");
  }

  return privateKey
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n")
    .trim();
}

async function getGoogleSheetsAccessToken() {
  const serviceAccountEmail = getEnvValue(
    "GOOGLE_SHEETS_CLIENT_EMAIL",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  );

  if (!serviceAccountEmail) {
    throw new Error("GOOGLE_SHEETS_CLIENT_EMAIL is missing.");
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

  const response = await fetchWithTimeout(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  }, "Google OAuth token request");

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
  const range = encodeURIComponent(`${quoteSheetName(tabName)}!A:N`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    spreadsheetId,
  )}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [googleSheetsRowToValues(row)],
    }),
  }, "Google Sheets append request");

  if (!response.ok) {
    throw new Error(`Sheets API append returned ${response.status}.`);
  }
}

function googleSheetsRowToValues(row: GoogleSheetsLeadRow) {
  return [
    row.timestamp,
    row.leadId,
    `${row.sourceTool} / ${row.sourcePage}`,
    row.projectType ?? row.inquiryType,
    row.priority,
    row.score,
    row.name,
    row.email,
    row.phone,
    row.company ?? "",
    row.message ?? "",
    row.recommendedServices,
    row.recommendedNextStep,
    row.status,
  ];
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  label: string,
) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    getGoogleSheetsTimeoutMs(),
  );

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    const isAbort =
      error instanceof Error &&
      (error.name === "AbortError" || error.message.includes("aborted"));

    throw new Error(
      isAbort ? `${label} timed out.` : `${label} failed safely.`,
    );
  } finally {
    clearTimeout(timeout);
  }
}

function getGoogleSheetsTimeoutMs() {
  const rawTimeout = Number(process.env.GOOGLE_SHEETS_REQUEST_TIMEOUT_MS);

  if (!Number.isFinite(rawTimeout) || rawTimeout <= 0) {
    return defaultGoogleSheetsTimeoutMs;
  }

  return Math.min(Math.max(Math.floor(rawTimeout), 3000), 20000);
}

function getEnvValue(primaryKey: string, legacyKey?: string) {
  return process.env[primaryKey] || (legacyKey ? process.env[legacyKey] : undefined);
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
