import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { bestSellers, formatPrice, handleImageError } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

export default function BestSellers({ onView }) {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bs-heading", { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } });
      gsap.fromTo(".bs-card", { opacity: 0, x: 30 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 86%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="bestsellers" ref={sectionRef} style={{
      padding: "96px 0",
      background: "rgba(243,239,234,0.7)",
      borderTop: "1px solid rgba(231,174,175,0.3)",
      borderBottom: "1px solid rgba(231,174,175,0.3)",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div className="bs-heading" style={{ padding: "0 20px", maxWidth: 1280, margin: "0 auto 44px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ maxWidth: 640 }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D44515", display: "block", marginBottom: 10 }}>
            CUSTOMER FAVOURITES
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 300, color: "#1A1715", lineHeight: 1.1, marginBottom: 14 }}>
            Frequently Explored
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: "#736B65", lineHeight: 1.65 }}>
            Discover some of the standout pieces from the ZoOwill catalogue, from traditional saddles and leather harnesses to essential equipment for everyday riding and horse care.
          </p>
        </div>
        <a href="#featured" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A1715", textDecoration: "none", padding: "10px 20px", borderRadius: 100, border: "1px solid rgba(231,174,175,0.6)", background: "white", transition: "all 0.25s" }}>
          Explore All Products <ArrowRight size={13} strokeWidth={1.5} />
        </a>
      </div>

      {/* Horizontal runway */}
      <div ref={trackRef} style={{ display: "flex", gap: 18, overflowX: "auto", padding: "0 20px 16px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {bestSellers.map((product, i) => (
          <div key={product.id} className="bs-card"
            onClick={() => onView(product)}
            style={{
              flexShrink: 0, width: 256, borderRadius: 18, overflow: "hidden",
              background: "white", border: "1px solid rgba(231,174,175,0.3)",
              cursor: "pointer",
              transition: "all 0.42s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: "0 4px 20px -6px rgba(26,23,21,0.07)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px -8px rgba(26,23,21,0.14)"; e.currentTarget.style.borderColor = "rgba(212,69,21,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px -6px rgba(26,23,21,0.07)"; e.currentTarget.style.borderColor = "rgba(231,174,175,0.3)"; }}
          >
            {/* Image */}
            <div style={{ position: "relative", height: 200, background: "#F3EFEA", overflow: "hidden" }}>
              <img src={product.image} alt={product.name} onError={handleImageError}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              {/* Rank badge */}
              <div style={{
                position: "absolute", top: 12, left: 12, width: 32, height: 32,
                borderRadius: "50%", background: "#D44515", color: "white",
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: "14px 16px 18px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontWeight: 400, color: "#1A1715", lineHeight: 1.3, marginBottom: 10 }}>
                {product.name}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1715" }}>
                  {formatPrice(product.priceINR)}
                </p>
                {/* "View Details →" pill — NO add to cart */}
                <button
                  onClick={e => { e.stopPropagation(); onView(product); }}
                  style={{
                    padding: "6px 14px", borderRadius: 100,
                    background: "#FAF8F5", border: "1px solid rgba(231,174,175,0.6)",
                    color: "#1A1715", cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                    transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#D44515"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "#D44515"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px -4px rgba(212,69,21,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FAF8F5"; e.currentTarget.style.color = "#1A1715"; e.currentTarget.style.borderColor = "rgba(231,174,175,0.6)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
