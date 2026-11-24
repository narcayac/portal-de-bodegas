"use client";

import { useEffect } from "react";
import { CONV_LABEL_WHATSAPP, trackConversion, trackEvent } from "../lib/tracking";

// Visits that arrive from a Google Ads click carry one of these URL params.
const AD_CLICK_PARAMS = ["gclid", "gbraid", "wbraid"];
const AD_VISIT_KEY = "pdb_ad_visit";
// Same as the Google Ads conversion window: a visitor who clicked an ad and
// comes back within 30 days still counts as coming from the campaign.
const AD_VISIT_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/** Remember (for 30 days) that this visitor arrived from a Google Ads click. */
function rememberAdVisit() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (!AD_CLICK_PARAMS.some((p) => params.get(p))) return;
    window.localStorage.setItem(AD_VISIT_KEY, String(Date.now()));
  } catch {
    // Storage blocked (private mode, etc.): the reference is simply not added.
  }
}

/** Date of the ad click as "DD/MM", or null if there was none in the last 30 days. */
function adVisitDate() {
  try {
    const ts = Number(window.localStorage.getItem(AD_VISIT_KEY));
    if (!ts || Date.now() - ts > AD_VISIT_MAX_AGE_MS) return null;
    const d = new Date(ts);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  } catch {
    return null;
  }
}

/**
 * Add a visible reference to the pre-filled WhatsApp message, so the person
 * who answers WhatsApp can tell which chats came from the Google Ads campaign.
 */
function tagWhatsAppLink(a) {
  const date = adVisitDate();
  if (!date) return;
  try {
    const url = new URL(a.href);
    const text = url.searchParams.get("text") || "";
    if (text.includes("Ref. AG")) return;
    url.searchParams.set("text", `${text}\n\n(Ref. AG ${date})`);
    a.href = url.toString();
  } catch {
    // Malformed href: leave the link untouched.
  }
}

/**
 * Site-wide click listener: any click on a WhatsApp link (wa.me) fires a
 * gtag event and a Google Ads conversion, and — for visitors who came from
 * an ad — tags the message with "(Ref. AG DD/MM)". Renders nothing.
 */
export default function TrackingEvents() {
  useEffect(() => {
    rememberAdVisit();
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href*="wa.me"]');
      if (!a) return;
      tagWhatsAppLink(a);
      trackEvent("whatsapp_click", { link_url: a.href, page: window.location.pathname });
      trackConversion(CONV_LABEL_WHATSAPP);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
