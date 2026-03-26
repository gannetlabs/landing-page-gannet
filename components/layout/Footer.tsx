import { Mail, Phone } from "lucide-react";

const footerLinks = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Verticales", href: "#verticales" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="font-display text-white font-bold text-xl tracking-tight">
              Gannet<span className="text-accent">Labs</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              Software, automatización, datos e IA aplicada para negocios reales.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-display text-white/40 font-semibold text-xs uppercase tracking-widest mb-5">
              Navegación
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-white/40 font-semibold text-xs uppercase tracking-widest mb-5">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hola@gannetlabs.com"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail size={15} className="text-accent" />
                  hola@gannetlabs.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5491100000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone size={15} className="text-accent" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/gannetlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/gannetlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 text-center text-xs text-white/20">
          © {new Date().getFullYear()} GannetLabs. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
