// All home-page copy lives here (source: "Naqra _ Website Content.md").
// Edit text in one place without touching layout or animation code.

export const routes = {
  home: "/",
  features: "/features",
  howItWorks: "/how-it-works",
  solutions: "/solutions",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  en: "/en",
} as const;

export const tagline = "Optimize Your Entire Store with One Click";

export const nav = {
  // Mega-menu list: each item jumps to its section on the Features page
  features: [
    { label: "تحسين عناوين ووصف المنتجات", href: `${routes.features}#content`, icon: "text" },
    { label: "إنشاء وتحسين الميتا تاج لكل منتجاتك", href: `${routes.features}#meta`, icon: "tag" },
    { label: "تحسينات السيو داخل صفحات المنتجات", href: `${routes.features}#on-page`, icon: "page" },
    { label: "تحسينات السيو خارج صفحات المنتجات", href: `${routes.features}#off-page`, icon: "link", soon: true },
    { label: "تحسين الصور", href: `${routes.features}#images`, icon: "image", soon: true },
    { label: "تحسين ودعم سرعة المتجر", href: `${routes.features}#speed`, icon: "bolt", soon: true },
    { label: "قوة الذكاء الاصطناعي لتحسين المنتجات", href: `${routes.features}#ai`, icon: "spark" },
  ],
  links: [
    { label: "طريقة العمل", href: routes.howItWorks },
    { label: "الحلول", href: routes.solutions },
    { label: "الأسعار", href: routes.pricing },
    { label: "عن نقرة", href: routes.about },
  ],
  cta: { label: "ابدأ مع نقرة", href: routes.contact },
  lang: { label: "English", href: routes.en },
};

export const hero = {
  // Visible as three ruled lines: حسّن متجرك / بالكـــــامل / بنقرة [button] واحدة
  title: "حسّن متجرك بالكامل بنقرة واحدة",
  lines: {
    first: "حسّن متجرك",
    stretch: { start: "بالكـ", end: "ـامل" }, // بالكامل with an animated kashida between ك and ا
    press: { before: "بنقرة", after: "واحدة" }, // the pressed-button illustration sits between
  },
  sub: {
    lead: "أداة ذكية",
    rest: "لتحسين مختلف أنواع المتاجر الإلكترونية، تحسن عناوين المنتجات ووصفها والميتا تاجز والصور وتحسينات السيو لمئات المنتجات دفعة واحدة باستخدام أحدث أساليب الذكاء الاصطناعي.",
  },
  primary: { label: "ابدأ مع نقرة", href: routes.contact },
  secondary: { label: "استكشف نقرة", href: "#how-it-works" },
  micro: ["تحسين جماعي لمنتجاتك", "أدوات ذكاء اصطناعي", "خطوات بسيطة"],
};

export const valueStrip = [
  "تحسين جماعي للمنتجات",
  "ذكاء اصطناعي متوافق مع السيو",
  "عناوين ووصف أوضح",
  "ميتا تاج لكل منتج",
  "صور منتجات محسنة",
  "صفحات أسرع",
  "تكلفة أقل من توظيف مختص سيو",
];

export const challenges = {
  eyebrow: "المشكلة",
  headline: "لماذا لا يظهر متجرك في نتائج البحث كما تتوقع؟",
  cards: [
    {
      title: "تعديل المنتجات واحدًا تلو الآخر",
      text: "مئات المنتجات تعني ساعات أو أيامًا من النسخ والتعديل اليدوي لكل منتج على حدى",
      icon: "bulk", // /public/art/icon-*.svg
    },
    {
      title: "عناوين ووصف ناقصة وميتا غير محسنة",
      text: "محتوى مكرر أو غير مكتمل يجعل فهم المنتج أصعب على العميل وعلى محركات البحث",
      icon: "meta-tag",
    },
    {
      title: "صور ثقيلة وصفحات بطيئة",
      text: "تؤثر على تجربة العميل داخل المتجر وعلى فرص ظهوره في نتائج البحث",
      icon: "clock",
    },
    {
      title: "تكلفة عالية لتحسين السيو",
      text: "توظيف مختص سيو أو الاعتماد الكامل على وكالة تسويق يعني ميزانية أكبر كل شهر",
      icon: "wallet",
    },
  ],
  closing: "نقرة تختصر كل ذلك في خطوات بسيطة",
  cta: { label: "تعرف على نقرة", href: routes.about },
};

export const inAction = {
  eyebrow: "نقرة في العمل",
  headline: { before: "من التعديل اليدوي لكل منتج إلى", mark: "تحسين منتجاتك دفعة واحدة" },
  manualLabel: "التعديل اليدوي",
  naqraLabel: "مع نقرة",
  rows: [
    { k: "الوقت", manual: "ساعات أو أيام", naqra: "دقائق" },
    { k: "الطريقة", manual: "منتج بعد منتج", naqra: "مئات المنتجات دفعة واحدة" },
    { k: "الجهد", manual: "نسخ وتعديل متكرر", naqra: "خطوات بسيطة ونقرة" },
    { k: "التكلفة", manual: "موظف سيو أو وكالة تسويق", naqra: "اشتراك في أداة واحدة" },
    { k: "الجودة", manual: "تختلف من منتج لآخر", naqra: "معايير سيو ثابتة لكل المنتجات" },
  ],
  // Illustrative before/after example (from the Features page content)
  example: {
    label: "مثال توضيحي",
    before: { title: "تيشرت قطن", desc: "تيشرت قطن مريح" },
    after: {
      title: "تيشيرت قطن رجالي بأكمام قصيرة – خامة مريحة للاستخدام اليومي",
      desc: "تيشيرت رجالي من القطن بتصميم بسيط وأكمام قصيرة، خامته خفيفة ومريحة تناسب الاستخدام اليومي وتتوفر بعدة مقاسات وألوان.",
    },
  },
};

export const features = {
  eyebrow: "المزايا",
  headline: "كل ما تحتاجه لتحسين متجرك الإلكتروني في مكان واحد",
  sub: "من تحسين وصف المنتجات وعناوينها إلى تهيئتها لمحركات البحث وتحسين الصور، تجمع نقرة أدوات متعددة تساعدك على تطوير محتوى متجرك وبيانات منتجاتك بسهولة وكفاءة",
  subStrong: "تجمع نقرة أدوات متعددة", // phrase inside `sub` shown in bold
  items: [
    {
      id: "content",
      tab: "العناوين والأوصاف",
      title: "تحسين عناوين المنتجات وأوصافها",
      text: "اجعل محتوى منتجاتك أكثر وضوحًا واحترافية باستخدام التقنيات السريعة للذكاء الاصطناعي لإنشاء وتحسين العناوين والأوصاف بما يناسب تفاصيل كل منتج.",
      icon: "text",
    },
    {
      id: "meta",
      tab: "Meta Tags",
      title: "إنشاء وتحسين Meta Tags",
      text: "أنشئ وحسن عناوين SEO وأوصاف Meta لمنتجاتك بشكل جماعي، لتساعد محركات البحث على فهم محتوى صفحات منتجاتك بصورة أفضل.",
      icon: "tag",
    },
    {
      id: "on-page",
      tab: "SEO داخل الصفحات",
      title: "تحسين SEO داخل صفحات المنتجات",
      text: "حسن محتوى صفحات منتجاتك وبياناتها بما يتوافق مع ممارسات تحسين محركات البحث، لتهيئة صفحات أكثر وضوحًا وتنظيمًا.",
      icon: "page",
    },
    {
      id: "off-page",
      tab: "SEO خارج الصفحات",
      title: "دعم تحسينات SEO خارج الصفحات",
      text: "استفد من أدوات نقرة لدعم بعض جوانب تحسين ظهور متجرك خارج صفحات المنتجات، ضمن المهام التي تتيحها الأداة.",
      icon: "link",
      soon: true,
    },
    {
      id: "images",
      tab: "تحسين الصور",
      title: "تحسين صور جميع المنتجات",
      text: "حسن صور منتجاتك بطريقة أسهل، وساعد على تقديمها بصورة أكثر وضوحًا واحترافية داخل متجرك الإلكتروني.",
      icon: "image",
      soon: true,
    },
    {
      id: "speed",
      tab: "سرعة الصفحات",
      title: "تحسين بعض عوامل سرعة الصفحات",
      text: "استفد من التحسينات المدعومة في نقرة لمعالجة بعض الجوانب المرتبطة بسرعة صفحات المتجر، والمساعدة في تقديم تجربة تصفح أفضل.",
      icon: "gauge",
      soon: true,
    },
  ],
  cta: { label: "استكشف مزايا نقرة", href: routes.features },
};

export const howItWorks = {
  eyebrow: "طريقة العمل",
  headline: "كيف تحسن متجرك الإلكتروني مع نقرة؟",
  sub: "تعتمد نقرة على خطوات بسيطة تساعدك من خلالها على تنظيم عمليات التحسين بمتجرك والاستفادة من تقنيات الذكاء الاصطناعي في تنفيذها بشكل جماعي",
  steps: [
    { title: "جهز منتجات متجرك", text: "ابدأ بتحديد المنتجات التي ترغب في تحسين محتواها أو بياناتها", ui: "select" },
    { title: "اختر نوع التحسين", text: "حدد التحسين المناسب لاحتياجك، سواء كان للعناوين أو الأوصاف أو بيانات SEO أو الصور", ui: "options" },
    { title: "استفد من تقنيات الذكاء الاصطناعي", text: "تساعدك نقرة على إنشاء وتحسين المحتوى والبيانات الخاصة بالمنتجات المحددة دفعة واحدة", ui: "ai" },
    { title: "نفذ التحسينات لكل المنتجات", text: "أكمل خطوات التحسين الجماعي وفق الخيارات المتاحة داخل الأداة، دون الحاجة إلى تكرار العملية يدويًا", ui: "done" },
  ],
  cta: { label: "استكشف طريقة العمل بنقرة", href: routes.howItWorks },
};

export const why = {
  eyebrow: "لماذا نقرة؟",
  headline: "لماذا تختار نقرة لتحسين متجرك الإلكتروني؟",
  cards: [
    { title: "التحسين الجماعي بدل العمل المتكرر", text: "نفّذ التحسينات على مجموعات من المنتجات، بدلًا من إعادة الخطوات نفسها مع كل منتج", icon: "bulk-white" }, // /public/art/icon-*.svg
    { title: "أدوات متعددة في مكان واحد", text: "انتقل بين تحسين المحتوى وبيانات SEO والصور وغيرها من التحسينات المدعومة، دون الحاجة إلى التعامل مع كل مهمة بصورة منفصلة", icon: "sliders" },
    { title: "ذكاء اصطناعي يدعم إنتاجيتك", text: "استفد من أدوات ذكية تساعدك على إنشاء وتحسين محتوى منتجاتك بسرعة وكفاءة", icon: "ai" },
    { title: "مناسبة لأصحاب المتاجر وفرق التسويق", text: "سواء كنت تعمل على متجرك أو تدير عمليات تحسين المنتجات لعملائك، تساعدك نقرة على تنظيم مهامك وإنجازها بسهولة", icon: "users" },
  ],
  cta: { label: "اكتشف حلول نقرة", href: routes.solutions },
};

export const platforms = {
  eyebrow: "المنصات المدعومة",
  headline: "نقرة تعمل مع متجرك على سلة وشوبيفاي",
  sub: "اربط متجرك بخطوات بسيطة من خلال تثبيت نقرة من متجر تطبيقات منصتك، وابدأ التحسين مباشرة.",
  items: [
    { name: "سلة", latin: "Salla", note: "متوفرة على متجر تطبيقات سلة" },
    { name: "شوبيفاي", latin: "Shopify", note: "متوفرة على Shopify App Store" },
  ],
};

export const finalCta = {
  headline: { before: "متجرك يستحق ظهورًا أفضل بمحركات البحث ..", mark: "وكل شيء يبدأ بنقرة" },
  text: "وفر وقتك وجهدك مع نقرة وأدواتها السهلة لتطوير محتوى منتجاتك وبياناتها بخطوات بسيطة",
  primary: { label: "ابدأ الآن", href: routes.pricing },
  secondary: { label: "تواصل معنا", href: routes.contact },
};

export const faqs = {
  eyebrow: "الأسئلة الشائعة",
  headline: "أسئلة قد تدور في ذهنك",
  items: [
    { q: "ما هي نقرة؟", a: "نقرة أداة ذكية تساعد أصحاب المتاجر الإلكترونية على تحسين المنتجات والمتاجر باستخدام أدوات الذكاء الاصطناعي، تشمل التحسينات محتوى المنتجات وبياناته وبعض الجوانب الأخرى المرتبطة بأداء المتجر." },
    { q: "كيف تساعد نقرة في تحسين محركات البحث للمتاجر الإلكترونية؟", a: "تساعد نقرة على تحسين عناوين المنتجات وأوصافها وإنشاء وتحسين Meta Tags وتهيئة محتوى صفحات المنتجات بما يتوافق مع ممارسات SEO، مما يدعم فرص ظهور المنتجات في نتائج البحث." },
    { q: "هل يمكن تحسين عدد كبير من المنتجات دفعة واحدة؟", a: "نعم، تعتمد نقرة على التحسين الجماعي (Bulk Optimization)، الذي يتيح تنفيذ التحسينات على مجموعات من المنتجات بدلًا من تعديل كل منتج بشكل منفصل." },
    { q: "هل أحتاج إلى خبرة تقنية أو معرفة متقدمة بالـ SEO لاستخدام نقرة؟", a: "تم تصميم نقرة لتسهيل عمليات تحسين المنتجات والمتاجر، بحيث يستطيع أصحاب المتاجر الاستفادة من أدواتها دون الحاجة إلى خبرة تقنية أو تسويقية متقدمة." },
    { q: "هل نقرة مناسبة لشركات التسويق ومختصي SEO؟", a: "نعم، تساعد نقرة وكالات التسويق ومختصي SEO على تنفيذ مهام تحسين المنتجات بشكل جماعي، مما يقلل الوقت المستغرق في العمليات المتكررة ويساعد على رفع إنتاجية فرق العمل." },
    { q: "هل تحسين المنتجات باستخدام نقرة يضمن تصدر نتائج البحث؟", a: "لا توجد أداة تضمن تصدر نتائج البحث. لكن نقرة تساعد على تحسين محتوى المنتجات وبياناتها وتهيئتها بصورة أفضل لمحركات البحث، مما يدعم جهود تحسين ظهور المتجر." },
  ],
};

export const footer = {
  // Numbered menu (Figma footer)
  menu: [
    { label: "الرئيسية", href: routes.home },
    { label: "المزايا", href: routes.features },
    { label: "كيف تعمل نقرة", href: routes.howItWorks },
    { label: "الحلول", href: routes.solutions },
    { label: "الأسعار", href: routes.pricing },
    { label: "عن نقرة", href: routes.about },
    { label: "تواصل معنا", href: routes.contact },
  ],
  legal: [
    { label: "سياسة الخصوصية", href: routes.privacy },
    { label: "الشروط والأحكام", href: routes.terms },
  ],
  platforms: "Salla · Shopify",
  email: "info@Naqra.com",
  phone: null as string | null, // TODO: add phone / WhatsApp number when available
  socials: [
    { name: "Snapchat", href: "#", icon: "snapchat" },
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "TikTok", href: "#", icon: "tiktok" },
  ],
};
