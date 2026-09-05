import { z } from "zod";

/** Row identifier arriving from a client call — never trust it raw. */
export const recordIdSchema = z.coerce.number().int().positive().max(2147483647);

const optionalText = z.string().trim().max(5000).optional().or(z.literal(""));
const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^https?:\/\/.+/i.test(value),
    "Enter a valid image URL",
  );
const boolFromForm = z
  .union([z.boolean(), z.literal("true"), z.literal("false"), z.literal("on")])
  .transform((value) => value === true || value === "true" || value === "on");

export const categoryFormSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().trim().min(2).max(255),
  slug: z.string().trim().min(2).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(["active", "non_active"]),
  description: optionalText,
  seoTitle: z.string().trim().max(255).optional().or(z.literal("")),
  seoDescription: optionalText,
  seoKeywords: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
  isIndexed: boolFromForm.default(true),
});

export const productFormSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  titleName: z.string().trim().min(2).max(255),
  slug: z.string().trim().min(2).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  pricing: z.coerce.number().positive().max(99999999.99),
  status: z.enum(["active", "non_active"]),
  categoryId: z.coerce.number().int().positive().nullable().optional(),
  descriptionContent: z.string().trim().max(20000).optional().or(z.literal("")),
  image: optionalUrl,
  imageGallery: z.array(z.string().url()).max(24).default([]),
  sizes: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
  colors: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
  quantity: z.coerce.number().int().min(1).max(1000000).default(1),
  seoTitle: z.string().trim().max(255).optional().or(z.literal("")),
  seoDescription: optionalText,
  seoKeywords: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
  isIndexed: boolFromForm.default(true),
});

export const orderStatusSchema = z.object({
  id: recordIdSchema,
  status: z.enum(["pending", "cancelled", "dispatched", "delivered"]),
});

export const orderCreateSchema = z
  .object({
    customerName: z.string().trim().min(2).max(255),
    phoneNumber: z.string().trim().min(7).max(50),
    email: z.string().trim().email().max(255),
    quantity: z.coerce.number().int().positive().max(100000),
    unitPrice: z.coerce.number().positive().max(99999999.99),
    totalAmount: z.coerce.number().positive().max(9999999999.99).optional(),
    productId: z.coerce.number().int().positive(),
    status: z
      .enum(["pending", "cancelled", "dispatched", "delivered"])
      .default("pending"),
  })
  .transform((data) => {
    const computed =
      Math.round(data.quantity * data.unitPrice * 100) / 100;
    return {
      ...data,
      totalAmount: computed,
    };
  });

export type CategoryFormInput = z.infer<typeof categoryFormSchema>;
export type ProductFormInput = z.infer<typeof productFormSchema>;
export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
