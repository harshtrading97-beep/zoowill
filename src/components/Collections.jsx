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
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
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
    } catch (_) { /* noop */ }
    window.dispatchEvent(new CustomEvent("zw:filterCategory", { detail: catId }));
  };

  return (
    <>
      <style>{`
        .zw-coll-sec {
          padding: 64px 14px 72px;
          background: #FAF8F5;
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
            padding: 104px 28px 112px;
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
            gap: 24px;
          }
        }

        .zw-coll-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          min-height: 420px;
          width: 100%;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 18px;
          border: 1px solid rgba(231, 174, 175, 0.35);
          box-shadow: 0 22px 55px -20px rgba(26, 23, 21, 0.25);
          transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.42s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.3s ease;
        }
        @media (min-width: 768px) {
          .zw-coll-card {
            min-height: 520px;
            border-radius: 28px;
            padding: 26px;
          }
        }
        .zw-coll-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 70px -18px rgba(26, 23, 21, 0.34);
          border-color: rgba(212, 69, 21, 0.45);
        }
        .zw-coll-card:hover .zw-coll-bg-img {
          transform: scale(1.06);
        }
        .zw-coll-card:hover .zw-coll-cta-btn {
          background: #D44515;
          color: #FFFFFF;
        }

        .zw-coll-top-bar {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .zw-coll-glass {
          position: relative;
          z-index: 4;
          margin-top: auto;
          background: rgba(24, 21, 19, 0.62);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 18px;
          padding: 18px;
        }
        @media (min-width: 768px) {
          .zw-coll-glass {
            border-radius: 20px;
            padding: 24px 26px;
          }
        }

        .zw-coll-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 44px;
          padding: 11px 22px;
          background: #FFFFFF;
          color: #1A1715;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.28);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 520px) {
          .zw-coll-cta-btn {
            width: auto;
          }
        }
      `}</style>

      <section id="collections" ref={sectionRef} className="zw-coll-sec">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          {/* Editorial Header */}
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

          {/* Two-Card Grid */}
          <div className="zw-coll-grid">
            {COLLECTIONS.map((coll) => (
              <div
                key={coll.num}
                className="coll-card zw-coll-card"
                onClick={(e) => jumpToCollection(e, coll.category)}
              >
                {/* Background Image */}
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
                    transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />

                {/* Warm Directional Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(26,23,21,0.34) 0%, rgba(26,23,21,0.16) 40%, rgba(26,23,21,0.82) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Top Editorial Number & Tag */}
                <div className="zw-coll-top-bar">
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 16,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    {coll.num} — {coll.tag}
                  </span>
                </div>

                {/* Bottom Glass Content Panel */}
                <div className="zw-coll-glass">
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(24px, 2.6vw, 32px)",
                      fontWeight: 400,
                      color: "#FFFFFF",
                      lineHeight: 1.14,
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
                      marginBottom: 18,
                      lineHeight: 1.58,
                    }}
                  >
                    {coll.sub}
                  </p>

                  {/* Primary Action CTA */}
                  <a
                    href={coll.href}
                    onClick={(e) => jumpToCollection(e, coll.category)}
                    className="zw-coll-cta-btn"
                  >
                    {coll.cta} <ArrowUpRight size={14} strokeWidth={1.8} />
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