"use client";

import { useState } from "react";
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

// 12 tags spread across the full hero width — fixed values to avoid hydration mismatch.
// Left zone: behind / alongside the title copy.
// Center zone: in the gap between columns.
// Right zone: around the bird.
const floatingTags = [
  { label: "n8n",        style: { top: "11%",    left: "2%"   }, dy: 8,  duration: 3.2, delay: 0.0 },
  { label: "HubSpot",    style: { top: "33%",    left: "1%"   }, dy: 7,  duration: 3.4, delay: 2.0 },
  { label: "Next.js",    style: { top: "55%",    left: "3%"   }, dy: 6,  duration: 3.6, delay: 1.6 },
  { label: "Make",       style: { bottom: "26%", left: "6%"   }, dy: 10, duration: 3.9, delay: 1.4 },
  { label: "Webhooks",   style: { bottom: "9%",  left: "17%"  }, dy: 7,  duration: 3.5, delay: 1.7 },
  { label: "GPT-4",      style: { top: "6%",     left: "31%"  }, dy: 6,  duration: 4.0, delay: 1.1 },
  { label: "Python",     style: { bottom: "26%", left: "28%"  }, dy: 7,  duration: 4.3, delay: 1.9 },
  { label: "Zapier",     style: { top: "22%",    right: "4%"  }, dy: 8,  duration: 4.1, delay: 0.9 },
  { label: "APIs",       style: { top: "47%",    right: "2%"  }, dy: 5,  duration: 4.2, delay: 0.3 },
  { label: "Shopify",    style: { bottom: "34%", right: "2%"  }, dy: 9,  duration: 3.7, delay: 0.6 },
  { label: "PostgreSQL", style: { bottom: "16%", right: "7%"  }, dy: 9,  duration: 3.3, delay: 0.5 },
  { label: "Docker",     style: { bottom: "6%",  right: "15%" }, dy: 5,  duration: 3.8, delay: 0.8 },
];

export default function Hero() {
  const [birdHovered, setBirdHovered] = useState(false);

  return (
    <section
      id="inicio"
      className="relative bg-primary min-h-screen flex items-center overflow-hidden"
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

      {/* ── Rings layer — full section, centered at right-col center, static ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{ overflow: "hidden" }}
      >
        {/* Anchor inside the same max-w container so `left: 75%` aligns with bird */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          <div
            style={{
              position: "absolute",
              left: "75%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {rings.map((ring) => (
              <div
                key={ring.size}
                style={{
                  position: "absolute",
                  width: ring.size,
                  height: ring.size,
                  left: -ring.size / 2,
                  top: -ring.size / 2,
                  borderRadius: "50%",
                  border: `1px solid rgba(125,218,154,${ring.opacity})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating tags layer — full section width, z-[2], behind copy ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden="false">
        {floatingTags.map((tag, i) => (
          <motion.span
            key={`${tag.label}-${i}`}
            className="absolute px-3 py-1.5 bg-white/[0.04] border border-white/[0.09] rounded-full text-white/40 text-xs font-medium cursor-pointer pointer-events-auto"
            style={tag.style}
            animate={{ y: [0, -tag.dy, 0] }}
            transition={{
              duration: tag.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tag.delay,
            }}
            whileHover={{
              color: "#7dda9a",
              borderColor: "rgba(125,218,154,0.6)",
              backgroundColor: "rgba(125,218,154,0.08)",
              boxShadow:
                "0 0 0 3px rgba(125,218,154,0.15), 0 0 16px rgba(125,218,154,0.25)",
              scale: 1.08,
              transition: { duration: 0.2 },
            }}
          >
            {tag.label}
          </motion.span>
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
              className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.06] pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    className="font-display font-bold text-white text-xl leading-none"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-white/35 text-xs">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: bird visual ── */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative min-h-[520px] cursor-crosshair"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            onMouseEnter={() => setBirdHovered(true)}
            onMouseLeave={() => setBirdHovered(false)}
          >
            {/* Radial ambient glow — se intensifica en hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              animate={{ opacity: birdHovered ? 1.8 : 1 }}
              transition={{ duration: 0.6 }}
              style={{
                background:
                  "radial-gradient(circle at 50% 48%, rgba(125,218,154,0.12) 0%, rgba(125,218,154,0.05) 42%, transparent 68%)",
              }}
            />

            {/* The bird */}
            <GannetBirdAnimation size={400} hovered={birdHovered} />
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
