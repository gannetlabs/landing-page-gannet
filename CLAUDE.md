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

Single-page agencia de ia landing for GannetLabs. Next.js 15 App Router, TypeScript, Tailwind CSS v3, Framer Motion.

**Page composition** — `app/page.tsx` imports and sequences all sections in order:
`Hero → Problems → Solutions → Verticals → HowWeWork → WhyGannet → FAQ → ContactCTA`
wrapped by `Header` and `Footer`.

**Section components** — `components/sections/` — each is a self-contained client component with its own data array at the top. All use `useInView` + Framer Motion `staggerContainer`/`fadeUp` variants from `lib/animations.ts` for scroll-triggered animations.

**Typography** — Two font families via `next/font/google`:

- `font-display` → Manrope (headlines, `--font-manrope`)
- `font-sans` → Inter (body, `--font-inter`)

Always use `font-display` on headings (`h1`–`h3`) and `font-sans` (default) on body text.

**Color system** — Tailwind tokens in `tailwind.config.ts` follow Material Design 3 naming. Key tokens:

- `primary` `#000e04` — page background (near-black)
- `accent` `#7dda9a` — green highlights, icons, bullets
- `surface-tint` `#006d3b` — all primary CTA buttons
- `surface-container-lowest` `#ffffff` — light "floating" cards on dark sections
- `on-surface` / `on-surface-variant` — text on light cards
- Alternating dark section backgrounds: `bg-primary` (#000e04) and inline `style={{ background: "#001a0a" }}`
- Dark cards use `.card-glass` (defined in `globals.css`) — do NOT use inline `style={{ background: "#002812" }}` for new cards
- Light cards (Solutions, ContactCTA) keep `bg-surface-container-lowest` — do NOT apply `.card-glass` to them (legibility)

**Design rules:**

- No `border` or `divide-` between sections — use background color shifts
- Dark card styling via `.card-glass` (glassmorphism: `rgba(31,31,65,0.35)` + `backdrop-filter: blur(24px)` + green border glow on hover)
- Light card depth via `shadow-[0_8px_40px_rgba(...)]`, never standard Tailwind shadows
- All headings need `tracking-tight` and `style={{ letterSpacing: "-0.02em" }}`

**Background layer** — `app/layout.tsx` injects two fixed elements before `{children}`:

- `.orb-layer` (z-index 0) — 6 radial glow orbs with floating animations; colors: navy `#1F1F41`, teal `#3da8a0`, verde `#64B97D`, mint `#7edbb5`, deep `#161638`
- `.noise-overlay` (z-index 1) — SVG feTurbulence grain at opacity 0.045
  Both are `pointer-events: none` and `aria-hidden`. All styles live in `globals.css` `@layer base`.

**Contact form** — `components/sections/ContactCTA.tsx` validates with `react-hook-form` + Zod, then POSTs to `app/api/contact/route.ts`, which forwards to an n8n webhook via the `N8N_WEBHOOK_URL` env variable. Without that variable, form data is logged to console (dev fallback).

**Animations** — Reusable Framer Motion variants are in `lib/animations.ts` (`fadeUp`, `fadeIn`, `staggerContainer`, `slideInLeft`, `scaleIn`). Don't create new variants inline; add them there if needed.
