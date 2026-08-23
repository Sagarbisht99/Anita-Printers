"use client";

type StorePaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export function StorePagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  disabled,
}: StorePaginationProps) {
  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-store-line bg-store-surface px-4 py-3">
      <p className="text-sm text-store-muted">
        Showing <span className="font-medium text-store-ink">{from}</span>–
        <span className="font-medium text-store-ink">{to}</span> of{" "}
        <span className="font-medium text-store-ink">{total}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-full border border-store-line px-4 py-2 text-sm font-medium text-store-ink transition hover:border-store-navy/30 hover:bg-store-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>
        <span className="min-w-24 text-center text-sm text-store-muted">
          Page <span className="font-semibold text-store-navy">{page}</span> /{" "}
          {totalPages}
        </span>
        <button
          type="button"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-full border border-store-line px-4 py-2 text-sm font-medium text-store-ink transition hover:border-store-navy/30 hover:bg-store-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
