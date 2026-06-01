import "./load-env.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { categories, categoryById, complianceNotes, scoringRules, templateForCategory } from "./config.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(scriptDir, "../..");
export const dataDir = process.env.LEAD_RESEARCH_DATA_DIR
  ? path.resolve(process.env.LEAD_RESEARCH_DATA_DIR)
  : path.join(projectRoot, "data", "lead-research");
export const outputDir = process.env.LEAD_RESEARCH_OUTPUT_DIR
  ? path.resolve(process.env.LEAD_RESEARCH_OUTPUT_DIR)
  : path.join(projectRoot, "outputs", "phase-81a");

const paths = {
  leads: path.join(dataDir, "verified-leads.json"),
  sessions: path.join(dataDir, "research-sessions.json"),
  dnc: path.join(dataDir, "do-not-contact.json"),
  rejected: path.join(dataDir, "rejected-leads.json"),
  sources: path.join(dataDir, "source-log.json"),
  processedDomains: path.join(dataDir, "processed-domains.json"),
  discoveryAudit: path.join(dataDir, "discovery-audit.json"),
};

const emptyDb = {
  leads: [],
  sessions: [],
  dnc: [],
  rejected: [],
  sources: [],
  processedDomains: [],
  discoveryAudit: [],
};

const now = () => new Date().toISOString();
const normalizeSpace = (value) => String(value ?? "").trim().replace(/\s+/g, " ");
export const normalizeCompanyName = (value) =>
  normalizeSpace(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(s\.?c\.?|s\.?r\.?l\.?|s\.?a\.?|romania|group|medical|med)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
const normalizeEmail = (value) => normalizeSpace(value).toLowerCase();
const normalizePhone = (value) => String(value ?? "").replace(/\D+/g, "");

export function domainFromUrl(value) {
  if (!value) return "";
  try {
    return new URL(value.startsWith("http") ? value : `https://${value}`).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function unique(values) {
  return [...new Set(values.filter(Boolean).map(normalizeSpace))];
}

function slug(value) {
  return normalizeCompanyName(value).replace(/\s+/g, "-").slice(0, 42) || "lead";
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[b.length];
}

export function nameSimilarity(a, b) {
  const left = normalizeCompanyName(a);
  const right = normalizeCompanyName(b);
  if (!left || !right) return 0;
  return 1 - levenshtein(left, right) / Math.max(left.length, right.length);
}

async function readJson(file, fallback = []) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function initDb() {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
  for (const [key, file] of Object.entries(paths)) {
    try {
      await fs.access(file);
    } catch {
      await writeJson(file, emptyDb[key]);
    }
  }
}

export async function loadDb() {
  await initDb();
  return {
    leads: await readJson(paths.leads),
    sessions: await readJson(paths.sessions),
    dnc: await readJson(paths.dnc),
    rejected: await readJson(paths.rejected),
    sources: await readJson(paths.sources),
    processedDomains: await readJson(paths.processedDomains),
    discoveryAudit: await readJson(paths.discoveryAudit),
  };
}

export async function saveDb(db) {
  await Promise.all([
    writeJson(paths.leads, db.leads),
    writeJson(paths.sessions, db.sessions),
    writeJson(paths.dnc, db.dnc),
    writeJson(paths.rejected, db.rejected),
    writeJson(paths.sources, db.sources),
    writeJson(paths.processedDomains, db.processedDomains),
    writeJson(paths.discoveryAudit, db.discoveryAudit),
  ]);
}

function inDnc(candidate, db) {
  const email = normalizeEmail(candidate.publicEmail);
  const phone = normalizePhone(candidate.publicPhone);
  const name = normalizeCompanyName(candidate.companyName);
  return db.dnc.some(
    (entry) =>
      (email && normalizeEmail(entry.publicEmail) === email) ||
      (phone && normalizePhone(entry.publicPhone) === phone) ||
      (name && normalizeCompanyName(entry.companyName) === name),
  );
}

export function findDuplicate(candidate, leads) {
  const normalized = normalizeCompanyName(candidate.companyName);
  const domain = domainFromUrl(candidate.website || candidate.contactPage);
  const phone = normalizePhone(candidate.publicPhone);
  const email = normalizeEmail(candidate.publicEmail);
  const city = normalizeSpace(candidate.city).toLowerCase();

  for (const lead of leads) {
    const leadDomain = domainFromUrl(lead.website || lead.contactPage);
    const leadPhone = normalizePhone(lead.publicPhone);
    const leadEmail = normalizeEmail(lead.publicEmail);
    const leadName = lead.normalizedCompanyName || normalizeCompanyName(lead.companyName);
    const sameCity = city && normalizeSpace(lead.city).toLowerCase() === city;
    const similarity = nameSimilarity(normalized, leadName);

    if (domain && leadDomain && domain === leadDomain) return { lead, reason: "domain" };
    if (email && leadEmail && email === leadEmail) return { lead, reason: "publicEmail" };
    if (phone && leadPhone && phone === leadPhone) return { lead, reason: "publicPhone" };
    if (normalized && leadName && normalized === leadName) return { lead, reason: "normalizedCompanyName" };
    if (sameCity && similarity >= 0.88) return { lead, reason: `fuzzyName:${similarity.toFixed(2)}` };
  }
  return null;
}

function geographicFit(lead) {
  const location = `${lead.city || ""} ${lead.county || ""}`.toLowerCase();
  if (/bucuresti|ilfov|arges/.test(location)) return 12;
  if (/cluj|iasi|timis|brasov|constanta|dolj|bihor|sibiu|prahova|mures/.test(location)) return 8;
  return 4;
}

function contactability(lead) {
  return Math.min(
    35,
    (lead.website ? 5 : 0) +
      (lead.contactPage ? 5 : 0) +
      (lead.publicEmail ? 12 : 0) +
      (lead.publicPhone ? 8 : 0) +
      (lead.sourceUrls?.length ? 5 : 0),
  );
}

export function scoreLead(raw) {
  const category = categoryById(raw.category);
  const relevanceScore = Math.min(35, Number(raw.relevanceScore ?? category.baseRelevance));
  const contactabilityScore = contactability(raw);
  const projectPotentialScore = Math.min(30, Number(raw.projectPotentialScore ?? category.baseProjectPotential));
  const partnershipPotentialScore = Math.min(
    30,
    Number(raw.partnershipPotentialScore ?? category.basePartnershipPotential),
  );
  const geographicFitScore = geographicFit(raw);
  const totalLeadScore =
    relevanceScore +
    contactabilityScore +
    projectPotentialScore +
    partnershipPotentialScore +
    geographicFitScore;
  const priority = totalLeadScore >= 80 ? "High" : totalLeadScore >= 55 ? "Medium" : "Low";

  return {
    ...raw,
    relevanceScore,
    contactabilityScore,
    projectPotentialScore,
    partnershipPotentialScore,
    geographicFitScore,
    totalLeadScore,
    leadScore: totalLeadScore,
    priority,
  };
}

function safeOutreachStatus(candidate) {
  const requested = candidate.outreachStatus || "Verified Public Contact";
  const hasTraceability = Boolean(candidate.website && candidate.sourceUrls?.length);
  const hasPublicContact = Boolean(candidate.publicEmail || candidate.publicPhone);
  if (!hasTraceability || !hasPublicContact) return "Needs Manual Verification";
  const allowed = new Set([
    "Research Candidate",
    "Needs Manual Verification",
    "Verified Public Contact",
    "Ready for Outreach",
    "Contacted",
    "Follow-up Due",
    "Replied",
    "Qualified Lead",
    "Not Relevant",
    "Do Not Contact",
  ]);
  return allowed.has(requested) ? requested : "Verified Public Contact";
}

function mergeLead(existing, candidate, sessionId) {
  const merged = {
    ...existing,
    website: existing.website || candidate.website || "",
    contactPage: existing.contactPage || candidate.contactPage || "",
    publicEmail: existing.publicEmail || candidate.publicEmail || "",
    publicPhone: existing.publicPhone || candidate.publicPhone || "",
    publicLinkedIn: existing.publicLinkedIn || candidate.publicLinkedIn || "",
    sourceUrls: unique([...(existing.sourceUrls || []), ...(candidate.sourceUrls || [])]),
    sourceType: unique([existing.sourceType, candidate.sourceType]).join(", "),
    fieldSources: { ...(existing.fieldSources || {}), ...(candidate.fieldSources || {}) },
    lastSeenAt: now(),
    dateVerified: candidate.dateVerified || existing.dateVerified,
    researchSessionId: sessionId || existing.researchSessionId,
    notes: unique([existing.notes, candidate.notes]).join(" | "),
  };
  merged.outreachStatus = safeOutreachStatus({ ...merged, outreachStatus: existing.outreachStatus });
  return scoreLead(merged);
}

export async function createSession({ query = "", category = "", city = "", region = "", notes = "" } = {}) {
  const db = await loadDb();
  const timestamp = now();
  const session = {
    sessionId: `SESSION-${timestamp.replace(/\D/g, "")}-${randomUUID().slice(0, 8)}`,
    date: timestamp,
    query,
    category,
    city,
    region,
    sourceUrlsChecked: [],
    leadsFound: 0,
    newLeadsAdded: 0,
    duplicatesSkipped: 0,
    rejectedLeads: 0,
    newLeadIds: [],
    duplicateLeadIds: [],
    rejectedLeadIds: [],
    notes,
  };
  db.sessions.push(session);
  await saveDb(db);
  return session;
}

function validateCandidate(candidate) {
  const issues = [];
  if (!candidate.companyName) issues.push("companyName missing");
  if (!candidate.category) issues.push("category missing");
  if (!candidate.website) issues.push("website missing");
  if (!candidate.sourceUrls?.length) issues.push("sourceUrls missing");
  if (!candidate.publicEmail && !candidate.publicPhone && !candidate.contactPage) {
    issues.push("public business contact missing");
  }
  return issues;
}

export async function importCandidates(candidates, { sessionId, sourceLabel = "manual-public-research" } = {}) {
  const db = await loadDb();
  const session =
    db.sessions.find((entry) => entry.sessionId === sessionId) ||
    (await createSession({ notes: `Automatic session for ${sourceLabel}` }));
  if (!db.sessions.some((entry) => entry.sessionId === session.sessionId)) {
    db.sessions.push(session);
  }
  const result = { sessionId: session.sessionId, added: [], duplicates: [], rejected: [] };

  for (const input of candidates) {
    const timestamp = now();
    const candidate = scoreLead({
      leadId: input.leadId || `LEAD-${slug(input.companyName)}-${timestamp.replace(/\D/g, "").slice(0, 14)}`,
      companyName: normalizeSpace(input.companyName),
      normalizedCompanyName: normalizeCompanyName(input.companyName),
      category: input.category,
      subcategory: input.subcategory || "",
      city: normalizeSpace(input.city),
      county: normalizeSpace(input.county),
      country: input.country || "Romania",
      website: normalizeSpace(input.website),
      contactPage: normalizeSpace(input.contactPage),
      publicEmail: normalizeEmail(input.publicEmail),
      publicPhone: normalizeSpace(input.publicPhone),
      publicLinkedIn: normalizeSpace(input.publicLinkedIn),
      sourceUrls: unique(input.sourceUrls || [input.sourceUrl]),
      sourceType: input.sourceType || "Official website",
      fieldSources: input.fieldSources || {},
      confidenceScore: Number(input.confidenceScore || 90),
      suggestedServiceAngle: input.suggestedServiceAngle || categoryById(input.category).service,
      outreachStatus: input.outreachStatus || "Verified Public Contact",
      dateDiscovered: input.dateDiscovered || timestamp,
      dateVerified: input.dateVerified || timestamp,
      lastSeenAt: timestamp,
      researchSessionId: session.sessionId,
      notes: input.notes || "",
    });
    candidate.outreachStatus = safeOutreachStatus(candidate);

    const issues = validateCandidate(candidate);
    if (issues.length || inDnc(candidate, db)) {
      const rejected = {
        ...candidate,
        rejectionReason: issues.length ? issues.join("; ") : "Matched Do Not Contact",
        rejectedAt: timestamp,
      };
      db.rejected.push(rejected);
      session.rejectedLeads += 1;
      session.rejectedLeadIds.push(candidate.leadId);
      result.rejected.push(rejected);
      continue;
    }

    const duplicate = findDuplicate(candidate, db.leads);
    if (duplicate) {
      const index = db.leads.findIndex((lead) => lead.leadId === duplicate.lead.leadId);
      db.leads[index] = mergeLead(db.leads[index], candidate, session.sessionId);
      session.duplicatesSkipped += 1;
      session.duplicateLeadIds.push(duplicate.lead.leadId);
      result.duplicates.push({ leadId: duplicate.lead.leadId, reason: duplicate.reason });
      db.sources.push({
        sourceLogId: `SOURCE-${db.sources.length + 1}`,
        leadId: duplicate.lead.leadId,
        sessionId: session.sessionId,
        event: "duplicate-merged",
        duplicateReason: duplicate.reason,
        sourceUrls: candidate.sourceUrls,
        checkedAt: timestamp,
      });
      continue;
    }

    db.leads.push(candidate);
    session.newLeadsAdded += 1;
    session.newLeadIds.push(candidate.leadId);
    result.added.push(candidate);
    db.sources.push({
      sourceLogId: `SOURCE-${db.sources.length + 1}`,
      leadId: candidate.leadId,
      sessionId: session.sessionId,
      event: "verified-lead-added",
      sourceUrls: candidate.sourceUrls,
      checkedAt: timestamp,
    });
  }

  session.leadsFound += candidates.length;
  session.sourceUrlsChecked = unique([
    ...(session.sourceUrlsChecked || []),
    ...candidates.flatMap((candidate) => candidate.sourceUrls || [candidate.sourceUrl]),
  ]);
  await saveDb(db);
  return result;
}

export function readyForOutreach(lead, db) {
  return (
    lead.outreachStatus === "Ready for Outreach" &&
    Boolean(lead.website && lead.sourceUrls?.length && (lead.publicEmail || lead.publicPhone)) &&
    !inDnc(lead, db)
  );
}

export function buildDailyQueues(db) {
  const dailyOutreach = db.leads
    .filter((lead) => readyForOutreach(lead, db))
    .sort((a, b) => b.totalLeadScore - a.totalLeadScore)
    .slice(0, 30)
    .map((lead) => {
      const template = templateForCategory(lead.category);
      return {
        leadId: lead.leadId,
        companyName: lead.companyName,
        category: categoryById(lead.category).label,
        city: lead.city,
        priority: lead.priority,
        totalLeadScore: lead.totalLeadScore,
        publicEmail: lead.publicEmail,
        publicPhone: lead.publicPhone,
        website: lead.website,
        sourceUrls: lead.sourceUrls.join(" | "),
        suggestedServiceAngle: lead.suggestedServiceAngle,
        suggestedEmailSubject: template.subject,
        suggestedEmailBody: template.emailBody,
        suggestedLinkedInMessage: template.linkedIn,
        nextAction: "Review source, personalize and send one relevant message manually.",
      };
    });
  const followUps = db.leads
    .filter((lead) => lead.outreachStatus === "Follow-up Due" && !inDnc(lead, db))
    .sort((a, b) => String(a.nextFollowUpDate || "").localeCompare(String(b.nextFollowUpDate || "")))
    .slice(0, 10);
  return { dailyOutreach, followUps };
}

export async function markStatus(leadId, outreachStatus, notes = "") {
  const db = await loadDb();
  const lead = db.leads.find((entry) => entry.leadId === leadId);
  if (!lead) throw new Error(`Lead not found: ${leadId}`);
  lead.outreachStatus = safeOutreachStatus({ ...lead, outreachStatus });
  if (notes) lead.notes = unique([lead.notes, notes]).join(" | ");
  lead.lastSeenAt = now();
  await saveDb(db);
  return lead;
}

export async function addDoNotContact({ leadId = "", companyName = "", publicEmail = "", publicPhone = "", reason = "" }) {
  const db = await loadDb();
  const lead = db.leads.find((entry) => entry.leadId === leadId);
  const entry = {
    dncId: `DNC-${String(db.dnc.length + 1).padStart(4, "0")}`,
    leadId: lead?.leadId || leadId,
    companyName: lead?.companyName || companyName,
    publicEmail: lead?.publicEmail || publicEmail,
    publicPhone: lead?.publicPhone || publicPhone,
    reason: reason || "Manual opt-out",
    createdAt: now(),
  };
  db.dnc.push(entry);
  if (lead) lead.outreachStatus = "Do Not Contact";
  await saveDb(db);
  return entry;
}

export async function dedupePersistentDb() {
  const db = await loadDb();
  const deduped = [];
  let merged = 0;
  for (const lead of db.leads) {
    const duplicate = findDuplicate(lead, deduped);
    if (!duplicate) {
      deduped.push(lead);
      continue;
    }
    const index = deduped.findIndex((entry) => entry.leadId === duplicate.lead.leadId);
    deduped[index] = mergeLead(deduped[index], lead, lead.researchSessionId);
    db.sources.push({
      sourceLogId: `SOURCE-${db.sources.length + 1}`,
      leadId: duplicate.lead.leadId,
      sessionId: lead.researchSessionId,
      event: "dedupe-command-merged",
      duplicateReason: duplicate.reason,
      sourceUrls: lead.sourceUrls || [],
      checkedAt: now(),
    });
    merged += 1;
  }
  db.leads = deduped;
  await saveDb(db);
  return { merged, remaining: db.leads.length };
}

export function latestSession(db) {
  return db.sessions.at(-1) || null;
}

export function workbookModel(db) {
  const session = latestSession(db);
  const queues = buildDailyQueues(db);
  return {
    db,
    session,
    queues,
    categories,
    scoringRules,
    complianceNotes,
    templates: Object.values(
      categories.reduce((acc, category) => {
        acc[category.templateGroup] = { id: category.templateGroup, ...templateForCategory(category.id) };
        return acc;
      }, {}),
    ),
    newLeads: session ? db.leads.filter((lead) => session.newLeadIds.includes(lead.leadId)) : [],
    duplicates: db.sources.filter((entry) => entry.event.includes("duplicate") || entry.event.includes("dedupe")),
  };
}

export async function resetDb() {
  await fs.mkdir(dataDir, { recursive: true });
  await saveDb(structuredClone(emptyDb));
}

export async function writeCsv(filePath, rows) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  if (!rows.length) {
    await fs.writeFile(filePath, "", "utf8");
    return;
  }
  const headers = Object.keys(rows[0]);
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [headers, ...rows.map((row) => headers.map((header) => row[header] ?? ""))]
    .map((row) => row.map(escape).join(","))
    .join("\r\n");
  await fs.writeFile(filePath, csv, "utf8");
}
