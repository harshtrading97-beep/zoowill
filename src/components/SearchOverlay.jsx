import { useState, useRef, useEffect, useCallback } from "react";
import { X, Search, ArrowRight, Tag } from "lucide-react";
import { products, handleImageError, formatPrice, categories } from "../data/products";

/* Quick-filter category pills shown before typing */
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

/* Smooth scroll to #featured; optionally store a category hint in sessionStorage
   so FeaturedCatalogue can pick it up on mount if wired up */
function jumpToCategory(catId, onClose) {
  onClose();
  // Small delay so overlay fade-out is visible before scroll jumps
  setTimeout(() => {
    const el = document.getElementById("featured");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // Store category so FeaturedCatalogue can filter (optional wire-up)
    try { sessionStorage.setItem("zw_cat", catId); } catch (_) { /* noop */ }
    // Dispatch a custom event that FeaturedCatalogue listens for
    window.dispatchEvent(new CustomEvent("zw:filterCategory", { detail: catId }));
  }, 220);
}

export default function SearchOverlay({ isOpen, onClose, onViewProduct }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  /* Body scroll lock */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 160);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Escape key */
  const handleKey = useCallback((e) => {
    if (e.key === "Escape" && isOpen) onClose();
  }, [isOpen, onClose]);
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* Live results */
  const results = query.trim().length > 1
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 7)
    : [];

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes zwSearchIn {
          from { opacity:0; transform:translateY(-18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes zwBdIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
      `}</style>

      {/* ── Backdrop ──────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(26,23,21,0.52)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          animation: "zwBdIn 0.22s ease forwards",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "10vh",
          paddingBottom: 32,
          overflowY: "auto",
        }}
      >
        {/* ── Search panel ──────────────────────────────────────── */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(100% - 32px, 660px)",
            animation: "zwSearchIn 0.3s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        >
          {/* ── Close button — top-right of panel ──────────────── */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <button
              onClick={onClose}
              aria-label="Close search"
              style={{
                width: 42, height: 42, borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(231,174,175,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#1A1715",
                boxShadow: "0 4px 14px rgba(26,23,21,0.1)",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1A1715";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.92)";
                e.currentTarget.style.color = "#1A1715";
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              <X size={20} strokeWidth={1.8} />
            </button>
          </div>

          {/* ── Heading ───────────────────────────────────────── */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(24px,3.5vw,32px)",
            fontWeight: 300,
            letterSpacing: "0.02em",
            color: "white",
            marginBottom: 16, textAlign: "center",
          }}>
            Find What You're Looking For
          </h2>

          {/* ── Input row ──────────────────────────────────────── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            border: "1px solid rgba(231,174,175,0.5)",
            borderRadius: 16, padding: "14px 20px",
            background: "white",
            boxShadow: "0 20px 50px -10px rgba(26,23,21,0.14)",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#F3EFEA",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, color: "#736B65",
            }}>
              <Search size={20} strokeWidth={1.8} />
            </div>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search saddles, bridles, harnesses, horse care..."
              style={{
                flex: 1, border: "none", outline: "none",
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 16, color: "#1A1715", background: "transparent",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "#F3EFEA", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#736B65",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(231,174,175,0.4)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#F3EFEA"}
              >
                <X size={13} strokeWidth={2} />
              </button>
            )}
          </div>

          {/* ── Category suggestion pills (always visible) ─────── */}
          <div style={{ marginTop: 20 }}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.55)",
              marginBottom: 11,
            }}>
              <Tag size={11} strokeWidth={1.5} style={{ verticalAlign: "middle", marginRight: 5 }} />
              Quick Suggestions
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CAT_PILLS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => jumpToCategory(cat.id, onClose)}
                  style={{
                    padding: "7px 16px", borderRadius: 100,
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    color: "rgba(255,255,255,0.90)",
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: 11, fontWeight: 500, letterSpacing: "0.07em",
                    cursor: "pointer",
                    transition: "background 0.22s, border-color 0.22s, transform 0.22s",
                    backdropFilter: "blur(6px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#D44515";
                    e.currentTarget.style.borderColor = "#D44515";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Live results dropdown ───────────────────────────── */}
          {results.length > 0 && (
            <div style={{
              marginTop: 16,
              background: "white",
              border: "1px solid rgba(231,174,175,0.3)",
              borderRadius: 16,
              padding: 10,
              boxShadow: "0 24px 50px -12px rgba(26,23,21,0.16)",
              maxHeight: "46vh",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#C8B6A6 transparent",
            }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 10, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.12em",
                color: "#736B65", padding: "7px 12px 5px",
              }}>
                {results.length} Product{results.length !== 1 ? "s" : ""} Found
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      if (onViewProduct) {
                        onViewProduct(p);
                      } else {
                        const el = document.getElementById("featured");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px", borderRadius: 12,
                      background: "transparent", border: "none",
                      width: "100%", textAlign: "left",
                      cursor: "pointer",
                      transition: "background 0.18s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#F3EFEA"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 10,
                        overflow: "hidden", flexShrink: 0,
                        background: "#F3EFEA",
                        border: "1px solid rgba(231,174,175,0.22)",
                      }}>
                        <img src={p.image} alt={p.name} onError={handleImageError}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <p style={{
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          fontSize: 13, fontWeight: 500, color: "#1A1715",
                        }}>
                          {p.name}
                        </p>
                        <p style={{
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          fontSize: 11, color: "#736B65", marginTop: 2, fontWeight: 500,
                        }}>
                          {formatPrice(p.priceINR, p.priceMax)}
                          <span style={{
                            marginLeft: 8,
                            fontSize: 10,
                            color: "#A09890",
                            textTransform: "capitalize",
                          }}>
                            · {p.category}
                          </span>
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={15} strokeWidth={1.5}
                      style={{ color: "#736B65", opacity: 0.5, flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── No results ─────────────────────────────────────── */}
          {query.trim().length > 1 && results.length === 0 && (
            <div style={{
              marginTop: 16,
              background: "white",
              border: "1px solid rgba(231,174,175,0.28)",
              borderRadius: 16, padding: "36px 24px",
              textAlign: "center",
              boxShadow: "0 20px 45px -12px rgba(26,23,21,0.1)",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 22, fontWeight: 400, color: "#1A1715",
                marginBottom: 8,
              }}>
                Nothing found just yet.
              </p>
              <p style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 13, color: "#736B65", lineHeight: 1.6,
                maxWidth: 420, margin: "0 auto",
              }}>
                No matching products found. Try a different search term or browse the complete ZoOwill collection.
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
