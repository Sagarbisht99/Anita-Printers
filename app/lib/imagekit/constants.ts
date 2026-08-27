/** Folder used for product assets in ImageKit media library */
export const PRODUCT_IMAGE_FOLDER = "/anita-printers/products";

/** Folder used for category cover images in ImageKit */
export const CATEGORY_IMAGE_FOLDER = "/anita-printers/categories";

/** Folder used for homepage offer popup banner */
export const OFFER_BANNER_FOLDER = "/anita-printers/offer-banner";

export function getImageKitPublicEnv() {
  return {
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim() ?? "",
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY?.trim() ?? "",
  };
}
