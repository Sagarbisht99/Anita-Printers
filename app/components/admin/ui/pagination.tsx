"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type AdminPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export function AdminPagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  disabled,
}: AdminPaginationProps) {
  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-[#161616] px-4 py-3">
      <p className="text-xs text-zinc-500">
        Showing <span className="text-zinc-300">{from}</span>–
        <span className="text-zinc-300">{to}</span> of{" "}
        <span className="text-zinc-300">{total}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex h-9 items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        <span className="min-w-24 text-center text-sm text-zinc-400">
          Page <span className="font-medium text-white">{page}</span> /{" "}
          {totalPages}
        </span>

        <button
          type="button"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex h-9 items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
