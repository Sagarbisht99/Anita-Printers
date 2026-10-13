import Link from "next/link";
import { Flower2, MessageCircle } from "lucide-react";

const highlights = [
  "Offset for bulk stationery & packaging",
  "Screen for apparel, bags & specialty",
  "Corporate · retail · events · schools",
  "Proof-first, pan-India bulk dispatch",
];

const stats = [
  { value: "2,500+", label: "Happy Clients" },
  { value: "1,800+", label: "Google Reviews" },
  { value: "12 Lakh +", label: "Products Delivered" },
  { value: "4,500+", label: "5-Star Ratings" },
];

export function VisionHomegrown() {
  return (
    <section className="border-b border-store-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Main two-panel card */}
        <div className="grid overflow-hidden rounded-2xl bg-[#eceff3] shadow-[0_10px_30px_-18px_rgba(15,61,102,0.3)] lg:grid-cols-[1fr_1.2fr]">
          {/* Left: Our vision */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-store-ink uppercase sm:text-3xl">
              Our vision
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-store-muted sm:text-[15px]">
              We aim to be the printing partner brands trust for offset
              commercial print and screen specialty work — creative solutions,
              reliable innovation, and finish quality that holds up in bulk.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-store-muted sm:text-[15px]">
              From visiting cards, brochures, and product boxes to tees,
              uniforms, tote bags, and wedding stationery, Anita Printers keeps
              raising the bar for B2B print — clear proofs and on-time dispatch
              across India.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex rounded-full bg-store-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
              >
                About Anita Printers
              </Link>
            </div>
          </div>

          {/* Right: We are homegrown */}
          <div className="bg-store-navy-deeper px-5 py-7 text-white sm:px-8 sm:py-9 lg:rounded-r-2xl">
            <p className="flex items-center gap-2 text-lg font-bold tracking-wide sm:text-xl">
              <Flower2 className="h-5 w-5 shrink-0 text-store-accent" strokeWidth={2.25} aria-hidden />
              <span>
                We are <span className="text-store-accent uppercase">Homegrown.</span>
              </span>
            </p>

            <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-sm text-white/90 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="group/hl flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors duration-300 hover:bg-white/10"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-store-accent"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-6 sm:grid-cols-4 sm:gap-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group/stat rounded-lg px-2 py-1 text-center transition-colors duration-300 hover:bg-white/5"
                >
                  <p className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar: Ordering in volume? */}
        <div className="mt-5 flex flex-col items-start gap-4 rounded-2xl bg-[#eceff3] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-store-ink sm:text-xl">
              Ordering in volume?
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-store-muted">
              Bulk print is what we do every day — offset stationery &amp;
              packaging, screen apparel &amp; specialty. Clear rates, solid
              proofs, and dispatch for corporate, retail, events, and schools.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1d6fb8] px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-[#175a97]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
