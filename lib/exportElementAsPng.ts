export async function exportElementAsPng(
  node: HTMLElement,
  opts?: {
    // Export scale factor (2-3 is usually crisp for social sharing).
    pixelRatio?: number;
    backgroundColor?: string | null;
  }
) {
  // Dynamic import avoids SSR/runtime issues with `document`/`window`.
  const { toPng } = await import("html-to-image");

  // Use the actual rendered card size, then upscale it.
  // This avoids black/empty areas when responsive max-width is applied.
  const rect = node.getBoundingClientRect();
  const sourceWidth = Math.max(1, Math.round(rect.width));
  const sourceHeight = Math.max(1, Math.round(rect.height));
  const exportScale = opts?.pixelRatio ?? 3;

  const dataUrl = await toPng(node, {
    cacheBust: true,
    // We already upscale via canvasWidth/canvasHeight, so keep pixelRatio at 1
    // to avoid double-scaling and oversized output files.
    pixelRatio: 1,
    canvasWidth: Math.max(1, Math.round(sourceWidth * exportScale)),
    canvasHeight: Math.max(1, Math.round(sourceHeight * exportScale)),
    backgroundColor: opts?.backgroundColor ?? undefined,
    skipAutoScale: true,
  });

  return dataUrlToBlob(dataUrl);
}

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
    // Give the browser a moment to start download.
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
}

export async function shareOrDownloadBlob(blob: Blob, filename: string) {
  // On modern mobile browsers (including iPhone Safari), Web Share opens
  // the native share sheet where users can save to Photos/Gallery.
  if (typeof navigator !== "undefined" && "share" in navigator && "canShare" in navigator) {
    try {
      const file = new File([blob], filename, { type: blob.type || "image/png" });
      const canShareFiles = (navigator as Navigator & {
        canShare?: (data?: ShareData) => boolean;
      }).canShare?.({ files: [file] });

      if (canShareFiles) {
        await navigator.share({
          files: [file],
          title: filename,
        });
        return "shared";
      }
    } catch {
      // Fallback to regular download if share is cancelled or unsupported.
    }
  }

  downloadBlob(blob, filename);
  return "downloaded";
}

