import {
  constructionAllPages,
  constructionLeadCapturePages,
  constructionNationalPages,
  constructionServices,
  getConstructionUrl,
} from "@/data/construction-site";

export const dynamic = "force-static";

export function GET() {
  const now = new Date().toISOString();
  const urls = [
    {
      loc: getConstructionUrl("/"),
      priority: "1.0",
      changefreq: "weekly",
    },
    ...constructionAllPages.map((page) => {
      const isCoreService = constructionServices.some(
        (service) => service.slug === page.slug,
      );

      return {
        loc: getConstructionUrl(`/${page.slug}`),
        priority: getPriority(page.slug, isCoreService),
        changefreq: isCoreService ? "monthly" : "weekly",
      };
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getPriority(slug: string, isCoreService: boolean) {
  if (constructionLeadCapturePages.some((page) => page.slug === slug)) return "0.96";
  if (constructionNationalPages.some((page) => page.slug === slug)) return "0.94";
  if (slug === "renovari-apartamente") return "0.95";
  if (slug === "renovari-apartamente-bucuresti") return "0.95";
  if (slug === "deviz-renovare-apartament-bucuresti") return "0.92";
  if (isCoreService) return "0.9";
  return "0.86";
}
