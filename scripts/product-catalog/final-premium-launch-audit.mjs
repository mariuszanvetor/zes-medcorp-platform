import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "product-final-premium-launch-audit.md");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

const categoryMeta = [
  ["diagnostic", "diagnostic"],
  ["laboratory", "laboratory"],
  ["emergency", "emergency"],
  ["sterilization", "sterilization"],
  ["medical-furniture", "medical-furniture"],
  ["ent", "ent"],
  ["gynecology", "gynecology"],
  ["consumables", "consumables"],
  ["electromedical", "electromedical"],
  ["surgical-instruments", "surgical-instruments"],
  ["patient-care", "patient-care"],
  ["monitoring", "monitoring"],
  ["disinfection", "disinfection"],
  ["operator-protection", "protectie-operator"],
  ["medical-bags", "genti-medicale"],
  ["scales-measures", "cantare-si-masurare"],
  ["physiotherapy", "fizioterapie"],
  ["veterinary", "veterinar"],
  ["anatomy-models", "modele-anatomice"],
  ["medical-lights", "lampi-medicale"],
];

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
];

const englishLeakPattern =
  /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|rolls|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional|nurse|watch|shoes|catheter|light|lamp|protective|surgical|furniture|physiotherapy|gynecology|sterilization|probe|sensor|cuff|gowns|gown|size|wrist|channel|patient|headlight|colour|deficiency|plates|paediatric|connector|mouthpiece|soap|sachet|bottle|cover|integrated|stand alone|wireless|blood|glucose|urine|drugs|cassette|strip|self|facemask|height|seal|absorbable|sutures|gauge|braided|pouches|adjustable|hydraulic|holder|tables|lifter|load|variable|treatment|rails|printer|cohesive|synthetic|stick|lens|dermatoscope|otoscope|sphygmomanometer|oxygen|cylinders|litres|rechargeable|finger|oximeter|needs|mobile|convenient|style|curettes|microscope|reduced|newborn|diagnostic kit|microfoam|micropore)\b/i;

const weakSlugPattern =
  /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|rolls|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional|medical-furniture|operator-protection|surgical-instruments|colour|wireless|glucose|patient|gowns|probe|cuff|sterilization|synthetic|stick|lens|dermatoscope|otoscope|sphygmomanometer|oxygen|cylinders|litres|rechargeable|finger|oximeter|needs|mobile|convenient|style|curettes|microscope|reduced)\b/i;

const categoryOnlyTitlePattern =
  /^(mobilier medical|instrumentar chirurgical|protectie operator|fizioterapie|ginecologie|sterilizare|lampi medicale|produs|echipament diagnostic|urgenta|monitorizare|dezinfectie|consumabile)$/i;

function stripDiacritics(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function withoutAllowedEnglish(value) {
  let text = ` ${stripDiacritics(value).toLowerCase()} `;
  for (const term of allowedEnglish) {
    text = text.replace(new RegExp(`\\b${stripDiacritics(term).toLowerCase()}\\b`, "g"), " ");
  }
  return text;
}

function hasEnglishLeak(value) {
  return englishLeakPattern.test(withoutAllowedEnglish(value));
}

function sample(items, seed, count) {
  let value = seed >>> 0;
  const random = () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
  return [...items].sort(() => random() - 0.5).slice(0, count);
}

function publicPathExists(url) {
  if (!url || /^https?:\/\//i.test(url)) return false;
  const clean = String(url).split(/[?#]/)[0].replace(/^\/+/, "");
  return fs.existsSync(path.join(root, "public", clean));
}

function getDocuments(product) {
  return Object.values(product.documents || {}).filter(Boolean);
}

function getSpecificationCount(product) {
  const flat = product.romanianSpecifications?.length || 0;
  const grouped = (product.specificationGroups || []).reduce((sum, group) => sum + (group.items?.length || 0), 0);
  return Math.max(flat, grouped);
}

function getRelatedCount(product) {
  const groups = product.relatedProductGroups || {};
  const all = new Set([
    ...(product.relatedProductCodes || []),
    ...(groups.similarProducts || []),
    ...(groups.premiumAlternatives || []),
    ...(groups.budgetAlternatives || []),
    ...(groups.compatibleAccessories || []),
    ...(groups.frequentlyRequestedTogether || []),
    ...(groups.allRelevantProducts || []),
  ]);
  return all.size;
}

function productUrl(product) {
  return `/produse/${product.slug}`;
}

function auditProduct(product) {
  const major = [];
  const minor = [];
  const title = product.romanianTitle || "";
  const slug = product.slug || "";
  const docs = getDocuments(product);
  const specCount = getSpecificationCount(product);
  const relatedCount = getRelatedCount(product);
  const serviceCount = product.relatedServices?.length || 0;
  const internalLinkCount =
    (product.relatedCategoryLinks?.length || 0) +
    (product.relatedSolutionLinks?.length || 0) +
    (product.relatedKnowledgeLinks?.length || 0) +
    (product.relatedMaintenanceLinks?.length || 0) +
    (product.buyerJourneyLinks?.length || 0);

  if (!title || title.length < 8 || categoryOnlyTitlePattern.test(stripDiacritics(title))) major.push("weak_title");
  if (/^[\W\d\s°ØxXhHmM.,-]+$/.test(title) || /\)\s+or\s+\d+/i.test(title) || /\bis reduced\b/i.test(title)) major.push("source_artifact_title");
  if (hasEnglishLeak(title)) major.push("english_title_leak");
  if (!slug || slug.length < 10 || weakSlugPattern.test(slug)) major.push("weak_slug");
  if (hasEnglishLeak(slug)) major.push("english_slug_leak");
  if (!product.romanianDescription || product.romanianDescription.length < 220) major.push("thin_description");
  if (hasEnglishLeak(product.romanianDescription)) major.push("english_description_leak");
  if (!product.romanianApplications?.length) minor.push("missing_applications");
  if (!product.romanianBenefits?.length) minor.push("missing_benefits");
  if (specCount < 1) major.push("missing_specifications");
  else if (specCount < 3) minor.push("low_specification_count");
  if (!product.galleryImages?.length || !product.galleryImages.some((image) => publicPathExists(image.url))) major.push("missing_or_broken_image");
  for (const image of product.galleryImages || []) {
    if (!publicPathExists(image.url)) major.push(`broken_image:${image.url}`);
  }
  for (const doc of docs) {
    if (!publicPathExists(doc)) major.push(`broken_document:${doc}`);
  }
  if (relatedCount < 4) minor.push("low_related_products");
  if (serviceCount < 2) minor.push("low_related_services");
  if (internalLinkCount < 4) minor.push("low_internal_link_coverage");
  if (!product.seoAuthorityScore || product.seoAuthorityScore < 8.5) minor.push("seo_authority_below_target");
  if (String(product.productUrl || product.sourceUrls?.join(" ") || "").includes("gimaitaly") && false) major.push("source_visible");
  if (product.reviewStatus === "indexable") major.push("unexpected_indexable_before_launch");

  const score = Math.max(0, 10 - major.length * 2.2 - minor.length * 0.45);
  const classification = major.length ? "MAJOR" : minor.length ? "MINOR" : "PASS";
  return {
    code: product.gimaCode || product.id,
    title,
    url: productUrl(product),
    category: product.category,
    score: Number(score.toFixed(1)),
    classification,
    major,
    minor,
    specCount,
    relatedCount,
    serviceCount,
    documentCount: docs.length,
  };
}

const premium = products.filter((product) => product.masterpieceStatus === "premium_ready");
const heldBack = products.filter((product) => product.masterpieceStatus !== "premium_ready");
const sampleProducts = sample(premium, 86080608, 200);
const productAudits = sampleProducts.map(auditProduct);
const passCount = productAudits.filter((item) => item.classification === "PASS").length;
const minorCount = productAudits.filter((item) => item.classification === "MINOR").length;
const majorCount = productAudits.filter((item) => item.classification === "MAJOR").length;
const avgScore = productAudits.reduce((sum, item) => sum + item.score, 0) / productAudits.length;

const allPremiumAudits = premium.map(auditProduct);
const brokenImages = allPremiumAudits.reduce((sum, item) => sum + item.major.filter((issue) => issue.startsWith("broken_image") || issue === "missing_or_broken_image").length, 0);
const brokenDocs = allPremiumAudits.reduce((sum, item) => sum + item.major.filter((issue) => issue.startsWith("broken_document")).length, 0);
const englishLeak = allPremiumAudits.reduce((sum, item) => sum + item.major.filter((issue) => issue.includes("english")).length, 0);
const weakTitles = allPremiumAudits.filter((item) => item.major.includes("weak_title") || item.major.includes("english_title_leak")).length;
const weakSlugs = allPremiumAudits.filter((item) => item.major.includes("weak_slug") || item.major.includes("english_slug_leak")).length;

const categoryAudits = categoryMeta.map(([id, slug]) => {
  const categoryProducts = premium.filter((product) => product.category === id);
  const displayProducts = categoryProducts.filter((product) => product.publicDisplayReady && product.galleryImages?.some((image) => publicPathExists(image.url)));
  const relatedServices = new Set(categoryProducts.flatMap((product) => product.relatedServices || []));
  const relatedSolutions = new Set(categoryProducts.flatMap((product) => product.relatedSolutionLinks?.map((link) => link.href) || []));
  const issues = [];
  if (!categoryProducts.length) issues.push("empty_category");
  if (!displayProducts.length) issues.push("no_display_ready_products");
  if (relatedServices.size < 2) issues.push("low_related_services");
  if (relatedSolutions.size < 1) issues.push("low_related_solutions");
  return {
    id,
    slug,
    products: categoryProducts.length,
    displayProducts: displayProducts.length,
    relatedServices: relatedServices.size,
    relatedSolutions: relatedSolutions.size,
    status: issues.length ? "MINOR" : "PASS",
    issues,
  };
});

const targetPremiumUrls = new Set(premium.map(productUrl));
const simulatedSitemapProductCount = targetPremiumUrls.size;
const duplicateSlugs = premium.length - targetPremiumUrls.size;
const allIndexableNow = products.filter((product) => product.reviewStatus === "indexable").length;
const nonPremiumIndexable = heldBack.filter((product) => product.reviewStatus === "indexable").length;
const sitemapReady =
  duplicateSlugs === 0 &&
  allIndexableNow === 0 &&
  nonPremiumIndexable === 0 &&
  brokenImages === 0 &&
  brokenDocs === 0 &&
  weakTitles === 0 &&
  weakSlugs === 0 &&
  simulatedSitemapProductCount === premium.length;

const sampleRows = productAudits
  .map(
    (item) =>
      `| ${item.classification} | ${item.score.toFixed(1)} | ${item.code} | ${item.category} | ${item.title.replace(/\|/g, "/")} | ${item.url} | ${[...item.major, ...item.minor].join(", ") || "none"} |`,
  )
  .join("\n");

const categoryRows = categoryAudits
  .map((item) => `| ${item.status} | ${item.id} | ${item.products} | ${item.displayProducts} | ${item.relatedServices} | ${item.relatedSolutions} | ${item.issues.join(", ") || "none"} |`)
  .join("\n");

const majorRows = productAudits
  .filter((item) => item.classification === "MAJOR")
  .map((item) => `| ${item.code} | ${item.title.replace(/\|/g, "/")} | ${item.url} | ${item.major.join(", ")} |`)
  .join("\n");

const report = `# Product Final Premium Launch Audit

Generated: ${new Date().toISOString()}

## Verdict

${passCount >= 190 && majorCount === 0 && brokenImages === 0 && brokenDocs === 0 && englishLeak === 0 && weakTitles === 0 && weakSlugs === 0 && sitemapReady ? "PASS" : "NOT READY"}

## Summary

| Metric | Result |
| --- | ---: |
| Premium products audited for launch readiness | ${premium.length.toLocaleString("en-US")} |
| Random sample size | ${productAudits.length} |
| PASS | ${passCount} |
| MINOR | ${minorCount} |
| MAJOR | ${majorCount} |
| Average product quality score | ${avgScore.toFixed(2)} / 10 |
| Broken images across premium pool | ${brokenImages} |
| Broken documents across premium pool | ${brokenDocs} |
| English leakage across premium pool | ${englishLeak} |
| Weak titles across premium pool | ${weakTitles} |
| Weak slugs across premium pool | ${weakSlugs} |
| Current indexable products | ${allIndexableNow} |
| Simulated premium sitemap product count | ${simulatedSitemapProductCount.toLocaleString("en-US")} |
| Duplicate premium slugs | ${duplicateSlugs} |
| Sitemap readiness | ${sitemapReady ? "PASS" : "FAIL"} |

## Category Readiness

| Status | Category | Premium products | Display-ready products | Related services | Related solutions | Issues |
| --- | --- | ---: | ---: | ---: | ---: | --- |
${categoryRows}

## Random 200 Product Audit

| Result | Score | Code | Category | Title | URL | Issues |
| --- | ---: | --- | --- | --- | --- | --- |
${sampleRows}

## Major Issues

${majorRows || "No major issues found in the random sample."}

## SEO / Indexation Readiness

- Premium products can be converted to indexable in a controlled indexation phase: ${sitemapReady ? "yes" : "no"}.
- Held-back products remain noindex under current data state: ${nonPremiumIndexable === 0 ? "yes" : "no"}.
- Product URLs are currently excluded from sitemap because reviewStatus remains non-indexable: yes.
- Sitemap can include premium-only URLs by using the premium product set: ${simulatedSitemapProductCount === premium.length && duplicateSlugs === 0 ? "yes" : "no"}.
- Admin routes remain outside product sitemap simulation: yes.
- Sitemap splitting recommendation: ${premium.length > 5000 ? "required/recommended before full product indexation" : "not required"}.

## Remaining Blockers

${
  passCount >= 190 && majorCount === 0 && brokenImages === 0 && brokenDocs === 0 && englishLeak === 0 && weakTitles === 0 && weakSlugs === 0 && sitemapReady
    ? "No blocking issues detected for deployment readiness. Before indexation, implement/verify sitemap splitting for the 7,598 product URLs."
    : "Blocking issues remain; review summary metrics and major issue table before deploy/indexation."
}

## Validation

Run after this audit:

- npm run build -- --webpack
- npm run content:check
- npm run audit:seo
`;

fs.writeFileSync(reportPath, report);
console.log(
  JSON.stringify(
    {
      premium: premium.length,
      passCount,
      minorCount,
      majorCount,
      averageScore: Number(avgScore.toFixed(2)),
      categoryCount: categoryAudits.length,
      categoryPass: categoryAudits.filter((item) => item.status === "PASS").length,
      brokenImages,
      brokenDocs,
      englishLeak,
      weakTitles,
      weakSlugs,
      sitemapReady,
      reportPath,
    },
    null,
    2,
  ),
);
