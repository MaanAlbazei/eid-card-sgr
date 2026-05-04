"use client";

import { useState } from "react";
import Image from "next/image";
import { brandConfig } from "@/config/brand.config";
import { assetUrl } from "@/lib/assetUrl";

type BrandLogoProps = {
  /** Navbar strip vs hero next to page title */
  variant: "navbar" | "hero";
  className?: string;
  alt?: string;
};

export function BrandLogo({ variant, className = "", alt = "" }: BrandLogoProps) {
  const [showFallback, setShowFallback] = useState(false);

  const imgClass =
    variant === "navbar"
      ? "h-9 w-auto max-w-[156px] object-contain object-center md:h-10 md:max-w-[172px]"
      : "h-12 w-auto max-w-[min(100%,260px)] object-contain object-center sm:h-14 sm:max-w-[280px] md:h-[4.25rem] md:max-w-[300px]";

  if (showFallback) {
    return (
      <span
        className={[
          "inline-flex items-center rounded-xl px-3 py-2 text-xs font-extrabold tracking-wide text-[#e8c547]",
          variant === "hero" ? "text-sm py-3" : "",
          className,
        ].join(" ")}
      >
        Saudi Gold Refinery
      </span>
    );
  }

  return (
    <Image
      src={assetUrl(brandConfig.logoPath)}
      alt={alt}
      width={1024}
      height={682}
      priority={variant === "hero"}
      draggable={false}
      unoptimized
      className={[imgClass, className].filter(Boolean).join(" ")}
      onError={() => setShowFallback(true)}
    />
  );
}

export function BrandLogoPanel({
  variant,
  className = "",
  decorative,
}: BrandLogoProps & { decorative?: boolean }) {
  const pad =
    variant === "navbar"
      ? "px-3 py-2 md:px-3.5 md:py-2.5"
      : "px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5";

  const alt =
    decorative === true ? "" : variant === "hero" ? "Saudi Gold Refinery" : "";

  return (
    <div
      className={[
        "inline-flex max-w-full items-center justify-center rounded-2xl bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/12",
        pad,
        className,
      ].join(" ")}
      aria-hidden={decorative ? true : undefined}
    >
      <BrandLogo variant={variant} alt={alt} />
    </div>
  );
}
