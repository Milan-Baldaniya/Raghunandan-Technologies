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

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-20 border-b border-white/10 pb-8">
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
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative grid md:grid-cols-2 gap-12 items-center"
        >
            <div className={`order-2 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                <div className="overflow-hidden rounded-none border border-white/10 relative aspect-[4/3]">
                    <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                </div>
            </div>

            <div className={`order-1 ${index % 2 === 1 ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12"}`}>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-mono text-gray-500">{project.year}</span>
                    <div className="h-px w-8 bg-gray-800" />
                    <span className="text-xs font-mono text-cyan-400">{project.category}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold font-display mb-6 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {project.description}
                </p>
                <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest group/btn">
                    <span className="border-b border-white/20 pb-1 group-hover/btn:border-cyan-400 transition-colors">Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    )
}
