import Image from "next/image";
import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { MaintenanceLeadForm } from "@/components/forms/MaintenanceLeadForm";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { MaintenanceCalculator } from "@/components/sections/MaintenanceCalculator";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { MaintenanceContractPage as MaintenanceContractPageData } from "@/data/maintenance-contracts";
import { companyContact } from "@/lib/brand";

export function MaintenanceContractPage({
  page,
}: {
  page: MaintenanceContractPageData;
}) {
  const sourcePage = `/contracte-mentenanta/${page.slug}`;

  return (
    <>
      <BreadcrumbSchema
        id={`breadcrumb-schema-maintenance-${page.slug}`}
        items={[
          { name: "Acasa", href: "/" },
          { name: "Contracte mentenanta", href: "/contracte-mentenanta" },
          { name: page.title, href: sourcePage },
        ]}
      />
      <FAQSchema items={page.faqs} id={`faq-schema-maintenance-${page.slug}`} />
      <ServiceSchema
        description={page.metadataDescription}
        name={page.title}
        serviceType="Contracte mentenanta aparatura medicala"
        url={sourcePage}
      />

      <main data-page-intent={page.pageIntent}>
        <Section className="relative isolate overflow-hidden border-b border-blue-100 bg-slate-950" spacing="xl" tone="transparent">
          <Image
            alt={page.visual.alt}
            className={`object-cover opacity-45 ${page.visual.position ?? "object-center"}`}
            fill
            priority
            sizes="100vw"
            src={page.visual.src}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,25,0.97)_0%,rgba(2,18,38,0.88)_55%,rgba(2,18,38,0.58)_100%)]" />
          <Container className="relative">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                Contracte mentenanta / {page.category}
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
                  dataCta="maintenance-zes-open"
                  pageIntent={page.pageIntent}
                  prompt={page.zesPrompt}
                  size="lg"
                  sourcePage={sourcePage}
                >
                  {page.primaryCta}
                </OpenZESButton>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-base font-semibold text-white transition hover:border-white/45 hover:bg-white/15"
                  data-cta="maintenance-quote"
                  data-page-intent={page.pageIntent}
                  href="#solicitare-mentenanta"
                >
                  Cere oferta contract
                </Link>
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
                {page.heroNote}
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <SectionHeading
                eyebrow="Pentru cine"
                title="Contracte construite pentru operare recurenta, nu doar interventii punctuale."
                description="Mentenanta devine utila comercial cand inventarul, criticitatea si timpul de raspuns sunt clare de la inceput."
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
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoCard title="Echipamente acoperite" items={page.coveredEquipment} />
              <InfoCard title="Valoare operationala" items={page.contractValue} />
              <InfoCard title="Date necesare" items={page.requiredInfo} />
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              align="center"
              className="mx-auto"
              eyebrow="Calculator"
              title="Plan orientativ de mentenanta"
              description="Selecteaza inventarul aproximativ si vezi ce nivel de contract ar putea fi potrivit pentru discutia initiala."
            />
            <div className="mt-8">
              <MaintenanceCalculator sourcePage={sourcePage} />
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <SectionHeading
                  eyebrow="Flux comercial"
                  title="De la inventar la contract recurent"
                  description="Scopul este sa separi preventia, suportul operational si urgentele intr-un cadru usor de gestionat."
                />
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {page.workflow.map((step, index) => (
                    <article className="rounded-xl border border-blue-100 bg-white p-4" key={step}>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                        {step}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
              <article className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
                  Niveluri de service
                </p>
                <ul className="mt-5 grid gap-3">
                  {page.serviceLevels.map((item) => (
                    <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold leading-6" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  {page.complianceNote}
                </p>
              </article>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" id="solicitare-mentenanta" spacing="lg" tone="transparent">
          <Container>
            <MaintenanceLeadForm
              description={page.leadDescription}
              generatedSummary={`${page.title}. Cerere de evaluare pentru contract recurent de mentenanta, cu analiza inventar, criticitate si nivel de service.`}
              inquiryType={page.title}
              sourcePage={sourcePage}
              title={page.leadTitle}
            />
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Incredere operationala"
              title="Mentenanta trebuie sa sustina activitatea clinicii."
              description="ZESCORP abordeaza service-ul ca proces: inventar, criticitate, preventie, interventie, raportare si recomandari pentru ciclul de viata al echipamentelor."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                "Experienta pe categorii medicale critice: imagistica, radiologie, ecografie, laborator si biomedical.",
                "Suport la nivel national, cu organizarea interventiilor in functie de locatie si prioritate.",
                "Recomandari pentru extinderea duratei de viata, reducerea downtime-ului si planificarea bugetelor de service.",
              ].map((item) => (
                <article className="rounded-xl border border-blue-100 bg-white p-5 text-sm font-semibold leading-7 text-slate-700" key={item}>
                  {item}
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Intrebari frecvente"
              title="Clarificari despre contracte si suport"
              description="Raspunsuri practice pentru administratori, directori medicali si responsabili tehnici."
            />
            <div className="mt-8 grid gap-3 lg:grid-cols-3">
              {page.faqs.map((faq) => (
                <article className="rounded-xl border border-blue-100 bg-white p-5" key={faq.question}>
                  <h2 className="text-base font-semibold leading-7 text-slate-950">
                    {faq.question}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="border-t border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                  Legaturi comerciale
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Conecteaza mentenanta cu service, echipamente, proiecte si contact.
                </h2>
                <div className="mt-5 grid gap-2 text-sm text-slate-700">
                  <Link href={companyContact.phoneHref}>{companyContact.phone}</Link>
                  <Link href={companyContact.emailHref}>{companyContact.email}</Link>
                  <Link href={companyContact.whatsappHref} rel="noreferrer" target="_blank">
                    WhatsApp ZESCORP
                  </Link>
                </div>
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
