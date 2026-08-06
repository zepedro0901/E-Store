import type { Metadata } from "next";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { SORT_OPTIONS, listProducts } from "@/lib/products";
import type { SortOption } from "@/types/product";

export const metadata: Metadata = {
  title: "All Products",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    theme?: string;
    sort?: string;
    q?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const category = params.category || undefined;
  const theme = params.theme || undefined;
  const q = params.q || undefined;
  const sort: SortOption = SORT_OPTIONS.includes(params.sort as SortOption)
    ? (params.sort as SortOption)
    : "newest";
  const page = Number(params.page) || 1;

  const {
    items,
    total,
    totalPages,
    page: currentPage,
  } = listProducts({ category, theme, q, sort, page });

  const buildHref = (targetPage: number) => {
    const usp = new URLSearchParams();
    if (category) usp.set("category", category);
    if (theme) usp.set("theme", theme);
    if (q) usp.set("q", q);
    if (sort !== "newest") usp.set("sort", sort);
    if (targetPage > 1) usp.set("page", String(targetPage));
    const qs = usp.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        All Products
      </h1>
      <p className="mt-1 text-sm text-foreground/55">{total} products</p>
      <FilterBar
        action="/products"
        category={category}
        theme={theme}
        sort={sort}
        q={q}
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
