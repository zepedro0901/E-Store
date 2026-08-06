import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import {
  SORT_OPTIONS,
  getCategories,
  getCategoryBySlug,
  listProducts,
} from "@/lib/products";
import type { SortOption } from "@/types/product";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return { title: category ? category.name : "Category" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; q?: string; page?: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const sp = await searchParams;
  const q = sp.q || undefined;
  const sort: SortOption = SORT_OPTIONS.includes(sp.sort as SortOption)
    ? (sp.sort as SortOption)
    : "newest";
  const page = Number(sp.page) || 1;

  const {
    items,
    total,
    totalPages,
    page: currentPage,
  } = listProducts({ category: slug, q, sort, page });

  const buildHref = (targetPage: number) => {
    const usp = new URLSearchParams();
    if (q) usp.set("q", q);
    if (sort !== "newest") usp.set("sort", sort);
    if (targetPage > 1) usp.set("page", String(targetPage));
    const qs = usp.toString();
    return `/category/${slug}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        {category.name}
      </h1>
      {category.description && (
        <p className="mt-1 text-sm text-foreground/55">
          {category.description}
        </p>
      )}
      <p className="mt-1 text-sm text-foreground/55">{total} products</p>
      <FilterBar action={`/category/${slug}`} sort={sort} q={q} />
      <ProductGrid products={items} />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        buildHref={buildHref}
      />
    </div>
  );
}
