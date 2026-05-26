import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ReadingProgress } from "@/components/seo/ReadingProgress";
import { RelatedContentBlocks } from "@/components/sections/RelatedContentBlocks";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { getComparisonDiscoverySections } from "@/lib/comparison-engine";
import { siteConfig } from "@/lib/seo";
import type { ComparisonPageData } from "@/data/comparisons";

export type ComparisonPageProps = {
  page: ComparisonPageData;
};

export function ComparisonPage({ page }: ComparisonPageProps) {
  const sections = getComparisonDiscoverySections(page);
  const tertiaryHref = page.cta.href === "/project-intake" ? "/contact" : "/project-intake";
  const secondaryLabel = tertiaryHref === "/project-intake" ? "Trimite Project Intake" : "Discutați proiectul";

  return (
    <>
      <ReadingProgress />
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Comparații", href: "/comparatii" },
          { name: page.title, href: `/comparatii/${page.slug}` },
        ]}
        id={`breadcrumb-schema-comparatii-${page.slug}`}
      />
      <FAQSchema items={page.faqs} id={`faq-schema-comparatii-${page.slug}`} />
      <ArticleSchema
        articleSection={[page.category, page.hubGroup]}
        authorName={siteConfig.name}
        dateModified={page.updatedAt}
        datePublished={page.publishedAt}
        description={page.description}
        headline={page.title}
        isAccessibleForFree
        keywords={[
          page.targetKeyword,
          page.category,
          ...page.entities.map((entity) => entity.label),
        ]}
        url={`/comparatii/${page.slug}`}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
            <div className="max-w-4xl">
              <Badge variant="blue">{page.category}</Badge>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                {page.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                {page.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {page.targetKeyword}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  Comparatie tehnica
                </span>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={page.cta.href} size="lg">
                  {page.cta.label}
                </Button>
                <Button href="/project-intake" size="lg" variant="secondary">
                  Trimite Project Intake
                </Button>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Verdict de lucru
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {page.summaryVerdict}
              </p>
              <div className="mt-6 grid gap-3">
                {page.entities.map((entity) => (
                  <div
                    className="rounded-2xl bg-[#f8fbff] p-4"
                    key={entity.key}
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                      {entity.label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {entity.summary}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {page.entities.map((entity) => (
              <Card
                as="article"
                className="border-blue-100 bg-white"
                key={entity.key}
                padding="lg"
              >
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  {entity.label}
                </p>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {entity.summary}
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      Cand il alegi
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {entity.chooseWhen.map((item) => (
                        <li className="flex gap-3" key={item}>
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      Tradeoff-uri
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {entity.tradeoffs.map((item) => (
                        <li className="flex gap-3" key={item}>
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <ComparisonTable page={page} />
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <TextBlock
              title="Factorii care schimba decizia"
              items={page.decisionFactors}
              description="Comparațiile bune se opresc la ce contează real in proiect: echipament, infrastructura, risc si autorizare."
            />
            <TextBlock
              title="Impact asupra costului"
              items={page.costImplications}
              description="Costul relevant este costul total al proiectului, nu doar pretul echipamentului sau al unui singur element tehnic."
            />
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <TextBlock
              title="Impact asupra infrastructurii"
              items={page.infrastructureImplications}
              description="Daca schimbi echipamentul sau modul de operare, s-ar putea sa schimbi si camara, HVAC-ul, accesul sau service-ul."
            />
            <TextBlock
              title="Note de validare"
              items={page.regulatoryNotes}
              description="Comparatiile tehnice trebuie sa respecte distinctiile intre RMN, CT, radioprotectie si RF shielding."
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fbff]" spacing="lg" tone="transparent">
        <Container>
          <Card className="border-amber-100 bg-white" padding="lg">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
              Greșeli de evitat
            </p>
            <ul className="mt-5 space-y-3">
              {page.mistakesToAvoid.map((item) => (
                <li className="flex gap-3 text-base leading-8 text-slate-600" key={item}>
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-slate-500">
              Estimare orientativă, nu ofertă tehnică sau comercială finală.
            </p>
          </Card>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <RelatedContentBlocks sections={sections} />
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Întrebări frecvente
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                Răspunsuri scurte pentru decizia tehnică.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                FAQ-ul ajută la clarificarea rapidă a diferențelor esențiale fără să
                amestece cerințe tehnice diferite.
              </p>
            </div>
            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <Card
                  as="article"
                  className="border-blue-100 bg-white"
                  key={faq.question}
                  padding="lg"
                >
                  <h3 className="text-xl font-semibold leading-tight text-slate-950">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="md" tone="transparent">
        <Container>
          <CTA
            align="center"
            className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
            description={
              page.cta.description +
              " Alege urmatorul pas in functie de cat de clar este spatiul si echipamentul."
            }
            eyebrow="Următorul pas"
            primaryAction={{
              label: page.cta.label,
              href: page.cta.href,
            }}
            secondaryAction={{
              label: secondaryLabel,
              href: tertiaryHref,
            }}
            title={page.cta.title}
            tone="light"
          />
        </Container>
      </Section>
    </>
  );
}

function ComparisonTable({ page }: { page: ComparisonPageData }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
      <div className="max-w-xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Tabel comparativ
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
          Ce schimba alegerea, dincolo de titlu.
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Tabelul nu forteaza o concluzie universala. El arata cum se schimba
          proiectul in functie de echipament, spatiu, autorizare si cost.
        </p>
      </div>

      <Card className="overflow-hidden border-blue-100 bg-white" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="bg-[#f7fbff] text-left">
                <th
                  className="border-b border-blue-100 px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]"
                  scope="col"
                >
                  Criteriu
                </th>
                {page.comparisonTable.columns.map((column) => (
                  <th
                    className="border-b border-blue-100 px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]"
                    scope="col"
                    key={column.key}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {page.comparisonTable.rows.map((row) => (
                <tr className="align-top odd:bg-white even:bg-slate-50" key={row.label}>
                  <th
                    className="w-60 border-b border-slate-100 px-5 py-4 text-left text-sm font-semibold leading-6 text-slate-900"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  {page.comparisonTable.columns.map((column) => (
                    <td
                      className="border-b border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600"
                      key={column.key}
                    >
                      {row.values[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function TextBlock({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </p>
      <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 text-base leading-8 text-slate-600" key={item}>
            <span
              aria-hidden="true"
              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
