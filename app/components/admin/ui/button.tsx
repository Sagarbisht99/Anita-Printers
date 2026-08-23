"use client";

import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[#3B82F6] text-white hover:bg-[#2563EB] disabled:bg-[#3B82F6]/60",
  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  ghost: "text-zinc-300 hover:bg-white/5 hover:text-white",
  danger: "bg-rose-600 text-white hover:bg-rose-500",
};

export function Button({
  variant = "primary",
  loading,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}
