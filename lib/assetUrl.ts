/**
 * Must match `basePath` in `next.config.ts` (set via `NEXT_PUBLIC_BASE_PATH` at build time).
 * Empty = assets load from site root (e.g. Vercel). Non-empty = subpath deploy (e.g. GitHub Pages).
 */
function productionAssetBase(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH;
  if (!raw || raw === "/") return "";
  const p = raw.startsWith("/") ? raw : `/${raw}`;
  return p.replace(/\/$/, "");
}

export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (process.env.NODE_ENV !== "production") return normalized;
  const base = productionAssetBase();
  return `${base}${normalized}`;
}
