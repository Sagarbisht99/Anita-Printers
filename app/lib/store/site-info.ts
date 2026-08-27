/** Central site identity & contact — single source for footer, top bar, contact page. */

export const siteInfo = {
  brand: "Anita Printers",
  tagline: "Offset & Screen Printing",
  gstin: "09AFZPR5565B1ZR",
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
      display: "+91 92102 00414",
      href: "tel:+919210200414",
      digits: "9210200414",
    },
    {
      label: "Mobile",
      display: "+91 98102 75776",
      href: "tel:+919810275776",
      digits: "9810275776",
    },
    {
      label: "Mobile",
      display: "+91 93117 93437",
      href: "tel:+919311793437",
      digits: "9311793437",
    },
  ],
  landline: {
    label: "Landline",
    display: "0120-4338528",
    href: "tel:+911204338528",
  },
  /** Primary number for header / WhatsApp / quick dial. */
  primaryPhone: {
    display: "+91 92102 00414",
    href: "tel:+919210200414",
  },
  whatsapp: "https://wa.me/919210200414",
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
  email: siteInfo.email,
  hours: siteInfo.hours,
  gstin: siteInfo.gstin,
  addressLines: [...siteInfo.addressLines],
  mapEmbed: siteInfo.mapEmbed,
};
