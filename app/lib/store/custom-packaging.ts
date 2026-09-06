export type CustomPackagingItem = {
  id: string;
  title: string;
  image: string;
  bgColor: string;
  /** Desktop masonry column (1–4) */
  gridColumn: number;
  /** Desktop masonry row placement, e.g. "1 / span 4" */
  gridRow: string;
  /** Image max height class tier for card proportions */
  imageSize: "sm" | "md" | "lg";
};

export const customPackagingContent = {
  title: "Customized Packaging",
  subtitle: "Your Logo, Your Design, Your Brand",
  stepsLine: "Get Your Packaging Material Customised In Just 3 steps.",
};

/**
 * Optional layout + labels for known packaging ids.
 * Images are loaded dynamically from /public/custom — any file there is shown.
 * Desktop uses masonry placement (mixed tall / short cards).
 */
export const customPackagingLayout: Omit<CustomPackagingItem, "image">[] = [
  {
    id: "security-envelopes",
    title: "Security Envelopes",
    bgColor: "#e8ecff",
    gridColumn: 1,
    gridRow: "1 / span 2",
    imageSize: "sm",
  },
  {
    id: "color-carry-bags",
    title: "Color Carry Bags",
    bgColor: "#ffd8d8",
    gridColumn: 2,
    gridRow: "1 / span 4",
    imageSize: "lg",
  },
  {
    id: "corrugated-box",
    title: "Corrugated box",
    bgColor: "#fde5d5",
    gridColumn: 3,
    gridRow: "1 / span 3",
    imageSize: "md",
  },
  {
    id: "jewelry-box",
    title: "Jewelry Box",
    bgColor: "#ffffff",
    gridColumn: 4,
    gridRow: "1 / span 2",
    imageSize: "sm",
  },
  {
    id: "dcut-carry-bags",
    title: "Dcut Carry Bags",
    bgColor: "#fde5d5",
    gridColumn: 1,
    gridRow: "3 / span 4",
    imageSize: "lg",
  },
  {
    id: "ecommerce-packaging",
    title: "E-Commerce Packaging",
    bgColor: "#f0f2f5",
    gridColumn: 2,
    gridRow: "5 / span 2",
    imageSize: "sm",
  },
  {
    id: "stand-up-pouches",
    title: "Stand Up Pouches",
    bgColor: "#f5e8ff",
    gridColumn: 3,
    gridRow: "4 / span 3",
    imageSize: "md",
  },
  {
    id: "arjan-dugal-bag",
    title: "Branded Shopping Bag",
    bgColor: "#f0f2f5",
    gridColumn: 4,
    gridRow: "3 / span 4",
    imageSize: "lg",
  },
  {
    id: "color-courier-bags",
    title: "Color Courier Bags",
    bgColor: "#fde5d5",
    gridColumn: 3,
    gridRow: "7 / span 2",
    imageSize: "sm",
  },
];
