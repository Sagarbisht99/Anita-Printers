"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type TodoListFieldProps = {
  label: string;
  hint?: string;
  name: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export function TodoListField({
  label,
  hint,
  name,
  values,
  onChange,
  placeholder = "Add item and press Enter",
}: TodoListFieldProps) {
  const [draft, setDraft] = useState("");

  function addItem() {
    const value = draft.trim();
    if (!value) return;
    if (values.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...values, value]);
    setDraft("");
  }

  function removeItem(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
        {label}
      </span>

      <input type="hidden" name={name} value={JSON.stringify(values)} />

      <div className="rounded-xl border border-white/10 bg-[#111111] p-3">
        <div className="flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
            placeholder={placeholder}
            className="h-10 min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0A0A0A] px-3 text-sm text-white outline-none ring-[#3B82F6]/40 placeholder:text-zinc-500 focus:ring-2"
          />
          <button
            type="button"
            onClick={addItem}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-[#3B82F6] px-3 text-sm font-medium text-white transition hover:bg-[#2563EB]"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        {values.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {values.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2"
              >
                <span className="min-w-0 flex-1 truncate text-sm text-zinc-200">
                  {item}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="rounded-md p-1 text-zinc-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                  aria-label={`Remove ${item}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-xs text-zinc-500">No items yet</p>
        )}
      </div>

      {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
    </div>
  );
}
