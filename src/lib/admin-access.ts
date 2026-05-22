import { createHmac, createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

export const ADMIN_ACCESS_COOKIE = "zes_admin_access";

const tokenVersion = "v1";
const tokenPurpose = "zes-admin-access";
const defaultSessionSeconds = 8 * 60 * 60;

export type AdminAccessMode = "demo-open" | "protected";

export type AdminAccessStatus = {
  enabled: boolean;
  mode: AdminAccessMode;
  passwordConfigured: boolean;
  sessionMaxAgeSeconds: number;
};

export function getAdminAccessStatus(): AdminAccessStatus {
  const enabled = process.env.ADMIN_ACCESS_ENABLED === "true";

  return {
    enabled,
    mode: enabled ? "protected" : "demo-open",
    passwordConfigured: Boolean(process.env.ADMIN_ACCESS_PASSWORD),
    sessionMaxAgeSeconds: getSessionMaxAgeSeconds(),
  };
}

export function verifyAdminPassword(password: string) {
  const status = getAdminAccessStatus();

  if (!status.enabled) {
    return true;
  }

  const configuredPassword = process.env.ADMIN_ACCESS_PASSWORD;

  if (!configuredPassword || !password) {
    return false;
  }

  return safeEqual(hashValue(password), hashValue(configuredPassword));
}

export function createAdminAccessToken(now = Date.now()) {
  const issuedAt = Math.floor(now / 1000);
  const payload = `${tokenVersion}.${issuedAt}`;
  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

export function verifyAdminAccessToken(token?: string) {
  const status = getAdminAccessStatus();

  if (!status.enabled) {
    return true;
  }

  if (!status.passwordConfigured || !token) {
    return false;
  }

  const [version, issuedAtRaw, signature] = token.split(".");

  if (version !== tokenVersion || !issuedAtRaw || !signature) {
    return false;
  }

  const issuedAt = Number.parseInt(issuedAtRaw, 10);

  if (!Number.isFinite(issuedAt)) {
    return false;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);

  if (issuedAt > nowSeconds + 60) {
    return false;
  }

  if (nowSeconds - issuedAt > status.sessionMaxAgeSeconds) {
    return false;
  }

  const expectedSignature = signPayload(`${version}.${issuedAtRaw}`);

  return safeEqual(signature, expectedSignature);
}

export async function hasValidAdminAccessCookie() {
  const status = getAdminAccessStatus();

  if (!status.enabled) {
    return true;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;

  return verifyAdminAccessToken(token);
}

export async function canRenderAdminContent() {
  const status = getAdminAccessStatus();

  if (!status.enabled) {
    return true;
  }

  return hasValidAdminAccessCookie();
}

function getSessionMaxAgeSeconds() {
  const parsed = Number.parseInt(process.env.ADMIN_ACCESS_TTL_SECONDS || "", 10);

  if (Number.isFinite(parsed) && parsed >= 300 && parsed <= 24 * 60 * 60) {
    return parsed;
  }

  return defaultSessionSeconds;
}

function signPayload(payload: string) {
  const password = process.env.ADMIN_ACCESS_PASSWORD || "";
  const secret = `${tokenPurpose}:${password}`;

  return createHmac("sha256", secret).update(payload).digest("hex");
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}
