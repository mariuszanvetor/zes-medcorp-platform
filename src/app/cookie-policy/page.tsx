import type { Metadata } from "next";

import { LegalPageTemplate } from "@/components/sections/LegalPageTemplate";
import { getLegalPage } from "@/data/legal-pages";
import { createWebsiteMetadata } from "@/lib/seo";

const page = getLegalPage("cookie-policy")!;

export const metadata: Metadata = createWebsiteMetadata({
  title: `${page.title} | ZES MEDCORP`,
  description: page.description,
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return <LegalPageTemplate page={page} />;
}
