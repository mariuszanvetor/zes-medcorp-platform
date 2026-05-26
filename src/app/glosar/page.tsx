import Link from "next/link";
import type { Metadata } from "next";

import { EcosystemNavigation } from "@/components/sections/EcosystemNavigation";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { buildGlossaryClusters } from "@/lib/glossary-engine";
import { createWebsiteMetadata } from "@/lib/seo";
import { glossaryCategories, glossaryTerms, getGlossaryTermsByCategory } from "@/data/glossary";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Glosar medical | ZES MEDCORP",
  description:
    "Definiții, comparații și checklist-uri pentru RMN, CT, radiologie, RF shielding, protecție radiologică, IVD și service.",
  path: "/glosar",
  keywords: [
    "glosar medical",
    "RMN",
    "CT",
    "radiologie",
    "RF shielding",
    "protecție radiologică",
    "IVD",
    "service aparatură medicală",
  ],
});

export default function GlossaryHubPage() {
  const clusters = buildGlossaryClusters();
  const featuredTerms = glossaryTerms.slice(0, 12);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Glosar", href: "/glosar" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow tone="graphite">ZES Technical Glossary</Eyebrow>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.03] text-balance text-slate-950 sm:text-6xl">
              Glosar medical
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              Definiții, comparații și checklist-uri care clarifică termenii
              tehnici din proiectele medicale. Folosește glosarul pentru a
              trece mai repede de la limbajul general la cerințe de proiect,
              riscuri și pași următori.
            </p>
          </div>
        </Container>
      </Section>

      <EcosystemNavigation
        description="Daca un termen indica un proiect real, navigheaza catre comparatii, calculatoare, planificare sau servicii."
        title="Glosarul face legatura cu restul site-ului"
      />

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Categorii
                </p>
                <nav aria-label="Categorii glosar" className="mt-6">
                  <ol className="space-y-3">
                    {clusters.map((cluster) => (
                      <li key={cluster.label}>
                        <Link
                          className="group flex gap-3 text-sm font-semibold leading-6 text-slate-600 transition hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          href={`#${clusterId(cluster.label)}`}
                        >
                          <span className="text-slate-400 group-hover:text-[#0057b8]">
                            {String(
                              glossaryCategories.indexOf(cluster.label) + 1,
                            ).padStart(2, "0")}
                          </span>
                          <span>{cluster.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Card>

              <Card className="mt-5 border-blue-100 bg-white" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Următorul pas
                </p>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Dacă termenul indică un proiect real, continuă către
                  planificare, calculator sau propunere preliminară.
                </p>
                <div className="mt-5 grid gap-2">
                  <Link
                    className="rounded-full bg-[#0057b8] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#00498f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="/proposal-builder"
                  >
                    Deschide Proposal Builder
                  </Link>
                  <Link
                    className="rounded-full border border-blue-100 bg-[#f7fbff] px-4 py-3 text-center text-sm font-bold text-[#0057b8] transition hover:border-blue-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="/planificare"
                  >
                    Vezi planificarea
                  </Link>
                </div>
              </Card>
            </aside>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Termeni prioritari
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {featuredTerms.map((term) => (
                    <Card
                      as="article"
                      className="border-blue-100 bg-white"
                      interactive
                      key={term.slug}
                      padding="lg"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-blue-100 bg-[#f7fbff] px-2.5 py-1 text-xs font-semibold text-[#0057b8]">
                          {term.category}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-semibold leading-tight text-slate-950">
                        {term.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {term.description}
                      </p>
                      <Link
                        className="mt-6 inline-flex text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        href={`/glosar/${term.slug}`}
                      >
                        Deschide termenul
                      </Link>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Clustere tematice
                </h2>
                <div className="grid gap-5 lg:grid-cols-2">
                  {clusters.map((cluster) => (
                    <Card
                      className="border-blue-100 bg-white"
                      id={clusterId(cluster.label)}
                      key={cluster.label}
                      padding="lg"
                    >
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                        {cluster.label}
                      </p>
                      <p className="mt-3 text-base leading-8 text-slate-600">
                        {cluster.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {getGlossaryTermsByCategory(cluster.label)
                          .slice(0, 6)
                          .map((term) => (
                            <Link
                              className="rounded-full border border-slate-200 bg-[#f8fbff] px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-[#0057b8]"
                              href={`/glosar/${term.slug}`}
                              key={term.slug}
                            >
                              {term.title}
                            </Link>
                          ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description="Dacă ai un termen care descrie un proiect real, putem transforma rapid contextul în pași tehnici, servicii și propunere preliminară."
            eyebrow="Următorul pas"
            primaryAction={{
              label: "Solicită evaluare tehnică",
              href: "/contact",
            }}
            secondaryAction={{
              label: "Deschide Proposal Builder",
              href: "/proposal-builder",
            }}
            title="Ai nevoie să legi definiția de un proiect concret?"
            tone="light"
          />
        </Container>
      </Section>
    </>
  );
}

function clusterId(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
