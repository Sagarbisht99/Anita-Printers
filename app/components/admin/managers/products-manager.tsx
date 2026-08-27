"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import {
  ProductForm,
  type ProductFormValues,
} from "@/app/components/admin/forms/product-form";
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
  useAdminCategoryOptions,
  useAdminProducts,
  useDeleteProduct,
} from "@/app/hooks/admin";
import type { AdminProductRow } from "@/app/actions/admin/data";

export function ProductsManager() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, error, isPlaceholderData } =
    useAdminProducts(page, search);
  const { data: categories = [] } = useAdminCategoryOptions();
  const deleteProduct = useDeleteProduct();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProductRow | null>(null);
  const [viewing, setViewing] = useState<AdminProductRow | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AdminProductRow | null>(
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
            placeholder="Search product name..."
          />
          <p className="text-xs text-zinc-500">
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
              </span>
            ) : (
              `${total} products`
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
          Add product
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161616]">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-white/[0.06] text-xs tracking-wide text-zinc-500 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={5} rows={6} showMedia />
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-rose-300">
                  {error.message}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  {search ? `No products match “${search}”` : "No products yet"}
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
                      <div>
                        <p className="font-medium text-white">{row.titleName}</p>
                        <p className="text-xs text-zinc-500">{row.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.categoryName ?? "—"}</td>
                  <td className="px-4 py-3">₹{row.pricing}</td>
                  <td className="px-4 py-3 capitalize">
                    {row.status.replace("_", "-")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-white/10 p-2 hover:bg-white/5"
                        onClick={() => setViewing(row)}
                        aria-label="View product"
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
                        aria-label="Edit product"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={deleteProduct.isPending}
                        className="rounded-lg border border-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/10"
                        onClick={() => setPendingDelete(row)}
                        aria-label="Delete product"
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
        title={editing ? "Edit product" : "Add product"}
        description="Cache invalidates automatically after save."
        size="xl"
      >
        <ProductForm
          initial={editing as ProductFormValues | null}
          categories={categories}
          onSuccess={close}
        />
      </Modal>

      <ViewDetailsModal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title="Product details"
        description={viewing?.slug}
        size="xl"
        images={[
          ...(viewing?.image ? [viewing.image] : []),
          ...(viewing?.imageGallery ?? []),
        ]}
        fields={
          viewing
            ? [
                { label: "Title", value: viewing.titleName },
                { label: "Slug", value: viewing.slug },
                { label: "Price", value: `₹${viewing.pricing}` },
                {
                  label: "Status",
                  value: viewing.status.replace("_", "-"),
                },
                { label: "Category", value: viewing.categoryName },
                {
                  label: "Indexed",
                  value: viewing.isIndexed ? "Yes" : "No",
                },
                {
                  label: "Sizes",
                  value: <ChipList items={viewing.sizes} />,
                  fullWidth: true,
                },
                {
                  label: "Colors",
                  value: <ChipList items={viewing.colors} />,
                  fullWidth: true,
                },
                {
                  label: "Quantities",
                  value: <ChipList items={viewing.quantities} />,
                  fullWidth: true,
                },
                {
                  label: "Description",
                  value: viewing.descriptionContent,
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
        title="Delete product"
        itemLabel={pendingDelete?.titleName ?? "this product"}
        loading={deleteProduct.isPending}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          deleteProduct.mutate(pendingDelete.id, {
            onSettled: () => setPendingDelete(null),
          });
        }}
      />
    </div>
  );
}
