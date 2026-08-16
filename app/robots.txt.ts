const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://nostalgiatunes.com";

const TXT = `User-agent: *
Disallow: /api/
Disallow: /panel/
Allow: /

Sitemap: ${SITE_URL.replace(/\/$/, "")}/sitemap.xml
`;

export async function GET() {
  return new Response(TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

export const runtime = "edge";
