import type { Lang } from "@/types/lang";
import { getUi } from "@/config/translations";

export default function ActionButtons({
  lang,
  onReset,
  disabled,
}: {
  lang: Lang;
  onReset: () => void;
  disabled?: boolean;
}) {
  const ui = getUi(lang);

  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      className={[
        "w-full rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-center text-sm font-bold text-[var(--foreground)] shadow-sm transition sm:w-auto sm:min-w-[140px]",
        "hover:bg-white disabled:cursor-not-allowed disabled:opacity-70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
      ].join(" ")}
    >
      {ui.buttons.reset}
    </button>
  );
}
