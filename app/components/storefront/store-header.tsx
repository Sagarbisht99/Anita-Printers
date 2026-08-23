import Link from "next/link";
import Image from "next/image";
import { HeaderSearch } from "@/app/components/storefront/header-search";

const HELP_PHONE = "+91 98765 43210";

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-store-line bg-store-surface">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="Anita Printers home">
          <Image
            src="/logo.png"
            alt="Anita Printers"
            width={180}
            height={56}
            className="h-9 w-auto object-contain sm:h-11"
            priority
          />
        </Link>

        <HeaderSearch className="mx-2 mr-4 hidden min-w-0 flex-1 max-w-xl md:block lg:mr-6" />

        <div className="ml-auto flex shrink-0 items-center gap-5 sm:gap-6 lg:gap-8">
          <Link
            href="/products"
            className="rounded-full px-3.5 py-2 text-sm font-semibold text-store-navy transition hover:bg-store-navy hover:text-white"
          >
            Products
          </Link>

          <a
            href={`tel:${HELP_PHONE.replace(/\s/g, "")}`}
            className="hidden flex-col leading-tight sm:flex"
          >
            <span className="text-[11px] text-store-muted">Need Help?</span>
            <span className="text-sm font-semibold text-store-navy">
              {HELP_PHONE}
            </span>
          </a>

          <Link
            href="/contact"
            className="rounded-full bg-store-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#071536]"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      <div className="border-t border-store-line px-4 py-2 md:hidden">
        <HeaderSearch
          inputClassName="py-2 pl-9"
        />
      </div>
    </header>
  );
}
