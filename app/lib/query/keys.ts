/**
 * Query Key Factory — shared shape for Admin (now) and Frontend (later).
 * Always use these helpers to avoid key mismatches.
 */
export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
  header: () => [...adminKeys.all, "header"] as const,
};

export const categoryKeys = {
  all: [...adminKeys.all, "categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...categoryKeys.lists(), filters ?? {}] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
  options: () => [...categoryKeys.all, "options"] as const,
};

export const productKeys = {
  all: [...adminKeys.all, "products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...productKeys.lists(), filters ?? {}] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  options: () => [...productKeys.all, "options"] as const,
};

export const orderKeys = {
  all: [...adminKeys.all, "orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...orderKeys.lists(), filters ?? {}] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: number) => [...orderKeys.details(), id] as const,
};

export const enquiryKeys = {
  all: [...adminKeys.all, "enquiries"] as const,
  lists: () => [...enquiryKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...enquiryKeys.lists(), filters ?? {}] as const,
};

/** Frontend keys (ready for later — longer staleTime on the FE client) */
export const storefrontKeys = {
  all: ["storefront"] as const,
  products: {
    all: ["storefront", "products"] as const,
    lists: () => [...storefrontKeys.products.all, "list"] as const,
    detail: (slug: string) =>
      [...storefrontKeys.products.all, "detail", slug] as const,
  },
  categories: {
    all: ["storefront", "categories"] as const,
    lists: () => [...storefrontKeys.categories.all, "list"] as const,
  },
};
