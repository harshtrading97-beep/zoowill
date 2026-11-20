import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MoveLeft, MoveRight, Star } from "lucide-react";
import { bestSellers, formatPrice, handleImageError } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

export default function BestSellers({ onView }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);

    const firstCard = el.querySelector(".zw-bs-card");
    if (firstCard && bestSellers.length > 0) {
      const gap =
        parseFloat(
          getComputedStyle(el).columnGap || getComputedStyle(el).gap
        ) || 16;
      const step = firstCard.offsetWidth + gap;
      const idx = Math.min(
        bestSellers.length - 1,
        Math.max(0, Math.round(el.scrollLeft / step))
      );
      setActiveIndex(idx);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bs-heading",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".bs-card",
        { opacity: 0, y: 22, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTrack = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector(".zw-bs-card");
    const gap =
      parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) ||
      16;
    const cardStep = firstCard ? firstCard.offsetWidth + gap : 290;
    const multiplier = window.innerWidth >= 1024 ? 2 : 1;
    el.scrollBy({ left: dir * cardStep * multiplier, behavior: "smooth" });
  };

  const scrollToCard = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".zw-bs-card");
    const target = cards[index];
    if (target) {
      const paddingLeft = parseFloat(getComputedStyle(el).paddingLeft) || 16;
      el.scrollTo({
        left: target.offsetLeft - paddingLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{`
        .zw-bs-sec {
          position: relative;
          width: 100%;
          padding: 56px 0 64px;
          background: linear-gradient(180deg, #F6F1EA 0%, #FAF8F5 100%);
          border-top: 1px solid rgba(231, 174, 175, 0.35);
          border-bottom: 1px solid rgba(231, 174, 175, 0.35);
          overflow-x: clip;
        }
        @media (min-width: 768px) {
          .zw-bs-sec {
            padding: 88px 0 96px;
          }
        }

        .zw-bs-header {
          max-width: 1280px;
          margin: 0 auto 24px;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        @media (min-width: 640px) {
          .zw-bs-header {
            padding: 0 24px;
          }
        }
        @media (min-width: 768px) {
          .zw-bs-header {
            padding: 0 32px;
            margin-bottom: 38px;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 28px;
          }
        }

        .zw-bs-heading-copy {
          max-width: 610px;
        }

        .zw-bs-kicker {
          display: inline-block;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(17px, 1.6vw, 21px);
          font-weight: 600;
          color: #D44515;
          margin-bottom: 6px;
        }

        .zw-bs-main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 4.6vw, 52px);
          font-weight: 500;
          color: #1A1715;
          line-height: 1.08;
          letter-spacing: -0.015em;
          margin: 0 0 10px;
        }

        .zw-bs-subtitle {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(13px, 1.05vw, 14.5px);
          color: #6E655F;
          line-height: 1.6;
          margin: 0;
        }

        .zw-bs-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          padding-top: 4px;
        }
        @media (min-width: 768px) {
          .zw-bs-controls {
            width: auto;
            justify-content: flex-end;
            padding-top: 0;
            flex-shrink: 0;
          }
        }

        .zw-bs-arrows {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .zw-bs-arrow-btn {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(231, 174, 175, 0.65);
          background: #FFFFFF;
          color: #1A1715;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(26, 23, 21, 0.05);
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
                      background-color 0.24s ease,
                      color 0.24s ease,
                      border-color 0.24s ease,
                      box-shadow 0.28s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .zw-bs-arrow-btn svg {
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .zw-bs-arrow-btn:hover:not(:disabled) {
          background: #1A1715;
          color: #FAF8F5;
          border-color: #1A1715;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(26, 23, 21, 0.16);
        }
        .zw-bs-arrow-btn.prev:hover:not(:disabled) svg {
          transform: translateX(-3px);
        }
        .zw-bs-arrow-btn.next:hover:not(:disabled) svg {
          transform: translateX(3px);
        }
        .zw-bs-arrow-btn:active:not(:disabled) {
          transform: scale(0.92);
        }
        .zw-bs-arrow-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.6);
        }

        /* Bespoke Luxury "Explore All" Pill Button */
        .zw-bs-explore-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          min-height: 44px;
          padding: 5px 5px 5px 20px;
          border-radius: 100px;
          border: 1px solid rgba(231, 174, 175, 0.38);
          background: #1A1715;
          color: #FAF8F5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 10px 24px -6px rgba(26, 23, 21, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.14);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.32s ease,
                      box-shadow 0.32s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .zw-bs-explore-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #D44515 0%, #B8370C 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-bs-explore-btn::after {
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
          transition: left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 1;
        }
        .zw-bs-explore-btn:hover {
          border-color: rgba(243, 182, 162, 0.65);
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -6px rgba(212, 69, 21, 0.45);
        }
        .zw-bs-explore-btn:hover::before {
          transform: scaleX(1);
        }
        .zw-bs-explore-btn:hover::after {
          left: 150%;
        }
        .zw-bs-explore-btn:active {
          transform: scale(0.96);
        }

        .zw-bs-explore-badge {
          position: relative;
          z-index: 2;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #FAF8F5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-bs-explore-btn:hover .zw-bs-explore-badge {
          background: #FFFFFF;
          border-color: #FFFFFF;
          color: #D44515;
          transform: rotate(45deg);
        }

        /* Horizontal Snap Track */
        .zw-bs-track {
          position: relative;
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scroll-padding-left: 16px;
          padding: 8px 16px 24px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .zw-bs-track::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 640px) {
          .zw-bs-track {
            scroll-padding-left: 24px;
            padding: 10px 24px 26px;
            gap: 18px;
          }
        }
        @media (min-width: 768px) {
          .zw-bs-track {
            scroll-padding-left: max(32px, calc((100vw - 1280px) / 2 + 32px));
            padding: 10px max(32px, calc((100vw - 1280px) / 2 + 32px)) 28px;
            gap: 22px;
          }
        }

        /* Product Card with Warm Glow & Light Sheen Sweep */
        .zw-bs-card {
          position: relative;
          flex-shrink: 0;
          width: min(272px, 82vw);
          scroll-snap-align: start;
          border-radius: 20px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.45);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 26px -12px rgba(26, 23, 21, 0.08);
          transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.38s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        @media (min-width: 640px) {
          .zw-bs-card {
            width: 288px;
            border-radius: 22px;
          }
        }
        @media (min-width: 1024px) {
          .zw-bs-card {
            width: 304px;
          }
        }

        .zw-bs-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 82% 16%,
            rgba(255, 224, 198, 0.24) 0%,
            rgba(212, 69, 21, 0.1) 42%,
            transparent 72%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 2;
        }

        .zw-bs-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.34) 50%,
            transparent 100%
          );
          transform: skewX(-18deg);
          transition: left 0.75s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 3;
        }

        @media (hover: hover) {
          .zw-bs-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 24px 50px -14px rgba(26, 23, 21, 0.16),
                        0 10px 26px -10px rgba(212, 69, 21, 0.24),
                        0 0 0 1px rgba(212, 69, 21, 0.42);
            border-color: rgba(212, 69, 21, 0.65);
          }
          .zw-bs-card:hover::before {
            opacity: 1;
          }
          .zw-bs-card:hover::after {
            left: 150%;
          }
          .zw-bs-card:hover .zw-bs-img {
            transform: scale(1.06);
            filter: brightness(1.03);
          }
          .zw-bs-card:hover .zw-bs-details-btn {
            border-color: rgba(243, 182, 162, 0.65);
            box-shadow: 0 8px 18px rgba(212, 69, 21, 0.32);
          }
          .zw-bs-card:hover .zw-bs-details-btn::before {
            transform: scaleX(1);
          }
          .zw-bs-card:hover .zw-bs-details-btn::after {
            left: 150%;
          }
          .zw-bs-card:hover .zw-bs-details-badge {
            background: #FFFFFF;
            border-color: #FFFFFF;
            color: #D44515;
            transform: rotate(45deg);
          }
        }

        .zw-bs-img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          background: #F3EFEA;
          overflow: hidden;
        }

        .zw-bs-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                      filter 0.45s ease;
        }

        .zw-bs-img-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(26, 23, 21, 0) 62%, rgba(26, 23, 21, 0.18) 100%);
          pointer-events: none;
        }

        .zw-bs-rank {
          position: absolute;
          top: 11px;
          left: 11px;
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(26, 23, 21, 0.9);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #FAF8F5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .zw-bs-rating {
          position: absolute;
          top: 11px;
          right: 11px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 9px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #1A1715;
          box-shadow: 0 2px 8px rgba(26, 23, 21, 0.08);
        }

        .zw-bs-body {
          padding: 14px 16px 0;
        }

        .zw-bs-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 5px;
        }

        .zw-bs-cat {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #8C827A;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .zw-bs-discount {
          flex-shrink: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #D44515;
          background: rgba(212, 69, 21, 0.08);
          padding: 2px 7px;
          border-radius: 6px;
        }

        .zw-bs-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18.5px;
          font-weight: 600;
          color: #1A1715;
          line-height: 1.26;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 46px;
          margin: 0 0 12px;
        }

        .zw-bs-footer {
          padding: 12px 16px 15px;
          border-top: 1px solid rgba(231, 174, 175, 0.28);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .zw-bs-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #1A1715;
          line-height: 1.2;
          margin: 0;
        }

        .zw-bs-mrp {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          color: #9A8F86;
          text-decoration: line-through;
          margin: 2px 0 0;
        }

        /* Bespoke Luxury "Details" Pill Button */
        .zw-bs-details-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-height: 36px;
          padding: 4px 4px 4px 14px;
          border-radius: 100px;
          background: #1A1715;
          border: 1px solid rgba(231, 174, 175, 0.35);
          color: #FAF8F5;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(26, 23, 21, 0.14);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.26s ease,
                      box-shadow 0.28s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .zw-bs-details-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #D44515 0%, #B8370C 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .zw-bs-details-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -130%;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255, 255, 255, 0.32) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          transition: left 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 1;
        }
        .zw-bs-details-btn:active {
          transform: scale(0.95);
        }

        .zw-bs-details-badge {
          position: relative;
          z-index: 2;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #FAF8F5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Progress Dots */
        .zw-bs-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2px;
          margin-top: 8px;
          padding: 0 16px;
        }

        .zw-bs-dot-hit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 24px;
          padding: 0 4px;
          background: transparent;
          border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .zw-bs-dot-pill {
          display: block;
          height: 6px;
          border-radius: 100px;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease;
        }
      `}</style>

      <section id="bestsellers" ref={sectionRef} className="zw-bs-sec">
        <div className="bs-heading zw-bs-header">
          <div className="zw-bs-heading-copy">
            <span className="zw-bs-kicker">Customer Favourites</span>
            <h2 className="zw-bs-main-title">Frequently Explored</h2>
            <p className="zw-bs-subtitle">
              Standout pieces from the ZoOwill catalogue — from handcrafted Kashmiri Kathis and leather harnesses to everyday riding essentials.
            </p>
          </div>

          <div className="zw-bs-controls">
            <div className="zw-bs-arrows">
              <button
                type="button"
                aria-label="Scroll left"
                disabled={!canPrev}
                onClick={() => scrollTrack(-1)}
                className="zw-bs-arrow-btn prev"
              >
                <MoveLeft size={17} strokeWidth={1.9} />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                disabled={!canNext}
                onClick={() => scrollTrack(1)}
                className="zw-bs-arrow-btn next"
              >
                <MoveRight size={17} strokeWidth={1.9} />
              </button>
            </div>

            <a href="#featured" className="zw-bs-explore-btn">
              <span style={{ position: "relative", zIndex: 2 }}>Explore All</span>
              <span className="zw-bs-explore-badge" aria-hidden="true">
                <ArrowUpRight size={15} strokeWidth={2.1} />
              </span>
            </a>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="zw-bs-track"
        >
          {bestSellers.map((product, i) => (
            <article
              key={product.id}
              className="bs-card zw-bs-card"
              onClick={() => onView(product)}
            >
              <div>
                <div className="zw-bs-img-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={handleImageError}
                    className="zw-bs-img"
                  />
                  <div className="zw-bs-img-scrim" />

                  <span className="zw-bs-rank">
                    #{String(i + 1).padStart(2, "0")}
                  </span>

                  {product.rating && (
                    <div className="zw-bs-rating">
                      <Star size={11} fill="#D44515" color="#D44515" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="zw-bs-body">
                  <div className="zw-bs-meta-row">
                    <span className="zw-bs-cat">{product.category}</span>
                    {product.discount && (
                      <span className="zw-bs-discount">{product.discount}</span>
                    )}
                  </div>

                  <h3 className="zw-bs-title">{product.name}</h3>
                </div>
              </div>

              <div className="zw-bs-footer">
                <div>
                  <p className="zw-bs-price">{formatPrice(product.priceINR)}</p>
                  {product.mrp && product.mrp > product.priceINR && (
                    <p className="zw-bs-mrp">{formatPrice(product.mrp)}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(product);
                  }}
                  className="zw-bs-details-btn"
                >
                  <span style={{ position: "relative", zIndex: 2 }}>Details</span>
                  <span className="zw-bs-details-badge" aria-hidden="true">
                    <ArrowUpRight size={13} strokeWidth={2.1} />
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {bestSellers.length > 1 && (
          <div className="zw-bs-dots" role="tablist" aria-label="Product slides">
            {bestSellers.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to ${item.name}`}
                  onClick={() => scrollToCard(idx)}
                  className="zw-bs-dot-hit"
                >
                  <span
                    className="zw-bs-dot-pill"
                    style={{
                      width: isActive ? 22 : 6,
                      background: isActive ? "#D44515" : "rgba(26, 23, 21, 0.2)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}