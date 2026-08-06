import { getCategories } from "@/lib/products";

export function FilterBar({
  action,
  category,
  sort,
  q,
  showCategoryFilter = false,
}: {
  action: string;
  category?: string;
  sort?: string;
  q?: string;
  showCategoryFilter?: boolean;
}) {
  const categories = getCategories();

  return (
    <form
      action={action}
      method="get"
      className="mb-10 flex flex-wrap items-end gap-4 rounded-xl border border-border bg-surface p-4"
    >
      <div className="flex flex-1 min-w-40 flex-col gap-1">
        <label
          htmlFor="q"
          className="text-xs font-medium text-foreground/55"
        >
          Search
        </label>
        <input
          id="q"
          name="q"
          type="text"
          defaultValue={q}
          placeholder="Search products…"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      {showCategoryFilter && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-xs font-medium text-foreground/55"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={category ?? ""}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="sort"
          className="text-xs font-medium text-foreground/55"
        >
          Sort by
        </label>
        <select
          id="sort"
          name="sort"
          defaultValue={sort ?? "newest"}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A–Z</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
      >
        Apply
      </button>
    </form>
  );
}
