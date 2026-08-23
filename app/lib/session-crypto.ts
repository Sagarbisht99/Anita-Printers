import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";
import type { SessionPayload } from "@/app/lib/definitions";

const COOKIE_NAME = "admin_session";
const MIN_SECRET_LENGTH = 32;

const sessionPayloadSchema = z.object({
  userId: z.string().uuid(),
  username: z.string().min(1),
  role: z.literal("super_admin"),
  sessionVersion: z.number().int().nonnegative(),
  expiresAt: z.string().datetime(),
});

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not set in the environment.");
  }

  if (secret.length < MIN_SECRET_LENGTH) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `SESSION_SECRET must be at least ${MIN_SECRET_LENGTH} characters.`,
      );
    }
    console.warn(
      `[session] SESSION_SECRET is shorter than ${MIN_SECRET_LENGTH} characters. Rotate it before production.`,
    );
  }

  return new TextEncoder().encode(secret);
}

export { COOKIE_NAME };

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecretKey());
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, getSecretKey(), {
      algorithms: ["HS256"],
    });
    const parsed = sessionPayloadSchema.safeParse(payload);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
