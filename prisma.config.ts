import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prefer Neon direct (unpooled) for migrations.
 * Fall back so `prisma generate` / `npm ci` work in CI without secrets.
 */
const datasourceUrl =
  process.env.DATABASE_URL_UNPOOLED?.trim() ||
  process.env.DATABASE_URL?.trim() ||
  "postgresql://prisma:prisma@localhost:5432/prisma";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: datasourceUrl,
  },
});
