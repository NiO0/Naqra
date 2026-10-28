// Contact page copy (source: "Naqra _ Website Content.md" → Contact Us).
import { routes, footer } from "./home";

export const meta = {
  title: "تواصل مع نقرة",
  description: "عندك سؤال لنقرة، أو تريد معرفة الباقة المناسبة لمتجرك أو وكالتك، أو تحتاج إلى مساعدة تقنية؟ يسعدنا استقبال رسالتك ومساعدتك.",
};

export const hero = {
  eyebrow: "تواصل معنا",
  title: { before: "تواصل مع", mark: "نقـــرة" },
  sub: "عندك سؤال لنقرة، أو تريد معرفة الباقة المناسبة لمتجرك أو وكالتك، أو تحتاج إلى مساعدة تقنية؟ يسعدنا استقبال رسالتك ومساعدتك",
};

export const tabs = { form: "ارسل لنا رسالتك", direct: "تواصل معنا مباشرة", or: "أو" };

export const form = {
  title: "ارسل لنا رسالتك",
  intro: "املأ البيانات التالية، وأخبرنا كيف يمكننا مساعدتك..",
  requiredNote: "الحقول المميزة بـ * مطلوبة",
  fields: {
    name: { label: "الاسم الكامل", placeholder: "أدخل اسمك الكامل", required: true },
    email: { label: "البريد الإلكتروني", placeholder: "أدخل بريدك الإلكتروني", required: true },
    company: { label: "اسم المتجر أو الشركة", placeholder: "أدخل اسم متجرك أو شركتك", required: true },
    // The doc marks this one with "**" (not "*"); treated as required like the others.
    platform: { label: "منصة متجرك الإلكتروني", required: true, options: ["سلة", "شوبيفاي", "منصة أخرى"] },
    inquiry: {
      label: "نوع الاستفسار",
      required: true,
      placeholder: "اختر نوع الاستفسار",
      options: ["استفسار عام", "المبيعات والاشتراكات", "الشراكات والتعاون", "الدعم الفني"],
    },
    message: { label: "رسالتك", placeholder: "اكتب لنا تفاصيل استفسارك أو ما تحتاج إلى المساعدة فيه…", required: true },
  },
  submit: "إرسال الطلب",
  // Validation and status messages (UI strings, not marketing copy)
  errors: {
    required: "هذا الحقل مطلوب",
    email: "أدخل بريدًا إلكترونيًا صحيحًا",
    choose: "اختر أحد الخيارات",
    short: "اكتب رسالة أوضح (10 أحرف على الأقل)",
    summary: "تحقق من الحقول المطلوبة قبل الإرسال",
  },
  // TODO(backend): there is no endpoint yet, so the form never reports a real delivery.
  // Replace this note once scripts/contact-form.ts sends the data somewhere.
  pending: "تم التحقق من البيانات. الإرسال غير متاح بعد — راسلنا مباشرة على البريد الإلكتروني إلى أن يتم تفعيله.",
};

export const direct = {
  title: "أو تواصل معنا مباشرة",
  email: { label: "البريد الإلكتروني", value: footer.email },
  // TODO(content): support channels (e.g. WhatsApp, live chat, help center) and working hours are "[—]"
  // in the doc. Items with a null value are not rendered.
  channels: { label: "قنوات الدعم المتاحة", value: null as string | null },
  hours: { label: "أوقات العمل", value: null as string | null },
  socialsLabel: "السوشيال ميديا",
  // TODO(content): the doc also lists X (Twitter) here — add it to `footer.socials` with its link and icon.
  socials: footer.socials,
};

export const finalCta = {
  headline: { before: "تعرف ما يحتاجه متجرك؟", mark: "ابدأ الآن" },
  primary: { label: "الباقات والأسعار", href: routes.pricing },
};
