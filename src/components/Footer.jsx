import { Mail, MessageCircle, Globe, ArrowRight } from "lucide-react";

const FOOTER_COLS = [
  { heading: "Saddlery",        links: ["English Saddles", "Dressage Saddles", "Jumping Saddles", "Endurance Saddles", "Kashmiri Kathis"] },
  { heading: "Horse & Stable",  links: ["Turnout Rugs", "Fly Veils & Protection", "Leather Harnesses", "Halters & Leads", "Grooming Essentials"] },
  { heading: "Rider Equipment", links: ["Riding Breeches", "Spurs & Riding Sticks", "Stirrups & Straps", "Bridles & Bits", "Browbands"] },
  { heading: "Company",         links: ["About ZoOwill", "Product Catalogue", "Wholesale Enquiries", "Contact Us", "WhatsApp Enquiries"] },
];

export default function Footer() {
  return (
    <footer id="contact" style={{ background: "#F3EFEA", borderTop: "1px solid rgba(231,174,175,0.5)", color: "#1A1715", position: "relative", overflow: "hidden" }}>

      {/* ── Wholesale & Catalogue Enquiries CTA Banner ── */}
      <div style={{
        borderBottom: "1px solid rgba(231,174,175,0.4)", padding: "60px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap",
        maxWidth: 1280, margin: "0 auto",
      }}>
        <div style={{ maxWidth: 640 }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D44515", display: "block", marginBottom: 10 }}>
            RETAIL • WHOLESALE • B2B
          </span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 300, color: "#1A1715", lineHeight: 1.18, marginBottom: 12 }}>
            Looking for Equestrian Equipment in Bulk?
          </h3>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: "#736B65", lineHeight: 1.65, marginBottom: 10 }}>
            Whether you are sourcing for a riding school, equestrian club, stable or retail business, connect with ZoOwill to discuss product availability, bulk requirements and wholesale enquiries.
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12.5, color: "#9E948C", lineHeight: 1.6 }}>
            Request the complete product catalogue and enquire about pricing, available sizes and supply options.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 240 }}>
          <a href="#featured"
            className="btn btn-dark"
            style={{ justifyContent: "center", textDecoration: "none" }}
          >
            Request Full Catalogue <ArrowRight size={13} strokeWidth={1.5} />
          </a>
          <a
            href="https://wa.me/916394549702?text=Hello%20ZoOwill%2C%20I%20have%20a%20wholesale%20and%20bulk%20enquiry%20regarding%20your%20equestrian%20catalogue."
            target="_blank" rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ justifyContent: "center", textDecoration: "none" }}
          >
            <MessageCircle size={14} strokeWidth={1.5} /> Enquire via WhatsApp
          </a>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 24px 36px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 36 }}>
        {/* Brand col */}
        <div>
          {/* Real logo */}
          <img src="/logo.jpeg" alt="ZoOwill Equestrian" style={{ height: 44, width: "auto", objectFit: "contain", mixBlendMode: "multiply", display: "block", marginBottom: 14 }} />
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#736B65", lineHeight: 1.7, marginBottom: 10 }}>
            ZoOwill Equestrian brings together saddlery, riding equipment and horse-care essentials in one curated collection. Explore products for horses, riders and stables.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontStyle: "italic", color: "#D44515", marginBottom: 20 }}>
            Crafted for the Horse. Made for the Journey.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ Icon: Globe, href: "#" }, { Icon: Mail, href: "mailto:harshtrading97@gmail.com" }, { Icon: MessageCircle, href: "https://wa.me/916394549702" }].map(({ Icon, href }, i) => (
              <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(231,174,175,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#736B65", textDecoration: "none", transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#D44515"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "#D44515"; e.currentTarget.style.transform = "translateY(-2px) scale(1.08)"; e.currentTarget.style.boxShadow = "0 6px 16px -4px rgba(212,69,21,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#736B65"; e.currentTarget.style.borderColor = "rgba(231,174,175,0.4)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
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
                  <a href="#featured" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12.5, color: "#736B65", textDecoration: "none", transition: "all 0.22s ease", display: "inline-block" }}
                    onMouseEnter={e => { e.target.style.color = "#D44515"; e.target.style.transform = "translateX(3px)"; }}
                    onMouseLeave={e => { e.target.style.color = "#736B65"; e.target.style.transform = "translateX(0)"; }}>
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
          Indian Saddlery Traditions &bull; Equestrian Equipment &bull; Prices in INR (₹)
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
