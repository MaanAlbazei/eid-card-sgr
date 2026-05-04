export type ImageExportFormat = "png" | "jpeg" | "webp";

export const IMAGE_EXPORT_FORMATS: readonly ImageExportFormat[] = ["png", "jpeg", "webp"];

export function extensionForImageFormat(format: ImageExportFormat): string {
  if (format === "jpeg") return "jpg";
  return format;
}

export function mimeTypeForImageFormat(format: ImageExportFormat): string {
  switch (format) {
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    default:
      return "image/png";
  }
}
