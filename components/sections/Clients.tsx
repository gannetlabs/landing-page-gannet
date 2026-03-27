"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";

const clients = [
  { name: "GannetLabs", src: "/logo.svg"          },
  { name: "Nueva Era",  src: "/logonuevaera.svg"  },
  { name: "Tienda",     src: "/logotienda.svg"    },
];

export default function Clients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // El set base se repite 4 veces para garantizar que supere cualquier viewport (3 logos × ~300px = ~900px < 1440px).
  // Luego duplicamos ese set base → [base, base]. El track total = 2 × base.
  // translateX(-50%) = exactamente el ancho del set base → loop seamless sin huecos ni saltos.
  const base = [...clients, ...clients, ...clients, ...clients];
  const logos = [...base, ...base];

  return (
    <section className="py-20 md:py-28 bg-primary">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.p
          variants={fadeUp}
          className="text-center text-xs font-semibold uppercase tracking-widest text-white/30 mb-10"
        >
          Empresas que confían en GannetLabs
        </motion.p>

        <motion.div variants={fadeUp}>
          <div className="clients-marquee-wrap overflow-hidden">
            <div className="clients-marquee-track flex items-center w-max" style={{ gap: "96px" }}>
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 transition-opacity duration-300 opacity-40 hover:opacity-90"
                  style={{ filter: "brightness(0) invert(1)" }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={0}
                    height={0}
                    style={{ height: "44px", width: "auto" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
