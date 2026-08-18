# Design: Portuguese/English Localization - Phase 2 (Catalog Translation)

## Context

Phase 1 (`docs/superpowers/specs/2026-08-12-i18n-pt-en-design.md`) shipped the i18n
infrastructure and translated all site UI copy. Product `name`, `description`, and `tags`
were left in English pending this phase. The `Product` type already carries an optional
`translations.pt.{name,description,tags}` overlay (from Phase 1), and `localizeProduct()`
already applies it when the visitor's locale is `pt`. This phase populates that data for all
2,308 products.

## Decisions made during brainstorming

- **Names are translated**, not left in English - but with a rule for telling proper/invented
  names apart from descriptive titles (see below).
- **Descriptions and tags are translated** in full.
- **Search must still work across languages**: a Portuguese-locale visitor typing an English
  term (or vice versa) must still find the product. This requires a code change (see
  "Search fix" below) - translating display text must not break search.

## Name translation rule

Product names in this catalog follow a few recurring shapes:

1. **Proper/invented name + title**, joined by a comma or dash - e.g. `"Pentalia - Mother of
   all Dragons"`, `"Aethra, Voidcaller Druid"`. Keep the proper-name component exactly as-is
   (it's an invented character name, not an English word); translate the title/epithet
   component. Example: `"Pentalia - Mother of all Dragons"` → `"Pentalia - Mãe de todos os
   Dragões"`.
2. **Fully generic/descriptive name**, no proper-noun component - e.g. `"Abyssal Claw"`,
   `"Vampire Warrior"`. Translate the whole name. Example: `"Abyssal Claw"` → `"Garra
   Abissal"`.
3. **Single invented name with no separable title** - e.g. `"Aboleth"` used as a name rather
   than a species descriptor. Leave as-is; there's nothing to translate.

This is a per-product judgment call, not a mechanical rule - the translator (me, or a
subagent following this same spec) decides which shape a given name matches.

## Search fix

`listProducts()` currently searches the already-localized product list, so once `name`/
`description`/`tags` are overlaid with Portuguese text, English search terms would stop
matching for `pt` visitors (and Portuguese terms wouldn't match for `en` visitors browsing
English but searching in Portuguese). Fix: search matches against **both** the English base
fields and the `translations.pt` fields regardless of active locale, then the matched results
are localized for display as before.

## Style guide

Applies to every batch, including subagent-run batches, so tone stays consistent:

- European Portuguese (Portugal) - not Brazilian. Avoid Brazilian-specific vocabulary and
  gerund-heavy phrasing.
- Keep invented character names and unique epithets untranslated (e.g. `Aethra`, `Pentalia`,
  `Xu Quin`).
- Translate descriptive titles/epithets attached to a proper name (rule 1 above).
- Translate fully generic/descriptive names (rule 2 above).
- For fantasy/D&D species terms, use the established Portuguese tabletop-gaming term where one
  is standard (`Dragão`, `Zumbi`, `Esqueleto`, `Golem`, …). If no natural PT equivalent exists,
  or the English term is what the PT tabletop community actually uses, keep it in English.
- Tags: translate to natural Portuguese equivalents; keep proper nouns (`Cthulhu`, `Lovecraft`)
  as-is.
- Descriptions: faithful localization, not reinvention - same meaning, length, and tone as the
  English source (matches the register already established in the Phase 1 UI copy).
- Scale, material, price, images, ids, slugs - untouched, out of scope.

## Execution plan

1. **Pilot** (this pass): hand-translate a diverse ~20-product sample directly - spread across
   all 4 studios and covering each name shape above. Written into `data/products.json` and
   shown to the user for review before the full run.
2. **Full batch** (after pilot approval): dispatch parallel subagents, each given a chunk of
   ~150–200 products (slug + English name/description/tags) plus this style guide and a few
   pilot examples as reference. Each subagent returns a JSON mapping of
   `slug → {name, description, tags}`. Chunk outputs are merged into `data/products.json` in
   one deterministic pass afterward (no concurrent writes to the file), then every product is
   checked to confirm it received a translation.
3. Ship the search fix as part of this same phase (untranslated products still fall back to
   English display via the existing Phase 1 fallback, so partial coverage degrades gracefully
   if any individual translation is missing).

## Testing

- Pilot reviewed by the user before the full run proceeds.
- After the full run: verify every product has a `translations.pt` entry (or confirm which
  ones don't and why), spot-check a sample in the browser across all 4 studios, verify search
  works for both English and Portuguese terms in both locales.
