"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function GaRouteListener({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Initial page_view is already sent by gtag('config') in GoogleAnalytics.
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag("config", gaId, { page_path: pagePath });
  }, [gaId, pathname, searchParams]);

  return null;
}

type StoreGoogleAnalyticsProps = {
  gaId: string;
};

/** GA4 for the public storefront — includes App Router client navigations. */
export function StoreGoogleAnalytics({ gaId }: StoreGoogleAnalyticsProps) {
  if (!gaId) return null;

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      <Suspense fallback={null}>
        <GaRouteListener gaId={gaId} />
      </Suspense>
    </>
  );
}
