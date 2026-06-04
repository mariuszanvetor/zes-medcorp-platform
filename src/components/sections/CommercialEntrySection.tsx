import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { commercialLandingPages } from "@/data/commercial-landing-pages";

export function CommercialEntrySection() {
  return (
    <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
      <Container>
        <SectionHeading
          eyebrow="Solicitări comerciale"
          title="Trasee rapide pentru proiecte de imagistică și radioprotecție."
          description="Pentru nevoi RX, CT, RMN și service radiologie, poți porni direct dintr-un traseu specializat. Pentru echipamente, laborator și mentenanță, consultă hub-ul complet."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {commercialLandingPages.map((page) => (
            <Link
              className="group rounded-xl border border-blue-100 bg-white p-5 shadow-[0_10px_26px_rgba(15,65,118,0.06)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_34px_rgba(15,65,118,0.11)]"
              data-cta="commercial-landing"
              data-page-intent={page.pageIntent}
              href={`/${page.slug}`}
              key={page.slug}
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                {page.eyebrow}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-950 group-hover:text-[#0057b8]">
                {page.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {page.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <OpenZESButton
            ctaLabel="Discuta cu ZES comercial"
            dataCta="zes-open"
            pageIntent="commercial-entry"
            prompt="Vreau să discut un proiect medical și să aleg următorul pas potrivit"
            sourcePage="/"
          >
            Discută direct cu ZES
          </OpenZESButton>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 bg-white px-5 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50"
            href="/solutii-medicale"
          >
            Vezi toate soluțiile
          </Link>
        </div>
      </Container>
    </Section>
  );
}
