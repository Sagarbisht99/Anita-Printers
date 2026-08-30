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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-store-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <div className="flex min-h-full flex-1 flex-col bg-store-paper pb-14 text-store-ink">
          <StoreTopBar />
          <StoreHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <StoreFooter />
          <StoreFloatChrome />
          <OfferPopup enabled={offer.enabled} imageUrl={offer.imageUrl} />
        </div>
      </QuotePopupProvider>
    </StorefrontQueryProvider>
  );
}
