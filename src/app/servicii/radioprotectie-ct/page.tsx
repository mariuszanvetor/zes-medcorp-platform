import type { Metadata } from "next";

import { SeoCommercialLandingPage } from "@/components/sections/SeoCommercialLandingPage";
import { getSeoCommercialLandingByPath } from "@/data/seo-commercial-landings";
import { createWebsiteMetadata } from "@/lib/seo";

const page = getSeoCommercialLandingByPath("/servicii/radioprotectie-ct")!;

export const metadata: Metadata = createWebsiteMetadata({
  title: page.metadataTitle,
  description: page.metadataDescription,
  path: page.path,
  keywords: page.targetKeywords,
});

export default function RadioprotectieCtPage() {
  return <SeoCommercialLandingPage page={page} />;
}
