import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-950 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
              WE ARE A COLLECTIVE OF <span className="text-stroke text-white">DIGITAL CRAFTSMEN</span>.
            </h2>
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">
              Founded on the belief that software should be both functional and beautiful, we push the boundaries of what's possible on the web.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our team combines deep technical expertise with high-end design sensibilities. We don't just write code; we architect experiences that leave a lasting impression. From simple landing pages to complex 3D visualizations, we bring a level of polish that sets brands apart.
            </p>
            
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-3xl font-bold font-display mb-1">50+</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Projects</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-display mb-1">12</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Awards</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold font-display mb-1">5yr</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Experience</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square bg-zinc-900 rounded-full overflow-hidden flex items-center justify-center border border-white/10"
          >
             {/* Abstract pattern */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
             <div className="w-[70%] h-[70%] border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-[70%] h-[70%] border border-white/10 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-[50%] h-[50%] bg-white/5 rounded-full backdrop-blur-md" />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
