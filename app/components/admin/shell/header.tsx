"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Package,
  Search,
  Settings,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { logout } from "@/app/actions/admin/auth";
import { fetchAdminHeaderStats } from "@/app/actions/admin/data";
import type { HeaderStats } from "@/app/lib/admin/header-stats";
import { adminKeys } from "@/app/lib/query/keys";

type MenuKey = "settings" | "notifications" | "user" | "search" | null;

const titles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your Anita Printers store.",
  },
  "/admin/products": {
    title: "Products",
    subtitle: "Manage catalog items, pricing and images.",
  },
  "/admin/categories": {
    title: "Categories",
    subtitle: "Organize products into categories.",
  },
  "/admin/orders": {
    title: "Orders",
    subtitle: "Track and update customer orders.",
  },
  "/admin/enquiries": {
    title: "Enquiries",
    subtitle: "Leads submitted from the website.",
  },
  "/admin/offer-banner": {
    title: "Offer Banner",
    subtitle: "Toggle and upload the center storefront popup.",
  },
};

const pages = [
  { href: "/admin/dashboard", label: "Dashboard", hint: "Overview" },
  { href: "/admin/products", label: "Products", hint: "Catalog" },
  { href: "/admin/categories", label: "Categories", hint: "Content" },
  { href: "/admin/offer-banner", label: "Offer Banner", hint: "Popup" },
  { href: "/admin/orders", label: "Orders", hint: "Fulfillment" },
  { href: "/admin/enquiries", label: "Enquiries", hint: "Leads" },
];

function useOutsideClose(
  open: MenuKey,
  setOpen: (value: MenuKey) => void,
  refs: Array<React.RefObject<HTMLElement | null>>,
) {
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const inside = refs.some((ref) => ref.current?.contains(target));
      if (!inside) setOpen(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, refs, setOpen]);
}

export function AdminHeader({
  username,
  stats: initialStats,
  onOpenMobileNav,
}: {
  username: string;
  stats: HeaderStats;
  onOpenMobileNav?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<MenuKey>(null);
  const [query, setQuery] = useState("");

  const { data: stats = initialStats } = useQuery({
    queryKey: adminKeys.header(),
    queryFn: fetchAdminHeaderStats,
    initialData: initialStats,
  });

  const settingsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useOutsideClose(open, setOpen, [
    settingsRef,
    notificationsRef,
    userRef,
    searchRef,
  ]);

  const meta =
    titles[pathname] ?? {
      title: "Admin",
      subtitle: "Anita Printers control center",
    };

  const attentionCount = stats.enquiries + stats.pendingOrders;

  const filteredPages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pages;
    return pages.filter(
      (page) =>
        page.label.toLowerCase().includes(q) ||
        page.hint.toLowerCase().includes(q),
    );
  }, [query]);

  const toggle = useCallback((key: MenuKey) => {
    setOpen((current) => (current === key ? null : key));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen("search");
        searchRef.current?.querySelector("input")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function jumpTo(href: string) {
    setQuery("");
    setOpen(null);
    router.push(href);
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] bg-[#0A0A0A]/90 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {onOpenMobileNav ? (
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#161616] text-zinc-300 transition hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : null}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {meta.title}
          </h1>
          <p className="mt-0.5 hidden text-sm text-zinc-500 sm:block">
            {meta.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="hidden items-center gap-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1.5 text-xs font-medium text-[#60A5FA] sm:inline-flex">
          <UserRound className="h-3.5 w-3.5" />
          Super Admin
        </span>

        <div ref={searchRef} className="relative">
          <div className="flex min-w-[140px] items-center gap-2 rounded-full border border-white/[0.06] bg-[#161616] px-3.5 py-2 sm:min-w-[240px]">
            <Search className="h-4 w-4 text-zinc-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen("search");
              }}
              onFocus={() => setOpen("search")}
              placeholder="Jump to page..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
            <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-500 sm:inline">
              ⌘K
            </kbd>
          </div>

          {open === "search" ? (
            <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-[min(100vw-2rem,280px)] overflow-hidden rounded-2xl border border-white/10 bg-[#161616] shadow-2xl">
              <p className="border-b border-white/5 px-3 py-2 text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
                Jump to
              </p>
              <ul className="max-h-64 overflow-y-auto p-1.5">
                {filteredPages.length === 0 ? (
                  <li className="px-3 py-3 text-sm text-zinc-500">No pages found</li>
                ) : (
                  filteredPages.map((page) => (
                    <li key={page.href}>
                      <button
                        type="button"
                        onClick={() => jumpTo(page.href)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-zinc-200 hover:bg-white/5"
                      >
                        <span>{page.label}</span>
                        <span className="text-xs text-zinc-500">{page.hint}</span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ) : null}
        </div>

        <div ref={settingsRef} className="relative">
          <button
            type="button"
            onClick={() => toggle("settings")}
            className={`rounded-full border border-white/[0.06] p-2.5 transition ${
              open === "settings"
                ? "bg-[#3B82F6]/15 text-[#60A5FA]"
                : "bg-[#161616] text-zinc-400 hover:text-white"
            }`}
            aria-label="Settings"
            aria-expanded={open === "settings"}
          >
            <Settings className="h-4 w-4" />
          </button>

          {open === "settings" ? (
            <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#161616] shadow-2xl">
              <p className="border-b border-white/5 px-3 py-2 text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
                Settings
              </p>
              <div className="p-1.5">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setOpen(null)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-zinc-200 hover:bg-white/5"
                >
                  <LayoutDashboard className="h-4 w-4 text-zinc-400" />
                  Go to Dashboard
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setOpen(null)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-zinc-200 hover:bg-white/5"
                >
                  <ExternalLink className="h-4 w-4 text-zinc-400" />
                  View live website
                </Link>
                <Link
                  href="/admin/enquiries"
                  onClick={() => setOpen(null)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-zinc-200 hover:bg-white/5"
                >
                  <MessageSquareText className="h-4 w-4 text-zinc-400" />
                  Manage enquiries
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>

        <div ref={notificationsRef} className="relative">
          <button
            type="button"
            onClick={() => toggle("notifications")}
            className={`relative rounded-full border border-white/[0.06] p-2.5 transition ${
              open === "notifications"
                ? "bg-[#3B82F6]/15 text-[#60A5FA]"
                : "bg-[#161616] text-zinc-400 hover:text-white"
            }`}
            aria-label="Notifications"
            aria-expanded={open === "notifications"}
          >
            <Bell className="h-4 w-4" />
            {attentionCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                {attentionCount > 99 ? "99+" : attentionCount}
              </span>
            ) : null}
          </button>

          {open === "notifications" ? (
            <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-[min(100vw-2rem,300px)] overflow-hidden rounded-2xl border border-white/10 bg-[#161616] shadow-2xl">
              <div className="border-b border-white/5 px-3 py-2.5">
                <p className="text-sm font-medium text-white">Notifications</p>
                <p className="text-xs text-zinc-500">
                  {attentionCount} need attention
                </p>
              </div>
              <ul className="space-y-1 p-2">
                <li className="rounded-xl px-3 py-2.5 hover:bg-white/5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <MessageSquareText className="h-4 w-4 text-zinc-400" />
                      Pending enquiries
                    </div>
                    <span className="text-sm font-semibold text-amber-400">
                      {stats.enquiries}
                    </span>
                  </div>
                  <p className="mt-1 pl-6 text-xs text-zinc-500">
                    Awaiting your response
                  </p>
                </li>
                <li className="rounded-xl px-3 py-2.5 hover:bg-white/5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <ShoppingCart className="h-4 w-4 text-zinc-400" />
                      Pending orders
                    </div>
                    <span className="text-sm font-semibold text-[#60A5FA]">
                      {stats.pendingOrders}
                    </span>
                  </div>
                  <p className="mt-1 pl-6 text-xs text-zinc-500">
                    Need fulfillment update
                  </p>
                </li>
                <li className="rounded-xl px-3 py-2.5 hover:bg-white/5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-200">
                      <Package className="h-4 w-4 text-zinc-400" />
                      Active products
                    </div>
                    <span className="text-sm font-semibold text-emerald-400">
                      {stats.activeProducts}
                    </span>
                  </div>
                  <p className="mt-1 pl-6 text-xs text-zinc-500">
                    Live in catalog
                  </p>
                </li>
              </ul>
              <div className="border-t border-white/5 p-2">
                <Link
                  href="/admin/enquiries"
                  onClick={() => setOpen(null)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-[#60A5FA] hover:bg-white/5"
                >
                  <MessageSquareText className="h-4 w-4" />
                  Review enquiries
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <div ref={userRef} className="relative">
          <button
            type="button"
            onClick={() => toggle("user")}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition ${
              open === "user"
                ? "bg-[#3B82F6] text-white"
                : "bg-[#3B82F6]/20 text-[#93C5FD] hover:bg-[#3B82F6]/30"
            }`}
            aria-label="Account menu"
            aria-expanded={open === "user"}
          >
            AP
          </button>

          {open === "user" ? (
            <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#161616] shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/5 px-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3B82F6]/20 text-xs font-semibold text-[#93C5FD]">
                  AP
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">Super Admin</p>
                  <p className="truncate text-xs text-zinc-500">{username}</p>
                </div>
              </div>
              <div className="p-1.5">
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
