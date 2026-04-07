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
`Hero → Problems → Solutions → Clients → HowWeWork → WhyGannet → Verticals → FAQ → ContactCTA`
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
- Light cards (ContactCTA form) keep `bg-surface-container-lowest` — do NOT apply `.card-glass` to them (legibility)
- Solutions cards now use `.card-glass` (dark) — updated from the previous light card style

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

**GannetBirdAnimation** — `components/ui/GannetBirdAnimation.tsx` — componente reutilizable que anima el isotipo SVG del pájaro. Sin movimiento en ningún estado. Secuencia al montar: stroke draw (pathLength 0→1, 1.4s, solo la primera vez) → whitemark fill reveal (`rgba(255,255,255,0.10)`, delay 1.2s via `setTimeout` + `revealed` state). En hover (`hovered` prop): whitemark se desvanece, aparece fill verde `#00EE8E` con glow (`feGaussianBlur` stdDeviation=8) + glow burst (stdDeviation=14, opacity 0.45). Cuatro capas SVG apiladas: glow burst, stroke draw, whitemark fill, green fill. Acepta props `size` (número, default 140), `className`, `hovered` (boolean, default false). Usado en Hero con `size={400}` y `hovered={birdHovered}`. El `viewBox` del SVG es `"210 0 150 145"`.

**Solutions layout** — carrusel horizontal draggable (`drag="x"` de Framer Motion). Header con título + flechas prev/next. Cards de `340px` de ancho con `.card-glass`, apiladas en fila. Cada card: icono (`size={40}`, `text-accent/40 → text-accent` en hover) → título → descripción (`flex-1`) → tags → separador → precio mensual (`desde $XXX USD /mes`) → CTA "Cotizar solución" → `#contacto`. Snap al card más cercano en `onDragEnd`. Barra de progreso animada + dots indicadores. Para agregar soluciones: añadir al array `solutions` con `{ icon, title, description, tags, price }`.

**Hero** — `components/sections/Hero.tsx` — layout de 2 columnas en desktop (`lg:grid-cols-2`). Izquierda: H1 con `leading-[0.96]` (interlineado apretado, editorial) y `clamp(2.75rem, 5vw, 4.5rem)`, énfasis verde en el verbo `"resuelve"` (brand promise activo, no en "problemas reales" que es negativo). Descripción, CTAs, stats de social proof (separados por `border-t border-white/[0.06]`). Derecha: `GannetBirdAnimation size={400} hovered={birdHovered}` — pájaro estático, whitemark por defecto, verde en hover. 5 anillos concéntricos (`180px`–`620px`) que se iluminan con `birdHovered`. 12 floating tech pills con float animations individuales y `whileHover` con glow verde. `birdHovered` state via `onMouseEnter`/`onMouseLeave` en el contenedor derecho. Scroll indicator animado (bounce) al fondo. Mobile: columna derecha oculta (`hidden lg:flex`). Sin dependencias externas de 3D/WebGL.

**FAQ accordion** — `components/sections/FAQ.tsx` — NO usar `AnimatePresence` con `height: "auto"` en Framer Motion v12: crashea Safari/WebKit durante el exit animation. El acordeón usa `max-height` CSS con `transition-all duration-300` (`0px` ↔ `400px`) + `opacity` inline. Mismo efecto visual, sin dependencia de medición DOM en tiempo de desmontaje.

**Performance — `next.config.mjs`** — configurado con `images.formats: ["image/avif", "image/webp"]`, `compress: true`, `experimental.optimizeCss: true`. No agregar `experimental` flags sin verificar compatibilidad con la versión de Next.js en uso.

**Partners logos** — usar `<Image>` de `next/image` con `width={0} height={0}` y `style={{ height: "60px", width: "auto" }}` para logos SVG con aspect ratio variable. Evita el warning de Next.js sobre dimensiones modificadas. Los logos se muestran en blanco sobre fondo oscuro con `filter: brightness(0) invert(1)` y `opacity-50 hover:opacity-100`.

**Clients (marquee de logos)** — `components/sections/Clients.tsx` — sección después de Solutions, muestra logos de clientes en marquee horizontal infinito (derecha→izquierda). Fondo `bg-primary`, logos blancos (`brightness(0) invert(1)`), opacidad 40→90 en hover. Loop seamless: `base = clients × 4` (garantiza ancho > cualquier viewport), `logos = base × 2`, anima `translateX(-50%)` = exactamente el ancho del `base`. Keyframe `clients-marquee` y clases `.clients-marquee-track` / `.clients-marquee-wrap` definidos en `globals.css` (una sola vez para evitar conflictos si se usa más de una instancia). Velocidad: 40s por ciclo. Para agregar logos: añadir objetos `{ name, src }` al array `clients` — el resto escala automáticamente.

**Verticals (Partners estratégicos)** — `components/sections/Verticals.tsx` — muestra los partners estratégicos (Nueva Era, Tienda, Dux). Fondo `#0f0f24`, padding `py-32 md:py-40`, título con `text-accent`, logos blancos con hover de opacidad. Posicionada al final del flujo antes de FAQ. La sección `Partners.tsx` original (fondo blanco) fue eliminada del flujo.

**WhyGannet** — `components/sections/WhyGannet.tsx` — grid 2×2 de cards `.card-glass` (igual que Problems). Icono `size={48}` con `text-accent/20 → text-accent/70` en hover. Agrega label de sección `"Por qué GannetLabs"` en `text-accent/70 uppercase tracking-widest` sobre el heading.

**HowWeWork** — `components/sections/HowWeWork.tsx` — 4 cards `.card-glass` en grid. Cada card tiene: (1) watermark numérico gigante (`8rem`) posicionado `absolute -bottom-4 -right-2` con `text-white/[0.04]` que sube a `text-white/[0.07]` en hover — `overflow-hidden` en el card para recortarlo; (2) label pequeño `"PASO 01"` en `text-accent/60 tracking-widest text-xs`; (3) título y descripción en `relative z-10` sobre el watermark.

**Problems** — `components/sections/Problems.tsx` — 4 cards `.card-glass`. Cada card tiene `relative overflow-hidden` y un watermark numérico (`01`–`04`) `absolute -bottom-3 -right-1` en `text-white/[0.04]` con `fontSize: "7rem"`. Iconos e contenido en `relative z-10`.

**ContactCTA** — `components/sections/ContactCTA.tsx` — sección 2 columnas. Columna izquierda incluye bloque de WhatsApp con `border-t border-white/[0.07]` al fondo: link directo con `MessageCircle` icon y `ArrowRight` animado en hover (`group/wa`).

**Footer** — usa `<Image src="/logosvg.svg">` en lugar de texto para la marca GannetLabs. Separador superior con gradiente verde centrado: `linear-gradient(to right, transparent, rgba(125,218,154,0.25), transparent)`.
