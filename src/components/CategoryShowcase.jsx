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
      gsap.fromTo(".cat-heading", { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } });
      gsap.fromTo(".cat-card", { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="categories" ref={sectionRef} style={{ padding: "96px 20px", background: "#FAF8F5" }}>
      {/* Header */}
      <div className="cat-heading" style={{ textAlign: "center", marginBottom: 52 }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D44515", display: "block", marginBottom: 10 }}>
          Explore the Range
        </span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 300, color: "#1A1715", lineHeight: 1.1 }}>
          Shop by Category
        </h2>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, maxWidth: 1280, margin: "0 auto" }}>
        {categoryShowcase.map((cat) => (
          <a key={cat.id} href="#featured" className="cat-card"
            style={{ display: "block", textDecoration: "none", borderRadius: 18, overflow: "hidden", background: "#F3EFEA", border: "1px solid rgba(231,174,175,0.35)", position: "relative", cursor: "pointer",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
              boxShadow: "0 4px 20px -6px rgba(26,23,21,0.07)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 50px -10px rgba(26,23,21,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px -6px rgba(26,23,21,0.07)"; }}
          >
            {/* Image */}
            <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
              <img src={cat.image} alt={cat.label} onError={handleImageError}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"}
              />
              {/* Dark gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,21,0.5) 0%, transparent 55%)" }} />
              {/* Count pill */}
              <div style={{
                position: "absolute", top: 14, left: 14,
                background: "rgba(250,248,245,0.92)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(231,174,175,0.4)", borderRadius: 100,
                padding: "4px 12px",
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: "#1A1715",
              }}>
                {cat.count} Products
              </div>
              {/* Category label on bottom of image */}
              <p style={{ position: "absolute", bottom: 14, left: 16, fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, color: "white", lineHeight: 1.2 }}>
                {cat.label}
              </p>
            </div>

            {/* Info row */}
            <div style={{ padding: "16px 18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#736B65" }}>{cat.description}</p>
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(231,174,175,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: "white", transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#D44515"; e.currentTarget.style.borderColor = "#D44515"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "rgba(231,174,175,0.5)"; }}
              >
                <ArrowUpRight size={15} strokeWidth={1.5} style={{ color: "#1A1715" }} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
