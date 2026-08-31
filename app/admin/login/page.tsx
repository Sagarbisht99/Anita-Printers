import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/app/admin/login/login-form";
import { brandLogo } from "@/app/lib/seo/brand-icons";
import { requireSuperAdmin } from "@/app/lib/session";

export const metadata: Metadata = {
  title: "Admin Login | Anita Printers",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await requireSuperAdmin();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-4 py-16">
      {/* Base + layered professional atmosphere */}
      <div className="absolute inset-0 bg-[#07090D]" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 55% at 15% 10%, rgba(14, 165, 233, 0.22), transparent 55%),
            radial-gradient(ellipse 70% 50% at 90% 85%, rgba(37, 99, 235, 0.28), transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(244, 63, 94, 0.08), transparent 60%),
            linear-gradient(165deg, #0B1220 0%, #07090D 45%, #0A0F18 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#12151C]/80 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 h-[76px] w-[76px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandLogo.svg}
            alt="Anita Printers"
            width={76}
            height={76}
            className="h-full w-full object-contain"
          />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Admin Login
          </h1>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
