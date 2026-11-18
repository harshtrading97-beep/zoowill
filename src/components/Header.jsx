import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import ZoOwillLogo from "./Logo";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";

const NAV_ITEMS = [
  {
    label: "HORSE",
    sub: [
      { heading: "Blankets & Turnout Rugs",   items: ['75" Fleece Winter Turnout Rug', "Jhool"] },
      { heading: "Boots & Leg Bandages",       items: ["Bell Boots", "Fleece Bandages", '4" White Bandages'] },
      { heading: "Fly & Head Protection",      items: ["Fly Veil Ear Bonnet", "Blinker Hood Mask"] },
      { heading: "Muzzles & Ornaments",        items: ["Rubber Muzzle with Fur", "Decorative Horse Kalngi"] },
    ],
    featured: { title: "Winter Ready", sub: "Turnout Rugs & Protection",
      img: "https://images.unsplash.com/photo-1450052590821-8bf91254a353?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "SADDLERY",
    sub: [
      { heading: "English & Dressage Saddles", items: ['Leather Dressage 18"', "Jumping Saddle", "Polo Heavy Duty Saddle"] },
      { heading: "Kashmiri Kathis",             items: ["Brass Fitting Thappa", 'Plain & Natural 15"/17"', "Handle Kathi"] },
      { heading: "Bridles & Browbands",         items: ["Leather Bridle with Reins", "PVC Bridle & Martingale", "Crystal Browband"] },
      { heading: "Bits & Stirrups",             items: ["H-Style Bit", "4-Ring Bit", "Aligarh Iron Rakab"] },
    ],
    featured: { title: "Master Craft", sub: "Handcrafted Leather Saddles",
      img: "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "HARNESS",
    sub: [
      { heading: "Single Horse Leather Harness", items: ["Cob Size", "Large Size"] },
      { heading: "Double Horse Leather Harness", items: ["Cob Size", "Large Size"] },
    ],
    featured: { title: "Heritage Harness", sub: "Single & Double Sets",
      img: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "RIDER",
    sub: [
      { heading: "Riding Apparel", items: ["Unisex Riding Breeches – 32/34/36"] },
      { heading: "Spurs & Whips",  items: ['Stainless Steel Spurs', 'Fiber Spurs', '42" Riding Stick', '27" Riding Stick'] },
    ],
    featured: { title: "The Rider Edit", sub: "Apparel & Accessories",
      img: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "ENDURANCE & RACING",
    sub: [
      { heading: "Saddles",                    items: ["Endurance Saddle", "Exercise Racing Saddle", "Status Saddle Set"] },
      { heading: "Lightweight Synthetic Tack", items: ["Biothane Nylon Stirrup Belt", "PVC Tack"] },
    ],
    featured: { title: "Race Ready", sub: "Endurance & Sprint Gear",
      img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "PONY & FOAL",
    sub: [
      { heading: "Pony & Foal Halters",  items: ["Padded Nylon – Pony", "Padded Nylon – Foal", "Padded Nylon – Cob"] },
      { heading: "Small Bits & Leads",   items: ["Small Twisted Mouth Bit", "Double Colour Lead", "Snap Lead"] },
    ],
    featured: { title: "Young Ones", sub: "Pony & Foal Essentials",
      img: "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=600&q=85" },
  },
  {
    label: "STABLE",
    sub: [
      { heading: "Halters & Leads",      items: ["Simple Nylon Halter", "8m Cotton-Nylon Lead", "Silver-Brass Chain Lead"] },
      { heading: "Grooming Tools",       items: ["6-Ring SS Hair Scraper Comb", "Rubber Grooming Gloves"] },
      { heading: "Feeding & Hardware",   items: ["Chaara Hay Net Bag", "Nylon Collar Galkhor", "Safety Hooks & Clips"] },
    ],
    featured: { title: "Stable Essentials", sub: "Grooming & Feeding",
      img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=85" },
  },
  { label: "ABOUT", href: "#about" },
];

export default function Header({ onMobileMenuOpen }) {
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
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 2px 24px -4px rgba(26,23,21,0.07)" : "none",
        }}
      >
        {/* ── Utility Bar ── */}
        <div style={{
          background: "#F3EFEA",
          borderBottom: "1px solid rgba(231,174,175,0.4)",
          padding: "8px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#736B65" }}>
            ZoOwill Equestrian &bull; Handcrafted Indian Saddlery &amp; Tack
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#736B65" }}>59+ Specialized SKUs</span>
            <span style={{ width: 1, height: 12, background: "rgba(231,174,175,0.5)" }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#736B65" }}>PAN-India &amp; B2B Wholesale</span>
          </div>
        </div>

        {/* ── Main Header Row ── */}
        <div style={{
          background: scrolled ? "rgba(250,248,245,0.97)" : "rgba(250,248,245,0.92)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(231,174,175,0.3)",
          height: 72, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Search pill */}
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "white", border: "1px solid rgba(231,174,175,0.5)",
              borderRadius: 100, padding: "8px 16px",
              cursor: "pointer", transition: "box-shadow 0.2s ease",
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#736B65",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px -4px rgba(26,23,21,0.1)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <Search size={15} strokeWidth={1.5} />
            <span className="hidden md:inline">Search catalogue…</span>
          </button>

          {/* Logo */}
          <a href="#" style={{ textDecoration: "none" }}>
            <img
              src="/logo.jpeg"
              alt="ZoOwill Equestrian"
              style={{ height: 52, width: "auto", objectFit: "contain", mixBlendMode: "multiply", display: "block" }}
            />
          </a>

          {/* Right: CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="https://wa.me/919999999999"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-dark hidden md:inline-flex"
              style={{ padding: "10px 22px", fontSize: 11 }}
            >
              Enquire Now
            </a>
            <button
              className="md:hidden"
              onClick={onMobileMenuOpen}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1715" }}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ── Category Nav Bar ── */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center", justifyContent: "center", gap: 28, height: 44,
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
                key={item.label} href={item.href}
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A1715", textDecoration: "none" }}
                onMouseEnter={() => { clearTimeout(megaTimeout.current); setActiveMega(null); }}
              >{item.label}</a>
            ) : (
              <button
                key={item.label}
                onMouseEnter={() => handleNavEnter(item.label)}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: activeMega === item.label ? "#D44515" : "#1A1715",
                  transition: "color 0.2s ease", padding: "0 2px", whiteSpace: "nowrap",
                }}
              >
                {item.label}
                <ChevronDown size={11} strokeWidth={1.5} style={{ transform: activeMega === item.label ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
              </button>
            )
          )}
        </div>

        {/* Mega Menus */}
        {NAV_ITEMS.filter(i => i.sub).map((item) => (
          <MegaMenu key={item.label} item={item} isOpen={activeMega === item.label} onEnter={handleMegaEnter} onLeave={handleMegaLeave} />
        ))}
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
