-- Drop category cover images — categories are text-only.
ALTER TABLE "categories" DROP COLUMN IF EXISTS "image";
