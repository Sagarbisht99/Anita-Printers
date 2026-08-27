import Link from "next/link";

const steps = [
  {
    n: "1",
    title: "Pick technique & product",
    body: "Choose offset stationery/packaging or screen apparel & specialty — or browse the full catalog and services list.",
    href: "/services",
  },
  {
    n: "2",
    title: "Upload your design",
    body: "Send AI, PDF, or PNG. We prepare placements and colour notes for a clear digital proof.",
    href: "/quote",
  },
  {
    n: "3",
    title: "Approve the proof",
    body: "Confirm colours, sizes, and packing — optional physical sample before we start bulk production.",
    href: "/quote",
  },
  {
    n: "4",
    title: "Produce & deliver",
    body: "We print, QC, pack, and ship with tracking — offices, shops, venues, or school campuses across India.",
    href: "/quote",
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
            From offset bulk jobs to screen specialty runs — four clear steps
            from brief to pan-India delivery, proof first.
          </p>
        </div>

        <ol className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li
              key={step.n}
              className="group relative flex flex-col items-center rounded-2xl px-3 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/8"
            >
              {index < steps.length - 1 ? <SketchArrow /> : null}

              <div className="transition duration-300 group-hover:scale-105">
                <SketchCircle n={step.n} />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-store-accent">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/55 transition-colors group-hover:text-white/75">
                {step.body}
              </p>
              <Link
                href={step.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:gap-3 hover:text-store-accent"
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
