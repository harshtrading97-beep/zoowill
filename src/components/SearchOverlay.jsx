import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { X, Search, ArrowRight, RotateCcw } from "lucide-react";
import { products, handleImageError, formatPrice } from "../data/products";

const CAT_PILLS = [
  { id: "saddles",    label: "Saddles & Kathis" },
  { id: "harnesses",  label: "Harnesses" },
  { id: "bridles",    label: "Bridles & Bits" },
  { id: "halters",    label: "Halters & Leads" },
  { id: "stirrups",   label: "Stirrups & Girths" },
  { id: "protection", label: "Horse Protection & Rugs" },
  { id: "grooming",   label: "Grooming & Stable" },
  { id: "rider",      label: "Rider & Apparel" },
];

function jumpToCategory(catId, onClose) {
  onClose();
  setTimeout(() => {
    const el = document.getElementById("featured");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    try {
      sessionStorage.setItem("zw_cat", catId);
    } catch (_) { /* noop */ }
    window.dispatchEvent(new CustomEvent("zw:filterCategory", { detail: catId }));
  }, 200);
}

export default function SearchOverlay({ isOpen, onClose, onViewProduct }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  /* Lock background scroll when open */
  useEffect(() => {
    if (isOpen) {
      const prevBody = document.body.style.overflow;
      const prevHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 140);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevBody;
        document.documentElement.style.overflow = prevHtml;
      };
    } else {
      setQuery("");
    }
  }, [isOpen]);

  /* Escape key handler */
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* Live search across Name, Category, SKU, ASIN & Colors */
  const { results, totalMatches } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return { results: [], totalMatches: 0 };

    const matches = products.filter((p) => {
      const inName = p.name?.toLowerCase().includes(q);
      const inCat = p.category?.toLowerCase().includes(q);
      const inSku = p.sku?.toLowerCase().includes(q);
      const inAsin = p.asin?.toLowerCase().includes(q);
      const inColor = p.colors?.some((c) => c.toLowerCase().includes(q));
      return inName || inCat || inSku || inAsin || inColor;
    });

    return {
      results: matches.slice(0, 8),
      totalMatches: matches.length,
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes zwSearchIn {
          from { opacity: 0; transform: translateY(-14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes zwBdIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .zw-search-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(24, 21, 19, 0.62);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: zwBdIn 0.22s ease forwards;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: max(18px, env(safe-area-inset-top)) 14px 28px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        @media (min-width: 768px) {
          .zw-search-backdrop {
            padding-top: 8vh;
          }
        }

        .zw-search-panel {
          width: 100%;
          max-width: 680px;
          animation: zwSearchIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .zw-search-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .zw-search-close-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(231, 174, 175, 0.55);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1A1715;
          box-shadow: 0 6px 18px rgba(26, 23, 21, 0.16);
          transition: all 0.24s ease;
        }
        .zw-search-close-btn:hover {
          background: #1A1715;
          color: #FFFFFF;
          transform: rotate(90deg);
        }

        .zw-search-input-box {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(231, 174, 175, 0.6);
          border-radius: 18px;
          padding: 10px 14px;
          background: #FFFFFF;
          box-shadow: 0 22px 54px -12px rgba(26, 23, 21, 0.24);
          transition: border-color 0.2s ease;
        }
        .zw-search-input-box:focus-within {
          border-color: #D44515;
        }
        @media (min-width: 640px) {
          .zw-search-input-box {
            padding: 13px 18px;
            border-radius: 20px;
          }
        }

        /* Mobile: Horizontal Scrollable Pills | Desktop: Clean Wrapped Pills */
        .zw-search-pills {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .zw-search-pills::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 680px) {
          .zw-search-pills {
            flex-wrap: wrap;
            overflow-x: visible;
            padding-bottom: 0;
          }
        }

        .zw-search-pill-btn {
          padding: 8px 15px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.24);
          color: rgba(255, 255, 255, 0.94);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.22s ease;
        }
        .zw-search-pill-btn:hover {
          background: #D44515;
          border-color: #D44515;
          color: #FFFFFF;
          transform: translateY(-1px);
        }

        .zw-search-results-card {
          margin-top: 14px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.45);
          border-radius: 18px;
          padding: 8px;
          box-shadow: 0 24px 54px -12px rgba(26, 23, 21, 0.24);
          max-height: 56vh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #C8B6A6 transparent;
        }

        .zw-search-result-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 12px;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background 0.18s ease;
        }
        .zw-search-result-row:hover {
          background: #F3EFEA;
        }

        .zw-search-result-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #1A1715;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div
        data-lenis-prevent="true"
        onClick={onClose}
        className="zw-search-backdrop"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="zw-search-panel"
        >
          {/* Top Bar: Close Button (Top-Left) + ESC Hint */}
          <div className="zw-search-topbar">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="zw-search-close-btn"
            >
              <X size={19} strokeWidth={1.8} />
            </button>

            <span
              className="hidden md:inline"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.65)",
              }}
            >
              Press ESC to close
            </span>
          </div>

          {/* Editorial Title */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 1.5vw, 19px)",
                color: "#F3B6A2",
                marginBottom: 4,
              }}
            >
              ZoOwill Official Catalogue
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(25px, 3.8vw, 34px)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                color: "#FFFFFF",
                lineHeight: 1.15,
              }}
            >
              Find What You&apos;re Looking For
            </h2>
          </div>

          {/* Search Input Bar */}
          <div className="zw-search-input-box">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                background: "#F3EFEA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#D44515",
              }}
            >
              <Search size={18} strokeWidth={1.8} />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search saddles, bridles, harnesses, SKU..."
              aria-label="Search ZoOwill products"
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 16,
                color: "#1A1715",
                background: "transparent",
              }}
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#F3EFEA",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#736B65",
                  flexShrink: 0,
                }}
              >
                <X size={13} strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Category Collections Strip */}
          <div style={{ marginTop: 18 }}>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.65)",
                marginBottom: 10,
              }}
            >
              Browse by Collection
            </p>
            <div className="zw-search-pills">
              {CAT_PILLS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => jumpToCategory(cat.id, onClose)}
                  className="zw-search-pill-btn"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Search Results */}
          {results.length > 0 && (
            <div className="zw-search-results-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 10px 8px",
                  borderBottom: "1px solid rgba(231, 174, 175, 0.25)",
                  marginBottom: 4,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#736B65",
                  }}
                >
                  Showing {results.length} of {totalMatches} matching product
                  {totalMatches !== 1 ? "s" : ""}
                </p>

                {totalMatches > results.length && (
                  <button
                    type="button"
                    onClick={() => jumpToCategory("all", onClose)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#D44515",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    View All →
                  </button>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {results.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onViewProduct) {
                        onViewProduct(p);
                      } else {
                        const el = document.getElementById("featured");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="zw-search-result-row"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        minWidth: 0,
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 10,
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "#F3EFEA",
                          border: "1px solid rgba(231, 174, 175, 0.28)",
                        }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          onError={handleImageError}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p className="zw-search-result-title">{p.name}</p>
                        <p
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 11.5,
                            color: "#1A1715",
                            marginTop: 3,
                            fontWeight: 600,
                          }}
                        >
                          {formatPrice(p.priceINR, p.priceMax)}
                          <span
                            style={{
                              marginLeft: 8,
                              fontSize: 10.5,
                              color: "#8C827A",
                              fontWeight: 500,
                              textTransform: "capitalize",
                            }}
                          >
                            · {p.category}
                          </span>
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      size={15}
                      strokeWidth={1.6}
                      style={{ color: "#D44515", flexShrink: 0 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty Search State */}
          {query.trim().length > 1 && results.length === 0 && (
            <div
              style={{
                marginTop: 14,
                background: "#FFFFFF",
                border: "1px solid rgba(231, 174, 175, 0.35)",
                borderRadius: 18,
                padding: "32px 20px",
                textAlign: "center",
                boxShadow: "0 20px 45px -12px rgba(26, 23, 21, 0.16)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: "#1A1715",
                  marginBottom: 6,
                }}
              >
                No matching products found.
              </p>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  color: "#736B65",
                  lineHeight: 1.6,
                  maxWidth: 380,
                  margin: "0 auto 18px",
                }}
              >
                Try another keyword or choose one of the collections above to browse the full catalogue.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "9px 18px",
                  borderRadius: 100,
                  background: "#1A1715",
                  color: "#FFFFFF",
                  border: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={12} strokeWidth={2} /> Reset Search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}