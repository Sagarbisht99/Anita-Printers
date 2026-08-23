import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ImageKitAppProvider } from "@/app/components/imagekit/provider";
import { getImageKitPublicEnv } from "@/app/lib/imagekit/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anita Printers",
  description: "Anita Printers",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { urlEndpoint } = getImageKitPublicEnv();

  return (
    <html
      lang="en"
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
