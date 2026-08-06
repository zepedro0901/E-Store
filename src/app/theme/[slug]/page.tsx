import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import {
  SORT_OPTIONS,
  getThemes,
  getThemeBySlug,
  listProducts,
} from "@/lib/products";
import type { SortOption } from "@/types/product";

export function generateStaticParams() {
  return getThemes().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  return { title: theme ? theme.name : "Theme" };
}

export default async function ThemePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; q?: string; page?: string }>;
}) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) notFound();

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
  } = listProducts({ theme: slug, q, sort, page });

  const buildHref = (targetPage: number) => {
    const usp = new URLSearchParams();
    if (q) usp.set("q", q);
    if (sort !== "newest") usp.set("sort", sort);
    if (targetPage > 1) usp.set("page", String(targetPage));
    const qs = usp.toString();
    return `/theme/${slug}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        {theme.name}
      </h1>
      {theme.description && (
        <p className="mt-1 text-sm text-foreground/55">{theme.description}</p>
      )}
      <p className="mt-1 text-sm text-foreground/55">{total} products</p>
      <FilterBar action={`/theme/${slug}`} sort={sort} q={q} />
      <ProductGrid products={items} />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        buildHref={buildHref}
      />
    </div>
  );
}
