import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const tools = [
  {
    title: "AI Discovery medical",
    description:
      "Workspace ghidat pentru clarificarea domeniului, riscurilor, documentelor utile si pasilor urmatori, fara AI generativ sau promisiuni automate.",
    href: "/ai-discovery",
  },
  {
    title: "Analiza preliminara proiect",
    description:
      "Clarifica tipul de proiect, riscurile initiale si serviciile ZES care merita discutate.",
    href: "/ai-project-advisor",
  },
  {
    title: "Estimare orientativa proiect",
    description:
      "Ofera o orientare de complexitate, buget si date lipsa, fara sa promita preturi finale.",
    href: "/calculator-proiect-medical",
  },
  {
    title: "Planificare camera radiologie",
    description:
      "Separa cerintele RMN/RF de protectia radiologica necesara pentru CT si RX.",
    href: "/radiology-room-planner",
  },
  {
    title: "Evaluare service aparatura",
    description:
      "Ajuta la trierea unei probleme de aparatura si la pregatirea datelor pentru service.",
    href: "/service-diagnostic",
  },
  {
    title: "Project Intake ZES",
    description:
      "Colecteaza structurat datele pentru o discutie tehnica mai clara: spatiu, documentatie, aparatura, urgenta si informatii lipsa.",
    href: "/project-intake",
  },
  {
    title: "Propunere preliminara",
    description:
      "Structureaza o propunere preliminara pentru discutia tehnica: faze, buget, riscuri si intrebari deschise.",
    href: "/proposal-builder",
  },
];

export function AIToolsPreviewSection() {
  return (
    <Section className="bg-white" id="ai-tools" spacing="xl" tone="transparent">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          <div>
            <Badge variant="blue">Instrumente de planificare</Badge>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Decizii mai clare inainte de investitia medicala.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Instrumentele ZES ordoneaza primele decizii: ce trebuie verificat,
              ce poate schimba bugetul si ce informatii lipsesc inainte de o
              oferta reala sau de o discutie tehnica.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((tool) => (
              <TrackedLink
                className="group block h-full"
                href={tool.href}
                key={tool.title}
                tracking={{
                  ctaLabel: tool.title,
                  destination: tool.href,
                  sourcePage: "/",
                  sourceTool: "homepage-ai-tools-preview",
                }}
              >
                <Card className="h-full border-blue-100 bg-[#f7fbff]" interactive padding="lg">
                  <h3 className="text-lg font-semibold leading-7 text-slate-950">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {tool.description}
                  </p>
                  <span className="mt-5 inline-flex text-sm font-bold text-[#0057b8] transition group-hover:translate-x-1">
                    Deschide instrumentul -&gt;
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
