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
  // Official Saudi Gold Refinery logo (transparent PNG — shown on dark panels in UI).
  logoPath: "/assets/sgr-logo.png",

  // Eid Al-Adha template — portrait PNG (black/gold; branding + Kaaba/Hajj artwork baked in).
  eidBackgroundPath: "/assets/eid-al-adha-background.png",
  // Width / height of the shipped PNG (must match file — keeps preview/export framed correctly).
  eidBackgroundAspectRatio: 682 / 1024,

  // Primary brand colors used across the UI (you can tweak these anytime).
  primaryColors: {
    gold: "#C9A227",
    goldDeep: "#8A6A12",
    ink: "#0F172A",
  },

  footerText: {
    ar: "مع تمنياتنا لكم بعيد أضحى مبارك. مصفاة الذهب السعودية",
    en: "Warm wishes for Eid Al-Adha. Saudi Gold Refinery",
  },

  // ----------------------------------------------------------------------------
  // Default Eid greeting text (prefilled, but fully editable).
  // ----------------------------------------------------------------------------
  defaultEidGreeting: {
    ar: "عيد أضحى مبارك، تقبل الله طاعاتكم وأعاد الله عليكم هذه المناسبة بالخير واليمن والبركات",
    en: "Eid Al-Adha Mubarak. May Allah accept your good deeds and bless you with peace and prosperity.",
  },
};

