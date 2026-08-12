import { getCategories, getThemes } from "@/lib/products";
import { getDictionary } from "@/i18n/get-dictionary";

export async function FilterBar({
  action,
  category,
  theme,
  sort,
  q,
  showCategoryFilter = false,
  showThemeFilter = false,
}: {
  action: string;
  category?: string;
  theme?: string;
  sort?: string;
  q?: string;
  showCategoryFilter?: boolean;
  showThemeFilter?: boolean;
}) {
  const { locale, dict } = await getDictionary();
  const categories = getCategories(locale);
  const themes = getThemes(locale);

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
          {dict.filterBar.search}
        </label>
        <input
          id="q"
          name="q"
          type="text"
          defaultValue={q}
          placeholder={dict.filterBar.searchPlaceholder}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      {showCategoryFilter && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-xs font-medium text-foreground/55"
          >
            {dict.filterBar.studio}
          </label>
          <select
            id="category"
            name="category"
            defaultValue={category ?? ""}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
          >
            <option value="">{dict.filterBar.allStudios}</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {showThemeFilter && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="theme"
            className="text-xs font-medium text-foreground/55"
          >
            {dict.filterBar.theme}
          </label>
          <select
            id="theme"
            name="theme"
            defaultValue={theme ?? ""}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
          >
            <option value="">{dict.filterBar.allThemes}</option>
            {themes.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
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
          {dict.filterBar.sortBy}
        </label>
        <select
          id="sort"
          name="sort"
          defaultValue={sort ?? "newest"}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
        >
          <option value="newest">{dict.filterBar.sortNewest}</option>
          <option value="price-asc">{dict.filterBar.sortPriceAsc}</option>
          <option value="price-desc">{dict.filterBar.sortPriceDesc}</option>
          <option value="name-asc">{dict.filterBar.sortNameAsc}</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
      >
        {dict.filterBar.apply}
      </button>
    </form>
  );
}
