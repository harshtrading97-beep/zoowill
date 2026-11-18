import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "lucide-react";
import { handleImageError } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

export default function BrandHeritage() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path image reveal
      gsap.fromTo(imgRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: imgRef.current, start: "top 76%" } }
      );
      // Parallax
      gsap.to(imgRef.current.querySelector("img"), {
        yPercent: -14, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
      // Text reveals
      gsap.fromTo(textRef.current.querySelectorAll(".reveal-line"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 76%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: "120px 20px", background: "#FAF8F5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>

        {/* Image column */}
        <div ref={imgRef} style={{ borderRadius: 22, overflow: "hidden", height: 580, position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=900&q=85"
            alt="ZoOwill Artisan Saddlery" onError={handleImageError}
            style={{ width: "100%", height: "115%", objectFit: "cover", display: "block" }} />
          {/* Floating badge */}
          <div style={{
            position: "absolute", bottom: 32, right: -16,
            background: "#FAF8F5", border: "1px solid rgba(231,174,175,0.4)", borderRadius: 16,
            padding: "20px 24px", boxShadow: "0 8px 32px -4px rgba(26,23,21,0.1)", maxWidth: 196,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Award size={16} strokeWidth={1.5} style={{ color: "#D44515" }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#D44515" }}>Heritage Quality</span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, color: "#1A1715", lineHeight: 1.2 }}>
              59+ Specialized Equestrian SKUs
            </p>
          </div>
        </div>

        {/* Text column */}
        <div ref={textRef}>
          <div className="reveal-line" style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D44515" }}>Our Heritage</span>
          </div>
          <h2 className="reveal-line" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,4vw,54px)", fontWeight: 300, color: "#1A1715", lineHeight: 1.1, marginBottom: 26 }}>
            Where Tradition Meets International Excellence
          </h2>
          <p className="reveal-line" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14.5, lineHeight: 1.75, color: "#736B65", marginBottom: 18 }}>
            ZoOwill is a premier international equestrian brand rooted in India's rich saddlery traditions. Our artisans — many trained in the legendary workshops of Kashmir and Aligarh — bring centuries-old craftsmanship to every piece of tack we produce.
          </p>
          <p className="reveal-line" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14.5, lineHeight: 1.75, color: "#736B65", marginBottom: 32 }}>
            From ornate brass-fitted <em>Kashmiri Kathis</em> and hand-forged <em>Aligarh Rakabs</em> to precision dressage saddles and internationally certified leather harnesses — every ZoOwill product is crafted to exceed global equestrian standards and exported worldwide.
          </p>

          {/* Stats */}
          <div className="reveal-line" style={{ display: "flex", gap: 44, marginBottom: 36 }}>
            {[{ num: "59+", label: "Unique SKUs" }, { num: "7", label: "Collections" }, { num: "100%", label: "Export Ready" }].map(stat => (
              <div key={stat.label}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, color: "#1A1715", lineHeight: 1 }}>{stat.num}</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#736B65", marginTop: 4 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="reveal-line">
            <a href="#contact" className="btn btn-dark" style={{ textDecoration: "none" }}>Request Full Catalogue</a>
          </div>
        </div>
      </div>
    </section>
  );
}
