import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { handleImageError } from "../data/products";
import saddlesKathisImg from "../assets/saddles_&-kathis.webp";
import groomingStableImg from "../assets/grooming-&-stable.webp";

gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  {
    num: "01",
    tag: "Artisan Leatherwork",
    category: "saddles",
    title: "The Saddlery\n& Harness Edit",
    sub: "A curated selection of English dressage & jumping saddles, traditional brass-fitted Kashmiri Kathis, and heavy driving leather harnesses.",
    highlights: ["Dressage & Jumping", "Kashmiri Kathis", "Driving Harnesses"],
    image: saddlesKathisImg,
    cta: "Explore Saddlery",
    href: "#featured",
  },
  {
    num: "02",
    tag: "Daily Care & Protection",
    category: "grooming",
    title: "The Horse & Stable\nEssentials Edit",
    sub: "Practical equipment for everyday horse care and stable routines — from 75-inch waterproof turnout rugs and hoof boots to iron khararas and halters.",
    highlights: ['75" Turnout Rugs', "Hoof & Bell Boots", "Iron Khararas"],
    image: groomingStableImg,
    cta: "Explore Horse Care",
    href: "#featured",
  },
];

export default function Collections() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".coll-heading",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 84%" },
        }
      );

      gsap.fromTo(
        ".coll-card",
        { opacity: 0, y: 36, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.16,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const jumpToCollection = (e, catId) => {
    e.preventDefault();
    e.stopPropagation();
    const el = document.getElementById("featured");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    try {
      sessionStorage.setItem("zw_cat", catId);
    } catch (_) {}
    window.dispatchEvent(new CustomEvent("zw:filterCategory", { detail: catId }));
  };

  return (
    <>
      <style>{`
        .zw-coll-sec {
          padding: 64px 14px 72px;
          background: linear-gradient(180deg, #FAF8F5 0%, #F5F0E9 100%);
          border-top: 1px solid rgba(231, 174, 175, 0.32);
          width: 100%;
          overflow-x: clip;
        }
        @media (min-width: 640px) {
          .zw-coll-sec {
            padding: 84px 24px 92px;
          }
        }
        @media (min-width: 1024px) {
          .zw-coll-sec {
            padding: 108px 28px 116px;
          }
        }

        .zw-coll-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          width: 100%;
        }
        @media (min-width: 840px) {
          .zw-coll-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 26px;
          }
        }

        .zw-coll-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          min-height: 450px;
          width: 100%;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
          border: 1px solid rgba(231, 174, 175, 0.42);
          box-shadow: 0 24px 58px -20px rgba(26, 23, 21, 0.26);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.35s ease;
        }
        @media (min-width: 768px) {
          .zw-coll-card {
            min-height: 545px;
            border-radius: 28px;
            padding: 26px;
          }
        }

        .zw-coll-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 36px 78px -18px rgba(26, 23, 21, 0.38),
                      0 14px 38px -10px rgba(212, 69, 21, 0.32),
                      0 0 0 1.5px rgba(212, 69, 21, 0.55);
          border-color: rgba(212, 69, 21, 0.75);
        }

        .zw-coll-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 82% 16%,
            rgba(255, 224, 198, 0.3) 0%,
            rgba(212, 69, 21, 0.14) 38%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
          z-index: 3;
        }
        .zw-coll-card:hover::before {
          opacity: 1;
        }

        .zw-coll-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.34) 50%,
            transparent 100%
          );
          transform: skewX(-18deg);
          transition: left 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 5;
        }
        .zw-coll-card:hover::after {
          left: 150%;
        }

        .zw-coll-card:hover .zw-coll-bg-img {
          transform: scale(1.07);
          filter: brightness(1.05);
        }

        .zw-coll-top-bar {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .zw-coll-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border-radius: 100px;
          background: rgba(20, 17, 15, 0.48);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.22);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .zw-coll-card:hover .zw-coll-tag-pill {
          background: rgba(20, 17, 15, 0.65);
          border-color: rgba(243, 182, 162, 0.48);
        }

        .zw-coll-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F3B6A2;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .zw-coll-card:hover .zw-coll-dot {
          background: #D44515;
          box-shadow: 0 0 10px #D44515;
        }

        .zw-coll-glass {
          position: relative;
          z-index: 4;
          margin-top: auto;
          background: rgba(22, 19, 17, 0.66);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 20px;
          padding: 18px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
          transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
        }
        .zw-coll-card:hover .zw-coll-glass {
          border-color: rgba(243, 182, 162, 0.45);
          background: rgba(22, 19, 17, 0.76);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22),
                      0 14px 36px -8px rgba(0, 0, 0, 0.38);
        }
        @media (min-width: 768px) {
          .zw-coll-glass {
            border-radius: 22px;
            padding: 26px 28px;
          }
        }

        .zw-coll-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }
        .zw-coll-chip {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.88);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 100px;
          padding: 4px 10px;
        }

        .zw-coll-cta-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          min-height: 46px;
          padding: 6px 6px 6px 20px;
          background: #FAF8F5;
          border: 1px solid rgba(255, 255, 255, 0.55);
          color: #1A1715;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.32),
                      inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      color 0.32s ease,
                      border-color 0.32s ease,
                      box-shadow 0.32s ease;
        }
        @media (min-width: 520px) {
          .zw-coll-cta-btn {
            width: auto;
            justify-content: center;
            padding: 6px 6px 6px 22px;
          }
        }

        .zw-coll-cta-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #D44515 0%, #B8370C 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }

        .zw-coll-cta-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 65%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          transition: left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 1;
        }

        .zw-coll-card:hover .zw-coll-cta-btn,
        .zw-coll-cta-btn:hover {
          color: #FFFFFF;
          border-color: rgba(243, 182, 162, 0.65);
          box-shadow: 0 14px 30px -6px rgba(212, 69, 21, 0.52);
        }
        .zw-coll-cta-btn:hover {
          transform: translateY(-2px);
        }
        .zw-coll-card:hover .zw-coll-cta-btn::before,
        .zw-coll-cta-btn:hover::before {
          transform: scaleX(1);
        }
        .zw-coll-cta-btn:hover::after {
          left: 150%;
        }

        .zw-coll-cta-badge {
          position: relative;
          z-index: 2;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1A1715;
          color: #FAF8F5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-coll-card:hover .zw-coll-cta-badge,
        .zw-coll-cta-btn:hover .zw-coll-cta-badge {
          background: #FFFFFF;
          color: #D44515;
          transform: rotate(45deg);
        }
      `}</style>

      <section id="collections" ref={sectionRef} className="zw-coll-sec">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div
            className="coll-heading"
            style={{
              textAlign: "center",
              maxWidth: 640,
              margin: "0 auto clamp(30px, 5vw, 52px)",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(17px, 1.6vw, 21px)",
                fontWeight: 500,
                color: "#D44515",
                display: "block",
                marginBottom: 8,
              }}
            >
              Selected for the Equestrian Lifestyle
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 400,
                color: "#1A1715",
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              Explore by Collection
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(13px, 1.05vw, 14.5px)",
                color: "#736B65",
                lineHeight: 1.65,
              }}
            >
              Two distinct worlds of Indian equestrian craftsmanship — tailored for riders in the arena and daily care in the stable.
            </p>
          </div>

          <div className="zw-coll-grid">
            {COLLECTIONS.map((coll) => (
              <div
                key={coll.num}
                className="coll-card zw-coll-card"
                onClick={(e) => jumpToCollection(e, coll.category)}
              >
                <img
                  src={coll.image}
                  alt={coll.title}
                  onError={handleImageError}
                  className="zw-coll-bg-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(22,19,17,0.36) 0%, rgba(22,19,17,0.14) 38%, rgba(22,19,17,0.85) 100%)",
                    pointerEvents: "none",
                  }}
                />

                <div className="zw-coll-top-bar">
                  <div className="zw-coll-tag-pill">
                    <span className="zw-coll-dot" />
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 10.5,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255, 255, 255, 0.94)",
                      }}
                    >
                      {coll.num} · {coll.tag}
                    </span>
                  </div>
                </div>

                <div className="zw-coll-glass">
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(25px, 2.7vw, 34px)",
                      fontWeight: 400,
                      color: "#FFFFFF",
                      lineHeight: 1.13,
                      marginBottom: 10,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {coll.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(12.5px, 1vw, 13.5px)",
                      color: "rgba(255, 255, 255, 0.84)",
                      marginBottom: 14,
                      lineHeight: 1.58,
                    }}
                  >
                    {coll.sub}
                  </p>

                  <div className="zw-coll-chips">
                    {coll.highlights.map((item) => (
                      <span key={item} className="zw-coll-chip">
                        {item}
                      </span>
                    ))}
                  </div>

                  <a
                    href={coll.href}
                    onClick={(e) => jumpToCollection(e, coll.category)}
                    className="zw-coll-cta-btn"
                  >
                    <span style={{ position: "relative", zIndex: 2 }}>{coll.cta}</span>
                    <span className="zw-coll-cta-badge" aria-hidden="true">
                      <ArrowUpRight size={15} strokeWidth={2.1} />
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}