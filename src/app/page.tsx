import type { Metadata } from "next";

import { EnterpriseTrustBand } from "@/components/sections/EnterpriseTrustBand";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { EcosystemNavigation } from "@/components/sections/EcosystemNavigation";
import { HomepageTrustLayer } from "@/components/sections/HomepageTrustLayer";
import { PlanningJourneyBlock } from "@/components/sections/PlanningJourneyBlock";
import { PortfolioShowcaseSection } from "@/components/sections/PortfolioShowcaseSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ZESGuideSection } from "@/components/sections/ZESGuideSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { planningJourneys } from "@/data/planning-journeys";
import { homepageMetadata } from "@/lib/seo";

export const metadata: Metadata = homepageMetadata;

export default function Home() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Acasa", href: "/" }]} />
      <HeroSection />
      <ServicesSection />
      <EnterpriseTrustBand
        sourcePage="/"
        title="Expertiza reala pentru infrastructura medicala complexa."
        description="ZESCORP coordoneaza proiectare, radioprotectie, RF shielding, aparatura si service intr-un flux clar, tehnic si verificabil."
      />
      <PortfolioShowcaseSection />
      <HomepageTrustLayer />
      <ZESGuideSection />
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
        compact
        description="Porneste de la traseul care se potriveste situatiei tale si continua catre instrumente, comparatii, servicii sau analiza tehnica."
        title="Cum incepi cu ZES?"
      />
      <FinalCTASection />
    </>
  );
}
