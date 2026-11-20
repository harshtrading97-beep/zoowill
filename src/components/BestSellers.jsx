import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { bestSellers, formatPrice, handleImageError } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

export default function BestSellers({ onView }) {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  const [canPrev, setCanPrev]         = useState(false);
  const [canNext, setCanNext]         = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;

    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0 && bestSellers.length > 1) {
      const ratio = Math.min(1, Math.max(0, el.scrollLeft / maxScroll));
      const idx = Math.round(ratio * (bestSellers.length - 1));
      setActiveIndex(idx);
    }
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bs-heading",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 84%" },
        }
      );
      gsap.fromTo(
        ".bs-card",
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 86%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTrack = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const step = window.innerWidth < 640 ? 276 : 620;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToCard = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".bs-card");
    const target = cards[index];
    if (target) {
      el.scrollTo({
        left: target.offsetLeft - el.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{`
        .zw-bs-sec {
          padding: 64px 0 72px;
          background: linear-gradient(180deg, #F4EFE8 0%, #FAF8F5 100%);
          border-top: 1px solid rgba(231, 174, 175, 0.35);
          border-bottom: 1px solid rgba(231, 174, 175, 0.35);
          width: 100%;
          overflow-x: clip;
        }
        @media (min-width: 768px) {
          .zw-bs-sec {
            padding: 96px 0 104px;
          }
        }

        .zw-bs-header {
          padding: 0 16px;
          max-width: 1280px;
          margin: 0 auto 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        @media (min-width: 768px) {
          .zw-bs-header {
            padding: 0 28px;
            margin-bottom: 42px;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 24px;
          }
        }

        .zw-bs-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .zw-bs-controls {
            width: auto;
            justify-content: flex-end;
          }
        }

        .zw-bs-arrows {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .zw-bs-arrow-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(231, 174, 175, 0.65);
          background: #FFFFFF;
          color: #1A1715;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(26, 23, 21, 0.05);
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-bs-arrow-btn:hover:not(:disabled) {
          background: #1A1715;
          color: #FFFFFF;
          border-color: #1A1715;
          transform: translateY(-1px);
        }
        .zw-bs-arrow-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .zw-bs-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 40px;
          padding: 0 20px;
          border-radius: 100px;
          border: 1px solid rgba(231, 174, 175, 0.7);
          background: #FFFFFF;
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(26, 23, 21, 0.04);
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-bs-explore-btn:hover {
          background: #1A1715;
          color: #FFFFFF;
          border-color: #1A1715;
          transform: translateY(-2px);
        }

        /* Horizontal Snap Track */
        .zw-bs-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 10px max(16px, calc((100vw - 1280px) / 2 + 28px)) 24px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .zw-bs-track::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 768px) {
          .zw-bs-track {
            gap: 22px;
          }
        }

        /* Card Design with Glow & Sheen Sweep */
        .zw-bs-card {
          position: relative;
          flex-shrink: 0;
          width: 264px;
          scroll-snap-align: start;
          border-radius: 22px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.42);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 28px -12px rgba(26, 23, 21, 0.08);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.32s ease;
        }
        @media (min-width: 768px) {
          .zw-bs-card {
            width: 300px;
          }
        }
        .zw-bs-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 52px -14px rgba(26, 23, 21, 0.16),
                      0 0 0 1px rgba(212, 69, 21, 0.22);
          border-color: rgba(212, 69, 21, 0.5);
        }

        /* Light Sheen Sweep on Hover */
        .zw-bs-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 65%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 100%
          );
          transform: skewX(-18deg);
          transition: left 0.75s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 4;
        }
        .zw-bs-card:hover::after {
          left: 145%;
        }

        .zw-bs-card:hover .zw-bs-img {
          transform: scale(1.07);
        }
        .zw-bs-card:hover .zw-bs-details-btn {
          background: #D44515;
          color: #FFFFFF;
          border-color: #D44515;
        }

        .zw-bs-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 500;
          color: #1A1715;
          line-height: 1.28;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 46px;
          margin-bottom: 12px;
        }

        .zw-bs-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 12px;
          padding: 0 16px;
        }
      `}</style>

      <section id="bestsellers" ref={sectionRef} className="zw-bs-sec">
        {/* Header */}
        <div className="bs-heading zw-bs-header">
          <div style={{ maxWidth: 620 }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(17px, 1.6vw, 21px)",
                fontWeight: 500,
                color: "#D44515",
                marginBottom: 6,
              }}
            >
              Customer Favourites
            </span>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(30px, 4.8vw, 54px)",
                fontWeight: 400,
                color: "#1A1715",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: 10,
              }}
            >
              Frequently Explored
            </h2>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(13px, 1.05vw, 14.5px)",
                color: "#736B65",
                lineHeight: 1.62,
              }}
            >
              Standout pieces from the ZoOwill catalogue — from handcrafted Kashmiri Kathis and leather harnesses to everyday riding essentials.
            </p>
          </div>

          {/* Navigation Arrows + Explore Link */}
          <div className="zw-bs-controls">
            <div className="zw-bs-arrows">
              <button
                type="button"
                aria-label="Scroll left"
                disabled={!canPrev}
                onClick={() => scrollTrack(-1)}
                className="zw-bs-arrow-btn"
              >
                <ChevronLeft size={17} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                disabled={!canNext}
                onClick={() => scrollTrack(1)}
                className="zw-bs-arrow-btn"
              >
                <ChevronRight size={17} strokeWidth={1.8} />
              </button>
            </div>

            <a href="#featured" className="zw-bs-explore-btn">
              Explore All <ArrowRight size={13} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* Horizontal Runway */}
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="zw-bs-track"
        >
          {bestSellers.map((product, i) => (
            <div
              key={product.id}
              className="bs-card zw-bs-card"
              onClick={() => onView(product)}
            >
              <div>
                {/* Image Frame */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    background: "#F3EFEA",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={handleImageError}
                    className="zw-bs-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(26,23,21,0) 60%, rgba(26,23,21,0.2) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Rank Number */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      padding: "4px 10px",
                      borderRadius: 100,
                      background: "#1A1715",
                      color: "#FAF8F5",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    #{String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Rating & Savings Tag */}
                  {product.rating && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 10px",
                        borderRadius: 100,
                        background: "rgba(255, 255, 255, 0.94)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#1A1715",
                      }}
                    >
                      <Star size={11} fill="#D44515" color="#D44515" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                {/* Product Meta & Title */}
                <div style={{ padding: "15px 16px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 9.5,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#8C827A",
                      }}
                    >
                      {product.category}
                    </span>

                    {product.discount && (
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#D44515",
                        }}
                      >
                        {product.discount}
                      </span>
                    )}
                  </div>

                  <p className="zw-bs-title">{product.name}</p>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div
                style={{
                  padding: "12px 16px 16px",
                  borderTop: "1px solid rgba(231, 174, 175, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1A1715",
                      lineHeight: 1.2,
                    }}
                  >
                    {formatPrice(product.priceINR)}
                  </p>
                  {product.mrp && product.mrp > product.priceINR && (
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 11,
                        color: "#9A8F86",
                        textDecoration: "line-through",
                        marginTop: 2,
                      }}
                    >
                      {formatPrice(product.mrp)}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(product);
                  }}
                  className="zw-bs-details-btn"
                  style={{
                    padding: "8px 14px",
                    borderRadius: 100,
                    background: "#FAF8F5",
                    border: "1px solid rgba(231, 174, 175, 0.65)",
                    color: "#1A1715",
                    cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "all 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Progress Dots */}
        <div className="zw-bs-dots">
          {bestSellers.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to item ${idx + 1}`}
              onClick={() => scrollToCard(idx)}
              style={{
                width: activeIndex === idx ? 22 : 7,
                height: 7,
                borderRadius: 100,
                border: "none",
                padding: 0,
                background:
                  activeIndex === idx ? "#D44515" : "rgba(26, 23, 21, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}