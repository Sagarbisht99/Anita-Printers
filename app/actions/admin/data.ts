"use server";

import { assertSuperAdmin } from "@/app/lib/admin/guard";
import { getDashboardData } from "@/app/lib/admin/queries";
import { getHeaderStats } from "@/app/lib/admin/header-stats";
import { prisma } from "@/app/lib/db";

export type AdminCategoryRow = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  status: "active" | "non_active";
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  isIndexed: boolean;
  productCount: number;
};

export type AdminProductRow = {
  id: number;
  titleName: string;
  slug: string;
  pricing: string;
  status: "active" | "non_active";
  categoryId: number | null;
  categoryName: string | null;
  descriptionContent: string | null;
  image: string | null;
  imageGallery: string[];
  sizes: string[];
  colors: string[];
  quantities: string[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  isIndexed: boolean;
};

export type AdminOrderRow = {
  id: number;
  customerName: string;
  phoneNumber: string;
  email: string;
  status: "pending" | "cancelled" | "dispatched" | "delivered";
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  productName: string | null;
  createdAt: string;
};

export type AdminEnquiryRow = {
  id: number;
  name: string;
  email: string;
  number: string;
  category: string | null;
  quantity: number | null;
  notes: string | null;
  createdAt: string;
};

export type AdminProductOption = {
  id: number;
  titleName: string;
  pricing: number;
};

export type AdminCategoryOption = {
  id: number;
  name: string;
};

export type PaginationInput = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

function normalizePagination(input?: PaginationInput) {
  const page = Math.max(1, Number(input?.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(input?.pageSize) || 10));
  const search = String(input?.search ?? "").trim();
  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    search,
  };
}

function toPaginated<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number,
): PaginatedResult<T> {
  return {
    items,
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

function nameContains(search: string) {
  return search
    ? { contains: search, mode: "insensitive" as const }
    : undefined;
}

export async function fetchAdminCategories(
  input?: PaginationInput,
): Promise<PaginatedResult<AdminCategoryRow>> {
  await assertSuperAdmin();
  const { page, pageSize, skip, search } = normalizePagination(input);
  const where = search ? { name: nameContains(search) } : undefined;

  const [total, categories] = await Promise.all([
    prisma.category.count({ where }),
    prisma.category.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { products: true } } },
      skip,
      take: pageSize,
    }),
  ]);

  return toPaginated(
    categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image,
      status: category.status,
      description: category.description,
      seoTitle: category.seoTitle,
      seoDescription: category.seoDescription,
      seoKeywords: category.seoKeywords,
      isIndexed: category.isIndexed,
      productCount: category._count.products,
    })),
    total,
    page,
    pageSize,
  );
}

export async function fetchAdminProducts(
  input?: PaginationInput,
): Promise<PaginatedResult<AdminProductRow>> {
  await assertSuperAdmin();
  const { page, pageSize, skip, search } = normalizePagination(input);
  const where = search ? { titleName: nameContains(search) } : undefined;

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { category: { select: { name: true } } },
      skip,
      take: pageSize,
    }),
  ]);

  return toPaginated(
    products.map((product) => ({
      id: product.id,
      titleName: product.titleName,
      slug: product.slug,
      pricing: product.pricing.toString(),
      status: product.status,
      categoryId: product.categoryId,
      categoryName: product.category?.name ?? null,
      descriptionContent: product.descriptionContent,
      image: product.image,
      imageGallery: product.imageGallery,
      sizes: product.sizes,
      colors: product.colors,
      quantities: product.quantities,
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
      seoKeywords: product.seoKeywords,
      isIndexed: product.isIndexed,
    })),
    total,
    page,
    pageSize,
  );
}

export async function fetchAdminCategoryOptions(): Promise<AdminCategoryOption[]> {
  await assertSuperAdmin();

  return prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function fetchAdminProductOptions(): Promise<AdminProductOption[]> {
  await assertSuperAdmin();

  const products = await prisma.product.findMany({
    where: { status: "active" },
    orderBy: { titleName: "asc" },
    select: { id: true, titleName: true, pricing: true },
  });

  return products.map((product) => ({
    id: product.id,
    titleName: product.titleName,
    pricing: Number(product.pricing),
  }));
}

export async function fetchAdminOrders(
  input?: PaginationInput,
): Promise<PaginatedResult<AdminOrderRow>> {
  await assertSuperAdmin();
  const { page, pageSize, skip, search } = normalizePagination(input);
  const where = search
    ? {
        OR: [
          { customerName: nameContains(search) },
          { product: { titleName: nameContains(search) } },
        ],
      }
    : undefined;

  const [total, orders] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { product: { select: { titleName: true } } },
      skip,
      take: pageSize,
    }),
  ]);

  return toPaginated(
    orders.map((order) => ({
      id: order.id,
      customerName: order.customerName,
      phoneNumber: order.phoneNumber,
      email: order.email,
      status: order.status,
      quantity: order.quantity,
      unitPrice: Number(order.unitPrice),
      totalAmount: Number(order.totalAmount),
      productName: order.product?.titleName ?? null,
      createdAt: order.createdAt.toLocaleDateString("en-IN"),
    })),
    total,
    page,
    pageSize,
  );
}

export async function fetchAdminEnquiries(
  input?: PaginationInput,
): Promise<PaginatedResult<AdminEnquiryRow>> {
  await assertSuperAdmin();
  const { page, pageSize, skip, search } = normalizePagination(input);
  const where = search ? { name: nameContains(search) } : undefined;

  const [total, enquiries] = await Promise.all([
    prisma.enquiry.count({ where }),
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
  ]);

  return toPaginated(
    enquiries.map((enquiry) => ({
      id: enquiry.id,
      name: enquiry.name,
      email: enquiry.email,
      number: enquiry.number,
      category: enquiry.category,
      quantity: enquiry.quantity,
      notes: enquiry.notes,
      createdAt: enquiry.createdAt.toLocaleDateString("en-IN"),
    })),
    total,
    page,
    pageSize,
  );
}

export async function fetchAdminDashboard() {
  await assertSuperAdmin();
  return getDashboardData();
}

export async function fetchAdminHeaderStats() {
  await assertSuperAdmin();
  return getHeaderStats();
}
