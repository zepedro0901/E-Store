# Homepage Shop by Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's "Shop by Category" grid (4 categories → `/category/[slug]`) with a "Shop By Theme" grid (9 themes → `/theme/[slug]`), fully translated in English and Portuguese (Portugal).

**Architecture:** Swap the data source and link target inside the existing grid section in `src/app/page.tsx` from `getCategories`/`category` to `getThemes`/`theme`. No new components, routes, or data - `getThemes(locale)` and `/theme/[slug]` already exist and already return pre-translated theme data.

**Tech Stack:** Next.js App Router (Server Components), TypeScript, existing `src/i18n` dictionary system.

## Global Constraints

- Every new/changed user-facing string must exist in both `src/i18n/dictionaries/en.ts` and `src/i18n/dictionaries/pt.ts` (Portuguese must be Portugal Portuguese, not Brazilian).
- Stats (`statCollections`) and the CTA subtitle stay wired to `getCategories`/categories - out of scope per the spec.
- Card markup/styling for the grid items must stay visually identical to the current category cards - only data source and `href` change.

---

### Task 1: Rename the `shopByCategory` dictionary key to `shopByTheme` in both locales

**Files:**
- Modify: `src/i18n/dictionaries/en.ts` (the `home.shopByCategory` key, currently `"Shop by Category"`)
- Modify: `src/i18n/dictionaries/pt.ts` (the matching `home.shopByCategory` key)

**Interfaces:**
- Consumes: nothing new.
- Produces: `dict.home.shopByTheme` (string), consumed by Task 2 in `src/app/page.tsx`.

- [ ] **Step 1: Rename the key in `en.ts`**

In `src/i18n/dictionaries/en.ts`, change:

```ts
    shopByCategory: "Shop by Category",
```

to:

```ts
    shopByTheme: "Shop By Theme",
```

(keep it in the same position within the `home` object).

- [ ] **Step 2: Rename the key in `pt.ts`**

Find the matching `shopByCategory` line in `src/i18n/dictionaries/pt.ts` and rename/retranslate it to:

```ts
    shopByTheme: "Comprar por Tema",
```

- [ ] **Step 3: Verify no other references to the old key remain**

Run: `grep -rn "shopByCategory" src/`
Expected: no matches (Task 2 will remove the last usage in `page.tsx` - if this step is run before Task 2, one match in `page.tsx` is expected and will be cleared by Task 2).

- [ ] **Step 4: Commit**

```bash
git add src/i18n/dictionaries/en.ts src/i18n/dictionaries/pt.ts
git commit -m "Rename home.shopByCategory dict key to shopByTheme"
```

---

### Task 2: Swap the homepage grid from categories to themes

**Files:**
- Modify: `src/app/page.tsx:5,11,95-129` (import, data fetch, and the `#categories` section)

**Interfaces:**
- Consumes: `getThemes(locale)` from `@/lib/products` (already exported, same shape/signature as `getCategories(locale)`: returns `Theme[]` with `slug`, `name`, `image?`); `dict.home.shopByTheme` from Task 1.
- Produces: nothing consumed by later tasks (this is the last task).

- [ ] **Step 1: Update the import**

In `src/app/page.tsx`, change:

```ts
import { getAllProducts, getCategories, getFeaturedProducts } from "@/lib/products";
```

to:

```ts
import { getAllProducts, getCategories, getFeaturedProducts, getThemes } from "@/lib/products";
```

(`getCategories` stays imported/used - the stats block still needs `categories.length`.)

- [ ] **Step 2: Fetch themes alongside categories**

After the existing line:

```ts
  const categories = getCategories(locale);
```

add:

```ts
  const themes = getThemes(locale);
```

- [ ] **Step 3: Swap the grid section's id, heading, and data source**

Replace this block:

```tsx
        <section id="categories" className="mb-20 scroll-mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
              {dict.home.shopByCategory}
            </h2>
            <span className="hidden h-px flex-1 bg-border sm:ml-8 sm:block" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative aspect-square overflow-hidden border border-border"
              >
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                <div className="absolute inset-0 border border-accent/0 transition-colors duration-300 group-hover:border-accent/40" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-sm font-semibold uppercase tracking-wide text-white">
                  {category.name}
                  <span className="translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
```

with:

```tsx
        <section id="themes" className="mb-20 scroll-mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
              {dict.home.shopByTheme}
            </h2>
            <span className="hidden h-px flex-1 bg-border sm:ml-8 sm:block" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {themes.map((theme) => (
              <Link
                key={theme.slug}
                href={`/theme/${theme.slug}`}
                className="group relative aspect-square overflow-hidden border border-border"
              >
                {theme.image && (
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                <div className="absolute inset-0 border border-accent/0 transition-colors duration-300 group-hover:border-accent/40" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-sm font-semibold uppercase tracking-wide text-white">
                  {theme.name}
                  <span className="translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
```

- [ ] **Step 4: Update the hero anchor link**

In the hero section, change:

```tsx
            <Link
              href="#categories"
              className="border border-border px-7 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
            >
              {dict.home.exploreCollections}
            </Link>
```

to:

```tsx
            <Link
              href="#themes"
              className="border border-border px-7 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
            >
              {dict.home.exploreCollections}
            </Link>
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (in particular, no "Property 'shopByCategory' does not exist" / no unused-`categories`-variable issue, since `categories.length` is still used in the stats block).

- [ ] **Step 6: Manual verification in the browser**

Run: `npm run dev`, open `http://localhost:3000/`.
Expected:
- A "Shop By Theme" heading with a grid of 9 cards (Dragons, Humanoids, Monsters & Beasts, Undead, Demons & Fiends, Celestials, Constructs, Terrain & Scenery, Busts), each with an image.
- Clicking a card navigates to `/theme/<slug>` and shows that theme's products.
- The hero "Explore Collections" button scrolls down to this section.
- Switching the site language to Portuguese shows "Comprar por Tema" and Portuguese theme names.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx
git commit -m "Swap homepage grid from categories to themes"
```
