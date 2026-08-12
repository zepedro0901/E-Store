"use client";

import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import type { ProductVariation } from "@/types/product";
import { useTranslations } from "@/i18n/use-translations";
import { interpolate } from "@/i18n/interpolate";

export function AddToCartButton({
  productId,
  slug,
  name,
  price,
  image,
  inStock,
  currency,
  variations = [],
}: {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  currency: "EUR" | "USD";
  variations?: ProductVariation[];
}) {
  const { locale, dict } = useTranslations();
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  function flashAdded() {
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  function handleAddBase() {
    addItem({ productId, slug, name, price, image });
    flashAdded();
  }

  function handleAddVariation(variation: ProductVariation) {
    addItem({
      productId,
      slug,
      name,
      price: variation.price ?? price,
      image: variation.image ?? image,
      variationId: variation.id,
      variationLabel: variation.label,
    });
    flashAdded();
    setMenuOpen(false);
  }

  if (variations.length === 0) {
    return (
      <button
        type="button"
        onClick={handleAddBase}
        disabled={!inStock}
        aria-label={
          inStock
            ? interpolate(dict.addToCart.ariaAdd, { name })
            : interpolate(dict.addToCart.ariaOutOfStock, { name })
        }
        className="shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        {justAdded
          ? dict.common.added
          : inStock
            ? dict.common.addToCart
            : dict.common.soldOut}
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
        aria-label={interpolate(dict.addToCart.ariaChooseVariation, { name })}
        className="flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover"
      >
        {justAdded ? dict.common.added : dict.common.addToCart}
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className={`h-3 w-3 transition-transform ${menuOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {menuOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-border bg-surface py-1 shadow-lg"
        >
          {variations.map((variation) => {
            const disabled = variation.inStock === false;
            return (
              <button
                key={variation.id}
                type="button"
                role="option"
                disabled={disabled}
                onClick={() => handleAddVariation(variation)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{variation.label}</span>
                {variation.price !== undefined && (
                  <span className="shrink-0 font-mono text-foreground/50">
                    {formatPrice(variation.price, currency, locale)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
