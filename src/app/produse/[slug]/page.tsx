import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductQuoteForm } from "@/components/forms/ProductQuoteForm";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { SectionHeading } from "@/components/sections/SectionHeading";
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
    description: `${product.romanianDescription ?? `Solicita oferta pentru ${displayName}, cu suport ZESCORP pentru instalare, service si mentenanta.`}`,
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
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  {content.categoryLabel}
                </p>
                <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                  {displayName}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  {content.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#cerere-oferta" size="lg">
                    Solicita oferta
                  </Button>
                  <Button href={companyContact.phoneHref} size="lg" variant="secondary">
                    Suna acum
                  </Button>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_24px_70px_rgba(15,65,118,0.14)]">
                <Image
                  alt={content.imageAlt}
                  className="aspect-[4/3] h-full w-full object-cover"
                  height={720}
                  priority
                  src={content.imageUrl}
                  width={960}
                />
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                eyebrow="Descriere produs"
                title="Selectie si ofertare pentru utilizare medicala"
                description="ZESCORP trateaza produsul ca parte dintr-un flux clinic: aplicatie, instalare, consumabile, service si mentenanta."
              />
              <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-6 text-sm leading-7 text-slate-700">
                <p>{content.description}</p>
                <p className="mt-4">
                  Pentru oferta finala sunt utile informatii despre aplicatia clinica,
                  cantitate, oras, termen si nivelul de suport necesar.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoCard title="Utilizare recomandata" items={content.applications} />
              <InfoCard title="Beneficii comerciale" items={content.benefits} />
              <InfoCard title="Service si mentenanta" items={content.maintenance} />
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Specificatii"
                title="Specificatii tehnice orientative"
                description="Specificatiile se confirma inainte de ofertare, in functie de configuratie, accesorii si disponibilitate."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {content.specifications.map((spec) => (
                  <div className="rounded-xl border border-slate-200 bg-white p-4" key={spec.label}>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                      {spec.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2">
              <InfoCard title="Livrare si suport" items={content.installation} />
              <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
                <h2 className="text-xl font-semibold text-slate-950">Categorii si servicii relevante</h2>
                <div className="mt-4 grid gap-3">
                  {category && (
                    <Link
                      className="rounded-xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50"
                      href={getCategoryPath(category)}
                    >
                      Vezi categoria {category.label}
                    </Link>
                  )}
                  {content.relatedServices.map((href) => (
                    <Link
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
                      href={href}
                      key={href}
                    >
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

function InfoCard({ items, title }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-700">
        {items.map((item) => (
          <li className="flex items-start gap-2" key={item}>
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
