import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroScene from "../scene/HeroScene";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
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
          className="max-w-4xl pointer-events-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter mb-6 leading-[0.9]">
            DIGITAL <br />
            <span className="text-stroke text-transparent hover:text-white transition-colors duration-500">REALITY</span> <br />
            ARCHITECTS
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-8 leading-relaxed">
            We build immersive digital experiences that bridge the gap between imagination and engineering.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition-all">
              OUR WORK
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-bold tracking-wide hover:bg-white/10 transition-all backdrop-blur-sm">
              CONTACT US
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
}
