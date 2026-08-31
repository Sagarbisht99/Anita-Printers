import type { MetadataRoute } from "next";
import {
  fetchActiveProductSlugsForSitemap,
  fetchIndexedCategoriesForSitemap,
} from "@/app/actions/store/catalog";
import { absoluteUrl } from "@/app/lib/seo/site";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/products", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/shipping", changeFrequency: "yearly", priority: 0.4 },
  { path: "/refund", changeFrequency: "yearly", priority: 0.4 },
  { path: "/sitemap", changeFrequency: "monthly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [products, categories] = await Promise.all([
    fetchActiveProductSlugsForSitemap(),
    fetchIndexedCategoriesForSitemap(),
  ]);

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/products?categoryId=${category.id}`),
    lastModified: category.createdAt,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: product.createdAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...pages, ...categoryPages, ...productPages];
}
