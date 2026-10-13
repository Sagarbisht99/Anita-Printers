import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchStoreCategoryBySlug,
  fetchStoreProductsPage,
} from "@/app/actions/store/catalog";
import { CategoryDetailView } from "@/app/components/store/pages/category-detail";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { mergeKeywords } from "@/app/lib/seo/keywords";
import { categoryPath } from "@/app/lib/seo/paths";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/app/lib/seo/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchStoreCategoryBySlug(slug);
  if (!category) {
    return createPageMetadata({
      title: "Category not found",
      path: categoryPath(slug),
    });
  }

  const title = category.seoTitle?.trim() || category.name;
  const description =
    category.seoDescription?.trim() ||
    category.description?.trim() ||
    `Browse ${category.name} from Anita Printers — custom bulk printing with quotation-based pricing from Noida.`;

  return createPageMetadata({
    title,
    description,
    path: categoryPath(category.slug),
    keywords: mergeKeywords(category.seoKeywords, [
      category.name,
      `${category.name} printing`,
      `${category.name} printing Noida`,
    ]),
  });
}

const CATEGORY_PAGE_SIZE = 24;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await fetchStoreCategoryBySlug(slug);
  if (!category) notFound();

  const productsPage = await fetchStoreProductsPage({
    categoryId: category.id,
    page: 1,
    pageSize: CATEGORY_PAGE_SIZE,
  });

  const path = categoryPath(category.slug);
  const description =
    category.description ??
    `Custom-printed ${category.name.toLowerCase()} from Anita Printers, Noida.`;

  const schemas = jsonLdGraph(
    webPageJsonLd({ name: category.name, description, path }),
    itemListJsonLd(
      productsPage.items.map((product) => ({
        name: product.titleName,
        slug: product.slug,
        image: product.image,
      })),
      category.name,
    ),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: category.name, path },
    ]),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <CategoryDetailView category={category} products={productsPage.items} />
    </>
  );
}
