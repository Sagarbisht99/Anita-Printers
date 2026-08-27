"use client";

import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { ConfirmDeleteModal } from "@/app/components/admin/ui/confirm-delete-modal";
import { AdminPagination } from "@/app/components/admin/ui/pagination";
import { AdminSearchInput } from "@/app/components/admin/ui/search-input";
import { TableSkeleton } from "@/app/components/admin/ui/skeleton";
import { ViewDetailsModal } from "@/app/components/admin/ui/view-details-modal";
import {
  ADMIN_PAGE_SIZE,
  useAdminEnquiries,
  useDeleteEnquiry,
} from "@/app/hooks/admin";
import type { AdminEnquiryRow } from "@/app/actions/admin/data";

export function EnquiriesManager() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, error, isPlaceholderData } =
    useAdminEnquiries(page, search);
  const deleteEnquiry = useDeleteEnquiry();
  const [viewing, setViewing] = useState<AdminEnquiryRow | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AdminEnquiryRow | null>(
    null,
  );

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
      <div className="flex flex-wrap items-center gap-3">
        <AdminSearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search enquiry name..."
        />
        <p className="text-xs text-zinc-500">
          {isLoading ? (
            <span className="inline-block h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
          ) : (
            `${total} enquiries`
          )}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161616]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/[0.06] text-xs tracking-wide text-zinc-500 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Qty</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={6} rows={6} />
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-rose-300">
                  {error.message}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                  {search
                    ? `No enquiries match “${search}”`
                    : "No enquiries yet"}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-white/[0.06] text-zinc-300">
                  <td className="px-4 py-3">{row.createdAt}</td>
                  <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                  <td className="px-4 py-3">{row.number}</td>
                  <td className="px-4 py-3">{row.category ?? "—"}</td>
                  <td className="px-4 py-3">{row.quantity ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-white/10 p-2 hover:bg-white/5"
                        onClick={() => setViewing(row)}
                        aria-label="View enquiry"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={deleteEnquiry.isPending}
                        className="rounded-lg border border-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/10"
                        onClick={() => setPendingDelete(row)}
                        aria-label="Delete enquiry"
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

      <ViewDetailsModal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title="Enquiry details"
        description={viewing ? `Enquiry #${viewing.id}` : undefined}
        fields={
          viewing
            ? [
                { label: "Date", value: viewing.createdAt },
                { label: "Name", value: viewing.name },
                { label: "Email", value: viewing.email },
                { label: "Phone", value: viewing.number },
                { label: "Category", value: viewing.category ?? "—" },
                {
                  label: "Quantity",
                  value:
                    viewing.quantity != null ? String(viewing.quantity) : "—",
                },
                { label: "Notes", value: viewing.notes ?? "—" },
              ]
            : []
        }
      />

      <ConfirmDeleteModal
        open={Boolean(pendingDelete)}
        title="Delete enquiry"
        itemLabel={pendingDelete?.name ?? "this enquiry"}
        loading={deleteEnquiry.isPending}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          deleteEnquiry.mutate(pendingDelete.id, {
            onSettled: () => setPendingDelete(null),
          });
        }}
      />
    </div>
  );
}
