export type Locale = "pt" | "en";

export const defaultLocale: Locale = "pt";

export const locales: Locale[] = ["pt", "en"];

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as string[]).includes(value);
}
