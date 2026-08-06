// One-off: classify all products into themes (keyword match on name+description+tags)
// and write themes.json + a `themes` field onto each product.
const fs = require("fs");
const path = require("path");

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");
const THEMES_PATH = path.join(__dirname, "..", "data", "themes.json");

const THEMES = [
  {
    slug: "dragons",
    name: "Dragons",
    description: "Dragons, wyrms, drakes, and wyverns.",
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
    pattern: /\b(terrain|dungeon|ruins)\b/i,
  },
  {
    slug: "busts",
    name: "Busts",
    description: "Display busts.",
    pattern: /\bbust\b/i,
  },
];

const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"));

const firstImageForTheme = {};
for (const p of products) {
  const haystack = [p.name, p.description, ...(p.tags || [])].join(" ");
  const matched = THEMES.filter((t) => t.pattern.test(haystack)).map((t) => t.slug);
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
}));
fs.writeFileSync(THEMES_PATH, JSON.stringify(themesOut, null, 2) + "\n");

const counts = {};
for (const t of THEMES) counts[t.name] = products.filter((p) => p.themes.includes(t.slug)).length;
console.log(counts);
console.log("no theme:", products.filter((p) => p.themes.length === 0).length);
