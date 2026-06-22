import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceProductsPath = path.join(root, "data", "product-catalog", "products.json");
const sourceRedirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");
const publicProductsPath = path.join(root, "data", "product-catalog", "products-public.json");
const publicRedirectsPath = path.join(root, "data", "product-catalog", "product-redirects-public.json");

const MAX_INDEXABLE_PRODUCTS = 500;

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function isDisplayReady(product) {
  return Boolean(
    product.publicDisplayReady &&
      product.strictQualityStatus === "pass" &&
      product.catalogStatus === "ready_for_publish" &&
      product.romanianTitle?.trim() &&
      product.romanianDescription?.trim() &&
      product.galleryImages?.length &&
      (product.imageStatus === "verified_local" || product.imageStatus === "verified"),
  );
}

function hasMeaningfulTechnicalContent(product) {
  const specCount =
    product.specificationGroups?.reduce((count, group) => count + (group.items?.length ?? 0), 0) ??
    product.romanianSpecifications?.length ??
    0;

  return Boolean(
    specCount >= 5 ||
      product.documentAssetAudit?.some((document) => document.status === "available") ||
      product.productDocuments?.length ||
      product.romanianFeatures?.length,
  );
}

function hasCleanPublicText(product) {
  const value = [
    product.romanianTitle,
    product.slug?.replaceAll("-", " "),
    product.romanianDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (/([a-z])\1{4,}/i.test(value)) return false;
  if (/\b(source|import|review|gima url|verified internally|catalog row|pdf row)\b/.test(value)) return false;
  if (/\b(product|disposable|single use|technical|manual|with|without|large|small)\b/.test(value)) return false;
  if (/^(produs|echipament|dispozitiv|articol)(-| )/.test(product.slug ?? "")) return false;
  return true;
}

function isVerifiedIndexCandidate(product) {
  return (
    product.reviewStatus === "indexable" &&
    isDisplayReady(product) &&
    hasMeaningfulTechnicalContent(product) &&
    hasCleanPublicText(product)
  );
}

function stripForRuntime(product, reviewStatus) {
  return {
    id: product.id,
    slug: product.slug,
    source: product.source,
    sourceBrand: product.sourceBrand,
    sourceProductName: product.sourceProductName,
    gimaCode: product.gimaCode,
    category: product.category,
    subcategory: product.subcategory,
    sourceUrls: [],
    reviewStatus,
    importedAt: product.importedAt,
    reviewedAt: product.reviewedAt,
    approvedAt: product.approvedAt,
    indexableAt: reviewStatus === "indexable_verified" || reviewStatus === "premium"
      ? product.indexableAt || new Date().toISOString()
      : null,
    commercialDescription: product.commercialDescription,
    applications: product.applications,
    installationConsiderations: product.installationConsiderations,
    maintenanceConsiderations: product.maintenanceConsiderations,
    relatedServices: product.relatedServices,
    romanianTitle: product.romanianTitle,
    romanianDescription: product.romanianDescription,
    romanianApplications: product.romanianApplications,
    romanianBenefits: product.romanianBenefits,
    romanianFeatures: product.romanianFeatures,
    romanianPackageContents: product.romanianPackageContents,
    romanianShortSummary: product.romanianShortSummary,
    romanianSpecifications: product.romanianSpecifications,
    specificationGroups: product.specificationGroups,
    commercialCategory: product.commercialCategory,
    imageUrl: product.imageUrl,
    imageVerified: product.imageVerified,
    imageStatus: product.imageStatus,
    galleryImages: product.galleryImages,
    galleryImageAudit: product.galleryImageAudit,
    imageAlt: product.imageAlt,
    documents: product.documents,
    documentStatus: product.documentStatus,
    documentAssetAudit: product.documentAssetAudit,
    productDocuments: product.productDocuments,
    relatedProductCodes: product.relatedProductCodes,
    relatedProductGroups: product.relatedProductGroups,
    relatedCategoryLinks: product.relatedCategoryLinks,
    relatedSolutionLinks: product.relatedSolutionLinks,
    relatedKnowledgeLinks: product.relatedKnowledgeLinks,
    relatedMaintenanceLinks: product.relatedMaintenanceLinks,
    buyerJourneyLinks: product.buyerJourneyLinks,
    seoAuthorityScore: product.seoAuthorityScore,
    gimaBreadcrumbs: product.gimaBreadcrumbs,
    publicDisplayReady: product.publicDisplayReady,
    catalogStatus: product.catalogStatus,
    strictQualityScore: product.strictQualityScore,
    strictQualityStatus: product.strictQualityStatus,
    strictQualityFailures: product.strictQualityFailures,
  };
}

if (!fs.existsSync(sourceProductsPath)) {
  if (!fs.existsSync(publicProductsPath)) {
    throw new Error("Missing both full product catalog and public product catalog.");
  }
  console.log("Full product catalog not present; using committed public catalog.");
  process.exit(0);
}

const products = readJson(sourceProductsPath, []);
const redirects = readJson(sourceRedirectsPath, []);
const verifiedProducts = products
  .filter(isVerifiedIndexCandidate)
  .sort((a, b) => (b.seoAuthorityScore ?? 0) - (a.seoAuthorityScore ?? 0))
  .slice(0, MAX_INDEXABLE_PRODUCTS);
const verifiedIds = new Set(verifiedProducts.map((product) => product.id));
const displayOnlyProducts = products
  .filter((product) => isDisplayReady(product) && !verifiedIds.has(product.id))
  .sort((a, b) => (b.seoAuthorityScore ?? 0) - (a.seoAuthorityScore ?? 0))
  .slice(0, 250);

const publicProducts = [
  ...verifiedProducts.map((product) => stripForRuntime(product, "indexable_verified")),
  ...displayOnlyProducts.map((product) => stripForRuntime(product, "reviewed")),
];
const publicSlugs = new Set(publicProducts.map((product) => `/produse/${product.slug}`));
const publicRedirects = redirects
  .filter((redirect) => publicSlugs.has(redirect.destination))
  .slice(0, 1000);

writeJson(publicProductsPath, publicProducts);
writeJson(publicRedirectsPath, publicRedirects);

console.log(
  JSON.stringify(
    {
      totalSourceProducts: products.length,
      publicProducts: publicProducts.length,
      indexableVerifiedProducts: verifiedProducts.length,
      displayOnlyProducts: displayOnlyProducts.length,
      publicRedirects: publicRedirects.length,
    },
    null,
    2,
  ),
);
