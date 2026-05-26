import { createWebsiteMetadata } from "@/lib/seo";
import type { ArticleBlueprint } from "@/lib/content-engine";
import {
  getServiceFunnelBySlug,
  getServiceFunnelDiscoverySections,
  getServiceFunnelHubGroups,
  getServiceFunnelRecommendations,
  serviceFunnelCategoryLabels,
  serviceFunnels,
  type ServiceFunnelPage,
} from "@/data/service-funnels";

export { serviceFunnelCategoryLabels, serviceFunnels, getServiceFunnelBySlug, getServiceFunnelHubGroups };

export function createServiceFunnelMetadata(page: ServiceFunnelPage) {
  return createWebsiteMetadata({
    title: `${page.title} | Servicii ZES MEDCORP`,
    description: page.description,
    path: `/servicii/${page.slug}`,
    keywords: page.seoKeywords,
  });
}

export function buildServiceFunnelDiscoverySections(page: ServiceFunnelPage) {
  return getServiceFunnelDiscoverySections(page);
}

export function getServiceFunnelHubData() {
  return getServiceFunnelHubGroups();
}

export function getServiceFunnelCrossLinks(blueprint: ArticleBlueprint) {
  return getServiceFunnelRecommendations(blueprint);
}
