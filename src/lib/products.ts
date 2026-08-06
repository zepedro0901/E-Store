import categoriesData from "../../data/categories.json";
import productsData from "../../data/products.json";
import type { Category, Product, SortOption } from "@/types/product";

const categories = categoriesData as Category[];
const products = (productsData as Product[]).filter((p) => !p.hidden);

export const PAGE_SIZE = 48;
export const SORT_OPTIONS: SortOption[] = [
  "newest",
  "price-asc",
  "price-desc",
  "name-asc",
];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
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
  q?: string;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
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
  q,
  sort = "newest",
  page = 1,
  pageSize = PAGE_SIZE,
}: ListProductsParams): ListProductsResult {
  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  const needle = q?.trim().toLowerCase();
  if (needle) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.tags.some((tag) => tag.toLowerCase().includes(needle)),
    );
  }

  const sorted = sortProducts(filtered, sort);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  return { items, total, page: safePage, pageSize, totalPages };
}
