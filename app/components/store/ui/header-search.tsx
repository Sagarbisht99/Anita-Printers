"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreProductsPage } from "@/app/actions/store/catalog";
import { storefrontKeys } from "@/app/lib/query/keys";

function formatInr(amount: number) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export function HeaderSearch({
  className = "",
  inputClassName = "",
}: {
  className?: string;
  inputClassName?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const trimmedQuery = query.trim();
  const debouncedQuery = useDebouncedValue(trimmedQuery, 350);
  const showPanel = open && trimmedQuery.length >= 2;
  const canFetch = debouncedQuery.length >= 2;
  const isDebouncing = trimmedQuery !== debouncedQuery;

  const resultsQuery = useQuery({
    queryKey: storefrontKeys.products.list({
      search: debouncedQuery,
      page: 1,
      pageSize: 6,
      source: "header-search",
    }),
    queryFn: () =>
      fetchStoreProductsPage({
        search: debouncedQuery,
        page: 1,
        pageSize: 6,
      }),
    enabled: canFetch,
  });

  const items = resultsQuery.data?.items ?? [];
  const isLoading =
    isDebouncing ||
    (canFetch && (resultsQuery.isPending || resultsQuery.isFetching));
  const hasError = canFetch && !isDebouncing && resultsQuery.isError;

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function goToProducts(search: string) {
    const q = search.trim();
    setOpen(false);
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          goToProducts(query);
        }}
      >
        <span className="pointer-events-none absolute top-1/2 left-3.5 z-10 -translate-y-1/2 text-store-muted">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (trimmedQuery.length >= 2) setOpen(true);
          }}
          placeholder="Search mugs, bags, water bottle..."
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={showPanel}
          className={`w-full rounded-full border border-store-line bg-store-paper py-2.5 pr-4 pl-10 text-sm text-store-ink outline-none transition placeholder:text-store-muted focus:border-store-navy/40 ${inputClassName}`}
        />
      </form>

      {showPanel ? (
        <div
          id={listId}
          role="listbox"
          className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-50 overflow-hidden rounded-2xl border border-store-line bg-white shadow-[0_18px_40px_-24px_rgba(29,111,184,0.45)]"
        >
          {isLoading ? (
            <p className="px-4 py-3 text-sm text-store-muted">Searching…</p>
          ) : hasError ? (
            <p className="px-4 py-3 text-sm text-rose-600">
              Could not search products. Try again.
            </p>
          ) : items.length === 0 ? (
            <p className="px-4 py-3 text-sm text-store-muted">
              No products found for “{debouncedQuery}”
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {items.map((product) => (
                <li key={product.id} role="option">
                  <Link
                    href={`/products/${encodeURIComponent(product.slug)}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-store-paper"
                  >
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-store-paper">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-store-ink">
                        {product.titleName}
                      </p>
                      <p className="text-xs text-store-muted">
                        From {formatInr(product.pricing)}
                        {product.categoryName
                          ? ` · ${product.categoryName}`
                          : ""}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() => goToProducts(trimmedQuery)}
            className="w-full border-t border-store-line px-4 py-2.5 text-left text-sm font-semibold text-store-navy transition hover:bg-store-paper"
          >
            View all results for “{trimmedQuery}”
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
