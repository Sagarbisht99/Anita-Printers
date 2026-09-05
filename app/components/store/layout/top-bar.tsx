import { Mail, MapPin, Phone } from "lucide-react";
import { siteContact } from "@/app/lib/store/b2b-content";

export function StoreTopBar() {
  const address = siteContact.addressLines.slice(1).join(", ");
  const mailHref = `mailto:${siteContact.email}`;

  return (
    <div className="border-b border-white/10 bg-store-navy-deeper text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-1.5 sm:gap-4 sm:px-6 sm:py-2">
        {/* Left: location (desktop) / 24×7 on mobile */}
        <p className="hidden min-w-0 items-center gap-1.5 text-[13px] text-white/85 md:flex">
          <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          <span className="truncate">{address}</span>
        </p>
        <p className="truncate text-[11px] font-medium tracking-wide text-white/85 md:hidden">
          24×7 available
        </p>

        {/* Right: phone + email — icons on mobile, icon+text on larger */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <a
            href={siteContact.phoneHref}
            aria-label={`Call ${siteContact.phone}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-1.5 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-[13px] sm:text-white/90 sm:hover:bg-transparent sm:hover:text-white"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            <span className="hidden sm:inline">{siteContact.phone}</span>
          </a>

          <a
            href={siteContact.landline.href}
            aria-label={`Call landline ${siteContact.landline.display}`}
            className="hidden items-center gap-1.5 text-[13px] text-white/90 transition hover:text-white lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            <span>{siteContact.landline.display}</span>
          </a>

          <a
            href={mailHref}
            aria-label={`Email ${siteContact.email}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:h-auto sm:w-auto sm:max-w-[220px] sm:gap-1.5 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-[13px] sm:text-white/90 sm:hover:bg-transparent sm:hover:text-white md:max-w-none"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            <span className="hidden truncate sm:inline">{siteContact.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
