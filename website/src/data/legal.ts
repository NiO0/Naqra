// Privacy policy & terms. The content doc has no text for these pages yet, so they render a
// placeholder notice and are kept out of search results (noindex) until the approved text is added.
//
// TODO(content): add the approved legal text as `sections` ({ id, heading, body: string[] }) and set
// `updated` (e.g. "2026-11-01"). Sections appear with a table of contents; the placeholder disappears
// and the page becomes indexable as soon as `sections` is non-empty.

export type LegalSection = { id: string; heading: string; body: string[] };
export type LegalPage = {
  title: string;
  latin: string;
  description: string;
  updated: string | null;
  sections: LegalSection[];
};

export const labels = {
  eyebrow: "قانوني",
  updated: "آخر تحديث",
  toc: "المحتويات",
  pending: "يُضاف النص المعتمد لهذه الصفحة قريبًا. لأي استفسار، تواصل معنا على",
};

export const privacy: LegalPage = {
  title: "سياسة الخصوصية",
  latin: "Privacy Policy",
  description: "سياسة الخصوصية الخاصة بنقرة.",
  updated: null,
  sections: [], // TODO(content)
};

export const terms: LegalPage = {
  title: "الشروط والأحكام",
  latin: "Terms & Conditions",
  description: "الشروط والأحكام الخاصة باستخدام نقرة.",
  updated: null,
  sections: [], // TODO(content)
};
