import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "gima-quality-rollback-report.md");

const allowedEnglishTerms = [
  "CE",
  "FDA",
  "ISO",
  "Bluetooth",
  "WiFi",
  "PACS",
  "RIS",
  "DICOM",
  "ECG",
  "EKG",
  "LED",
  "LCD",
  "USB",
  "PVC",
  "ABS",
  "RFID",
  "AAA",
  "MDR",
  "IVD",
  "ORL",
  "FFP2",
  "FFP3",
  "IIR",
  "HD",
  "TFT",
  "AED",
  "SpO2",
  "NIBP",
  "EtCO2",
  "Lux",
  "LUX",
  "Storz",
  "Wolf",
  "Olympus",
  "Pentax",
  "Heine",
  "Riester",
  "Littmann",
  "Aesculap",
  "GIMA",
  "BD",
  "3M",
];

const untranslatedProductTerms = [
  "analyzer",
  "analyser",
  "bag",
  "basket",
  "bath",
  "bed",
  "bottle",
  "box",
  "bucket",
  "case",
  "catheter",
  "chair",
  "clamp",
  "clipper",
  "commode",
  "cover",
  "cushion",
  "drape",
  "forceps",
  "gloves",
  "handle",
  "heat sealer",
  "height",
  "jaw",
  "light",
  "lid",
  "mask",
  "molar",
  "monitor",
  "pad",
  "pessary",
  "pillow",
  "remover",
  "rollator",
  "scale",
  "scissors",
  "seat",
  "staple",
  "stick",
  "stethoscope",
  "table",
  "thermometer",
  "torch",
  "trolley",
  "tube",
  "upper",
  "warmer",
];

const localizationLeakPatterns = [
  /\b(power consumption|voltage|communication interface|record mode|host computer|large lcd display|user[- ]friendly interface|fast results|limited sample volume)\b/i,
  /\b(description|features|package contents|applications|benefits|specifications|delivery and support|product documents|related products|related services|quote request|product code)\b/i,
  /\b(disposable|straight|curved|sterile|supplied|provided|optional|available|minimum order|single use|single patient|without needle|with needle|stainless steel|chrome plated|height adjustable|foldable)\b/i,
  /\b(operator'?s protection|dressing kit|oxygen cylinder|medical heat sealer|physiotherapy|ear specul|pouch|handles|on\/off button)\b/i,
];

const genericDescriptionPatterns = [
  /este un produs din categoria/i,
  /pregatit pentru cereri de oferta profesionale/i,
  /este disponibil pentru cereri de oferta profesionale/i,
  /produs disponibil pentru cerere de oferta/i,
  /cu verificarea configuratiei si a documentatiei/i,
];

const categoryMismatchRules = [
  {
    category: "physiotherapy",
    terms: ["butelie", "oxigen", "bisturiu", "lama", "borcan", "flacon", "punga", "masca", "manusi"],
    reason: "termen incompatibil cu fizioterapie",
  },
  {
    category: "surgical-instruments",
    terms: ["upper", "lower", "tricou", "bluza", "pantaloni", "pouch", "geanta"],
    reason: "text de imbracaminte/accesoriu in instrumentar chirurgical",
  },
  {
    category: "diagnostic",
    terms: ["pouch", "ear specul", "alligator conector", "supplied"],
    reason: "accesoriu brut sau termen netradus in diagnostic",
  },
];

function normalize(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function stripAllowedEnglish(text) {
  let value = ` ${String(text || "")} `;
  for (const term of allowedEnglishTerms) {
    value = value.replace(new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi"), " ");
  }
  return value;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function localFileExists(publicPath) {
  if (!publicPath || !String(publicPath).startsWith("/")) return false;
  const filePath = path.join(root, "public", publicPath.replace(/^\//, ""));
  return fs.existsSync(filePath) && fs.statSync(filePath).size > 1000;
}

function productTextFields(product) {
  return [
    product.romanianTitle,
    product.romanianShortSummary,
    product.romanianDescription,
    product.romanianSourceDescription,
    ...(product.romanianApplications || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianFeatures || []),
    ...(product.romanianPackageContents || []),
    ...(product.romanianSpecifications || []).flatMap((spec) => [spec.label, spec.value]),
  ].filter(Boolean);
}

function hasBadRepeatedTitle(title) {
  const normalized = normalize(title);
  const words = normalized.match(/[a-z0-9]+/g) || [];
  const wordCounts = new Map();

  for (const word of words) {
    if (word.length < 3) continue;
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  }

  return Boolean(
      /([a-z])\1{3,}/i.test(normalized) ||
      /([a-z]{2,8})\1{2,}/i.test(normalized.replace(/\s+/g, "")) ||
      /[-*_,]{2,}/.test(title) ||
      /,\s*,/.test(title) ||
      /\bcod\s+\d{4,}\b/i.test(normalized) ||
      [...wordCounts.values()].some((count) => count >= 3)
  );
}

function hasEnglishProductType(title) {
  const text = stripAllowedEnglish(title);
  return untranslatedProductTerms.some((term) => new RegExp(`\\b${escapeRegExp(term)}\\b`, "i").test(text));
}

function hasLocalizationLeak(product) {
  return productTextFields(product).some((field) => {
    const text = stripAllowedEnglish(field);
    return localizationLeakPatterns.some((pattern) => pattern.test(text));
  });
}

function hasGenericDescription(product) {
  const description = product.romanianDescription || "";
  const specificFields = [
    ...(product.romanianFeatures || []),
    ...(product.romanianApplications || []),
    ...(product.romanianSpecifications || []).map((spec) => `${spec.label} ${spec.value}`),
  ].join(" ");

  return Boolean(genericDescriptionPatterns.some((pattern) => pattern.test(description)) || specificFields.trim().length < 80);
}

function hasCategoryMismatch(product) {
  const title = normalize(product.romanianTitle || "");
  const description = normalize(product.romanianDescription || "");
  const text = `${title} ${description}`;

  return categoryMismatchRules.find((rule) => {
    if (rule.category !== product.category) return false;
    return rule.terms.some((term) => text.includes(normalize(term)));
  });
}

function hasRealImage(product) {
  return Boolean(
    product.imageStatus === "verified_local" &&
      product.galleryImages?.length &&
      product.galleryImages.every((image) => image.verified && localFileExists(image.url))
  );
}

function hasNoBrokenDocuments(product) {
  return Object.values(product.documents || {}).every((url) => localFileExists(url));
}

function hasRichProductData(product) {
  const usefulSpecs = (product.romanianSpecifications || []).filter((spec) => {
    const label = normalize(spec.label);
    const value = normalize(spec.value);
    return !["categorie", "stadiu", "suport"].includes(label) && value.length > 1;
  });

  return Boolean(
    usefulSpecs.length > 0 ||
      (product.romanianFeatures || []).some((item) => normalize(item).length > 18) ||
      Object.keys(product.documents || {}).length > 0
  );
}

function scoreProduct(product) {
  const failures = [];
  const title = product.romanianTitle || "";
  const description = product.romanianDescription || "";
  const mismatch = hasCategoryMismatch(product);

  if (!title.trim() || title.trim().length < 8) failures.push("title_missing_or_too_short");
  if (hasBadRepeatedTitle(title)) failures.push("bad_title_repetition_or_artifact");
  if (hasEnglishProductType(title)) failures.push("english_product_type_in_title");
  if (hasLocalizationLeak(product)) failures.push("localization_leak");
  if (!description.trim() || description.trim().length < 120) failures.push("description_missing_or_too_short");
  if (hasGenericDescription(product)) failures.push("generic_template_description");
  if (mismatch) failures.push(`category_mismatch_${mismatch.reason}`);
  if (!hasRealImage(product)) failures.push("missing_or_unverified_real_image");
  if (!hasNoBrokenDocuments(product)) failures.push("broken_document");
  if (!hasRichProductData(product)) failures.push("missing_specs_features_or_documents");

  let score = 100;
  for (const failure of failures) {
    if (failure.includes("title")) score -= 28;
    else if (failure.includes("localization")) score -= 25;
    else if (failure.includes("description")) score -= 24;
    else if (failure.includes("category")) score -= 22;
    else if (failure.includes("image")) score -= 28;
    else if (failure.includes("document")) score -= 20;
    else if (failure.includes("specs")) score -= 22;
    else score -= 15;
  }

  return {
    score: Math.max(0, score),
    failures,
    strictPass: failures.length === 0,
  };
}

function increment(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function buildReport(summary, worstFailures, categoryCounts) {
  const categoryRows = Object.entries(categoryCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, values]) => `| ${category} | ${values.total} | ${values.strictPass || 0} | ${values.failed || 0} |`)
    .join("\n");

  const failureRows = Object.entries(summary.failureCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([failure, count]) => `| ${failure} | ${count} |`)
    .join("\n");

  return `# GIMA Quality Rollback Report

Generated: ${new Date().toISOString()}

## Emergency Rollback Summary

- Total products audited: ${summary.totalProducts}
- Products reverted from indexable to noindex: ${summary.revertedToNoindex}
- Product detail URLs removed from sitemap: ${summary.revertedToNoindex}
- Products passing strict gate: ${summary.strictPass}
- Products failing strict gate: ${summary.strictFail}
- Product hub/category pages: kept noindex during rollback
- Product data deleted: 0

## Strict Gate Rules

A product passes only when it has:

- Natural Romanian title
- No repeated nonsense characters, duplicated syllables, table artifacts or raw extraction noise
- No mixed English product type except approved technical terms
- Category sanity match
- Verified local real image
- Non-generic Romanian description
- At least one real specification, characteristic or local document
- No broken images or documents

## Failure Counts

| Failure | Products |
| --- | ---: |
${failureRows}

## Category Quality Distribution

| Category | Total | Strict pass | Failed |
| --- | ---: | ---: | ---: |
${categoryRows}

## Worst Failure Examples

${worstFailures
  .map(
    (product) => `- ${product.gimaCode || product.id}: "${product.romanianTitle || product.sourceProductName}" (${product.category}) - ${product.strictQualityFailures.join(", ")}`,
  )
  .join("\n")}

## Public Display Changes

- Product detail pages remain available only as noindex pages.
- Product detail URLs are removed from sitemap.
- Category and hub pages are noindex while catalog repair continues.
- Category grids show only products that pass the strict public display gate.
- Failed products remain in the local database for repair and review.

## SEO Protection Verdict

SEO quality is protected by rollback. Product indexation should remain disabled until a manual quality audit approves a smaller, verified set.
`;
}

function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const previousProducts = readPreviousProducts();
  const summary = {
    totalProducts: products.length,
    revertedToNoindex: 0,
    strictPass: 0,
    strictFail: 0,
    failureCounts: {},
  };
  const categoryCounts = {};

  for (const product of products) {
    if (!categoryCounts[product.category]) {
      categoryCounts[product.category] = { total: 0, strictPass: 0, failed: 0 };
    }
    categoryCounts[product.category].total += 1;

    if (product.reviewStatus === "indexable") {
      summary.revertedToNoindex += 1;
    }

    const result = scoreProduct(product);
    product.strictQualityScore = result.score;
    product.strictQualityStatus = result.strictPass ? "pass" : "fail";
    product.strictQualityFailures = result.failures;
    product.reviewStatus = product.reviewStatus === "excluded" ? "excluded" : "image_verified";
    product.indexableAt = null;

    if (result.strictPass) {
      product.catalogStatus = "ready_for_publish";
      product.publicDisplayReady = true;
      summary.strictPass += 1;
      categoryCounts[product.category].strictPass += 1;
    } else {
      product.catalogStatus = product.catalogStatus === "excluded" ? "excluded" : "needs_review";
      product.publicDisplayReady = false;
      summary.strictFail += 1;
      categoryCounts[product.category].failed += 1;
      for (const failure of result.failures) increment(summary.failureCounts, failure);
    }
  }

  const worstFailures = products
    .filter((product) => product.strictQualityStatus === "fail")
    .sort((a, b) => (a.strictQualityScore || 0) - (b.strictQualityScore || 0))
    .slice(0, 30);

  if (summary.revertedToNoindex === 0 && previousProducts.length) {
    summary.revertedToNoindex = previousProducts.filter((product) => product.reviewStatus === "indexable").length;
  }

  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
  fs.writeFileSync(reportPath, buildReport(summary, worstFailures, categoryCounts));

  console.log(JSON.stringify({
    ...summary,
    failureCounts: Object.fromEntries(Object.entries(summary.failureCounts).sort((a, b) => b[1] - a[1])),
    reportPath: path.relative(root, reportPath),
  }, null, 2));
}

main();

function readPreviousProducts() {
  try {
    const raw = execSync("git show HEAD:data/product-catalog/products.json", {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 80 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
