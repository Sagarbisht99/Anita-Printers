import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/app/lib/seo/breadcrumbs";

const toneClass = {
  light: {
    nav: "text-xs text-store-muted sm:text-sm",
    link: "text-store-muted transition-colors hover:text-store-navy",
    current: "font-medium text-store-navy",
    sep: "text-store-muted/50",
  },
  dark: {
    nav: "text-xs text-white/65 sm:text-sm",
    link: "text-white/65 transition-colors hover:text-white",
    current: "font-medium text-white",
    sep: "text-white/35",
  },
  paper: {
    nav: "text-xs text-store-muted sm:text-sm",
    link: "text-store-muted transition-colors hover:text-store-navy",
    current: "font-medium text-store-ink",
    sep: "text-store-line",
  },
} as const;

export function StoreBreadcrumb({
  items,
  tone = "light",
  className = "",
}: {
  items: BreadcrumbItem[];
  tone?: keyof typeof toneClass;
  className?: string;
}) {
  if (items.length < 2) return null;

  const styles = toneClass[tone];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${styles.nav} ${className}`}
    >
      <ol className="mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 ${styles.sep}`}
                  aria-hidden
                />
              ) : null}
              {isLast || !item.path ? (
                <span className={styles.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={styles.link}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
