import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroScene from "../scene/HeroScene";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }} camera={{ position: [0, 0, 8], fov: 35 }}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content - Moved slightly to accommodate central 3D object if needed, but here we center it and let 3D sit behind/around */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-32 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl pointer-events-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 leading-tight text-white">
            Digital Engineering <br />
            <span className="text-gray-500">For The Modern Era.</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
            We build the platforms that power your business. Web, Mobile, and AI solutions crafted with precision and purpose.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <button className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-200 transition-colors">
              Explore Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
