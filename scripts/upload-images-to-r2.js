// One-off migration: upload public/images/collection-*/** to Cloudflare R2.
// Requires R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in .env.local.
const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) process.env[match[1]] = match[2].trim();
  }
}
loadEnvLocal();

const { R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
if (!R2_ACCOUNT_ID || !R2_BUCKET_NAME || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error("Missing R2_* env vars in .env.local");
  process.exit(1);
}

const IMAGES_ROOT = path.join(__dirname, "..", "public", "images");
const SOURCE_DIRS = ["collection-1", "collection-2", "collection-3", "collection-4"];

const CONTENT_TYPES = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

async function uploadFile(filePath) {
  const key = path
    .relative(IMAGES_ROOT, filePath)
    .split(path.sep)
    .join("/");
  const ext = path.extname(filePath).toLowerCase();
  const body = fs.readFileSync(filePath);
  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: CONTENT_TYPES[ext] || "application/octet-stream",
    }),
  );
  return key;
}

async function runPool(items, concurrency, fn) {
  let i = 0;
  let done = 0;
  let failed = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      try {
        await fn(items[idx]);
      } catch (err) {
        failed++;
        console.error(`FAILED: ${items[idx]} -- ${err.message}`);
      }
      done++;
      if (done % 250 === 0 || done === items.length) {
        console.log(`${done}/${items.length} (${failed} failed)`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return failed;
}

async function main() {
  const files = SOURCE_DIRS.flatMap((d) => walk(path.join(IMAGES_ROOT, d)));
  console.log(`Uploading ${files.length} files to bucket "${R2_BUCKET_NAME}"...`);
  const failed = await runPool(files, 24, uploadFile);
  console.log(failed === 0 ? "Done, no failures." : `Done, ${failed} failures -- re-run to retry (safe, overwrites by key).`);
}

main();
