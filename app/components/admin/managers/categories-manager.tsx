"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import {
  CategoryForm,
  type CategoryFormValues,
} from "@/app/components/admin/forms/category-form";
import { Button } from "@/app/components/admin/ui/button";
import { ConfirmDeleteModal } from "@/app/components/admin/ui/confirm-delete-modal";
import { Modal } from "@/app/components/admin/ui/modal";
import { AdminPagination } from "@/app/components/admin/ui/pagination";
import { AdminSearchInput } from "@/app/components/admin/ui/search-input";
import { TableSkeleton } from "@/app/components/admin/ui/skeleton";
import {
  ChipList,
  ViewDetailsModal,
} from "@/app/components/admin/ui/view-details-modal";
import {
  ADMIN_PAGE_SIZE,
  useAdminCategories,
  useDeleteCategory,
} from "@/app/hooks/admin";
import type { AdminCategoryRow } from "@/app/actions/admin/data";

export function CategoriesManager() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, error, isPlaceholderData } =
    useAdminCategories(page, search);
  const deleteCategory = useDeleteCategory();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategoryRow | null>(null);
  const [viewing, setViewing] = useState<AdminCategoryRow | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AdminCategoryRow | null>(
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

  const close = useCallback(() => {
    setOpen(false);
    setEditing(null);
  }, []);

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
            placeholder="Search category name..."
          />
          <p className="text-xs text-zinc-500">
            {isLoading ? (
              <span className="inline-block h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
            ) : (
              `${total} categories`
            )}
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add category
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161616]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/[0.06] text-xs tracking-wide text-zinc-500 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Products</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={5} rows={6} />
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-rose-300">
                  {error.message}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  {search ? `No categories match “${search}”` : "No categories yet"}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-white/[0.06] text-zinc-300">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {row.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={row.image}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-white/5" />
                      )}
                      <span className="font-medium text-white">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.slug}</td>
                  <td className="px-4 py-3 capitalize">
                    {row.status.replace("_", "-")}
                  </td>
                  <td className="px-4 py-3">{row.productCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-white/10 p-2 hover:bg-white/5"
                        onClick={() => setViewing(row)}
                        aria-label="View category"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-white/10 p-2 hover:bg-white/5"
                        onClick={() => {
                          setEditing(row);
                          setOpen(true);
                        }}
                        aria-label="Edit category"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={deleteCategory.isPending}
                        className="rounded-lg border border-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/10"
                        onClick={() => setPendingDelete(row)}
                        aria-label="Delete category"
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
        title={editing ? "Edit category" : "Add category"}
        description="TanStack Query invalidates the list after save."
        size="lg"
      >
        <CategoryForm
          key={editing?.id ?? "new-category"}
          initial={editing as CategoryFormValues | null}
          onSuccess={close}
        />
      </Modal>

      <ViewDetailsModal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title="Category details"
        description={viewing?.slug}
        fields={
          viewing
            ? [
                {
                  label: "Image",
                  value: viewing.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={viewing.image}
                      alt=""
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                  ) : (
                    "—"
                  ),
                },
                { label: "Name", value: viewing.name },
                { label: "Slug", value: viewing.slug },
                {
                  label: "Status",
                  value: viewing.status.replace("_", "-"),
                },
                { label: "Products", value: viewing.productCount },
                {
                  label: "Indexed",
                  value: viewing.isIndexed ? "Yes" : "No",
                },
                {
                  label: "Description",
                  value: viewing.description,
                  fullWidth: true,
                },
                { label: "SEO Title", value: viewing.seoTitle, fullWidth: true },
                {
                  label: "SEO Description",
                  value: viewing.seoDescription,
                  fullWidth: true,
                },
                {
                  label: "SEO Keywords",
                  value: <ChipList items={viewing.seoKeywords} />,
                  fullWidth: true,
                },
              ]
            : []
        }
        footer={
          viewing ? (
            <Button
              type="button"
              onClick={() => {
                setEditing(viewing);
                setViewing(null);
                setOpen(true);
              }}
            >
              Edit
            </Button>
          ) : null
        }
      />

      <ConfirmDeleteModal
        open={Boolean(pendingDelete)}
        title="Delete category"
        itemLabel={pendingDelete?.name ?? "this category"}
        loading={deleteCategory.isPending}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          deleteCategory.mutate(pendingDelete.id, {
            onSettled: () => setPendingDelete(null),
          });
        }}
      />
    </div>
  );
}
