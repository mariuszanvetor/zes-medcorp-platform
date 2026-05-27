import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const demoPaths = [
  {
    title: "Testeaza fluxul de planificare",
    body: "Porneste cu AI Discovery pentru a clarifica domeniul proiectului, riscurile, informatiile lipsa si urmatorul pas. Fluxul este determinist si preliminar.",
    href: "/ai-discovery",
    cta: "Deschide AI Discovery",
  },
  {
    title: "Genereaza context pentru ofertare",
    body: "Foloseste Proposal Builder pentru o propunere preliminara structurata: etape, ipoteze, riscuri, validari si export PDF.",
    href: "/proposal-builder",
    cta: "Creeaza propunere preliminara",
  },
  {
    title: "Trimite cerere pentru proiect medical",
    body: "Completeaza Project Intake pentru o discutie tehnica mai clara: spatiu, documentatie, aparatura, urgenta si date de pregatit.",
    href: "/project-intake",
    cta: "Completeaza Project Intake",
  },
];

export function PublicDemoEntrySection() {
  return (
    <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <div>
            <Badge variant="blue">Live demo readiness</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
              Planificare medicala asistata, fara promisiuni automate.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              ZES foloseste fluxuri ghidate pentru a transforma o idee de clinica,
              imagistica, laborator sau service intr-un context mai bun pentru
              analiza tehnica. Instrumentele sunt preliminare, deterministe si nu
              inlocuiesc validarea de specialitate.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <TrackedButtonLink
                href="/ai-discovery"
                tracking={{
                  ctaLabel: "Testeaza AI Discovery",
                  destination: "/ai-discovery",
                  sourcePage: "/",
                  sourceTool: "public-demo-entry",
                }}
              >
                Testeaza AI Discovery
              </TrackedButtonLink>
              <TrackedButtonLink
                href="/project-intake"
                tracking={{
                  ctaLabel: "Trimite context proiect",
                  destination: "/project-intake",
                  sourcePage: "/",
                  sourceTool: "public-demo-entry",
                }}
                variant="secondary"
              >
                Trimite context proiect
              </TrackedButtonLink>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {demoPaths.map((path) => (
              <TrackedLink
                className="group block h-full"
                href={path.href}
                key={path.href}
                tracking={{
                  ctaLabel: path.cta,
                  destination: path.href,
                  sourcePage: "/",
                  sourceTool: "public-demo-entry-card",
                }}
              >
                <Card
                  className="flex h-full flex-col border-blue-100 bg-white"
                  interactive
                  padding="lg"
                >
                  <h3 className="text-xl font-semibold leading-7 text-slate-950">
                    {path.title}
                  </h3>
                  <p className="mt-4 grow text-sm leading-7 text-slate-600">
                    {path.body}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-bold text-[#0057b8] transition group-hover:translate-x-1">
                    {path.cta} -&gt;
                  </span>
                </Card>
              </TrackedLink>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
