import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { MobileNav, type MobileNavLink } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navigationLinks: MobileNavLink[] = [
  { label: "Servicii", href: "/solutii-medicale" },
  { label: "Echipamente", href: "/solutii-medicale/echipamente-imagistica-diagnostic" },
  { label: "Service", href: "/solutii-medicale/service-echipamente-medicale" },
  { label: "Proiecte", href: "/projects" },
  { label: "Resurse", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

const ctaHref = "/contact";
const ctaLabel = "Contact";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/94 text-slate-950 shadow-[0_8px_28px_rgba(15,23,42,0.055)] backdrop-blur-xl">
      <Container>
        <div className="flex min-h-[4.25rem] items-center justify-between gap-6 py-2">
          <Link
            aria-label="Pagina principala ZES MEDCORP"
            className="group inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            href="/"
          >
            <BrandLogo compact />
          </Link>

          <nav aria-label="Navigatie principala" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center xl:flex">
            <Button
              className="rounded-xl px-5 shadow-[0_10px_24px_rgba(0,87,184,0.16)]"
              href={ctaHref}
              size="sm"
              variant="primary"
            >
              {ctaLabel}
            </Button>
          </div>

          <MobileNav
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
            links={navigationLinks}
          />
        </div>
      </Container>
    </header>
  );
}
