/** Mock catalog — replace with server actions later. */

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
  blurb: string;
  image?: string | null;
};

export type StoreProduct = {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  priceFrom: number;
  unit: string;
  description: string;
  badge?: string;
};

export const storeCategories: StoreCategory[] = [
  {
    id: "1",
    name: "Visiting Cards",
    slug: "visiting-cards",
    blurb: "Offset bulk & premium matte finishes",
  },
  {
    id: "2",
    name: "Notebooks & Diaries",
    slug: "notebooks-diaries",
    blurb: "Offset covers for offices & schools",
  },
  {
    id: "3",
    name: "Office Stationery",
    slug: "office-stationery",
    blurb: "Letterheads, envelopes, bill books",
  },
  {
    id: "4",
    name: "Mugs & Drinkware",
    slug: "mugs-drinkware",
    blurb: "Screen / sublimation that lasts",
  },
  {
    id: "5",
    name: "T-shirts & Apparel",
    slug: "tshirts-apparel",
    blurb: "Screen print tees, uniforms & hoodies",
  },
  {
    id: "6",
    name: "Photo Frames & Gifts",
    slug: "photo-frames-gifts",
    blurb: "Corporate & wedding return gifts",
  },
  {
    id: "7",
    name: "Signs & Posters",
    slug: "signs-posters",
    blurb: "Offset posters & screen signboards",
  },
  {
    id: "8",
    name: "Stickers & Packaging",
    slug: "stickers-packaging",
    blurb: "Boxes, labels, paper carry bags",
  },
];
export const storeProducts: StoreProduct[] = [
  {
    id: "p1",
    title: "Matte Visiting Cards",
    slug: "matte-visiting-cards",
    categorySlug: "visiting-cards",
    priceFrom: 299,
    unit: "100 pcs",
    description: "300 GSM matte cards with sharp colour and clean edges.",
    badge: "Popular",
  },
  {
    id: "p2",
    title: "Spot UV Business Cards",
    slug: "spot-uv-business-cards",
    categorySlug: "visiting-cards",
    priceFrom: 549,
    unit: "100 pcs",
    description: "Selective gloss highlights on a soft-touch matte base.",
  },
  {
    id: "p3",
    title: "A5 Hardbound Diary",
    slug: "a5-hardbound-diary",
    categorySlug: "notebooks-diaries",
    priceFrom: 349,
    unit: "each",
    description: "Custom cover print with ruled inner pages.",
    badge: "New",
  },
  {
    id: "p4",
    title: "Company Letterheads",
    slug: "company-letterheads",
    categorySlug: "office-stationery",
    priceFrom: 399,
    unit: "100 sheets",
    description: "A4 letterheads on premium bond paper.",
  },
  {
    id: "p5",
    title: "Classic White Ceramic Mug",
    slug: "classic-white-ceramic-mug",
    categorySlug: "mugs-drinkware",
    priceFrom: 249,
    unit: "each",
    description: "Dishwasher-safe print for logos, photos, and gifts.",
    badge: "Just launched",
  },
  {
    id: "p6",
    title: "Custom Cotton T-Shirt",
    slug: "custom-cotton-tshirt",
    categorySlug: "tshirts-apparel",
    priceFrom: 449,
    unit: "each",
    description: "Soft cotton tees with durable screen or DTG print.",
  },
  {
    id: "p7",
    title: "Personalised Photo Frame",
    slug: "personalised-photo-frame",
    categorySlug: "photo-frames-gifts",
    priceFrom: 399,
    unit: "each",
    description: "Wooden and acrylic frames with custom print inserts.",
  },
  {
    id: "p8",
    title: "Event Poster A2",
    slug: "event-poster-a2",
    categorySlug: "signs-posters",
    priceFrom: 199,
    unit: "each",
    description: "Bright outdoor-ready posters for promotions and events.",
  },
  {
    id: "p9",
    title: "Die-cut Stickers",
    slug: "die-cut-stickers",
    categorySlug: "stickers-packaging",
    priceFrom: 149,
    unit: "50 pcs",
    description: "Waterproof vinyl stickers cut to your artwork shape.",
  },
  {
    id: "p10",
    title: "Product Packaging Labels",
    slug: "product-packaging-labels",
    categorySlug: "stickers-packaging",
    priceFrom: 299,
    unit: "100 pcs",
    description: "Roll labels for bottles, boxes, and retail packaging.",
  },
  {
    id: "p11",
    title: "Polo Shirt Branding",
    slug: "polo-shirt-branding",
    categorySlug: "tshirts-apparel",
    priceFrom: 599,
    unit: "each",
    description: "Collar polos with embroidery or print options.",
  },
  {
    id: "p12",
    title: "Notebook Soft Cover",
    slug: "notebook-soft-cover",
    categorySlug: "notebooks-diaries",
    priceFrom: 179,
    unit: "each",
    description: "Lightweight notebooks ideal for events and onboarding kits.",
  },
];

/** Homepage promo tiles — Scale Your Order section. */
export const bulkPromoTiles = [
  {
    id: "bulk-main",
    eyebrow: null as string | null,
    title: "Barcode",
    body: "A0 to A3 large-format posters for shops, events, and campaigns — volume discounts when you buy more.",
    cta: "Order Now",
    href: "/quote",
    tone: "navy" as const,
    span: "main" as const,
    image:
      "https://5.imimg.com/data5/GLADMIN/Default/2022/12/KP/PI/ZG/3544741/flexo-rotary-label-printing-machine.jpg",
  },
  {
    id: "bulk-packaging",
    eyebrow: "sticker printing machine roll production",
    title: "Wedding invitations",
    body: "Custom wedding cards and banners for shaadi season — festive prints that feel premium.",
    cta: null as string | null,
    href: "/services#who-we-serve",
    tone: "kraft" as const,
    span: "wide" as const,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxt07I8B20tFX7p_GcAmhULZL3Npl61fjHxqtBQXRSPDbdoe0E0Z8hZ6s&s=10",
  },
  {
    id: "bulk-cards",
    eyebrow: null as string | null,
    title: "abel printing press roll converting machine",
    body: "Premium gift boxes and return packaging for sweets brands and wedding favours.",
    cta: null as string | null,
    href: "/services#offset",
    tone: "olive" as const,
    span: "half" as const,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2024/1/379681212/HG/JP/FJ/202238679/multicolor-offset-printing-services-500x500.png",
  },
  {
    id: "bulk-gifts",
    eyebrow: null as string | null,
    title: "letterhead printing offset press machine",
    body: "Presentation folders and report covers for corporate kits, institutes, and pitches.",
    cta: null as string | null,
    href: "/services#offset",
    tone: "teal" as const,
    span: "half" as const,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2025/4/506278987/ML/IB/UB/107253930/paper-offset-printing-press-500x500.jpg",
  },
];

export const businessSegments = [
  {
    id: "seg-corporate",
    title: "Corporate & B2B",
    body: "ID cards, lanyards, uniforms, diaries, bill books, business cards, and brochures.",
    href: "/services#who-we-serve",
  },
  {
    id: "seg-retail",
    title: "Retail & Packaging",
    body: "Custom carry bags, product boxes, and stickers for shops and brands.",
    href: "/services#who-we-serve",
  },
  {
    id: "seg-events",
    title: "Event & Marriage",
    body: "Wedding cards, event tees, invitations, and return-gift packaging.",
    href: "/services#who-we-serve",
  },
  {
    id: "seg-school",
    title: "School & Institute",
    body: "Uniforms, notebooks, diaries, ID lanyards, and institute brochures.",
    href: "/services#who-we-serve",
  },
];
export const qualityShowcaseItems = [
  {
    id: "qs-bottle",
    title: "Custom Water Bottles",
    priceFrom: 349,
  },
  {
    id: "qs-clock",
    title: "Acrylic Photo Clock",
    priceFrom: 299,
  },
  {
    id: "qs-frame",
    title: "Wooden Photo Frame",
    priceFrom: 399,
  },
  {
    id: "qs-notebook",
    title: "Personalised Notebooks",
    priceFrom: 179,
  },
];

export const storeReviews = [
  {
    id: "r1",
    title: "Excellent print quality",
    body: "Ordered visiting cards and a mug set. Colours came out sharp and the finish felt premium.",
    name: "Mehek",
    rating: 5,
  },
  {
    id: "r2",
    title: "Good service & quality",
    body: "Quick turnaround on our office stationery. Team was clear on paper options and pricing.",
    name: "Srinivas",
    rating: 5,
  },
  {
    id: "r3",
    title: "Very professional",
    body: "Custom t-shirts for our staff event looked consistent across sizes. Will order again.",
    name: "Cyril Bosco",
    rating: 5,
  },
  {
    id: "r4",
    title: "Reliable for bulk",
    body: "We needed 500 labels and posters. Delivery was on time and packaging was careful.",
    name: "Ananya",
    rating: 4,
  },
];

export function formatInr(amount: number) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export function getMockProducts() {
  return storeProducts;
}

export function getMockCategories() {
  return storeCategories;
}

export function getMockProductBySlug(slug: string) {
  return storeProducts.find((product) => product.slug === slug) ?? null;
}
