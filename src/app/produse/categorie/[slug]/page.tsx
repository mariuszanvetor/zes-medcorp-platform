import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";
import {
  getCategoryPath,
  getProductPath,
  getProductReviewLabel,
  getProductsByCategory,
  getProductCategoryBySlug,
  isProductIndexable,
  productCategories,
} from "@/lib/product-catalog";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);

  if (!category) return {};

  const products = getProductsByCategory(category.id);
  const hasIndexableProducts = products.some(isProductIndexable);

  return createWebsiteMetadata({
    title: `${category.label} | Catalog produse medicale ZESCORP`,
    description: `${category.description} Catalog noindex pentru produse importate pana la review, cu cerere de oferta si suport ZESCORP.`,
    path: getCategoryPath(category),
    noIndex: !hasIndexableProducts,
    keywords: [category.label, "catalog produse medicale", "oferta echipamente medicale"],
  });
}

export default async function ProductCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);

  if (!category) notFound();

  const products = getProductsByCategory(category.id);
  const isIndexable = products.some(isProductIndexable);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Produse", href: "/produse" },
          { name: category.label, href: getCategoryPath(category) },
        ]}
      />
      <main>
        <Section className="bg-[linear-gradient(180deg,#f4f8fd_0%,#ffffff_72%)]" spacing="xl" tone="transparent">
          <Container>
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Catalog produse / {isIndexable ? "indexabil" : "noindex"}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                {category.label}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                {category.description}
              </p>
              <p className="mt-4 rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm leading-7 text-slate-700">
                {isIndexable
                  ? "Categoria contine produse aprobate pentru indexare."
                  : "Categoria ramane noindex pana cand exista produse revizuite si aprobate pentru indexare."}
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Produse"
              title="Produse importate pentru review si ofertare"
              description={category.serviceAngle}
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Link
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:bg-blue-50"
                  href={getProductPath(product)}
                  key={product.id}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                    {getProductReviewLabel(product.reviewStatus)}
                  </p>
                  <h2 className="mt-3 text-lg font-semibold leading-7 text-slate-950">
                    {product.sourceBrand} {product.sourceProductName}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {product.gimaCode ? `Cod GIMA: ${product.gimaCode}` : "Cod GIMA in verificare"}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
