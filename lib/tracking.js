// ── Google Ads / analytics tracking ──────────────────────────────────────────
// The base tag (AW-18353674917) loads site-wide via components/GoogleAnalytics.
// Conversion labels come from Google Ads → Goals → Conversions → each action's
// "Conversion ID and label" (format: AW-18353674917/AbC-dEfGhIjK).
// Leave a label empty until the action exists — calls no-op safely.

export const ADS_ID = "AW-18353674917";

export const CONV_LABEL_WHATSAPP = ""; // "Clic en WhatsApp" conversion label
export const CONV_LABEL_FORM = "";     // "Formulario enviado" conversion label

export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function trackConversion(label) {
  if (!label) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
}
