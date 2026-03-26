"use client";

import { Settings, Database, TrendingUp, Puzzle } from "lucide-react";

// Cada SVG tiene un patrón de ondas distinto y un ID de filtro/gradiente único.

function Wave1() {
  // Suave y clásica — 3 ondas regulares apiladas
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(80,160,255,0)" />
          <stop offset="20%"  stopColor="rgba(140,200,255,0.8)" />
          <stop offset="50%"  stopColor="rgba(210,235,255,1)" />
          <stop offset="80%"  stopColor="rgba(140,200,255,0.8)" />
          <stop offset="100%" stopColor="rgba(80,160,255,0)" />
        </linearGradient>
        <filter id="f1"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* ola exterior tenue */}
      <path d="M0,75 C50,45 100,105 150,75 C200,45 250,105 300,75 C350,45 400,105 400,75"
            stroke="rgba(70,130,230,0.4)" strokeWidth="1" fill="none"/>
      {/* ola media */}
      <path d="M0,70 C50,42 100,98 150,70 C200,42 250,98 300,70 C350,42 400,98 400,70"
            stroke="rgba(110,170,255,0.65)" strokeWidth="1.5" fill="none"/>
      {/* ola principal con glow */}
      <path d="M0,65 C50,38 100,92 150,65 C200,38 250,92 300,65 C350,38 400,92 400,65"
            stroke="url(#g1)" strokeWidth="2" fill="none" filter="url(#f1)"/>
    </svg>
  );
}

function Wave2() {
  // Ola larga y lenta — media longitud de onda visible, muy suave
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(80,160,255,0)" />
          <stop offset="25%"  stopColor="rgba(130,195,255,0.75)" />
          <stop offset="50%"  stopColor="rgba(200,230,255,1)" />
          <stop offset="75%"  stopColor="rgba(130,195,255,0.75)" />
          <stop offset="100%" stopColor="rgba(80,160,255,0)" />
        </linearGradient>
        <filter id="f2"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* ola baja tenue */}
      <path d="M-100,80 C0,50 200,110 400,80 C600,50 700,110 900,80"
            stroke="rgba(70,130,230,0.35)" strokeWidth="1" fill="none"/>
      {/* ola media */}
      <path d="M-100,72 C0,42 200,102 400,72 C600,42 700,102 900,72"
            stroke="rgba(110,170,255,0.6)" strokeWidth="1.5" fill="none"/>
      {/* ola principal */}
      <path d="M-100,65 C0,35 200,95 400,65 C600,35 700,95 900,65"
            stroke="url(#g2)" strokeWidth="2" fill="none" filter="url(#f2)"/>
    </svg>
  );
}

function Wave3() {
  // Dos ondas que se cruzan — dinámicas, se intersectan en el centro
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g3a" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(80,160,255,0)" />
          <stop offset="50%"  stopColor="rgba(200,235,255,0.95)" />
          <stop offset="100%" stopColor="rgba(80,160,255,0)" />
        </linearGradient>
        <linearGradient id="g3b" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(60,130,220,0)" />
          <stop offset="50%"  stopColor="rgba(100,170,255,0.8)" />
          <stop offset="100%" stopColor="rgba(60,130,220,0)" />
        </linearGradient>
        <filter id="f3"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* ola A: sube-baja */}
      <path d="M0,65 C100,35 200,95 300,65 C350,50 400,60 400,60"
            stroke="url(#g3a)" strokeWidth="2" fill="none" filter="url(#f3)"/>
      {/* ola B: baja-sube (cruzada) */}
      <path d="M0,80 C100,110 200,50 300,80 C350,95 400,75 400,78"
            stroke="url(#g3b)" strokeWidth="2" fill="none"/>
      {/* ola fina de refuerzo */}
      <path d="M0,72 C100,48 200,96 300,72 C350,60 400,68 400,69"
            stroke="rgba(200,230,255,0.3)" strokeWidth="1" fill="none"/>
    </svg>
  );
}

function Wave4() {
  // Alta frecuencia — muchos picos cortos y rápidos
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(80,160,255,0)" />
          <stop offset="20%"  stopColor="rgba(140,200,255,0.75)" />
          <stop offset="50%"  stopColor="rgba(210,235,255,0.95)" />
          <stop offset="80%"  stopColor="rgba(140,200,255,0.75)" />
          <stop offset="100%" stopColor="rgba(80,160,255,0)" />
        </linearGradient>
        <filter id="f4"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* ola exterior tenue alta freq */}
      <path d="M0,75 C12,58 25,92 37,75 C50,58 62,92 75,75 C87,58 100,92 112,75 C125,58 137,92 150,75 C162,58 175,92 187,75 C200,58 212,92 225,75 C237,58 250,92 262,75 C275,58 287,92 300,75 C312,58 325,92 337,75 C350,58 362,92 375,75 C387,58 400,92 400,75"
            stroke="rgba(70,130,230,0.4)" strokeWidth="1" fill="none"/>
      {/* ola principal alta freq */}
      <path d="M0,70 C12,53 25,87 37,70 C50,53 62,87 75,70 C87,53 100,87 112,70 C125,53 137,87 150,70 C162,53 175,87 187,70 C200,53 212,87 225,70 C237,53 250,87 262,70 C275,53 287,87 300,70 C312,53 325,87 337,70 C350,53 362,87 375,70 C387,53 400,87 400,70"
            stroke="url(#g4)" strokeWidth="2" fill="none" filter="url(#f4)"/>
    </svg>
  );
}

function Wave5() {
  // Amplitud creciente hacia el centro — como un pulso
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(80,160,255,0)" />
          <stop offset="30%"  stopColor="rgba(150,205,255,0.8)" />
          <stop offset="50%"  stopColor="rgba(220,240,255,1)" />
          <stop offset="70%"  stopColor="rgba(150,205,255,0.8)" />
          <stop offset="100%" stopColor="rgba(80,160,255,0)" />
        </linearGradient>
        <filter id="f5"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* ola exterior */}
      <path d="M0,72 C50,62 100,82 150,58 C200,34 250,96 300,72 C350,62 400,78 400,72"
            stroke="rgba(70,130,230,0.4)" strokeWidth="1" fill="none"/>
      {/* ola media */}
      <path d="M0,70 C50,60 100,80 150,54 C200,28 250,102 300,70 C350,58 400,76 400,70"
            stroke="rgba(110,170,255,0.6)" strokeWidth="1.5" fill="none"/>
      {/* ola principal con glow — amplitud máxima en centro */}
      <path d="M0,68 C50,58 100,78 150,48 C200,18 250,108 300,68 C350,55 400,74 400,68"
            stroke="url(#g5)" strokeWidth="2" fill="none" filter="url(#f5)"/>
    </svg>
  );
}

function Wave6() {
  // Doble frecuencia mixta — une ola lenta + ola rápida superpuesta
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g6a" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(80,160,255,0)" />
          <stop offset="50%"  stopColor="rgba(200,235,255,0.9)" />
          <stop offset="100%" stopColor="rgba(80,160,255,0)" />
        </linearGradient>
        <linearGradient id="g6b" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(60,120,210,0)" />
          <stop offset="50%"  stopColor="rgba(100,165,240,0.65)" />
          <stop offset="100%" stopColor="rgba(60,120,210,0)" />
        </linearGradient>
        <filter id="f6"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* ola lenta (período largo) */}
      <path d="M-50,70 C50,90 150,50 250,70 C350,90 450,50 500,70"
            stroke="url(#g6b)" strokeWidth="1.5" fill="none"/>
      {/* ola rápida superpuesta */}
      <path d="M0,70 C25,55 50,85 75,70 C100,55 125,85 150,70 C175,55 200,85 225,70 C250,55 275,85 300,70 C325,55 350,85 375,70 C400,55 425,85 400,70"
            stroke="url(#g6a)" strokeWidth="2" fill="none" filter="url(#f6)"/>
      {/* halo exterior */}
      <path d="M-50,75 C50,95 150,55 250,75 C350,95 450,55 500,75"
            stroke="rgba(80,140,220,0.3)" strokeWidth="1" fill="none"/>
    </svg>
  );
}

function Wave7() {
  // Tres ondas paralelas bien separadas — como un EQ
  return (
    <svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(80,160,255,0)" />
          <stop offset="50%"  stopColor="rgba(210,238,255,0.95)" />
          <stop offset="100%" stopColor="rgba(80,160,255,0)" />
        </linearGradient>
        <filter id="f7"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* ola baja (amplitud pequeña) */}
      <path d="M0,95 C67,82 133,108 200,95 C267,82 333,108 400,95"
            stroke="rgba(80,140,220,0.45)" strokeWidth="1" fill="none"/>
      {/* ola media (amplitud media) */}
      <path d="M0,80 C67,60 133,100 200,80 C267,60 333,100 400,80"
            stroke="rgba(120,185,255,0.7)" strokeWidth="1.5" fill="none"/>
      {/* ola alta — la más brillante y amplia */}
      <path d="M0,65 C67,38 133,92 200,65 C267,38 333,92 400,65"
            stroke="url(#g7)" strokeWidth="2" fill="none" filter="url(#f7)"/>
    </svg>
  );
}

function Wave8() {
  // Minimalista — solo 2 líneas muy limpias
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid meet" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g8" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(80,160,255,0)" />
          <stop offset="50%"  stopColor="rgba(210,238,255,0.9)" />
          <stop offset="100%" stopColor="rgba(80,160,255,0)" />
        </linearGradient>
        <filter id="f8"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* ola sombra (blur fuerte) */}
      <path d="M0,75 C100,45 300,105 400,75"
            stroke="rgba(100,170,255,0.5)" strokeWidth="6" fill="none" filter="url(#f8)"/>
      {/* ola secundaria */}
      <path d="M0,82 C100,52 300,112 400,82"
            stroke="rgba(90,155,240,0.45)" strokeWidth="1.5" fill="none"/>
      {/* ola principal limpia */}
      <path d="M0,68 C100,38 300,98 400,68"
            stroke="url(#g8)" strokeWidth="2" fill="none"/>
    </svg>
  );
}

const cardStyle = {
  background: `
    radial-gradient(ellipse 85% 55% at 50% 118%, rgba(38,80,220,0.52) 0%, transparent 65%),
    linear-gradient(170deg, #101530 0%, #0c1228 55%, #111a40 100%)
  `,
  border: "1px solid rgba(100,140,255,0.14)",
  boxShadow: "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const problems = [
  { Wave: Wave1, title: "Procesos manuales",        description: "Lo que podría automatizarse se hace a mano todos los días. Tiempo perdido, errores repetidos." },
  { Wave: Wave2, title: "Información dispersa",     description: "Datos en WhatsApp, planillas y sistemas que no se hablan. Decisiones tomadas a ciegas." },
  { Wave: Wave3, title: "Ventas sin sistema",        description: "Consultas que se enfrían, oportunidades sin seguimiento, sin visibilidad del pipeline." },
  { Wave: Wave4, title: "Tecnología sin integración", description: "Herramientas sueltas que no conversan. Datos duplicados, procesos que se pierden." },
];

const steps = [
  { Wave: Wave5, number: "01", title: "Entendemos el problema",      description: "Antes de proponer cualquier solución, entendemos cómo funciona tu negocio hoy." },
  { Wave: Wave6, number: "02", title: "Diseñamos una solución simple", description: "Un alcance claro, sin sobrediseñar. La solución más simple que resuelve el problema." },
  { Wave: Wave7, number: "03", title: "Construimos e integramos",     description: "Resultados reales desde la primera semana, sin reuniones interminables." },
  { Wave: Wave8, number: "04", title: "Medimos y mejoramos",          description: "Métricas definidas desde el inicio. Si no funciona, lo sabemos y lo ajustamos." },
];

function WaveCard({ Wave, title, description, top }: { Wave: () => JSX.Element; title: string; description: string; top?: string }) {
  return (
    <div className="relative overflow-hidden rounded-[20px] flex flex-col" style={{ ...cardStyle, minHeight: "380px" }}>
      {/* Texto centrado arriba */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-8 pb-4">
        {top && (
          <span className="font-display text-5xl font-bold leading-none mb-5" style={{ color: "rgba(125,218,154,0.18)" }}>
            {top}
          </span>
        )}
        <h3 className="font-display font-semibold text-white text-lg leading-tight mb-3">{title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
      {/* Olas estáticas en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "52%" }}>
        <Wave />
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

      {/* ── Sección Problemas ── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Preview · Sección "Problemas"</p>
        <h2 className="font-display text-2xl font-bold text-white mb-10" style={{ letterSpacing: "-0.02em" }}>
          Cards sin ícono · texto centrado · ola única por card
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p) => (
            <WaveCard key={p.title} Wave={p.Wave} title={p.title} description={p.description} />
          ))}
        </div>
      </section>

      {/* ── Sección Cómo trabajamos ── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Preview · Sección "Cómo trabajamos"</p>
        <h2 className="font-display text-2xl font-bold text-white mb-10" style={{ letterSpacing: "-0.02em" }}>
          Cards con número · texto centrado · ola única por card
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <WaveCard key={s.number} Wave={s.Wave} title={s.title} description={s.description} top={s.number} />
          ))}
        </div>
      </section>

      {/* ── Sección Problemas · diseño igual a HowWeWork ── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Preview · Sección "Problemas" — variante nueva</p>
        <h2 className="font-display text-2xl font-bold text-white mb-10" style={{ letterSpacing: "-0.02em" }}>
          Mismo diseño que HowWeWork · ícono reemplaza el número
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { Icon: Settings,   title: "Procesos manuales",          description: "Lo que podría automatizarse se hace a mano todos los días. Tiempo perdido, errores repetidos y un equipo atrapado en tareas operativas." },
            { Icon: Database,   title: "Información dispersa",        description: "Datos en WhatsApp, planillas, mails y sistemas que no se hablan. Sin una fuente clara, las decisiones se toman a ciegas." },
            { Icon: TrendingUp, title: "Ventas sin sistema",           description: "Consultas que se enfrían, oportunidades sin seguimiento y ningún lugar claro donde ver qué pasa con cada venta." },
            { Icon: Puzzle,     title: "Tecnología sin integración",   description: "Herramientas sueltas que no conversan entre sí. Trabajo duplicado, datos desactualizados y procesos que se caen entre los sistemas." },
          ].map(({ Icon, title, description }) => (
            <div key={title} className="card-glass p-8 group">
              <Icon size={48} className="text-accent/20 group-hover:text-accent/70 transition-colors duration-300 mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-white font-semibold text-lg mb-3 leading-tight">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      </div>
    </div>
  );
}
