const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://nostalgiatunes.com";

const staticRoutes = [
  "/"
];

function createUrl(path: string) {
  const loc = `${SITE_URL.replace(/\/$/, "")}${path}`;
  const lastmod = new Date().toISOString();
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
}

export async function GET() {
  const urls = staticRoutes.map(createUrl).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

export const runtime = "edge";
