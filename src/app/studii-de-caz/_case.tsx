import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { caseStudies } from "@/data/case-studies";
import { createWebsiteMetadata } from "@/lib/seo";

export function createCaseStudyMetadata(slug: string): Metadata {
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return createWebsiteMetadata({
    title: `${study.title} | Studii de caz ZESCORP`,
    description: study.description,
    path: `/studii-de-caz/${study.slug}`,
    keywords: [study.category, study.title, "ZESCORP"],
  });
}

export function renderCaseStudy(slug: string) {
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Studii de caz", href: "/studii-de-caz" },
          { name: study.title, href: `/studii-de-caz/${study.slug}` },
        ]}
      />
      <ArticleSchema
        headline={study.title}
        description={study.description}
        url={`/studii-de-caz/${study.slug}`}
        datePublished="2026-06-17"
        dateModified="2026-06-17"
        articleSection={study.category}
        keywords={[study.category, "infrastructura medicala", "ZESCORP"]}
      />
      <main>
        <Section
          className="bg-[linear-gradient(135deg,#04152d_0%,#062a55_58%,#0b3f78_100%)]"
          spacing="xl"
          tone="transparent"
        >
          <Container>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
              Studiu de caz orientativ
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {study.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-100">
              {study.description}
            </p>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <aside className="rounded-3xl border border-blue-100 bg-[#f7fbff] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Context comercial
                </p>
                <dl className="mt-6 grid gap-4 text-sm leading-7">
                  <div>
                    <dt className="font-bold text-slate-950">Timeline</dt>
                    <dd className="text-slate-600">{study.timeline}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-950">Buget orientativ</dt>
                    <dd className="text-slate-600">{study.budget}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <Link
                    className="inline-flex w-full justify-center rounded-xl bg-[#0057b8] px-5 py-3 text-sm font-bold text-white"
                    href="/contact"
                  >
                    Solicita discutie proiect
                  </Link>
                </div>
              </aside>
              <article className="grid gap-10">
                <CaseSection title="Situatie initiala" items={[study.situation]} />
                <CaseSection title="Provocari" items={study.challenges} />
                <CaseSection title="Solutie" items={study.solution} />
                <CaseSection title="Implementare" items={study.implementation} />
                <CaseSection title="Rezultate urmarite" items={study.results} />
                <CaseSection title="Riscuri evitate" items={study.avoidedRisks} />
                <section>
                  <h2 className="text-3xl font-semibold text-slate-950">Linkuri relevante</h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {study.relatedLinks.map((link) => (
                      <Link
                        className="rounded-2xl border border-blue-100 bg-white p-5 text-sm font-bold text-[#0057b8] transition hover:bg-blue-50"
                        href={link.href}
                        key={link.href}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              </article>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}

function CaseSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-3xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p className="rounded-2xl border border-slate-200 bg-white p-5 text-base leading-8 text-slate-600" key={item}>
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
