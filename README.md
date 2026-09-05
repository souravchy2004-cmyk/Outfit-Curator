# OUTFIT CURATOR — Your Personal AI Stylist ✨

> "Turn the clothes you already own into outfits you'll actually want to wear."

Outfit Curator is a production-ready, full-stack, mobile-first AI digital wardrobe and outfit recommendation platform built with **Next.js / React**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Framer Motion**.

---

## 🌟 Key Features

1. **📱 Mobile-First Responsive Design**: Premium fashion-tech aesthetic, purple/lavender gradient, soft shadows, rounded cards, bottom navigation, and full desktop layout support.
2. **👗 Digital Wardrobe CRUD**: Upload, scan, categorize, search, filter, favorite, and delete clothing items across Tops, Bottoms, Shoes, Outerwear, and Accessories.
3. **🤖 AI Vision Clothing Analysis**: Smart heuristic and AI vision classifier detects category, type, color, style, season, and occasion upon photo upload with user override options.
4. **✨ 3-Option Outfit Recommendation Engine**: Generates 3 distinct looks (Option A: Primary Match, Option B: Smart & Relaxed, Option C: Elevated Statement) considering color compatibility, weather, occasion, budget, fit, and previous feedback.
5. **🌤️ Weather & Occasion Aware**: Live weather integration (temperature, rain, humidity) tailoring outfit choices specifically for Mumbai/local conditions.
6. **💬 Personal AI Stylist Chat**: Context-aware chat assistant that answers styling queries ("What should I wear to college tomorrow?") referencing your actual digital wardrobe items.
7. **🛠️ Outfit Builder & Replace Item**: Swap any individual item in a generated outfit with another compatible piece from your wardrobe.
8. **❤️ Feedback Learning Loop**: Like or dislike recommendations with specific feedback reasons ("Not my style", "Wrong colors") to continuously refine future AI recommendations.
9. **👑 Premium Subscription & Brand Deals**: Upgrade plans (Free vs ₹99/mo Pro vs ₹199/mo VIP) and curated sponsored brand discounts (Uniqlo, Zouk, etc.).
10. **📏 Sizing & Measurements**: Height, shirt size, trouser size, shoe size, and waist specifications.

---

## 🎨 Design System

- **Primary Color**: `#7C4DDB` (Purple Gradient)
- **Secondary Color**: `#A77BE8`
- **Background**: `#F8F6FC`
- **Card Surface**: `#FFFFFF`
- **Typography**: Inter / System Sans
- **Micro-interactions**: Smooth page transitions, pulse glow animations, confetti triggers upon saving/wearing looks.

---

## 📁 Directory Architecture

```
outfit-curator/
├── src/
│   ├── app/                    # Next.js App Router & Layout
│   │   ├── page.tsx            # Main application screen router
│   │   ├── layout.tsx          # Root layout & meta tokens
│   │   └── globals.css         # Global design system CSS & variables
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx    # Responsive shell container
│   │   │   ├── Header.tsx      # Persistent top navigation header
│   │   │   └── BottomNav.tsx   # Mobile bottom navigation bar + '+' quick modal
│   │   └── screens/
│   │       ├── SplashOnboardingScreen.tsx
│   │       ├── WelcomeLoginScreen.tsx
│   │       ├── UserOnboardingScreen.tsx
│   │       ├── HomeScreen.tsx
│   │       ├── WardrobeScreen.tsx
│   │       ├── AddClothingScreen.tsx
│   │       ├── StylePreferencesScreen.tsx
│   │       ├── OutfitGenerationScreen.tsx
│   │       ├── OutfitResultScreen.tsx
│   │       ├── OutfitDetailsScreen.tsx
│   │       ├── SavedOutfitsScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       ├── StylistChatScreen.tsx
│   │       ├── PremiumScreen.tsx
│   │       ├── OutfitHistoryScreen.tsx
│   │       ├── BrandDealsScreen.tsx
│   │       ├── SettingsScreen.tsx
│   │       └── MeasurementsScreen.tsx
│   ├── services/
│   │   ├── ai/
│   │   │   ├── outfitGenerator.ts   # Recommendation & scoring engine
│   │   │   ├── clothingClassifier.ts # Vision analysis service
│   │   │   └── styleAdvisor.ts       # AI Stylist chat engine
│   │   └── weather/
│   │       └── weatherService.ts    # Weather data integration
│   ├── stores/
│   │   └── useAppStore.ts           # Zustand global state store
│   ├── data/
│   │   └── seedData.ts              # Seed data (Wardrobe, User, Brands, Products)
│   ├── types/
│   │   └── index.ts                 # Full TypeScript definitions
│   └── styles/
│       └── globals.css              # Design tokens and custom utilities
├── index.html                       # SPA HTML entry point
├── vite.config.ts                   # Vite bundler config
└── package.json
```

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Production Build
```bash
npm run build   # or npx vite build
```

---

## 📜 License
MIT License. Built for Outfit Curator.
