"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const faqs = [
  {
    question: "¿Trabajan con negocios de cualquier tamaño?",
    answer:
      "Sí. Trabajamos con pymes, emprendimientos que quieren crecer y equipos internos de empresas medianas. El factor clave no es el tamaño: es que haya un problema real que resolver y ganas de mejorarlo con tecnología.",
  },
  {
    question: "¿Cuánto tiempo lleva un proyecto típico?",
    answer:
      "Depende del alcance. Un sitio web o una automatización simple puede estar lista en 2 a 4 semanas. Un sistema más complejo con integraciones y lógica de negocio puede llevar de 6 a 12 semanas. Siempre arrancamos con una propuesta clara de tiempos antes de empezar.",
  },
  {
    question: "¿Necesito tener todo claro antes de contactarlos?",
    answer:
      "No. Muchas veces el primer paso es entender juntos cuál es el problema real. Podés llegar con 'tengo este dolor' o 'quiero mejorar esto' y de ahí arrancamos. La primera conversación es sin compromiso.",
  },
  {
    question: "¿Qué pasa después de que entregan el proyecto?",
    answer:
      "Depende del acuerdo. Algunos proyectos son de entrega única con documentación y capacitación incluida. Otros tienen soporte continuo o mejoras iterativas. Lo definimos antes de empezar para que no haya sorpresas.",
  },
  {
    question: "¿Puedo seguir usando mis herramientas actuales?",
    answer:
      "Sí, en la mayoría de los casos. Antes de proponer cambiar algo, analizamos qué ya tenés y cómo aprovecharlo mejor. Rara vez es necesario tirar todo y empezar de cero. Preferimos construir sobre lo que funciona.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={`font-display font-semibold text-base transition-colors ${open ? "text-accent" : "text-white group-hover:text-accent"}`}>
          {question}
        </span>
        <span className="flex-shrink-0 mt-0.5 text-accent">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="bg-primary py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-white/50 text-base">
              Las dudas más comunes antes de arrancar.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="card-glass mt-12 overflow-hidden"
          >
            <div className="px-8">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} {...faq} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 text-center">
            <a
              href="#contacto"
              className="inline-flex items-center px-6 py-3 border border-white/15 text-white/70 font-semibold rounded-lg hover:bg-white/5 hover:text-white transition-colors text-sm"
            >
              Todavía tengo una duda
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
