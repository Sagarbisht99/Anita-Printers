import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchStoreProductBySlug } from "@/app/actions/store/catalog";
import { ProductDetailView } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { mergeKeywords, productPageKeywords } from "@/app/lib/seo/keywords";
import { breadcrumbJsonLd, jsonLdGraph, productJsonLd } from "@/app/lib/seo/json-ld";

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

  const keywords = mergeKeywords(
    product.seoKeywords,
    [product.titleName, `${product.titleName} printing`, `${product.titleName} Noida`],
    product.categoryName
      ? [
          product.categoryName,
          `${product.categoryName} printing`,
          `${product.categoryName} printing Noida`,
        ]
      : [],
    productPageKeywords,
  );

  return createPageMetadata({
    title,
    description,
    path: `/products/${product.slug}`,
    image: product.image ?? undefined,
    keywords,
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

  const schemas = jsonLdGraph(
    productJsonLd({
      name: product.titleName,
      description,
      slug: product.slug,
      image: product.image,
      images: product.imageGallery,
      price: product.pricing,
      category: product.categoryName,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      ...(product.categoryName && product.categoryId
        ? [
            {
              name: product.categoryName,
              path: `/products?categoryId=${product.categoryId}`,
            },
          ]
        : []),
      { name: product.titleName, path: `/products/${product.slug}` },
    ]),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <ProductDetailView product={product} />
    </>
  );
}
