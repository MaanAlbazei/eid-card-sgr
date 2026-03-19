export function sanitizeForFilename(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return "employee";

  // Keep it filesystem-friendly (especially important for Arabic names).
  // We intentionally collapse non-alphanumerics to `-`.
  const normalized = trimmed
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "employee";
}

