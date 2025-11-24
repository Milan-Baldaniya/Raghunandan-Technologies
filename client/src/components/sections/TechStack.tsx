import { motion } from "framer-motion";

const technologies = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "TensorFlow", "PyTorch", "Docker", "Kubernetes", "AWS", "Three.js", "WebGL", "PostgreSQL", "GraphQL"
];

export default function TechStack() {
  return (
    <div className="py-10 bg-black border-y border-white/10 overflow-hidden">
      <div className="flex relative">
        <motion.div 
          className="flex gap-12 whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...technologies, ...technologies, ...technologies].map((tech, i) => (
            <span key={i} className="text-xl md:text-3xl font-display font-bold text-zinc-800 hover:text-white transition-colors duration-300 uppercase cursor-default select-none">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
