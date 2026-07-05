import { NextResponse, type NextRequest } from "next/server";

const canonicalHost = "www.zescorp.ro";
const constructionHost = "constructii.zescorp.ro";
const legacyRedirects: Record<string, string> = {
  "/camera-computer-tomograf": "/solutii-medicale/camere-ct",
  "/camera-rmn": "/solutii-medicale/camere-rmn",
  "/contact-solicita-oferta-pentru-proiecte-medicale": "/contact",
  "/distributie-reactivi-si-consumabile-cum-sa-asiguri-continuitatea-laboratorului-tau":
    "/solutii-medicale/echipamente-laborator-ivd",
  "/ecranare-rf-rmn": "/servicii/rf-shielding-rmn",
  "/echipamente-si-aparatura-medicala": "/services/aparatura-medicala",
  "/product-category/consumabile/materiale-pansat": "/produse",
  "/product-category/mentenanta-service/piese-de-schimb-consumabile":
    "/solutii-medicale/suport-tehnic-echipamente",
  "/product-category/mobilier-medical/fotolii-specialitati": "/produse",
  "/product-category/sterilizare/distilatoare-apa": "/produse",
  "/radioprotectie-medicala": "/servicii/radioprotectie",
  "/amenajari-cu-plumb-radiologie": "/amenajari-plumb-radiologie",
  "/oferta-amenajari-plumb-radiologie": "/amenajari-plumb-radiologie",
  "/plumbare-camera-rx": "/amenajari-plumb-radiologie",
  "/roboti-de-curatenie-si-sterilizare-eficienta-si-siguranta-automata": "/produse",
  "/service-ct": "/servicii/service-computer-tomograf",
  "/tag/telemedicine": "/knowledge-hub",
};

const gonePaths = new Set([
  "/*",
  "/one-click-demo-import-log_file_2026-02-24__10-37-36",
  "/wp-content",
  "/wp-includes",
  "/wp-json",
]);

const publicAssetPaths = new Set([
  "/apple-icon.png",
  "/favicon.ico",
  "/hero-medical-tech.png",
  "/icon.png",
  "/logo-zes.png",
  "/logo-zes.webp",
  "/manifest.webmanifest",
]);

function withoutTrailingSlash(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function shouldSkip(pathname: string) {
  return (
    publicAssetPaths.has(pathname) ||
    /\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/i.test(pathname) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/brand/") ||
    pathname.startsWith("/og/") ||
    pathname.startsWith("/product-images/") ||
    pathname.startsWith("/visuals/")
  );
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  if (shouldSkip(pathname)) return NextResponse.next();

  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const normalizedPath = withoutTrailingSlash(pathname);
  const isConstructionHost = host === constructionHost;
  const isConstructionPath =
    normalizedPath === "/constructii" || normalizedPath.startsWith("/constructii/");
  const isLegacyTechnicalArtifact =
    gonePaths.has(normalizedPath) ||
    normalizedPath.startsWith("/wp-content/") ||
    normalizedPath.startsWith("/wp-includes/") ||
    /^\/wp-[^/]+\.php$/i.test(normalizedPath) ||
    nextUrl.searchParams.has("wc-ajax") ||
    nextUrl.searchParams.get("s") === "{search_term_string}";

  if (isLegacyTechnicalArtifact) {
    return new NextResponse(null, {
      status: 410,
      headers: {
        "x-robots-tag": "noindex, nofollow",
      },
    });
  }

  if (isConstructionHost) {
    if (normalizedPath === "/constructii") {
      const target = new URL(`https://${constructionHost}/`);
      target.search = nextUrl.search;
      return NextResponse.redirect(target, 308);
    }

    if (normalizedPath.startsWith("/constructii/")) {
      const target = new URL(
        `https://${constructionHost}${normalizedPath.replace(/^\/constructii/, "")}`,
      );
      target.search = nextUrl.search;
      return NextResponse.redirect(target, 308);
    }

    const target = nextUrl.clone();
    target.pathname = getConstructionInternalPath(normalizedPath);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-zescorp-experience", "constructii");

    return NextResponse.rewrite(target, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  const legacyDestination = legacyRedirects[normalizedPath];
  const shouldCanonicalizeHost = host === "zescorp.ro";

  if (!legacyDestination && !shouldCanonicalizeHost) {
    if (isConstructionPath) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-zescorp-experience", "constructii");

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  }

  const target = new URL(`https://${canonicalHost}${legacyDestination ?? normalizedPath}`);
  target.search = nextUrl.search;

  return NextResponse.redirect(target, 308);
}

function getConstructionInternalPath(pathname: string) {
  if (pathname === "/") return "/constructii";
  if (pathname === "/robots.txt") return "/constructii/robots.txt";
  if (pathname === "/sitemap.xml") return "/constructii/sitemap.xml";
  return `/constructii${pathname}`;
}

export const config = {
  matcher: ["/:path*"],
};
