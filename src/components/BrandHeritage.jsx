import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { handleImageError } from "../data/products";
import saddlesKathisImg from "../assets/saddles_&-kathis.webp";

gsap.registerPlugin(ScrollTrigger);

export default function BrandHeritage() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const textRef    = useRef(null);
  const amazonRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: imgRef.current, start: "top 82%" },
        }
      );

      const imgEl = imgRef.current?.querySelector("img");
      if (imgEl) {
        gsap.to(imgEl, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }

      gsap.fromTo(
        textRef.current.querySelectorAll(".reveal-line"),
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 82%" },
        }
      );

      if (amazonRef.current) {
        gsap.fromTo(
          amazonRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: amazonRef.current, start: "top 88%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .zw-heritage-sec {
          padding: 68px 16px 76px;
          background: linear-gradient(180deg, #FAF8F5 0%, #F4EFE8 100%);
          position: relative;
          width: 100%;
          overflow-x: clip;
        }
        @media (min-width: 640px) {
          .zw-heritage-sec {
            padding: 92px 24px 100px;
          }
        }
        @media (min-width: 1024px) {
          .zw-heritage-sec {
            padding: 120px 32px 124px;
          }
        }

        .zw-heritage-container {
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
        }

        .zw-heritage-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: center;
        }
        @media (min-width: 960px) {
          .zw-heritage-grid {
            grid-template-columns: 0.98fr 1.02fr;
            gap: 64px;
          }
        }

        .zw-heritage-media {
          position: relative;
          width: 100%;
        }

        .zw-heritage-img-box {
          border-radius: 22px;
          overflow: hidden;
          height: clamp(340px, 58vw, 600px);
          position: relative;
          background: #EFE9E1;
          border: 1px solid rgba(231, 174, 175, 0.45);
          box-shadow: 0 28px 70px -22px rgba(26, 23, 21, 0.22);
          transition: border-color 0.35s ease, box-shadow 0.4s ease;
        }
        .zw-heritage-media:hover .zw-heritage-img-box {
          border-color: rgba(212, 69, 21, 0.45);
          box-shadow: 0 32px 76px -20px rgba(26, 23, 21, 0.28),
                      0 10px 28px -10px rgba(212, 69, 21, 0.22);
        }
        @media (min-width: 768px) {
          .zw-heritage-img-box {
            border-radius: 26px;
          }
        }

        /* Subtle Sheen Sweep across Heritage Photo */
        .zw-heritage-img-box::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 65%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.24) 50%,
            transparent 100%
          );
          transform: skewX(-18deg);
          transition: left 0.85s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 3;
        }
        .zw-heritage-media:hover .zw-heritage-img-box::after {
          left: 150%;
        }

        .zw-heritage-caption-card {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          background: rgba(250, 248, 245, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(231, 174, 175, 0.55);
          border-radius: 16px;
          padding: 14px 18px;
          box-shadow: 0 14px 36px -8px rgba(26, 23, 21, 0.16);
          z-index: 5;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.3s ease;
        }
        .zw-heritage-media:hover .zw-heritage-caption-card {
          transform: translateY(-3px);
          border-color: rgba(212, 69, 21, 0.45);
        }
        @media (min-width: 640px) {
          .zw-heritage-caption-card {
            left: auto;
            bottom: 22px;
            right: 22px;
            max-width: 265px;
            padding: 18px 22px;
          }
        }
        @media (min-width: 1024px) {
          .zw-heritage-caption-card {
            bottom: 26px;
            right: -20px;
          }
        }

        .zw-heritage-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          padding: 20px 0;
          border-top: 1px solid rgba(231, 174, 175, 0.45);
          border-bottom: 1px solid rgba(231, 174, 175, 0.45);
        }
        .zw-heritage-stat-item {
          position: relative;
        }
        .zw-heritage-stat-item:not(:last-child)::after {
          content: "";
          position: absolute;
          right: -6px;
          top: 10%;
          height: 80%;
          width: 1px;
          background: rgba(231, 174, 175, 0.4);
        }

        /* ── Bespoke Luxury Story CTA Button ── */
        .zw-heritage-cta {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          width: 100%;
          min-height: 48px;
          background: #1A1715;
          border: 1px solid rgba(231, 174, 175, 0.38);
          color: #FAF8F5;
          padding: 6px 6px 6px 22px;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 12px 28px -8px rgba(26, 23, 21, 0.35),
                      inset 0 1px 0 rgba(255, 255, 255, 0.14);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.32s ease;
        }
        @media (min-width: 520px) {
          .zw-heritage-cta {
            width: auto;
            justify-content: center;
            padding: 6px 6px 6px 24px;
          }
        }

        .zw-heritage-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #D44515 0%, #B8370C 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-heritage-cta::after {
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
          transition: left 0.72s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 1;
        }
        .zw-heritage-cta:hover {
          transform: translateY(-2px);
          border-color: rgba(243, 182, 162, 0.65);
          box-shadow: 0 16px 34px -6px rgba(212, 69, 21, 0.48),
                      inset 0 1px 0 rgba(255, 255, 255, 0.24);
        }
        .zw-heritage-cta:hover::before {
          transform: scaleX(1);
        }
        .zw-heritage-cta:hover::after {
          left: 150%;
        }

        .zw-heritage-cta-badge {
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
        .zw-heritage-cta:hover .zw-heritage-cta-badge {
          background: #FFFFFF;
          border-color: #FFFFFF;
          color: #D44515;
          transform: rotate(45deg);
        }

        /* ── Dedicated Amazon Storefront Section Below Story ── */
        .zw-amazon-strip {
          position: relative;
          overflow: hidden;
          margin-top: 48px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.5);
          border-radius: 22px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 18px 46px -18px rgba(26, 23, 21, 0.09);
          transition: border-color 0.35s ease, box-shadow 0.4s ease, transform 0.35s ease;
        }
        .zw-amazon-strip:hover {
          border-color: rgba(212, 69, 21, 0.45);
          box-shadow: 0 24px 56px -16px rgba(26, 23, 21, 0.14),
                      0 8px 24px -10px rgba(212, 69, 21, 0.16);
        }
        @media (min-width: 768px) {
          .zw-amazon-strip {
            margin-top: 68px;
            border-radius: 26px;
            padding: 34px 40px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 32px;
          }
        }

        /* ── Bespoke Luxury Amazon Store Button ── */
        .zw-amazon-store-btn {
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
          background: linear-gradient(135deg, #D44515 0%, #B8370C 100%);
          border: 1px solid rgba(255, 224, 198, 0.4);
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 12px 28px -6px rgba(212, 69, 21, 0.45),
                      inset 0 1px 0 rgba(255, 255, 255, 0.22);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.32s ease;
        }
        @media (min-width: 768px) {
          .zw-amazon-store-btn {
            width: auto;
            flex-shrink: 0;
            justify-content: center;
            padding: 6px 6px 6px 22px;
          }
        }

        .zw-amazon-store-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #1A1715;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-amazon-store-btn::after {
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
          transition: left 0.72s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 1;
        }
        .zw-amazon-store-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(231, 174, 175, 0.55);
          box-shadow: 0 16px 34px -6px rgba(26, 23, 21, 0.38);
        }
        .zw-amazon-store-btn:hover::before {
          transform: scaleX(1);
        }
        .zw-amazon-store-btn:hover::after {
          left: 150%;
        }

        .zw-amazon-btn-badge {
          position: relative;
          z-index: 2;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #FFFFFF;
          color: #D44515;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.14);
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-amazon-store-btn:hover .zw-amazon-btn-badge {
          background: #D44515;
          color: #FFFFFF;
          transform: rotate(45deg);
        }
      `}</style>

      <section id="about" ref={sectionRef} className="zw-heritage-sec">
        <div className="zw-heritage-container">
          <div className="zw-heritage-grid">
            {/* Left: Visual Showcase Column */}
            <div className="zw-heritage-media">
              <div ref={imgRef} className="zw-heritage-img-box">
                <img
                  src={saddlesKathisImg}
                  alt="ZoOwill Artisan Saddlery & Kashmiri Kathis"
                  onError={handleImageError}
                  style={{
                    width: "100%",
                    height: "114%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(26,23,21,0.02) 55%, rgba(26,23,21,0.38) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Clean Editorial Caption Card */}
              <div className="zw-heritage-caption-card">
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#D44515",
                    marginBottom: 4,
                  }}
                >
                  Traditional Craftsmanship
                </span>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 19,
                    fontWeight: 500,
                    color: "#1A1715",
                    lineHeight: 1.25,
                  }}
                >
                  Handcrafted Saddlery &amp; Equestrian Gear
                </p>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 11.5,
                    color: "#736B65",
                    marginTop: 5,
                    lineHeight: 1.45,
                  }}
                >
                  Harsh International · Kanpur, India
                </p>
              </div>
            </div>

            {/* Right: Editorial Story Column */}
            <div ref={textRef}>
              <div className="reveal-line" style={{ marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(18px, 1.6vw, 22px)",
                    fontWeight: 500,
                    color: "#D44515",
                  }}
                >
                  The Story of ZoOwill
                </span>
              </div>

              <h2
                className="reveal-line"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(31px, 4.2vw, 50px)",
                  fontWeight: 400,
                  color: "#1A1715",
                  lineHeight: 1.12,
                  letterSpacing: "-0.01em",
                  marginBottom: 20,
                }}
              >
                Rooted in Indian Craft. Made for the World of Equestrianism.
              </h2>

              <p
                className="reveal-line"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(13.5px, 1.05vw, 15px)",
                  lineHeight: 1.78,
                  color: "#524A44",
                  marginBottom: 15,
                }}
              >
                ZoOwill brings together the rich heritage of Indian saddlery and
                the evolving needs of modern equestrian life. Inspired by
                generations of traditional craftsmanship, we offer a
                thoughtfully curated collection of equestrian equipment — from
                handcrafted Kashmiri Kathis and traditional Aligarh Rakabs to
                premium leather harnesses, riding saddles, and everyday
                essentials for horses and stables.
              </p>

              <p
                className="reveal-line"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(13.5px, 1.05vw, 15px)",
                  lineHeight: 1.78,
                  color: "#6B625C",
                  marginBottom: 15,
                }}
              >
                Every piece reflects a connection between tradition,
                functionality, and quality. From the intricate detailing of
                brass-fitted Kathis and the distinctive craftsmanship of
                traditional iron Rakabs to contemporary riding essentials, our
                collection celebrates India&apos;s saddlery heritage while
                embracing the standards of modern equestrianism.
              </p>

              <p
                className="reveal-line"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(13.5px, 1.05vw, 15px)",
                  lineHeight: 1.78,
                  color: "#6B625C",
                  marginBottom: 18,
                }}
              >
                Whether for professional riders, horse owners, or equestrian
                enthusiasts, ZoOwill is committed to bringing together products
                that honour tradition and serve the demands of everyday riding.
              </p>

              <p
                className="reveal-line"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  fontWeight: 500,
                  color: "#1A1715",
                  marginBottom: 24,
                }}
              >
                Our Heritage. Your Equestrian Journey.
              </p>

              <div className="reveal-line" style={{ marginBottom: 12 }}>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#8C827A",
                  }}
                >
                  The Craft Behind ZoOwill
                </p>
              </div>

              {/* Evergreen Heritage Pillars (No hardcoded product counts) */}
              <div className="reveal-line zw-heritage-stats">
                {[
                  { num: "08", label: "Curated Disciplines" },
                  { num: "PAN-India", label: "Retail & Wholesale" },
                  { num: "Kanpur", label: "Artisan Saddlery Origin" },
                ].map((stat) => (
                  <div key={stat.label} className="zw-heritage-stat-item">
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(24px, 2.8vw, 36px)",
                        fontWeight: 400,
                        color: "#1A1715",
                        lineHeight: 1.05,
                      }}
                    >
                      {stat.num}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "clamp(9.5px, 0.85vw, 10.5px)",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#736B65",
                        marginTop: 7,
                        lineHeight: 1.35,
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="reveal-line"
                style={{
                  padding: "16px 0 26px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#D44515",
                    marginBottom: 5,
                  }}
                >
                  Traditional Craftsmanship
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(17px, 1.4vw, 20px)",
                    fontWeight: 500,
                    color: "#1A1715",
                    lineHeight: 1.4,
                  }}
                >
                  Kashmiri Brass Kathis &nbsp;·&nbsp; Aligarh Iron Rakabs &nbsp;·&nbsp; Drum-Dyed Leather
                </p>
              </div>

              {/* Bespoke Luxury Collection CTA */}
              <div className="reveal-line">
                <a href="#featured" className="zw-heritage-cta">
                  <span style={{ position: "relative", zIndex: 2 }}>
                    Discover the ZoOwill Collection
                  </span>
                  <span className="zw-heritage-cta-badge" aria-hidden="true">
                    <ArrowUpRight size={15} strokeWidth={2.1} />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Dedicated Amazon Storefront Section Below Story ── */}
          <div ref={amazonRef} className="zw-amazon-strip">
            <div style={{ maxWidth: 640 }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  fontWeight: 500,
                  color: "#D44515",
                  marginBottom: 4,
                }}
              >
                Official ZoOwill Amazon Storefront
              </span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 3vw, 34px)",
                  fontWeight: 400,
                  color: "#1A1715",
                  lineHeight: 1.18,
                  marginBottom: 8,
                }}
              >
                Shop ZoOwill on Amazon
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(13px, 1vw, 14.5px)",
                  color: "#6B625C",
                  lineHeight: 1.62,
                }}
              >
                Explore our official Amazon storefront and discover our complete range of handcrafted saddlery, riding tack, and horse-care essentials with verified PAN-India delivery.
              </p>
            </div>

            <a
              href="https://www.amazon.in/s?k=ZoOwill"
              target="_blank"
              rel="noopener noreferrer"
              className="zw-amazon-store-btn"
            >
              <span
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <ShoppingBag size={14} strokeWidth={1.9} />
                <span>Explore Our Amazon Store</span>
              </span>
              <span className="zw-amazon-btn-badge" aria-hidden="true">
                <ArrowUpRight size={15} strokeWidth={2.1} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}