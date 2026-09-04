export type HeroSlide = {
  id: string;
  title: string;
  href: string;
  image: string;
};

/** Local banners from /public/hero */
export const heroSlides: HeroSlide[] = [
  {
    id: "banner-1",
    title: "Offset Printing — Bulk Stationery & Packaging",
    href: "/products",
    image: "/hero/banner-1.png",
  },
  {
    id: "banner-2",
    title: "Screen Printing — Apparel, Bags & Specialty",
    href: "/products",
    image: "/hero/banner-2.png",
  },
  {
    id: "banner-3",
    title: "Corporate, Retail, Events & Schools",
    href: "/products",
    image: "/hero/banner-3.png",
  },
];
