import type { MetadataRoute } from "next";

import { articles } from "@/data/articles";
import { programmaticCalculators } from "@/data/calculators";
import { planningJourneys } from "@/data/planning-journeys";
import { seoClusters } from "@/data/seo-clusters";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/seo";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.74 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.76 },
  { path: "/ai-project-advisor", changeFrequency: "monthly", priority: 0.85 },
  { path: "/calculator-proiect-medical", changeFrequency: "monthly", priority: 0.8 },
  { path: "/radiology-room-planner", changeFrequency: "monthly", priority: 0.8 },
  { path: "/service-diagnostic", changeFrequency: "monthly", priority: 0.78 },
  { path: "/proposal-builder", changeFrequency: "monthly", priority: 0.8 },
  { path: "/planificare", changeFrequency: "monthly", priority: 0.84 },
  { path: "/knowledge-hub", changeFrequency: "weekly", priority: 0.86 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.82 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const serviceRoutes = services.map((service) => ({
    url: new URL(service.href, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78,
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

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceRoutes,
    ...planningRoutes,
    ...calculatorRoutes,
    ...clusterRoutes,
    ...articleRoutes,
  ];
}
