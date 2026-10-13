import { z } from "zod";

/** Strips everything except digits — use in onChange for phone/quantity/captcha. */
export function digitsOnly(value: string, max = 15): string {
  return value.replace(/\D/g, "").slice(0, max);
}

/** Indian mobile/landline friendly: 7–15 digits, optional +91/0 prefix, spaces/dashes allowed. */
const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone is required")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }, "Enter a valid phone number");

const emailSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.email().safeParse(value).success,
    "Enter a valid email address",
  );

/** Shared client-side validation for quote popup & quick quote forms. */
export const enquiryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name is too long"),
  phone: phoneSchema,
  email: emailSchema,
  quantity: z
    .string()
    .optional()
    .refine((value) => {
      if (!value?.trim()) return true;
      const n = Number(value);
      return Number.isFinite(n) && n >= 1 && n <= 10_000_000;
    }, "Enter a valid quantity"),
  captchaAnswer: z
    .string()
    .trim()
    .min(1, "Solve the captcha")
    .refine((value) => /^\d+$/.test(value), "Captcha must be a number"),
});

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

export type EnquiryFieldErrors = Partial<
  Record<keyof EnquiryFormValues, string>
>;

/** Returns the first error per field, or an empty object when valid. */
export function validateEnquiryForm(
  input: Partial<EnquiryFormValues>,
): EnquiryFieldErrors {
  const result = enquiryFormSchema.safeParse({
    name: input.name ?? "",
    phone: input.phone ?? "",
    email: input.email ?? "",
    quantity: input.quantity,
    captchaAnswer: input.captchaAnswer ?? "",
  });
  if (result.success) return {};

  const errors: EnquiryFieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key as keyof EnquiryFormValues]) {
      errors[key as keyof EnquiryFormValues] = issue.message;
    }
  }
  return errors;
}
