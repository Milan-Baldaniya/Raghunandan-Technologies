'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { ArrowUpRight } from "lucide-react"
 
export default function Interactive3DSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-white/10 rounded-3xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex flex-col md:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-12 relative z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Next Gen Interface</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-6">
                Interactive <br /> Intelligence
              </h2>
              
              <p className="mt-4 text-neutral-400 max-w-lg text-lg leading-relaxed mb-10">
                Experience a new dimension of digital interaction. Our AI-driven interfaces adapt to your behavior, creating immersive environments that feel alive.
              </p>
              
              <button className="group flex items-center gap-4 text-white font-bold uppercase tracking-widest text-sm hover:text-cyan-400 transition-colors w-fit">
                <span className="border-b border-white/20 pb-1 group-hover:border-cyan-400 transition-colors">Explore The Tech</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Right content */}
            <div className="flex-1 relative min-h-[300px] md:min-h-full">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
