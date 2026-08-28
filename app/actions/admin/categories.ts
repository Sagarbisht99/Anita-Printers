"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/app/generated/prisma";
import { assertSuperAdmin, isUnauthorizedError } from "@/app/lib/admin/guard";
import {
  categoryFormSchema,
  recordIdSchema,
} from "@/app/lib/admin/validations";
import { prisma } from "@/app/lib/db";

export type ActionState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function emptyToNull(value?: string | null) {
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

function parseOptionalId(raw: FormDataEntryValue | null) {
  if (raw == null) return undefined;
  const text = String(raw).trim();
  if (!text) return undefined;
  const id = Number(text);
  return Number.isInteger(id) && id > 0 ? id : undefined;
}

export async function saveCategory(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const id = parseOptionalId(formData.get("id"));

    const parsed = categoryFormSchema.safeParse({
      id,
      name: formData.get("name"),
      slug: formData.get("slug"),
      image: String(formData.get("image") ?? "").trim(),
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
    const slugOwner = await prisma.category.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });

    if (slugOwner && slugOwner.id !== data.id) {
      return {
        error: "This slug is already used by another category.",
        fieldErrors: { slug: ["Slug already exists."] },
      };
    }

    const payload = {
      name: data.name,
      slug: data.slug,
      image: emptyToNull(data.image),
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

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: "This slug is already used by another category.",
          fieldErrors: { slug: ["Slug already exists."] },
        };
      }
      if (error.code === "P2025") {
        return { error: "Category not found. Refresh and try again." };
      }
      console.error("saveCategory prisma error", error.code, error.message);
      return { error: `Could not save category (${error.code}).` };
    }

    console.error("saveCategory error", error);
    return { error: "Could not save category. Please try again." };
  }
}

export async function deleteCategory(id: number): Promise<ActionState> {
  try {
    await assertSuperAdmin();

    const parsedId = recordIdSchema.safeParse(id);
    if (!parsedId.success) return { error: "Invalid category." };

    await prisma.category.delete({ where: { id: parsedId.data } });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/dashboard");
    return { ok: true };
  } catch (error) {
    if (isUnauthorizedError(error)) return { error: "Unauthorized." };
    console.error("deleteCategory error", error);
    return { error: "Could not delete category." };
  }
}
