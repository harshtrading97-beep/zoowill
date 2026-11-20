import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { handleImageError } from "../data/products";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const SLIDES = [
  {
    num: "01",
    eyebrow: "Indian Saddlemaking & Equestrian Craft",
    headline: ["Crafted with Purpose.", "Made for Every Ride."],
    sub: "A considered collection of saddles, leather harnesses, and stable essentials — uniting traditional Indian craftsmanship with modern horse care.",
    cta1: { label: "Explore the Collection", href: "#featured" },
    cta2: { label: "Best Sellers", href: "#bestsellers" },
    image: hero1,
  },
  {
    num: "02",
    eyebrow: "For the Arena, the Track & Beyond",
    headline: ["Ready for the", "Ride Ahead."],
    sub: "From dressage and jumping saddles to polo and endurance tack, discover riding equipment engineered for balance and control.",
    cta1: { label: "Riding Equipment", href: "#featured" },
    cta2: { label: "Browse Saddlery", href: "#featured" },
    image: hero2,
  },
  {
    num: "03",
    eyebrow: "Essentials for Every Stable",
    headline: ["Thoughtful Care.", "From Head to Hoof."],
    sub: "Practical essentials for daily horse care, including waterproof turnout rugs, padded halters, grooming tools, and protective gear.",
    cta1: { label: "Explore Horse Care", href: "#featured" },
    cta2: { label: "View Catalogue", href: "#featured" },
    image: hero3,
  },
  {
    num: "04",
    eyebrow: "Master Artisan Heritage",
    headline: ["Uncompromising", "Leather Quality."],
    sub: "Handcrafted drum-dyed leather goods built to enduring equestrian standards with solid brass and stainless steel fittings.",
    cta1: { label: "Full Catalogue", href: "#featured" },
    cta2: { label: "Enquire on WhatsApp", href: "https://wa.me/916394549702" },
    image: hero4,
  },
];

const INTERVAL = 4200;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const [progKey, setProgKey] = useState(0);

  const contentRef  = useRef(null);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const ctx         = useRef(null);

  const animateIn = () => {
    if (!contentRef.current) return;
    ctx.current?.revert();
    ctx.current = gsap.context(() => {
      gsap.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-line",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 0.8, ease: "power3.out", delay: 0.06 }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.24 }
      );
      gsap.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.36 }
      );
    }, contentRef);
  };

  useEffect(() => {
    animateIn();
  }, [current]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      setProgKey((k) => k + 1);
    }, INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const goTo = (i) => {
    setCurrent(i);
    setProgKey((k) => k + 1);
  };
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  /* Touch swipe handlers for mobile */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) {
      setPaused(false);
      return;
    }
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
    setPaused(false);
  };

  const slide = SLIDES[current];

  return (
    <>
      <style>{`
        @keyframes zwHeroProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .zw-hero-progress-bar {
          animation: zwHeroProgress ${INTERVAL}ms linear forwards;
        }

        .zw-hero-wrapper {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: calc(102px + env(safe-area-inset-top, 0px)) 12px 20px;
        }
        @media (min-width: 640px) {
          .zw-hero-wrapper {
            padding: calc(114px + env(safe-area-inset-top, 0px)) 20px 26px;
          }
        }
        @media (min-width: 1024px) {
          .zw-hero-wrapper {
            padding: calc(158px + env(safe-area-inset-top, 0px)) 28px 32px;
          }
        }

        .zw-hero-frame {
          position: relative;
          width: 100%;
          min-height: 510px;
          height: calc(100svh - 126px);
          max-height: 620px;
          border-radius: 22px;
          overflow: hidden;
          background: #1A1715;
          box-shadow: 0 24px 64px -20px rgba(26, 23, 21, 0.28);
          border: 1px solid rgba(231, 174, 175, 0.28);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (min-width: 768px) {
          .zw-hero-frame {
            min-height: 520px;
            height: clamp(520px, 72vh, 660px);
            max-height: 680px;
            border-radius: 28px;
          }
        }

        /* Cinematic Legibility Scrim */
        .zw-hero-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(20, 17, 15, 0.34) 0%,
            rgba(20, 17, 15, 0.22) 32%,
            rgba(20, 17, 15, 0.78) 64%,
            rgba(20, 17, 15, 0.95) 100%
          );
        }
        @media (min-width: 768px) {
          .zw-hero-scrim {
            background: linear-gradient(
              102deg,
              rgba(20, 17, 15, 0.90) 0%,
              rgba(20, 17, 15, 0.62) 48%,
              rgba(20, 17, 15, 0.14) 100%
            );
          }
        }

        /* Top Editorial Status Strip */
        .zw-hero-top {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 18px 0;
        }
        @media (min-width: 768px) {
          .zw-hero-top {
            padding: 26px 32px 0 84px;
          }
        }

        /* Main Copy & CTA Area */
        .zw-hero-body {
          position: relative;
          z-index: 10;
          margin-top: auto;
          padding: 0 18px 14px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .zw-hero-body {
            padding: 0 56px 46px 84px;
            max-width: 740px;
          }
        }

        .zw-hero-cta-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        @media (min-width: 540px) {
          .zw-hero-cta-group {
            flex-direction: row;
            align-items: center;
            width: auto;
            gap: 12px;
          }
        }

        .zw-hero-primary-cta,
        .zw-hero-secondary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 44px;
          padding: 12px 22px;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 540px) {
          .zw-hero-primary-cta,
          .zw-hero-secondary-cta {
            width: auto;
            padding: 13px 26px;
          }
        }

        .zw-hero-primary-cta {
          background: #D44515;
          color: #FFFFFF;
          box-shadow: 0 10px 26px -6px rgba(212, 69, 21, 0.55);
        }
        .zw-hero-primary-cta:hover {
          background: #BF3A0F;
          transform: translateY(-2px);
        }

        .zw-hero-secondary-cta {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.28);
          color: #FFFFFF;
        }
        .zw-hero-secondary-cta:hover {
          background: #FFFFFF;
          color: #1A1715;
          border-color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* Mobile Bottom Controls Bar (Prevents arrows from covering text) */
        .zw-hero-mobile-footer {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px 16px;
        }
        @media (min-width: 768px) {
          .zw-hero-mobile-footer {
            display: none;
          }
        }

        .zw-mobile-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .zw-mobile-nav-btn:active {
          background: #D44515;
          border-color: #D44515;
        }

        /* Desktop Side Arrows & Bottom-Right Dots */
        .zw-desktop-arrow {
          display: none;
        }
        .zw-desktop-dots {
          display: none;
        }
        @media (min-width: 768px) {
          .zw-desktop-arrow {
            position: absolute;
            top: 50%;
            z-index: 12;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.28);
            color: #FFFFFF;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.28s ease;
          }
          .zw-desktop-arrow:hover {
            background: rgba(255, 255, 255, 0.32);
            transform: translateY(-50%) scale(1.06);
          }

          .zw-desktop-dots {
            position: absolute;
            bottom: 30px;
            right: 32px;
            z-index: 12;
            display: flex;
            align-items: center;
            gap: 8px;
          }
        }
      `}</style>

      <section className="zw-hero-wrapper" aria-label="Featured Collections">
        <div
          className="zw-hero-frame"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Crossfading Hero Images */}
          {SLIDES.map((s, i) => (
            <div
              key={s.num}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === current ? 1 : 0,
                transition: "opacity 1.1s cubic-bezier(0.76, 0, 0.24, 1)",
              }}
            >
              <img
                src={s.image}
                alt={s.eyebrow}
                onError={handleImageError}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 22%",
                  display: "block",
                  transform: i === current ? "scale(1)" : "scale(1.05)",
                  transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
              />
            </div>
          ))}

          {/* Legibility Gradient */}
          <div className="zw-hero-scrim" />

          {/* Top Bar: Clean Editorial Tag + Slide Counter */}
          <div className="zw-hero-top">
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.72)",
              }}
            >
              ZoOwill Equestrian
            </span>

            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>

          {/* Center-Bottom Editorial Copy & Actions */}
          <div ref={contentRef} className="zw-hero-body">
            {/* Italic Eyebrow (Zero AI pill box) */}
            <div className="hero-eyebrow" style={{ marginBottom: 6 }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 1.5vw, 21px)",
                  fontWeight: 500,
                  color: "#F3B6A2",
                  letterSpacing: "0.02em",
                }}
              >
                {slide.eyebrow}
              </span>
            </div>

            {/* Display Headline */}
            <h1
              style={{
                margin: "0 0 10px 0",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(31px, 4.5vw, 56px)",
                fontWeight: 400,
                lineHeight: 1.08,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              {slide.headline.map((line, i) => (
                <span key={i} className="hero-line" style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              className="hero-sub"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(12.5px, 1.05vw, 15px)",
                lineHeight: 1.58,
                color: "rgba(255, 255, 255, 0.84)",
                marginBottom: 18,
                maxWidth: 510,
              }}
            >
              {slide.sub}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-ctas zw-hero-cta-group">
              <a href={slide.cta1.href} className="zw-hero-primary-cta">
                <span>{slide.cta1.label}</span>
                <ArrowRight size={14} strokeWidth={1.8} />
              </a>

              <a
                href={slide.cta2.href}
                target={slide.cta2.href.startsWith("http") ? "_blank" : undefined}
                rel={slide.cta2.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="zw-hero-secondary-cta"
              >
                <span>{slide.cta2.label}</span>
                <ArrowRight size={14} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* Mobile Dedicated Bottom Bar (Dots + Prev/Next Buttons) */}
          <div className="zw-hero-mobile-footer">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === current ? 22 : 7,
                    height: 7,
                    borderRadius: 100,
                    padding: 0,
                    background: i === current ? "#D44515" : "rgba(255, 255, 255, 0.42)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="zw-mobile-nav-btn"
              >
                <ChevronLeft size={17} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="zw-mobile-nav-btn"
              >
                <ChevronRight size={17} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Desktop Side Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="zw-desktop-arrow"
            style={{ left: 22 }}
          >
            <ChevronLeft size={20} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="zw-desktop-arrow"
            style={{ right: 22 }}
          >
            <ChevronRight size={20} strokeWidth={1.8} />
          </button>

          {/* Desktop Bottom-Right Dots */}
          <div className="zw-desktop-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === current ? 26 : 8,
                  height: 8,
                  borderRadius: 100,
                  padding: 0,
                  background: i === current ? "#D44515" : "rgba(255, 255, 255, 0.45)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>

          {/* Slide Timer Progress Line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "rgba(255, 255, 255, 0.18)",
              zIndex: 15,
            }}
          >
            <div
              key={`${progKey}-${paused}`}
              className={paused ? "" : "zw-hero-progress-bar"}
              style={{
                height: "100%",
                background: "#D44515",
                width: paused ? "100%" : "0%",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}