import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Printer, Layers } from "lucide-react";

const techniques = [
  {
    title: "Offset Printing",
    body: "Ideal for bulk orders, high-quality prints, packaging, brochures, posters and more.",
    href: "/services#offset",
    image: "/capabilities/offset-printing.jpg",
    Icon: Printer,
  },
  {
    title: "Screen Printing",
    body: "Perfect for apparel, T-shirts, bags, signage and specialty printing.",
    href: "/services#screen",
    image: "/capabilities/screen-printing.jpg",
    Icon: Layers,
  },
] as const;

export function PrintingCapabilities() {
  return (
    <section className="border-b border-store-line bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Left: copy */}
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-store-muted uppercase">
              Our printing capabilities
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Offset Printing &amp;
              <br />
              Screen Printing
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-store-muted sm:text-base">
              From premium hang tags and packaging boxes to brochures, signage,
              apparel, and more. We specialize in both offset and screen
              printing for businesses, brands and institutions.
            </p>
            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-store-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-store-navy-dark"
            >
              View All Services
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </Link>
          </div>

          {/* Right: two image cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {techniques.map(({ title, body, href, image, Icon }) => (
              <Link
                key={title}
                href={href}
                className="group overflow-hidden rounded-2xl border border-store-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-store-navy hover:shadow-[0_22px_44px_-24px_rgba(15,61,102,0.45)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2f6]">
                  <Image
                    src={image}
                    alt={`${title} at Anita Printers`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="relative px-5 pb-5 pt-7">
                  {/* Icon badge overlapping the image */}
                  <span className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-store-navy text-white shadow-[0_10px_24px_-10px_rgba(15,61,102,0.6)]">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="text-lg font-bold text-store-ink group-hover:text-store-navy">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-store-muted">
                    {body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
