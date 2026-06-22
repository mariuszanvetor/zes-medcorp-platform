import productsJson from "../../data/product-catalog/products.json";
import productRedirectsJson from "../../data/product-catalog/product-redirects.json";

export type ProductReviewStatus = "imported" | "translated" | "image_verified" | "reviewed" | "approved" | "indexable" | "excluded";

export type ProductCategoryId =
  | "diagnostic"
  | "laboratory"
  | "emergency"
  | "sterilization"
  | "medical-furniture"
  | "ent"
  | "gynecology"
  | "consumables"
  | "electromedical"
  | "surgical-instruments"
  | "patient-care"
  | "monitoring"
  | "disinfection"
  | "operator-protection"
  | "medical-bags"
  | "scales-measures"
  | "physiotherapy"
  | "veterinary"
  | "anatomy-models"
  | "medical-lights";

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
  romanianTitle?: string;
  romanianDescription?: string;
  romanianApplications?: string[];
  romanianBenefits?: string[];
  romanianFeatures?: string[];
  romanianPackageContents?: string[];
  romanianShortSummary?: string;
  romanianSourceDescription?: string;
  romanianSpecifications?: Array<{ label: string; value: string }>;
  specificationGroups?: Array<{
    group: "General" | "Dimensions" | "Weight" | "Electrical" | "Performance" | "Medical" | "Accessories";
    items: Array<{ label: string; value: string }>;
  }>;
  specificationCompletenessGrade?: "A" | "B" | "C" | "D";
  specificationCompletenessScore?: number;
  commercialCategory?: string;
  imageUrl?: string;
  imageSourceUrl?: string;
  imageVerified?: boolean;
  imageStatus?: "verified" | "verified_local" | "missing" | "placeholder";
  galleryImages?: Array<{ url: string; alt: string; verified: boolean }>;
  galleryImageAudit?: Array<{
    originalExtractedUrl: string;
    finalHighResUrl: string;
    localFilePath: string;
    width: number;
    height: number;
    bytes: number;
    sourceSize: string;
    status: string;
    reason?: string;
  }>;
  imageAlt?: string;
  documents?: {
    englishManual?: string;
    ceCertificate?: string;
    technicalDatasheet?: string;
  };
  documentStatus?: {
    englishManual?: "available" | "missing" | "failed";
    ceCertificate?: "available" | "missing" | "failed";
    technicalDatasheet?: "available" | "missing" | "failed";
  };
  documentAssetAudit?: Array<{
    label: string;
    type: "manual" | "certificat" | "fisa tehnica" | "document";
    publicUrl: string;
    sourceUrl: string;
    bytes?: number;
    status: "available" | "missing" | "failed";
  }>;
  productDocuments?: Array<{ label: string; url: string; type: string }>;
  relatedProductCodes?: string[];
  relatedProductGroups?: {
    similarProducts?: string[];
    premiumAlternatives?: string[];
    budgetAlternatives?: string[];
    compatibleAccessories?: string[];
    frequentlyRequestedTogether?: string[];
    allRelevantProducts?: string[];
  };
  relatedCategoryLinks?: Array<{ href: string; label: string }>;
  relatedSolutionLinks?: Array<{ href: string; label: string }>;
  relatedKnowledgeLinks?: Array<{ href: string; label: string }>;
  relatedMaintenanceLinks?: Array<{ href: string; label: string }>;
  buyerJourneyLinks?: Array<{ href: string; label: string }>;
  seoAuthorityScore?: number;
  seoAuthorityPreparedAt?: string;
  gimaBreadcrumbs?: string[];
  sourceExtractedAt?: string;
  sourceQuality?: "basic_import" | "gima_page_parity_review";
  publicDisplayReady?: boolean;
  catalogStatus?: "imported" | "localized" | "image_verified" | "documents_verified" | "ready_for_publish" | "needs_review" | "excluded";
  strictQualityScore?: number;
  strictQualityStatus?: "pass" | "fail";
  strictQualityFailures?: string[];
};

export const productCategories: ProductCategory[] = [
  {
    id: "diagnostic",
    slug: "diagnostic",
    label: "Diagnostic medical",
    description: "Monitoare, ECG, audiometrie, spirometrie si aparatura de diagnostic pentru clinici.",
    serviceAngle: "ofertare, instalare, service si mentenanta pentru echipamente de diagnostic",
  },
  {
    id: "laboratory",
    slug: "laboratory",
    label: "Laborator / IVD",
    description: "Echipamente de laborator si IVD pentru fluxuri de probe, analiza si suport operational.",
    serviceAngle: "selectie, instalare si mentenanta pentru laborator / IVD",
  },
  {
    id: "emergency",
    slug: "emergency",
    label: "Urgenta",
    description: "Echipamente si mobilier pentru urgente, interventii rapide si zone cu criticitate ridicata.",
    serviceAngle: "echipare urgenta, suport tehnic si disponibilitate operationala",
  },
  {
    id: "sterilization",
    slug: "sterilization",
    label: "Sterilizare",
    description: "Echipamente pentru sterilizare, sigilare, suport de cabinet si fluxuri de instrumentar.",
    serviceAngle: "instalare, mentenanta si consumabile pentru sterilizare",
  },
  {
    id: "medical-furniture",
    slug: "medical-furniture",
    label: "Mobilier medical",
    description: "Mobilier medical, carucioare, scaune si elemente pentru organizarea spatiului clinic.",
    serviceAngle: "amenajare spatiu, integrare echipamente si ofertare mobilier medical",
  },
  {
    id: "ent",
    slug: "ent",
    label: "ORL",
    description: "Echipamente si mobilier pentru ORL, diagnostic si cabinete specializate.",
    serviceAngle: "ofertare, instalare si suport pentru cabinete ORL",
  },
  {
    id: "gynecology",
    slug: "gynecology",
    label: "Ginecologie",
    description: "Echipamente pentru ginecologie, obstetrica si monitorizare clinica.",
    serviceAngle: "dotare cabinet, instalare si suport service pentru ginecologie",
  },
  {
    id: "consumables",
    slug: "consumables",
    label: "Consumabile",
    description: "Consumabile medicale si accesorii profesionale care completeaza echiparea clinicii.",
    serviceAngle: "ofertare recurenta, pachete de consumabile si suport operational",
  },
  {
    id: "electromedical",
    slug: "electromedical",
    label: "Electromedicale",
    description: "Echipamente electromedicale pentru tratament, diagnostic, terapie si suport clinic.",
    serviceAngle: "selectie, instalare, configurare si mentenanta pentru echipamente electromedicale",
  },
  {
    id: "surgical-instruments",
    slug: "surgical-instruments",
    label: "Instrumentar chirurgical",
    description: "Instrumentar si accesorii chirurgicale pentru cabinete, clinici si zone de interventie.",
    serviceAngle: "dotare, inlocuire instrumentar si suport pentru fluxuri de sterilizare",
  },
  {
    id: "patient-care",
    slug: "patient-care",
    label: "Ingrijire pacient",
    description: "Produse si echipamente pentru ingrijire pacient, mobilizare, suport si operare clinica.",
    serviceAngle: "echipare operationala, consultanta pentru selectie si pachete de produse medicale",
  },
  {
    id: "monitoring",
    slug: "monitoring",
    label: "Monitorizare",
    description: "Echipamente pentru monitorizare clinica, evaluare parametri si suport decizional operational.",
    serviceAngle: "ofertare, instalare si service pentru echipamente de monitorizare",
  },
  {
    id: "disinfection",
    slug: "disinfection",
    label: "Dezinfectie",
    description: "Produse pentru dezinfectie, control operational si suport pentru siguranta fluxurilor medicale.",
    serviceAngle: "selectie produse, integrare in fluxuri si suport pentru necesar recurent",
  },
  {
    id: "operator-protection",
    slug: "protectie-operator",
    label: "Protectie operator",
    description: "Produse pentru protectia personalului medical, protectie individuala si fluxuri clinice sigure.",
    serviceAngle: "selectie produse de protectie, consumabile si necesar operational recurent",
  },
  {
    id: "medical-bags",
    slug: "genti-medicale",
    label: "Genti medicale",
    description: "Genti, truse si solutii de transport pentru interventii, urgente si activitate medicala mobila.",
    serviceAngle: "dotare truse, selectie pentru echipe mobile si suport pentru necesar de interventie",
  },
  {
    id: "scales-measures",
    slug: "cantare-si-masurare",
    label: "Cantare si masurare",
    description: "Cantare medicale, podoscopie, instrumente de masurare si evaluare pentru cabinete si clinici.",
    serviceAngle: "selectie echipamente de masurare, instalare si suport operational",
  },
  {
    id: "physiotherapy",
    slug: "fizioterapie",
    label: "Fizioterapie",
    description: "Echipamente pentru fizioterapie, recuperare, terapie si suport clinic specializat.",
    serviceAngle: "dotare sali de recuperare, selectie echipamente si mentenanta",
  },
  {
    id: "veterinary",
    slug: "veterinar",
    label: "Veterinar",
    description: "Produse si echipamente pentru clinici veterinare, interventii si suport operational.",
    serviceAngle: "dotare clinica veterinara, consumabile si suport pentru echipamente",
  },
  {
    id: "anatomy-models",
    slug: "modele-anatomice",
    label: "Modele anatomice",
    description: "Modele anatomice si materiale didactice pentru educatie medicala si instruire clinica.",
    serviceAngle: "selectie modele anatomice, pachete educationale si ofertare pentru institutii",
  },
  {
    id: "medical-lights",
    slug: "lampi-medicale",
    label: "Lampi medicale",
    description: "Lampi medicale, iluminare de examinare, iluminare chirurgicala si accesorii de lumina clinica.",
    serviceAngle: "selectie iluminare medicala, instalare, suport tehnic si mentenanta",
  },
];

export const productCatalog = productsJson as ProductCatalogItem[];
const productRedirects = productRedirectsJson as Array<{ source: string; destination: string }>;

export function isProductIndexable(product: ProductCatalogItem) {
  return product.reviewStatus === "indexable" && passesProductIndexationGuard(product);
}

export function isProductCommerciallyApproved(product: ProductCatalogItem) {
  return product.reviewStatus === "approved" || product.reviewStatus === "indexable";
}

export function passesProductIndexationGuard(product: ProductCatalogItem) {
  const title = product.romanianTitle || "";
  const slug = product.slug || "";
  const description = product.romanianDescription || product.commercialDescription || "";
  const specsCount = product.specificationGroups?.reduce((count, group) => count + group.items.length, 0) ?? product.romanianSpecifications?.length ?? 0;
  const hasProductSpecificContent = description.length >= 180 && !isGenericProductDescription(description);

  return Boolean(
    product.publicDisplayReady &&
      product.imageStatus === "verified_local" &&
      product.galleryImages?.length &&
      isCleanRomanianProductTitle(title) &&
      isCleanRomanianProductSlug(slug) &&
      !hasPublicEnglishLeakage(title) &&
      !hasPublicEnglishLeakage(slug.replaceAll("-", " ")) &&
      !hasPublicEnglishLeakage(description) &&
      hasProductSpecificContent &&
      (specsCount >= 5 || product.productDocuments?.length || product.romanianFeatures?.length),
  );
}

function isGenericProductDescription(description: string) {
  const normalized = normalizePublicCatalogText(description);
  const genericPatterns = [
    "este un produs din categoria",
    "prezentat pentru cereri de oferta profesionale",
    "pagina este structurata pentru cumparatori",
    "produs disponibil pentru cerere de oferta",
  ];

  return genericPatterns.some((pattern) => normalized.includes(pattern));
}

function isCleanRomanianProductTitle(title: string) {
  const normalized = normalizePublicCatalogText(title);
  if (normalized.length < 8) return false;
  if (/([a-z])\1{3,}/i.test(normalized)) return false;
  if (/(^| )(produs|echipament|dispozitiv|articol)( |$)/.test(normalized)) return false;
  if (/^(specificatii tehnice|technical|class|manual|numai|pentru)( |$)/.test(normalized)) return false;
  if (/^\d/.test(normalized)) return false;
  if (/\bpentru$/.test(normalized)) return false;
  if (/^[\\d\\s.,/()Â°+-]+$/.test(normalized)) return false;
  return !hasPublicEnglishLeakage(title);
}

function isCleanRomanianProductSlug(slug: string) {
  const normalized = normalizePublicCatalogText(slug.replaceAll("-", " "));
  if (normalized.length < 8) return false;
  if (/^(produs|echipament|dispozitiv|articol|specificatii tehnice|technical|manual)( |$)/.test(normalized)) return false;
  return !hasPublicEnglishLeakage(normalized);
}

function hasPublicEnglishLeakage(value: string) {
  const normalized = normalizePublicCatalogText(value);
  const allowed = new Set([
    "ce",
    "fda",
    "iso",
    "bluetooth",
    "wifi",
    "wi fi",
    "pacs",
    "ris",
    "dicom",
    "usb",
    "led",
    "spo2",
    "ecg",
    "monitor",
    "adult",
    "pediatric",
  ]);
  const leakageTerms = [
    "designed",
    "technical",
    "manual",
    "product",
    "disposable",
    "single use",
    "re usable",
    "reusable",
    "washer",
    "drying",
    "display",
    "button",
    "large",
    "small",
    "medium",
    "adult",
    "pediatric",
    "children",
    "kid",
    "with",
    "without",
    "strap",
    "straps",
    "headband",
    "bags",
    "box",
    "professional",
    "sneaker",
    "clogs",
    "stretcher",
    "stretchers",
    "mask",
    "masks",
    "filter",
    "filters",
    "support",
    "holder",
    "accessories",
    "accessory",
    "speculum",
    "otoscope",
    "ophthalmoscope",
    "thermometer",
    "stethoscope",
    "monitor",
    "chart",
    "couch",
    "cart",
    "trolley",
    "trolleys",
    "belt",
    "buckle",
    "clamp",
    "forceps",
    "retractor",
    "needle",
    "needles",
    "syringe",
    "syringes",
    "drawers",
    "drawer",
    "lacets",
    "packed",
    "quality",
    "system",
    "face",
    "instruments",
    "andsparesfor",
    "ontrolley",
    "guide",
    "size",
    "sizes",
    "every",
    "colours",
    "mixed",
    "surfaces",
    "wipes",
    "masking",
    "faceshield",
    "connection",
    "rail",
    "angled",
    "gallipot",
    "nebulizer",
    "binocular",
    "loupe",
    "sphygmomanometeet",
    "sphygmomanometer",
    "blades",
    "blade",
    "paed",
    "smart",
    "humidifier",
    "polarization",
    "short",
    "handle",
    "stool",
    "colours",
    "cups",
    "compression",
  ];

  return leakageTerms.some((term) => !allowed.has(term) && new RegExp(`(^| )${escapeRegExp(term)}( |$)`).test(normalized));
}

function normalizePublicCatalogText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&");
}

export function isProductPublicDisplayReady(product: ProductCatalogItem) {
  return Boolean(
    product.publicDisplayReady &&
      product.strictQualityStatus === "pass" &&
      product.catalogStatus === "ready_for_publish" &&
      product.romanianTitle?.trim() &&
      product.romanianDescription?.trim() &&
      product.galleryImages?.length &&
      product.imageStatus === "verified_local",
  );
}

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export function getProductRedirectDestination(slug: string) {
  const redirect = productRedirects.find((item) => item.source === `/produse/${slug}`);
  return redirect?.destination || null;
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
  return product.romanianTitle || `${product.sourceBrand} ${product.sourceProductName}`.trim();
}

export function getRomanianProductCategoryLabel(product: ProductCatalogItem) {
  const category = productCategories.find((item) => item.id === product.category);
  const sourceLabel = product.commercialCategory || product.subcategory || "";
  return category?.label || translateGimaCategoryLabel(sourceLabel) || "Echipamente medicale";
}

export function getProductReviewLabel(status: ProductReviewStatus) {
  const labels: Record<ProductReviewStatus, string> = {
    imported: "Importat - noindex",
    translated: "Tradus comercial - noindex",
    image_verified: "Imagine verificata - noindex",
    reviewed: "Revizuit intern - noindex",
    approved: "Aprobat comercial - noindex",
    indexable: "Indexabil",
    excluded: "Exclus din publicare",
  };

  return labels[status];
}

export function getProductCommercialContent(product: ProductCatalogItem) {
  const category = productCategories.find((item) => item.id === product.category);
  const categoryLabel = getRomanianProductCategoryLabel(product);

  if (product.publicDisplayReady && product.romanianDescription) {
    return {
      description: product.romanianDescription,
      shortSummary: product.romanianShortSummary || product.romanianDescription,
      applications: product.romanianApplications ?? [],
      benefits: product.romanianBenefits ?? [],
      features: product.romanianFeatures ?? [],
      packageContents: product.romanianPackageContents ?? [],
      specifications: product.romanianSpecifications ?? [],
      specificationGroups: product.specificationGroups ?? [],
      documents: getLocalProductDocuments(product),
      galleryImages: getDeployableProductGallery(product).length
        ? getDeployableProductGallery(product)
        : [
            {
              url: getDeployableProductImageUrl(product),
              alt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
              verified: Boolean(product.imageVerified),
            },
          ],
      installation: product.installationConsiderations?.length
        ? product.installationConsiderations
        : [
            "Verificarea spatiului si a conditiilor de utilizare inainte de livrare",
            "Clarificarea accesoriilor, consumabilelor si documentatiei necesare",
            "Integrarea produsului in fluxul operational al clinicii sau laboratorului",
          ],
      maintenance: product.maintenanceConsiderations?.length
        ? product.maintenanceConsiderations
        : [
            "Plan de service si mentenanta adaptat frecventei de utilizare",
            "Verificarea accesoriilor si consumabilelor critice pentru functionare",
            "Suport ZESCORP pentru interventii, configurare si continuitate operationala",
          ],
      relatedServices: product.relatedServices?.length
        ? product.relatedServices
        : [
            "/solutii-medicale/echipamente-imagistica-diagnostic",
            "/service-aparatura-medicala",
            "/contracte-mentenanta",
          ],
      categoryLabel,
      imageUrl: getDeployableProductImageUrl(product),
      imageAlt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
      productCode: product.gimaCode || "",
      brand: product.sourceBrand || "",
      breadcrumbs: product.gimaBreadcrumbs ?? [],
      relatedProductCodes: product.relatedProductCodes ?? [],
      relatedProductGroups: product.relatedProductGroups ?? {
        allRelevantProducts: product.relatedProductCodes ?? [],
      },
      relatedCategoryLinks: product.relatedCategoryLinks ?? [],
      relatedSolutionLinks: product.relatedSolutionLinks ?? [],
      relatedKnowledgeLinks: product.relatedKnowledgeLinks ?? [],
      relatedMaintenanceLinks: product.relatedMaintenanceLinks ?? [],
      buyerJourneyLinks: product.buyerJourneyLinks ?? [],
      seoAuthorityScore: product.seoAuthorityScore ?? 0,
    };
  }

  if (isProductCommerciallyApproved(product) && product.commercialDescription) {
    return {
      description: product.commercialDescription,
      shortSummary: product.commercialDescription,
      applications: product.applications ?? [],
      benefits: product.romanianBenefits ?? [],
      features: product.romanianFeatures ?? [],
      packageContents: product.romanianPackageContents ?? [],
      specifications: product.romanianSpecifications ?? [],
      specificationGroups: product.specificationGroups ?? [],
      documents: getLocalProductDocuments(product),
      galleryImages: getDeployableProductGallery(product).length
        ? getDeployableProductGallery(product)
        : [
            {
              url: getDeployableProductImageUrl(product),
              alt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
              verified: Boolean(product.imageVerified),
            },
          ],
      installation: product.installationConsiderations ?? [],
      maintenance: product.maintenanceConsiderations ?? [],
      relatedServices: product.relatedServices ?? [],
      categoryLabel,
      imageUrl: getDeployableProductImageUrl(product),
      imageAlt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
      productCode: product.gimaCode || "",
      brand: product.sourceBrand || "",
      breadcrumbs: product.gimaBreadcrumbs ?? [],
      relatedProductCodes: product.relatedProductCodes ?? [],
      relatedProductGroups: product.relatedProductGroups ?? {
        allRelevantProducts: product.relatedProductCodes ?? [],
      },
      relatedCategoryLinks: product.relatedCategoryLinks ?? [],
      relatedSolutionLinks: product.relatedSolutionLinks ?? [],
      relatedKnowledgeLinks: product.relatedKnowledgeLinks ?? [],
      relatedMaintenanceLinks: product.relatedMaintenanceLinks ?? [],
      buyerJourneyLinks: product.buyerJourneyLinks ?? [],
      seoAuthorityScore: product.seoAuthorityScore ?? 0,
    };
  }

  return {
    description:
      "Produs disponibil pentru cerere de oferta, cu verificarea aplicatiei clinice, a configuratiei, a conditiilor de livrare si a optiunilor de service inainte de ofertare.",
    shortSummary:
      "Produs disponibil pentru cerere de oferta, cu verificarea aplicatiei clinice, a configuratiei si a optiunilor de service.",
    applications: [
      `Evaluare preliminara pentru categoria ${categoryLabel}`,
      "Cerere de oferta pentru clinici, cabinete sau laboratoare",
      "Comparatie cu alternative si pachete de echipare",
    ],
    benefits: [
      "Selectie orientata spre aplicatia clinica",
      "Posibilitate de ofertare impreuna cu instalare si service",
      "Suport pentru clarificarea consumabilelor si accesoriilor",
    ],
    features: [],
    packageContents: [],
    specifications: [
      { label: "Categorie", value: categoryLabel },
      { label: "Stadiu", value: "Disponibil pentru cerere de oferta" },
      { label: "Suport", value: "Ofertare, instalare si mentenanta" },
    ],
    specificationGroups: [],
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
    categoryLabel,
    imageUrl: getDeployableProductImageUrl(product),
    imageAlt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
    documents: [],
    galleryImages: [
      {
        url: product.imageUrl || getProductCategoryPlaceholder(product.category),
        alt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
        verified: Boolean(product.imageVerified),
      },
    ],
    productCode: product.gimaCode || "",
    brand: product.sourceBrand || "",
    breadcrumbs: product.gimaBreadcrumbs ?? [],
    relatedProductCodes: product.relatedProductCodes ?? [],
    relatedProductGroups: product.relatedProductGroups ?? {
      allRelevantProducts: product.relatedProductCodes ?? [],
    },
    relatedCategoryLinks: product.relatedCategoryLinks ?? [],
    relatedSolutionLinks: product.relatedSolutionLinks ?? [],
    relatedKnowledgeLinks: product.relatedKnowledgeLinks ?? [],
    relatedMaintenanceLinks: product.relatedMaintenanceLinks ?? [],
    buyerJourneyLinks: product.buyerJourneyLinks ?? [],
    seoAuthorityScore: product.seoAuthorityScore ?? 0,
  };
}

function getDeployableProductGallery(product: ProductCatalogItem) {
  return (product.galleryImages ?? []).map((image) => ({
    ...image,
    url: getDeployableProductImageUrl(product, image.url),
  }));
}

function getDeployableProductImageUrl(product: ProductCatalogItem, preferredUrl = product.imageUrl) {
  if (preferredUrl?.startsWith("/product-images/")) {
    const parts = preferredUrl.split("/").filter(Boolean);
    const code = parts[1] || product.gimaCode || product.id;
    const file = parts.slice(2).join("/");
    if (code && file) return `/api/product-assets/images/${code}/${file}`;
  }

  return preferredUrl || getProductCategoryPlaceholder(product.category);
}

function getLocalProductDocuments(product: ProductCatalogItem) {
  if (!isProductIndexable(product)) return [];

  const documents = product.documents ?? {};
  return [
    documents.englishManual
      ? {
          label: "Manual in limba engleza",
          url: documents.englishManual,
          type: "manual",
        }
      : null,
    documents.ceCertificate
      ? {
          label: "Certificat CE",
          url: documents.ceCertificate,
          type: "certificat",
        }
      : null,
    documents.technicalDatasheet
      ? {
          label: "Fisa tehnica",
          url: documents.technicalDatasheet,
          type: "fisa tehnica",
        }
      : null,
  ].filter((item): item is { label: string; url: string; type: string } =>
    Boolean(item && isDeployableProductDocumentUrl(item.url)),
  );
}

function isDeployableProductDocumentUrl(url: string) {
  return !url.startsWith("/product-documents/");
}

function translateGimaCategoryLabel(label: string) {
  const normalized = label.toLowerCase().trim();
  const translations: Record<string, string> = {
    "diagnostic tests - laboratory": "Diagnostic si laborator",
    "laboratories: centrifuges and microscopes": "Laborator / centrifuge si microscoape",
    "first aid & emergency": "Urgenta",
    "dressing and emergency trolleys": "Carucioare medicale si de urgenta",
    "karrel and aurion plastic multi-functional trolleys": "Carucioare medicale multifunctionale",
    furniture: "Mobilier medical",
    "medical furniture": "Mobilier medical",
    "electromedical devices": "Electromedicale",
    gynecology: "Ginecologie",
    gynaecology: "Ginecologie",
    "ent devices": "ORL",
    sterilization: "Sterilizare",
    "surgical instruments": "Instrumentar chirurgical",
    "patient aids": "Ingrijire pacient",
    "ecg, monitors & ultrasound": "Monitorizare",
    "health care - pharmacy": "Ingrijire pacient",
    consumables: "Consumabile",
    "operator's protection": "Protectie operator",
    "medical bags": "Genti medicale",
    "scales & measures": "Cantare si masurare",
    physiotherapy: "Fizioterapie",
    veterinary: "Veterinar",
    "human anatomy models": "Modele anatomice",
    "medical lights": "Lampi medicale",
  };

  return translations[normalized] || "";
}

export function getProductCategoryPlaceholder(category: ProductCategoryId) {
  const images: Record<ProductCategoryId, string> = {
    diagnostic: "/visuals/medical-equipment.webp",
    laboratory: "/visuals/medical-laboratory.webp",
    emergency: "/visuals/technical-service.webp",
    sterilization: "/visuals/preventive-maintenance.webp",
    "medical-furniture": "/visuals/medical-construction.webp",
    ent: "/visuals/medical-equipment.webp",
    gynecology: "/visuals/medical-equipment.webp",
    consumables: "/visuals/preventive-maintenance.webp",
    electromedical: "/visuals/medical-equipment.webp",
    "surgical-instruments": "/visuals/technical-service.webp",
    "patient-care": "/visuals/medical-construction.webp",
    monitoring: "/visuals/technical-service.webp",
    disinfection: "/visuals/preventive-maintenance.webp",
    "operator-protection": "/visuals/preventive-maintenance.webp",
    "medical-bags": "/visuals/medical-equipment.webp",
    "scales-measures": "/visuals/medical-equipment.webp",
    physiotherapy: "/visuals/medical-equipment.webp",
    veterinary: "/visuals/technical-service.webp",
    "anatomy-models": "/visuals/medical-laboratory.webp",
    "medical-lights": "/visuals/medical-equipment.webp",
  };

  return images[category];
}

export function getRelatedServiceLabel(href: string) {
  const labels: Record<string, string> = {
    "/solutii-medicale/echipamente-imagistica-diagnostic": "Echipamente medicale",
    "/solutii-medicale/echipamente-laborator-ivd": "Laborator / IVD",
    "/service-aparatura-medicala": "Service aparatura medicala",
    "/contracte-mentenanta": "Contracte mentenanta",
    "/solutii-medicale/instalare-punere-in-functiune": "Instalare si punere in functiune",
    "/solutii-medicale/service-echipamente-medicale": "Service echipamente",
  };

  return labels[href] || href.replace("/", "").replaceAll("-", " ");
}

