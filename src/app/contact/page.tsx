import Link from "next/link";
import type { Metadata } from "next";

import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Contact ZES MEDCORP | Analiză tehnică pentru proiecte medicale",
  description:
    "Solicită consultanță tehnică ZES pentru infrastructură medicală, radiologie, RF shielding, protecție radiologică, aparatură, IVD și service.",
  path: "/contact",
  keywords: [
    "contact ZES MEDCORP",
    "analiză tehnică proiect medical",
    "consultanță infrastructură medicală",
    "service aparatură medicală",
    "radiologie",
    "RF shielding",
  ],
});

const consultationAreas = [
  "Construcții medicale",
  "Radiologie",
  "RF shielding",
  "Protecție radiologică",
  "Aparatură medicală",
  "Imagistică",
  "IVD / laborator",
  "Service & mentenanță",
  "Consultanță tehnică",
];

const aiLinks = [
  {
    title: "Consultant AI",
    description: "Structurează proiectul, riscurile și serviciile relevante.",
    href: "/ai-project-advisor",
  },
  {
    title: "Calculator proiect medical",
    description: "Verifică nivelul de complexitate înainte de bugetare.",
    href: "/calculator-proiect-medical",
  },
  {
    title: "Radiology Room Planner",
    description: "Separă cerințele CT/RX de cerințele RMN/RF.",
    href: "/radiology-room-planner",
  },
  {
    title: "Diagnostic service",
    description: "Triează problemele de aparatură și pașii de intervenție.",
    href: "/service-diagnostic",
  },
  {
    title: "Proposal Builder",
    description: "Generează o propunere preliminară pentru discuția cu ZES.",
    href: "/proposal-builder",
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
            <div>
              <Eyebrow tone="graphite">Technical consultation</Eyebrow>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                Discută cu ZES despre proiectul medical.
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                Consultanță tehnică pentru infrastructură medicală, radiologie,
                ecranare RF, protecție radiologică, aparatură, imagistică, IVD și
                service specializat.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/ai-project-advisor" size="lg">
                  Începe cu Consultantul AI
                </Button>
                <Button href="/services" size="lg" variant="secondary">
                  Explorează serviciile
                </Button>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Ce primești în prima discuție
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  "Clarificarea riscurilor tehnice și de autorizare.",
                  "Direcționare către serviciile ZES potrivite.",
                  "Pași următori pentru buget, timeline, echipamente și service.",
                ].map((item) => (
                  <div
                    className="rounded-2xl bg-[#f7fbff] p-5 text-base font-semibold leading-7 text-slate-700"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                Categorii solicitare
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Un singur punct de intrare pentru infrastructură, tehnologie și
                service.
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {consultationAreas.map((area) => (
                  <span
                    className="rounded-full border border-blue-100 bg-[#f7fbff] px-3 py-1.5 text-xs font-bold text-[#0057b8]"
                    key={area}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <ConsultationForm />
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                Triage tehnic
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Poți începe și cu o triere tehnică asistată.
              </h2>
            </div>
            <p className="max-w-md text-base leading-8 text-slate-600">
              Instrumentele ajută la ordonarea contextului: proiect, buget,
              radiologie, aparatură, laborator sau service.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {aiLinks.map((link) => (
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
