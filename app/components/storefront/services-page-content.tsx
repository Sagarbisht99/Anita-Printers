import Link from "next/link";
import { printingServiceCatalog } from "@/app/lib/storefront/b2b-content";

/** Sticky nav — soft paper fill + accent underline (not navy flip) */
const navChipClass =
  "shrink-0 rounded-full border border-store-navy/15 bg-white px-4 py-2 text-sm font-semibold text-store-navy transition-all duration-300 hover:border-store-accent/40 hover:bg-store-rose-soft hover:text-store-accent hover:shadow-[0_8px_18px_-12px_rgba(196,59,88,0.45)]";

/** Who we serve — each card gets its own hover language */
const audienceHoverStyles = [
  // Corporate: full navy flip
  "hover:-translate-y-1.5 hover:border-store-navy hover:bg-store-navy hover:shadow-[0_22px_40px_-20px_rgba(15,61,102,0.55)] [&_.aud-num]:group-hover:text-white/65 [&_.aud-title]:group-hover:text-white [&_.aud-body]:group-hover:text-white/75",
  // Retail: rose/accent wash
  "hover:-translate-y-1.5 hover:border-store-accent hover:bg-store-accent hover:shadow-[0_22px_40px_-20px_rgba(196,59,88,0.45)] [&_.aud-num]:group-hover:text-white/70 [&_.aud-title]:group-hover:text-white [&_.aud-body]:group-hover:text-white/80",
  // Events: white lift + navy ring
  "hover:-translate-y-1.5 hover:border-store-navy hover:bg-white hover:shadow-[0_22px_40px_-18px_rgba(15,61,102,0.4)] [&_.aud-num]:group-hover:text-store-accent [&_.aud-title]:group-hover:text-store-navy [&_.aud-body]:group-hover:text-store-muted",
  // Institutes: logo-blue tint
  "hover:-translate-y-1.5 hover:border-store-logo hover:bg-store-logo hover:shadow-[0_22px_40px_-20px_rgba(29,111,184,0.5)] [&_.aud-num]:group-hover:text-white/70 [&_.aud-title]:group-hover:text-white [&_.aud-body]:group-hover:text-white/80",
] as const;

export function ServicesPageContent() {
  const { headline, support, techniques, audiences, coreProducts } =
    printingServiceCatalog;

  return (
    <>
      <section className="relative isolate min-h-[48vh] overflow-hidden border-b border-store-line sm:min-h-[52vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://5.imimg.com/data5/SELLER/Default/2024/7/436867535/ID/YF/LL/9941788/autoprint-1520-colt-7k-offset-printing-machine-500x500.jpeg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,31,54,0.92)_0%,rgba(15,61,102,0.78)_48%,rgba(8,31,54,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,59,88,0.22),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 py-12 sm:min-h-[52vh] sm:px-6 sm:py-14 lg:justify-center">
          <p className="store-fade-up text-sm font-semibold tracking-[0.2em] text-store-accent uppercase">
            Services
          </p>
          <h1
            className="store-fade-up mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
            style={{ animationDelay: "80ms" }}
          >
            Anita Printers
          </h1>
          <p
            className="store-fade-up mt-3 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {headline}. {support}
          </p>
          <div
            className="store-fade-up mt-6 flex flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="#what-we-print"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition-all duration-300 hover:scale-[1.03] hover:bg-store-paper"
            >
              What we print
            </Link>
            <Link
              href="#offset"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-store-accent hover:bg-store-accent hover:text-white"
            >
              Offset printing
            </Link>
            <Link
              href="#screen"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-store-navy"
            >
              Screen printing
            </Link>
          </div>
        </div>
      </section>

      <nav
        aria-label="Service sections"
        className="sticky top-0 z-20 border-b border-store-line bg-store-surface/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          <a href="#what-we-print" className={navChipClass}>
            What we print
          </a>
          {techniques.map((technique) => (
            <a
              key={technique.id}
              href={`#${technique.id}`}
              className={navChipClass}
            >
              {technique.name}
            </a>
          ))}
          <a href="#who-we-serve" className={navChipClass}>
            Who we serve
          </a>
        </div>
      </nav>

      {/* What we print — left accent bar + rose soft wash */}
      <section
        id="what-we-print"
        className="scroll-mt-28 border-b border-store-line bg-store-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
            Main printing jobs
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
            What Anita Printers prints every day
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-store-muted">
            These are our core products and categories. Images will be added
            later — for now, browse the full list and request a quote for any
            item.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {coreProducts.map((line) => (
              <div
                key={line.id}
                className="group relative overflow-hidden rounded-2xl border border-store-navy/10 bg-store-paper p-6 pl-7 transition-all duration-300 hover:border-store-accent/30 hover:bg-store-rose-soft hover:shadow-[0_18px_36px_-22px_rgba(196,59,88,0.35)]"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-full w-1 origin-top scale-y-50 bg-store-accent transition-transform duration-300 group-hover:scale-y-100"
                />
                <h3 className="text-lg font-semibold text-store-navy transition-colors group-hover:text-store-accent">
                  {line.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {line.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-store-navy/15 bg-white px-3.5 py-1.5 text-sm font-medium text-store-ink transition-all duration-300 hover:border-store-accent hover:bg-store-accent hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {techniques.map((technique, index) => {
        const reverse = index % 2 === 1;
        const isOffset = technique.id === "offset";

        return (
          <section
            key={technique.id}
            id={technique.id}
            className={`scroll-mt-28 border-b border-store-line ${
              isOffset ? "bg-store-paper" : "bg-store-surface"
            }`}
          >
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-16">
              <div
                className={`group relative min-h-60 overflow-hidden rounded-2xl lg:col-span-5 lg:min-h-105 ${
                  reverse ? "lg:order-2" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={technique.image}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                    isOffset
                      ? "group-hover:scale-[1.06]"
                      : "group-hover:scale-[1.03] group-hover:brightness-110"
                  }`}
                />
                <div
                  className={`absolute inset-0 transition duration-300 ${
                    isOffset
                      ? "bg-linear-to-t from-store-navy-deeper/55 to-transparent group-hover:from-store-navy-deeper/75"
                      : "bg-linear-to-t from-store-accent/50 to-transparent group-hover:from-store-accent/70"
                  }`}
                />
                <p className="absolute bottom-5 left-5 text-sm font-semibold tracking-[0.18em] text-white uppercase">
                  {technique.eyebrow}
                </p>
              </div>

              <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
                <p className="text-xs font-semibold tracking-[0.16em] text-store-accent uppercase">
                  {technique.eyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
                  {technique.name}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-store-muted">
                  {technique.summary}
                </p>

                <div className="mt-10 space-y-8">
                  {technique.groups.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-lg font-semibold text-store-navy">
                        {group.title}
                      </h3>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className={
                              isOffset
                                ? "group/item flex gap-2 rounded-r-xl border-l-2 border-transparent px-3 py-2 text-sm leading-relaxed text-store-ink transition-all duration-300 hover:border-store-navy hover:bg-white hover:pl-4"
                                : "group/item flex gap-2 rounded-xl bg-transparent px-3 py-2 text-sm leading-relaxed text-store-ink transition-all duration-300 hover:bg-store-rose-soft hover:text-store-navy"
                            }
                          >
                            <span
                              aria-hidden
                              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
                                isOffset
                                  ? "bg-store-navy group-hover/item:scale-125"
                                  : "bg-store-accent group-hover/item:scale-150 group-hover/item:bg-store-accent"
                              }`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className={
                      isOffset
                        ? "rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-store-logo hover:shadow-[0_14px_28px_-14px_rgba(29,111,184,0.55)]"
                        : "rounded-full bg-store-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-store-navy hover:shadow-[0_14px_28px_-14px_rgba(15,61,102,0.55)]"
                    }
                  >
                    Request a quote
                  </Link>
                  <Link
                    href="/products"
                    className="rounded-full border border-store-navy/25 bg-white px-5 py-2.5 text-sm font-semibold text-store-navy transition-all duration-300 hover:border-store-navy hover:bg-store-paper"
                  >
                    Browse catalog
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Who we serve — 4 different hover colours */}
      <section
        id="who-we-serve"
        className="scroll-mt-28 border-b border-store-line bg-store-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
            Who we serve
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
            Built for companies, shops, events, and institutes
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-store-muted">
            One production partner for the print jobs each audience needs most.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, i) => (
              <article
                key={audience.id}
                className={`group cursor-default rounded-2xl border border-store-line bg-store-paper px-5 pt-6 pb-6 transition-all duration-300 ease-out ${audienceHoverStyles[i] ?? audienceHoverStyles[0]}`}
              >
                <p className="aud-num text-xs font-semibold tracking-[0.14em] text-store-accent uppercase transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="aud-title mt-2 text-lg font-semibold text-store-navy transition-colors">
                  {audience.title}
                </h3>
                <p className="aud-body mt-2 text-sm leading-relaxed text-store-muted transition-colors">
                  {audience.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-store-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to print?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/75">
              Share quantity, material, and artwork — we&apos;ll recommend offset,
              screen, or another technique and send a clear quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition-all duration-300 hover:scale-[1.03] hover:bg-store-accent hover:text-white"
            >
              Contact the B2B desk
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-store-logo hover:bg-store-logo"
            >
              Explore products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
