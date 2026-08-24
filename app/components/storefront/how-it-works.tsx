import { processSteps } from "@/app/lib/storefront/b2b-content";

export function HowItWorks() {
  return (
    <section className="border-b border-store-line bg-store-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
          Bulk order process
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
          How it works — four steps from brief to bulk delivery
        </h2>

        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.step}
              className="relative rounded-2xl border border-store-line bg-store-surface p-6"
            >
              {index < processSteps.length - 1 ? (
                <span className="pointer-events-none absolute top-10 -right-3 hidden h-px w-6 bg-store-line lg:block" />
              ) : null}
              <p className="text-sm font-bold text-store-navy">{step.step}</p>
              <h3 className="mt-3 text-lg font-semibold text-store-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-store-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
