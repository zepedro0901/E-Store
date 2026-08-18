// One-off: classify all products into themes (keyword match on name+description+tags)
// and write themes.json + a `themes` field onto each product.
const fs = require("fs");
const path = require("path");

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");
const THEMES_PATH = path.join(__dirname, "..", "data", "themes.json");

// Supplier-scraped tags are frequently collection/set names ("clash-of-the-dragons",
// "drow-of-the-deep", "Dungeons and Dragons") or generic compatibility flags rather
// than descriptions of the specific product. A tag only counts as classification
// evidence when it's a single bare word/phrase-free token - multi-word or hyphenated
// tags are set names and get ignored here (name+description prose is unaffected).
function isPhraseTag(tag) {
  return tag.split(/[^a-zA-Z0-9]+/).filter(Boolean).length > 1;
}

// yks-miniatures descriptions almost universally close with a generic marketing line
// ("X for use in any epic dungeon adventure!") that has nothing to do with the specific
// product - it appears verbatim on Lich, Owlbear, Beholder, etc. just as often as on
// actual terrain pieces. Left in place, its stray "dungeon" pulls ~163 of 231 products
// into Terrain & Scenery even though most of them are creatures. Strip it before matching.
const BOILERPLATE_PATTERNS = [/\bfor use in any epic(?: dungeon)?(?: adventure)?!?/gi];

function stripBoilerplate(text) {
  let cleaned = text;
  for (const p of BOILERPLATE_PATTERNS) cleaned = cleaned.replace(p, "");
  return cleaned;
}

// Exact-tag classifiers that are known to be unreliable on their own (they're applied
// as generic marketing/compatibility flags across a whole supplier catalog rather than
// describing the individual product) - only trusted when corroborated by name/description.
const UNRELIABLE_BARE_TAGS = {
  dragons: new Set(["dragons"]), // "D&D compatible" flag on rescale-miniatures, not "this is a dragon"
};

// Products whose name/description mentions a theme keyword only in passing (a dragon
// hunter, a kobold that worships a dragon, dragon-lore flavor text on a terrain piece)
// without the product itself belonging to that theme. Verified by hand - not derivable
// from tags/regex alone.
const THEME_EXCLUDE_IDS = {
  dragons: new Set([
    "mmf-390873", // Xu Quin, Dragon Punch (Human Monk) - human monk, not a dragon
    "mmf-377825", // Cheng Pei, Downward Dragon Champion - human monk, kung-fu move name
    "mmf-377826", // Xu Quin, Skyward Dragon Champion - human monk, kung-fu move name
    "mmf-532211", // Manticore (flesh-of-gods) - manticore, mistagged "Drake"
    "dmstash-32472", // Olamize Tartt – Hunter of Dragons - hunts dragons, isn't one
    "dmstash-41028", // Green Kobolds of Midorius - kobolds who worship a dragon
    "dmstash-7187", // Krimmdar – Knight-Faith - dragonborn knight, renounced draconic worship
    "dmstash-27743", // Aurestia – Human Form - human form of a dragon character
    "dmstash-32482", // Terrain – Bones of Cazarion - dragon-lore terrain, not a creature
  ]),
};

const THEMES = [
  {
    slug: "dragons",
    name: "Dragons",
    description: "Dragons, wyrms, drakes, wyverns and other dragon related creatures",
    pattern: /\b(dragon|dragons|wyrm|drake|wyvern)\b/i,
  },
  {
    slug: "humanoids",
    name: "Humanoids",
    description: "Adventurers and NPCs across all the classic fantasy races.",
    pattern: /\b(human|elf|elves|dwarf|dwarves|orc|orcs|tiefling|drow|goliath|dragonfolk|beastfolk|gnome|halfling|half-elf|dragonborn)\b/i,
  },
  {
    slug: "monsters-beasts",
    name: "Monsters & Beasts",
    description: "Monstrosities, beasts, and giants.",
    pattern: /\b(monster|monstrosity|beast|creature|giant|ooze|chimera)\b/i,
  },
  {
    slug: "undead",
    name: "Undead",
    description: "Zombies, skeletons, vampires, and other things that shouldn't move.",
    pattern: /\b(undead|zombie|skeleton|ghost|wraith|vampire|lich|spirit|ghoul)\b/i,
  },
  {
    slug: "demons-fiends",
    name: "Demons & Fiends",
    description: "Devils, demons, and other hellish threats.",
    pattern: /\b(demon|fiend|devil|abyssal|cultist)\b/i,
  },
  {
    slug: "celestials",
    name: "Celestials",
    description: "Angels and other divine beings.",
    pattern: /\b(angel|celestial)\b/i,
  },
  {
    slug: "constructs",
    name: "Constructs",
    description: "Golems, warforged, and other animated constructs.",
    pattern: /\b(construct|golem|warforged|automaton)\b/i,
  },
  {
    slug: "terrain-scenery",
    name: "Terrain & Scenery",
    description: "Dungeon terrain, ruins, and scenery pieces.",
    // scatter/prop/topper cover the yks-miniatures basing-accessory line, which has no
    // other distinguishing keyword once the generic "epic dungeon adventure!" marketing
    // boilerplate is stripped out below.
    pattern: /\b(terrain|dungeon|ruins|scatter|props?|toppers?)\b/i,
  },
  {
    slug: "busts",
    name: "Busts",
    description: "Display busts.",
    pattern: /\bbust\b/i,
  },
];

const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"));
const existingThemes = JSON.parse(fs.readFileSync(THEMES_PATH, "utf8"));
const existingTranslations = {};
for (const t of existingThemes) if (t.translations) existingTranslations[t.slug] = t.translations;

function themeMatches(theme, product) {
  const excluded = THEME_EXCLUDE_IDS[theme.slug];
  if (excluded && excluded.has(product.id)) return false;

  if (theme.pattern.test(product.name) || theme.pattern.test(stripBoilerplate(product.description))) return true;

  const unreliable = UNRELIABLE_BARE_TAGS[theme.slug] || new Set();
  return (product.tags || []).some((tag) => {
    if (isPhraseTag(tag)) return false;
    if (unreliable.has(tag.toLowerCase())) return false;
    return theme.pattern.test(tag);
  });
}

const firstImageForTheme = {};
for (const p of products) {
  const matched = THEMES.filter((t) => themeMatches(t, p)).map((t) => t.slug);
  p.themes = matched;
  for (const slug of matched) {
    if (!firstImageForTheme[slug] && p.images[0]) firstImageForTheme[slug] = p.images[0];
  }
}

fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2) + "\n");

const themesOut = THEMES.map((t) => ({
  slug: t.slug,
  name: t.name,
  description: t.description,
  image: firstImageForTheme[t.slug] || "",
  ...(existingTranslations[t.slug] ? { translations: existingTranslations[t.slug] } : {}),
}));
fs.writeFileSync(THEMES_PATH, JSON.stringify(themesOut, null, 2) + "\n");

const counts = {};
for (const t of THEMES) counts[t.name] = products.filter((p) => p.themes.includes(t.slug)).length;
console.log(counts);
console.log("no theme:", products.filter((p) => p.themes.length === 0).length);
