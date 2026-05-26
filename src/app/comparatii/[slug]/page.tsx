import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComparisonPage } from "@/components/sections/ComparisonPage";
import { comparisonPages, getComparisonPageBySlug } from "@/lib/comparison-engine";
import { createWebsiteMetadata } from "@/lib/seo";

type ComparisonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return comparisonPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonPageBySlug(slug);

  if (!page) {
    return createWebsiteMetadata({
      title: "Comparatii tehnice | ZES MEDCORP",
      description:
        "Comparații tehnice pentru infrastructură medicală, imagistică, RF shielding, radioprotecție, service și planificare clinică.",
      path: "/comparatii",
    });
  }

  return createWebsiteMetadata({
    title: `${page.title} | Comparatii | ZES MEDCORP`,
    description: page.description,
    path: `/comparatii/${page.slug}`,
    keywords: [
      page.targetKeyword,
      page.category,
      ...page.entities.map((entity) => entity.label),
    ],
  });
}

export default async function ComparisonRoute({
  params,
}: ComparisonPageProps) {
  const { slug } = await params;
  const page = getComparisonPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <ComparisonPage page={page} />;
}
