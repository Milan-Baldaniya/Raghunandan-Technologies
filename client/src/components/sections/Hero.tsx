import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ModernButton } from "@/components/ui/ModernButton";
import { Spotlight } from "@/components/ui/spotlight";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* 3D Scene Background - Full Screen */}
      <div className="absolute inset-0 z-0">
        <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
        />
      </div>
      
      {/* Vignette overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Content Layout */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
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

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-8 leading-[0.9] text-white mix-blend-screen">
            WE FORGE <br />
            THE <span className="text-transparent text-stroke hover:text-white transition-colors duration-500 cursor-default">FUTURE</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-xl mb-10 leading-relaxed border-l-2 border-white/20 pl-6 backdrop-blur-sm">
            Pioneering the intersection of artificial intelligence and human ingenuity. We build autonomous systems that scale with your ambition.
          </p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <ModernButton variant="primary">
               Our Solutions <ArrowRight className="w-4 h-4" />
            </ModernButton>
            
            <button className="group flex items-center gap-4 text-white font-medium hover:text-cyan-400 transition-colors backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-all">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <span className="tracking-wider text-sm uppercase">Watch Reel</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
}
