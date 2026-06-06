import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
  productCatalog,
  productCategories,
} from "@/lib/product-catalog";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Catalog produse medicale | ZES MEDCORP",
  description:
    "Catalog medical ZESCORP pentru echipamente, laborator, urgenta, sterilizare, mobilier medical, ORL, ginecologie si consumabile, cu oferta, instalare si service.",
  path: "/produse",
  noIndex: true,
  keywords: ["catalog produse medicale", "echipamente medicale", "oferta aparatura medicala"],
});

export default function ProductCatalogHubPage() {
  const displayProducts = productCatalog
    .filter((product) => product.sourceQuality === "gima_page_parity_review")
    .slice(0, 24);

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
                Catalog produse medicale
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                Produse medicale pentru clinici, cabinete si laboratoare.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Selectie de echipamente si consumabile medicale pentru ofertare,
                instalare, service si mentenanta. ZESCORP ajuta la alegerea
                configuratiei potrivite pentru aplicatia clinica.
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
                  Contracte mentenanta
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Categorii"
              title="Structura catalogului"
              description="Alege categoria potrivita si solicita oferta pentru produs, instalare, service sau mentenanta."
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
              eyebrow="Cum lucram"
              title="Oferta, instalare si suport tehnic"
              description="Produsele sunt tratate impreuna cu aplicatia clinica, spatiul, accesoriile, consumabilele si mentenanta necesara."
            />
            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {[
                ["01", "Clarificare nevoie", "Discutam aplicatia, cantitatea, termenul si bugetul orientativ."],
                ["02", "Selectie produs", "Verificam categoria, configuratia si alternativele potrivite."],
                ["03", "Oferta si livrare", "Pregatim oferta si conditiile comerciale pentru proiect."],
                ["04", "Service", "Stabilim optiuni de instalare, mentenanta si suport tehnic."],
              ].map(([step, title, text]) => (
                <article className="rounded-xl border border-blue-100 bg-white p-5" key={step}>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                    {step}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Produse"
              title="Produse pentru cereri de oferta"
              description="Alege produsul sau categoria si trimite contextul pentru verificare comerciala."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {displayProducts.map((product) => {
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
            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-500">
              Pentru produse, accesorii sau configuratii care nu apar in selectie, trimite o cerere catre ZESCORP.
              Echipa poate verifica alternative potrivite, documentatie disponibila si optiuni de service.
            </p>
          </Container>
        </Section>
      </main>
    </>
  );
}
