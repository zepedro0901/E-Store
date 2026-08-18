# Design: Portuguese/English Localization - Phase 1 (i18n Infrastructure + UI Translation)

## Context

The site (Pangolin Resinworks, Next.js 16 App Router) is currently English-only, not yet
launched. The request is to support Portuguese (Portugal) and English, with Portuguese as
the default, and a user-facing language switcher.

The product catalog (`data/products.json`) has ~2,308 products with English names,
descriptions, and tags (~660K characters of description text, ~14K tags). Translating that
content is a large, separate batch-generation effort and is explicitly **out of scope** for
this phase - it's tracked as Phase 2. This spec covers only the i18n plumbing and translating
the site's own UI copy (nav, buttons, forms, labels, etc.), plus preparing the data model so
Phase 2 can slot in without another migration.

## Decisions made during brainstorming

- **Translation scope (this phase):** UI chrome only. Product name/description/tags stay
  English until Phase 2. The internal order-notification email (sent to the store owner, not
  the customer) is not localized - it's not customer-facing.
- **Routing:** No URL prefixes. Same URLs (`/products`, `/cart`, etc.) in both languages -
  the site isn't live yet but decomposing every route under `app/[lang]/...` was judged more
  restructuring than this store needs right now. Locale is tracked with a cookie instead.
- **Default language:** Portuguese (Portugal), always - no `Accept-Language`
  browser-based auto-detection. A first-time visitor sees PT regardless of browser settings.
- **Switcher UI:** Text toggle in the header - `PT | EN`, current language bolded/highlighted,
  click the other to switch.

## Architecture

### New module: `src/i18n/`

- `locales.ts` - `type Locale = "pt" | "en"`, `defaultLocale: Locale = "pt"`,
  `locales: Locale[] = ["pt", "en"]`.
- `dictionaries/pt.ts`, `dictionaries/en.ts` - plain nested TS objects (not JSON, so they're
  type-checked against each other), one namespace per UI area: `common`, `header`, `footer`,
  `product`, `cart`, `checkout`, `thankYou`. Real Portuguese (Portugal) copy, not
  machine-placeholder text.
- `get-locale.ts` - server-only. Reads the `locale` cookie via `next/headers`'s `cookies()`;
  returns `defaultLocale` if the cookie is missing or holds a value outside `locales`.
- `get-dictionary.ts` - `getDictionary(locale: Locale)` returns the matching dictionary object.
- `LocaleProvider.tsx` - Client Component. React Context provider taking `locale` and `dict`
  as props (supplied by the server) and exposing them to descendants.
- `use-translations.ts` - `useTranslations()` client hook reading off `LocaleProvider`'s
  context. Used by Client Components that need translated strings.

### Wiring

- `RootLayout` (`src/app/layout.tsx`, a Server Component) calls `getLocale()` then
  `getDictionary(locale)` once, sets `<html lang={locale}>`, and wraps `{children}` in
  `<LocaleProvider locale={locale} dict={dict}>`.
- Server Components (pages, `SiteFooter`, etc.) read strings directly from a dictionary
  obtained via `getLocale()` + `getDictionary()` (no context needed server-side).
- Client Components (`CheckoutForm`, `CartView`, `AddToCartButton`, `ProductOptions`,
  `FilterBar`, the new `LanguageSwitcher`, etc.) call `useTranslations()` instead of having
  strings passed down prop-by-prop.
- Pages with static `export const metadata` whose title text needs translating (e.g.
  `checkout/thank-you`) convert to `generateMetadata()`, which can call `cookies()` and is
  therefore locale-aware. This opts those routes out of static rendering, which is an
  acceptable tradeoff at this site's scale.

### Switching language

- `LanguageSwitcher` (Client Component, rendered in `SiteHeader`) renders the `PT | EN` toggle.
- Clicking the inactive language calls a Server Action (e.g. `setLocale(locale: Locale)`) that
  sets the `locale` cookie (`httpOnly: false` isn't required since only the server ever reads
  it for rendering; a standard secure cookie is fine, `sameSite: "lax"`, no expiry needed
  beyond a long-lived persistent cookie e.g. 1 year).
- After the action resolves, the client calls `router.refresh()`, which re-runs the Server
  Component tree (including `RootLayout`) against the new cookie value, updating every
  server-rendered string and the `LocaleProvider` props in one pass. Cart contents
  (Zustand, client-only state) are untouched by the refresh.

### Formatting

- `formatPrice(cents, currency, locale)` gains a `locale` parameter: `"pt-PT"` for Portuguese
  (e.g. `300,00 €`), `"en-US"` for English (current behavior e.g. `€300.00`). Currency stays
  EUR in both cases - only the number/symbol formatting changes.

### Data model prep for Phase 2

- `Product` (in `src/types/product.ts`) gains an optional field:
  ```ts
  translations?: {
    pt?: {
      name?: string;
      description?: string;
      tags?: string[];
    };
  };
  ```
- `Category` and `Theme` get the same optional `translations?: { pt?: { name?: string } }` shape
  (there are only 4 categories and 9 themes - small enough to hand-translate directly as part
  of this phase rather than deferring, but the field is still typed as optional/overlay so the
  mechanism matches products).
- `localizeProduct(product, locale)` (new helper in `src/lib/products.ts`) returns the product
  with `name`/`description`/`tags` overlaid from `translations.pt` when `locale === "pt"` and
  a translation exists, otherwise falls back to the base English fields. All product-reading
  call sites (`getAllProducts`, `getProductBySlug`, `listProducts`, etc.) route through this
  so Phase 2 only has to populate the `translations` data - no further code changes.
- Phase 1 ships this wired up but with `translations` empty/absent everywhere, so Portuguese
  visitors currently see English product names/descriptions - everything else on the page
  (nav, labels, buttons, cart, checkout) is Portuguese. This is expected and accepted for this
  phase.

## Out of scope (Phase 2)

Generating and reviewing actual Portuguese product catalog text (names/descriptions/tags for
~2,308 products) - a separate spec, separate batch-generation/review workflow, likely
following a pattern similar to the existing MMF import/review methods already used for this
catalog.

## Testing

Manual browser verification (no automated test suite exists for this project currently):

1. Fresh visit (no cookie) renders in Portuguese by default.
2. Toggling to English and back updates every page correctly: home, product listing, product
   detail, cart, checkout, thank-you.
3. Language choice persists across navigation and full page reload.
4. `<html lang>` matches the active locale.
5. Price formatting differs correctly between `pt-PT` and `en-US` display.
