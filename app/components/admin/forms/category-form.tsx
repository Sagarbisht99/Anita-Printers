"use client";

import { useEffect, useMemo, useState } from "react";
import { useSaveCategory } from "@/app/hooks/admin";
import { Button } from "@/app/components/admin/ui/button";
import { Field, Input, Textarea } from "@/app/components/admin/ui/field";
import { TodoListField } from "@/app/components/admin/ui/todo-list-field";
import { ProductImageUploader } from "@/app/components/shared/imagekit/product-image-uploader";
import { CATEGORY_IMAGE_FOLDER } from "@/app/lib/imagekit/constants";
import { slugify } from "@/app/lib/admin/slug";

export type CategoryFormValues = {
  id?: number;
  name: string;
  slug: string;
  image?: string | null;
  status: "active" | "non_active";
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string[];
  isIndexed: boolean;
};

export function CategoryForm({
  initial,
  onSuccess,
}: {
  initial?: CategoryFormValues | null;
  onSuccess: () => void;
}) {
  const save = useSaveCategory();
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [image, setImage] = useState(initial?.image ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initial?.seoDescription ?? "",
  );
  const [seoKeywords, setSeoKeywords] = useState<string[]>(
    initial?.seoKeywords ?? [],
  );
  const [isActive, setIsActive] = useState(
    (initial?.status ?? "active") === "active",
  );
  const [isIndexed, setIsIndexed] = useState(initial?.isIndexed ?? true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setName(initial?.name ?? "");
    setSlug(initial?.slug ?? "");
    setSlugTouched(Boolean(initial?.slug));
    setImage(initial?.image ?? "");
    setDescription(initial?.description ?? "");
    setSeoTitle(initial?.seoTitle ?? "");
    setSeoDescription(initial?.seoDescription ?? "");
    setSeoKeywords(initial?.seoKeywords ?? []);
    setIsActive((initial?.status ?? "active") === "active");
    setIsIndexed(initial?.isIndexed ?? true);
  }, [initial]);

  const autoSlug = useMemo(() => slugify(name), [name]);

  async function handleSubmit(formData: FormData) {
    setError(null);

    if (initial?.id) {
      formData.set("id", String(initial.id));
    } else {
      formData.delete("id");
    }

    formData.set("name", name);
    formData.set("slug", slug);
    formData.set("image", image);
    formData.set("description", description);
    formData.set("seoTitle", seoTitle);
    formData.set("seoDescription", seoDescription);
    formData.set("seoKeywords", JSON.stringify(seoKeywords));
    formData.set("status", isActive ? "active" : "non_active");
    formData.set("isIndexed", isIndexed ? "true" : "false");

    try {
      await save.mutateAsync(formData);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save category.");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {initial?.id ? (
        <input type="hidden" name="id" value={String(initial.id)} />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input
            name="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug" hint={autoSlug ? `Suggested: ${autoSlug}` : undefined}>
          <Input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
          />
        </Field>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#161616] p-4">
        <ProductImageUploader
          mode="single"
          label="Category image"
          value={image}
          onChange={(next) => setImage(typeof next === "string" ? next : "")}
          folder={CATEGORY_IMAGE_FOLDER}
        />
      </div>

      <Field label="Description">
        <Textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      <Field label="SEO Title">
        <Input
          name="seoTitle"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
        />
      </Field>

      <Field label="SEO Description">
        <Textarea
          name="seoDescription"
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
        />
      </Field>

      <TodoListField
        label="SEO Keywords"
        name="seoKeywords"
        values={seoKeywords}
        onChange={setSeoKeywords}
        placeholder="Add a keyword and press Enter"
      />

      <div className="grid gap-4 rounded-2xl border border-white/[0.06] bg-[#161616] p-4 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#111111] px-4 py-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-transparent accent-[#3B82F6]"
          />
          <span className="text-sm text-zinc-200">
            Active
            <span className="mt-0.5 block text-xs text-zinc-500">
              Unchecked = non-active
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#111111] px-4 py-3">
          <input
            type="checkbox"
            checked={isIndexed}
            onChange={(e) => setIsIndexed(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-transparent accent-[#3B82F6]"
          />
          <span className="text-sm text-zinc-200">
            Indexed
            <span className="mt-0.5 block text-xs text-zinc-500">
              Allow search engines to index
            </span>
          </span>
        </label>
      </div>

      {error ? (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end gap-2 pt-1">
        <Button type="submit" loading={save.isPending}>
          {initial?.id ? "Update category" : "Create category"}
        </Button>
      </div>
    </form>
  );
}
