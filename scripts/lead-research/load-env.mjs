import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "../..");

function parseEnv(content) {
  const entries = [];
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      const quote = value[0];
      value = value.slice(1, -1);
      if (quote === '"') value = value.replace(/\\n/g, "\n").replace(/\\r/g, "\r");
    } else {
      value = value.replace(/\s+#.*$/, "").trim();
    }
    entries.push([key, value]);
  }
  return entries;
}

for (const filename of [".env.local", ".env"]) {
  const envPath = path.join(projectRoot, filename);
  if (!fs.existsSync(envPath)) continue;
  for (const [key, value] of parseEnv(fs.readFileSync(envPath, "utf8"))) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}
