import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CommercialConversionBand } from "@/components/sections/CommercialConversionBand";
import { companyContact } from "@/lib/brand";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Service aparatura medicala | ZES MEDCORP",
  description:
    "Service aparatura medicala cu triere rapida prin ZES: diagnostic preliminar, mentenanta si suport tehnic pentru clinici si centre medicale.",
  path: "/service-aparatura-medicala",
  keywords: [
    "service aparatura medicala",
    "mentenanta aparatura medicala",
    "service echipamente biomedicale",
    "service imagistica medicala",
  ],
});

const serviceCategories = [
  "Imagistica medicala",
  "Monitoare functii vitale",
  "Echipamente biomedicale",
  "Laborator / IVD",
  "Sterilizare",
  "Alte echipamente medicale",
];

const symptoms = [
  "Nu porneste",
  "Eroare pe display",
  "Alarma repetata",
  "Imagine slab calitativa",
  "Downtime clinic / blocaj operational",
];

const collectedInfo = [
  "Tip echipament",
  "Marca si model",
  "Simptom observat",
  "Oras / locatie",
  "Nivel urgenta",
  "Poza, fisa tehnica sau cod eroare (daca exista)",
];

const processSteps = [
  "Triere tehnica preliminara",
  "Constatare si clarificare context",
  "Oferta de interventie / mentenanta",
  "Interventie si suport tehnic",
  "Raport si recomandari urmatori pasi",
];

export default function ServiceAparaturaMedicalaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Service aparatura medicala", href: "/service-aparatura-medicala" },
        ]}
      />

      <Section
        className="border-b border-blue-100 bg-[linear-gradient(180deg,#f6fafe_0%,#ffffff_62%)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionHeading
              eyebrow="Service ZESCORP"
              title="Service aparatura medicala"
              description="Diagnostic, mentenanta si suport tehnic pentru echipamente medicale, cu triere rapida prin ZES."
            />
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_24px_60px_rgba(15,65,118,0.12)]">
              <p className="text-sm font-semibold text-slate-700">
                Aparat defect? ZES pregateste rapid cererea pentru service.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <OpenZESButton
                  ctaLabel="Solicita service prin ZES"
                  pageIntent="service-medical-equipment"
                  prompt="Am nevoie de service pentru aparatura medicala"
                  size="lg"
                  sourcePage="/service-aparatura-medicala"
                >
                  Solicita service prin ZES
                </OpenZESButton>
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50"
                  href="/contact"
                >
                  Solicita discutie tehnica
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {serviceCategories.map((item) => (
              <article
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-5"
                key={item}
              >
                <p className="text-sm font-semibold text-slate-900">{item}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-blue-100 bg-[#f8fbff]" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-blue-100 bg-white p-6">
              <h2 className="text-2xl font-semibold text-slate-950">Aparat defect?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Daca observi blocaje operationale sau semnale de eroare, ZES poate structura
                solicitarea de service in cateva minute, cu datele esentiale pentru triere.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                {symptoms.map((symptom) => (
                  <li className="flex items-start gap-2" key={symptom}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
              <OpenZESButton
                className="mt-5"
                ctaLabel="Urgent service prompt"
                pageIntent="service-medical-equipment"
                prompt="Am un aparat defect si am nevoie de service urgent"
                sourcePage="/service-aparatura-medicala"
              >
                Solicita contact prioritar
              </OpenZESButton>
            </article>

            <article className="rounded-2xl border border-blue-100 bg-white p-6">
              <h2 className="text-2xl font-semibold text-slate-950">Ce colecteaza ZES</h2>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                {collectedInfo.map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Daca ai deja poze, cod de eroare sau fisa tehnica, le poti atasa direct in conversatia ZES.
              </p>
              <Link
                className="mt-4 inline-flex text-sm font-semibold text-[#0057b8] underline decoration-blue-200 underline-offset-4"
                href="/service-radiologie-romania"
              >
                Vezi fluxul dedicat pentru service radiologie
              </Link>
            </article>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
            <h2 className="text-2xl font-semibold text-slate-950">Flux service ZESCORP</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Flux orientat pe triere rapida, clarificare tehnica si interventie planificata.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-5">
              {processSteps.map((step) => (
                <div className="rounded-lg border border-blue-100 bg-[#f8fbff] p-3 text-sm text-slate-700" key={step}>
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-slate-950">Asteptari de suport</h3>
              <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700">
                <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]" />Evaluare preliminara pe baza simptomelor si contextului operational.</li>
                <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]" />Prioritizare pentru cazuri cu impact direct in activitatea clinicii.</li>
                <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]" />Comunicare clara pentru pasii tehnici urmatori.</li>
              </ul>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50" data-cta="phone" data-page-intent="service-medical-equipment" href={companyContact.phoneHref}>
                  {companyContact.phone}
                </Link>
                <Link className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0f9d58] px-5 text-sm font-semibold text-white transition hover:bg-[#0d8b4d]" data-cta="whatsapp" data-page-intent="service-medical-equipment" href={companyContact.whatsappHref} rel="noreferrer" target="_blank">
                  WhatsApp rapid
                </Link>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative h-52">
                <Image
                  alt="Interventie service aparatura medicala"
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  src="/hero-medical-tech.png"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,20,35,0.52)_0%,rgba(7,20,35,0.16)_70%)]" />
              </div>
              <div className="p-5">
                <p className="text-sm leading-7 text-slate-700">
                  Pentru solicitari urgente, ZES poate pregati imediat cererea de service cu informatiile esentiale.
                </p>
                <OpenZESButton
                  className="mt-4"
                  ctaLabel="Solicita service prin ZES visual"
                  pageIntent="service-medical-equipment"
                  prompt="Am nevoie de service pentru aparatura medicala. Vreau preluare prioritara."
                  sourcePage="/service-aparatura-medicala"
                >
                  Solicita service prin ZES
                </OpenZESButton>
              </div>
            </article>
          </div>
        </Container>
      </Section>
      <CommercialConversionBand
        description="Descrie echipamentul, simptomul și orașul. ZES structurează solicitarea pentru triere și preluare de către echipa tehnică."
        pageIntent="service-medical-equipment"
        primaryLabel="Solicită service prin ZES"
        prompt="Am nevoie de service pentru aparatură medicală"
        sourcePage="/service-aparatura-medicala"
        title="Ai nevoie de suport tehnic pentru un echipament medical?"
      />
    </>
  );
}
