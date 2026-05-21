import Link from "next/link";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { LegalPage } from "@/data/legal-pages";
import { companyContact } from "@/lib/brand";

export type LegalPageTemplateProps = {
  page: LegalPage;
};

const legalLinks = [
  { label: "Confidențialitate", href: "/privacy-policy" },
  { label: "Termeni", href: "/terms" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "GDPR", href: "/gdpr" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function LegalPageTemplate({ page }: LegalPageTemplateProps) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: page.title, href: `/${page.slug}` },
        ]}
      />

      <Section
        className="border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container size="lg">
          <div className="mx-auto max-w-4xl">
            <Eyebrow tone="graphite">{page.eyebrow}</Eyebrow>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.05] text-balance text-slate-950 sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              {page.description}
            </p>
            <p className="mt-5 text-sm font-semibold text-slate-500">
              Ultima actualizare: {formatDate(page.updatedAt)}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Pagini legale
                </p>
                <nav aria-label="Pagini legale" className="mt-6">
                  <ul className="grid gap-3">
                    {legalLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          className="text-sm font-semibold leading-6 text-slate-600 transition hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Card>

              <Card className="mt-5 border-blue-100 bg-white" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Contact legal
                </p>
                <div className="mt-5 grid gap-2 text-sm leading-6 text-slate-600">
                  <p className="font-semibold text-slate-950">
                    {companyContact.legalName}
                  </p>
                  <a
                    className="font-semibold text-[#0057b8] transition hover:text-blue-950"
                    href={companyContact.emailHref}
                  >
                    {companyContact.email}
                  </a>
                  <a
                    className="font-semibold text-[#0057b8] transition hover:text-blue-950"
                    href={companyContact.phoneHref}
                  >
                    {companyContact.phone}
                  </a>
                  <p>{companyContact.address.full}</p>
                </div>
              </Card>
            </aside>

            <article className="grid gap-6">
              {page.sections.map((section) => (
                <Card
                  as="section"
                  className="border-blue-100 bg-white"
                  key={section.title}
                  padding="lg"
                >
                  <h2 className="text-2xl font-semibold leading-tight text-slate-950">
                    {section.title}
                  </h2>
                  <div className="mt-5 grid gap-4">
                    {section.body.map((paragraph) => (
                      <p
                        className="text-base leading-8 text-slate-600"
                        key={paragraph}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}

              <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Clarificări
                </p>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Pentru întrebări privind aceste pagini, date personale sau
                  utilizarea platformei, contactați ZES înainte de a transmite
                  documente sensibile ori informații care nu sunt necesare
                  pentru trierea tehnică.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href={companyContact.emailHref} variant="primary">
                    Scrieți la ZES
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Formular contact
                  </Button>
                </div>
              </Card>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
