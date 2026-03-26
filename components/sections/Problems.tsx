"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, Database, TrendingUp, Puzzle } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const problems = [
  {
    icon: Settings,
    title: "Procesos manuales",
    description:
      "Lo que podría automatizarse se hace a mano todos los días. Tiempo perdido, errores repetidos y un equipo atrapado en tareas operativas.",
  },
  {
    icon: Database,
    title: "Información dispersa",
    description:
      "Datos en WhatsApp, planillas, mails y sistemas que no se hablan. Sin una fuente clara, las decisiones se toman a ciegas.",
  },
  {
    icon: TrendingUp,
    title: "Ventas sin sistema",
    description:
      "Consultas que se enfrían, oportunidades sin seguimiento y ningún lugar claro donde ver qué pasa con cada venta.",
  },
  {
    icon: Puzzle,
    title: "Tecnología sin integración",
    description:
      "Herramientas sueltas que no conversan entre sí. Trabajo duplicado, datos desactualizados y procesos que se caen entre los sistemas.",
  },
];

export default function Problems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="problemas"
      className="py-24 md:py-32"
      style={{ background: "#0f0f24" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight text-balance"
              style={{ letterSpacing: "-0.02em" }}
            >
              Muchos negocios no necesitan más herramientas. Necesitan que lo
              que ya hacen <span className="text-accent">funcione mejor.</span>
            </h2>
            <p className="mt-4 text-base text-white/50 leading-relaxed">
              Si tu equipo pierde tiempo en lo operativo, las ventas se enfrían
              solas o las decisiones se toman sin datos claros, el problema no
              es falta de esfuerzo. Es falta de sistema.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {problems.map((problem) => (
              <motion.div
                key={problem.title}
                variants={fadeUp}
                className="card-glass p-8 group"
              >
                <problem.icon size={48} className="text-accent/20 group-hover:text-accent/70 transition-colors duration-300 mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-white font-semibold text-lg mb-3 leading-tight">
                  {problem.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 text-center">
            <a
              href="#soluciones"
              className="inline-flex items-center px-6 py-3 bg-surface-tint text-white font-semibold rounded-lg hover:bg-surface-tint/90 transition-colors text-sm"
            >
              Ver cómo lo resolvemos
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
