import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { companyContact } from "@/lib/brand";

const serviceLinks = [
  { label: "Hub comercial ZES", href: "/servicii" },
  { label: "Servicii generale", href: "/services" },
  { label: "Proiectare camera RMN", href: "/servicii/proiectare-camera-rmn" },
  { label: "Proiectare camera CT", href: "/servicii/proiectare-camera-ct" },
  { label: "RF shielding pentru RMN", href: "/servicii/rf-shielding-rmn" },
  { label: "Radioprotectie pentru imagistica", href: "/servicii/radioprotectie-imagistica" },
  { label: "Modernizare clinica medicala", href: "/servicii/modernizare-clinica-medicala" },
];

const aiToolLinks = [
  { label: "AI Discovery", href: "/ai-discovery" },
  { label: "Calculatoare medicale", href: "/calculatoare" },
  { label: "Comparații tehnice", href: "/comparatii" },
  { label: "Planificare proiect", href: "/planificare" },
  { label: "Proposal Builder", href: "/proposal-builder" },
  { label: "Project Intake ZES", href: "/project-intake" },
  { label: "Calculator proiect medical", href: "/calculator-proiect-medical" },
  { label: "Radiology Room Planner", href: "/radiology-room-planner" },
  { label: "Service Diagnostic", href: "/service-diagnostic" },
  { label: "Analiza preliminara", href: "/ai-project-advisor" },
];

const knowledgeLinks = [
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Glosar medical", href: "/glosar" },
  { label: "Planificare proiect", href: "/planificare" },
  { label: "Comparatii tehnice", href: "/comparatii" },
  { label: "Ghiduri tehnice", href: "/knowledge-hub#ghiduri-tehnice" },
  { label: "Autorizari", href: "/knowledge-hub#autorizari" },
];

const companyLinks = [
  { label: "Companie", href: "/companie" },
  { label: "Despre ZES", href: "/about" },
  { label: "Proiecte", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Confidentialitate", href: "/privacy-policy" },
  { label: "Termeni", href: "/terms" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "GDPR", href: "/gdpr" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const linkGroups = [
  { title: "Servicii comerciale", links: serviceLinks },
  { title: "Instrumente", links: aiToolLinks },
  { title: "Resurse", links: knowledgeLinks },
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
                Solicita evaluare tehnica
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
            &copy; {currentYear} {companyContact.legalName}. CUI {companyContact.cui} ·
            Reg. Com. {companyContact.tradeRegister}
          </p>
          <div className="flex gap-4">
            <Link className="transition hover:text-slate-300" href="/contact">
              Contact
            </Link>
            <Link className="transition hover:text-slate-300" href="/privacy-policy">
              Confidentialitate
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
