import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/app/lib/env/server";
import type { AdminRole } from "@/app/lib/definitions";

/** Stable id for the env-backed super admin (JWT / rate-limit keys). */
export const ENV_ADMIN_USER_ID = "00000000-0000-4000-8000-000000000001";

function safeEqualString(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }

  return timingSafeEqual(left, right);
}

/** Stamp changes when env password changes — invalidates old sessions. */
export function adminCredentialStamp(password: string): string {
  return createHash("sha256").update(`admin:${password}`).digest("hex");
}

export function verifyAdminCredentials(
  username: string,
  password: string,
): {
  id: string;
  username: string;
  role: AdminRole;
  credentialStamp: string;
} | null {
  const envUsername = serverEnv.adminUsername;
  const envPassword = serverEnv.adminPassword;

  if (!envUsername || !envPassword) {
    throw new Error(
      "Admin login is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD.",
    );
  }

  const usernameOk = safeEqualString(username, envUsername);
  const passwordOk = safeEqualString(password, envPassword);

  if (!usernameOk || !passwordOk) {
    return null;
  }

  return {
    id: ENV_ADMIN_USER_ID,
    username: envUsername,
    role: "super_admin",
    credentialStamp: adminCredentialStamp(envPassword),
  };
}

export function isCurrentAdminSession(input: {
  userId: string;
  username: string;
  role: string;
  credentialStamp: string;
}): boolean {
  const envUsername = serverEnv.adminUsername;
  const envPassword = serverEnv.adminPassword;

  if (!envUsername || !envPassword) {
    return false;
  }

  return (
    input.userId === ENV_ADMIN_USER_ID &&
    input.role === "super_admin" &&
    safeEqualString(input.username, envUsername) &&
    safeEqualString(input.credentialStamp, adminCredentialStamp(envPassword))
  );
}
