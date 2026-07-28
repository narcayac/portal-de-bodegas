import Script from "next/script";
import { ADS_ID } from "../lib/tracking";

/**
 * Google tag (gtag.js) — loads site-wide.
 * - Google Ads (AW-18353674917): always on, powers conversion tracking.
 * - GA4: added only if NEXT_PUBLIC_GA_ID is set (e.g. "G-XXXXXXXXXX")
 *   in Vercel → Project → Settings → Environment Variables.
 */
export default function GoogleAnalytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${ADS_ID}');
          ${ga ? `gtag('config', '${ga}', { anonymize_ip: true });` : ""}
        `}
      </Script>
    </>
  );
}
