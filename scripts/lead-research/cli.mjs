import fs from "node:fs/promises";
import path from "node:path";
import {
  addDoNotContact,
  buildDailyQueues,
  createSession,
  dedupePersistentDb,
  importCandidates,
  initDb,
  loadDb,
  markStatus,
  outputDir,
  projectRoot,
  resetDb,
  writeCsv,
} from "./core.mjs";
import { categories } from "./config.mjs";

const [, , command = "report", ...args] = process.argv;
const flag = (name, fallback = "") => {
  const prefix = `--${name}=`;
  const inline = args.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] || fallback : fallback;
};

async function readInput(file) {
  const fullPath = path.resolve(projectRoot, file);
  if (file.endsWith(".json")) return JSON.parse(await fs.readFile(fullPath, "utf8"));
  throw new Error("Use a JSON import file. CSV imports can be normalized manually into the documented JSON shape.");
}

async function writeResearchTemplate(session) {
  const category = categories.find((entry) => entry.id === session.category);
  const queryRows = (category ? category.queries : categories.flatMap((entry) => entry.queries)).map((query) => ({
    sessionId: session.sessionId,
    category: category?.id || "",
    city: session.city || "",
    query: query.replaceAll("{city}", session.city || "[city]"),
    sourceUrl: "",
    companyName: "",
    note: "Manual research only. Verify official public business source before import.",
  }));
  await writeCsv(path.join(outputDir, `${session.sessionId}-manual-research-template.csv`), queryRows);
}

await initDb();

if (command === "research") {
  const session = await createSession({
    query: flag("query"),
    category: flag("category"),
    city: flag("city"),
    region: flag("region"),
    notes: "Manual public web research session. No automatic scraping or sending.",
  });
  await writeResearchTemplate(session);
  console.log(JSON.stringify({ ok: true, mode: "manual-research", session }, null, 2));
} else if (command === "import") {
  const file = flag("file");
  if (!file) throw new Error("Missing --file path");
  const sessionId = flag("session") || (await createSession({ notes: `Manual import: ${file}` })).sessionId;
  const result = await importCandidates(await readInput(file), { sessionId, sourceLabel: file });
  console.log(JSON.stringify({ ok: true, ...result }, null, 2));
} else if (command === "daily") {
  const db = await loadDb();
  const queues = buildDailyQueues(db);
  await writeCsv(path.join(outputDir, "daily-outreach-queue.csv"), queues.dailyOutreach);
  await writeCsv(path.join(outputDir, "follow-up-queue.csv"), queues.followUps);
  console.log(JSON.stringify({ ok: true, outreach: queues.dailyOutreach.length, followUps: queues.followUps.length }, null, 2));
} else if (command === "dedupe") {
  console.log(JSON.stringify({ ok: true, ...(await dedupePersistentDb()) }, null, 2));
} else if (command === "status") {
  const lead = await markStatus(flag("lead-id"), flag("status"), flag("notes"));
  console.log(JSON.stringify({ ok: true, lead }, null, 2));
} else if (command === "dnc") {
  const entry = await addDoNotContact({
    leadId: flag("lead-id"),
    companyName: flag("company"),
    publicEmail: flag("email"),
    publicPhone: flag("phone"),
    reason: flag("reason"),
  });
  console.log(JSON.stringify({ ok: true, entry }, null, 2));
} else if (command === "reset") {
  if (flag("confirm") !== "yes") throw new Error("Reset requires --confirm=yes");
  await resetDb();
  console.log(JSON.stringify({ ok: true, reset: true }, null, 2));
} else if (command === "report") {
  const db = await loadDb();
  const queues = buildDailyQueues(db);
  console.log(
    JSON.stringify(
      {
        ok: true,
        verifiedLeads: db.leads.length,
        readyForOutreach: queues.dailyOutreach.length,
        doNotContact: db.dnc.length,
        rejectedLeads: db.rejected.length,
        researchSessions: db.sessions.length,
        sourceLogEntries: db.sources.length,
        priority: Object.fromEntries(
          Object.entries(Object.groupBy(db.leads, (lead) => lead.priority)).map(([priority, leads]) => [
            priority,
            leads.length,
          ]),
        ),
      },
      null,
      2,
    ),
  );
} else {
  throw new Error(`Unknown command: ${command}`);
}
