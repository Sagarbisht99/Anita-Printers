import "server-only";
import { headers } from "next/headers";

type RateBucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

/**
 * In-process fixed-window limiter (single Node instance).
 * Swap for Redis/Upstash before running more than one replica.
 */
const buckets = new Map<string, RateBucket>();

/** Bound memory: a flood of unique keys would otherwise grow the map forever. */
const MAX_BUCKETS = 10_000;

function evictExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function consumeRateLimit(input: {
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(input.key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) evictExpired(now);
    buckets.set(input.key, { count: 1, resetAt: now + input.windowMs });
    return { ok: true, remaining: input.limit - 1 };
  }

  if (existing.count >= input.limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true, remaining: input.limit - existing.count };
}

/**
 * Caller IP for rate-limit keys. Proxy headers are spoofable, so this is a
 * throttling hint only — never an authorization signal.
 */
export async function clientIp(): Promise<string> {
  const headerStore = await headers();
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip")?.trim() ||
    "unknown"
  );
}
