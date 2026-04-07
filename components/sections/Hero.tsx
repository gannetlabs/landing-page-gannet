"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ArrowRight, ChevronDown } from "lucide-react";
import GannetBirdAnimation from "@/components/ui/GannetBirdAnimation";

const stats = [
  { value: "8+", label: "proyectos entregados" },
  { value: "3 países", label: "clientes activos" },
  { value: "1 semana", label: "primeros resultados" },
];

// Fixed values to avoid hydration mismatches
const floatingTags = [
  { label: "n8n",       style: { top: "14%",    left: "4%"   }, dy: 8,  duration: 3.2, delay: 0   },
  { label: "GPT-4",     style: { top: "10%",    right: "6%"  }, dy: 6,  duration: 4.0, delay: 1.1 },
  { label: "Shopify",   style: { bottom: "30%", left: "0%"   }, dy: 9,  duration: 3.7, delay: 0.6 },
  { label: "Webhooks",  style: { bottom: "16%", right: "4%"  }, dy: 7,  duration: 3.5, delay: 1.7 },
  { label: "APIs",      style: { top: "48%",    right: "1%"  }, dy: 5,  duration: 4.2, delay: 0.3 },
  { label: "n8n",       style: { top: "72%",    left: "10%"  }, dy: 10, duration: 3.9, delay: 1.4 },
];

export default function Hero() {
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
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold rounded-full uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                IA · Automatización · Software a medida
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight tracking-tight text-balance"
              style={{ letterSpacing: "-0.02em" }}
            >
              Tecnología que resuelve{" "}
              <span className="text-accent">problemas reales</span> de negocio.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-white/60 leading-relaxed max-w-xl"
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
            className="hidden lg:flex items-center justify-center relative min-h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {/* Radial ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 48%, rgba(125,218,154,0.12) 0%, rgba(125,218,154,0.05) 42%, transparent 68%)",
              }}
            />

            {/* Outer ring — decorative orbit */}
            <div
              className="absolute rounded-full border border-accent/[0.07] pointer-events-none"
              style={{ width: 480, height: 480 }}
              aria-hidden="true"
            />
            <div
              className="absolute rounded-full border border-accent/[0.04] pointer-events-none"
              style={{ width: 360, height: 360 }}
              aria-hidden="true"
            />

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
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {tag.label}
              </motion.span>
            ))}

            {/* The bird — brand identity */}
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
