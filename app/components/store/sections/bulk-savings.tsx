import Link from "next/link";
import { bulkPromoTiles } from "@/app/lib/store/mock-catalog";

type PromoSize = "main" | "wide" | "half";

const tileStyles: Record<
  PromoSize,
  {
    padding: string;
    minHeight: string;
    title: string;
    body: string;
    eyebrow: string;
    cta: string;
  }
> = {
  main: {
    padding: "p-5 sm:p-6",
    minHeight: "min-h-[300px] sm:min-h-[380px]",
    title: "text-xl font-bold tracking-tight sm:text-2xl",
    body: "mt-2 max-w-sm text-sm leading-relaxed text-white/85",
    eyebrow: "text-[10px]",
    cta: "mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-store-navy transition group-hover:bg-white/90 sm:mt-5 sm:px-5 sm:py-2.5 sm:text-sm",
  },
  wide: {
    padding: "p-4 sm:p-5",
    minHeight: "min-h-[168px] sm:min-h-[180px]",
    title: "text-base font-semibold tracking-tight sm:text-lg",
    body: "mt-1.5 line-clamp-2 max-w-md text-xs leading-relaxed text-white/80 sm:text-sm",
    eyebrow: "text-[9px] sm:text-[10px]",
    cta: "",
  },
  half: {
    padding: "p-3.5 sm:p-4",
    minHeight: "min-h-[188px] sm:min-h-[200px]",
    title: "text-sm font-semibold leading-snug tracking-tight sm:text-base",
    body: "mt-1 line-clamp-3 text-[11px] leading-relaxed text-white/75 sm:text-xs",
    eyebrow: "text-[9px]",
    cta: "",
  },
};

function PromoTile({
  tile,
  size,
  className = "",
}: {
  tile: (typeof bulkPromoTiles)[number];
  size: PromoSize;
  className?: string;
}) {
  const styles = tileStyles[size];

  return (
    <Link
      href={tile.href}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl text-white ${styles.padding} ${styles.minHeight} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tile.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/10" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[58%] bg-linear-to-t from-black/55 to-transparent"
      />

      {tile.eyebrow ? (
        <span
          className={`absolute top-3 left-3 z-10 rounded-md bg-white/90 px-2 py-0.5 font-semibold tracking-wide text-store-ink uppercase backdrop-blur-sm sm:top-4 sm:left-4 sm:px-2.5 sm:py-1 ${styles.eyebrow}`}
        >
          {tile.eyebrow}
        </span>
      ) : null}

      <div className="relative z-10 max-w-[92%]">
        <h3 className={`line-clamp-2 ${styles.title}`}>{tile.title}</h3>
        <p className={styles.body}>{tile.body}</p>
        {tile.cta && styles.cta ? (
          <span className={styles.cta}>{tile.cta}</span>
        ) : null}
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
          Scale your order — offset &amp; screen savings
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-store-muted">
          Higher quantities bring lower unit costs on stationery, packaging,
          apparel, and promotional print for corporate, retail, events, and
          schools.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <PromoTile tile={mainPromo} size="main" />

          <div className="grid gap-4 sm:gap-5">
            {sidePromos
              .filter((t) => t.span === "wide")
              .map((tile) => (
                <PromoTile key={tile.id} tile={tile} size="wide" />
              ))}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {sidePromos
                .filter((t) => t.span === "half")
                .map((tile) => (
                  <PromoTile key={tile.id} tile={tile} size="half" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
