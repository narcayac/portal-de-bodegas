import "./globals.css";
import { Fraunces, Inter, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GoogleAnalytics from "../components/GoogleAnalytics";
import TrackingEvents from "../components/TrackingEvents";
import { SITE } from "../lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Portal de Bodegas | Arriendo de Bodegas para Empresas",
    template: "%s | Portal de Bodegas",
  },
  description:
    "Encuentra la bodega ideal para tu empresa. Varias alternativas disponibles en el sector sur de Santiago, distintos tamaños y trato directo, sin intermediarios.",
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_CL",
    title: "Portal de Bodegas | Arriendo de Bodegas para Empresas",
    description:
      "Distintas alternativas disponibles en el sector sur de Santiago. Trato directo y sin intermediarios.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal de Bodegas | Arriendo de Bodegas para Empresas",
    description:
      "Arriendo de bodegas industriales en San Bernardo. Trato directo, sin intermediarios.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Paste your Search Console token into NEXT_PUBLIC_GSC_VERIFICATION (env).
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export const viewport = {
  themeColor: "#011943",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL" className={`${fraunces.variable} ${inter.variable} ${mono.variable} ${jakarta.variable}`}>
      <body style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <TrackingEvents />
      </body>
    </html>
  );
}
