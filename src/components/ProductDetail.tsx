"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product, Theme } from "@/types/product";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductOptions } from "@/components/ProductOptions";
import { useTranslations } from "@/i18n/use-translations";

export function ProductDetail({
  product,
  themes,
}: {
  product: Product;
  themes: Theme[];
}) {
  const { dict } = useTranslations();
  const variations = product.variations ?? [];
  const [variationId, setVariationId] = useState(variations[0]?.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  function handleVariationChange(nextVariationId: string) {
    setVariationId(nextVariationId);
    const variation = variations.find((v) => v.id === nextVariationId);
    if (variation?.image) {
      const index = product.images.indexOf(variation.image);
      if (index !== -1) setActiveImageIndex(index);
    }
  }

  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <ProductGallery
        images={product.images}
        alt={product.name}
        activeIndex={activeImageIndex}
        onActiveIndexChange={setActiveImageIndex}
      />
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-3xl font-semibold tracking-wide">
          {product.name}
        </h1>
        <ProductOptions
          product={product}
          variationId={variationId}
          onVariationChange={handleVariationChange}
        />
        <p className="text-sm leading-relaxed text-foreground/65">
          {product.description}
        </p>
        <dl className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-foreground/55">{dict.common.scale}</dt>
          <dd>{product.scale}</dd>
          <dt className="text-foreground/55">{dict.common.material}</dt>
          <dd className="capitalize">{product.material}</dd>
        </dl>
        {themes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => (
              <Link
                key={theme.slug}
                href={`/theme/${theme.slug}`}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
              >
                {theme.name}
              </Link>
            ))}
          </div>
        )}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-foreground/65"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
