import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { LeadCaptureForm, type LeadFormExtraField } from "@/components/forms/LeadCaptureForm";
import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";
import { corporateVisuals } from "@/lib/visual-assets";

const pagePath = "/servicii/cabinetcare";
const canonicalUrl = "https://zescorp.ro/servicii/cabinetcare";
const metadataTitle =
  "ZES CabinetCare | Abonament tehnic pentru cabinete stomatologice și clinici mici";
const metadataDescription =
  "Audit tehnic, evidență aparatură, suport, mentenanță preventivă și coordonare service pentru cabinete stomatologice și clinici mici din București-Ilfov.";
const whatsappAuditHref = `${companyContact.whatsappHref}?text=${encodeURIComponent(
  "Bună ziua, vreau să programez un audit tehnic ZES CabinetCare pentru cabinetul nostru.",
)}`;
const auditMailHref = `${companyContact.emailHref}?subject=${encodeURIComponent(
  "Audit tehnic ZES CabinetCare",
)}&body=${encodeURIComponent(
  "Bună ziua,\n\nVreau să programez un audit tehnic ZES CabinetCare pentru cabinetul nostru.\n\nNume:\nClinică:\nLocalitate/cartier:\nTelefon:\nNumăr aproximativ echipamente:\n\nMulțumesc.",
)}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://zescorp.ro"),
  title: {
    absolute: metadataTitle,
  },
  description: metadataDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: canonicalUrl,
    type: "website",
    locale: "ro_RO",
    siteName: "ZES MEDCORP",
    images: [
      {
        url: "/og/services.png",
        width: 1200,
        height: 630,
        alt: metadataTitle,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const auditIncludes = [
  "inventar aparatură",
  "verificare vizuală și funcțională de bază",
  "identificare riscuri tehnice",
  "calendar recomandat pentru mentenanță și verificări",
  "recomandări pentru piese, consumabile, UPS, imprimante, rețea, PC-uri și echipamente auxiliare",
  "raport PDF sintetic",
  "ofertă de abonament",
];

const problems = [
  "Aparatura se strică exact când ai pacienți programați.",
  "Furnizorii răspund greu.",
  "Nu există evidență clară pentru echipamente, intervenții și verificări.",
  "Administratorul pierde timp cu probleme tehnice mici, dar urgente.",
];

const packages = [
  {
    name: "Basic",
    price: "390 lei",
    suffix: "/lună",
    description: "Pentru cabinete care vor evidență tehnică și prevenție de bază.",
    items: [
      "evidență aparatură",
      "suport telefonic/WhatsApp",
      "calendar mentenanță/verificări",
      "o verificare preventivă trimestrială",
      "prioritate la programări",
      "ofertare piese/consumabile",
      "manoperă/intervenții extra facturate separat",
    ],
  },
  {
    name: "Standard",
    price: "790 lei",
    suffix: "/lună",
    description: "Pentru cabinete active care vor suport lunar și vizibilitate mai bună.",
    highlighted: true,
    items: [
      "tot din Basic",
      "vizită preventivă lunară sau bilunară, în funcție de cabinet",
      "1-2 ore suport tehnic incluse lunar",
      "verificare UPS, imprimante, PC, rețea, sterilizare, compresor și echipamente auxiliare",
      "raport scurt după vizită",
      "coordonare furnizori/service autorizat unde este cazul",
      "discount la intervenții și piese",
    ],
  },
  {
    name: "Premium",
    price: "1.490 lei",
    suffix: "/lună",
    description: "Pentru clinici cu mai multe cabinete sau aparatură mai complexă.",
    items: [
      "vizită lunară",
      "SLA de răspuns prioritar",
      "evidență tehnică extinsă",
      "suport pentru achiziții",
      "coordonare verificări/furnizori/service",
      "raport lunar",
      "intervenții prioritare",
      "prețuri preferențiale la piese, accesorii, UPS, imprimante, calculatoare și consumabile",
    ],
  },
];

const coverage = [
  "unituri și echipamente auxiliare",
  "compresoare și aspirație, cu suport și coordonare unde este cazul",
  "sterilizare/autoclave, cu verificări oficiale realizate prin parteneri autorizați unde legislația o cere",
  "imprimante, calculatoare, rețea și UPS",
  "radiologie dentară / imagistică dentară, cu formulare prudentă și coordonare prin operatori autorizați unde este cazul",
  "consumabile, piese și accesorii",
  "evidență și planificare mentenanță",
];

const process = [
  ["Programare audit", "Stabilim telefonic contextul cabinetului și intervalul potrivit."],
  ["Vizită și inventar aparatură", "Listăm echipamentele, accesoriile și zonele tehnice critice."],
  ["Raport tehnic și calendar recomandat", "Primești observații, riscuri, priorități și pași de prevenție."],
  ["Activare abonament", "Alegi pachetul potrivit și scădem auditul dacă activarea se face în 7 zile."],
  ["Suport lunar și prevenție", "Ținem evidența, programăm verificări și coordonăm intervențiile."],
];

const audiences = [
  "cabinete stomatologice",
  "clinici mici",
  "cabinete cu radiologie dentară",
  "clinici cu sterilizare și echipamente auxiliare",
  "cabinete care vor un responsabil tehnic extern",
];

const internalLinks = [
  { href: "/servicii", label: "Servicii ZES" },
  { href: "/servicii/mentenanta-echipamente-medicale", label: "Mentenanță echipamente medicale" },
  { href: "/service-aparatura-medicala", label: "Service aparatură medicală" },
  { href: "/contact", label: "Contact" },
];

const faqs = [
  {
    question: "Cât costă auditul tehnic?",
    answer:
      "Auditul Tehnic Cabinet costă 390 lei și include inventar, verificare vizuală și funcțională de bază, riscuri tehnice, calendar recomandat și raport PDF sintetic.",
  },
  {
    question: "Auditul se scade din abonament?",
    answer:
      "Da. Suma se scade din primul abonament dacă activarea ZES CabinetCare se face în maximum 7 zile de la audit.",
  },
  {
    question: "ZES face mentenanță direct la orice echipament?",
    answer:
      "Nu promitem intervenții directe acolo unde sunt necesare autorizări, verificări oficiale sau operatori specializați. ZES poate face triere, evidență, suport și coordonare, iar pentru operațiuni care necesită operator autorizat sau verificări oficiale, ZES coordonează intervenția prin parteneri/furnizori autorizați.",
  },
  {
    question: "Ce se întâmplă dacă echipamentul necesită service autorizat?",
    answer:
      "ZES ajută la identificarea situației, documentarea solicitării, programarea furnizorului potrivit și urmărirea intervenției prin parteneri sau furnizori autorizați.",
  },
  {
    question: "Pot activa abonament fără audit?",
    answer:
      "Recomandarea este să începeți cu auditul, pentru că abonamentul trebuie calibrat pe inventarul real, riscurile tehnice și volumul de lucru al cabinetului.",
  },
  {
    question: "Serviciul este disponibil în București-Ilfov?",
    answer:
      "Da. ZES CabinetCare este gândit pentru cabinete stomatologice și clinici mici din București-Ilfov. Deplasările în afara acestei zone se ofertează separat.",
  },
  {
    question: "Include piese și consumabile?",
    answer:
      "Nu. Piesele și consumabilele se ofertează separat. Abonamentele pot include ofertare, recomandări și prețuri preferențiale în funcție de pachet.",
  },
  {
    question: "Pot rezilia abonamentul?",
    answer:
      "Condițiile finale se stabilesc contractual. Pentru început, ZES recomandă o perioadă minimă de 3 luni ca să existe timp pentru inventar, prevenție și ritm de suport.",
  },
  {
    question: "Este potrivit pentru cabinete stomatologice mici?",
    answer:
      "Da. Basic și Standard sunt gândite exact pentru cabinete care nu au responsabil tehnic intern și vor evidență, prevenție și coordonare lunară.",
  },
  {
    question: "Cât de repede puteți veni?",
    answer:
      "Programarea depinde de disponibilitate, localitate și urgență. Pentru solicitări reale, sunați la 0725 514 782 sau trimiteți formularul pentru triere rapidă.",
  },
];

const leadFields: LeadFormExtraField[] = [
  { id: "clinicArea", label: "Localitate / cartier", required: true, placeholder: "ex. Sector 3, Voluntari" },
  {
    id: "cabinetType",
    label: "Tip cabinet",
    options: ["stomatologic", "clinică medicală", "altul"],
    type: "select",
  },
  {
    id: "equipmentCount",
    label: "Număr aproximativ echipamente",
    options: ["1-5", "6-10", "11-20", "peste 20", "nu știu încă"],
    type: "select",
  },
  {
    id: "preferredContact",
    label: "Canal preferat",
    options: ["telefon", "WhatsApp", "email"],
    type: "select",
  },
];

const breadcrumbJsonLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Acasă",
      item: "https://zescorp.ro/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Servicii",
      item: "https://zescorp.ro/servicii",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "ZES CabinetCare",
      item: canonicalUrl,
    },
  ],
};

const serviceJsonLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${canonicalUrl}#service`,
  name: "ZES CabinetCare",
  serviceType: "Abonament tehnic pentru cabinete stomatologice și clinici mici",
  description: metadataDescription,
  url: canonicalUrl,
  provider: {
    "@type": "Organization",
    name: "ZES MEDCORP SRL",
    url: "https://zescorp.ro",
    telephone: companyContact.phoneInternational,
    email: companyContact.email,
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "București-Ilfov",
    },
    {
      "@type": "Country",
      name: "România",
    },
  ],
  offers: {
    "@type": "OfferCatalog",
    name: "Pachete ZES CabinetCare",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Audit Tehnic Cabinet",
        price: "390",
        priceCurrency: "RON",
        url: canonicalUrl,
      },
      ...packages.map((plan) => ({
        "@type": "Offer",
        name: `ZES CabinetCare ${plan.name}`,
        price: plan.price.replace(/\D/g, ""),
        priceCurrency: "RON",
        url: canonicalUrl,
      })),
    ],
  },
};

const faqJsonLd: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function CabinetCarePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} id="cabinetcare-breadcrumb-schema" />
      <JsonLd data={serviceJsonLd} id="cabinetcare-service-schema" />
      <JsonLd data={faqJsonLd} id="cabinetcare-faq-schema" />

      <main data-page-intent="zes-cabinetcare">
        <Section
          className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_70%)]"
          spacing="lg"
          tone="transparent"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">ZES CabinetCare</Badge>
                  <Badge variant="neutral">București-Ilfov</Badge>
                  <Badge variant="neutral">audit 390 lei</Badge>
                </div>
                <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-balance text-slate-950 sm:text-6xl">
                  Abonament tehnic pentru cabinete stomatologice și clinici mici
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
                  Audit, evidență aparatură, suport tehnic, mentenanță preventivă și coordonare
                  service pentru cabinete care nu vor opriri neplanificate.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                  Nu mai așteptați să se strice ceva. Aveți un partener tehnic lunar care ține
                  evidența, previne problemele și coordonează intervențiile.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#formular-cabinetcare" size="lg">
                    Programează audit tehnic — 390 lei
                  </Button>
                  <Button href={companyContact.phoneHref} size="lg" variant="secondary">
                    Sună acum: {companyContact.phone}
                  </Button>
                </div>
                <div className="mt-7 grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-3">
                  {["Evidență aparatură", "Prevenție lunară", "Coordonare service"].map((item) => (
                    <div className="border-l-2 border-blue-200 bg-white px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.04)]" key={item}>
                      <span className="font-semibold text-slate-950">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-lg border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(15,65,118,0.12)]">
                  <div className="relative min-h-[340px] overflow-hidden rounded-lg sm:min-h-[460px]">
                    <Image
                      alt={corporateVisuals.maintenance.alt}
                      className={`object-cover ${corporateVisuals.maintenance.position}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      src={corporateVisuals.maintenance.src}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,21,45,0.58),rgba(4,21,45,0.18)_55%,rgba(4,21,45,0.04))]" />
                    <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/35 bg-white/92 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.18)]">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        audit + abonament
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">390 / 790 / 1.490 lei lunar</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Auditul de 390 lei se scade din primul abonament dacă activarea se face în maximum 7 zile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Problema reală
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Tehnicul devine urgent exact când cabinetul are programări.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  ZES CabinetCare este gândit pentru administratorul sau medicul care vrea ordine,
                  prevenție și un punct tehnic extern, nu improvizații în ziua în care aparatul se oprește.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {problems.map((problem) => (
                  <Card as="article" className="border-blue-100 bg-[#f8fbff]" key={problem} padding="lg">
                    <p className="text-base font-semibold leading-7 text-slate-800">{problem}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Soluția
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  ZES CabinetCare este un partener tehnic lunar pentru cabinete stomatologice și clinici mici.
                </h2>
              </div>
              <div className="grid gap-4 text-base leading-8 text-slate-600">
                <p>
                  Începem cu un audit tehnic scurt, apoi transformăm lista de echipamente într-un
                  calendar de prevenție, suport și intervenții coordonate.
                </p>
                <p>
                  Pentru operațiuni care necesită operator autorizat sau verificări oficiale, ZES
                  coordonează intervenția prin parteneri/furnizori autorizați.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <Badge variant="blue">Audit Tehnic Cabinet</Badge>
                <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                  Audit tehnic cabinet — 390 lei
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Primul pas comercial este o vizită aplicată, cu inventar, verificări de bază și
                  raport sintetic. Suma se scade din primul abonament dacă activarea se face în maximum 7 zile.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button href="#formular-cabinetcare">Programează auditul</Button>
                  <Button href={whatsappAuditHref} target="_blank" variant="secondary">
                    WhatsApp audit
                  </Button>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {auditIncludes.map((item) => (
                  <div className="rounded-lg border border-blue-100 bg-[#f8fbff] p-4 text-sm font-semibold leading-7 text-slate-700" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Pachete lunare
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950">
                Alege nivelul de suport potrivit cabinetului.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {packages.map((plan) => (
                <Card
                  as="article"
                  className={plan.highlighted ? "border-[#0057b8] bg-white shadow-[0_22px_70px_rgba(0,87,184,0.12)]" : "border-blue-100 bg-white"}
                  key={plan.name}
                  padding="lg"
                >
                  <div className="flex min-h-8 items-center justify-between gap-3">
                    <h3 className="text-2xl font-semibold text-slate-950">{plan.name}</h3>
                    {plan.highlighted ? <Badge variant="blue">Recomandat</Badge> : null}
                  </div>
                  <p className="mt-4 text-4xl font-semibold text-slate-950">
                    {plan.price}
                    <span className="text-base font-medium text-slate-500"> {plan.suffix}</span>
                  </p>
                  <p className="mt-4 min-h-16 text-sm leading-7 text-slate-600">{plan.description}</p>
                  <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-700">
                    {plan.items.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Ce putem acoperi
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  De la aparatura din cabinet până la IT, sterilizare și evidență.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Acoperirea exactă se stabilește după audit. Separăm clar suportul tehnic,
                  coordonarea și operațiunile care cer furnizori autorizați.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {coverage.map((item) => (
                  <div className="rounded-lg border border-slate-200 bg-[#f8fbff] p-4 text-sm font-semibold leading-7 text-slate-700" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-amber-200 bg-amber-50/65" spacing="md" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-800">
                  Ce nu promitem greșit
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Prudență acolo unde legislația cere operator autorizat.
                </h2>
              </div>
              <p className="text-base leading-8 text-slate-700">
                ZES MEDCORP nu înlocuiește operatorii autorizați acolo unde legislația cere
                verificări oficiale, autorizări, măsurători sau intervenții realizate de entități
                autorizate. În aceste cazuri, ZES ajută la identificare, coordonare și documentare
                prin parteneri/furnizori autorizați.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Proces
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Din audit într-un ritm lunar de prevenție.
                </h2>
              </div>
              <ol className="grid gap-4">
                {process.map(([title, description], index) => (
                  <li className="grid gap-4 rounded-lg border border-blue-100 bg-[#f8fbff] p-5 sm:grid-cols-[4rem_1fr]" key={title}>
                    <span className="text-2xl font-semibold text-[#0057b8]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Pentru cine este potrivit
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Cabinete și clinici mici care vor un responsabil tehnic extern.
                </h2>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {audiences.map((item) => (
                    <div className="rounded-lg border border-blue-100 bg-white p-4 text-sm font-semibold leading-7 text-slate-700" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-blue-100 bg-white shadow-[0_22px_60px_rgba(15,65,118,0.1)]">
                <Image
                  alt={corporateVisuals.service.alt}
                  className={`object-cover ${corporateVisuals.service.position}`}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  src={corporateVisuals.service.src}
                />
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Întrebări frecvente
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950">
                Clarificări pentru audit, abonamente și service autorizat.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq) => (
                <Card as="article" className="border-blue-100 bg-white" key={faq.question} padding="lg">
                  <h3 className="text-lg font-semibold leading-7 text-slate-950">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="formular-cabinetcare" className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <LeadCaptureForm
              description="Trimite datele cabinetului pentru programarea auditului tehnic. Solicitarea intră în fluxul existent ZES pentru triere comercial-tehnică."
              eyebrow="Formular lead"
              extraFields={leadFields}
              generatedSummary="Solicitare audit tehnic ZES CabinetCare pentru cabinet stomatologic sau clinică mică."
              hiddenFields={{
                serviciu: "ZES CabinetCare",
                oferta: "Audit Tehnic Cabinet - 390 lei",
                aria: "București-Ilfov",
              }}
              inquiryType="ZES CabinetCare"
              sourcePage={pagePath}
              sourceTool="cabinetcare-landing"
              submitLabel="Programează audit tehnic — 390 lei"
              successDescription="Solicitarea a fost trimisă. Echipa ZES poate reveni pentru confirmarea intervalului, inventarului estimativ și detaliilor de acces."
              successTitle="Auditul CabinetCare a fost solicitat."
              summary={{
                projectType: "ZES CabinetCare",
                budgetRange: "audit 390 lei; abonamente 390 / 790 / 1.490 lei",
                nextStep: "Programare audit, inventar aparatură și raport sintetic.",
              }}
              title="Programează auditul tehnic al cabinetului"
              tone="light"
            />
          </Container>
        </Section>

        <Section className="bg-slate-950 text-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-200">
                  Contact direct
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight">
                  Programează auditul tehnic al cabinetului
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  Contact: Marius Stefano Zanvetor, Administrator & Technical Projects, ZES MEDCORP SRL.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Button href={companyContact.phoneHref} variant="outline">
                  Sună: {companyContact.phone}
                </Button>
                <Button href={auditMailHref} variant="outline">
                  Trimite email
                </Button>
                <Button href="#formular-cabinetcare" variant="outline">
                  Formular contact
                </Button>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm leading-6 text-slate-300">
              {internalLinks.map((link) => (
                <Link className="text-cyan-100 underline-offset-4 hover:underline" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
