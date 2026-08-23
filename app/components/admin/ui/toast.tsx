"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<
  ToastVariant,
  { wrap: string; icon: string; Icon: typeof CheckCircle2 }
> = {
  success: {
    wrap: "border-emerald-500/25 bg-[#121812]",
    icon: "text-emerald-400",
    Icon: CheckCircle2,
  },
  error: {
    wrap: "border-rose-500/30 bg-[#1A1214]",
    icon: "text-rose-400",
    Icon: CircleAlert,
  },
  info: {
    wrap: "border-[#3B82F6]/30 bg-[#10151F]",
    icon: "text-[#60A5FA]",
    Icon: Info,
  },
};

export function AdminToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((prev) => [
      ...prev.slice(-4),
      {
        id,
        title: input.title,
        description: input.description,
        variant: input.variant ?? "info",
      },
    ]);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (title, description) =>
        toast({ title, description, variant: "success" }),
      error: (title, description) =>
        toast({ title, description, variant: "error" }),
      info: (title, description) =>
        toast({ title, description, variant: "info" }),
    }),
    [toast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed top-4 right-4 z-[100] flex w-[min(100vw-2rem,22rem)] flex-col gap-2"
        aria-live="polite"
        aria-relevant="additions"
      >
        {items.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const styles = variantStyles[item.variant];
  const Icon = styles.Icon;

  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(item.id), 3200);
    return () => window.clearTimeout(timer);
  }, [item.id, onDismiss]);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-3.5 py-3 shadow-2xl shadow-black/40 ${styles.wrap} animate-[toast-in_220ms_ease-out]`}
      role="status"
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${styles.icon}`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{item.title}</p>
        {item.description ? (
          <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
            {item.description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        className="rounded-lg p-1 text-zinc-500 transition hover:bg-white/5 hover:text-white"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within AdminToastProvider");
  }
  return ctx;
}
