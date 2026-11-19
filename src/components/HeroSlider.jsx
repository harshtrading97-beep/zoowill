import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { handleImageError } from "../data/products";

const SLIDES = [
  {
    num: "01",
    eyebrow: "INDIAN SADDLEMAKING & EQUESTRIAN CRAFT",
    headline: ["Crafted with Purpose.", "Made for Every Ride."],
    sub: "Discover a considered collection of saddles, leather harnesses and equestrian essentials, bringing together traditional Indian craftsmanship and the needs of modern horse care.",
    cta1: { label: "Explore the Collection", href: "#featured" },
    cta2: { label: "Discover Best Sellers",  href: "#bestsellers" },
    image: "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1600&q=85",
  },
  {
    num: "02",
    eyebrow: "FOR THE ARENA, THE TRACK & BEYOND",
    headline: ["Ready for the", "Ride Ahead."],
    sub: "From dressage and jumping saddles to endurance and racing equipment, explore riding essentials designed for different disciplines and equestrian pursuits.",
    cta1: { label: "Explore Riding Equipment", href: "#featured" },
    cta2: { label: "Browse Saddlery",           href: "#featured" },
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=85",
  },
  {
    num: "03",
    eyebrow: "ESSENTIALS FOR EVERY STABLE",
    headline: ["Thoughtful Care.", "From Head to Hoof."],
    sub: "Explore practical essentials for everyday horse care, including turnout rugs, halters, grooming tools, protective gear and stable accessories.",
    cta1: { label: "Explore Horse Care",  href: "#featured" },
    cta2: { label: "View the Catalogue",  href: "#featured" },
    image: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1600&q=85",
  },
];

const INTERVAL = 2500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [progKey, setProgKey] = useState(0);
  const contentRef  = useRef(null);
  const intervalRef = useRef(null);
  const ctx         = useRef(null);

  const animateIn = () => {
    if (!contentRef.current) return;
    ctx.current?.revert();
    ctx.current = gsap.context(() => {
      gsap.fromTo(".hero-line",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.1, duration: 0.95, ease: "power3.out" }
      );
      gsap.fromTo(".hero-eyebrow",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.1 }
      );
      gsap.fromTo(".hero-sub",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 }
      );
      gsap.fromTo(".hero-ctas",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.7 }
      );
    }, contentRef);
  };

  useEffect(() => { animateIn(); }, [current]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
      setProgKey(k => k + 1);
    }, INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const goTo = (i) => { setCurrent(i); setProgKey(k => k + 1); };
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);
  const slide = SLIDES[current];

  return (
    <section style={{ paddingTop: 168, paddingBottom: 40, paddingLeft: 16, paddingRight: 16 }}>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          position: "relative", borderRadius: 24, overflow: "hidden",
          height: "clamp(540px, 78vh, 760px)",
          boxShadow: "0 24px 80px -20px rgba(26,23,21,0.22)",
        }}
      >
        {/* Background images crossfade */}
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.1s cubic-bezier(0.76,0,0.24,1)",
          }}>
            <img src={s.image} alt={s.eyebrow} onError={handleImageError}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: i === current ? "scale(1)" : "scale(1.06)",
                transition: "transform 1.1s cubic-bezier(0.76,0,0.24,1)",
              }}
            />
          </div>
        ))}

        {/* Warm directional gradient — left side for text legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(26,23,21,0.82) 0%, rgba(26,23,21,0.52) 45%, rgba(26,23,21,0.08) 100%)",
        }} />

        {/* Editorial content — left-aligned */}
        <div
          ref={contentRef}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "clamp(32px, 5vw, 60px)",
            maxWidth: 680,
          }}
        >
          {/* Eyebrow pill */}
          <div className="hero-eyebrow" style={{ marginBottom: 20 }}>
            <span style={{
              display: "inline-flex", alignItems: "center",
              background: "rgba(255,255,255,0.14)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.25)", color: "white",
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "7px 16px", borderRadius: 100,
            }}>
              {slide.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 20 }}>
            {slide.headline.map((line, i) => (
              <div key={i} style={{ overflow: "hidden", lineHeight: 1 }}>
                <span className="hero-line" style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(44px, 7.5vw, 88px)",
                  fontWeight: 300, lineHeight: 1.06, color: "white",
                  letterSpacing: "-0.01em",
                }}>
                  {line}
                </span>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p className="hero-sub" style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.65,
            color: "rgba(255,255,255,0.82)", marginBottom: 32, maxWidth: 520,
          }}>
            {slide.sub}
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={slide.cta1.href} className="btn btn-terra"
              style={{ fontSize: 11, letterSpacing: "0.14em", boxShadow: "0 6px 24px -4px rgba(212,69,21,0.5)" }}>
              {slide.cta1.label} <ArrowRight size={13} strokeWidth={1.5} />
            </a>
            <a href={slide.cta2.href} className="btn btn-ghost"
              style={{ fontSize: 11, letterSpacing: "0.14em" }}>
              {slide.cta2.label} <ArrowRight size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Slide counter — top right */}
        <div style={{
          position: "absolute", top: 28, right: 28,
          background: "rgba(250,248,245,0.14)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100,
          padding: "6px 16px",
          fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.1em", color: "white",
        }}>
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* Prev / Next arrows */}
        {[{ fn: prev, side: "left", icon: ChevronLeft }, { fn: next, side: "right", icon: ChevronRight }].map(({ fn, side, icon: Icon }) => (
          <button key={side} onClick={fn}
            style={{
              position: "absolute", top: "50%", [side]: 20,
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.14)", backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "50%", width: 46, height: 46,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "white",
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.3)"; e.currentTarget.style.transform = "translateY(-50%) scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
          >
            <Icon size={18} strokeWidth={1.5} />
          </button>
        ))}

        {/* Dot indicators — bottom right */}
        <div style={{ position: "absolute", bottom: 32, right: 32, display: "flex", gap: 8, alignItems: "center" }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? 22 : 6, height: 6, borderRadius: 3, padding: 0,
              background: i === current ? "#D44515" : "rgba(255,255,255,0.4)",
              border: "none", cursor: "pointer", transition: "all 0.4s ease",
            }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.15)" }}>
          <div key={`${progKey}-${paused}`} className={paused ? "" : "hero-progress"}
            style={{ height: "100%", background: "#D44515", width: paused ? "100%" : "0%" }} />
        </div>
      </div>
    </section>
  );
}
