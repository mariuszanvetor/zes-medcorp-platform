import type { Metadata } from "next";

import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomepageTrustLayer } from "@/components/sections/HomepageTrustLayer";
import { PortfolioShowcaseSection } from "@/components/sections/PortfolioShowcaseSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { homepageMetadata } from "@/lib/seo";

export const metadata: Metadata = homepageMetadata;

export default function Home() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Acasa", href: "/" }]} />
      <HeroSection />
      <ServicesSection />
      <PortfolioShowcaseSection />
      <HomepageTrustLayer />
      <FinalCTASection />
    </>
  );
}
