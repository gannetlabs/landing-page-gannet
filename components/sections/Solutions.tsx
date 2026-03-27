"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, ShoppingCart, Zap, Brain, MessageSquare, BarChart2, Users, Code2 } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import GannetBirdAnimation from "@/components/ui/GannetBirdAnimation";

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
  {
    icon: MessageSquare,
    title: "Chatbots y atención automatizada",
    description:
      "Bots entrenados con tu información que responden preguntas, califican leads y derivan casos complejos a tu equipo. Atención 24/7 sin escalar el headcount.",
    tags: ["WhatsApp", "Web chat", "LLM", "Handoff"],
  },
  {
    icon: BarChart2,
    title: "Reportes y tableros de decisión",
    description:
      "Centralizamos tus datos dispersos en un solo lugar y los convertimos en visualizaciones claras. Tomás decisiones con información real, no con Excel desactualizado.",
    tags: ["Metabase", "Power BI", "SQL", "ETL"],
  },
  {
    icon: Users,
    title: "CRM y gestión de clientes",
    description:
      "Implementamos y personalizamos tu CRM para que tu equipo comercial trabaje con contexto completo. Seguimiento de oportunidades, historial y automatización del pipeline.",
    tags: ["HubSpot", "Pipedrive", "Salesforce", "Custom"],
  },
  {
    icon: Code2,
    title: "Software a medida",
    description:
      "Cuando ninguna herramienta existente resuelve exactamente tu problema, construimos la solución desde cero. Aplicaciones web internas, portales de clientes y herramientas operativas.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "APIs"],
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
          className="lg:grid lg:grid-cols-2 lg:gap-20 items-start"
        >
          {/* Left — sticky: título + pájaro animado + CTA */}
          <motion.div
            variants={fadeUp}
            className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center mb-14 lg:mb-0"
          >
            <div className="flex flex-col">
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Qué podemos construir{" "}
              <span className="text-accent">para tu negocio</span>
            </h2>
            <p className="mt-4 text-base text-white/50 leading-relaxed">
              Cada solución está diseñada para resolver un problema real, no
              para impresionar con tecnología.
            </p>

            <div className="mt-10 flex items-center justify-center lg:justify-start">
              <GannetBirdAnimation size={300} />
            </div>
            </div>
          </motion.div>

          {/* Right — 4 cards apiladas */}
          <motion.div variants={staggerContainer} className="flex flex-col gap-5">
            {solutions.map((solution) => (
              <motion.div
                key={solution.title}
                variants={fadeUp}
                className="group bg-surface-container-lowest rounded-2xl p-8 hover:shadow-[0_16px_48px_rgba(25,28,30,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <solution.icon size={48} className="text-accent/20 group-hover:text-accent/70 transition-colors duration-300 mb-5" strokeWidth={1.5} />
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
        </motion.div>
      </div>
    </section>
  );
}
