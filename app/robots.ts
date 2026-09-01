import type { MetadataRoute } from "next";
import { isSearchIndexingEnabled } from "@/app/lib/seo/indexing";
import { SITE_URL } from "@/app/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  if (!isSearchIndexingEnabled()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

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
