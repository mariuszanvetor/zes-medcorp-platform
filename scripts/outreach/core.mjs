import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { dataDir, domainFromUrl, loadDb } from "../lead-research/core.mjs";
import { categoryById } from "../lead-research/config.mjs";
import { APPROVAL_STATUSES, OPT_OUT, OUTREACH_COMPLIANCE, OUTREACH_STATUSES, OUTREACH_TEMPLATES, SIGNATURE } from "./config.mjs";

const outreachPath = path.join(dataDir, "outreach-state.json");
const now = () => new Date().toISOString();
const normalize = (value) => String(value ?? "").trim();
const unique = (values) => [...new Set(values.filter(Boolean))];

function emptyState() {
  return {
    version: 1,
    updatedAt: now(),
    records: [],
    drafts: [],
    events: [],
  };
}

async function readJson(file, fallback) {
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

export async function loadOutreachState() {
  const state = await readJson(outreachPath, emptyState());
  state.records ||= [];
  state.drafts ||= [];
  state.events ||= [];
  return state;
}

export async function saveOutreachState(state) {
  state.updatedAt = now();
  await writeJson(outreachPath, state);
}

function legacyApproval(lead) {
  return lead.outreachStatus === "Ready for Outreach" ? "approved_for_contact" : "not_reviewed";
}

function prioritySegment(score) {
  if (score >= 100) return "high_priority";
  if (score >= 75) return "medium_priority";
  return "low_priority";
}

function chooseTemplate(lead) {
  const haystack = `${lead.category} ${lead.subcategory || ""} ${lead.suggestedServiceAngle || ""} ${lead.notes || ""}`.toLowerCase();
  if (/cbct|dentar|stomatolog/.test(haystack)) return "cbct_dental";
  if (/rf shielding|camera rmn/.test(haystack) && !/ct/.test(haystack)) return "rf_shielding";
  if (lead.category === "centre-ct-rmn" || lead.category === "clinici-imagistica") return "ct_rmn_infrastructure";
  if (["service-aparatura", "laboratoare-ivd", "distribuitori-aparatura"].includes(lead.category)) return "service_maintenance";
  if (lead.category === "radioprotectie-plumbare" || /plumb|radioprotect/.test(haystack)) return "lead_shielding";
  if (lead.category === "centre-radiologie-rx" || /rx|radiolog|cncan/.test(haystack)) return "rx_authorization";
  return "medical_fitout";
}

function contractBand(templateId) {
  return {
    rx_authorization: "Potential intern orientativ: 5.000-35.000 EUR; nu reprezinta oferta.",
    ct_rmn_infrastructure: "Potential intern orientativ: 20.000-180.000 EUR; depinde de echipament si amplasament.",
    lead_shielding: "Potential intern orientativ: 5.000-45.000 EUR; necesita evaluarea camerei.",
    rf_shielding: "Potential intern orientativ: 25.000-140.000 EUR; necesita specificatia echipamentului.",
    service_maintenance: "Potential intern: de evaluat dupa echipament, simptom si acoperire.",
    cbct_dental: "Potential intern orientativ: 3.000-25.000 EUR; necesita plan si echipament.",
    medical_fitout: "Potential intern orientativ: 15.000-200.000 EUR; depinde de scop si etapizare.",
  }[templateId];
}

function segmentation(lead) {
  const templateId = chooseTemplate(lead);
  const template = OUTREACH_TEMPLATES[templateId];
  return {
    prioritySegment: prioritySegment(Number(lead.totalLeadScore || lead.leadScore || 0)),
    category: lead.category,
    city: lead.city || "",
    serviceFit: template.service,
    likelyNeed: template.value,
    estimatedContractValue: contractBand(templateId),
    nextBestAction: "Revizuieste sursa oficiala, verifica relevanta si aproba sau respinge contactarea.",
    templateId,
  };
}

function event(state, leadId, type, detail = "") {
  state.events.push({
    eventId: `OUTREACH-${randomUUID()}`,
    leadId,
    type,
    detail,
    recordedAt: now(),
  });
}

function inDnc(lead, db) {
  return db.dnc.some(
    (entry) =>
      (entry.leadId && entry.leadId === lead.leadId) ||
      (entry.publicEmail && entry.publicEmail.toLowerCase() === String(lead.publicEmail || "").toLowerCase()) ||
      (entry.companyName && entry.companyName.toLowerCase() === String(lead.companyName || "").toLowerCase()),
  );
}

function recordForLead(lead, existing) {
  const segment = segmentation(lead);
  return {
    leadId: lead.leadId,
    companyName: lead.companyName,
    domain: domainFromUrl(lead.website || lead.contactPage),
    publicEmail: lead.publicEmail || "",
    publicPhone: lead.publicPhone || "",
    website: lead.website || "",
    sourceUrls: lead.sourceUrls || [],
    leadScore: Number(lead.totalLeadScore || lead.leadScore || 0),
    status: existing?.status || "not_reviewed",
    approvalStatus: existing?.approvalStatus || legacyApproval(lead),
    ...segment,
    draftedAt: existing?.draftedAt || "",
    lastContactedAt: existing?.lastContactedAt || "",
    nextFollowUpAt: existing?.nextFollowUpAt || "",
    followUpCount: Number(existing?.followUpCount || 0),
    notes: existing?.notes || "",
    updatedAt: now(),
  };
}

export async function syncOutreachState() {
  const db = await loadDb();
  const state = await loadOutreachState();
  const recordsById = new Map(state.records.map((record) => [record.leadId, record]));
  state.records = db.leads.map((lead) => recordForLead(lead, recordsById.get(lead.leadId)));
  for (const record of state.records) {
    const lead = db.leads.find((entry) => entry.leadId === record.leadId);
    if (lead && inDnc(lead, db)) {
      record.status = "do_not_contact";
      record.approvalStatus = "not_reviewed";
    }
  }
  await saveOutreachState(state);
  return { db, state };
}

function safeDraftCandidates(db, state) {
  const seenDomains = new Set();
  return state.records
    .filter((record) => {
      const lead = db.leads.find((entry) => entry.leadId === record.leadId);
      if (!lead || inDnc(lead, db)) return false;
      if (!record.publicEmail || !record.website || !record.sourceUrls.length || !record.domain) return false;
      if (["sent_manual", "replied", "follow_up_due", "not_interested", "do_not_contact", "won", "lost"].includes(record.status)) {
        return false;
      }
      if (seenDomains.has(record.domain)) return false;
      seenDomains.add(record.domain);
      return true;
    })
    .sort((a, b) => {
      const priority = { high_priority: 3, medium_priority: 2, low_priority: 1 };
      const approved = { approved_for_contact: 1, not_reviewed: 0 };
      return (
        approved[b.approvalStatus] - approved[a.approvalStatus] ||
        priority[b.prioritySegment] - priority[a.prioritySegment] ||
        a.companyName.localeCompare(b.companyName)
      );
    });
}

function personalizedIntro(record) {
  const city = record.city ? ` din ${record.city}` : "";
  return `Va contactez din partea ZESCORP deoarece ${record.companyName}${city} apare intr-un context public relevant pentru ${record.serviceFit}. Nu presupunem existenta unui proiect activ; mesajul este relevant numai daca aveti o nevoie in evaluare.`;
}

export function createDraft(record) {
  const template = OUTREACH_TEMPLATES[record.templateId];
  const intro = personalizedIntro(record);
  const body = `Buna ziua,

${intro}

${template.value}

${template.cta}

Optional, puteti structura contextul initial cu ZES: https://zescorp.ro

${SIGNATURE}
${OPT_OUT}`;
  return {
    draftId: `DRAFT-${randomUUID()}`,
    leadId: record.leadId,
    companyName: record.companyName,
    domain: record.domain,
    publicEmail: record.publicEmail,
    city: record.city,
    templateId: record.templateId,
    subject: template.subject,
    personalizedIntro: intro,
    relevantService: template.service,
    valueProposition: template.value,
    softCta: template.cta,
    body,
    humanApprovalRequired: true,
    humanApproved: record.approvalStatus === "approved_for_contact",
    generatedAt: now(),
  };
}

export async function generateDrafts(limit = 20, { force = false } = {}) {
  const { db, state } = await syncOutreachState();
  const existingDrafts = new Map(state.drafts.map((draft) => [draft.leadId, draft]));
  const records = safeDraftCandidates(db, state).filter((record) => force || !existingDrafts.has(record.leadId)).slice(0, limit);
  const generated = [];
  for (const record of records) {
    const newDraft = createDraft(record);
    state.drafts = state.drafts.filter((draft) => draft.leadId !== record.leadId);
    state.drafts.push(newDraft);
    record.status = "drafted";
    record.draftedAt = newDraft.generatedAt;
    record.nextBestAction =
      record.approvalStatus === "approved_for_contact"
        ? "Revizuieste textul si trimite manual daca este relevant."
        : "Revizuieste sursa si aproba explicit contactarea inainte de orice trimitere.";
    generated.push(newDraft);
    event(state, record.leadId, "draft-generated", `template=${record.templateId}; approval=${record.approvalStatus}`);
  }
  await saveOutreachState(state);
  return { generated, state };
}

export async function approveLeads(leadIds) {
  const { state } = await syncOutreachState();
  const approved = [];
  for (const leadId of leadIds) {
    const record = state.records.find((entry) => entry.leadId === leadId);
    if (!record) throw new Error(`Lead not found: ${leadId}`);
    if (record.status === "do_not_contact") throw new Error(`Cannot approve Do Not Contact lead: ${leadId}`);
    record.approvalStatus = "approved_for_contact";
    if (record.status === "not_reviewed") record.status = "approved_for_contact";
    record.nextBestAction = "Genereaza sau revizuieste draftul; trimiterea ramane manuala.";
    approved.push(record);
    event(state, leadId, "approved-for-contact", "Manual approval recorded.");
  }
  await saveOutreachState(state);
  return approved;
}

export async function updateOutreachStatus(leadId, status, notes = "") {
  if (!OUTREACH_STATUSES.includes(status)) throw new Error(`Unsupported outreach status: ${status}`);
  const { state } = await syncOutreachState();
  const record = state.records.find((entry) => entry.leadId === leadId);
  if (!record) throw new Error(`Lead not found: ${leadId}`);
  record.status = status;
  if (notes) record.notes = unique([record.notes, notes]).join(" | ");
  if (status === "sent_manual") {
    record.lastContactedAt = now();
    record.nextFollowUpAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
  }
  if (status === "do_not_contact") record.approvalStatus = "not_reviewed";
  record.updatedAt = now();
  event(state, leadId, "status-updated", `${status}${notes ? `; ${notes}` : ""}`);
  await saveOutreachState(state);
  return record;
}

export function outreachModel(db, state) {
  const draftsByLead = new Map(state.drafts.map((draft) => [draft.leadId, draft]));
  const records = state.records.map((record) => ({ ...record, draft: draftsByLead.get(record.leadId) || null }));
  const approved = records.filter((record) => record.approvalStatus === "approved_for_contact" && record.status !== "do_not_contact");
  const drafted = records.filter((record) => record.draft);
  const manualSend = drafted.filter(
    (record) =>
      record.approvalStatus === "approved_for_contact" &&
      record.status === "drafted" &&
      !["sent_manual", "replied", "do_not_contact", "won", "lost"].includes(record.status),
  );
  const followUps = records.filter(
    (record) =>
      record.status === "follow_up_due" &&
      record.approvalStatus === "approved_for_contact" &&
      (!record.nextFollowUpAt || record.nextFollowUpAt <= now()) &&
      record.followUpCount < 2,
  );
  return {
    db,
    state,
    records: records.sort((a, b) => b.leadScore - a.leadScore || a.companyName.localeCompare(b.companyName)),
    reviewQueue: records.filter((record) => record.approvalStatus === "not_reviewed" && record.status !== "do_not_contact"),
    approved,
    drafted,
    manualSend,
    followUps,
    replied: records.filter((record) => record.status === "replied"),
    dnc: records.filter((record) => record.status === "do_not_contact"),
    wonLost: records.filter((record) => ["won", "lost"].includes(record.status)),
    templates: Object.entries(OUTREACH_TEMPLATES).map(([templateId, template]) => ({ templateId, ...template })),
    compliance: OUTREACH_COMPLIANCE,
  };
}

export async function getOutreachModel() {
  const { db, state } = await syncOutreachState();
  return outreachModel(db, state);
}

export { OUTREACH_STATUSES, APPROVAL_STATUSES };
