import Link from "next/link";
import {
  customPackagingContent,
  type CustomPackagingItem,
} from "@/app/lib/store/custom-packaging";

const imageSizeClasses = {
  sm: "max-h-[68px] max-w-[78%] sm:max-h-[76px] lg:max-h-[82px]",
  md: "max-h-[88px] max-w-[80%] sm:max-h-[96px] lg:max-h-[108px]",
  lg: "max-h-[108px] max-w-[72%] sm:max-h-[118px] lg:max-h-[132px]",
} as const;

function PackagingCard({
  item,
  masonry = false,
  className = "",
}: {
  item: CustomPackagingItem;
  masonry?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`group flex h-full min-h-[168px] flex-col overflow-hidden rounded-2xl sm:min-h-0 sm:rounded-[1.125rem] ${className}`}
      style={{
        backgroundColor: item.bgColor,
        ...(masonry
          ? { gridColumn: item.gridColumn, gridRow: item.gridRow }
          : {}),
      }}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center px-3 pt-4 pb-1 sm:px-4 sm:pt-5">
        {item.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.image}
            alt={item.title}
            className={`h-auto w-auto object-contain object-center drop-shadow-[0_10px_20px_rgba(15,61,102,0.12)] transition duration-500 group-hover:scale-[1.03] ${imageSizeClasses[item.imageSize]}`}
          />
        ) : (
          <div className="h-full min-h-[68px] w-full" aria-hidden />
        )}
      </div>

      <p className="shrink-0 px-3 pb-3.5 pt-1 text-center text-[0.8125rem] font-normal leading-snug text-[#3d4654] sm:px-4 sm:pb-4 sm:text-sm">
        {item.title}
      </p>
    </article>
  );
}

type CustomizedPackagingGridProps = {
  items: CustomPackagingItem[];
};

export function CustomizedPackagingGrid({ items }: CustomizedPackagingGridProps) {
  const { title, subtitle, stepsLine } = customPackagingContent;

  return (
    <section className="border-b border-store-line bg-white">
      <div className="mx-auto max-w-[72rem] px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-[1.625rem] font-bold tracking-tight text-[#1c2430] sm:text-[1.875rem] lg:text-[2rem]">
            {title}
          </h2>
          <p className="mt-2 text-base font-normal text-[#3d4654] sm:text-[1.0625rem]">
            {subtitle}
          </p>
          <p className="mt-1.5 text-sm text-[#8b95a5]">{stepsLine}</p>
          <Link
            href="/products"
            className="mt-4 inline-flex text-sm font-semibold text-store-navy underline-offset-4 hover:underline"
          >
            Browse packaging in catalog →
          </Link>
        </header>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:hidden">
          {items.map((item) => (
            <PackagingCard
              key={item.id}
              item={item}
              className="min-h-[170px] sm:min-h-[190px]"
            />
          ))}
        </div>

        <div
          className="mt-8 hidden min-h-[500px] gap-4 lg:mt-10 lg:grid lg:grid-cols-4 lg:gap-[1.125rem]"
          style={{ gridTemplateRows: "repeat(6, minmax(68px, 1fr))" }}
        >
          {items.map((item) => (
            <PackagingCard key={item.id} item={item} masonry />
          ))}
        </div>
      </div>
    </section>
  );
}
