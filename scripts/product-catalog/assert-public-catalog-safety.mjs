import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicProductsPath = path.join(root, "data", "product-catalog", "products-public.json");
const sitemapPath = path.join(root, "src", "app", "sitemap.ts");
const catalogLibPath = path.join(root, "src", "lib", "product-catalog.ts");
const nextConfigPath = path.join(root, "next.config.ts");
const guardedRouteChecks = [
  {
    file: path.join(root, "src", "app", "api", "zes-guide", "route.ts"),
    label: "ZES guide API",
    snippets: ['keyPrefix: "zes-guide"', "limit: 12", "shouldBlockExpensivePost"],
  },
  {
    file: path.join(root, "src", "app", "api", "zes-guide", "file-analysis", "route.ts"),
    label: "ZES file analysis API",
    snippets: ['keyPrefix: "zes-file-analysis"', "limit: 4", "shouldBlockExpensivePost"],
  },
  {
    file: path.join(root, "src", "app", "api", "leads", "route.ts"),
    label: "Lead submit API",
    snippets: ['keyPrefix: "lead-submit"', "limit: 6", "shouldBlockExpensivePost"],
  },
  {
    file: path.join(
      root,
      "src",
      "app",
      "api",
      "product-assets",
      "images",
      "[code]",
      "[...file]",
      "route.ts",
    ),
    label: "Product image asset proxy",
    snippets: [
      'keyPrefix: "product-image-assets"',
      "limit: 240",
      "max-age=31536000",
    ],
  },
  {
    file: path.join(
      root,
      "src",
      "app",
      "api",
      "product-assets",
      "documents",
      "[code]",
      "[...file]",
      "route.ts",
    ),
    label: "Product document asset proxy",
    snippets: [
      'keyPrefix: "product-document-assets"',
      "limit: 40",
      "max-age=31536000",
    ],
  },
];

const MAX_INDEXABLE_PRODUCTS = 500;
const allowedIndexableStatuses = new Set(["premium", "indexable_verified"]);

const failures = [];

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing required public catalog file: ${path.relative(root, filePath)}`);
    return [];
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const products = readJson(publicProductsPath);
const indexableProducts = products.filter((product) => allowedIndexableStatuses.has(product.reviewStatus));
const invalidIndexableProducts = products.filter(
  (product) =>
    product.reviewStatus === "indexable" ||
    (product.reviewStatus !== "premium" &&
      product.reviewStatus !== "indexable_verified" &&
      product.indexableAt),
);
const sitemapSource = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const catalogSource = fs.existsSync(catalogLibPath) ? fs.readFileSync(catalogLibPath, "utf8") : "";
const nextConfigSource = fs.existsSync(nextConfigPath)
  ? fs.readFileSync(nextConfigPath, "utf8")
  : "";

if (indexableProducts.length > MAX_INDEXABLE_PRODUCTS) {
  failures.push(`Public indexable product count is ${indexableProducts.length}; max allowed is ${MAX_INDEXABLE_PRODUCTS}.`);
}

if (invalidIndexableProducts.length) {
  failures.push(
    `Public catalog contains unsafe indexable statuses: ${invalidIndexableProducts
      .slice(0, 10)
      .map((product) => product.slug || product.id)
      .join(", ")}`,
  );
}

if (!sitemapSource.includes("MAX_SITEMAP_PRODUCT_URLS = 500")) {
  failures.push("Sitemap must keep MAX_SITEMAP_PRODUCT_URLS = 500.");
}

if (!sitemapSource.includes(".slice(0, MAX_SITEMAP_PRODUCT_URLS)")) {
  failures.push("Sitemap must cap getIndexableProducts() with MAX_SITEMAP_PRODUCT_URLS.");
}

if (!catalogSource.includes('product.reviewStatus === "premium"') || !catalogSource.includes('product.reviewStatus === "indexable_verified"')) {
  failures.push("Product indexation guard must allow only premium or indexable_verified review statuses.");
}

if (catalogSource.includes('product.reviewStatus === "indexable" && passesProductIndexationGuard')) {
  failures.push("Legacy raw indexable status must not be sufficient for public indexation.");
}

if (!nextConfigSource.includes("unoptimized: true")) {
  failures.push("Next Image Optimization must stay disabled with images.unoptimized = true.");
}

for (const routeCheck of guardedRouteChecks) {
  if (!fs.existsSync(routeCheck.file)) {
    failures.push(`Missing guarded route: ${routeCheck.label}.`);
    continue;
  }

  const source = fs.readFileSync(routeCheck.file, "utf8");
  for (const snippet of routeCheck.snippets) {
    if (!source.includes(snippet)) {
      failures.push(`${routeCheck.label} must keep safety snippet: ${snippet}.`);
    }
  }
}

if (failures.length) {
  console.error("Product catalog public safety check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      publicProducts: products.length,
      indexableProducts: indexableProducts.length,
      maxIndexableProducts: MAX_INDEXABLE_PRODUCTS,
    },
    null,
    2,
  ),
);
