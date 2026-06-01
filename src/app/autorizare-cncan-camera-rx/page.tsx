import type { Metadata } from "next";

import { CommercialLandingPage } from "@/components/sections/CommercialLandingPage";
import { getCommercialLandingPage } from "@/data/commercial-landing-pages";
import { createWebsiteMetadata } from "@/lib/seo";

const page = getCommercialLandingPage("autorizare-cncan-camera-rx")!;

export const metadata: Metadata = createWebsiteMetadata({
  title: page.metadataTitle,
  description: page.metadataDescription,
  path: `/${page.slug}`,
  keywords: page.keywords,
});

export default function AutorizareCncanCameraRxPage() {
  return <CommercialLandingPage page={page} />;
}
