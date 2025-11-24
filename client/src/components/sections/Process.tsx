import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Discovery & Strategy",
    description: "We deep dive into your business goals, analyzing market trends and user needs to define a robust digital roadmap."
  },
  {
    id: "02",
    title: "Design & Prototyping",
    description: "Visualizing the solution through high-fidelity wireframes and interactive prototypes that prioritize user experience."
  },
  {
    id: "03",
    title: "Development & AI",
    description: "Writing clean, scalable code and integrating intelligent algorithms to power your application's core logic."
  },
  {
    id: "04",
    title: "Deployment & Scale",
    description: "Launching your product with CI/CD pipelines and cloud infrastructure designed for massive growth."
  }
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-zinc-950 text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="sticky top-32 h-fit">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-5xl md:text-7xl font-bold font-display mb-8 leading-[0.9]"
            >
              HOW WE <br />
              <span className="text-stroke text-transparent">EXECUTE</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-md">
              Our methodology is a blend of agile development and design thinking, ensuring rapid delivery without compromising quality.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border-l border-white/10 pl-8 md:pl-12 py-4 relative"
              >
                <div className="absolute left-0 top-0 w-[1px] h-0 bg-white group-hover:h-full transition-all duration-700 ease-in-out" />
                <span className="text-xs font-mono text-gray-500 mb-2 block">{step.id}</span>
                <h3 className="text-3xl font-bold font-display mb-4 group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
