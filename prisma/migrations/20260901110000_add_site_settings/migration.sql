-- Offer popup / site-wide settings (admin-managed).

CREATE TABLE IF NOT EXISTS "site_settings" (
    "id" TEXT NOT NULL,
    "offer_popup_enabled" BOOLEAN NOT NULL DEFAULT false,
    "offer_popup_image" TEXT,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

INSERT INTO "site_settings" ("id", "offer_popup_enabled", "offer_popup_image", "updated_at")
VALUES ('site', false, NULL, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
