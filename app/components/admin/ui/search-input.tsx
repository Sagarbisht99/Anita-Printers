"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AdminSearchInput({
  value,
  onChange,
  placeholder = "Search by name...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onChangeRef.current(draft);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [draft]);

  return (
    <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
      <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        type="search"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-white/10 bg-[#111111] pr-9 pl-9 text-sm text-white outline-none ring-[#3B82F6]/40 placeholder:text-zinc-500 focus:ring-2"
      />
      {draft ? (
        <button
          type="button"
          onClick={() => {
            setDraft("");
            onChangeRef.current("");
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}
