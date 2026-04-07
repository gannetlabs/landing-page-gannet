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

// Rings: inner → outer
const rings = [
  { size: 180, baseOpacity: 0.14, hoverOpacity: 0.45, delay: 0    },
  { size: 280, baseOpacity: 0.09, hoverOpacity: 0.28, delay: 0.05 },
  { size: 390, baseOpacity: 0.06, hoverOpacity: 0.18, delay: 0.10 },
  { size: 500, baseOpacity: 0.04, hoverOpacity: 0.12, delay: 0.15 },
  { size: 620, baseOpacity: 0.02, hoverOpacity: 0.07, delay: 0.20 },
];

// 12 tags — valores fijos para evitar hydration mismatch
const floatingTags = [
  { label: "n8n",        style: { top: "7%",     left: "3%"   }, dy: 8,  duration: 3.2, delay: 0.0 },
  { label: "GPT-4",      style: { top: "5%",     right: "5%"  }, dy: 6,  duration: 4.0, delay: 1.1 },
  { label: "HubSpot",    style: { top: "22%",    left: "5%"   }, dy: 7,  duration: 3.4, delay: 2.0 },
  { label: "Zapier",     style: { top: "26%",    right: "2%"  }, dy: 8,  duration: 4.1, delay: 0.9 },
  { label: "Next.js",    style: { top: "46%",    left: "1%"   }, dy: 6,  duration: 3.6, delay: 1.6 },
  { label: "APIs",       style: { top: "44%",    right: "1%"  }, dy: 5,  duration: 4.2, delay: 0.3 },
  { label: "Shopify",    style: { bottom: "34%", left: "0%"   }, dy: 9,  duration: 3.7, delay: 0.6 },
  { label: "Python",     style: { bottom: "32%", right: "3%"  }, dy: 7,  duration: 4.3, delay: 1.9 },
  { label: "Make",       style: { bottom: "20%", left: "8%"   }, dy: 10, duration: 3.9, delay: 1.4 },
  { label: "PostgreSQL", style: { bottom: "18%", right: "6%"  }, dy: 9,  duration: 3.3, delay: 0.5 },
  { label: "Webhooks",   style: { bottom: "7%",  left: "18%"  }, dy: 7,  duration: 3.5, delay: 1.7 },
  { label: "Docker",     style: { bottom: "5%",  right: "14%" }, dy: 5,  duration: 3.8, delay: 0.8 },
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

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0a1a)" }}
      />

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

          {/* ── Right: brand visual ── */}
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
              animate={{
                opacity: birdHovered ? 1.8 : 1,
              }}
              transition={{ duration: 0.6 }}
              style={{
                background:
                  "radial-gradient(circle at 50% 48%, rgba(125,218,154,0.12) 0%, rgba(125,218,154,0.05) 42%, transparent 68%)",
              }}
            />

            {/* Concentric rings — se iluminan en hover */}
            {rings.map((ring, i) => (
              <motion.div
                key={ring.size}
                className="absolute rounded-full pointer-events-none"
                style={{ width: ring.size, height: ring.size }}
                animate={
                  birdHovered
                    ? {
                        borderColor: `rgba(125,218,154,${ring.hoverOpacity})`,
                        boxShadow: `0 0 ${12 + i * 4}px rgba(125,218,154,${ring.hoverOpacity * 0.3})`,
                        scale: 1 + i * 0.008,
                      }
                    : {
                        borderColor: `rgba(125,218,154,${ring.baseOpacity})`,
                        boxShadow: "0 0 0px rgba(125,218,154,0)",
                        scale: 1,
                      }
                }
                transition={{ duration: 0.5, delay: ring.delay, ease: "easeOut" }}
                initial={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: `rgba(125,218,154,${ring.baseOpacity})`,
                }}
              />
            ))}

            {/* Floating tech tags */}
            {floatingTags.map((tag, i) => (
              <motion.span
                key={`${tag.label}-${i}`}
                className="absolute px-3 py-1.5 bg-white/[0.04] border border-white/[0.09] rounded-full text-white/40 text-xs font-medium cursor-pointer"
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

            {/* The bird — static until hover */}
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
