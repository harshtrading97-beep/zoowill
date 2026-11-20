import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, ShoppingBag } from "lucide-react";
import { handleImageError } from "../data/products";
import saddlesKathisImg from "../assets/saddles_&-kathis.webp";

gsap.registerPlugin(ScrollTrigger);

export default function BrandHeritage() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const textRef    = useRef(null);

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
          stagger: 0.09,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 82%" },
        }
      );
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
        }
        @media (min-width: 768px) {
          .zw-heritage-img-box {
            border-radius: 26px;
          }
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

        .zw-heritage-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 48px;
          background: #1A1715;
          color: #FAF8F5;
          padding: 14px 28px;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 12px 28px -8px rgba(26, 23, 21, 0.35);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 520px) {
          .zw-heritage-cta {
            width: auto;
          }
        }
        .zw-heritage-cta:hover {
          background: #D44515;
          transform: translateY(-2px);
          box-shadow: 0 16px 32px -8px rgba(212, 69, 21, 0.45);
        }
        .zw-heritage-cta:hover .zw-cta-arrow {
          transform: translateX(4px);
        }

        /* Dedicated Amazon Storefront Section Below Story */
        .zw-amazon-strip {
          margin-top: 48px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.5);
          border-radius: 22px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 18px 46px -18px rgba(26, 23, 21, 0.09);
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

        .zw-amazon-store-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 48px;
          padding: 14px 26px;
          border-radius: 100px;
          background: #D44515;
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 10px 26px -6px rgba(212, 69, 21, 0.42);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 768px) {
          .zw-amazon-store-btn {
            width: auto;
            flex-shrink: 0;
          }
        }
        .zw-amazon-store-btn:hover {
          background: #1A1715;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -6px rgba(26, 23, 21, 0.35);
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
              {/* Clean Italic Eyebrow */}
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

              {/* Main Editorial Heading */}
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

              {/* Narrative Paragraphs */}
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
                thoughtfully curated collection of equestrian equipment, from
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

              {/* Signature Italic Motto */}
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

              {/* Subheading: The Craft Behind ZoOwill */}
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

              {/* Verified Stats Grid */}
              <div className="reveal-line zw-heritage-stats">
                {[
                  { num: "113+", label: "Official Products" },
                  { num: "08", label: "Curated Collections" },
                  { num: "India", label: "Artisan Heritage & Origin" },
                ].map((stat) => (
                  <div key={stat.label} className="zw-heritage-stat-item">
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(26px, 3vw, 38px)",
                        fontWeight: 400,
                        color: "#1A1715",
                        lineHeight: 1,
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

              {/* Traditional Craftsmanship Line */}
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

              {/* Primary Collection CTA */}
              <div className="reveal-line">
                <a href="#featured" className="zw-heritage-cta">
                  Discover the ZoOwill Collection
                  <ArrowRight
                    size={15}
                    strokeWidth={1.8}
                    className="zw-cta-arrow"
                    style={{ transition: "transform 0.3s ease" }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* ── Dedicated Amazon Storefront Section Below Story ── */}
          <div className="zw-amazon-strip">
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
              <ShoppingBag size={15} strokeWidth={1.8} />
              <span>Explore Our Amazon Store</span>
              <ExternalLink size={14} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}