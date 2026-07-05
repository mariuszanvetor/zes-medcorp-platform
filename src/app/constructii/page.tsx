import type { Metadata } from "next";
import Image from "next/image";

import { ConstructionConversionDock } from "@/components/construction/ConstructionConversionDock";
import { ConstructionLeadForm } from "@/components/construction/ConstructionLeadForm";
import {
  constructionCostGuidePages,
  constructionDomain,
  constructionFaq,
  constructionHeroImage,
  constructionLeadCapturePages,
  constructionLocalExpansionPages,
  constructionNationalPages,
  constructionSeoPages,
  constructionServiceExpansionPages,
  constructionServices,
  constructionSite,
  getConstructionUrl,
} from "@/data/construction-site";

export const metadata: Metadata = {
  metadataBase: new URL(constructionDomain),
  applicationName: constructionSite.name,
  title: {
    absolute: "Renovari apartamente si constructii case Romania | ZES Construct",
  },
  description:
    "ZES Construct executa renovari apartamente, amenajari interioare, constructii case, bai, bucatarii si coordonare santier in Romania, cu prioritate Bucuresti, Ilfov si Arges.",
  keywords: [
    "renovari apartamente Romania",
    "constructii case Romania",
    "amenajari interioare Romania",
    "constructii Bucuresti",
    "renovari apartamente Bucuresti",
    "amenajari interioare Bucuresti",
    "constructii case Ilfov",
    "firma renovari apartamente",
    "renovari baie bucatarie",
  ],
  alternates: {
    canonical: getConstructionUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: constructionSite.name,
    title: "Renovari apartamente si constructii case Romania | ZES Construct",
    description:
      "Renovari, amenajari interioare, constructii case si coordonare de santier pentru proprietari din Romania, cu prioritate Bucuresti, Ilfov si Arges.",
    url: getConstructionUrl("/"),
    images: [
      {
        url: constructionHeroImage,
        width: 1200,
        height: 630,
        alt: "Santier rezidential si planuri de constructii",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renovari apartamente si constructii case Romania | ZES Construct",
    description:
      "Renovari apartamente, amenajari interioare, constructii case si management de santier in Romania.",
    images: [constructionHeroImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const processSteps = [
  {
    title: "Audit rapid",
    text: "Clarificam zona, stadiul locuintei, pozele, planurile si lucrarile critice.",
  },
  {
    title: "Deviz pe etape",
    text: "Separare intre demolari, instalatii, finisaje, materiale si management.",
  },
  {
    title: "Executie controlata",
    text: "Lucram pe etape, cu prioritati clare si receptii intermediare.",
  },
  {
    title: "Predare",
    text: "Inchidem lucrarea cu lista de verificare, corectii si recomandari de intretinere.",
  },
];

const servicePills = [
  { label: "Renovari apartamente", href: getConstructionUrl("/renovari-apartamente") },
  { label: "Amenajari interioare", href: getConstructionUrl("/amenajari-interioare") },
  { label: "Constructii case", href: getConstructionUrl("/constructii-case") },
  { label: "Bai si bucatarii", href: getConstructionUrl("/renovari-baie-bucatarie") },
  { label: "Management santier", href: getConstructionUrl("/management-santier") },
];

const professionalStandards = [
  "Oferta porneste de la stadiu, poze, masuratori si lista de lucrari, nu din promisiuni generale.",
  "Lucrarile ascunse, instalatiile si hidroizolatiile sunt discutate inainte de finisaje.",
  "Comunicarea se face pe etape: ce urmeaza, ce blocheaza lucrarea si ce decizii sunt necesare.",
  "Receptia se face cu lista de verificare, inclusiv detalii mici care devin costisitoare daca sunt lasate la final.",
];

const contactSignals = [
  "Telefon si WhatsApp vizibile pe mobil si desktop",
  "Formular scurt pentru primul contact",
  "Raspuns orientat spre pasul urmator, nu discutii lungi",
  "Detalii suficiente pentru o prima estimare responsabila",
];

const resourceGroups = [
  {
    title: "Oferta rapida",
    pages: constructionLeadCapturePages,
  },
  {
    title: "Lucrari in Romania",
    pages: constructionNationalPages,
  },
  {
    title: "Costuri si devize",
    pages: constructionCostGuidePages,
  },
  {
    title: "Lucrari punctuale",
    pages: constructionServiceExpansionPages,
  },
  {
    title: "Zone prioritare",
    pages: [
      ...constructionSeoPages.filter((page) =>
        [
          "renovari-apartamente-bucuresti",
          "renovari-apartamente-sector-3",
          "renovari-apartamente-popesti-leordeni",
          "renovari-apartamente-bragadiru",
        ].includes(page.slug),
      ),
      ...constructionLocalExpansionPages,
    ],
  },
];

export default function ConstructionHomePage() {
  const schemas = [
    buildWebsiteSchema(),
    buildBusinessSchema(),
    buildServiceItemListSchema(),
    buildFaqSchema(),
  ];

  return (
    <div className="construction-site bg-[#f7f3ea] pb-20 text-[#171614] md:pb-0">
      {schemas.map((schema) => (
        <JsonLd data={schema} key={schema["@type"]} />
      ))}
      <ConstructionHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#11100e] text-white">
          <Image
            alt="Locuinta rezidentiala amenajata cu finisaje premium"
            className="absolute inset-0 h-full w-full object-cover"
            fill
            priority
            sizes="100vw"
            src={constructionHeroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,9,0.94)_0%,rgba(10,10,9,0.78)_46%,rgba(10,10,9,0.22)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(10,10,9,0.82),rgba(10,10,9,0))]" />
          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl gap-10 px-4 pb-10 pt-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-8">
            <div className="pb-8 lg:pb-16">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d9b56d]">
                Romania / prioritar Bucuresti, Ilfov, Arges
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-7xl">
                Renovari si constructii rezidentiale in Romania, de la deviz la receptie.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                Pentru proprietari care vor un santier tratat ca un proiect:
                deviz pe etape, decizii clare, instalatii verificate, finisaje
                corelate si un responsabil care tine lucrarea sub control.
                Evaluam cereri din toata Romania, cu raspuns prioritar in
                Bucuresti, Ilfov si Arges.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#d9b56d] px-6 text-sm font-black uppercase tracking-[0.08em] text-[#171614] transition hover:bg-[#efca80] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35"
                  href="#oferta"
                >
                  Cere deviz rapid
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/45 px-6 text-sm font-bold text-white transition hover:bg-white hover:text-[#171614] focus:outline-none focus:ring-4 focus:ring-white/25"
                  href={constructionSite.whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp rapid
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#d9b56d]/70 bg-[#d9b56d]/10 px-6 text-sm font-bold text-white transition hover:bg-[#d9b56d] hover:text-[#171614] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/25"
                  href={constructionSite.phoneHref}
                >
                  Suna acum
                </a>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/72">
                Poti suna direct, scrie pe WhatsApp sau lasa o cerere scurta.
                Revenim cu intrebarile utile pentru urmatorul pas.
              </p>
            </div>
            <div className="pb-8 lg:pb-16">
              <div className="ml-auto max-w-md border-l border-white/25 pl-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                  Metoda de lucru
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight">
                  Evaluare inainte de promisiuni. Executie pe etape. Receptie fara improvizatii.
                </h2>
                <div className="mt-6 grid gap-3 text-sm text-white/76">
                  <p className="border-t border-white/16 pt-3">Devize etapizate si prioritati clare.</p>
                  <p className="border-t border-white/16 pt-3">Coordonare intre echipe, materiale si termen.</p>
                  <p className="border-t border-white/16 pt-3">Verificari pentru instalatii, hidroizolatii si finisaje.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8d0c2] bg-[#f7f3ea]">
          <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
            {servicePills.map((signal) => (
              <a
                className="group rounded-sm border border-[#d8d0c2] bg-white/72 px-4 py-3 text-sm font-bold text-[#171614] transition hover:border-[#b78d45] hover:bg-white"
                href={signal.href}
                key={signal.label}
              >
                <span className="mr-2 text-[#b78d45]">/</span>
                {signal.label}
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
              De ce ZES Construct
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08] text-[#171614]">
              Lucrari rezidentiale planificate clar, cu decizii luate inainte
              sa inceapa santierul.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#5f5a50]">
              Pentru renovari si constructii, diferenta o fac detaliile stabilite
              la inceput: ce se demoleaza, ce instalatii se verifica, ce materiale
              se aleg, cine coordoneaza echipele si cum se face receptia pe etape.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Acoperire" value="RO" text="toata Romania, cu raspuns prioritar regional" />
            <Metric label="Servicii principale" value="5" text="renovari, amenajari, case" />
            <Metric label="Control lucrare" value="1" text="responsabil pentru coordonare" />
          </div>
        </section>

        <section className="bg-[#171614] py-20 text-[#f7f3ea]" id="servicii">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d9b56d]">
                Servicii
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
                Alege lucrarea si vezi ce include evaluarea initiala.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {constructionServices.map((service) => (
                <article
                  className="overflow-hidden border border-white/12 bg-white/[0.045]"
                  key={service.slug}
                >
                  <Image
                    alt={service.imageAlt}
                    className="aspect-[16/10] w-full object-cover"
                    height={500}
                    loading="lazy"
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    src={service.image}
                    width={800}
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold">{service.shortTitle}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-7 text-white/68">
                      {service.lead}
                    </p>
                    <ul className="mt-4 grid gap-2">
                      {service.deliverables.slice(0, 2).map((item) => (
                        <li
                          className="border-l-2 border-[#d9b56d] bg-white/[0.06] px-3 py-2 text-xs font-semibold leading-5 text-white/72"
                          key={item}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      className="mt-5 inline-flex min-h-10 items-center rounded-sm border border-[#d9b56d]/55 px-4 text-sm font-bold text-[#f3d899] transition hover:bg-[#d9b56d] hover:text-[#171614]"
                      href={getConstructionUrl(`/${service.slug}`)}
                    >
                      Vezi detalii
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eee7da] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
                Standard profesional
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
                Mai putine surprize in santier, mai multe decizii clare inainte de executie.
              </h2>
              <div className="mt-6 border border-[#d1ae6b] bg-[#fff8e8] p-5">
                <p className="text-sm font-semibold leading-7 text-[#4a371d]">
                  Pentru o prima discutie buna, avem nevoie de zona, tipul
                  lucrarii, stadiul locuintei si cateva repere despre termen.
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {professionalStandards.map((standard, index) => (
                <div
                  className="grid gap-4 border border-[#d8d0c2] bg-white p-5 sm:grid-cols-[3rem_1fr]"
                  key={standard}
                >
                  <span className="flex h-11 w-11 items-center justify-center bg-[#171614] text-sm font-black text-[#d9b56d]">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-[#5f5a50]">{standard}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8d0c2] bg-white py-20" id="ghiduri">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
                  Ghiduri, costuri si zone
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
                  Gasesti direct raspunsul potrivit pentru lucrarea ta.
                </h2>
              </div>
              <p className="text-base leading-8 text-[#5f5a50]">
                Costuri, devize, lucrari punctuale si zone acoperite, explicate
                pe intelesul proprietarilor care vor sa compare corect variantele
                inainte de renovare sau constructie.
              </p>
            </div>
            <div className="mt-9 grid gap-5 lg:grid-cols-2 xl:grid-cols-5">
              {resourceGroups.map((group) => (
                <div className="border border-[#d8d0c2] bg-[#f7f3ea]" key={group.title}>
                  <div className="border-b border-[#d8d0c2] bg-white px-5 py-4">
                    <h3 className="text-lg font-semibold text-[#171614]">{group.title}</h3>
                  </div>
                  <div className="grid divide-y divide-[#d8d0c2]">
                    {group.pages.map((page) => (
                      <a
                        className="group block p-4 transition hover:bg-white"
                        href={getConstructionUrl(`/${page.slug}`)}
                        key={page.slug}
                      >
                        <span className="block text-sm font-semibold leading-6 text-[#171614] group-hover:text-[#8b672d]">
                          {page.shortTitle}
                        </span>
                        <span className="mt-1 block text-xs leading-6 text-[#6a6256]">
                          {page.metaDescription}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="proces">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
                Proces
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
                Lucrari gandite pe decizii, nu pe promisiuni vagi.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <div
                  className="border border-[#d8d0c2] bg-white p-5"
                  key={step.title}
                >
                  <p className="text-sm font-black text-[#9b7334]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5f5a50]">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eee7da] py-20" id="zone">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
                Zone acoperite
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
                Evaluam lucrari in Romania, cu prioritate pentru Bucuresti, Ilfov si Arges.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5f5a50]">
                Pentru Bucuresti, Ilfov si Arges raspunsul este prioritar. Pentru
                alte judete din Romania, confirmam disponibilitatea in functie de
                amploarea lucrarii, acces, calendar si etapa proiectului.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {constructionSite.areas.map((area) => (
                <div
                  className="border border-[#d8d0c2] bg-white p-5"
                  key={area}
                >
                  <h3 className="text-lg font-semibold">{area}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f5a50]">
                    Evaluare in functie de tip lucrare, acces si disponibilitate.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#171614] py-14 text-[#f7f3ea]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d9b56d]">
                Contact simplu
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
                Alegi rapid cum vrei sa incepi discutia.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {contactSignals.map((signal) => (
                <div
                  className="border border-white/12 bg-white/[0.05] p-4 text-sm font-semibold leading-6 text-white/82"
                  key={signal}
                >
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div id="faq">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9b7334]">
              Intrebari
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.08]">
              Ce clarificam inainte de deviz.
            </h2>
            <div className="mt-7 divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">
              {constructionFaq.map((item) => (
                <details className="group py-4" key={item.question}>
                  <summary className="cursor-pointer list-none text-base font-semibold text-[#171614]">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[#5f5a50]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
          <ConstructionLeadForm sourcePage="constructii-home" />
        </section>
      </main>
      <ConstructionConversionDock
        contextLabel="lucrare de renovare sau constructie"
        sourcePage="constructii-home"
      />
      <ConstructionFooter />
    </div>
  );
}

function ConstructionHeader() {
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
        <nav aria-label="Navigatie constructii" className="hidden items-center gap-1 rounded-sm border border-[#d8d0c2] bg-white/62 p-1 md:flex">
          <a className="px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#5f5a50] hover:bg-[#f7f3ea] hover:text-[#171614]" href="#servicii">
            Servicii
          </a>
          <a className="px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#5f5a50] hover:bg-[#f7f3ea] hover:text-[#171614]" href="#ghiduri">
            Ghiduri
          </a>
          <a className="px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#5f5a50] hover:bg-[#f7f3ea] hover:text-[#171614]" href="#proces">
            Proces
          </a>
          <a className="px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#5f5a50] hover:bg-[#f7f3ea] hover:text-[#171614]" href="#zone">
            Zone
          </a>
          <a className="px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#5f5a50] hover:bg-[#f7f3ea] hover:text-[#171614]" href="#faq">
            FAQ
          </a>
        </nav>
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

function ConstructionFooter() {
  return (
    <footer className="border-t border-[#d8d0c2] bg-[#171614] text-[#f7f3ea]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-white/68 sm:px-6 md:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <p className="font-semibold text-white">ZES Construct</p>
          <p className="mt-2 max-w-xl leading-7">
            {constructionSite.description}
          </p>
          <p className="mt-4 text-xs text-white/45">
            {constructionSite.legalName} - {constructionSite.address.full}
          </p>
        </div>
        <div className="grid gap-2 md:justify-end md:text-right">
          <a className="font-semibold text-white" href={constructionSite.phoneHref}>
            {constructionSite.phone}
          </a>
          <a className="font-semibold text-white" href={constructionSite.emailHref}>
            {constructionSite.email}
          </a>
          <a
            className="font-semibold text-[#d9b56d]"
            href={constructionSite.whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

function Metric({ label, value, text }: { label: string; value: string; text: string }) {
  return (
    <div className="border border-[#d8d0c2] bg-white p-5">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a8172]">{label}</p>
      <p className="mt-4 text-5xl font-semibold leading-none text-[#171614]">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[#5f5a50]">{text}</p>
    </div>
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

function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: constructionSite.name,
    url: getConstructionUrl("/"),
    inLanguage: "ro-RO",
    potentialAction: {
      "@type": "ContactAction",
      target: getConstructionUrl("/#oferta"),
      name: "Cere evaluare pentru constructii si renovari",
    },
  };
}

function buildBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: constructionSite.name,
    legalName: constructionSite.legalName,
    url: getConstructionUrl("/"),
    telephone: constructionSite.phone,
    email: constructionSite.email,
    image: constructionHeroImage,
    areaServed: constructionSite.areas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: constructionSite.address.streetAddress,
      addressLocality: constructionSite.address.addressLocality,
      addressRegion: constructionSite.address.addressRegion,
      addressCountry: constructionSite.address.addressCountry,
    },
    sameAs: [constructionSite.whatsappHref],
  };
}

function buildServiceItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: constructionServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        provider: {
          "@type": "HomeAndConstructionBusiness",
          name: constructionSite.name,
        },
        areaServed: constructionSite.areas.join(", "),
        url: getConstructionUrl(`/${service.slug}`),
      },
    })),
  };
}

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: constructionFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
