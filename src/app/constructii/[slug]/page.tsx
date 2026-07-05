import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ConstructionConversionDock } from "@/components/construction/ConstructionConversionDock";
import { ConstructionLeadForm } from "@/components/construction/ConstructionLeadForm";
import {
  constructionAllPages,
  constructionDomain,
  constructionPageMap,
  constructionSite,
  getConstructionUrl,
  type ConstructionServicePage,
} from "@/data/construction-site";

type ConstructionServiceRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

const offerPreparation = [
  {
    title: "Stadiu si poze",
    text: "Intelegem ce exista acum, ce trebuie pastrat si ce trebuie refacut.",
  },
  {
    title: "Riscuri tehnice",
    text: "Separaram lucrarile vizibile de instalatii, hidroizolatii, acces si detalii ascunse.",
  },
  {
    title: "Buget si termen",
    text: "Stabilim un scenariu realist, cu etape si decizii care pot influenta costul.",
  },
];

export function generateStaticParams() {
  return constructionAllPages.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ConstructionServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = constructionPageMap.get(slug);

  if (!page) {
    notFound();
  }

  return {
    metadataBase: new URL(constructionDomain),
    applicationName: constructionSite.name,
    title: {
      absolute: page.metaTitle,
    },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: getConstructionUrl(`/${page.slug}`),
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      siteName: constructionSite.name,
      title: page.metaTitle,
      description: page.metaDescription,
      url: getConstructionUrl(`/${page.slug}`),
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [page.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ConstructionServiceRoute({
  params,
}: ConstructionServiceRouteProps) {
  const { slug } = await params;
  const page = constructionPageMap.get(slug);

  if (!page) {
    notFound();
  }

  const isLeadCapturePage = page.intent === "ads";
  const related = page.related
    .map((relatedSlug) => constructionPageMap.get(relatedSlug))
    .filter((item): item is ConstructionServicePage => Boolean(item));
  const schemas = [
    buildBreadcrumbSchema(page),
    buildServiceSchema(page),
    buildFaqSchema(page),
  ];

  return (
    <div className="construction-site bg-[#f7f3ea] pb-20 text-[#171614] md:pb-0">
      {schemas.map((schema) => (
        <JsonLd data={schema} key={schema["@type"]} />
      ))}
      <ServiceHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#171614] text-white">
          <Image
            alt={page.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            fill
            priority
            sizes="100vw"
            src={page.image}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,9,0.92)_0%,rgba(10,10,9,0.76)_50%,rgba(10,10,9,0.24)_100%)]" />
          <div className="relative z-10 mx-auto grid min-h-[68vh] max-w-7xl gap-8 px-4 pb-10 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-8">
            <div className="max-w-4xl pb-8">
              <a
                className="text-xs font-black uppercase tracking-[0.22em] text-[#d9b56d]"
                href={getConstructionUrl("/")}
              >
                ZES Construct
              </a>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                {page.lead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center bg-[#d9b56d] px-6 text-sm font-black uppercase tracking-[0.08em] text-[#171614] transition hover:bg-[#efca80]"
                  href="#oferta"
                >
                  {isLeadCapturePage ? "Vreau oferta rapida" : "Cere deviz"}
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center border border-white/45 px-6 text-sm font-bold text-white transition hover:bg-white hover:text-[#171614]"
                  href={constructionSite.phoneHref}
                >
                  Suna direct
                </a>
              </div>
            </div>
            <div className="pb-8">
              {isLeadCapturePage ? (
                <ConstructionLeadForm
                  anchorId="oferta"
                  compact
                  defaultBudgetRange={page.defaultBudgetRange}
                  defaultProjectType={page.defaultProjectType}
                  defaultPropertyStatus={page.defaultPropertyStatus}
                  defaultTimeline={page.defaultTimeline}
                  description={page.leadFormDescription}
                  locationPlaceholder="Localitatea lucrarii din Romania"
                  mode="quick"
                  showBudgetInQuick
                  showPropertyStatusInQuick
                  sourcePage={`constructii-ads-${page.slug}-hero`}
                  submitLabel="Vreau oferta telefonica"
                  title={page.leadFormTitle ?? `Cere oferta pentru ${page.shortTitle.toLowerCase()}`}
                />
              ) : (
                <p className="border-l border-white/25 pl-6 text-sm leading-7 text-white/72">
                  {page.proof}
                </p>
              )}
            </div>
          </div>
        </section>

        {isLeadCapturePage && (
          <section className="border-b border-[#d8d0c2] bg-white py-10">
            <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
              {(page.conversionPoints ?? []).map((point) => (
                <div
                  className="border border-[#d8d0c2] bg-[#f7f3ea] p-4 text-sm font-semibold leading-6 text-[#4d4538]"
                  key={point}
                >
                  {point}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
              Oferta responsabila
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
              Incepem cu informatiile care schimba cu adevarat devizul.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {offerPreparation.map((item) => (
              <article
                className="border border-[#d8d0c2] bg-white p-5"
                key={item.title}
              >
                <h3 className="text-base font-semibold text-[#171614]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5f5a50]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 border-t border-[#d8d0c2] px-4 py-20 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
              {isLeadCapturePage ? "Filtrare rapida" : "Probleme rezolvate"}
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
              {isLeadCapturePage
                ? "Intrebari scurte care ajuta oferta sa fie realista."
                : "Inainte de santier clarificam riscurile care cresc costul."}
            </h2>
          </div>
          <div className="grid gap-4">
            {(isLeadCapturePage && page.qualification?.length
              ? page.qualification
              : page.problems
            ).map((problem) => (
              <div
                className="border border-[#d8d0c2] bg-white p-5"
                key={problem}
              >
                <p className="text-sm leading-7 text-[#5f5a50]">{problem}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#eee7da] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
                Ce primesti
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
                O lucrare impartita in etape verificabile.
              </h2>
            </div>
            <ul className="grid gap-3">
              {page.deliverables.map((item) => (
                <li
                  className="border border-[#d8d0c2] bg-white p-4 text-sm font-medium leading-7 text-[#5f5a50]"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
              Proces
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
              Cum trecem de la discutie la lucrare.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {page.process.map((step, index) => (
              <div
                className="border border-[#d8d0c2] bg-white p-5"
                key={step}
              >
                <p className="text-sm font-black text-[#9b7334]">0{index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-[#5f5a50]">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#171614] py-20 text-[#f7f3ea]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d9b56d]">
                Intrebari frecvente
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
                Raspunsuri pentru decizia initiala.
              </h2>
            </div>
            <div className="divide-y divide-white/12 border-y border-white/12">
              {page.faq.map((item) => (
                <details className="py-4" key={item.question}>
                  <summary className="cursor-pointer list-none font-semibold">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
              Servicii conexe
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
              Servicii care pot completa lucrarea.
            </h2>
            <div className="mt-6 grid gap-3">
              {related.map((item) => (
                <a
                  className="border border-[#d8d0c2] bg-white p-4 text-sm font-semibold text-[#171614] transition hover:border-[#b78d45] hover:bg-[#f7f3ea]"
                  href={getConstructionUrl(`/${item.slug}`)}
                  key={item.slug}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
          <ConstructionLeadForm
            anchorId={isLeadCapturePage ? "oferta-detaliata" : "oferta"}
            defaultBudgetRange={page.defaultBudgetRange}
            defaultProjectType={page.defaultProjectType}
            defaultPropertyStatus={page.defaultPropertyStatus}
            defaultTimeline={page.defaultTimeline}
            description={page.leadFormDescription}
            locationPlaceholder="Localitatea lucrarii"
            sourcePage={`constructii-${page.slug}`}
            title={`Cere evaluare pentru ${page.shortTitle.toLowerCase()}`}
          />
        </section>
      </main>
      <ConstructionConversionDock
        contextLabel={page.shortTitle.toLowerCase()}
        sourcePage={`constructii-${page.slug}`}
      />
      <ServiceFooter />
    </div>
  );
}

function ServiceHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d8d0c2] bg-[#f7f3ea]/94 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          aria-label="ZES Construct"
          className="inline-flex min-w-0 items-center gap-3 font-semibold text-[#171614]"
          href={getConstructionUrl("/")}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#171614] text-sm font-black text-[#d9b56d]">
            Z
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-black uppercase tracking-[0.12em] sm:text-base">
              ZES Construct
            </span>
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-[#8a8172] sm:block">
              renovari / amenajari / case
            </span>
          </span>
        </a>
        <div className="flex items-center gap-2">
          <a
            className="hidden min-h-11 items-center border border-[#d8d0c2] bg-white/72 px-4 text-sm font-black text-[#171614] transition hover:border-[#b78d45] lg:inline-flex"
            href={constructionSite.phoneHref}
          >
            {constructionSite.phone}
          </a>
          <a
            className="inline-flex min-h-11 min-w-20 items-center justify-center bg-[#171614] px-4 text-sm font-black !text-white transition hover:bg-[#9b7334]"
            href="#oferta"
          >
            Oferta
          </a>
        </div>
      </div>
    </header>
  );
}

function ServiceFooter() {
  return (
    <footer className="border-t border-[#d8d0c2] bg-[#171614]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/68 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          {constructionSite.name} - {constructionSite.tagline}
        </p>
        <div className="flex flex-wrap gap-4">
          <a className="font-semibold text-white" href={constructionSite.phoneHref}>
            {constructionSite.phone}
          </a>
          <a className="font-semibold text-[#d9b56d]" href={constructionSite.whatsappHref}>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}

function buildBreadcrumbSchema(page: ConstructionServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Constructii",
        item: getConstructionUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.shortTitle,
        item: getConstructionUrl(`/${page.slug}`),
      },
    ],
  };
}

function buildServiceSchema(page: ConstructionServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    url: getConstructionUrl(`/${page.slug}`),
    image: page.image,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: constructionSite.name,
      legalName: constructionSite.legalName,
      telephone: constructionSite.phone,
      email: constructionSite.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: constructionSite.address.streetAddress,
        addressLocality: constructionSite.address.addressLocality,
        addressRegion: constructionSite.address.addressRegion,
        addressCountry: constructionSite.address.addressCountry,
      },
    },
    areaServed: constructionSite.areas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
  };
}

function buildFaqSchema(page: ConstructionServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
