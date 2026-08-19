import type { Metadata } from "next";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { SORT_OPTIONS, listProducts } from "@/lib/products";
import type { SortOption } from "@/types/product";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.common.allProducts };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    theme?: string;
    sort?: string;
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  const { locale, dict } = await getDictionary();
  const params = await searchParams;
  const category = params.category || undefined;
  const theme = params.theme || undefined;
  const q = params.q || undefined;
  const minPriceInput = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPriceInput = params.maxPrice ? Number(params.maxPrice) : undefined;
  const minPrice =
    minPriceInput != null && !Number.isNaN(minPriceInput)
      ? Math.round(minPriceInput * 100)
      : undefined;
  const maxPrice =
    maxPriceInput != null && !Number.isNaN(maxPriceInput)
      ? Math.round(maxPriceInput * 100)
      : undefined;
  const sort: SortOption = SORT_OPTIONS.includes(params.sort as SortOption)
    ? (params.sort as SortOption)
    : "name-asc";
  const page = Number(params.page) || 1;

  const {
    items,
    total,
    totalPages,
    page: currentPage,
  } = listProducts({ category, theme, q, minPrice, maxPrice, sort, page, locale });

  const buildHref = (targetPage: number) => {
    const usp = new URLSearchParams();
    if (category) usp.set("category", category);
    if (theme) usp.set("theme", theme);
    if (q) usp.set("q", q);
    if (params.minPrice) usp.set("minPrice", params.minPrice);
    if (params.maxPrice) usp.set("maxPrice", params.maxPrice);
    if (sort !== "name-asc") usp.set("sort", sort);
    if (targetPage > 1) usp.set("page", String(targetPage));
    const qs = usp.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        {dict.common.allProducts}
      </h1>
      <p className="mt-1 text-sm text-foreground/55">
        {interpolate(dict.products.productsCount, { count: total })}
      </p>
      <FilterBar
        action="/products"
        category={category}
        theme={theme}
        sort={sort}
        q={q}
        minPrice={minPriceInput}
        maxPrice={maxPriceInput}
        showCategoryFilter
        showThemeFilter
      />
      <ProductGrid products={items} />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        buildHref={buildHref}
      />
    </div>
  );
}
