/** Shared site map for the /sitemap page. */
export const siteMapSections = [
  {
    id: "main",
    title: "Main pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/#faq", label: "FAQs" },
    ],
  },
  {
    id: "services",
    title: "Printing services",
    links: [
      { href: "/services#what-we-print", label: "What we print" },
      { href: "/services#offset", label: "Offset printing" },
      { href: "/services#screen", label: "Screen printing" },
      { href: "/services#who-we-serve", label: "Who we serve" },
    ],
  },
  {
    id: "search",
    title: "Search the catalogue",
    links: [
      { href: "/products?q=tag", label: "Hang tags" },
      { href: "/products?q=label", label: "Woven labels" },
      { href: "/products?q=sticker", label: "Sticker labels" },
      { href: "/products?q=card", label: "Visiting cards" },
      { href: "/products?q=envelope", label: "Envelopes" },
      { href: "/products?q=insert", label: "Insert cards" },
    ],
  },
  {
    id: "legal",
    title: "Policies",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/shipping", label: "Shipping Policy" },
      { href: "/refund", label: "Refund Policy" },
    ],
  },
] as const;
