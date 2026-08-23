import "server-only";
import { assertSuperAdmin } from "@/app/lib/admin/guard";
import { prisma } from "@/app/lib/db";

export async function getDashboardData() {
  await assertSuperAdmin();
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return date;
  });

  const [
    products,
    categories,
    orders,
    enquiries,
    pendingOrders,
    deliveredOrders,
    recentOrders,
    categoryGroups,
    allOrdersForTrend,
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
      include: { product: { select: { titleName: true } } },
    }),
    prisma.product.groupBy({
      by: ["categoryId"],
      _count: { _all: true },
    }),
    prisma.order.findMany({
      where: {
        createdAt: { gte: months[0] },
      },
      select: { createdAt: true },
    }),
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

  const trend = months.map((month) => {
    const label = month.toLocaleString("en-US", { month: "short" });
    const value = allOrdersForTrend.filter((order) => {
      return (
        order.createdAt.getFullYear() === month.getFullYear() &&
        order.createdAt.getMonth() === month.getMonth()
      );
    }).length;
    return { label, value };
  });

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
