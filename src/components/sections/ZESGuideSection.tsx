import { ZESGuide } from "@/components/ai/ZESGuide";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ZESGuideSection() {
  return (
    <Section
      className="border-b border-blue-200 bg-[linear-gradient(180deg,#ffffff_0%,#f2f8ff_55%,#ffffff_100%)]"
      spacing="lg"
      tone="transparent"
    >
      <Container>
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            ZES Guided Planning
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Discutie asistata de ZES pentru proiecte, service si ofertare.
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
            ZES ramane un asistent preliminar: clarifica ce exista deja, ce
            lipseste si ce trebuie trimis mai departe catre specialistii ZESCORP.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
            Exemple rapide: "Am un aparat defect", "Vreau clinica CT", "Am nevoie
            de camera RMN", "Pregatesc proiect pe fonduri europene".
          </p>
          <div className="mt-8">
            <ZESGuide compactHeader />
          </div>
        </div>
      </Container>
    </Section>
  );
}
