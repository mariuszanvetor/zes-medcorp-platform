import type { Metadata } from "next";
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
import { maintenanceContractPages, maintenanceHub } from "@/data/maintenance-contracts";
import { companyContact } from "@/lib/brand";
import { createWebsiteMetadata } from "@/lib/seo";
import { corporateVisuals } from "@/lib/visual-assets";

const hubFaqs = [
  {
    question: "Contractul de mentenanta este doar pentru aparatura noua?",
    answer:
      "Nu. Poate fi util si pentru echipamente existente, mai ales daca inventarul este critic pentru programul clinicii sau exista downtime recurent.",
  },
  {
    question: "Se poate cere evaluare fara inventar complet?",
    answer:
      "Da. O lista aproximativa cu numarul de echipamente, categoria si locatiile este suficienta pentru prima discutie.",
  },
  {
    question: "Contractul garanteaza lipsa defectiunilor?",
    answer:
      "Nu. Mentenanta preventiva reduce riscul si imbunatateste controlul operational, dar defectiunile pot aparea in continuare.",
  },
];

export const metadata: Metadata = createWebsiteMetadata({
  title: maintenanceHub.metadataTitle,
  description: maintenanceHub.metadataDescription,
  path: maintenanceHub.path,
  keywords: [
    "contracte mentenanta aparatura medicala",
    "mentenanta preventiva echipamente medicale",
    "service aparatura medicala contract",
    "mentenanta imagistica medicala",
  ],
});

export default function ContracteMentenantaHubPage() {
  return (
    <>
      <BreadcrumbSchema
        id="breadcrumb-schema-maintenance-hub"
        items={[
          { name: "Acasa", href: "/" },
          { name: "Contracte mentenanta", href: maintenanceHub.path },
        ]}
      />
      <FAQSchema items={hubFaqs} id="faq-schema-maintenance-hub" />
      <ServiceSchema
        description={maintenanceHub.metadataDescription}
        name={maintenanceHub.title}
        serviceType="Contracte mentenanta aparatura medicala"
        url={maintenanceHub.path}
      />

      <main data-page-intent="maintenance-contracts-hub">
        <Section className="relative isolate overflow-hidden border-b border-blue-100 bg-slate-950" spacing="xl" tone="transparent">
          <Image
            alt={corporateVisuals.maintenance.alt}
            className={`object-cover opacity-45 ${corporateVisuals.maintenance.position}`}
            fill
            priority
            sizes="100vw"
            src={corporateVisuals.maintenance.src}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,25,0.97)_0%,rgba(2,18,38,0.88)_54%,rgba(2,18,38,0.55)_100%)]" />
          <Container className="relative">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                Service recurent / mentenanta preventiva
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Contracte de mentenanta pentru aparatura medicala.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {maintenanceHub.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <OpenZESButton
                  ctaLabel={maintenanceHub.primaryCta}
                  dataCta="maintenance-hub-zes-open"
                  pageIntent="maintenance-contracts-hub"
                  prompt={maintenanceHub.zesPrompt}
                  size="lg"
                  sourcePage={maintenanceHub.path}
                >
                  {maintenanceHub.primaryCta}
                </OpenZESButton>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-base font-semibold text-white transition hover:border-white/45 hover:bg-white/15"
                  data-cta="maintenance-evaluation"
                  data-page-intent="maintenance-contracts-hub"
                  href="#solicitare-mentenanta"
                >
                  Cere oferta contract
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              align="center"
              className="mx-auto"
              eyebrow="Venit recurent si uptime"
              title="Service-ul trebuie planificat inainte de defectiune."
              description="ZESCORP structureaza mentenanta pe inventar, criticitate, locatie si nivel de raspuns, astfel incat clinica sa stie ce se intampla cand un echipament devine indisponibil."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Reducerea downtime-ului",
                  text: "Prioritizare pentru echipamente critice si revizii planificate inainte ca opririle sa afecteze programarile.",
                },
                {
                  title: "Mentenanta preventiva",
                  text: "Inventar, ritm de verificare, responsabilitati si recomandari pentru ciclul de viata al echipamentelor.",
                },
                {
                  title: "Suport national",
                  text: "Plan de interventie pe locatii, cu clarificarea timpilor de raspuns si a limitelor tehnice ale contractului.",
                },
              ].map((item) => (
                <article className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-6" key={item.title}>
                  <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <SectionHeading
              eyebrow="Pagini dedicate"
              title="Alege categoria de mentenanta."
              description="Fiecare pagina raspunde rapid la trei intrebari: ce acoperim, pentru cine este potrivit si cum se solicita evaluarea."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {maintenanceContractPages.map((page) => (
                <Link
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                  href={`/contracte-mentenanta/${page.slug}`}
                  key={page.slug}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                    {page.category}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold leading-7 text-slate-950 transition group-hover:text-[#0057b8]">
                    {page.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <MaintenanceCalculator sourcePage={maintenanceHub.path} />
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                eyebrow="Cum lucram"
                title="De la inventar la contract."
                description="Un contract bun separa preventia, interventia, escaladarea si responsabilitatile. Astfel service-ul devine gestionabil si bugetabil."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Inventar si categorii de echipamente",
                  "Criticitate si impact operational",
                  "Ritm de revizii preventive",
                  "Nivel de raspuns si escaladare",
                  "Raportare si recomandari post-interventie",
                  "Optiuni pentru extindere si reinnoire contract",
                ].map((item) => (
                  <article className="rounded-xl border border-blue-100 bg-white p-4 text-sm font-semibold leading-7 text-slate-700" key={item}>
                    {item}
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" id="solicitare-mentenanta" spacing="lg" tone="transparent">
          <Container>
            <MaintenanceLeadForm
              inquiryType="Contracte mentenanta aparatura medicala"
              sourcePage={maintenanceHub.path}
            />
          </Container>
        </Section>

        <Section className="border-t border-blue-100 bg-slate-950 text-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
                  Contact direct
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  Ai nevoie de contract, interventie sau evaluare de inventar?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Pentru proiecte reale, datele sunt validate de echipa tehnica ZESCORP inainte de ofertare. Poti incepe cu o lista aproximativa.
                </p>
              </div>
              <div className="grid gap-3">
                <Link className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10" href={companyContact.phoneHref}>
                  {companyContact.phone}
                </Link>
                <Link className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10" href={companyContact.emailHref}>
                  {companyContact.email}
                </Link>
                <Link className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0f9d58] px-5 text-sm font-semibold text-white transition hover:bg-[#0d8b4d]" href={companyContact.whatsappHref} rel="noreferrer" target="_blank">
                  Contact rapid / WhatsApp
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
