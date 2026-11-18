import { useEffect, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [viewProduct,    setViewProduct]    = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Lenis smooth scroll + GSAP ticker sync ─────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ background: "#FAF8F5", minHeight: "100vh" }}>
      <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />

      <main>
        <HeroSlider />
        <CategoryShowcase />
        <FeaturedCatalogue onView={setViewProduct} />
        <BestSellers onView={setViewProduct} />
        <BrandHeritage />
        <Collections />
      </main>

      <Footer />

      {/* Product Specification Modal */}
      {viewProduct && (
        <ProductModal product={viewProduct} onClose={() => setViewProduct(null)} />
      )}

      {/* Mobile Nav */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}
