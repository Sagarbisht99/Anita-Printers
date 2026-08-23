import Link from "next/link";
import Image from "next/image";

const legalLinks = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/refund", label: "Refund & Cancellation" },
];

export function StoreFooter() {
  return (
    <footer className="border-t border-store-line bg-store-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/logo.png"
            alt="Anita Printers"
            width={160}
            height={50}
            className="h-11 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-store-muted">
            Custom printing for businesses and individuals — cards, apparel,
            gifts, stationery, and marketing materials.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-store-navy uppercase">
            Policies
          </p>
          <ul className="mt-4 space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-store-ink transition hover:text-store-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-store-navy uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-store-ink">
            <li>
              <Link href="/contact" className="hover:text-store-navy">
                Contact us
              </Link>
            </li>
            <li className="text-store-muted">Printing · Shirts · Cards</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-store-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-store-muted sm:px-6">
          © {new Date().getFullYear()} Anita Printers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
