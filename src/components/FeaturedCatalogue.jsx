import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function FeaturedCatalogue({ onView }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort]     = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const sectionRef = useRef(null);
  const gridRef    = useRef(null);

  // Listen for category jumps triggered by SearchOverlay pills
  useEffect(() => {
    const handler = (e) => {
      if (e.detail) setActiveCategory(e.detail);
    };
    window.addEventListener("zw:filterCategory", handler);
    return () => window.removeEventListener("zw:filterCategory", handler);
  }, []);

  let filtered = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
  if (sort === "price-asc")  filtered = [...filtered].sort((a, b) => a.priceINR - b.priceINR);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.priceINR - a.priceINR);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".feat-heading", { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current.querySelectorAll(".prod-card-wrap"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.055, duration: 0.6, ease: "power2.out" }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory, sort]);

  return (
    <section id="featured" ref={sectionRef} style={{ padding: "96px 20px", background: "#FAF8F5" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div className="feat-heading" style={{ marginBottom: 44 }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D44515", display: "block", marginBottom: 10 }}>
            THE ZOOWILL COLLECTION
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 300, color: "#1A1715", lineHeight: 1.1, marginBottom: 14 }}>
            Explore the Full Range
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: "#736B65", lineHeight: 1.65, maxWidth: 640 }}>
            From traditional saddlery to everyday stable essentials, discover equestrian products for a wide range of riding and horse-care needs.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`filter-tab ${activeCategory === cat.id ? "active" : ""}`}>
                {cat.label}
              </button>
            ))}
          </div>
          {/* Sort */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button onClick={() => setSortOpen(!sortOpen)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", border: "1px solid rgba(26,23,21,0.12)", borderRadius: 100,
                background: "white", cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#1A1715", fontWeight: 500,
              }}>
              {SORT_OPTIONS.find(o => o.value === sort)?.label}
              <ChevronDown size={12} strokeWidth={1.5} style={{ transform: sortOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
            </button>
            {sortOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "white", border: "1px solid rgba(231,174,175,0.4)", borderRadius: 10, boxShadow: "0 8px 30px -4px rgba(26,23,21,0.1)", overflow: "hidden", minWidth: 180, zIndex: 10 }}>
                {SORT_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => { setSort(opt.value); setSortOpen(false); }}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", border: "none", cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12,
                      fontWeight: sort === opt.value ? 600 : 400, color: sort === opt.value ? "#D44515" : "#1A1715", background: "transparent" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F3EFEA"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid or Empty State */}
        {filtered.length > 0 ? (
          <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }}>
            {filtered.map(product => (
              <div key={product.id} className="prod-card-wrap">
                <ProductCard product={product} onView={onView} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "64px 20px", background: "white", borderRadius: 20, border: "1px solid rgba(231,174,175,0.3)", maxWidth: 540, margin: "0 auto" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: "#1A1715", marginBottom: 10 }}>
              Explore the ZoOwill Collection
            </h3>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: "#736B65", marginBottom: 24, lineHeight: 1.6 }}>
              Discover saddlery, riding equipment and everyday essentials for horses and stables.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="btn btn-dark"
              style={{ padding: "10px 24px", fontSize: 11 }}
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
