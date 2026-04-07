"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Globe, ShoppingCart, Zap, Brain, MessageSquare, BarChart2, Users, Code2, ChevronLeft, ChevronRight } from "lucide-react";
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

const CARD_WIDTH = 300;
const CARD_GAP = 20;
const STEP = CARD_WIDTH + CARD_GAP;

export default function Solutions() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const x = useMotionValue(0);

  useEffect(() => {
    const calculate = () => {
      if (outerRef.current && innerRef.current) {
        const max = innerRef.current.scrollWidth - outerRef.current.offsetWidth;
        setMaxDrag(Math.max(0, max));
      }
    };
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const visibleCount = outerRef.current
    ? Math.floor(outerRef.current.offsetWidth / STEP)
    : 3;
  const maxIndex = Math.max(0, solutions.length - visibleCount);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setActiveIndex(clamped);
      x.set(-clamped * STEP);
    },
    [maxIndex, x]
  );

  const handleDragEnd = useCallback(() => {
    const current = x.get();
    const nearest = Math.round(-current / STEP);
    scrollTo(nearest);
  }, [x, scrollTo]);

  const progressWidth = useTransform(
    x,
    [-maxDrag, 0],
    ["100%", `${(1 / solutions.length) * 100}%`]
  );

  return (
    <section id="soluciones" className="bg-primary py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
          >
            <div className="max-w-xl">
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
            </div>

            {/* Arrow navigation */}
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => scrollTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollTo(activeIndex + 1)}
                disabled={activeIndex >= maxIndex}
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div variants={fadeUp}>
            <div
              ref={outerRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
            >
              <motion.div
                ref={innerRef}
                style={{ x }}
                drag="x"
                dragConstraints={{ right: 0, left: -maxDrag }}
                dragElastic={0.05}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
                onDragEnd={handleDragEnd}
                className="flex gap-5"
              >
                {solutions.map((solution) => (
                  <div
                    key={solution.title}
                    className="group bg-surface-container-lowest rounded-2xl p-8 flex flex-col hover:shadow-[0_16px_48px_rgba(25,28,30,0.12)] hover:-translate-y-1 transition-all duration-300"
                    style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH }}
                  >
                    <solution.icon
                      size={48}
                      className="text-accent/20 group-hover:text-accent/70 transition-colors duration-300 mb-5 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-display font-semibold text-on-surface text-lg mb-3 leading-snug">
                      {solution.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-5 flex-1">
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
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="mt-8 h-px bg-white/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent/60 rounded-full origin-left"
                style={{ width: progressWidth }}
              />
            </div>

            {/* Dot indicators */}
            <div className="mt-5 flex justify-center gap-2">
              {solutions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 h-1.5 bg-accent"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Ir a solución ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
