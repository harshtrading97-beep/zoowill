import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import CategoryShowcase from "./components/CategoryShowcase";
import FeaturedCatalogue from "./components/FeaturedCatalogue";
import BestSellers from "./components/BestSellers";
import BrandHeritage from "./components/BrandHeritage";
import Collections from "./components/Collections";
import Footer from "./components/Footer";
import ProductModal from "./components/QuickViewModal";
import MobileMenu from "./components/MobileMenu";
import { products } from "./data/products";

gsap.registerPlugin(ScrollTrigger);

/* ─── Hash Helpers ────────────────────────────────────────── */
function getProductFromHash() {
  const hash = window.location.hash; // e.g. "#product=5"
  const match = hash.match(/^#product=(\d+)$/);
  if (match) {
    const id = parseInt(match[1], 10);
    return products.find((p) => p.id === id) || null;
  }
  return null;
}

export default function App() {
  const [viewProduct, setViewProduct] = useState(() => getProductFromHash());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenisRef = useRef(null);

  // ── Lenis smooth scroll + GSAP ticker sync ─────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // ── Listen to hash changes (browser back/forward, direct URL) ──
  useEffect(() => {
    const onHashChange = () => {
      const found = getProductFromHash();
      setViewProduct(found);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // ── Pause Lenis when fullscreen product detail view is open ──
  useEffect(() => {
    if (viewProduct) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [viewProduct]);

  // ── Open a product: set hash → hashchange listener fires setViewProduct ──
  const openProduct = useCallback((product) => {
    if (!product) return;
    // Push new history entry so browser back works
    window.location.hash = `product=${product.id}`;
  }, []);

  // ── Close product: navigate back (clears hash) ──
  const closeProduct = useCallback(() => {
    // If we have a hash product entry in history, go back
    if (window.location.hash.startsWith("#product=")) {
      window.history.back();
    } else {
      window.location.hash = "";
      setViewProduct(null);
    }
  }, []);

  return (
    <div style={{ background: "#FAF8F5", minHeight: "100vh" }}>
      <Header
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
        onViewProduct={openProduct}
      />

      <main>
        <HeroSlider />
        <CategoryShowcase />
        <FeaturedCatalogue onView={openProduct} />
        <BestSellers onView={openProduct} />
        <BrandHeritage />
        <Collections />
      </main>

      <Footer />

      {/* Full-Screen Product Detail Page */}
      {viewProduct && (
        <ProductModal product={viewProduct} onClose={closeProduct} />
      )}

      {/* Mobile Nav */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}
