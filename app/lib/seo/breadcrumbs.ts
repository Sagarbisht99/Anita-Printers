/** Shared breadcrumb trail helpers for UI + JSON-LD. */

export type BreadcrumbItem = {
  name: string;
  /** Omit path on the current (last) crumb. */
  path?: string;
};

export function homeCrumb(): BreadcrumbItem {
  return { name: "Home", path: "/" };
}

export function trail(...items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [homeCrumb(), ...items];
}

/** Convert UI crumbs to schema paths (last item still needs a path for JSON-LD). */
export function crumbsForSchema(
  items: BreadcrumbItem[],
  currentPath: string,
): Array<{ name: string; path: string }> {
  return items.map((item, index) => ({
    name: item.name,
    path:
      item.path ??
      (index === items.length - 1 ? currentPath : "/"),
  }));
}
