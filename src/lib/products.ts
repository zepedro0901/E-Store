import categoriesData from "../../data/categories.json";
import themesData from "../../data/themes.json";
import productsData from "../../data/products.json";
import type { Category, Product, SortOption, Theme } from "@/types/product";
import { defaultLocale, type Locale } from "@/i18n/locales";

const categories = categoriesData as Category[];
const themes = themesData as Theme[];
const products = (productsData as Product[]).filter((p) => !p.hidden);

export const PAGE_SIZE = 48;
export const SORT_OPTIONS: SortOption[] = [
  "newest",
  "price-asc",
  "price-desc",
  "name-asc",
];

// The raw data files (name/description/tags) are written in English. That's
// the base language of the data — independent of `defaultLocale`, which is
// the site's default *display* language (Portuguese). Only overlay the
// `translations.pt` fields when the visitor's locale is actually Portuguese.
export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale !== "pt") return product;
  const t = product.translations?.pt;
  if (!t) return product;
  return {
    ...product,
    name: t.name ?? product.name,
    description: t.description ?? product.description,
    tags: t.tags ?? product.tags,
  };
}

export function localizeCategory(category: Category, locale: Locale): Category {
  if (locale !== "pt") return category;
  const t = category.translations?.pt;
  if (!t) return category;
  return {
    ...category,
    name: t.name ?? category.name,
    description: t.description ?? category.description,
  };
}

export function localizeTheme(theme: Theme, locale: Locale): Theme {
  if (locale !== "pt") return theme;
  const t = theme.translations?.pt;
  if (!t) return theme;
  return {
    ...theme,
    name: t.name ?? theme.name,
    description: t.description ?? theme.description,
  };
}

export function getCategories(locale: Locale = defaultLocale): Category[] {
  return categories.map((c) => localizeCategory(c, locale));
}

export function getCategoryBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Category | undefined {
  const category = categories.find((c) => c.slug === slug);
  return category && localizeCategory(category, locale);
}

export function getThemes(locale: Locale = defaultLocale): Theme[] {
  return themes.map((t) => localizeTheme(t, locale));
}

export function getThemeBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Theme | undefined {
  const theme = themes.find((t) => t.slug === slug);
  return theme && localizeTheme(theme, locale);
}

export function getAllProducts(locale: Locale = defaultLocale): Product[] {
  return products.map((p) => localizeProduct(p, locale));
}

export function getProductBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Product | undefined {
  const product = products.find((p) => p.slug === slug);
  return product && localizeProduct(product, locale);
}

export function getFeaturedProducts(
  limit = 8,
  locale: Locale = defaultLocale,
): Product[] {
  return products
    .filter((p) => p.featured)
    .slice(0, limit)
    .map((p) => localizeProduct(p, locale));
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Picks up to `count` product images for a theme's homepage showcase card,
// preferring one image per distinct studio (category) so the grid represents
// the theme's range. If the theme has products from fewer than `count`
// studios, remaining slots are filled with more (non-repeating) products from
// the theme, repeating a studio if necessary.
export function getThemeShowcaseImages(themeSlug: string, count = 4): string[] {
  const pool = products.filter(
    (p) => p.themes.includes(themeSlug) && p.images[0],
  );

  const byCategory = new Map<string, Product[]>();
  for (const p of pool) {
    const list = byCategory.get(p.category);
    if (list) list.push(p);
    else byCategory.set(p.category, [p]);
  }

  const picks: Product[] = [];
  const usedIds = new Set<string>();
  for (const category of shuffle([...byCategory.keys()])) {
    if (picks.length >= count) break;
    const choice = shuffle(byCategory.get(category)!)[0];
    picks.push(choice);
    usedIds.add(choice.id);
  }

  if (picks.length < count) {
    for (const p of shuffle(pool.filter((p) => !usedIds.has(p.id)))) {
      if (picks.length >= count) break;
      picks.push(p);
      usedIds.add(p.id);
    }
  }

  return picks.map((p) => p.images[0]);
}

export function getProductPriceRange(product: Product): {
  min: number;
  max: number;
} {
  if (!product.variations || product.variations.length === 0) {
    return { min: product.price, max: product.price };
  }
  const prices = product.variations.map((v) => v.price ?? product.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

// Matches against both the English base fields and the Portuguese overlay
// (when present) regardless of the visitor's active locale, so a PT-locale
// visitor can still find a product by its English name/tag and vice versa.
function matchesSearch(product: Product, needle: string): boolean {
  const pt = product.translations?.pt;
  const haystacks = [
    product.name,
    product.description,
    ...product.tags,
    pt?.name,
    pt?.description,
    ...(pt?.tags ?? []),
  ];
  return haystacks.some((s) => s?.toLowerCase().includes(needle));
}

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

export interface ListProductsParams {
  category?: string;
  theme?: string;
  q?: string;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
  locale?: Locale;
}

export interface ListProductsResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function listProducts({
  category,
  theme,
  q,
  sort = "newest",
  page = 1,
  pageSize = PAGE_SIZE,
  locale = defaultLocale,
}: ListProductsParams): ListProductsResult {
  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (theme) {
    filtered = filtered.filter((p) => p.themes.includes(theme));
  }

  const needle = q?.trim().toLowerCase();
  if (needle) {
    filtered = filtered.filter((p) => matchesSearch(p, needle));
  }

  const sorted = sortProducts(
    filtered.map((p) => localizeProduct(p, locale)),
    sort,
  );
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  return { items, total, page: safePage, pageSize, totalPages };
}
