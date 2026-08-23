"use client";

import { useEffect, useMemo, useState } from "react";
import { useSaveProduct } from "@/app/hooks/admin";
import { ProductImageUploader } from "@/app/components/imagekit/product-image-uploader";
import { Button } from "@/app/components/admin/ui/button";
import { Field, Input, Select, Textarea } from "@/app/components/admin/ui/field";
import { TodoListField } from "@/app/components/admin/ui/todo-list-field";
import { slugify } from "@/app/lib/admin/slug";

export type ProductFormValues = {
  id?: number;
  titleName: string;
  slug: string;
  pricing: string | number;
  status: "active" | "non_active";
  categoryId?: number | null;
  descriptionContent?: string | null;
  image?: string | null;
  imageGallery?: string[];
  sizes?: string[];
  colors?: string[];
  quantities?: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string[];
  isIndexed: boolean;
};

export function ProductForm({
  initial,
  categories,
  onSuccess,
}: {
  initial?: ProductFormValues | null;
  categories: { id: number; name: string }[];
  onSuccess: () => void;
}) {
  const save = useSaveProduct();
  const [title, setTitle] = useState(initial?.titleName ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [image, setImage] = useState(initial?.image ?? "");
  const [gallery, setGallery] = useState<string[]>(initial?.imageGallery ?? []);
  const [sizes, setSizes] = useState<string[]>(initial?.sizes ?? []);
  const [colors, setColors] = useState<string[]>(initial?.colors ?? []);
  const [quantities, setQuantities] = useState<string[]>(
    initial?.quantities ?? [],
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
  }, [initial]);

  const suggested = useMemo(() => slugify(title), [title]);

  async function handleSubmit(formData: FormData) {
    setError(null);
    formData.set("status", isActive ? "active" : "non_active");
    formData.set("isIndexed", isIndexed ? "true" : "false");
    try {
      await save.mutateAsync(formData);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save product.");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <input type="hidden" name="image" value={image} />
      <input type="hidden" name="imageGallery" value={JSON.stringify(gallery)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <Input
            name="titleName"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug" hint={suggested ? `Suggested: ${suggested}` : undefined}>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Price">
          <Input
            name="pricing"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={initial?.pricing ?? ""}
          />
        </Field>
        <Field label="Category">
          <Select
            name="categoryId"
            defaultValue={initial?.categoryId ? String(initial.categoryId) : ""}
          >
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Description">
        <Textarea
          name="descriptionContent"
          defaultValue={initial?.descriptionContent ?? ""}
        />
      </Field>

      <div className="space-y-6 rounded-2xl border border-white/[0.06] bg-[#161616] p-4">
        <ProductImageUploader
          mode="single"
          label="Cover image"
          value={image}
          onChange={(next) => setImage(typeof next === "string" ? next : "")}
        />
        <div className="h-px bg-white/[0.06]" />
        <ProductImageUploader
          mode="multiple"
          label="Image gallery"
          value={gallery}
          onChange={(next) => setGallery(Array.isArray(next) ? next : [])}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TodoListField
          label="Sizes"
          name="sizes"
          values={sizes}
          onChange={setSizes}
          placeholder="e.g. A4, A3, 12x18"
          hint="Shown as dropdown on frontend later"
        />
        <TodoListField
          label="Colors"
          name="colors"
          values={colors}
          onChange={setColors}
          placeholder="e.g. Black, Navy, Red"
          hint="Shown as dropdown on frontend later"
        />
      </div>

      <TodoListField
        label="Quantities"
        name="quantities"
        values={quantities}
        onChange={setQuantities}
        placeholder="e.g. 50, 100, 250"
        hint="Shown as dropdown on frontend later"
      />

      <Field label="SEO Title">
        <Input name="seoTitle" defaultValue={initial?.seoTitle ?? ""} />
      </Field>

      <Field label="SEO Description">
        <Textarea
          name="seoDescription"
          defaultValue={initial?.seoDescription ?? ""}
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
          {initial?.id ? "Update product" : "Create product"}
        </Button>
      </div>
    </form>
  );
}
