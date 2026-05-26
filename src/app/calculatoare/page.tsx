import type { Metadata } from "next";
import Link from "next/link";

import { EcosystemNavigation } from "@/components/sections/EcosystemNavigation";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getCalculatorHubSections } from "@/lib/calculator-engine";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Calculatoare medicale | ZES MEDCORP",
  description:
    "Calculatoare orientative pentru RMN, CT, radioprotectie, RF shielding, HVAC, spaÈ›iu, infrastructurÄƒ, service È™i planificare de proiect medical.",
  path: "/calculatoare",
  keywords: [
    "calculatoare medicale",
    "calculator cost RMN",
    "calculator cost CT",
    "estimare RF shielding",
    "estimare radioprotecÈ›ie",
    "planificare proiect medical",
  ],
});

const funnelCards = [
  {
    title: "Continua cu o estimare orientativa",
    description:
      "Alege calculatorul potrivit si vezi rapid complexitatea, riscurile si ipotezele de proiect.",
    href: "/calculatoare/cost-camera-rmn",
    cta: "Estimare RMN",
  },
  {
    title: "Structurare proiect si propunere",
    description:
      "Cand proiectul este suficient de clar, treci in Proposal Builder pentru o structura preliminara.",
    href: "/proposal-builder",
    cta: "Deschide Proposal Builder",
  },
  {
    title: "Pregatire pentru analiza tehnica",
    description:
      "Daca lipsesc planuri sau decizii cheie, Project Intake ajuta la completarea contextului.",
    href: "/project-intake",
    cta: "Start Project Intake",
  },
];

export default function CalculatoareHubPage() {
  const sections = getCalculatorHubSections();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Calculatoare", href: "/calculatoare" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-16">
            <div className="max-w-4xl">
              <Eyebrow tone="graphite">ZES Calculatoare</Eyebrow>
              <h1 className="mt-7 text-5xl font-semibold leading-[1.03] text-balance text-slate-950 sm:text-6xl">
                Calculatoare medicale
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                Estimatoare orientative pentru proiecte medicale, imagisticÄƒ,
                RF shielding, protecÈ›ie radiologicÄƒ, infrastructurÄƒ È™i
                service. FoloseÈ™te-le ca punct de pornire pentru discuÈ›ia
                tehnicÄƒ, nu ca ofertÄƒ finalÄƒ.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/calculatoare/cost-camera-rmn" size="lg">
                  Estimare RMN
                </Button>
                <Button href="/project-intake" size="lg" variant="secondary">
                  Start Project Intake
                </Button>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Cum folosesti calculatoarele
              </p>
              <ol className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <li>
                  1. Alegi scenariul cel mai apropiat de proiectul tau.
                </li>
                <li>
                  2. Verifici ipotezele, intervalele orientative si factorii de risc.
                </li>
                <li>
                  3. Continui cu Proposal Builder sau Project Intake pentru validare.
                </li>
              </ol>
              <p className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-7 text-blue-900">
                Estimarile sunt orientative si nu inlocuiesc verificarea
                tehnica, documentatia de amplasament sau oferta finala.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <EcosystemNavigation
        description="Daca esti la etapa de estimare, continua spre comparatii, glosar sau planificare si apoi revino cu detaliile in Proposal Builder sau Project Intake."
        title="Legaturi rapide din zona de estimare"
      />

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {funnelCards.map((card) => (
              <Card
                className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#f8fbff)]"
                key={card.href}
                padding="lg"
              >
                <h2 className="text-2xl font-semibold leading-tight text-slate-950">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {card.description}
                </p>
                <Link
                  className="mt-7 inline-flex text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={card.href}
                >
                  {card.cta}
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-14">
            {sections.map((section) => (
              <div className="grid gap-6" key={section.group}>
                <div className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                    {section.title}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                    {section.description}
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {section.calculators.map((calculator) => (
                    <Card
                      className="border-blue-100 bg-white"
                      key={calculator.slug}
                      padding="lg"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                        {calculator.eyebrow}
                      </p>
                      <h3 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
                        {calculator.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {calculator.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {calculator.keywords.slice(0, 3).map((keyword) => (
                          <span
                            className="rounded-full border border-slate-200 bg-[#f8fbff] px-3 py-1 text-xs font-semibold text-slate-600"
                            key={keyword}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <Link
                        className="mt-7 inline-flex text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        href={`/calculatoare/${calculator.slug}`}
                      >
                        Deschide calculatorul
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-blue-100 bg-white" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description="Daca ai deja contextul proiectului, continua cu Proposal Builder sau Project Intake pentru o discutie tehnica mai clara."
            eyebrow="Pasul urmator"
            primaryAction={{
              label: "Deschide Proposal Builder",
              href: "/proposal-builder",
            }}
            secondaryAction={{
              label: "Start Project Intake",
              href: "/project-intake",
            }}
            title="Când ai nevoie de validare mai detaliată, treci la instrumentele ZES."
            tone="light"
          />
        </Container>
      </Section>
    </>
  );
}
