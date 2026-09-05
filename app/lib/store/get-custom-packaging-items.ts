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
  ".svg",
]);

/** Packaging cards — images from /public/custom matching layout `id`. */
export async function getCustomPackagingItems(): Promise<CustomPackagingItem[]> {
  const customDir = path.join(process.cwd(), "public", "custom");

  let entries: string[] = [];
  try {
    entries = await readdir(customDir);
  } catch {
    entries = [];
  }

  const imageById = new Map<string, string>();
  for (const file of entries) {
    const ext = path.extname(file).toLowerCase();
    if (!CUSTOM_IMAGE_EXTENSIONS.has(ext)) continue;
    const id = path.basename(file, ext);
    imageById.set(id, `/custom/${file}`);
  }

  return customPackagingLayout.map((item) => ({
    ...item,
    image: imageById.get(item.id) ?? "",
  }));
}
