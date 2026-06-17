import type { Metadata } from "next";

import { SeoCommercialLandingPage } from "@/components/sections/SeoCommercialLandingPage";
import { getSeoCommercialLandingByPath } from "@/data/seo-commercial-landings";
import { createWebsiteMetadata } from "@/lib/seo";

const page = getSeoCommercialLandingByPath("/servicii/placare-plumb-camera-rx")!;

export const metadata: Metadata = createWebsiteMetadata({
  title: page.metadataTitle,
  description: page.metadataDescription,
  path: page.path,
  keywords: page.targetKeywords,
});

export default function PlacarePlumbCameraRxPage() {
  return <SeoCommercialLandingPage page={page} />;
}
