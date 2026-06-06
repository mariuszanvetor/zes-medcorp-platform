import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";
import {
  getCategoryPath,
  getProductCommercialContent,
  getProductDisplayName,
  getProductPath,
  getProductsByCategory,
  getProductCategoryBySlug,
  isProductIndexable,
  isProductPublicDisplayReady,
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
    description: `${category.description} Solicita oferta, instalare, service si mentenanta ZESCORP pentru produse medicale.`,
    path: getCategoryPath(category),
    noIndex: !hasIndexableProducts,
    keywords: [category.label, "catalog produse medicale", "oferta echipamente medicale"],
  });
}

export default async function ProductCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);

  if (!category) notFound();

  const products = getProductsByCategory(category.id).filter(isProductPublicDisplayReady);

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
                Catalog produse medicale
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                {category.label}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                {category.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#0057b8] bg-[#0057b8] px-6 text-base font-semibold text-white shadow-[0_14px_30px_rgba(0,87,184,0.18)] transition hover:bg-[#00498f]"
                  href="/contact"
                >
                  Solicita oferta
                </Link>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-blue-100 bg-white px-6 text-base font-semibold text-slate-950 transition hover:bg-blue-50"
                  href="/contracte-mentenanta"
                >
                  Service si mentenanta
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Produse"
              title="Produse disponibile pentru cereri de oferta"
              description={category.serviceAngle}
            />
            {products.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => {
                  const content = getProductCommercialContent(product);
                  return (
                    <Link
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-200 hover:bg-blue-50"
                      href={getProductPath(product)}
                      key={product.id}
                    >
                      <Image
                        alt={content.imageAlt}
                        className="aspect-[16/10] w-full object-cover"
                        height={360}
                        src={content.imageUrl}
                        width={576}
                      />
                      <div className="p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                          {content.categoryLabel}
                        </p>
                        <h2 className="mt-3 text-lg font-semibold leading-7 text-slate-950">
                          {getProductDisplayName(product)}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                          {content.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-blue-100 bg-[#f8fbff] p-6">
                <h2 className="text-xl font-semibold text-slate-950">
                  Categoria este in revizuire comerciala
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  Produsele din aceasta categorie sunt verificate inainte de afisare publica extinsa.
                  Pentru o cerere concreta, trimite aplicatia clinica, cantitatea si termenul dorit,
                  iar echipa ZESCORP poate pregati o selectie potrivita.
                </p>
                <Link
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-xl border border-[#0057b8] bg-[#0057b8] px-5 text-sm font-semibold text-white transition hover:bg-[#00498f]"
                  href="/contact"
                >
                  Solicita selectie de produse
                </Link>
              </div>
            )}
            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-500">
              Daca ai nevoie de o configuratie, cantitate sau alternativa care nu apare in lista, trimite contextul
              clinic si echipa ZESCORP poate pregati o selectie potrivita.
            </p>
          </Container>
        </Section>
      </main>
    </>
  );
}
