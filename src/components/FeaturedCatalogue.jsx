import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  SlidersHorizontal,
  RotateCcw,
  Search,
  X,
  ArrowUp,
} from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "discount",   label: "Highest Savings" },
];

const INITIAL_BATCH = 16;

function parseDiscountPercent(discountStr) {
  if (!discountStr) return 0;
  const match = String(discountStr).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function FeaturedCatalogue({ onView }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery]       = useState("");
  const [priceFilter, setPriceFilter]       = useState("all"); // "all" | "under500" | "bestDeal"
  const [sort, setSort]                     = useState("featured");
  const [sortOpen, setSortOpen]             = useState(false);
  const [visibleCount, setVisibleCount]     = useState(INITIAL_BATCH);

  const sectionRef  = useRef(null);
  const gridRef     = useRef(null);
  const sortRef     = useRef(null);
  const tabsWrapRef = useRef(null);

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
        setSearchQuery("");
        setPriceFilter("all");
        setVisibleCount(INITIAL_BATCH);
      }
    };
    window.addEventListener("zw:filterCategory", handler);
    return () => window.removeEventListener("zw:filterCategory", handler);
  }, []);

  // Auto-scroll active category pill into view on mobile
  useEffect(() => {
    const wrap = tabsWrapRef.current;
    if (!wrap) return;
    const activeBtn = wrap.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory]);

  // Close sort dropdown on outside click or Escape key
  useEffect(() => {
    const onOutsideClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSortOpen(false);
    };
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Category counts map (computed once)
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Logical filtering & sorting
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let list = products.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) {
        return false;
      }
      if (priceFilter === "under500" && p.priceINR > 500) {
        return false;
      }
      if (priceFilter === "bestDeal" && parseDiscountPercent(p.discount) < 55) {
        return false;
      }
      if (q) {
        const inName = p.name?.toLowerCase().includes(q);
        const inSku = p.sku?.toLowerCase().includes(q);
        const inAsin = p.asin?.toLowerCase().includes(q);
        const inCat = p.category?.toLowerCase().includes(q);
        const inColors = p.colors?.some((c) => c.toLowerCase().includes(q));
        return inName || inSku || inAsin || inCat || inColors;
      }
      return true;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.priceINR - b.priceINR);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.priceINR - a.priceINR);
    } else if (sort === "rating") {
      list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "discount") {
      list = [...list].sort(
        (a, b) => parseDiscountPercent(b.discount) - parseDiscountPercent(a.discount)
      );
    }

    return list;
  }, [activeCategory, searchQuery, priceFilter, sort]);

  const displayedProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const hasActiveFilters =
    activeCategory !== "all" ||
    searchQuery.trim() !== "" ||
    priceFilter !== "all" ||
    sort !== "featured";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feat-heading",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
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
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.45, ease: "power2.out" }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory, sort, priceFilter]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setVisibleCount(INITIAL_BATCH);
  };

  const resetAllFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setPriceFilter("all");
    setSort("featured");
    setVisibleCount(INITIAL_BATCH);
  };

  const scrollToCatalogueTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        .zw-feat-sec {
          padding: 64px 12px 76px;
          background: #FAF8F5;
          width: 100%;
          overflow-x: clip;
        }
        @media (min-width: 640px) {
          .zw-feat-sec {
            padding: 84px 20px 92px;
          }
        }
        @media (min-width: 1024px) {
          .zw-feat-sec {
            padding: 104px 28px 112px;
          }
        }

        .zw-toolbar-card {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(231, 174, 175, 0.42);
          border-radius: 20px;
          padding: 12px;
          margin-bottom: 20px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 12px 34px -18px rgba(26, 23, 21, 0.1);
        }
        @media (min-width: 768px) {
          .zw-toolbar-card {
            padding: 18px 20px;
            border-radius: 24px;
            margin-bottom: 26px;
          }
        }

        /* Horizontal Category Scroll on Phone, Wrapped on Desktop */
        .zw-cat-tabs-scroll {
          display: flex;
          align-items: center;
          gap: 7px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .zw-cat-tabs-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 960px) {
          .zw-cat-tabs-scroll {
            flex-wrap: wrap;
            overflow-x: visible;
            padding-bottom: 0;
            gap: 8px;
          }
        }

        .zw-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 36px;
          padding: 7px 14px;
          border-radius: 100px;
          border: 1px solid rgba(231, 174, 175, 0.55);
          background: #FFFFFF;
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.24s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-pill-btn:hover {
          border-color: rgba(212, 69, 21, 0.45);
          background: #FFFDFB;
        }
        .zw-pill-btn.active {
          background: #1A1715;
          color: #FAF8F5;
          border-color: #1A1715;
          box-shadow: 0 8px 18px -6px rgba(26, 23, 21, 0.34);
        }
        .zw-pill-count {
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 100px;
          background: #F3EFEA;
          color: #736B65;
          font-weight: 600;
        }
        .zw-pill-btn.active .zw-pill-count {
          background: rgba(255, 255, 255, 0.18);
          color: #FAF8F5;
        }

        /* Search + Quick Filter + Sort Row */
        .zw-controls-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(231, 174, 175, 0.3);
        }
        @media (min-width: 820px) {
          .zw-controls-row {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
          }
        }

        .zw-inline-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FAF8F5;
          border: 1px solid rgba(231, 174, 175, 0.55);
          border-radius: 100px;
          padding: 0 14px;
          height: 40px;
          width: 100%;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .zw-inline-search:focus-within {
          background: #FFFFFF;
          border-color: #D44515;
        }
        @media (min-width: 820px) {
          .zw-inline-search {
            max-width: 320px;
          }
        }

        .zw-sub-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }

        .zw-chip-toggle {
          padding: 7px 12px;
          border-radius: 100px;
          border: 1px solid rgba(231, 174, 175, 0.55);
          background: #FFFFFF;
          color: #5C544E;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .zw-chip-toggle.active {
          background: #FDF4F4;
          border-color: #D44515;
          color: #D44515;
          font-weight: 600;
        }

        /* Responsive Product Grid: strict 2 cols on mobile, 3 on tablet, 4 on desktop */
        .zw-catalogue-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          width: 100%;
        }
        .prod-card-wrap {
          min-width: 0;
          width: 100%;
        }
        @media (min-width: 640px) {
          .zw-catalogue-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }
        }
        @media (min-width: 1040px) {
          .zw-catalogue-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 22px;
          }
        }

        .zw-load-more-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 46px;
          padding: 13px 28px;
          border-radius: 100px;
          background: #1A1715;
          border: 1px solid #1A1715;
          color: #FAF8F5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 10px 26px -10px rgba(26, 23, 21, 0.3);
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-load-more-btn:hover {
          background: #D44515;
          border-color: #D44515;
          transform: translateY(-2px);
        }
      `}</style>

      <section id="featured" ref={sectionRef} className="zw-feat-sec">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          {/* Clean Editorial Section Header (No AI pill box or star icon) */}
          <div
            className="feat-heading"
            style={{
              marginBottom: "clamp(22px, 3.5vw, 36px)",
              padding: "0 2px",
            }}
          >
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
              The ZoOwill Collection
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
              Explore the Full Range
            </h2>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(13px, 1.05vw, 14.5px)",
                color: "#736B65",
                lineHeight: 1.62,
                maxWidth: 620,
              }}
            >
              From handcrafted Kashmiri Kathis and English saddlery to everyday stable essentials, browse 113 official listings built for modern horse care.
            </p>
          </div>

          {/* Filter, Live Search & Sort Toolbar */}
          <div className="zw-toolbar-card">
            {/* Category Filter Tabs */}
            <div ref={tabsWrapRef} className="zw-cat-tabs-scroll">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    data-active={isActive}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`zw-pill-btn ${isActive ? "active" : ""}`}
                  >
                    <span>{cat.label}</span>
                    <span className="zw-pill-count">
                      {categoryCounts[cat.id] || 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search + Quick Price/Deal Filters + Sort Dropdown */}
            <div className="zw-controls-row">
              {/* Inline Search Input */}
              <div className="zw-inline-search">
                <Search size={14} strokeWidth={1.8} style={{ color: "#736B65", flexShrink: 0 }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(INITIAL_BATCH);
                  }}
                  placeholder="Filter by saddle, brush, girth, SKU..."
                  aria-label="Filter catalogue products"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 13,
                    color: "#1A1715",
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear filter search"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#736B65",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      padding: 2,
                    }}
                  >
                    <X size={14} strokeWidth={2} />
                  </button>
                )}
              </div>

              {/* Quick Chips + Sort */}
              <div className="zw-sub-actions">
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setPriceFilter((prev) => (prev === "under500" ? "all" : "under500"));
                      setVisibleCount(INITIAL_BATCH);
                    }}
                    className={`zw-chip-toggle ${priceFilter === "under500" ? "active" : ""}`}
                  >
                    Under ₹500
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPriceFilter((prev) => (prev === "bestDeal" ? "all" : "bestDeal"));
                      setVisibleCount(INITIAL_BATCH);
                    }}
                    className={`zw-chip-toggle ${priceFilter === "bestDeal" ? "active" : ""}`}
                  >
                    55%+ Off
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div ref={sortRef} style={{ position: "relative", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => setSortOpen((prev) => !prev)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      height: 36,
                      padding: "0 14px",
                      border: "1px solid rgba(231, 174, 175, 0.6)",
                      borderRadius: 100,
                      background: "#FFFFFF",
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11.5,
                      color: "#1A1715",
                      fontWeight: 500,
                    }}
                  >
                    <SlidersHorizontal size={12.5} strokeWidth={1.8} style={{ color: "#D44515" }} />
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
                        top: "calc(100% + 6px)",
                        right: 0,
                        background: "#FFFFFF",
                        border: "1px solid rgba(231, 174, 175, 0.55)",
                        borderRadius: 14,
                        boxShadow: "0 16px 40px -8px rgba(26, 23, 21, 0.16)",
                        overflow: "hidden",
                        minWidth: 190,
                        zIndex: 30,
                        padding: 4,
                      }}
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
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

            {/* Active Result Counter & Reset Strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                marginTop: 10,
                paddingTop: 10,
                borderTop: "1px dashed rgba(231, 174, 175, 0.35)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11.5,
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

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "none",
                    border: "none",
                    color: "#D44515",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 11.5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <RotateCcw size={11} strokeWidth={2} />
                  Clear Filters
                </button>
              )}
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

              {/* Load More & Back to Top Controls */}
              <div
                style={{
                  marginTop: 38,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {hasMore && (
                  <>
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 16)}
                      className="zw-load-more-btn"
                    >
                      Load More ({filtered.length - visibleCount} remaining)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisibleCount(filtered.length)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#736B65",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 12,
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: "4px 8px",
                      }}
                    >
                      Show all {filtered.length} products
                    </button>
                  </>
                )}

                {visibleCount > INITIAL_BATCH && (
                  <button
                    type="button"
                    onClick={scrollToCatalogueTop}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: "white",
                      border: "1px solid rgba(231, 174, 175, 0.55)",
                      borderRadius: 100,
                      padding: "8px 16px",
                      color: "#1A1715",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      marginTop: 4,
                    }}
                  >
                    <ArrowUp size={12} strokeWidth={2} /> Back to Filters
                  </button>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "52px 20px",
                background: "#FFFFFF",
                borderRadius: 22,
                border: "1px solid rgba(231, 174, 175, 0.4)",
                maxWidth: 480,
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
                  marginBottom: 8,
                }}
              >
                No Matching Products Found
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13.5,
                  color: "#736B65",
                  marginBottom: 22,
                  lineHeight: 1.6,
                }}
              >
                No items matched your current search or filter selection. Reset filters to view all 113 official ZoOwill products.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn btn-dark"
                style={{ padding: "12px 26px", fontSize: 11 }}
              >
                Reset &amp; View All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}