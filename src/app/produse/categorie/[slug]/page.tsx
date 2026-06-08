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
  getRelatedServiceLabel,
  isProductIndexable,
  isProductPublicDisplayReady,
  productCategories,
} from "@/lib/product-catalog";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
};

const PRODUCTS_PER_PAGE = 48;

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

export default async function ProductCategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const category = getProductCategoryBySlug(slug);

  if (!category) notFound();

  const products = getProductsByCategory(category.id).filter(isProductPublicDisplayReady);
  const featuredProducts = [...products]
    .sort((a, b) => (b.seoAuthorityScore || 0) - (a.seoAuthorityScore || 0))
    .slice(0, 6);
  const serviceLinks = uniqueLinks(products.flatMap((product) => product.relatedServices || [])).slice(0, 5);
  const solutionLinks = uniqueAuthorityLinks(products.flatMap((product) => product.relatedSolutionLinks || [])).slice(0, 5);
  const knowledgeLinks = uniqueAuthorityLinks(products.flatMap((product) => product.relatedKnowledgeLinks || [])).slice(0, 5);
  const page = Math.max(1, Number(resolvedSearchParams?.page || 1) || 1);
  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = products.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

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
                {pageProducts.map((product) => {
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
            {products.length > PRODUCTS_PER_PAGE && (
              <nav className="mt-8 flex flex-col gap-3 border-t border-blue-100 pt-6 text-sm font-semibold text-slate-700 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Pagina {currentPage} din {totalPages} · {products.length} produse verificate pentru afisare
                </p>
                <div className="flex gap-2">
                  <Link
                    aria-disabled={currentPage === 1}
                    className={`inline-flex h-11 items-center justify-center rounded-xl border px-4 transition ${
                      currentPage === 1
                        ? "pointer-events-none border-slate-200 bg-slate-50 text-slate-400"
                        : "border-blue-100 bg-white text-slate-950 hover:bg-blue-50"
                    }`}
                    href={`${getCategoryPath(category)}${currentPage > 2 ? `?page=${currentPage - 1}` : ""}`}
                  >
                    Inapoi
                  </Link>
                  <Link
                    aria-disabled={currentPage === totalPages}
                    className={`inline-flex h-11 items-center justify-center rounded-xl border px-4 transition ${
                      currentPage === totalPages
                        ? "pointer-events-none border-slate-200 bg-slate-50 text-slate-400"
                        : "border-[#0057b8] bg-[#0057b8] text-white hover:bg-[#00498f]"
                    }`}
                    href={`${getCategoryPath(category)}?page=${currentPage + 1}`}
                  >
                    Inainte
                  </Link>
                </div>
              </nav>
            )}
            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-500">
              Daca ai nevoie de o configuratie, cantitate sau alternativa care nu apare in lista, trimite contextul
              clinic si echipa ZESCORP poate pregati o selectie potrivita.
            </p>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Recomandari"
              title="Produse si servicii relevante pentru categorie"
              description="Selectie orientativa pentru cumparatori care vor sa compare produse, servicii si optiuni de suport inainte de cererea de oferta."
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
                <h2 className="text-xl font-semibold text-slate-950">Produse recomandate</h2>
                <div className="mt-4 grid gap-3">
                  {featuredProducts.map((product) => (
                    <Link
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
                      href={getProductPath(product)}
                      key={product.slug}
                    >
                      {getProductDisplayName(product)}
                    </Link>
                  ))}
                </div>
              </article>
              <AuthorityLinks title="Servicii asociate" links={serviceLinks.map((href) => ({ href, label: getRelatedServiceLabel(href) }))} />
              <AuthorityLinks title="Solutii conexe" links={solutionLinks} />
              <AuthorityLinks title="Ghiduri utile" links={knowledgeLinks} />
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}

function uniqueLinks(links: string[]) {
  return links.filter((link, index, list) => link && list.indexOf(link) === index);
}

function uniqueAuthorityLinks(links: Array<{ href: string; label: string }>) {
  return links.filter((link, index, list) => link.href && list.findIndex((item) => item.href === link.href) === index);
}

function AuthorityLinks({ links, title }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {links.length ? (
          links.map((link) => (
            <Link
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))
        ) : (
          <p className="text-sm leading-7 text-slate-600">Recomandarile se confirma in etapa de ofertare.</p>
        )}
      </div>
    </article>
  );
}
