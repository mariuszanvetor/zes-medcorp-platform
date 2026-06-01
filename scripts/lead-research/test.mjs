import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "../..");
const tmpRoot = path.join(projectRoot, ".tmp");
const testDataDir = path.join(tmpRoot, "lead-research-test-data");
const testOutputDir = path.join(tmpRoot, "lead-research-test-output");

if (!testDataDir.startsWith(tmpRoot) || !testOutputDir.startsWith(tmpRoot)) {
  throw new Error("Refusing to run lead research tests outside the workspace .tmp directory.");
}

await fs.rm(testDataDir, { recursive: true, force: true });
await fs.rm(testOutputDir, { recursive: true, force: true });
process.env.LEAD_RESEARCH_DATA_DIR = testDataDir;
process.env.LEAD_RESEARCH_OUTPUT_DIR = testOutputDir;

const {
  buildDailyQueues,
  createSession,
  dedupePersistentDb,
  importCandidates,
  loadDb,
  resetDb,
} = await import("./core.mjs");

await resetDb();
const fixture = [
  {
    companyName: "Synthetic Clinic SRL",
    category: "centre-radiologie-rx",
    city: "Bucuresti",
    county: "Bucuresti",
    website: "https://synthetic-clinic.invalid/",
    contactPage: "https://synthetic-clinic.invalid/contact",
    publicEmail: "office@synthetic-clinic.invalid",
    publicPhone: "0700 000 001",
    sourceUrls: ["https://synthetic-clinic.invalid/contact"],
    fieldSources: { publicEmail: "https://synthetic-clinic.invalid/contact" },
    outreachStatus: "Ready for Outreach",
  },
];

const session1 = await createSession({ query: "synthetic clinic", city: "Bucuresti" });
const first = await importCandidates(fixture, { sessionId: session1.sessionId, sourceLabel: "test" });
assert.equal(first.added.length, 1);
assert.equal(first.duplicates.length, 0);

const session2 = await createSession({ query: "synthetic clinic tomorrow", city: "Bucuresti" });
const second = await importCandidates(fixture, { sessionId: session2.sessionId, sourceLabel: "test-repeat" });
assert.equal(second.added.length, 0);
assert.equal(second.duplicates.length, 1);

const db = await loadDb();
assert.equal(db.leads.length, 1);
assert.equal(db.sessions.length, 2);
assert.equal(db.sources.length, 2);
assert.equal(buildDailyQueues(db).dailyOutreach.length, 1);

const dedupe = await dedupePersistentDb();
assert.equal(dedupe.remaining, 1);
assert.equal(dedupe.merged, 0);

await fs.rm(testDataDir, { recursive: true, force: true });
await fs.rm(testOutputDir, { recursive: true, force: true });
console.log(
  JSON.stringify(
    {
      ok: true,
      testDuplicateSkipped: second.duplicates.length,
      isolatedDataDir: testDataDir,
      productionDatabaseTouched: false,
    },
    null,
    2,
  ),
);
