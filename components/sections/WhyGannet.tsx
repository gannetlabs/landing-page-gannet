"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Layers, Clock, BarChart2 } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const differentiators = [
  {
    icon: Target,
    title: "Foco en el problema, no en la tecnología",
    description:
      "Primero entendemos qué necesita el negocio. La tecnología es la herramienta, no el objetivo. Nunca vendemos complejidad innecesaria.",
  },
  {
    icon: Layers,
    title: "Soluciones que se integran con lo que ya tenés",
    description:
      "No pedimos que tires lo que ya funciona. Trabajamos con tus herramientas actuales y las conectamos para que rindan más.",
  },
  {
    icon: Clock,
    title: "Velocidad sin descuidar la calidad",
    description:
      "Entregamos resultados desde la primera semana. Iteramos rápido con foco en lo que importa, no en funcionalidades secundarias.",
  },
  {
    icon: BarChart2,
    title: "Medimos lo que construimos",
    description:
      "Cada solución tiene métricas de éxito definidas desde el inicio. Si no está funcionando, lo sabemos y lo ajustamos.",
  },
];

export default function WhyGannet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="por-que" className="py-24 md:py-32" style={{ background: "#0f0f24" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-accent/70 uppercase mb-4">
              Por qué GannetLabs
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Tecnología aplicada con{" "}
              <span className="text-accent">criterio de negocio</span>
            </h2>
            <p className="mt-4 text-white/50 leading-relaxed">
              No somos una agencia de desarrollo genérica. Somos un equipo que
              entiende tanto de tecnología como de cómo funciona un negocio real.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {differentiators.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="card-glass p-8 group relative overflow-hidden"
              >
                <item.icon
                  size={48}
                  className="text-accent/20 group-hover:text-accent/70 transition-colors duration-300 mb-5"
                  strokeWidth={1.5}
                />
                <h3 className="font-display font-semibold text-white text-lg mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
