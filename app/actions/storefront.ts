"use server";

import { prisma } from "@/app/lib/db";

export type StoreCategoryItem = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
};

export type StoreProductItem = {
  id: number;
  titleName: string;
  slug: string;
  image: string | null;
  pricing: number;
  quantityLabel: string;
  categoryId: number | null;
  categoryName: string | null;
};

export type StoreProductsPage = {
  items: StoreProductItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

function mapProduct(product: {
  id: number;
  titleName: string;
  slug: string;
  image: string | null;
  pricing: { toString(): string } | number;
  quantities: string[];
  categoryId: number | null;
  category: { name: string } | null;
}): StoreProductItem {
  return {
    id: product.id,
    titleName: product.titleName,
    slug: product.slug,
    image: product.image,
    pricing: Number(product.pricing),
    quantityLabel: product.quantities[0]?.trim() || "1",
    categoryId: product.categoryId,
    categoryName: product.category?.name ?? null,
  };
}

export async function fetchStoreCategories(): Promise<StoreCategoryItem[]> {
  return prisma.category.findMany({
    where: { status: "active" },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
    },
  });
}

export async function fetchStoreProducts(input?: {
  categoryId?: number | null;
  take?: number;
}): Promise<StoreProductItem[]> {
  const categoryId =
    typeof input?.categoryId === "number" && input.categoryId > 0
      ? input.categoryId
      : undefined;
  const take = Math.min(24, Math.max(1, input?.take ?? 10));

  const products = await prisma.product.findMany({
    where: {
      status: "active",
      ...(categoryId ? { categoryId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take,
    select: {
      id: true,
      titleName: true,
      slug: true,
      image: true,
      pricing: true,
      quantities: true,
      categoryId: true,
      category: { select: { name: true } },
    },
  });

  return products.map(mapProduct);
}

export async function fetchStoreProductsPage(input?: {
  categoryId?: number | null;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<StoreProductsPage> {
  const categoryId =
    typeof input?.categoryId === "number" && input.categoryId > 0
      ? input.categoryId
      : undefined;
  const search = String(input?.search ?? "").trim();
  const page = Math.max(1, Number(input?.page) || 1);
  const pageSize = Math.min(24, Math.max(1, Number(input?.pageSize) || 12));
  const skip = (page - 1) * pageSize;

  const where = {
    status: "active" as const,
    ...(categoryId ? { categoryId } : {}),
    ...(search
      ? {
          titleName: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        titleName: true,
        slug: true,
        image: true,
        pricing: true,
        quantities: true,
        categoryId: true,
        category: { select: { name: true } },
      },
    }),
  ]);

  return {
    items: products.map(mapProduct),
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
