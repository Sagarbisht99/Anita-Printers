"use server";

import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "@/app/lib/admin";
import { clientIp, consumeRateLimit } from "@/app/lib/security/rate-limit";
import type { LoginFormState } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/lib/session";

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  const ip = await clientIp();

  // Per-IP cap blunts credential stuffing that rotates usernames.
  for (const key of [`login:ip:${ip}`, `login:${ip}:${username.toLowerCase()}`]) {
    const limited = consumeRateLimit({
      key,
      limit: key.startsWith("login:ip:") ? 20 : 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!limited.ok) {
      return {
        error: `Too many login attempts. Try again in ${limited.retryAfterSec}s.`,
      };
    }
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
  redirect("/admin/login");
}
