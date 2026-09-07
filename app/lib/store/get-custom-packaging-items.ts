import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import {
  customPackagingLayout,
  type CustomPackagingItem,
} from "@/app/lib/store/custom-packaging";

const CUSTOM_IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
]);

const FALLBACK_COLORS = [
  "#e8ecff",
  "#ffd8d8",
  "#fde5d5",
  "#f0f2f5",
  "#f5e8ff",
  "#e8f5e9",
  "#fff3e0",
  "#e3f2fd",
] as const;

function titleFromFilename(id: string): string {
  return id
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function publicImagePath(file: string): string {
  return `/custom/${file
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

/**
 * Dynamically loads every image in /public/custom.
 * Known ids keep layout titles/sizes; extras alternate sm/lg for tight columns.
 */
export async function getCustomPackagingItems(): Promise<CustomPackagingItem[]> {
  const customDir = path.join(process.cwd(), "public", "custom");

  let entries: string[] = [];
  try {
    entries = await readdir(customDir);
  } catch {
    return [];
  }

  const imageById = new Map<string, string>();
  for (const file of entries) {
    const ext = path.extname(file).toLowerCase();
    if (!CUSTOM_IMAGE_EXTENSIONS.has(ext)) continue;
    const id = path.basename(file, ext);
    if (!id) continue;
    imageById.set(id, publicImagePath(file));
  }

  if (imageById.size === 0) return [];

  const used = new Set<string>();
  const items: CustomPackagingItem[] = [];

  for (const layout of customPackagingLayout) {
    const image = imageById.get(layout.id);
    if (!image) continue;
    used.add(layout.id);
    items.push({ ...layout, image });
  }

  const extras = [...imageById.keys()]
    .filter((id) => !used.has(id))
    .sort((a, b) => a.localeCompare(b));

  for (const id of extras) {
    const image = imageById.get(id)!;
    const index = items.length;
    items.push({
      id,
      title: titleFromFilename(id),
      image,
      bgColor: FALLBACK_COLORS[index % FALLBACK_COLORS.length],
      size: index % 2 === 0 ? "sm" : "lg",
    });
  }

  return items;
}
