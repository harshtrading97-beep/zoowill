import { useState, useEffect, useCallback, useMemo } from "react";
import {
  X,
  ArrowLeft,
  ShoppingBag,
  ExternalLink,
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
} from "lucide-react";
import { formatPrice, handleImageError, categories } from "../data/products";
import { getReviews } from "../data/reviews";
import "./ProductModal.css";

/* ─── Colour map for color swatches ──────────────────────── */
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
};

/* ─── Verified Equestrian Image Pool for Gallery Thumbnails ─── */
const ANGLE_POOL = [
  "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1450052590821-8bf91254a353?auto=format&fit=crop&w=1400&q=85",
];

/* ─── Star Rating Row Component ──────────────────────────── */
function StarRow({ rating = 5, size = 15 }) {
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          strokeWidth={0}
          fill={s <= rating ? "#D44515" : "#E2D9D0"}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ZOOWILL 100% FULL-SCREEN DEDICATED PRODUCT PAGE VIEW
   ══════════════════════════════════════════════════════════ */
export default function ProductModal({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "Black");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '17"');
  const [activeImage, setActiveImage] = useState(product?.image);
  const [copied, setCopied] = useState(false);

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

  /* ── 1. Strict Scroll Lock on HTML & Body ── */
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

  /* ── Reset state when product changes ── */
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || "Black");
      setSelectedSize(product.sizes?.[0] || '17"');
      setActiveImage(product.image);
    }
  }, [product]);

  /* ── Escape key closes view ── */
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

  /* ── Multi-angle gallery images ── */
  const galleryImages = useMemo(() => {
    if (!product) return [];
    const baseId = product.id || 1;
    return [
      { label: "Main Angle", src: product.image },
      { label: "Side Profile", src: ANGLE_POOL[(baseId + 1) % ANGLE_POOL.length] },
      { label: "Hardware & Grain", src: ANGLE_POOL[(baseId + 3) % ANGLE_POOL.length] },
      { label: "Stable Setting", src: ANGLE_POOL[(baseId + 5) % ANGLE_POOL.length] },
    ];
  }, [product]);

  if (!product) return null;

  const reviews = getReviews(product.id, product.category);
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  const categoryObj = categories.find((c) => c.id === product.category);
  const categoryLabel = categoryObj ? categoryObj.label : product.category;

  const waMsg = encodeURIComponent(
    `Hello ZoOwill Equestrian,\n\nI am inquiring about the *${product.name}*:\n` +
      `• Price: ${formatPrice(product.priceINR, product.priceMax)}\n` +
      `• Colour: ${selectedColor}\n` +
      `• Size: ${selectedSize}\n` +
      `• SKU: ${product.sku}\n` +
      `• ASIN: ${product.asin || ""}\n` +
      `• Link: ${product.amazonUrl || ""}\n\n` +
      `Please provide dispatch timeline and B2B wholesale quotation.`
  );

  return (
    <div data-lenis-prevent="true" className="zoowill-product-container">
      {/* ── TOP STICKY HEADER BAR ── */}
      <header className="zoowill-header">
        <div className="zoowill-header-inner">
          <div className="zoowill-header-left">
            <button
              onClick={onClose}
              className="zoowill-logo-btn"
              title="Return to Catalogue"
            >
              <img
                src="/logo.jpeg"
                alt="ZoOwill Equestrian"
                className="zoowill-logo-img"
              />
            </button>

            <nav className="zoowill-breadcrumb">
              <button onClick={onClose} className="zoowill-breadcrumb-link">
                Home
              </button>
              <ChevronRight size={12} className="zoowill-breadcrumb-sep" />
              <button onClick={onClose} className="zoowill-breadcrumb-link uppercase">
                {categoryLabel}
              </button>
              <ChevronRight size={12} className="zoowill-breadcrumb-sep" />
              <span className="zoowill-breadcrumb-current">{product.name}</span>
            </nav>
          </div>

          <div className="zoowill-header-right">
            <button
              onClick={handleShare}
              title="Copy product link to clipboard"
              className={`zoowill-share-btn ${copied ? "copied" : ""}`}
            >
              <Share2 size={13} />
              <span className="zoowill-share-text">{copied ? "Copied!" : "Share"}</span>
            </button>

            <button onClick={onClose} className="zoowill-back-btn">
              <ArrowLeft size={14} />
              <span className="zoowill-back-text-full">Back to Catalogue</span>
              <span className="zoowill-back-text-short">Back</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close product view"
              className="zoowill-close-icon-btn"
            >
              <X size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN PRODUCT CONTENT AREA ── */}
      <main className="zoowill-main-grid">
        {/* ════ LEFT COLUMN: Sticky Image Gallery ════ */}
        <div className="zoowill-left-col">
          <div className="zoowill-main-image-card">
            <img
              src={activeImage}
              alt={product.name}
              onError={handleImageError}
              className="zoowill-main-img"
            />

            <div className="zoowill-image-badges">
              {product.badge && (
                <span className="zoowill-badge-primary">{product.badge}</span>
              )}
              <span className="zoowill-badge-secondary">Handcrafted India</span>
            </div>

            <div className="zoowill-rating-pill">
              <StarRow rating={5} size={13} />
              <span className="zoowill-rating-score">{avgRating} / 5.0</span>
              <span className="zoowill-rating-sub">({reviews.length} Verified)</span>
            </div>
          </div>

          {/* Heritage & Assurance Strip */}
          <div className="zoowill-assurance-grid">
            <div className="zoowill-assurance-card">
              <ShieldCheck size={18} className="zoowill-assurance-icon" />
              <p className="zoowill-assurance-title">Full-Grain</p>
              <p className="zoowill-assurance-desc">Vegetable Tanned</p>
            </div>
            <div className="zoowill-assurance-card">
              <Award size={18} className="zoowill-assurance-icon" />
              <p className="zoowill-assurance-title">Artisan Craft</p>
              <p className="zoowill-assurance-desc">Kashmir & Aligarh</p>
            </div>
            <div className="zoowill-assurance-card">
              <Truck size={18} className="zoowill-assurance-icon" />
              <p className="zoowill-assurance-title">PAN-India</p>
              <p className="zoowill-assurance-desc">Insured Transit</p>
            </div>
            <div className="zoowill-assurance-card">
              <RotateCcw size={18} className="zoowill-assurance-icon" />
              <p className="zoowill-assurance-title">Export Ready</p>
              <p className="zoowill-assurance-desc">B2B & Retail</p>
            </div>
          </div>
        </div>

        {/* ════ RIGHT COLUMN: Product Details & Purchasing ════ */}
        <div className="zoowill-right-col">
          <div>
            <div className="zoowill-category-row">
              <span className="zoowill-category-label">
                Product Overview • {categoryLabel} • SKU: {product.sku} {product.asin ? `• ASIN: ${product.asin}` : ""}
              </span>
              <span className="zoowill-stock-badge">
                <CheckCircle size={12} /> In Stock
              </span>
            </div>

            <h1 className="zoowill-product-title">{product.name}</h1>

            <div className="zoowill-review-summary-row">
              <StarRow rating={5} size={15} />
              <span className="zoowill-review-score-txt">⭐ {avgRating}</span>
              <span className="zoowill-review-count-txt">
                ({reviews.length} Customer Reviews)
              </span>
            </div>
          </div>

          {/* Bold INR Price & Dispatch Info */}
          <div className="zoowill-price-card">
            <div className="zoowill-price-row" style={{ alignItems: "baseline", flexWrap: "wrap", gap: "8px 12px" }}>
              <span className="zoowill-price-amount">
                {formatPrice(product.priceINR, product.priceMax)}
              </span>
              {product.mrp && product.mrp > product.priceINR && (
                <span style={{ fontSize: "16px", color: "#9E948C", textDecoration: "line-through" }}>
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
              )}
              {product.discount && (
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#D44515", background: "rgba(212,69,21,0.08)", padding: "2px 8px", borderRadius: "100px" }}>
                  {product.discount}
                </span>
              )}
              <span className="zoowill-price-curr">INR (Indian Rupees)</span>
            </div>
            <p className="zoowill-gst-note">
              <Sparkles size={13} className="zoowill-gst-icon" />
              Prices displayed in Indian Rupees (INR). Applicable taxes and delivery charges, if any, will be confirmed at purchase.
            </p>
            <div className="zoowill-dispatch-footer">
              <span>Retail &amp; wholesale enquiries welcome</span>
              <span className="zoowill-dispatch-bold">PAN-India Dispatch</span>
            </div>
          </div>

          {/* Interactive Color Swatches */}
          {product.colors?.length > 0 && (
            <div className="zoowill-inline-option">
              <div className="zoowill-inline-option-header">
                <span className="zoowill-option-title">
                  Select Colour: <span className="zoowill-option-value">{selectedColor}</span>
                </span>
                <span className="zoowill-option-count">{product.colors.length} Available</span>
              </div>
              <div className="zoowill-swatch-list">
                {product.colors.map((colorName) => {
                  const isSelected = selectedColor === colorName;
                  return (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className={`zoowill-swatch-btn ${isSelected ? "selected" : ""}`}
                    >
                      <span
                        className="zoowill-swatch-dot"
                        style={{ backgroundColor: COLOR_MAP[colorName] || "#C8B6A6" }}
                      />
                      <span>{colorName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Size Selection Pills */}
          {product.sizes?.length > 0 && (
            <div className="zoowill-inline-option">
              <div className="zoowill-inline-option-header">
                <span className="zoowill-option-title">
                  Select Size: <span className="zoowill-option-value">{selectedSize}</span>
                </span>
                <span className="zoowill-option-count">Available Variants</span>
              </div>
              <div className="zoowill-size-list">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`zoowill-size-btn ${isSelected ? "selected" : ""}`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons: Amazon Buy Now & WhatsApp */}
          <div className="zoowill-action-stack">
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="zoowill-amazon-btn"
            >
              <ShoppingBag size={17} strokeWidth={2} />
              <span>Buy Now on Amazon</span>
              <ExternalLink size={14} strokeWidth={2} className="zoowill-ext-icon" />
            </a>

            <a
              href={`https://wa.me/916394549702?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="zoowill-whatsapp-btn"
            >
              <MessageCircle size={17} strokeWidth={2} className="zoowill-wa-icon" />
              <span>Enquire about this Product</span>
            </a>

            <p style={{
              fontSize: 11.5,
              color: "#736B65",
              lineHeight: 1.55,
              textAlign: "center",
              padding: "4px 8px 0",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}>
              Have a question about this product? Send us an enquiry with your preferred size and colour to discuss availability and further details.
            </p>

            <div className="zoowill-trust-strip">
              <span>
                <ShieldCheck size={13} className="zoowill-trust-icon" /> Secure Amazon Order
              </span>
              <span>•</span>
              <span>Authentic ZoOwill Product</span>
              <span>•</span>
              <span>Handcrafted in India</span>
            </div>
          </div>

          {/* Details & Specifications Card */}
          <div className="zoowill-specs-card">
            <h3 className="zoowill-specs-heading">
              <Layers size={14} className="zoowill-specs-heading-icon" />
              Details &amp; Specifications
            </h3>
            
            <ul className="zoowill-specs-list">
              {product.specs?.map((spec, i) => (
                <li key={i} className="zoowill-spec-item">
                  <span className="zoowill-spec-bullet" />
                  <span>{spec}</span>
                </li>
              ))}
              <li className="zoowill-spec-item">
                <span className="zoowill-spec-bullet" />
                <span><strong>Leather &amp; Materials:</strong> Vegetable tanned leather with rich natural grain and reinforced stitching.</span>
              </li>
              <li className="zoowill-spec-item">
                <span className="zoowill-spec-bullet" />
                <span><strong>Hardware:</strong> Solid hand-forged brass and corrosion-resistant fittings.</span>
              </li>
              <li className="zoowill-spec-item">
                <span className="zoowill-spec-bullet" />
                <span><strong>Equine Ergonomics:</strong> Designed for comfort, clear spine channel and balanced weight distribution.</span>
              </li>
              <li className="zoowill-spec-item">
                <span className="zoowill-spec-bullet" />
                <span><strong>Care Recommendation:</strong> Wipe with a damp cloth after use; condition periodically with leather dressing.</span>
              </li>
            </ul>
          </div>

          {/* Customer Reviews Section */}
          <div className="zoowill-reviews-card">
            <div className="zoowill-reviews-card-header">
              <div>
                <h3 className="zoowill-reviews-title">Customer Reviews</h3>
                <p className="zoowill-reviews-subtitle">Feedback from riders, trainers &amp; stables across India</p>
              </div>
              <div className="zoowill-reviews-score-block">
                <div className="zoowill-reviews-score-top">
                  <StarRow rating={5} size={13} />
                  <span className="zoowill-reviews-num">{avgRating}</span>
                </div>
                <span className="zoowill-reviews-verified-tag">Authentic Feedback</span>
              </div>
            </div>

            <div className="zoowill-review-list">
              {reviews.map((rev, idx) => (
                <div key={idx} className="zoowill-review-item">
                  <div className="zoowill-review-item-header">
                    <div className="zoowill-reviewer-info">
                      <div className="zoowill-reviewer-avatar">
                        {rev.reviewer.avatar.slice(0, 2)}
                      </div>
                      <span className="zoowill-reviewer-name">{rev.reviewer.name}</span>
                    </div>
                    <span className="zoowill-review-date">{rev.date}</span>
                  </div>

                  <p className="zoowill-review-comment">"{rev.comment}"</p>

                  <div className="zoowill-review-item-footer">
                    <span>{rev.reviewer.location}</span>
                    <span className="zoowill-review-verified-badge">
                      <CheckCircle size={10} /> Verified Order
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── BOTTOM RETURN STRIP ── */}
      <footer className="zoowill-footer">
        <div className="zoowill-footer-inner">
          <div className="zoowill-footer-brand">
            <img src="/logo.jpeg" alt="ZoOwill" className="zoowill-footer-logo" />
            <p className="zoowill-footer-txt">
              ZoOwill Equestrian • Indian Saddlery Traditions • Crafted for the Horse. Made for the Journey.
            </p>
          </div>

          <button onClick={onClose} className="zoowill-footer-back-btn">
            <ArrowLeft size={14} /> Back to Full Catalogue
          </button>
        </div>
      </footer>
    </div>
  );
}