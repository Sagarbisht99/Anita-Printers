import Link from "next/link";

const steps = [
  {
    n: "1",
    title: "Select Product",
    body: "Browse apparel, cards, stationery, or merch — or share a custom brief with our B2B desk.",
    href: "/products",
  },
  {
    n: "2",
    title: "Upload & Approve",
    body: "Send AI, PDF, or PNG. We share a proof with placements — optional sample before print.",
    href: "/contact",
  },
  {
    n: "3",
    title: "Produce & Deliver",
    body: "We print, QC, pack, and ship with tracking — one warehouse or multi-city drops.",
    href: "/contact",
  },
];

function SketchCircle({ n }: { n: string }) {
  return (
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full text-white/55"
        aria-hidden
      >
        <ellipse
          cx="60"
          cy="60"
          rx="52"
          ry="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(-6 60 60)"
        />
        <ellipse
          cx="60"
          cy="60"
          rx="50"
          ry="53"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(8 60 60)"
        />
        <ellipse
          cx="61"
          cy="59"
          rx="48"
          ry="49"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          transform="rotate(-2 60 60)"
        />
      </svg>
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-store-navy">
        {n}
      </div>
    </div>
  );
}

function SketchArrow() {
  return (
    <svg
      viewBox="0 0 120 40"
      className="pointer-events-none absolute top-10 -right-[14%] hidden h-10 w-[28%] text-white/45 lg:block"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 28 C 36 4, 78 4, 108 22"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M98 14 L110 24 L96 28"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section className="border-b border-store-line bg-store-navy-deeper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How to use this site?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
            Three simple steps from catalog to bulk delivery — proof first, then
            production at scale.
          </p>
        </div>

        <ol className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.n}
              className="relative flex flex-col items-center text-center"
            >
              {index < steps.length - 1 ? <SketchArrow /> : null}

              <SketchCircle n={step.n} />

              <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/55">
                {step.body}
              </p>
              <Link
                href={step.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-store-accent"
              >
                See More
                <span aria-hidden className="text-store-accent">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
