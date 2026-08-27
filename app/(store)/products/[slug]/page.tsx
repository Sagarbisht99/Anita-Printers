import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchStoreProductBySlug } from "@/app/actions/store/catalog";
import { ProductDetailView } from "@/app/components/store/pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchStoreProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.titleName,
    description:
      product.descriptionContent ??
      `Bulk pricing and custom print options for ${product.titleName}.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchStoreProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailView product={product} />;
}
