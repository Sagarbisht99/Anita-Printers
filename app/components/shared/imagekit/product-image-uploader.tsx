"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { PRODUCT_IMAGE_FOLDER } from "@/app/lib/imagekit/constants";
import {
  uploadFileToImageKit,
  uploadFilesToImageKit,
} from "@/app/lib/imagekit/upload";

type Mode = "single" | "multiple";

type ProductImageUploaderProps = {
  mode: Mode;
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  folder?: string;
  maxFiles?: number;
};

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/avif";
const ACCEPT_SET = new Set(ACCEPT.split(","));

function filterImageFiles(files: File[]) {
  return files.filter(
    (file) =>
      ACCEPT_SET.has(file.type) ||
      /\.(jpe?g|png|webp|gif|avif)$/i.test(file.name),
  );
}

export function ProductImageUploader({
  mode,
  label,
  value,
  onChange,
  folder = PRODUCT_IMAGE_FOLDER,
  maxFiles = 12,
}: ProductImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pending, startTransition] = useTransition();
  const dragDepth = useRef(0);

  const urls = Array.isArray(value) ? value : value ? [value] : [];

  function openPicker() {
    inputRef.current?.click();
  }

  function removeAt(index: number) {
    if (mode === "single") {
      onChange("");
      return;
    }
    onChange(urls.filter((_, i) => i !== index));
  }

  const uploadFiles = useCallback(
    (rawFiles: File[]) => {
      const files = filterImageFiles(rawFiles);
      if (files.length === 0) {
        setError("Please drop image files only (JPG, PNG, WEBP, GIF, AVIF).");
        return;
      }

      setError(null);

      startTransition(async () => {
        try {
          if (mode === "single") {
            setProgress(0);
            const uploaded = await uploadFileToImageKit(files[0], {
              folder,
              onProgress: setProgress,
            });
            onChange(uploaded.url);
            setProgress(null);
            return;
          }

          const remaining = Math.max(0, maxFiles - urls.length);
          const batch = files.slice(0, remaining);
          if (batch.length === 0) {
            setError(`You can upload up to ${maxFiles} gallery images.`);
            return;
          }

          if (files.length > remaining) {
            setError(`Only ${remaining} more image(s) allowed. Extra files skipped.`);
          }

          setProgress(0);
          const uploaded = await uploadFilesToImageKit(batch, {
            folder,
            onFileProgress: (index, percent) => {
              setProgress(
                Math.round(((index + percent / 100) / batch.length) * 100),
              );
            },
          });
          onChange([...urls, ...uploaded.map((item) => item.url)]);
          setProgress(null);
        } catch (uploadError) {
          setProgress(null);
          setError(
            uploadError instanceof Error
              ? uploadError.message
              : "Upload failed. Check ImageKit keys in .env.",
          );
        } finally {
          if (inputRef.current) inputRef.current.value = "";
        }
      });
    },
    [folder, maxFiles, mode, onChange, urls],
  );

  function onDragEnter(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current += 1;
    setDragging(true);
  }

  function onDragLeave(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setDragging(false);
    }
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current = 0;
    setDragging(false);
    if (pending) return;
    const files = Array.from(event.dataTransfer.files ?? []);
    uploadFiles(files);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            {label}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {mode === "single"
              ? "Drag & drop or upload one cover image"
              : `Drag & drop multiple images (max ${maxFiles})`}
          </p>
        </div>
        <button
          type="button"
          onClick={openPicker}
          disabled={pending}
          className="h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-medium text-zinc-200 transition hover:bg-white/10 disabled:opacity-60"
        >
          {pending ? "Uploading…" : "Browse"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple={mode === "multiple"}
        className="hidden"
        onChange={(event) =>
          uploadFiles(Array.from(event.target.files ?? []))
        }
      />

      <button
        type="button"
        disabled={pending}
        onClick={openPicker}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition ${
          dragging
            ? "border-[#3B82F6] bg-[#3B82F6]/10 text-[#93C5FD]"
            : "border-white/10 bg-[#111111] text-zinc-500 hover:border-[#3B82F6]/40 hover:bg-[#161616]"
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
            dragging
              ? "border-[#3B82F6]/40 bg-[#3B82F6]/15 text-[#60A5FA]"
              : "border-white/10 bg-[#161616] text-zinc-400"
          }`}
        >
          {dragging ? (
            <Upload className="h-5 w-5" />
          ) : (
            <ImagePlus className="h-5 w-5" />
          )}
        </div>
        <p className="text-sm font-medium text-zinc-200">
          {dragging ? "Drop images to upload" : "Drag & drop images here"}
        </p>
        <p className="text-xs text-zinc-500">
          or click to browse · JPG, PNG, WEBP, GIF, AVIF
        </p>
      </button>

      {progress !== null ? (
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#3B82F6] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          {error}
        </p>
      ) : null}

      {urls.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {urls.map((url, index) => (
            <li
              key={`${url}-${index}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`${label} ${index + 1}`}
                className="aspect-square w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-[#0A0A0A]/85 text-zinc-200 opacity-0 transition group-hover:opacity-100 hover:bg-[#161616]"
                aria-label={`Remove ${label} ${index + 1}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
