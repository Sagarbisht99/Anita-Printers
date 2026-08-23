import "server-only";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/db";
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
  sessionVersion: number;
}) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const payload: SessionPayload = {
    userId: input.userId,
    username: input.username,
    role: input.role,
    sessionVersion: input.sessionVersion,
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

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return decrypt(token);
}

export async function requireSuperAdmin() {
  const session = await getSession();

  if (!session?.userId || session.role !== "super_admin") {
    return null;
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      username: true,
      role: true,
      sessionVersion: true,
    },
  });

  if (
    !admin ||
    admin.role !== "super_admin" ||
    admin.sessionVersion !== session.sessionVersion
  ) {
    return null;
  }

  return {
    userId: admin.id,
    username: admin.username,
    role: "super_admin" as const,
    sessionVersion: admin.sessionVersion,
    expiresAt: session.expiresAt,
  };
}
