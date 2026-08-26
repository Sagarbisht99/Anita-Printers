import Image from "next/image";
import Link from "next/link";
import { printingServiceCatalog } from "@/app/lib/storefront/b2b-content";

export function ServicesPageContent() {
  const { headline, support, techniques, audiences, coreProducts } =
    printingServiceCatalog;

  return (
    <>
      <section className="relative isolate min-h-[48vh] overflow-hidden border-b border-store-line sm:min-h-[52vh]">
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
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
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
            >
              What we print
            </Link>
            <Link
              href="#offset"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Offset printing
            </Link>
            <Link
              href="#screen"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Screen printing
            </Link>
          </div>
        </div>
      </section>

      <nav
        aria-label="Service sections"
        className="border-b border-store-line bg-store-surface"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          <a
            href="#what-we-print"
            className="shrink-0 rounded-full border border-store-navy/15 px-4 py-2 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
          >
            What we print
          </a>
          {techniques.map((technique) => (
            <a
              key={technique.id}
              href={`#${technique.id}`}
              className="shrink-0 rounded-full border border-store-navy/15 px-4 py-2 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
            >
              {technique.name}
            </a>
          ))}
          <a
            href="#who-we-serve"
            className="shrink-0 rounded-full border border-store-navy/15 px-4 py-2 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
          >
            Who we serve
          </a>
        </div>
      </nav>

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

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {coreProducts.map((line) => (
              <div key={line.id} className="border-t border-store-navy/15 pt-6">
                <h3 className="text-lg font-semibold text-store-navy">
                  {line.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {line.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-store-navy/15 bg-store-paper px-3.5 py-1.5 text-sm font-medium text-store-ink"
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
        return (
          <section
            key={technique.id}
            id={technique.id}
            className="scroll-mt-28 border-b border-store-line bg-store-paper"
          >
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-16">
              <div
                className={`relative min-h-60 overflow-hidden lg:col-span-5 lg:min-h-105 ${
                  reverse ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={technique.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-store-navy-deeper/55 to-transparent" />
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
                            className="flex gap-2 text-sm leading-relaxed text-store-ink"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-store-accent"
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
                    className="rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
                  >
                    Request a quote
                  </Link>
                  <Link
                    href="/products"
                    className="rounded-full border border-store-navy/25 bg-white px-5 py-2.5 text-sm font-semibold text-store-navy transition hover:bg-store-surface"
                  >
                    Browse catalog
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

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

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, i) => (
              <div
                key={audience.id}
                className="border-t border-store-navy/15 pt-5"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-store-accent uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-store-navy">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-store-muted">
                  {audience.body}
                </p>
              </div>
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
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-store-navy transition hover:bg-store-paper"
            >
              Contact the B2B desk
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
