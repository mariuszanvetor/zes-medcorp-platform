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
    title: "Validare tehnica inainte de decizii finale",
    body: "Recomandarile sunt corelate cu planuri, echipamente, amplasament, autorizari si conditii reale de implementare.",
  },
  {
    title: "Estimari orientative, fara promisiuni artificiale",
    body: "Calculatoarele, propunerile PDF si trierea ZES pregatesc discutia, dar nu inlocuiesc oferta finala.",
  },
  {
    title: "Separare corecta intre fluxuri tehnice",
    body: "RMN/RF shielding, CT/RX/radioprotectie, IVD, aparatura si service sunt tratate diferit, in functie de proiect.",
  },
];

export function EnterpriseTrustBand({
  sourcePage,
  title = "Incredere construita prin claritate tehnica.",
  description = "ZESCORP trateaza proiectele medicale ca sisteme complete: infrastructura, aparatura, documentatie, riscuri, service si continuitate operationala.",
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
                  ctaLabel: "Pregateste analiza",
                  destination: "/project-intake",
                  sourcePage,
                }}
              >
                Pregateste analiza
              </TrackedButtonLink>
              <TrackedButtonLink
                href="/contact"
                tracking={{
                  ctaLabel: "Discuta cu echipa",
                  destination: "/contact",
                  sourcePage,
                }}
                variant="secondary"
              >
                Discuta cu echipa
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
