import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroScene from "../scene/HeroScene";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }} camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl pointer-events-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-gray-300 backdrop-blur-sm">
              AI • WEB • MOBILE
            </span>
            <div className="h-[1px] w-20 bg-white/20" />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-display tracking-tighter mb-8 leading-[0.85] mix-blend-difference">
            FUTURE <br />
            PROOF <br />
            <span className="text-transparent text-stroke">IT SOLUTIONS</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed font-light">
            We architect intelligent systems. From neural networks to native apps, we build the technology that powers the next generation of business.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <button className="group relative px-8 py-4 bg-white text-black font-bold tracking-wide overflow-hidden rounded-full">
              <div className="absolute inset-0 w-full h-full bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                EXPLORE SERVICES <ArrowDown className="w-4 h-4 -rotate-90 group-hover:rotate-0 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="px-8 py-4 border border-white/20 text-white font-bold tracking-wide hover:bg-white/10 transition-all backdrop-blur-sm rounded-full">
              VIEW CASE STUDIES
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-white/50">
        <div className="text-xs font-mono">SCROLL TO EXPLORE</div>
        <div className="w-[1px] h-20 bg-white/20 overflow-hidden">
            <div className="w-full h-full bg-white/80 animate-scrolldown" />
        </div>
      </div>
    </section>
  );
}
