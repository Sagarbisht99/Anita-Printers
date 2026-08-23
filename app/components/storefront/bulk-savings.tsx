import Link from "next/link";
import Image from "next/image";
import { bulkPromoTiles } from "@/app/lib/storefront/mock-catalog";

function PromoTile({
  tile,
  className = "",
}: {
  tile: (typeof bulkPromoTiles)[number];
  className?: string;
}) {
  return (
    <Link
      href={tile.href}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 text-white ${className}`}
    >
      <Image
        src={tile.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />

      {tile.eyebrow ? (
        <span className="absolute top-4 left-4 z-10 rounded-md bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-store-ink uppercase">
          {tile.eyebrow}
        </span>
      ) : null}

      <div className="relative z-10">
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
          {tile.title}
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
          {tile.body}
        </p>
      </div>
    </Link>
  );
}

export function BulkSavings() {
  const mainPromo = bulkPromoTiles.find((t) => t.span === "main")!;
  const sidePromos = bulkPromoTiles.filter((t) => t.span !== "main");

  return (
    <section id="bulk-savings" className="bg-store-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight text-store-navy sm:text-3xl">
          Scale Your Order, Maximize Savings.
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <Link
            href={mainPromo.href}
            className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl p-7 text-white sm:min-h-[420px] sm:p-8"
          >
            <Image
              src={mainPromo.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {mainPromo.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                {mainPromo.body}
              </p>
              {mainPromo.cta ? (
                <span className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-store-navy transition group-hover:bg-white/90">
                  {mainPromo.cta}
                </span>
              ) : null}
            </div>
          </Link>

          <div className="grid gap-4 sm:gap-5">
            {sidePromos
              .filter((t) => t.span === "wide")
              .map((tile) => (
                <PromoTile key={tile.id} tile={tile} className="min-h-[180px]" />
              ))}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {sidePromos
                .filter((t) => t.span === "half")
                .map((tile) => (
                  <PromoTile
                    key={tile.id}
                    tile={tile}
                    className="min-h-[200px]"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
