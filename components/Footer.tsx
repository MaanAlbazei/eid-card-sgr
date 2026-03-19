import type { Lang } from "@/types/lang";
import { brandConfig } from "@/config/brand.config";

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="w-full py-10">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <div className="h-px w-full bg-gradient-to-r from-black/0 via-black/10 to-black/0" />
        <p className="mt-4 text-center text-sm font-semibold text-[var(--muted)]">
          {brandConfig.footerText[lang]}
        </p>
      </div>
    </footer>
  );
}

