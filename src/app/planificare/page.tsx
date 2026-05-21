import type { Metadata } from "next";

import { PlanningJourneyBlock } from "@/components/sections/PlanningJourneyBlock";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { planningJourneys } from "@/data/planning-journeys";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Planificare proiect medical | ZES MEDCORP",
  description:
    "Alege scenariul potrivit si parcurge pasii recomandati pentru infrastructura medicala, aparatura, radiologie, IVD, ecranare sau service.",
  path: "/planificare",
  keywords: [
    "planificare proiect medical",
    "planificare clinica medicala",
    "planificare camera RMN",
    "planificare camera CT",
    "aparatura medicala",
    "laborator IVD",
  ],
});

export default function PlanningPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Planificare", href: "/planificare" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow tone="graphite">Sistem de planificare ZES</Eyebrow>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
              Planificare proiect medical
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              Alege scenariul potrivit si parcurge pasii recomandati pentru
              infrastructura, aparatura, radiologie, IVD, ecranare sau service.
            </p>
            <div className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2">
              {["clinica", "RMN", "CT / RX", "IVD", "service"].map((item) => (
                <Badge key={item} variant="blue">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <PlanningJourneyBlock
            description="Traseele grupeaza articole, ghiduri, servicii si instrumente in jurul scenariului real al proiectului."
            journeys={planningJourneys}
            sourcePage="/planificare"
            title="Cu ce situatie seamana proiectul tau?"
          />
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-white"
            description="Daca scenariul nu este clar, porneste cu o analiza preliminara. Rezultatul ramane orientativ si trebuie validat tehnic inainte de oferta finala."
            eyebrow="Nu stii exact traseul?"
            primaryAction={{
              label: "Incepe cu Consultantul AI",
              href: "/ai-project-advisor",
            }}
            secondaryAction={{
              label: "Discuta proiectul",
              href: "/contact",
            }}
            title="ZES te ajuta sa separi etapa de orientare de decizia tehnica."
            tone="light"
          />
        </Container>
      </Section>
    </>
  );
}
