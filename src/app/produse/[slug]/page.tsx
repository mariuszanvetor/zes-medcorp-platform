import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductQuoteForm } from "@/components/forms/ProductQuoteForm";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";
import {
  getCategoryPath,
  getProductBySlug,
  getProductCategoryBySlug,
  getProductCommercialContent,
  getProductDisplayName,
  getProductPath,
  getProductReviewLabel,
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
    description: `Pagina produs pentru ${displayName}. Solicita oferta, instalare, mentenanta si suport ZESCORP. Produsele importate raman noindex pana la review.`,
    path: getProductPath(product),
    noIndex: !isProductIndexable(product),
    keywords: [displayName, product.sourceProductName, product.gimaCode ?? "", "oferta produs medical"].filter(Boolean),
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const displayName = getProductDisplayName(product);
  const category = getProductCategoryBySlug(product.category);
  const content = getProductCommercialContent(product);
  const isIndexable = isProductIndexable(product);

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
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                {getProductReviewLabel(product.reviewStatus)}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                {displayName}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                {content.description}
              </p>
              <p className="mt-4 rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm leading-7 text-slate-700">
                {isIndexable
                  ? "Produsul este aprobat pentru indexare si contine descriere comerciala revizuita."
                  : "Produs importat noindex. Datele sunt folosite pentru ofertare si review intern, nu pentru indexare publica pana la aprobare."}
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoCard title="Aplicatii" items={content.applications} />
              <InfoCard title="Instalare" items={content.installation} />
              <InfoCard title="Mentenanta" items={content.maintenance} />
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Date import"
                title="Sursa si status review"
                description="Inainte ca produsul sa devina indexabil, datele se verifica si descrierea comerciala se rescrie pentru ZESCORP."
              />
              <div className="grid gap-3 text-sm leading-7 text-slate-700">
                <p><span className="font-semibold text-slate-950">Categorie:</span> {category?.label ?? product.category}</p>
                <p><span className="font-semibold text-slate-950">Cod GIMA:</span> {product.gimaCode || "in verificare"}</p>
                <p><span className="font-semibold text-slate-950">Status:</span> {product.reviewStatus}</p>
                <p><span className="font-semibold text-slate-950">Sursa:</span> {product.sourceUrls[0]}</p>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" id="cerere-oferta" spacing="lg" tone="transparent">
          <Container>
            <ProductQuoteForm product={product} />
          </Container>
        </Section>

        <Section className="border-t border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.relatedServices.map((href) => (
                <Link
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
                  href={href}
                  key={href}
                >
                  {href.replace("/", "").replaceAll("-", " ")}
                </Link>
              ))}
            </div>
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
