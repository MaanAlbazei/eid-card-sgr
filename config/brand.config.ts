import type { Lang } from "@/types/lang";

export const brandConfig = {
  // Default language used when the app first loads.
  defaultLanguage: "ar" as Lang,

  companyName: {
    ar: "مصفاة الذهب السعودية",
    en: "Saudi Gold Refinery",
  },

  // ----------------------------------------------------------------------------
  // Assets
  // ----------------------------------------------------------------------------
  // Replace the logo here with your real Saudi Gold Refinery logo.
  // Recommended: transparent PNG, ideally 800x800px (or higher).
  logoPath: "/assets/logo-placeholder.png",

  // Replace the Eid background here with your real background image.
  // Recommended: portrait image around 1080x1350px (or higher).
  eidBackgroundPath: "/assets/eid-background.jpg",
  // Original provided card ratio (width / height) for exact, uncropped display.
  eidBackgroundAspectRatio: 682 / 1024,

  // Primary brand colors used across the UI (you can tweak these anytime).
  primaryColors: {
    gold: "#C9A227",
    goldDeep: "#8A6A12",
    ink: "#0F172A",
  },

  footerText: {
    ar: "مع تمنياتنا لكم بعيد مبارك سعيد. مصفاة الذهب السعودية",
    en: "Wishing you a blessed Eid. Saudi Gold Refinery",
  },

  // ----------------------------------------------------------------------------
  // Default Eid greeting text (prefilled, but fully editable).
  // ----------------------------------------------------------------------------
  defaultEidGreeting: {
    ar: "كل عام وأنتم بخير، أعاده الله عليكم بالخير واليمن والبركات",
    en: "Eid Mubarak. Wishing you joy, peace, and blessings on this special occasion.",
  },
};

