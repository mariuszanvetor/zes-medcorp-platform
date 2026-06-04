import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { projectRoot } from "../lead-research/core.mjs";

const outputDir = path.join(projectRoot, "outputs", "phase-83a");
const workbookPath = path.join(outputDir, "ZESCORP-Outreach-Operating-System.xlsx");
const validationPath = path.join(outputDir, "workbook-validation.json");
const builder = path.join(projectRoot, "scripts", "outreach", "build-workbook.mjs");
const result = spawnSync(process.execPath, [builder], { cwd: projectRoot, encoding: "utf8" });

try {
  await fs.access(workbookPath);
  const validation = JSON.parse(await fs.readFile(validationPath, "utf8"));
  if (validation.formulaErrors) throw new Error(`Workbook contains ${validation.formulaErrors} formula errors.`);
  console.log(
    JSON.stringify(
      {
        ok: true,
        workbookPath,
        sheets: validation.sheets.length,
        draftedEmails: validation.draftedEmails,
        manualSendQueue: validation.manualSendQueue,
        formulaErrors: validation.formulaErrors,
        automaticSending: false,
      },
      null,
      2,
    ),
  );
} catch (error) {
  throw new Error(`Outreach workbook export failed: ${error.message}\n${result.stderr || result.stdout}`);
}

