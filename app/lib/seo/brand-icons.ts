/**
 * Brand mark — always derive favicons / PWA icons from `/logo.svg`.
 * Keep sizes in sync when regenerating from the SVG.
 */
export const brandLogo = {
  svg: "/logo.svg",
  faviconIco: "/favicon.ico",
  favicon16: "/favicon-16.png",
  favicon32: "/favicon-32.png",
  favicon48: "/favicon-48.png",
  favicon52: "/favicon-52.png",
  apple: "/apple-icon.png",
  icon192: "/icon-192.png",
  icon512: "/icon-512.png",
} as const;
