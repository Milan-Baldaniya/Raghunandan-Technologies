import { ReactLenis } from "lenis/react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        <main>
          <Hero />
          {/* Removed duplicate TechStack and Interactive3D sections to optimize performance */}
          <Services />
          <Projects />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
