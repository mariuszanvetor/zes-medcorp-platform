import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { ProgrammaticCalculator } from "@/components/ai/ProgrammaticCalculator";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import {
  getProgrammaticCalculatorBySlug,
  type CalculatorSlug,
} from "@/data/calculators";
import { BUDGET_DISCLAIMER } from "@/lib/ai-estimation";
import { createWebsiteMetadata } from "@/lib/seo";

export function createProgrammaticCalculatorMetadata(
  slug: CalculatorSlug,
): Metadata {
  const calculator = getProgrammaticCalculatorBySlug(slug);

  if (!calculator) {
    return {};
  }

  return createWebsiteMetadata({
    title: `${calculator.title} | Calculatoare ZES MEDCORP`,
    description: calculator.description,
    path: `/calculatoare/${calculator.slug}`,
    keywords: calculator.keywords,
  });
}

export function renderProgrammaticCalculatorPage(slug: CalculatorSlug) {
  const calculator = getProgrammaticCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Knowledge Hub", href: "/knowledge-hub" },
          {
            name: calculator.title,
            href: `/calculatoare/${calculator.slug}`,
          },
        ]}
      />
      <FAQSchema
        id={`faq-schema-calculator-${calculator.slug}`}
        items={calculator.faq}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
            <div className="max-w-4xl">
              <Eyebrow tone="graphite">{calculator.eyebrow}</Eyebrow>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                {calculator.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                {calculator.description}
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                {calculator.purpose}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedButtonLink
                  href={`/calculatoare/${calculator.slug}#calculator`}
                  size="lg"
                  tracking={{
                    calculatorSlug: calculator.slug,
                    ctaLabel: "Calculați estimarea orientativă",
                    destination: `/calculatoare/${calculator.slug}#calculator`,
                    sourcePage: `/calculatoare/${calculator.slug}`,
                    sourceTool: "programmatic-calculator",
                  }}
                >
                  Calculați estimarea orientativă
                </TrackedButtonLink>
                <TrackedButtonLink
                  href={calculator.secondaryCta.href}
                  size="lg"
                  tracking={{
                    calculatorSlug: calculator.slug,
                    ctaLabel: calculator.secondaryCta.label,
                    destination: calculator.secondaryCta.href,
                    sourcePage: `/calculatoare/${calculator.slug}`,
                    sourceTool: "programmatic-calculator",
                  }}
                  variant="secondary"
                >
                  {calculator.secondaryCta.label}
                </TrackedButtonLink>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Estimare preliminară
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Rezultatul este orientativ: ajută la pregătirea discuției tehnice,
                dar nu înlocuiește oferta finală sau verificarea pe amplasament.
              </p>
              <p className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-7 text-blue-900">
                {BUDGET_DISCLAIMER}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" id="calculator" spacing="lg" tone="transparent">
        <Container>
          <ProgrammaticCalculator calculator={calculator} />
        </Container>
      </Section>
    </>
  );
}
