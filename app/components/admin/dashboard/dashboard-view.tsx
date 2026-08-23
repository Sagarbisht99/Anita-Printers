"use client";

import { CategoryDonut } from "@/app/components/admin/dashboard/category-donut";
import { FulfillmentScore } from "@/app/components/admin/dashboard/fulfillment-score";
import { OrdersTrendChart } from "@/app/components/admin/dashboard/orders-trend-chart";
import { RecentOrdersTable } from "@/app/components/admin/dashboard/recent-orders-table";
import { StatCards } from "@/app/components/admin/dashboard/stat-cards";
import { DashboardSkeleton } from "@/app/components/admin/ui/skeleton";
import { useAdminDashboard } from "@/app/hooks/admin";

export function DashboardView() {
  const { data, isLoading, error, isFetching } = useAdminDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-16 text-center text-sm text-rose-300">
        {error?.message ?? "Failed to load dashboard"}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {isFetching ? (
        <div className="h-3 w-28 overflow-hidden rounded-full bg-white/[0.04]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#3B82F6]/40" />
        </div>
      ) : null}
      <StatCards stats={data.stats} />

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <OrdersTrendChart points={data.trend} />
        <FulfillmentScore
          delivered={data.fulfillment.delivered}
          total={data.fulfillment.total}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <RecentOrdersTable orders={data.recentOrders} />
        <CategoryDonut items={data.categoryDonut} />
      </div>
    </div>
  );
}
