import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { ProductQuoteForm } from "@/components/forms/ProductQuoteForm";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ProductSchema } from "@/components/seo/ProductSchema";
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
  getProductRedirectDestination,
  getRomanianProductCategoryLabel,
  getRelatedServiceLabel,
  isProductIndexable,
  isProductPublicDisplayReady,
  productCatalog,
} from "@/lib/product-catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return productCatalog.filter(isProductIndexable).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    const redirectDestination = getProductRedirectDestination(slug);
    if (redirectDestination) {
      return {
        alternates: {
          canonical: redirectDestination,
        },
        robots: {
          index: false,
          follow: true,
        },
      };
    }
    return {};
  }

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

  if (!product) {
    const redirectDestination = getProductRedirectDestination(slug);
    if (redirectDestination) permanentRedirect(redirectDestination);
    notFound();
  }

  const displayName = getProductDisplayName(product);
  const category = getProductCategoryBySlug(product.category);
  const content = getProductCommercialContent(product);
  const gallery = content.galleryImages.length ? content.galleryImages : [{ url: content.imageUrl, alt: content.imageAlt, verified: false }];
  const productsByCode = new Map(productCatalog.filter(isProductPublicDisplayReady).map((item) => [item.gimaCode ?? item.id, item]));
  const relatedFromCodes = (codes: string[] = [], limit = 4) =>
    codes
      .map((code) => productsByCode.get(code))
      .filter((item): item is NonNullable<typeof item> => Boolean(item && item.slug !== product.slug))
      .slice(0, limit);
  const similarProducts = relatedFromCodes(content.relatedProductGroups.similarProducts, 4);
  const premiumAlternatives = relatedFromCodes(content.relatedProductGroups.premiumAlternatives, 3);
  const budgetAlternatives = relatedFromCodes(content.relatedProductGroups.budgetAlternatives, 3);
  const compatibleAccessories = relatedFromCodes(content.relatedProductGroups.compatibleAccessories, 4);
  const frequentlyRequestedTogether = relatedFromCodes(content.relatedProductGroups.frequentlyRequestedTogether, 4);
  const recommendedProducts = buildProductRecommendations(
    [
      ...similarProducts,
      ...compatibleAccessories,
      ...frequentlyRequestedTogether,
      ...premiumAlternatives,
      ...budgetAlternatives,
    ],
    3,
  );
  const faqItems = [
    {
      question: `Cum solicit oferta pentru ${displayName}?`,
      answer:
        "Completeaza formularul de cerere oferta sau contacteaza ZESCORP telefonic. Echipa poate verifica aplicatia clinica, cantitatea, documentatia si optiunile de service inainte de ofertare.",
    },
    {
      question: "Pretul este afisat pe pagina produsului?",
      answer:
        "Nu afisam preturi fixe pentru produse medicale deoarece oferta depinde de configuratie, cantitate, termen de livrare, documentatie si suportul tehnic solicitat.",
    },
    {
      question: "Se poate include service sau mentenanta?",
      answer:
        "Da. Pentru echipamente active, ZESCORP poate discuta instalare, verificare, service si mentenanta preventiva in functie de categoria produsului si modul de utilizare.",
    },
  ];
  const productSchemaProperties = content.specificationGroups
    .flatMap((group) => group.items)
    .slice(0, 12)
    .map((spec) => ({ label: spec.label, value: spec.value }));

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
      <ProductSchema
        category={content.categoryLabel}
        description={content.shortSummary}
        image={content.imageUrl}
        name={displayName}
        properties={productSchemaProperties}
        sku={content.productCode}
        url={getProductPath(product)}
      />
      <FAQSchema items={faqItems} id={`faq-schema-produs-${product.slug}`} />

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
              {content.specificationGroups.length > 0 ? (
                <div className="grid gap-4">
                  {content.specificationGroups.map((group) => (
                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white" key={group.group}>
                      <h3 className="border-b border-slate-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                        {getSpecificationGroupLabel(group.group)}
                      </h3>
                      {group.items.map((spec, index) => (
                        <div className="grid gap-2 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[0.38fr_0.62fr]" key={`${group.group}-${spec.label}-${index}`}>
                          <p className="text-sm font-semibold text-slate-950">{spec.label}</p>
                          <p className="text-sm leading-6 text-slate-600">{spec.value}</p>
                        </div>
                      ))}
                    </article>
                  ))}
                </div>
              ) : content.specifications.length > 0 ? (
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
                <h2 className="text-xl font-semibold text-slate-950">Servicii asociate</h2>
                <div className="mt-4 grid gap-3">
                  {category && (
                    <Link className="rounded-xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50" href={getCategoryPath(category)}>
                      Vezi categoria {category.label}
                    </Link>
                  )}
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

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <ProductLinkGroup title="Produse relevante" products={recommendedProducts} />
              <AuthorityLinkGroup title="Urmatorul pas" links={[...content.buyerJourneyLinks, ...content.relatedCategoryLinks, ...content.relatedSolutionLinks, ...content.relatedServices.map((href) => ({ href, label: getRelatedServiceLabel(href) }))]} />
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-4 lg:grid-cols-3">
              {faqItems.map((item) => (
                <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]" key={item.question}>
                  <h2 className="text-lg font-semibold leading-7 text-slate-950">{item.question}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </article>
              ))}
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

function getSpecificationGroupLabel(group: string) {
  const labels: Record<string, string> = {
    General: "General",
    Dimensions: "Dimensiuni",
    Weight: "Greutate",
    Electrical: "Electric",
    Performance: "Performanta",
    Medical: "Medical",
    Accessories: "Accesorii",
  };

  return labels[group] || group;
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

function buildProductRecommendations(products: typeof productCatalog, limit: number) {
  const seen = new Set<string>();
  return products
    .filter((product) => {
      if (!product?.slug || seen.has(product.slug)) return false;
      seen.add(product.slug);
      return hasStableProductImage(product);
    })
    .slice(0, limit);
}

function hasStableProductImage(product: (typeof productCatalog)[number]) {
  if (product.imageUrl && !product.imageUrl.startsWith("/product-images/")) return true;
  return Boolean(product.galleryImageAudit?.some((image) => image.localFilePath && image.finalHighResUrl));
}

function ProductLinkGroup({ products, title }: { title: string; products: typeof productCatalog }) {
  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {products.length ? (
          products.map((related) => (
            <Link
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-200 hover:shadow-[0_18px_42px_rgba(15,65,118,0.10)]"
              href={getProductPath(related)}
              key={related.slug}
            >
              <div className="relative aspect-[4/3] bg-[#f4f8fd]">
                <Image
                  alt={`${getProductDisplayName(related)} - produs recomandat`}
                  className="object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
                  fill
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 28vw, 90vw"
                  src={getProductCommercialContent(related).imageUrl}
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                  {getRomanianProductCategoryLabel(related)}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                  {getProductDisplayName(related)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm leading-7 text-slate-600">Recomandarile se confirma in etapa de ofertare.</p>
        )}
      </div>
    </article>
  );
}

function AuthorityLinkGroup({ links, title }: { title: string; links: Array<{ href: string; label: string }> }) {
  const uniqueLinks = links.filter(
    (link, index, list) => link.href && list.findIndex((item) => item.href === link.href) === index,
  );

  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {uniqueLinks.slice(0, 3).map((link) => (
          <Link
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </article>
  );
}
