import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const areas = ["CT", "RMN", "RX", "Ecografie", "IVD", "Laborator"];

export function EquipmentServiceSection() {
  return (
    <Section className="bg-[#f7fafc]" spacing="xl" tone="transparent">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              Equipment, imaging, IVD
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-tight text-balance text-slate-950 sm:text-5xl">
              Tehnologia medicală este un pilon principal, nu o anexă.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              ZES susține proiectele cu vânzare aparatură, consultanță de
              selecție, integrare, imagistică, IVD, laborator, service și
              mentenanță. Spațiul și echipamentul sunt gândite împreună.
            </p>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_26px_90px_rgba(15,23,42,0.07)] sm:p-8">
            <div className="grid grid-cols-2 gap-3">
              {areas.map((area) => (
                <div
                  className="rounded-2xl bg-slate-50 px-5 py-6 text-center text-lg font-semibold text-slate-950"
                  key={area}
                >
                  {area}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-[#0057b8] px-6 py-5 text-sm font-semibold leading-7 text-white">
              Integrare echipamente, service și mentenanță încă din concept
              până la operare.
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
