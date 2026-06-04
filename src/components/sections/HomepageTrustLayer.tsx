import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";

const trustColumns = [
  {
    title: "Claritate tehnica",
    text: "Pornim de la spatiu, echipament, flux operational si constrangeri reale, nu de la promisiuni generale.",
  },
  {
    title: "Executie si suport",
    text: "Acoperim planificare, integrare, instalare, service, mentenanta si interventii pentru continuitate operationala.",
  },
  {
    title: "Contact direct",
    text: "Vizitatorul poate cere evaluare prin formular, telefon, email, WhatsApp sau prin ZES, fara sa inteleaga tool-urile interne.",
  },
];

export function HomepageTrustLayer() {
  return (
    <Section className="border-y border-blue-100 bg-white" spacing="xl" tone="transparent">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="De ce ZESCORP"
          title="Mai putina complexitate, mai multa claritate pentru decizie."
          description="Website-ul porneste de la ce se vinde, pentru cine este potrivit si cum se cere evaluarea. Tool-urile avansate raman disponibile in Resources."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {trustColumns.map((column) => (
            <article className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-6" key={column.title}>
              <h3 className="text-xl font-semibold text-slate-950">{column.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{column.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_18px_48px_rgba(15,65,118,0.08)]">
          <h3 className="text-xl font-semibold text-slate-950">Cum ne contactezi</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            Trimite proiectul sau problema tehnica prin formular, telefon, email sau WhatsApp.
            Pentru proiecte reale, datele sunt validate de echipa tehnica inainte de ofertare.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0057b8] px-5 text-sm font-semibold text-white transition hover:bg-blue-800"
              data-cta="contact-form"
              data-page-intent="homepage"
              href="/contact"
            >
              Solicita evaluare
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50"
              data-cta="phone"
              data-page-intent="homepage"
              href={companyContact.phoneHref}
            >
              {companyContact.phone}
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0f9d58] px-5 text-sm font-semibold text-white transition hover:bg-[#0d8b4d]"
              data-cta="whatsapp"
              data-page-intent="homepage"
              href={companyContact.whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
