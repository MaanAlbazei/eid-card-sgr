import type { Lang } from "@/types/lang";
import { brandConfig } from "@/config/brand.config";
import { getUi } from "@/config/translations";

export default function GreetingForm({
  lang,
  employeeName,
  onEmployeeNameChange,
  greetingMessage,
  onGreetingMessageChange,
  nameError,
  employeeNameMaxLength,
  greetingMaxLength,
}: {
  lang: Lang;
  employeeName: string;
  onEmployeeNameChange: (value: string) => void;
  greetingMessage: string;
  onGreetingMessageChange: (value: string) => void;
  nameError: string | null;
  employeeNameMaxLength: number;
  greetingMaxLength: number;
}) {
  const ui = getUi(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const fontClass = lang === "ar" ? "font-ar" : "font-en";

  const nameErrorAr = getUi("ar").validation.employeeNameRequired;
  const nameErrorEn = getUi("en").validation.employeeNameRequired;

  return (
    <form className="w-full space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-[var(--foreground)]" htmlFor="employeeName">
          {ui.fields.employeeName}
        </label>
        <input
          id="employeeName"
          name="employeeName"
          type="text"
          value={employeeName}
          onChange={(e) => onEmployeeNameChange(e.target.value)}
          placeholder={ui.placeholders.employeeName}
          dir={dir}
          className={[
            fontClass,
            "w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[15px] leading-[1.5] shadow-sm outline-none transition-colors",
            "focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
            nameError ? "border-red-500/60 ring-red-400/40" : "",
          ].join(" ")}
          aria-invalid={nameError ? true : false}
          aria-describedby={nameError ? "employeeNameError" : undefined}
          autoComplete="off"
          inputMode="text"
          maxLength={employeeNameMaxLength}
        />

        {nameError ? (
          <div id="employeeNameError" role="alert" className="space-y-1">
            <p className="text-sm font-semibold text-red-600 font-ar">{nameErrorAr}</p>
            <p className="text-sm font-semibold text-red-700 font-en">{nameErrorEn}</p>
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-[var(--foreground)]" htmlFor="greetingMessage">
          {ui.fields.greetingMessage}
        </label>
        <textarea
          id="greetingMessage"
          name="greetingMessage"
          value={greetingMessage}
          onChange={(e) => onGreetingMessageChange(e.target.value)}
          placeholder={ui.placeholders.greetingMessage}
          dir={dir}
          rows={4}
          maxLength={greetingMaxLength}
          className={[
            fontClass,
            "w-full resize-none rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[15px] leading-[1.65] shadow-sm outline-none transition-colors",
            "focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
          ].join(" ")}
        />
        <p className="text-xs font-semibold text-[var(--muted)]">{ui.helpers.greetingEditable}</p>
        <p className="text-xs text-[var(--muted)]/90">
          {greetingMessage.length}/{greetingMaxLength}
        </p>
      </div>

      {/* Hidden hints for screen readers about default values */}
      <div className="sr-only" aria-hidden="true">
        {brandConfig.defaultEidGreeting[lang]}
      </div>
    </form>
  );
}

