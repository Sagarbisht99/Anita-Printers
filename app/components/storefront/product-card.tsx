import Link from "next/link";
import type { StoreProductItem } from "@/app/actions/storefront";

function formatInr(amount: number) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export function StoreProductCard({ product }: { product: StoreProductItem }) {
  const orderHref = `/contact?product=${encodeURIComponent(product.slug)}&intent=order`;
  const sendOrderHref = `/contact?product=${encodeURIComponent(product.slug)}&intent=send-order`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-store-line bg-white transition hover:border-store-navy/30 hover:shadow-[0_18px_40px_-28px_rgba(11,31,74,0.45)]">
      <div className="relative aspect-square shrink-0 overflow-hidden bg-[#f3f1ec]">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.titleName}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm font-medium text-store-muted">
            {product.titleName}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col bg-white px-4 pt-4 pb-4">
        <h3 className="line-clamp-2 min-h-[3rem] text-base leading-snug font-semibold text-store-ink">
          {product.titleName}
        </h3>
        <p className="mt-2 text-sm text-store-muted">
          {product.quantityLabel} starting at{" "}
          <span className="font-semibold text-store-ink">
            {formatInr(product.pricing)}
          </span>
        </p>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={orderHref}
            className="flex-1 rounded-full bg-store-navy px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#071536]"
          >
            Order
          </Link>
          <Link
            href={sendOrderHref}
            className="flex-1 rounded-full border border-store-navy bg-store-paper px-3 py-2.5 text-center text-sm font-semibold text-store-navy transition hover:bg-store-navy hover:text-white"
          >
            Send order
          </Link>
        </div>
      </div>
    </article>
  );
}
