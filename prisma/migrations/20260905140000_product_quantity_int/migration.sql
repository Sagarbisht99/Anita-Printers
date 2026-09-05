-- Replace products.quantities (text[]) with a single MOQ integer (default 1).

ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "quantity" INTEGER NOT NULL DEFAULT 1;

UPDATE "products"
SET "quantity" = GREATEST(
  1,
  COALESCE(
    NULLIF(
      regexp_replace(COALESCE(quantities[1], '1'), '[^0-9]', '', 'g'),
      ''
    )::integer,
    1
  )
)
WHERE EXISTS (
  SELECT 1
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'products'
    AND column_name = 'quantities'
);

ALTER TABLE "products" DROP COLUMN IF EXISTS "quantities";
