/** Folder used for product assets in ImageKit media library */
export const PRODUCT_IMAGE_FOLDER = "/anita-printers/products";

export function getImageKitPublicEnv() {
  return {
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim() ?? "",
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY?.trim() ?? "",
  };
}
