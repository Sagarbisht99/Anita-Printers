import { redirect } from "next/navigation";
import { requireSuperAdmin } from "@/app/lib/session";

/** `/admin` is the console entry — login lives at `/admin-login`. */
export default async function AdminIndexPage() {
  const session = await requireSuperAdmin();

  if (session) {
    redirect("/admin/dashboard");
  }

  redirect("/admin-login");
}
