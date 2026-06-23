import Link from "next/link";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { LeadCaptureForm, type LeadFormExtraField } from "@/components/forms/LeadCaptureForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { SeoCommercialLanding } from "@/data/seo-commercial-landings";
import { companyContact } from "@/lib/brand";

type SeoCommercialLandingPageProps = {
  page: SeoCommercialLanding;
};

export function SeoCommercialLandingPage({ page }: SeoCommercialLandingPageProps) {
  const offerChecklist = getOfferChecklist(page);
  const showShortLeadForm = shouldShowShortLeadForm(page);

  return (
    <>
      <BreadcrumbSchema
        id={`breadcrumb-schema-commercial-${page.slug}`}
        items={[
          { name: "Acasa", href: "/" },
          { name: page.title, href: page.path },
        ]}
      />
      <FAQSchema items={page.faqs} id={`faq-schema-commercial-${page.slug}`} />
      <ServiceSchema
        description={page.metadataDescription}
        name={page.title}
        serviceType={page.serviceType}
        url={page.path}
      />
      {page.productSchema ? (
        <ProductSchema
          category={page.productSchema.category}
          description={page.metadataDescription}
          name={page.title}
          properties={page.productSchema.properties}
          url={page.path}
        />
      ) : null}

      <main data-page-intent={page.slug}>
        <Section
          className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(135deg,#04152d_0%,#062a55_58%,#0b3f78_100%)]"
          spacing="xl"
          tone="transparent"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                  {page.eyebrow}
                </p>
                <h1 className="mt-5 text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl lg:text-6xl">
                  {page.h1}
                </h1>
                <p className="mt-6 text-lg leading-9 text-slate-100">{page.intro}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/contact" size="lg" data-cta="primary-offer">
                    {page.primaryCta}
                  </Button>
                  <Button
                    href={companyContact.whatsappHref}
                    size="lg"
                    target="_blank"
                    variant="outline"
                    data-cta="whatsapp"
                  >
                    WhatsApp
                  </Button>
                </div>
                <p className="mt-4 max-w-xl text-sm leading-6 text-cyan-100">
                  Raspuns comercial pentru proiecte reale, dupa verificare tehnica.
                </p>
              </div>
              <aside className="rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Oferta personalizata
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
                  Ce poti cere concret
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  ZESCORP poate pregati o discutie comerciala pentru {page.offerAngle}. Primul pas
                  este o cerere scurta, cu datele disponibile si cu obiectivul real al clinicii.
                </p>
                <div className="mt-5 grid gap-3">
                  <Link
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0057b8] px-5 text-sm font-bold text-white transition hover:bg-blue-800"
                    data-cta="preliminary-offer"
                    data-page-intent={page.slug}
                    href="/contact"
                  >
                    Cere oferta personalizata
                  </Link>
                  <Link
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                    data-cta="consultation"
                    data-page-intent={page.slug}
                    href={companyContact.phoneHref}
                  >
                    {page.consultationCta}: {companyContact.phone}
                  </Link>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Cerere de oferta
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Ce sa trimiti ca ZESCORP sa poata raspunde concret.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  O cerere buna nu trebuie sa fie lunga. Sunt suficiente cateva date clare despre
                  echipament, proiect, locatie si termen pentru a pregati o discutie comerciala
                  aplicata.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {offerChecklist.map((item) => (
                  <article
                    className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-5 text-sm font-semibold leading-7 text-slate-800"
                    key={item}
                  >
                    {item}
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Cui se adreseaza
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Decizie, oferta si implementare pentru echipe medicale care nu isi permit blocaje.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Beneficiarul trebuie sa vada rapid ce poate cumpara, ce rezultat obtine, ce date
                  sunt necesare si cum se ajunge la o oferta clara, nu la o discutie generala.
                </p>
              </div>
              <div className="grid gap-3">
                {page.audience.map((item) => (
                  <article
                    className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-5 text-sm leading-7 text-slate-700"
                    key={item}
                  >
                    {item}
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {showShortLeadForm ? (
          <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
            <Container>
              <LeadCaptureForm
                description={`Trimite cateva detalii despre ${page.offerAngle}. Formularul pastreaza trierea scurta: contact, locatie, echipament sau proiect si obiectivul principal.`}
                eyebrow="Cerere rapida"
                extraFields={getLeadFormFields(page)}
                inquiryType={page.serviceType}
                sourcePage={page.path}
                sourceTool="seo-commercial-landing"
                submitLabel={page.primaryCta}
                successDescription="Solicitarea a fost preluata pentru evaluare comercial-tehnica. ZESCORP poate reveni cu intrebari scurte pentru clarificare."
                title="Trimite solicitarea catre ZESCORP"
                tone="light"
              />
            </Container>
          </Section>
        ) : null}

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Beneficii comerciale
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                De ce merita discutat proiectul cu ZESCORP inainte de achizitie sau interventie.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Majoritatea costurilor mari apar cand echipamentul, spatiul, software-ul si
                mentenanta sunt tratate separat. O discutie comerciala corecta reduce riscul de
                blocaje si ajuta la alegerea unui traseu bugetabil.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {page.benefits.map((benefit) => (
                <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]" key={benefit}>
                  <div className="h-1 w-10 rounded-full bg-[#0057b8]" />
                  <p className="mt-4 text-sm leading-7 text-slate-700">{benefit}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Proces de implementare
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Cum se transforma solicitarea intr-o oferta care poate fi discutata intern.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Pentru servicii medicale B2B, o oferta buna nu porneste dintr-un pret generic.
                  Porneste din context: ce se cumpara, unde se instaleaza, ce risc exista, cine
                  opereaza sistemul si ce suport este asteptat dupa livrare.
                </p>
              </div>
              <div className="grid gap-4">
                {page.implementation.map((step, index) => (
                  <article className="rounded-2xl border border-slate-200 bg-white p-5" key={step.title}>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                      Etapa {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoPanel title="Ce poate livra ZESCORP" items={page.deliverables} />
              <InfoPanel title="Factori care influenteaza costul" items={page.costFactors} />
              <InfoPanel title="Ce sa pregatesti pentru achizitie" items={page.procurementNotes} />
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <article>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Decizie si buget
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Cum se decide corect o investitie in {page.title.toLowerCase()}.
                </h2>
                <div className="mt-5 grid gap-4 text-base leading-8 text-slate-600">
                  <p>
                    In proiectele medicale B2B, pretul izolat spune foarte putin. O oferta utila
                    trebuie sa explice ce este inclus, ce ramane de clarificat, ce depinde de
                    spatiu, ce depinde de echipament si ce costuri apar dupa livrare. Pentru {page.offerAngle},
                    decizia buna este cea care poate fi aparata intern de administrator, medic,
                    responsabil tehnic si achizitii.
                  </p>
                  <p>
                    ZESCORP recomanda ca solicitarea sa fie construita pe scenariul real de utilizare:
                    volum de lucru, locatie, personal disponibil, termen de implementare, risc de
                    downtime si nivel de suport asteptat. Aceasta abordare evita comparatiile
                    superficiale intre oferte care par similare, dar includ responsabilitati diferite.
                  </p>
                  <p>
                    Pentru servicii, diferenta importanta este intre interventie punctuala, suport
                    prioritar si contract preventiv. Pentru produse, diferenta este intre simpla
                    furnizare, configuratie completa, instalare, training, service si mentenanta.
                    Pentru infrastructura, diferenta este intre un desen orientativ si un proiect
                    pregatit pentru validari tehnice si executie.
                  </p>
                  <p>
                    Rezultatul urmarit este o discutie suficient de clara pentru un raspuns comercial:
                    ce se poate oferta acum, ce informatii lipsesc, ce riscuri trebuie verificate si
                    care este urmatorul pas rezonabil pentru clinica.
                  </p>
                </div>
              </article>
              <article className="rounded-3xl border border-blue-100 bg-[#f8fbff] p-7">
                <h2 className="text-2xl font-semibold leading-tight text-slate-950">
                  Cand merita ceruta oferta
                </h2>
                <div className="mt-5 grid gap-4">
                  {[
                    "cand exista un termen de deschidere, modernizare sau inlocuire",
                    "cand echipamentul sau serviciul influenteaza direct programarile si veniturile clinicii",
                    "cand sunt implicate mai multe parti: furnizor, proiectant, service, IT, executie sau mentenanta",
                    "cand bugetul trebuie justificat prin risc operational, continuitate si cost total, nu doar prin pret de achizitie",
                  ].map((item) => (
                    <div className="rounded-2xl border border-blue-100 bg-white p-4 text-sm leading-7 text-slate-700" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <article className="rounded-3xl border border-blue-100 bg-white p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Buyer journey
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Ce trebuie sa inteleaga un proprietar, administrator sau medic coordonator.
                </h2>
                <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-700">
                  <p>
                    Inainte de a aproba o investitie, echipa de decizie are nevoie de o explicatie
                    simpla: ce problema rezolva {page.title.toLowerCase()}, ce costuri pot aparea,
                    ce riscuri reduce si ce se intampla daca decizia este amanata. Pentru o clinica,
                    valoarea nu este doar tehnica; este legata de programari, pacienti, timp de lucru,
                    continuitate si increderea personalului in infrastructura folosita zilnic.
                  </p>
                  <p>
                    De aceea, ZESCORP pregateste conversatia in termeni comerciali: ce se poate
                    livra, ce se poate masura, ce trebuie validat si ce etapa poate fi bugetata
                    prima. Daca proiectul este la inceput, accentul cade pe consultanta si clarificare.
                    Daca proiectul este urgent, accentul se muta pe triere, prioritate si contact
                    rapid. Daca exista buget, discutia trebuie sa devina oferta structurata.
                  </p>
                  <p>
                    Experienta trebuie sa duca beneficiarul spre actiune, nu spre confuzie. Urmatorul
                    pas recomandat este contactul cu ZESCORP, trimiterea datelor disponibile si
                    stabilirea unei discutii scurte pentru validarea cererii.
                  </p>
                </div>
              </article>
              <article className="rounded-3xl border border-blue-100 bg-white p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Ce intra in cererea initiala
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Cu cat cererea este mai clara, cu atat oferta poate fi mai utila.
                </h2>
                <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-700">
                  <p>
                    Pentru o prima evaluare, nu este nevoie ca beneficiarul sa aiba toate raspunsurile.
                    Este suficient sa existe un obiectiv, un termen, o locatie si o descriere a
                    situatiei. In schimb, este important ca informatiile sa fie prezentate ordonat:
                    ce exista acum, ce se doreste, ce blocheaza proiectul si cine va lua decizia.
                  </p>
                  <p>
                    Pentru {page.offerAngle}, ZESCORP poate transforma aceste date intr-un brief de
                    ofertare: domeniu, prioritate, informatii lipsa, servicii recomandate si actiunea
                    urmatoare. Acest brief ajuta atat cumparatorul, cat si echipa tehnica, pentru ca
                    reduce presupunerile si face discutia mai concreta.
                  </p>
                  <p>
                    Daca exista planuri, poze, fise tehnice, liste de echipamente sau documente
                    operationale, acestea pot accelera procesul. Daca nu exista, discutia poate porni
                    totusi de la intrebari simple si se poate transforma gradual intr-o cerere completa.
                  </p>
                </div>
              </article>
            </div>
          </Container>
        </Section>

        {page.commercialNarrative?.length ? (
          <Section className="bg-white" spacing="lg" tone="transparent">
            <Container>
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Argument comercial
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Detalii care conteaza inainte de cererea de oferta
                </h2>
              </div>
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                {page.commercialNarrative.map((section) => (
                  <article
                    className="rounded-3xl border border-slate-200 bg-[#f8fbff] p-6"
                    key={`${page.slug}-${section.title}`}
                  >
                    <h3 className="text-xl font-semibold leading-7 text-slate-950">
                      {section.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{section.body}</p>
                  </article>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  De ce ZESCORP
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Un partener comercial-tehnic pentru proiecte medicale, nu doar un formular de contact.
                </h2>
                <div className="mt-6 grid gap-4">
                  {page.whyZESCORP.map((item) => (
                    <p className="text-sm leading-7 text-slate-700" key={item}>
                      {item}
                    </p>
                  ))}
                </div>
              </article>
              <article className="rounded-3xl bg-slate-950 p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                  Contact rapid
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight">
                  Ai nevoie de pret, consultanta sau evaluare?
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Trimite contextul proiectului, lista de echipamente sau problema de service.
                  Pentru proiecte reale, ZESCORP valideaza datele inainte de ofertare.
                </p>
                <div className="mt-6 grid gap-3">
                  <Button href="/contact" fullWidth>
                    {page.primaryCta}
                  </Button>
                  <Button href={companyContact.emailHref} fullWidth variant="outline">
                    {companyContact.email}
                  </Button>
                  <Button href={companyContact.whatsappHref} fullWidth target="_blank" variant="outline">
                    WhatsApp
                  </Button>
                </div>
              </article>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-blue-100 bg-[#f7fbff]" spacing="lg" tone="transparent">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Intrebari frecvente
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                Clarificari pentru decizie si ofertare
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {page.faqs.map((faq) => (
                <article className="rounded-2xl border border-blue-100 bg-white p-5" key={faq.question}>
                  <h3 className="text-base font-semibold leading-7 text-slate-950">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Linkuri interne
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                  Continua pe paginile relevante pentru proiectul tau.
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Aceste pagini ajuta la clarificarea traseului comercial: produs, serviciu,
                  infrastructura, mentenanta si contact.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.internalLinks.map((link) => (
                  <Link
                    className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 text-sm font-semibold leading-6 text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
                    href={link.href}
                    key={`${page.slug}-${link.href}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}

function getOfferChecklist(page: SeoCommercialLanding) {
  const slug = page.slug.toLowerCase();
  const isRadioprotection =
    slug.includes("radioprotectie") ||
    slug.includes("shielding") ||
    slug.includes("faraday") ||
    slug.includes("rx-room") ||
    slug.includes("radiologie");
  const isEquipment =
    page.path.startsWith("/produse/") ||
    slug.includes("pacs") ||
    slug.includes("computer-tomograf") ||
    slug.includes("rmn");

  if (isRadioprotection) {
    return [
      "Tip proiect: camera RX, CT, RMN, mamografie sau modernizare",
      "Orasul si stadiul spatiului: existent, nou sau in renovare",
      "Plan, schita, poze sau vecinatati disponibile",
      "Echipamentul planificat si cerintele operationale",
      "Termen dorit si status documentatie/CNCAN, daca exista",
      "Telefon sau email pentru clarificari rapide",
    ];
  }

  if (isEquipment) {
    return [
      "Echipamentul sau sistemul dorit si configuratia estimata",
      "Locatia de instalare si termenul de achizitie",
      "Integrarea necesara: PACS, RIS, DICOM, infrastructura sau service",
      "Cantitate, accesorii, consumabile sau optiuni importante",
      "Buget orientativ sau etapa de achizitie, daca exista",
      "Telefon sau email pentru oferta personalizata",
    ];
  }

  return [
    "Tip echipament sau serviciu solicitat",
    "Marca, modelul si simptomele, daca este service",
    "Orasul, urgenta si impactul asupra activitatii",
    "Poze, coduri de eroare, fise sau documente disponibile",
    "Termen dorit pentru diagnostic, interventie sau contract",
    "Telefon sau email pentru contact rapid",
  ];
}

function shouldShowShortLeadForm(page: SeoCommercialLanding) {
  return (
    page.path === "/service-aparatura-medicala" ||
    page.path.startsWith("/servicii/") ||
    !page.path.startsWith("/produse/")
  );
}

function getLeadFormFields(page: SeoCommercialLanding): LeadFormExtraField[] {
  const isService = page.slug.includes("service") || page.slug.includes("mentenanta");

  return [
    {
      id: "equipmentType",
      label: isService ? "Tip echipament" : "Tip proiect / echipament",
      placeholder: isService ? "ex. ecograf, CT, monitor pacient" : "ex. camera RX, PACS, RF shielding",
      required: true,
    },
    { id: "city", label: "Oras", placeholder: "ex. Bucuresti", required: true },
    {
      id: "urgency",
      label: "Urgenta",
      options: ["Alege urgenta", "Urgent", "In 1-2 saptamani", "Planificat", "Doar bugetare"],
      type: "select",
    },
    {
      id: "projectObjective",
      label: "Problema / obiectiv",
      placeholder: "ex. defect, modernizare, oferta, contract mentenanta",
      required: true,
    },
  ];
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_16px_44px_rgba(15,23,42,0.055)]">
      <h2 className="text-2xl font-semibold leading-tight text-slate-950">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-700">
        {items.map((item) => (
          <li className="flex gap-3" key={item}>
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

