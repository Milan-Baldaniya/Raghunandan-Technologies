import { ReactLenis } from "lenis/react";
import { Suspense, lazy } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import TechStack from "@/components/sections/TechStack";
import Footer from "@/components/layout/Footer";

// Lazy load below-the-fold sections for better initial load performance
const Services = lazy(() => import("@/components/sections/Services"));
const Projects = lazy(() => import("@/components/sections/Projects"));
const About = lazy(() => import("@/components/sections/About"));
const Process = lazy(() => import("@/components/sections/Process"));
const Contact = lazy(() => import("@/components/sections/Contact"));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-400 selection:text-black">
        <Navbar />
        <main>
          <div className="flex flex-col overflow-hidden">
            <ContainerScroll
              titleComponent={
                <>
                  <h1 className="text-4xl font-semibold text-white dark:text-white">
                    Welcome to <br />
                    <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-cyan-400">
                      Raghunandan Technologies
                    </span>
                  </h1>
                </>
              }
            >
              <Hero />
            </ContainerScroll>
          </div>
          <TechStack />
          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Process />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
