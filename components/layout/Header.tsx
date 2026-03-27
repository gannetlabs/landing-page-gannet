"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Verticales", href: "#verticales" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 20);
    });
    return unsubscribe;
  }, [scrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,26,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(125,218,154,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center">
            <Image
              src="/logosvg.svg"
              alt="GannetLabs"
              width={140}
              height={59}
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <a
            href="#contacto"
            className="hidden lg:inline-flex items-center px-5 py-2.5 bg-surface-tint text-white text-sm font-semibold rounded-lg hover:bg-surface-tint/90 transition-colors"
            aria-label="Agendar una reunión"
          >
            Agendar una reunión
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="lg:hidden bg-glass px-4 pb-6"
        >
          <nav className="flex flex-col gap-1 pt-4" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white py-3 text-base font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="mt-4 inline-flex justify-center items-center px-5 py-3 bg-surface-tint text-white text-sm font-semibold rounded-lg hover:bg-surface-tint/90 transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Agendar una reunión"
            >
              Agendar una reunión
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
