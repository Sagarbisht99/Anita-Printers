import { faqs } from "@/app/lib/storefront/b2b-content";

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-store-line bg-store-paper">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-center text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
          Support
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-store-muted">
          MOQs, lead times, shipping, samples, and returns — answered for B2B
          buyers.
        </p>

        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-store-line bg-store-surface px-5 py-4 open:bg-white"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-store-ink marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-store-muted transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-store-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
