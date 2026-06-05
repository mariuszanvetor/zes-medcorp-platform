import Image from "next/image";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { corporateVisuals } from "@/lib/visual-assets";

type PortfolioItem = {
  title: string;
  category: string;
  context: string;
  challenge: string;
  delivered: string;
  summary: string;
  imageSrc: string;
  imagePosition?: string;
};

const projects: PortfolioItem[] = [
  {
    title: "Radioprotectie camera RX",
    category: "Radioprotectie / camere RX",
    context: "Clinic privat, modernizare spatiu existent",
    challenge: "Spatiu limitat, vecinatati sensibile, termen de implementare strans.",
    delivered: "Evaluare preliminara, configurare protectie radiologica si plan de executie etapizat.",
    summary: "Proiect orientat pe continuitate operationala si claritate pentru etapa de ofertare.",
    imageSrc: corporateVisuals.radiationProtection.src,
    imagePosition: "object-[60%_40%]",
  },
  {
    title: "Infrastructura CT cu integrare tehnica",
    category: "CT / imagistica medicala",
    context: "Centru imagistica, proiect regional",
    challenge: "Corelare intre spatiu, utilitati, flux pacienti si cerinte tehnice ale echipamentului.",
    delivered: "Structurare context tehnic, suport pentru documentatie si plan de implementare infrastructura.",
    summary: "Focus pe reducerea riscurilor de reconfigurare dupa instalare.",
    imageSrc: corporateVisuals.ctRoom.src,
    imagePosition: "object-[45%_45%]",
  },
  {
    title: "Service si stabilizare operationala",
    category: "Service aparatura medicala",
    context: "Centru medical multidisciplinar",
    challenge: "Downtime critic si lipsa unui flux clar de triere service.",
    delivered: "Triage preliminar, priorizare interventie, plan de suport tehnic si recomandari de mentenanta.",
    summary: "Abordare orientata pe revenire rapida in exploatare si stabilitate ulterioara.",
    imageSrc: corporateVisuals.service.src,
    imagePosition: "object-[50%_35%]",
  },
  {
    title: "Modernizare infrastructura imagistica",
    category: "Modernizare clinica",
    context: "Clinic privat, extindere capacitate",
    challenge: "Integrarea noilor functionalitati fara blocarea completa a activitatii.",
    delivered: "Planificare pe faze, clarificari tehnice si suport in configurarea spatiilor critice.",
    summary: "Flux construit pentru decizii realiste de buget, calendar si operational.",
    imageSrc: corporateVisuals.projects.src,
    imagePosition: "object-[55%_50%]",
  },
];

export function PortfolioShowcaseSection() {
  return (
    <Section className="border-y border-blue-100 bg-[#f9fbff]" spacing="xl" tone="transparent">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Proiecte si infrastructura"
          title="Exemple de proiecte tehnice si suport operational."
          description="Portofoliu prezentat in format anonim, cu focus pe provocari reale, livrabile tehnice si context de implementare."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)]" key={project.title}>
              <div className="relative h-44 overflow-hidden">
                <Image
                  alt={project.title}
                  className={`object-cover ${project.imagePosition ?? ""}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={project.imageSrc}
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,20,35,0.54)_0%,rgba(7,20,35,0.15)_70%)]" />
                <div className="absolute left-4 top-4 rounded-lg border border-white/35 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.09em] text-slate-700">
                  {project.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Context:</span> {project.context}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  <span className="font-semibold text-slate-900">Provocare:</span> {project.challenge}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  <span className="font-semibold text-slate-900">Livrare:</span> {project.delivered}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{project.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
