import { readdir } from "node:fs/promises";
import path from "node:path";

export type CustomPackagingItem = {
  id: string;
  title: string;
  image: string;
  bgColor: string;
  /** Desktop masonry placement (4 cols × 6 rows) */
  gridColumn: number;
  gridRow: string;
  /** Image max height class tier for card proportions */
  imageSize: "sm" | "md" | "lg";
};

const CUSTOM_IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
]);

export const customPackagingContent = {
  title: "Customized Packaging",
  subtitle: "Your Logo, Your Design, Your Brand",
  stepsLine: "Get Your Packaging Material Customised In Just 3 steps.",
};

/**
 * Layout + labels — images are loaded from /public/custom/{id}.png
 * (same kebab-case id as the filename, e.g. color-courier-bags.png).
 */
export const customPackagingLayout: Omit<CustomPackagingItem, "image">[] = [
  {
    id: "security-envelopes",
    title: "Security Envelopes",
    bgColor: "#e8ecff",
    gridColumn: 1,
    gridRow: "1 / span 2",
    imageSize: "sm",
  },
  {
    id: "color-carry-bags",
    title: "Color Carry Bags",
    bgColor: "#ffd8d8",
    gridColumn: 2,
    gridRow: "1 / span 4",
    imageSize: "lg",
  },
  {
    id: "corrugated-box",
    title: "Corrugated box",
    bgColor: "#fde5d5",
    gridColumn: 3,
    gridRow: "1 / span 3",
    imageSize: "md",
  },
  {
    id: "bopp-tapes",
    title: "BOPP Tapes",
    bgColor: "#e8ecff",
    gridColumn: 4,
    gridRow: "1 / span 2",
    imageSize: "sm",
  },
  {
    id: "dcut-carry-bags",
    title: "Dcut Carry Bags",
    bgColor: "#fde5d5",
    gridColumn: 1,
    gridRow: "3 / span 4",
    imageSize: "lg",
  },
  {
    id: "ecommerce-packaging",
    title: "E-Commerce Packaging",
    bgColor: "#f0f2f5",
    gridColumn: 2,
    gridRow: "5 / span 2",
    imageSize: "sm",
  },
  {
    id: "stand-up-pouches",
    title: "Stand Up Pouches",
    bgColor: "#f5e8ff",
    gridColumn: 3,
    gridRow: "4 / span 3",
    imageSize: "md",
  },
  {
    id: "color-courier-bags",
    title: "Color Courier Bags",
    bgColor: "#fde5d5",
    gridColumn: 4,
    gridRow: "3 / span 4",
    imageSize: "lg",
  },
];

function imageUrlForId(id: string, filename: string): string {
  return `/custom/${filename}`;
}

/** Packaging cards — images discovered from /public/custom by matching filename to `id`. */
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
    imageById.set(id, imageUrlForId(id, file));
  }

  return customPackagingLayout.map((item) => ({
    ...item,
    image: imageById.get(item.id) ?? "",
  }));
}
