import Link from "next/link";
import { siteMapSections } from "@/app/lib/store/sitemap-links";
import { siteContact } from "@/app/lib/store/b2b-content";
import { StoreBreadcrumb } from "@/app/components/store/ui/breadcrumb";
import { QuoteButton } from "@/app/components/store/ui/quote-popup";
import { trail } from "@/app/lib/seo/breadcrumbs";

export function SitemapPageContent() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-store-line bg-store-navy-deeper text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-store-accent/25 blur-3xl footer-orb"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-store-logo/30 blur-3xl footer-orb-delay"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <StoreBreadcrumb
            items={trail({ name: "Sitemap" })}
            tone="dark"
            className="store-fade-up mb-4"
          />
          <p className="store-fade-up text-sm font-semibold tracking-[0.2em] text-store-accent uppercase">
            Sitemap
          </p>
          <h1
            className="store-fade-up mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            HTML Sitemap
          </h1>
          <p
            className="store-fade-up mt-4 max-w-xl text-base leading-relaxed text-white/75"
            style={{ animationDelay: "160ms" }}
          >
            Browse Anita Printers — services, catalog, policies, and contact —
            without hunting through the menu.
          </p>
        </div>
      </section>

      <section className="border-b border-store-line bg-store-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 sm:py-16 lg:grid-cols-4">
          {siteMapSections.map((section, i) => (
            <div
              key={section.id}
              className="group rounded-2xl border border-store-line bg-store-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-store-navy/25 hover:bg-white hover:shadow-[0_20px_40px_-24px_rgba(15,61,102,0.45)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-store-accent transition-transform duration-300 group-hover:scale-150"
                />
                <h2 className="text-sm font-semibold tracking-[0.14em] text-store-navy uppercase">
                  {section.title}
                </h2>
              </div>
              <ul className="mt-5 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="footer-link-slide group/link inline-flex text-sm font-medium text-store-ink transition-colors hover:text-store-accent"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-store-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-store-navy">Need a quote?</h2>
            <p className="mt-1 text-sm text-store-muted">
              Call {siteContact.phone} or message the B2B desk.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <QuoteButton
              intent="sitemap"
              className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-store-accent"
            >
              Contact us
            </QuoteButton>
            <Link
              href="/services"
              className="rounded-full border border-store-navy/25 bg-white px-5 py-2.5 text-sm font-semibold text-store-navy transition-all duration-300 hover:border-store-navy hover:bg-store-navy hover:text-white"
            >
              View services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
