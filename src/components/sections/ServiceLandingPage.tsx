import Link from "next/link";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ReadingProgress } from "@/components/seo/ReadingProgress";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { RelatedContentBlocks } from "@/components/sections/RelatedContentBlocks";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  buildServiceFunnelDiscoverySections,
  serviceFunnelCategoryLabels,
} from "@/lib/service-funnel-engine";
import type { ServiceFunnelPage } from "@/data/service-funnels";

export type ServiceLandingPageProps = {
  page: ServiceFunnelPage;
};

export function ServiceLandingPage({ page }: ServiceLandingPageProps) {
  const discoverySections = buildServiceFunnelDiscoverySections(page);

  return (
    <>
      <ReadingProgress />
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Servicii", href: "/servicii" },
          { name: page.title, href: `/servicii/${page.slug}` },
        ]}
        id={`breadcrumb-schema-servicii-${page.slug}`}
      />
      <FAQSchema items={page.faqs} id={`faq-schema-servicii-${page.slug}`} />
      <ServiceSchema
        description={page.description}
        name={page.title}
        serviceType={page.title}
        url={`/servicii/${page.slug}`}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-end lg:gap-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">{serviceFunnelCategoryLabels[page.category]}</Badge>
                <Badge variant="neutral">preliminary</Badge>
                <Badge variant="neutral">enterprise ready</Badge>
              </div>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                {page.heroDescription}
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                {page.overview}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {page.seoKeywords.slice(0, 4).map((keyword) => (
                  <span
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    key={keyword}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={page.cta.primaryHref} size="lg">
                  {page.cta.primaryLabel}
                </Button>
                <Button href={page.cta.secondaryHref} size="lg" variant="secondary">
                  {page.cta.secondaryLabel}
                </Button>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
                {page.methodology}
              </p>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Ce primești
              </p>
              <div className="mt-5 grid gap-3">
                {page.trustPoints.map((point) => (
                  <div
                    className="rounded-2xl bg-[#f7fbff] p-4 text-sm font-semibold leading-7 text-slate-700"
                    key={point}
                  >
                    {point}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-blue-900">
                <span className="font-bold">Disclaimer:</span> {page.disclaimer}
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
                  Pasul următor
                </p>
                <ol className="mt-6 space-y-4">
                  {page.process.map((step, index) => (
                    <li className="flex gap-3" key={step.title}>
                      <span className="mt-1 text-sm font-bold text-[#0057b8]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-slate-600">
                          {step.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>

              <Card className="mt-5 border-blue-100 bg-white" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  CTA rapid
                </p>
                <p className="mt-4 text-base leading-7 text-slate-600">{page.cta.description}</p>
                <div className="mt-5 grid gap-3">
                  <Link
                    className="rounded-full bg-[#0057b8] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#00498f]"
                    href={page.cta.primaryHref}
                  >
                    {page.cta.primaryLabel}
                  </Link>
                  <Link
                    className="rounded-full border border-blue-100 bg-[#f7fbff] px-4 py-3 text-center text-sm font-bold text-[#0057b8] transition hover:border-blue-200 hover:bg-white"
                    href={page.cta.secondaryHref}
                  >
                    {page.cta.secondaryLabel}
                  </Link>
                </div>
              </Card>
            </aside>

            <article className="mx-auto w-full max-w-3xl">
              <section>
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Metodologie
                </h2>
                <div className="mt-5 space-y-5">
                  <p className="text-lg leading-9 text-slate-600">{page.methodology}</p>
                  <p className="text-lg leading-9 text-slate-600">{page.overview}</p>
                </div>
              </section>

              <section className="mt-14">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Ce verificăm în proiect
                </h2>
                <ul className="mt-6 space-y-3">
                  {page.infrastructureConsiderations.map((item) => (
                    <li className="flex gap-4 text-base leading-8 text-slate-600" key={item}>
                      <span
                        aria-hidden="true"
                        className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-14">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Greșeli frecvente
                </h2>
                <div className="mt-6 grid gap-4">
                  {page.commonMistakes.map((item) => (
                    <Card className="border-blue-100 bg-[#f8fbff]" key={item} padding="lg">
                      <p className="text-base leading-8 text-slate-600">{item}</p>
                    </Card>
                  ))}
                </div>
              </section>

              <div className="mt-16">
                <RelatedContentBlocks sections={discoverySections} />
              </div>

              <section className="mt-16">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Întrebări frecvente
                </h2>
                <div className="mt-8 space-y-4">
                  {page.faqs.map((item) => (
                    <Card
                      as="article"
                      className="border-blue-100 bg-white"
                      key={item.question}
                      padding="lg"
                    >
                      <h3 className="text-xl font-semibold leading-tight text-slate-950">
                        {item.question}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-slate-600">{item.answer}</p>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="mt-16">
                <Card className="border-blue-100 bg-[linear-gradient(135deg,#f7fbff,#ffffff)]" padding="lg">
                  <h2 className="text-2xl font-semibold leading-tight text-slate-950">
                    {page.cta.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{page.cta.description}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button href={page.cta.primaryHref} size="lg">
                      {page.cta.primaryLabel}
                    </Button>
                    <Button href={page.cta.secondaryHref} size="lg" variant="secondary">
                      {page.cta.secondaryLabel}
                    </Button>
                  </div>
                </Card>
              </section>

              <p className="mt-8 text-sm leading-7 text-slate-500">
                Actualizat: {new Date(page.updatedAt).toLocaleDateString("ro-RO")}
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
