"use server";

import { revalidatePath } from "next/cache";
import { assertSuperAdmin, isUnauthorizedError } from "@/app/lib/admin/guard";
import { categoryFormSchema } from "@/app/lib/admin/validations";
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

export async function saveCategory(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const parsed = categoryFormSchema.safeParse({
      id: formData.get("id") || undefined,
      name: formData.get("name"),
      slug: formData.get("slug"),
      status: formData.get("status"),
      description: formData.get("description") ?? "",
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
      name: data.name,
      slug: data.slug,
      status: data.status,
      description: emptyToNull(data.description),
      seoTitle: emptyToNull(data.seoTitle),
      seoDescription: emptyToNull(data.seoDescription),
      seoKeywords: data.seoKeywords,
      isIndexed: data.isIndexed,
    };

    if (data.id) {
      await prisma.category.update({ where: { id: data.id }, data: payload });
    } else {
      await prisma.category.create({ data: payload });
    }

    revalidatePath("/admin/categories");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) {
      return { error: "Unauthorized." };
    }
    console.error(error);
    return { error: "Could not save category. Slug may already exist." };
  }
}

export async function deleteCategory(id: number): Promise<ActionState> {
  try {
    await assertSuperAdmin();
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) return { error: "Unauthorized." };
    return { error: "Could not delete category." };
  }
}
