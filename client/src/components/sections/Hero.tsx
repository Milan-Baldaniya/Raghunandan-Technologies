import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroScene from "../scene/HeroScene";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-950">
      {/* 3D Scene Background - Positioned on the right half for desktop */}
      <div className="absolute inset-0 z-0 md:left-[30%]">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Vignette overlay to blend 3D scene */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />

      {/* Content Layout */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
              Next Gen Intelligence
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-8 leading-[0.9] text-white">
            WE FORGE <br />
            THE <span className="text-transparent text-stroke hover:text-white transition-colors duration-500 cursor-default">FUTURE</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed border-l-2 border-white/10 pl-6">
            Pioneering the intersection of artificial intelligence and human ingenuity. We build autonomous systems that scale with your ambition.
          </p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <ModernButton variant="primary">
               Our Solutions <ArrowRight className="w-4 h-4" />
            </ModernButton>
            
            <button className="group flex items-center gap-4 text-white font-medium hover:text-cyan-400 transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-all">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <span className="tracking-wider text-sm uppercase">Watch Reel</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />
    </section>
  );
}
