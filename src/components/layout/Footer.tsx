import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { companyContact } from "@/lib/brand";

const serviceLinks = [
  { label: "Radiologie", href: "/services/radiologie" },
  { label: "Ecranare RF", href: "/services/rf-shielding" },
  { label: "Protecție radiologică", href: "/services/protectie-radiologica" },
  { label: "Aparatură medicală", href: "/services/aparatura-medicala" },
  { label: "Imagistică medicală", href: "/services/imagistica-medicala" },
  { label: "IVD / laborator", href: "/services/ivd-laborator" },
  {
    label: "Service specializat",
    href: "/services/service-aparatura-medicala",
  },
];

const aiToolLinks = [
  { label: "Analiză preliminară", href: "/ai-project-advisor" },
  { label: "Estimare proiect medical", href: "/calculator-proiect-medical" },
  { label: "Estimare cameră RMN", href: "/calculatoare/cost-camera-rmn" },
  { label: "Planificare radiologie", href: "/radiology-room-planner" },
  { label: "Propunere preliminară", href: "/proposal-builder" },
  { label: "Project Intake ZES", href: "/project-intake" },
];

const knowledgeLinks = [
  { label: "Planificare proiect", href: "/planificare" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Ghiduri tehnice", href: "/knowledge-hub#ghiduri-tehnice" },
  { label: "Autorizări", href: "/knowledge-hub#autorizari" },
];

const companyLinks = [
  { label: "Companie", href: "/companie" },
  { label: "Despre ZES", href: "/about" },
  { label: "Proiecte", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Confidențialitate", href: "/privacy-policy" },
  { label: "Termeni", href: "/terms" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "GDPR", href: "/gdpr" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const linkGroups = [
  { title: "Servicii", links: serviceLinks },
  { title: "Instrumente", links: aiToolLinks },
  { title: "Knowledge Hub", links: knowledgeLinks },
  { title: "Companie", links: companyLinks },
  { title: "Legal", links: legalLinks },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <Container>
        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_2fr]">
          <div className="max-w-md">
            <Link
              aria-label="ZES MEDCORP home"
              className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              href="/"
            >
              <BrandLogo compact inverse />
            </Link>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              {companyContact.positioning}
            </p>
            <div className="mt-6 grid gap-2 text-sm leading-6 text-slate-300">
              <a
                className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                href={companyContact.emailHref}
              >
                {companyContact.email}
              </a>
              <a
                className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                href={companyContact.phoneHref}
              >
                {companyContact.phone}
              </a>
              <p className="text-slate-400">{companyContact.address.full}</p>
            </div>
            <div className="mt-6">
              <Button href="/contact" size="sm" variant="outline">
                Solicitați evaluare tehnică
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {linkGroups.map((group) => (
              <nav aria-label={group.title} key={group.title}>
                <h2 className="text-xs font-semibold uppercase leading-none text-cyan-100">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-sm leading-6 text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {companyContact.legalName}. CUI{" "}
            {companyContact.cui} · Reg. Com. {companyContact.tradeRegister}
          </p>
          <div className="flex gap-4">
            <Link className="transition hover:text-slate-300" href="/contact">
              Contact
            </Link>
            <Link className="transition hover:text-slate-300" href="/privacy-policy">
              Confidențialitate
            </Link>
            <Link className="transition hover:text-slate-300" href="/terms">
              Termeni
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
