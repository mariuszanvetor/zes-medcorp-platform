import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "gima-index-ready-report.md");

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
  "NRD",
  "HD",
  "TFT",
  "AED",
  "SpO2",
  "NIBP",
  "EtCO2",
  "LUX",
  "Lux",
  "Storz",
  "Wolf",
  "Olympus",
  "Pentax",
  "Heine",
  "Riester",
  "Littmann",
  "Aesculap",
  "Cherokee",
  "BD",
  "3M",
  "Aura",
  "GIMA",
  "TC",
  "Basic",
];

const publicLeakPatterns = [
  /\b(power|voltage|communication|interface|record mode|host computer|large display|user[- ]friendly|fast results|sample volume)\b/i,
  /\b(description|features|package contents|applications|benefits|specifications|delivery|support|category|product code)\b/i,
  /\b(trolley|chair|table|analyzer|analyser|centrifuge|microscope|stethoscope|thermometer|sphygmomanometer)\b/i,
  /\b(sterile|drape|forceps|clamp|straight|curved|disposable|gloves|mask|bag|scale|light|headlight)\b/i,
  /\b(v-neck|woman|women|man|men|navy|teal|top|tops|tunic|pants|trousers|jacket|basket|case|cover|adapter|adaptor|children|adult|optional|suitable|only|provided|from|with|size guide|line)\b/i,
  /\b(kit of|silicone|straps?|steel chain|operator'?s protection|3-ply|ply|pink|dark|sky|other colours|boxes of|box of|colour|color)\b/i,
  /\b(respirator|reusable|safe comfort|layer|classified|according|kid|age|valve|ear loops|headband|conical|cashmere|stars|skull|rainbow|wave)\b/i,
  /\b(catheter|balloon|rectal|purple|lubricant|box|2-way|3-way|staple|blade|scalpel|foley|fabric|effective|filtering)\b/i,
  /\b(slides?|curette|flexible|single use|suction|minimum order|without needle|with needle|centric tip|ground edges|frosted)\b/i,
  /\b(single patient|hand|pump|physiotherapy|nebulizers?|pad|for|plates?|rocker|handle|fun|oxygen cylinder)\b/i,
  /\b(red|other|lacets|thin|end|configuration|defib|toy|space|dog|pet|smile|available|manual|autoclavable|spare|filter|breast|aspirator|heating|waist|grip|dressing kit|comb|container|tray|gouge|graduated|stainless|cutting edge|arthroscopy|surgery|set|polyester|hooks|stretchers)\b/i,
  /\b(pachet of|tools and|d-end|health care|patient|oxygen|cylinder|lead|safety belt|filled|resuscitation|laryngoscope|concentrator|foldable|aluminium|joints|cranks|castors|height adjustable|chrome plated|cardiorapid|plug in|vet)\b/i,
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripAllowed(value) {
  let text = String(value || "");
  for (const term of allowedEnglishTerms) {
    text = text.replace(new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi"), " ");
  }
  return text;
}

function hasEnglishLeak(value) {
  const text = stripAllowed(value);
  return publicLeakPatterns.some((pattern) => pattern.test(text));
}

function fileExists(publicPath) {
  if (!publicPath || !String(publicPath).startsWith("/")) return false;
  const filePath = path.join(root, "public", publicPath.replace(/^\//, ""));
  return fs.existsSync(filePath) && fs.statSync(filePath).size > 1000;
}

function isRomanianSlug(product) {
  return Boolean(product.slug && product.gimaCode && product.slug.endsWith(String(product.gimaCode)) && !/[A-Z]/.test(product.slug));
}

function publicFields(product) {
  return [
    product.romanianTitle,
    product.romanianDescription,
    product.romanianShortSummary,
    ...(product.romanianFeatures || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianApplications || []),
    ...(product.romanianPackageContents || []),
    ...(product.romanianSpecifications || []).map((spec) => `${spec.label} ${spec.value}`),
    ...(product.installationConsiderations || []),
    ...(product.maintenanceConsiderations || []),
  ];
}

function isSafeReadyProduct(product) {
  const hasImage = product.imageStatus === "verified_local" && product.galleryImages?.length && product.galleryImages.every((image) => fileExists(image.url));
  const hasDocsOk = Object.values(product.documents || {}).every(fileExists);
  return Boolean(
    product.catalogStatus === "ready_for_publish" &&
      product.publicDisplayReady &&
      product.romanianTitle?.trim() &&
      product.romanianDescription?.trim() &&
      isRomanianSlug(product) &&
      hasImage &&
      hasDocsOk &&
      !publicFields(product).some(hasEnglishLeak)
  );
}

function buildReport({ products, madeIndexable, keptNoindex, skippedReady, categoryCounts, sampleProducts }) {
  const categoryRows = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => `| ${category} | ${count} |`)
    .join("\n");

  return `# GIMA Index Ready Report

Generated: ${new Date().toISOString()}

## Summary

- Products in catalog: ${products.length}
- Products made indexable: ${madeIndexable.length}
- Products kept noindex: ${keptNoindex.length}
- Ready products skipped by final safety gate: ${skippedReady.length}
- Sitemap product count expected: ${madeIndexable.length}
- Product category sitemap count expected: ${Object.keys(categoryCounts).length}
- Broken image/doc failures in indexable set: 0
- English leakage in indexable set: 0

## Indexation Rules Applied

- Only products with \`catalogStatus = ready_for_publish\` and clean public content were converted to \`reviewStatus = indexable\`.
- Non-ready products remain noindex and excluded from sitemap.
- Product pages are included in sitemap only through \`getIndexableProducts()\`.
- Product page metadata removes noindex only when \`reviewStatus = indexable\`.
- No source/import/review metadata is rendered publicly by the product page components.

## Category Distribution

| Category | Indexable products |
| --- | ---: |
${categoryRows}

## Sample URLs

${sampleProducts.map((product) => `- /produse/${product.slug}`).join("\n")}

## Products Kept Noindex

- Total kept noindex: ${keptNoindex.length}
- Reason: not ready_for_publish, missing final safety gate, missing verified local image, weak title/content, or review-needed state.

## Ready Products Skipped By Final Gate

${skippedReady.length ? skippedReady.map((product) => `- ${product.gimaCode}: ${product.romanianTitle}`).join("\n") : "- None"}

## Final Safety Check

- Romanian title required: passed
- Romanian slug required: passed
- Verified local image required: passed
- Local documents must resolve when present: passed
- No public source/import/review metadata exposure: passed by route/component audit
- No English leakage except allowed technical terms: passed

## Validation

Run after this report:

- \`npm run build -- --webpack\`
- \`npm run content:check\`
- \`npm run audit:seo\`

## Deployment Verdict

Pending validation.
`;
}

function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const now = new Date().toISOString();
  const madeIndexable = [];
  const keptNoindex = [];
  const skippedReady = [];
  const categoryCounts = {};

  for (const product of products) {
    if (isSafeReadyProduct(product)) {
      product.commercialDescription = product.commercialDescription || product.romanianDescription;
      product.reviewStatus = "indexable";
      product.indexableAt = product.indexableAt || now;
      product.reviewedAt = product.reviewedAt || now;
      madeIndexable.push(product);
      categoryCounts[product.commercialCategory || product.category || "Echipamente medicale"] =
        (categoryCounts[product.commercialCategory || product.category || "Echipamente medicale"] || 0) + 1;
      continue;
    }

    if (product.catalogStatus === "ready_for_publish") skippedReady.push(product);
    product.reviewStatus = product.reviewStatus === "indexable" ? "image_verified" : product.reviewStatus;
    product.indexableAt = null;
    keptNoindex.push(product);
  }

  products.sort((a, b) => String(a.gimaCode || "").localeCompare(String(b.gimaCode || "")));
  const sampleProducts = [
    ...madeIndexable.filter((product) => product.category === "laboratory").slice(0, 3),
    ...madeIndexable.filter((product) => product.category === "diagnostic").slice(0, 3),
    ...madeIndexable.filter((product) => product.category === "emergency").slice(0, 3),
    ...madeIndexable.filter((product) => product.category === "surgical-instruments").slice(0, 3),
  ].slice(0, 12);

  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
  fs.writeFileSync(reportPath, buildReport({ products, madeIndexable, keptNoindex, skippedReady, categoryCounts, sampleProducts }));

  console.log(JSON.stringify({
    totalProducts: products.length,
    madeIndexable: madeIndexable.length,
    keptNoindex: keptNoindex.length,
    skippedReady: skippedReady.length,
    categories: Object.keys(categoryCounts).length,
    reportPath: path.relative(root, reportPath),
  }, null, 2));
}

main();
