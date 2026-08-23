import type { Metadata } from "next";
import { StoreFooter } from "@/app/components/storefront/store-footer";
import { StoreHeader } from "@/app/components/storefront/store-header";
import { StorefrontQueryProvider } from "@/app/components/storefront/query-provider";

export const metadata: Metadata = {
  title: {
    default: "Anita Printers",
    template: "%s | Anita Printers",
  },
  description:
    "Custom printing for visiting cards, apparel, gifts, stationery, and marketing materials.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StorefrontQueryProvider>
      <div className="flex min-h-full flex-1 flex-col bg-store-paper text-store-ink">
        <StoreHeader />
        <div className="flex-1">{children}</div>
        <StoreFooter />
      </div>
    </StorefrontQueryProvider>
  );
}
