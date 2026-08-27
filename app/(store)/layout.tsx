import type { Metadata } from "next";
import { getOfferBannerSettings } from "@/app/actions/store/site-settings";
import {
  StoreFloatChrome,
  StoreFooter,
  StoreHeader,
  StoreTopBar,
} from "@/app/components/store/layout";
import {
  OfferPopup,
  QuotePopupProvider,
  StorefrontQueryProvider,
} from "@/app/components/store/ui";

export const metadata: Metadata = {
  title: {
    default: "Anita Printers",
    template: "%s | Anita Printers",
  },
  description:
    "Anita Printers — barcode, sticker, label, tag, letterhead, visiting card, plastic printing, brochures, posters, leaflets, carry bags, boxes, flex, and shadi cards. Offset & screen for corporate, retail, events, and schools.",
};

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const offer = await getOfferBannerSettings();

  return (
    <StorefrontQueryProvider>
      <QuotePopupProvider>
        <div className="flex min-h-full flex-1 flex-col bg-store-paper pb-14 text-store-ink">
          <StoreTopBar />
          <StoreHeader />
          <div className="flex-1">{children}</div>
          <StoreFooter />
          <StoreFloatChrome />
          <OfferPopup enabled={offer.enabled} imageUrl={offer.imageUrl} />
        </div>
      </QuotePopupProvider>
    </StorefrontQueryProvider>
  );
}
