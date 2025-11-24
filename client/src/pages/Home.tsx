import { ReactLenis } from "lenis/react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Interactive3DSection from "@/components/sections/Interactive3D";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-400 selection:text-black">
        <Navbar />
        <main>
          <Hero />
          <TechStack />
          <Services />
          <Interactive3DSection />
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
