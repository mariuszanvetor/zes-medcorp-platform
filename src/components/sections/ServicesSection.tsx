import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const services = [
  {
    title: "Constructii & amenajari medicale",
    description:
      "Spatii medicale proiectate pentru fluxuri, autorizari, echipamente si operare pe termen lung.",
    href: "/services/constructii-medicale",
  },
  {
    title: "Radiologie & camere imagistica",
    description:
      "Camere CT, RMN si RX coordonate cu furnizorii, instalatiile, layout-ul si service-ul.",
    href: "/services/radiologie",
  },
  {
    title: "RF shielding pentru RMN",
    description:
      "Cusca Faraday, usi RF, waveguides, filtre si integritate electromagnetica pentru MRI.",
    href: "/services/rf-shielding",
  },
  {
    title: "Protectie radiologica / plumb",
    description:
      "Ecranare cu plumb pentru CT/RX: pereti, usi, sticla plumbata, zone controlate si CNCAN.",
    href: "/services/protectie-radiologica",
  },
  {
    title: "Aparatura medicala",
    description:
      "Selectie, vanzare, integrare si punere in functiune pentru echipamente medicale.",
    href: "/services/aparatura-medicala",
  },
  {
    title: "Imagistica medicala",
    description:
      "CT, RMN, RX, ecografie si infrastructura necesara pentru performanta si uptime.",
    href: "/services/imagistica-medicala",
  },
  {
    title: "IVD / laborator",
    description:
      "Echipamente de laborator, consumabile, fluxuri tehnice, integrare si mentenanta.",
    href: "/services/ivd-laborator",
  },
  {
    title: "Service & mentenanta",
    description:
      "Service specializat, mentenanta preventiva si suport pentru continuitate operationala.",
    href: "/services/service-aparatura-medicala",
  },
];

export function ServicesSection() {
  return (
    <Section className="bg-[#f7fafc]" spacing="xl" tone="transparent">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="Servicii ZES"
          title="Pilonii tehnici ai unui proiect medical bine coordonat."
          description="Servicii separate, dar planificate impreuna: infrastructura, aparatura, imagistica, laborator, service, RF shielding pentru RMN si protectie radiologica pentru CT/RX."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              className="group flex min-h-[280px] flex-col rounded-[1.4rem] border border-slate-200/80 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.055)] transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_32px_90px_rgba(0,87,184,0.12)] sm:p-8"
              key={service.title}
            >
              <div className="h-1 w-12 rounded-full bg-[#0057b8]" />
              <h3 className="mt-8 text-2xl font-semibold leading-tight text-slate-950">
                {service.title}
              </h3>
              <p className="mt-5 flex-1 text-base leading-7 text-slate-600">
                {service.description}
              </p>
              <Link
                className="mt-8 inline-flex text-sm font-bold text-[#0057b8] transition group-hover:translate-x-1 group-hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href={service.href}
              >
                Detalii →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
