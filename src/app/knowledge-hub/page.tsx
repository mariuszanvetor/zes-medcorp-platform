import Link from "next/link";
import type { Metadata } from "next";

import { KnowledgeHubArticles } from "@/components/sections/KnowledgeHubArticles";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Knowledge Hub | ZES MEDCORP",
  description:
    "Ghiduri tehnice și resurse pentru infrastructură medicală, radiologie, RF shielding, protecție radiologică, aparatură medicală, IVD și service.",
  path: "/knowledge-hub",
  keywords: [
    "knowledge hub medical",
    "ghiduri infrastructură medicală",
    "radiologie",
    "RF shielding",
    "protecție radiologică",
    "aparatură medicală",
    "IVD laborator",
    "service aparatură medicală",
  ],
});

const internalLinks = [
  {
    title: "Planificare proiect medical",
    description:
      "Alege scenariul potrivit si continua catre servicii, ghiduri si instrumente relevante.",
    href: "/planificare",
  },
  {
    title: "Servicii ZES",
    description:
      "Explorează pilonii tehnici: construcții, radiologie, RF shielding, protecție radiologică, aparatură, IVD și service.",
    href: "/services",
  },
  {
    title: "Calculator proiect medical",
    description:
      "Estimează complexitatea inițială a unui proiect medical fără a afișa prețuri finale.",
    href: "/calculator-proiect-medical",
  },
  {
    title: "Calculatoare specializate",
    description:
      "Pornește de la estimatoare dedicate pentru RMN, CT, IVD, imagistică sau service aparatură.",
    href: "/calculatoare/cost-camera-rmn",
  },
  {
    title: "Radiology Room Planner",
    description:
      "Planifică cerințele pentru CT, RMN sau RX, cu separare clară între RF și protecție radiologică.",
    href: "/radiology-room-planner",
  },
  {
    title: "Service Diagnostic",
    description:
      "Triează problemele de aparatură medicală și pregătește o solicitare de evaluare service.",
    href: "/service-diagnostic",
  },
  {
    title: "Proposal Builder",
    description:
      "Transformă contextul proiectului într-o propunere tehnică preliminară pentru discuția cu ZES.",
    href: "/proposal-builder",
  },
];

export default function KnowledgeHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Knowledge Hub", href: "/knowledge-hub" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow tone="graphite">ZES Knowledge Center</Eyebrow>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.03] text-balance text-slate-950 sm:text-6xl">
              Knowledge Hub
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              Ghiduri tehnice, explicații și resurse pentru infrastructură
              medicală, radiologie, ecranare RF, protecție radiologică,
              aparatură, IVD și service.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              "Infrastructură medicală",
              "Imagistică, IVD și aparatură",
              "Autorizări, ecranare și service",
            ].map((item) => (
              <div
                className="rounded-2xl border border-blue-100 bg-white p-6 text-center text-sm font-bold uppercase tracking-[0.12em] text-[#0057b8] shadow-[0_18px_60px_rgba(0,87,184,0.07)]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" tone="transparent">
        <Container>
          <KnowledgeHubArticles />
        </Container>
      </Section>

      <Section
        className="border-y border-blue-100 bg-white"
        id="autorizari"
        spacing="md"
        tone="transparent"
      >
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description="Răspunde la câteva întrebări și obține o primă structură de proiect, riscuri, servicii relevante și pași următori."
            eyebrow="Primul pas"
            primaryAction={{
              label: "Începe analiza inițială",
              href: "/ai-project-advisor",
            }}
            secondaryAction={{
              label: "Vezi serviciile",
              href: "/services",
            }}
            title="Nu știi de unde să începi proiectul?"
            tone="light"
          />
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                Resurse conectate
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Continuă din ghiduri către planificare tehnică.
              </h2>
            </div>
            <Button href="/services" variant="secondary">
              Toate serviciile
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {internalLinks.map((link) => (
              <Card
                as="article"
                className="border-blue-100 bg-white"
                interactive
                key={link.href}
                padding="lg"
              >
                <h3 className="text-xl font-semibold leading-tight text-slate-950">
                  {link.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {link.description}
                </p>
                <Link
                  className="mt-7 inline-flex text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={link.href}
                >
                  Deschide
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
