import Link from "next/link";

import { FAQSchema } from "@/components/seo/FAQSchema";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { SeoCluster } from "@/data/seo-clusters";

export type SeoClusterPageProps = {
  cluster: SeoCluster;
};

export function SeoClusterPage({ cluster }: SeoClusterPageProps) {
  const primaryTool = cluster.relatedTools[0] ?? {
    label: "Consultant AI",
    href: "/ai-project-advisor",
  };

  return (
    <>
      <FAQSchema items={cluster.faq} id={`faq-schema-ghid-${cluster.slug}`} />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
            <div className="max-w-4xl">
              <Eyebrow tone="graphite">{cluster.category}</Eyebrow>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                {cluster.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                {cluster.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="blue">Ghid practic</Badge>
                {cluster.secondaryKeywords.slice(0, 2).map((keyword) => (
                  <span
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    key={keyword}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={primaryTool.href} size="lg">
                  {primaryTool.label}
                </Button>
                <Button href="/contact" size="lg" variant="secondary">
                  Discută cu ZES
                </Button>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Pe scurt
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Această pagină ajută la pregătirea discuției tehnice. Nu
                înlocuiește analiza aplicată, dar arată ce poate schimba costul,
                calendarul și riscul.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  "complexitate și buget",
                  "riscuri și autorizări",
                  "servicii ZES relevante",
                ].map((item) => (
                  <div
                    className="rounded-2xl bg-[#f7fbff] p-4 text-sm font-bold text-[#0057b8]"
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
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  În acest ghid
                </p>
                <nav aria-label={`Cuprins ${cluster.title}`} className="mt-6">
                  <ol className="space-y-3">
                    {cluster.sections.map((section, index) => (
                      <li key={section.title}>
                        <Link
                          className="group flex gap-3 text-sm font-semibold leading-6 text-slate-600 transition hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          href={`#${sectionId(section.title)}`}
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
                  Tool recomandat
                </p>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Transformă ghidul într-o primă structură de proiect.
                </p>
                <Link
                  className="mt-5 inline-flex w-full justify-center rounded-full bg-[#0057b8] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#00498f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={primaryTool.href}
                >
                  {primaryTool.label}
                </Link>
              </Card>
            </aside>

            <article className="mx-auto w-full max-w-3xl">
              <p className="text-xl font-semibold leading-9 text-slate-950 sm:text-2xl sm:leading-10">
                {cluster.intro}
              </p>

              <div className="mt-14 space-y-14">
                {cluster.sections.map((section) => (
                  <section id={sectionId(section.title)} key={section.title}>
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
                  </section>
                ))}
              </div>

              <section className="mt-16" id="intrebari-frecvente">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Întrebări frecvente
                </h2>
                <div className="mt-8 space-y-4">
                  {cluster.faq.map((item) => (
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
            <RelatedPanel title="Servicii relevante" links={cluster.relatedServices} />
            <RelatedPanel title="Instrumente relevante" links={cluster.relatedTools} />
            <RelatedPanel title="Knowledge Hub" links={cluster.relatedArticles} />
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description={cluster.cta.description}
            eyebrow="Următorul pas"
            primaryAction={{
              label: cluster.cta.label,
              href: cluster.cta.href,
            }}
            secondaryAction={{
              label: "Contact ZES",
              href: "/contact",
            }}
            title={cluster.cta.title}
            tone="light"
          />
        </Container>
      </Section>
    </>
  );
}

function RelatedPanel({
  title,
  links,
}: {
  title: string;
  links: SeoCluster["relatedServices"];
}) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </h2>
      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <Link
            className="rounded-2xl border border-blue-100 bg-white p-5 text-base font-semibold text-slate-950 transition hover:border-blue-200 hover:text-[#0057b8] hover:shadow-[0_18px_50px_rgba(0,87,184,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
