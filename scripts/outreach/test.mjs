import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "../..");
const tmpRoot = path.join(projectRoot, ".tmp");
const testDataDir = path.join(tmpRoot, "outreach-test-data");
const testOutputDir = path.join(tmpRoot, "outreach-test-output");
await fs.rm(testDataDir, { recursive: true, force: true });
await fs.rm(testOutputDir, { recursive: true, force: true });
process.env.LEAD_RESEARCH_DATA_DIR = testDataDir;
process.env.LEAD_RESEARCH_OUTPUT_DIR = testOutputDir;

const { createSession, importCandidates, resetDb } = await import("../lead-research/core.mjs");
const { approveLeads, generateDrafts, getOutreachModel, updateOutreachStatus } = await import("./core.mjs");

await resetDb();
const session = await createSession({ query: "Synthetic outreach QA", city: "Bucuresti" });
const companyNames = [
  "Alpha Imaging",
  "Bravo Radiology",
  "Cobalt Diagnostic",
  "Delta Clinic",
  "Echo Scan",
  "Fjord Medical",
  "Gamma Center",
  "Helix Health",
  "Indigo RX",
  "Juno Imaging",
  "Kappa Clinic",
  "Lumen Diagnostic",
  "Metro Scan",
  "Nova Radiology",
  "Orion Medical",
  "Praxis RX",
  "Quartz Clinic",
  "Radian Center",
  "Sigma Imaging",
  "Terra Diagnostic",
  "Umbra Clinic",
  "Vector Medical",
  "Willow Scan",
  "Zenith Radiology",
];
const candidates = companyNames.map((companyName, index) => ({
  companyName: `${companyName} SRL`,
  category: index % 2 ? "centre-radiologie-rx" : "centre-ct-rmn",
  city: "Bucuresti",
  website: `https://synthetic-clinic-${index + 1}.invalid/`,
  contactPage: `https://synthetic-clinic-${index + 1}.invalid/contact`,
  publicEmail: `office@synthetic-clinic-${index + 1}.invalid`,
  publicPhone: `0700 000 ${String(index + 1).padStart(3, "0")}`,
  sourceUrls: [`https://synthetic-clinic-${index + 1}.invalid/contact`],
  outreachStatus: "Verified Public Contact",
}));
await importCandidates(candidates, { sessionId: session.sessionId, sourceLabel: "synthetic-outreach-test" });
const generated = await generateDrafts(20);
assert.equal(generated.generated.length, 20);
let model = await getOutreachModel();
assert.equal(model.drafted.length, 20);
assert.equal(model.manualSend.length, 0);
assert.ok(model.drafted.every((record) => record.draft.humanApprovalRequired));
assert.ok(model.drafted.every((record) => !/dr\\.|doctor|manager|administrator/i.test(record.draft.personalizedIntro)));
await approveLeads(model.drafted.slice(0, 3).map((record) => record.leadId));
model = await getOutreachModel();
assert.equal(model.manualSend.length, 3);
await updateOutreachStatus(model.manualSend[0].leadId, "sent_manual");
model = await getOutreachModel();
assert.equal(model.manualSend.length, 2);
assert.equal(model.records.filter((record) => record.status === "sent_manual").length, 1);
await fs.rm(testDataDir, { recursive: true, force: true });
await fs.rm(testOutputDir, { recursive: true, force: true });
console.log(JSON.stringify({ ok: true, generatedDrafts: 20, manualSendQueueAfterApproval: 3, automaticSending: false, productionDatabaseTouched: false }, null, 2));
