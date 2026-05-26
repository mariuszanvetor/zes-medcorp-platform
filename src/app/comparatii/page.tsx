import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getComparisonHubSections } from "@/lib/comparison-engine";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Comparații tehnice | ZES MEDCORP",
  description:
    "Comparații tehnice pentru RMN, CT, radioprotecție, RF shielding, echipamente, service și planificare clinică.",
  path: "/comparatii",
  keywords: [
    "comparații medicale",
    "RMN vs CT",
    "RF shielding vs radioprotecție",
    "service medical",
    "planificare clinică",
  ],
});

export default function ComparatiiPage() {
  const sections = getComparisonHubSections();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Comparații", href: "/comparatii" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow tone="graphite">ZES Comparison Hub</Eyebrow>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.03] text-balance text-slate-950 sm:text-6xl">
              Comparații tehnice
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              Pagini programatice pentru alegeri medicale importante: imagistică,
              infrastructură, RF shielding, radioprotecție, echipamente, service și
              planificare clinică.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              "Compară opțiuni tehnice",
              "Separă cerințe diferite",
              "Pregătește următorul pas",
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

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-8">
            {sections.map((section) => (
              <div key={section.group}>
                <div className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                    {section.title}
                  </p>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {section.description}
                  </p>
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {section.pages.map((page) => (
                    <Card
                      as="article"
                      className="border-blue-100 bg-white"
                      interactive
                      key={page.slug}
                      padding="lg"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                        {page.category}
                      </p>
                      <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
                        {page.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {page.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {page.entities.slice(0, 2).map((entity) => (
                          <span
                            className="rounded-full border border-slate-200 bg-[#f8fbff] px-3 py-1 text-xs font-semibold text-slate-600"
                            key={entity.key}
                          >
                            {entity.label}
                          </span>
                        ))}
                      </div>
                      <Link
                        className="mt-7 inline-flex text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        href={`/comparatii/${page.slug}`}
                      >
                        Vezi comparatia
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
            description="Daca alegerea depinde de spatiu, echipament, radioprotectie sau buget, transforma comparatia intr-un plan tehnic clar."
            eyebrow="Urmatorul pas"
            primaryAction={{
              label: "Pregateste propunerea preliminara",
              href: "/proposal-builder",
            }}
            secondaryAction={{
              label: "Trimite Project Intake",
              href: "/project-intake",
            }}
            title="Nu ramane doar la comparatie."
            tone="light"
          />
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Ce gasesti aici
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Comparatii utile pentru decizii comerciale si tehnice, fara sa
                forteze concluzii artificiale.
              </p>
            </Card>
            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Cum folosesti paginile
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Porneste de la categoria potrivita si continua catre calculator,
                Proposal Builder sau Project Intake.
              </p>
            </Card>
            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Disclamer
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Estimare orientativa, nu oferta tehnica sau comerciala finala.
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
