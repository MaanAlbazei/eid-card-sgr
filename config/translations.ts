import type { Lang } from "@/types/lang";

type SingleUiTranslation = {
  title: string;
  subtitle: string;
  navbar: {
    language: string;
    brandTagline: string;
  };
  helpers: {
    greetingEditable: string;
  };
  preview: {
    title: string;
    aspectLabel: string;
    downloadHint: string;
  };
  card: {
    eidTitle: string;
  };
  download: {
    exportError: string;
  };
  fields: {
    employeeName: string;
    greetingMessage: string;
  };
  placeholders: {
    employeeName: string;
    greetingMessage: string;
  };
  buttons: {
    download: string;
    downloadCard: string;
    reset: string;
    downloading: string;
    ready: string;
  };
  export: {
    formatLabel: string;
    formatPng: string;
    formatJpeg: string;
    formatWebp: string;
    helperMobile: string;
    openImageTab: string;
  };
  validation: {
    employeeNameRequired: string;
  };
  footer: {
    prefix: string;
  };
};

export type UiTranslations = Record<Lang, SingleUiTranslation>;

export const uiTranslations = {
  ar: {
    title: "مولد بطاقات تهنئة عيد الأضحى",
    subtitle: "أنشئ بطاقة تهنئة مخصصة باسمك وحمّلها مباشرة",

    navbar: {
      language: "اللغة",
      brandTagline: "عيد الأضحى",
    },
    helpers: {
      greetingEditable: "يمكنك تحرير الرسالة.",
    },

    preview: {
      title: "معاينة البطاقة",
      aspectLabel: "النسبة الأصلية",
      downloadHint: "اختر التنسيق المناسب ثم حمّل البطاقة بجودة عالية.",
    },

    card: {
      eidTitle: "عيد أضحى مبارك",
    },

    download: {
      exportError: "تعذر تصدير الصورة. تحقق من الاتصال ثم أعد المحاولة.",
    },


    fields: {
      employeeName: "الاسم",
      greetingMessage: "نص التهنئة",
    },

    placeholders: {
      employeeName: "اكتب الاسم",
      greetingMessage: "اكتب تهنئتك بالعيد هنا",
    },

    buttons: {
      download: "تحميل",
      downloadCard: "تحميل البطاقة",
      reset: "إعادة تعيين",
      downloading: "جارٍ التحميل...",
      ready: "تحميل",
    },

    export: {
      formatLabel: "صيغة الملف",
      formatPng: "PNG — أفضل جودة وشفافية",
      formatJpeg: "JPG — حجم أصغر ومتوافق مع كل الأجهزة",
      formatWebp: "WebP — حجم صغير (متصفحات حديثة)",
      helperMobile:
        "إذا لم يبدأ التنزيل تلقائيًا على الجوال، سيتم فتح الصورة لتتمكن من حفظها يدويًا.",
      openImageTab: "فتح الصورة في علامة تبويب للحفظ",
    },

    validation: {
      employeeNameRequired: "يرجى إدخال الاسم .",
    },

    footer: {
      prefix: "مصممة للاستخدام الداخلي لدى",
    },
  },

  en: {
    title: "Eid Al-Adha Greeting Card Generator",
    subtitle: "Create a personalized Eid Al-Adha greeting card and download it instantly",

    navbar: {
      language: "Language",
      brandTagline: "Eid Al-Adha",
    },
    helpers: {
      greetingEditable: "You can edit the message.",
    },

    preview: {
      title: "Live Card Preview",
      aspectLabel: "Original aspect ratio",
      downloadHint: "Pick a format, then download your card at high resolution.",
    },

    card: {
      eidTitle: "Eid Al-Adha Mubarak",
    },

    download: {
      exportError: "Could not export the image. Check your connection and try again.",
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
      downloadCard: "Download Card",
      reset: "Reset",
      downloading: "Downloading...",
      ready: "Download",
    },

    export: {
      formatLabel: "File format",
      formatPng: "PNG — best quality",
      formatJpeg: "JPG — smaller file, universal support",
      formatWebp: "WebP — compact (modern browsers)",
      helperMobile:
        "If download does not start automatically on mobile, the image will open so you can save it manually.",
      openImageTab: "Open image in a new tab to save",
    },

    validation: {
      employeeNameRequired: "Please enter your employee name.",
    },

    footer: {
      prefix: "Made for internal use at",
    },
  },
} satisfies UiTranslations;

export const getUi = (lang: Lang): SingleUiTranslation => uiTranslations[lang];

