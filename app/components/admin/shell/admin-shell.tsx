"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/app/components/admin/shell/header";
import { AdminSidebar } from "@/app/components/admin/shell/sidebar";
import type { HeaderStats } from "@/app/lib/admin/header-stats";

const COLLAPSE_KEY = "ap-admin-sidebar-collapsed";

export function AdminShell({
  username,
  stats,
  children,
}: {
  username: string;
  stats: HeaderStats;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <div className="admin-theme flex min-h-screen bg-[#0A0A0A] font-sans text-zinc-100 antialiased">
      {/* Desktop sidebar */}
      <div className="sticky top-0 hidden h-screen md:block">
        <AdminSidebar
          username={username}
          enquiryCount={stats.enquiries}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapsed}
        />
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex h-full w-[min(100vw-3rem,280px)] shadow-2xl">
            <AdminSidebar
              username={username}
              enquiryCount={stats.enquiries}
              collapsed={false}
              onCloseMobile={() => setMobileOpen(false)}
            />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          username={username}
          stats={stats}
          onOpenMobileNav={() => setMobileOpen(true)}
        />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
