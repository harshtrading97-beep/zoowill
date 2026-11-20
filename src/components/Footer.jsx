import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  MessageCircle,
  Globe,
  ArrowUpRight,
  ArrowUp,
  MapPin,
  Phone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
      { label: "Complete Catalogue", href: "#featured", cat: "all" },
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

const WHATSAPP_BULK_URL =
  "https://wa.me/916394549702?text=Hello%20ZoOwill%20Equestrian%2C%20I%20have%20a%20wholesale%20and%20bulk%20enquiry%20regarding%20your%20catalogue.";

export default function Footer() {
  const footerRef = useRef(null);
  const ctaRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e, link) => {
    if (link.external) return;
    if (link.cat) {
      e.preventDefault();
      const el = document.getElementById("featured");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      try {
        sessionStorage.setItem("zw_cat", link.cat);
      } catch (_) { /* noop */ }
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
          padding: 44px 14px 24px;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 640px) {
          .zw-footer-wrap {
            padding: 60px 22px 26px;
          }
        }
        @media (min-width: 1024px) {
          .zw-footer-wrap {
            padding: 76px 28px 30px;
          }
        }

        /* ── Wholesale CTA Card with Hover Glow & Sheen ── */
        .zw-footer-cta-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, #FAF8F5 0%, #FFFFFF 100%);
          border: 1px solid rgba(231, 174, 175, 0.55);
          border-radius: 22px;
          padding: 24px 18px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          box-shadow: 0 20px 50px -20px rgba(26, 23, 21, 0.1);
          margin-bottom: 42px;
          transition: border-color 0.35s ease, box-shadow 0.4s ease;
        }
        .zw-footer-cta-card:hover {
          border-color: rgba(212, 69, 21, 0.45);
          box-shadow: 0 26px 60px -18px rgba(26, 23, 21, 0.15),
                      0 10px 28px -10px rgba(212, 69, 21, 0.16);
        }
        .zw-footer-cta-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.45) 50%,
            transparent 100%
          );
          transform: skewX(-18deg);
          transition: left 0.85s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .zw-footer-cta-card:hover::after {
          left: 150%;
        }

        .zw-footer-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        /* ── Bespoke Luxury Primary Button ── */
        .zw-footer-btn-primary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          min-height: 48px;
          padding: 6px 6px 6px 20px;
          border-radius: 100px;
          background: #1A1715;
          border: 1px solid rgba(231, 174, 175, 0.38);
          color: #FAF8F5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          box-sizing: border-box;
          box-shadow: 0 10px 24px -6px rgba(26, 23, 21, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.14);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.32s ease;
        }
        .zw-footer-btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #D44515 0%, #B8370C 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-footer-btn-primary::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 65%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          transition: left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 1;
        }
        .zw-footer-btn-primary:hover {
          transform: translateY(-2px);
          border-color: rgba(243, 182, 162, 0.65);
          box-shadow: 0 14px 30px -6px rgba(212, 69, 21, 0.45);
        }
        .zw-footer-btn-primary:hover::before {
          transform: scaleX(1);
        }
        .zw-footer-btn-primary:hover::after {
          left: 150%;
        }

        .zw-footer-primary-badge {
          position: relative;
          z-index: 2;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #FAF8F5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-footer-btn-primary:hover .zw-footer-primary-badge {
          background: #FFFFFF;
          border-color: #FFFFFF;
          color: #D44515;
          transform: rotate(45deg);
        }

        /* ── Bespoke Luxury Secondary Button ── */
        .zw-footer-btn-secondary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          min-height: 48px;
          padding: 6px 6px 6px 20px;
          border-radius: 100px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.78);
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          box-sizing: border-box;
          box-shadow: 0 6px 18px -6px rgba(26, 23, 21, 0.08);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      color 0.32s ease,
                      border-color 0.32s ease,
                      box-shadow 0.32s ease;
        }
        .zw-footer-btn-secondary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #1A1715;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-footer-btn-secondary:hover {
          color: #FAF8F5;
          border-color: #1A1715;
          transform: translateY(-2px);
          box-shadow: 0 12px 26px -6px rgba(26, 23, 21, 0.25);
        }
        .zw-footer-btn-secondary:hover::before {
          transform: scaleX(1);
        }

        .zw-footer-secondary-badge {
          position: relative;
          z-index: 2;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #FAF8F5;
          border: 1px solid rgba(231, 174, 175, 0.65);
          color: #D44515;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-footer-btn-secondary:hover .zw-footer-secondary-badge {
          background: #D44515;
          border-color: #D44515;
          color: #FFFFFF;
          transform: rotate(45deg);
        }

        /* ── Main Footer Columns ── */
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

        .zw-footer-contact-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }
        .zw-footer-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 100px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.55);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          color: #4A433E;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .zw-footer-chip:hover {
          border-color: #D44515;
          color: #D44515;
          transform: translateY(-1px);
        }

        .zw-footer-links-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 26px 16px;
        }
        .zw-footer-link {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12.5px;
          line-height: 1.48;
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
          background: #FFFFFF;
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
          color: #FFFFFF;
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

        .zw-back-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 100px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.65);
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-back-top-btn:hover {
          background: #1A1715;
          border-color: #1A1715;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        @media (min-width: 768px) {
          .zw-footer-cta-card {
            border-radius: 26px;
            padding: 40px 44px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 36px;
            margin-bottom: 60px;
          }
          .zw-footer-cta-actions {
            width: auto;
            min-width: 265px;
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
        ref={footerRef}
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
          <div ref={ctaRef} className="zw-footer-cta-card">
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

            {/* Bespoke Luxury Action Buttons */}
            <div className="zw-footer-cta-actions">
              <a href="#featured" className="zw-footer-btn-primary">
                <span style={{ position: "relative", zIndex: 2 }}>
                  Explore the Catalogue
                </span>
                <span className="zw-footer-primary-badge" aria-hidden="true">
                  <ArrowUpRight size={15} strokeWidth={2.1} />
                </span>
              </a>

              <a
                href={WHATSAPP_BULK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="zw-footer-btn-secondary"
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <MessageCircle size={14} strokeWidth={1.9} style={{ color: "#D44515" }} />
                  <span>Enquire via WhatsApp</span>
                </span>
                <span className="zw-footer-secondary-badge" aria-hidden="true">
                  <ArrowUpRight size={15} strokeWidth={2} />
                </span>
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
                  marginBottom: 14,
                }}
              >
                <MapPin size={13} strokeWidth={1.8} style={{ color: "#D44515", flexShrink: 0 }} />
                <span>Harsh International · Kanpur, Uttar Pradesh, India</span>
              </div>

              {/* Direct Clickable Contact Chips (Mobile & Desktop friendly) */}
              <div className="zw-footer-contact-chips">
                <a href="tel:+916394549702" className="zw-footer-chip">
                  <Phone size={12} strokeWidth={2} style={{ color: "#D44515" }} />
                  <span>+91 63945 49702</span>
                </a>
                <a href="mailto:harshtrading97@gmail.com" className="zw-footer-chip">
                  <Mail size={12} strokeWidth={2} style={{ color: "#D44515" }} />
                  <span>harshtrading97@gmail.com</span>
                </a>
              </div>

              {/* Social & Quick Action Icons */}
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
                className="zw-back-top-btn"
              >
                <span>Top</span>
                <ArrowUp size={12} strokeWidth={2} />
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