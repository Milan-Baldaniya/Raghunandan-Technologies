import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

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
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-end justify-between border-b border-white/10 pb-8">
            <div>
                <span className="text-cyan-400 font-mono text-sm tracking-widest block mb-2">SELECTED WORKS</span>
                <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tight">
                    FEATURED <br /> PROJECTS
                </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors">
                View All Archives <ArrowUpRight className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative w-full overflow-hidden">
         <motion.div 
            style={{ x }}
            className="flex gap-8 px-6 w-max"
         >
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
            ))}
            {/* Duplicate for infinite feel or just more content */}
             {projects.map((project, index) => (
                <ProjectCard key={`dup-${index}`} project={project} index={index} />
            ))}
         </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <div 
            className="group relative w-[80vw] md:w-[600px] flex-shrink-0 bg-zinc-900/50 border border-white/10 p-6 md:p-8 transition-colors hover:border-cyan-500/30"
        >
            <div className="overflow-hidden border border-white/5 relative aspect-[16/9] mb-8">
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-mono text-gray-500">{project.year}</span>
                    <div className="h-px w-8 bg-gray-800" />
                    <span className="text-xs font-mono text-cyan-400">{project.category}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold font-display mb-4 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
                    {project.description}
                </p>
                <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest group/btn w-fit mt-auto">
                    <span className="border-b border-white/20 pb-1 group-hover/btn:border-cyan-400 transition-colors">View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
            </div>
        </div>
    )
}
