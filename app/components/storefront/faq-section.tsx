import { faqs } from "@/app/lib/storefront/b2b-content";

export function FaqSection() {
  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section id="faq" className="border-b border-store-line bg-store-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-center text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
          Support
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-store-muted">
          MOQs, lead times, offset vs screen, shipping, samples, and returns —
          answered for corporate, retail, event, and school buyers.
        </p>

        <div className="mt-10 grid gap-3 md:grid-cols-2 md:gap-x-5 md:gap-y-3">
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
    <details className="group rounded-2xl border border-store-line bg-store-surface px-5 py-4 open:bg-white">
      <summary className="cursor-pointer list-none text-base font-semibold text-store-ink marker:content-none">
        <span className="flex items-center justify-between gap-4">
          {question}
          <span className="shrink-0 text-store-muted transition group-open:rotate-45">
            +
          </span>
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-store-muted">{answer}</p>
    </details>
  );
}
