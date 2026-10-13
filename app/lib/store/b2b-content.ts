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
    title: "Customisation support",
    body: "Sizes, colours, finishes, and artwork assistance — configured per product and confirmed in your quotation.",
  },
  {
    title: "GST invoices & delivery",
    body: "GST invoices on every order, with courier dispatch from our Noida unit to your office, shop, or venue.",
  },
];

export const processSection = {
  title: "How to order from us",
  subtitle:
    "Simple process — share what you need, approve the proof, we print and deliver from Noida.",
};

export const processSteps = [
  {
    step: "1",
    title: "Tell us what you need",
    body: "Share the product (cards, stickers, bags, boxes, flex, wedding cards, etc.), quantity, size, colour, and your city. Use Get a Quote on the site, call, or WhatsApp.",
    href: "/contact",
    cta: "Get a quote",
  },
  {
    step: "2",
    title: "Receive quotation",
    body: "Share your artwork (AI, PDF, PNG, or CDR) on WhatsApp or email. We review it and send a written quotation with pricing, MOQ, and timeline.",
    href: "/contact",
    cta: "Contact us",
  },
  {
    step: "3",
    title: "Approve proof, then we print",
    body: "You get a digital proof before printing. Confirm size, colour, and packing. Printing starts only after you approve the proof.",
    href: "/contact",
    cta: "Talk to us",
  },
  {
    step: "4",
    title: "Packing & delivery",
    body: "We print, check quality, and pack at our Noida unit. You get a GST invoice and courier delivery to your office, shop, or venue across India.",
    href: "/contact",
    cta: "Reach us",
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
      image: "/banner.png",
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
  capacity: [] as Array<{ label: string; value: string }>,
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
    q: "What is the minimum order quantity (MOQ)?",
    a: "MOQ depends on the product and specifications. Each product page lists its confirmed MOQ. Share your requirements and we will confirm whether your quantity can be produced.",
  },
  {
    q: "How long does bulk production take?",
    a: "Production timeline is confirmed in your written quotation after artwork and specifications are locked. Tell us your deadline when you enquire and we will confirm what is achievable.",
  },
  {
    q: "Do you deliver across India?",
    a: "We dispatch via courier partners from our Noida unit. Share your delivery city in the quote request and we will confirm shipping as part of the quotation.",
  },
  {
    q: "Can I request a sample before a bulk order?",
    a: "Sample availability, charges, and process depend on the product. Mention your sample requirement in the quote request and we will confirm what is possible.",
  },
  {
    q: "What is your policy on custom returns?",
    a: "Custom-printed goods are produced to your approved specifications. Proofs are shared before printing so you can lock size, colour, and layout. Raise any manufacturing concern with us after delivery.",
  },
  {
    q: "Do you provide GST invoices?",
    a: "Yes. We issue GST invoices for orders. Mention any company or PO requirements in your enquiry.",
  },
  {
    q: "Which print techniques do you offer?",
    a: "Offset printing for bulk paper jobs and screen printing for fabric, plastic, and specialty surfaces. See the Services page for the full list of what we print.",
  },
  {
    q: "When should I choose offset vs screen printing?",
    a: "Choose offset for visiting cards, letterheads, brochures, leaflets, posters, boxes, and high-volume paper jobs. Choose screen for apparel, bags, plastic material printing, and durable ink on fabric or plastic.",
  },
  {
    q: "What artwork files do you need?",
    a: "Vector AI/PDF/EPS for logos, or high-res PNG/TIFF at 300 DPI. Share pantone codes when brand colour must match. Our team reviews files before proofing and will tell you if anything needs fixing.",
  },
  {
    q: "How do payments work for bulk orders?",
    a: "Payment terms are confirmed with your quotation. We will clearly state any advance requirement before production starts.",
  },
  {
    q: "Can you reprint the same order later?",
    a: "Yes. Share your previous job reference when reordering and we will match the approved artwork and specifications.",
  },
];
