import type { ImageExportFormat } from "@/types/exportFormat";
import { extensionForImageFormat, mimeTypeForImageFormat } from "@/types/exportFormat";

type RenderOptions = {
  format: ImageExportFormat;
  /** Upscale from layout pixels for crisp text (2–3 typical). */
  pixelRatio?: number;
  /** Flatten transparent areas for JPEG/WebP; omit for template cards with opaque artwork. */
  backgroundColor?: string | null;
};

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",", 2);
  const mimeMatch = header.match(/data:(.*?);base64/);
  const mime = mimeMatch?.[1] ?? "image/png";

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mime });
}

function baseRenderOptions(node: HTMLElement, pixelRatio: number) {
  const rect = node.getBoundingClientRect();
  const sourceWidth = Math.max(1, Math.round(rect.width));
  const sourceHeight = Math.max(1, Math.round(rect.height));

  return {
    cacheBust: true,
    pixelRatio: 1,
    canvasWidth: Math.max(1, Math.round(sourceWidth * pixelRatio)),
    canvasHeight: Math.max(1, Math.round(sourceHeight * pixelRatio)),
    skipAutoScale: true,
  } as const;
}

export type RenderedCard = {
  blob: Blob;
  /** Actual format of `blob` (WebP may fall back to PNG if the browser cannot encode WebP). */
  effectiveFormat: ImageExportFormat;
};

/**
 * Rasterizes the live card DOM to a standard image blob (PNG / JPEG / WebP).
 * Uses html-to-image with explicit canvas dimensions so output matches on-screen layout.
 */
export async function renderCardToBlob(
  node: HTMLElement,
  options: RenderOptions
): Promise<RenderedCard> {
  const { toPng, toJpeg, toCanvas } = await import("html-to-image");
  const pixelRatio = options.pixelRatio ?? 3;
  const base = baseRenderOptions(node, pixelRatio);
  const bg =
    options.backgroundColor === null || options.backgroundColor === undefined
      ? undefined
      : options.backgroundColor;

  const common = { ...base, backgroundColor: bg };

  if (options.format === "png") {
    const dataUrl = await toPng(node, common);
    return { blob: dataUrlToBlob(dataUrl), effectiveFormat: "png" };
  }

  if (options.format === "jpeg") {
    const dataUrl = await toJpeg(node, {
      ...common,
      quality: 0.93,
    });
    return { blob: dataUrlToBlob(dataUrl), effectiveFormat: "jpeg" };
  }

  const canvas = await toCanvas(node, common);
  const webpBlob = await new Promise<Blob | null>((resolve) => {
    if (!canvas.toBlob) {
      resolve(null);
      return;
    }
    canvas.toBlob((b) => resolve(b), "image/webp", 0.92);
  });

  if (webpBlob && webpBlob.size > 0) {
    return { blob: webpBlob, effectiveFormat: "webp" };
  }

  const dataUrl = await toPng(node, common);
  return { blob: dataUrlToBlob(dataUrl), effectiveFormat: "png" };
}

export function buildCardFilename(
  employeeNameSlug: string,
  format: ImageExportFormat
): string {
  const ext = extensionForImageFormat(format);
  const safe = employeeNameSlug.trim() || "card";
  return `eid-al-adha-card-${safe}.${ext}`;
}

export function ensureBlobMime(blob: Blob, format: ImageExportFormat): Blob {
  const expected = mimeTypeForImageFormat(format);
  if (!blob.type || blob.type === "application/octet-stream") {
    return new Blob([blob], { type: expected });
  }
  return blob;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
}

export type DeliverCardResult = "downloaded" | "shared" | "opened-preview";

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iP(hone|ad|od)/.test(navigator.userAgent);
}

/**
 * Delivers the image in a way that works across desktop + mobile:
 * - Windows / Mac / Android: standard file download via an object URL.
 * - iOS: Web Share with the image file when available; otherwise open the image in a new tab
 *   so the user can long-press → Save to Photos.
 */
export async function deliverCardImage(
  blob: Blob,
  filename: string,
  format: ImageExportFormat
): Promise<DeliverCardResult> {
  const typedBlob = ensureBlobMime(blob, format);
  const mime = typedBlob.type || mimeTypeForImageFormat(format);
  const file = new File([typedBlob], filename, { type: mime });

  const nav = navigator as Navigator & {
    share?: (data: ShareData) => Promise<void>;
    canShare?: (data?: ShareData) => boolean;
  };

  if (isIOS()) {
    if (nav.share && nav.canShare?.({ files: [file] })) {
      try {
        await nav.share({
          files: [file],
          title: filename,
        });
        return "shared";
      } catch (err) {
        const name = err instanceof DOMException ? err.name : (err as Error)?.name;
        if (name === "AbortError") {
          return "downloaded";
        }
      }
    }
    return openBlobPreviewTab(typedBlob) ? "opened-preview" : "downloaded";
  }

  try {
    downloadBlob(typedBlob, filename);
  } catch {
    return openBlobPreviewTab(typedBlob) ? "opened-preview" : "downloaded";
  }

  return "downloaded";
}

export function openBlobPreviewTab(blob: Blob): boolean {
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) {
    URL.revokeObjectURL(url);
    return false;
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 180_000);
  return true;
}
