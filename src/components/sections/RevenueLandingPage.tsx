import Image from "next/image";
import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { RevenueLeadForm } from "@/components/forms/RevenueLeadForm";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { CommercialConversionBand } from "@/components/sections/CommercialConversionBand";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  revenuePillarLabels,
  type RevenueLandingPage as RevenueLandingPageData,
} from "@/data/revenue-landing-pages";
import { companyContact } from "@/lib/brand";

export function RevenueLandingPage({ page }: { page: RevenueLandingPageData }) {
  const sourcePage = `/solutii-medicale/${page.slug}`;

  return (
    <>
      <BreadcrumbSchema
        id={`breadcrumb-schema-revenue-${page.slug}`}
        items={[
          { name: "Acasă", href: "/" },
          { name: "Soluții medicale", href: "/solutii-medicale" },
          { name: page.title, href: sourcePage },
        ]}
      />
      <FAQSchema items={page.faqs} id={`faq-schema-revenue-${page.slug}`} />
      <ServiceSchema
        description={page.metadataDescription}
        name={page.title}
        serviceType={page.title}
        url={sourcePage}
      />

      <div data-page-intent={page.pageIntent}>
        <Section
          className="relative isolate overflow-hidden border-b border-blue-100 bg-slate-950"
          spacing="xl"
          tone="transparent"
        >
          <Image
            alt=""
            aria-hidden
            className="object-cover object-center opacity-40"
            fill
            priority
            sizes="100vw"
            src="/hero-medical-tech.png"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,25,0.97)_0%,rgba(2,18,38,0.9)_52%,rgba(2,18,38,0.62)_100%)]" />
          <Container className="relative">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                {revenuePillarLabels[page.pillar]} / {page.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {page.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <OpenZESButton
                  ctaLabel={page.primaryCta}
                  dataCta="zes-open"
                  pageIntent={page.pageIntent}
                  prompt={page.zesPrompt}
                  size="lg"
                  sourcePage={sourcePage}
                >
                  {page.primaryCta}
                </OpenZESButton>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-base font-semibold text-white transition hover:border-white/45 hover:bg-white/15"
                  data-cta="preliminary-request"
                  data-page-intent={page.pageIntent}
                  href="#solicitare"
                >
                  Trimite solicitarea
                </Link>
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">{page.heroNote}</p>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow="Context comercial"
                title="Pentru cine este relevantă soluția"
                description="Pagina este construită pentru o discuție tehnico-comercială aplicată. Poți începe și cu date incomplete."
              />
              <div className="grid gap-3 sm:grid-cols-3">
                {page.audiences.map((item) => (
                  <article className="rounded-xl border border-blue-100 bg-[#f8fbff] p-5 text-sm font-semibold leading-7 text-slate-700" key={item}>
                    {item}
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
                <h2 className="text-2xl font-semibold text-slate-950">Ce putem clarifica împreună</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Discuția pornește de la situația reală și de la deciziile care influențează ofertarea.
                </p>
                <BulletList items={page.scopeItems} />
              </article>
              <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.07)]">
                <h2 className="text-2xl font-semibold text-slate-950">Informații utile pentru prima evaluare</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Nu este necesar un dosar complet. Aceste repere ajută echipa să aleagă întrebările potrivite.
                </p>
                <BulletList items={page.requiredInfo} />
              </article>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Flux de lucru"
              title="De la solicitare la următorul pas comercial"
              description="Fiecare etapă reduce incertitudinea și separă evaluarea preliminară de validarea tehnică necesară."
            />
            <div className="mt-8 grid gap-3 md:grid-cols-5">
              {page.workflow.map((step, index) => (
                <article className="rounded-xl border border-blue-100 bg-[#f8fbff] p-4" key={step}>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{step}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.86fr]">
              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-semibold text-slate-950">Greșeli care merită prevenite</h2>
                <BulletList items={page.mistakes} />
                <p className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-7 text-slate-700">
                  {page.complianceNote}
                </p>
              </article>
              <DirectContactCard pageIntent={page.pageIntent} />
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" id="solicitare" spacing="lg" tone="transparent">
          <Container>
            <RevenueLeadForm page={page} />
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Întrebări frecvente"
              title="Clarificări înainte de ofertare"
              description="Răspunsuri practice pentru o primă decizie. Detaliile finale depind de contextul tehnic real."
            />
            <div className="mt-8 grid gap-3 lg:grid-cols-3">
              {page.faqs.map((faq) => (
                <article className="rounded-xl border border-blue-100 bg-white p-5" key={faq.question}>
                  <h3 className="text-base font-semibold leading-7 text-slate-950">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="border-t border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">Legături utile</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Continuă cu pagina relevantă pentru decizia ta.</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.relatedLinks.map((link) => (
                  <Link
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <CommercialConversionBand
          description="Descrie situația pe scurt. ZES poate structura cererea, iar echipa ZESCORP continuă cu validarea umană și următorul pas comercial potrivit."
          pageIntent={page.pageIntent}
          primaryLabel={page.primaryCta}
          prompt={page.zesPrompt}
          sourcePage={sourcePage}
          title="Ai un proiect, o achiziție sau o nevoie de service?"
        />
      </div>
    </>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-700">
      {items.map((item) => (
        <li className="flex items-start gap-2" key={item}>
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DirectContactCard({ pageIntent }: { pageIntent: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_44px_rgba(15,23,42,0.16)]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">Contact direct</p>
      <h2 className="mt-3 text-2xl font-semibold">Discuție cu echipa ZESCORP</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Pentru proiecte reale, datele sunt validate de echipa tehnică înainte de ofertare sau intervenție.
      </p>
      <div className="mt-5 grid gap-2">
        <Link className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-4 text-sm font-semibold text-white transition hover:bg-white/10" data-cta="phone" data-page-intent={pageIntent} href={companyContact.phoneHref}>
          {companyContact.phone}
        </Link>
        <Link className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-4 text-sm font-semibold text-white transition hover:bg-white/10" data-cta="email" data-page-intent={pageIntent} href={companyContact.emailHref}>
          {companyContact.email}
        </Link>
        <Link className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0f9d58] px-4 text-sm font-semibold text-white transition hover:bg-[#0d8b4d]" data-cta="whatsapp" data-page-intent={pageIntent} href={companyContact.whatsappHref} rel="noreferrer" target="_blank">
          Contact rapid / WhatsApp
        </Link>
      </div>
    </article>
  );
}
