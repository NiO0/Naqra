// Pricing page copy (source: "Naqra _ Website Content.md" → Pricing).
// Only the two plans in the content doc are listed — nothing here is estimated.
import { routes, faqs as homeFaqs } from "./home";

export const meta = {
  title: "الباقات والأسعار | نقرة",
  description: "باقات نقرة واضحة تبدأ من المتاجر الصغيرة وتصل إلى الوكالات التي تدير أكثر من متجر. قارن الأسعار وحدود الاستخدام قبل تحديد باقتك.",
};

export const hero = {
  eyebrow: "الأسعار",
  title: { before: "باقات تناسب حجم متجرك", mark: "واحتياجاتك من نقرة" },
  sub: "باقات واضحة تبدأ من المتاجر الصغيرة وتصل إلى الوكالات التي تدير أكثر من متجر",
  primary: { label: "استعرض الباقات", href: "#plans" },
};

export const billing = {
  monthly: "شهري",
  annual: "سنوي",
  // TODO(content): the annual discount is "(خصم ---)" in the doc. Add it here (e.g. "خصم 20%") once
  // confirmed; the toggle shows it as a badge when set.
  annualDiscount: null as string | null,
  sub: "اختر مدة الاشتراك المناسبة لك، وقارن الأسعار وحدود الاستخدام قبل تحديد باقتك.",
};

export const currency = "ريال";

export type Plan = {
  id: string;
  name: string;
  latin: string;
  forWho: string;
  featured?: boolean;
  monthly: { price: number; credits: string };
  // TODO(content): confirm the annual figures. The doc lists 499 / 999 per year and "رصيد التوليد الشهري
  // المقترح" of 600 / 3600 under "لو سنة" — it is unclear whether those credits are monthly or per year.
  annual: { price: number; credits: string };
  limits: string[]; // the main limits shown on the card
  cta: { label: string; href: string };
};

export const plans = {
  eyebrow: "الباقات",
  headline: "الباقات والأسعار",
  creditsLabel: "رصيد التوليد الشهري المقترح",
  periods: { monthly: "/ شهر", annual: "/ سنة" },
  items: [
    {
      id: "basic",
      name: "نقرة بيزك",
      latin: "Naqra Basic",
      forWho: "المتاجر الصغيرة والمتوسطة",
      monthly: { price: 50, credits: "100 عملية تحسين صفحة" },
      annual: { price: 499, credits: "600" },
      limits: ["100 عملية تحديث منتجات", "التوليد الجماعي حتى 50 صفحة في الدفعة", "استيراد وتصدير CSV"],
      cta: { label: "ابدأ مع نقرة", href: routes.contact },
    },
    {
      id: "pro",
      name: "نقرة برو",
      latin: "Naqra Pro",
      forWho: "المتاجر ذات المنتجات الكثيرة والتحديثات المستمرة",
      featured: true,
      monthly: { price: 100, credits: "300 عملية تحسين صفحة" },
      annual: { price: 999, credits: "3600" },
      limits: ["300 عملية تحديث منتجات", "التوليد الجماعي حتى 50 صفحة في الدفعة", "استيراد وتصدير CSV"],
      cta: { label: "ابدأ مع نقرة", href: routes.contact },
    },
    // TODO(content): the page structure suggests a third "Agency" plan (multiple stores). Add it here
    // when its price and limits are defined; the grid adapts to 3 cards.
  ] as Plan[],
};

// true = included (✓), false = not included (✕), string = value shown as text
type Cell = boolean | string;

export const comparison = {
  eyebrow: "مقارنة الباقات",
  headline: "قارن بين الباقات واختر ما يناسب احتياجات متجرك ونمو أعمالك",
  sub: "تعرف على حدود الاستخدام وإمكانيات التحسين المتاحة في كل باقة لتحدد الاشتراك الأقرب لك",
  featureLabel: "الميزة",
  // TODO(content): the doc's two tables disagree on three rows — "مناسبة لمن؟" (basic: "المتاجر الصغيرة"
  // vs "الصغيرة والمتوسطة"), keyword suggestions ("رئيسية ومساندة" vs "حتى 50 صفحة في الدفعة") and bulk
  // generation (✓ vs "حتى 50 صفحة في الدفعة"). The values below follow the first (Pricing Plans) table.
  groups: [
    {
      title: "حدود الاستخدام",
      rows: [
        { k: "مناسبة لمن؟", v: ["المتاجر الصغيرة والمتوسطة", "المتاجر ذات المنتجات الكثيرة والتحديثات المستمرة"] as Cell[] },
        { k: "رصيد التوليد الشهري المقترح", v: ["100 عملية تحسين صفحة", "300 عملية تحسين صفحة"] as Cell[] },
        { k: "تحديث منتجات", v: ["100 عملية تحديث", "300 عملية تحديث"] as Cell[] },
        { k: "التوليد الجماعي", v: ["حتى 50 صفحة في الدفعة", "حتى 50 صفحة في الدفعة"] as Cell[] },
      ],
    },
    {
      title: "إمكانيات التحسين",
      rows: [
        { k: "توليد محتوى المنتجات", v: [true, true] as Cell[] },
        { k: "إنشاء محتوى جديد أو تحسين المحتوى الحالي", v: [true, true] as Cell[] },
        { k: "اقتراح الكلمات المفتاحية وتوزيع الكلمات داخل المحتوى", v: ["رئيسية ومساندة", "رئيسية ومساندة"] as Cell[] },
        { k: "تحسين عنوان السيو ووصف الميتا", v: [true, true] as Cell[] },
        { k: "وصف مختصر ووصف تفصيلي", v: [true, true] as Cell[] },
        { k: "اختيار الحقول المطلوب تعديلها", v: [true, true] as Cell[] },
        { k: "معاينة المحتوى وتعديله قبل الاعتماد", v: [true, true] as Cell[] },
        { k: "استيراد وتصدير CSV", v: [true, true] as Cell[] },
        { k: "تحسين النص البديل للصور - Alt Text", v: [true, true] as Cell[] },
        { k: "رابط الصفحة - URL Slug", v: [true, true] as Cell[] },
        { k: "العنوان الرئيسي - H1 والعناوين الفرعية - H2-H6", v: [true, true] as Cell[] },
      ],
    },
  ],
};

export const finalCta = {
  headline: { before: "لم تجد الباقة المناسبة", mark: "لمتجرك؟" },
  text: "تواصل الآن مع فريق نقرة لنساعدك في اختيار الباقة الأقرب لحجم متجرك أو احتياج وكالتك",
  // TODO(content): the doc asks for a WhatsApp button here, but no WhatsApp number exists yet
  // (see `footer.phone` in home.ts). Point this at https://wa.me/<number> once it's available.
  primary: { label: "تواصل معنا", href: routes.contact },
};

export const faqs = {
  eyebrow: homeFaqs.eyebrow,
  headline: homeFaqs.headline,
  // Items with `todo: true` have no approved answer yet and are not rendered.
  items: [
    // TODO(content): this answer names "البداية / النمو / الوكالات" plans, but the plans above are
    // "نقرة بيزك" and "نقرة برو". Update the copy once the plan line-up is final.
    { q: "ما الفرق بين باقات البداية والنمو والوكالات؟", a: "تستهدف باقة البداية المتاجر الصغيرة، بينما صممت باقة النمو للمتاجر التي تمتلك عددًا أكبر من المنتجات وتحتاج لتحسينات متكررة، أما الأخيرة فهي موجهة لوكالات التسويق ومختصون السيو." },
    { q: "كيف اختار باقة نقرة المناسبة لمتجري؟", a: "يعتمد الاختيار على عدد المنتجات التي تريد تحسينها، وحجم عمليات التحسين التي تحتاج إلى تنفيذها، وطبيعة عملك. يمكنك مقارنة الباقات وحدود الاستخدام لتحديد الاشتراك الأقرب لاحتياجاتك." },
    { q: "هل جميع الباقات تشمل التحسين الجماعي بالذكاء الاصطناعي؟", a: "تعتمد نقرة على أدوات الذكاء الاصطناعي في تحسين المنتجات، بينما تختلف حدود الاستخدام والأدوات المتاحة بحسب تفاصيل الباقة التي يتم اعتمادها." },
    // TODO(content): answers below are pending in the doc ("[تضاف ... بعد ...]").
    { q: "كيف يتم احتساب عدد المنتجات أو عمليات التحسين؟", a: "", todo: true },
    { q: "هل يمكنني تغيير الباقة إذا زاد عدد منتجات متجري؟", a: "", todo: true },
    { q: "هل توجد تجربة مجانية قبل الاشتراك؟", a: "", todo: true },
  ] as { q: string; a: string; todo?: boolean }[],
};
