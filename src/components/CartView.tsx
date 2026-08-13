"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { useTranslations } from "@/i18n/use-translations";
import { interpolate } from "@/i18n/interpolate";

export function CartView() {
  const { locale, dict } = useTranslations();
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  if (!hasHydrated) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-foreground/60">{dict.cart.empty}</p>
        <Link
          href="/products"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          {dict.common.browseAllProducts}
        </Link>
      </div>
    );
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="flex flex-col gap-8">
      <p className="rounded-xl border border-accent/30 bg-accent/5 p-3 text-xs leading-relaxed text-foreground/70">
        {dict.cart.orderNotice}
      </p>
      <div className="flex flex-col divide-y divide-border border border-border">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variationId ?? "base"}`}
            className="flex items-center gap-4 p-4"
          >
            <Link
              href={`/products/${item.slug}`}
              className="relative h-20 w-20 shrink-0 overflow-hidden bg-surface-2"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </Link>
            <div className="flex flex-1 flex-col gap-1">
              <Link
                href={`/products/${item.slug}`}
                className="text-sm font-semibold hover:text-accent"
              >
                {item.name}
              </Link>
              {item.variationLabel && (
                <span className="text-xs text-foreground/55">
                  {item.variationLabel}
                </span>
              )}
              <span className="font-mono text-xs text-foreground/50">
                {interpolate(dict.cart.each, {
                  price: formatPrice(item.price, "EUR", locale),
                })}
              </span>
            </div>
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() =>
                  setQuantity(item.productId, item.quantity - 1, item.variationId)
                }
                aria-label={dict.common.decreaseQuantity}
                className="flex h-8 w-8 items-center justify-center text-base transition-colors hover:text-accent"
              >
                &minus;
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity(item.productId, item.quantity + 1, item.variationId)
                }
                aria-label={dict.common.increaseQuantity}
                className="flex h-8 w-8 items-center justify-center text-base transition-colors hover:text-accent"
              >
                +
              </button>
            </div>
            <span className="w-20 shrink-0 text-right text-sm font-semibold text-accent">
              {formatPrice(item.price * item.quantity, "EUR", locale)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(item.productId, item.variationId)}
              aria-label={interpolate(dict.cart.removeAria, { name: item.name })}
              className="shrink-0 text-foreground/40 transition-colors hover:text-red-400"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground/55">{dict.common.subtotal}</span>
          <span className="font-display text-2xl font-bold text-accent">
            {formatPrice(subtotal, "EUR", locale)}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={clear}
            className="border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/70 transition-colors hover:border-red-400/50 hover:text-red-400"
          >
            {dict.cart.clearCart}
          </button>
          <Link
            href="/products"
            className="border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
          >
            {dict.common.continueShopping}
          </Link>
          <Link
            href="/checkout"
            className="bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            {dict.cart.requestToOrder}
          </Link>
        </div>
      </div>
    </div>
  );
}
