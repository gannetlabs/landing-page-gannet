"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Entendemos el problema",
    description:
      "Antes de proponer cualquier solución, entendemos cómo funciona tu negocio hoy, qué duele más y dónde está el mayor impacto posible.",
  },
  {
    number: "02",
    title: "Diseñamos una solución simple",
    description:
      "Proponemos un alcance claro, sin sobrediseñar. La solución más simple que resuelve el problema real es siempre la mejor opción.",
  },
  {
    number: "03",
    title: "Construimos e integramos",
    description:
      "Desarrollamos con foco en resultados. Sin procesos lentos ni reuniones infinitas. Mostramos avances reales desde la primera semana.",
  },
  {
    number: "04",
    title: "Medimos y mejoramos",
    description:
      "Una vez implementado, medimos si está funcionando y ajustamos. El objetivo no es entregar, es que sirva.",
  },
];

export default function HowWeWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="como-trabajamos" className="bg-primary py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Trabajamos con foco, claridad y{" "}
              <span className="text-accent">validación rápida</span>
            </h2>
            <p className="mt-4 text-white/50 text-base leading-relaxed">
              Un proceso pensado para negocios que no tienen tiempo para
              proyectos interminables.
            </p>
          </motion.div>

          {/* Steps grid */}
          <motion.div
            variants={staggerContainer}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="card-glass p-8"
              >
                <span className="font-display text-5xl font-bold text-accent/20 leading-none block mb-5">
                  {step.number}
                </span>
                <h3 className="font-display text-white font-semibold text-lg mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 text-center">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-surface-tint text-white font-semibold rounded-lg hover:bg-surface-tint/90 transition-colors text-sm"
              aria-label="Coordinar una llamada"
            >
              Coordinar una llamada
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
