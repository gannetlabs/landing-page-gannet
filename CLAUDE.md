# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (also validates TypeScript)
npm run lint     # ESLint
npm run start    # Serve production build
```

There are no tests in this project.

## Architecture

Single-page agencia de ia landing for GannetLabs. Next.js 16 App Router, TypeScript, Tailwind CSS v3, Framer Motion v12.

**Page composition** — `app/page.tsx` imports and sequences all sections in order:
`Hero → Problems → Solutions → Verticals → HowWeWork → WhyGannet → Partners → FAQ → ContactCTA`
wrapped by `Header` and `Footer`.

**Section components** — `components/sections/` — each is a self-contained client component with its own data array at the top. All use `useInView` + Framer Motion `staggerContainer`/`fadeUp` variants from `lib/animations.ts` for scroll-triggered animations.

**Typography** — Two font families via `next/font/google`:

- `font-display` → Manrope (headlines, `--font-manrope`)
- `font-sans` → Inter (body, `--font-inter`)

Always use `font-display` on headings (`h1`–`h3`) and `font-sans` (default) on body text.

**Color system** — Tailwind tokens in `tailwind.config.ts` follow Material Design 3 naming. Key tokens:

- `primary` `#0a0a1a` — page background (near-black navy/indigo)
- `accent` `#7dda9a` — green highlights, icons, bullets
- `surface-tint` `#006d3b` — all primary CTA buttons
- `surface-container-lowest` `#ffffff` — light "floating" cards on dark sections
- `on-surface` / `on-surface-variant` — text on light cards
- Alternating dark section backgrounds: `bg-primary` (#0a0a1a) and inline `style={{ background: "#0f0f24" }}`
- Dark cards use `.card-glass` (defined in `globals.css`) — do NOT use inline `style={{ background: "#002812" }}` for new cards
- Light cards (Solutions cards, ContactCTA, Partners) keep `bg-surface-container-lowest` — do NOT apply `.card-glass` to them (legibility)
- Partners section uses white background with logos rendered in black via `filter: brightness(0)`; title uses `text-on-surface` + `text-surface-tint` accent

**Design rules:**

- No `border` or `divide-` between sections — use background color shifts
- Dark card styling via `.card-glass` (glassmorphism: `rgba(31,31,65,0.35)` + `backdrop-filter: blur(24px)` + green border glow on hover)
- Light card depth via `shadow-[0_8px_40px_rgba(...)]`, never standard Tailwind shadows
- All headings need `tracking-tight` and `style={{ letterSpacing: "-0.02em" }}`
- Dark card icon/number pattern — use `size={48}` Lucide icon (or `text-5xl` span for numbers) with `text-accent/20 group-hover:text-accent/70 transition-colors duration-300`; add `group` to the card wrapper. Do NOT use small icon containers (`w-11 h-11 rounded-xl bg-accent/15`) on dark cards.

**Preview route** — `app/preview/` is gitignored (local only). Use it to prototype card variants before applying to production components.

**Background layer** — `app/layout.tsx` injects two fixed elements before `{children}`:

- `.orb-layer` (z-index 0) — 3 radial glow orbs (orb-1, orb-2, orb-5) with floating animations; colors: navy `#1F1F41`, teal `#3da8a0`, deep `#161638`. Reducidos de 6 a 3 por rendimiento, blur entre 55–70px.
- `.noise-overlay` (z-index 1) — SVG feTurbulence grain at opacity 0.045
  Both are `pointer-events: none` and `aria-hidden`. All styles live in `globals.css` `@layer base`.

**Contact form** — `components/sections/ContactCTA.tsx` validates with `react-hook-form` + Zod, then POSTs to `app/api/contact/route.ts`, which forwards to an n8n webhook via the `N8N_WEBHOOK_URL` env variable. Without that variable, form data is logged to console (dev fallback).

**Animations** — Reusable Framer Motion variants are in `lib/animations.ts` (`fadeUp`, `fadeIn`, `staggerContainer`, `slideInLeft`, `scaleIn`). Don't create new variants inline; add them there if needed.

**GannetBirdAnimation** — `components/ui/GannetBirdAnimation.tsx` — componente reutilizable que anima el isotipo SVG del pájaro verde (`app/icon.svg`). Secuencia: stroke draw (pathLength 0→1, 1.4s, solo la primera vez) → fill reveal (delay 1.1s) → float loop (y + rotación suave) + pulse glow. Los loops infinitos usan `useInView` con `once: false`: se pausan cuando el componente sale del viewport y reanudan al volver, liberando GPU. Al tipar transiciones con `Transition` de Framer Motion v12, usar `import { type Transition } from "framer-motion"` para evitar errores de TypeScript con el tipo `ease`. Acepta prop `size` (número, default 140). Actualmente usado en la sección Solutions como elemento decorativo en la columna izquierda (`size={300}`). El `viewBox` del SVG es `"210 0 150 145"`.

**Solutions layout** — sección dividida en 2 columnas (`lg:grid lg:grid-cols-2`). Columna izquierda: `lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center` — título, descripción y `GannetBirdAnimation` centrados verticalmente mientras las cards scrollean. Columna derecha: 8 cards apiladas (`flex flex-col gap-5`) con iconos `size={48}` igual que Problems.

**Hero / Spline 3D** — `components/sections/Hero.tsx` — el canvas WebGL de Spline se carga después del evento `window.load` (`showSpline` state) Y solo se monta cuando la sección Hero está en el viewport (`heroInView` via `useInView once:false, margin:"200px"`). Al salir del viewport se desmonta, liberando el loop de render WebGL y la GPU.

**FAQ accordion** — `components/sections/FAQ.tsx` — NO usar `AnimatePresence` con `height: "auto"` en Framer Motion v12: crashea Safari/WebKit durante el exit animation. El acordeón usa `max-height` CSS con `transition-all duration-300` (`0px` ↔ `400px`) + `opacity` inline. Mismo efecto visual, sin dependencia de medición DOM en tiempo de desmontaje.

**Performance — `next.config.mjs`** — configurado con `images.formats: ["image/avif", "image/webp"]`, `compress: true`, `experimental.optimizeCss: true`. No agregar `experimental` flags sin verificar compatibilidad con la versión de Next.js en uso.

**Partners logos** — usar `<Image>` de `next/image` con `width={0} height={0}` y `style={{ height: "60px", width: "auto" }}` para logos SVG con aspect ratio variable. Evita el warning de Next.js sobre dimensiones modificadas.
