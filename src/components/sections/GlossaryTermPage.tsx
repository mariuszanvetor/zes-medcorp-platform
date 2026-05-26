import Link from "next/link";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { GlossarySchema } from "@/components/seo/GlossarySchema";
import { HowToSchema } from "@/components/seo/HowToSchema";
import { ReadingProgress } from "@/components/seo/ReadingProgress";
import { RelatedContentBlocks } from "@/components/sections/RelatedContentBlocks";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { getGlossaryDiscoverySections } from "@/lib/glossary-engine";
import type { GlossaryTerm } from "@/data/glossary";

export type GlossaryTermPageProps = {
  term: GlossaryTerm;
};

export function GlossaryTermPage({ term }: GlossaryTermPageProps) {
  const discoverySections = getGlossaryDiscoverySections(term);
  const hasHowTo = Boolean(term.howToSteps?.length);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Glosar", href: "/glosar" },
          { name: term.title, href: `/glosar/${term.slug}` },
        ]}
      />
      <GlossarySchema
        description={term.description}
        name={term.title}
        url={`/glosar/${term.slug}`}
      />
      <FAQSchema items={term.faqs} id={`faq-schema-glosar-${term.slug}`} />
      {hasHowTo && (
        <HowToSchema
          description={term.summary}
          name={term.title}
          steps={(term.howToSteps ?? []).map((step) => ({
            name: step,
            text: step,
          }))}
          url={`/glosar/${term.slug}`}
        />
      )}

      <ReadingProgress />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">{term.category}</Badge>
                <Badge variant="neutral">{term.contentType}</Badge>
                <span className="text-sm font-semibold text-slate-500">
                  {term.readingTime}
                </span>
              </div>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                {term.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                {term.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="blue">Glosar tehnic</Badge>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {term.cluster}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  Actualizat {formatDate(term.updatedAt)}
                </span>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={term.cta.href} size="lg">
                  {term.cta.label}
                </Button>
                <Button href="/contact" size="lg" variant="secondary">
                  Discuta proiectul
                </Button>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Pe scurt
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {term.summary}
              </p>
              <div className="mt-6 grid gap-3">
                {term.technicalNotes.slice(0, 4).map((note) => (
                  <div
                    className="rounded-2xl bg-[#f7fbff] p-4 text-sm font-medium leading-6 text-slate-700"
                    key={note}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Cuprins
                </p>
                <nav aria-label={`Cuprins ${term.title}`} className="mt-6">
                  <ol className="space-y-3">
                    {term.sections.map((section, index) => (
                      <li key={section.id}>
                        <Link
                          className="group flex gap-3 text-sm font-semibold leading-6 text-slate-600 transition hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          href={`#${section.id}`}
                        >
                          <span className="text-slate-400 group-hover:text-[#0057b8]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{section.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Card>

              <Card className="mt-5 border-blue-100 bg-white" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Urmatorul pas
                </p>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Daca acest termen descrie contextul proiectului tau, continua cu
                  o analiza tehnica preliminara sau cu o propunere orientativa.
                </p>
                <div className="mt-5 grid gap-2">
                  <Button href={term.cta.href} size="sm">
                    {term.cta.label}
                  </Button>
                  <Button href="/proposal-builder" size="sm" variant="secondary">
                    Deschide Proposal Builder
                  </Button>
                </div>
              </Card>
            </aside>

            <article className="mx-auto w-full max-w-3xl">
              <p className="text-xl font-semibold leading-9 text-slate-950 sm:text-2xl sm:leading-10">
                {term.definition}
              </p>

              <div className="mt-8 rounded-2xl border border-blue-100 bg-[#f7fbff] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Validare tehnica
                </p>
                <p className="mt-3 text-base leading-8 text-slate-700">
                  {term.validationNotes[0] ?? term.summary}
                </p>
              </div>

              <div className="mt-14 space-y-14">
                {term.sections.map((section) => (
                  <section id={section.id} key={section.id}>
                    <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-5">
                      {section.body.map((paragraph) => (
                        <p
                          className="text-lg leading-9 text-slate-600"
                          key={paragraph}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets && (
                      <ul className="mt-6 space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            className="flex gap-4 text-base leading-8 text-slate-600"
                            key={bullet}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.callout && (
                      <div className="mt-8 rounded-2xl border border-blue-100 bg-[#f7fbff] p-6">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                          {section.callout.title}
                        </p>
                        <p className="mt-3 text-base leading-8 text-slate-700">
                          {section.callout.body}
                        </p>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              <section className="mt-16" id="intrebari-frecvente">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Intrebari frecvente
                </h2>
                <div className="mt-8 space-y-4">
                  {term.faqs.map((item) => (
                    <Card
                      as="article"
                      className="border-blue-100 bg-white"
                      key={item.question}
                      padding="lg"
                    >
                      <h3 className="text-xl font-semibold leading-tight text-slate-950">
                        {item.question}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        {item.answer}
                      </p>
                    </Card>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <RelatedContentBlocks sections={discoverySections} />
        </Container>
      </Section>

      <Section className="bg-white" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description={term.cta.description}
            eyebrow="Consultanta tehnica"
            primaryAction={{
              label: term.cta.label,
              href: term.cta.href,
            }}
            secondaryAction={{
              label: "Inapoi la Glosar",
              href: "/glosar",
            }}
            title={term.cta.title}
            tone="light"
          />
        </Container>
      </Section>
    </>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
