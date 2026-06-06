import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const sessionsPath = path.join(root, "data", "product-catalog", "import-sessions.json");

const allowedCategories = new Set([
  "diagnostic",
  "laboratory",
  "emergency",
  "sterilization",
  "medical-furniture",
  "ent",
  "gynecology",
  "consumables",
  "electromedical",
  "surgical-instruments",
  "patient-care",
  "monitoring",
  "disinfection",
]);

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) continue;
    const key = value.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) args[key] = true;
    else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function parseCsv(source) {
  const lines = source.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];
  const headers = splitCsvLine(lines[0]).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let quote = false;
  for (const char of line) {
    if (char === '"') {
      quote = !quote;
      continue;
    }
    if (char === "," && !quote) {
      values.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current);
  return values.map((value) => value.trim());
}

async function loadInput(input) {
  if (!input) {
    throw new Error("Missing --input. Provide a CSV/JSON file path or URL.");
  }

  if (/^https?:\/\//i.test(input)) {
    const response = await fetch(input);
    if (!response.ok) {
      throw new Error(`Could not fetch input URL: HTTP ${response.status}`);
    }
    return {
      sourceLabel: input,
      text: await response.text(),
    };
  }

  const absolute = path.resolve(root, input);
  return {
    sourceLabel: absolute,
    text: fs.readFileSync(absolute, "utf8"),
  };
}

function normalizeProduct(row, sessionId, sourceLabel) {
  const sourceProductName = row.sourceProductName || row.name || row.title || row.productName;
  const gimaCode = row.gimaCode || row.code || row.productCode || "";
  const category = normalizeCategory(row.category || row.categorySlug || "");

  if (!sourceProductName) {
    return { rejected: true, reason: "Missing product name", row };
  }

  if (!category || !allowedCategories.has(category)) {
    return { rejected: true, reason: `Unsupported category: ${row.category || ""}`, row };
  }

  const slugBase = ["gima", sourceProductName, gimaCode].filter(Boolean).join(" ");
  const slug = row.slug || slugify(slugBase);

  return {
    id: row.id || slug,
    slug,
    source: "gima-public-catalog",
    sourceBrand: row.sourceBrand || "GIMA",
    sourceProductName,
    gimaCode,
    category,
    subcategory: row.subcategory || "",
    productUrl: row.productUrl || row.url || "",
    sourceUrls: [row.sourceUrl, row.productUrl, row.url, sourceLabel].filter(Boolean),
    reviewStatus: "imported",
    importedAt: new Date().toISOString().slice(0, 10),
    reviewedAt: null,
    approvedAt: null,
    indexableAt: null,
    commercialDescription: "",
    applications: [],
    installationConsiderations: [],
    maintenanceConsiderations: [],
    relatedServices: [],
    notes: `Imported by ${sessionId}. Noindex until reviewed.`,
  };
}

function normalizeCategory(value) {
  const normalized = slugify(value);
  const aliases = {
    diagnostics: "diagnostic",
    diagnostic: "diagnostic",
    laboratory: "laboratory",
    lab: "laboratory",
    emergency: "emergency",
    sterilization: "sterilization",
    sterilisation: "sterilization",
    furniture: "medical-furniture",
    "medical-furniture": "medical-furniture",
    ent: "ent",
    gynecology: "gynecology",
    gynaecology: "gynecology",
    consumables: "consumables",
    electromedical: "electromedical",
    electromedicals: "electromedical",
    "electromedical-devices": "electromedical",
    surgical: "surgical-instruments",
    "surgical-instruments": "surgical-instruments",
    "patient-care": "patient-care",
    "patient-aids": "patient-care",
    monitoring: "monitoring",
    monitors: "monitoring",
    disinfection: "disinfection",
  };
  return aliases[normalized] || normalized;
}

function dedupeKey(product) {
  return [
    product.gimaCode ? `code:${product.gimaCode}` : "",
    product.productUrl ? `url:${product.productUrl}` : "",
    `slug:${product.slug}`,
  ].filter(Boolean);
}

function mergeProducts(existing, incoming) {
  const products = [...existing];
  const indexes = new Map();
  for (let index = 0; index < products.length; index += 1) {
    for (const key of dedupeKey(products[index])) indexes.set(key, index);
  }

  const added = [];
  const duplicates = [];

  for (const product of incoming) {
    const matchedIndex = dedupeKey(product).map((key) => indexes.get(key)).find((value) => value !== undefined);
    if (matchedIndex !== undefined) {
      const current = products[matchedIndex];
      products[matchedIndex] = {
        ...current,
        sourceUrls: Array.from(new Set([...(current.sourceUrls ?? []), ...(product.sourceUrls ?? [])])),
        notes: `${current.notes || ""} Seen again ${new Date().toISOString().slice(0, 10)}.`.trim(),
      };
      duplicates.push(product);
      continue;
    }

    products.push(product);
    for (const key of dedupeKey(product)) indexes.set(key, products.length - 1);
    added.push(product);
  }

  return { products, added, duplicates };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sessionId = `gima-${new Date().toISOString().replace(/[:.]/g, "-")}`;
  const { sourceLabel, text } = await loadInput(args.input);
  const rows = sourceLabel.endsWith(".json") || text.trim().startsWith("[") ? JSON.parse(text) : parseCsv(text);
  const normalized = rows.map((row) => normalizeProduct(row, sessionId, sourceLabel));
  const rejected = normalized.filter((item) => item.rejected);
  const candidates = normalized.filter((item) => !item.rejected);
  const existing = readJson(productsPath, []);
  const merge = mergeProducts(existing, candidates);
  const sessions = readJson(sessionsPath, []);
  const session = {
    sessionId,
    sourceLabel,
    date: new Date().toISOString(),
    rowsRead: rows.length,
    productsAdded: merge.added.length,
    duplicatesSkipped: merge.duplicates.length,
    rejected: rejected.length,
    mode: args["dry-run"] ? "dry-run" : "write",
  };

  if (!args["dry-run"]) {
    writeJson(productsPath, merge.products);
    writeJson(sessionsPath, [session, ...sessions]);
  }

  console.log(JSON.stringify(session, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
