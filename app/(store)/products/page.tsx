import type { Metadata } from "next";
import { Suspense } from "react";
import {
  fetchStoreCategories,
  fetchStoreCategoryMeta,
  fetchStoreProductsPage,
} from "@/app/actions/store/catalog";
import {
  ProductsCatalog,
  PRODUCTS_PAGE_SIZE,
} from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { mergeKeywords, productsKeywords } from "@/app/lib/seo/keywords";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/app/lib/seo/json-ld";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function buildProductsPath(params: {
  search?: string;
  categoryId?: number | null;
  page?: number;
}) {
  const query = new URLSearchParams();
  if (params.search) query.set("q", params.search);
  if (params.categoryId) query.set("categoryId", String(params.categoryId));
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const qs = query.toString();
  return qs ? `/products?${qs}` : "/products";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const search = firstValue(params.q)?.trim() ?? "";
  const parsedCategory = Number(firstValue(params.categoryId));
  const categoryId =
    Number.isInteger(parsedCategory) && parsedCategory > 0
      ? parsedCategory
      : null;
  const page = Math.max(1, Number(firstValue(params.page)) || 1);
  const path = buildProductsPath({ search, categoryId, page });

  if (search) {
    return createPageMetadata({
      title: `Search results for “${search.slice(0, 60)}”`,
      description: `Products matching “${search}” at Anita Printers — bulk printing, custom packaging, and pan-India delivery from Noida.`,
      path,
      noIndex: true,
    });
  }

  if (categoryId) {
    const category = await fetchStoreCategoryMeta(categoryId);
    if (category) {
      const title =
        category.seoTitle?.trim() ||
        `${category.name} Printing Products`;
      const description =
        category.seoDescription?.trim() ||
        `Browse ${category.name} products at Anita Printers — bulk pricing, custom print options, and pan-India delivery from Noida.`;
      return createPageMetadata({
        title,
        description,
        path,
        keywords: mergeKeywords(
          [category.name, `${category.name} printing`, `${category.name} printing Noida`],
          category.seoKeywords,
          productsKeywords,
        ),
        noIndex: !category.isIndexed,
      });
    }
  }

  if (page > 1) {
    return createPageMetadata({
      title: `Product Catalog — Page ${page}`,
      description:
        "Browse Anita Printers product catalog — offset stationery, packaging, labels, apparel, and promotional print. Filter by category, MOQ, and request bulk pricing.",
      path,
    });
  }

  return createPageMetadata({
    title: "Product Catalog",
    description:
      "Browse Anita Printers product catalog — offset stationery, packaging, labels, apparel, and promotional print. Filter by category, MOQ, and request bulk pricing.",
    path: "/products",
    keywords: productsKeywords,
  });
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const search = firstValue(params.q)?.trim() ?? "";
  const parsedCategory = Number(firstValue(params.categoryId));
  const categoryId =
    Number.isInteger(parsedCategory) && parsedCategory > 0
      ? parsedCategory
      : null;
  const page = Math.max(1, Number(firstValue(params.page)) || 1);

  const [initialCategories, initialProducts, categoryMeta] = await Promise.all([
    fetchStoreCategories(),
    fetchStoreProductsPage({
      categoryId,
      search,
      page,
      pageSize: PRODUCTS_PAGE_SIZE,
    }),
    categoryId ? fetchStoreCategoryMeta(categoryId) : Promise.resolve(null),
  ]);

  const listName = categoryMeta
    ? `${categoryMeta.name} products`
    : search
      ? `Search results for ${search}`
      : "Anita Printers product catalog";

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    ...(categoryMeta
      ? [
          {
            name: categoryMeta.name,
            path: buildProductsPath({ categoryId }),
          },
        ]
      : []),
  ];

  const schemas = jsonLdGraph(
    webPageJsonLd({
      name: listName,
      description:
        "Browse bulk printing products — offset stationery, packaging, labels, and promotional print.",
      path: buildProductsPath({ search, categoryId, page }),
      type: "CollectionPage",
    }),
    breadcrumbJsonLd(breadcrumbs),
    itemListJsonLd(
      initialProducts.items.map((item) => ({
        name: item.titleName,
        slug: item.slug,
        image: item.image,
      })),
      listName,
    ),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <Suspense fallback={null}>
        <ProductsCatalog
          initialCategories={initialCategories}
          initialProducts={initialProducts}
          initialFilters={{ categoryId, search, page }}
        />
      </Suspense>
    </>
  );
}
