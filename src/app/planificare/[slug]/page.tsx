import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getArticleBySlug } from "@/data/articles";
import {
  getPlanningJourneyBySlug,
  planningJourneys,
  type JourneyLink,
} from "@/data/planning-journeys";
import { createWebsiteMetadata } from "@/lib/seo";
import type { Article } from "@/data/articles";

type JourneyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return planningJourneys.map((journey) => ({
    slug: journey.slug,
  }));
}

export async function generateMetadata({
  params,
}: JourneyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const journey = getPlanningJourneyBySlug(slug);

  if (!journey) {
    notFound();
  }

  return createWebsiteMetadata({
    title: `${journey.title} | Planificare ZES MEDCORP`,
    description: journey.description,
    path: `/planificare/${journey.slug}`,
    keywords: [
      "planificare proiect medical",
      journey.title,
      journey.projectStage,
    ],
  });
}

export default async function PlanningJourneyPage({ params }: JourneyPageProps) {
  const { slug } = await params;
  const journey = getPlanningJourneyBySlug(slug);

  if (!journey) {
    notFound();
  }

  const articles = journey.recommendedArticles
    .map((articleSlug) => getArticleBySlug(articleSlug))
    .filter((article): article is Article => Boolean(article));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Planificare", href: "/planificare" },
          { name: journey.title, href: `/planificare/${journey.slug}` },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
            <div>
              <Eyebrow tone="graphite">Traseu de planificare</Eyebrow>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                {journey.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                {journey.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedButtonLink
                  href={journey.cta.href}
                  size="lg"
                  tracking={{
                    ctaLabel: journey.cta.label,
                    destination: journey.cta.href,
                    journeySlug: journey.slug,
                    sourcePage: `/planificare/${journey.slug}`,
                  }}
                >
                  {journey.cta.label}
                </TrackedButtonLink>
                <TrackedButtonLink
                  href="/contact"
                  size="lg"
                  tracking={{
                    ctaLabel: "Discuta proiectul",
                    destination: "/contact",
                    journeySlug: journey.slug,
                    sourcePage: `/planificare/${journey.slug}`,
                  }}
                  variant="secondary"
                >
                  Discuta proiectul
                </TrackedButtonLink>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Intentia utilizatorului
              </p>
              <p className="mt-4 text-lg font-semibold leading-8 text-slate-950">
                {journey.userIntent}
              </p>
              <div className="mt-6 rounded-2xl border border-blue-100 bg-[#f8fbff] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                  Primul pas recomandat
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {journey.recommendedFirstStep}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="blue">{journey.projectStage}</Badge>
                <Badge variant="neutral">estimare orientativa</Badge>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <Card className="border-blue-100 bg-[#f8fbff]" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Etape
                </p>
                <ol className="mt-6 space-y-4">
                  {journey.stages.map((stage, index) => (
                    <li className="flex gap-3" key={stage.stage}>
                      <span className="mt-1 text-sm font-bold text-[#0057b8]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-slate-950">
                          {stage.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-slate-600">
                          {stage.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Card>
            </aside>

            <div className="grid gap-10">
              <Card className="border-blue-100 bg-white" padding="lg">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Actiuni recomandate
                </h2>
                <ul className="mt-6 grid gap-3">
                  {journey.nextActions.map((action) => (
                    <li className="flex gap-4 text-base leading-8 text-slate-600" key={action}>
                      <span
                        aria-hidden="true"
                        className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                      />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="border-blue-100 bg-[#f8fbff]" padding="lg">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Riscuri de verificat devreme
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {journey.risks.map((risk) => (
                    <div
                      className="rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                      key={risk}
                    >
                      {risk}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <RelatedPanel title="Servicii relevante" links={journey.recommendedServices} />
            <RelatedPanel title="Instrumente / calculatoare" links={journey.recommendedTools} />
            <RelatedPanel title="Ghiduri practice" links={journey.recommendedGuides} />
          </div>

          {articles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Articole recomandate
              </h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {articles.map((article) => (
                  <Link
                    className="rounded-2xl border border-blue-100 bg-white p-5 transition hover:border-blue-200 hover:shadow-[0_18px_50px_rgba(0,87,184,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href={`/knowledge-hub/${article.slug}`}
                    key={article.slug}
                  >
                    <span className="text-base font-semibold leading-6 text-slate-950">
                      {article.title}
                    </span>
                    <span className="mt-3 block text-sm leading-6 text-slate-600">
                      {article.readingTime} · {article.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      <Section className="bg-white" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description={journey.cta.description}
            eyebrow="Urmatorul pas"
            primaryAction={{
              label: journey.cta.label,
              href: journey.cta.href,
            }}
            secondaryAction={{
              label: "Completeaza Project Intake",
              href: "/project-intake",
            }}
            title="Transforma traseul intr-o discutie tehnica aplicata."
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
  links: JourneyLink[];
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
