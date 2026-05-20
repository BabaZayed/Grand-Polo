import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "prisma", "grand-polo.db");

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter } as never);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
