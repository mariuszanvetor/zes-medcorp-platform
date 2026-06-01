import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import { loadDb, outputDir, workbookModel } from "./core.mjs";

const qaDir = path.join(outputDir, ".qa-workbook");
const workbookPath = path.join(outputDir, "ZESCORP-Verified-Lead-Research-Assistant.xlsx");

const colors = {
  navy: "#0F172A",
  deepBlue: "#003B7A",
  blue: "#0057B8",
  cyan: "#21B7D8",
  paleBlue: "#EFF7FF",
  softBlue: "#F7FBFF",
  paleYellow: "#FFF8D8",
  paleGreen: "#EAF8EF",
  paleRed: "#FDECEC",
  paleOrange: "#FFF2DD",
  slate: "#475569",
  white: "#FFFFFF",
};

const sheets = [
  "Dashboard",
  "Verified Leads",
  "New Leads This Session",
  "Duplicates Skipped",
  "Research Sessions",
  "Discovery Audit",
  "Processed Domains",
  "Source Log",
  "Do Not Contact",
  "Rejected Leads",
  "Daily Outreach Queue",
  "Follow-up Queue",
  "Search Queries",
  "Scoring Rules",
  "Templates",
  "Compliance Notes",
];

function titleSheet(sheet, title, subtitle, endColumn = "H") {
  sheet.showGridLines = false;
  sheet.mergeCells(`A1:${endColumn}1`);
  sheet.mergeCells(`A2:${endColumn}2`);
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A1:${endColumn}1`).format = {
    fill: colors.deepBlue,
    font: { bold: true, color: colors.white, size: 16 },
    verticalAlignment: "center",
  };
  sheet.getRange(`A2:${endColumn}2`).format = {
    fill: colors.paleBlue,
    font: { italic: true, color: colors.slate, size: 10 },
    verticalAlignment: "center",
  };
  sheet.getRange("A1").format.rowHeight = 28;
  sheet.getRange("A2").format.rowHeight = 22;
}

function columnLetter(index) {
  let result = "";
  let current = index;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    current = Math.floor((current - 1) / 26);
  }
  return result;
}

function setWidths(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getRange(`${columnLetter(index + 1)}:${columnLetter(index + 1)}`).format.columnWidth = width;
  });
}

function styleHeaders(sheet, range) {
  sheet.getRange(range).format = {
    fill: colors.blue,
    font: { bold: true, color: colors.white, size: 10 },
    wrapText: true,
    verticalAlignment: "center",
  };
}

function styleBody(sheet, range) {
  sheet.getRange(range).format = {
    font: { color: colors.navy, size: 9 },
    wrapText: true,
    verticalAlignment: "top",
  };
}

function display(value) {
  if (Array.isArray(value)) return value.join(" | ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return value ?? "";
}

function makeTableSheet(workbook, {
  name,
  title,
  subtitle,
  rows,
  headers,
  widths,
  tableName,
  emptyMessage = "No records yet.",
}) {
  const sheet = workbook.worksheets.getOrAdd(name);
  const normalizedRows = rows.length ? rows : [{ Note: emptyMessage }];
  const columns = headers?.length ? headers : Object.keys(normalizedRows[0]);
  const endColumn = columnLetter(columns.length);
  titleSheet(sheet, title, subtitle, endColumn);
  sheet.getRange(`A5:${endColumn}5`).values = [columns];
  sheet.getRange(`A6:${endColumn}${normalizedRows.length + 5}`).values = normalizedRows.map((row) =>
    columns.map((column) => display(row[column])),
  );
  styleHeaders(sheet, `A5:${endColumn}5`);
  styleBody(sheet, `A6:${endColumn}${normalizedRows.length + 5}`);
  columns.forEach((column, index) => {
    if (/date|seen|checked at|created at|verified at/i.test(column)) {
      const letter = columnLetter(index + 1);
      sheet.getRange(`${letter}6:${letter}${normalizedRows.length + 5}`).format.numberFormat = "yyyy-mm-dd hh:mm";
    }
  });
  sheet.tables.add(`A5:${endColumn}${normalizedRows.length + 5}`, true, tableName).style = "TableStyleMedium2";
  sheet.freezePanes.freezeRows(5);
  setWidths(sheet, widths || columns.map(() => 22));
  return sheet;
}

function verifiedLeadRows(leads) {
  return leads.map((lead) => ({
    "Lead ID": lead.leadId,
    "Company Name": lead.companyName,
    "Normalized Name": lead.normalizedCompanyName,
    Category: lead.category,
    Subcategory: lead.subcategory,
    City: lead.city,
    County: lead.county,
    Country: lead.country,
    Website: lead.website,
    "Contact Page": lead.contactPage,
    "Public Email": lead.publicEmail,
    "Public Phone": lead.publicPhone,
    LinkedIn: lead.publicLinkedIn,
    "Source URLs": lead.sourceUrls,
    "Source Type": lead.sourceType,
    Confidence: lead.confidenceScore,
    Relevance: lead.relevanceScore,
    Contactability: lead.contactabilityScore,
    "Project Potential": lead.projectPotentialScore,
    "Partnership Potential": lead.partnershipPotentialScore,
    "Geographic Fit": lead.geographicFitScore,
    "Total Score": lead.totalLeadScore,
    Priority: lead.priority,
    "Service Angle": lead.suggestedServiceAngle,
    Status: lead.outreachStatus,
    "Date Discovered": lead.dateDiscovered,
    "Date Verified": lead.dateVerified,
    "Last Seen": lead.lastSeenAt,
    "Session ID": lead.researchSessionId,
    Notes: lead.notes,
  }));
}

function addDashboard(workbook, model) {
  const sheet = workbook.worksheets.getOrAdd("Dashboard");
  titleSheet(
    sheet,
    "ZESCORP | Verified Lead Research Assistant",
    "Persistent, source-backed and deduplicated public business research. Manual outreach only.",
    "K",
  );
  const latestSession = model.session;
  const cards = [
    ["A5", "Verified leads", model.db.leads.length, colors.paleBlue],
    ["D5", "Ready outreach", model.queues.dailyOutreach.length, colors.paleGreen],
    ["G5", "Research sessions", model.db.sessions.length, colors.paleBlue],
    ["J5", "Do Not Contact", model.db.dnc.length, colors.paleRed],
    ["A9", "New this session", model.newLeads.length, colors.paleGreen],
    ["D9", "Duplicates skipped", model.duplicates.length, colors.paleOrange],
    ["G9", "Rejected", model.db.rejected.length, colors.paleRed],
    ["J9", "Source log entries", model.db.sources.length, colors.paleBlue],
  ];
  for (const [cell, label, value, fill] of cards) {
    const column = cell[0];
    const row = Number(cell.slice(1));
    const end = String.fromCharCode(column.charCodeAt(0) + 1);
    sheet.mergeCells(`${column}${row}:${end}${row}`);
    sheet.mergeCells(`${column}${row + 1}:${end}${row + 1}`);
    sheet.getRange(`${column}${row}`).values = [[label]];
    sheet.getRange(`${column}${row + 1}`).values = [[value]];
    sheet.getRange(`${column}${row}:${end}${row + 1}`).format = {
      fill,
      horizontalAlignment: "center",
      verticalAlignment: "center",
    };
    sheet.getRange(`${column}${row}`).format.font = { bold: true, color: colors.slate, size: 10 };
    sheet.getRange(`${column}${row + 1}`).format.font = { bold: true, color: colors.deepBlue, size: 18 };
  }
  sheet.mergeCells("A13:K13");
  sheet.getRange("A13").values = [[
    "Outreach gate: only Ready for Outreach leads with official public source and public business contact appear in the daily queue.",
  ]];
  sheet.getRange("A13:K13").format = {
    fill: colors.paleYellow,
    font: { bold: true, color: colors.navy, size: 10 },
    wrapText: true,
  };

  const counts = Object.entries(
    model.db.leads.reduce((acc, lead) => {
      acc[lead.category] = (acc[lead.category] || 0) + 1;
      return acc;
    }, {}),
  ).map(([category, count]) => [category, count]);
  const chartRows = counts.length ? counts : [["No verified leads", 0]];
  sheet.getRange("A16:B16").values = [["Category", "Verified Leads"]];
  sheet.getRange(`A17:B${chartRows.length + 16}`).values = chartRows;
  styleHeaders(sheet, "A16:B16");
  styleBody(sheet, `A17:B${chartRows.length + 16}`);
  sheet.tables.add(`A16:B${chartRows.length + 16}`, true, "DashboardCategoryTable").style = "TableStyleMedium2";
  const chart = sheet.charts.add("bar", sheet.getRange(`A16:B${chartRows.length + 16}`));
  chart.titleText = "Verified leads by category";
  chart.hasLegend = false;
  chart.setPosition("D16", "K31");

  sheet.mergeCells("A28:B28");
  sheet.getRange("A28").values = [["Daily operating rule"]];
  sheet.getRange("A28:B28").format = { fill: colors.blue, font: { bold: true, color: colors.white } };
  sheet.getRange("A29:B34").values = [
    ["1", "Create a research session."],
    ["2", "Research official public sources manually."],
    ["3", "Import only source-backed business contacts."],
    ["4", "Run dedupe and inspect duplicate merges."],
    ["5", "Use the daily queue for manual personalization."],
    ["6", "Record opt-out immediately."],
  ];
  styleBody(sheet, "A29:B34");
  setWidths(sheet, [28, 48, 4, 18, 18, 4, 18, 18, 4, 18, 18]);
  return sheet;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(qaDir, { recursive: true });
  const model = workbookModel(await loadDb());
  const workbook = Workbook.create();
  sheets.forEach((name) => workbook.worksheets.add(name));

  addDashboard(workbook, model);
  makeTableSheet(workbook, {
    name: "Verified Leads",
    title: "Verified Leads | persistent source of truth",
    subtitle: "Real public business information only. Source URLs and dates preserve auditability.",
    rows: verifiedLeadRows(model.db.leads),
    widths: [18, 26, 24, 24, 32, 16, 16, 14, 26, 26, 26, 18, 24, 56, 18, 12, 12, 14, 14, 18, 14, 14, 14, 48, 22, 22, 22, 22, 22, 54],
    tableName: "VerifiedLeadsTable",
  });
  makeTableSheet(workbook, {
    name: "New Leads This Session",
    title: "New Leads This Session",
    subtitle: "Only leads added by the latest research session.",
    rows: verifiedLeadRows(model.newLeads),
    widths: [18, 26, 24, 24, 32, 16, 16, 14, 26, 26, 26, 18, 24, 56, 18, 12, 12, 14, 14, 18, 14, 14, 14, 48, 22, 22, 22, 22, 22, 54],
    tableName: "NewLeadsTable",
  });
  makeTableSheet(workbook, {
    name: "Duplicates Skipped",
    title: "Duplicates Skipped | latest session",
    subtitle: "Duplicates are merged into the existing record and logged instead of appended.",
    rows: model.duplicates.map((entry) => ({
      "Source Log ID": entry.sourceLogId,
      "Lead ID": entry.leadId,
      "Session ID": entry.sessionId,
      Event: entry.event,
      Reason: entry.duplicateReason,
      "Source URLs": entry.sourceUrls,
      "Checked At": entry.checkedAt,
    })),
    widths: [18, 24, 30, 24, 18, 64, 24],
    tableName: "DuplicatesTable",
  });
  makeTableSheet(workbook, {
    name: "Research Sessions",
    title: "Research Sessions | persistent memory",
    subtitle: "Each run records the query, sources checked, new leads, duplicates and rejected candidates.",
    rows: model.db.sessions,
    widths: [28, 24, 38, 24, 16, 16, 72, 14, 14, 16, 14, 58, 58, 58, 56],
    tableName: "ResearchSessionsTable",
  });
  makeTableSheet(workbook, {
    name: "Discovery Audit",
    title: "Discovery Audit | every autonomous candidate",
    subtitle: "Every candidate seen by the autonomous engine is logged, including skips, inspection errors and official-site inspections.",
    rows: model.db.discoveryAudit,
    widths: [22, 30, 24, 42, 28, 28, 26, 64, 24],
    tableName: "DiscoveryAuditTable",
  });
  makeTableSheet(workbook, {
    name: "Processed Domains",
    title: "Processed Domains | persistent skip memory",
    subtitle: "Previously processed domains are skipped by future autonomous sessions and never crawled again unless manually removed.",
    rows: model.db.processedDomains,
    widths: [32, 24, 24, 20, 24, 22, 16, 72],
    tableName: "ProcessedDomainsTable",
  });
  makeTableSheet(workbook, {
    name: "Source Log",
    title: "Source Log | audit trail",
    subtitle: "Every verified add and duplicate merge records the public source URLs checked.",
    rows: model.db.sources,
    widths: [16, 22, 28, 24, 24, 72, 24],
    tableName: "SourceLogTable",
  });
  makeTableSheet(workbook, {
    name: "Do Not Contact",
    title: "Do Not Contact | absolute exclusion",
    subtitle: "Opt-out entries are excluded from every outreach queue.",
    rows: model.db.dnc,
    widths: [16, 22, 26, 26, 18, 52, 24],
    tableName: "DoNotContactTable",
  });
  makeTableSheet(workbook, {
    name: "Rejected Leads",
    title: "Rejected Leads | manual review record",
    subtitle: "Candidates without traceable public business data or matching Do Not Contact remain outside verified leads.",
    rows: model.db.rejected,
    widths: [18, 26, 24, 24, 30, 64, 22],
    tableName: "RejectedLeadsTable",
  });
  makeTableSheet(workbook, {
    name: "Daily Outreach Queue",
    title: "Daily Outreach Queue | manual personalization only",
    subtitle: "Only verified, source-backed and Ready for Outreach leads. No automatic sending.",
    rows: model.queues.dailyOutreach,
    widths: [20, 26, 28, 16, 14, 14, 26, 18, 26, 60, 46, 42, 92, 72, 58],
    tableName: "DailyOutreachTable",
  });
  makeTableSheet(workbook, {
    name: "Follow-up Queue",
    title: "Follow-up Queue | limited cadence",
    subtitle: "Follow-up requires prior manual contact and must stop immediately after opt-out.",
    rows: model.queues.followUps,
    widths: [18, 26, 26, 24, 16, 16, 30, 54],
    tableName: "FollowUpQueueTable",
  });
  makeTableSheet(workbook, {
    name: "Search Queries",
    title: "Search Queries | manual public research",
    subtitle: "Use queries as a starting point. Verify the official company website before import.",
    rows: model.categories.flatMap((category) =>
      category.queries.map((query) => ({
        Category: category.label,
        Query: query,
        "Inclusion Criteria": category.inclusion,
        "Exclusion Criteria": category.exclusion,
        "Suggested Service": category.service,
      })),
    ),
    widths: [32, 52, 72, 72, 72],
    tableName: "SearchQueriesTable",
  });
  makeTableSheet(workbook, {
    name: "Scoring Rules",
    title: "Scoring Rules | ranking, not permission",
    subtitle: "A high score prioritizes manual research. It never authorizes automatic outreach.",
    rows: model.scoringRules.map(([Group, Rule, Range]) => ({ Group, Rule, Range })),
    widths: [28, 88, 18],
    tableName: "ScoringRulesTable",
  });
  makeTableSheet(workbook, {
    name: "Templates",
    title: "Templates | personalize before manual sending",
    subtitle: "Short, professional category templates. ZES is optional support, not the primary claim.",
    rows: model.templates.map((template) => ({
      ID: template.id,
      Label: template.label,
      Subject: template.subject,
      Email: template.emailBody,
      LinkedIn: template.linkedIn,
      "Follow-up 1": template.followUp1,
      "Follow-up 2": template.followUp2,
      CTA: template.cta,
    })),
    widths: [24, 28, 44, 100, 72, 72, 72, 34],
    tableName: "TemplatesTable",
  });
  makeTableSheet(workbook, {
    name: "Compliance Notes",
    title: "Compliance Notes | safe semi-automated workflow",
    subtitle: "The assistant researches, organizes and scores. A human reviews and sends each relevant message manually.",
    rows: model.complianceNotes.map(([Safeguard, Requirement]) => ({ Safeguard, Requirement })),
    widths: [30, 110],
    tableName: "ComplianceNotesTable",
  });

  workbook.worksheets.setActiveWorksheet("Dashboard");
  const exported = await SpreadsheetFile.exportXlsx(workbook);
  await exported.save(workbookPath);

  for (const sheetName of sheets) {
    const image = await workbook.render({ sheetName, autoCrop: "all", scale: 0.75 });
    await fs.writeFile(path.join(qaDir, `${sheetName.replaceAll(" ", "-").toLowerCase()}.png`), await image.bytes());
  }
  const errors = workbook.inspect({
    kind: "match",
    search_term: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { use_regex: true, max_results: 200 },
    summary: "formula error scan",
  });
  await fs.writeFile(
    path.join(outputDir, "workbook-validation.json"),
    `${JSON.stringify(
      {
        workbookPath,
        sheets,
        verifiedLeads: model.db.leads.length,
        readyForOutreach: model.queues.dailyOutreach.length,
        sessions: model.db.sessions.length,
        sourceLogEntries: model.db.sources.length,
        formulaErrors: errors.matches?.length || 0,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  console.log(JSON.stringify({ ok: true, workbookPath, sheets: sheets.length, formulaErrors: errors.matches?.length || 0 }, null, 2));
}

await main();
process.exit(0);
