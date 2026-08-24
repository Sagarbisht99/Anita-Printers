import type { Metadata } from "next";
import Image from "next/image";
import { StorePageHero } from "@/app/components/storefront/store-page-hero";
import { aboutProfile } from "@/app/lib/storefront/b2b-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Factory capacity, QA standards, and eco initiatives at Anita Printers.",
};

export default function AboutPage() {
  return (
    <>
      <StorePageHero
        eyebrow="About us"
        title="Company profile & production infrastructure"
        description={aboutProfile.body}
        actions={[
          { href: "/quote", label: "Talk to sales", primary: true },
          { href: "/portfolio", label: "See case studies" },
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80"
              alt="Print production floor"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-store-navy">
              {aboutProfile.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-store-muted">
              Our Gurugram hub houses screen carousels, DTF lines, embroidery
              heads, UV/offset presses, and a finishing bay for packing,
              tagging, and multi-city splits. Buyers get one accountable partner
              from proof to invoice.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {aboutProfile.capacity.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-store-line bg-store-surface p-4"
                >
                  <p className="text-2xl font-bold text-store-navy">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-store-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-store-navy">
            Certifications & eco-initiatives
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {aboutProfile.certifications.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-store-line bg-store-paper px-5 py-4 text-sm leading-relaxed text-store-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Quality assurance",
              body: "Five-stage QC — artwork lock, pre-press, first-article, in-line, and outbound carton audit.",
            },
            {
              title: "Machine capacity",
              body: "Parallel apparel and commercial print lines so event deadlines don’t stall stationery or vice versa.",
            },
            {
              title: "Factory access",
              body: "Corporate buyers can schedule floor visits for sampling days and process walkthroughs.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-store-line bg-store-surface p-6"
            >
              <h3 className="text-lg font-semibold text-store-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-store-muted">
                {item.body}
              </p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
