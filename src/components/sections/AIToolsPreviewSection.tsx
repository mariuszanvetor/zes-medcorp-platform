import { TrackedLink } from "@/components/analytics/TrackedLink";
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
    title: "Analiză preliminară proiect",
    description:
      "Clarifică tipul de proiect, riscurile inițiale și serviciile ZES care merită discutate.",
    href: "/ai-project-advisor",
  },
  {
    title: "Estimare orientativă proiect",
    description:
      "Oferă o orientare de complexitate, buget și date lipsă, fără să promită prețuri finale.",
    href: "/calculator-proiect-medical",
  },
  {
    title: "Planificare cameră radiologie",
    description:
      "Separă cerințele RMN/RF de protecția radiologică necesară pentru CT și RX.",
    href: "/radiology-room-planner",
  },
  {
    title: "Evaluare service aparatură",
    description:
      "Ajută la trierea unei probleme de aparatură și la pregătirea datelor pentru service.",
    href: "/service-diagnostic",
  },
  {
    title: "Project Intake ZES",
    description:
      "Colectează structurat datele pentru o discuție tehnică mai clară: spațiu, documentație, aparatură, urgență și informații lipsă.",
    href: "/project-intake",
  },
  {
    title: "Propunere preliminară",
    description:
      "Structurează o propunere preliminară pentru discuția tehnică: faze, buget, riscuri și întrebări deschise.",
    href: "/proposal-builder",
  },
];

export function AIToolsPreviewSection() {
  return (
    <Section className="bg-white" id="ai-tools" spacing="xl" tone="transparent">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-[#003f7c] text-white shadow-[0_36px_110px_rgba(0,63,124,0.24)]">
          <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-[0.88fr_1.12fr] lg:p-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">
                Planificare tehnică
              </p>
              <h2 className="mt-6 text-4xl font-semibold leading-tight text-balance sm:text-5xl">
                Planificare tehnică mai clară, înainte de investiție.
              </h2>
              <p className="mt-6 text-lg leading-8 text-blue-50/86">
                Instrumentele ZES ajută la ordonarea primelor decizii: ce trebuie
                verificat, ce poate schimba bugetul și ce informații lipsesc
                înainte de o ofertă reală.
              </p>
            </div>
            <div className="grid gap-4">
              {tools.map((tool) => (
                <TrackedLink
                  className="group rounded-2xl border border-white/14 bg-white/[0.08] p-6 transition hover:bg-white/[0.13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href={tool.href}
                  key={tool.title}
                  tracking={{
                    ctaLabel: tool.title,
                    destination: tool.href,
                    sourcePage: "/",
                    sourceTool: "homepage-ai-tools-preview",
                  }}
                >
                  <h3 className="text-xl font-semibold text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50/78">
                    {tool.description}
                  </p>
                  <span className="mt-5 inline-flex text-sm font-bold text-white transition group-hover:translate-x-1">
                    Deschide instrumentul →
                  </span>
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
