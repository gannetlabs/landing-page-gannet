"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ArrowRight, ChevronDown } from "lucide-react";
import GannetBirdAnimation from "@/components/ui/GannetBirdAnimation";

const stats = [
  { value: "8+", label: "proyectos entregados" },
  { value: "3 países", label: "clientes activos" },
  { value: "1 semana", label: "primeros resultados" },
];

// Rings centered at right-column center (75% of max-w container).
// Sizes large enough to bleed across the full section width.
const rings = [
  { size: 380,  opacity: 0.16  },
  { size: 620,  opacity: 0.10  },
  { size: 900,  opacity: 0.065 },
  { size: 1180, opacity: 0.038 },
  { size: 1500, opacity: 0.020 },
];

// 18 tags spread full-width — CSS animated (no Framer Motion on tags).
// floatDur/floatDelay: float animation. glowDur/glowDelay: auto-illuminate cycle.
// Fixed values to avoid hydration mismatch.
const floatingTags = [
  // (n8n, HubSpot, Next.js moved to right zone — see below)
  { label: "Make",       style: { bottom: "26%", left: "6%"   }, floatDur: 3.9, floatDelay: 1.4, glowDur: 10, glowDelay: 2.9 },
  { label: "Webhooks",   style: { bottom: "9%",  left: "17%"  }, floatDur: 3.5, floatDelay: 1.7, glowDur: 12, glowDelay: 6.3 },
  // Center zone (cross between columns, some behind title)
  { label: "GPT-4",      style: { top: "6%",     left: "31%"  }, floatDur: 4.0, floatDelay: 1.1, glowDur:  9, glowDelay: 0.4 },
  { label: "Python",     style: { bottom: "26%", left: "28%"  }, floatDur: 4.3, floatDelay: 1.9, glowDur: 11, glowDelay: 5.7 },
  { label: "TypeScript", style: { top: "10%",    left: "44%"  }, floatDur: 4.2, floatDelay: 0.4, glowDur: 12, glowDelay: 7.3 },
  { label: "Supabase",   style: { bottom: "43%", left: "41%"  }, floatDur: 3.5, floatDelay: 1.8, glowDur: 10, glowDelay: 3.9 },
  { label: "Vercel",     style: { bottom: "13%", left: "36%"  }, floatDur: 3.8, floatDelay: 3.1, glowDur: 11, glowDelay: 6.0 },
  // Right zone (around/near bird and rings)
  { label: "n8n",        style: { top: "8%",     right: "26%" }, floatDur: 3.2, floatDelay: 0.0, glowDur: 10, glowDelay: 1.2 },
  { label: "Next.js",    style: { bottom: "22%", right: "25%" }, floatDur: 3.6, floatDelay: 1.6, glowDur: 11, glowDelay: 7.8 },
  { label: "LangChain",  style: { top: "17%",    right: "19%" }, floatDur: 3.9, floatDelay: 0.7, glowDur: 11, glowDelay: 2.5 },
  { label: "Zapier",     style: { top: "22%",    right: "4%"  }, floatDur: 4.1, floatDelay: 0.9, glowDur:  9, glowDelay: 8.1 },
  { label: "FastAPI",    style: { top: "40%",    right: "13%" }, floatDur: 4.1, floatDelay: 1.3, glowDur:  9, glowDelay: 5.1 },
  { label: "APIs",       style: { top: "47%",    right: "2%"  }, floatDur: 4.2, floatDelay: 0.3, glowDur: 10, glowDelay: 0.9 },
  { label: "Redis",      style: { top: "62%",    right: "17%" }, floatDur: 3.7, floatDelay: 2.2, glowDur: 10, glowDelay: 0.8 },
  { label: "Shopify",    style: { bottom: "34%", right: "2%"  }, floatDur: 3.7, floatDelay: 0.6, glowDur: 11, glowDelay: 3.3 },
  { label: "PostgreSQL", style: { bottom: "16%", right: "7%"  }, floatDur: 3.3, floatDelay: 0.5, glowDur:  9, glowDelay: 1.6 },
  { label: "Docker",     style: { bottom: "6%",  right: "15%" }, floatDur: 3.8, floatDelay: 0.8, glowDur: 12, glowDelay: 4.8 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [activeRingIndex, setActiveRingIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const sectionRect = section.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const mx = e.clientX - sectionRect.left;
    const my = e.clientY - sectionRect.top;

    const centerX = (containerRect.left - sectionRect.left) + containerRect.width * 0.75;
    const centerY = sectionRect.height * 0.5;

    const dist = Math.sqrt((mx - centerX) ** 2 + (my - centerY) ** 2);

    let closest = 0;
    let minDelta = Infinity;
    rings.forEach((ring, i) => {
      const delta = Math.abs(dist - ring.size / 2);
      if (delta < minDelta) { minDelta = delta; closest = i; }
    });

    const outerRadius = rings[rings.length - 1].size / 2;
    setMousePos({ x: mx, y: my });
    setActiveRingIndex(dist < outerRadius + 80 ? closest : null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
    setActiveRingIndex(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative bg-primary min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,218,154,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(125,218,154,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Rings layer — full section, centered at right-col center ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{ overflow: "hidden" }}
      >
        {/* Cursor glow */}
        {mousePos && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: mousePos.x,
              top: mousePos.y,
              width: 320,
              height: 320,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(125,218,154,0.13) 0%, rgba(125,218,154,0.05) 45%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        )}
        <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          <div
            style={{
              position: "absolute",
              left: "75%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {rings.map((ring, i) => {
              const isActive = activeRingIndex === i;
              return (
                <div
                  key={ring.size}
                  className={isActive ? "ring-active" : undefined}
                  style={{
                    position: "absolute",
                    width: ring.size,
                    height: ring.size,
                    left: -ring.size / 2,
                    top: -ring.size / 2,
                    borderRadius: "50%",
                    border: `1px solid rgba(125,218,154,${isActive ? ring.opacity * 4.5 : ring.opacity})`,
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(125,218,154,0.12), 0 0 18px rgba(125,218,154,0.10), 0 0 40px rgba(125,218,154,0.05)"
                      : "none",
                    transition: "border-color 0.22s ease, box-shadow 0.22s ease",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Floating tags layer — CSS animated, full section width, z-[2] ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden="true">
        {floatingTags.map((tag) => (
          <span
            key={tag.label}
            className="hero-tag absolute px-3 py-1.5 bg-white/[0.04] border border-white/[0.09] rounded-full text-white/40 text-xs font-medium"
            style={{
              ...tag.style,
              animation: `tag-float ${tag.floatDur}s ease-in-out infinite ${tag.floatDelay}s, tag-glow ${tag.glowDur}s ease-in-out infinite ${tag.glowDelay}s`,
            }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0a1a)" }}
      />

      {/* ── Main content — z-10 (above rings & tags) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: copy ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-white leading-[0.96] tracking-tight text-balance"
              style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              Tecnología que{" "}
              <span className="text-accent">resuelve</span> problemas reales de negocio.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 text-lg text-white/60 leading-relaxed max-w-xl"
            >
              Diseñamos automatizaciones, integraciones y agentes de IA para que
              vendas mejor, ahorres tiempo y tomes decisiones con información, no
              con intuición.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-surface-tint text-white font-semibold rounded-lg hover:bg-surface-tint/90 transition-colors text-sm"
                aria-label="Hablemos de tu proyecto"
              >
                Hablemos de tu proyecto
                <ArrowRight size={16} />
              </a>
              <a
                href="#soluciones"
                className="inline-flex items-center px-6 py-3.5 border border-white/20 text-white/80 font-semibold rounded-lg hover:bg-white/5 transition-colors text-sm"
                aria-label="Ver soluciones"
              >
                Ver soluciones
              </a>
            </motion.div>

            {/* Social proof stats */}
            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.12] pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    className="font-display font-bold text-white text-xl leading-none"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-white/55 text-xs">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: bird visual (static, no hover state) ── */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative min-h-[520px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {/* Radial ambient glow — static */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 48%, rgba(125,218,154,0.10) 0%, rgba(125,218,154,0.04) 42%, transparent 68%)",
              }}
            />

            {/* The bird — whitemark only, no hover */}
            <GannetBirdAnimation size={400} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-white/20 text-[10px] font-medium tracking-[0.2em] uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
