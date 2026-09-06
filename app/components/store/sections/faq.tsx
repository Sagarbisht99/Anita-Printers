import { faqs } from "@/app/lib/store/b2b-content";

export function FaqSection({
  id = "faq",
  className = "",
}: {
  id?: string;
  className?: string;
}) {
  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section
      id={id}
      className={`border-b border-store-line bg-store-paper ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-center text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
          Support
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-store-navy sm:text-3xl md:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl px-1 text-center text-sm leading-relaxed text-store-muted">
          MOQs, lead times, offset vs screen, shipping, samples, and returns —
          answered for corporate, retail, event, and school buyers.
        </p>

        <div className="mt-8 grid gap-3 sm:mt-10 md:grid-cols-2 md:gap-x-5 md:gap-y-3">
          <div className="space-y-3">
            {left.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
          <div className="space-y-3">
            {right.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-2xl border border-store-line bg-store-surface px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-store-navy/25 hover:shadow-[0_12px_28px_-18px_rgba(15,61,102,0.35)] open:border-store-navy/20 open:bg-white open:shadow-[0_12px_28px_-18px_rgba(15,61,102,0.3)] sm:px-5 sm:py-4">
      <summary className="cursor-pointer list-none text-[15px] font-semibold text-store-ink marker:content-none transition-colors group-hover:text-store-navy sm:text-base">
        <span className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
          <span className="min-w-0 text-left leading-snug">{question}</span>
          <span className="mt-0.5 shrink-0 text-store-muted transition group-open:rotate-45 group-hover:text-store-accent sm:mt-0">
            +
          </span>
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-store-muted">{answer}</p>
    </details>
  );
}
