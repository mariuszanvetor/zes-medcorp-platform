import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { LeadMagnetBlock } from "@/components/sections/LeadMagnetBlock";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import {
  articles,
  getArticleBySlug,
  type Article,
} from "@/data/articles";
import { services, type Service } from "@/data/services";
import { createArticleMetadata } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isService(service: Service | undefined): service is Service {
  return Boolean(service);
}

function getRelatedServices(article: Article) {
  return article.relatedServices
    .map((href) => services.find((service) => service.href === href))
    .filter(isService);
}

function getRelatedArticles(article: Article) {
  return article.relatedArticles
    .map((slug) => getArticleBySlug(slug))
    .filter((item): item is Article => Boolean(item));
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return createArticleMetadata({
    title: `${article.title} | Knowledge Hub`,
    description: article.description,
    path: `/knowledge-hub/${article.slug}`,
    keywords: [article.targetKeyword, ...article.tags],
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    tags: article.tags,
  });
}

export default async function KnowledgeHubArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedServices = getRelatedServices(article);
  const relatedArticles = getRelatedArticles(article);
  const leadMagnet = getLeadMagnet(article);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Knowledge Hub", href: "/knowledge-hub" },
          { name: article.title, href: `/knowledge-hub/${article.slug}` },
        ]}
      />
      <ArticleSchema
        dateModified={article.updatedAt}
        datePublished={article.publishedAt}
        description={article.description}
        headline={article.title}
        url={`/knowledge-hub/${article.slug}`}
      />
      <FAQSchema items={article.faqs} id={`faq-schema-${article.slug}`} />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container size="lg">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="blue">{article.category}</Badge>
              <span className="text-sm font-semibold text-slate-500">
                {article.readingTime}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                Actualizat {formatDate(article.updatedAt)}
              </span>
            </div>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.05] text-balance text-slate-950 sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              {article.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Cuprins
                </p>
                <nav aria-label="Cuprins articol" className="mt-6">
                  <ol className="space-y-3">
                    {article.sections.map((section, index) => (
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
                  Următorul pas
                </p>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Transformă ghidul într-o primă analiză tehnică pentru proiectul
                  tău.
                </p>
                <div className="mt-5 grid gap-2">
                  <Link
                    className="rounded-full bg-[#0057b8] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#00498f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href={article.cta.href}
                  >
                    {article.cta.label}
                  </Link>
                  <Link
                    className="rounded-full border border-blue-100 bg-[#f7fbff] px-4 py-3 text-center text-sm font-bold text-[#0057b8] transition hover:border-blue-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="/contact"
                  >
                    Solicită consultanță
                  </Link>
                </div>
              </Card>
            </aside>

            <article className="mx-auto w-full max-w-3xl">
              <p className="text-xl font-semibold leading-9 text-slate-950 sm:text-2xl sm:leading-10">
                {article.intro}
              </p>

              <div className="mt-14 space-y-14">
                {article.sections.map((section) => (
                  <section id={section.id} key={section.id}>
                    <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-5">
                      {toParagraphs(section.body).map((paragraph) => (
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

              <div className="mt-16">
                <LeadMagnetBlock
                  description={leadMagnet.description}
                  items={leadMagnet.items}
                  primaryHref="/contact"
                  secondaryHref={article.relatedTools[0]?.href ?? "/ai-project-advisor"}
                  title={leadMagnet.title}
                />
              </div>

              <section className="mt-16" id="intrebari-frecvente">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Întrebări frecvente
                </h2>
                <div className="mt-8 space-y-4">
                  {article.faqs.map((item) => (
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
          <div className="grid gap-6 lg:grid-cols-3">
            <RelatedPanel title="Servicii relevante">
              {relatedServices.map((service) => (
                <Link
                  className="rounded-2xl border border-blue-100 bg-white p-5 transition hover:border-blue-200 hover:shadow-[0_18px_50px_rgba(0,87,184,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={service.href}
                  key={service.slug}
                >
                  <span className="text-base font-semibold text-slate-950">
                    {service.shortTitle}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {service.seoDescription}
                  </span>
                </Link>
              ))}
            </RelatedPanel>

            <RelatedPanel title="Instrumente relevante">
              {article.relatedTools.map((tool) => (
                <Link
                  className="rounded-2xl border border-blue-100 bg-white p-5 text-base font-semibold text-[#0057b8] transition hover:border-blue-200 hover:text-blue-950 hover:shadow-[0_18px_50px_rgba(0,87,184,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={tool.href}
                  key={tool.href}
                >
                  {tool.label}
                </Link>
              ))}
            </RelatedPanel>

            <RelatedPanel title="Articole conexe">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  className="rounded-2xl border border-blue-100 bg-white p-5 transition hover:border-blue-200 hover:shadow-[0_18px_50px_rgba(0,87,184,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={`/knowledge-hub/${relatedArticle.slug}`}
                  key={relatedArticle.slug}
                >
                  <span className="text-base font-semibold text-slate-950">
                    {relatedArticle.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {relatedArticle.readingTime} · {relatedArticle.category}
                  </span>
                </Link>
              ))}
            </RelatedPanel>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description={article.cta.description}
            eyebrow="Analiză tehnică"
            primaryAction={{
              label: article.cta.label,
              href: article.cta.href,
            }}
            secondaryAction={{
              label: "Înapoi la Knowledge Hub",
              href: "/knowledge-hub",
            }}
            title={article.cta.title}
            tone="light"
          />
        </Container>
      </Section>
    </>
  );
}

function RelatedPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </h2>
      <div className="mt-5 grid gap-3">{children}</div>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function toParagraphs(body: string | string[]) {
  return Array.isArray(body) ? body : [body];
}

function getLeadMagnet(article: Article) {
  if (article.slug.includes("cncan")) {
    return {
      title: "Ghid CNCAN pentru camere CT/RX",
      description:
        "Pregătim o resursă practică pentru verificarea cerințelor CNCAN, protecției radiologice, documentației și pașilor de planificare.",
      items: [
        "Cerințe inițiale pentru CT/RX",
        "Zone controlate și protecție radiologică",
        "Greșeli de evitat înainte de execuție",
      ],
    };
  }

  if (article.slug.includes("rf-shielding")) {
    return {
      title: "Checklist RF shielding vs protecție radiologică",
      description:
        "O resursă de triere pentru proiecte RMN, CT și RX, cu separare clară între cușcă Faraday, EMI, plumb și CNCAN.",
      items: [
        "RMN: RF, Faraday, filtre, penetrări",
        "CT/RX: plumb, zone controlate, CNCAN",
        "Întrebări de validat cu furnizorul echipamentului",
      ],
    };
  }

  if (article.slug.includes("clinica-medicala")) {
    return {
      title: "Checklist clinică medicală",
      description:
        "Pregătim o listă executivă pentru primele decizii: fluxuri, DSP, aparatură, radiologie, IVD, service, buget și timeline.",
      items: [
        "Fluxuri medicale și cerințe DSP",
        "Aparatură, imagistică și IVD",
        "Buget, timeline și pași turnkey",
      ],
    };
  }

  return {
    title: "Checklist tehnic ZES",
    description:
      "O resursă compactă pentru clarificarea cerințelor înainte de buget, execuție sau achiziție de aparatură.",
    items: [
      "Riscuri tehnice",
      "Servicii relevante",
      "Pași următori",
    ],
  };
}
