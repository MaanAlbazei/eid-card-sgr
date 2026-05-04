"use client";

import type { Lang } from "@/types/lang";
import type { ImageExportFormat } from "@/types/exportFormat";
import { getUi } from "@/config/translations";

export default function CardExportSection({
  lang,
  exportFormat,
  onExportFormatChange,
  onDownload,
  onOpenImageTab,
  isDownloading,
  showOpenImageTab,
}: {
  lang: Lang;
  exportFormat: ImageExportFormat;
  onExportFormatChange: (format: ImageExportFormat) => void;
  onDownload: () => void;
  onOpenImageTab: () => void;
  isDownloading: boolean;
  showOpenImageTab: boolean;
}) {
  const ui = getUi(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="space-y-3 rounded-2xl border border-black/8 bg-white/55 p-4 ring-1 ring-black/[0.03]"
    >
      <div className="space-y-1.5">
        <label
          className="block text-sm font-bold text-[var(--foreground)]"
          htmlFor="export-format"
        >
          {ui.export.formatLabel}
        </label>
        <select
          id="export-format"
          value={exportFormat}
          disabled={isDownloading}
          onChange={(e) => onExportFormatChange(e.target.value as ImageExportFormat)}
          className={[
            "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm",
            "outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-60",
          ].join(" ")}
        >
          <option value="png">{ui.export.formatPng}</option>
          <option value="jpeg">{ui.export.formatJpeg}</option>
          <option value="webp">{ui.export.formatWebp}</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onDownload}
        disabled={isDownloading}
        className={[
          "w-full rounded-2xl bg-[var(--primary)] px-5 py-3 text-center text-sm font-extrabold text-white shadow-sm transition",
          "hover:brightness-95 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-70",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        ].join(" ")}
      >
        {isDownloading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-white"
            />
            {ui.buttons.downloading}
          </span>
        ) : (
          ui.buttons.downloadCard
        )}
      </button>

      <p className="text-xs font-semibold leading-relaxed text-[var(--muted)] xl:hidden">
        {ui.export.helperMobile}
      </p>

      {showOpenImageTab ? (
        <button
          type="button"
          onClick={onOpenImageTab}
          disabled={isDownloading}
          className={[
            "w-full rounded-xl border border-black/12 bg-white/80 px-3 py-2.5 text-center text-xs font-bold text-[var(--foreground)] transition xl:hidden",
            "hover:bg-white disabled:cursor-not-allowed disabled:opacity-60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
          ].join(" ")}
        >
          {ui.export.openImageTab}
        </button>
      ) : null}
    </div>
  );
}
