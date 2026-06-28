# BLENDMI™ — Be Odd. Blend Your Way.

A B2C e-commerce storefront for **BLENDMI**, a beauty-tools brand (latex-free
blending sponges, vegan brushes, puffs and sets). Built with **Next.js 14 (App
Router)**, **TypeScript** and **Tailwind CSS**.

> *Tools for a face that doesn't follow rules.*

## ✨ Features

- **Storefront** — bold, on-brand design system (hot-pink / cream / black, the
  signature blinking-eye + blob motif rendered as pure SVG — no image assets needed).
- **Shop** — category filtering (Sponges, Brushes, Puffs, Sets, Merch) + sort.
- **Product pages** — shade selection, quantity, related products, static-generated per product.
- **Cart** — slide-out drawer + full cart page, persisted to `localStorage`,
  free-shipping progress bar.
- **Checkout** — full contact / shipping / payment form with order summary and a
  confirmation screen (demo flow — no card is charged).
- **Social integration** — TikTok, Instagram, YouTube & Pinterest linked in the
  header, footer, home "Blend With Us" section and About page.
- **About / Be Odd** — brand story, values, FAQ, newsletter signup.
- Responsive, accessible, SEO metadata + Open Graph.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## 🛠 Project structure

```
app/                 # App Router pages (home, shop, product, cart, checkout, about)
components/          # Header, Footer, CartDrawer, ProductCard, BrandArt (SVG), etc.
lib/products.ts     # Product catalogue (edit to add/update products)
lib/social.ts       # Social media profile URLs — update to the real handles
```

## 🔌 Going live

This project ships a fully working **front-end** with a demo checkout. To take
real orders, plug in a commerce backend at the checkout step:

- **Shopify** — connect via the Storefront API / Hydrogen, or embed Shopify
  Checkout. (A Shopify store can be provisioned and managed directly.)
- **Stripe** — replace the demo `placeOrder` handler in
  `app/checkout/page.tsx` with a Stripe Checkout Session / Payment Intent.

Update real social URLs in `lib/social.ts` and product data in `lib/products.ts`.

---

© BLENDMI™ · Be Odd. · Blend Your Way.
