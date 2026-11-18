import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { formatPrice, handleImageError } from "../data/products";

const COLOR_MAP = {
  Black: "#1A1715", Brown: "#7B4D2A", Tan: "#C4956A", White: "#F5F5F0",
  Blue: "#4A7BC4", Red: "#C0392B", Beige: "#D4B896", Silver: "#A0A0A8",
  Gold: "#C8A84B", Bronze: "#8B6914", Green: "#4A8A5A", Natural: "#D4B896", Multi: "#E7AEAF",
};

export default function ProductModal({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize,  setSelectedSize]  = useState(product?.sizes?.[0]);

  if (!product) return null;

  const waMsg = encodeURIComponent(`Hi ZoOwill, I'm interested in:\n*${product.name}*\nColour: ${selectedColor}\nSize: ${selectedSize}\nPrice: ${formatPrice(product.priceINR)}\n\nSKU: ${product.sku}\n\nPlease share more details.`);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#FAF8F5", borderRadius: 22, maxWidth: 820, width: "100%",
        maxHeight: "92vh", overflow: "hidden",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        position: "relative",
        boxShadow: "0 32px 80px -16px rgba(26,23,21,0.22)",
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 18, right: 18, zIndex: 10,
          background: "white", border: "1px solid rgba(231,174,175,0.4)", borderRadius: "50%",
          width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#1A1715",
        }}>
          <X size={16} strokeWidth={1.5} />
        </button>

        {/* Image side */}
        <div style={{ background: "#F3EFEA", overflow: "hidden", position: "relative", minHeight: 480 }}>
          <img src={product.image} alt={product.name} onError={handleImageError}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", top: 18, left: 18 }}>
            <span className="badge">{product.badge}</span>
          </div>
        </div>

        {/* Details side */}
        <div style={{ padding: "40px 32px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#736B65", marginBottom: 8 }}>
              {product.category} · SKU: {product.sku}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 400, color: "#1A1715", lineHeight: 1.2 }}>
              {product.name}
            </h2>
          </div>

          {/* Price */}
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 600, color: "#1A1715" }}>
              {formatPrice(product.priceINR)}
            </p>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "#736B65", marginTop: 2 }}>
              Exclusive of GST · B2B pricing available on inquiry
            </p>
          </div>

          {/* Color */}
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A1715", marginBottom: 10 }}>
              Colour: <span style={{ fontWeight: 400, color: "#736B65" }}>{selectedColor}</span>
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {product.colors.map(c => (
                <button key={c} title={c} onClick={() => setSelectedColor(c)}
                  style={{
                    width: 20, height: 20, borderRadius: "50%", background: COLOR_MAP[c] || "#ccc",
                    border: "2px solid transparent",
                    outline: selectedColor === c ? "2px solid #1A1715" : "2px solid transparent",
                    outlineOffset: 2, cursor: "pointer", transition: "all 0.2s ease",
                  }} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A1715", marginBottom: 10 }}>
              Size
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map(sz => (
                <button key={sz} onClick={() => setSelectedSize(sz)} className={`size-pill ${selectedSize === sz ? "active" : ""}`}>
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div style={{ background: "#F3EFEA", borderRadius: 12, padding: "16px 18px" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A1715", marginBottom: 10 }}>
              Specifications
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {product.specs.map((spec, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#736B65" }}>
                  <span style={{ color: "#D44515", flexShrink: 0, marginTop: 1 }}>–</span> {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/919999999999?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-terra"
            style={{ justifyContent: "center", width: "100%", textDecoration: "none" }}
          >
            <MessageCircle size={15} strokeWidth={1.5} />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
