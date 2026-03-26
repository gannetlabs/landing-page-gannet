"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, ShoppingCart, Zap, Brain, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const solutions = [
  {
    icon: Brain,
    title: "Agentes de IA y análisis de datos",
    description:
      "Asistentes que atienden consultas, clasifican leads y organizan información. Tableros que muestran lo que pasa en tu negocio. IA que resuelve problemas concretos, no experimentos.",
    tags: ["GPT-4", "Dashboards", "RAG", "Reportes"],
  },
  {
    icon: Zap,
    title: "Automatizaciones operativas",
    description:
      "Eliminamos las tareas que se hacen a mano todos los días: notificaciones, reportes, sincronización de datos y seguimiento. Menos operación repetitiva, más tiempo para lo que importa.",
    tags: ["n8n", "Make", "Webhooks", "Zapier"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce e integraciones",
    description:
      "Tiendas online integradas con stock, facturación, logística y CRM. Que vender online signifique más ventas, no más trabajo manual.",
    tags: ["Shopify", "WooCommerce", "APIs", "Pagos"],
  },
  {
    icon: Globe,
    title: "Sitios web y landings conectadas",
    description:
      "Sitios rápidos, bien posicionados y conectados a tus procesos de negocio. No solo una vidriera digital: un sitio que captura leads y genera oportunidades reales.",
    tags: ["Next.js", "SEO", "CMS", "Analytics"],
  },
];

export default function Solutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="soluciones" className="bg-primary py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Qué podemos construir para tu negocio
            </h2>
            <p className="mt-4 text-base text-white/50 leading-relaxed">
              Cada solución está diseñada para resolver un problema real, no para
              impresionar con tecnología.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {solutions.map((solution) => (
              <motion.div
                key={solution.title}
                variants={fadeUp}
                className="group bg-surface-container-lowest rounded-2xl p-8 hover:shadow-[0_16px_48px_rgba(25,28,30,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-5">
                  <solution.icon size={22} className="text-surface-tint" />
                </div>
                <h3 className="font-display font-semibold text-on-surface text-xl mb-3">
                  {solution.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                  {solution.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-surface-container-low text-on-surface-variant text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 text-center">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-surface-tint text-white font-semibold rounded-lg hover:bg-surface-tint/90 transition-colors text-sm"
            >
              Quiero ver una solución para mi negocio
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
