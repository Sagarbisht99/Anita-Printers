import { getOfferBannerSettings } from "@/app/actions/store/site-settings";
import {
  StoreFloatChrome,
  StoreFooter,
  StoreHeader,
  StoreTopBar,
} from "@/app/components/store/layout";
import { StoreJsonLd } from "@/app/components/store/seo/store-json-ld";
import {
  OfferPopup,
  QuotePopupProvider,
  StorefrontQueryProvider,
} from "@/app/components/store/ui";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const offer = await getOfferBannerSettings();

  return (
    <StorefrontQueryProvider>
      <QuotePopupProvider>
        <StoreJsonLd />
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
