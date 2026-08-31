import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/seo/site";

/**
 * Public storefront is crawlable. Only block admin, APIs, and the /quote redirect.
 * Indexable URLs are also listed in /sitemap.xml.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin-login", "/api/", "/quote"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
