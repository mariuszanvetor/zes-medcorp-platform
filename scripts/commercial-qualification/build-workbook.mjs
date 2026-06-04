import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import {
  COMPLIANCE_NOTE,
  QUALIFICATION_OUTPUT_DIR,
  QUALIFICATION_WORKBOOK,
} from "./config.mjs";
import { buildQualificationReport } from "./core.mjs";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, QUALIFICATION_OUTPUT_DIR);
const qaDir = path.join(outputDir, ".qa-workbook");
const workbookPath = path.join(outputDir, QUALIFICATION_WORKBOOK);
const colors = {
  navy: "#102A43",
  blue: "#0069B4",
  cyan: "#DDF4FA",
  paleBlue: "#EEF6FF",
  green: "#EAF8EF",
  yellow: "#FFF8D8",
  red: "#FDECEC",
  gray: "#F4F7FA",
  slate: "#475569",
  white: "#FFFFFF",
};

const sheets = [
  "Executive Dashboard",
  "Top 25 Opportunities",
  "Top 50 Opportunities",
  "Qualified Prospects",
  "Competitors",
  "Distributors",
  "Manufacturers",
  "Do Not Contact",
  "Follow-up Candidates",
  "Personalized Outreach",
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

function display(value) {
  if (Array.isArray(value)) return value.join(" | ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return value ?? "";
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
    wrapText: true,
  };
  sheet.getRange("A1").format.rowHeight = 28;
  sheet.getRange("A2").format.rowHeight = 28;
}

function tableSheet(workbook, { name, heading, subtitle, rows, headers, widths, tableName }) {
  const sheet = workbook.worksheets.getOrAdd(name);
  const normalized = rows.length ? rows : [{ Note: "No records in this segment." }];
  const columns = headers?.length ? headers : Object.keys(normalized[0]);
  const dataEnd = columnLetter(columns.length);
  const titleEnd = columnLetter(Math.max(columns.length, widths.length));
  title(sheet, heading, subtitle, titleEnd);
  sheet.getRange(`A5:${dataEnd}5`).values = [columns];
  sheet.getRange(`A6:${dataEnd}${normalized.length + 5}`).values = normalized.map((row) =>
    columns.map((column) => display(row[column])),
  );
  sheet.getRange(`A5:${dataEnd}5`).format = {
    fill: colors.blue,
    font: { bold: true, color: colors.white, size: 10 },
    wrapText: true,
    verticalAlignment: "center",
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

function prospectRows(records) {
  return records.map((record) => ({
    Rank: record.outreachRank || "",
    "Send First": record.sendFirst ? "YES" : "",
    Company: record.companyName,
    Classification: record.classification,
    "Commercial Score": record.opportunityScore,
    Priority: record.outreachPriority,
    Category: record.category,
    City: record.city,
    Email: record.publicEmail,
    Phone: record.publicPhone,
    Website: record.website,
    "Recommended Service": record.recommendedService,
    "Likely Need": record.likelyNeed,
    "Estimated Opportunity": record.estimatedOpportunity.label,
    "Model Midpoint EUR": record.estimatedOpportunity.midpoint,
    "Recommended Style": record.recommendedStyle,
    "Next Best Action": record.nextBestAction,
    Evidence: record.evidence,
    "Source URLs": record.sourceUrls,
  }));
}

function excludedRows(records) {
  return records.map((record) => ({
    Company: record.companyName,
    Classification: record.classification,
    Reason: record.classificationReason,
    Category: record.category,
    City: record.city,
    Email: record.publicEmail,
    Phone: record.publicPhone,
    Website: record.website,
    Evidence: record.evidence,
    "Source URLs": record.sourceUrls,
  }));
}

function outreachRows(records) {
  return records.map((record) => ({
    Rank: record.outreachRank,
    "Send First": record.sendFirst ? "YES" : "",
    Company: record.companyName,
    Priority: record.outreachPriority,
    "Commercial Score": record.opportunityScore,
    Email: record.publicEmail,
    "Recommended Style": record.recommendedStyle,
    "Recommended Service": record.recommendedService,
    "Estimated Opportunity": record.estimatedOpportunity.label,
    "Recommended Subject": record.personalizedSubject,
    "Personalized Intro": record.personalizedIntro,
    "Recommended Email Body": record.personalizedEmailBody,
    "Style A Subject": record.drafts.executive.subject,
    "Style A Intro": record.drafts.executive.intro,
    "Style B Subject": record.drafts.technical.subject,
    "Style B Intro": record.drafts.technical.intro,
    "Style C Subject": record.drafts.operations.subject,
    "Style C Intro": record.drafts.operations.intro,
    "Next Best Action": record.nextBestAction,
    "Source URLs": record.sourceUrls,
  }));
}

function addKpiCard(sheet, start, label, value, fill) {
  const column = start[0];
  const row = Number(start.slice(1));
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
  sheet.getRange(`${column}${row + 1}`).format.font = { bold: true, color: colors.navy, size: 18 };
}

function addDashboard(workbook, model) {
  const sheet = workbook.worksheets.getOrAdd("Executive Dashboard");
  title(
    sheet,
    "ZESCORP | Commercial Qualification Engine",
    "Revenue-oriented qualification from verified public business leads. Human review and manual sending remain mandatory.",
    "L",
  );
  const { summary } = model;
  [
    ["A5", "Leads analyzed", summary.totalLeadsAnalyzed, colors.paleBlue],
    ["D5", "Qualified prospects", summary.qualifiedProspects, colors.green],
    ["G5", "Ideal Clients", summary.idealClients, colors.cyan],
    ["J5", "Send First", summary.sendFirstCount, colors.green],
    ["A9", "Good Prospects", summary.goodProspects, colors.paleBlue],
    ["D9", "Competitors excluded", summary.excludedCompetitors, colors.red],
    ["G9", "Distributors excluded", summary.excludedDistributors, colors.yellow],
    ["J9", "Pipeline midpoint EUR", summary.estimatedPipelineValue, colors.cyan],
  ].forEach(([start, label, value, fill]) => addKpiCard(sheet, start, label, value, fill));

  sheet.mergeCells("A13:L13");
  sheet.getRange("A13").values = [[COMPLIANCE_NOTE]];
  sheet.getRange("A13:L13").format = {
    fill: colors.yellow,
    font: { bold: true, color: colors.navy, size: 10 },
    wrapText: true,
    verticalAlignment: "center",
  };
  sheet.getRange("A13").format.rowHeight = 32;

  const classifications = [
    ["Ideal Client", summary.idealClients],
    ["Good Prospect", summary.goodProspects],
    ["Low Fit Prospect", summary.lowFitSeparated],
    ["Competitor", summary.excludedCompetitors],
    ["Distributor", summary.excludedDistributors],
    ["Manufacturer", summary.excludedManufacturers],
    ["Service Provider", summary.serviceProvidersSeparated],
    ["Do Not Contact", summary.excludedDoNotContact],
  ];
  sheet.getRange("A16:B16").values = [["Classification", "Lead count"]];
  sheet.getRange("A17:B24").values = classifications;
  sheet.getRange("A16:B16").format = { fill: colors.blue, font: { bold: true, color: colors.white } };
  const chart = sheet.charts.add("bar", sheet.getRange("A16:B24"));
  chart.titleText = "Lead classification";
  chart.hasLegend = false;
  chart.setPosition("D16", "L31");

  sheet.getRange("A27:B27").values = [["Outreach order", "Rule"]];
  sheet.getRange("A28:B33").values = [
    ["1", "Start with Top 25 Opportunities and review official source URLs."],
    ["2", "Choose the recommended style: executive, technical or operations."],
    ["3", "Edit the generated draft to match the verified public context."],
    ["4", "Send manually from office@zescorp.ro only after human approval."],
    ["5", "Record replies and follow-up dates in the operating workbook."],
    ["6", "Stop immediately for opt-out or do-not-contact requests."],
  ];
  sheet.getRange("A27:B27").format = { fill: colors.blue, font: { bold: true, color: colors.white } };
  sheet.getRange("A28:B33").format = { wrapText: true, font: { color: colors.navy, size: 9 } };

  sheet.mergeCells("A36:L36");
  sheet.getRange("A36").values = [["Top commercial opportunities | model midpoint values, not offers"]];
  sheet.getRange("A36:L36").format = { fill: colors.navy, font: { bold: true, color: colors.white } };
  sheet.getRange("A37:E37").values = [["Rank", "Company", "Score", "Recommended Service", "Midpoint EUR"]];
  sheet.getRange("A38:E42").values = model.top25.slice(0, 5).map((record) => [
    record.outreachRank,
    record.companyName,
    record.opportunityScore,
    record.recommendedService,
    record.estimatedOpportunity.midpoint,
  ]);
  sheet.getRange("A37:E37").format = { fill: colors.blue, font: { bold: true, color: colors.white } };
  sheet.getRange("A38:E42").format = { wrapText: true, font: { color: colors.navy, size: 9 } };

  [26, 56, 4, 24, 20, 4, 24, 20, 4, 24, 24, 4].forEach((width, index) => {
    sheet.getRange(`${columnLetter(index + 1)}:${columnLetter(index + 1)}`).format.columnWidth = width;
  });
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(qaDir, { recursive: true });
  const model = buildQualificationReport(projectRoot);
  const workbook = Workbook.create();
  sheets.forEach((name) => workbook.worksheets.add(name));
  addDashboard(workbook, model);

  const prospectWidths = [8, 12, 30, 18, 16, 16, 22, 16, 30, 20, 34, 58, 66, 24, 18, 30, 72, 72, 84];
  tableSheet(workbook, {
    name: "Top 25 Opportunities",
    heading: "Top 25 Opportunities | Send First",
    subtitle: "The most commercially promising verified prospects. Review the source context, then send a relevant manual message.",
    rows: prospectRows(model.top25),
    widths: prospectWidths,
    tableName: "Top25OpportunitiesTable",
  });
  tableSheet(workbook, {
    name: "Top 50 Opportunities",
    heading: "Top 50 Opportunities | revenue-oriented ranking",
    subtitle: "Commercial ranking is a prioritization model, not proof of an active procurement project.",
    rows: prospectRows(model.top50),
    widths: prospectWidths,
    tableName: "Top50OpportunitiesTable",
  });
  tableSheet(workbook, {
    name: "Qualified Prospects",
    heading: "Qualified Prospects | Ideal Clients and Good Prospects",
    subtitle: "Competitors, distributors, manufacturers, service providers, low-fit profiles and DNC records are excluded from direct outreach.",
    rows: prospectRows(model.personalizedOutreach),
    widths: prospectWidths,
    tableName: "QualifiedProspectsTable",
  });
  tableSheet(workbook, {
    name: "Competitors",
    heading: "Competitors | excluded from direct outreach",
    subtitle: "Review only for market awareness. Do not include in customer outreach.",
    rows: excludedRows(model.groups.competitors),
    widths: [30, 18, 60, 24, 16, 30, 20, 34, 72, 84],
    tableName: "CompetitorsTable",
  });
  tableSheet(workbook, {
    name: "Distributors",
    heading: "Distributors | excluded from customer outreach",
    subtitle: "Potential partnership context can be reviewed separately by a human.",
    rows: excludedRows(model.groups.distributors),
    widths: [30, 18, 60, 24, 16, 30, 20, 34, 72, 84],
    tableName: "DistributorsTable",
  });
  tableSheet(workbook, {
    name: "Manufacturers",
    heading: "Manufacturers | excluded from customer outreach",
    subtitle: "Potential partnership context can be reviewed separately by a human.",
    rows: excludedRows(model.groups.manufacturers),
    widths: [30, 18, 60, 24, 16, 30, 20, 34, 72, 84],
    tableName: "ManufacturersTable",
  });
  tableSheet(workbook, {
    name: "Do Not Contact",
    heading: "Do Not Contact | absolute exclusion",
    subtitle: "No drafting, sending or follow-up. Preserve opt-out state.",
    rows: excludedRows(model.groups.doNotContact),
    widths: [30, 18, 60, 24, 16, 30, 20, 34, 72, 84],
    tableName: "QualificationDncTable",
  });
  tableSheet(workbook, {
    name: "Follow-up Candidates",
    heading: "Follow-up Candidates | manual review only",
    subtitle: "Only qualified leads already marked sent_manual or follow_up_due in the existing outreach state.",
    rows: prospectRows(model.followUpCandidates),
    widths: prospectWidths,
    tableName: "FollowUpCandidatesTable",
  });
  tableSheet(workbook, {
    name: "Personalized Outreach",
    heading: "Personalized Outreach | three human-reviewed message styles",
    subtitle: "No contact names or active projects are invented. Select a style, inspect sources, edit and send manually.",
    rows: outreachRows(model.personalizedOutreach),
    widths: [8, 12, 30, 16, 16, 30, 30, 58, 24, 58, 72, 118, 58, 72, 58, 72, 58, 72, 72, 84],
    tableName: "PersonalizedOutreachTable",
  });

  workbook.worksheets.setActiveWorksheet("Executive Dashboard");
  const exported = await SpreadsheetFile.exportXlsx(workbook);
  await exported.save(workbookPath);
  const qaRanges = {
    "Executive Dashboard": "A1:L42",
    "Top 25 Opportunities": "A1:S15",
    "Top 50 Opportunities": "A1:S15",
    "Qualified Prospects": "A1:S15",
    Competitors: "A1:J15",
    Distributors: "A1:J15",
    Manufacturers: "A1:J15",
    "Do Not Contact": "A1:J15",
    "Follow-up Candidates": "A1:S15",
    "Personalized Outreach": "A1:T10",
  };
  for (const sheetName of sheets) {
    const image = await workbook.render({ sheetName, range: qaRanges[sheetName], scale: 0.45 });
    await fs.writeFile(
      path.join(qaDir, `${sheetName.replaceAll(" ", "-").toLowerCase()}.png`),
      await image.bytes(),
    );
  }
  const errors = workbook.inspect({
    kind: "match",
    search_term: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { use_regex: true, max_results: 200 },
    summary: "commercial qualification workbook formula error scan",
  });
  const validation = {
    workbookPath,
    generatedAt: model.generatedAt,
    sheets,
    summary: model.summary,
    formulaErrors: errors.matches?.length || 0,
    automaticSending: false,
    productionLeadDataModified: false,
    complianceNote: COMPLIANCE_NOTE,
  };
  await fs.writeFile(
    path.join(outputDir, "qualification-report.json"),
    `${JSON.stringify(validation, null, 2)}\n`,
    "utf8",
  );
  console.log(JSON.stringify({ ok: true, ...validation }, null, 2));
}

await main();
process.exit(0);
