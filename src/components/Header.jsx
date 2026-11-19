import { useState, useEffect, useRef } from "react";
import { Search, Menu, ChevronDown } from "lucide-react";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";

const NAV_ITEMS = [
  {
    label: "SADDLES & KATHIS",
    category: "saddles",
    sub: [
      { heading: "English & Polo Saddles", items: ['Leather Dressage 18"', "Jumping Saddle", "Polo Heavy Duty Saddle", "Bareback Pad Saddle Set"] },
      { heading: "Kashmiri Kathis", items: ["Printed Brass Fitting Kathi", 'Plain Leather Kathi 17"', "Handle Support Kathi", "Fleece Lined Panels"] },
    ],
    featured: { title: "Artisan Saddlery", sub: "Kashmiri Kathis & Dressage Saddles",
      img: "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "HARNESSES",
    category: "harnesses",
    sub: [
      { heading: "Heavy Driving Harnesses", items: ["Single Horse Leather Harness (Cob)", "Double Horse Leather Harness (Cob)", "Heavy Driving Set with Bridle & Reins"] },
    ],
    featured: { title: "Leather Harnesses", sub: "Single & Double Driving Sets",
      img: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "BRIDLES & BITS",
    category: "bridles",
    sub: [
      { heading: "Bridles & Martingales", items: ["Leather Bridle with Crystal Browband", "Biothane Synthetic Bridle", "Leather Breastplate with Reins", "Seeneband Chest Collar"] },
      { heading: "Stainless Steel & Iron Bits", items: ["Loose Ring Snaffle Bit", "Chifney Snaffle Bit", "Springkandare with Curb Chain", "Rubber Mouthpiece Bit", "Dual Ring Snaffle Bit"] },
    ],
    featured: { title: "Bridles & Bits", sub: "Precision Tack & Stainless Steel",
      img: "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "HALTERS & LEADS",
    category: "halters",
    sub: [
      { heading: "Nylon Padded Halters", items: ["Foal Halter for Baby Horse", "Glitter Horse Halter", "Aztec Pattern 3-Ply Halter", "Fleece Padded Halter"] },
      { heading: "Rope & Chain Leads", items: ["10 Meter Flat Lead Rope", "8m Cotton-Nylon Handwoven Lead", "Heavy Duty Braided Leash", "Metal Swivel Snap Hook"] },
    ],
    featured: { title: "Halters & Leads", sub: "Reinforced Webbing & Hardware",
      img: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "STIRRUPS & GIRTHS",
    category: "stirrups",
    sub: [
      { heading: "Iron Rakabs & Stirrups", items: ["Aligarh Iron Rakkab", "Aluminium Safety Stirrups", "Leather Stirrup Straps 145cm", "Nylon Stirrup Belts"] },
      { heading: "Girths & Saddle Pads", items: ["Nylon Fleece Girth", "Race Elastic Girth & Surcingles", "Leather Belly Girth 132cm", "Imported Anti-Slip Saddle Pad", "Quilted & Sweatfree Saddle Pad"] },
    ],
    featured: { title: "Stirrups & Girths", sub: "Aligarh Rakabs & Shock-Absorbing Pads",
      img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "HORSE PROTECTION & RUGS",
    category: "protection",
    sub: [
      { heading: "Winter Turnout Rugs / Jhool", items: ['75" Waterproof Winter Jhool', 'Neck Cover Turnout Rug', 'Fleece Fitted Rain Sheet', '200-250g Fill Winter Coat'] },
      { heading: "Boots & Head Protection", items: ["Hoof Boots (S/M/L Sizes)", "Fleece Trim Bell Boots", "Cotton Leg Wraps Bandages", "Blinker Hood Mask with Eye Cups", "Fly Veil Ear Bonnet Sehra"] },
    ],
    featured: { title: "Protection & Rugs", sub: 'Waterproof 75" Jhool & Hoof Boots',
      img: "https://images.unsplash.com/photo-1450052590821-8bf91254a353?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "GROOMING & STABLE",
    category: "grooming",
    sub: [
      { heading: "Grooming Tools", items: ["Wooden Horse Grooming Brush", "Iron Kharara Massage Comb", "Rubber Curry Comb", "6-Ring Stainless Hair Scraper", "Hoof Pick Brush with Horse Head"] },
      { heading: "Stable & Farrier Tools", items: ["Slow Feed Hay Net Bag", "Steel Horseshoes Naal (Full Set)", "Hoof Trimming Farrier Knife", "350W Electric Animal Clipper"] },
    ],
    featured: { title: "Grooming & Stable", sub: "Artisan Khararas & Grooming Essentials",
      img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "RIDER & APPAREL",
    category: "rider",
    sub: [
      { heading: "Rider Apparel & Armour", items: ["Unisex Riding Breeches Pant", "Body Protector Safety Vest", "Matte Black Protective Helmet", "Men & Women Leather Belt"] },
      { heading: "Spurs & Accessories", items: ["Stainless Steel Riding Spurs", "Fiber Styles Riding Spurs with Straps", "Decorative Horse Plume Kalngi"] },
    ],
    featured: { title: "Rider Collection", sub: "Breeches, Vests & Spurs",
      img: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=600&q=85" },
  },
  { label: "OUR STORY", href: "#about" },
];

export default function Header({ onMobileMenuOpen, onViewProduct }) {
  const [scrolled, setScrolled]     = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const megaTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavEnter = (label) => { clearTimeout(megaTimeout.current); setActiveMega(label); };
  const handleNavLeave = () => { megaTimeout.current = setTimeout(() => setActiveMega(null), 180); };
  const handleMegaEnter = () => clearTimeout(megaTimeout.current);
  const handleMegaLeave = () => { megaTimeout.current = setTimeout(() => setActiveMega(null), 180); };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          paddingTop: "env(safe-area-inset-top, 0px)",
          background: "#F3EFEA",
          transition: "box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 2px 24px -4px rgba(26,23,21,0.08)" : "none",
        }}
      >
        {/* ── Utility Bar (Mobile: Single-line clean | Desktop: Full 3-column) ── */}
        <div
          style={{
            background: "#F3EFEA",
            borderBottom: "1px solid rgba(231,174,175,0.4)",
            padding: "6px 16px",
          }}
        >
          {/* Mobile single-line bar */}
          <div
            className="flex md:hidden"
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 9.5,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#736B65",
              }}
            >
              Retail &amp; Wholesale Across India · 113 Official Products
            </span>
          </div>

          {/* Desktop full bar */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              padding: "2px 8px",
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#736B65",
              }}
            >
              Premium Equestrian Equipment | Retail &amp; Wholesale Enquiries Across India
            </span>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#736B65",
                }}
              >
                113 Official Products
              </span>
              <span style={{ width: 1, height: 12, background: "rgba(231,174,175,0.5)" }} />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#736B65",
                }}
              >
                Indian Craftsmanship
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Header Row ── */}
        <div
          style={{
            background: scrolled ? "rgba(250,248,245,0.97)" : "rgba(250,248,245,0.94)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(231,174,175,0.3)",
            height: 64,
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Search pill */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "white",
              border: "1px solid rgba(231,174,175,0.5)",
              borderRadius: 100,
              padding: "8px 14px",
              cursor: "pointer",
              transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 12,
              color: "#736B65",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 20px -4px rgba(26,23,21,0.1)";
              e.currentTarget.style.borderColor = "rgba(212,69,21,0.3)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(231,174,175,0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Search size={15} strokeWidth={1.6} />
            <span className="hidden md:inline">Search products, saddles, tack &amp; more...</span>
          </button>

          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img
              src="/logo.jpeg"
              alt="ZoOwill Equestrian"
              style={{
                height: 44,
                width: "auto",
                objectFit: "contain",
                mixBlendMode: "multiply",
                display: "block",
              }}
            />
          </a>

          {/* Right: CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href="https://wa.me/916394549702?text=Hello%20ZoOwill%20Equestrian%2C%20I%20would%20like%20to%20enquire%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark hidden md:inline-flex"
              style={{ padding: "10px 22px", fontSize: 11 }}
            >
              Enquire with Us
            </a>
            <button
              className="md:hidden"
              onClick={onMobileMenuOpen}
              aria-label="Open menu"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "white",
                border: "1px solid rgba(231,174,175,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#1A1715",
              }}
            >
              <Menu size={19} strokeWidth={1.6} />
            </button>
          </div>
        </div>

        {/* ── Category Nav Bar (Desktop Only) ── */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            height: 44,
            padding: "0 24px",
            background: "rgba(255,255,255,0.72)",
            borderBottom: "1px solid rgba(231,174,175,0.35)",
            backdropFilter: "blur(12px)",
          }}
          onMouseLeave={handleNavLeave}
        >
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#1A1715",
                  textDecoration: "none",
                }}
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
                onMouseEnter={() => handleNavEnter(item.label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: activeMega === item.label ? "#D44515" : "#1A1715",
                  transition: "color 0.2s ease",
                  padding: "0 2px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
                <ChevronDown
                  size={11}
                  strokeWidth={1.5}
                  style={{
                    transform: activeMega === item.label ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
            )
          )}
        </div>

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