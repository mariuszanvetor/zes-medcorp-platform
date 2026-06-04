import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RevenueLandingPage } from "@/components/sections/RevenueLandingPage";
import {
  getRevenueLandingPage,
  revenueLandingPages,
} from "@/data/revenue-landing-pages";
import { createWebsiteMetadata } from "@/lib/seo";

type RevenueLandingRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return revenueLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: RevenueLandingRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getRevenueLandingPage(slug);

  if (!page) {
    notFound();
  }

  return createWebsiteMetadata({
    title: page.metadataTitle,
    description: page.metadataDescription,
    path: `/solutii-medicale/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function RevenueLandingRoute({ params }: RevenueLandingRouteProps) {
  const { slug } = await params;
  const page = getRevenueLandingPage(slug);

  if (!page) {
    notFound();
  }

  return <RevenueLandingPage page={page} />;
}
