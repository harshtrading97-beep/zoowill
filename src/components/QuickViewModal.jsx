import { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  ArrowLeft,
  ArrowUpRight,
  ShoppingBag,
  MessageCircle,
  Star,
  CheckCircle,
  ShieldCheck,
  Truck,
  Award,
  Sparkles,
  ChevronRight,
  Layers,
  RotateCcw,
  Share2,
  Check,
} from "lucide-react";
import { formatPrice, handleImageError, categories } from "../data/products";
import { getReviews } from "../data/reviews";

const COLOR_MAP = {
  Black: "#1A1715",
  Brown: "#7B4D2A",
  Tan: "#C4956A",
  White: "#F5F5F0",
  Blue: "#3B6998",
  Red: "#B93226",
  Beige: "#D8C3A5",
  Silver: "#A4A4AB",
  Gold: "#C8A84B",
  Bronze: "#8B6914",
  Green: "#3D7A4F",
  Natural: "#D2BA9F",
  Multi: "#E7AEAF",
  Orange: "#D45A15",
  Yellow: "#D9A72E",
  Turquoise: "#2A8C96",
  Grey: "#7E7A76",
  Purple: "#6E4B8A",
  Pink: "#D47A92",
};

function StarRow({ rating = 5, size = 14 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          strokeWidth={0}
          fill={s <= Math.round(rating) ? "#D44515" : "#E2D9D0"}
        />
      ))}
    </div>
  );
}

export default function ProductModal({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "Black");
  const [selectedSize, setSelectedSize]   = useState(product?.sizes?.[0] || "Standard");
  const [copied, setCopied]               = useState(false);
  const scrollContainerRef                = useRef(null);

  const handleShare = useCallback(() => {
    const url = window.location.href;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  useEffect(() => {
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || "Black");
      setSelectedSize(product.sizes?.[0] || "Standard");
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [product]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!product) return null;

  const reviews = getReviews(product.id, product.category);
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  const categoryObj = categories.find((c) => c.id === product.category);
  const categoryLabel = categoryObj ? categoryObj.label : product.category;

  const waMsg = encodeURIComponent(
    `Hello ZoOwill Equestrian,\n\nI would like to enquire about *${product.name}*:\n` +
      `• Price: ${formatPrice(product.priceINR, product.priceMax)}\n` +
      `• Colour: ${selectedColor}\n` +
      `• Size: ${selectedSize}\n` +
      `• SKU: ${product.sku}\n` +
      `${product.asin ? `• ASIN: ${product.asin}\n` : ""}` +
      `${product.amazonUrl ? `• Link: ${product.amazonUrl}\n` : ""}\n` +
      `Please share availability, dispatch timeline, and wholesale details.`
  );

  const whatsappUrl = `https://wa.me/916394549702?text=${waMsg}`;

  return (
    <>
      <style>{`
        @keyframes zwModalFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .zw-pm-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #FAF8F5;
          overflow-y: auto;
          overflow-x: clip;
          -webkit-overflow-scrolling: touch;
          animation: zwModalFadeUp 0.36s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          padding-bottom: calc(84px + env(safe-area-inset-bottom, 0px));
        }
        @media (min-width: 768px) {
          .zw-pm-overlay {
            padding-bottom: 0;
          }
        }

        .zw-pm-header {
          position: sticky;
          top: 0;
          z-index: 40;
          padding-top: env(safe-area-inset-top, 0px);
          background: rgba(250, 248, 245, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(231, 174, 175, 0.42);
        }
        .zw-pm-header-inner {
          max-width: 1320px;
          margin: 0 auto;
          height: 62px;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .zw-pm-header-inner {
            height: 70px;
            padding: 0 28px;
          }
        }

        .zw-pm-breadcrumb {
          display: none;
        }
        @media (min-width: 860px) {
          .zw-pm-breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 11px;
            color: #736B65;
          }
        }

        .zw-pm-crumb-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          font-size: 11px;
          font-weight: 500;
          color: #6B625C;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .zw-pm-crumb-btn:hover {
          color: #D44515;
        }

        .zw-pm-pill-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          height: 38px;
          padding: 0 14px;
          border-radius: 100px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.6);
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(26, 23, 21, 0.04);
          transition: all 0.25s ease;
        }
        .zw-pm-pill-btn:hover {
          border-color: #D44515;
          color: #D44515;
          transform: translateY(-1px);
        }
        .zw-pm-pill-btn.is-copied {
          background: #1A1715;
          border-color: #1A1715;
          color: #FAF8F5;
        }

        .zw-pm-close-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #1A1715;
          border: 1px solid #1A1715;
          color: #FAF8F5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .zw-pm-close-circle:hover {
          background: #D44515;
          border-color: #D44515;
          transform: rotate(90deg);
        }

        .zw-pm-main {
          max-width: 1320px;
          margin: 0 auto;
          padding: 20px 14px 48px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (min-width: 768px) {
          .zw-pm-main {
            padding: 34px 28px 64px;
            gap: 36px;
          }
        }
        @media (min-width: 1024px) {
          .zw-pm-main {
            grid-template-columns: 1fr 1fr;
            gap: 52px;
            padding: 42px 28px 76px;
          }
        }

        .zw-pm-left-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 1024px) {
          .zw-pm-left-col {
            position: sticky;
            top: 94px;
          }
        }

        .zw-pm-stage {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4 / 3.5;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.52);
          box-shadow: 0 26px 64px -22px rgba(26, 23, 21, 0.16);
          transition: border-color 0.35s ease, box-shadow 0.4s ease;
        }
        @media (min-width: 768px) {
          .zw-pm-stage {
            border-radius: 28px;
            aspect-ratio: 1 / 0.92;
          }
        }
        .zw-pm-stage:hover {
          border-color: rgba(212, 69, 21, 0.45);
          box-shadow: 0 30px 72px -18px rgba(26, 23, 21, 0.22),
                      0 10px 28px -10px rgba(212, 69, 21, 0.16);
        }
        .zw-pm-stage::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 100%
          );
          transform: skewX(-18deg);
          transition: left 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 3;
        }
        .zw-pm-stage:hover::after {
          left: 150%;
        }
        .zw-pm-stage-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-pm-stage:hover .zw-pm-stage-img {
          transform: scale(1.04);
        }

        .zw-pm-assurance {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        @media (min-width: 540px) {
          .zw-pm-assurance {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .zw-pm-assurance-item {
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.45);
          border-radius: 18px;
          padding: 14px 10px;
          text-align: center;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .zw-pm-assurance-item:hover {
          border-color: rgba(212, 69, 21, 0.42);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -12px rgba(26, 23, 21, 0.12);
        }

        .zw-pm-right-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .zw-pm-price-box {
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.52);
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 14px 36px -16px rgba(26, 23, 21, 0.08);
        }
        @media (min-width: 768px) {
          .zw-pm-price-box {
            padding: 22px 24px;
            border-radius: 22px;
          }
        }

        .zw-pm-swatch-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 100px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.6);
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .zw-pm-swatch-btn:hover {
          border-color: #1A1715;
        }
        .zw-pm-swatch-btn.is-selected {
          background: #1A1715;
          border-color: #1A1715;
          color: #FAF8F5;
          box-shadow: 0 6px 16px -4px rgba(26, 23, 21, 0.3);
        }

        .zw-pm-size-btn {
          min-width: 48px;
          padding: 8px 16px;
          border-radius: 100px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.6);
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .zw-pm-size-btn:hover {
          border-color: #D44515;
          color: #D44515;
        }
        .zw-pm-size-btn.is-selected {
          background: #D44515;
          border-color: #D44515;
          color: #FFFFFF;
          box-shadow: 0 6px 16px -4px rgba(212, 69, 21, 0.4);
        }

        .zw-pm-amazon-cta {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          min-height: 52px;
          padding: 7px 7px 7px 24px;
          border-radius: 100px;
          background: linear-gradient(135deg, #D44515 0%, #B8370C 100%);
          border: 1px solid rgba(255, 224, 198, 0.4);
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 14px 32px -8px rgba(212, 69, 21, 0.55),
                      inset 0 1px 0 rgba(255, 255, 255, 0.24);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-pm-amazon-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #1A1715;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-pm-amazon-cta::after {
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
          transition: left 0.72s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 1;
        }
        .zw-pm-amazon-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px -8px rgba(26, 23, 21, 0.4);
        }
        .zw-pm-amazon-cta:hover::before {
          transform: scaleX(1);
        }
        .zw-pm-amazon-cta:hover::after {
          left: 150%;
        }

        .zw-pm-amazon-badge {
          position: relative;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          color: #D44515;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-pm-amazon-cta:hover .zw-pm-amazon-badge {
          background: #D44515;
          color: #FFFFFF;
          transform: rotate(45deg);
        }

        .zw-pm-wa-cta {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          min-height: 50px;
          padding: 6px 6px 6px 24px;
          border-radius: 100px;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.75);
          color: #1A1715;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 8px 22px -8px rgba(26, 23, 21, 0.09);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      color 0.32s ease,
                      border-color 0.32s ease;
        }
        .zw-pm-wa-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #1A1715;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-pm-wa-cta:hover {
          color: #FAF8F5;
          border-color: #1A1715;
          transform: translateY(-2px);
        }
        .zw-pm-wa-cta:hover::before {
          transform: scaleX(1);
        }

        .zw-pm-wa-badge {
          position: relative;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FAF8F5;
          border: 1px solid rgba(231, 174, 175, 0.65);
          color: #D44515;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-pm-wa-cta:hover .zw-pm-wa-badge {
          background: #D44515;
          border-color: #D44515;
          color: #FFFFFF;
          transform: rotate(45deg);
        }

        .zw-pm-info-card {
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.48);
          border-radius: 20px;
          padding: 20px 18px;
          box-shadow: 0 12px 32px -16px rgba(26, 23, 21, 0.06);
        }
        @media (min-width: 768px) {
          .zw-pm-info-card {
            padding: 24px 26px;
            border-radius: 22px;
          }
        }

        .zw-pm-mobile-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 10px 14px calc(10px + env(safe-area-inset-bottom, 0px));
          background: rgba(250, 248, 245, 0.96);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-top: 1px solid rgba(231, 174, 175, 0.55);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          box-shadow: 0 -10px 30px -10px rgba(26, 23, 21, 0.14);
        }
        @media (min-width: 768px) {
          .zw-pm-mobile-bar {
            display: none;
          }
        }
      `}</style>

      <div
        ref={scrollContainerRef}
        data-lenis-prevent="true"
        className="zw-pm-overlay"
      >
        <header className="zw-pm-header">
          <div className="zw-pm-header-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
              <button
                type="button"
                onClick={onClose}
                title="Return to Catalogue"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/logo.jpeg"
                  alt="ZoOwill Equestrian"
                  style={{
                    height: 38,
                    width: "auto",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    display: "block",
                  }}
                />
              </button>

              <nav className="zw-pm-breadcrumb" aria-label="Breadcrumb">
                <button type="button" onClick={onClose} className="zw-pm-crumb-btn">
                  Home
                </button>
                <ChevronRight size={12} style={{ color: "#B8AEA6", flexShrink: 0 }} />
                <button
                  type="button"
                  onClick={onClose}
                  className="zw-pm-crumb-btn"
                  style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {categoryLabel}
                </button>
                <ChevronRight size={12} style={{ color: "#B8AEA6", flexShrink: 0 }} />
                <span
                  style={{
                    color: "#1A1715",
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 320,
                  }}
                >
                  {product.name}
                </span>
              </nav>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <button
                type="button"
                onClick={handleShare}
                title="Copy link"
                className={`zw-pm-pill-btn ${copied ? "is-copied" : ""}`}
              >
                {copied ? <Check size={13} /> : <Share2 size={13} />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
              </button>

              <button type="button" onClick={onClose} className="zw-pm-pill-btn">
                <ArrowLeft size={14} />
                <span className="hidden md:inline">Back to Catalogue</span>
                <span className="inline md:hidden">Back</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close product view"
                className="zw-pm-close-circle"
              >
                <X size={17} strokeWidth={1.9} />
              </button>
            </div>
          </div>
        </header>

        <main className="zw-pm-main">
          <div className="zw-pm-left-col">
            <div className="zw-pm-stage">
              <img
                src={product.image}
                alt={product.name}
                onError={handleImageError}
                className="zw-pm-stage-img"
              />

              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  right: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  zIndex: 4,
                  pointerEvents: "none",
                }}
              >
                {product.badge ? (
                  <span
                    style={{
                      padding: "5px 12px",
                      borderRadius: 100,
                      background: "#1A1715",
                      color: "#FAF8F5",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {product.badge}
                  </span>
                ) : (
                  <span />
                )}

                <span
                  style={{
                    padding: "5px 12px",
                    borderRadius: 100,
                    background: "rgba(250, 248, 245, 0.92)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(231, 174, 175, 0.45)",
                    color: "#1A1715",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  Handcrafted in India
                </span>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  zIndex: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "6px 13px",
                  borderRadius: 100,
                  background: "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(231, 174, 175, 0.5)",
                  boxShadow: "0 6px 18px rgba(26, 23, 21, 0.12)",
                }}
              >
                <StarRow rating={Number(avgRating)} size={13} />
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "#1A1715",
                  }}
                >
                  {avgRating}
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10.5,
                    color: "#736B65",
                  }}
                >
                  ({reviews.length} Verified)
                </span>
              </div>
            </div>

            <div className="zw-pm-assurance">
              {[
                { Icon: ShieldCheck, title: "Drum-Dyed", sub: "Quality Materials" },
                { Icon: Award, title: "Artisan Craft", sub: "Kanpur & Aligarh" },
                { Icon: Truck, title: "PAN-India", sub: "Insured Dispatch" },
                { Icon: RotateCcw, title: "Retail & B2B", sub: "Wholesale Ready" },
              ].map(({ Icon, title, sub }) => (
                <div key={title} className="zw-pm-assurance-item">
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    style={{ color: "#D44515", margin: "0 auto 5px" }}
                  />
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: "#1A1715",
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 10,
                      color: "#736B65",
                      marginTop: 2,
                    }}
                  >
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="zw-pm-right-col">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#736B65",
                  }}
                >
                  {categoryLabel} &nbsp;·&nbsp; SKU: {product.sku}
                  {product.asin ? ` · ASIN: ${product.asin}` : ""}
                </span>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 10px",
                    borderRadius: 100,
                    background: "rgba(46, 125, 50, 0.1)",
                    color: "#2E7D32",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 700,
                  }}
                >
                  <CheckCircle size={12} /> In Stock
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(26px, 3.2vw, 38px)",
                  fontWeight: 500,
                  color: "#1A1715",
                  lineHeight: 1.16,
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                {product.name}
              </h1>

              {product.description && (
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 13.5,
                    lineHeight: 1.65,
                    color: "#5C544E",
                    marginBottom: 10,
                  }}
                >
                  {product.description}
                </p>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StarRow rating={Number(avgRating)} size={14} />
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1A1715",
                  }}
                >
                  {avgRating}
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                    color: "#736B65",
                  }}
                >
                  ({reviews.length} Verified Customer Reviews)
                </span>
              </div>
            </div>

            <div className="zw-pm-price-box">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: "8px 12px",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(26px, 3vw, 34px)",
                    fontWeight: 700,
                    color: "#1A1715",
                    lineHeight: 1,
                  }}
                >
                  {formatPrice(product.priceINR, product.priceMax)}
                </span>

                {product.mrp && product.mrp > product.priceINR && (
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 15,
                      color: "#9A8F86",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                )}

                {product.discount && (
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#D44515",
                      background: "rgba(212, 69, 21, 0.1)",
                      padding: "3px 10px",
                      borderRadius: 100,
                    }}
                  >
                    {product.discount}
                  </span>
                )}
              </div>

            <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: "#6B625C",
                  lineHeight: 1.5,
                  marginBottom: 12,
                }}
              >
                Prices listed in Indian Rupees (INR). Final taxes and delivery details are confirmed on Amazon or via direct enquiry.
              </p>

              <div
                style={{
                  paddingTop: 10,
                  borderTop: "1px solid rgba(231, 174, 175, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 8,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11.5,
                  color: "#736B65",
                }}
              >
                <span>Retail &amp; bulk stable enquiries welcome</span>
                <span style={{ fontWeight: 700, color: "#1A1715" }}>
                  PAN-India Dispatch
                </span>
              </div>
            </div>

            {product.colors?.length > 0 && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#1A1715" }}>
                    Colour:{" "}
                    <span style={{ color: "#D44515", fontWeight: 700 }}>
                      {selectedColor}
                    </span>
                  </span>
                  <span style={{ fontSize: 11, color: "#8C827A" }}>
                    {product.colors.length}{" "}
                    {product.colors.length === 1 ? "Option" : "Options"}
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {product.colors.map((colorName) => {
                    const isSelected = selectedColor === colorName;
                    return (
                      <button
                        key={colorName}
                        type="button"
                        onClick={() => setSelectedColor(colorName)}
                        className={`zw-pm-swatch-btn ${isSelected ? "is-selected" : ""}`}
                      >
                        <span
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: "50%",
                            backgroundColor: COLOR_MAP[colorName] || "#C8B6A6",
                            border: "1px solid rgba(0,0,0,0.2)",
                            flexShrink: 0,
                          }}
                        />
                        <span>{colorName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#1A1715" }}>
                    Size / Fit:{" "}
                    <span style={{ color: "#D44515", fontWeight: 700 }}>
                      {selectedSize}
                    </span>
                  </span>
                  <span style={{ fontSize: 11, color: "#8C827A" }}>
                    Select Variant
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`zw-pm-size-btn ${isSelected ? "is-selected" : ""}`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zw-pm-amazon-cta"
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <ShoppingBag size={16} strokeWidth={2} />
                  <span>Buy Now on Amazon</span>
                </span>
                <span className="zw-pm-amazon-badge" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zw-pm-wa-cta"
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MessageCircle
                    size={16}
                    strokeWidth={2}
                    style={{ color: "#D44515" }}
                  />
                  <span>Enquire about this Product</span>
                </span>
                <span className="zw-pm-wa-badge" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={2.1} />
                </span>
              </a>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11.5,
                  color: "#736B65",
                  lineHeight: 1.55,
                  textAlign: "center",
                  padding: "2px 6px 0",
                }}
              >
                Need bulk pricing or custom sizing? Send an enquiry with your selected size and colour.
              </p>
            </div>

            <div className="zw-pm-info-card">
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#1A1715",
                  marginBottom: 14,
                }}
              >
                <Layers size={14} style={{ color: "#D44515" }} />
                <span>Details &amp; Specifications</span>
              </h3>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.58,
                  color: "#524A44",
                }}
              >
                {product.specs?.map((spec, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#D44515",
                        marginTop: 7,
                        flexShrink: 0,
                      }}
                    />
                    <span>{spec}</span>
                  </li>
                ))}
                <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#D44515",
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    <strong>Manufacturer:</strong> Harsh International, Kanpur, India.
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#D44515",
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    <strong>Care Guide:</strong> Wipe clean after use and store in a dry, ventilated tack room.
                  </span>
                </li>
              </ul>
            </div>

            <div className="zw-pm-info-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  paddingBottom: 14,
                  marginBottom: 16,
                  borderBottom: "1px solid rgba(231, 174, 175, 0.38)",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 23,
                      fontWeight: 500,
                      color: "#1A1715",
                      lineHeight: 1.15,
                    }}
                  >
                    Customer Reviews
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11.5,
                      color: "#736B65",
                      marginTop: 3,
                    }}
                  >
                    Verified feedback from riders &amp; stables across India
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <StarRow rating={Number(avgRating)} size={13} />
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1A1715",
                      }}
                    >
                      {avgRating}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#D44515",
                    }}
                  >
                    Authentic Feedback
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 16,
                      background: "#FAF8F5",
                      border: "1px solid rgba(231, 174, 175, 0.35)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "#1A1715",
                            color: "#FAF8F5",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 10.5,
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {rev.reviewer.avatar.slice(0, 2)}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: "#1A1715",
                          }}
                        >
                          {rev.reviewer.name}
                        </span>
                      </div>

                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 11,
                          color: "#8C827A",
                        }}
                      >
                        {rev.date}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 12.5,
                        lineHeight: 1.6,
                        color: "#524A44",
                        marginBottom: 10,
                      }}
                    >
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 6,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 11,
                        color: "#736B65",
                      }}
                    >
                      <span>{rev.reviewer.location}</span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          color: "#2E7D32",
                          fontWeight: 600,
                        }}
                      >
                        <CheckCircle size={11} /> Verified Buyer
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer
          style={{
            background: "#F3EFEA",
            borderTop: "1px solid rgba(231, 174, 175, 0.45)",
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              maxWidth: 1320,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src="/logo.jpeg"
                alt="ZoOwill"
                style={{
                  height: 32,
                  width: "auto",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: "#6B625C",
                }}
              >
                ZoOwill Equestrian · Harsh International · Crafted for the Horse.
              </p>
            </div>

            <button type="button" onClick={onClose} className="zw-pm-pill-btn">
              <ArrowLeft size={14} />
              <span>Back to Full Catalogue</span>
            </button>
          </div>
        </footer>

        <div className="zw-pm-mobile-bar">
          <div style={{ minWidth: 0 }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#736B65",
              }}
            >
              Price (INR)
            </span>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#1A1715",
              }}
            >
              {formatPrice(product.priceINR, product.priceMax)}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1px solid rgba(231, 174, 175, 0.7)",
                color: "#D44515",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MessageCircle size={18} strokeWidth={2} />
            </a>

            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                height: 42,
                padding: "0 18px",
                borderRadius: 100,
                background: "#D44515",
                color: "#FFFFFF",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 8px 20px -6px rgba(212, 69, 21, 0.55)",
              }}
            >
              <ShoppingBag size={14} strokeWidth={2} />
              <span>Buy on Amazon</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}