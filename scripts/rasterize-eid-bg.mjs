import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public", "assets", "eid-al-adha-background.svg");
const outPath = join(root, "public", "assets", "eid-al-adha-background.png");

const svg = readFileSync(svgPath);
await sharp(svg)
  .resize(2048, 3072, { fit: "fill", kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9 })
  .toFile(outPath);

const meta = await sharp(outPath).metadata();
console.log("Wrote", outPath, `${meta.width}x${meta.height}`);
