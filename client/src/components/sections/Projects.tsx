import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const projects = [
  {
    title: "NEURAL_FINANCE",
    category: "AI / FINTECH",
    year: "2024",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
    description: "Predictive algorithmic trading platform processing 4TB of market data daily."
  },
  {
    title: "CYBER_HEALTH",
    category: "IOT / MEDICAL",
    year: "2023",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop",
    description: "Real-time biometric monitoring system for critical care units."
  },
  {
    title: "AERO_SYSTEMS",
    category: "ENTERPRISE / CLOUD",
    year: "2023",
    image: "https://images.unsplash.com/photo-1559067515-bf7d799b6d4d?q=80&w=2826&auto=format&fit=crop",
    description: "Distributed cloud architecture for autonomous drone logistics."
  },
  {
    title: "QUANTUM_SECURE",
    category: "CYBERSECURITY",
    year: "2024",
    image: "https://images.unsplash.com/photo-1558494949-ef2a0cc7c35d?q=80&w=2668&auto=format&fit=crop",
    description: "Next-gen encryption protocol for sensitive financial data."
  }
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="flex items-end justify-between border-b border-white/10 pb-8">
            <div>
                <span className="text-cyan-400 font-mono text-sm tracking-widest block mb-2">SELECTED WORKS</span>
                <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tight">
                    FEATURED <br /> PROJECTS
                </h2>
            </div>
            <div className="flex gap-4">
                <button onClick={prevProject} className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextProject} className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
      </div>

      {/* 3D Slider Container */}
      <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
         <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            {projects.map((project, index) => {
                // Calculate relative position
                let offset = index - activeIndex;
                // Handle wrap-around logic visually if needed, but for simple 3D stack, we limit or clamp
                // For infinite loop feeling, we'd need more complex logic. Let's do a centered stack.
                
                const isActive = index === activeIndex;
                const isPrev = index === activeIndex - 1;
                const isNext = index === activeIndex + 1;
                
                // Only render active, prev, and next for performance/visual cleanliness
                if (Math.abs(offset) > 2) return null;

                return (
                    <motion.div
                        key={index}
                        initial={false}
                        animate={{
                            x: offset * 100 + '%', // Adjust spacing
                            scale: isActive ? 1 : 0.8,
                            zIndex: isActive ? 10 : 10 - Math.abs(offset),
                            rotateY: offset * -15, // 3D rotation
                            opacity: isActive ? 1 : 0.3,
                            filter: isActive ? "blur(0px)" : "blur(4px)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute w-[80vw] md:w-[600px] h-[400px] md:h-[500px] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            left: '50%',
                            x: '-50%', // Center alignment base
                        }}
                    >
                         <div className="relative w-full h-full group">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <span className="text-xs font-mono text-cyan-400">{project.category}</span>
                                    <span className="text-xs font-mono text-gray-500">{project.year}</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold font-display mb-4 text-white group-hover:text-cyan-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base max-w-sm opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                    {project.description}
                                </p>
                            </div>
                         </div>
                    </motion.div>
                );
            })}
         </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, i) => (
            <button 
                key={i} 
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-cyan-400 w-8" : "bg-white/20 hover:bg-white/50"}`}
            />
        ))}
      </div>
    </section>
  );
}
