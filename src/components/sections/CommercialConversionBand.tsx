import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";

type CommercialConversionBandProps = {
  pageIntent: string;
  prompt: string;
  sourcePage: string;
  title: string;
  description: string;
  primaryLabel?: string;
};

export function CommercialConversionBand({
  pageIntent,
  prompt,
  sourcePage,
  title,
  description,
  primaryLabel = "Discută cu ZES",
}: CommercialConversionBandProps) {
  return (
    <Section className="border-t border-blue-100 bg-slate-950" spacing="lg" tone="transparent">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
              Contact tehnic
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
              Pentru proiecte reale, datele sunt validate de echipa tehnică ZESCORP înainte de ofertare.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <OpenZESButton
              ctaLabel={primaryLabel}
              dataCta="zes-open"
              pageIntent={pageIntent}
              prompt={prompt}
              sourcePage={sourcePage}
            >
              {primaryLabel}
            </OpenZESButton>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-5 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/15"
              data-cta="whatsapp"
              data-page-intent={pageIntent}
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
  );
}
