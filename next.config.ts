import type { NextConfig } from "next";

/**
 * Injection-hardening directives only.
 *
 * `default-src` is intentionally absent: it would cascade onto `script-src` and
 * `img-src`, breaking Next's inline hydration scripts and remote ImageKit
 * images. Restricting those properly needs a per-request nonce from `proxy.ts`,
 * which opts every page out of static rendering — revisit if that trade becomes
 * worthwhile.
 */
const contentSecurityPolicy = [
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["pg", "@prisma/adapter-pg"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "www.arcprint.in",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  headers: async () => [
    { source: "/:path*", headers: securityHeaders },
    {
      source: "/admin/:path*",
      headers: [
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
        { key: "Cache-Control", value: "no-store, max-age=0" },
      ],
    },
    {
      source: "/api/:path*",
      headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
    },
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
