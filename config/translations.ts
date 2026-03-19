import type { Lang } from "@/types/lang";

export type UiTranslations = typeof uiTranslations;

export const uiTranslations = {
  ar: {
    title: "مولد بطاقات تهنئة العيد",
    subtitle: "أنشئ بطاقة تهنئة مخصصة باسمك وحمّلها مباشرة",

    navbar: {
      language: "اللغة",
      brandTagline: "تهنئة العيد",
    },
    helpers: {
      greetingEditable: "يمكنك تحرير الرسالة.",
    },

    preview: {
      title: "معاينة البطاقة",
      aspectLabel: "النسبة الأصلية",
      downloadHint: "سيتم تنزيل البطاقة كصورة PNG بجودة عالية.",
    },

    card: {
      eidTitle: "عيد مبارك",
    },

    download: {
      exportError: "تعذر إنشاء ملف PNG. جرّب مرة أخرى بعد دقيقة.",
    },


    fields: {
      employeeName: "الأسم",
      greetingMessage: "نص التهنئة",
    },

    placeholders: {
      employeeName: "اكتب الأسم",
      greetingMessage: "اكتب تهنئتك بالعيد هنا",
    },

    buttons: {
      download: "تحميل",
      reset: "إعادة تعيين",
      downloading: "جارٍ التحميل...",
      ready: "تحميل",
    },

    validation: {
      employeeNameRequired: "يرجى إدخال الاسم .",
    },

    footer: {
      prefix: "مصممة للاستخدام الداخلي لدى",
    },
  },

  en: {
    title: "Eid Greeting Card Generator",
    subtitle: "Create a personalized Eid greeting card and download it instantly",

    navbar: {
      language: "Language",
      brandTagline: "Eid Greetings",
    },
    helpers: {
      greetingEditable: "You can edit the message.",
    },

    preview: {
      title: "Live Card Preview",
      aspectLabel: "Original aspect ratio",
      downloadHint: "Your download will be a high-quality PNG.",
    },

    card: {
      eidTitle: "Eid Mubarak",
    },

    download: {
      exportError: "Could not export the PNG. Please try again.",
    },


    fields: {
      employeeName: "Your Name",
      greetingMessage: "Greeting Message",
    },

    placeholders: {
      employeeName: "Enter your name",
      greetingMessage: "Write your Eid greeting here",
    },

    buttons: {
      download: "Download",
      reset: "Reset",
      downloading: "Downloading...",
      ready: "Download",
    },

    validation: {
      employeeNameRequired: "Please enter your employee name.",
    },

    footer: {
      prefix: "Made for internal use at",
    },
  },
} satisfies Record<Lang, unknown>;

export const getUi = (lang: Lang) => {
  return uiTranslations[lang] as UiTranslations[Lang];
};

