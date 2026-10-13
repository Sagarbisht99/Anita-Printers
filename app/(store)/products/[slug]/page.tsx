import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import {
  fetchRelatedStoreProducts,
  fetchStoreProductBySlug,
} from "@/app/actions/store/catalog";
import { ProductDetailView } from "@/app/components/store/pages";
import { FaqSection } from "@/app/components/store/sections";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { mergeKeywords, productPageKeywords } from "@/app/lib/seo/keywords";
import { categoryPath, productPath } from "@/app/lib/seo/paths";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdGraph,
  productJsonLd,
  webPageJsonLd,
} from "@/app/lib/seo/json-ld";

/** Deduplicate the product fetch between generateMetadata and the page body. */
const getProduct = cache(fetchStoreProductBySlug);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return createPageMetadata({
      title: "Product not found",
      path: productPath(slug),
    });
  }

  const title = product.seoTitle?.trim() || product.titleName;
  const description =
    product.seoDescription?.trim() ||
    product.descriptionContent?.slice(0, 160) ||
    `Order ${product.titleName} from Anita Printers — bulk custom printing with quotation-based pricing from Noida.`;

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
    path: productPath(product.slug),
    image: product.image ?? undefined,
    keywords,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await fetchRelatedStoreProducts({
    categoryId: product.categoryId,
    excludeProductId: product.id,
    take: 4,
  });

  const description =
    product.descriptionContent ??
    `Bulk custom printing options for ${product.titleName}.`;

  const categoryCrumb =
    product.categoryName && product.categorySlug
      ? [{ name: product.categoryName, path: categoryPath(product.categorySlug) }]
      : [];

  const schemas = jsonLdGraph(
    webPageJsonLd({
      name: product.titleName,
      description,
      path: productPath(product.slug),
    }),
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
      ...categoryCrumb,
      { name: product.titleName, path: productPath(product.slug) },
    ]),
    faqPageJsonLd(),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <ProductDetailView product={product} related={related} />
      <FaqSection id="product-faq" />
    </>
  );
}
