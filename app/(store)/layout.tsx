import type { Metadata } from "next";
import { OfferPopup } from "@/app/components/storefront/offer-popup";
import { QuotePopupProvider } from "@/app/components/storefront/quote-popup";
import { StoreFloatChrome } from "@/app/components/storefront/store-float-chrome";
import { StoreFooter } from "@/app/components/storefront/store-footer";
import { StoreHeader } from "@/app/components/storefront/store-header";
import { StoreTopBar } from "@/app/components/storefront/store-top-bar";
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
        <div className="flex min-h-full flex-1 flex-col bg-store-paper pb-14 text-store-ink">
          <StoreTopBar />
          <StoreHeader />
          <div className="flex-1">{children}</div>
          <StoreFooter />
          <StoreFloatChrome />
          <OfferPopup />
        </div>
      </QuotePopupProvider>
    </StorefrontQueryProvider>
  );
}
