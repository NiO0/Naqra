// Contact form: client-side validation only.
// TODO(backend): no endpoint exists yet. Send the validated data in `submit()` below (e.g. fetch()
// to your form handler), then show a real success / error message. Do not wire it to a third-party
// service without the client's approval.
import { $, $$ } from "./core";

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initContactForm() {
  const form = $<HTMLFormElement>("[data-contact-form]");
  if (!form) return;
  form.noValidate = true; // we show our own Arabic messages
  const msg = JSON.parse(form.dataset.messages || "{}") as Record<string, string>;
  const status = $("[data-form-status]", form)!;
  let tried = false;

  const groups = $$("[data-field]", form);

  const check = (group: HTMLElement) => {
    const fields = $$<Field>("input, select, textarea", group);
    const err = $("[data-error]", group)!;
    let error = "";
    const radios = fields.filter((f) => f instanceof HTMLInputElement && f.type === "radio") as HTMLInputElement[];
    if (radios.length) {
      if (radios[0].required && !radios.some((r) => r.checked)) error = msg.choose;
    } else {
      const f = fields[0];
      const v = f.value.trim();
      if (f.required && !v) error = f instanceof HTMLSelectElement ? msg.choose : msg.required;
      else if (f instanceof HTMLInputElement && f.type === "email" && v && !EMAIL.test(v)) error = msg.email;
      else if (f instanceof HTMLTextAreaElement && v && v.length < 10) error = msg.short;
    }
    err.textContent = error;
    group.classList.toggle("has-error", !!error);
    fields.forEach((f) => f.setAttribute("aria-invalid", String(!!error)));
    return !error;
  };

  groups.forEach((g) => {
    // validate as people go, but only once a field was left or a submit was attempted
    $$<Field>("input, select, textarea", g).forEach((f) => {
      f.addEventListener("blur", () => { if (tried || (f.value && f.type !== "radio")) check(g); });
      f.addEventListener("input", () => { if (g.classList.contains("has-error")) check(g); });
      f.addEventListener("change", () => { if (tried || g.classList.contains("has-error")) check(g); });
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    tried = true;
    const bad = groups.filter((g) => !check(g));
    status.classList.toggle("is-error", bad.length > 0);
    if (bad.length) {
      status.textContent = msg.summary;
      $<Field>("input, select, textarea", bad[0])?.focus();
      return;
    }
    submit(new FormData(form));
    status.textContent = msg.pending;
  });

  // TODO(backend): send the data here. Until then nothing leaves the browser.
  function submit(_data: FormData) {}
}
