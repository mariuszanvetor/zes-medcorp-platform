import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, "src", "app");
const dataDir = path.join(root, "src", "data");
const componentsDir = path.join(root, "src", "components");
const docsDir = path.join(root, "docs");
const productCatalogPath = path.join(root, "data", "product-catalog", "products.json");

const moneyRoutes = [
  "/",
  "/solutii-medicale",
  "/contracte-mentenanta",
  "/produse",
  "/amenajare-centre-imagistica",
  "/amenajare-cabinet-medical",
  "/proiectare-radiologie",
  "/autorizare-cncan-camera-rx",
  "/service-radiologie-romania",
  "/service-ecografe",
  "/service-laborator-ivd",
  "/plumbare-radiologica",
  "/radioprotectie-plumbare-rx",
  "/service-aparatura-medicala",
  "/contact",
];

const revenueCategoryCoverage = {
  "amenajare clinica medicala": ["/solutii-medicale/dezvoltare-unitati-medicale", "/amenajare-cabinet-medical"],
  "amenajare cabinet medical": ["/amenajare-cabinet-medical"],
  "amenajare centru imagistica": ["/amenajare-centre-imagistica"],
  "amenajare camera CT": ["/solutii-medicale/camere-ct", "/servicii/proiectare-camera-ct"],
  "amenajare camera RMN": ["/solutii-medicale/camere-rmn", "/servicii/proiectare-camera-rmn"],
  "radioprotectie medicala": ["/radioprotectie-plumbare-rx", "/solutii-medicale/radioprotectie-imagistica"],
  "placare plumb radiologie": ["/plumbare-radiologica", "/radioprotectie-plumbare-rx"],
  "RF shielding RMN": ["/solutii-medicale/rf-shielding-rmn", "/servicii/rf-shielding-rmn"],
  "cusca Faraday RMN": ["/solutii-medicale/rf-shielding-rmn"],
  "aparatura medicala": ["/solutii-medicale/echipamente-imagistica-diagnostic"],
  "aparatura imagistica medicala": ["/solutii-medicale/echipamente-imagistica-diagnostic"],
  "echipamente radiologie": ["/proiectare-radiologie", "/solutii-medicale/echipamente-imagistica-diagnostic"],
  "echipamente laborator IVD": ["/solutii-medicale/echipamente-laborator-ivd", "/service-laborator-ivd"],
  ecografe: ["/solutii-medicale/ecografe-sisteme-ultrasunete", "/service-ecografe"],
  mamografe: ["/solutii-medicale/sisteme-mamografie"],
  "C-arm": ["/solutii-medicale/sisteme-c-arm"],
  "PACS / RIS": ["/solutii-medicale/solutii-pacs-ris"],
  "service aparatura medicala": ["/service-aparatura-medicala", "/solutii-medicale/service-echipamente-medicale"],
  "service radiologie": ["/service-radiologie-romania"],
  "service ecografe": ["/service-ecografe"],
  "service laborator IVD": ["/service-laborator-ivd"],
  "contracte mentenanta aparatura medicala": ["/contracte-mentenanta"],
  "mentenanta preventiva aparatura medicala": ["/contracte-mentenanta", "/solutii-medicale/contracte-mentenanta-preventiva"],
  "relocare aparatura medicala": ["/solutii-medicale/relocare-echipamente-medicale"],
  "instalare aparatura medicala": ["/solutii-medicale/instalare-punere-in-functiune"],
};

const errors = [];
const warnings = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, out);
    else out.push(fullPath);
  }
  return out;
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function extractSlugs(relativePath) {
  const source = read(relativePath);
  return [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function routeFromPageFile(file) {
  const relative = path.relative(appDir, file).replace(/\\/g, "/");
  if (relative === "page.tsx") return "/";
  if (!relative.endsWith("/page.tsx")) return null;
  let route = `/${relative.replace(/\/page\.tsx$/, "")}`;
  route = route.replace(/\/page\.tsx$/, "");
  route = route.replace(/\/\([^/]+\)/g, "");
  route = route.replace(/\/index$/, "");
  route = route.replace(/\/$/, "") || "/";
  if (route.includes("[") || route.startsWith("/api/")) return null;
  return route;
}

function addDynamicRoutes(routes) {
  for (const slug of extractSlugs("src/data/commercial-landing-pages.ts")) routes.add(`/${slug}`);
  for (const slug of extractSlugs("src/data/revenue-landing-pages.ts")) routes.add(`/solutii-medicale/${slug}`);
  for (const slug of extractSlugs("src/data/maintenance-contracts.ts")) routes.add(`/contracte-mentenanta/${slug}`);
  for (const slug of extractSlugs("src/data/service-funnels.ts")) routes.add(`/servicii/${slug}`);
  for (const slug of extractSlugs("src/data/calculators.ts")) routes.add(`/calculatoare/${slug}`);
  for (const slug of extractSlugs("src/data/comparisons.ts")) routes.add(`/comparatii/${slug}`);
  for (const slug of extractSlugs("src/data/glossary.ts")) routes.add(`/glosar/${slug}`);
  for (const slug of extractSlugs("src/data/planning-journeys.ts")) routes.add(`/planificare/${slug}`);
  for (const slug of extractSlugs("src/data/articles.ts")) routes.add(`/knowledge-hub/${slug}`);

  if (fs.existsSync(productCatalogPath)) {
    const products = JSON.parse(fs.readFileSync(productCatalogPath, "utf8"));
    for (const product of products) {
      if (product.slug) routes.add(`/produse/${product.slug}`);
      if (product.category) routes.add(`/produse/categorie/${product.category}`);
    }
  }
}

function getStaticRoutesFromSitemap() {
  const source = read("src/app/sitemap.ts");
  return new Set([...source.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]));
}

function checkAdminSafety(sitemapSource) {
  const adminFiles = walk(path.join(appDir, "admin")).filter((file) => file.endsWith("page.tsx"));
  for (const file of adminFiles) {
    const source = fs.readFileSync(file, "utf8");
    const relative = path.relative(root, file).replace(/\\/g, "/");
    const hasNoIndex = /index:\s*false/i.test(source) || /noindex/i.test(source);
    const hasNoFollow = /follow:\s*false/i.test(source) || /nofollow/i.test(source);
    if (!hasNoIndex || !hasNoFollow) {
      errors.push(`${relative}: admin page is missing explicit noindex/nofollow text.`);
    }
  }

  if (/admin\//i.test(sitemapSource) || /\/admin/i.test(sitemapSource)) {
    errors.push("sitemap.ts appears to contain an admin route reference.");
  }
}

function checkImageAlt() {
  for (const file of walk(path.join(root, "src"))) {
    if (!/\.(tsx|ts)$/.test(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    const imageMatches = [...source.matchAll(/<Image\b[\s\S]*?>/g)];
    for (const match of imageMatches) {
      if (!/\balt=/.test(match[0])) {
        warnings.push(`${path.relative(root, file).replace(/\\/g, "/")}: Image without alt attribute.`);
      }
    }
  }
}

function checkMetadataStrength() {
  const commercialSources = [
    ["commercial", "src/data/commercial-landing-pages.ts"],
    ["revenue", "src/data/revenue-landing-pages.ts"],
    ["maintenance", "src/data/maintenance-contracts.ts"],
  ];

  for (const [label, relativePath] of commercialSources) {
    const source = read(relativePath);
    const titles = [...source.matchAll(/metadataTitle:\s*"([^"]+)"/g)].map((match) => match[1]);
    const descriptions = [...source.matchAll(/metadataDescription:\s*"([^"]+)"/g)].map((match) => match[1]);
    for (const title of titles) {
      if (title.length < 25 || title.length > 72) {
        warnings.push(`${label}: metadata title length may need review (${title.length}): ${title}`);
      }
    }
    for (const description of descriptions) {
      if (description.length < 70 || description.length > 180) {
        warnings.push(`${label}: metadata description length may need review (${description.length}): ${description}`);
      }
    }
  }
}

function checkSchemaCoverage() {
  const layout = read("src/app/layout.tsx");
  if (!layout.includes("OrganizationSchema")) errors.push("Root layout does not include OrganizationSchema.");
  if (!layout.includes("LocalBusinessSchema")) errors.push("Root layout does not include LocalBusinessSchema.");
  if (!layout.includes("WebSiteSchema")) errors.push("Root layout does not include WebSiteSchema.");

  const componentChecks = [
    ["CommercialLandingPage", "src/components/sections/CommercialLandingPage.tsx"],
    ["RevenueLandingPage", "src/components/sections/RevenueLandingPage.tsx"],
    ["MaintenanceContractPage", "src/components/sections/MaintenanceContractPage.tsx"],
  ];

  for (const [name, relativePath] of componentChecks) {
    const source = read(relativePath);
    for (const required of ["BreadcrumbSchema", "FAQSchema", "ServiceSchema"]) {
      if (!source.includes(required)) {
        errors.push(`${name} is missing ${required}.`);
      }
    }
  }

  const productPage = read("src/app/produse/[slug]/page.tsx");
  for (const required of ["BreadcrumbSchema", "ServiceSchema"]) {
    if (!productPage.includes(required)) {
      errors.push(`Product detail page is missing ${required}.`);
    }
  }
}

function checkProductCatalogSafety(sitemapSource) {
  if (!fs.existsSync(productCatalogPath)) {
    errors.push("Product catalog database is missing: data/product-catalog/products.json");
    return;
  }

  const products = JSON.parse(fs.readFileSync(productCatalogPath, "utf8"));
  const productPage = read("src/app/produse/[slug]/page.tsx");
  const categoryPage = read("src/app/produse/categorie/[slug]/page.tsx");

  if (!productPage.includes("noIndex: !isProductIndexable")) {
    errors.push("Product detail metadata must noindex every product that is not explicitly indexable.");
  }

  if (!categoryPage.includes("noIndex: !hasIndexableProducts")) {
    errors.push("Product category metadata must noindex categories without indexable reviewed products.");
  }

  if (!sitemapSource.includes("getIndexableProducts")) {
    errors.push("Product sitemap coverage must use getIndexableProducts.");
  }

  const validProductReviewStatuses = [
    "imported",
    "translated",
    "image_verified",
    "reviewed",
    "approved",
    "indexable",
    "excluded",
  ];
  const invalidStatuses = products.filter((product) => !validProductReviewStatuses.includes(product.reviewStatus));
  for (const product of invalidStatuses) {
    errors.push(`Product has invalid review status: ${product.slug || product.id}`);
  }

  const importedWithIndexDate = products.filter(
    (product) => product.reviewStatus !== "indexable" && product.indexableAt,
  );
  for (const product of importedWithIndexDate) {
    errors.push(`Product has indexableAt before indexable status: ${product.slug || product.id}`);
  }

  const indexableWithoutCommercialCopy = products.filter(
    (product) => product.reviewStatus === "indexable" && !product.commercialDescription,
  );
  for (const product of indexableWithoutCommercialCopy) {
    errors.push(`Indexable product is missing rewritten commercial description: ${product.slug || product.id}`);
  }
}

function checkCoverage(routes) {
  for (const [intent, targets] of Object.entries(revenueCategoryCoverage)) {
    const present = targets.some((target) => routes.has(target));
    if (!present) {
      errors.push(`Commercial intent is not covered by an indexable route: ${intent}`);
    }
  }
}

function checkSitemapCoverage(routes, sitemapStaticRoutes) {
  for (const route of moneyRoutes) {
    if (!routes.has(route)) {
      errors.push(`Money route missing from route inventory: ${route}`);
    }
  }

  for (const route of ["/", "/solutii-medicale", "/contracte-mentenanta", "/contact"]) {
    if (!sitemapStaticRoutes.has(route)) {
      errors.push(`Static hub route missing from sitemap staticRoutes: ${route}`);
    }
  }
}

function checkInternalLinking(routes) {
  const inbound = new Map([...routes].map((route) => [route, 0]));
  const hrefPatterns = [
    /href=(?:\{`([^`]+)`\}|"([^"]+)")/g,
    /href:\s*"([^"]+)"/g,
  ];
  for (const file of walk(path.join(root, "src"))) {
    if (!/\.(tsx|ts)$/.test(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    for (const hrefPattern of hrefPatterns) {
      for (const match of source.matchAll(hrefPattern)) {
        const href = match[1] || match[2];
        if (!href || !href.startsWith("/") || href.includes("${") || href.includes("[") || href.startsWith("/api/")) continue;
        const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
        if (inbound.has(clean)) inbound.set(clean, (inbound.get(clean) ?? 0) + 1);
      }
    }
  }

  for (const route of moneyRoutes) {
    if ((inbound.get(route) ?? 0) === 0 && route !== "/") {
      warnings.push(`Money route has no simple static inbound link detected: ${route}`);
    }
  }
}

const routes = new Set();
for (const file of walk(appDir)) {
  const route = routeFromPageFile(file);
  if (route) routes.add(route);
}
addDynamicRoutes(routes);

const sitemapSource = read("src/app/sitemap.ts");
const sitemapStaticRoutes = getStaticRoutesFromSitemap();
checkAdminSafety(sitemapSource);
checkImageAlt();
checkMetadataStrength();
checkSchemaCoverage();
checkProductCatalogSafety(sitemapSource);
checkCoverage(routes);
checkSitemapCoverage(routes, sitemapStaticRoutes);
checkInternalLinking(routes);

const report = {
  generatedAt: new Date().toISOString(),
  routeCount: routes.size,
  moneyRoutes,
  commercialCoverage: revenueCategoryCoverage,
  errors,
  warnings,
  notes: [
    "Dynamic sitemap coverage is source-verified through data imports and content:check.",
    "Warnings are review prompts; errors are blocking SEO hygiene issues.",
    "No external crawling, lead data, SMTP, CRM, or API secrets are used by this audit.",
  ],
};

fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(
  path.join(docsDir, "seo-max-route-audit.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.log(`SEO audit inventoried ${routes.size} public/source routes.`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log("Report: docs/seo-max-route-audit.json");

if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
