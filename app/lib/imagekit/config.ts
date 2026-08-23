import "server-only";
import { getImageKitPublicEnv } from "@/app/lib/imagekit/constants";

export { PRODUCT_IMAGE_FOLDER } from "@/app/lib/imagekit/constants";

export function getImageKitPublicConfig() {
  const { urlEndpoint, publicKey } = getImageKitPublicEnv();

  if (!urlEndpoint || !publicKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT or NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY.",
    );
  }

  return {
    urlEndpoint: urlEndpoint.replace(/^["']|["']$/g, ""),
    publicKey: publicKey.replace(/^["']|["']$/g, ""),
  };
}

export function getImageKitPrivateKey() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim()?.replace(
    /^["']|["']$/g,
    "",
  );

  if (!privateKey) {
    throw new Error("Missing IMAGEKIT_PRIVATE_KEY in environment.");
  }

  return privateKey;
}
