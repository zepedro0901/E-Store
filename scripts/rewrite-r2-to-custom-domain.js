// One-off migration: point image URLs at the R2 custom domain instead of the dev-only pub-*.r2.dev URL.
const fs = require("fs");
const path = require("path");

const OLD = "https://pub-346443e037884128baef7c2a9dc3e366.r2.dev";
const NEW = "https://images.pangolinresinworks.com";

function rewriteFile(relPath) {
  const file = path.join(__dirname, "..", relPath);
  const raw = fs.readFileSync(file, "utf8");
  const changed = (raw.match(new RegExp(OLD.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  const out = raw.split(OLD).join(NEW);
  fs.writeFileSync(file, out);
  console.log(`${relPath}: rewrote ${changed} occurrences`);
}

rewriteFile("data/products.json");
rewriteFile("data/categories.json");
rewriteFile("data/themes.json");
