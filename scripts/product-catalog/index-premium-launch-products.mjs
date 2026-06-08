import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "product-premium-indexation-report.md");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const indexedAt = new Date().toISOString();

let madeIndexable = 0;
let keptNoindex = 0;
let correctedHeldBack = 0;
const categoryCounts = {};
const sampleUrls = [];

for (const product of products) {
  const isLaunchPremium =
    product.masterpieceStatus === "premium_ready" &&
    product.launchRepairStatus === "passed" &&
    product.publicDisplayReady === true &&
    !(product.deployReadinessBlockers || []).length;

  if (isLaunchPremium) {
    if (product.reviewStatus !== "indexable") madeIndexable += 1;
    product.reviewStatus = "indexable";
    product.indexableAt = product.indexableAt || indexedAt;
    product.indexationBatch = "premium-gima-launch-4348";
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    if (sampleUrls.length < 25) sampleUrls.push(`/produse/${product.slug}`);
  } else {
    if (product.reviewStatus === "indexable") correctedHeldBack += 1;
    product.reviewStatus = product.reviewStatus === "indexable" ? "reviewed" : product.reviewStatus;
    product.indexableAt = product.reviewStatus === "indexable" ? product.indexableAt : null;
    keptNoindex += 1;
  }
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

const totalIndexable = products.filter((product) => product.reviewStatus === "indexable").length;
const heldBackIndexable = products.filter((product) => product.reviewStatus === "indexable" && product.launchRepairStatus !== "passed").length;
const categoryRows = Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([category, count]) => `| ${category} | ${count} |`)
  .join("\n");

const report = `# Premium GIMA Product Indexation Report

Generated: ${indexedAt}

## Summary

| Metric | Result |
| --- | ---: |
| Products made indexable in this run | ${madeIndexable.toLocaleString("en-US")} |
| Total indexable products | ${totalIndexable.toLocaleString("en-US")} |
| Products kept noindex | ${keptNoindex.toLocaleString("en-US")} |
| Held-back products corrected from indexable | ${correctedHeldBack.toLocaleString("en-US")} |
| Held-back indexable products after run | ${heldBackIndexable.toLocaleString("en-US")} |

## Category Distribution

| Category | Indexable products |
| --- | ---: |
${categoryRows}

## Sitemap

The main sitemap route is below the 50,000 URL sitemap limit. Splitting is not required for 4,348 product URLs.

## Sample Product URLs

${sampleUrls.map((url) => `- ${url}`).join("\n")}
`;

fs.writeFileSync(reportPath, report);

console.log(
  JSON.stringify(
    {
      madeIndexable,
      totalIndexable,
      keptNoindex,
      correctedHeldBack,
      heldBackIndexable,
      categoryCounts,
      reportPath,
    },
    null,
    2,
  ),
);
