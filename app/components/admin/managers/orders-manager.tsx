"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Plus, Trash2 } from "lucide-react";
import { OrderForm } from "@/app/components/admin/forms/order-form";
import { Button } from "@/app/components/admin/ui/button";
import { ConfirmDeleteModal } from "@/app/components/admin/ui/confirm-delete-modal";
import { Modal } from "@/app/components/admin/ui/modal";
import { AdminPagination } from "@/app/components/admin/ui/pagination";
import { Select } from "@/app/components/admin/ui/field";
import { AdminSearchInput } from "@/app/components/admin/ui/search-input";
import { TableSkeleton } from "@/app/components/admin/ui/skeleton";
import { ViewDetailsModal } from "@/app/components/admin/ui/view-details-modal";
import {
  ADMIN_PAGE_SIZE,
  useAdminOrders,
  useAdminProductOptions,
  useDeleteOrder,
  useUpdateOrderStatus,
} from "@/app/hooks/admin";
import type { AdminOrderRow } from "@/app/actions/admin-data";

function OrderStatusForm({ order }: { order: AdminOrderRow }) {
  const updateStatus = useUpdateOrderStatus();

  return (
    <Select
      name="status"
      value={order.status}
      disabled={updateStatus.isPending}
      className="!h-9 min-w-36"
      onChange={(e) => {
        const status = e.target.value as AdminOrderRow["status"];
        if (status === order.status) return;
        const formData = new FormData();
        formData.set("id", String(order.id));
        formData.set("status", status);
        void updateStatus.mutateAsync(formData);
      }}
    >
      <option value="pending">Pending</option>
      <option value="dispatched">Dispatched</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </Select>
  );
}

export function OrdersManager() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, error, isPlaceholderData } =
    useAdminOrders(page, search);
  const { data: products = [] } = useAdminProductOptions();
  const deleteOrder = useDeleteOrder();
  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState<AdminOrderRow | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AdminOrderRow | null>(
    null,
  );
  const close = useCallback(() => setOpen(false), []);

  const rows = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const pageSize = data?.pageSize ?? ADMIN_PAGE_SIZE;

  useEffect(() => {
    if (data && page > data.totalPages) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <AdminSearchInput
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search customer or product..."
          />
          <p className="text-xs text-zinc-500">
            {isLoading ? (
              <span className="inline-block h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
            ) : (
              `${total} orders`
            )}
          </p>
        </div>
        <Button type="button" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          Add order
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161616]">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="border-b border-white/[0.06] text-xs tracking-wide text-zinc-500 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Qty</th>
              <th className="px-4 py-3 font-medium">Unit ₹</th>
              <th className="px-4 py-3 font-medium">Total ₹</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={8} rows={6} />
            ) : error ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-rose-300">
                  {error.message}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-zinc-500">
                  {search
                    ? `No orders match “${search}”`
                    : "No orders yet — create one manually"}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-white/[0.06] text-zinc-300">
                  <td className="px-4 py-3">{row.createdAt}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{row.customerName}</p>
                    <p className="text-xs text-zinc-500">{row.email}</p>
                    <p className="text-xs text-zinc-500">{row.phoneNumber}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span>{row.productName ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3">{row.quantity}</td>
                  <td className="px-4 py-3">
                    ₹
                    {row.unitPrice.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    ₹
                    {row.totalAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusForm order={row} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-white/10 p-2 hover:bg-white/5"
                        onClick={() => setViewing(row)}
                        aria-label="View order"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={deleteOrder.isPending}
                        className="rounded-lg border border-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/10"
                        onClick={() => setPendingDelete(row)}
                        aria-label="Delete order"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminPagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
        disabled={isPlaceholderData || isFetching}
      />

      <Modal
        open={open}
        onClose={close}
        title="Create order"
        description="Manually add a customer order from admin."
        size="lg"
      >
        <OrderForm products={products} onSuccess={close} />
      </Modal>

      <ViewDetailsModal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title="Order details"
        description={viewing ? `Order #${viewing.id}` : undefined}
        fields={
          viewing
            ? [
                { label: "Date", value: viewing.createdAt },
                { label: "Status", value: viewing.status },
                { label: "Customer", value: viewing.customerName },
                { label: "Email", value: viewing.email },
                { label: "Phone", value: viewing.phoneNumber },
                { label: "Quantity", value: viewing.quantity },
                {
                  label: "Unit price",
                  value: `₹${viewing.unitPrice.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                },
                {
                  label: "Total amount",
                  value: `₹${viewing.totalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                },
                {
                  label: "Product",
                  value: viewing.productName,
                  fullWidth: true,
                },
              ]
            : []
        }
      />

      <ConfirmDeleteModal
        open={Boolean(pendingDelete)}
        title="Delete order"
        itemLabel={
          pendingDelete
            ? `${pendingDelete.customerName} — ${pendingDelete.productName ?? "order"}`
            : "this order"
        }
        loading={deleteOrder.isPending}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          deleteOrder.mutate(pendingDelete.id, {
            onSettled: () => setPendingDelete(null),
          });
        }}
      />
    </div>
  );
}
