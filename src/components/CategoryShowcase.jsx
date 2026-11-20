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
        ".cat-heading",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".cat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .zw-cat-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .zw-cat-card-img {
          height: 150px;
        }
        .zw-cat-card-body {
          padding: 12px 12px 14px;
        }
        .zw-cat-card-desc {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          line-height: 1.45;
          color: #736B65;
        }
        .zw-cat-card-arrow {
          display: none;
        }

        @media (min-width: 680px) {
          .zw-cat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }
          .zw-cat-card-img {
            height: 200px;
          }
          .zw-cat-card-body {
            padding: 16px 18px 20px;
          }
          .zw-cat-card-desc {
            font-size: 12.5px;
          }
          .zw-cat-card-arrow {
            display: flex;
          }
        }

        @media (min-width: 1040px) {
          .zw-cat-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 20px;
          }
          .zw-cat-card-img {
            height: 220px;
          }
        }
      `}</style>

      <section
        id="categories"
        ref={sectionRef}
        style={{
          padding: "clamp(64px, 8vw, 96px) clamp(14px, 3vw, 24px)",
          background: "#FAF8F5",
          width: "100%",
        }}
      >
        <div
          className="cat-heading"
          style={{ textAlign: "center", maxWidth: 660, margin: "0 auto clamp(32px, 5vw, 52px)" }}
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
            Explore the Collections
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 400,
              color: "#1A1715",
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Everything Your Horse Needs.
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(13.5px, 1.05vw, 14.5px)",
              color: "#736B65",
              lineHeight: 1.65,
            }}
          >
            Explore our range of equestrian equipment, thoughtfully organised for riders, horses and stable essentials.
          </p>
        </div>

        <div className="zw-cat-grid">
          {categoryShowcase.map((cat) => (
            <a
              key={cat.id}
              href="#featured"
              className="cat-card"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("zw:filterCategory", { detail: cat.id }));
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textDecoration: "none",
                borderRadius: 18,
                overflow: "hidden",
                background: "#F3EFEA",
                border: "1px solid rgba(231,174,175,0.38)",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                boxShadow: "0 4px 20px -6px rgba(26,23,21,0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 50px -10px rgba(26,23,21,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px -6px rgba(26,23,21,0.07)";
              }}
            >
              <div className="zw-cat-card-img" style={{ overflow: "hidden", position: "relative" }}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  onError={handleImageError}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.6s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(26,23,21,0.62) 0%, transparent 58%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "rgba(250,248,245,0.92)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(231,174,175,0.4)",
                    borderRadius: 100,
                    padding: "3px 10px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 9.5,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "#1A1715",
                  }}
                >
                  {cat.count} Items
                </div>
                <p
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 12,
                    right: 12,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(17px, 2vw, 21px)",
                    fontWeight: 500,
                    color: "white",
                    lineHeight: 1.18,
                  }}
                >
                  {cat.label}
                </p>
              </div>

              <div
                className="zw-cat-card-body"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <p className="zw-cat-card-desc">{cat.description}</p>
                <div
                  className="zw-cat-card-arrow"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: "1px solid rgba(231,174,175,0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: "white",
                  }}
                >
                  <ArrowUpRight size={15} strokeWidth={1.5} style={{ color: "#1A1715" }} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}