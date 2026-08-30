import "server-only";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/db";
import { serverEnv } from "@/app/lib/env/server";
import type { AdminRole } from "@/app/lib/definitions";

const MIN_ADMIN_PASSWORD_LENGTH = 12;

/** Dummy hash so missing-user logins still pay bcrypt cost (timing safety). */
const DUMMY_PASSWORD_HASH =
  "$2b$12$0Yt9rlz4PzU5nbcR8EzieeNDDjP4MEOLhXxl14DEZCEJLttWanE32";

export function assertAdminPasswordPolicy(password: string) {
  if (password.length < MIN_ADMIN_PASSWORD_LENGTH) {
    throw new Error(
      `ADMIN_PASSWORD must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.`,
    );
  }
}

export async function seedSuperAdminFromEnv() {
  const username = serverEnv.adminUsername;
  const password = serverEnv.adminPassword;
  const resetPassword = serverEnv.adminResetPassword;

  if (!username || !password) {
    throw new Error(
      "ADMIN_USERNAME and ADMIN_PASSWORD must be set in the environment.",
    );
  }

  assertAdminPasswordPolicy(password);

  const existing = await prisma.admin.findUnique({ where: { username } });
  const passwordHash = await bcrypt.hash(password, 12);

  if (!existing) {
    return prisma.admin.create({
      data: {
        username,
        passwordHash,
        role: "super_admin",
        sessionVersion: 0,
      },
    });
  }

  if (!resetPassword) {
    return existing;
  }

  return prisma.admin.update({
    where: { username },
    data: {
      passwordHash,
      role: "super_admin",
      sessionVersion: { increment: 1 },
    },
  });
}

export async function findAdminByUsername(username: string) {
  return prisma.admin.findUnique({
    where: { username },
  });
}

export async function verifyAdminCredentials(
  username: string,
  password: string,
) {
  const admin = await findAdminByUsername(username);
  const hash = admin?.passwordHash ?? DUMMY_PASSWORD_HASH;
  const valid = await bcrypt.compare(password, hash);

  if (!admin || !valid) {
    return null;
  }

  return {
    id: admin.id,
    username: admin.username,
    role: admin.role as AdminRole,
    sessionVersion: admin.sessionVersion,
  };
}
