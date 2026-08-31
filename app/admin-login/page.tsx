import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Legacy URL — login moved to /admin/login */
export default function LegacyAdminLoginRedirect() {
  redirect("/admin/login");
}
