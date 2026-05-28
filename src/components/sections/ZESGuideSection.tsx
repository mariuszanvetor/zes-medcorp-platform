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
          <h1 className="mt-4 text-4xl font-semibold leading-[1.06] text-slate-950 sm:text-6xl">
            Discuta cu ZES despre proiectul tau medical
          </h1>
          <p className="mt-5 max-w-4xl text-xl leading-9 text-slate-600">
            Spune ce ai nevoie. ZES te ghideaza, analizeaza documente sau poze
            si pregateste urmatorul pas pentru ofertare, service sau proiect.
          </p>
          <p className="mt-3 max-w-4xl text-base leading-7 text-slate-600">
            Exemple: "Am un aparat defect", "Vreau clinica CT", "Am nevoie de
            camera RMN", "Pregatesc proiect pe fonduri europene", "Vreau oferta
            echipamente".
          </p>
          <div className="mt-8">
            <ZESGuide compactHeader />
          </div>
        </div>
      </Container>
    </Section>
  );
}
