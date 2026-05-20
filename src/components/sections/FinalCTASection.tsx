import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function FinalCTASection() {
  return (
    <Section className="bg-white" spacing="xl" tone="transparent">
      <Container>
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[linear-gradient(135deg,#f8fbff,#edf5ff)] px-8 py-14 text-center shadow-[0_30px_100px_rgba(0,87,184,0.12)] sm:px-14">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
            Primul pas
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight text-balance text-slate-950 sm:text-5xl">
            Începe cu întrebările corecte înainte de buget, spațiu sau achiziții.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Trimite contextul proiectului și discută cu ZES ce trebuie validat
            tehnic înainte de următoarea decizie.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <TrackedButtonLink
              className="rounded-full px-7"
              href="/ai-project-advisor"
              size="lg"
              tracking={{
                ctaLabel: "Planificare preliminara",
                destination: "/ai-project-advisor",
                sourcePage: "/",
              }}
            >
              Planificare preliminară
            </TrackedButtonLink>
            <TrackedButtonLink
              className="rounded-full border-blue-200 px-7 text-[#0057b8]"
              href="/contact"
              size="lg"
              tracking={{
                ctaLabel: "Solicitati evaluare tehnica",
                destination: "/contact",
                sourcePage: "/",
              }}
              variant="secondary"
            >
              Solicitați evaluare tehnică
            </TrackedButtonLink>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {[
              "Infrastructură + aparatură",
              "Radiologie, RF și protecție",
              "Service și continuitate",
            ].map((item) => (
              <div
                className="rounded-2xl border border-blue-100 bg-white/78 p-4 text-sm font-semibold leading-6 text-slate-700"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
