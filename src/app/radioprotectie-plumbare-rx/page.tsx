import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { companyContact } from "@/lib/brand";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Radioprotectie si plumbare camere RX | ZES MEDCORP",
  description:
    "Evaluare preliminara, planificare tehnica si suport pentru radioprotectie/plumbare camere RX, cu analiza initiala prin ZES.",
  path: "/radioprotectie-plumbare-rx",
  keywords: [
    "radioprotectie camera RX",
    "plumbare radiologie",
    "ecranare radiologica",
    "proiect radiologie CNCAN",
  ],
});

const useCases = [
  "Radiologie conventionala",
  "Mamografie",
  "Fluoroscopie",
  "CT planning (unde este relevant)",
  "Usi si vitraje radioprotejate",
  "Pereti, vecinatati, acces si fluxuri",
];

const collectedInfo = [
  "Tip echipament",
  "Spatiu existent sau constructie noua",
  "Oras",
  "Termen estimat",
  "Buget orientativ",
  "Status CNCAN",
  "Plan sau schita disponibila",
];

const process = [
  "Discutie initiala cu ZES",
  "Incarcare plan/schita (optional)",
  "Evaluare preliminara",
  "Clarificari tehnice",
  "Ofertare si pasi urmatori",
];

export default function RadioprotectiePlumbareRxPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          {
            name: "Radioprotectie si plumbare camere RX",
            href: "/radioprotectie-plumbare-rx",
          },
        ]}
      />

      <Section
        className="border-b border-blue-100 bg-[linear-gradient(180deg,#f4f8fd_0%,#ffffff_60%)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionHeading
              eyebrow="Radioprotectie ZESCORP"
              title="Radioprotectie si plumbare camere RX"
              description="Evaluare preliminara, planificare tehnica si suport pentru camere de radiologie, cu triere prin ZES si validare de specialitate."
            />
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_24px_60px_rgba(15,65,118,0.12)]">
              <div className="flex flex-col gap-2">
                <OpenZESButton
                  ctaLabel="Analizeaza proiectul cu ZES"
                  prompt="Am nevoie de plumbare/radioprotectie pentru o camera RX"
                  size="lg"
                  sourcePage="/radioprotectie-plumbare-rx"
                >
                  Analizeaza proiectul cu ZES
                </OpenZESButton>
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50"
                  href="/proposal-builder?source=radioprotectie-plumbare-rx"
                >
                  Pregateste oferta preliminara
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {useCases.map((item) => (
              <article className="rounded-xl border border-slate-200 bg-[#f8fbff] p-5" key={item}>
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
              <h2 className="text-2xl font-semibold text-slate-950">Ce colecteaza ZES</h2>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                {collectedInfo.map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Estimarile sunt preliminare si necesita validare de specialist autorizat.
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Proiectele reale depind de echipament, contextul spatiului, vecinatati si documentatie tehnica.
              </p>
            </article>

            <article className="rounded-2xl border border-blue-100 bg-white p-6">
              <h2 className="text-2xl font-semibold text-slate-950">Flux recomandat</h2>
              <div className="mt-4 grid gap-3">
                {process.map((step) => (
                  <div className="rounded-lg border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm text-slate-700" key={step}>
                    {step}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <OpenZESButton
                  ctaLabel="Incarca planul si discuta cu ZES"
                  prompt="Am nevoie de plumbare/radioprotectie pentru o camera RX. Am plan disponibil."
                  sourcePage="/radioprotectie-plumbare-rx"
                >
                  Incarca planul si discuta cu ZES
                </OpenZESButton>
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50"
                  href="/project-intake?source=radioprotectie-plumbare-rx"
                >
                  Trimite cererea de oferta
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative h-52">
                <Image
                  alt="Planificare radioprotectie si plumbare RX"
                  className="object-cover object-[55%_45%]"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  src="/hero-medical-tech.png"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,20,35,0.52)_0%,rgba(7,20,35,0.16)_70%)]" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-slate-950">Suport tehnic pe etape</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Clarificam datele initiale, evaluam configuratia spatiului si pregatim pasii pentru ofertare si implementare.
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-slate-950">Contact direct specialist</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Pentru proiecte cu termen scurt sau documentatie in lucru, poti solicita direct discutie tehnica.
              </p>
              <div className="mt-4 grid gap-2">
                <Link className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50" href={companyContact.phoneHref}>
                  {companyContact.phone}
                </Link>
                <Link className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50" href={companyContact.emailHref}>
                  {companyContact.email}
                </Link>
                <Link className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0f9d58] px-5 text-sm font-semibold text-white transition hover:bg-[#0d8b4d]" href={companyContact.whatsappHref} rel="noreferrer" target="_blank">
                  WhatsApp consultanta
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
