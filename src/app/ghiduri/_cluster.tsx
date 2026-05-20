import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SeoClusterPage } from "@/components/sections/SeoClusterPage";
import { getSeoClusterBySlug } from "@/data/seo-clusters";
import { createWebsiteMetadata } from "@/lib/seo";

export function createSeoClusterMetadata(slug: string): Metadata {
  const cluster = getSeoClusterBySlug(slug);

  if (!cluster) {
    notFound();
  }

  return createWebsiteMetadata({
    title: `${cluster.title} | Ghiduri ZES MEDCORP`,
    description: cluster.description,
    path: `/ghiduri/${cluster.slug}`,
    keywords: [cluster.targetKeyword, ...cluster.secondaryKeywords],
  });
}

export function renderSeoClusterPage(slug: string) {
  const cluster = getSeoClusterBySlug(slug);

  if (!cluster) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Ghiduri", href: "/knowledge-hub" },
          { name: cluster.title, href: `/ghiduri/${cluster.slug}` },
        ]}
      />
      <SeoClusterPage cluster={cluster} />
    </>
  );
}
