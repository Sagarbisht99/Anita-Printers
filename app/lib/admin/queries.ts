import "server-only";
import { assertSuperAdmin } from "@/app/lib/admin/guard";
import { prisma } from "@/app/lib/db";

/** Trend buckets follow the business calendar, not the server's locale. */
const STORE_TIME_ZONE = "Asia/Kolkata";
const TREND_MONTHS = 6;

const monthKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: STORE_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
});
const monthLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: STORE_TIME_ZONE,
  month: "short",
});

export async function getDashboardData() {
  await assertSuperAdmin();
  const now = new Date();
  const months = Array.from({ length: TREND_MONTHS }, (_, index) =>
    new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (TREND_MONTHS - 1 - index), 1),
    ),
  );

  // Widen the window by a day so no bucket loses rows to the UTC/IST offset;
  // extra rows fall outside the keyed buckets and are ignored.
  const trendSince = new Date(months[0].getTime() - 24 * 60 * 60 * 1000);

  const [
    products,
    categories,
    orders,
    enquiries,
    pendingOrders,
    deliveredOrders,
    recentOrders,
    categoryGroups,
    ordersPerMonth,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.enquiry.count(),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.order.count({ where: { status: "delivered" } }),
    prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        customerName: true,
        email: true,
        status: true,
        quantity: true,
        createdAt: true,
        product: { select: { titleName: true } },
      },
    }),
    prisma.product.groupBy({
      by: ["categoryId"],
      _count: { _all: true },
    }),
    // Aggregate in Postgres — pulling every order row back just to bucket it
    // by month does not scale.
    prisma.$queryRaw<Array<{ month: string; count: number }>>`
      SELECT
        to_char(
          date_trunc('month', "created_at" AT TIME ZONE ${STORE_TIME_ZONE}),
          'YYYY-MM'
        ) AS month,
        COUNT(*)::int AS count
      FROM "orders"
      WHERE "created_at" >= ${trendSince}
      GROUP BY 1
    `,
  ]);

  const categoryIds = categoryGroups
    .map((g) => g.categoryId)
    .filter((id): id is number => id !== null);

  const categoryRows =
    categoryIds.length > 0
      ? await prisma.category.findMany({
          where: { id: { in: categoryIds } },
          select: { id: true, name: true },
        })
      : [];

  const colors = ["#3B82F6", "#60A5FA", "#93C5FD", "#2563EB", "#1D4ED8"];
  const uncategorized =
    categoryGroups.find((g) => g.categoryId === null)?._count._all ?? 0;

  const categoryDonut = [
    ...categoryRows.map((category, index) => ({
      name: category.name,
      value:
        categoryGroups.find((g) => g.categoryId === category.id)?._count._all ??
        0,
      color: colors[index % colors.length],
    })),
    ...(uncategorized
      ? [{ name: "Uncategorized", value: uncategorized, color: "#64748B" }]
      : []),
  ];

  const ordersByMonth = new Map(
    ordersPerMonth.map((row) => [row.month, Number(row.count)]),
  );

  const trend = months.map((month) => ({
    label: monthLabelFormatter.format(month),
    value: ordersByMonth.get(monthKeyFormatter.format(month)) ?? 0,
  }));

  return {
    stats: {
      products,
      categories,
      orders,
      enquiries,
      pendingOrders,
    },
    fulfillment: {
      delivered: deliveredOrders,
      total: orders,
    },
    trend,
    categoryDonut,
    recentOrders: recentOrders.map((order) => ({
      id: order.id,
      customerName: order.customerName,
      email: order.email,
      status: order.status,
      quantity: order.quantity,
      createdAt: order.createdAt.toLocaleDateString("en-IN"),
      productName: order.product?.titleName ?? null,
    })),
  };
}
