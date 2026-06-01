import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";

const trustColumns = [
  {
    title: "Ce facem",
    points: [
      "Planificare infrastructura medicala pentru imagistica, laborator si modernizare clinica.",
      "Radioprotectie, RF shielding, integrare echipamente si coordonare tehnica in teren.",
      "Suport tehnic si service pentru continuitate operationala.",
    ],
  },
  {
    title: "Cum lucram",
    points: [
      "Pornim cu evaluare preliminara asistata de ZES si discutie cu specialist.",
      "Transformam datele in plan clar: riscuri, dependente, documentatie si etape.",
      "Trecem in implementare controlata, apoi suport tehnic si ajustari.",
    ],
  },
  {
    title: "Suport tehnic si implementare",
    points: [
      "Sprijin pentru proiecte noi, relocari, modernizari si service critic.",
      "Comunicare directa cu echipa tehnica, nu doar prin formulare.",
      "Focus pe claritate, termene realiste si decizii sustenabile.",
    ],
  },
];

const workflowSteps = [
  "Discutie cu ZES",
  "Evaluare preliminara",
  "Analiza tehnica",
  "Clarificari si documentatie",
  "Ofertare si planificare",
  "Implementare / suport",
];

export function HomepageTrustLayer() {
  return (
    <>
      <Section className="border-y border-blue-100 bg-white" spacing="lg" tone="transparent">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Incredere operationala"
            title="Companie reala de infrastructura medicala, cu executie in teren."
            description="ZESCORP combina planificarea tehnica, integrarea infrastructurii si suportul operational intr-un flux coerent, orientat spre implementare."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {trustColumns.map((column) => (
              <article className="rounded-xl border border-slate-200 bg-[#f8fbff] p-5" key={column.title}>
                <h3 className="text-lg font-semibold text-slate-950">{column.title}</h3>
                <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700">
                  {column.points.map((point) => (
                    <li className="flex items-start gap-2" key={point}>
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-6 shadow-[0_16px_36px_rgba(15,65,118,0.08)]">
            <h2 className="text-2xl font-semibold text-slate-950">Flux de lucru</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Un proces clar reduce riscul de blocaj in buget, documentatie si implementare.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {workflowSteps.map((step, index) => (
                <div className="rounded-lg border border-blue-100 bg-white px-4 py-3" key={step}>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#0057b8]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <OpenZESButton
                ctaLabel="Discuta cu ZES workflow"
                prompt="Vreau sa discut un proiect medical si sa inteleg fluxul de implementare"
                sourcePage="/"
              >
                Discuta cu ZES
              </OpenZESButton>
              <TrackedButtonLink
                href="/contact"
                tracking={{
                  ctaLabel: "Discuta cu specialist",
                  destination: "/contact",
                  sourcePage: "/",
                }}
                variant="secondary"
              >
                Discuta cu specialist
              </TrackedButtonLink>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-semibold text-slate-950">Contact direct</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Daca preferi contact direct, echipa ZESCORP este disponibila prin telefon, email sau WhatsApp.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50" data-cta="phone" data-page-intent="homepage" href={companyContact.phoneHref}>
                {companyContact.phone}
              </Link>
              <Link className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50" data-cta="email" data-page-intent="homepage" href={companyContact.emailHref}>
                {companyContact.email}
              </Link>
              <Link className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0f9d58] px-5 text-sm font-semibold text-white transition hover:bg-[#0d8b4d]" data-cta="whatsapp" data-page-intent="homepage" href={companyContact.whatsappHref} rel="noreferrer" target="_blank">
                Scrie pe WhatsApp
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
