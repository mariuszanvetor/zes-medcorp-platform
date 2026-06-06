import productsJson from "../../data/product-catalog/products.json";

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
  | "disinfection";

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
  commercialCategory?: string;
  imageUrl?: string;
  imageSourceUrl?: string;
  imageVerified?: boolean;
  imageStatus?: "verified" | "missing" | "placeholder";
  galleryImages?: Array<{ url: string; alt: string; verified: boolean }>;
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
  productDocuments?: Array<{ label: string; url: string; type: string }>;
  relatedProductCodes?: string[];
  gimaBreadcrumbs?: string[];
  sourceExtractedAt?: string;
  sourceQuality?: "basic_import" | "gima_page_parity_review";
  publicDisplayReady?: boolean;
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
  return product.romanianTitle || `${product.sourceBrand} ${product.sourceProductName}`.trim();
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
  const categoryLabel = product.commercialCategory || category?.label || "Echipamente medicale";

  if (product.publicDisplayReady && product.romanianDescription) {
    return {
      description: product.romanianDescription,
      shortSummary: product.romanianShortSummary || product.romanianDescription,
      applications: product.romanianApplications ?? [],
      benefits: product.romanianBenefits ?? [],
      features: product.romanianFeatures ?? [],
      packageContents: product.romanianPackageContents ?? [],
      specifications: product.romanianSpecifications ?? [],
      documents: getLocalProductDocuments(product),
      galleryImages: product.galleryImages?.length
        ? product.galleryImages
        : [
            {
              url: product.imageUrl || getProductCategoryPlaceholder(product.category),
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
      imageUrl: product.imageUrl || getProductCategoryPlaceholder(product.category),
      imageAlt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
      productCode: product.gimaCode || "",
      brand: product.sourceBrand || "",
      breadcrumbs: product.gimaBreadcrumbs ?? [],
      relatedProductCodes: product.relatedProductCodes ?? [],
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
      documents: getLocalProductDocuments(product),
      galleryImages: product.galleryImages?.length
        ? product.galleryImages
        : [
            {
              url: product.imageUrl || getProductCategoryPlaceholder(product.category),
              alt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
              verified: Boolean(product.imageVerified),
            },
          ],
      installation: product.installationConsiderations ?? [],
      maintenance: product.maintenanceConsiderations ?? [],
      relatedServices: product.relatedServices ?? [],
      categoryLabel,
      imageUrl: product.imageUrl || getProductCategoryPlaceholder(product.category),
      imageAlt: product.imageAlt || `${getProductDisplayName(product)} pentru clinici si unitati medicale`,
      productCode: product.gimaCode || "",
      brand: product.sourceBrand || "",
      breadcrumbs: product.gimaBreadcrumbs ?? [],
      relatedProductCodes: product.relatedProductCodes ?? [],
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
    imageUrl: product.imageUrl || getProductCategoryPlaceholder(product.category),
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
  };
}

function getLocalProductDocuments(product: ProductCatalogItem) {
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
  ].filter((item): item is { label: string; url: string; type: string } => Boolean(item));
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
