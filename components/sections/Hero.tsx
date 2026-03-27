"use client";

import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const [showSpline, setShowSpline] = useState(false);
  const sectionRef = useRef(null);
  // margin generoso: Spline no se desmonta hasta estar bien fuera del viewport
  const heroInView = useInView(sectionRef, { once: false, margin: "200px" });

  useEffect(() => {
    const onLoad = () => setShowSpline(true);
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative bg-primary min-h-screen flex items-center overflow-hidden"
    >
      {/* Spline 3D background — se desmonta al salir del viewport */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {showSpline && heroInView && (
          <Spline
            scene="https://prod.spline.design/tG-Tlcrn4CoidrSb/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
          />
        )}
        {/* Left fade — keeps text readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0a0a1a 30%, rgba(10,10,26,0.80) 55%, rgba(10,10,26,0.20) 80%, transparent 100%)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,26,0.55) 0%, transparent 25%)",
          }}
        />
        {/* Bottom fade to next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(to bottom, transparent, #0a0a1a)",
          }}
        />
      </div>

      {/* Background subtle grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,218,154,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(125,218,154,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <motion.div
          className="max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block px-3 py-1 bg-accent/15 text-accent text-sm font-semibold rounded-full uppercase tracking-wider mb-6">
              IA · AUTOMATIZACIÓN · SOFTWARE A MEDIDA
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
        </motion.div>
      </div>
    </section>
  );
}
