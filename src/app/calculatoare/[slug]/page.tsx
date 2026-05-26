import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CalculatorLandingPage } from "@/components/sections/CalculatorLandingPage";
import { programmaticCalculators } from "@/data/calculators";
import {
  getCalculatorBySlug,
  getCalculatorHubMetaForSlug,
} from "@/lib/calculator-engine";
import { createWebsiteMetadata } from "@/lib/seo";

type CalculatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const legacyCalculatorSlugs = new Set([
  "cost-camera-rmn",
  "cost-camera-ct",
  "cost-laborator-ivd",
  "cost-echipamente-imagistica",
  "service-aparatura",
]);

export function generateStaticParams() {
  return programmaticCalculators
    .filter((calculator) => !legacyCalculatorSlugs.has(calculator.slug))
    .map((calculator) => ({
      slug: calculator.slug,
    }));
}

export async function generateMetadata({
  params,
}: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  return createWebsiteMetadata({
    title: `${calculator.title} | Calculatoare ZES MEDCORP`,
    description: calculator.description,
    path: `/calculatoare/${calculator.slug}`,
    keywords: calculator.keywords,
  });
}

export default async function CalculatorRoute({ params }: CalculatorPageProps) {
  const { slug } = await params;

  if (legacyCalculatorSlugs.has(slug)) {
    notFound();
  }

  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  return (
    <CalculatorLandingPage
      calculator={calculator}
      categoryLabel={getCalculatorHubMetaForSlug(calculator.slug).title}
    />
  );
}
