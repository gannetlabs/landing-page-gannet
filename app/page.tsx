import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import Solutions from "@/components/sections/Solutions";
import Clients from "@/components/sections/Clients";
import HowWeWork from "@/components/sections/HowWeWork";
import WhyGannet from "@/components/sections/WhyGannet";
import Verticals from "@/components/sections/Verticals";
import FAQ from "@/components/sections/FAQ";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solutions />
        <Clients />
        <HowWeWork />
        <WhyGannet />
        <Verticals />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
