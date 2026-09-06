import { readdir } from "node:fs/promises";
import path from "node:path";

export type PartnerBrand = {
  name: string;
  logo: string;
};

const BRAND_IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

function filenameToBrandName(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  if (base.length <= 3) return base.toUpperCase();

  return base
    .replace(/-and-/g, " & ")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function publicBrandPath(file: string): string {
  return `/brands/${file
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

/** Partner brand logos discovered from /public/brands */
export async function getPartnerBrands(): Promise<PartnerBrand[]> {
  const brandsDir = path.join(process.cwd(), "public", "brands");

  let entries: string[];
  try {
    entries = await readdir(brandsDir);
  } catch {
    return [];
  }

  return entries
    .filter((file) =>
      BRAND_IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()),
    )
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      name: filenameToBrandName(file),
      logo: publicBrandPath(file),
    }));
}
