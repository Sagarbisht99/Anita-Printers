import type { NextConfig } from "next";
import { SECURITY_HEADERS } from "@/app/lib/security/headers";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["pg", "@prisma/adapter-pg"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "www.arcprint.in" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  headers: async () => [
    { source: "/:path*", headers: [...SECURITY_HEADERS] },
  ],
  redirects: async () => [
    { source: "/quote", destination: "/contact", permanent: true },
    { source: "/quote/:path*", destination: "/contact", permanent: true },
    {
      source: "/artwork-guidelines",
      destination: "/contact",
      permanent: true,
    },
  ],
};

export default nextConfig;
