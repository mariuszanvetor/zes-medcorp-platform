import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type EnterpriseTrustBandProps = {
  sourcePage: string;
  title?: string;
  description?: string;
};

const trustItems = [
  {
    title: "Validare tehnică înainte de decizii finale",
    body: "Recomandările sunt corelate cu planuri, echipamente, amplasament, autorizări și condiții reale de implementare.",
  },
  {
    title: "Estimări orientative, nu promisiuni comerciale",
    body: "Calculatoarele, propunerile PDF și instrumentele de triere pregătesc discuția, dar nu înlocuiesc o ofertă finală.",
  },
  {
    title: "Separare corectă între domenii tehnice",
    body: "RMN/RF shielding, CT/RX/radioprotecție, IVD, aparatură și service sunt tratate ca fluxuri distincte.",
  },
];

export function EnterpriseTrustBand({
  sourcePage,
  title = "Încredere construită prin claritate tehnică.",
  description = "ZES tratează proiectele medicale ca sisteme: infrastructură, aparatură, documentație, riscuri, service și continuitate operațională.",
}: EnterpriseTrustBandProps) {
  return (
    <Section className="border-y border-blue-100 bg-white" spacing="lg" tone="transparent">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              Cadru de lucru
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
              {title}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <TrackedButtonLink
                href="/project-intake"
                tracking={{
                  ctaLabel: "Pregătiți analiza",
                  destination: "/project-intake",
                  sourcePage,
                }}
              >
                Pregătiți analiza
              </TrackedButtonLink>
              <TrackedButtonLink
                href="/contact"
                tracking={{
                  ctaLabel: "Discutați cu echipa",
                  destination: "/contact",
                  sourcePage,
                }}
                variant="secondary"
              >
                Discutați cu echipa
              </TrackedButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trustItems.map((item) => (
              <div
                className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5"
                key={item.title}
              >
                <h3 className="text-base font-semibold leading-6 text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
