-- Harden order/product relation and add operational indexes.

ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "orders_product_id_fkey";
ALTER TABLE "orders"
  ADD CONSTRAINT "orders_product_id_fkey"
  FOREIGN KEY ("product_id") REFERENCES "products"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;

ALTER TABLE "admins"
  ADD COLUMN IF NOT EXISTS "session_version" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS "idx_orders_status" ON "orders"("status");
CREATE INDEX IF NOT EXISTS "idx_orders_created_at" ON "orders"("created_at");
CREATE INDEX IF NOT EXISTS "idx_enquiries_created_at" ON "enquiries"("created_at");
CREATE INDEX IF NOT EXISTS "idx_products_title_name" ON "products"("title_name");
