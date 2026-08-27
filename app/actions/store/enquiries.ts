"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/db";
import { sendEnquiryAdminEmail } from "@/app/lib/email/resend";
import { revalidatePath } from "next/cache";

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(50),
  email: z
    .string()
    .trim()
    .max(255)
    .refine(
      (value) => value === "" || z.email().safeParse(value).success,
      "Invalid email",
    ),
  category: z.string().trim().max(255).optional(),
  quantity: z.coerce.number().int().positive().optional(),
  notes: z.string().trim().max(5000).optional(),
});

export type SubmitEnquiryState = {
  ok?: boolean;
  error?: string;
};

export async function submitEnquiry(
  input: z.infer<typeof enquirySchema>,
): Promise<SubmitEnquiryState> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message || "Please check the form fields.",
    };
  }

  const data = parsed.data;
  const email = data.email?.trim() || "not-provided@local";

  try {
    await prisma.enquiry.create({
      data: {
        name: data.name,
        email,
        number: data.phone,
        category: data.category || null,
        quantity: data.quantity ?? null,
        notes: data.notes || null,
      },
    });

    await sendEnquiryAdminEmail({
      name: data.name,
      email: data.email || "",
      phone: data.phone,
      category: data.category,
      quantity: data.quantity,
      notes: data.notes,
    });

    revalidatePath("/admin/enquiries");
    return { ok: true };
  } catch (error) {
    console.error("[enquiry] submit failed:", error);
    return { error: "Could not submit enquiry. Please try again." };
  }
}
