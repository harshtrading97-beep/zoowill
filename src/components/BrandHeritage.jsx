import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { handleImageError } from "../data/products";
import saddlesKathisImg from "../assets/saddles_&-kathis.webp";

gsap.registerPlugin(ScrollTrigger);

export default function BrandHeritage() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth image reveal
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: imgRef.current, start: "top 80%" },
        }
      );

      // Subtle parallax on image
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

      // Staggered text & stat reveals
      gsap.fromTo(
        textRef.current.querySelectorAll(".reveal-line"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .zw-heritage-grid {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 44px;
          align-items: center;
        }
        .zw-heritage-media {
          position: relative;
          width: 100%;
        }
        .zw-heritage-img-box {
          border-radius: 26px;
          overflow: hidden;
          height: clamp(360px, 56vw, 580px);
          position: relative;
          background: #EFE9E1;
          border: 1px solid rgba(231, 174, 175, 0.45);
          box-shadow: 0 28px 70px -22px rgba(26, 23, 21, 0.22);
        }
        .zw-heritage-badge {
          position: absolute;
          bottom: 18px;
          right: 18px;
          left: 18px;
          background: rgba(250, 248, 245, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(231, 174, 175, 0.55);
          border-radius: 18px;
          padding: 16px 20px;
          box-shadow: 0 14px 36px -8px rgba(26, 23, 21, 0.16);
          z-index: 5;
        }
        .zw-heritage-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 22px 0;
          margin-bottom: 32px;
          border-top: 1px solid rgba(231, 174, 175, 0.45);
          border-bottom: 1px solid rgba(231, 174, 175, 0.45);
        }
        .zw-heritage-stat-item {
          position: relative;
        }
        .zw-heritage-stat-item:not(:last-child)::after {
          content: "";
          position: absolute;
          right: -8px;
          top: 12%;
          height: 76%;
          width: 1px;
          background: rgba(231, 174, 175, 0.4);
        }
        .zw-heritage-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1A1715;
          color: #FAF8F5;
          padding: 15px 30px;
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
        .zw-heritage-cta:hover {
          background: #D44515;
          transform: translateY(-2px);
          box-shadow: 0 16px 32px -8px rgba(212, 69, 21, 0.45);
        }
        .zw-heritage-cta:hover .zw-cta-arrow {
          transform: translateX(4px);
        }

        @media (min-width: 640px) {
          .zw-heritage-badge {
            left: auto;
            bottom: 24px;
            right: 24px;
            max-width: 250px;
            padding: 18px 22px;
          }
        }

        @media (min-width: 960px) {
          .zw-heritage-grid {
            grid-template-columns: 1.02fr 0.98fr;
            gap: 68px;
          }
          .zw-heritage-badge {
            bottom: 28px;
            right: -22px;
          }
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        style={{
          padding: "clamp(72px, 10vw, 128px) clamp(18px, 4vw, 32px)",
          background: "linear-gradient(180deg, #FAF8F5 0%, #F5F0E9 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
              {/* Subtle warm vignette */}
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

            {/* Floating Heritage Card */}
            <div className="zw-heritage-badge">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "rgba(212, 69, 21, 0.12)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#D44515",
                    flexShrink: 0,
                  }}
                >
                  <Award size={14} strokeWidth={1.8} />
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#D44515",
                  }}
                >
                  Indian Craftsmanship
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
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
            {/* Eyebrow Pill */}
            <div className="reveal-line" style={{ marginBottom: 16 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 100,
                  background: "rgba(212, 69, 21, 0.08)",
                  border: "1px solid rgba(212, 69, 21, 0.2)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D44515",
                }}
              >
                <Sparkles size={12} strokeWidth={1.8} />
                The Story of ZoOwill
              </span>
            </div>

            {/* Heading */}
            <h2
              className="reveal-line"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4.2vw, 52px)",
                fontWeight: 400,
                color: "#1A1715",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                marginBottom: 22,
              }}
            >
              Where Indian Saddlery Meets the World of Equestrianism.
            </h2>

            {/* Narrative Paragraphs */}
            <p
              className="reveal-line"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(14px, 1.05vw, 15px)",
                lineHeight: 1.78,
                color: "#5C544E",
                marginBottom: 16,
              }}
            >
              ZoOwill brings together a diverse range of equestrian equipment
              inspired by India&apos;s longstanding saddlery traditions and the
              practical needs of today&apos;s riders. Our collection spans
              traditional Kashmiri Kathis, heavy driving leather harnesses,
              riding saddles, and essential gear for daily horse and stable care.
            </p>

            <p
              className="reveal-line"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(14px, 1.05vw, 15px)",
                lineHeight: 1.78,
                color: "#736B65",
                marginBottom: 26,
              }}
            >
              From the distinctive detailing of brass-fitted Kathis and the
              traditional form of Aligarh Rakabs to contemporary riding
              apparel, every product is crafted with clear specifications to
              help riders and stables make confident, informed choices.
            </p>

            {/* Craftsmanship Highlight Tags */}
            <div
              className="reveal-line"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 28,
              }}
            >
              {[
                "Kashmiri Brass Kathis",
                "Aligarh Iron Rakabs",
                "Drum-Dyed Leather",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 14px",
                    borderRadius: 100,
                    background: "white",
                    border: "1px solid rgba(231, 174, 175, 0.45)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 11.5,
                    fontWeight: 500,
                    color: "#1A1715",
                  }}
                >
                  <ShieldCheck size={13} strokeWidth={1.8} style={{ color: "#D44515" }} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Responsive Stats Grid */}
            <div className="reveal-line zw-heritage-stats">
              {[
                { num: "113", label: "Official Products" },
                { num: "08", label: "Curated Collections" },
                { num: "India", label: "Artisan Origin" },
              ].map((stat) => (
                <div key={stat.label} className="zw-heritage-stat-item">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(28px, 3.2vw, 40px)",
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
                      fontSize: "clamp(9.5px, 0.9vw, 11px)",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#736B65",
                      marginTop: 7,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
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
      </section>
    </>
  );
}