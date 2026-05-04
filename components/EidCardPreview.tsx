import { forwardRef } from "react";
import type { ForwardedRef } from "react";
import type { Lang } from "@/types/lang";
import { brandConfig } from "@/config/brand.config";
import { assetUrl } from "@/lib/assetUrl";

/**
 * Template: dark portrait card with baked-in branding (top) and themed illustration at bottom.
 * Overlay name + greeting in the dark middle only — above Kaaba/sheep — light text for contrast.
 */

export type EidCardPreviewProps = {
  lang: Lang;
  employeeName: string;
  greetingMessage: string;
};

function EidCardPreviewBase(
  { lang, employeeName, greetingMessage }: EidCardPreviewProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const fontClass = isAr ? "font-ar" : "font-en";

  return (
    <div
      ref={ref}
      dir={dir}
      lang={lang}
      className={[
        fontClass,
        "relative w-full max-w-[420px]",
        "overflow-hidden rounded-none border border-black/10",
        "shadow-[0_26px_60px_-36px_rgba(0,0,0,0.35)]",
      ].join(" ")}
      style={{ aspectRatio: String(brandConfig.eidBackgroundAspectRatio) }}
      aria-label={isAr ? "بطاقة تهنئة عيد الأضحى" : "Eid Al-Adha greeting card"}
    >
      {/* Background: exact template, contain — no crop */}
      <img
        src={assetUrl(brandConfig.eidBackgroundPath)}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {/* Dynamic text: dark safe band below header logo, ends above bottom illustration (~bottom 30%) */}
      <div className="absolute inset-x-[8%] top-[28%] bottom-[38%] z-[5] flex flex-col items-center justify-center gap-2.5 px-2 text-center md:inset-x-[9%] md:gap-3">
        <h2
          className={[
            "w-full max-w-[20rem] break-words font-extrabold tracking-tight text-[#faf6ea]",
            isAr
              ? "text-[clamp(23px,5.4vw,34px)] leading-[1.22]"
              : "text-[clamp(21px,4.9vw,30px)] leading-[1.24]",
            "[text-shadow:0_2px_18px_rgba(0,0,0,0.85),0_1px_3px_rgba(0,0,0,0.95)]",
            "whitespace-pre-wrap",
          ].join(" ")}
        >
          {employeeName}
        </h2>

        <div
          className={[
            "w-full max-w-[19.5rem] break-words font-semibold text-[#f0e6d4]/95",
            isAr
              ? "text-[clamp(12.5px,3vw,16.5px)] leading-[1.76]"
              : "text-[clamp(12px,2.75vw,15.5px)] leading-[1.66]",
            "[text-shadow:0_2px_14px_rgba(0,0,0,0.82),0_1px_2px_rgba(0,0,0,0.9)]",
            "whitespace-pre-wrap",
          ].join(" ")}
        >
          {greetingMessage}
        </div>
      </div>
    </div>
  );
}

export const EidCardPreview = forwardRef<HTMLDivElement, EidCardPreviewProps>(EidCardPreviewBase);
export default EidCardPreview;
