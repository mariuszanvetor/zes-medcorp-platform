import type { Metadata } from "next";

import { LegalPageTemplate } from "@/components/sections/LegalPageTemplate";
import { getLegalPage } from "@/data/legal-pages";
import { createWebsiteMetadata } from "@/lib/seo";

const page = getLegalPage("gdpr")!;

export const metadata: Metadata = createWebsiteMetadata({
  title: `${page.title} | ZES MEDCORP`,
  description: page.description,
  path: "/gdpr",
});

export default function GDPRPage() {
  return <LegalPageTemplate page={page} />;
}
