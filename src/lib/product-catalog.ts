import productsJson from "../../data/product-catalog/products.json";

export type ProductReviewStatus = "imported" | "reviewed" | "approved" | "indexable";

export type ProductCategoryId =
  | "diagnostic"
  | "laboratory"
  | "emergency"
  | "sterilization"
  | "medical-furniture"
  | "ent"
  | "gynecology"
  | "consumables";

export type ProductCategory = {
  id: ProductCategoryId;
  slug: string;
  label: string;
  description: string;
  serviceAngle: string;
};

export type ProductCatalogItem = {
  id: string;
  slug: string;
  source: string;
  sourceBrand: string;
  sourceProductName: string;
  gimaCode?: string;
  category: ProductCategoryId;
  subcategory?: string;
  productUrl?: string;
  sourceUrls: string[];
  reviewStatus: ProductReviewStatus;
  importedAt: string;
  reviewedAt?: string | null;
  approvedAt?: string | null;
  indexableAt?: string | null;
  commercialDescription?: string;
  applications?: string[];
  installationConsiderations?: string[];
  maintenanceConsiderations?: string[];
  relatedServices?: string[];
  notes?: string;
};

export const productCategories: ProductCategory[] = [
  {
    id: "diagnostic",
    slug: "diagnostic",
    label: "Diagnostic",
    description: "Monitoare, ECG, audiometrie, spirometrie si aparatura de diagnostic pentru clinici.",
    serviceAngle: "ofertare, instalare, service si mentenanta pentru echipamente de diagnostic",
  },
  {
    id: "laboratory",
    slug: "laboratory",
    label: "Laboratory",
    description: "Echipamente de laborator si IVD pentru fluxuri de probe, analiza si suport operational.",
    serviceAngle: "selectie, instalare si mentenanta pentru laborator / IVD",
  },
  {
    id: "emergency",
    slug: "emergency",
    label: "Emergency",
    description: "Echipamente si mobilier pentru urgente, interventii rapide si zone cu criticitate ridicata.",
    serviceAngle: "echipare urgenta, suport tehnic si disponibilitate operationala",
  },
  {
    id: "sterilization",
    slug: "sterilization",
    label: "Sterilization",
    description: "Echipamente pentru sterilizare, sigilare, suport de cabinet si fluxuri de instrumentar.",
    serviceAngle: "instalare, mentenanta si consumabile pentru sterilizare",
  },
  {
    id: "medical-furniture",
    slug: "medical-furniture",
    label: "Medical Furniture",
    description: "Mobilier medical, carucioare, scaune si elemente pentru organizarea spatiului clinic.",
    serviceAngle: "amenajare spatiu, integrare echipamente si ofertare mobilier medical",
  },
  {
    id: "ent",
    slug: "ent",
    label: "ENT",
    description: "Echipamente si mobilier pentru ORL, diagnostic si cabinete specializate.",
    serviceAngle: "ofertare, instalare si suport pentru cabinete ORL",
  },
  {
    id: "gynecology",
    slug: "gynecology",
    label: "Gynecology",
    description: "Echipamente pentru ginecologie, obstetrica si monitorizare clinica.",
    serviceAngle: "dotare cabinet, instalare si suport service pentru ginecologie",
  },
  {
    id: "consumables",
    slug: "consumables",
    label: "Consumables",
    description: "Consumabile medicale si accesorii profesionale care completeaza echiparea clinicii.",
    serviceAngle: "ofertare recurenta, pachete de consumabile si suport operational",
  },
];

export const productCatalog = productsJson as ProductCatalogItem[];

export function isProductIndexable(product: ProductCatalogItem) {
  return product.reviewStatus === "indexable";
}

export function isProductCommerciallyApproved(product: ProductCatalogItem) {
  return product.reviewStatus === "approved" || product.reviewStatus === "indexable";
}

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export function getProductCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductsByCategory(categoryId: ProductCategoryId) {
  return productCatalog.filter((product) => product.category === categoryId);
}

export function getIndexableProducts() {
  return productCatalog.filter(isProductIndexable);
}

export function getCategoryPath(category: ProductCategory) {
  return `/produse/categorie/${category.slug}`;
}

export function getProductPath(product: ProductCatalogItem) {
  return `/produse/${product.slug}`;
}

export function getProductDisplayName(product: ProductCatalogItem) {
  return `${product.sourceBrand} ${product.sourceProductName}`.trim();
}

export function getProductReviewLabel(status: ProductReviewStatus) {
  const labels: Record<ProductReviewStatus, string> = {
    imported: "Importat - noindex",
    reviewed: "Revizuit intern - noindex",
    approved: "Aprobat comercial - noindex",
    indexable: "Indexabil",
  };

  return labels[status];
}

export function getProductCommercialContent(product: ProductCatalogItem) {
  const category = productCategories.find((item) => item.id === product.category);
  const categoryLabel = category?.label ?? "Medical equipment";

  if (isProductCommerciallyApproved(product) && product.commercialDescription) {
    return {
      description: product.commercialDescription,
      applications: product.applications ?? [],
      installation: product.installationConsiderations ?? [],
      maintenance: product.maintenanceConsiderations ?? [],
      relatedServices: product.relatedServices ?? [],
    };
  }

  return {
    description:
      "Produs importat din catalog public si pastrat noindex pana la revizuire. Echipa ZESCORP poate verifica disponibilitatea, aplicatia clinica, cerintele de instalare si optiunile de service inainte de ofertare.",
    applications: [
      `Evaluare preliminara pentru categoria ${categoryLabel}`,
      "Cerere de oferta pentru clinici, cabinete sau laboratoare",
      "Comparatie cu alternative si pachete de echipare",
    ],
    installation: [
      "Verificarea spatiului, alimentarii si accesului inainte de livrare",
      "Clarificarea documentatiei tehnice si a accesoriilor necesare",
      "Corelarea cu fluxul operational al clinicii",
    ],
    maintenance: [
      "Plan de mentenanta sau service in functie de utilizare",
      "Identificarea consumabilelor si accesoriilor critice",
      "Recomandari de suport dupa punerea in functiune",
    ],
    relatedServices: [
      "/solutii-medicale/echipamente-imagistica-diagnostic",
      "/service-aparatura-medicala",
      "/contracte-mentenanta",
    ],
  };
}
