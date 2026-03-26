import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GannetLabs | Software, automatización e IA aplicada para negocios",
  description:
    "Creamos sitios, automatizaciones, integraciones, agentes de IA y tableros para que tu negocio venda mejor, ahorre tiempo y tome decisiones con datos.",
  openGraph: {
    title: "GannetLabs | Tecnología aplicada a problemas reales de negocio",
    description:
      "Software, automatización, datos e IA aplicada para negocios que quieren crecer con más orden.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <div aria-hidden="true" className="orb-layer">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
          <div className="orb orb-5" />
          <div className="orb orb-6" />
        </div>
        <div aria-hidden="true" className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
