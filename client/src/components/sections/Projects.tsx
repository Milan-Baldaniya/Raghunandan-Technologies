import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NEURAL FINANCE",
    category: "AI / FINTECH",
    year: "2024",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
    description: "Predictive algorithmic trading platform processing 4TB of market data daily."
  },
  {
    title: "CYBER HEALTH",
    category: "IOT / MEDICAL",
    year: "2023",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop",
    description: "Real-time biometric monitoring system for critical care units."
  },
  {
    title: "AERO SYSTEMS",
    category: "ENTERPRISE",
    year: "2023",
    image: "https://images.unsplash.com/photo-1559067515-bf7d799b6d4d?q=80&w=2826&auto=format&fit=crop",
    description: "Distributed cloud architecture for autonomous drone logistics."
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-zinc-950 text-white">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-20 border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-8xl font-bold font-display tracking-tighter text-white/90">
                SELECTED <br /> WORKS
            </h2>
            <span className="hidden md:block text-sm font-mono text-gray-500">
                (01 — 03)
            </span>
        </div>

        <div className="space-y-32">
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10%", once: true }}
            transition={{ duration: 0.6 }}
            className="group grid md:grid-cols-12 gap-8 items-center border-t border-white/5 pt-12"
        >
            {/* Text Content */}
            <div className="md:col-span-4 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center gap-4 mb-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
                        <span>{project.year}</span>
                        <span className="w-8 h-px bg-gray-800" />
                        <span className="text-cyan-400">{project.category}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-[0.9] group-hover:text-white/80 transition-colors">
                        {project.title}
                    </h3>
                </div>
                
                <div className="hidden md:block">
                    <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        View Case <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Image Content */}
            <div className="md:col-span-8 relative aspect-[16/9] overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
            </div>
            
            <div className="md:hidden">
                 <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>
                 <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                    View Case <ArrowUpRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}
