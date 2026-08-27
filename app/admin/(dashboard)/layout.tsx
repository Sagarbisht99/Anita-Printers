import { redirect } from "next/navigation";
import { AdminShell } from "@/app/components/admin/shell/admin-shell";
import { AdminQueryProvider } from "@/app/components/admin/providers/query-provider";
import { getHeaderStats } from "@/app/lib/admin/header-stats";
import { requireSuperAdmin } from "@/app/lib/session";

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSuperAdmin();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getHeaderStats();

  return (
    <AdminQueryProvider>
      <AdminShell username={session.username} stats={stats}>
        {children}
      </AdminShell>
    </AdminQueryProvider>
  );
}
