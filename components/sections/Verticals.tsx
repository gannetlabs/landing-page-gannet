"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingBag, Calendar, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const verticals = [
  {
    id: "retail",
    icon: ShoppingBag,
    label: "Retail / E-commerce",
    title: "Para negocios que venden productos",
    description:
      "Desde una tienda física con presencia online hasta un e-commerce que quiere escalar sin sumar operación manual.",
    examples: [
      "Tienda online integrada con stock en tiempo real",
      "Automatización de pedidos, envíos y notificaciones al cliente",
      "Dashboard de ventas diarias, ticket promedio y productos más vendidos",
      "Integración con MercadoLibre, Shopify y sistemas de facturación",
      "Agente de IA para responder consultas frecuentes de productos",
    ],
    result:
      "Vender más sin que el equipo pierda tiempo en tareas que puede resolver un sistema.",
  },
  {
    id: "servicios",
    icon: Calendar,
    label: "Servicios con agenda y atención",
    title: "Para negocios que venden tiempo y servicio",
    description:
      "Estudios, consultorios, agencias, coaches, freelancers. Negocios donde la gestión del tiempo y la comunicación son críticos.",
    examples: [
      "Sistema de agenda online con confirmación automática y recordatorios",
      "Flujo de onboarding automatizado para nuevos clientes",
      "CRM simple con seguimiento de conversaciones y estado de cada cliente",
      "Reportes automáticos de ocupación, ingresos y retención",
      "Agente de IA para calificar y responder consultas de nuevos prospectos",
    ],
    result:
      "Menos tiempo en administración, más tiempo en el servicio que realmente hacés.",
  },
];

export default function Verticals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("retail");

  const current = verticals.find((v) => v.id === active)!;

  return (
    <section id="verticales" className="py-24 md:py-32" style={{ background: "#0f0f24" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Ejemplos de aplicación real
            </h2>
            <p className="mt-4 text-base text-white/50">
              No vendemos soluciones genéricas. Estos son dos perfiles comunes de
              negocios con los que trabajamos.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12">
            {/* Tabs */}
            <div className="flex gap-3 justify-center flex-wrap mb-10">
              {verticals.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActive(v.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    active === v.id
                      ? "bg-surface-tint text-white shadow-[0_4px_24px_rgba(0,109,59,0.35)]"
                      : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                  aria-pressed={active === v.id}
                >
                  <v.icon size={16} />
                  {v.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="card-glass p-8 md:p-12"
              >
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3 tracking-tight">
                      {current.title}
                    </h3>
                    <p className="text-white/55 leading-relaxed mb-6">
                      {current.description}
                    </p>
                    <p className="text-sm font-semibold text-accent">
                      {current.result}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-5">
                      Qué construimos en estos casos
                    </p>
                    <ul className="space-y-3">
                      {current.examples.map((ex) => (
                        <li key={ex} className="flex items-start gap-3 text-sm text-white/60">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 text-center">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-tint text-white font-semibold rounded-lg hover:bg-surface-tint/90 transition-colors text-sm"
              >
                Ver un caso parecido al mío
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
