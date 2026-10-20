// ── Google Ads / analytics tracking ──────────────────────────────────────────
// The base tag (AW-18353674917) loads site-wide via components/GoogleAnalytics.
// Conversion labels come from Google Ads → Goals → Conversions → each action's
// "Conversion ID and label" (format: AW-18353674917/AbC-dEfGhIjK).
// Leave a label empty until the action exists — calls no-op safely.

export const ADS_ID = "AW-18353674917";

export const CONV_LABEL_WHATSAPP = "Hio1COuqmuMcEKW1269E"; // "WhatsApp Web" (acción creada 17/8, reemplaza a "Clic en WhatsApp" que nunca registró)
// The form conversion is URL-based (page load of /gracias/), so no label needed.
export const CONV_LABEL_FORM = "";

// transport_type "beacon": on mobile a wa.me click hands off to the WhatsApp app
// right away, and a normal request can be cut off before it leaves the page.
// A beacon is queued by the browser and delivered even after the page is hidden.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, { transport_type: "beacon", ...params });
}

export function trackConversion(label) {
  if (!label) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}`, transport_type: "beacon" });
}
