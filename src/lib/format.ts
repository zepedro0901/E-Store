import type { Locale } from "@/i18n/locales";

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
