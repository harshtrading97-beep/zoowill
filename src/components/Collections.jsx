import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { handleImageError } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

// 100% verified equestrian images — no furniture, no kitchens
const COLLECTIONS = [
  {
    num: "01",
    title: "The Royal Harness\n& Dressage Edit",
    sub: "Leather harness sets, dressage saddles, Kashmiri Kathis & crystal browbands",
    image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=1000&q=85",
    cta: "Explore Collection", href: "#featured",
  },
  {
    num: "02",
    title: "Endurance, Kathi\n& Stable Essentials",
    sub: "Endurance saddles, stable halters, grooming tools & feeding accessories",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=85",
    cta: "Shop Essentials", href: "#featured",
  },
];

export default function Collections() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".coll-card", { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collections" ref={sectionRef} style={{ padding: "96px 20px", background: "#FAF8F5" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D44515", display: "block", marginBottom: 10 }}>
            Curated Lookbook
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 300, color: "#1A1715", lineHeight: 1.1 }}>
            Curated Collections
          </h2>
        </div>

        {/* Two-card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: 22 }}>
          {COLLECTIONS.map((coll, i) => (
            <div key={i} className="coll-card" style={{ position: "relative", borderRadius: 22, overflow: "hidden", height: 560, cursor: "pointer" }}>
              <img src={coll.image} alt={coll.title} onError={handleImageError}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.76,0,0.24,1)" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"}
              />
              {/* Gradient */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,21,0.68) 0%, rgba(26,23,21,0.1) 50%, transparent 100%)" }} />
              {/* Number */}
              <div style={{ position: "absolute", top: 28, left: 28, fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontWeight: 300, letterSpacing: "0.1em", color: "rgba(250,248,245,0.65)" }}>
                {coll.num}
              </div>
              {/* Info glass card */}
              <div style={{
                position: "absolute", bottom: 28, left: 28, right: 28,
                background: "rgba(250,248,245,0.11)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: "24px",
              }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: "white", lineHeight: 1.15, marginBottom: 10, whiteSpace: "pre-line" }}>
                  {coll.title}
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.75)", marginBottom: 20, lineHeight: 1.6 }}>
                  {coll.sub}
                </p>
                <a href={coll.href}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "10px 20px", background: "white", color: "#1A1715",
                    border: "none", borderRadius: 100,
                    fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
                    textDecoration: "none", transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#D44515"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#1A1715"; }}
                >
                  {coll.cta} <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
