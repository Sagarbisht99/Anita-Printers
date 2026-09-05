import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/app/lib/env/server";

const CAPTCHA_TTL_MS = 15 * 60 * 1000;

function captchaSecret(): string {
  const secret = serverEnv.sessionSecret;
  if (!secret) {
    throw new Error("SESSION_SECRET is required for enquiry captcha.");
  }
  return secret;
}

function signPayload(payload: string): string {
  return createHmac("sha256", captchaSecret()).update(payload).digest("hex");
}

/** Create a short-lived math captcha challenge for public forms. */
export function createMathCaptcha(): {
  a: number;
  b: number;
  token: string;
} {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const exp = Date.now() + CAPTCHA_TTL_MS;
  const payload = `${a}:${b}:${exp}`;
  const token = `${payload}.${signPayload(payload)}`;
  return { a, b, token };
}

export function verifyMathCaptcha(input: {
  token: string;
  answer: string | number;
}): boolean {
  const token = String(input.token ?? "").trim();
  const answer = Number(input.answer);
  if (!token || !Number.isFinite(answer)) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expectedSig = signPayload(payload);
  try {
    const left = Buffer.from(sig);
    const right = Buffer.from(expectedSig);
    if (left.length !== right.length || !timingSafeEqual(left, right)) {
      return false;
    }
  } catch {
    return false;
  }

  const [aRaw, bRaw, expRaw] = payload.split(":");
  const a = Number(aRaw);
  const b = Number(bRaw);
  const exp = Number(expRaw);
  if (![a, b, exp].every(Number.isFinite)) return false;
  if (Date.now() > exp) return false;
  return Math.floor(answer) === a + b;
}
