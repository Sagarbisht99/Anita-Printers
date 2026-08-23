import Link from "next/link";
import {
  FolderTree,
  MessageSquareText,
  Package,
  ShoppingCart,
  Truck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export type DashboardStats = {
  products: number;
  categories: number;
  orders: number;
  enquiries: number;
  pendingOrders: number;
};

export function StatCards({ stats }: { stats: DashboardStats }) {
  const items = [
    {
      label: "Products",
      value: stats.products,
      hint: "Active catalog",
      icon: Package,
      href: "/admin/products",
      up: true,
    },
    {
      label: "Categories",
      value: stats.categories,
      hint: "Catalog groups",
      icon: FolderTree,
      href: "/admin/categories",
      up: true,
    },
    {
      label: "Orders",
      value: stats.orders,
      hint: "All orders",
      icon: ShoppingCart,
      href: "/admin/orders",
      up: stats.orders > 0,
    },
    {
      label: "Pending",
      value: stats.pendingOrders,
      hint: "Need attention",
      icon: Truck,
      href: "/admin/orders",
      up: false,
    },
    {
      label: "Enquiries",
      value: stats.enquiries,
      hint: "All inquiries",
      icon: MessageSquareText,
      href: "/admin/enquiries",
      up: stats.enquiries > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;
        const Trend = item.up ? TrendingUp : TrendingDown;
        return (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-2xl border border-white/[0.06] bg-[#161616] p-4 transition hover:border-[#3B82F6]/35 hover:bg-[#1A1A1A]"
          >
            <div className="mb-4 flex items-start justify-between">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-500 uppercase">
                {item.label}
              </p>
              <div className="rounded-lg border border-[#3B82F6]/25 bg-[#3B82F6]/10 p-1.5 text-[#60A5FA]">
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>
            <p className="text-3xl font-semibold tracking-tight text-white">
              {item.value}
            </p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-xs text-zinc-500">{item.hint}</p>
              <Trend
                className={`h-3.5 w-3.5 ${item.up ? "text-emerald-400" : "text-rose-400"}`}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
