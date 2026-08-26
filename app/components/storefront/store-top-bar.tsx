import { Mail, MapPin, Phone } from "lucide-react";
import { siteContact } from "@/app/lib/storefront/b2b-content";

export function StoreTopBar() {
  const address = siteContact.addressLines.slice(1).join(", ");

  return (
    <div className="border-b border-white/10 bg-store-navy-deeper text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-[11px] sm:gap-x-6 sm:px-6 sm:text-[13px]">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-5">
          <a
            href={siteContact.phoneHref}
            className="inline-flex items-center gap-1.5 text-white/90 transition hover:text-white"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            <span>{siteContact.phone}</span>
          </a>
          <a
            href={siteContact.landline.href}
            className="hidden items-center gap-1.5 text-white/90 transition hover:text-white md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            <span>{siteContact.landline.display}</span>
          </a>
          <a
            href={`mailto:${siteContact.email}`}
            className="hidden items-center gap-1.5 truncate text-white/90 transition hover:text-white sm:inline-flex"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            <span className="truncate">{siteContact.email}</span>
          </a>
        </div>

        <p className="hidden min-w-0 max-w-[45%] items-center gap-1.5 text-white/85 lg:flex">
          <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          <span className="truncate">{address}</span>
        </p>
      </div>
    </div>
  );
}
