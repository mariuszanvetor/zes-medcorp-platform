import Link from "next/link";

import { ProgrammaticCalculator } from "@/components/ai/ProgrammaticCalculator";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { HowToSchema } from "@/components/seo/HowToSchema";
import { ReadingProgress } from "@/components/seo/ReadingProgress";
import { RelatedContentBlocks } from "@/components/sections/RelatedContentBlocks";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { getCalculatorDiscoverySections } from "@/lib/calculator-engine";
import { BUDGET_DISCLAIMER } from "@/lib/ai-estimation";
import type { ProgrammaticCalculatorDefinition } from "@/data/calculators";

export type CalculatorLandingPageProps = {
  calculator: ProgrammaticCalculatorDefinition;
  categoryLabel?: string;
  intro?: string;
};

export function CalculatorLandingPage({
  calculator,
  categoryLabel = "Calculatoare",
  intro,
}: CalculatorLandingPageProps) {
  const discoverySections = getCalculatorDiscoverySections(calculator);
  const { buildResult: _buildResult, ...calculatorForClient } = calculator;
  const howToSteps = [
    {
      name: "Alege scenariul",
      text: "Selecteaza varianta cea mai apropiata de proiectul tau, fara sa cauti o precizie artificiala.",
    },
    {
      name: "Citeste estimarea orientativa",
      text: "Verifica nivelul de complexitate, intervalele de buget si ipotezele pe care se sprijina estimarea.",
    },
    {
      name: "Continua cu validarea tehnica",
      text: "Daca proiectul este aproape de decizie, treci in Project Intake sau Proposal Builder pentru analiza aplicata.",
    },
  ];

  return (
    <>
      <ReadingProgress />
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Calculatoare", href: "/calculatoare" },
          { name: calculator.title, href: `/calculatoare/${calculator.slug}` },
        ]}
        id={`breadcrumb-schema-calculatoare-${calculator.slug}`}
      />
      <FAQSchema items={calculator.faq} id={`faq-schema-calculatoare-${calculator.slug}`} />
      <HowToSchema
        description={calculator.purpose}
        name={calculator.title}
        steps={howToSteps}
        url={`/calculatoare/${calculator.slug}`}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-end lg:gap-16">
            <div className="max-w-4xl">
              <Badge variant="blue">{categoryLabel}</Badge>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                {calculator.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                {calculator.description}
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                {intro ?? calculator.purpose}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {calculator.keywords.slice(0, 4).map((keyword) => (
                  <span
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    key={keyword}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={calculator.primaryCta.href} size="lg">
                  {calculator.primaryCta.label}
                </Button>
                <Button href={calculator.secondaryCta.href} size="lg" variant="secondary">
                  {calculator.secondaryCta.label}
                </Button>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Estimare orientativa
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Acest instrument ajuta la orientare, nu la validare finala.
                Rezultatul trebuie corelat cu planurile, specificatiile de
                echipament si conditiile reale de amplasament.
              </p>
              <p className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-7 text-blue-900">
                {BUDGET_DISCLAIMER}
              </p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-[#f7fbff] p-4 text-sm font-bold text-[#0057b8]">
                  Metodologie: scor determinist pe optiuni tehnice si semnale de risc.
                </div>
                <div className="rounded-2xl bg-[#f7fbff] p-4 text-sm font-bold text-[#0057b8]">
                  Ipoteze: scenariul este preliminar si poate fi schimbat de amplasament.
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Ce urmeaza
                </p>
                <ol className="mt-6 space-y-4">
                  <li className="flex gap-3">
                    <span className="mt-1 text-sm font-bold text-[#0057b8]">01</span>
                    <span className="text-sm leading-6 text-slate-600">
                      Completezi calculatorul si vezi complexitatea orientativa.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 text-sm font-bold text-[#0057b8]">02</span>
                    <span className="text-sm leading-6 text-slate-600">
                      Verifici riscurile, bugetul si factorii de infrastructura.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 text-sm font-bold text-[#0057b8]">03</span>
                    <span className="text-sm leading-6 text-slate-600">
                      Continui in Project Intake sau Proposal Builder.
                    </span>
                  </li>
                </ol>
              </Card>

              <Card className="mt-5 border-blue-100 bg-white" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Validare tehnica
                </p>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Pentru RMN, CT, radiologie sau infrastructura specializata,
                  concluzia finala depinde de planuri, echipament si conditii
                  reale de amplasament.
                </p>
                <div className="mt-5 grid gap-3">
                  <Link
                    className="rounded-full bg-[#0057b8] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#00498f]"
                    href="/project-intake"
                  >
                    Incepeti Project Intake
                  </Link>
                  <Link
                    className="rounded-full border border-blue-100 bg-[#f7fbff] px-4 py-3 text-center text-sm font-bold text-[#0057b8] transition hover:border-blue-200 hover:bg-white"
                    href="/proposal-builder"
                  >
                    Structurati propunerea
                  </Link>
                </div>
              </Card>
            </aside>

            <article className="mx-auto w-full max-w-3xl">
              <p className="text-xl font-semibold leading-9 text-slate-950 sm:text-2xl sm:leading-10">
                {calculator.purpose}
              </p>

              <div className="mt-14 space-y-14">
                <section>
                  <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                    Metodologie
                  </h2>
                  <div className="mt-5 space-y-5">
                    <p className="text-lg leading-9 text-slate-600">
                      Calculatorul foloseste alegeri determinate pentru a
                      estima complexitatea, bugetul orientativ, calendarul si
                      riscurile principale.
                    </p>
                    <p className="text-lg leading-9 text-slate-600">
                      Rezultatul este util pentru orientare comerciala si
                      planning, dar nu inlocuieste o verificare pe amplasament
                      sau o oferta tehnica finala.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                    Ipoteze si limite
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Valoarea este orientativa si depinde de spatiu, echipament si documente.",
                      "Diferentele dintre RMN, CT, radioprotectie si service sunt tratate separat.",
                      "Bugetul si calendarul trebuie validate inainte de decizie finala.",
                    ].map((item) => (
                      <li className="flex gap-4 text-base leading-8 text-slate-600" key={item}>
                        <span
                          aria-hidden="true"
                          className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="mt-14" id="calculator">
              <ProgrammaticCalculator
                calculator={calculatorForClient as ProgrammaticCalculatorDefinition}
              />
                <ProgrammaticCalculator
                  calculator={calculatorForClient as ProgrammaticCalculatorDefinition}
                />
              </div>

              <div className="mt-16">
                <RelatedContentBlocks sections={discoverySections} />
              </div>

              <section className="mt-16" id="intrebari-frecvente">
                <h2 className="text-3xl font-semibold leading-tight text-slate-950">
                  Intrebari frecvente
                </h2>
                <div className="mt-8 space-y-4">
                  {calculator.faq.map((item) => (
                    <Card
                      as="article"
                      className="border-blue-100 bg-white"
                      key={item.question}
                      padding="lg"
                    >
                      <h3 className="text-xl font-semibold leading-tight text-slate-950">
                        {item.question}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        {item.answer}
                      </p>
                    </Card>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description="Treci de la estimarea orientativa la o analiza tehnica aplicata, fara promisiuni false si fara preturi garantate."
            eyebrow="Urmatorul pas"
            primaryAction={{
              label: calculator.primaryCta.label,
              href: calculator.primaryCta.href,
            }}
            secondaryAction={{
              label: calculator.secondaryCta.label,
              href: calculator.secondaryCta.href,
            }}
            title="Transforma estimarea intr-un traseu tehnic aplicat."
            tone="light"
          />
        </Container>
      </Section>
    </>
  );
}
