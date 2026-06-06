import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { companyContact } from "@/lib/brand";

const serviceLinks = [
  { label: "Servicii", href: "/solutii-medicale" },
  { label: "Amenajare centre imagistica", href: "/amenajare-centre-imagistica" },
  { label: "Amenajare cabinet medical", href: "/amenajare-cabinet-medical" },
  { label: "Infrastructura medicala", href: "/solutii-medicale/dezvoltare-unitati-medicale" },
  { label: "Echipamente medicale", href: "/solutii-medicale/echipamente-imagistica-diagnostic" },
  { label: "Radioprotectie RX", href: "/radioprotectie-plumbare-rx" },
  { label: "Service aparatura medicala", href: "/service-aparatura-medicala" },
  { label: "Service ecografe", href: "/service-ecografe" },
  { label: "Service laborator IVD", href: "/service-laborator-ivd" },
  { label: "Service si mentenanta", href: "/solutii-medicale/service-echipamente-medicale" },
  { label: "Contracte mentenanta", href: "/contracte-mentenanta" },
  { label: "Catalog produse", href: "/produse" },
];

const resourceLinks = [
  { label: "Resurse", href: "/resources" },
  { label: "Instrumente", href: "/resources" },
  { label: "AI Discovery", href: "/ai-discovery" },
  { label: "Proposal Builder", href: "/proposal-builder" },
  { label: "Project Intake", href: "/project-intake" },
  { label: "Calculatoare", href: "/calculatoare" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
];

const companyLinks = [
  { label: "Proiecte", href: "/projects" },
  { label: "Companie", href: "/companie" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Confidentialitate", href: "/privacy-policy" },
  { label: "Termeni", href: "/terms" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "GDPR", href: "/gdpr" },
];

const linkGroups = [
  { title: "Servicii", links: serviceLinks },
  { title: "Resurse / Instrumente", links: resourceLinks },
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
                Solicita evaluare
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {linkGroups.map((group) => (
              <nav aria-label={group.title} key={group.title}>
                <h2 className="text-xs font-semibold uppercase leading-none text-cyan-100">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
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
            &copy; {currentYear} {companyContact.legalName}. CUI {companyContact.cui} - Reg. Com.{" "}
            {companyContact.tradeRegister}
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
