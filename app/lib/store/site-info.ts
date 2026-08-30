/** Central site identity & contact — single source for footer, top bar, contact page. */

const WHATSAPP_NUMBER = "919810275776";

/** Pre-filled WhatsApp message when visitors tap the WhatsApp icon or link. */
export const whatsappMessages = {
  bulkOrder: `Hi Anita Printers,

I visited anitaprinters.in and would like to place a bulk order.

Product / service:
Quantity:
Size / specifications:
Delivery city:

Please share MOQ, rate, and delivery timeline.

Thank you!`,
} as const;

export function buildWhatsAppUrl(message: string, phone = WHATSAPP_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const siteInfo = {
  brand: "Anita Printers",
  tagline: "Offset & Screen Printing",
  gstin: "09ELTPR0657G1ZF",
  email: "anitaprintersa87@gmail.com",
  hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
  addressLines: [
    "Anita Printers",
    "A-87, Sector-2",
    "Noida - 201301 (U.P.)",
  ],
  phones: [
    {
      label: "Mobile",
      display: "+91 98102 75776",
      href: "tel:+919810275776",
      digits: "9810275776",
    },
  ],
  landline: {
    label: "Landline",
    display: "0120-4338528",
    href: "tel:+911204338528",
  },
  /** Primary number for header / WhatsApp / quick dial. */
  primaryPhone: {
    display: "+91 98102 75776",
    href: "tel:+919810275776",
  },
  whatsappNumber: WHATSAPP_NUMBER,
  /** Profile link for structured data — no pre-filled text. */
  whatsappBase: `https://wa.me/${WHATSAPP_NUMBER}`,
  /** Opens WhatsApp with bulk-order enquiry text pre-filled. */
  whatsapp: buildWhatsAppUrl(whatsappMessages.bulkOrder),
  mapEmbed:
    "https://maps.google.com/maps?q=A-87%20Sector-2%20Noida%20201301&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapQuery: "A-87, Sector-2, Noida - 201301 (U.P.)",
} as const;

/**
 * Legacy-shaped contact object used across storefront components.
 * Prefer `siteInfo` for new code.
 */
export const siteContact = {
  phone: siteInfo.primaryPhone.display,
  phoneHref: siteInfo.primaryPhone.href,
  phones: siteInfo.phones,
  landline: siteInfo.landline,
  whatsapp: siteInfo.whatsapp,
  whatsappBase: siteInfo.whatsappBase,
  email: siteInfo.email,
  hours: siteInfo.hours,
  gstin: siteInfo.gstin,
  addressLines: [...siteInfo.addressLines],
  mapEmbed: siteInfo.mapEmbed,
};
