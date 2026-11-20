import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { categoryShowcase, handleImageError } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

export default function CategoryShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cat-heading-item",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 84%",
          },
        }
      );

      gsap.fromTo(
        ".cat-card",
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.065,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".zw-cat-grid",
            start: "top 86%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (e, catId) => {
    e.preventDefault();
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
        .zw-cat-sec {
          padding: 64px 14px 72px;
          background: linear-gradient(180deg, #FAF8F5 0%, #F6F1EB 100%);
          width: 100%;
          overflow-x: clip;
        }
        @media (min-width: 640px) {
          .zw-cat-sec {
            padding: 84px 22px 92px;
          }
        }
        @media (min-width: 1024px) {
          .zw-cat-sec {
            padding: 108px 28px 112px;
          }
        }

        .zw-cat-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }
        @media (min-width: 680px) {
          .zw-cat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }
        }
        @media (min-width: 1040px) {
          .zw-cat-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 22px;
          }
        }

        .zw-cat-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          border-radius: 20px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.42);
          box-shadow: 0 10px 28px -12px rgba(26, 23, 21, 0.08);
          cursor: pointer;
          transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.42s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.32s ease;
        }
        @media (min-width: 768px) {
          .zw-cat-card {
            border-radius: 22px;
          }
        }

        .zw-cat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 52px -14px rgba(26, 23, 21, 0.16);
          border-color: rgba(212, 69, 21, 0.45);
        }

        .zw-cat-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 65%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.24) 50%,
            transparent 100%
          );
          transform: skewX(-18deg);
          transition: left 0.75s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 4;
        }
        .zw-cat-card:hover::after {
          left: 145%;
        }

        .zw-cat-media {
          position: relative;
          aspect-ratio: 4 / 3.2;
          overflow: hidden;
          background: #EFE9E1;
        }
        @media (min-width: 768px) {
          .zw-cat-media {
            aspect-ratio: 4 / 3.4;
          }
        }

        .zw-cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-cat-card:hover .zw-cat-img {
          transform: scale(1.07);
        }

        .zw-cat-body {
          padding: 12px 12px 14px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 8px;
          flex: 1;
          background: #FFFFFF;
        }
        @media (min-width: 768px) {
          .zw-cat-body {
            padding: 16px 18px 18px;
            gap: 12px;
          }
        }

        .zw-cat-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          line-height: 1.48;
          color: #6B625C;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .zw-cat-desc {
            font-size: 12.5px;
            line-height: 1.55;
          }
        }

        .zw-cat-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(231, 174, 175, 0.6);
          background: #FAF8F5;
          color: #1A1715;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 768px) {
          .zw-cat-arrow {
            width: 34px;
            height: 34px;
          }
        }
        .zw-cat-card:hover .zw-cat-arrow {
          background: #D44515;
          border-color: #D44515;
          color: #FFFFFF;
          transform: rotate(45deg);
        }
      `}</style>

      <section id="categories" ref={sectionRef} className="zw-cat-sec">
        <div
          style={{
            textAlign: "center",
            maxWidth: 660,
            margin: "0 auto clamp(30px, 5vw, 52px)",
            padding: "0 4px",
          }}
        >
          <span
            className="cat-heading-item"
            style={{
              display: "block",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(17px, 1.6vw, 21px)",
              fontWeight: 500,
              color: "#D44515",
              marginBottom: 8,
            }}
          >
            The Eight Disciplines
          </span>

          <h2
            className="cat-heading-item"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(31px, 4.8vw, 54px)",
              fontWeight: 400,
              color: "#1A1715",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              marginBottom: 14,
            }}
          >
            Crafted for Every Discipline &amp; Stable Routine.
          </h2>

          <p
            className="cat-heading-item"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(13px, 1.05vw, 14.5px)",
              color: "#6B625C",
              lineHeight: 1.65,
            }}
          >
            Discover handcrafted Indian saddlery, precision bridles, and everyday horse-care essentials — thoughtfully organised for riders, trainers, and stables.
          </p>
        </div>

        <div className="zw-cat-grid">
          {categoryShowcase.map((cat, idx) => (
            <a
              key={cat.id}
              href="#featured"
              onClick={(e) => handleCategoryClick(e, cat.id)}
              className="cat-card zw-cat-card"
            >
              <div className="zw-cat-media">
                <img
                  src={cat.image}
                  alt={cat.label}
                  onError={handleImageError}
                  className="zw-cat-img"
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(26,23,21,0.22) 0%, rgba(26,23,21,0.05) 45%, rgba(26,23,21,0.74) 100%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    right: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.92)",
                      textShadow: "0 1px 4px rgba(0,0,0,0.35)",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <span
                    style={{
                      background: "rgba(250, 248, 245, 0.92)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(231, 174, 175, 0.45)",
                      borderRadius: 100,
                      padding: "3px 9px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 9.5,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: "#1A1715",
                    }}
                  >
                    {cat.count} {cat.count === 1 ? "Item" : "Items"}
                  </span>
                </div>

                <h3
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 12,
                    right: 12,
                    margin: 0,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(17px, 1.9vw, 22px)",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    lineHeight: 1.18,
                    zIndex: 2,
                  }}
                >
                  {cat.label}
                </h3>
              </div>

              <div className="zw-cat-body">
                <p className="zw-cat-desc">{cat.description}</p>
                <span className="zw-cat-arrow" aria-hidden="true">
                  <ArrowUpRight size={14} strokeWidth={1.7} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}