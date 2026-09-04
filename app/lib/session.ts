import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { isCurrentAdminSession } from "@/app/lib/admin";
import {
  COOKIE_NAME,
  decrypt,
  encrypt,
} from "@/app/lib/session-crypto";
import type { AdminRole, SessionPayload } from "@/app/lib/definitions";

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const COOKIE_PATH = "/";

export async function createSession(input: {
  userId: string;
  username: string;
  role: AdminRole;
  credentialStamp: string;
}) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const payload: SessionPayload = {
    userId: input.userId,
    username: input.username,
    role: input.role,
    credentialStamp: input.credentialStamp,
    expiresAt: expiresAt.toISOString(),
  };
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: COOKIE_PATH,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    expires: new Date(0),
    maxAge: 0,
  });
}

export const getSession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return decrypt(token);
});

/**
 * Env-backed admin session — no DB. Changing ADMIN_PASSWORD invalidates
 * existing cookies via credentialStamp.
 */
export const requireSuperAdmin = cache(async () => {
  const session = await getSession();

  if (!session?.userId || session.role !== "super_admin") {
    return null;
  }

  if (
    !isCurrentAdminSession({
      userId: session.userId,
      username: session.username,
      role: session.role,
      credentialStamp: session.credentialStamp,
    })
  ) {
    return null;
  }

  return {
    userId: session.userId,
    username: session.username,
    role: "super_admin" as const,
    credentialStamp: session.credentialStamp,
    expiresAt: session.expiresAt,
  };
});
