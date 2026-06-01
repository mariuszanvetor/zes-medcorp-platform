import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import { buildProspectingModel, categories, writeCsvOutputs } from "./prospecting-engine.mjs";

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), "..");
const outputDir = path.resolve(projectRoot, "outputs/phase-80a");
const qaDir = path.resolve(projectRoot, ".qa-prospecting-workbook");

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

const leadHeaders = [
  "Lead ID",
  "Company Name",
  "Category",
  "City",
  "Website",
  "Public Email",
  "Public Phone",
  "Contact Page",
  "Source URL",
  "Contact Verification",
  "Priority Score",
  "Reason for Priority",
  "Suggested Service Angle",
  "Suggested Email Subject",
  "Suggested Email Body",
  "Follow-up 1",
  "Follow-up 2",
  "Status",
  "Last Contacted Date",
  "Next Action",
  "Opt-out / Do Not Contact",
  "Owner",
  "Notes",
  "Search Query",
  "LinkedIn Company/Profile URL",
  "Last Verified Date",
  "Ready for Manual Outreach",
];

function toWorkbookLead(lead) {
  return {
    "Lead ID": lead.leadId,
    "Company Name": lead.companyName,
    Category: lead.category,
    City: lead.city,
    Website: lead.website,
    "Public Email": lead.publicEmail,
    "Public Phone": lead.publicPhone,
    "Contact Page": lead.contactPage,
    "Source URL": lead.sourceUrl,
    "Contact Verification": lead.contactVerification,
    "Priority Score": lead.priorityScore,
    "Reason for Priority": lead.reasonForPriority,
    "Suggested Service Angle": lead.suggestedServiceAngle,
    "Suggested Email Subject": lead.suggestedEmailSubject,
    "Suggested Email Body": lead.suggestedEmailBody,
    "Follow-up 1": lead.followUp1,
    "Follow-up 2": lead.followUp2,
    Status: lead.status,
    "Last Contacted Date": lead.lastContactedDate,
    "Next Action": lead.nextAction,
    "Opt-out / Do Not Contact": lead.optOutDnc,
    Owner: lead.owner,
    Notes: lead.notes,
    "Search Query": lead.queryTemplate,
    "LinkedIn Company/Profile URL": lead.linkedInCompanyProfileUrl,
    "Last Verified Date": lead.lastVerifiedDate,
    "Ready for Manual Outreach": lead.readyForManualOutreach,
  };
}

function valuesFromRows(headers, rows) {
  return rows.map((row) => headers.map((header) => row[header] ?? ""));
}

function titleSheet(sheet, title, subtitle, endColumn) {
  sheet.showGridLines = false;
  sheet.mergeCells(`A1:${endColumn}1`);
  sheet.mergeCells(`A2:${endColumn}2`);
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A1:${endColumn}1`).format = {
    fill: colors.deepBlue,
    font: { bold: true, color: colors.white, size: 16 },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
  sheet.getRange(`A2:${endColumn}2`).format = {
    fill: colors.paleBlue,
    font: { color: colors.slate, italic: true, size: 10 },
    verticalAlignment: "center",
  };
  sheet.getRange("A1").format.rowHeight = 28;
  sheet.getRange("A2").format.rowHeight = 22;
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

function setWidths(sheet, widths) {
  for (const [column, width] of Object.entries(widths)) {
    sheet.getRange(`${column}:${column}`).format.columnWidth = width;
  }
}

function addTable(sheet, range, name) {
  const table = sheet.tables.add(range, true, name);
  table.style = "TableStyleMedium2";
  return table;
}

function addLeadMaster(workbook, model) {
  const sheet = workbook.worksheets.getOrAdd("Lead Master");
  titleSheet(
    sheet,
    "Lead Master | ZESCORP semi-automated prospecting",
    "Editabil. Nu contactați niciun rând până când Contact Verification = Verified public business contact și există Source URL + dată de verificare.",
    "AA",
  );
  sheet.mergeCells("A3:AA3");
  sheet.getRange("A3").values = [[
    "Seed-ul inițial conține task-uri de research, nu firme și nu date inventate. Completați numai contacte business publice și marcați imediat orice opt-out.",
  ]];
  sheet.getRange("A3:AA3").format = {
    fill: colors.paleYellow,
    font: { bold: true, color: colors.navy, size: 10 },
    wrapText: true,
  };
  sheet.getRange("A3").format.rowHeight = 26;

  sheet.getRange("A5:AA5").values = [leadHeaders];
  sheet.getRange(`A6:AA${model.leadMaster.length + 5}`).values = valuesFromRows(leadHeaders, model.leadMaster);
  styleHeaders(sheet, "A5:AA5");
  styleBody(sheet, `A6:AA${model.leadMaster.length + 5}`);
  addTable(sheet, `A5:AA${model.leadMaster.length + 5}`, "LeadMasterTable");
  sheet.freezePanes.freezeRows(5);

  const first = 6;
  const last = model.leadMaster.length + 5;
  sheet.getRange(`K${first}`).formulas = [[
    `=VLOOKUP(C${first},'Scoring Rules'!$A$6:$B$14,2,FALSE)+IF(E${first}<>"",5,0)+IF(F${first}<>"",10,0)+IF(G${first}<>"",4,0)+IF(H${first}<>"",4,0)+IF(I${first}<>"",7,0)+IF(J${first}="Verified public business contact",10,0)-IF(U${first}="Do not contact",100,0)`,
  ]];
  sheet.getRange(`K${first}:K${last}`).fillDown();
  sheet.getRange(`L${first}`).formulas = [[
    `=IF(U${first}="Do not contact","Blocked: do not contact",IF(J${first}<>"Verified public business contact","Research required: verify public business source",IF(K${first}>=70,"High-fit verified business lead",IF(K${first}>=50,"Relevant verified business lead","Manual review"))))`,
  ]];
  sheet.getRange(`L${first}:L${last}`).fillDown();
  sheet.getRange(`T${first}`).formulas = [[
    `=IF(U${first}="Do not contact","Do not contact",IF(J${first}<>"Verified public business contact","Research and verify public business contact before outreach",IF(B${first}="","Add company name before outreach",IF(AND(F${first}="",G${first}="",H${first}=""),"Add public contact channel before outreach",IF(R${first}="Follow-up due","Send manual personalized follow-up","Review and send personalized outreach manually")))))`,
  ]];
  sheet.getRange(`T${first}:T${last}`).fillDown();
  sheet.getRange(`AA${first}`).formulas = [[
    `=IF(AND(U${first}<>"Do not contact",J${first}="Verified public business contact",B${first}<>"",I${first}<>"",OR(F${first}<>"",G${first}<>"",H${first}<>"")),"Yes","No")`,
  ]];
  sheet.getRange(`AA${first}:AA${last}`).fillDown();

  sheet.getRange(`B${first}:J${last}`).format.fill = colors.paleYellow;
  sheet.getRange(`R${first}:Z${last}`).format.fill = colors.softBlue;
  sheet.getRange(`K${first}:L${last}`).format.fill = colors.paleBlue;
  sheet.getRange(`AA${first}:AA${last}`).format.fill = colors.paleGreen;

  sheet.getRange(`J${first}:J${last}`).dataValidation = {
    rule: {
      type: "list",
      values: ["Research required", "Verified public business contact", "Needs source review"],
    },
  };
  sheet.getRange(`R${first}:R${last}`).dataValidation = {
    rule: {
      type: "list",
      values: [
        "Research required",
        "Ready for manual outreach",
        "Contacted manually",
        "Follow-up due",
        "Replied",
        "Meeting requested",
        "Qualified",
        "Not relevant",
        "Closed",
      ],
    },
  };
  sheet.getRange(`U${first}:U${last}`).dataValidation = {
    rule: { type: "list", values: ["No", "Do not contact"] },
  };
  sheet.getRange(`K${first}:K${last}`).conditionalFormats.addColorScale({
    minColor: colors.paleRed,
    midColor: colors.paleYellow,
    maxColor: colors.paleGreen,
  });
  sheet.getRange(`U${first}:U${last}`).conditionalFormats.addCustom(
    `=U${first}="Do not contact"`,
    { fill: colors.paleRed, font: { bold: true, color: "#9B1C1C" } },
  );
  sheet.getRange(`AA${first}:AA${last}`).conditionalFormats.addCustom(
    `=AA${first}="Yes"`,
    { fill: colors.paleGreen, font: { bold: true, color: "#166534" } },
  );

  setWidths(sheet, {
    A: 14, B: 22, C: 25, D: 15, E: 22, F: 24, G: 16, H: 22, I: 25, J: 24, K: 13, L: 30,
    M: 34, N: 30, O: 65, P: 55, Q: 55, R: 20, S: 16, T: 38, U: 20, V: 15, W: 34, X: 38,
    Y: 28, Z: 16, AA: 18,
  });
  return sheet;
}

function addOperationalQueue(workbook, name, title, subtitle, rows, headers, tableName, widths) {
  const sheet = workbook.worksheets.getOrAdd(name);
  const lastColumn = String.fromCharCode(64 + headers.length);
  titleSheet(sheet, title, subtitle, lastColumn);
  sheet.getRange(`A5:${lastColumn}5`).values = [headers];
  sheet.getRange(`A6:${lastColumn}${rows.length + 5}`).values = valuesFromRows(headers, rows);
  styleHeaders(sheet, `A5:${lastColumn}5`);
  styleBody(sheet, `A6:${lastColumn}${rows.length + 5}`);
  addTable(sheet, `A5:${lastColumn}${rows.length + 5}`, tableName);
  sheet.freezePanes.freezeRows(5);
  setWidths(sheet, widths);
  return sheet;
}

function addTemplates(workbook) {
  const sheet = workbook.worksheets.getOrAdd("Templates");
  titleSheet(
    sheet,
    "Templates | personalizare manuală obligatorie",
    "Textele sunt puncte de pornire. Selectați doar contacte business publice relevante și adaptați mesajul înainte de trimitere.",
    "G",
  );
  const headers = ["Category", "Service Angle", "Email Subject", "Email Body", "LinkedIn Message", "Follow-up 1", "Follow-up 2"];
  const rows = categories.map((category) => ({
    Category: category.label,
    "Service Angle": category.serviceAngle,
    "Email Subject": category.emailSubject,
    "Email Body": category.emailBody,
    "LinkedIn Message": category.linkedin,
    "Follow-up 1": category.followUp1,
    "Follow-up 2": category.followUp2,
  }));
  sheet.getRange("A5:G5").values = [headers];
  sheet.getRange(`A6:G${rows.length + 5}`).values = valuesFromRows(headers, rows);
  styleHeaders(sheet, "A5:G5");
  styleBody(sheet, `A6:G${rows.length + 5}`);
  addTable(sheet, `A5:G${rows.length + 5}`, "TemplatesTable");
  sheet.freezePanes.freezeRows(5);
  setWidths(sheet, { A: 28, B: 42, C: 38, D: 92, E: 68, F: 68, G: 68 });
  return sheet;
}

function addScoringRules(workbook) {
  const sheet = workbook.worksheets.getOrAdd("Scoring Rules");
  titleSheet(
    sheet,
    "Scoring Rules | prioritate, nu permisiune de contact",
    "Un scor mare nu autorizează outreach-ul. Rândul trebuie să aibă sursă business publică verificată și să nu fie marcat Do not contact.",
    "D",
  );
  const categoryRows = categories.map((category) => [category.label, category.baseScore, "Fit de categorie", category.serviceAngle]);
  const adjustments = [
    ["Website public", 5, "Semnal minim de verificare", "Adăugați numai URL public."],
    ["Public email", 10, "Canal business public", "Nu folosiți email personal nepublic."],
    ["Public phone", 4, "Canal business public", "Nu folosiți numere private."],
    ["Contact page", 4, "Canal public de contact", "Păstrați URL-ul sursă."],
    ["Source URL", 7, "Trasabilitate", "Obligatoriu pentru verificare."],
    ["Verified public business contact", 10, "Verificare manuală", "Marcați data ultimei verificări."],
    ["Do not contact", -100, "Blocare imediată", "Opt-out-ul are prioritate absolută."],
  ];
  sheet.getRange("A5:D5").values = [["Category", "Base Score", "Rule Type", "Notes"]];
  sheet.getRange("A6:D14").values = categoryRows;
  styleHeaders(sheet, "A5:D5");
  styleBody(sheet, "A6:D14");
  addTable(sheet, "A5:D14", "CategoryScoresTable");

  sheet.getRange("A17:D17").values = [["Evidence / Safeguard", "Score Adjustment", "Rule Type", "Notes"]];
  sheet.getRange("A18:D24").values = adjustments;
  styleHeaders(sheet, "A17:D17");
  styleBody(sheet, "A18:D24");
  addTable(sheet, "A17:D24", "EvidenceScoresTable");

  sheet.mergeCells("A27:D27");
  sheet.getRange("A27").values = [[
    "Readiness gate: trimiteți manual doar după verificarea sursei publice, personalizare și verificarea Opt-out / Do Not Contact.",
  ]];
  sheet.getRange("A27:D27").format = {
    fill: colors.paleYellow,
    font: { bold: true, color: colors.navy },
    wrapText: true,
  };
  setWidths(sheet, { A: 38, B: 16, C: 24, D: 78 });
  return sheet;
}

function addSearchQueries(workbook) {
  const sheet = workbook.worksheets.getOrAdd("Search Queries");
  titleSheet(
    sheet,
    "Search Queries | research manual, fără scraping agresiv",
    "Folosiți interogările ca punct de pornire. Verificați manual site-ul companiei și păstrați URL-ul public sursă.",
    "E",
  );
  const headers = ["Category", "Search Query Template", "Outreach Angle", "LinkedIn Approach", "Cadence"];
  const rows = categories.flatMap((category) =>
    category.searchQueries.map((query) => ({
      Category: category.label,
      "Search Query Template": query,
      "Outreach Angle": category.serviceAngle,
      "LinkedIn Approach": category.linkedin,
      Cadence: category.cadence,
    })),
  );
  sheet.getRange("A5:E5").values = [headers];
  sheet.getRange(`A6:E${rows.length + 5}`).values = valuesFromRows(headers, rows);
  styleHeaders(sheet, "A5:E5");
  styleBody(sheet, `A6:E${rows.length + 5}`);
  addTable(sheet, `A5:E${rows.length + 5}`, "SearchQueriesTable");
  sheet.freezePanes.freezeRows(5);
  setWidths(sheet, { A: 28, B: 45, C: 56, D: 72, E: 48 });
  return sheet;
}

function addComplianceNotes(workbook) {
  const sheet = workbook.worksheets.getOrAdd("Compliance Notes");
  titleSheet(
    sheet,
    "Compliance Notes | outreach business relevant, manual și trasabil",
    "Acest workbook pregătește task-uri. Nu trimite mesaje automat, nu colectează date medicale și nu autorizează contactarea unui prospect.",
    "D",
  );
  const rows = [
    ["No automatic sending", "Mesajele se verifică, personalizează și trimit manual.", "Mandatory", "Nu conectați workbook-ul la servicii de trimitere în masă."],
    ["Public business contacts only", "Folosiți doar date publicate de organizație pentru scop business.", "Mandatory", "Păstrați Source URL și Last Verified Date."],
    ["Sender identity", "Includeți identitatea expeditorului în fiecare email.", "Mandatory", "SC ZES MEDCORP S.R.L. | office@zescorp.ro | 0725 514 782"],
    ["Opt-out", "Includeți o linie clară de oprire a mesajelor și respectați cererea imediat.", "Mandatory", "Marcați Do not contact."],
    ["No patient data", "Nu colectați și nu introduceți date medicale sau date despre pacienți.", "Mandatory", "Folosiți doar informații comerciale și tehnice relevante."],
    ["No aggressive scraping", "Research-ul se face manual sau din surse publice permise.", "Mandatory", "Nu automatizați extragerea agresivă."],
    ["Relevant outreach only", "Contactați doar organizații pentru care unghiul tehnic este plauzibil.", "Mandatory", "Calitate înainte de volum."],
    ["Cadence cap", "Maximum două follow-up-uri relevante după primul mesaj.", "Recommended", "Opriți mai devreme dacă nu există interes sau apare opt-out."],
    ["LinkedIn restraint", "Cererile se trimit manual, relevante și fără volum artificial.", "Mandatory", "Nu folosiți automatizări de conectare."],
    ["Daily quotas are caps", "30 outreach, 20 LinkedIn, 10 follow-up și 5 parteneri sunt limite operaționale.", "Recommended", "Nu sunt ținte care justifică mesaje irelevante."],
  ];
  sheet.getRange("A5:D5").values = [["Safeguard", "Requirement", "Level", "Operator Note"]];
  sheet.getRange("A6:D15").values = rows;
  styleHeaders(sheet, "A5:D5");
  styleBody(sheet, "A6:D15");
  addTable(sheet, "A5:D15", "ComplianceNotesTable");
  setWidths(sheet, { A: 28, B: 72, C: 16, D: 78 });
  return sheet;
}

function addDashboard(workbook) {
  const sheet = workbook.worksheets.getOrAdd("Dashboard");
  titleSheet(
    sheet,
    "ZESCORP | Semi-Automated Lead Prospecting Dashboard",
    "Research-safe seed: task-uri operaționale fără date de contact inventate. Outreach-ul rămâne strict manual și relevant.",
    "K",
  );

  const cards = [
    ["A5", "Total research records", "=COUNTA('Lead Master'!$A$6:$A$105)", colors.paleBlue],
    ["D5", "Ready manual outreach", '=COUNTIF(\'Lead Master\'!$AA$6:$AA$105,"Yes")', colors.paleGreen],
    ["G5", "Research required", '=COUNTIF(\'Lead Master\'!$J$6:$J$105,"Research required")', colors.paleYellow],
    ["J5", "Opt-out / DNC", '=COUNTIF(\'Lead Master\'!$U$6:$U$105,"Do not contact")', colors.paleRed],
    ["A9", "Today manual tasks", "=COUNTA('Today Outreach'!$A$6:$A$35)", colors.paleBlue],
    ["D9", "LinkedIn research", "=COUNTA('Today Outreach'!$A$36:$A$55)", colors.paleBlue],
    ["G9", "Follow-up slots", "=COUNTA('Follow-up Queue'!$A$6:$A$15)", colors.paleOrange],
    ["J9", "Partner research", "=COUNTA('High Priority Partners'!$A$6:$A$10)", colors.paleGreen],
  ];

  for (const [cell, label, formula, fill] of cards) {
    const column = cell[0];
    const row = Number(cell.slice(1));
    const endColumn = String.fromCharCode(column.charCodeAt(0) + 1);
    sheet.mergeCells(`${column}${row}:${endColumn}${row}`);
    sheet.mergeCells(`${column}${row + 1}:${endColumn}${row + 1}`);
    sheet.getRange(`${column}${row}`).values = [[label]];
    sheet.getRange(`${column}${row + 1}`).formulas = [[formula]];
    sheet.getRange(`${column}${row}:${endColumn}${row + 1}`).format = {
      fill,
      font: { color: colors.navy },
      horizontalAlignment: "center",
      verticalAlignment: "center",
    };
    sheet.getRange(`${column}${row}`).format.font = { bold: true, color: colors.slate, size: 10 };
    sheet.getRange(`${column}${row + 1}`).format.font = { bold: true, color: colors.deepBlue, size: 18 };
  }

  sheet.mergeCells("A13:K13");
  sheet.getRange("A13").values = [[
    "Acest dashboard organizează research-ul și urmărirea manuală. Nu există emailuri automate, scraping sau date de contact inventate.",
  ]];
  sheet.getRange("A13:K13").format = {
    fill: colors.paleYellow,
    font: { bold: true, color: colors.navy },
    wrapText: true,
  };

  sheet.getRange("A16:B16").values = [["Category", "Research Tasks"]];
  sheet.getRange("A17:A25").values = categories.map((category) => [category.label]);
  sheet.getRange("B17").formulas = [['=COUNTIF(\'Lead Master\'!$C$6:$C$105,A17)']];
  sheet.getRange("B17:B25").fillDown();
  styleHeaders(sheet, "A16:B16");
  styleBody(sheet, "A17:B25");
  addTable(sheet, "A16:B25", "DashboardCategoryTable");

  const chart = sheet.charts.add("bar", sheet.getRange("A16:B25"));
  chart.titleText = "Research tasks by category";
  chart.hasLegend = false;
  chart.setPosition("D16", "K31");

  sheet.mergeCells("A28:B28");
  sheet.getRange("A28").values = [["Daily workflow"]];
  sheet.getRange("A28:B28").format = {
    fill: colors.blue,
    font: { bold: true, color: colors.white },
  };
  sheet.getRange("A29:B34").values = [
    ["1", "Cercetați manual firme relevante folosind Search Queries."],
    ["2", "Salvați doar contacte business publice și URL-ul sursă."],
    ["3", "Verificați relevanța și personalizați mesajul."],
    ["4", "Trimiteți manual; logați statusul și data."],
    ["5", "Respectați opt-out imediat."],
    ["6", "Folosiți follow-up-ul limitat, doar când este relevant."],
  ];
  styleBody(sheet, "A29:B34");
  setWidths(sheet, { A: 28, B: 48, C: 4, D: 18, E: 18, F: 4, G: 18, H: 18, I: 4, J: 18, K: 18 });
  sheet.getRange("A29:A34").format.font = { bold: true, color: colors.blue };
  return sheet;
}

async function main() {
  const model = buildProspectingModel({ seedCount: 100 });
  const workbookLeads = model.leads.map(toWorkbookLead);
  await writeCsvOutputs(model, outputDir);
  await fs.mkdir(qaDir, { recursive: true });

  const workbook = Workbook.create();
  for (const sheetName of [
    "Dashboard",
    "Lead Master",
    "Today Outreach",
    "Follow-up Queue",
    "High Priority Partners",
    "Templates",
    "Scoring Rules",
    "Search Queries",
    "Compliance Notes",
  ]) {
    workbook.worksheets.add(sheetName);
  }
  addScoringRules(workbook);
  addLeadMaster(workbook, { leadMaster: workbookLeads });
  addOperationalQueue(
    workbook,
    "Today Outreach",
    "Today Outreach | maximum daily queue",
    "30 task-uri manuale + 20 task-uri LinkedIn research. Nu sunt comenzi de trimitere automată.",
    model.todayOutreach,
    Object.keys(model.todayOutreach[0]),
    "TodayOutreachTable",
    { A: 14, B: 14, C: 34, D: 26, E: 15, F: 22, G: 14, H: 18, I: 48, J: 58, K: 54 },
  );
  addOperationalQueue(
    workbook,
    "Follow-up Queue",
    "Follow-up Queue | slot-uri demo, activate numai după contact manual",
    "Seed-ul inițial nu reprezintă mesaje datorate. Înregistrați primul contact manual înainte de activare.",
    model.followUps,
    Object.keys(model.followUps[0]),
    "FollowUpQueueTable",
    { A: 15, B: 14, C: 28, D: 15, E: 22, F: 56, G: 82, H: 52, I: 48 },
  );
  addOperationalQueue(
    workbook,
    "High Priority Partners",
    "High Priority Partners | research manual pentru colaborări",
    "5 oportunități de research. Adăugați o companie reală numai după verificarea unei surse business publice.",
    model.partners,
    Object.keys(model.partners[0]),
    "HighPriorityPartnersTable",
    { A: 16, B: 14, C: 30, D: 15, E: 22, F: 14, G: 62, H: 64, I: 48 },
  );
  addTemplates(workbook);
  addSearchQueries(workbook);
  addComplianceNotes(workbook);
  addDashboard(workbook);
  workbook.worksheets.setActiveWorksheet("Dashboard");

  const workbookPath = path.join(outputDir, "ZESCORP-Semi-Automated-Prospecting-Engine.xlsx");
  const spreadsheetFile = await SpreadsheetFile.exportXlsx(workbook);
  await spreadsheetFile.save(workbookPath);

  const renderTargets = [
    "Dashboard",
    "Lead Master",
    "Today Outreach",
    "Follow-up Queue",
    "High Priority Partners",
    "Templates",
    "Scoring Rules",
    "Search Queries",
    "Compliance Notes",
  ];
  for (const sheetName of renderTargets) {
    const image = await workbook.render({ sheetName, autoCrop: "all", scale: 0.9 });
    await fs.writeFile(
      path.join(qaDir, `${sheetName.replaceAll(" ", "-").toLowerCase()}.png`),
      await image.bytes(),
    );
  }

  const keyRange = workbook.inspect({
    kind: "table",
    range: "Dashboard!A1:K34",
    include: "values,formulas",
    table_max_rows: 40,
    table_max_cols: 12,
  });
  const formulaErrors = workbook.inspect({
    kind: "match",
    search_term: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { use_regex: true, max_results: 200 },
    summary: "final formula error scan",
  });

  await fs.writeFile(
    path.join(outputDir, "workbook-validation.json"),
    JSON.stringify(
      {
        generatedAt: model.generatedAt,
        workbookPath,
        checks: {
          leadRows: model.leads.length,
          todayOutreachRows: model.todayOutreach.length,
          manualOutreachTasks: model.todayOutreach.filter(
            (task) => task.taskId.startsWith("OUTREACH-"),
          ).length,
          linkedinTasks: model.todayOutreach.filter((task) => task.taskId.startsWith("LINKEDIN-")).length,
          followUps: model.followUps.length,
          highPriorityPartners: model.partners.length,
          duplicatesRemoved: model.duplicatesRemoved,
          inventedCompanies: model.leads.filter((lead) => lead.companyName).length,
          inventedEmails: model.leads.filter((lead) => lead.publicEmail).length,
          inventedPhones: model.leads.filter((lead) => lead.publicPhone).length,
          formulaErrors: formulaErrors.matches?.length || 0,
        },
        dashboardInspection: keyRange,
        formulaErrorInspection: formulaErrors,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        workbookPath,
        qaDir,
        leadRows: model.leads.length,
        todayOutreachRows: model.todayOutreach.length,
        followUps: model.followUps.length,
        highPriorityPartners: model.partners.length,
        duplicatesRemoved: model.duplicatesRemoved,
        formulaErrors: formulaErrors.matches?.length || 0,
      },
      null,
      2,
    ),
  );
}

await main();
process.exit(0);
