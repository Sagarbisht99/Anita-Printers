import "server-only";
import { requireSuperAdmin } from "@/app/lib/session";

export async function assertSuperAdmin() {
  const session = await requireSuperAdmin();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export function isUnauthorizedError(error: unknown) {
  return error instanceof Error && error.message === "Unauthorized";
}
