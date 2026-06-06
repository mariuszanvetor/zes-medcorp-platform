"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { trackCTA } from "@/lib/analytics";
import { companyContact } from "@/lib/brand";
import { openZESPopup } from "@/lib/zes-popup";

const defaultActions = [
  { label: "Solicita analiza", href: "/ai-project-advisor" },
  { label: "Estimare orientativa", href: "/calculator-proiect-medical" },
  { label: "Discuta cu echipa", href: "/contact" },
];

export function ConversionStickyCTA() {
  const pathname = usePathname();
  const isProductRoute = pathname === "/produse" || pathname?.startsWith("/produse/");
  const isProductDetailRoute =
    Boolean(pathname?.startsWith("/produse/")) && !pathname?.startsWith("/produse/categorie/");

  if (pathname === "/" || pathname === "/ai-discovery" || pathname?.startsWith("/admin/")) {
    return null;
  }

  if (isProductRoute) {
    return <ProductCatalogStickyCTA isProductDetailRoute={isProductDetailRoute} pathname={pathname ?? "/produse"} />;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 sm:bottom-4 sm:px-4">
      <div className="pointer-events-auto flex w-full max-w-3xl items-center gap-2 rounded-[1.35rem] border border-blue-100 bg-white/94 p-2 shadow-[0_18px_60px_rgba(0,87,184,0.16)] backdrop-blur-xl sm:rounded-full">
        <div className="hidden min-w-0 flex-1 pl-4 md:block">
          <p className="truncate text-sm font-semibold text-slate-950">
            Ai un proiect medical, o camera de radiologie sau o problema de service?
          </p>
          <p className="truncate text-xs text-slate-500">
            Alege un pas clar: evaluare, estimare sau discutie tehnica.
          </p>
        </div>
        <div className="grid w-full grid-cols-3 gap-1 md:w-auto">
          {defaultActions.map((action, index) => (
            <StickyLink action={action} key={action.href} primary={index === defaultActions.length - 1} sourceTool="sticky-consultation-bar" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCatalogStickyCTA({
  isProductDetailRoute,
  pathname,
}: {
  isProductDetailRoute: boolean;
  pathname: string;
}) {
  const quoteHref = isProductDetailRoute ? "#cerere-oferta" : "/contact";
  const prompt = isProductDetailRoute
    ? "Vreau oferta pentru un produs din catalogul medical ZESCORP"
    : "Vreau sa discut despre produse medicale din catalogul ZESCORP";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 sm:bottom-4 sm:px-4">
      <div className="pointer-events-auto flex w-full max-w-4xl items-center gap-2 overflow-x-auto rounded-[1.35rem] border border-blue-100 bg-white/94 p-2 shadow-[0_18px_60px_rgba(0,87,184,0.16)] backdrop-blur-xl sm:rounded-full">
        <div className="hidden min-w-0 flex-1 pl-4 lg:block">
          <p className="truncate text-sm font-semibold text-slate-950">
            Ai nevoie de oferta, disponibilitate sau suport pentru produs?
          </p>
          <p className="truncate text-xs text-slate-500">
            Alege un pas rapid: oferta, telefon, WhatsApp sau discutie cu ZES.
          </p>
        </div>
        <div className="grid min-w-max grid-cols-4 gap-1">
          <StickyLink action={{ label: "Solicita oferta", href: quoteHref }} primary sourceTool="product-sticky-bar" />
          <StickyLink action={{ label: "Suna acum", href: companyContact.phoneHref }} sourceTool="product-sticky-bar" />
          <StickyLink action={{ label: "WhatsApp", href: companyContact.whatsappHref }} sourceTool="product-sticky-bar" />
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-full px-3 text-center text-xs font-bold leading-tight text-slate-700 transition hover:bg-blue-50 hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-5 sm:text-sm"
            data-cta="zes-open"
            type="button"
            onClick={() => {
              openZESPopup({ prompt, source: pathname });
              trackCTA({
                ctaLabel: "Discuta cu ZES",
                destination: "floating-zes",
                sourcePage: pathname,
                sourceTool: "product-sticky-bar",
              });
            }}
          >
            Discuta cu ZES
          </button>
        </div>
      </div>
    </div>
  );
}

function StickyLink({
  action,
  primary = false,
  sourceTool,
}: {
  action: { label: string; href: string };
  primary?: boolean;
  sourceTool: string;
}) {
  return (
    <Link
      className={
        primary
          ? "inline-flex min-h-10 items-center justify-center rounded-full bg-[#0057b8] px-3 text-center text-xs font-bold leading-tight text-white transition hover:bg-[#00498f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-5 sm:text-sm"
          : "inline-flex min-h-10 items-center justify-center rounded-full px-3 text-center text-xs font-bold leading-tight text-slate-700 transition hover:bg-blue-50 hover:text-[#0057b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-5 sm:text-sm"
      }
      href={action.href}
      onClick={() =>
        trackCTA({
          ctaLabel: action.label,
          destination: action.href,
          sourceTool,
        })
      }
    >
      {action.label}
    </Link>
  );
}
