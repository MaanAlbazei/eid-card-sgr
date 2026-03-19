import { brandConfig } from "@/config/brand.config";
import type { Lang } from "@/types/lang";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getUi } from "@/config/translations";

export default function Navbar({
  lang,
  onLangChange,
}: {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}) {
  const ui = getUi(lang);
  const companyName = brandConfig.companyName[lang];

  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div
              className="flex h-10 items-center justify-center rounded-2xl bg-white/85 px-3 ring-1 ring-[var(--primary)]/25 shadow-sm"
            aria-hidden="true"
          >
            <img
              src={brandConfig.logoPath}
              alt="Saudi Gold Refinery logo"
                className="h-[22px] w-auto max-w-[140px] object-contain"
                draggable={false}
            />
          </div>
          <div className="leading-tight">
            <div className="text-base font-extrabold text-[var(--foreground)] tracking-[-0.01em]">
              {companyName}
            </div>
            <div className="mt-0.5 inline-flex items-center rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[11px] font-bold text-[var(--primaryDeep)]">
              {ui.navbar.brandTagline}
            </div>
          </div>
        </div>

        <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
      </div>
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <div className="h-px w-full bg-gradient-to-r from-black/0 via-black/10 to-black/0" />
      </div>

      <div className="sr-only" aria-live="polite">
        {ui.title}
      </div>
    </header>
  );
}

