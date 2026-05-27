import type { Metadata } from "next";

import { AIIntroSection } from "@/components/sections/AIIntroSection";
import { AIMagicLayerSection } from "@/components/sections/AIMagicLayerSection";
import { AIToolsPreviewSection } from "@/components/sections/AIToolsPreviewSection";
import { EquipmentServiceSection } from "@/components/sections/EquipmentServiceSection";
import { EnterpriseTrustBand } from "@/components/sections/EnterpriseTrustBand";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { EcosystemNavigation } from "@/components/sections/EcosystemNavigation";
import { PlanningJourneyBlock } from "@/components/sections/PlanningJourneyBlock";
import { PublicDemoEntrySection } from "@/components/sections/PublicDemoEntrySection";
import { RadiologyShieldingSection } from "@/components/sections/RadiologyShieldingSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { planningJourneys } from "@/data/planning-journeys";
import { homepageMetadata } from "@/lib/seo";

export const metadata: Metadata = homepageMetadata;

export default function Home() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Acasă", href: "/" }]} />
      <HeroSection />
      <EnterpriseTrustBand sourcePage="/" />
      <AIMagicLayerSection />
      <Section
        className="border-y border-blue-100 bg-white"
        spacing="lg"
        tone="transparent"
      >
        <Container>
          <PlanningJourneyBlock
            compact
            description="Nu trebuie sa alegi direct un serviciu. Porneste de la scenariul tau si vezi ce trebuie verificat mai intai."
            journeys={planningJourneys.slice(0, 4)}
            sourcePage="/"
            title="Nu stii de unde sa incepi? Alege un traseu de planificare."
          />
        </Container>
      </Section>
      <EcosystemNavigation
        description="Porneste de la traseul care se potriveste situatiei tale si continua catre instrumente, comparatii, servicii sau analiza tehnica."
        title="Cum incepi cu ZES?"
        compact
      />
      <PublicDemoEntrySection />
      <AIIntroSection />
      <ServicesSection />
      <AIToolsPreviewSection />
      <RadiologyShieldingSection />
      <EquipmentServiceSection />
      <FinalCTASection />
    </>
  );
}
