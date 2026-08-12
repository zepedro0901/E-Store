import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";

const NUMBER_FORMAT_LOCALE: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en-US",
};

export function formatPrice(
  cents: number,
  currency: "EUR" | "USD",
  locale: Locale = "pt",
): string {
  return new Intl.NumberFormat(NUMBER_FORMAT_LOCALE[locale], {
    style: "currency",
    currency,
  }).format(cents / 100);
}

// `scale` stores canonical English category words, possibly comma-separated
// (e.g. "Medium, Huge" for a product sold at two base sizes). Translate each
// token independently so the join order is preserved.
export function formatScale(
  scale: string,
  sizeCategories: Dictionary["sizeCategories"],
): string {
  if (!scale) return "";
  return scale
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean)
    .map(
      (token) =>
        sizeCategories[token.toLowerCase() as keyof typeof sizeCategories] ??
        token,
    )
    .join(", ");
}
