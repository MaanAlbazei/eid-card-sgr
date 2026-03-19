import type { Lang } from "@/types/lang";
import { getUi } from "@/config/translations";

export default function LanguageSwitcher({
  lang,
  onLangChange,
}: {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}) {
  const ui = getUi(lang);

  const options: Array<{ value: Lang; label: string }> = [
    { value: "ar", label: "العربية" },
    { value: "en", label: "English" },
  ];

  return (
    <div className="flex items-center gap-3" dir={lang === "ar" ? "rtl" : "ltr"}>
      <span className="text-sm font-semibold text-[var(--muted)]">{ui.navbar.language}</span>
      <div
        role="tablist"
        aria-label={ui.navbar.language}
        className="inline-flex rounded-full border border-black/10 bg-white/70 p-1 shadow-sm"
      >
        {options.map((opt) => {
          const selected = opt.value === lang;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={selected}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                selected
                  ? "bg-[var(--primary)] text-white"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--foreground)]",
              ].join(" ")}
              onClick={() => onLangChange(opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

