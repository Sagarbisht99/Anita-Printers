import type { Metadata } from "next";
import { fetchStoreCategoriesWithCovers } from "@/app/actions/store/catalog";
import { CategoriesIndexView } from "@/app/components/store/pages";
import { JsonLdScript } from "@/app/components/store/seo/json-ld-script";
import { createPageMetadata } from "@/app/lib/seo/metadata";
import { categoriesKeywords } from "@/app/lib/seo/keywords";
import { categoriesIndexPath } from "@/app/lib/seo/paths";
import {
  breadcrumbJsonLd,
  categoryItemListJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/app/lib/seo/json-ld";

const PAGE_PATH = categoriesIndexPath();

const PAGE_DESCRIPTION =
  "Browse every printing category at Anita Printers — visiting cards, labels, packaging, banners, apparel and more. Bulk custom printing from Noida with pan-India delivery.";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Printing Categories",
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    keywords: categoriesKeywords,
  });
}

export default async function CategoriesIndexPage() {
  const categories = await fetchStoreCategoriesWithCovers();

  const schemas = jsonLdGraph(
    webPageJsonLd({
      name: "Printing categories",
      description: PAGE_DESCRIPTION,
      path: PAGE_PATH,
      type: "CollectionPage",
    }),
    categoryItemListJsonLd(categories, "Anita Printers printing categories"),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Categories", path: PAGE_PATH },
    ]),
  );

  return (
    <>
      <JsonLdScript data={schemas} />
      <CategoriesIndexView categories={categories} />
    </>
  );
}
