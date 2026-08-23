"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  FolderTree,
  LayoutDashboard,
  MessageSquareText,
  Package,
  ShoppingCart,
  X,
} from "lucide-react";

const menu = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

const content = [
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
];

const account = [
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquareText },
];

function NavLink({
  href,
  label,
  icon: Icon,
  showBadge,
  collapsed,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  showBadge?: boolean;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      onClick={onNavigate}
      className={`relative flex items-center rounded-full text-sm transition ${
        collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3.5 py-2.5"
      } ${
        active
          ? "bg-[#3B82F6] font-medium text-white"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed ? <span className="flex-1">{label}</span> : null}
      {!collapsed && showBadge ? (
        <span className="h-2 w-2 rounded-full bg-rose-500" aria-hidden />
      ) : null}
      {collapsed && showBadge ? (
        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
      ) : null}
    </Link>
  );
}

function NavGroup({
  title,
  items,
  enquiryCount = 0,
  collapsed,
  onNavigate,
}: {
  title: string;
  items: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  enquiryCount?: number;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div>
      {!collapsed ? (
        <p className="mb-2 px-3.5 text-[10px] font-semibold tracking-[0.14em] text-zinc-500 uppercase">
          {title}
        </p>
      ) : (
        <div className="mx-auto mb-2 h-px w-6 bg-white/10" />
      )}
      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            collapsed={collapsed}
            onNavigate={onNavigate}
            showBadge={item.href === "/admin/enquiries" && enquiryCount > 0}
          />
        ))}
      </nav>
    </div>
  );
}

export function AdminSidebar({
  username,
  enquiryCount = 0,
  collapsed = false,
  onToggleCollapse,
  onCloseMobile,
}: {
  username: string;
  enquiryCount?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
}) {
  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-white/[0.06] bg-[#0F0F0F] py-5 transition-[width] duration-200 ${
        collapsed ? "w-[76px] px-2" : "w-[260px] px-3"
      }`}
    >
      <div
        className={`mb-6 flex items-center px-1 ${
          collapsed ? "flex-col gap-3" : "gap-3 px-2"
        }`}
      >
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-white/15">
          <Image
            src="/favicon.png"
            alt="Anita Printers"
            width={44}
            height={44}
            className="h-full w-full scale-[1.15] object-cover"
            priority
          />
        </div>
        {!collapsed ? (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Anita Printers
            </p>
            <p className="truncate text-[11px] text-zinc-500">Admin Console</p>
          </div>
        ) : null}
        {onCloseMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg border border-white/10 p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="space-y-6 overflow-y-auto pb-4">
        <NavGroup
          title="Menu"
          items={menu}
          collapsed={collapsed}
          onNavigate={onCloseMobile}
        />
        <NavGroup
          title="Content"
          items={content}
          collapsed={collapsed}
          onNavigate={onCloseMobile}
        />
        <NavGroup
          title="Account"
          items={account}
          enquiryCount={enquiryCount}
          collapsed={collapsed}
          onNavigate={onCloseMobile}
        />
      </div>

      <div className="mt-auto space-y-3 pt-4">
        {!collapsed ? (
          <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-3.5">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-500 uppercase">
              Signed in
            </p>
            <p className="mt-2 truncate text-sm font-medium text-white">
              {username}
            </p>
            <p className="text-xs text-[#60A5FA]">Super Admin</p>
          </div>
        ) : null}

        {onToggleCollapse ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`flex w-full items-center rounded-full border border-white/10 py-2 text-xs text-zinc-400 transition hover:bg-white/5 hover:text-white ${
              collapsed ? "justify-center px-0" : "justify-between px-3.5"
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {!collapsed ? <span>Collapse</span> : null}
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        ) : null}
      </div>
    </aside>
  );
}
