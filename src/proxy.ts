import { NextResponse, type NextRequest } from "next/server";

const GOOD_SEARCH_BOTS = /\b(googlebot|bingbot|google-inspectiontool|adsbot-google)\b/i;
const BAD_BOTS =
  /\b(ahrefsbot|semrushbot|mj12bot|dotbot|blexbot|petalbot|bytespider|amazonbot|claudebot|gptbot|ccbot|scrapy|python-requests|curl|wget|sqlmap|nikto)\b/i;

const LEGACY_SPAM_PATHS = [
  /^\/wp-/i,
  /^\/wp-content/i,
  /^\/wp-json/i,
  /^\/xmlrpc\.php$/i,
  /^\/administrator/i,
  /^\/adminer/i,
  /^\/phpmyadmin/i,
  /^\/\.env/i,
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") ?? "";

  if (GOOD_SEARCH_BOTS.test(userAgent)) {
    return NextResponse.next();
  }

  if (BAD_BOTS.test(userAgent) || LEGACY_SPAM_PATHS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api/product-assets|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|site.webmanifest|icons|visuals|images|product-images|product-documents|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|pdf)$).*)",
  ],
};
