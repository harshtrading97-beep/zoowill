import { ArrowRight, ArrowUpRight } from "lucide-react";
import { handleImageError } from "../data/products";

export default function MegaMenu({ item, isOpen, onEnter, onLeave }) {
  const handleSelect = (e) => {
    if (e) e.preventDefault();
    if (item.category) {
      const el = document.getElementById("featured");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      try {
        sessionStorage.setItem("zw_cat", item.category);
      } catch (_) { /* noop */ }
      window.dispatchEvent(
        new CustomEvent("zw:filterCategory", { detail: item.category })
      );
    }
    if (onLeave) onLeave();
  };

  const colCount = item.sub?.length || 1;

  return (
    <>
      <style>{`
        .zw-mega-panel {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(250, 248, 245, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid rgba(231, 174, 175, 0.42);
          border-bottom: 1px solid rgba(231, 174, 175, 0.55);
          box-shadow: 0 28px 65px -18px rgba(26, 23, 21, 0.14);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateY(-8px);
          transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      visibility 0.28s ease;
          z-index: 100;
        }
        .zw-mega-panel.is-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateY(0);
        }

        .zw-mega-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 28px 34px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr)) minmax(260px, 310px);
          gap: 32px;
          align-items: start;
        }
        .zw-mega-inner.single-col {
          grid-template-columns: minmax(260px, 1fr) minmax(280px, 340px);
          max-width: 920px;
        }

        .zw-mega-group {
          padding-right: 16px;
          border-right: 1px solid rgba(231, 174, 175, 0.28);
        }
        .zw-mega-group:last-of-type {
          border-right: none;
          padding-right: 0;
        }

        .zw-mega-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #5C544E;
          text-decoration: none;
          padding: 3px 0;
          transition: color 0.2s ease, transform 0.22s ease;
        }
        .zw-mega-link:hover {
          color: #D44515;
          transform: translateX(4px);
        }
        .zw-mega-link-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #D44515;
          opacity: 0;
          transition: opacity 0.2s ease;
          flex-shrink: 0;
        }
        .zw-mega-link:hover .zw-mega-link-dot {
          opacity: 1;
        }

        .zw-mega-featured {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          height: 224px;
          background: #EFE9E1;
          border: 1px solid rgba(231, 174, 175, 0.45);
          cursor: pointer;
          box-shadow: 0 14px 32px -12px rgba(26, 23, 21, 0.2);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s ease;
        }
        .zw-mega-featured:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 42px -12px rgba(26, 23, 21, 0.28);
        }
        .zw-mega-featured:hover .zw-mega-featured-img {
          transform: scale(1.06);
        }
        .zw-mega-featured:hover .zw-mega-featured-arrow {
          background: #D44515;
          color: #FFFFFF;
          border-color: #D44515;
        }

        .zw-mega-bottom-bar {
          max-width: 1240px;
          margin: 0 auto;
          padding: 12px 28px 16px;
          border-top: 1px solid rgba(231, 174, 175, 0.28);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .zw-mega-bottom-bar.single-col {
          max-width: 920px;
        }
      `}</style>

      <div
        className={`zw-mega-panel ${isOpen ? "is-open" : ""}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className={`zw-mega-inner ${colCount === 1 ? "single-col" : ""}`}>
          {/* Sub-category Link Columns */}
          {item.sub.map((group, gi) => (
            <div key={gi} className="zw-mega-group">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#D44515",
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {group.heading}
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                }}
              >
                {group.items.map((itm, ii) => (
                  <li key={ii}>
                    <a
                      href="#featured"
                      onClick={handleSelect}
                      className="zw-mega-link"
                    >
                      <span className="zw-mega-link-dot" />
                      <span>{itm}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Featured Editorial Card */}
          {item.featured && (
            <div onClick={handleSelect} className="zw-mega-featured">
              <img
                src={item.featured.img}
                alt={item.featured.title}
                onError={handleImageError}
                className="zw-mega-featured-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(26,23,21,0.06) 25%, rgba(26,23,21,0.78) 100%)",
                }}
              />

              {/* Top-Right Arrow Circle */}
              <div
                className="zw-mega-featured-arrow"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.92)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1A1715",
                  transition: "all 0.25s ease",
                }}
              >
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </div>

              {/* Bottom Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 18,
                  right: 18,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "#FFFFFF",
                    lineHeight: 1.18,
                  }}
                >
                  {item.featured.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 11.5,
                    color: "rgba(255, 255, 255, 0.84)",
                    marginTop: 4,
                  }}
                >
                  {item.featured.sub}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Quick-Jump Strip */}
        <div className={`zw-mega-bottom-bar ${colCount === 1 ? "single-col" : ""}`}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: 15,
              color: "#736B65",
            }}
          >
            Handcrafted Saddlery &amp; Stable Equipment · Harsh International
          </span>

          <a
            href="#featured"
            onClick={handleSelect}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#D44515",
              textDecoration: "none",
            }}
          >
            <span>Browse All {item.label}</span>
            <ArrowRight size={13} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </>
  );
}