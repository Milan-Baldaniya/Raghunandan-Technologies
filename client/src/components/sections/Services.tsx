import { motion } from "framer-motion";
import { Code2, Smartphone, Brain, Database, Cloud, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "High-performance web applications built with React, Next.js, and WebGL.",
    colSpan: "md:col-span-2",
    bg: "bg-gradient-to-br from-zinc-900 to-zinc-950"
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile experiences for iOS and Android.",
    colSpan: "md:col-span-1",
    bg: "bg-zinc-900"
  },
  {
    icon: Brain,
    title: "AI & ML Solutions",
    description: "Integrating predictive models, LLMs, and computer vision into business workflows.",
    colSpan: "md:col-span-1",
    bg: "bg-zinc-900"
  },
  {
    icon: Database,
    title: "Backend Architecture",
    description: "Scalable microservices and robust API design.",
    colSpan: "md:col-span-2",
    bg: "bg-gradient-to-bl from-zinc-900 to-zinc-950"
  }
];

export default function Services() {
  return (
    <section id="expertise" className="py-32 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <motion.span 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-sm font-mono text-gray-500 mb-4 block"
          >
            // OUR CAPABILITIES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[0.9]"
          >
            ENGINEERING THE <br />
            <span className="text-gray-500">IMPOSSIBLE</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden",
                service.colSpan,
                service.bg
              )}
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
                 <service.icon size={120} strokeWidth={1} />
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <service.icon size={20} />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold font-display mb-2">{service.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed text-sm md:text-base max-w-[90%]">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
