import type { Metadata } from "next";
import { QuotePopupProvider } from "@/app/components/storefront/quote-popup";
import { StoreFooter } from "@/app/components/storefront/store-footer";
import { StoreHeader } from "@/app/components/storefront/store-header";
import { StorefrontQueryProvider } from "@/app/components/storefront/query-provider";

export const metadata: Metadata = {
  title: {
    default: "Anita Printers",
    template: "%s | Anita Printers",
  },
  description:
    "High-volume B2B printing & custom apparel — bulk cards, stationery, promotional merch, GST invoices, and pan-India delivery.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StorefrontQueryProvider>
      <QuotePopupProvider>
        <div className="flex min-h-full flex-1 flex-col bg-store-paper text-store-ink">
          <StoreHeader />
          <div className="flex-1">{children}</div>
          <StoreFooter />
        </div>
      </QuotePopupProvider>
    </StorefrontQueryProvider>
  );
}
