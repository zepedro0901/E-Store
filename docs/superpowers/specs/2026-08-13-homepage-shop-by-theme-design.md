# Design: Homepage "Shop by Category" → "Shop By Theme"

## Context

The homepage (`src/app/page.tsx`) has a section titled "Shop by Category" that renders a
grid of the 4 studio categories (`getCategories`), each linking to `/category/[slug]`. The
request is to replace this with a "Shop By Theme" section listing the site's 9 themes
(Dragons, Humanoids, Monsters & Beasts, Undead, Demons & Fiends, Celestials, Constructs,
Terrain & Scenery, Busts) instead.

The underlying infrastructure for themes already exists and mirrors categories exactly:
`getThemes(locale)` / `getThemeBySlug` in `src/lib/products.ts`, a `/theme/[slug]` page
(`src/app/theme/[slug]/page.tsx`) parallel to `/category/[slug]`, a `Theme` type identical in
shape to `Category` (`slug`, `name`, `description?`, `image?`, `translations?`), and PT
translations already present for every theme in `data/themes.json`. The site footer
(`SiteFooter.tsx`) already lists themes separately from categories. This change only touches
what the homepage's featured grid displays - no new data, routes, or components.

All copy added by this change must ship in both English and Portuguese (Portugal), per the
project's existing i18n setup (`src/i18n/dictionaries/{en,pt}.ts`).

## Decisions made during brainstorming

- **Scope:** Homepage grid only. The footer's separate "Studios" (categories) and "Themes"
  lists are untouched - they already coexist correctly.
- **Stats/CTA:** The homepage stat "Curated collections" and the CTA line ("{count}
  miniatures across {collections} collections") currently count categories (4). These stay
  as-is, still counting categories - out of scope for this change. They are not visually
  paired with the grid; leaving them alone keeps this change small.
- **Visual treatment:** Reuse the exact same card layout, image treatment, and hover
  interaction currently used for the category grid - just swap the data source and link
  target. No new design work.
- **Process:** Small enough to skip the full plan/subagent execution flow; spec written for
  the record, then implemented directly in this session.

## Changes

### `src/app/page.tsx`

- Replace `const categories = getCategories(locale);` usage in the featured grid section with
  `const themes = getThemes(locale);` (categories import/usage elsewhere on the page, if any,
  stays - currently there is none besides this section and the stat, and the stat is staying
  on `getCategories`).
- Section heading text switches from `dict.home.shopByCategory` to `dict.home.shopByTheme`.
- Grid maps over `themes` instead of `categories`; each card's `href` becomes
  `/theme/${theme.slug}` instead of `/category/${category.slug}`. Card markup (image, gradient
  overlay, hover border, label, arrow) is unchanged - only the data source and href change.
- The section's `id="categories"` becomes `id="themes"`, and the hero button's
  `href="#categories"` (labeled "Explore Collections") becomes `href="#themes"` so the anchor
  still points at the right section.

### `src/i18n/dictionaries/en.ts`

- Rename `home.shopByCategory: "Shop by Category"` to `home.shopByTheme: "Shop By Theme"`.

### `src/i18n/dictionaries/pt.ts`

- Rename the matching key to `home.shopByTheme` with Portuguese (Portugal) copy: "Comprar por
  Tema".

No other new strings are needed: theme names/descriptions are already served pre-translated
by `getThemes(locale)` (via each theme's `translations.pt` in `data/themes.json`), the same
mechanism the footer's theme list already relies on.

## Testing

- Visual check in the browser (dev server): homepage renders 9 theme cards under "Shop By
  Theme", each links to its `/theme/[slug]` page and shows the right image/name.
- Switch language to Portuguese via the existing language switcher and confirm the heading
  reads "Comprar por Tema" and theme card names/descriptions are in Portuguese.
- Confirm the hero "Explore Collections" button still scrolls to the theme grid.
- `npm run build` (or equivalent typecheck) to confirm no leftover references to the removed
  `dict.home.shopByCategory` key.
