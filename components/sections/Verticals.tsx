"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp } from "@/lib/animations";

const partners = [
  { name: "Nueva Era", logo: "/logonuevaera.svg" },
  { name: "Tienda",    logo: "/logotienda.svg"   },
  { name: "Dux",       logo: "/logoduxsvg.svg"   },
];

export default function Verticals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="verticales" className="py-32 md:py-40" style={{ background: "#0f0f24" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-14"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2
              className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Partners <span className="text-accent">estratégicos</span>
            </h2>
            <div className="mt-3 mx-auto w-12 h-0.5 bg-accent/40 rounded-full" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-16 md:gap-24"
          >
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "brightness(0) invert(1)" }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={0}
                  height={0}
                  style={{ height: "60px", width: "auto" }}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
