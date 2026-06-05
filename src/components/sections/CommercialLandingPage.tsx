import Image from "next/image";
import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { CommercialLandingPage as CommercialLandingPageData } from "@/data/commercial-landing-pages";
import { companyContact } from "@/lib/brand";
import { getCommercialLandingVisual } from "@/lib/visual-assets";

type CommercialLandingPageProps = {
  page: CommercialLandingPageData;
};

export function CommercialLandingPage({ page }: CommercialLandingPageProps) {
  const sourcePage = `/${page.slug}`;
  const visual = getCommercialLandingVisual(page.slug);

  return (
    <>
      <BreadcrumbSchema
        id={`breadcrumb-schema-${page.slug}`}
        items={[
          { name: "Acasă", href: "/" },
          { name: page.title, href: sourcePage },
        ]}
      />
      <FAQSchema items={page.faqs} id={`faq-schema-${page.slug}`} />
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
            alt={visual.alt}
            className={`object-cover opacity-50 ${visual.position ?? "object-center"}`}
            fill
            priority
            sizes="100vw"
            src={visual.src}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,25,0.96)_0%,rgba(2,18,38,0.88)_48%,rgba(2,18,38,0.52)_100%)]" />
          <Container className="relative">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                {page.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
                  data-cta="project-evaluation"
                  data-page-intent={page.pageIntent}
                  href={`/project-intake?source=${page.slug}`}
                >
                  {page.secondaryCta}
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                {page.heroNote}
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                eyebrow="Context comercial"
                title={page.audienceTitle}
                description={page.audienceDescription}
              />
              <div className="grid gap-3">
                {page.audiences.map((item) => (
                  <article
                    className="rounded-xl border border-slate-200 bg-[#f8fbff] px-5 py-4 text-sm leading-7 text-slate-700"
                    key={item}
                  >
                    {item}
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.08)]">
                <h2 className="text-2xl font-semibold text-slate-950">{page.helpTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{page.helpDescription}</p>
                <BulletList items={page.helpItems} />
              </article>
              <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_16px_38px_rgba(15,65,118,0.08)]">
                <h2 className="text-2xl font-semibold text-slate-950">{page.infoTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{page.infoDescription}</p>
                <BulletList items={page.requiredInfo} />
                <OpenZESButton
                  className="mt-5"
                  ctaLabel={`${page.primaryCta} info`}
                  dataCta="zes-open"
                  pageIntent={page.pageIntent}
                  prompt={page.zesPrompt}
                  sourcePage={sourcePage}
                >
                  {page.primaryCta}
                </OpenZESButton>
              </article>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Proces"
              title={page.processTitle}
              description={page.processDescription}
            />
            <div className="mt-8 grid gap-3 md:grid-cols-5">
              {page.processSteps.map((step, index) => (
                <article className="rounded-xl border border-blue-100 bg-[#f8fbff] p-4" key={step}>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{step}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-semibold text-slate-950">{page.mistakesTitle}</h2>
                <BulletList items={page.mistakes} />
                {page.complianceNote && (
                  <p className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-7 text-slate-700">
                    {page.complianceNote}
                  </p>
                )}
              </article>
              <ContactCard pageIntent={page.pageIntent} />
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Întrebări frecvente"
              title="Clarificări înainte de următorul pas"
              description="Răspunsuri scurte pentru etapa preliminară. Detaliile finale depind de echipament și de contextul real al proiectului."
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

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                  Resurse conexe
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Continuă cu informațiile relevante pentru proiect.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.relatedLinks.map((link) => (
                  <Link
                    className="rounded-xl border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm font-semibold leading-6 text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
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

        <Section className="border-t border-blue-100 bg-slate-950" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
                  Evaluare preliminară
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Pregătește următorul pas cu ZES și echipa ZESCORP.
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                  Pentru proiecte reale, datele sunt validate de echipa tehnică ZESCORP înainte de ofertare.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <OpenZESButton
                  ctaLabel={page.primaryCta}
                  dataCta="zes-open"
                  pageIntent={page.pageIntent}
                  prompt={page.zesPrompt}
                  sourcePage={sourcePage}
                >
                  {page.primaryCta}
                </OpenZESButton>
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/15"
                  data-cta="whatsapp"
                  data-page-intent={page.pageIntent}
                  href={companyContact.whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  Contact rapid / WhatsApp
                </Link>
              </div>
            </div>
          </Container>
        </Section>
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

function ContactCard({ pageIntent }: { pageIntent: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_44px_rgba(15,23,42,0.16)]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
        Contact direct
      </p>
      <h2 className="mt-3 text-2xl font-semibold">Discuție cu un specialist ZESCORP</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Ai deja planul, un termen scurt sau o situație urgentă? Poți contacta direct echipa tehnică.
      </p>
      <div className="mt-5 grid gap-2">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
          data-cta="phone"
          data-page-intent={pageIntent}
          href={companyContact.phoneHref}
        >
          {companyContact.phone}
        </Link>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
          data-cta="email"
          data-page-intent={pageIntent}
          href={companyContact.emailHref}
        >
          {companyContact.email}
        </Link>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0f9d58] px-4 text-sm font-semibold text-white transition hover:bg-[#0d8b4d]"
          data-cta="whatsapp"
          data-page-intent={pageIntent}
          href={companyContact.whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          Scrie pe WhatsApp
        </Link>
      </div>
    </article>
  );
}
