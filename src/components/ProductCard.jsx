import { useState } from "react";
import { Eye } from "lucide-react";
import { formatPrice, handleImageError } from "../data/products";

const COLOR_MAP = {
  Black: "#1A1715", Brown: "#7B4D2A", Tan: "#C4956A", White: "#F5F5F0",
  Blue: "#4A7BC4", Red: "#C0392B", Beige: "#D4B896", Silver: "#A0A0A8",
  Gold: "#C8A84B", Bronze: "#8B6914", Green: "#4A8A5A", Natural: "#D4B896", Multi: "#E7AEAF",
};

export default function ProductCard({ product, onView }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize,  setSelectedSize]  = useState(product.sizes[0]);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="product-card"
      style={{
        display: "flex", flexDirection: "column", gap: 14,
        background: "white", borderRadius: 20, padding: "12px 12px 18px",
        border: `1px solid ${hovered ? "rgba(212,69,21,0.4)" : "rgba(231,174,175,0.3)"}`,
        boxShadow: hovered
          ? "0 24px 60px -10px rgba(26,23,21,0.12)"
          : "0 4px 20px -6px rgba(26,23,21,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.42s cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onView(product)}
    >
      {/* ── Image — 4:4.5 portrait ─────────────────────────── */}
      <div style={{
        position: "relative", borderRadius: 14,
        overflow: "hidden", background: "#F3EFEA", aspectRatio: "4/4.5",
      }}>
        <img
          src={product.image}
          alt={product.name}
          onError={handleImageError}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* Badge */}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span className="badge">{product.badge}</span>
        </div>

        {/* Hover overlay — fade-in with slide-up */}
        <div
          className="prod-hover-overlay"
          style={{
            borderRadius: 14,
            transition: "opacity 0.3s ease",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onView(product); }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "white", border: "none", borderRadius: 100,
              padding: "11px 22px", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#1A1715",
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: "0 4px 14px -4px rgba(26,23,21,0.18)",
            }}
          >
            <Eye size={14} strokeWidth={1.5} /> View Product Details
          </button>
        </div>
      </div>

      {/* ── Info ───────────────────────────────────────────── */}
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <p style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: 10, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "#736B65", marginBottom: 4,
        }}>
          {product.category}
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 17, fontWeight: 400, color: "#1A1715",
          lineHeight: 1.3, marginBottom: 10,
        }}>
          {product.name}
        </p>

        {/* Color swatches */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
          {product.colors.map((c) => (
            <button
              key={c} title={c}
              onClick={(e) => { e.stopPropagation(); setSelectedColor(c); }}
              className={`color-swatch ${selectedColor === c ? "active" : ""}`}
              style={{ background: COLOR_MAP[c] || "#ccc" }}
            />
          ))}
        </div>

        {/* Size pills */}
        {product.sizes.length > 1 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(sz); }}
                className={`size-pill ${selectedSize === sz ? "active" : ""}`}
              >
                {sz}
              </button>
            ))}
          </div>
        )}

        {/* Price + details */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginTop: 4, flexWrap: "wrap", gap: 6,
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 16, fontWeight: 700, color: "#1A1715",
              letterSpacing: "-0.01em",
            }}>
              {formatPrice(product.priceINR, product.priceMax)}
            </p>
            {product.mrp && product.mrp > product.priceINR && (
              <span style={{ fontSize: 11, color: "#9E948C", textDecoration: "line-through" }}>
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onView(product); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
              color: hovered ? "#D44515" : "#1A1715",
              display: "flex", alignItems: "center", gap: 4,
              transition: "color 0.25s",
            }}
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}
