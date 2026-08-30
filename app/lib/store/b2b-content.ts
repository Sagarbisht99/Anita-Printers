/** Static B2B storefront copy — keep pages content-rich without empty shells. */

export { siteContact, siteInfo } from "@/app/lib/store/site-info";

export const usps = [
  {
    title: "Offset for bulk paper",
    body: "Visiting cards, letterheads, brochures, catalogs, boxes, and calendars — unit cost drops as quantity rises.",
  },
  {
    title: "Screen for specialty",
    body: "Durable ink on tees, uniforms, tote bags, non-woven bags, signboards, mugs, and metallic plates.",
  },
  {
    title: "One floor, many jobs",
    body: "Corporate kits, retail packaging, wedding stationery, and school uniforms — proof-first, then scale.",
  },
  {
    title: "Nationwide delivery",
    body: "Cartons with packing lists, GST invoices, and multi-city dropship for offices, shops, and venues.",
  },
];

export const processSection = {
  title: "How to order from us",
  subtitle:
    "Four simple steps — from your first call to printed material at your door. Proof first, then production.",
};

export const processSteps = [
  {
    step: "1",
    title: "Share your requirement",
    body: "Tell us what you need — visiting cards, labels, carry bags, boxes, flex, wedding cards, or apparel. Mention quantity, size, and delivery city on the quote form, call us, or WhatsApp.",
    href: "/contact",
    cta: "Get a quote",
  },
  {
    step: "2",
    title: "Send design & get price",
    body: "Share your AI, PDF, PNG, or CDR file on WhatsApp or email. We reply with rate, minimum quantity, and delivery date — usually the same working day.",
    href: "/contact",
    cta: "Contact us",
  },
  {
    step: "3",
    title: "Approve proof & pay advance",
    body: "Check the digital proof on WhatsApp. Confirm colours, size, and packing. Pay advance to book your slot — printing starts only after you approve.",
    href: "/contact",
    cta: "Request proof",
  },
  {
    step: "4",
    title: "We print & deliver",
    body: "Production, quality check, and packing at our Noida unit. GST invoice with your order — delivered to your office, shop, or event venue anywhere in India.",
    href: "/contact",
    cta: "Talk to us",
  },
];

export const quoteItemOptions = [
  "Visiting Card",
  "Letterhead",
  "Barcode / Sticker / Label / Tag",
  "Brochure / Leaflet / Flyer",
  "Poster / Flex",
  "Carry Bag",
  "Box / Packaging",
  "Shadi / Wedding Card",
  "Plastic Material Printing",
  "Custom T-Shirt / Polo / Uniform",
  "Hoodie / Sweatshirt / Cap",
  "Mug / Pen / Lanyard / Gifting",
  "Notebooks / Diaries",
  "Other / Custom",
];

export const catalogFilters = {
  techniques: [
    "Screen Print",
    "DTF",
    "Embroidery",
    "UV Printing",
    "Offset",
    "Sublimation",
  ],
  materials: ["180 GSM", "220 GSM", "280 GSM", "300 GSM Card", "350 GSM Card", "Cotton Blend"],
  moqRanges: ["1–50", "51–100", "101–500", "500+"],
  leadTimes: ["3–5 days", "5–8 days", "8–12 days", "12+ days"],
};

export const defaultPriceTiers = [
  { range: "50–100 pcs", label: "Pilot", multiplier: 1 },
  { range: "101–500 pcs", label: "Growth", multiplier: 0.88 },
  { range: "501–2,000 pcs", label: "Bulk", multiplier: 0.76 },
  { range: "2,000+ pcs", label: "Enterprise", multiplier: 0.68 },
];

export const printLocations = [
  "Front chest",
  "Full front",
  "Back",
  "Sleeve",
  "Neck label",
  "Card face / reverse",
  "Letterhead header",
  "Packaging panel",
  "Bag side / strap",
  "Full coverage",
];

/** Full Offset + Screen service catalogue for the /services page. */
export const printingServiceCatalog = {
  headline: "Offset & screen printing under one roof",
  support:
    "Barcode, stickers, labels, tags, letterheads, visiting cards, plastic printing, brochures, posters, leaflets, carry bags, boxes, flex, and shadi cards — plus apparel and specialty jobs. Anita Printers matches technique to quantity, material, and finish.",
  /** Core products the company prints every day — text first; images can follow later. */
  coreProducts: [
    {
      id: "line-1",
      title: "Everyday commercial print",
      items: [
        "Barcode",
        "Sticker",
        "Label",
        "Tag",
        "Letterhead",
        "Visiting Card",
        "Plastic Material Printing",
      ],
    },
    {
      id: "line-2",
      title: "Marketing, packaging & events",
      items: [
        "Brochures",
        "Posters",
        "Leaflets",
        "Carry Bag",
        "Box",
        "Flex",
        "Shadi Card",
        "And more",
      ],
    },
  ],
  techniques: [
    {
      id: "offset",
      name: "Offset Printing",
      eyebrow: "Commercial & bulk printing",
      summary:
        "Best for mass production and bulk orders. As quantity rises, per-unit cost falls — ideal for visiting cards, letterheads, brochures, posters, leaflets, boxes, carry bags, and high-volume paper jobs.",
      image:
        "https://content.jdmagicbox.com/v2/comp/kolkata/t8/033pxx33.xx33.260122143452.v1t8/catalogue/quality-digital-technology-kolkata-dry-offset-printing-machine-manufacturers-634w10nlzt.jpg",
      groups: [
        {
          title: "Business & marketing stationery",
          items: [
            "Visiting cards / business cards (bulk & premium matte finish)",
            "Letterheads, envelopes, and bill books / invoices",
            "Brochures, pamphlets, leaflets, and flyers",
            "Catalogs and product books",
          ],
        },
        {
          title: "Labels, tags & identification",
          items: [
            "Barcodes for retail, inventory, and logistics",
            "Stickers and labels (paper & gumming sheets)",
            "Hang tags and product tags",
          ],
        },
        {
          title: "Publishing & binding",
          items: [
            "Books, magazines, and newsletters",
            "Notebooks, diaries, and pocket planners",
            "Annual reports and presentation folders",
          ],
        },
        {
          title: "Packaging & outdoor",
          items: [
            "Custom product boxes (cartons, cosmetic boxes, medicine boxes)",
            "Paper carry bags / shopping bags",
            "Posters and large-format paper posters",
            "Flex banners for shops, events, and outdoor display",
          ],
        },
        {
          title: "Seasonal & promotional",
          items: [
            "Desktop and wall calendars",
            "Invitation cards (wedding / shadi cards & corporate events)",
            "Leaflets and campaign handouts",
          ],
        },
      ],
    },
    {
      id: "screen",
      name: "Screen Printing",
      eyebrow: "Custom & specialty printing",
      summary:
        "Best for printing on fabric, plastic, wood, metal, glass, and thick paper. Screen inks are deep and durable — built for apparel, plastic material printing, bags, signage, and premium stationery.",
      image:
        "/banner.png",
      groups: [
        {
          title: "Apparel & textiles",
          items: [
            "T-shirts (customised, corporate branding, event tees)",
            "Hoodies, jackets, and sweatshirts",
            "Caps / hats",
            "Canvas bags, tote bags, and cotton carry bags",
            "Uniforms (school, factory, hotel staff)",
          ],
        },
        {
          title: "Plastic & specialty materials",
          items: [
            "Plastic material printing (bottles, boxes, containers)",
            "Non-woven bags (D-cut & W-cut for retail)",
            "Acrylic boards, sunpack sheets, and signboards",
            "Metallic plates / nameplates (stainless steel, brass, aluminium)",
          ],
        },
        {
          title: "Promotional & corporate gifting",
          items: [
            "Mug printing (screen / sublimation hybrid)",
            "Pens, keychains, and lanyards",
            "Mousepads and umbrellas",
          ],
        },
        {
          title: "Wedding & premium stationery",
          items: [
            "Shadi / wedding cards (raised metallic / gold-foil designs)",
            "Rigid boxes (mithai boxes, gift boxes)",
            "Invitation suites for marriages and events",
          ],
        },
      ],
    },
  ],
  audiences: [
    {
      id: "corporate",
      title: "Corporate & B2B",
      body: "Visiting cards, letterheads, barcodes, labels, tags, bill books, brochures, ID cards, lanyards, and uniform tees for companies.",
    },
    {
      id: "retail",
      title: "Retail & packaging",
      body: "Stickers, labels, barcodes, carry bags, product boxes, posters, flex, and plastic printing for shops and brands.",
    },
    {
      id: "events",
      title: "Event & marriage",
      body: "Shadi cards, invitation cards, leaflets, posters, flex, event tees, and return-gift packaging.",
    },
    {
      id: "institutes",
      title: "School & institute",
      body: "Letterheads, brochures, posters, tags, uniforms, notebooks, diaries, and ID lanyards for schools and institutes.",
    },
  ],
} as const;

export const aboutProfile = {
  headline: "Offset for bulk. Screen for specialty. One accountable partner.",
  body: "Anita Printers is a Noida-based production partner for brands, agencies, shops, event planners, and institutes. We print barcodes, stickers, labels, tags, letterheads, visiting cards, plastic materials, brochures, posters, leaflets, carry bags, boxes, flex, and shadi cards — with commercial offset and durable screen printing under one roof.",
  capacity: [
    { label: "Daily apparel capacity", value: "8,000+ units" },
    { label: "Press & embroidery heads", value: "42 stations" },
    { label: "QC checkpoints", value: "5-stage" },
    { label: "Cities served last year", value: "110+" },
  ],
};

export const artworkGuidelines = [
  {
    title: "Resolution",
    body: "Raster artwork at 300 DPI at final print size. Avoid upscaling low-res social exports.",
  },
  {
    title: "Vector preference",
    body: "Logos and line art as AI, EPS, or PDF with outlined fonts. Keeps edges crisp for screen & embroidery.",
  },
  {
    title: "Colour mode",
    body: "Supply CMYK for offset/UV cards. RGB is accepted for DTF proofs — we convert and share a soft proof.",
  },
  {
    title: "Bleed & margins",
    body: "Add 3 mm bleed on cards and stationery. Keep critical text 5 mm inside trim.",
  },
  {
    title: "File naming",
    body: "Brand_Product_Placement_Version (e.g. Orbit_Tee_Front_v3.pdf).",
  },
  {
    title: "Fonts & effects",
    body: "Outline fonts. Convert special effects to outlined paths or high-res raster where needed.",
  },
];

export const faqs = [
  {
    q: "What are your MOQs?",
    a: "Apparel usually starts at 25–50 pieces depending on decoration. Cards and stationery from 50–100. Ask for sample-box pricing if you need to validate before bulk.",
  },
  {
    q: "How long does bulk production take?",
    a: "After artwork approval: cards 3–7 days, apparel 5–12 days, complex kits 8–14 days. Event rush slots are quoted separately.",
  },
  {
    q: "Do you ship pan-India?",
    a: "Yes. We dispatch via courier partners with tracking. Multi-location splits and venue delivery are available for corporate accounts.",
  },
  {
    q: "Can I order a sample before bulk?",
    a: "Yes. Sample boxes or 1–5 piece decorated samples are available. Sample cost is often adjustable against a confirmed bulk PO.",
  },
  {
    q: "What is your policy on custom returns?",
    a: "Custom-printed goods are non-returnable except for manufacturing defects. We share proofs and optional samples to lock quality before production.",
  },
  {
    q: "Do you support GST and purchase orders?",
    a: "Yes. We issue GST invoices and can work against company POs. Net 30/60 terms are available for approved enterprise accounts.",
  },
  {
    q: "Which print techniques do you offer?",
    a: "We print barcodes, stickers, labels, tags, letterheads, visiting cards, plastic materials, brochures, posters, leaflets, carry bags, boxes, flex, and shadi cards — plus apparel and specialty jobs. Offset for bulk paper; screen for fabric and plastic. See the full list on Services.",
  },
  {
    q: "When should I choose offset vs screen printing?",
    a: "Choose offset for visiting cards, letterheads, brochures, leaflets, posters, boxes, and high-volume paper jobs. Choose screen for plastic material printing, apparel, bags, flex-related specialty surfaces, and durable ink on fabric or plastic.",
  },
  {
    q: "What artwork files do you need?",
    a: "Vector AI/PDF/EPS for logos, or high-res PNG/TIFF at 300 DPI. Share pantone codes when brand colour must match. Our team helps clean files before proof.",
  },
  {
    q: "How do payments work for bulk orders?",
    a: "Most jobs start with an advance against the quote, with balance before dispatch. Enterprises can request invoice terms after credit approval.",
  },
  {
    q: "Can you reprint the same order later?",
    a: "Yes. We archive approved artwork and specs so reorders are faster and colour-matched. Just share the previous PO or job reference.",
  },
];
