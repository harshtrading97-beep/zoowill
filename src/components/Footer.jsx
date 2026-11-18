import { Mail, MessageCircle, Globe, ArrowRight } from "lucide-react";

const FOOTER_COLS = [
  { heading: "Saddlery",        links: ["English Saddles", "Dressage Saddles", "Kashmiri Kathis", "Jumping Saddles", "Endurance Saddles"] },
  { heading: "Horse & Stable",  links: ["Turnout Rugs", "Fly Bonnets", "Leather Harnesses", "Halters & Leads", "Grooming Tools"] },
  { heading: "Rider",           links: ["Riding Breeches", "Spurs & Whips", "Stirrups & Girths", "Bridles & Bits", "Crystal Browbands"] },
  { heading: "Company",         links: ["About ZoOwill", "B2B & Bulk Orders", "Export Catalogue", "Contact Us", "WhatsApp Inquiry"] },
];

export default function Footer() {
  return (
    <footer id="contact" style={{ background: "#F3EFEA", borderTop: "1px solid rgba(231,174,175,0.5)", color: "#1A1715", position: "relative", overflow: "hidden" }}>

      {/* ── CTA Banner (NO email form) ── */}
      <div style={{
        borderBottom: "1px solid rgba(231,174,175,0.4)", padding: "60px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap",
        maxWidth: 1280, margin: "0 auto",
      }}>
        <div style={{ maxWidth: 500 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 300, color: "#1A1715", lineHeight: 1.15, marginBottom: 10 }}>
            Request the Full 59-Product Export &amp; Retail Catalogue
          </h3>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: "#736B65", lineHeight: 1.65 }}>
            Wholesale, B2B export, and international retail inquiries welcome. Receive our complete INR-priced product catalogue and pricing sheets.
          </p>
        </div>

        {/* Two clean CTA buttons — NO email form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 240 }}>
          <a href="#featured"
            className="btn btn-dark"
            style={{ justifyContent: "center", textDecoration: "none" }}
          >
            Explore Full Catalogue <ArrowRight size={13} strokeWidth={1.5} />
          </a>
          <a
            href="https://wa.me/919999999999?text=Hi%20ZoOwill%2C%20I%27d%20like%20to%20request%20your%20complete%20product%20catalogue%20with%20pricing."
            target="_blank" rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ justifyContent: "center", textDecoration: "none" }}
          >
            <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp Direct Inquiry
          </a>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 36px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 36 }}>
        {/* Brand col */}
        <div>
          {/* Real logo */}
          <img src="/logo.jpeg" alt="ZoOwill Equestrian" style={{ height: 44, width: "auto", objectFit: "contain", mixBlendMode: "multiply", display: "block", marginBottom: 14 }} />
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#736B65", lineHeight: 1.7, marginBottom: 20 }}>
            Premier International Equestrian Equipment &amp; Horse Accessories
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ Icon: Globe, href: "#" }, { Icon: Mail, href: "mailto:info@zoowill.com" }, { Icon: MessageCircle, href: "https://wa.me/919999999999" }].map(({ Icon, href }, i) => (
              <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(231,174,175,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#736B65", textDecoration: "none", transition: "all 0.25s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1A1715"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "#1A1715"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#736B65"; e.currentTarget.style.borderColor = "rgba(231,174,175,0.4)"; }}
              >
                <Icon size={14} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Category columns */}
        {FOOTER_COLS.map(col => (
          <div key={col.heading}>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A1715", marginBottom: 16 }}>
              {col.heading}
            </p>
            <ul style={{ listStyle: "none" }}>
              {col.links.map(link => (
                <li key={link} style={{ marginBottom: 10 }}>
                  <a href="#featured" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12.5, color: "#736B65", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={e => e.target.style.color = "#1A1715"} onMouseLeave={e => e.target.style.color = "#736B65"}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(231,174,175,0.4)", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1280, margin: "0 auto", flexWrap: "wrap", gap: 10 }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "#736B65", letterSpacing: "0.06em" }}>
          © 2026 ZoOwill Equestrian. All rights reserved.
        </p>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "#736B65" }}>
          Handcrafted in India &bull; Exported Worldwide &bull; All Prices in INR (₹)
        </p>
      </div>

      {/* Giant ZoOwill watermark */}
      <div style={{
        position: "absolute", bottom: -24, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "clamp(80px,14vw,180px)", fontWeight: 300,
        color: "rgba(231,174,175,0.18)", whiteSpace: "nowrap",
        pointerEvents: "none", userSelect: "none", letterSpacing: "-0.02em",
      }}>
        ZoOwill
      </div>
    </footer>
  );
}
