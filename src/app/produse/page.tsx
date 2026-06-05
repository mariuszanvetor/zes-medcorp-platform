import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";
import {
  getCategoryPath,
  getProductPath,
  getProductReviewLabel,
  productCatalog,
  productCategories,
} from "@/lib/product-catalog";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Catalog produse medicale | ZES MEDCORP",
  description:
    "Catalog medical ZESCORP pentru echipamente, laborator, urgenta, sterilizare, mobilier medical, ORL, ginecologie si consumabile. Produsele importate sunt noindex pana la review.",
  path: "/produse",
  keywords: ["catalog produse medicale", "echipamente medicale", "GIMA", "oferta aparatura medicala"],
});

export default function ProductCatalogHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Produse", href: "/produse" },
        ]}
      />
      <main>
        <Section className="bg-[linear-gradient(180deg,#f4f8fd_0%,#ffffff_72%)]" spacing="xl" tone="transparent">
          <Container>
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Catalog produse / import controlat
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                Catalog medical pentru ofertare, instalare si service.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Produsele importate din cataloage publice sunt pastrate noindex pana la review intern. Doar produsele revizuite, rescrise comercial si aprobate devin indexabile.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Categorii"
              title="Structura catalogului"
              description="Catalogul este gandit ca suport pentru leaduri si ofertare, nu ca duplicare a unui catalog furnizor."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {productCategories.map((category) => (
                <Link
                  className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-5 transition hover:border-blue-200 hover:bg-blue-50"
                  href={getCategoryPath(category)}
                  key={category.id}
                >
                  <h2 className="text-xl font-semibold text-slate-950">{category.label}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Review workflow"
              title="Importat -> revizuit -> aprobat -> indexabil"
              description="Aceasta regula protejeaza site-ul de duplicate content si pastreaza catalogul util comercial."
            />
            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {["imported", "reviewed", "approved", "indexable"].map((status, index) => (
                <article className="rounded-xl border border-blue-100 bg-white p-5" key={status}>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">{status}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {status === "indexable"
                      ? "Pagina poate intra in sitemap numai dupa review si rescriere comerciala."
                      : "Pagina ramane noindex si folosita doar pentru ofertare/review intern."}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Produse importate"
              title="Baza de date initiala"
              description="Produsele de mai jos sunt disponibile pentru cereri de oferta, dar raman noindex pana la review."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {productCatalog.map((product) => (
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
