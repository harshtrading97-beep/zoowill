import { X } from "lucide-react";

const NAV_ITEMS = ["HORSE", "SADDLERY", "HARNESS", "RIDER", "ENDURANCE & RACING", "PONY & FOAL", "STABLE", "ABOUT"];

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(26,23,21,0.3)", backdropFilter: "blur(4px)", zIndex: 998 }} />
      )}
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 300,
        background: "#FAF8F5", zIndex: 999,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.4s cubic-bezier(0.76,0,0.24,1)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 22px", borderBottom: "1px solid rgba(231,174,175,0.4)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src="/logo.jpeg" alt="ZoOwill" style={{ height: 40, width: "auto", objectFit: "contain", mixBlendMode: "multiply" }} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#736B65" }}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map(item => (
            <a key={item} href={item === "ABOUT" ? "#about" : "#featured"} onClick={onClose}
              style={{ display: "block", padding: "14px 0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1A1715", textDecoration: "none", borderBottom: "1px solid rgba(231,174,175,0.3)", transition: "color 0.2s ease" }}
              onMouseEnter={e => e.target.style.color = "#D44515"}
              onMouseLeave={e => e.target.style.color = "#1A1715"}>
              {item}
            </a>
          ))}
        </nav>

        <div style={{ padding: "0 22px 24px" }}>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
            onClick={onClose} className="btn btn-terra"
            style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
