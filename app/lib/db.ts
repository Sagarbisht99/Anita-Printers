import "server-only";
import dns from "node:dns";
import net from "node:net";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma";

/**
 * Neon DNS returns AAAA + A records. Node's default Happy Eyeballs
 * (`autoSelectFamily`) often tries IPv6 first; many home/ISP networks
 * can't reach Neon over IPv6 and fail with ETIMEDOUT.
 * Prefer IPv4 so `pg` (which calls `socket.connect(port, host)`) works.
 */
dns.setDefaultResultOrder("ipv4first");
net.setDefaultAutoSelectFamily(false);

/**
 * Bump this whenever Prisma schema fields change.
 * Prevents a stale global PrismaClient from querying dropped columns in `next dev`.
 */
const PRISMA_SCHEMA_STAMP = "2026-08-26-ipv4-neon";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaSchemaStamp?: string;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is missing. Add the Neon pooled URL to .env and restart the server.",
    );
  }

  // Neon can cold-start slowly; keep the pool small so `next dev` HMR
  // doesn't exhaust the free-tier connection limit.
  const adapter = new PrismaPg({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 20_000,
    idleTimeoutMillis: 20_000,
    allowExitOnIdle: true,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getPrismaClient() {
  if (
    process.env.NODE_ENV !== "production" &&
    globalForPrisma.prisma &&
    globalForPrisma.prismaSchemaStamp !== PRISMA_SCHEMA_STAMP
  ) {
    void globalForPrisma.prisma.$disconnect().catch(() => undefined);
    globalForPrisma.prisma = undefined;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
    globalForPrisma.prismaSchemaStamp = PRISMA_SCHEMA_STAMP;
  }

  return globalForPrisma.prisma;
}

export const prisma = getPrismaClient();
