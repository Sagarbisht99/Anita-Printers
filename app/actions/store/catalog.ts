"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/db";

/**
 * These actions are public POST endpoints once compiled, so every argument is
 * attacker-controlled. Schemas coerce, clamp and cap instead of throwing so a
 * malformed call degrades to a sane default page rather than a 500.
 */
const MAX_CATEGORIES = 200;

const optionalCategoryId = z.coerce
  .number()
  .int()
  .positive()
  .max(2147483647)
  .nullable()
  .catch(null);

/** Truncate rather than reject so a long paste still returns results. */
const searchTerm = z
  .string()
  .catch("")
  .transform((value) => value.trim().slice(0, 100));

const clampedInt = (min: number, max: number, fallback: number) =>
  z.coerce.number().int().min(min).max(max).catch(fallback);

const productsInputSchema = z.object({
  categoryId: optionalCategoryId,
  take: clampedInt(1, 24, 10),
});

const productsPageInputSchema = z.object({
  categoryId: optionalCategoryId,
  search: searchTerm,
  page: clampedInt(1, 1000, 1),
  pageSize: clampedInt(1, 24, 12),
});

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(255)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i);

const productListSelect = {
  id: true,
  titleName: true,
  slug: true,
  image: true,
  pricing: true,
  quantity: true,
  categoryId: true,
  descriptionContent: true,
  category: { select: { name: true, slug: true } },
} as const;

export type StoreCategoryItem = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
};

export type StoreCategoryCard = StoreCategoryItem & {
  image: string | null;
  productCount: number;
};

export type StoreCategoryDetail = StoreCategoryItem & {
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  isIndexed: boolean;
};

export type StoreProductItem = {
  id: number;
  titleName: string;
  slug: string;
  image: string | null;
  pricing: number;
  quantity: number;
  categoryId: number | null;
  categoryName: string | null;
  categorySlug: string | null;
  /** First sentence of the product description, for cards. */
  shortDescription: string | null;
};

export type StoreProductDetail = StoreProductItem & {
  descriptionContent: string | null;
  imageGallery: string[];
  sizes: string[];
  colors: string[];
  defaultSize: string;
  defaultColor: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  isIndexed: boolean;
};

export type StoreProductsPage = {
  items: StoreProductItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

function firstSentence(text: string | null, max = 140): string | null {
  if (!text) return null;
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return null;
  const match = cleaned.match(/^[^.!?]*[.!?]/);
  const sentence = (match ? match[0] : cleaned).trim();
  return sentence.length > max ? `${sentence.slice(0, max - 1).trimEnd()}…` : sentence;
}

function mapProduct(product: {
  id: number;
  titleName: string;
  slug: string;
  image: string | null;
  pricing: { toString(): string } | number;
  quantity: number;
  categoryId: number | null;
  descriptionContent?: string | null;
  category: { name: string; slug: string } | null;
}): StoreProductItem {
  return {
    id: product.id,
    titleName: product.titleName,
    slug: product.slug,
    image: product.image,
    pricing: Number(product.pricing),
    quantity: Math.max(1, product.quantity || 1),
    categoryId: product.categoryId,
    categoryName: product.category?.name ?? null,
    categorySlug: product.category?.slug ?? null,
    shortDescription: firstSentence(product.descriptionContent ?? null),
  };
}

export async function fetchStoreCategories(): Promise<StoreCategoryItem[]> {
  return prisma.category.findMany({
    where: { status: "active" },
    orderBy: { name: "asc" },
    take: MAX_CATEGORIES,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  });
}

export async function fetchStoreCategoriesWithCovers(): Promise<StoreCategoryCard[]> {
  const categories = await prisma.category.findMany({
    where: { status: "active" },
    orderBy: { name: "asc" },
    take: MAX_CATEGORIES,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      _count: {
        select: {
          products: {
            where: { status: "active" },
          },
        },
      },
      products: {
        where: { status: "active" },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { image: true },
      },
    },
  });

  return categories.map(({ _count, products, ...category }) => ({
    ...category,
    image: products[0]?.image ?? null,
    productCount: _count.products,
  }));
}

const categorySlugSchema = slugSchema;

export async function fetchStoreCategoryBySlug(
  slug: string,
): Promise<StoreCategoryDetail | null> {
  const parsed = categorySlugSchema.safeParse(slug);
  if (!parsed.success) return null;

  return prisma.category.findFirst({
    where: { status: "active", slug: parsed.data },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      seoKeywords: true,
      isIndexed: true,
    },
  });
}

export async function fetchStoreProducts(input?: {
  categoryId?: number | null;
  take?: number;
}): Promise<StoreProductItem[]> {
  const { categoryId, take } = productsInputSchema.parse(input ?? {});

  const products = await prisma.product.findMany({
    where: {
      status: "active",
      ...(categoryId ? { categoryId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take,
    select: productListSelect,
  });

  return products.map(mapProduct);
}

export async function fetchStoreProductsPage(input?: {
  categoryId?: number | null;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<StoreProductsPage> {
  const { categoryId, search, page, pageSize } = productsPageInputSchema.parse(
    input ?? {},
  );
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
      select: productListSelect,
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

export async function fetchStoreProductBySlug(
  slug: string,
): Promise<StoreProductDetail | null> {
  const parsedSlug = slugSchema.safeParse(slug);
  if (!parsedSlug.success) return null;

  const product = await prisma.product.findFirst({
    where: { status: "active", slug: parsedSlug.data },
    select: {
      id: true,
      titleName: true,
      slug: true,
      image: true,
      imageGallery: true,
      pricing: true,
      quantity: true,
      sizes: true,
      colors: true,
      defaultSize: true,
      defaultColor: true,
      descriptionContent: true,
      seoTitle: true,
      seoDescription: true,
      seoKeywords: true,
      isIndexed: true,
      categoryId: true,
      category: { select: { name: true, slug: true } },
    },
  });

  if (!product) return null;

  return {
    ...mapProduct(product),
    descriptionContent: product.descriptionContent,
    imageGallery: product.imageGallery,
    sizes: product.sizes,
    colors: product.colors,
    defaultSize: product.defaultSize?.trim() || "Custom",
    defaultColor: product.defaultColor?.trim() || "Red",
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
    seoKeywords: product.seoKeywords,
    isIndexed: product.isIndexed,
  };
}

/** Used by /sitemap.xml — bounded read of indexable product URLs. */
export async function fetchActiveProductSlugsForSitemap() {
  return prisma.product.findMany({
    where: { status: "active", isIndexed: true },
    select: { slug: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 5000,
  });
}

/** Used by /sitemap.xml — bounded read of indexable category URLs. */
export async function fetchIndexedCategoriesForSitemap() {
  return prisma.category.findMany({
    where: { status: "active", isIndexed: true },
    select: { id: true, name: true, slug: true, createdAt: true },
    orderBy: { name: "asc" },
  });
}

/** Related products in the same category, excluding the current product. */
export async function fetchRelatedStoreProducts(input: {
  categoryId: number | null;
  excludeProductId: number;
  take?: number;
}): Promise<StoreProductItem[]> {
  const take = Math.min(24, Math.max(1, input.take ?? 4));
  if (!input.categoryId) return [];

  const products = await prisma.product.findMany({
    where: {
      status: "active",
      categoryId: input.categoryId,
      NOT: { id: input.excludeProductId },
    },
    orderBy: { createdAt: "desc" },
    take,
    select: productListSelect,
  });

  return products.map(mapProduct);
}

/** Category metadata by slug — used by the category page generateMetadata. */
export async function fetchStoreCategoryMetaBySlug(slug: string) {
  const parsed = categorySlugSchema.safeParse(slug);
  if (!parsed.success) return null;

  return prisma.category.findFirst({
    where: { status: "active", slug: parsed.data },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      seoKeywords: true,
      isIndexed: true,
    },
  });
}

export async function fetchStoreCategoryMeta(categoryId: number) {
  return prisma.category.findFirst({
    where: { id: categoryId, status: "active" },
    select: {
      id: true,
      name: true,
      slug: true,
      seoTitle: true,
      seoDescription: true,
      seoKeywords: true,
      isIndexed: true,
    },
  });
}
