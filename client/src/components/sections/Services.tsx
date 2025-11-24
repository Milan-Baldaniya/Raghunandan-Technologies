import { motion } from "framer-motion";
import { Code2, Box, Layers, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Box,
    title: "3D Web Experiences",
    description: "Immersive WebGL environments that captivate and engage users beyond traditional flat interfaces."
  },
  {
    icon: Layers,
    title: "Full-Stack Engineering",
    description: "Robust, scalable architectures built with modern frameworks designed for performance."
  },
  {
    icon: Code2,
    title: "Creative Development",
    description: "Bridging the gap between design and code to deliver pixel-perfect interactive products."
  },
  {
    icon: Cpu,
    title: "Technical Strategy",
    description: "Future-proof technology roadmaps tailored to scale your digital presence."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">OUR EXPERTISE</h2>
          <div className="h-1 w-20 bg-white" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-white/50 transition-colors duration-300 h-full group">
                <CardHeader>
                  <service.icon className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
