"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/app/generated/prisma";
import { assertSuperAdmin, isUnauthorizedError } from "@/app/lib/admin/guard";
import {
  productFormSchema,
  recordIdSchema,
} from "@/app/lib/admin/validations";
import { prisma } from "@/app/lib/db";

export type ActionState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function emptyToNull(value?: string) {
  return value && value.trim() ? value.trim() : null;
}

function parseStringArray(raw: FormDataEntryValue | null) {
  if (!raw || typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((v): v is string => typeof v === "string")
      .map((v) => v.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function parseGallery(raw: FormDataEntryValue | null) {
  return parseStringArray(raw);
}

export async function saveProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const categoryRaw = String(formData.get("categoryId") ?? "");
    const parsed = productFormSchema.safeParse({
      id: formData.get("id") || undefined,
      titleName: formData.get("titleName"),
      slug: formData.get("slug"),
      pricing: formData.get("pricing"),
      status: formData.get("status"),
      categoryId: categoryRaw ? categoryRaw : null,
      descriptionContent: formData.get("descriptionContent") ?? "",
      image: formData.get("image") ?? "",
      imageGallery: parseGallery(formData.get("imageGallery")),
      sizes: parseStringArray(formData.get("sizes")),
      colors: parseStringArray(formData.get("colors")),
      quantities: parseStringArray(formData.get("quantities")),
      seoTitle: formData.get("seoTitle") ?? "",
      seoDescription: formData.get("seoDescription") ?? "",
      seoKeywords: parseStringArray(formData.get("seoKeywords")),
      isIndexed:
        formData.get("isIndexed") === "on" ||
        formData.get("isIndexed") === "true",
    });

    if (!parsed.success) {
      return {
        error: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;
    const payload = {
      titleName: data.titleName,
      slug: data.slug,
      pricing: new Prisma.Decimal(data.pricing),
      status: data.status,
      categoryId: data.categoryId ?? null,
      descriptionContent: emptyToNull(data.descriptionContent),
      image: emptyToNull(data.image),
      imageGallery: data.imageGallery,
      sizes: data.sizes,
      colors: data.colors,
      quantities: data.quantities,
      seoTitle: emptyToNull(data.seoTitle),
      seoDescription: emptyToNull(data.seoDescription),
      seoKeywords: data.seoKeywords,
      isIndexed: data.isIndexed,
    };

    if (data.id) {
      await prisma.product.update({ where: { id: data.id }, data: payload });
    } else {
      await prisma.product.create({ data: payload });
    }

    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) return { error: "Unauthorized." };
    console.error(error);
    return { error: "Could not save product. Slug may already exist." };
  }
}

export async function deleteProduct(id: number): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const parsedId = recordIdSchema.safeParse(id);
    if (!parsedId.success) return { error: "Invalid product." };

    await prisma.product.delete({ where: { id: parsedId.data } });
    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) return { error: "Unauthorized." };
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code?: string }).code)
        : "";
    if (code === "P2003") {
      return {
        error:
          "Cannot delete this product because it has existing orders. Cancel or reassign those orders first.",
      };
    }
    console.error(error);
    return { error: "Could not delete product." };
  }
}
