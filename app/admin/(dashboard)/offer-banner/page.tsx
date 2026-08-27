import type { Metadata } from "next";
import { OfferBannerManager } from "@/app/components/admin/managers/offer-banner-manager";

export const metadata: Metadata = {
  title: "Offer Banner",
};

export default function OfferBannerPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Offer banner
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Control the center storefront popup image and visibility.
        </p>
      </div>
      <OfferBannerManager />
    </div>
  );
}
