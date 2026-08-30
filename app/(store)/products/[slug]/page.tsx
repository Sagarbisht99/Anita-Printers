import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchStoreProductBySlug } from "@/app/actions/store/catalog";
import { ProductDetailView } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { breadcrumbJsonLd, productJsonLd } from "@/app/lib/seo/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchStoreProductBySlug(slug);
  if (!product) {
    return createPageMetadata({
      title: "Product",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  const title = product.seoTitle?.trim() || product.titleName;
  const description =
    product.seoDescription?.trim() ||
    product.descriptionContent?.slice(0, 160) ||
    `Order ${product.titleName} from Anita Printers — bulk pricing, custom print, and pan-India delivery from Noida.`;

  const keywords = [
    ...product.seoKeywords,
    product.titleName,
    product.categoryName ?? "printing",
    "Anita Printers",
  ];

  return createPageMetadata({
    title,
    description,
    path: `/products/${product.slug}`,
    image: product.image ?? undefined,
    keywords,
    type: "article",
    noIndex: !product.isIndexed,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchStoreProductBySlug(slug);
  if (!product) notFound();

  const description =
    product.descriptionContent ??
    `Bulk pricing and custom print options for ${product.titleName}.`;

  const schemas = [
    productJsonLd({
      name: product.titleName,
      description,
      slug: product.slug,
      image: product.image,
      price: product.pricing,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: product.titleName, path: `/products/${product.slug}` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLdScript key={index} data={schema} />
      ))}
      <ProductDetailView product={product} />
    </>
  );
}
