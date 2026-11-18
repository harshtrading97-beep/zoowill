import { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { products, handleImageError, formatPrice } from "../data/products";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery("");
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = query.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div className={`search-overlay ${isOpen ? "open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", cursor: "pointer", color: "#736B65" }}>
        <X size={22} strokeWidth={1.5} />
      </button>
      <div style={{ width: "100%", maxWidth: 600, padding: "0 24px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#736B65", marginBottom: 16, textAlign: "center" }}>
          Search the ZoOwill Catalogue
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(231,174,175,0.5)", borderRadius: 8, padding: "13px 18px", background: "white" }}>
          <Search size={18} strokeWidth={1.5} style={{ color: "#736B65", flexShrink: 0 }} />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Saddle, harness, bridle…"
            style={{ flex: 1, border: "none", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, color: "#1A1715", background: "transparent" }} />
          {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#736B65" }}><X size={16} strokeWidth={1.5} /></button>}
        </div>

        {results.length > 0 && (
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
            {results.map(p => (
              <a key={p.id} href="#featured" onClick={onClose}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 8, textDecoration: "none", transition: "background 0.2s ease" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F3EFEA"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#F3EFEA" }}>
                  <img src={p.image} alt={p.name} onError={handleImageError} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#1A1715" }}>{p.name}</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "#736B65", marginTop: 2 }}>{formatPrice(p.priceINR)}</p>
                </div>
              </a>
            ))}
          </div>
        )}
        {query.length > 1 && results.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 32, color: "#736B65", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14 }}>No products found for "{query}"</p>
        )}
      </div>
    </div>
  );
}
