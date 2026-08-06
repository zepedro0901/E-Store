"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

export function AddToCartButton({
  productId,
  slug,
  name,
  price,
  image,
  inStock,
}: {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem({ productId, slug, name, price, image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!inStock}
      aria-label={inStock ? `Add ${name} to cart` : `${name} is out of stock`}
      className="shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
    >
      {justAdded ? "Added" : inStock ? "Add to Cart" : "Sold Out"}
    </button>
  );
}
