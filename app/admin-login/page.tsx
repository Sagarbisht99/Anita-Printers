import { redirect } from "next/navigation";

/** Legacy URL — login moved to /admin/login */
export default function LegacyAdminLoginRedirect() {
  redirect("/admin/login");
}
