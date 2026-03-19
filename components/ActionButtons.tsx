import type { Lang } from "@/types/lang";
import { getUi } from "@/config/translations";

export default function ActionButtons({
  lang,
  onDownload,
  onReset,
  isDownloading,
}: {
  lang: Lang;
  onDownload: () => void;
  onReset: () => void;
  isDownloading: boolean;
}) {
  const ui = getUi(lang);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <button
        type="button"
        onClick={onDownload}
        disabled={isDownloading}
        className={[
          "flex-1 rounded-2xl bg-[var(--primary)] px-5 py-3 text-center text-sm font-extrabold text-white shadow-sm transition",
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
          ui.buttons.download
        )}
      </button>

      <button
        type="button"
        onClick={onReset}
        disabled={isDownloading}
        className={[
          "flex-1 rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-center text-sm font-bold text-[var(--foreground)] shadow-sm transition",
          "hover:bg-white disabled:cursor-not-allowed disabled:opacity-70",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        ].join(" ")}
      >
        {ui.buttons.reset}
      </button>
    </div>
  );
}

