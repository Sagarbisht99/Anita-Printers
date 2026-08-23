"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchAdminCategories,
  fetchAdminCategoryOptions,
  fetchAdminDashboard,
  fetchAdminEnquiries,
  fetchAdminHeaderStats,
  fetchAdminOrders,
  fetchAdminProductOptions,
  fetchAdminProducts,
} from "@/app/actions/admin-data";
import {
  createOrder,
  deleteEnquiry,
  deleteOrder,
  updateOrderStatus,
  type ActionState,
} from "@/app/actions/orders";
import { deleteCategory, saveCategory } from "@/app/actions/categories";
import { deleteProduct, saveProduct } from "@/app/actions/products";
import { useToast } from "@/app/components/admin/ui/toast";
import {
  adminKeys,
  categoryKeys,
  enquiryKeys,
  orderKeys,
  productKeys,
} from "@/app/lib/query/keys";

export const ADMIN_PAGE_SIZE = 10;

class ActionClientError extends Error {
  fieldErrors?: Record<string, string[]>;

  constructor(message: string, fieldErrors?: Record<string, string[]>) {
    const details = fieldErrors
      ? Object.entries(fieldErrors)
          .flatMap(([field, messages]) =>
            messages.map((message) => `${field}: ${message}`),
          )
          .join(" · ")
      : "";
    super(details || message);
    this.name = "ActionClientError";
    this.fieldErrors = fieldErrors;
  }
}

async function ensureOk(result: ActionState) {
  if (result.error) {
    throw new ActionClientError(result.error, result.fieldErrors);
  }
  return result;
}

function invalidateDashboardAndHeader(
  queryClient: ReturnType<typeof useQueryClient>,
) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() }),
    queryClient.invalidateQueries({ queryKey: adminKeys.header() }),
  ]);
}

function isEditForm(formData: FormData) {
  return Boolean(String(formData.get("id") ?? "").trim());
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

/* ---------------- Queries ---------------- */

export function useAdminCategories(
  page: number,
  search = "",
  pageSize = ADMIN_PAGE_SIZE,
) {
  return useQuery({
    queryKey: categoryKeys.list({ page, pageSize, search }),
    queryFn: () => fetchAdminCategories({ page, pageSize, search }),
    placeholderData: keepPreviousData,
  });
}

export function useAdminCategoryOptions() {
  return useQuery({
    queryKey: categoryKeys.options(),
    queryFn: fetchAdminCategoryOptions,
  });
}

export function useAdminProducts(
  page: number,
  search = "",
  pageSize = ADMIN_PAGE_SIZE,
) {
  return useQuery({
    queryKey: productKeys.list({ page, pageSize, search }),
    queryFn: () => fetchAdminProducts({ page, pageSize, search }),
    placeholderData: keepPreviousData,
  });
}

export function useAdminProductOptions() {
  return useQuery({
    queryKey: productKeys.options(),
    queryFn: fetchAdminProductOptions,
  });
}

export function useAdminOrders(
  page: number,
  search = "",
  pageSize = ADMIN_PAGE_SIZE,
) {
  return useQuery({
    queryKey: orderKeys.list({ page, pageSize, search }),
    queryFn: () => fetchAdminOrders({ page, pageSize, search }),
    placeholderData: keepPreviousData,
  });
}

export function useAdminEnquiries(
  page: number,
  search = "",
  pageSize = ADMIN_PAGE_SIZE,
) {
  return useQuery({
    queryKey: enquiryKeys.list({ page, pageSize, search }),
    queryFn: () => fetchAdminEnquiries({ page, pageSize, search }),
    placeholderData: keepPreviousData,
  });
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: fetchAdminDashboard,
  });
}

export function useAdminHeaderStats() {
  return useQuery({
    queryKey: adminKeys.header(),
    queryFn: fetchAdminHeaderStats,
  });
}

/* ---------------- Category mutations ---------------- */

export function useSaveCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (formData: FormData) =>
      ensureOk(await saveCategory({}, formData)),
    onSuccess: async (_data, formData) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
        queryClient.invalidateQueries({ queryKey: productKeys.options() }),
        invalidateDashboardAndHeader(queryClient),
      ]);
      toast.success(
        isEditForm(formData) ? "Category updated" : "Category created",
      );
    },
    onError: (error) => {
      toast.error("Could not save category", errorMessage(error, "Try again."));
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: number) => ensureOk(await deleteCategory(id)),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
        queryClient.invalidateQueries({ queryKey: productKeys.all }),
        invalidateDashboardAndHeader(queryClient),
      ]);
      toast.success("Category deleted");
    },
    onError: (error) => {
      toast.error(
        "Could not delete category",
        errorMessage(error, "Try again."),
      );
    },
  });
}

/* ---------------- Product mutations ---------------- */

export function useSaveProduct() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (formData: FormData) =>
      ensureOk(await saveProduct({}, formData)),
    onSuccess: async (_data, formData) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: productKeys.all }),
        invalidateDashboardAndHeader(queryClient),
      ]);
      toast.success(
        isEditForm(formData) ? "Product updated" : "Product created",
      );
    },
    onError: (error) => {
      toast.error("Could not save product", errorMessage(error, "Try again."));
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: number) => ensureOk(await deleteProduct(id)),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: productKeys.all }),
        queryClient.invalidateQueries({ queryKey: orderKeys.all }),
        invalidateDashboardAndHeader(queryClient),
      ]);
      toast.success("Product deleted");
    },
    onError: (error) => {
      toast.error(
        "Could not delete product",
        errorMessage(error, "Try again."),
      );
    },
  });
}

/* ---------------- Order mutations ---------------- */

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (formData: FormData) =>
      ensureOk(await createOrder({}, formData)),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: orderKeys.all }),
        invalidateDashboardAndHeader(queryClient),
      ]);
      toast.success("Order created");
    },
    onError: (error) => {
      toast.error("Could not create order", errorMessage(error, "Try again."));
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (formData: FormData) =>
      ensureOk(await updateOrderStatus({}, formData)),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: orderKeys.all }),
        invalidateDashboardAndHeader(queryClient),
      ]);
      toast.success("Order status updated");
    },
    onError: (error) => {
      toast.error(
        "Could not update order status",
        errorMessage(error, "Try again."),
      );
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: number) => ensureOk(await deleteOrder(id)),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: orderKeys.all }),
        invalidateDashboardAndHeader(queryClient),
      ]);
      toast.success("Order deleted");
    },
    onError: (error) => {
      toast.error("Could not delete order", errorMessage(error, "Try again."));
    },
  });
}

/* ---------------- Enquiry mutations ---------------- */

export function useDeleteEnquiry() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: number) => ensureOk(await deleteEnquiry(id)),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: enquiryKeys.all }),
        invalidateDashboardAndHeader(queryClient),
      ]);
      toast.success("Enquiry deleted");
    },
    onError: (error) => {
      toast.error(
        "Could not delete enquiry",
        errorMessage(error, "Try again."),
      );
    },
  });
}
