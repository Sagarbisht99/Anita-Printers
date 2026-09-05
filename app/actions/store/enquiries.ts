"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/db";
import { sendEnquiryAdminEmail } from "@/app/lib/email/resend";
import { sanitizeText } from "@/app/lib/security/sanitize";
import { clientIp, consumeRateLimit } from "@/app/lib/security/rate-limit";
import {
  createMathCaptcha,
  verifyMathCaptcha,
} from "@/app/lib/security/enquiry-captcha";
import { revalidatePath } from "next/cache";

const enquirySchema = z.object({
  name: z
    .string()
    .transform((value) => sanitizeText(value, 255))
    .pipe(z.string().min(1, "Name is required")),
  phone: z
    .string()
    .transform((value) => sanitizeText(value, 50))
    .pipe(z.string().min(7, "Phone is required")),
  email: z
    .string()
    .transform((value) => sanitizeText(value, 255))
    .refine(
      (value) => value === "" || z.email().safeParse(value).success,
      "Invalid email",
    ),
  category: z
    .string()
    .transform((value) => sanitizeText(value, 255))
    .optional(),
  quantity: z.coerce.number().int().positive().optional(),
  notes: z
    .string()
    .transform((value) => sanitizeText(value, 5000))
    .optional(),
  /** Bots fill this; humans never see it. */
  website: z.string().max(200).optional(),
  captchaToken: z.string().min(1, "Please complete the captcha."),
  captchaAnswer: z.union([z.string(), z.number()]),
});

export type SubmitEnquiryState = {
  ok?: boolean;
  error?: string;
};

export async function getEnquiryCaptcha(): Promise<{
  a: number;
  b: number;
  token: string;
}> {
  return createMathCaptcha();
}

export async function submitEnquiry(
  input: z.infer<typeof enquirySchema>,
): Promise<SubmitEnquiryState> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message || "Please check the form fields.",
    };
  }

  // Silent success for honeypot hits — don't tip off scrapers.
  if (parsed.data.website?.trim()) {
    return { ok: true };
  }

  if (
    !verifyMathCaptcha({
      token: parsed.data.captchaToken,
      answer: parsed.data.captchaAnswer,
    })
  ) {
    return { error: "Captcha incorrect. Please try again." };
  }

  // Public endpoint: throttle before touching the DB or the mail provider.
  const ip = await clientIp();
  const limited = consumeRateLimit({
    key: `enquiry:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limited.ok) {
    return {
      error: `Too many requests. Please try again in ${limited.retryAfterSec}s.`,
    };
  }

  const data = parsed.data;
  const email = data.email?.trim() || null;

  try {
    await prisma.enquiry.create({
      data: {
        name: data.name,
        email: email ?? "not-provided@local",
        number: data.phone,
        category: data.category || null,
        quantity: data.quantity ?? null,
        notes: data.notes || null,
      },
    });
  } catch (error) {
    console.error("[enquiry] save failed:", error);
    return { error: "Could not submit enquiry. Please try again." };
  }

  // Enquiry is already persisted — a mail failure must not fail the request.
  try {
    await sendEnquiryAdminEmail({
      name: data.name,
      email: email ?? "",
      phone: data.phone,
      category: data.category,
      quantity: data.quantity,
      notes: data.notes,
    });
  } catch (error) {
    console.error("[enquiry] admin email failed:", error);
  }

  revalidatePath("/admin/enquiries");
  return { ok: true };
}
