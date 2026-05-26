import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GlossaryTermPage } from "@/components/sections/GlossaryTermPage";
import { getGlossaryStaticParams, getGlossaryTerm } from "@/lib/glossary-engine";
import { createWebsiteMetadata } from "@/lib/seo";

type GlossaryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getGlossaryStaticParams();
}

export async function generateMetadata({
  params,
}: GlossaryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);

  if (!term) {
    notFound();
  }

  return createWebsiteMetadata({
    title: `${term.title} | Glosar ZES`,
    description: term.description,
    path: `/glosar/${term.slug}`,
    keywords: [term.targetKeyword, term.category, term.cluster],
  });
}

export default async function GlossaryTermRoute({
  params,
}: GlossaryPageProps) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);

  if (!term) {
    notFound();
  }

  return <GlossaryTermPage term={term} />;
}
