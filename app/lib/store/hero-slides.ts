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
    href: "/services#offset",
    image: "/hero/banner-1.png",
  },
  {
    id: "banner-2",
    title: "Screen Printing — Apparel, Bags & Specialty",
    href: "/services#screen",
    image: "/hero/banner-2.png",
  },
  {
    id: "banner-3",
    title: "Corporate, Retail, Events & Schools",
    href: "/services#who-we-serve",
    image: "/hero/banner-3.png",
  },
];
