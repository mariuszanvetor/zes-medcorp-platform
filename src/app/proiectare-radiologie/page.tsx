import type { Metadata } from "next";

import { CommercialLandingPage } from "@/components/sections/CommercialLandingPage";
import { getCommercialLandingPage } from "@/data/commercial-landing-pages";
import { createWebsiteMetadata } from "@/lib/seo";

const page = getCommercialLandingPage("proiectare-radiologie")!;

export const metadata: Metadata = createWebsiteMetadata({
  title: page.metadataTitle,
  description: page.metadataDescription,
  path: `/${page.slug}`,
  keywords: page.keywords,
});

export default function ProiectareRadiologiePage() {
  return <CommercialLandingPage page={page} />;
}
