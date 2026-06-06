import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductQuoteForm } from "@/components/forms/ProductQuoteForm";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";
import { createWebsiteMetadata } from "@/lib/seo";
import {
  getCategoryPath,
  getProductBySlug,
  getProductCategoryBySlug,
  getProductCommercialContent,
  getProductDisplayName,
  getProductPath,
  getRelatedServiceLabel,
  isProductIndexable,
  isProductPublicDisplayReady,
  productCatalog,
} from "@/lib/product-catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productCatalog.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  const displayName = getProductDisplayName(product);

  return createWebsiteMetadata({
    title: `${displayName} | Oferta produs medical ZESCORP`,
    description:
      product.romanianShortSummary ??
      product.romanianDescription ??
      `Solicita oferta pentru ${displayName}, cu suport ZESCORP pentru instalare, service si mentenanta.`,
    path: getProductPath(product),
    noIndex: !isProductIndexable(product),
    keywords: [displayName, product.commercialCategory ?? "", "oferta produs medical", "service aparatura medicala"].filter(Boolean),
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const displayName = getProductDisplayName(product);
  const category = getProductCategoryBySlug(product.category);
  const content = getProductCommercialContent(product);
  const gallery = content.galleryImages.length ? content.galleryImages : [{ url: content.imageUrl, alt: content.imageAlt, verified: false }];
  const relatedProducts = productCatalog
    .filter(
      (item) =>
        isProductPublicDisplayReady(item) &&
        content.relatedProductCodes.includes(item.gimaCode ?? "") &&
        item.slug !== product.slug,
    )
    .slice(0, 4);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Produse", href: "/produse" },
          ...(category ? [{ name: category.label, href: getCategoryPath(category) }] : []),
          { name: displayName, href: getProductPath(product) },
        ]}
      />
      <ServiceSchema
        description={`Cerere de oferta si suport pentru ${displayName}.`}
        name={displayName}
        serviceType="Product quotation"
        url={getProductPath(product)}
      />

      <main>
        <Section className="bg-[linear-gradient(180deg,#f4f8fd_0%,#ffffff_72%)]" spacing="xl" tone="transparent">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ProductImageCarousel images={gallery} title={displayName} />

              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                    {content.categoryLabel}
                  </span>
                  {content.productCode && (
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      Cod produs: {content.productCode}
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                  {displayName}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  {content.shortSummary}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <Button href="#cerere-oferta" size="lg">
                    Solicita oferta
                  </Button>
                  <Button href={companyContact.phoneHref} size="lg" variant="secondary">
                    Suna acum
                  </Button>
                  <Button href={companyContact.whatsappHref} size="lg" variant="secondary">
                    WhatsApp
                  </Button>
                </div>

                <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_18px_45px_rgba(15,65,118,0.08)]">
                  <p className="text-sm font-semibold text-slate-950">Oferta personalizata pentru produs.</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Pentru acest produs puteti solicita o oferta personalizata in functie de configuratie,
                    cantitate, documentatie, termen de livrare si optiunile de service.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-white !py-4" spacing="sm" tone="transparent">
          <Container>
            <nav className="flex gap-2 overflow-x-auto text-sm font-semibold text-slate-700">
              {[
                ["Descriere", "#descriere"],
                ["Specificatii tehnice", "#specificatii"],
                ["Documente produs", "#documentatie"],
                ["Livrare si ofertare", "#livrare"],
                ["Service si mentenanta", "#service"],
              ].map(([label, href]) => (
                <a className="shrink-0 rounded-full border border-slate-200 px-4 py-2 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]" href={href} key={href}>
                  {label}
                </a>
              ))}
            </nav>
          </Container>
        </Section>

        <Section className="bg-white" id="descriere" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <ProductSectionIntro eyebrow="Descriere" title="Descriere produs" />
              <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-6 text-sm leading-7 text-slate-700">
                <p>{content.description}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <InfoList title="Caracteristici" items={content.features} fallback="Detaliile de configuratie pot fi clarificate la cererea de oferta." />
                  <InfoList title="Continut pachet" items={content.packageContents} fallback="Continutul pachetului se confirma in functie de configuratia solicitata." />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" id="specificatii" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <ProductSectionIntro
                eyebrow="Specificatii"
                title="Specificatii tehnice"
                description="Datele tehnice disponibile ajuta la evaluarea produsului si la pregatirea cererii de oferta."
              />
              {content.specifications.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {content.specifications.map((spec, index) => (
                    <div className="grid gap-2 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[0.38fr_0.62fr]" key={`${spec.label}-${index}`}>
                      <p className="text-sm font-semibold text-slate-950">{spec.label}</p>
                      <p className="text-sm leading-6 text-slate-600">{spec.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600">
                  Specificatiile tehnice se confirma in functie de configuratia solicitata.
                </div>
              )}
            </div>
          </Container>
        </Section>

        <Section className="bg-white" id="documentatie" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <ProductSectionIntro
                eyebrow="Documentatie"
                title="Documente produs"
                description="Documentatie disponibila pentru consultare inainte de pregatirea ofertei."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {content.documents.length > 0 ? (
                  content.documents.slice(0, 8).map((document) => (
                    <a
                      className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
                      href={document.url}
                      key={`${document.label}-${document.url}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span>{document.label}</span>
                      <span className="mt-2 block text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                        {document.type}
                      </span>
                    </a>
                  ))
                ) : (
                  <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600">
                    Documentatia produsului poate fi solicitata in cadrul cererii de oferta.
                  </p>
                )}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" id="livrare" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoList title="Utilizare recomandata" items={content.applications} />
              <InfoList title="Livrare si ofertare" items={content.installation} />
              <InfoList title="Avantaje pentru achizitie" items={content.benefits} />
            </div>
          </Container>
        </Section>

        <Section className="bg-white" id="service" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2">
              <InfoList title="Service si mentenanta" items={content.maintenance} />
              <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
                <h2 className="text-xl font-semibold text-slate-950">Categorii, produse si servicii relevante</h2>
                <div className="mt-4 grid gap-3">
                  {category && (
                    <Link className="rounded-xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50" href={getCategoryPath(category)}>
                      Vezi categoria {category.label}
                    </Link>
                  )}
                  {relatedProducts.map((related) => (
                    <Link className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]" href={getProductPath(related)} key={related.slug}>
                      {getProductDisplayName(related)}
                    </Link>
                  ))}
                  {content.relatedServices.map((href) => (
                    <Link className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]" href={href} key={href}>
                      {getRelatedServiceLabel(href)}
                    </Link>
                  ))}
                </div>
              </article>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" id="cerere-oferta" spacing="lg" tone="transparent">
          <Container>
            <ProductQuoteForm productSlug={product.slug} productTitle={displayName} />
          </Container>
        </Section>
      </main>
    </>
  );
}

function ProductSectionIntro({ description, eyebrow, title }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">{title}</h2>
      {description && <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

function InfoList({ fallback, items, title }: { title: string; items: string[]; fallback?: string }) {
  const visibleItems = items.length ? items : fallback ? [fallback] : [];

  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-700">
        {visibleItems.map((item) => (
          <li className="flex items-start gap-2" key={item}>
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
