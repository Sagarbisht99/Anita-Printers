/** Central SEO keyword lists — Noida local + every print service Anita Printers offers. */

const brand = [
  "Anita Printers",
  "Anita Printers Noida",
  "anitaprinters.in",
  "Anita Printers Sector 2 Noida",
  "Anita Printers A-87 Sector 2",
] as const;

const noidaLocal = [
  "printing services Noida",
  "printing shop Noida",
  "printer near me Noida",
  "print shop Sector 2 Noida",
  "printing company Noida",
  "commercial printer Noida",
  "offset printing Noida",
  "screen printing Noida",
  "bulk printing Noida",
  "custom printing Noida",
  "printing press Noida",
  "digital printing Noida",
  "printing services Sector 2",
  "printing services Greater Noida",
  "printing services Delhi NCR",
  "printing services Ghaziabad",
  "printing services Uttar Pradesh",
  "Noida printing factory",
  "Noida print house",
  "best printer in Noida",
  "affordable printing Noida",
  "GST printing Noida",
] as const;

const offsetAndTechniques = [
  "offset printing",
  "offset printing services",
  "offset press printing",
  "commercial offset printing",
  "bulk offset printing",
  "screen printing",
  "screen printing services",
  "screen print shop",
  "custom screen printing",
  "DTF printing",
  "UV printing",
  "sublimation printing",
  "embroidery printing",
  "plastic material printing",
  "large format printing",
  "digital offset printing",
] as const;

const visitingCardsAndStationery = [
  "visiting card printing",
  "business card printing",
  "visiting card printing Noida",
  "business card printer Noida",
  "premium visiting cards",
  "matte finish visiting cards",
  "letterhead printing",
  "letterhead printing Noida",
  "corporate letterhead",
  "envelope printing",
  "bill book printing",
  "invoice book printing",
  "corporate stationery printing",
  "office stationery printing",
  "stationery printing Noida",
  "brochure printing",
  "brochure printing Noida",
  "pamphlet printing",
  "leaflet printing",
  "flyer printing",
  "catalog printing",
  "booklet printing",
  "poster printing",
  "poster printing Noida",
  "calendar printing",
  "diary printing",
  "notebook printing",
  "annual report printing",
  "presentation folder printing",
] as const;

const labelsStickersBarcodes = [
  "label printing",
  "label printing Noida",
  "custom label printing",
  "product label printing",
  "sticker printing",
  "sticker printing Noida",
  "custom sticker printing",
  "barcode printing",
  "barcode label printing",
  "barcode sticker",
  "hang tag printing",
  "product tag printing",
  "price tag printing",
  "gumming sheet printing",
  "self adhesive label",
] as const;

const packagingAndBags = [
  "custom packaging",
  "custom packaging Noida",
  "packaging printing",
  "product box printing",
  "custom box printing",
  "carton printing",
  "cosmetic box printing",
  "medicine box printing",
  "rigid box printing",
  "mithai box printing",
  "gift box printing",
  "carry bag printing",
  "paper bag printing",
  "shopping bag printing",
  "non woven bag printing",
  "courier bag printing",
  "packaging box manufacturer Noida",
  "custom packaging India",
] as const;

const flexAndOutdoor = [
  "flex printing",
  "flex banner printing",
  "flex printing Noida",
  "banner printing",
  "hoarding printing",
  "shop board printing",
  "signboard printing",
  "acrylic board printing",
  "sunpack printing",
  "outdoor banner printing",
  "event flex printing",
  "shop signage Noida",
] as const;

const weddingAndEvents = [
  "wedding card printing",
  "shadi card printing",
  "marriage card printing",
  "wedding invitation printing",
  "wedding card printing Noida",
  "invitation card printing",
  "gold foil wedding cards",
  "metallic wedding cards",
  "event invitation printing",
  "corporate event stationery",
] as const;

const apparelAndPromo = [
  "t shirt printing",
  "custom t shirt printing Noida",
  "polo t shirt printing",
  "hoodie printing",
  "cap printing",
  "uniform printing",
  "school uniform printing",
  "corporate t shirt printing",
  "event t shirt printing",
  "tote bag printing",
  "canvas bag printing",
  "mug printing",
  "pen printing",
  "lanyard printing",
  "promotional product printing",
  "corporate gifting printing",
  "custom apparel printing Noida",
] as const;

const bulkAndB2b = [
  "bulk printing",
  "bulk printing India",
  "bulk order printing",
  "wholesale printing",
  "corporate printing",
  "B2B printing services",
  "MOQ printing",
  "bulk visiting cards",
  "bulk labels",
  "bulk carry bags",
  "pan India printing delivery",
  "GST invoice printing",
  "company PO printing",
  "enterprise printing Noida",
] as const;

/** Dedupe while preserving order. */
export function mergeKeywords(
  ...groups: ReadonlyArray<readonly string[]>
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const group of groups) {
    for (const keyword of group) {
      const key = keyword.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(keyword);
      }
    }
  }
  return out;
}

/** Site-wide default — used in root layout metadata. */
export const defaultKeywords = mergeKeywords(
  brand,
  noidaLocal,
  offsetAndTechniques,
  visitingCardsAndStationery,
  labelsStickersBarcodes,
  packagingAndBags,
  flexAndOutdoor,
  weddingAndEvents,
  apparelAndPromo,
  bulkAndB2b,
);

export const homeKeywords = mergeKeywords(
  brand,
  noidaLocal,
  offsetAndTechniques,
  visitingCardsAndStationery,
  packagingAndBags,
  bulkAndB2b,
);

export const servicesKeywords = mergeKeywords(
  brand,
  noidaLocal,
  offsetAndTechniques,
  visitingCardsAndStationery,
  labelsStickersBarcodes,
  packagingAndBags,
  flexAndOutdoor,
  weddingAndEvents,
  apparelAndPromo,
);

export const productsKeywords = mergeKeywords(
  brand,
  noidaLocal,
  visitingCardsAndStationery,
  labelsStickersBarcodes,
  packagingAndBags,
  flexAndOutdoor,
  weddingAndEvents,
  apparelAndPromo,
  bulkAndB2b,
  [
    "printing products catalog",
    "bulk print products",
    "custom print catalog India",
    "print product catalogue Noida",
  ],
);

export const contactKeywords = mergeKeywords(brand, noidaLocal, bulkAndB2b, [
  "Anita Printers contact",
  "Anita Printers phone number",
  "printing quote Noida",
  "get printing quote",
  "bulk print enquiry",
  "WhatsApp printing order",
  "printing enquiry Noida",
  "call printer Noida",
  "print shop contact Noida",
]);

export const aboutKeywords = mergeKeywords(brand, noidaLocal, bulkAndB2b, [
  "about Anita Printers",
  "printing company Noida",
  "offset print shop Noida",
  "screen printing unit Noida",
  "established printer Noida",
  "trusted printer Noida",
]);

/** Appended to individual product pages after product-specific terms. */
export const productPageKeywords = mergeKeywords(
  brand,
  noidaLocal.slice(0, 8),
  bulkAndB2b.slice(0, 6),
  ["custom printing", "bulk printing", "print shop Noida"],
);
