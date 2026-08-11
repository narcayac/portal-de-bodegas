import { waUrl } from "../lib/data";
import { WhatsAppIcon } from "./ui";

/**
 * Floating WhatsApp button, mobile only — on desktop the navbar pill is
 * always visible, so the float would be redundant. Visibility is controlled
 * by the .wa-float class (globals.css) to avoid inline display overrides.
 * Conversion tracking is automatic: TrackingEvents captures every wa.me link.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={waUrl("Hola, quisiera más información sobre una bodega")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="wa-float"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 90,
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#25D366",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
      }}
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
