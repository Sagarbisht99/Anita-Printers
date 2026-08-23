"use client";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`}
      aria-hidden
    />
  );
}

export function TableSkeleton({
  columns,
  rows = 6,
  showMedia,
}: {
  columns: number;
  rows?: number;
  showMedia?: boolean;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-b border-white/[0.06]"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-3.5">
              {showMedia && colIndex === 0 ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-36 max-w-full" />
                    <Skeleton className="h-3 w-24 max-w-[70%]" />
                  </div>
                </div>
              ) : (
                <Skeleton
                  className={`h-3.5 ${
                    colIndex === columns - 1
                      ? "w-16"
                      : colIndex % 2 === 0
                        ? "w-28"
                        : "w-20"
                  }`}
                />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.06] bg-[#161616] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-7 w-14" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-9 w-9 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-5">
          <Skeleton className="mb-5 h-4 w-40" />
          <Skeleton className="h-56 w-full rounded-xl" />
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-5">
          <Skeleton className="mb-5 h-4 w-36" />
          <Skeleton className="mx-auto h-40 w-40 rounded-full" />
          <div className="mt-5 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[80%]" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161616]">
          <div className="border-b border-white/[0.06] px-4 py-3">
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-3 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3.5 flex-1" />
                <Skeleton className="h-3.5 w-16" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-5">
          <Skeleton className="mb-5 h-4 w-36" />
          <Skeleton className="mx-auto h-44 w-44 rounded-full" />
        </div>
      </div>
    </div>
  );
}
