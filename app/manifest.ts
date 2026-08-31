import type { MetadataRoute } from "next";
import { brandLogo } from "@/app/lib/seo/brand-icons";
import { siteConfig } from "@/app/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f3d66",
    lang: "en-IN",
    icons: [
      {
        src: brandLogo.svg,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: brandLogo.favicon48,
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandLogo.favicon52,
        sizes: "52x52",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandLogo.apple,
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandLogo.icon192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandLogo.icon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
