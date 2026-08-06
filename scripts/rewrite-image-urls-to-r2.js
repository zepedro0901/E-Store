// One-off migration: rewrite /images/collection-N/... paths in data/*.json to R2 URLs.
const fs = require("fs");
const path = require("path");

const R2_PUBLIC_URL = "https://pub-346443e037884128baef7c2a9dc3e366.r2.dev";
const PREFIX = "/images/";

function toR2(p) {
  if (typeof p !== "string" || !p.startsWith(PREFIX)) return p;
  return `${R2_PUBLIC_URL}/${p.slice(PREFIX.length)}`;
}

function rewriteProducts() {
  const file = path.join(__dirname, "..", "data", "products.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  let changed = 0;
  for (const p of data) {
    p.images = p.images.map((img) => {
      const out = toR2(img);
      if (out !== img) changed++;
      return out;
    });
    if (Array.isArray(p.variations)) {
      for (const v of p.variations) {
        if (v.image) {
          const out = toR2(v.image);
          if (out !== v.image) changed++;
          v.image = out;
        }
      }
    }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`products.json: rewrote ${changed} paths`);
}

function rewriteCategories() {
  const file = path.join(__dirname, "..", "data", "categories.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  let changed = 0;
  for (const c of data) {
    const out = toR2(c.image);
    if (out !== c.image) changed++;
    c.image = out;
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`categories.json: rewrote ${changed} paths`);
}

rewriteProducts();
rewriteCategories();
