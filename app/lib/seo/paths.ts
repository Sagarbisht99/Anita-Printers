/** Canonical path builders shared by UI, breadcrumbs, JSON-LD and the sitemap. */

export function categoriesIndexPath(): string {
  return "/categories";
}

export function categoryPath(slug: string): string {
  return `/categories/${encodeURIComponent(slug)}`;
}

export function productPath(slug: string): string {
  return `/products/${encodeURIComponent(slug)}`;
}
