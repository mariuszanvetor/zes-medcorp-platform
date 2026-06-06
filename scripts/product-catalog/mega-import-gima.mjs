import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const sessionsPath = path.join(root, "data", "product-catalog", "import-sessions.json");
const reportPath = path.join(root, "docs", "gima-mega-import-report.md");
const defaultCatalogPagesPath = path.join(os.tmpdir(), "gima_catalog_2024_pages.json");

const gimaBaseUrl = "https://www.gimaitaly.com";
const sourceCatalogUrl = "https://www.gimaitaly.com/en/assets/cataloghi/GIMA_International_Catalogue_2024_LR_ENG.pdf";
const validCategories = [
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
];

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

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
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

function decodeHtml(value) {
  return String(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function textFromHtml(value) {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function loadCandidateSkus(catalogPagesPath) {
  const products = readJson(productsPath, []);
  const existingCodes = products.map((product) => product.gimaCode).filter(Boolean);

  if (!fs.existsSync(catalogPagesPath)) {
    return Array.from(new Set(existingCodes));
  }

  const pages = readJson(catalogPagesPath, []);
  const text = pages.map((page) => page.text || "").join("\n");
  const catalogCodes = [...text.matchAll(/\b(\d{5})\b/g)]
    .map((match) => match[1])
    .filter((code) => Number(code) >= 10000 && Number(code) <= 99999);

  return Array.from(new Set([...existingCodes, ...catalogCodes]));
}

async function fetchText(url, timeoutMs = 20000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "ZESCORP catalog review bot; manual noindex import; office@zescorp.ro" },
    });
    const text = await response.text();
    return { ok: response.ok, status: response.status, text, url: response.url };
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyImage(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": "ZESCORP catalog image verifier; noindex product review" },
    });
    const contentType = response.headers.get("content-type") || "";
    const contentLength = Number(response.headers.get("content-length") || 0);
    return response.ok && contentType.startsWith("image/") && contentLength > 1000;
  } catch {
    return false;
  }
}

function extractProductPage(html, sku, sourceUrl) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const sourceProductName = textFromHtml(h1 || "");
  if (!sourceProductName) return null;

  const imageMatch =
    html.match(/<a[^>]+href=["']([^"']*\/images\/prodotti\/big\/[^"']+)["'][^>]*>\s*<img[^>]+alt=["']Download image["']/i) ||
    html.match(/href=["']([^"']*\/images\/prodotti\/big\/[^"']+\.jpg)["']/i) ||
    html.match(/src=["']([^"']*\/images\/prodotti\/medium\/[^"']+\.jpg)["']/i);
  const imageUrl = imageMatch ? new URL(imageMatch[1], gimaBaseUrl).toString() : "";

  const breadcrumbMatches = [...html.matchAll(/<a[^>]+href=["']([^"']*\/catalogo\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)].map((match) => ({
    href: match[1],
    label: textFromHtml(match[2]),
  }));
  const breadcrumb = breadcrumbMatches.slice(-3).map((item) => item.label).filter(Boolean);

  const descriptionStart = html.indexOf("Description");
  const specsStart = html.indexOf("Technical Specifications");
  const familyStart = html.indexOf("In the same family");
  const description = descriptionStart >= 0
    ? textFromHtml(html.slice(descriptionStart, specsStart >= 0 ? specsStart : descriptionStart + 2500)).replace(/^Description\s*/i, "")
    : "";
  const specsText = specsStart >= 0
    ? textFromHtml(html.slice(specsStart, familyStart >= 0 ? familyStart : specsStart + 3500)).replace(/^Technical Specifications\s*/i, "")
    : "";

  const ean = textFromHtml(html.match(/EAN:\s*<\/label><\/td>\s*<td[^>]*><span[^>]*>([\s\S]*?)<\/span>/i)?.[1] || "");
  const type = textFromHtml(html.match(/Type:\s*<\/label><\/td>\s*<td[^>]*><span[^>]*>([\s\S]*?)<\/span>/i)?.[1] || "");
  const unit = textFromHtml(html.match(/Unit of sale:\s*<\/label><\/td>\s*<td[^>]*><span[^>]*>([\s\S]*?)<\/span>/i)?.[1] || "");

  return {
    sku,
    sourceProductName,
    sourceUrl,
    imageUrl,
    breadcrumb,
    description,
    specsText,
    ean,
    type,
    unit,
  };
}

function inferCategory(source) {
  const haystack = [source.sourceProductName, source.description, source.specsText, ...(source.breadcrumb || [])].join(" ").toLowerCase();
  const top = (source.breadcrumb?.[0] || "").toLowerCase();

  if (/\bent\b|otoscope|otoscop|laryngoscope|oropharyng|ear specula|nasal|nose|throat/i.test(haystack) || top.includes("ent devices")) return "ent";
  if (/emergency|first aid|stretcher|resuscit|oxygen|ambulance|trauma|splint|dressing and emergency/i.test(haystack) || top.includes("first aid")) return "emergency";
  if (/monitor|ecg|ekg|ultrasound|doppler|patient monitor|holter|vital/i.test(haystack) || top.includes("ecg")) return "monitoring";
  if (/laborator|laboratory|centrifuge|microscope|analyzer|analyser|ivd|pipette|test tube|urine|blood|reagent|hemoglobin|hematocrit/i.test(haystack) || top.includes("diagnostic tests")) return "laboratory";
  if (/electromedical|therapy|laser|magnetotherapy|electrotherapy|diathermy|tens|defibrillator/i.test(haystack) || top.includes("electromedical")) return "electromedical";
  if (/steril|autoclave|sealer|washer|instrument tray/i.test(haystack) || top.includes("sterilization")) return "sterilization";
  if (/furniture|trolley|chair|couch|table|cabinet|bed|stool|screen/i.test(haystack) || top.includes("furniture")) return "medical-furniture";
  if (/disinfect|sanit|cleaning|detergent|dezinfect/i.test(haystack)) return "disinfection";
  if (/surgical|forceps|scissor|scalpel|retractor|needle holder|instrument/i.test(haystack) || top.includes("surgical")) return "surgical-instruments";
  if (/gyn|foetal|fetal|obstetric|speculum|colposcope/i.test(haystack) || top.includes("gynaecology")) return "gynecology";
  if (/patient aid|wheelchair|walker|crutch|orthopedic|care|mattress|cushion|pharmacy/i.test(haystack) || top.includes("patient aids") || top.includes("health care")) return "patient-care";
  if (/mask|glove|syringe|needle|dressing|bandage|consumable|disposable|ffp|gel|bag/i.test(haystack)) return "consumables";
  if (/scale|stethoscope|sphygmo|thermometer|diagnostic|audiometer|spirometer/i.test(haystack)) return "diagnostic";

  return "diagnostic";
}

function categoryLabel(category) {
  const labels = {
    diagnostic: "Diagnostic medical",
    laboratory: "Laborator / IVD",
    emergency: "Urgenta",
    sterilization: "Sterilizare",
    "medical-furniture": "Mobilier medical",
    ent: "ORL",
    gynecology: "Ginecologie",
    consumables: "Consumabile",
    electromedical: "Electromedicale",
    "surgical-instruments": "Instrumentar chirurgical",
    "patient-care": "Ingrijire pacient",
    monitoring: "Monitorizare",
    disinfection: "Dezinfectie",
  };
  return labels[category] || "Echipamente medicale";
}

function transformTitle(sourceProductName) {
  const clean = sourceProductName
    .replace(/\s+/g, " ")
    .replace(/\s+-\s+spare$/i, " - piesa de schimb")
    .trim();

  const replacements = [
    [/CENTRIFUGE/gi, "centrifuga"],
    [/ANALYZER/gi, "analizor"],
    [/ANALYSER/gi, "analizor"],
    [/MULTI-PARAMETER/gi, "multiparametric"],
    [/PARAMETERS/gi, "parametri"],
    [/PARAMETER/gi, "parametru"],
    [/NON WOVEN/gi, "netesut"],
    [/BI-LAYER/gi, "dublu strat"],
    [/DRAPE/gi, "camp medical"],
    [/CLAMP/gi, "pensa"],
    [/STRAIGHT/gi, "dreapta"],
    [/TOURNIQUET/gi, "garou"],
    [/UNCUFFED/gi, "fara balonas"],
    [/TRACHEOSTOMY TUBE/gi, "canula traheostomie"],
    [/DIAM\./gi, "diametru"],
    [/HYDRAULIC/gi, "hidraulic"],
    [/PATIENT TRANSFER/gi, "transfer pacient"],
    [/STORAGE CABINET/gi, "dulap depozitare"],
    [/LIGHT GREY/gi, "gri deschis"],
    [/OSTEOPOROSIS SCREENING/gi, "screening osteoporoza"],
    [/PROBE/gi, "sonda"],
    [/QUICK/gi, "rapid"],
    [/BLUE/gi, "albastru"],
    [/GREEN/gi, "verde"],
    [/RED/gi, "rosu"],
    [/BLACK/gi, "negru"],
    [/WHITE/gi, "alb"],
    [/URINE/gi, "urina"],
    [/HEMOGLOBIN/gi, "hemoglobina"],
    [/HEMATOCRIT/gi, "hematocrit"],
    [/MEASURER/gi, "masurator"],
    [/MONITOR/gi, "monitor"],
    [/TROLLEY/gi, "carucior"],
    [/EMERGENCY/gi, "urgenta"],
    [/CHAIR/gi, "scaun"],
    [/TABLE/gi, "masa"],
    [/COUCH/gi, "canapea medicala"],
    [/STRETCHER/gi, "targa"],
    [/OTOSCOPE/gi, "otoscop"],
    [/STETHOSCOPE/gi, "stetoscop"],
    [/SPHYGMOMANOMETER/gi, "tensiometru"],
    [/THERMOMETER/gi, "termometru"],
    [/ULTRASOUND/gi, "ecograf"],
    [/DOPPLER/gi, "Doppler"],
    [/ELECTRODES/gi, "electrozi"],
    [/MASK/gi, "masca"],
    [/GLOVES/gi, "manusi"],
    [/DISPOSABLE/gi, "de unica folosinta"],
    [/MEDICAL/gi, "medical"],
    [/PROFESSIONAL/gi, "profesional"],
    [/DIGITAL/gi, "digital"],
    [/KIT/gi, "kit"],
    [/SPARE/gi, "piesa de schimb"],
    [/\bWITH\b/gi, "cu"],
    [/\bAND\b/gi, "si"],
  ];

  let title = clean;
  for (const [pattern, replacement] of replacements) title = title.replace(pattern, replacement);
  title = title.toLowerCase().replace(/\b(gima|xc|ecg|ekg|led|usb|ffp2|ffp3|rfid|uv|uvc)\b/g, (match) => match.toUpperCase());
  title = title
    .replace(/\bbluetooth\b/g, "Bluetooth")
    .replace(/\bent\b/g, "ORL")
    .replace(/\bneo plus urgenta carucior\b/g, "carucior de urgenta Neo Plus")
    .replace(/\botopex ORL scaun\b/g, "scaun ORL Otopex")
    .replace(/\bhidraulic transfer pacient scaun\b/g, "scaun hidraulic pentru transfer pacient")
    .replace(/\bnetesut dublu strat camp medical\b/g, "camp medical netesut dublu strat")
    .replace(/\bGIMA urine analizor cu Bluetooth\b/g, "analizor de urina GIMA cu Bluetooth")
    .replace(/\bhemo control: hemoglobina si hematocrit masurator\b/g, "Hemo Control - masurator hemoglobina si hematocrit");
  return title.charAt(0).toUpperCase() + title.slice(1);
}

function splitSpecifications(specsText, source) {
  const specs = [];
  const known = [
    ["Power Supply", "Alimentare"],
    ["Power", "Putere"],
    ["Speed", "Viteza"],
    ["Time", "Timp"],
    ["Dimensions", "Dimensiuni"],
    ["Weight", "Greutate"],
    ["Capacity", "Capacitate"],
    ["Max. RCF", "RCF max."],
    ["EAN13", "EAN"],
    ["EAN", "EAN"],
    ["Unit of sale", "Unitate de vanzare"],
    ["Type", "Tip produs"],
  ];

  const normalized = specsText.replace(/\s+/g, " ").trim();
  for (const [english, romanian] of known) {
    const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = normalized.match(new RegExp(`${escaped}:\\s*([^:]+?)(?=\\s+(?:${known.map(([label]) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")}):|$)`, "i"));
    if (match?.[1]) specs.push({ label: romanian, value: match[1].trim().slice(0, 120) });
  }

  if (source.unit) specs.push({ label: "Unitate de vanzare", value: source.unit });
  if (source.type) specs.push({ label: "Tip produs", value: source.type });
  if (source.ean) specs.push({ label: "EAN", value: source.ean });
  if (!specs.some((item) => item.label === "Cod produs")) specs.unshift({ label: "Cod produs", value: source.sku });

  const seen = new Set();
  return specs.filter((spec) => {
    const key = `${spec.label}:${spec.value}`;
    if (seen.has(key) || !spec.value) return false;
    seen.add(key);
    return true;
  }).slice(0, 10);
}

function buildCommercialContent(source, category) {
  const label = categoryLabel(category);
  const title = transformTitle(source.sourceProductName);
  const productType = label.toLowerCase();

  return {
    romanianTitle: title,
    romanianDescription:
      `${title} este un produs din categoria ${productType}, disponibil pentru cerere de oferta prin ZESCORP. ` +
      "Configuratia, accesoriile, documentatia tehnica si conditiile de livrare se confirma inainte de ofertare, in functie de aplicatia clinica si de cantitate.",
    romanianApplications: [
      `Dotare pentru clinici, cabinete sau laboratoare care utilizeaza produse din categoria ${label}`,
      "Cereri de oferta pentru echipare initiala, completare de dotari sau inlocuire echipamente",
      "Integrare in fluxuri operationale impreuna cu service, consumabile si mentenanta",
    ],
    romanianBenefits: [
      "Cerere de oferta structurata in functie de aplicatia reala si de cantitate",
      "Posibilitate de corelare cu instalare, suport tehnic si mentenanta",
      "Clarificarea accesoriilor, consumabilelor si documentatiei inainte de achizitie",
    ],
    romanianSpecifications: splitSpecifications(source.specsText, source),
    commercialCategory: label,
    installationConsiderations: [
      "Verificarea conditiilor de utilizare, accesului si configuratiei inainte de livrare",
      "Confirmarea accesoriilor, consumabilelor si documentatiei tehnice necesare",
      "Corelarea produsului cu fluxul clinic sau operational in care va fi folosit",
    ],
    maintenanceConsiderations: [
      "Plan de service si mentenanta in functie de frecventa de utilizare",
      "Verificarea periodica a consumabilelor, accesoriilor si elementelor supuse uzurii",
      "Suport ZESCORP pentru continuitate operationala, interventii si clarificari tehnice",
    ],
    relatedServices: relatedServicesForCategory(category),
    imageAlt: `${title} pentru clinici, cabinete si unitati medicale`,
  };
}

function relatedServicesForCategory(category) {
  const base = ["/service-aparatura-medicala", "/contracte-mentenanta"];
  const map = {
    laboratory: ["/solutii-medicale/echipamente-laborator-ivd", ...base],
    diagnostic: ["/solutii-medicale/echipamente-imagistica-diagnostic", ...base],
    monitoring: ["/solutii-medicale/echipamente-imagistica-diagnostic", ...base],
    electromedical: ["/solutii-medicale/instalare-punere-in-functiune", ...base],
    sterilization: ["/solutii-medicale/instalare-punere-in-functiune", ...base],
    "medical-furniture": ["/solutii-medicale/amenajare-clinica-medicala", ...base],
  };
  return map[category] || base;
}

function mergeProduct(existing, source, imageVerified) {
  const category = inferCategory(source);
  const commercial = buildCommercialContent(source, category);
  const slug = existing?.slug || slugify(["gima", source.sourceProductName, source.sku].filter(Boolean).join(" "));
  const productPageUrl = `${gimaBaseUrl}/Prodotti/${source.sku}`;
  const sourceUrls = Array.from(new Set([...(existing?.sourceUrls || []), productPageUrl, source.sourceUrl, sourceCatalogUrl].filter(Boolean)));

  return {
    ...(existing || {}),
    id: existing?.id || slug,
    slug,
    source: "gima-public-catalog",
    sourceBrand: "GIMA",
    sourceProductName: source.sourceProductName,
    gimaCode: source.sku,
    category,
    subcategory: source.breadcrumb?.slice(1).join(" / ") || existing?.subcategory || "",
    productUrl: productPageUrl,
    sourceUrls,
    reviewStatus: imageVerified ? "image_verified" : "translated",
    importedAt: existing?.importedAt || new Date().toISOString().slice(0, 10),
    reviewedAt: existing?.reviewedAt || null,
    approvedAt: existing?.approvedAt || null,
    indexableAt: null,
    commercialDescription: "",
    applications: [],
    ...commercial,
    imageUrl: imageVerified && source.imageUrl ? source.imageUrl : existing?.imageUrl || "",
    imageSourceUrl: imageVerified && source.imageUrl ? productPageUrl : existing?.imageSourceUrl || "",
    imageVerified: Boolean(imageVerified && source.imageUrl),
    publicDisplayReady: true,
    notes: `GIMA public product page enriched. Noindex until manual ZESCORP review.`,
  };
}

function buildIndexes(products) {
  const byCode = new Map();
  const byUrl = new Map();
  for (let index = 0; index < products.length; index += 1) {
    const product = products[index];
    if (product.gimaCode) byCode.set(String(product.gimaCode), index);
    for (const url of product.sourceUrls || []) byUrl.set(url, index);
    if (product.productUrl) byUrl.set(product.productUrl, index);
  }
  return { byCode, byUrl };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildReport({ session, products, added, updated, duplicates, failures, placeholders, realImages, brokenImages, samples }) {
  const categoryCounts = Object.fromEntries(validCategories.map((category) => [category, 0]));
  for (const product of products) {
    if (categoryCounts[product.category] !== undefined) categoryCounts[product.category] += 1;
  }
  const covered = Object.entries(categoryCounts).filter(([, count]) => count > 0);
  const realImagePercentage = products.length ? ((realImages / products.length) * 100).toFixed(1) : "0.0";

  return `# GIMA Mega Import Report

Generated: ${new Date().toISOString()}

Source:
- Official GIMA public product pages: https://www.gimaitaly.com/Prodotti/<SKU>
- Official GIMA public catalogue PDF: ${sourceCatalogUrl}

## Summary

- Target product count: ${session.targetCount}
- Total products in catalog: ${products.length}
- Products added in this run: ${added}
- Products enriched/updated in this run: ${updated}
- Products translated/display-ready: ${products.filter((product) => product.publicDisplayReady).length}
- Categories covered: ${covered.length}
- Duplicates skipped: ${duplicates}
- Failed imports/product pages: ${failures.length}
- Real images verified: ${realImages}
- Placeholder images used: ${placeholders}
- Broken image checks: ${brokenImages}
- Real image coverage: ${realImagePercentage}%
- Indexing: imported, translated and image_verified products remain noindex and are excluded from sitemap until manual review.

## Category Coverage

${covered.map(([category, count]) => `- ${categoryLabel(category)} (${category}): ${count}`).join("\n")}

## Image Audit

- Real images are accepted only when the GIMA product image URL responds as an image.
- Product image source URL is stored internally as \`imageSourceUrl\`.
- Placeholder images are used only when no verified image is available.
- Broken images are not written as public product images.

## Sample Product URLs

${samples.map((slug) => `- /produse/${slug}`).join("\n")}

## Failures

${failures.length ? failures.slice(0, 50).map((item) => `- ${item.sku}: ${item.reason}`).join("\n") : "- None in logged batch."}

## Build Performance Notes

- Batch 1 target: 500 products.
- Batch 2 target used in this run: ${session.targetCount} products.
- Next recommended batch: increase by 500 products only after production build and UX smoke remain stable.
- Products stay noindex during import scale-up to avoid duplicate-content SEO risk.

## Review Workflow

Statuses:
- imported
- translated
- image_verified
- reviewed
- indexable
- excluded

Only \`reviewStatus: "indexable"\` products should be added to sitemap.
`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetCount = Number(args.target || args.limit || 1000);
  const maxRequests = Number(args["max-requests"] || 3000);
  const delayMs = Number(args.delay || 80);
  const refresh = Boolean(args.refresh);
  const catalogPagesPath = path.resolve(root, args["catalog-pages"] || defaultCatalogPagesPath);
  const sessionId = `gima-mega-${new Date().toISOString().replace(/[:.]/g, "-")}`;
  const products = readJson(productsPath, []);
  const sessions = readJson(sessionsPath, []);
  const candidateSkus = loadCandidateSkus(catalogPagesPath);
  const indexes = buildIndexes(products);
  const failures = [];
  const samples = [];
  let added = 0;
  let updated = 0;
  let duplicates = 0;
  let realImages = products.filter((product) => product.imageVerified).length;
  let brokenImages = 0;
  let requests = 0;

  for (const sku of candidateSkus) {
    if (products.length >= targetCount && !indexes.byCode.has(sku)) break;
    if (requests >= maxRequests) break;

    const productPageUrl = `${gimaBaseUrl}/Prodotti/${sku}`;
    const existingIndex = indexes.byCode.get(sku) ?? indexes.byUrl.get(productPageUrl);
    const existing = existingIndex !== undefined ? products[existingIndex] : null;
    const needsImage = !existing?.imageVerified;
    const needsContent = !existing?.publicDisplayReady || !existing?.romanianTitle || !validCategories.includes(existing?.category);
    if (existing && !refresh && !needsImage && !needsContent && products.length >= targetCount) {
      duplicates += 1;
      continue;
    }

    await delay(delayMs);
    requests += 1;
    let fetched;
    try {
      fetched = await fetchText(productPageUrl);
    } catch (error) {
      failures.push({ sku, reason: `Fetch failed: ${error.message}` });
      continue;
    }

    if (!fetched.ok || !fetched.text.includes("<h1")) {
      failures.push({ sku, reason: `Product page HTTP ${fetched.status}` });
      continue;
    }

    const source = extractProductPage(fetched.text, sku, productPageUrl);
    if (!source) {
      failures.push({ sku, reason: "Could not parse product page" });
      continue;
    }

    let imageVerified = false;
    if (source.imageUrl) {
      imageVerified = await verifyImage(source.imageUrl);
      if (!imageVerified) brokenImages += 1;
    }

    const merged = mergeProduct(existing, source, imageVerified);
    if (existingIndex !== undefined) {
      if (!existing?.imageVerified && merged.imageVerified) realImages += 1;
      products[existingIndex] = merged;
      updated += 1;
    } else {
      products.push(merged);
      indexes.byCode.set(sku, products.length - 1);
      indexes.byUrl.set(productPageUrl, products.length - 1);
      if (merged.imageVerified) realImages += 1;
      added += 1;
    }

    if (samples.length < 10) samples.push(merged.slug);
  }

  const placeholders = products.filter((product) => !product.imageVerified).length;
  const session = {
    sessionId,
    sourceLabel: "GIMA public product pages and official public catalog",
    sourceCatalogUrl,
    date: new Date().toISOString(),
    targetCount,
    refresh,
    candidateSkus: candidateSkus.length,
    productPageRequests: requests,
    productsAdded: added,
    productsUpdated: updated,
    duplicatesSkipped: duplicates,
    failures: failures.length,
    realImagesVerified: realImages,
    placeholdersUsed: placeholders,
    mode: args["dry-run"] ? "dry-run" : "write",
  };

  const report = buildReport({ session, products, added, updated, duplicates, failures, placeholders, realImages, brokenImages, samples });

  if (!args["dry-run"]) {
    writeJson(productsPath, products);
    writeJson(sessionsPath, [session, ...sessions]);
    fs.writeFileSync(reportPath, report);
  }

  console.log(JSON.stringify(session, null, 2));
  console.log(`Report: ${reportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
