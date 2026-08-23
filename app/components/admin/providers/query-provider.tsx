"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AdminToastProvider } from "@/app/components/admin/ui/toast";
import { createAdminQueryClient } from "@/app/lib/query/clients";

export function AdminQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => createAdminQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AdminToastProvider>
        {children}
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        ) : null}
      </AdminToastProvider>
    </QueryClientProvider>
  );
}
