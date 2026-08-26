import "dotenv/config";
import dns from "node:dns";
import net from "node:net";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma";

// Same Neon IPv4 preference as app/lib/db.ts — see comment there.
dns.setDefaultResultOrder("ipv4first");
net.setDefaultAutoSelectFamily(false);

const MIN_ADMIN_PASSWORD_LENGTH = 12;

async function main() {
  const connectionString = process.env.DATABASE_URL?.trim();
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const resetPassword = process.env.ADMIN_RESET_PASSWORD === "true";

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing.");
  }

  if (!username || !password) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD are required.");
  }

  if (password.length < MIN_ADMIN_PASSWORD_LENGTH) {
    throw new Error(
      `ADMIN_PASSWORD must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.`,
    );
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const existing = await prisma.admin.findUnique({ where: { username } });
    const passwordHash = await bcrypt.hash(password, 12);

    if (!existing) {
      const admin = await prisma.admin.create({
        data: {
          username,
          passwordHash,
          role: "super_admin",
          sessionVersion: 0,
        },
      });
      console.log(`Created super admin: ${admin.username}`);
      return;
    }

    if (!resetPassword) {
      console.log(
        `Super admin already exists (${existing.username}). Skipping password update. Set ADMIN_RESET_PASSWORD=true to rotate.`,
      );
      return;
    }

    const admin = await prisma.admin.update({
      where: { username },
      data: {
        passwordHash,
        role: "super_admin",
        sessionVersion: { increment: 1 },
      },
    });
    console.log(`Reset password for super admin: ${admin.username}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
