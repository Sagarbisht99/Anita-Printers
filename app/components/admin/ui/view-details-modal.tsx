"use client";

import type { ReactNode } from "react";
import { Modal } from "@/app/components/admin/ui/modal";
import { Button } from "@/app/components/admin/ui/button";

export type ViewField = {
  label: string;
  value?: ReactNode;
  fullWidth?: boolean;
};

type ViewDetailsModalProps = {
  open: boolean;
  title: string;
  description?: string;
  fields: ViewField[];
  images?: string[];
  onClose: () => void;
  footer?: ReactNode;
  size?: "md" | "lg" | "xl";
};

function displayValue(value: ReactNode) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-zinc-500">—</span>;
  }
  return value;
}

export function ChipList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <span className="text-zinc-500">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-200"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ViewDetailsModal({
  open,
  title,
  description,
  fields,
  images = [],
  onClose,
  footer,
  size = "lg",
}: ViewDetailsModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
    >
      <div className="space-y-5">
        {images.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {images.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="h-20 w-20 rounded-xl border border-white/10 object-cover"
              />
            ))}
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.label}
              className={`rounded-xl border border-white/[0.06] bg-[#121212] px-3.5 py-3 ${
                field.fullWidth ? "sm:col-span-2" : ""
              }`}
            >
              <p className="text-[10px] font-semibold tracking-[0.14em] text-zinc-500 uppercase">
                {field.label}
              </p>
              <div className="mt-1.5 text-sm break-words text-zinc-200">
                {displayValue(field.value)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          {footer}
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
