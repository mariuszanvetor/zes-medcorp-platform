import type { Metadata } from "next";

import { AIIntroSection } from "@/components/sections/AIIntroSection";
import { AIToolsPreviewSection } from "@/components/sections/AIToolsPreviewSection";
import { EquipmentServiceSection } from "@/components/sections/EquipmentServiceSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { RadiologyShieldingSection } from "@/components/sections/RadiologyShieldingSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { homepageMetadata } from "@/lib/seo";

export const metadata: Metadata = homepageMetadata;

export default function Home() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Acasă", href: "/" }]} />
      <HeroSection />
      <AIIntroSection />
      <ServicesSection />
      <AIToolsPreviewSection />
      <RadiologyShieldingSection />
      <EquipmentServiceSection />
      <FinalCTASection />
    </>
  );
}
