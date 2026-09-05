-- Buyer defaults for size / colour on product detail.

ALTER TABLE "products"
  ADD COLUMN IF NOT EXISTS "default_size" VARCHAR(100) NOT NULL DEFAULT 'Custom';

ALTER TABLE "products"
  ADD COLUMN IF NOT EXISTS "default_color" VARCHAR(100) NOT NULL DEFAULT 'Red';
