# Kitchen Smart India | Luxury Modular Kitchens & German Engineering

A world-class luxury modular kitchen showroom website built with **Bootstrap 5**, **Vanilla JavaScript**, and bespoke **Light Theme CSS**. Engineered for the Mumbai luxury residential market (Mumbai MMR, Thane, Mira-Bhayandar, Navi Mumbai).

## 🏛️ Project Structure

```
Kitchen Smart/
├── css/
│   └── style.css            # Luxury light theme styles, design tokens, rendering performance rules
├── js/
│   └── main.js              # Interactive calculator, layout switcher, materials & modal controllers
├── public/
│   ├── favicon.svg          # Brand favicon
│   ├── icons.svg            # SVG icon definitions
│   ├── robots.txt           # Search Engine & AI crawler directives
│   └── sitemap.xml          # XML sitemap for SEO & GEO engines
├── index.html               # Main website template with JSON-LD Schema markup & Core Web Vitals
├── package.json             # Dev server & build scripts
├── vite.config.js           # Static dev server & build configuration
└── README.md                # Documentation
```

## ✨ Key Features

- **Blazing-Fast Core Web Vitals**:
  - Zero render-blocking CSS `@import`
  - High-priority preloading for the primary LCP Hero image (`fetchpriority="high"`)
  - Asynchronous non-blocking Google Fonts with `font-display: swap`
  - Preconnecting hints (`preconnect` & `dns-prefetch`) for Google Fonts, CDNs, and Unsplash
  - Native lazy loading (`loading="lazy"`) and asynchronous decoding (`decoding="async"`) across all below-the-fold media
  - Modern browser `content-visibility: auto` to bypass offscreen layout recalculations
- **Complete SEO & Generative Engine Optimization (GEO)**:
  - Canonical tags, Open Graph (en_IN), Twitter Cards, and regional geo-targeting
  - Structured JSON-LD Knowledge Graph (`HomeAndConstructionBusiness`, `LocalBusiness`, `FAQPage`, `Product`, `WebSite`, `BreadcrumbList`)
  - Semantic content, clear metrics, and authoritative citations optimized for Google AI Overviews, Perplexity AI, ChatGPT Search, and Gemini
- **Indian Market Localization**:
  - Authentic pricing in Indian Rupees (₹ Lakhs & dynamic size estimator)
  - Climate & cooking formulation: 100% Boiling Water Resistant (BWR) Marine Plywood, HDHMR cores, anti-termite protection, and turmeric/masala stain-resistant sintered quartz
  - Flagship Experience Studio in Mumbai (Shop no 4, Unique signature building, near GCC Circle, next to SBI atm, Kashimira, Mira Road East, Mumbai 401107) with delivery & installation across Mumbai MMR, Thane, and Mira-Bhayandar
  - WhatsApp & Concierge direct contact (+91 98334 93984 / 098334 93984)
  - 14 Comprehensive Services: Modular Kitchen, Wardrobes, Interior Designer, Kitchen Design, Cabinetry & Hardware Design, Space Planning, Room Planning, Interior Architectural Design, Interior Decorating, Appliance Selection, Lighting Design, Refurbishment, Home Decor Selection, Custom Art Selection
- **Interactive Experience**:
  - Real-time Layout Switcher with running meters slider (3.0m to 10.0m)
  - Materials & Finishes Studio with live pairing preview
  - Filterable 2026 Collection with modal lightbox
  - Interactive 14-Services showcase with instant WhatsApp quote trigger
  - Consultation booking modal with instant WhatsApp handoff

## ⚡ 1-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRahul-Git7738%2Fkitchen-smart)

## 🚀 How to Run Locally

```bash
# Start local dev server
npm run dev

# Or build for production
npm run build
```
