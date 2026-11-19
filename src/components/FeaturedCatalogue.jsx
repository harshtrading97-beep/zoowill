import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, SlidersHorizontal, Sparkles, RotateCcw } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
];

const INITIAL_BATCH = 16;

export default function FeaturedCatalogue({ onView }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort]                     = useState("featured");
  const [sortOpen, setSortOpen]             = useState(false);
  const [visibleCount, setVisibleCount]     = useState(INITIAL_BATCH);

  const sectionRef = useRef(null);
  const gridRef    = useRef(null);
  const sortRef    = useRef(null);

  // Pick up category hint from SearchOverlay / MegaMenu / CategoryShowcase
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("zw_cat");
      if (saved) {
        setActiveCategory(saved);
        sessionStorage.removeItem("zw_cat");
      }
    } catch (_) { /* noop */ }

    const handler = (e) => {
      if (e.detail) {
        setActiveCategory(e.detail);
        setVisibleCount(INITIAL_BATCH);
      }
    };
    window.addEventListener("zw:filterCategory", handler);
    return () => window.removeEventListener("zw:filterCategory", handler);
  }, []);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const onOutsideClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  // Filter & sort logic
  let filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (sort === "price-asc")  filtered = [...filtered].sort((a, b) => a.priceINR - b.priceINR);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.priceINR - a.priceINR);
  if (sort === "rating")     filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const displayedProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const getCategoryCount = (catId) =>
    catId === "all"
      ? products.length
      : products.filter((p) => p.category === catId).length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feat-heading",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 84%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".prod-card-wrap"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.55, ease: "power2.out" }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory, sort]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setVisibleCount(INITIAL_BATCH);
  };

  return (
    <>
      <style>{`
        .zw-cat-tabs-scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 6px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .zw-cat-tabs-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 900px) {
          .zw-cat-tabs-scroll {
            flex-wrap: wrap;
            overflow-x: visible;
            padding-bottom: 0;
          }
        }

        .zw-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 100px;
          border: 1px solid rgba(231, 174, 175, 0.5);
          background: white;
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.04em;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-pill-btn:hover {
          border-color: rgba(212, 69, 21, 0.45);
          background: #FFFDFB;
          transform: translateY(-1px);
        }
        .zw-pill-btn.active {
          background: #1A1715;
          color: #FAF8F5;
          border-color: #1A1715;
          box-shadow: 0 8px 20px -6px rgba(26, 23, 21, 0.32);
        }
        .zw-pill-count {
          font-size: 10px;
          padding: 1px 7px;
          border-radius: 100px;
          background: #F3EFEA;
          color: #736B65;
          font-weight: 600;
        }
        .zw-pill-btn.active .zw-pill-count {
          background: rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.9);
        }

        /* Responsive Product Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */
        .zw-catalogue-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        @media (min-width: 680px) {
          .zw-catalogue-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }
        }
        @media (min-width: 1040px) {
          .zw-catalogue-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 24px;
          }
        }

        .zw-load-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 100px;
          background: white;
          border: 1px solid rgba(26, 23, 21, 0.18);
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 10px 26px -10px rgba(26, 23, 21, 0.12);
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-load-more-btn:hover {
          background: #1A1715;
          color: white;
          border-color: #1A1715;
          transform: translateY(-2px);
        }
      `}</style>

      <section
        id="featured"
        ref={sectionRef}
        style={{
          padding: "clamp(68px, 9vw, 108px) clamp(14px, 3.5vw, 28px)",
          background: "#FAF8F5",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Editorial Section Header */}
          <div
            className="feat-heading"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: "clamp(28px, 4vw, 42px)",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "6px 14px",
                  borderRadius: 100,
                  background: "rgba(212, 69, 21, 0.08)",
                  border: "1px solid rgba(212, 69, 21, 0.2)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D44515",
                  marginBottom: 14,
                }}
              >
                <Sparkles size={12} strokeWidth={1.8} />
                The ZoOwill Collection
              </span>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(32px, 4.8vw, 56px)",
                  fontWeight: 400,
                  color: "#1A1715",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  marginBottom: 12,
                }}
              >
                Explore the Full Range
              </h2>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(13.5px, 1.05vw, 15px)",
                  color: "#736B65",
                  lineHeight: 1.65,
                  maxWidth: 620,
                }}
              >
                From handcrafted Kashmiri Kathis and English saddlery to everyday stable essentials, explore 113 official listings built for modern horse care.
              </p>
            </div>
          </div>

          {/* Filter Pills + Sort Toolbar */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.65)",
              border: "1px solid rgba(231, 174, 175, 0.35)",
              borderRadius: 20,
              padding: "clamp(12px, 2vw, 18px)",
              marginBottom: 24,
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Category Filter Tabs */}
            <div className="zw-cat-tabs-scroll">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`zw-pill-btn ${isActive ? "active" : ""}`}
                  >
                    <span>{cat.label}</span>
                    <span className="zw-pill-count">{getCategoryCount(cat.id)}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-bar: Showing count + Sort dropdown */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginTop: 14,
                paddingTop: 12,
                borderTop: "1px solid rgba(231, 174, 175, 0.3)",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                    color: "#736B65",
                  }}
                >
                  Showing{" "}
                  <strong style={{ color: "#1A1715", fontWeight: 600 }}>
                    {displayedProducts.length}
                  </strong>{" "}
                  of{" "}
                  <strong style={{ color: "#1A1715", fontWeight: 600 }}>
                    {filtered.length}
                  </strong>{" "}
                  products
                </p>

                {activeCategory !== "all" && (
                  <button
                    onClick={() => handleCategoryChange("all")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      background: "transparent",
                      border: "none",
                      color: "#D44515",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: "2px 6px",
                    }}
                  >
                    <RotateCcw size={11} strokeWidth={2} />
                    Reset
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div ref={sortRef} style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => setSortOpen((prev) => !prev)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 15px",
                    border: "1px solid rgba(231, 174, 175, 0.55)",
                    borderRadius: 100,
                    background: "white",
                    cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                    color: "#1A1715",
                    fontWeight: 500,
                    boxShadow: "0 2px 10px rgba(26, 23, 21, 0.04)",
                  }}
                >
                  <SlidersHorizontal size={13} strokeWidth={1.8} style={{ color: "#D44515" }} />
                  <span>{SORT_OPTIONS.find((o) => o.value === sort)?.label}</span>
                  <ChevronDown
                    size={13}
                    strokeWidth={1.8}
                    style={{
                      transform: sortOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.25s ease",
                      color: "#736B65",
                    }}
                  />
                </button>

                {sortOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "white",
                      border: "1px solid rgba(231, 174, 175, 0.5)",
                      borderRadius: 14,
                      boxShadow: "0 16px 40px -8px rgba(26, 23, 21, 0.16)",
                      overflow: "hidden",
                      minWidth: 195,
                      zIndex: 25,
                      padding: 4,
                    }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSort(opt.value);
                          setSortOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 14px",
                          border: "none",
                          borderRadius: 10,
                          cursor: "pointer",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 12,
                          fontWeight: sort === opt.value ? 600 : 400,
                          color: sort === opt.value ? "#D44515" : "#1A1715",
                          background: sort === opt.value ? "#FFF6F3" : "transparent",
                          transition: "background 0.18s",
                        }}
                        onMouseEnter={(e) => {
                          if (sort !== opt.value) e.currentTarget.style.background = "#F3EFEA";
                        }}
                        onMouseLeave={(e) => {
                          if (sort !== opt.value) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span>{opt.label}</span>
                        {sort === opt.value && (
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#D44515",
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {displayedProducts.length > 0 ? (
            <>
              <div ref={gridRef} className="zw-catalogue-grid">
                {displayedProducts.map((product) => (
                  <div key={product.id} className="prod-card-wrap">
                    <ProductCard product={product} onView={onView} />
                  </div>
                ))}
              </div>

              {/* Load More Controls */}
              {hasMore && (
                <div
                  style={{
                    marginTop: 44,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 16)}
                    className="zw-load-more-btn"
                  >
                    Load More Products ({filtered.length - visibleCount} remaining)
                  </button>
                  <button
                    onClick={() => setVisibleCount(filtered.length)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#736B65",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11.5,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Show all {filtered.length} products
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "64px 20px",
                background: "white",
                borderRadius: 24,
                border: "1px solid rgba(231, 174, 175, 0.35)",
                maxWidth: 520,
                margin: "0 auto",
                boxShadow: "0 20px 50px -15px rgba(26, 23, 21, 0.08)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28,
                  fontWeight: 400,
                  color: "#1A1715",
                  marginBottom: 10,
                }}
              >
                Explore the ZoOwill Collection
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13.5,
                  color: "#736B65",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                Discover saddlery, riding equipment and everyday essentials for horses and stables.
              </p>
              <button
                onClick={() => handleCategoryChange("all")}
                className="btn btn-dark"
                style={{ padding: "12px 26px", fontSize: 11 }}
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}