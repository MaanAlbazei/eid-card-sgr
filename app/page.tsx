"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/types/lang";
import type { ImageExportFormat } from "@/types/exportFormat";
import { brandConfig } from "@/config/brand.config";
import { getUi } from "@/config/translations";
import Navbar from "@/components/Navbar";
import GreetingForm from "@/components/GreetingForm";
import EidCardPreview from "@/components/EidCardPreview";
import ActionButtons from "@/components/ActionButtons";
import CardExportSection from "@/components/CardExportSection";
import Footer from "@/components/Footer";
import {
  renderCardToBlob,
  deliverCardImage,
  buildCardFilename,
  openBlobPreviewTab,
} from "@/lib/exportCardImage";
import { sanitizeForFilename } from "@/lib/sgrText";

const EMPLOYEE_NAME_MAX_LENGTH = 80;
const GREETING_MAX_LENGTH = 220;

export default function Page() {
  const [lang, setLang] = useState<Lang>(brandConfig.defaultLanguage);

  const [employeeName, setEmployeeName] = useState("");
  const [greetingMessage, setGreetingMessage] = useState<string>(
    brandConfig.defaultEidGreeting[brandConfig.defaultLanguage]
  );

  const [nameError, setNameError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<ImageExportFormat>("png");
  const [hasExported, setHasExported] = useState(false);

  const lastExportRef = useRef<{ blob: Blob } | null>(null);

  const ui = getUi(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const fontClass = lang === "ar" ? "font-ar" : "font-en";

  const cardRef = useRef<HTMLDivElement | null>(null);
  const prevLangRef = useRef<Lang>(lang);

  useEffect(() => {
    // Only switch greeting text automatically if the user hasn't customized it yet.
    const prevLang = prevLangRef.current;
    const prevDefault = brandConfig.defaultEidGreeting[prevLang];
    const nextDefault = brandConfig.defaultEidGreeting[lang];

    if (greetingMessage === prevDefault) {
      setGreetingMessage(nextDefault);
    }

    prevLangRef.current = lang;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  function validate(): boolean {
    const trimmed = employeeName.trim();
    if (!trimmed) {
      setNameError("required");
      return false;
    }
    setNameError(null);
    return true;
  }

  function resetForm() {
    setEmployeeName("");
    setNameError(null);
    setDownloadError(null);
    setHasExported(false);
    lastExportRef.current = null;
    setGreetingMessage(brandConfig.defaultEidGreeting[lang]);
  }

  function handleOpenImageTab() {
    const blob = lastExportRef.current?.blob;
    if (!blob) return;
    openBlobPreviewTab(blob);
  }

  async function handleDownload() {
    setDownloadError(null);
    if (!validate()) return;
    if (!cardRef.current) return;

    try {
      setIsDownloading(true);

      // Ensure card images are decoded before rendering to canvas.
      const imgs = Array.from(cardRef.current.querySelectorAll("img"));
      await Promise.all(
        imgs.map(async (img) => {
          try {
            // `decode()` resolves once the image is fully decoded.
            if (typeof (img as HTMLImageElement).decode === "function") {
              await (img as HTMLImageElement).decode();
            }
          } catch {
            // If decode fails, html-to-image will still try best-effort.
          }
        })
      );

      // Ensure fonts are loaded for crisp text export.
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const { blob, effectiveFormat } = await renderCardToBlob(cardRef.current, {
        format: exportFormat,
        pixelRatio: 3,
        backgroundColor: null,
      });

      lastExportRef.current = { blob };
      setHasExported(true);

      const nameSlug = sanitizeForFilename(employeeName);
      const filename = buildCardFilename(nameSlug, effectiveFormat);

      await deliverCardImage(blob, filename, effectiveFormat);
    } catch {
      setDownloadError(
        ui.download.exportError
      );
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div
      dir={dir}
      lang={lang}
      className={[
        "min-h-screen bg-[radial-gradient(1200px_circle_at_50%_-200px,var(--primary)/10,transparent_60%)]",
        fontClass,
      ].join(" ")}
    >
      <Navbar lang={lang} onLangChange={setLang} />

      <main className="mx-auto w-full max-w-5xl px-4 pb-10 pt-8 md:px-6 md:pt-12">
        <h1 className="sr-only">{ui.title}</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <section className="w-full rounded-[26px] border border-black/10 bg-white/85 p-4 shadow-[0_18px_45px_-22px_rgba(0,0,0,0.55)] ring-1 ring-black/5 md:p-6">
            <GreetingForm
              lang={lang}
              employeeName={employeeName}
              onEmployeeNameChange={(v) => {
                const sanitizedName = v.replace(/\s{2,}/g, " ").slice(0, EMPLOYEE_NAME_MAX_LENGTH);
                setEmployeeName(sanitizedName);
                if (nameError) setNameError(null);
                if (downloadError) setDownloadError(null);
              }}
              greetingMessage={greetingMessage}
              onGreetingMessageChange={(v) => {
                const normalizedMessage = v.slice(0, GREETING_MAX_LENGTH);
                setGreetingMessage(normalizedMessage);
                if (downloadError) setDownloadError(null);
              }}
              nameError={nameError}
              employeeNameMaxLength={EMPLOYEE_NAME_MAX_LENGTH}
              greetingMaxLength={GREETING_MAX_LENGTH}
            />

            <div className="mt-6 space-y-4">
              <CardExportSection
                lang={lang}
                exportFormat={exportFormat}
                onExportFormatChange={setExportFormat}
                onDownload={handleDownload}
                onOpenImageTab={handleOpenImageTab}
                isDownloading={isDownloading}
                showOpenImageTab={hasExported}
              />
              <div className="flex justify-stretch sm:justify-end">
                <ActionButtons lang={lang} onReset={resetForm} disabled={isDownloading} />
              </div>
            </div>

            {downloadError ? (
              <div role="alert" className="mt-4 rounded-2xl border border-red-500/20 bg-red-50 p-4">
                <p className="font-bold text-red-700">{downloadError}</p>
              </div>
            ) : null}
          </section>

          <section className="flex w-full flex-col items-center gap-5 rounded-[26px] border border-black/10 bg-white/75 p-4 shadow-[0_18px_45px_-22px_rgba(0,0,0,0.45)] ring-1 ring-black/5 md:p-6">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-[var(--foreground)]">
                  {ui.preview.title}
                </h2>
                <div className="text-xs font-semibold text-[var(--muted)]">
                  {ui.preview.aspectLabel}
                </div>
              </div>

              <div className="mt-4 flex w-full items-center justify-center">
                <EidCardPreview
                  ref={cardRef}
                  lang={lang}
                  employeeName={employeeName || ui.fields.employeeName}
                  greetingMessage={greetingMessage}
                />
              </div>
              <div className="mt-3 text-center text-xs font-semibold text-[var(--muted)]">
                {ui.preview.downloadHint}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

