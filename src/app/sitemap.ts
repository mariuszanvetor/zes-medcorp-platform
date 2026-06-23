import type { MetadataRoute } from "next";

import { articles } from "@/data/articles";
import { programmaticCalculators } from "@/data/calculators";
import { caseStudies } from "@/data/case-studies";
import { glossaryTerms } from "@/data/glossary";
import { comparisonPages } from "@/data/comparisons";
import { commercialLandingPages } from "@/data/commercial-landing-pages";
import { legalPages } from "@/data/legal-pages";
import { maintenanceContractPages } from "@/data/maintenance-contracts";
import { planningJourneys } from "@/data/planning-journeys";
import { revenueLandingPages } from "@/data/revenue-landing-pages";
import { seoClusters } from "@/data/seo-clusters";
import { seoCommercialLandings } from "@/data/seo-commercial-landings";
import { serviceFunnels } from "@/data/service-funnels";
import { services } from "@/data/services";
import { getCategoryPath, getIndexableProducts, productCategories } from "@/lib/product-catalog";
import { siteConfig } from "@/lib/seo";

const MAX_SITEMAP_PRODUCT_URLS = 500;

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/solutii-medicale", changeFrequency: "monthly", priority: 0.94 },
  { path: "/contracte-mentenanta", changeFrequency: "monthly", priority: 0.9 },
  { path: "/servicii", changeFrequency: "monthly", priority: 0.88 },
  { path: "/servicii/cabinetcare", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.74 },
  { path: "/companie", changeFrequency: "monthly", priority: 0.76 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.76 },
  { path: "/studii-de-caz", changeFrequency: "monthly", priority: 0.82 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.78 },
  { path: "/ai-discovery", changeFrequency: "monthly", priority: 0.86 },
  { path: "/ai-project-advisor", changeFrequency: "monthly", priority: 0.85 },
  { path: "/calculator-proiect-medical", changeFrequency: "monthly", priority: 0.8 },
  { path: "/calculatoare", changeFrequency: "weekly", priority: 0.85 },
  { path: "/radiology-room-planner", changeFrequency: "monthly", priority: 0.8 },
  { path: "/service-diagnostic", changeFrequency: "monthly", priority: 0.78 },
  { path: "/proposal-builder", changeFrequency: "monthly", priority: 0.8 },
  { path: "/project-intake", changeFrequency: "monthly", priority: 0.81 },
  { path: "/radioprotectie-plumbare-rx", changeFrequency: "monthly", priority: 0.82 },
  { path: "/planificare", changeFrequency: "monthly", priority: 0.84 },
  { path: "/glosar", changeFrequency: "weekly", priority: 0.84 },
  { path: "/comparatii", changeFrequency: "weekly", priority: 0.83 },
  { path: "/ghiduri", changeFrequency: "weekly", priority: 0.86 },
  { path: "/knowledge-hub", changeFrequency: "weekly", priority: 0.86 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.82 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const seoCommercialPaths = new Set(seoCommercialLandings.map((page) => page.path));
  const indexableProducts = getIndexableProducts().slice(0, MAX_SITEMAP_PRODUCT_URLS);
  const serviceRoutes = services.map((service) => ({
    url: new URL(service.href, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  const serviceFunnelRoutes = serviceFunnels
    .filter((page) => !seoCommercialPaths.has(`/servicii/${page.slug}`))
    .map((page) => ({
      url: new URL(`/servicii/${page.slug}`, siteConfig.url).toString(),
      lastModified: new Date(page.updatedAt),
      changeFrequency: "monthly" as const,
      priority:
        page.category === "radioprotectie-rf" || page.slug === "proiectare-camera-rmn"
          ? 0.84
          : 0.8,
    }));

  const commercialRoutes = commercialLandingPages.map((page) => ({
    url: new URL(`/${page.slug}`, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  const seoCommercialRoutes = seoCommercialLandings.map((page) => ({
    url: new URL(page.path, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority:
      page.path === "/service-aparatura-medicala" ||
      page.path === "/aparatura-medicala-bucuresti" ||
      page.path === "/servicii/pacs-medical"
        ? 0.91
        : 0.88,
  }));

  const revenueRoutes = revenueLandingPages.map((page) => ({
    url: new URL(`/solutii-medicale/${page.slug}`, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.pillar === "service-maintenance" ? 0.89 : 0.9,
  }));

  const maintenanceRoutes = maintenanceContractPages.map((page) => ({
    url: new URL(`/contracte-mentenanta/${page.slug}`, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  const indexableProductRoutes = indexableProducts.map((product) => ({
    url: new URL(`/produse/${product.slug}`, siteConfig.url).toString(),
    lastModified: new Date(product.indexableAt ?? now),
    changeFrequency: "monthly" as const,
    priority: 0.62,
  }));

  const indexableProductCategories = new Set(indexableProducts.map((product) => product.category));
  const indexableCategoryRoutes = productCategories
    .filter((category) => indexableProductCategories.has(category.id))
    .map((category) => ({
      url: new URL(getCategoryPath(category), siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.66,
    }));

  const articleRoutes = articles.map((article) => ({
    url: new URL(`/knowledge-hub/${article.slug}`, siteConfig.url).toString(),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority:
      article.slug === "diferenta-dintre-rf-shielding-si-ecranarea-cu-plumb"
        ? 0.84
        : article.slug === "cum-se-construieste-o-clinica-medicala-in-romania" ||
            article.slug === "ce-trebuie-sa-stii-despre-autorizarea-cncan"
          ? 0.82
          : 0.72,
  }));

  const clusterRoutes = seoClusters.map((cluster) => ({
    url: new URL(`/ghiduri/${cluster.slug}`, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority:
      cluster.slug === "cost-clinica-medicala" ||
      cluster.slug === "cost-camera-rmn" ||
      cluster.slug === "cost-camera-ct"
        ? 0.83
        : 0.79,
  }));

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: new URL(`/studii-de-caz/${study.slug}`, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const comparisonRoutes = comparisonPages.map((page) => ({
    url: new URL(`/comparatii/${page.slug}`, siteConfig.url).toString(),
    lastModified: new Date(page.updatedAt),
    changeFrequency: "monthly" as const,
    priority:
      page.hubGroup === "radioprotectie-rf" || page.slug === "rmn-vs-ct" || page.slug === "ct-vs-cbct"
        ? 0.82
        : 0.79,
  }));

  const calculatorRoutes = programmaticCalculators.map((calculator) => ({
    url: new URL(`/calculatoare/${calculator.slug}`, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority:
      calculator.slug === "cost-camera-rmn" ||
      calculator.slug === "cost-camera-ct"
        ? 0.82
      : 0.78,
  }));

  const glossaryRoutes = glossaryTerms.map((term) => ({
    url: new URL(`/glosar/${term.slug}`, siteConfig.url).toString(),
    lastModified: new Date(term.updatedAt),
    changeFrequency: "monthly" as const,
    priority:
      term.contentType === "comparison" || term.contentType === "checklist"
        ? 0.76
        : 0.7,
  }));

  const planningRoutes = planningJourneys.map((journey) => ({
    url: new URL(`/planificare/${journey.slug}`, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority:
      journey.slug === "nu-stiu-de-unde-sa-incep" ||
      journey.slug === "deschid-clinica-medicala"
        ? 0.82
        : 0.78,
  }));

  const legalRoutes = legalPages.map((page) => ({
    url: new URL(`/${page.slug}`, siteConfig.url).toString(),
    lastModified: new Date(page.updatedAt),
    changeFrequency: "yearly" as const,
    priority: 0.35,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceRoutes,
    ...seoCommercialRoutes,
    ...commercialRoutes,
    ...revenueRoutes,
    ...maintenanceRoutes,
    ...indexableCategoryRoutes,
    ...indexableProductRoutes,
    ...serviceFunnelRoutes,
    ...planningRoutes,
    ...calculatorRoutes,
    ...glossaryRoutes,
    ...clusterRoutes,
    ...caseStudyRoutes,
    ...comparisonRoutes,
    ...articleRoutes,
    ...legalRoutes,
  ];
}
