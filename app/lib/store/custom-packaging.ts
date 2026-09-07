export type CustomPackagingItem = {
  id: string;
  title: string;
  image: string;
  bgColor: string;
  /** Visual height hint — tall products vs compact ones */
  size: "sm" | "lg";
};

export const customPackagingContent = {
  title: "Customized Packaging",
  subtitle: "Your Logo, Your Design, Your Brand",
  stepsLine: "Get Your Packaging Material Customised In Just 3 steps.",
};

/**
 * Optional labels/sizes for known packaging ids.
 * Images are loaded dynamically from /public/custom — any file there is shown.
 * Order alternates sm/lg so column masonry packs tightly.
 */
export const customPackagingLayout: Omit<CustomPackagingItem, "image">[] = [
  { id: "jewelry-box", title: "Jewelry Box", bgColor: "#ffffff", size: "sm" },
  {
    id: "arjan-dugal-bag",
    title: "Branded Shopping Bag",
    bgColor: "#ffffff",
    size: "lg",
  },
  {
    id: "pink-city-tags",
    title: "Brand Tags & Labels",
    bgColor: "#ffffff",
    size: "sm",
  },
  { id: "hang-tags", title: "Hang Tags", bgColor: "#ffffff", size: "lg" },
  {
    id: "dark-star-woven-label",
    title: "Woven Label",
    bgColor: "#ffffff",
    size: "sm",
  },
  {
    id: "simar-dugal-bag",
    title: "Branded Carry Bag",
    bgColor: "#ffffff",
    size: "lg",
  },
  {
    id: "so-man-visiting-card",
    title: "Visiting Card",
    bgColor: "#ffffff",
    size: "sm",
  },
  {
    id: "shipping-carton-label",
    title: "Shipping Carton Label",
    bgColor: "#ffffff",
    size: "lg",
  },
];
