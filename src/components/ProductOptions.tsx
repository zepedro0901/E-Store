"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { useTranslations } from "@/i18n/use-translations";

export function ProductOptions({
  product,
  variationId: controlledVariationId,
  onVariationChange,
}: {
  product: Product;
  variationId?: string;
  onVariationChange?: (variationId: string) => void;
}) {
  const { locale, dict } = useTranslations();
  const variations = product.variations ?? [];
  const [internalVariationId, setInternalVariationId] = useState(
    variations[0]?.id,
  );
  const variationId = controlledVariationId ?? internalVariationId;
  const setVariationId = onVariationChange ?? setInternalVariationId;
  const [quantity, setQuantity] = useState(1);

  const activeVariation = variations.find((v) => v.id === variationId);
  const unitPrice = activeVariation?.price ?? product.price;
  const inStock = activeVariation?.inStock ?? product.inStock;
  const total = unitPrice * quantity;

  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: unitPrice,
        image: activeVariation?.image ?? product.images[0],
        variationId: activeVariation?.id,
        variationLabel: activeVariation?.label,
      },
      quantity,
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-4">
      {variations.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground/55">
            {dict.productOptions.variation}
          </span>
          <div className="flex flex-wrap gap-2">
            {variations.map((variation) => {
              const selected = variation.id === variationId;
              const disabled = variation.inStock === false;
              return (
                <button
                  key={variation.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => setVariationId(variation.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    selected
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border hover:border-accent/50"
                  } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  {variation.label}
                  {disabled ? dict.productOptions.outOfStockSuffix : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-foreground/55">
          {dict.common.quantity}
        </span>
        <div className="flex w-fit items-center rounded-full border border-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label={dict.common.decreaseQuantity}
            className="flex h-9 w-9 items-center justify-center text-lg transition-colors hover:text-accent"
          >
            &minus;
          </button>
          <span className="w-10 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            aria-label={dict.common.increaseQuantity}
            className="flex h-9 w-9 items-center justify-center text-lg transition-colors hover:text-accent"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-4">
        <span className="text-sm text-foreground/55">{dict.common.total}</span>
        <span className="text-2xl font-bold text-accent">
          {formatPrice(total, product.currency, locale)}
        </span>
        {!inStock && (
          <span className="ml-auto rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400">
            {dict.common.outOfStock}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!inStock}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        {justAdded ? dict.common.addedToCart : dict.common.addToCart}
      </button>
    </div>
  );
}
