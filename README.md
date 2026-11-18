# ZoOwill — Premier International Equestrian Website

A production-ready, single-page luxury equestrian e-commerce homepage built with React 19 + Vite, Tailwind CSS v4, GSAP, and Lenis smooth scroll.

## 🚀 Quick Start

```bash
cd zoowill-app
npm install
npm run dev
```

Then open **http://localhost:5173** (or the port shown in terminal).

## 📦 Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool |
| Tailwind CSS | v4 | Styling (`@theme` custom properties) |
| GSAP | 3 | Scroll-triggered animations |
| Lenis | latest | Silky smooth scrolling |
| Lucide React | latest | Fine-line 1.5 stroke icons |

## 🏗️ Project Structure

```
src/
├── data/
│   └── products.js          # 24 real ZoOwill SKUs with INR/USD pricing
├── components/
│   ├── Logo.jsx              # SVG logo with blush + orange swoosh
│   ├── Header.jsx            # Sticky glassmorphic two-tier header
│   ├── MegaMenu.jsx          # Full-width luxury mega-menu
│   ├── SearchOverlay.jsx     # Command-style search overlay
│   ├── MobileMenu.jsx        # Slide-in mobile navigation
│   ├── HeroSlider.jsx        # Auto-advancing GSAP hero (3 slides, 2.5s)
│   ├── CategoryShowcase.jsx  # 6-card bento grid with scroll animations
│   ├── FeaturedCatalogue.jsx # Filtered product grid with sort
│   ├── ProductCard.jsx       # 4:5 portrait card with hover glass bar
│   ├── BestSellers.jsx       # Horizontal runway of 8 flagship items
│   ├── BrandHeritage.jsx     # 2-col editorial with GSAP parallax
│   ├── Collections.jsx       # Lookbook architectural duo cards
│   ├── Footer.jsx            # Light editorial footer with watermark
│   ├── BagDrawer.jsx         # Slide-out shopping bag drawer
│   └── QuickViewModal.jsx    # Full product quick view modal
├── App.jsx                   # Root — Lenis init + state management
├── main.jsx                  # React entry point
└── index.css                 # Tailwind v4 @theme + global styles
```

## 🎨 Color System

| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#FDFCFB` | Main canvas |
| `--color-surface` | `#F7F4F0` | Cards & alternating sections |
| `--color-blush` | `#E7AEAF` | Logo accent, hairline borders |
| `--color-terracotta` | `#D94E1F` | CTAs, active states |
| `--color-ink` | `#1C1917` | Primary typography |
| `--color-muted` | `#78716C` | Secondary text |
| `--color-champagne` | `#C8B6A6` | Subtle borders |

## 🛍️ Features

- **Interactive Currency Switcher** (INR Rs. <-> USD $) — recalculates all prices live
- **Mega-menu navigation** with 7 category columns + featured product cards
- **Command-style Search** with live product filtering
- **GSAP Hero Slider** — crossfade + scale zoom + staggered headline reveal, auto-pauses on hover
- **Category Showcase** — 6-card bento grid with ScrollTrigger reveals
- **Featured Catalogue** — filter tabs + sort dropdown + 24-product grid
- **Best Sellers Runway** — horizontal scrolling with 8 flagship items
- **Quick View Modal** — full product detail, size/color selectors
- **Shopping Bag Drawer** — qty controls, subtotal, WhatsApp inquiry CTA
- **Brand Heritage** — GSAP parallax image reveal + stat counters
- **Collections Lookbook** — glassmorphic overlay cards
- **Light Editorial Footer** — giant ZoOwill watermark, email/WhatsApp CTA
- **Lenis Smooth Scroll** synced with GSAP ticker at 60fps

## 📋 Product Catalogue (24 SKUs)

Categories: Harnesses, Saddles, Horse Wear, Bridles & Bits, Girths & Stirrups, Rider & Stable

Pricing: INR Rs.380 -> Rs.40,000 | USD $3.96 -> $416.65
