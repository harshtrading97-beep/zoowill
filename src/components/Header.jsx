import { useState, useEffect, useRef } from "react";
import { Search, Menu, ChevronDown, ArrowUpRight } from "lucide-react";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";

import saddlesKathisImg from "../assets/saddles_&-kathis.webp";
import harnessesImg from "../assets/harnesses.webp";
import bridlesBitsImg from "../assets/bridles-&-bits.webp";
import haltersLeadsImg from "../assets/halters-&-leads.webp";
import stirrupsGirthsImg from "../assets/stirrups-&-girths.webp";
import horseProtectionRugsImg from "../assets/horse-protection-&-rugs.webp";
import groomingStableImg from "../assets/grooming-&-stable.webp";
import riderApparelImg from "../assets/rider-&-apparel.webp";

const NAV_ITEMS = [
  {
    label: "SADDLES & KATHIS",
    category: "saddles",
    sub: [
      {
        heading: "English & Polo Saddles",
        items: ['Leather Dressage 18"', "Jumping Saddle", "Polo Heavy Duty Saddle", "Bareback Pad Saddle Set"],
      },
      {
        heading: "Kashmiri Kathis",
        items: ["Printed Brass Fitting Kathi", 'Plain Leather Kathi 17"', "Handle Support Kathi", "Fleece Lined Panels"],
      },
    ],
    featured: {
      title: "Artisan Saddlery",
      sub: "Kashmiri Kathis & Dressage Saddles",
      img: saddlesKathisImg,
    },
  },
  {
    label: "HARNESSES",
    category: "harnesses",
    sub: [
      {
        heading: "Heavy Driving Harnesses",
        items: [
          "Single Horse Leather Harness (Cob)",
          "Double Horse Leather Harness (Cob)",
          "Heavy Driving Set with Bridle & Reins",
        ],
      },
    ],
    featured: {
      title: "Leather Harnesses",
      sub: "Single & Double Driving Sets",
      img: harnessesImg,
    },
  },
  {
    label: "BRIDLES & BITS",
    category: "bridles",
    sub: [
      {
        heading: "Bridles & Martingales",
        items: [
          "Leather Bridle with Crystal Browband",
          "Biothane Synthetic Bridle",
          "Leather Breastplate with Reins",
          "Seeneband Chest Collar",
        ],
      },
      {
        heading: "Stainless Steel & Iron Bits",
        items: [
          "Loose Ring Snaffle Bit",
          "Chifney Snaffle Bit",
          "Springkandare with Curb Chain",
          "Rubber Mouthpiece Bit",
          "Dual Ring Snaffle Bit",
        ],
      },
    ],
    featured: {
      title: "Bridles & Bits",
      sub: "Precision Tack & Stainless Steel",
      img: bridlesBitsImg,
    },
  },
  {
    label: "HALTERS & LEADS",
    category: "halters",
    sub: [
      {
        heading: "Nylon Padded Halters",
        items: ["Foal Halter for Baby Horse", "Glitter Horse Halter", "Aztec Pattern 3-Ply Halter", "Fleece Padded Halter"],
      },
      {
        heading: "Rope & Chain Leads",
        items: [
          "10 Meter Flat Lead Rope",
          "8m Cotton-Nylon Handwoven Lead",
          "Heavy Duty Braided Leash",
          "Metal Swivel Snap Hook",
        ],
      },
    ],
    featured: {
      title: "Halters & Leads",
      sub: "Reinforced Webbing & Hardware",
      img: haltersLeadsImg,
    },
  },
  {
    label: "STIRRUPS & GIRTHS",
    category: "stirrups",
    sub: [
      {
        heading: "Iron Rakabs & Stirrups",
        items: ["Aligarh Iron Rakkab", "Aluminium Safety Stirrups", "Leather Stirrup Straps 145cm", "Nylon Stirrup Belts"],
      },
      {
        heading: "Girths & Saddle Pads",
        items: [
          "Nylon Fleece Girth",
          "Race Elastic Girth & Surcingles",
          "Leather Belly Girth 132cm",
          "Imported Anti-Slip Saddle Pad",
          "Quilted & Sweatfree Saddle Pad",
        ],
      },
    ],
    featured: {
      title: "Stirrups & Girths",
      sub: "Aligarh Rakabs & Shock-Absorbing Pads",
      img: stirrupsGirthsImg,
    },
  },
  {
    label: "PROTECTION & RUGS",
    category: "protection",
    sub: [
      {
        heading: "Winter Turnout Rugs / Jhool",
        items: [
          '75" Waterproof Winter Jhool',
          "Neck Cover Turnout Rug",
          "Fleece Fitted Rain Sheet",
          "200-250g Fill Winter Coat",
        ],
      },
      {
        heading: "Boots & Head Protection",
        items: [
          "Hoof Boots (S/M/L Sizes)",
          "Fleece Trim Bell Boots",
          "Cotton Leg Wraps Bandages",
          "Blinker Hood Mask with Eye Cups",
          "Fly Veil Ear Bonnet Sehra",
        ],
      },
    ],
    featured: {
      title: "Protection & Rugs",
      sub: 'Waterproof 75" Jhool & Hoof Boots',
      img: horseProtectionRugsImg,
    },
  },
  {
    label: "GROOMING & STABLE",
    category: "grooming",
    sub: [
      {
        heading: "Grooming Tools",
        items: [
          "Wooden Horse Grooming Brush",
          "Iron Kharara Massage Comb",
          "Rubber Curry Comb",
          "6-Ring Stainless Hair Scraper",
          "Hoof Pick Brush with Horse Head",
        ],
      },
      {
        heading: "Stable & Farrier Tools",
        items: [
          "Slow Feed Hay Net Bag",
          "Steel Horseshoes Naal (Full Set)",
          "Hoof Trimming Farrier Knife",
          "350W Electric Animal Clipper",
        ],
      },
    ],
    featured: {
      title: "Grooming & Stable",
      sub: "Artisan Khararas & Grooming Essentials",
      img: groomingStableImg,
    },
  },
  {
    label: "RIDER & APPAREL",
    category: "rider",
    sub: [
      {
        heading: "Rider Apparel & Armour",
        items: [
          "Unisex Riding Breeches Pant",
          "Body Protector Safety Vest",
          "Matte Black Protective Helmet",
          "Men & Women Leather Belt",
        ],
      },
      {
        heading: "Spurs & Accessories",
        items: [
          "Stainless Steel Riding Spurs",
          "Fiber Styles Riding Spurs with Straps",
          "Decorative Horse Plume Kalngi",
        ],
      },
    ],
    featured: {
      title: "Rider Collection",
      sub: "Breeches, Vests & Spurs",
      img: riderApparelImg,
    },
  },
  { label: "OUR STORY", href: "#about" },
];

export default function Header({ onMobileMenuOpen, onViewProduct }) {
  const [scrolled, setScrolled]     = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const megaTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard shortcut: Ctrl+K / Cmd+K opens SearchOverlay
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavEnter = (label) => {
    clearTimeout(megaTimeout.current);
    setActiveMega(label);
  };
  const handleNavLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 180);
  };
  const handleMegaEnter = () => clearTimeout(megaTimeout.current);
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 180);
  };

  const handleCategoryNavClick = (catId) => {
    setActiveMega(null);
    const el = document.getElementById("featured");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    try {
      sessionStorage.setItem("zw_cat", catId);
    } catch (_) { /* noop */ }
    window.dispatchEvent(new CustomEvent("zw:filterCategory", { detail: catId }));
  };

  return (
    <>
      <style>{`
        .zw-site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding-top: env(safe-area-inset-top, 0px);
          background: #F3EFEA;
          transition: box-shadow 0.32s ease;
        }
        .zw-site-header.is-scrolled {
          box-shadow: 0 10px 32px -12px rgba(26, 23, 21, 0.12);
        }

        .zw-utility-bar {
          background: #F3EFEA;
          border-bottom: 1px solid rgba(231, 174, 175, 0.42);
          padding: 6px 14px;
        }
        @media (min-width: 768px) {
          .zw-utility-bar {
            padding: 7px 28px;
          }
        }

        /* Symmetrical 3-Column Header so Logo stays dead-center on every device */
        .zw-main-header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 10px;
          height: 62px;
          padding: 0 14px;
          background: rgba(250, 248, 245, 0.94);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border-bottom: 1px solid rgba(231, 174, 175, 0.35);
          transition: height 0.3s ease, background 0.3s ease;
        }
        .zw-site-header.is-scrolled .zw-main-header {
          background: rgba(250, 248, 245, 0.98);
        }
        @media (min-width: 768px) {
          .zw-main-header {
            height: 74px;
            padding: 0 28px;
          }
          .zw-site-header.is-scrolled .zw-main-header {
            height: 66px;
          }
        }

        .zw-header-search-btn {
          justify-self: start;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 38px;
          height: 38px;
          padding: 0;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.55);
          color: #5C544E;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(26, 23, 21, 0.04);
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-header-search-btn:hover {
          border-color: rgba(212, 69, 21, 0.45);
          color: #1A1715;
          box-shadow: 0 8px 22px -6px rgba(26, 23, 21, 0.12);
          transform: translateY(-1px);
        }
        @media (min-width: 860px) {
          .zw-header-search-btn {
            width: auto;
            height: 40px;
            padding: 0 14px 0 15px;
            border-radius: 100px;
            min-width: 250px;
            justify-content: space-between;
          }
        }

        .zw-kbd-hint {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: #8C827A;
          background: #F3EFEA;
          border: 1px solid rgba(231, 174, 175, 0.45);
          border-radius: 6px;
          padding: 2px 6px;
          letter-spacing: 0.04em;
        }

        .zw-brand-logo-link {
          justify-self: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.25s ease;
        }
        .zw-brand-logo-link:hover {
          transform: scale(1.02);
        }
        .zw-brand-logo-img {
          height: 42px;
          width: auto;
          object-fit: contain;
          mix-blend-mode: multiply;
          display: block;
          transition: height 0.3s ease;
        }
        @media (min-width: 768px) {
          .zw-brand-logo-img {
            height: 50px;
          }
          .zw-site-header.is-scrolled .zw-brand-logo-img {
            height: 44px;
          }
        }

        .zw-header-right-slot {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .zw-enquire-pill {
          display: none;
        }
        @media (min-width: 768px) {
          .zw-enquire-pill {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 10px 20px;
            border-radius: 100px;
            background: #1A1715;
            color: #FAF8F5;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.13em;
            text-transform: uppercase;
            text-decoration: none;
            box-shadow: 0 6px 18px -4px rgba(26, 23, 21, 0.28);
            transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .zw-enquire-pill:hover {
            background: #D44515;
            transform: translateY(-1px);
            box-shadow: 0 10px 24px -6px rgba(212, 69, 21, 0.42);
          }
        }

        .zw-mobile-menu-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(231, 174, 175, 0.55);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1A1715;
          box-shadow: 0 2px 10px rgba(26, 23, 21, 0.04);
          transition: all 0.22s ease;
        }
        .zw-mobile-menu-btn:hover {
          border-color: #D44515;
          color: #D44515;
        }
        @media (min-width: 1024px) {
          .zw-mobile-menu-btn {
            display: none;
          }
        }

        /* Desktop Category Nav Bar */
        .zw-cat-nav-bar {
          display: none;
        }
        @media (min-width: 1024px) {
          .zw-cat-nav-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: clamp(14px, 1.8vw, 26px);
            height: 44px;
            padding: 0 24px;
            background: rgba(255, 255, 255, 0.78);
            border-bottom: 1px solid rgba(231, 174, 175, 0.35);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
          }
        }

        .zw-nav-trigger {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          height: 100%;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1A1715;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .zw-nav-trigger:hover,
        .zw-nav-trigger.is-active {
          color: #D44515;
        }
        .zw-nav-trigger::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: #D44515;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .zw-nav-trigger:hover::after,
        .zw-nav-trigger.is-active::after {
          transform: scaleX(1);
        }
      `}</style>

      <header className={`zw-site-header ${scrolled ? "is-scrolled" : ""}`}>
        {/* ── Top Utility Bar ── */}
        <div className="zw-utility-bar">
          {/* Mobile Single-Line Bar */}
          <div
            className="flex md:hidden"
            style={{
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 9.5,
                fontWeight: 500,
                letterSpacing: "0.11em",
                textTransform: "uppercase",
                color: "#6B625C",
              }}
            >
              Retail &amp; Wholesale Across India · 113+ Official Products
            </span>
          </div>

          {/* Desktop 3-Item Bar */}
          <div
            className="hidden md:flex"
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#6B625C",
              }}
            >
              Premium Equestrian Equipment | Retail &amp; Wholesale Across India
            </span>
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10.5,
                  fontWeight: 500,
                  letterSpacing: "0.11em",
                  textTransform: "uppercase",
                  color: "#6B625C",
                }}
              >
                113+ Official Products
              </span>
              <span style={{ width: 1, height: 11, background: "rgba(231, 174, 175, 0.65)" }} />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10.5,
                  fontWeight: 500,
                  letterSpacing: "0.11em",
                  textTransform: "uppercase",
                  color: "#6B625C",
                }}
              >
                Indian Craftsmanship
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Header Row (Symmetrical 3-Column) ── */}
        <div className="zw-main-header">
          {/* Left: Search Trigger */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open product search"
            className="zw-header-search-btn"
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Search size={15} strokeWidth={1.8} style={{ color: "#D44515", flexShrink: 0 }} />
              <span
                className="hidden md:inline"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: "#736B65",
                }}
              >
                Search saddles, tack...
              </span>
            </span>
            <span className="hidden md:inline zw-kbd-hint">⌘K</span>
          </button>

          {/* Center: ZoOwill Brand Logo */}
          <a href="#" className="zw-brand-logo-link" aria-label="ZoOwill Equestrian Home">
            <img
              src="/logo.jpeg"
              alt="ZoOwill Equestrian"
              className="zw-brand-logo-img"
            />
          </a>

          {/* Right: Enquire CTA + Mobile/Tablet Hamburger */}
          <div className="zw-header-right-slot">
            <a
              href="https://wa.me/916394549702?text=Hello%20ZoOwill%20Equestrian%2C%20I%20would%20like%20to%20enquire%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="zw-enquire-pill"
            >
              <span>Enquire with Us</span>
              <ArrowUpRight size={13} strokeWidth={2} />
            </a>

            <button
              type="button"
              onClick={onMobileMenuOpen}
              aria-label="Open navigation menu"
              className="zw-mobile-menu-btn"
            >
              <Menu size={19} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        {/* ── Desktop Category Nav Bar ── */}
        <nav className="zw-cat-nav-bar" onMouseLeave={handleNavLeave} aria-label="Primary Collections">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="zw-nav-trigger"
                onMouseEnter={() => {
                  clearTimeout(megaTimeout.current);
                  setActiveMega(null);
                }}
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => handleCategoryNavClick(item.category)}
                onMouseEnter={() => handleNavEnter(item.label)}
                className={`zw-nav-trigger ${activeMega === item.label ? "is-active" : ""}`}
              >
                <span>{item.label}</span>
                <ChevronDown
                  size={11}
                  strokeWidth={1.8}
                  style={{
                    transform: activeMega === item.label ? "rotate(180deg)" : "none",
                    transition: "transform 0.28s ease",
                  }}
                />
              </button>
            )
          )}
        </nav>

        {/* Mega Menus */}
        {NAV_ITEMS.filter((i) => i.sub).map((item) => (
          <MegaMenu
            key={item.label}
            item={item}
            isOpen={activeMega === item.label}
            onEnter={handleMegaEnter}
            onLeave={handleMegaLeave}
          />
        ))}
      </header>

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onViewProduct={onViewProduct}
      />
    </>
  );
}