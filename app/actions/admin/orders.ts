"use server";

import { revalidatePath } from "next/cache";
import { assertSuperAdmin, isUnauthorizedError } from "@/app/lib/admin/guard";
import {
  orderCreateSchema,
  orderStatusSchema,
  recordIdSchema,
} from "@/app/lib/admin/validations";
import { prisma } from "@/app/lib/db";

export type ActionState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createOrder(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const parsed = orderCreateSchema.safeParse({
      customerName: formData.get("customerName"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      quantity: formData.get("quantity"),
      unitPrice: formData.get("unitPrice"),
      totalAmount: formData.get("totalAmount"),
      productId: formData.get("productId"),
      status: formData.get("status") || "pending",
    });

    if (!parsed.success) {
      return {
        error: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const product = await prisma.product.findUnique({
      where: { id: parsed.data.productId },
      select: { id: true },
    });

    if (!product) {
      return { error: "Selected product was not found." };
    }

    await prisma.order.create({
      data: {
        customerName: parsed.data.customerName,
        phoneNumber: parsed.data.phoneNumber,
        email: parsed.data.email,
        quantity: parsed.data.quantity,
        unitPrice: parsed.data.unitPrice,
        // Always derived server-side from qty × unitPrice.
        totalAmount: parsed.data.totalAmount,
        productId: parsed.data.productId,
        status: parsed.data.status,
      },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) return { error: "Unauthorized." };
    console.error(error);
    return { error: "Could not create order." };
  }
}

export async function updateOrderStatus(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const parsed = orderStatusSchema.safeParse({
      id: formData.get("id"),
      status: formData.get("status"),
    });

    if (!parsed.success) {
      return { error: "Invalid order status update." };
    }

    await prisma.order.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) return { error: "Unauthorized." };
    return { error: "Could not update order." };
  }
}

export async function deleteOrder(id: number): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const parsedId = recordIdSchema.safeParse(id);
    if (!parsedId.success) return { error: "Invalid order." };

    await prisma.order.delete({ where: { id: parsedId.data } });
    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) return { error: "Unauthorized." };
    console.error("deleteOrder error", error);
    return { error: "Could not delete order." };
  }
}

export async function deleteEnquiry(id: number): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const parsedId = recordIdSchema.safeParse(id);
    if (!parsedId.success) return { error: "Invalid enquiry." };

    await prisma.enquiry.delete({ where: { id: parsedId.data } });
    revalidatePath("/admin/enquiries");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) return { error: "Unauthorized." };
    console.error("deleteEnquiry error", error);
    return { error: "Could not delete enquiry." };
  }
}
