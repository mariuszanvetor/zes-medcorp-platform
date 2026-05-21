import { createHash } from "node:crypto";

import type { LeadPayload } from "@/lib/lead-types";

export type LeadSubmissionCooldownResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
};

const recentSubmissions = new Map<string, number>();
const defaultCooldownSeconds = 45;

export function checkLeadSubmissionCooldown(
  lead: LeadPayload,
): LeadSubmissionCooldownResult {
  const now = Date.now();
  const cooldownMs = getCooldownSeconds() * 1000;
  const key = createLeadCooldownKey(lead);
  const lastSubmission = recentSubmissions.get(key);

  purgeExpiredCooldowns(now, cooldownMs);

  if (lastSubmission && now - lastSubmission < cooldownMs) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((cooldownMs - (now - lastSubmission)) / 1000),
    };
  }

  recentSubmissions.set(key, now);

  return { allowed: true };
}

function createLeadCooldownKey(lead: LeadPayload) {
  const fingerprint = [
    lead.sourceTool,
    lead.sourcePage,
    lead.inquiryType,
    lead.projectType ?? "",
    lead.email.toLowerCase(),
    lead.phone,
  ]
    .map((value) => value.trim())
    .join("|");

  return createHash("sha256").update(fingerprint).digest("hex");
}

function getCooldownSeconds() {
  const rawValue = Number(process.env.LEAD_SUBMISSION_COOLDOWN_SECONDS);

  if (!Number.isFinite(rawValue) || rawValue <= 0) {
    return defaultCooldownSeconds;
  }

  return Math.min(Math.max(Math.floor(rawValue), 10), 300);
}

function purgeExpiredCooldowns(now: number, cooldownMs: number) {
  const retentionWindow = cooldownMs * 4;

  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > retentionWindow) {
      recentSubmissions.delete(key);
    }
  }
}
