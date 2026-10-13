import { Layers, Clock3, Factory, PackageCheck, type LucideIcon } from "lucide-react";
import { usps } from "@/app/lib/store/b2b-content";

const uspIcons: LucideIcon[] = [Layers, Clock3, Factory, PackageCheck];

export function WhyChooseUs() {
  return (
    <section className="border-b border-store-line bg-store-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-store-navy">
            Offset · Screen · Bulk
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-store-ink sm:text-4xl">
            Why choose Anita Printers
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-store-muted sm:text-base">
            Hang tags, woven labels, sticker labels, visiting cards, envelopes,
            packaging inserts, and more — offset for volume, screen for
            specialty.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {usps.map((item, index) => {
            const Icon = uspIcons[index] ?? Layers;

            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-store-line bg-white px-5 pt-8 pb-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-store-navy hover:shadow-[0_22px_40px_-20px_rgba(15,61,102,0.45)]"
              >
                <div className="relative mx-auto mb-5 flex h-16 w-24 items-start justify-center">
                  <div
                    aria-hidden
                    className="absolute top-0 h-14 w-24 rounded-b-full bg-store-rose-soft"
                  />
                  <div className="relative z-10 mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-store-navy text-white shadow-md">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </div>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-store-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-store-muted">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
