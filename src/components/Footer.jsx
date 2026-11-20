import {
  Mail,
  MessageCircle,
  Globe,
  ArrowRight,
  ArrowUp,
  MapPin,
} from "lucide-react";

const FOOTER_COLS = [
  {
    heading: "Saddlery",
    cat: "saddles",
    links: [
      { label: "English Saddles", cat: "saddles" },
      { label: "Dressage Saddles", cat: "saddles" },
      { label: "Jumping Saddles", cat: "saddles" },
      { label: "Polo Saddles", cat: "saddles" },
      { label: "Kashmiri Kathis", cat: "saddles" },
    ],
  },
  {
    heading: "Horse & Stable",
    cat: "protection",
    links: [
      { label: "Turnout Rugs & Jhool", cat: "protection" },
      { label: "Fly Veils & Boots", cat: "protection" },
      { label: "Leather Harnesses", cat: "harnesses" },
      { label: "Halters & Rope Leads", cat: "halters" },
      { label: "Grooming & Stable", cat: "grooming" },
    ],
  },
  {
    heading: "Rider & Tack",
    cat: "rider",
    links: [
      { label: "Riding Breeches", cat: "rider" },
      { label: "Body Protectors & Spurs", cat: "rider" },
      { label: "Aligarh Stirrups & Girths", cat: "stirrups" },
      { label: "Bridles & Browbands", cat: "bridles" },
      { label: "Stainless Steel Bits", cat: "bridles" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About ZoOwill", href: "#about" },
      { label: "Full 113 Catalogue", href: "#featured", cat: "all" },
      { label: "Customer Favourites", href: "#bestsellers" },
      {
        label: "Wholesale Enquiries",
        href: "https://wa.me/916394549702?text=Hello%20ZoOwill%2C%20I%20have%20a%20wholesale%20and%20bulk%20enquiry.",
        external: true,
      },
      {
        label: "Email Support",
        href: "mailto:harshtrading97@gmail.com",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const handleLinkClick = (e, link) => {
    if (link.external) return;
    if (link.cat) {
      e.preventDefault();
      const el = document.getElementById("featured");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("zw:filterCategory", { detail: link.cat })
      );
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .zw-footer-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 16px 24px;
          position: relative;
          z-index: 2;
        }
        .zw-footer-cta-card {
          background: linear-gradient(145deg, #FAF8F5 0%, #FFFFFF 100%);
          border: 1px solid rgba(231, 174, 175, 0.55);
          border-radius: 22px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          box-shadow: 0 20px 50px -20px rgba(26, 23, 21, 0.1);
          margin-bottom: 40px;
        }
        .zw-footer-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        .zw-footer-btn-primary,
        .zw-footer-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 46px;
          padding: 13px 22px;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          box-sizing: border-box;
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-footer-btn-primary {
          background: #1A1715;
          color: #FAF8F5;
          box-shadow: 0 10px 24px -6px rgba(26, 23, 21, 0.3);
        }
        .zw-footer-btn-primary:hover {
          background: #D44515;
          transform: translateY(-2px);
        }
        .zw-footer-btn-secondary {
          background: white;
          border: 1px solid rgba(231, 174, 175, 0.8);
          color: #1A1715;
        }
        .zw-footer-btn-secondary:hover {
          border-color: #1A1715;
          background: #FAF8F5;
          transform: translateY(-2px);
        }

        .zw-footer-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          padding-bottom: 36px;
        }
        .zw-footer-brand-box {
          padding-bottom: 26px;
          border-bottom: 1px solid rgba(231, 174, 175, 0.38);
        }
        .zw-footer-links-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 26px 16px;
        }
        .zw-footer-link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12.5px;
          line-height: 1.45;
          color: #6B625C;
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s ease, transform 0.22s ease;
        }
        .zw-footer-link:hover {
          color: #D44515;
          transform: translateX(3px);
        }

        .zw-social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 1px solid rgba(231, 174, 175, 0.6);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #5C544E;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(26, 23, 21, 0.04);
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-social-btn:hover {
          background: #D44515;
          color: white;
          border-color: #D44515;
          transform: translateY(-2px);
        }

        .zw-footer-bottom {
          border-top: 1px solid rgba(231, 174, 175, 0.45);
          padding-top: 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }
        .zw-footer-bottom-meta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .zw-footer-wrap {
            padding: 68px 28px 28px;
          }
          .zw-footer-cta-card {
            border-radius: 26px;
            padding: 44px 48px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 36px;
            margin-bottom: 60px;
          }
          .zw-footer-cta-actions {
            width: auto;
            min-width: 255px;
            flex-shrink: 0;
          }
          .zw-footer-brand-box {
            padding-bottom: 0;
            border-bottom: none;
          }
          .zw-footer-links-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 28px;
          }
          .zw-footer-bottom {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .zw-footer-bottom-meta {
            width: auto;
            justify-content: flex-end;
            gap: 18px;
          }
        }

        @media (min-width: 1024px) {
          .zw-footer-main {
            grid-template-columns: 1.25fr 2.75fr;
            gap: 56px;
            padding-bottom: 44px;
          }
        }
      `}</style>

      <footer
        id="contact"
        style={{
          background: "linear-gradient(180deg, #F3EFEA 0%, #ECE6DE 100%)",
          borderTop: "1px solid rgba(231, 174, 175, 0.5)",
          color: "#1A1715",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="zw-footer-wrap">
          {/* ── Wholesale & Catalogue Enquiries CTA Card ── */}
          <div className="zw-footer-cta-card">
            <div style={{ maxWidth: 640 }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 1.5vw, 20px)",
                  fontWeight: 500,
                  color: "#D44515",
                  marginBottom: 6,
                }}
              >
                For Stables, Clubs &amp; Retail Partners
              </span>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(26px, 4vw, 44px)",
                  fontWeight: 400,
                  color: "#1A1715",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                Looking for Equestrian Equipment in Bulk?
              </h3>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(13px, 1.05vw, 14.5px)",
                  color: "#6B625C",
                  lineHeight: 1.65,
                  marginBottom: 8,
                }}
              >
                Whether you are sourcing for a riding school, equestrian club, stable, or retail store, connect directly with ZoOwill to discuss product availability, custom sizing, and wholesale pricing.
              </p>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11.5,
                  color: "#9A8F86",
                  lineHeight: 1.55,
                }}
              >
                Direct manufacturer supply by Harsh International · Kanpur, India.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="zw-footer-cta-actions">
              <a href="#featured" className="zw-footer-btn-primary">
                Explore 113 Products <ArrowRight size={14} strokeWidth={1.8} />
              </a>
              <a
                href="https://wa.me/916394549702?text=Hello%20ZoOwill%2C%20I%20have%20a%20wholesale%20and%20bulk%20enquiry%20regarding%20your%20equestrian%20catalogue."
                target="_blank"
                rel="noopener noreferrer"
                className="zw-footer-btn-secondary"
              >
                <MessageCircle size={15} strokeWidth={1.8} style={{ color: "#D44515" }} />
                Enquire via WhatsApp
              </a>
            </div>
          </div>

          {/* ── Main Footer Navigation & Brand Info ── */}
          <div className="zw-footer-main">
            {/* Brand Column */}
            <div className="zw-footer-brand-box">
              <a href="#" style={{ display: "inline-block", marginBottom: 14 }}>
                <img
                  src="/logo.jpeg"
                  alt="ZoOwill Equestrian"
                  style={{
                    height: 44,
                    width: "auto",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    display: "block",
                  }}
                />
              </a>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  color: "#6B625C",
                  lineHeight: 1.68,
                  marginBottom: 10,
                  maxWidth: 340,
                }}
              >
                ZoOwill Equestrian brings together traditional Indian saddlery, riding tack, and everyday horse-care essentials in one curated catalogue.
              </p>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16.5,
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#D44515",
                  marginBottom: 14,
                }}
              >
                Crafted for the Horse. Made for the Journey.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11.5,
                  color: "#736B65",
                  marginBottom: 18,
                }}
              >
                <MapPin size={13} strokeWidth={1.8} style={{ color: "#D44515", flexShrink: 0 }} />
                <span>Harsh International · Kanpur, Uttar Pradesh, India</span>
              </div>

              {/* Social & Contact Icons */}
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { Icon: Globe, href: "#featured", label: "Explore Catalogue" },
                  { Icon: Mail, href: "mailto:harshtrading97@gmail.com", label: "Email ZoOwill" },
                  { Icon: MessageCircle, href: "https://wa.me/916394549702", label: "WhatsApp ZoOwill" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="zw-social-btn"
                  >
                    <Icon size={15} strokeWidth={1.7} />
                  </a>
                ))}
              </div>
            </div>

            {/* 4 Category Link Columns */}
            <div className="zw-footer-links-grid">
              {FOOTER_COLS.map((col) => (
                <div key={col.heading}>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#1A1715",
                      marginBottom: 14,
                    }}
                  >
                    {col.heading}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {col.links.map((link) => (
                      <li key={link.label} style={{ marginBottom: 9 }}>
                        <a
                          href={link.href || "#featured"}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          onClick={(e) => handleLinkClick(e, link)}
                          className="zw-footer-link"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom Copyright & Back-to-Top Bar ── */}
          <div className="zw-footer-bottom">
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 11.5,
                color: "#6B625C",
                letterSpacing: "0.03em",
              }}
            >
              © 2026 ZoOwill Equestrian (Harsh International). All rights reserved.
            </p>

            <div className="zw-footer-bottom-meta">
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  color: "#736B65",
                }}
              >
                Indian Saddlery • INR (₹)
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: 100,
                  background: "white",
                  border: "1px solid rgba(231, 174, 175, 0.6)",
                  color: "#1A1715",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1A1715";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#1A1715";
                }}
              >
                Top <ArrowUp size={12} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Giant ZoOwill Watermark */}
        <div
          style={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(64px, 13vw, 170px)",
            fontWeight: 300,
            color: "rgba(212, 69, 21, 0.05)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "-0.02em",
            zIndex: 1,
          }}
        >
          ZoOwill
        </div>
      </footer>
    </>
  );
}