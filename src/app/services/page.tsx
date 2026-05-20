import Link from "next/link";
import type { Metadata } from "next";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Servicii ZES MEDCORP | Infrastructură, aparatură, imagistică și service",
  description:
    "Servicii pentru infrastructură medicală, aparatură, imagistică, IVD, RF shielding, protecție radiologică, integrare echipamente și service.",
  path: "/services",
  keywords: [
    "servicii infrastructură medicală",
    "construcții clinici medicale",
    "amenajări medicale",
    "radiologie",
    "ecranare RF",
    "protecție radiologică",
    "imagistică medicală",
    "IVD",
    "service aparatură medicală",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Servicii", href: "/services" },
        ]}
      />
      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow>Servicii tehnice</Eyebrow>
            <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1.05] text-balance text-slate-950 sm:text-6xl">
              Servicii pentru infrastructură medicală, aparatură, imagistică și service.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              ZES MEDCORP nu este o clinică și nu este doar constructor. ZES
              este partener de infrastructură medicală și tehnologie: construcții,
              fit-out, radiologie, RF shielding pentru RMN, protecție radiologică
              pentru CT/RX, aparatură, imagistică, IVD, integrare și service.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button className="rounded-full px-7" href="/ai-project-advisor" size="lg">
                Analiză preliminară
              </Button>
              <Button className="rounded-full border-blue-200 px-7 text-[#0057b8]" href="/contact" size="lg" variant="secondary">
                Solicitați evaluare tehnică
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" tone="transparent">
        <Container>
          <div>
            <SectionHeading
              align="center"
              className="mx-auto"
              eyebrow="Structură servicii"
              title="Pilonii sunt separați clar, dar coordonați într-un singur sistem."
              description="RF shielding pentru RMN nu este același lucru cu protecția radiologică pentru CT/RX. Aparatura, imagistica, IVD-ul, integrarea și service-ul sunt piloni comerciali separați, nu note de subsol la construcții."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card as="article" className="min-h-72" interactive key={service.slug} padding="lg">
                  <h2 className="text-xl font-semibold text-slate-950">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {service.seoDescription}
                  </p>
                  <Link
                    className="mt-6 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    href={service.href}
                  >
                    Explorați serviciul
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
