"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type MobileNavLink = {
  label: string;
  href: string;
};

export type MobileNavProps = {
  links: MobileNavLink[];
  ctaHref: string;
  ctaLabel: string;
};

export function MobileNav({ links, ctaHref, ctaLabel }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="xl:hidden">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Închide meniul de navigare" : "Deschide meniul de navigare"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-800 shadow-[0_12px_30px_rgba(15,23,42,0.10)] transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true" className="relative h-4 w-5">
          <span
            className={cn(
              "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200",
              isOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-200",
              isOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200",
              isOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-x-3 top-20 z-[70] origin-top overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
          id="mobile-navigation"
        >
          <nav aria-label="Navigație mobilă" className="p-3">
            <div className="grid gap-1">
              {links.map((link) => (
                <Link
                  className="rounded-md px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={link.href}
                  key={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-slate-200 pt-3">
              <Button
                fullWidth
                href={ctaHref}
                onClick={closeMenu}
                variant="primary"
              >
                {ctaLabel}
              </Button>
            </div>
          </nav>
        </div>
      )}

      {isOpen && (
        <button
          aria-label="Închide meniul de navigare"
          className="fixed inset-0 z-[60] cursor-default bg-slate-950/25 backdrop-blur-[2px]"
          type="button"
          onClick={closeMenu}
        />
      )}
    </div>
  );
}
