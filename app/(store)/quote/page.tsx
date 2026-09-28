import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/app/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Get a Quote",
  path: "/quote",
});

export default function QuotePage() {
  redirect("/contact");
}
