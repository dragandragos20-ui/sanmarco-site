# San Marco Website Complet - Hero Carousel + Secțiuni Premium

Website complet San Marco cu secțiune HERO carousel premium și pagină completă cu toate secțiunile necesare, construit cu React, TypeScript, TailwindCSS și Framer Motion.

## 🌟 Caracteristici Complete

### ✅ Hero Carousel (NEATINS)
- Carousel complet funcțional cu 3 slide-uri specifice
- Controale interactive - săgeți navigare, autoplay, swipe gestures
- Toate hook-urile JSON implementate ([HOOK:DATA_HERO_*])
- Accesibilitate completă - support tastatură, aria-live, focus states
- Design responsive optimizat pentru desktop și mobil

### ✅ Header Fix Complet
- Logo "San Marco" cu design elegant
- Meniu principal: "Acasă", "Categorii", "Produse", "Trenduri", "Contact"
- Dropdown categorii: "Finisaje Decorative", "Fațade & Exterior", "Lemn & Metal", "Grunduri & Pregătire"
- Style glassmorphism cu backdrop-blur
- Responsive cu meniu hamburger pe mobil

### ✅ Secțiunea Categorii Principale
- Grid 4 categorii cu carduri elegante
- Imagini cu hover parallax effect
- Stagger animation pe scroll
- Hook-uri JSON complete ([HOOK:DATA_CATEGORIES_*])
- Texte: "Finisaje Decorative", "Fațade & Exterior", "Lemn & Metal", "Grunduri & Pregătire"

### ✅ Secțiunea "4 Produse Recomandate"
- Grid 4 carduri produse cu design premium
- Shadow subtil, hover scale 1.05
- Auto-rotate la 6 secunde
- Puncte de navigare cu aria-controls
- Swipe pe mobil și suport tastatură
- Hook-uri JSON complete ([HOOK:DATA_PRODUCTS_*])

### ✅ Secțiunea "Trenduri de Decor"
- Card mare plutitor cu glassmorphism
- Hover cu ușor glow effect auriu
- CTA aliniat pe dreapta, vertical
- Background gradient overlay
- Hook-uri JSON complete ([HOOK:DATA_TRENDS_*])

### ✅ Footer Complet
- Nume firmă: "San Marco România"
- Contact: email, telefon, adrese
- Social Media: Facebook, Instagram, YouTube icons
- Newsletter subscription
- Copyright și linkuri legale

## 🎨 Design Premium San Marco

### Paleta de Culori
- **Primary**: #8B4513 (maro italian)
- **Secondary**: #D4AF37 (auriu)
- **Accent**: #2F4F4F (gri-verde închis)
- **Text**: #1F2937 (gri închis)

### Tipografie
- **Titluri**: Lora (serif) - elegant și premium
- **Corp Text**: Inter (sans-serif) - lizibil și modern
- Support complet pentru diacriticele românești

### Efecte Vizuale
- Glassmorphism pe header și carduri speciale
- Animații smooth cu framer-motion
- Hover effects elegante
- Micro-animații premium
- Parallax effects pe imagini

## 🚀 Cum să pornești proiectul

```bash
# Instalează dependențele
pnpm install

# Pornește serverul de dezvoltare
pnpm run dev

# Construiește pentru producție
pnpm run build

# Previzualizează build-ul
pnpm run preview
```

## 📁 Structura Proiectului

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Header fix cu glassmorphism
│   │   └── Footer.tsx          # Footer complet
│   ├── sections/
│   │   ├── CategoriesSection.tsx   # Secțiunea categorii
│   │   ├── ProductsSection.tsx     # Secțiunea produse
│   │   └── TrendsSection.tsx       # Secțiunea trenduri
│   └── HeroCarousel.tsx        # Carousel NEATINS
├── hooks/
│   └── useFetchData.ts         # Hook generic pentru JSON
└── App.tsx                     # Aplicația principală

public/
├── data/
│   ├── hero_slides.json        # Date pentru carousel
│   ├── categories.json         # Date pentru categorii
│   ├── products_featured.json  # Date pentru produse
│   └── trends.json            # Date pentru trenduri
└── images/                    # Toate imaginile
```

## 🔗 Hook-uri JSON Implementate

### Hero Carousel (NEATINS)
```javascript
// [HOOK:DATA_HERO_IMPORT] – import utilitare JSON/JSONL
// [HOOK:DATA_HERO_FETCH] – fetch('/data/hero_slides.json')
// [HOOK:DATA_HERO_MAP] – mapare slide-uri la UI
// [HOOK:DATA_HERO_AUTOPLAY] – control autoplay (6000ms, pause on hover)
// [HOOK:ARIA_ANNOUNCE] – actualizare aria-live pentru index
```

### Categorii
```javascript
// [HOOK:DATA_CATEGORIES_IMPORT] – import utilitare JSON
// [HOOK:DATA_CATEGORIES_FETCH] – fetch('/data/categories.json')
// [HOOK:DATA_CATEGORIES_MAP] – mapare categorii la carduri
```

### Produse
```javascript
// [HOOK:DATA_PRODUCTS_IMPORT] – import utilitare JSON
// [HOOK:DATA_PRODUCTS_FETCH] – fetch('/data/products_featured.json')
// [HOOK:DATA_PRODUCTS_MAP] – mapare produse la carduri
// [HOOK:DATA_PRODUCTS_AUTOROTATE] – control auto-rotate (6 sec)
```

### Trenduri
```javascript
// [HOOK:DATA_TRENDS_IMPORT] – import utilitare JSON
// [HOOK:DATA_TRENDS_FETCH] – fetch('/data/trends.json')
// [HOOK:DATA_TRENDS_MAP] – mapare trend principal
```

## 📊 Schema de Date JSON

### Hero Slides (`/data/hero_slides.json`)
```json
[{
  "slug": "slide-1",
  "media": { "type": "image", "url": "/images/slide-1.jpg" },
  "heading_primary": "San Marco",
  "heading_secondary": "Arta culorilor italiene",
  "category_label": "Decorative",
  "target_url": "/san-marco-arta-culorilor.html"
}]
```

### Categorii (`/data/categories.json`)
```json
[{
  "id": "decorative",
  "title": "Finisaje Decorative",
  "description": "Vopsele decorative pentru interioare de lux",
  "image": "/images/category-decorative.jpg",
  "link": "/categorii/decorative",
  "featured": true
}]
```

### Produse (`/data/products_featured.json`)
```json
[{
  "id": "cadoro-gold",
  "name": "Cadoro Gold",
  "category": "Decorative",
  "description": "Efect metalic auriu pentru interioare de lux",
  "price": "285 RON",
  "image": "/images/product-cadoro-gold.jpg",
  "featured": true,
  "rating": 4.9,
  "inStock": true
}]
```

### Trenduri (`/data/trends.json`)
```json
{
  "id": "trend-2025",
  "title": "Trenduri de Decor 2025",
  "subtitle": "Culorile calde și texturile naturale",
  "description": "Descoperă cele mai noi tendințe...",
  "highlights": ["Culori pământii", "Texturi tactile"],
  "image": "/images/trends-2025.jpg",
  "cta": { "text": "Explorează Trendurile", "link": "/trenduri-2025" }
}
```

## 🎯 Funcționalități Interactive

### Header Navigation
- Logo click → scroll to top
- Dropdown categorii cu animații
- Mobile hamburger menu
- Glassmorphism background on scroll

### Hero Carousel
- Autoplay 6000ms cu pause on hover
- Keyboard navigation (←/→)
- Click pe slide pentru navigare
- Swipe support pe mobil
- Index afișat "01/03"

### Categorii
- Hover parallax pe imagini
- Stagger animations pe scroll
- Click pentru navigare

### Produse
- Auto-rotate la 6 secunde
- Puncte navigare interactive
- Swipe support pe mobil
- Hover effects pe carduri
- Rating cu stele

### Trenduri
- Glassmorphism card
- Glow effect la hover
- CTA vertical alignment
- Gradient overlays

### Footer
- Newsletter subscription
- Social media links
- Contact info interactiv

## 🛠 Tehnologii

- **React 18.3** - Framework UI
- **TypeScript** - Type safety
- **TailwindCSS** - Styling utility-first
- **Framer Motion 12.23** - Animații premium
- **Embla Carousel** - Motor carousel
- **Heroicons** - Iconuri elegante
- **Vite** - Build tool modern
- **Inter + Lora Fonts** - Tipografie premium

## 🌐 Deployment

**Website Live**: https://2v9kdscg5ez1.space.minimax.io

## 📝 Changelog

### v2.0.0 - Website Complet
- ✅ Header fix cu glassmorphism
- ✅ Secțiunea Categorii cu stagger animations
- ✅ Secțiunea Produse cu auto-rotate
- ✅ Secțiunea Trenduri cu glow effects
- ✅ Footer complet cu newsletter
- ✅ Hook-uri JSON pentru toate secțiunile
- ✅ Design premium San Marco
- ✅ Animații Framer Motion
- ✅ Support complet responsive

### v1.0.0 - Hero Carousel
- ✅ Carousel premium cu 3 slide-uri
- ✅ Controale interactive complete
- ✅ Accesibilitate completă
- ✅ Hook-uri JSON pentru carousel

## 🎨 Design Inspiration

Design-ul este inspirat din:
- Site-ul oficial ro.san-marco.com
- Principii glassmorphism moderne
- Paleta de culori italiana premium
- Micro-animații elegante
- Touch-uri premium și sofisticate

---

**Autor**: MiniMax Agent  
**Versiune**: 2.0.0  
**Data**: 2025-09-23  
**Website**: https://2v9kdscg5ez1.space.minimax.io# sanmarco-site-2
