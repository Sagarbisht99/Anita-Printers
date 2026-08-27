"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createFrontendQueryClient } from "@/app/lib/query/clients";

export function StorefrontQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => createFrontendQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
