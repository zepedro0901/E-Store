// Converts the free-text `scale` field (raw sculpt/print measurements like
// "32 mm" or "75mm") into base-size categories (Tiny/Small/Medium/Large/
// Huge/Gargantuan). Values already using a category word are re-cased and
// left in place. Multi-value scales ("32mm and 75mm", "Large, Medium") are
// mapped per-token, deduped, and re-ordered small-to-large.
//
// mm -> category thresholds follow the standard tabletop base-size
// convention (round up to the nearest common base diameter):
//   <=20mm Tiny, <=27mm Small, <=32mm Medium, <=55mm Large, <=80mm Huge, else Gargantuan
const fs = require("fs");
const path = require("path");

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");

const CATEGORY_ORDER = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
const CATEGORY_BY_LOWER = new Map(CATEGORY_ORDER.map((c) => [c.toLowerCase(), c]));

function mmToCategory(mm) {
  if (mm <= 20) return "Tiny";
  if (mm <= 27) return "Small";
  if (mm <= 32) return "Medium";
  if (mm <= 55) return "Large";
  if (mm <= 80) return "Huge";
  return "Gargantuan";
}

function normalizeScale(raw) {
  const trimmed = (raw || "").trim();
  if (!trimmed) return trimmed;
  if (trimmed.toLowerCase() === "unknown") return "Unknown";

  const tokens = trimmed
    .split(/\s*,\s*|\s+and\s+/i)
    .map((t) => t.trim())
    .filter(Boolean);

  const categories = new Set();
  const unparsed = [];
  for (const token of tokens) {
    const asCategory = CATEGORY_BY_LOWER.get(token.toLowerCase());
    if (asCategory) {
      categories.add(asCategory);
      continue;
    }
    const match = token.match(/(\d+(?:\.\d+)?)\s*mm/i);
    if (match) {
      categories.add(mmToCategory(parseFloat(match[1])));
    } else {
      unparsed.push(token);
    }
  }

  if (categories.size === 0) return trimmed; // nothing recognized - leave untouched

  const ordered = CATEGORY_ORDER.filter((c) => categories.has(c));
  return [...ordered, ...unparsed].join(", ");
}

function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"));

  const before = new Map();
  const after = new Map();
  for (const p of products) {
    before.set(p.scale, (before.get(p.scale) || 0) + 1);
    const next = normalizeScale(p.scale);
    after.set(next, (after.get(next) || 0) + 1);
    p.scale = next;
  }

  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2) + "\n");

  console.log(`Normalized scale on ${products.length} products.`);
  console.log("\nBefore:");
  for (const [k, v] of [...before.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${v.toString().padStart(4)}  ${JSON.stringify(k)}`);
  }
  console.log("\nAfter:");
  for (const [k, v] of [...after.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${v.toString().padStart(4)}  ${JSON.stringify(k)}`);
  }
}

main();
