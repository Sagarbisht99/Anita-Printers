import Link from "next/link";

export function RecentOrdersTable({
  orders,
}: {
  orders: {
    id: number;
    customerName: string;
    email: string;
    status: string;
    quantity: number;
    createdAt: string;
    productName: string | null;
  }[];
}) {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[#161616] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="text-xs text-[#60A5FA] hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs tracking-wide text-zinc-500 uppercase">
            <tr className="border-b border-white/[0.06]">
              <th className="px-2 py-3 font-medium">Date</th>
              <th className="px-2 py-3 font-medium">Customer</th>
              <th className="px-2 py-3 font-medium">Product</th>
              <th className="px-2 py-3 font-medium">Qty</th>
              <th className="px-2 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-2 py-8 text-center text-zinc-500">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-white/[0.06] text-zinc-300">
                  <td className="px-2 py-3">{order.createdAt}</td>
                  <td className="px-2 py-3">
                    <div>{order.customerName}</div>
                    <div className="text-xs text-zinc-500">{order.email}</div>
                  </td>
                  <td className="px-2 py-3">{order.productName ?? "—"}</td>
                  <td className="px-2 py-3">{order.quantity}</td>
                  <td className="px-2 py-3 capitalize">{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
