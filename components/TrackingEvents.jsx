"use client";

import { useEffect } from "react";
import { CONV_LABEL_WHATSAPP, trackConversion, trackEvent } from "../lib/tracking";

/**
 * Site-wide click listener: any click on a WhatsApp link (wa.me) fires a
 * gtag event and — once the label is configured — a Google Ads conversion.
 * Renders nothing.
 */
export default function TrackingEvents() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href*="wa.me"]');
      if (!a) return;
      trackEvent("whatsapp_click", { link_url: a.href, page: window.location.pathname });
      trackConversion(CONV_LABEL_WHATSAPP);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
