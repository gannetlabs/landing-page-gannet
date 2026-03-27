"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp } from "@/lib/animations";

const partners = [
  { name: "Nueva Era", logo: "/logonuevaera.svg" },
  { name: "Tienda", logo: "/logotienda.svg" },
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-surface-container-lowest py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-10"
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2
              className="font-display text-2xl md:text-3xl font-bold text-on-surface tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Partners <span className="text-surface-tint">estratégicos</span>
            </h2>
            <div className="mt-3 mx-auto w-12 h-0.5 bg-surface-tint/40 rounded-full" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-12 md:gap-20"
          >
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "brightness(0)" }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
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
