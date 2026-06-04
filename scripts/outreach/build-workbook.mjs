import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import { getOutreachModel } from "./core.mjs";
import { projectRoot } from "../lead-research/core.mjs";

const outputDir = path.join(projectRoot, "outputs", "phase-83a");
const qaDir = path.join(outputDir, ".qa-workbook");
const workbookPath = path.join(outputDir, "ZESCORP-Outreach-Operating-System.xlsx");
const colors = {
  navy: "#102A43",
  blue: "#0057B8",
  paleBlue: "#EEF6FF",
  green: "#EAF8EF",
  yellow: "#FFF8D8",
  red: "#FDECEC",
  slate: "#475569",
  white: "#FFFFFF",
};

const sheets = [
  "Outreach Dashboard",
  "Approved Leads",
  "Drafted Emails",
  "Manual Send Queue",
  "Follow-up Queue",
  "Replied Leads",
  "Do Not Contact",
  "Won-Lost",
  "Templates",
];

function columnLetter(index) {
  let result = "";
  let current = index;
  while (current > 0) {
    result = String.fromCharCode(65 + ((current - 1) % 26)) + result;
    current = Math.floor((current - 1) / 26);
  }
  return result;
}

function title(sheet, heading, subtitle, endColumn = "H") {
  sheet.showGridLines = false;
  sheet.mergeCells(`A1:${endColumn}1`);
  sheet.mergeCells(`A2:${endColumn}2`);
  sheet.getRange("A1").values = [[heading]];
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A1:${endColumn}1`).format = {
    fill: colors.navy,
    font: { bold: true, color: colors.white, size: 16 },
    verticalAlignment: "center",
  };
  sheet.getRange(`A2:${endColumn}2`).format = {
    fill: colors.paleBlue,
    font: { italic: true, color: colors.slate, size: 10 },
    verticalAlignment: "center",
  };
  sheet.getRange("A1").format.rowHeight = 28;
  sheet.getRange("A2").format.rowHeight = 24;
}

function display(value) {
  if (Array.isArray(value)) return value.join(" | ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return value ?? "";
}

function tableSheet(workbook, { name, heading, subtitle, rows, headers, widths, tableName }) {
  const sheet = workbook.worksheets.getOrAdd(name);
  const normalized = rows.length ? rows : [{ Note: "No records yet." }];
  const columns = headers?.length ? headers : Object.keys(normalized[0]);
  const dataEnd = columnLetter(columns.length);
  const titleEnd = columnLetter(Math.max(columns.length, widths.length));
  title(sheet, heading, subtitle, titleEnd);
  sheet.getRange(`A5:${dataEnd}5`).values = [columns];
  sheet.getRange(`A6:${dataEnd}${normalized.length + 5}`).values = normalized.map((row) => columns.map((column) => display(row[column])));
  sheet.getRange(`A5:${dataEnd}5`).format = {
    fill: colors.blue,
    font: { bold: true, color: colors.white, size: 10 },
    wrapText: true,
  };
  sheet.getRange(`A6:${dataEnd}${normalized.length + 5}`).format = {
    font: { color: colors.navy, size: 9 },
    wrapText: true,
    verticalAlignment: "top",
  };
  widths.forEach((width, index) => {
    sheet.getRange(`${columnLetter(index + 1)}:${columnLetter(index + 1)}`).format.columnWidth = width;
  });
  sheet.tables.add(`A5:${dataEnd}${normalized.length + 5}`, true, tableName).style = "TableStyleMedium2";
  sheet.freezePanes.freezeRows(5);
}

function recordRows(records) {
  return records.map((record) => ({
    "Lead ID": record.leadId,
    Company: record.companyName,
    Priority: record.prioritySegment,
    Category: record.category,
    City: record.city,
    Email: record.publicEmail,
    Website: record.website,
    Status: record.status,
    Approval: record.approvalStatus,
    "Service Fit": record.serviceFit,
    "Likely Need": record.likelyNeed,
    "Estimated Contract Value": record.estimatedContractValue,
    "Next Best Action": record.nextBestAction,
    "Source URLs": record.sourceUrls,
  }));
}

function draftRows(records) {
  return records.map((record) => ({
    "Lead ID": record.leadId,
    Company: record.companyName,
    Priority: record.prioritySegment,
    Email: record.publicEmail,
    Approval: record.approvalStatus,
    Subject: record.draft.subject,
    "Personalized Intro": record.draft.personalizedIntro,
    "Relevant Service": record.draft.relevantService,
    "Value Proposition": record.draft.valueProposition,
    "Soft CTA": record.draft.softCta,
    "Email Body": record.draft.body,
    "Generated At": record.draft.generatedAt,
  }));
}

function addDashboard(workbook, model) {
  const sheet = workbook.worksheets.getOrAdd("Outreach Dashboard");
  title(sheet, "ZESCORP | Outreach Operating System", "Controlled drafting, explicit human approval and manual sending only.", "K");
  const cards = [
    ["A5", "Verified leads", model.records.length, colors.paleBlue],
    ["D5", "Pending review", model.reviewQueue.length, colors.yellow],
    ["G5", "Drafted emails", model.drafted.length, colors.paleBlue],
    ["J5", "Manual send queue", model.manualSend.length, colors.green],
    ["A9", "Approved leads", model.approved.length, colors.green],
    ["D9", "Follow-ups due", model.followUps.length, colors.yellow],
    ["G9", "Replied leads", model.replied.length, colors.paleBlue],
    ["J9", "Do Not Contact", model.dnc.length, colors.red],
  ];
  for (const [cell, label, value, fill] of cards) {
    const column = cell[0];
    const row = Number(cell.slice(1));
    const end = String.fromCharCode(column.charCodeAt(0) + 1);
    sheet.mergeCells(`${column}${row}:${end}${row}`);
    sheet.mergeCells(`${column}${row + 1}:${end}${row + 1}`);
    sheet.getRange(`${column}${row}`).values = [[label]];
    sheet.getRange(`${column}${row + 1}`).values = [[value]];
    sheet.getRange(`${column}${row}:${end}${row + 1}`).format = { fill, horizontalAlignment: "center" };
    sheet.getRange(`${column}${row}`).format.font = { bold: true, color: colors.slate, size: 10 };
    sheet.getRange(`${column}${row + 1}`).format.font = { bold: true, color: colors.navy, size: 18 };
  }
  sheet.mergeCells("A13:K13");
  sheet.getRange("A13").values = [["Safety gate: draft generation never sends email. Manual Send Queue includes only explicitly approved records."]];
  sheet.getRange("A13:K13").format = { fill: colors.yellow, font: { bold: true, color: colors.navy }, wrapText: true };
  const priorityCounts = ["high_priority", "medium_priority", "low_priority"].map((priority) => [
    priority,
    model.records.filter((record) => record.prioritySegment === priority).length,
  ]);
  sheet.getRange("A16:B16").values = [["Priority segment", "Lead count"]];
  sheet.getRange("A17:B19").values = priorityCounts;
  sheet.getRange("A16:B16").format = { fill: colors.blue, font: { bold: true, color: colors.white } };
  const chart = sheet.charts.add("bar", sheet.getRange("A16:B19"));
  chart.titleText = "Verified leads by priority";
  chart.hasLegend = false;
  chart.setPosition("D16", "K30");
  sheet.getRange("A22:B22").values = [["Operating step", "Rule"]];
  sheet.getRange("A23:B28").values = [
    ["1", "Run outreach:review and inspect official source URLs."],
    ["2", "Approve only relevant business contacts explicitly."],
    ["3", "Generate or review draft text."],
    ["4", "Send manually from office@zescorp.ro."],
    ["5", "Record sent_manual or follow_up_due status."],
    ["6", "Record opt-out immediately as do_not_contact."],
  ];
  sheet.getRange("A22:B22").format = { fill: colors.blue, font: { bold: true, color: colors.white } };
  sheet.getRange("A23:B28").format.wrapText = true;
  [26, 52, 3, 18, 18, 3, 18, 18, 3, 18, 18].forEach((width, index) => {
    sheet.getRange(`${columnLetter(index + 1)}:${columnLetter(index + 1)}`).format.columnWidth = width;
  });
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(qaDir, { recursive: true });
  const model = await getOutreachModel();
  const workbook = Workbook.create();
  sheets.forEach((name) => workbook.worksheets.add(name));
  addDashboard(workbook, model);
  tableSheet(workbook, {
    name: "Approved Leads",
    heading: "Approved Leads | explicit human approval",
    subtitle: "Approved records are eligible for manual drafting and review. Approval is not automatic sending.",
    rows: recordRows(model.approved),
    widths: [22, 30, 18, 24, 16, 30, 34, 18, 24, 46, 62, 48, 64, 72],
    tableName: "ApprovedLeadsTable",
  });
  tableSheet(workbook, {
    name: "Drafted Emails",
    heading: "Drafted Emails | review every message",
    subtitle: "Personalized from verified business fields only. No contact names or active projects are invented.",
    rows: draftRows(model.drafted),
    widths: [22, 30, 18, 30, 24, 48, 70, 58, 72, 64, 110, 24],
    tableName: "DraftedEmailsTable",
  });
  tableSheet(workbook, {
    name: "Manual Send Queue",
    heading: "Manual Send Queue | send one by one",
    subtitle: "Only approved draft records. Copy, review and send manually from office@zescorp.ro.",
    rows: draftRows(model.manualSend),
    widths: [22, 30, 18, 30, 24, 48, 70, 58, 72, 64, 110, 24],
    tableName: "ManualSendQueueTable",
  });
  tableSheet(workbook, {
    name: "Follow-up Queue",
    heading: "Follow-up Queue | limited cadence",
    subtitle: "Only previously contacted records explicitly marked follow_up_due. Stop after opt-out.",
    rows: recordRows(model.followUps),
    widths: [22, 30, 18, 24, 16, 30, 34, 18, 24, 46, 62, 48, 64, 72],
    tableName: "FollowUpQueueTable",
  });
  tableSheet(workbook, {
    name: "Replied Leads",
    heading: "Replied Leads | human follow-up",
    subtitle: "Replies require direct human review and a relevant next action.",
    rows: recordRows(model.replied),
    widths: [22, 30, 18, 24, 16, 30, 34, 18, 24, 46, 62, 48, 64, 72],
    tableName: "RepliedLeadsTable",
  });
  tableSheet(workbook, {
    name: "Do Not Contact",
    heading: "Do Not Contact | absolute exclusion",
    subtitle: "Do not draft, send or follow up. Preserve opt-out status.",
    rows: recordRows(model.dnc),
    widths: [22, 30, 18, 24, 16, 30, 34, 18, 24, 46, 62, 48, 64, 72],
    tableName: "OutreachDncTable",
  });
  tableSheet(workbook, {
    name: "Won-Lost",
    heading: "Won / Lost | outcome record",
    subtitle: "Use for manual pipeline review. This is not a CRM.",
    rows: recordRows(model.wonLost),
    widths: [22, 30, 18, 24, 16, 30, 34, 18, 24, 46, 62, 48, 64, 72],
    tableName: "WonLostTable",
  });
  tableSheet(workbook, {
    name: "Templates",
    heading: "Templates | calm, technical and non-spammy",
    subtitle: "Templates are starting points. Review relevance and wording before every manual send.",
    rows: model.templates.map((template) => ({
      Template: template.templateId,
      Subject: template.subject,
      Service: template.service,
      "Value Proposition": template.value,
      "Soft CTA": template.cta,
    })),
    widths: [26, 50, 66, 90, 76],
    tableName: "OutreachTemplatesTable",
  });

  workbook.worksheets.setActiveWorksheet("Outreach Dashboard");
  const exported = await SpreadsheetFile.exportXlsx(workbook);
  await exported.save(workbookPath);
  for (const sheetName of sheets) {
    const image = await workbook.render({ sheetName, autoCrop: "all", scale: 0.7 });
    await fs.writeFile(path.join(qaDir, `${sheetName.replaceAll(" ", "-").toLowerCase()}.png`), await image.bytes());
  }
  const errors = workbook.inspect({
    kind: "match",
    search_term: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { use_regex: true, max_results: 200 },
    summary: "outreach workbook formula error scan",
  });
  await fs.writeFile(
    path.join(outputDir, "workbook-validation.json"),
    `${JSON.stringify(
      {
        workbookPath,
        sheets,
        verifiedLeads: model.records.length,
        approvedLeads: model.approved.length,
        draftedEmails: model.drafted.length,
        manualSendQueue: model.manualSend.length,
        followUps: model.followUps.length,
        formulaErrors: errors.matches?.length || 0,
        automaticSending: false,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  console.log(JSON.stringify({ ok: true, workbookPath, sheets: sheets.length, draftedEmails: model.drafted.length, formulaErrors: errors.matches?.length || 0 }, null, 2));
}

await main();
process.exit(0);
