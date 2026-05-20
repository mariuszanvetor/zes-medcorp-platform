import type { Metadata } from "next";

import { MedicalProjectCalculator } from "@/components/ai/MedicalProjectCalculator";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Calculator proiect medical | ZES MEDCORP",
  description:
    "Calculator pentru orientarea complexității unui proiect medical în funcție de infrastructură, imagistică, IVD, aparatură, ecranare și urgență.",
  path: "/calculator-proiect-medical",
  keywords: [
    "calculator proiect medical",
    "estimare complexitate proiect medical",
    "radiologie",
    "ecranare RF",
    "protecție radiologică",
    "aparatură medicală",
    "imagistică medicală",
    "IVD",
  ],
});

export default function MedicalProjectCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          {
            name: "Calculator proiect medical",
            href: "/calculator-proiect-medical",
          },
        ]}
      />
      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
            <div className="max-w-3xl">
              <Eyebrow>Medical Project Calculator</Eyebrow>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                Calculator proiect medical
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                Estimează complexitatea unui proiect medical în funcție de
                suprafață, radiologie, imagistică, IVD, ecranare, aparatură și
                urgență.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-[0_24px_80px_rgba(0,87,184,0.10)]">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Fără prețuri exacte
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Rezultatul indică benzi de complexitate, servicii ZES, riscuri,
                ipoteze și bugete orientative. Nu este ofertă finală și trebuie
                validat tehnic.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        className="bg-slate-950"
        tone="graphite"
      >
        <Container>
          <MedicalProjectCalculator />
        </Container>
      </Section>
    </>
  );
}
