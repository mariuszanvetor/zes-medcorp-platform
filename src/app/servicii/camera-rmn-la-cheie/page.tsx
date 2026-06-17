import type { Metadata } from "next";

import { SeoCommercialLandingPage } from "@/components/sections/SeoCommercialLandingPage";
import { getSeoCommercialLandingByPath } from "@/data/seo-commercial-landings";
import { createWebsiteMetadata } from "@/lib/seo";

const page = getSeoCommercialLandingByPath("/servicii/camera-rmn-la-cheie")!;

export const metadata: Metadata = createWebsiteMetadata({
  title: page.metadataTitle,
  description: page.metadataDescription,
  path: page.path,
  keywords: page.targetKeywords,
});

export default function CameraRmnLaCheiePage() {
  return <SeoCommercialLandingPage page={page} />;
}
