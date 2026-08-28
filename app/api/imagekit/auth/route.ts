import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { headers } from "next/headers";
import { consumeRateLimit } from "@/app/lib/security/rate-limit";
import {
  getImageKitPrivateKey,
  getImageKitPublicConfig,
} from "@/app/lib/imagekit/config";
import { PRODUCT_IMAGE_FOLDER } from "@/app/lib/imagekit/constants";
import { requireSuperAdmin } from "@/app/lib/session";

const UPLOAD_AUTH_TTL_SEC = 120;

export async function GET() {
  const session = await requireSuperAdmin();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown";

  const limited = consumeRateLimit({
    key: `imagekit-auth:${session.userId}:${ip}`,
    limit: 30,
    windowMs: 60 * 1000,
  });

  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many upload auth requests. Try again shortly." },
      { status: 429 },
    );
  }

  try {
    const { publicKey } = getImageKitPublicConfig();
    const privateKey = getImageKitPrivateKey();
    const expire = Math.floor(Date.now() / 1000) + UPLOAD_AUTH_TTL_SEC;
    const { token, expire: tokenExpire, signature } = getUploadAuthParams({
      privateKey,
      publicKey,
      expire,
    });

    return NextResponse.json(
      {
        token,
        expire: tokenExpire,
        signature,
        publicKey,
        // Hint for client uploader; auth signature itself is not folder-bound by ImageKit.
        folder: PRODUCT_IMAGE_FOLDER,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json(
      { error: "Failed to create upload credentials." },
      { status: 500 },
    );
  }
}
