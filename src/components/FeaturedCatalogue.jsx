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
  ArrowDown,
  Check,
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
  const [priceFilter, setPriceFilter]       = useState("all");
  const [sort, setSort]                     = useState("featured");
  const [sortOpen, setSortOpen]             = useState(false);
  const [visibleCount, setVisibleCount]     = useState(INITIAL_BATCH);

  const sectionRef  = useRef(null);
  const gridRef     = useRef(null);
  const sortRef     = useRef(null);
  const tabsWrapRef = useRef(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("zw_cat");
      if (saved) {
        setActiveCategory(saved);
        sessionStorage.removeItem("zw_cat");
      }
    } catch (_) {}

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

  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

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
        const inName   = p.name?.toLowerCase().includes(q);
        const inDesc   = p.description?.toLowerCase().includes(q);
        const inSku    = p.sku?.toLowerCase().includes(q);
        const inAsin   = p.asin?.toLowerCase().includes(q);
        const inCat    = p.category?.toLowerCase().includes(q);
        const inColors = p.colors?.some((c) => c.toLowerCase().includes(q));
        return inName || inDesc || inSku || inAsin || inCat || inColors;
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
          duration: 0.85,
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
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, stagger: 0.025, duration: 0.42, ease: "power2.out" }
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
        @keyframes zwSortPop {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .zw-feat-sec {
          padding: 64px 12px 76px;
          background: linear-gradient(180deg, #FAF8F5 0%, #F6F1EB 100%);
          border-top: 1px solid rgba(231, 174, 175, 0.3);
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
            padding: 108px 28px 116px;
          }
        }

        .zw-toolbar-card {
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(231, 174, 175, 0.48);
          border-radius: 22px;
          padding: 12px;
          margin-bottom: 22px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 14px 36px -18px rgba(26, 23, 21, 0.1);
        }
        @media (min-width: 768px) {
          .zw-toolbar-card {
            padding: 18px 20px;
            border-radius: 26px;
            margin-bottom: 28px;
          }
        }

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
          border: 1px solid rgba(231, 174, 175, 0.58);
          background: #FFFFFF;
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-pill-btn:hover {
          border-color: rgba(212, 69, 21, 0.5);
          background: #FFFDFB;
          transform: translateY(-1px);
        }
        .zw-pill-btn.active {
          background: #1A1715;
          color: #FAF8F5;
          border-color: #1A1715;
          box-shadow: 0 8px 20px -6px rgba(26, 23, 21, 0.36);
        }
        .zw-pill-count {
          font-size: 10px;
          padding: 1px 7px;
          border-radius: 100px;
          background: #F3EFEA;
          color: #736B65;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .zw-pill-btn.active .zw-pill-count {
          background: #D44515;
          color: #FFFFFF;
        }

        .zw-controls-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(231, 174, 175, 0.32);
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
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .zw-inline-search:focus-within {
          background: #FFFFFF;
          border-color: #D44515;
          box-shadow: 0 6px 18px -8px rgba(212, 69, 21, 0.28);
        }
        @media (min-width: 820px) {
          .zw-inline-search {
            max-width: 340px;
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
          padding: 7px 13px;
          border-radius: 100px;
          border: 1px solid rgba(231, 174, 175, 0.58);
          background: #FFFFFF;
          color: #5C544E;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .zw-chip-toggle:hover {
          border-color: rgba(212, 69, 21, 0.45);
          color: #1A1715;
        }
        .zw-chip-toggle.active {
          background: #FDF4F4;
          border-color: #D44515;
          color: #D44515;
          font-weight: 600;
          box-shadow: 0 4px 12px -4px rgba(212, 69, 21, 0.22);
        }

        .zw-sort-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.55);
          border-radius: 16px;
          box-shadow: 0 18px 44px -8px rgba(26, 23, 21, 0.18);
          overflow: hidden;
          min-width: 196px;
          z-index: 30;
          padding: 5px;
          animation: zwSortPop 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

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

        /* ── Bespoke Luxury Load More Pill Button ── */
        .zw-load-more-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          width: 100%;
          max-width: 310px;
          min-height: 48px;
          padding: 6px 6px 6px 22px;
          border-radius: 100px;
          background: #1A1715;
          border: 1px solid rgba(231, 174, 175, 0.38);
          color: #FAF8F5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 12px 28px -8px rgba(26, 23, 21, 0.32),
                      inset 0 1px 0 rgba(255, 255, 255, 0.14);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.32s ease;
        }
        @media (min-width: 480px) {
          .zw-load-more-btn {
            width: auto;
            max-width: none;
            justify-content: center;
            padding: 6px 6px 6px 24px;
          }
        }

        .zw-load-more-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #D44515 0%, #B8370C 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-load-more-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 65%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.32) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          transition: left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 1;
        }
        .zw-load-more-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(243, 182, 162, 0.65);
          box-shadow: 0 16px 34px -6px rgba(212, 69, 21, 0.48);
        }
        .zw-load-more-btn:hover::before {
          transform: scaleX(1);
        }
        .zw-load-more-btn:hover::after {
          left: 150%;
        }

        .zw-load-more-badge {
          position: relative;
          z-index: 2;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #FAF8F5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-load-more-btn:hover .zw-load-more-badge {
          background: #FFFFFF;
          border-color: #FFFFFF;
          color: #D44515;
          transform: translateY(2px);
        }
        .zw-load-more-btn.is-reset:hover .zw-load-more-badge {
          transform: rotate(-180deg);
        }
      `}</style>

      <section id="featured" ref={sectionRef} className="zw-feat-sec">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
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
              From handcrafted Kashmiri Kathis and English saddlery to everyday stable essentials — browse our complete equestrian catalogue built for modern horse care.
            </p>
          </div>

          <div className="zw-toolbar-card">
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

            <div className="zw-controls-row">
              <div className="zw-inline-search">
                <Search size={14} strokeWidth={1.8} style={{ color: "#D44515", flexShrink: 0 }} />
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
                      border: "1px solid rgba(231, 174, 175, 0.65)",
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
                    <div className="zw-sort-dropdown">
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
                            <Check size={13} strokeWidth={2.2} style={{ color: "#D44515" }} />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

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

          {displayedProducts.length > 0 ? (
            <>
              <div ref={gridRef} className="zw-catalogue-grid">
                {displayedProducts.map((product) => (
                  <div key={product.id} className="prod-card-wrap">
                    <ProductCard product={product} onView={onView} />
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 42,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                {hasMore && (
                  <>
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 16)}
                      className="zw-load-more-btn"
                    >
                      <span style={{ position: "relative", zIndex: 2 }}>
                        Load More ({filtered.length - visibleCount} Remaining)
                      </span>
                      <span className="zw-load-more-badge" aria-hidden="true">
                        <ArrowDown size={15} strokeWidth={2.1} />
                      </span>
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
                        fontWeight: 500,
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
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
                      gap: 6,
                      background: "#FFFFFF",
                      border: "1px solid rgba(231, 174, 175, 0.65)",
                      borderRadius: 100,
                      padding: "8px 16px",
                      color: "#1A1715",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      marginTop: 4,
                      boxShadow: "0 4px 12px rgba(26, 23, 21, 0.05)",
                    }}
                  >
                    <ArrowUp size={12} strokeWidth={2} style={{ color: "#D44515" }} />
                    <span>Back to Filters</span>
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
                borderRadius: 24,
                border: "1px solid rgba(231, 174, 175, 0.45)",
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
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                No items matched your current search or filter selection. Reset filters to view the complete ZoOwill equestrian catalogue.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="zw-load-more-btn is-reset"
              >
                <span style={{ position: "relative", zIndex: 2 }}>
                  Reset &amp; View All Products
                </span>
                <span className="zw-load-more-badge" aria-hidden="true">
                  <RotateCcw size={14} strokeWidth={2.1} />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}