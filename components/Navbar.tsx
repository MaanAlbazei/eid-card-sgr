"use client";

import { brandConfig } from "@/config/brand.config";
import type { Lang } from "@/types/lang";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getUi } from "@/config/translations";
import { BrandLogoPanel } from "@/components/BrandLogo";

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
        <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
          <BrandLogoPanel variant="navbar" decorative />
          <div className="min-w-0 leading-tight">
            <div className="text-base font-extrabold tracking-[-0.01em] text-[var(--foreground)]">
              {companyName}
            </div>
            <div className="mt-0.5 inline-flex max-w-full items-center rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[11px] font-bold text-[var(--primaryDeep)]">
              {ui.navbar.brandTagline}
            </div>
          </div>
        </div>

        <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
      </div>
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <div className="h-px w-full bg-gradient-to-r from-black/0 via-black/10 to-black/0" />
      </div>
    </header>
  );
}

