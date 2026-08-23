import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClass =
  "h-11 w-full rounded-xl border border-white/10 bg-[#111111] px-3 text-sm text-white outline-none ring-[#3B82F6]/40 placeholder:text-zinc-500 focus:ring-2";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
        {label}
      </span>
      {children}
      {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-28 w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-sm text-white outline-none ring-[#3B82F6]/40 placeholder:text-zinc-500 focus:ring-2 ${props.className ?? ""}`}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${fieldClass} ${props.className ?? ""}`}
    />
  );
}
