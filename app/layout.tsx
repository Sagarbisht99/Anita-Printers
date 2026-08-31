import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ImageKitAppProvider } from "@/app/components/shared/imagekit/provider";
import { getImageKitPublicEnv } from "@/app/lib/imagekit/constants";
import { brandLogo } from "@/app/lib/seo/brand-icons";
import { defaultStoreMetadata } from "@/app/lib/seo/metadata";
import { siteConfig } from "@/app/lib/seo/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/** All tab / touch icons come from public/logo.svg (PNG sizes generated from it). */
export const metadata: Metadata = {
  ...defaultStoreMetadata,
  icons: {
    icon: [
      { url: brandLogo.svg, type: "image/svg+xml" },
      { url: brandLogo.favicon16, sizes: "16x16", type: "image/png" },
      { url: brandLogo.favicon32, sizes: "32x32", type: "image/png" },
      { url: brandLogo.favicon48, sizes: "48x48", type: "image/png" },
      { url: brandLogo.favicon52, sizes: "52x52", type: "image/png" },
      { url: brandLogo.icon192, sizes: "192x192", type: "image/png" },
      { url: brandLogo.icon512, sizes: "512x512", type: "image/png" },
    ],
    shortcut: brandLogo.faviconIco,
    apple: [{ url: brandLogo.apple, sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { urlEndpoint } = getImageKitPublicEnv();

  return (
    <html
      lang="en-IN"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col font-sans"
        suppressHydrationWarning
      >
        <ImageKitAppProvider urlEndpoint={urlEndpoint}>
          {children}
        </ImageKitAppProvider>
      </body>
    </html>
  );
}
