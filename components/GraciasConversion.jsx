"use client";

import { useEffect } from "react";
import { CONV_LABEL_FORM, trackConversion, trackEvent } from "../lib/tracking";

/** Fires the lead-form conversion once, when the /gracias/ page loads. */
export default function GraciasConversion() {
  useEffect(() => {
    trackEvent("form_submit_lead", { page: "/gracias/" });
    trackConversion(CONV_LABEL_FORM);
  }, []);
  return null;
}
