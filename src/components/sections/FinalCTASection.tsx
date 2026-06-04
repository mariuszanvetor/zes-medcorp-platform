import Link from "next/link";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";

export function FinalCTASection() {
  return (
    <Section className="bg-white" spacing="xl" tone="transparent">
      <Container>
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[linear-gradient(135deg,#f8fbff,#edf5ff)] px-8 py-14 text-center shadow-[0_30px_100px_rgba(0,87,184,0.12)] sm:px-14">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
            Contact
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight text-balance text-slate-950 sm:text-5xl">
            Ai un proiect, o achizitie sau o problema de service?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Trimite contextul catre ZESCORP si echipa tehnica revine cu directia potrivita.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <TrackedButtonLink
              className="rounded-full px-7"
              href="/contact"
              size="lg"
              tracking={{
                ctaLabel: "Contact final homepage",
                destination: "/contact",
                sourcePage: "/",
              }}
              variant="primary"
            >
              Solicita evaluare
            </TrackedButtonLink>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-full border border-blue-200 bg-white px-7 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50"
              data-cta="email"
              data-page-intent="homepage"
              href={companyContact.emailHref}
            >
              {companyContact.email}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
