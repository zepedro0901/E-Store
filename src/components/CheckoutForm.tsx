"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { useTranslations } from "@/i18n/use-translations";

const FIELD_CLASS =
  "w-full border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent/50";
const LABEL_CLASS = "text-xs font-medium uppercase tracking-wide text-foreground/55";

export function CheckoutForm() {
  const { locale, dict } = useTranslations();
  const router = useRouter();
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  if (!hasHydrated) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-foreground/60">{dict.checkout.emptyCart}</p>
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const customer = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || "") || undefined,
      address: String(form.get("address") || ""),
      city: String(form.get("city") || ""),
      postalCode: String(form.get("postalCode") || ""),
      country: String(form.get("country") || ""),
      notes: String(form.get("notes") || "") || undefined,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, items }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || dict.checkout.genericSendError);
      }
      clear();
      router.push(`/checkout/thank-you?order=${encodeURIComponent(data.orderNumber)}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : dict.checkout.genericError);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASS}>{dict.checkout.fullName}</span>
            <input name="name" required className={FIELD_CLASS} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASS}>{dict.checkout.email}</span>
            <input name="email" type="email" required className={FIELD_CLASS} />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={LABEL_CLASS}>{dict.checkout.phoneOptional}</span>
          <input name="phone" type="tel" className={FIELD_CLASS} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={LABEL_CLASS}>{dict.checkout.shippingAddress}</span>
          <input name="address" required className={FIELD_CLASS} />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASS}>{dict.checkout.city}</span>
            <input name="city" required className={FIELD_CLASS} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASS}>{dict.checkout.postalCode}</span>
            <input name="postalCode" required className={FIELD_CLASS} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLASS}>{dict.checkout.country}</span>
            <input name="country" required className={FIELD_CLASS} />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={LABEL_CLASS}>{dict.checkout.notesOptional}</span>
          <textarea
            name="notes"
            rows={3}
            placeholder={dict.checkout.notesPlaceholder}
            className={FIELD_CLASS}
          />
        </label>

        {error && (
          <p className="border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? dict.checkout.sending : dict.checkout.submit}
        </button>
        <p className="text-xs text-foreground/50">{dict.checkout.disclaimer}</p>
      </form>

      <div className="flex h-fit flex-col gap-4 border border-border bg-surface p-5">
        <h2 className="font-display text-lg font-semibold tracking-wide">
          {dict.checkout.orderSummary}
        </h2>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variationId ?? "base"}`}
              className="flex justify-between gap-3 text-sm"
            >
              <span className="text-foreground/80">
                {item.name}
                {item.variationLabel && (
                  <span className="text-foreground/50"> ({item.variationLabel})</span>
                )}{" "}
                <span className="text-foreground/45">&times;{item.quantity}</span>
              </span>
              <span className="shrink-0 font-mono text-foreground/70">
                {formatPrice(item.price * item.quantity, "EUR", locale)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-foreground/55">{dict.common.total}</span>
          <span className="font-display text-xl font-bold text-accent">
            {formatPrice(subtotal, "EUR", locale)}
          </span>
        </div>
      </div>
    </div>
  );
}
