import type { Metadata } from "next";

import { RadiologyRoomPlanner } from "@/components/ai/RadiologyRoomPlanner";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Radiology Room Planner | ZES MEDCORP",
  description:
    "Planner pentru camere CT, RMN și RX: ecranare RF, protecție radiologică, CNCAN, DSP, integrare aparatură și riscuri de execuție.",
  path: "/radiology-room-planner",
  keywords: [
    "Radiology Room Planner",
    "cameră CT",
    "cameră RMN",
    "cameră RX",
    "ecranare RF",
    "CNCAN",
    "protecție radiologică",
  ],
});

export default function RadiologyRoomPlannerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Radiology Room Planner", href: "/radiology-room-planner" },
        ]}
      />
      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
            <div className="max-w-3xl">
              <Eyebrow>Radiology Planning Tool</Eyebrow>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                Radiology Room Planner
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                Planifică infrastructura tehnică pentru camere CT, RMN sau RX:
                ecranare, autorizări, integrare aparatură și riscuri de execuție.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-[0_24px_80px_rgba(0,87,184,0.10)]">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Simulare tehnică, nu proiect final
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Plannerul separă logica RMN de CT/RX și evidențiază riscurile
                de ecranare, autorizare și integrare. Rezultatul este orientativ
                și trebuie verificat pe planurile reale.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        className="bg-slate-950"
        tone="graphite"
      >
        <Container>
          <RadiologyRoomPlanner />
        </Container>
      </Section>
    </>
  );
}
