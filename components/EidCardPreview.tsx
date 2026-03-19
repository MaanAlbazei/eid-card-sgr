import { forwardRef } from "react";
import type { ForwardedRef } from "react";
import type { Lang } from "@/types/lang";
import { brandConfig } from "@/config/brand.config";

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
  const contentTop = isAr ? "mt-[80%]" : "mt-[82%]";

  return (
    <div
      ref={ref}
      dir={dir}
      lang={lang}
      className={[
        fontClass,
        // Exact provided Eid card ratio, responsive for mobile and desktop.
        "relative w-full max-w-[420px]",
        "overflow-hidden rounded-none border border-white/10",
        "shadow-[0_26px_60px_-36px_rgba(0,0,0,0.9)]",
      ].join(" ")}
      style={{ aspectRatio: String(brandConfig.eidBackgroundAspectRatio) }}
      aria-label={isAr ? "بطاقة تهنئة العيد" : "Eid greeting card"}
    >
      <img
        src={brandConfig.eidBackgroundPath}
        alt={isAr ? "خلفية العيد" : "Eid background"}
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/6 via-black/10 to-black/20" />

      <div className="relative flex h-full flex-col px-6 py-7">
        {/* Content */}
        <div className={`${contentTop} text-center`}>
          <h2
            className={[
              "break-words font-extrabold text-white",
              isAr
                ? "text-[clamp(18px,3.2vw,25px)] leading-[1.25] tracking-[-0.02em]"
                : "text-[clamp(16px,2.8vw,21px)] leading-[1.25] tracking-[-0.01em]",
              "[text-shadow:0_4px_16px_rgba(0,0,0,0.45)]",
              "mx-auto max-w-[22rem] whitespace-pre-wrap",
            ].join(" ")}
          >
            {employeeName}
          </h2>

          <div
            className={[
              isAr
                ? "mt-3 text-[clamp(12px,2.3vw,15px)] leading-[1.75]"
                : "mt-3 text-[clamp(11px,2vw,14px)] leading-[1.7]",
              "font-semibold text-white/95 break-words",
              "max-w-[20rem] mx-auto whitespace-pre-wrap overflow-hidden",
              "[text-shadow:0_2px_10px_rgba(0,0,0,0.38)]",
            ].join(" ")}
          >
            {greetingMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export const EidCardPreview = forwardRef<HTMLDivElement, EidCardPreviewProps>(EidCardPreviewBase);
export default EidCardPreview;

