import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StorePageHero } from "@/app/components/storefront/store-page-hero";
import {
  featuredProjects,
  printTechniquesGuide,
} from "@/app/lib/storefront/b2b-content";

export const metadata: Metadata = {
  title: "Portfolio / Print Showcase",
  description:
    "Case studies and a visual guide to screen print, DTF, sublimation, embroidery, and foil.",
};

export default function PortfolioPage() {
  return (
    <>
      <StorePageHero
        eyebrow="Portfolio"
        title="Print showcase & case studies"
        description="Detailed breakdowns of bulk client orders — plus a technique guide so buyers pick the right process the first time."
        actions={[
          { href: "/quote", label: "Brief a similar project", primary: true },
          { href: "/products", label: "Browse catalog" },
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold text-store-navy">Case studies</h2>
        <div className="mt-6 space-y-8">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="grid overflow-hidden rounded-2xl border border-store-line bg-store-surface lg:grid-cols-[1fr_1.1fr]"
            >
              <div className="relative min-h-[240px]">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-wide text-store-muted uppercase">
                  {project.client}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-store-ink">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-store-muted">
                  {project.summary} Production included size runs, carton
                  labels, and a single GST invoice for finance close-out.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stats.map((stat) => (
                    <li
                      key={stat}
                      className="rounded-full bg-store-paper px-3 py-1 text-xs font-semibold text-store-navy"
                    >
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-store-navy">
            Material & print technique guide
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-store-muted">
            Use this to align creative and procurement before you upload
            artwork.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {printTechniquesGuide.map((tech) => (
              <div
                key={tech.name}
                className="rounded-2xl border border-store-line bg-store-paper p-5"
              >
                <h3 className="text-lg font-semibold text-store-ink">
                  {tech.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-store-navy">
                  Best for: {tech.bestFor}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-store-muted">
                  {tech.notes}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/artwork-guidelines"
            className="mt-8 inline-flex text-sm font-semibold text-store-navy hover:underline"
          >
            Continue to artwork & file guidelines →
          </Link>
        </section>
      </main>
    </>
  );
}
