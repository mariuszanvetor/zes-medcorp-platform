import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CalculatorLandingPage } from "@/components/sections/CalculatorLandingPage";
import {
  getProgrammaticCalculatorBySlug,
  type CalculatorSlug,
} from "@/data/calculators";
import { getCalculatorHubMetaForSlug } from "@/lib/calculator-engine";
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
    <CalculatorLandingPage
      calculator={calculator}
      categoryLabel={getCalculatorHubMetaForSlug(calculator.slug).title}
    />
  );
}
