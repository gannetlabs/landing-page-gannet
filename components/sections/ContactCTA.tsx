"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  empresa: z.string().min(1, "Ingresá tu empresa o proyecto"),
  contacto: z
    .string()
    .min(1, "Ingresá un email o número de WhatsApp")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        /^\+?[\d\s\-()]{7,}$/.test(val),
      "Ingresá un email o WhatsApp válido"
    ),
  mensaje: z.string().min(10, "Contanos un poco más sobre lo que necesitás"),
});

type FormData = z.infer<typeof schema>;

function InputField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-on-surface-variant mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al enviar");
      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Hubo un error. Intentá de nuevo."
      );
    }
  };

  const inputClass =
    "w-full bg-surface-container-low border-0 border-b border-outline-variant text-on-surface placeholder-on-surface-variant/50 px-0 py-3 text-sm focus:outline-none focus:border-surface-tint transition-colors";

  return (
    <section id="contacto" className="py-24 md:py-32" style={{ background: "#0f0f24" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left: Copy */}
          <div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight text-balance"
              style={{ letterSpacing: "-0.02em" }}
            >
              Si tu negocio necesita más orden, mejores respuestas o procesos más
              simples,{" "}
              <span className="text-accent">conversemos.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-white/55 text-base leading-relaxed"
            >
              La primera conversación es sin compromiso. Nos contás qué está
              pasando y te decimos honestamente si podemos ayudarte y cómo.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-white/55 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                Sin formularios largos ni procesos lentos
              </div>
              <div className="flex items-center gap-3 text-white/55 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                Respuesta en menos de 24 horas hábiles
              </div>
              <div className="flex items-center gap-3 text-white/55 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                Si no podemos ayudarte, te lo decimos directo
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div variants={fadeUp}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-container-lowest rounded-2xl p-10 text-center shadow-[0_8px_40px_rgba(25,28,30,0.08)]"
                >
                  <CheckCircle size={48} className="text-surface-tint mx-auto mb-4" />
                  <h3 className="font-display text-on-surface font-bold text-xl mb-2">
                    ¡Mensaje recibido!
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    Te vamos a responder en menos de 24 horas hábiles. Mientras
                    tanto, podés revisar nuestras soluciones arriba.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-surface-container-lowest rounded-2xl p-8 space-y-6 shadow-[0_8px_40px_rgba(25,28,30,0.08)]"
                  noValidate
                >
                  <InputField label="Nombre" error={errors.nombre?.message}>
                    <input
                      {...register("nombre")}
                      type="text"
                      placeholder="Tu nombre"
                      className={inputClass}
                      aria-label="Nombre"
                    />
                  </InputField>

                  <InputField
                    label="Empresa o proyecto"
                    error={errors.empresa?.message}
                  >
                    <input
                      {...register("empresa")}
                      type="text"
                      placeholder="Nombre de tu empresa o proyecto"
                      className={inputClass}
                      aria-label="Empresa o proyecto"
                    />
                  </InputField>

                  <InputField
                    label="Email o WhatsApp"
                    error={errors.contacto?.message}
                  >
                    <input
                      {...register("contacto")}
                      type="text"
                      placeholder="tu@email.com o +54 9 11 ..."
                      className={inputClass}
                      aria-label="Email o WhatsApp"
                    />
                  </InputField>

                  <InputField
                    label="¿Qué estás intentando resolver?"
                    error={errors.mensaje?.message}
                  >
                    <textarea
                      {...register("mensaje")}
                      rows={4}
                      placeholder="Contanos brevemente cuál es el problema o lo que querés mejorar..."
                      className={`${inputClass} resize-none`}
                      aria-label="Mensaje"
                    />
                  </InputField>

                  {serverError && (
                    <p className="text-red-500 text-sm">{serverError}</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-surface-tint text-white font-semibold rounded-lg hover:bg-surface-tint/90 disabled:opacity-60 transition-colors text-sm"
                      aria-label="Agendar una reunión"
                    >
                      {isSubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          Agendar una reunión
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex justify-center items-center px-6 py-3.5 border border-outline-variant text-on-surface-variant font-semibold rounded-lg hover:bg-surface-container-low disabled:opacity-60 transition-colors text-sm"
                      aria-label="Enviar consulta"
                    >
                      Enviar consulta
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
