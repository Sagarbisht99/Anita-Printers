import "server-only";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/db";
import { serverEnv } from "@/app/lib/env/server";
import type { AdminRole } from "@/app/lib/definitions";

const RECOMMENDED_ADMIN_PASSWORD_LENGTH = 12;

/** Dummy hash so missing-user logins still pay bcrypt cost (timing safety). */
const DUMMY_PASSWORD_HASH =
  "$2b$12$0Yt9rlz4PzU5nbcR8EzieeNDDjP4MEOLhXxl14DEZCEJLttWanE32";

export function assertAdminPasswordPolicy(password: string) {
  if (!password) {
    throw new Error("ADMIN_PASSWORD must not be empty.");
  }

  if (password.length < RECOMMENDED_ADMIN_PASSWORD_LENGTH) {
    console.warn(
      `[admin] ADMIN_PASSWORD is shorter than ${RECOMMENDED_ADMIN_PASSWORD_LENGTH} characters. Use a longer password in production.`,
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

/**
 * Fresh DBs (e.g. new Neon) often have zero admins because seed never ran.
 * If the login matches ADMIN_USERNAME / ADMIN_PASSWORD, create the first
 * super_admin so deploy doesn't leave the console locked out.
 */
export async function bootstrapSuperAdminIfEmpty(
  username: string,
  password: string,
) {
  const count = await prisma.admin.count();
  if (count > 0) {
    return null;
  }

  const envUsername = serverEnv.adminUsername;
  const envPassword = serverEnv.adminPassword;

  if (!envUsername || !envPassword) {
    throw new Error(
      "No admin account exists yet. Set ADMIN_USERNAME and ADMIN_PASSWORD in the environment, then try again.",
    );
  }

  if (username !== envUsername || password !== envPassword) {
    return null;
  }

  assertAdminPasswordPolicy(envPassword);
  const passwordHash = await bcrypt.hash(envPassword, 12);

  return prisma.admin.create({
    data: {
      username: envUsername,
      passwordHash,
      role: "super_admin",
      sessionVersion: 0,
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
  try {
    await bootstrapSuperAdminIfEmpty(username, password);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("No admin account exists yet")
    ) {
      throw error;
    }
    console.error("[admin] bootstrap failed:", error);
  }

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
