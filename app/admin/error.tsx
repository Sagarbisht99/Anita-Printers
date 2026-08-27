"use client";

import { useEffect } from "react";
import { Button } from "@/app/components/admin/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#161616] p-8 text-center">
        <h1 className="text-lg font-semibold text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-zinc-400">
          The admin panel hit an unexpected error. You can retry or go back to
          login.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button type="button" variant="secondary" onClick={reset}>
            Try again
          </Button>
          <Button type="button" onClick={() => (window.location.href = "/admin/login")}>
            Admin login
          </Button>
        </div>
      </div>
    </main>
  );
}
