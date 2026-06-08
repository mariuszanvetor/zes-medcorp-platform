import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "product-final-launch-repair-report.md");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const generatedAt = new Date().toISOString();

const before = {
  premium: products.filter((product) => product.masterpieceStatus === "premium_ready").length,
  indexable: products.filter((product) => product.reviewStatus === "indexable").length,
  heldBack: products.filter((product) => product.launchAuditStatus === "held_back").length,
};

const allowedEnglish = [
  "CE",
  "FDA",
  "ISO",
  "Bluetooth",
  "WiFi",
  "PACS",
  "RIS",
  "DICOM",
  "USB",
  "LED",
  "LCD",
  "ECG",
  "EKG",
  "SpO2",
  "AED",
  "IVD",
  "PVC",
  "ABS",
  "GIMA",
  "Omron",
  "Riester",
  "Sony",
  "Tuttnauer",
  "Edan",
  "Mindray",
  "Chison",
  "Philips",
  "Zoll",
  "Braun",
  "Ethicon",
  "Vicryl",
  "Cherokee",
  "Checkme",
  "Foley",
  "Nelaton",
];

const englishLeakPattern =
  /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|rolls|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional|nurse|watch|shoes|catheter|light|lamp|protective|surgical|furniture|physiotherapy|gynecology|sterilization|probe|sensor|cuff|gowns|gown|size|wrist|channel|patient|headlight|colour|deficiency|plates|paediatric|connector|mouthpiece|soap|sachet|bottle|cover|integrated|stand alone|wireless|blood|glucose|urine|drugs|cassette|strip|self|facemask|height|seal|absorbable|sutures|gauge|braided|pouches|adjustable|hydraulic|holder|tables|lifter|load|variable|treatment|rails|printer|cohesive|synthetic|stick|lens|dermatoscope|otoscope|sphygmomanometer|oxygen|cylinders|litres|rechargeable|finger|oximeter|needs|mobile|convenient|style|curettes|microscope|reduced|newborn|diagnostic kit|microfoam|micropore)\b/i;

const weakSlugPattern =
  /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|rolls|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional|medical-furniture|operator-protection|surgical-instruments|colour|wireless|glucose|patient|gowns|probe|cuff|sterilization|synthetic|stick|lens|dermatoscope|otoscope|sphygmomanometer|oxygen|cylinders|litres|rechargeable|finger|oximeter|needs|mobile|convenient|style|curettes|microscope|reduced)\b/i;

const categoryOnlyTitlePattern =
  /^(mobilier medical|instrumentar chirurgical|protectie operator|fizioterapie|ginecologie|sterilizare|lampi medicale|produs|echipament diagnostic|urgenta|monitorizare|dezinfectie|consumabile|laborator \/ ivd|ingrijire pacient|baterie|cutie cu \d+)$/i;

function stripDiacritics(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function withoutAllowedEnglish(value) {
  let text = ` ${stripDiacritics(value).toLowerCase()} `;
  for (const term of allowedEnglish) text = text.replace(new RegExp(`\\b${stripDiacritics(term).toLowerCase()}\\b`, "g"), " ");
  return text;
}

function hasEnglishLeak(value) {
  return englishLeakPattern.test(withoutAllowedEnglish(value));
}

function publicPathExists(url) {
  if (!url || /^https?:\/\//i.test(url)) return false;
  const clean = String(url).split(/[?#]/)[0].replace(/^\/+/, "");
  return fs.existsSync(path.join(root, "public", clean));
}

function getSpecificationCount(product) {
  const flat = product.romanianSpecifications?.length || 0;
  const grouped = (product.specificationGroups || []).reduce((sum, group) => sum + (group.items?.length || 0), 0);
  return Math.max(flat, grouped);
}

function getRelatedCount(product) {
  const groups = product.relatedProductGroups || {};
  return new Set([
    ...(product.relatedProductCodes || []),
    ...(groups.similarProducts || []),
    ...(groups.premiumAlternatives || []),
    ...(groups.budgetAlternatives || []),
    ...(groups.compatibleAccessories || []),
    ...(groups.frequentlyRequestedTogether || []),
    ...(groups.allRelevantProducts || []),
  ]).size;
}

function auditProduct(product) {
  const issues = [];
  const title = product.romanianTitle || "";
  const slug = product.slug || "";
  const specCount = getSpecificationCount(product);
  const relatedCount = getRelatedCount(product);
  const serviceCount = product.relatedServices?.length || 0;
  const internalLinkCount =
    (product.relatedCategoryLinks?.length || 0) +
    (product.relatedSolutionLinks?.length || 0) +
    (product.relatedKnowledgeLinks?.length || 0) +
    (product.relatedMaintenanceLinks?.length || 0) +
    (product.buyerJourneyLinks?.length || 0);

  if (!title || title.length < 8 || categoryOnlyTitlePattern.test(stripDiacritics(title))) issues.push("weak_title");
  if (/^[\W\d\sÂ°Ã˜xXhHmM.,-]+$/.test(title) || /\)\s+or\s+\d+/i.test(title) || /\bis reduced\b/i.test(title)) issues.push("source_artifact_title");
  if (hasEnglishLeak(title)) issues.push("english_title_leak");
  if (!slug || slug.length < 10 || weakSlugPattern.test(slug) || hasEnglishLeak(slug)) issues.push("weak_slug");
  if (!product.romanianDescription || product.romanianDescription.length < 220 || hasEnglishLeak(product.romanianDescription)) issues.push("weak_description");
  if (!product.romanianApplications?.length) issues.push("missing_applications");
  if (!product.romanianBenefits?.length) issues.push("missing_benefits");
  if (specCount < 3) issues.push("low_specification_count");
  if (!product.galleryImages?.length || !product.galleryImages.some((image) => publicPathExists(image.url))) issues.push("missing_or_broken_image");
  for (const image of product.galleryImages || []) if (!publicPathExists(image.url)) issues.push("broken_image");
  for (const doc of Object.values(product.documents || {}).filter(Boolean)) if (!publicPathExists(doc)) issues.push("broken_document");
  if (relatedCount < 4) issues.push("low_related_products");
  if (serviceCount < 2) issues.push("low_related_services");
  if (internalLinkCount < 4) issues.push("low_internal_link_coverage");
  if (!product.seoAuthorityScore || product.seoAuthorityScore < 8.5) issues.push("seo_authority_below_target");
  return [...new Set(issues)];
}

const heldBack = [];
const passed = [];

for (const product of products.filter((item) => item.masterpieceStatus === "premium_ready")) {
  const issues = auditProduct(product);
  if (issues.length) {
    product.masterpieceStatus = "source_limited";
    product.publicDisplayReady = false;
    product.catalogStatus = "needs_review";
    product.reviewStatus = product.reviewStatus === "indexable" ? "reviewed" : product.reviewStatus;
    product.deployReadinessBlockers = issues;
    product.launchRepairStatus = "held_back";
    product.launchRepairHeldBackAt = generatedAt;
    product.launchRepairReason = "Held back from premium launch because the product did not pass strict final launch audit criteria.";
    heldBack.push({ code: product.gimaCode || product.id, title: product.romanianTitle || product.title || "", issues });
  } else {
    product.deployReadinessBlockers = [];
    product.launchRepairStatus = "passed";
    product.launchRepairPassedAt = generatedAt;
    passed.push(product);
  }
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

const afterPremium = products.filter((product) => product.masterpieceStatus === "premium_ready");
const issueCounts = {};
for (const item of heldBack) for (const issue of item.issues) issueCounts[issue] = (issueCounts[issue] || 0) + 1;
const issueRows = Object.entries(issueCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([issue, count]) => `| ${issue} | ${count} |`)
  .join("\n");
const heldBackRows = heldBack
  .slice(0, 250)
  .map((item) => `| ${item.code} | ${item.title.replace(/\|/g, "/")} | ${item.issues.join(", ")} |`)
  .join("\n");

const report = `# Product Final Launch Repair Report

Generated: ${generatedAt}

## Summary

| Metric | Before repair | After repair |
| --- | ---: | ---: |
| Premium products | ${before.premium.toLocaleString("en-US")} | ${afterPremium.length.toLocaleString("en-US")} |
| Indexable products | ${before.indexable} | ${products.filter((product) => product.reviewStatus === "indexable").length} |
| Products held back by launch repair | ${before.heldBack} | ${heldBack.length.toLocaleString("en-US")} |
| Products passing strict launch repair gate | n/a | ${passed.length.toLocaleString("en-US")} |

## Repair Action

Products that passed strict title, slug, language, image, document, related-link and specification checks remained in the premium launch pool. Products that still showed English/source fragments, weak slugs, source-artifact titles, low specification depth or missing launch requirements were held back as source-limited / needs-review rather than being forced into the launch batch.

## Held-Back Issue Distribution

| Issue | Products |
| --- | ---: |
${issueRows || "| none | 0 |"}

## Held-Back Product Sample

| Code | Title | Reasons |
| --- | --- | --- |
${heldBackRows || "| none | none | none |"}

## Final Audit

Run after repair:

- node scripts/product-catalog/premium-7642-seo-authority.mjs
- node scripts/product-catalog/final-premium-launch-audit.mjs
- npm run build -- --webpack
- npm run content:check
- npm run audit:seo
`;

fs.writeFileSync(reportPath, report);
console.log(JSON.stringify({ before, afterPremium: afterPremium.length, passed: passed.length, heldBack: heldBack.length, issueCounts, reportPath }, null, 2));
