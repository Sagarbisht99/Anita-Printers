import "server-only";
import { assertSuperAdmin } from "@/app/lib/admin/guard";
import { prisma } from "@/app/lib/db";

export type HeaderStats = {
  enquiries: number;
  pendingOrders: number;
  activeProducts: number;
};

const emptyStats: HeaderStats = {
  enquiries: 0,
  pendingOrders: 0,
  activeProducts: 0,
};

export async function getHeaderStats(): Promise<HeaderStats> {
  try {
    await assertSuperAdmin();
    const [enquiries, pendingOrders, activeProducts] = await Promise.all([
      prisma.enquiry.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.product.count({ where: { status: "active" } }),
    ]);

    return { enquiries, pendingOrders, activeProducts };
  } catch (error) {
    console.error("[admin] getHeaderStats failed:", error);
    return emptyStats;
  }
}
