import fs from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  QUALIFICATION_OUTPUT_DIR,
  QUALIFICATION_WORKBOOK,
} from "./config.mjs";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(process.cwd(), QUALIFICATION_OUTPUT_DIR);
const workbookPath = path.join(outputDir, QUALIFICATION_WORKBOOK);
const reportPath = path.join(outputDir, "qualification-report.json");
const result = spawnSync(process.execPath, [path.join(currentDir, "build-workbook.mjs")], {
  cwd: process.cwd(),
  encoding: "utf8",
  stdio: "pipe",
});

try {
  await fs.access(workbookPath);
  const report = JSON.parse(await fs.readFile(reportPath, "utf8"));
  if (report.formulaErrors) throw new Error(`Workbook contains ${report.formulaErrors} formula errors.`);
  console.log(
    JSON.stringify(
      {
        ok: true,
        workbookPath,
        sheets: report.sheets.length,
        summary: report.summary,
        formulaErrors: report.formulaErrors,
        automaticSending: false,
        productionLeadDataModified: false,
      },
      null,
      2,
    ),
  );
} catch (error) {
  throw new Error(`Commercial qualification workbook export failed: ${error.message}\n${result.stderr || result.stdout}`);
}
