import type { NextConfig } from "next";

/** Set at build time, e.g. `/eid-card-sgr` for GitHub Pages. Leave unset for Vercel (site at domain root). */
function normalizeBasePath(raw: string | undefined): string {
  if (!raw || raw === "/") return "";
  const p = raw.startsWith("/") ? raw : `/${raw}`;
  return p.replace(/\/$/, "");
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;