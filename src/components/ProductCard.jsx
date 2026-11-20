import { useState } from "react";
import { Eye } from "lucide-react";
import { formatPrice, handleImageError } from "../data/products";

const COLOR_MAP = {
  Black: "#1A1715", Brown: "#7B4D2A", Tan: "#C4956A", White: "#F5F5F0",
  Blue: "#4A7BC4", Red: "#C0392B", Beige: "#D4B896", Silver: "#A0A0A8",
  Gold: "#C8A84B", Bronze: "#8B6914", Green: "#4A8A5A", Natural: "#D4B896", Multi: "#E7AEAF",
  Yellow: "#EAB308", Orange: "#EA580C", Turquoise: "#0D9488", Grey: "#6B7280", Purple: "#7C3AED", Pink: "#EC4899",
};

export default function ProductCard({ product, onView }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize,  setSelectedSize]  = useState(product.sizes[0]);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        background: "white",
        borderRadius: 18,
        padding: "10px 10px 14px",
        border: `1px solid ${hovered ? "rgba(212,69,21,0.4)" : "rgba(231,174,175,0.32)"}`,
        boxShadow: hovered
          ? "0 24px 60px -10px rgba(26,23,21,0.12)"
          : "0 4px 20px -6px rgba(26,23,21,0.06)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.38s cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onView(product)}
    >
      <div>
        <div
          style={{
            position: "relative",
            borderRadius: 13,
            overflow: "hidden",
            background: "#F3EFEA",
            aspectRatio: "4 / 4.2",
            marginBottom: 10,
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            onError={handleImageError}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          <div style={{ position: "absolute", top: 8, left: 8, right: 8 }}>
            <span className="badge" style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {product.badge}
            </span>
          </div>

          <div className="prod-hover-overlay">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(product);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "white",
                border: "none",
                borderRadius: 100,
                padding: "10px 18px",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1A1715",
                boxShadow: "0 4px 14px -4px rgba(26,23,21,0.18)",
              }}
            >
              <Eye size={13} strokeWidth={1.6} /> View Details
            </button>
          </div>
        </div>

        <div style={{ paddingLeft: 2, paddingRight: 2 }}>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8C827A",
              marginBottom: 4,
            }}
          >
            {product.category}
          </p>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 1.3vw, 17.5px)",
              fontWeight: 500,
              color: "#1A1715",
              lineHeight: 1.28,
              marginBottom: 8,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.56em",
            }}
          >
            {product.name}
          </p>

          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
            {product.colors.map((c) => (
              <button
                key={c}
                title={c}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`color-swatch ${selectedColor === c ? "active" : ""}`}
                style={{ background: COLOR_MAP[c] || "#ccc" }}
              />
            ))}
          </div>

          {product.sizes.length > 1 && (
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
              {product.sizes.slice(0, 3).map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`size-pill ${selectedSize === sz ? "active" : ""}`}
                >
                  {sz}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 8,
          borderTop: "1px solid rgba(231,174,175,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              fontWeight: 700,
              color: "#1A1715",
              letterSpacing: "-0.01em",
            }}
          >
            {formatPrice(product.priceINR, product.priceMax)}
          </p>
          {product.mrp && product.mrp > product.priceINR && (
            <span style={{ fontSize: 10.5, color: "#9E948C", textDecoration: "line-through" }}>
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(product);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: hovered ? "#D44515" : "#1A1715",
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            transition: "color 0.25s",
          }}
        >
          Details →
        </button>
      </div>
    </div>
  );
}