import { handleImageError } from "../data/products";

export default function MegaMenu({ item, isOpen, onEnter, onLeave }) {
  const handleClick = () => {
    if (item.category) {
      const el = document.getElementById("featured");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("zw:filterCategory", { detail: item.category }));
    }
  };

  return (
    <div className={`mega-menu ${isOpen ? "open" : ""}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "36px 32px",
        display: "grid",
        gridTemplateColumns: item.sub.length <= 2 ? `repeat(${item.sub.length}, 1fr) 260px` : `repeat(3, 1fr) 260px`,
        gap: 28,
      }}>
        {item.sub.map((group, gi) => (
          <div key={gi}>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D44515", marginBottom: 12 }}>
              {group.heading}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {group.items.map((itm, ii) => (
                <li key={ii}>
                  <a href="#featured" onClick={handleClick}
                    style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: "#736B65", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={e => e.target.style.color = "#1A1715"} onMouseLeave={e => e.target.style.color = "#736B65"}>
                    {itm}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {item.featured && (
          <div onClick={handleClick} style={{ borderRadius: 14, overflow: "hidden", position: "relative", height: 200, background: "#F3EFEA", cursor: "pointer" }}>
            <img src={item.featured.img} alt={item.featured.title} onError={handleImageError}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,21,0.6), transparent)", padding: "16px" }}>
              <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 400, color: "white", lineHeight: 1.2 }}>{item.featured.title}</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{item.featured.sub}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
