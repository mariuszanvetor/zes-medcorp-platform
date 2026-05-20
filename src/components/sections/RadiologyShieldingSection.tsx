import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const distinctions = [
  {
    label: "RMN / MRI",
    title: "RF shielding",
    description:
      "Cușcă Faraday, atenuare RF, uși RF, waveguides, filtre, penetrări, HVAC și vibrații.",
  },
  {
    label: "CT / RX",
    title: "Protecție radiologică",
    description:
      "Ecranare cu plumb, uși plumbate, sticlă plumbată, zone controlate și cerințe CNCAN.",
  },
];

export function RadiologyShieldingSection() {
  return (
    <Section className="bg-white" spacing="xl" tone="transparent">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              Technical clarity
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-tight text-balance text-slate-950 sm:text-5xl">
              Două tipuri de protecție. Două scopuri diferite.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              ZES separă clar infrastructura electromagnetică pentru RMN de
              protecția radiologică pentru CT/RX. Asta reduce riscurile,
              rework-ul și blocajele de autorizare.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {distinctions.map((item) => (
              <article
                className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)]"
                key={item.title}
              >
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  {item.label}
                </p>
                <h3 className="mt-5 text-3xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
