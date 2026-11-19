import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { handleImageError } from "../data/products";

// Importing local images from src/assets as requested
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";

const SLIDES = [
  {
    num: "01",
    eyebrow: "INDIAN SADDLEMAKING & EQUESTRIAN CRAFT",
    headline: ["Crafted with Purpose.", "Made for Every Ride."],
    sub: "Discover a considered collection of saddles, leather harnesses and equestrian essentials, bringing together traditional Indian craftsmanship and the needs of modern horse care.",
    cta1: { label: "Explore the Collection", href: "#featured" },
    cta2: { label: "Discover Best Sellers", href: "#bestsellers" },
    image: hero1,
  },
  {
    num: "02",
    eyebrow: "FOR THE ARENA, THE TRACK & BEYOND",
    headline: ["Ready for the", "Ride Ahead."],
    sub: "From dressage and jumping saddles to endurance and racing equipment, explore riding essentials designed for different disciplines and equestrian pursuits.",
    cta1: { label: "Explore Riding Equipment", href: "#featured" },
    cta2: { label: "Browse Saddlery", href: "#featured" },
    image: hero2,
  },
  {
    num: "03",
    eyebrow: "ESSENTIALS FOR EVERY STABLE",
    headline: ["Thoughtful Care.", "From Head to Hoof."],
    sub: "Explore practical essentials for everyday horse care, including turnout rugs, halters, grooming tools, protective gear and stable accessories.",
    cta1: { label: "Explore Horse Care", href: "#featured" },
    cta2: { label: "View the Catalogue", href: "#featured" },
    image: hero3,
  },
  {
    num: "04",
    eyebrow: "MASTER ARTISAN HERITAGE",
    headline: ["Uncompromising", "Leather Quality."],
    sub: "Handcrafted full-grain leather goods built to surpass international equestrian standards with robust brass and stainless steel fittings.",
    cta1: { label: "View Full Catalogue", href: "#featured" },
    cta2: { label: "Enquire via WhatsApp", href: "https://wa.me/916394549702" },
    image: hero4,
  },
];

const INTERVAL = 3000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progKey, setProgKey] = useState(0);
  const contentRef = useRef(null);
  const intervalRef = useRef(null);
  const ctx = useRef(null);

  const animateIn = () => {
    if (!contentRef.current) return;
    ctx.current?.revert();
    ctx.current = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.05 }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: 0.35 }
      );
      gsap.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.5 }
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
  const slide = SLIDES[current];

  return (
    <section
      style={{
        paddingTop: "clamp(172px, 19vh, 196px)",
        marginTop: 8,
        paddingBottom: 32,
        paddingLeft: "clamp(16px, 2.5vw, 32px)",
        paddingRight: "clamp(16px, 2.5vw, 32px)",
        maxWidth: 1480,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          position: "relative",
          borderRadius: 28,
          overflow: "hidden",
          height: "clamp(480px, 70vh, 660px)",
          boxShadow: "0 30px 90px -25px rgba(26,23,21,0.28)",
          border: "1px solid rgba(231,174,175,0.25)",
        }}
      >
        {/* Background images crossfade aligned from top 0 */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.76,0,0.24,1)",
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
                objectPosition: "center top",
                display: "block",
                transformOrigin: "center top",
                transform: i === current ? "scale(1)" : "scale(1.04)",
                transition: "transform 1.2s cubic-bezier(0.76,0,0.24,1)",
              }}
            />
          </div>
        ))}

        {/* Warm directional gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(26,23,21,0.88) 0%, rgba(26,23,21,0.56) 48%, rgba(26,23,21,0.12) 100%)",
          }}
        />

        {/* Editorial content — left-aligned */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(28px, 4.5vw, 56px)",
            paddingLeft: "clamp(68px, 6.8vw, 96px)",
            maxWidth: 740,
            zIndex: 10,
          }}
        >
          {/* Eyebrow pill */}
          <div className="hero-eyebrow" style={{ marginBottom: 14 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 10.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "7px 16px",
                borderRadius: 100,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#D44515",
                }}
              />
              {slide.eyebrow}
            </span>
          </div>

          {/* Headline (compact & never clipped) */}
          <div style={{ marginBottom: 14 }}>
            {slide.headline.map((line, i) => (
              <div key={i} style={{ padding: "2px 0" }}>
                <span
                  className="hero-line"
                  style={{
                    display: "block",
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(32px, 4.2vw, 54px)",
                    fontWeight: 400,
                    lineHeight: 1.12,
                    color: "white",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p
            className="hero-sub"
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "clamp(13.5px, 1.05vw, 15px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.86)",
              marginBottom: 26,
              maxWidth: 520,
            }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <a
              href={slide.cta1.href}
              style={{
                background: "#D44515",
                color: "white",
                padding: "13px 24px",
                borderRadius: 100,
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 8px 25px -4px rgba(212,69,21,0.55)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C03911";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#D44515";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {slide.cta1.label} <ArrowRight size={14} strokeWidth={1.8} />
            </a>
            <a
              href={slide.cta2.href}
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                padding: "13px 24px",
                borderRadius: 100,
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#1A1715";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {slide.cta2.label} <ArrowRight size={14} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* Slide counter — top right */}
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 24,
            zIndex: 10,
            background: "rgba(250,248,245,0.18)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: 100,
            padding: "6px 16px",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "white",
          }}
        >
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* Prev / Next arrows */}
        {[
          { fn: prev, side: "left", icon: ChevronLeft },
          { fn: next, side: "right", icon: ChevronRight },
        ].map(({ fn, side, icon: Icon }) => (
          <button
            key={side}
            onClick={fn}
            style={{
              position: "absolute",
              top: "50%",
              [side]: 20,
              zIndex: 10,
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.35)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <Icon size={19} strokeWidth={1.8} />
          </button>
        ))}

        {/* Dot indicators — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            zIndex: 10,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 26 : 8,
                height: 8,
                borderRadius: 4,
                padding: 0,
                background: i === current ? "#D44515" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "rgba(255,255,255,0.2)",
            zIndex: 10,
          }}
        >
          <div
            key={`${progKey}-${paused}`}
            className={paused ? "" : "hero-progress"}
            style={{
              height: "100%",
              background: "#D44515",
              width: paused ? "100%" : "0%",
            }}
          />
        </div>
      </div>
    </section>
  );
}