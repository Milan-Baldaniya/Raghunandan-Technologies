import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Discovery & Data Strategy",
    description: "We analyze your goals across web, mobile, or AI. From structuring training data to defining project roadmaps, we lay a precise foundation for your digital success."
  },
  {
    id: "02",
    title: "Secure Architecture",
    description: "Designing for scale and security. We architect robust cloud infrastructure (AWS/Azure) and intuitive UI/UX, embedding cyber security protocols from day one."
  },
  {
    id: "03",
    title: "Web & App Development",
    description: "Building digital experiences. Our experts craft high-performance, responsive web applications and native mobile apps that deliver exceptional user engagement."
  },
  {
    id: "04",
    title: "AI & ML Integration",
    description: "Adding intelligence. We integrate predictive models, computer vision, and advanced algorithms to transform your application into a smart, data-driven solution."
  },
  {
    id: "05",
    title: "Cloud Deployment & Scale",
    description: "Global reach. We deploy your solutions using advanced cloud technologies, ensuring they are optimized, secure, and ready to scale with your business."
  }
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-zinc-950 text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="md:sticky md:top-32 h-fit mb-8 md:mb-0">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl md:text-7xl font-bold font-display mb-6 md:mb-8 leading-[0.9]"
            >
              HOW WE <br />
              <span className="text-stroke text-transparent">EXECUTE</span>
            </motion.h2>
            <p className="text-gray-400 text-base md:text-lg max-w-md">
              From initial concept to global scale, we integrate web, mobile, AI, and cloud technologies to deliver secure, high-impact digital solutions.
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
