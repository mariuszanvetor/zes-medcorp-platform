import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data/product-catalog/products.json");
const reportPath = path.join(root, "docs/product-public-display-reset-report.md");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

let changed = 0;
let indexableReset = 0;
const examples = [];

for (const product of products) {
  if (product.reviewStatus === "indexable") {
    product.reviewStatus = "reviewed";
    product.indexableAt = null;
    indexableReset += 1;
  }

  if (product.publicDisplayReady || product.catalogStatus === "ready_for_publish" || product.strictQualityStatus === "pass") {
    if (examples.length < 80) {
      examples.push({
        code: product.gimaCode,
        title: product.romanianTitle,
        slug: product.slug,
        previousStatus: product.catalogStatus,
      });
    }

    product.publicDisplayReady = false;
    product.catalogStatus = "needs_review";
    product.strictQualityStatus = "fail";
    product.strictQualityScore = Math.min(product.strictQualityScore || 0, 79);
    product.strictQualityFailures = Array.from(
      new Set([...(product.strictQualityFailures || []), "public_display_disabled_until_manual_review"]),
    );
    changed += 1;
  }
}

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);

const report = [
  "# Product Public Display Reset Report",
  "",
  "This safety pass disables public display for automatically repaired GIMA products after live QA found source-derived titles inside supposedly premium pools.",
  "",
  "## Result",
  "",
  `- Products changed to needs_review/no public display: ${changed}`,
  `- Products reset from indexable: ${indexableReset}`,
  "- Product indexation remains disabled.",
  "- Product detail routes remain noindex.",
  "- Product URLs remain excluded from sitemap.",
  "",
  "## Rationale",
  "",
  "Automated product quality scores were not reliable enough for public category promotion. Product data is preserved for future manual/structured repair, but public grids must not promote unverified pages.",
  "",
  "## Examples Disabled",
  "",
  ...examples.map((item) => `- ${item.code || "fara cod"}: ${item.title || "fara titlu"} (${item.slug || "fara slug"})`),
  "",
];

fs.writeFileSync(reportPath, `${report.join("\n")}\n`);

console.log(
  JSON.stringify(
    {
      changed,
      indexableReset,
      report: path.relative(root, reportPath),
    },
    null,
    2,
  ),
);
