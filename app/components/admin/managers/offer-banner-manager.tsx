"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { ProductImageUploader } from "@/app/components/shared/imagekit/product-image-uploader";
import {
  fetchAdminOfferBanner,
  updateOfferBannerSettings,
} from "@/app/actions/store/site-settings";
import { OFFER_BANNER_FOLDER } from "@/app/lib/imagekit/constants";

export function OfferBannerManager() {
  const [enabled, setEnabled] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchAdminOfferBanner();
        if (cancelled) return;
        setEnabled(data.enabled);
        setImageUrl(data.imageUrl ?? "");
      } catch {
        if (!cancelled) setError("Could not load banner settings.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function onSave() {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await updateOfferBannerSettings({
        enabled,
        imageUrl: imageUrl || null,
      });
      if (result.error) {
        setError(result.error);
        return;
      }
      setMessage("Offer banner settings saved.");
    });
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-white/[0.06] bg-[#161616] px-5 py-10 text-sm text-zinc-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading banner settings…
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              Center offer popup
            </h2>
            <p className="mt-1 max-w-xl text-sm text-zinc-400">
              When enabled, the uploaded image shows as a center popup on the
              storefront (after a short delay). Turn the toggle off to hide it.
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="text-sm font-medium text-zinc-300">
              {enabled ? "Visible" : "Hidden"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              onClick={() => setEnabled((v) => !v)}
              className={`relative h-7 w-12 rounded-full transition ${
                enabled ? "bg-[#1d6fb8]" : "bg-zinc-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition ${
                  enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>

        <div className="mt-6">
          <ProductImageUploader
            mode="single"
            label="Banner image"
            folder={OFFER_BANNER_FOLDER}
            value={imageUrl}
            onChange={(value) =>
              setImageUrl(typeof value === "string" ? value : value[0] ?? "")
            }
          />
        </div>

        {error ? (
          <p className="mt-4 text-sm text-rose-300">{error}</p>
        ) : null}
        {message ? (
          <p className="mt-4 text-sm text-emerald-300">{message}</p>
        ) : null}

        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1d6fb8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#185a96] disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save settings
        </button>
      </div>
    </div>
  );
}
