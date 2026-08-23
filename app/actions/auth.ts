"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "@/app/lib/admin";
import { consumeRateLimit } from "@/app/lib/admin/rate-limit";
import type { LoginFormState } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/lib/session";

async function clientKey() {
  const headerStore = await headers();
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  const ip = await clientKey();
  const limited = consumeRateLimit({
    key: `login:${ip}:${username.toLowerCase()}`,
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!limited.ok) {
    return {
      error: `Too many login attempts. Try again in ${limited.retryAfterSec}s.`,
    };
  }

  let admin;

  try {
    admin = await verifyAdminCredentials(username, password);
  } catch (error) {
    console.error("Admin login database error:", error);
    return { error: "Sign-in temporarily unavailable. Please try again." };
  }

  if (!admin || admin.role !== "super_admin") {
    return { error: "Invalid username or password." };
  }

  await createSession({
    userId: admin.id,
    username: admin.username,
    role: "super_admin",
    sessionVersion: admin.sessionVersion,
  });

  redirect("/admin/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/admin-login");
}
