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
    blurb: "Premium finishes for first impressions",
  },
  {
    id: "2",
    name: "Notebooks & Diaries",
    slug: "notebooks-diaries",
    blurb: "Custom covers and paper options",
  },
  {
    id: "3",
    name: "Office Stationery",
    slug: "office-stationery",
    blurb: "Letterheads, envelopes, notepads",
  },
  {
    id: "4",
    name: "Mugs & Drinkware",
    slug: "mugs-drinkware",
    blurb: "Print that lasts wash after wash",
  },
  {
    id: "5",
    name: "T-shirts & Apparel",
    slug: "tshirts-apparel",
    blurb: "Tees, caps, hoodies & more",
  },
  {
    id: "6",
    name: "Photo Frames & Gifts",
    slug: "photo-frames-gifts",
    blurb: "Personalised gifts that feel premium",
  },
  {
    id: "7",
    name: "Signs & Posters",
    slug: "signs-posters",
    blurb: "Marketing prints for shops & events",
  },
  {
    id: "8",
    name: "Stickers & Packaging",
    slug: "stickers-packaging",
    blurb: "Labels, stickers, packaging wraps",
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
    title: "Buy More. Save More",
    body: "Maximize your savings with volume discounts on packaging, gifts, and print.",
    cta: "Order Now",
    href: "/contact",
    tone: "navy" as const,
    span: "main" as const,
    image: "https://www.arcprint.in/images/home/image-1.jpg",
  },
  {
    id: "bulk-packaging",
    eyebrow: "custom packaging",
    title: "Shop Smart, Save Big!",
    body: "Branded bulk packaging that looks premium and ships ready for retail.",
    cta: null as string | null,
    href: "/#products",
    tone: "kraft" as const,
    span: "wide" as const,
    image: "https://www.arcprint.in/images/home/image-2.jpg",
  },
  {
    id: "bulk-cards",
    eyebrow: null as string | null,
    title: "More Cards, More Impact",
    body: "Bulk visiting card printing — fast, affordable, and seamless.",
    cta: null as string | null,
    href: "/#products",
    tone: "olive" as const,
    span: "half" as const,
    image: "https://www.arcprint.in/images/home/image-3.jpg",
  },
  {
    id: "bulk-gifts",
    eyebrow: null as string | null,
    title: "Refined. Ready. Gifted.",
    body: "Premium diary and pen sets crafted for corporate bulk orders.",
    cta: null as string | null,
    href: "/#products",
    tone: "teal" as const,
    span: "half" as const,
    image: "https://www.arcprint.in/images/home/image-4.jpg",
  },
];

export const businessSegments = [
  {
    id: "seg-startup",
    title: "Startup Business",
    body: "Brand kits, cards, and stationery that look established from day one.",
    href: "/contact",
  },
  {
    id: "seg-events",
    title: "Events and Promotions",
    body: "Banners, posters, and giveaways ready for launches and campaigns.",
    href: "/contact",
  },
  {
    id: "seg-cafe",
    title: "Cafe and Restaurants",
    body: "Menus, packaging, mugs, and labels tuned for hospitality brands.",
    href: "/contact",
  },
  {
    id: "seg-employee",
    title: "Employee Engagement",
    body: "Onboarding kits, notebooks, and apparel for teams that stay on-brand.",
    href: "/contact",
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
